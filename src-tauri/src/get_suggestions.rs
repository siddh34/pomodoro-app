use cached::{Cached, TimedSizedCache};
use chrono;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::env;
use std::fs::File;
use std::io::{BufReader, BufWriter};
use std::path::Path;
use std::sync::Mutex;
use std::time::Duration;

lazy_static! {
    pub static ref DATA_CACHE: Mutex<TimedSizedCache<String, Data>> = Mutex::new(
        TimedSizedCache::with_size_and_lifespan(2978, Duration::from_secs(600).as_secs())
    );
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct TimeData {
    time: Vec<i32>,
    frequent: i32,
}

trait TimeTrait {
    fn add_time(&mut self, time: i32);

    fn set_frequent(&mut self);
}

impl TimeTrait for TimeData {
    fn add_time(&mut self, time: i32) {
        if self.time.len() >= 15 {
            self.time.remove(0);
        }

        self.time.push(time);
    }

    fn set_frequent(&mut self) {
        let mut map = HashMap::new();
        for time in &self.time {
            let count = map.entry(time).or_insert(0);
            *count += 1;
        }
        let mut max = 0;
        let mut frequent = 0;
        for (key, value) in &map {
            if *value > max {
                max = *value;
                frequent = **key;
            }
        }
        self.frequent = frequent;
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Data {
    morning_average: i32,
    afternoon_average: i32,
    evening_average: i32,
    morning: TimeData,
    afternoon: TimeData,
    evening: TimeData,
}

pub trait DataTrait {
    fn new() -> Data;

    fn save_schema_in_file(&self);

    fn load_schema_from_file(&mut self);

    fn add_time(&mut self, time: i32, period: &str);

    fn set_frequent(&mut self);

    fn set_average(&mut self);

    fn generate_suggestion(&mut self, time: String) -> i32;

    fn save_to_env(&self);

    fn save_to_cache(&self);

    fn get_data_from_file() -> Data;

    fn calculcate_suggestion(data: Data, time: i32, period: &str) -> i32;
}

impl DataTrait for Data {
    fn save_to_env(&self) {
        let data = serde_json::to_string(&self).expect("Failed to serialize JSON");
        env::set_var("suggestion", data);
    }

    fn get_data_from_file() -> Data {
        let file = File::open("suggestion_schema.json").unwrap();
        let reader = BufReader::new(file);
        let loaded_data: Data = serde_json::from_reader(reader).unwrap();
        return loaded_data;
    }

    fn save_to_cache(&self) {
        let key = "key".to_string();
        DATA_CACHE.lock().unwrap().cache_set(key, self.clone());
    }

    fn new() -> Data {
        let mut data = Data {
            morning_average: 0,
            afternoon_average: 0,
            evening_average: 0,
            morning: TimeData {
                time: Vec::new(),
                frequent: 0,
            },
            afternoon: TimeData {
                time: Vec::new(),
                frequent: 0,
            },
            evening: TimeData {
                time: Vec::new(),
                frequent: 0,
            },
        };

        let mut data_cache = DATA_CACHE.lock().unwrap();
        if Path::new("suggestion_schema.json").exists() {
            data.load_schema_from_file();
            data_cache.cache_set("key".to_string(), data.clone());
        } else {
            data.save_schema_in_file();
            data_cache.cache_set("key".to_string(), data.clone());
        }
        return data;
    }

    fn save_schema_in_file(&self) {
        let file = File::create("suggestion_schema.json").unwrap();
        let writer = BufWriter::new(file);
        serde_json::to_writer(writer, &self).unwrap();
    }

    fn load_schema_from_file(&mut self) {
        let file = File::open("suggestion_schema.json").unwrap();
        let reader = BufReader::new(file);
        let loaded_data: Data = serde_json::from_reader(reader).unwrap();
        *self = loaded_data;
    }

    fn add_time(&mut self, time: i32, period: &str) {
        if period == "MORNING" {
            self.morning.add_time(time);
        } else if period == "AFTERNOON" {
            self.afternoon.add_time(time);
        } else if period == "EVENING" {
            self.evening.add_time(time);
        }
        self.set_frequent();
        self.set_average();
        self.save_schema_in_file();
        self.save_to_env();
        self.save_to_cache();
    }

    fn set_frequent(&mut self) {
        self.morning.set_frequent();
        self.afternoon.set_frequent();
        self.evening.set_frequent();
    }

    fn set_average(&mut self) {
        let mut sum = 0;
        for time in &self.morning.time {
            sum += time;
        }

        if self.morning.time.len() == 0 {
            self.morning_average = 0;
        } else {
            self.morning_average = sum / self.morning.time.len() as i32;
        }

        sum = 0;
        for time in &self.afternoon.time {
            sum += time;
        }

        if self.afternoon.time.len() == 0 {
            self.afternoon_average = 0;
        } else {
            self.afternoon_average = sum / self.afternoon.time.len() as i32;
        }

        sum = 0;
        for time in &self.evening.time {
            sum += time;
        }

        if self.evening.time.len() == 0 {
            self.evening_average = 0;
        } else {
            self.evening_average = sum / self.evening.time.len() as i32;
        }
    }

    fn calculcate_suggestion(data: Data, time: i32, period: &str) -> i32 {
        let needed_avg;
        let mut needed_length;
        if period == "MORNING" {
            needed_avg = data.morning_average;
            needed_length = data.morning.time.len();
        } else if period == "AFTERNOON" {
            needed_avg = data.afternoon_average;
            needed_length = data.afternoon.time.len();
        } else {
            needed_avg = data.evening_average;
            needed_length = data.evening.time.len();
        }

        if needed_length == 0 {
            needed_length = 1;
        }

        let suggestion = (needed_avg as f64 - time as f64) / (needed_length as i32 + time + needed_avg) as f64;

        return (suggestion * 5.0).round().abs() as i32;
    }

    fn generate_suggestion(&mut self, time: String) -> i32 {
        let time = time.parse::<i32>().unwrap();
        // check currentTime
        let current_time = chrono::Local::now().time();

        let period = if current_time >= chrono::NaiveTime::from_hms_opt(6, 0, 0).unwrap()
            && current_time < chrono::NaiveTime::from_hms_opt(12, 0, 0).unwrap()
        {
            "MORNING"
        } else if current_time >= chrono::NaiveTime::from_hms_opt(12, 0, 0).unwrap()
            && current_time < chrono::NaiveTime::from_hms_opt(18, 0, 0).unwrap()
        {
            "AFTERNOON"
        } else {
            "EVENING"
        };

        // generate suggestion

        if time <= 3 {
            return 25;
        }

        let key = "key".to_string();
        let mut data_cache = DATA_CACHE.lock().unwrap();

        if let Some(data) = data_cache.cache_get(&key) {
            return Data::calculcate_suggestion(data.clone(), time, period);
        } else {
            let loaded_data = Data::get_data_from_file();
            data_cache.cache_set(key, loaded_data.clone());
            return Data::calculcate_suggestion(loaded_data, time, period);
        }
    }
}
