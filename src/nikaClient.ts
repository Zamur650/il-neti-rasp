import { NikaResponse } from "./nikaResponse.js";

const nikaJsonRegex = /({.+})/;
const nikaFilenameRegex =
  /<script type="text\/javascript" src="(nika_data_\d{8}_\d{6}.js)"><\/script>/;

export class NikaClient {
  async getData() {
    const html = await fetch("https://lyceum.nstu.ru/rasp/schedule.html").then(
      (res) => res.text(),
    );
    const filename = html.match(nikaFilenameRegex)[1];

    const nikaScript = await fetch(
      `https://lyceum.nstu.ru/rasp/${filename}`,
    ).then((res) => res.text());

    const nikaJson = nikaScript.match(nikaJsonRegex)[1];
    const nika: NikaResponse = JSON.parse(nikaJson);

    return nika;
  }
}
