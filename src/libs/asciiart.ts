import figlet from "figlet";

export function print(txt: string): void {
    /* tslint:disable:no-console */
    console.log(figlet.textSync(txt, {font: "ANSI Shadow"}));
}
