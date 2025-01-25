use std::collections::HashMap;

use serde::Deserialize;

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
#[serde(rename_all(deserialize = "SCREAMING_SNAKE_CASE"))]
pub struct NikaResponse {
    pub vertical_classes: bool,
    pub show_teachers: bool,
    pub second_relative: bool,
    pub strikeout_free_lsn: bool,
    pub show_exchanges_term: bool,
    pub disable_link_logo: bool,
    pub classes_btn: String,
    pub teachers_btn: String,
    pub weekdaynum: i64,
    pub lessonsinday: i64,
    pub firstlessonnum: i64,
    pub userooms: bool,
    pub school_name: String,
    pub city_name: String,
    pub export_date: String,
    pub export_time: String,
    pub lang: String,
    pub day_names: Vec<String>,
    pub day_namesh: Vec<String>,
    pub months: Vec<String>,
    pub months2: Vec<String>,
    pub months3: Vec<String>,
    pub lesson_num_str: String,
    pub lesson_str: String,
    pub day_num_str: String,
    pub class_str: String,
    pub for_class_str: String,
    pub schedule_str: String,
    pub for_teacher_str: String,
    pub period_str: String,
    pub second_shift_str: String,
    pub time_go: String,
    pub time_start: String,
    pub time_remain: String,
    pub no_str: String,
    pub no_lessons_str: String,
    pub lesson_canceled_str: String,
    pub method_str: String,
    pub minutes1: String,
    pub minutes2: String,
    pub minutes3: String,
    pub year_str: String,
    pub from_str: String,
    pub for_week: String,
    pub changes_str: String,
    pub previous_str: String,
    pub previous2_str: String,
    pub next_str: String,
    pub next2_str: String,
    pub month_str: String,
    pub week_str: String,
    pub in_str: String,
    pub schedule2_str: String,
    pub refresh_str: String,
    pub today_str: String,
    pub yesterday_str: String,
    pub room_free_str: String,
    pub day_no_lsn_str: String,
    pub day_no_period_str: String,
    pub info_panels: InfoPanels,
    pub panel_colors: PanelColors,
    pub panel_params: PanelParams,
    pub class_shift: ClassShift,
    pub teachers: Teachers,
    pub subjects: Subjects,
    pub classes: Classes,
    pub class_courses: ClassCourses,
    pub rooms: Rooms,
    pub classgroups: Classgroups,
    pub periods: Periods,
    pub lesson_times: LessonTimes,
    pub class_schedule: ClassScheduleEntry,
    pub class_exchange: ClassExchange,
    pub teach_schedule: TeachSchedule,
    pub teach_exchange: TeachExchange,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct InfoPanels(pub HashMap<String, InfoPanel>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
#[serde(rename_all(deserialize = "SCREAMING_SNAKE_CASE"))]
pub struct InfoPanel {
    pub type_field: String,
    pub param: String,
    pub title: String,
    pub scrn_cnt: i64,
    pub scrn_time: i64,
    pub ref_field: String,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
#[serde(rename_all(deserialize = "SCREAMING_SNAKE_CASE"))]
pub struct PanelColors {
    pub backgrnd: String,
    pub title_font: String,
    pub class_font: String,
    pub default_subject: String,
    pub exchange_text: String,
    pub default_room: String,
    pub clock: String,
    pub curr_lsn_font: String,
    pub default_row1: String,
    pub default_row2: String,
    pub curr_row1: String,
    pub curr_row2: String,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
#[serde(rename_all(deserialize = "SCREAMING_SNAKE_CASE"))]
pub struct PanelParams {
    pub auto_change_font: bool,
    pub show_exchanges: bool,
    pub show_clock: bool,
    pub show_lsn_times: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassShifts(pub HashMap<String, ClassShift>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassShift(pub HashMap<String, i64>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct Teachers(pub HashMap<String, String>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct Subjects(pub HashMap<String, String>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct Classes(pub HashMap<String, String>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassCourses(pub HashMap<String, String>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct Rooms(pub HashMap<String, String>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct Classgroups(pub HashMap<String, String>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct Periods(pub HashMap<String, Period>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct Period {
    pub b: String,
    pub e: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct LessonTimes(pub HashMap<String, Vec<String>>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassSchedule(pub HashMap<String, ClassSchedule1>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassSchedule1(pub HashMap<String, ClassScheduleEntry>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassScheduleEntry {
    pub s: Vec<String>,
    pub t: Vec<String>,
    pub r: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassExchange(pub HashMap<String, ClassExchange1>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassExchange1(pub HashMap<String, ClassExchange2>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassExchange2(pub HashMap<String, ClassExchangeEntry>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct ClassExchangeEntry {
    pub s: Vec<String>,
    pub t: Vec<String>,
    pub r: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachSchedule(pub HashMap<String, TeachSchedule1>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachSchedule1(pub HashMap<String, TeachSchedule2>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachSchedule2(pub HashMap<String, TeachScheduleEntry>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachScheduleEntry {
    pub s: String,
    pub c: Vec<String>,
    pub r: String,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachExchange(pub HashMap<String, TeachExchange1>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachExchange1(pub HashMap<String, TeachExchange2>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachExchange2(pub HashMap<String, TeachExchangeEntry>);

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct TeachExchangeEntry {
    pub s: String,
    pub c: Vec<String>,
    pub r: String,
}
