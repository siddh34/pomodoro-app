use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::File;
use std::io::prelude::*;

#[derive(Serialize, Deserialize, Debug)]
struct TimeData {
    time: Vec<i32>,
    frequent: i32,
}

impl TimeData {
    fn addTime(&mut self, time: i32){
        self.time.push(time);
    }

    fn setFrequent(&mut self){
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
    Morning_Average: i32,
    Afternoon_Average: i32,
    Evening_Average: i32,
    Morning: TimeData,
    Afternoon: TimeData,
    Evening: TimeData,
}

impl Data {
    fn saveSchemaInFile(&self){
        let data = serde_json::to_string(&self).unwrap();
        let mut file = File::create("suggestion_schema.json").unwrap();
        file.write_all(data.as_bytes()).unwrap();
    }

    fn loadSchemaFromFile(&mut self){
        let mut file = File::open("suggestion_schema.json").unwrap();
        let mut data = String::new();
        file.read_to_string(&mut data).unwrap();
        let schema: Data = serde_json::from_str(&data).unwrap();
        *self = schema;
    }

    fn addTime(&mut self, time: i32, period: &str){
        if period == "Morning"{
            self.Morning.addTime(time);
        } else if period == "Afternoon"{
            self.Afternoon.addTime(time);
        } else if period == "Evening"{
            self.Evening.addTime(time);
        }
    }

    fn setFrequent(&mut self){
        self.Morning.setFrequent();
        self.Afternoon.setFrequent();
        self.Evening.setFrequent();
    }

    fn setAverage(&mut self){
        let mut sum = 0;
        for time in &self.Morning.time {
            sum += time;
        }
        self.Morning_Average = sum / self.Morning.time.len() as i32;
        sum = 0;
        for time in &self.Afternoon.time {
            sum += time;
        }
        self.Afternoon_Average = sum / self.Afternoon.time.len() as i32;
        sum = 0;
        for time in &self.Evening.time {
            sum += time;
        }
        self.Evening_Average = sum / self.Evening.time.len() as i32;
    }

    fn generateSuggestion(&mut time: String) -> i32 {
        let time = time.parse::<i32>().unwrap();

        // check currentTime
        let currentTime = chrono::Local::now().time();

        let period = if currentTime >= chrono::NaiveTime::from_hms(6, 0, 0) && currentTime < chrono::NaiveTime::from_hms(12, 0, 0){
            "MORNING"
        } else if currentTime >= chrono::NaiveTime::from_hms(12, 0, 0) && currentTime < chrono::NaiveTime::from_hms(18, 0, 0){
            "AFTERNOON"
        } else {
            "EVENING"
        };

        self.addTime(time, period);
        self.setFrequent();
        self.setAverage();
        self.saveSchemaInFile();


        // generate suggestion

        if(time <= 3){
            return 25
        }

        let mut needed_avg;

        if period == "MORNING"{
            needed_avg = self.Morning_Average;
        } else if period == "AFTERNOON"{
            needed_avg = self.Afternoon_Average;
        } else {
            needed_avg = self.Evening_Average;
        }

        let suggestion = (needed_avg - time) / needed_avg;

        return (suggestion * 5).round(0) as i32;
    }
}