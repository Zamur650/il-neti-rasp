import { NikaResponse } from "./nikaResponse.js";

export class NikaClient {
  async getData() {
    const websiteHtml = await fetch(
      "https://lyceum.nstu.ru/rasp/schedule.html",
    ).then((res) => res.text());
    const nikaUrl = `https://lyceum.nstu.ru/rasp/${websiteHtml.substring(450, 478)}`;
    const nikaScript = await fetch(nikaUrl).then((res) => res.text());

    let NIKA: NikaResponse;
    eval(nikaScript);

    return NIKA;
  }
}
