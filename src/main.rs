use std::{env, error::Error};

use lyceumnstubot::{
    keyboards::{make_classes_keyboard, make_teachers_keyboard},
    nika_client::NikaClient,
};
use teloxide::{prelude::*, types::Me, utils::command::BotCommands};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    pretty_env_logger::init();
    log::info!("Starting command bot...");

    let bot_token = env::var("BOT_TOKEN")?;
    let bot = Bot::new(bot_token);

    let handler = dptree::entry().branch(Update::filter_message().endpoint(message_handler));

    Dispatcher::builder(bot, handler)
        .enable_ctrlc_handler()
        .build()
        .dispatch()
        .await;

    Ok(())
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

async fn message_handler(
    bot: Bot,
    msg: Message,
    me: Me,
) -> Result<(), Box<dyn Error + Send + Sync>> {
    let nika_response = NikaClient::get_data().await.unwrap();
    let classes_keyboard = make_classes_keyboard(&nika_response).unwrap();
    let teachers_keyboard = make_teachers_keyboard(&nika_response);

    if let Some(text) = msg.text() {
        match BotCommands::parse(text, me.username()) {
            Ok(Command::Help) => {
                bot.send_message(msg.chat.id, Command::descriptions().to_string())
                    .await?;
            }
            Ok(Command::Classes) => {
                bot.send_message(msg.chat.id, "Выберите класс:")
                    .reply_markup(classes_keyboard)
                    .await?;
            }
            Ok(Command::Teachers) => {
                bot.send_message(msg.chat.id, "Выберите учителя:")
                    .reply_markup(teachers_keyboard)
                    .await?;
            }
            Err(_) => {
                bot.send_message(msg.chat.id, "Команда не найдена!").await?;
            }
        }
    }

    Ok(())
}
