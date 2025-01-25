import { Bot } from "grammy";
import config from "./env.js";
import { classBackKeyboard, teacherBackKeyboard } from "./keyboards.js";
import { GlobalData } from "./globalData.js";

const bot = new Bot(config.BOT_TOKEN);
const d = new GlobalData(30 * 60 * 1000);

bot.command("start", (ctx) => {
  ctx.reply(
    "/class - узнать расписание класса\n/teacher - узнать расписание учителя\n/about - узнать информацию о боте",
  );
});

bot.command("about", (ctx) => {
  ctx.reply(
    `Дата обновления информации:\n${d.nika.EXPORT_DATE} ${d.nika.EXPORT_TIME}`,
  );
});

bot.command("class", async (ctx) => {
  ctx.reply("Выберите ваш класс:", { reply_markup: d.classesKeyboard });
});

bot.command("teacher", async (ctx) => {
  ctx.reply("Выберите учителя:", { reply_markup: d.teachersKeyboard });
});

bot.callbackQuery("classSchedule", async (ctx) => {
  ctx.editMessageText("Выберите ваш класс:", {
    reply_markup: d.classesKeyboard,
  });
});

bot.callbackQuery("teacherSchedule", async (ctx) => {
  ctx.editMessageText("Выберите учителя:", {
    reply_markup: d.teachersKeyboard,
  });
});

bot.callbackQuery(/class (.+)/, (ctx) => {
  const classID = ctx.match[1];

  let text = `Расписание для ${d.nika.CLASSES[classID]}:\n`;
  let day = 0;

  // Обрабатываем и высылаем данные
  for (const [lessonID, schedule] of Object.entries(
    d.nika.CLASS_SCHEDULE[Object.keys(d.nika.CLASS_SCHEDULE)[0]][classID],
  )) {
    if (Number(lessonID[0]) != day) {
      const dayName = d.nika.DAY_NAMES[Number(lessonID[0]) - 1];
      text += `\n<b>${dayName}:</b>\n`;
      day = Number(lessonID[0]);
    }

    const room = d.nika.ROOMS[schedule.r[0]];
    const subject = d.nika.SUBJECTS[schedule.s[0]];
    const teacher = d.nika.TEACHERS[schedule.t[0]];

    if (!subject) {
      text += `${Number(lessonID.slice(1))}. <i>Нет урока</i>\n`;
      continue;
    }

    text += `${Number(lessonID.slice(1))}. ${room}: ${subject} | ${teacher}\n`;
  }

  ctx.editMessageText(text, {
    parse_mode: "HTML",
    reply_markup: classBackKeyboard,
  });
});

bot.callbackQuery(/teacher (.+)/, (ctx) => {
  const teacherID = ctx.match[1];

  let text = `Расписание для ${d.nika.TEACHERS[teacherID]}:\n`;
  let day = 0;

  // Обрабатываем и высылаем данные
  for (const [lessonID, schedule] of Object.entries(
    d.nika.TEACH_SCHEDULE[Object.keys(d.nika.TEACH_SCHEDULE)[0]][teacherID],
  )) {
    if (Number(lessonID[0]) != day) {
      const dayName = d.nika.DAY_NAMES[Number(lessonID[0]) - 1];
      text += `\n<b>${dayName}:</b>\n`;
      day = Number(lessonID[0]);
    }

    const room = d.nika.ROOMS[schedule.r];
    const subject = d.nika.SUBJECTS[schedule.s];
    const className = schedule.c.map((c) => d.nika.CLASSES[c]).join(", ");

    if (!subject) {
      text += `${Number(lessonID.slice(1))}. <i>Нет урока</i>\n`;
      continue;
    }

    text += `${Number(lessonID.slice(1))}. ${room}: ${subject} | ${className}\n`;
  }

  ctx.editMessageText(text, {
    parse_mode: "HTML",
    reply_markup: teacherBackKeyboard,
  });
});

bot.catch(() => {});

bot.start();
