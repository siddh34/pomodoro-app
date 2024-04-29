// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod get_suggestions;
pub mod history;
use chrono;
use get_suggestions::Data;
use get_suggestions::DataTrait;
use std::env;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn start_pomodoro(time_given: String) -> String {
    let output = tokio::process::Command::new("pomodoro")
        .arg("start")
        .arg("--duration")
        .arg(&(time_given))
        .output()
        .await;

    let mut data = Data::get_data_from_file();
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

    data.add_time(time_given.parse::<i32>().unwrap(), period);

    match output {
        Ok(output) => String::from_utf8(output.stdout)
            .unwrap_or_else(|_| "Error converting output to string".to_string()),
        Err(e) => e.to_string(),
    }
}

#[tauri::command]
async fn stop_pomodoro() -> String {
    let output = tokio::process::Command::new("pomodoro")
        .arg("cancel")
        .output()
        .await;

    match output {
        Ok(output) => String::from_utf8(output.stdout)
            .unwrap_or_else(|_| "Error converting output to string".to_string()),
        Err(e) => e.to_string(),
    }
}

#[tauri::command]
async fn break_pomodoro(given_time: String) -> String {
    let output = tokio::process::Command::new("pomodoro")
        .arg(["break", &given_time].join(" "))
        .output()
        .await;

    match output {
        Ok(_) => given_time,
        Err(e) => e.to_string(),
    }
}

#[tauri::command]
async fn update_graph() -> String {
    let output = tokio::process::Command::new("pomodoro")
        .arg("status")
        .output()
        .await;

    match output {
        Ok(output) => String::from_utf8(output.stdout)
            .unwrap_or_else(|_| "Error converting output to string".to_string()),
        Err(e) => e.to_string(),
    }
}

#[tauri::command]
async fn get_suggestion_for_time(time_given: String) -> i32 {
    let mut data = Data::get_data_from_file();
    let suggestion = data.generate_suggestion(time_given);
    return suggestion;
}

#[tauri::command]
async fn get_history() -> Result<history::History, history::MyError> {
    let output = tokio::process::Command::new("pomodoro")
        .arg("history")
        .arg("--output")
        .arg("json")
        .output()
        .await
        .map_err(|e| history::MyError {
            message: e.to_string(),
        })?;

    let stdout = String::from_utf8(output.stdout).map_err(|_| history::MyError {
        message: "Error converting output to string".to_string(),
    })?;
    let history: history::History =
        serde_json::from_str(&stdout).map_err(|e| history::MyError {
            message: e.to_string(),
        })?;

    Ok(history)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_pomodoro,
            stop_pomodoro,
            break_pomodoro,
            update_graph,
            get_history,
            get_suggestion_for_time,
        ])
        .run(tauri::generate_context!())
        .expect("Error executing command");
}
