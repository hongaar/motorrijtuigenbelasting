import { command, program } from "bandersnatch";

export const cli = program().default(
  command().action(() => {
    console.log("Hello, world!");
  })
);
