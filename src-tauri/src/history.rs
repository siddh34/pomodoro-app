use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Pomodoro {
    pub start_time: String,
    pub description: String,
    pub duration: u32,
    pub tags: Option<Vec<String>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct History {
    pomodoros: Vec<Pomodoro>,
}

#[derive(Debug, Serialize)]
pub struct MyError {
    pub message: String,
}

impl std::fmt::Display for MyError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl std::error::Error for MyError {}