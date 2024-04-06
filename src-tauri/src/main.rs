// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn start_pomodoro() -> String {
    let output = tokio::process::Command::new("pomodoro")
        .arg(["start", "25"].join(" "))
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
        Ok(output) => String::from_utf8(output.stdout).unwrap_or_else(|_| "Error converting output to string".to_string()),
        Err(e) => e.to_string(),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_pomodoro, stop_pomodoro, break_pomodoro, update_graph])
        .run(tauri::generate_context!())
        .expect("Error executing command");
}
