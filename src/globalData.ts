import { InlineKeyboard } from "grammy";
import { getClassesKeyboard, getTeachersKeyboard } from "./keyboards.js";
import { NikaClient } from "./nikaClient.js";
import { NikaResponse } from "./nikaResponse.js";

export class GlobalData {
  nikaClient = new NikaClient();

  public nika: NikaResponse;
  public classesKeyboard: InlineKeyboard;
  public teachersKeyboard: InlineKeyboard;

  constructor(interval: number) {
    (async () => {
      await this.updateData();
    })();

    setInterval(this.updateData, interval);
  }

  async updateData() {
    this.nika = await this.nikaClient.getData();
    this.classesKeyboard = getClassesKeyboard(this.nika);
    this.teachersKeyboard = getTeachersKeyboard(this.nika);
  }
}
