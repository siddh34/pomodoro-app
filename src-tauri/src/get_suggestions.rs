use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::File;
use chrono; // Add this line to import the chrono crate
use std::io::prelude::*;

#[derive(Serialize, Deserialize, Debug)]
struct TimeData {
    time: Vec<i32>,
    frequent: i32,
}

trait NewTrait {
     fn add_time(&mut self, time: i32);

    fn set_frequent(&mut self);
}

impl NewTrait for TimeData {
     fn add_time(&mut self, time: i32) {
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

#[derive(Serialize, Deserialize, Debug)]
struct Data {
    morning_average: i32,
    afternoon_average: i32,
    evening_average: i32,
    morning: TimeData,
    afternoon: TimeData,
    evening: TimeData,
}

trait DataTrait {
    fn create_file();

    fn check_file();

    fn save_schema_in_file(&self);

    fn load_schema_from_file(&mut self);

    fn add_time(&mut self, time: i32, period: &str);

    fn set_frequent(&mut self);

    fn set_average(&mut self);

    fn generate_suggestion(&mut self, time: String) -> i32;
}

impl DataTrait for Data {
    fn create_file() {
        let data = Data {
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
        let data = serde_json::to_string(&data).unwrap();
        let mut file = File::create("suggestion_schema.json").unwrap();
        file.write_all(data.as_bytes()).unwrap();
    }

    fn check_file() {
        let file = File::open("suggestion_schema.json");
        match file {
            Ok(_) => (),
            Err(_) => Data::create_file(),
        }
    }

    fn save_schema_in_file(&self) {
        let data = serde_json::to_string(&self).unwrap();
        let mut file = File::create("suggestion_schema.json").unwrap();
        file.write_all(data.as_bytes()).unwrap();
    }

    fn load_schema_from_file(&mut self) {
        let mut file = File::open("suggestion_schema.json").unwrap();
        let mut data = String::new();
        file.read_to_string(&mut data).unwrap();
        let schema: Data = serde_json::from_str(&data).unwrap();
        *self = schema;
    }

    fn add_time(&mut self, time: i32, period: &str) {
        if period == "MORNING" {
            self.morning.add_time(time);
        } else if period == "AFTERNOON" {
            self.afternoon.add_time(time);
        } else if period == "EVENING" {
            self.evening.add_time(time);
        }
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
        self.morning_average = sum / self.morning.time.len() as i32;
        sum = 0;
        for time in &self.afternoon.time {
            sum += time;
        }
        self.afternoon_average = sum / self.afternoon.time.len() as i32;
        sum = 0;
        for time in &self.evening.time {
            sum += time;
        }
        self.evening_average = sum / self.evening.time.len() as i32;
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

        self.add_time(time, period);
        self.set_frequent();
        self.set_average();
        self.save_schema_in_file();

        // generate suggestion

        if time <= 3 {
            return 25;
        }

        let needed_avg;

        if period == "MORNING" {
            needed_avg = self.morning_average;
        } else if period == "AFTERNOON" {
            needed_avg = self.afternoon_average;
        } else {
            needed_avg = self.evening_average;
        }

        let suggestion = (needed_avg as f64 - time as f64) / needed_avg as f64;

        return (suggestion * 5.0).round() as i32;
    }
}
