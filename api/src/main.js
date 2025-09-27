import "dotenv/config";
import express from "express";
import chalk from "chalk";
import boxen from "boxen";
import * as SearchController from "./controllers/search.controller.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/search", SearchController.findProfile);

app.listen(PORT, () => {
  const message = `
  ${chalk.bold.green("GitFind API Online")}

  - ${chalk.bold("Port:")} ${chalk.yellow(PORT)}
  - ${chalk.bold("URL:")}  ${chalk.cyan(`http://localhost:${PORT}`)}`;

  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: "double",
      borderColor: "green",
      title: "Projeto Tópicos Avançados",
      titleAlignment: "center",
    }),
  );
});
