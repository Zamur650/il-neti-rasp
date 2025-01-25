import { Bot, Context, InlineKeyboard, SessionFlavor } from "grammy";
import config from "./env.js";
import {
  classBackKeyboard,
  getClassesKeyboard,
  teacherBackKeyboard,
} from "./keyboards.js";
import { NikaResponse } from "nikaResponse.js";
import { NikaClient } from "nikaClient.js";

interface SessionData {
  nika: NikaResponse;
  classesKeyboard: InlineKeyboard;
  teachersKeyboard: InlineKeyboard;
}

type MyContext = Context & SessionFlavor<SessionData>;
const bot = new Bot<MyContext>(config.BOT_TOKEN);
const nikaDataGetter = new NikaClient();

bot.command("start", (ctx) =>
  ctx.reply(
    "/class - узнать расписание класса\n/teacher - узнать расписание учителя\n/about - узнать информацию о боте"
  )
);

bot.command("about", (ctx) => {
  ctx.reply(
    `Дата обновления информации:\n${ctx.session.nika.EXPORT_DATE} ${ctx.session.nika.EXPORT_TIME}`
  );
});

bot.command("class", async (ctx) => {
  ctx.reply("Выберите ваш класс:", global.classesKeyboard);
});

bot.command("teacher", async (ctx) => {
  ctx.reply("Выберите учителя:", global.teachersKeyboard);
});

bot.callbackQuery("classSchedule", async (ctx) => {
  return ctx
    .editMessageText("Выберите ваш класс:", global.classesKeyboard)
    .catch(() => {
      return;
    });
});

bot.callbackQuery("teacherSchedule", async (ctx) => {
  return ctx
    .editMessageText("Выберите учителя:", global.teachersKeyboard)
    .catch(() => {
      return;
    });
});

bot.callbackQuery(/class (.*)/, (ctx) => {
  const classID = ctx.match[1];

  let text = `Расписание для ${ctx.session.nika.CLASSES[classID]}:\n`;
  let day = 0;

  // Обрабатываем и высылаем данные
  Object.entries(
    ctx.session.nika.CLASS_SCHEDULE[
      Object.keys(ctx.session.nika.CLASS_SCHEDULE)[0]
    ][classID]
  ).forEach(([lessonID, schedule]) => {
    if (Number(lessonID[0]) != day) {
      var dayName = ctx.session.nika.DAY_NAMES[Number(lessonID[0]) - 1];
      text += `-- ${dayName}\n`;
      day = Number(lessonID[0]);
    }

    const room = ctx.session.nika.ROOMS[schedule.r[0]];
    const subject = ctx.session.nika.SUBJECTS[schedule.s[0]];
    const teacher = ctx.session.nika.TEACHERS[schedule.t[0]];

    if (!subject)
      return (text += `${Number(lessonID.substring(1))} Нет уроков\n`);

    text += `${Number(lessonID.substring(1))} ${room} ${subject} - ${teacher}\n`;
  });

  ctx.editMessageText(text, {
    reply_markup: classBackKeyboard,
  });
});

bot.callbackQuery(/teacher (.*)/, (ctx) => {
  const teacherID = ctx.match[1];

  let text = `Расписание для ${ctx.session.nika.TEACHERS[teacherID]}:\n`;
  let day = 0;

  // Обрабатываем и высылаем данные
  Object.entries(
    ctx.session.nika.TEACH_SCHEDULE[
      Object.keys(ctx.session.nika.TEACH_SCHEDULE)[0]
    ][teacherID]
  ).forEach(([lessonID, schedule]) => {
    if (Number(lessonID[0]) != day) {
      const dayName = ctx.session.nika.DAY_NAMES[Number(lessonID[0]) - 1];
      text += `-- ${dayName}\n`;
      day = Number(lessonID[0]);
    }

    const room = ctx.session.nika.ROOMS[schedule.r];
    const subject = ctx.session.nika.SUBJECTS[schedule.s];
    const className = ctx.session.nika.CLASSES[schedule.c];

    if (!subject)
      return (text += `${Number(lessonID.substring(1))} Нет уроков\n`);

    text += `${Number(lessonID.substring(1))} ${room} ${subject} ${className}\n`;
  });

  ctx.editMessageText(text, {
    reply_markup: teacherBackKeyboard,
  });
});

bot.start();
