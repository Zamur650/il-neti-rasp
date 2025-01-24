import { Bot } from "grammy";
import config from "./env.js";
import { classBackKeyboard, teacherBackKeyboard } from "./keyboards.js";
import { NikaResponse } from "nikaResponse.js";

// Обновляет данные раз в 30 минут (1000 миллисекунд * 60 секунд * 30 минут)
updateData();
setInterval(updateData, 1800000);

// Инициализируем бота
const bot = new Bot(config.BOT_TOKEN);

bot.command("start", (ctx) =>
  ctx.reply(
    "/class - узнать расписание класса\n/teacher - узнать расписание учителя\n/about - узнать информацию о боте"
  )
);

bot.command("about", async (ctx) => {
  if (!NIKA) return;

  ctx.reply(
    `Дата обновления информации:\n${NIKA.EXPORT_DATE} ${NIKA.EXPORT_TIME}`,
    Markup.inlineKeyboard([
      Markup.button.url("Ссылка на расписание", "https://lyceum.nstu.ru/rasp/"),
    ])
  );
});

bot.command("class", async (ctx) => {
  ctx.reply("Выберите ваш класс:", global.classesKeyboard);
});

bot.command("teacher", async (ctx) => {
  ctx.reply("Выберите учителя:", global.teachersKeyboard);
});

bot.action("classSchedule", async (ctx) => {
  return ctx
    .editMessageText("Выберите ваш класс:", global.classesKeyboard)
    .catch(() => {
      return;
    });
});

bot.action("teacherSchedule", async (ctx) => {
  return ctx
    .editMessageText("Выберите учителя:", global.teachersKeyboard)
    .catch(() => {
      return;
    });
});

bot.action(/class (.*)/, (ctx, next) => {
  var classID = ctx.match[1];

  var NIKA = globalThis.NIKA;

  if (!NIKA) return;

  var text = `Расписание для ${NIKA.CLASSES[classID]}:\n`;
  var day = 0;

  // Обрабатываем и высылаем данные
  Object.entries(
    NIKA.CLASS_SCHEDULE[Object.keys(NIKA.CLASS_SCHEDULE)[0]][classID]
  ).forEach(([lessonID, schedule]) => {
    if (Number(lessonID[0]) != day) {
      var dayName = NIKA.DAY_NAMES[Number(lessonID[0]) - 1];
      text += `-- ${dayName}\n`;
      day = Number(lessonID[0]);
    }

    var room = NIKA.ROOMS[schedule.r[0]];
    var subject = NIKA.SUBJECTS[schedule.s[0]];
    var teacher = NIKA.TEACHERS[schedule.t[0]];

    if (!subject) return (text += `${Number(lessonID.substr(1))} Нет уроков\n`);

    text += `${Number(lessonID.substr(1))} ${room} ${subject} - ${teacher}\n`;
  });

  return ctx
    .editMessageText(text, classBackKeyboard)
    .then(() => next())
    .catch(() => {
      return;
    });
});

bot.action(/teacher (.*)/, (ctx, next) => {
  var teacherID = ctx.match[1];

  var NIKA = globalThis.NIKA;

  if (!NIKA) return;

  var text = `Расписание для ${NIKA.TEACHERS[teacherID]}:\n`;
  var day = 0;

  // Обрабатываем и высылаем данные
  Object.entries(
    NIKA.TEACH_SCHEDULE[Object.keys(NIKA.TEACH_SCHEDULE)[0]][teacherID]
  ).forEach(([lessonID, schedule]) => {
    if (Number(lessonID[0]) != day) {
      var dayName = NIKA.DAY_NAMES[Number(lessonID[0]) - 1];
      text += `-- ${dayName}\n`;
      day = Number(lessonID[0]);
    }

    var room = NIKA.ROOMS[schedule.r];
    var subject = NIKA.SUBJECTS[schedule.s];
    var className = NIKA.CLASSES[schedule.c];

    if (!subject) return (text += `${Number(lessonID.substr(1))} Нет уроков\n`);

    return (text += `${Number(
      lessonID.substr(1)
    )} ${room} ${subject} ${className}\n`);
  });

  return ctx
    .editMessageText(text, teacherBackKeyboard)
    .then(() => next())
    .catch(() => {
      return;
    });
});

bot.start();
