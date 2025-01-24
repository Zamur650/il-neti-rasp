import { inlineKeyboard } from "telegraf/markup";

export const classBackKeyboard = inlineKeyboard([
  {
    text: "Назад ⬅️",
    callback_data: "classSchedule",
  },
]);

export const teacherBackKeyboard = inlineKeyboard([
  {
    text: "Назад ⬅️",
    callback_data: "teacherSchedule",
  },
]);
