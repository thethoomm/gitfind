import "dotenv/config";
import express from "express";
import chalk from "chalk";
import boxen from "boxen";
import cors from "cors";
import * as SearchController from "./controllers/search.controller.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);

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
