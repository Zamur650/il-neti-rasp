use std::{env, error::Error};

use lyceumnstubot::{
    keyboards::{make_classes_keyboard, make_teachers_keyboard},
    nika::client::NikaClient,
};
use teloxide::{
    dispatching::dialogue::GetChatId, prelude::*, types::Me, utils::command::BotCommands,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    pretty_env_logger::init();
    log::info!("Starting command bot...");

    let bot_token = env::var("BOT_TOKEN")?;
    let bot = Bot::new(bot_token);

    let handler = dptree::entry()
        .branch(Update::filter_message().endpoint(message_handler))
        .branch(Update::filter_callback_query().endpoint(callback_handler));

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
    // TODO: cache nika_response
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

async fn callback_handler(bot: Bot, q: CallbackQuery) -> Result<(), Box<dyn Error + Send + Sync>> {
    // TODO: cache nika_response
    let nika_response = NikaClient::get_data().await.unwrap();

    if let Some(ref version) = q.data {
        let text = format!("You chose: {version}");

        // Tell telegram that we've seen this query, to remove 🕑 icons from the
        // clients. You could also use `answer_callback_query`'s optional
        // parameters to tweak what happens on the client side.
        bot.answer_callback_query(&q.id).await?;

        // Edit text of the message to which the buttons were attached
        if let Some(message) = q.regular_message() {
            bot.edit_message_text(message.chat.id, message.id, text)
                .await?;
        } else if let Some(id) = q.inline_message_id {
            bot.edit_message_text_inline(id, text).await?;
        }

        log::info!("You chose: {}", version);
    }

    Ok(())
}
