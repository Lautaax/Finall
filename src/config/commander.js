import { Command } from "commander";

const program = new Command();


program.option("-env <type>", "environment", "DEVELOPMENT");
program.parse(process.argv);

const options = program.opts();

export const environment = options.Env || "DEVELOPMENT";