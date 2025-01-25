use teloxide::{prelude::*, utils::command::BotCommands};

#[tokio::main]
async fn main() {
    pretty_env_logger::init();
    log::info!("Starting command bot...");

    let bot = Bot::from_env();

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
    match cmd {
        Command::Help => {
            bot.send_message(msg.chat.id, Command::descriptions().to_string())
                .await?
        }
        Command::Classes => {
            unimplemented!()
        }
        Command::Teachers => {
            unimplemented!()
        }
    };

    Ok(())
}
