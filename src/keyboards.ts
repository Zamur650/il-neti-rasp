import { InlineKeyboard } from "grammy";
import { NikaResponse } from "./nikaResponse.js";

const gradeRegexp = /^(\d{1,2})([\u0430-\u0433]|(?:-[1-4]))$/;

export const classBackKeyboard = new InlineKeyboard().text(
  "Назад ⬅️",
  "classSchedule",
);

export const teacherBackKeyboard = new InlineKeyboard().text(
  "Назад ⬅️",
  "teacherSchedule",
);

export function getClassesKeyboard(nika: NikaResponse) {
  const classesKeyboard = new InlineKeyboard();

  let currentGrade = 1;

  for (const [classId, className] of Object.entries(nika.CLASSES)) {
    const fullClassId = ("000" + classId).slice(-3);

    const match = className.match(gradeRegexp);
    const grade = Number(match[1]);

    if (currentGrade != grade) {
      classesKeyboard.row();
      currentGrade = grade;
    }

    classesKeyboard.text(className, `class ${fullClassId}`);
  }

  return classesKeyboard;
}

export function getTeachersKeyboard(nika: NikaResponse) {
  const teachersKeyboard = new InlineKeyboard();

  let rowSize = 0;

  for (const [teacherID, teacherName] of Object.entries(nika.TEACHERS)) {
    const fullTeacherID = ("000" + teacherID).slice(-3);

    teachersKeyboard.text(teacherName, `teacher ${fullTeacherID}`);
    rowSize++;

    if (rowSize == 3) {
      teachersKeyboard.row();
      rowSize = 0;
    }
  }

  return teachersKeyboard;
}
