const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());  

app.use(express.urlencoded({ extended: true }));  

const db = require("./app/models");
db.sequelize.sync();

// teste de conexão
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo ao sistema Financeiro." });
});

require("./app/routes/turorial.routes")(app);

// selecionar porta e validar rota
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serviço rodando em porta ${PORT}.`);
});
