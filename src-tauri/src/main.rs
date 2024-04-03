// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn start_pomodoro() -> String {
    let output = tokio::process::Command::new("pomodoro")
        .arg("start")
        .output()
        .await;

    match output {
        Ok(output) => String::from_utf8(output.stdout).unwrap_or_else(|_| "Error converting output to string".to_string()),
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
        Ok(output) => String::from_utf8(output.stdout).unwrap_or_else(|_| "Error converting output to string".to_string()),
        Err(e) => e.to_string(),
    }
}

#[tauri::command]
async fn break_pomodoro() -> String {
    let output = tokio::process::Command::new("pomodoro")
        .arg("break")
        .output()
        .await;

    match output {
        Ok(output) => String::from_utf8(output.stdout).unwrap_or_else(|_| "Error converting output to string".to_string()),
        Err(e) => e.to_string(),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_pomodoro])
        .run(tauri::generate_context!())
        .expect("Error executing command");

    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![stop_pomodoro])
    .run(tauri::generate_context!())
    .expect("Error executing command");

    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![break_pomodoro])
    .run(tauri::generate_context!())
    .expect("Error executing command");
}
