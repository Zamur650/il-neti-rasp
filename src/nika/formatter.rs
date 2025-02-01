use itertools::Itertools;

use super::response::NikaResponse;

pub struct NikaFormatter {}

impl NikaFormatter {
    // TODO: remove unwrap crap
    pub fn format_class_schedule(nika: &NikaResponse, class_id: &str) -> String {
        nika.class_schedule
            .clone()
            .first_entry()
            .unwrap()
            .get()
            .get(class_id)
            .unwrap()
            .iter()
            .map(|(lesson_id, class_schedule_entry)| {
                let room = &nika.rooms[&class_schedule_entry.r[0]];
                let subject = &nika.subjects[&class_schedule_entry.s[0]];
                let teacher = &nika.teachers[&class_schedule_entry.t[0]];

                let text_entry = format!("{lesson_id}. {room}: {subject} | {teacher}");

                (lesson_id, text_entry)
            })
            .chunk_by(|(lesson_id, _)| {
                lesson_id.chars().nth(0).unwrap().to_digit(10).unwrap() as usize - 1
            })
            .into_iter()
            .map(|(day_id, group)| {
                let day = &nika.day_names[day_id];

                format!(
                    "<b>{day}</b>\n{}",
                    group.map(|(_, text_entry)| text_entry).join("\n")
                )
            })
            .join("\n")
    }
}
