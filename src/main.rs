use teloxide::prelude::*;

use std::env;

#[tokio::main]
async fn main() {
    pretty_env_logger::init();
    log::info!("Starting throw dice bot...");

    let bot_token = env::var("BOT_TOKEN").expect("missing BOT_TOKEN");
    let bot = Bot::new(bot_token);

    teloxide::repl(bot, |bot: Bot, msg: Message| async move {
        bot.send_dice(msg.chat.id).await?;
        Ok(())
    })
    .await;
}
