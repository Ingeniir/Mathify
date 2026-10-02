use serde::ser::{Serialize, Serializer};
use std::path::PathBuf;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Impossible d'accéder au fichier: {0}")]
    Io(#[from] std::io::Error),

    #[error("Le chemin sélectionné n'est pas absolu : {0}")]
    RelativePath(PathBuf),

    #[error("Le chemin en contient pas de nom de fichier valide : {0}")]
    InvalidFileName(PathBuf),
}

impl Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

pub type AppResult<T> = Result<T, AppError>;
