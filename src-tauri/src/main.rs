#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use tauri::{Manager, WindowBuilder};

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let close = CustomMenuItem::new("close".to_string(), "Close");
  let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  let menu = Menu::new()
  .add_native_item(MenuItem::Copy)
  .add_item(CustomMenuItem::new("hide", "Hide"))
  .add_submenu(submenu);
  let app = tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet])
    .setup(|app| {
      let window = WindowBuilder::new(
        app,
        "main-window".to_string(),
        tauri::WindowUrl::App("index.html".into()),
      )
      .menu(menu)
      .build()?;
      // open new window
      // let local_window = tauri::WindowBuilder::new(
      //   app,
      //   "Setting",
      //   tauri::WindowUrl::App("http://localhost:4000/hi/me".into())
      // ).build()?;
      let window_ = window.clone();
      window.on_menu_event(move |event| {
        match event.menu_item_id() {
          "quit" => {
            std::process::exit(0);
          }
          "close" => {
            window_.close().unwrap();
          }
          _ => {}
        }
      });

      let main_window = app.get_window("main").unwrap();
      let menu_handle = main_window.menu_handle();
      std::thread::spawn(move || {
        // you can also `set_selected`, `set_enabled` and `set_native_image` (macOS only).
        menu_handle.get_item("item_id").set_title("New title");
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

    
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
async fn open_docs(handle: tauri::AppHandle) {
  let docs_window = tauri::WindowBuilder::new(
    &handle,
    "open new", /* the unique window label */
    tauri::WindowUrl::External("https://tauri.app/".parse().unwrap())
  ).build().unwrap();
}