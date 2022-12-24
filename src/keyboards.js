const { Markup } = require("telegraf");

module.exports.classBackKeyboard = Markup.inlineKeyboard([
	{
		text: "Назад ⬅️",
		callback_data: "classSchedule"
	}
]);

module.exports.teacherBackKeyboard = Markup.inlineKeyboard([
	{
		text: "Назад ⬅️",
		callback_data: "teacherSchedule"
	}
]);
