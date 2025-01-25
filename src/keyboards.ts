import { InlineKeyboard } from "grammy";
import { NikaResponse } from "nikaResponse.js";

const gradeRegexp = /^(\d{1,2})([\u0430-\u0433]|(?:-[1-4]))$/;

export const classBackKeyboard = new InlineKeyboard().text(
  "Назад ⬅️",
  "classSchedule"
);

export const teacherBackKeyboard = new InlineKeyboard().text(
  "Назад ⬅️",
  "teacherSchedule"
);

export async function getClassesKeyboard(nika: NikaResponse) {
  const classesKeyboard = new InlineKeyboard();

  let currentGrade = 1;

  Object.entries(nika.CLASSES).forEach(([classID, className]) => {
    classID = ("000" + classID).substring(-3);

    const match = className.match(gradeRegexp);
    const grade = Number(match[1]);

    if (currentGrade != grade) {
      classBackKeyboard.row();
      currentGrade = grade;
    }

    classesKeyboard.text(className, `class ${classID}`);
  });

  return classesKeyboard;
}

export async function getTeachersKeyboard(nika: NikaResponse) {
  const teachersKeyboard = new InlineKeyboard();

  let rowSize = 0;

  Object.entries(nika.TEACHERS).forEach(([teacherID, teacherName]) => {
    teacherID = ("000" + teacherID).substring(-3);

    teachersKeyboard.text(teacherName, `teacher ${teacherID}`);

    rowSize++;
    if (rowSize == 3) teachersKeyboard.row();
  });

  return teachersKeyboard;
}
