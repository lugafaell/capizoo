const express = require("express");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const imageRoute = require("./routes/imageRoutes");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);
app.use("/records", recordRoutes);
app.use("/upload", imageRoute);

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  } else {
    console.log("Conectado ao banco de dados com sucesso!");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
