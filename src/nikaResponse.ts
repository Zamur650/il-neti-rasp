export interface NikaResponse {
  VERTICAL_CLASSES: boolean;
  SHOW_TEACHERS: boolean;
  SECOND_RELATIVE: boolean;
  STRIKEOUT_FREE_LSN: boolean;
  SHOW_EXCHANGES_TERM: boolean;
  DISABLE_LINK_LOGO: boolean;
  CLASSES_BTN: string;
  TEACHERS_BTN: string;
  WEEKDAYNUM: number;
  LESSONSINDAY: number;
  FIRSTLESSONNUM: number;
  USEROOMS: boolean;
  SCHOOL_NAME: string;
  CITY_NAME: string;
  EXPORT_DATE: string;
  EXPORT_TIME: string;
  LANG: string;
  DAY_NAMES: string[];
  DAY_NAMESH: string[];
  MONTHS: string[];
  MONTHS2: string[];
  MONTHS3: string[];
  LESSON_NUM_STR: string;
  LESSON_STR: string;
  DAY_NUM_STR: string;
  CLASS_STR: string;
  FOR_CLASS_STR: string;
  SCHEDULE_STR: string;
  FOR_TEACHER_STR: string;
  PERIOD_STR: string;
  SECOND_SHIFT_STR: string;
  TIME_GO: string;
  TIME_START: string;
  TIME_REMAIN: string;
  NO_STR: string;
  NO_LESSONS_STR: string;
  LESSON_CANCELED_STR: string;
  METHOD_STR: string;
  MINUTES1: string;
  MINUTES2: string;
  MINUTES3: string;
  YEAR_STR: string;
  FROM_STR: string;
  FOR_WEEK: string;
  CHANGES_STR: string;
  PREVIOUS_STR: string;
  PREVIOUS2_STR: string;
  NEXT_STR: string;
  NEXT2_STR: string;
  MONTH_STR: string;
  WEEK_STR: string;
  IN_STR: string;
  SCHEDULE2_STR: string;
  REFRESH_STR: string;
  TODAY_STR: string;
  YESTERDAY_STR: string;
  ROOM_FREE_STR: string;
  DAY_NO_LSN_STR: string;
  DAY_NO_PERIOD_STR: string;
  INFO_PANELS: InfoPanels;
  PANEL_COLORS: PanelColors;
  PANEL_PARAMS: PanelParams;
  CLASS_SHIFT: ClassShift;
  TEACHERS: Teachers;
  SUBJECTS: Subjects;
  CLASSES: Classes;
  CLASS_COURSES: ClassCourses;
  ROOMS: Rooms;
  CLASSGROUPS: Classgroups;
  PERIODS: Periods;
  LESSON_TIMES: LessonTimes;
  CLASS_SCHEDULE: ClassSchedule;
  CLASS_EXCHANGE: ClassExchange;
  TEACH_SCHEDULE: TeachSchedule;
  TEACH_EXCHANGE: TeachExchange;
}

export interface InfoPanels {
  "1": InfoPanel[];
}

export interface InfoPanel {
  TYPE: string;
  PARAM: string;
  TITLE: string;
  SCRN_CNT: number;
  SCRN_TIME: number;
  REF: string;
}

export interface PanelColors {
  BACKGRND: string;
  TITLE_FONT: string;
  CLASS_FONT: string;
  DEFAULT_SUBJECT: string;
  EXCHANGE_TEXT: string;
  DEFAULT_ROOM: string;
  CLOCK: string;
  CURR_LSN_FONT: string;
  DEFAULT_ROW1: string;
  DEFAULT_ROW2: string;
  CURR_ROW1: string;
  CURR_ROW2: string;
}

export interface PanelParams {
  AUTO_CHANGE_FONT: boolean;
  SHOW_EXCHANGES: boolean;
  SHOW_CLOCK: boolean;
  SHOW_LSN_TIMES: boolean;
}

export interface ClassShift {
  "96": ClassShift96;
}

export type ClassShift96 = Record<string, number>;

export type Teachers = Record<string, string>;

export type Subjects = Record<string, string>;

export type Classes = Record<string, string>;

export type ClassCourses = Record<string, string>;

export type Rooms = Record<string, string>;

export type Classgroups = Record<string, string>;

export interface Periods {
  "96": Period;
}

export interface Period {
  b: string;
  e: string;
  name: string;
}

export type LessonTimes = Record<string, string[]>;

export interface ClassSchedule {
  "96": ClassSchedule96;
}

export type ClassSchedule96 = Record<string, DaySchedule>;

export type DaySchedule = Record<string, Lesson>;

export interface Lesson {
  s: string[];
  t: string[];
  r: string[];
}

export type ClassExchange = Record<string, Days>;

export type Days = Record<string, Day>;

export type Day = Record<string, DayField>;

export interface DayField {
  s: string[];
  t: string[];
  g: string[];
  r: string[];
}

export interface TeachSchedule {
  "96": TeachSchedule96;
}

export type TeachSchedule96 = Record<string, TeacherTable>;

export type TeacherTable = Record<string, TeacherField>;

export interface TeacherField {
  s: string;
  c: string[];
  r: string;
}

export type TeachExchange = Record<string, TeachExchangeDates>;

export type TeachExchangeDates = Record<string, TeacherExchangeTable>;

export type TeacherExchangeTable = Record<string, TeacherExchangeField>;

export interface TeacherExchangeField {
  s: string;
  c: string[];
  r: string;
}
