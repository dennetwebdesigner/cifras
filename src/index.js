import cors from "cors";
import ejs from "ejs";
import express from "express";
import { resolve } from "path";

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(resolve(__dirname, "public")));
app.set("views", resolve(__dirname, "public"));
app.engine("html", ejs.renderFile);
app.set("views engine", "html");

app.get("/", async (req, res) => {
  return res.render("index.html");
});

app.listen(port, () => {
  console.log("Servidor rodando em port: " + port);
});
