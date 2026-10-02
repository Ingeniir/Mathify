use std::path::{Path, PathBuf};

use serde::Serialize;

use crate::errors::{AppError, AppResult};

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FilePayload {
    pub path: String,
    pub name: String,
    pub content: String,
}

fn validate_absolute_path(path: &Path) -> AppResult<()> {
    if !path.is_absolute() {
        return Err(AppError::RelativePath(path.to_path_buf()));
    }

    Ok(())
}

fn extract_file_name(path: &Path) -> AppResult<String> {
    path.file_name()
        .map(|name| name.to_string_lossy().into_owned())
        .ok_or_else(|| AppError::InvalidFileName(path.to_path_buf()))
}

#[tauri::command]
pub async fn read_text_file(path: PathBuf) -> AppResult<FilePayload> {
    validate_absolute_path(&path)?;

    let canolical_path = tokio::fs::canonicalize(&path).await?;
    let content = tokio::fs::read_to_string(&canolical_path).await?;
    let name = extract_file_name(&canolical_path)?;

    Ok(FilePayload {
        path: canolical_path.to_string_lossy().into_owned(),
        name,
        content,
    })
}

#[tauri::command]
pub async fn write_text_file(path: PathBuf, content: String) -> AppResult<FilePayload> {
    validate_absolute_path(&path)?;

    let name = extract_file_name(&path)?;

    if let Some(parent) = path.parent() {
        tokio::fs::metadata(parent).await?;
    }

    tokio::fs::write(&path, content.as_bytes()).await?;

    let canonical_path = tokio::fs::canonicalize(&path).await?;

    Ok(FilePayload {
        path: canonical_path.to_string_lossy().into_owned(),
        name,
        content,
    })
}
