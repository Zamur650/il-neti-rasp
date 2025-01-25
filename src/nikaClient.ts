import { NikaResponse } from "./nikaResponse.js";

const nikaJsonRegex = /({.+})/;

export class NikaClient {
  async getData() {
    const websiteHtml = await fetch(
      "https://lyceum.nstu.ru/rasp/schedule.html",
    ).then((res) => res.text());

    const nikaScript = await fetch(
      `https://lyceum.nstu.ru/rasp/${websiteHtml.substring(450, 478)}`,
    ).then((res) => res.text());

    const match = nikaScript.match(nikaJsonRegex);
    const nika: NikaResponse = JSON.parse(match[1]);

    return nika;
  }
}
