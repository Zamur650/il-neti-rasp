use regex::Regex;
use teloxide::types::{InlineKeyboardButton, InlineKeyboardMarkup};

use crate::nika_response::NikaResponse;

pub fn make_classes_keyboard(
    nika_response: NikaResponse,
) -> Result<InlineKeyboardMarkup, KeyboardMakerError> {
    let grade_regex = Regex::new(r#"^(\d{1,2})([\u0430-\u0433]|(?:-[1-4]))$"#)?;

    let mut keyboard = vec![];
    let mut row = vec![];
    let mut current_grade = 1;

    for (class_id, class_name) in nika_response.classes {
        let grade = grade_regex
            .captures(&class_name)
            .ok_or(KeyboardMakerError::GradeParsing)?
            .get(1)
            .ok_or(KeyboardMakerError::GradeParsing)?
            .as_str()
            .parse::<i32>()
            .unwrap();

        if grade != current_grade {
            keyboard.push(row.clone());
            row.clear();
            current_grade = grade;
        }

        row.push(InlineKeyboardButton::callback(class_name, class_id));
    }

    Ok(InlineKeyboardMarkup::new(keyboard))
}

#[derive(Debug)]
pub enum KeyboardMakerError {
    Regex(regex::Error),
    GradeParsing,
}

impl std::error::Error for KeyboardMakerError {}

impl std::fmt::Display for KeyboardMakerError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            KeyboardMakerError::Regex(err) => err.fmt(f),
            KeyboardMakerError::GradeParsing => write!(f, "couldn't parse grade"),
        }
    }
}

impl From<regex::Error> for KeyboardMakerError {
    fn from(err: regex::Error) -> KeyboardMakerError {
        KeyboardMakerError::Regex(err)
    }
}
