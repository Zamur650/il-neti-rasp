use std::env;

use lyceumnstubot::{
    keyboards::{make_classes_keyboard, make_teachers_keyboard},
    nika_client::NikaClient,
};
use teloxide::{prelude::*, utils::command::BotCommands};

#[tokio::main]
async fn main() {
    pretty_env_logger::init();
    log::info!("Starting command bot...");

    let bot_token = env::var("BOT_TOKEN").unwrap();
    let bot = Bot::new(bot_token);

    Command::repl(bot, answer).await;
}

#[derive(BotCommands, Clone)]
#[command(rename_rule = "lowercase", description = "Поддерживаются эти команды:")]
enum Command {
    #[command(description = "отображает этот текст.")]
    Help,
    #[command(description = "отображает меню с выбором класса.")]
    Classes,
    #[command(description = "отображает меню с выбором учителя.")]
    Teachers,
}

async fn answer(bot: Bot, msg: Message, cmd: Command) -> ResponseResult<()> {
    let nika_response = NikaClient::get_data().await.unwrap();
    let classes_keyboard = make_classes_keyboard(&nika_response).unwrap();
    let teachers_keyboard = make_teachers_keyboard(&nika_response);

    match cmd {
        Command::Help => {
            bot.send_message(msg.chat.id, Command::descriptions().to_string())
                .await?
        }
        Command::Classes => {
            bot.send_message(msg.chat.id, "Выберите класс:")
                .reply_markup(classes_keyboard)
                .await?
        }
        Command::Teachers => {
            bot.send_message(msg.chat.id, "Выберите учителя:")
                .reply_markup(teachers_keyboard)
                .await?
        }
    };

    Ok(())
}
