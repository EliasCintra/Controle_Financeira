module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Criar um novo debito
  router.post("/", tutorials.create);

  // Listar todos os debitos
  router.get("/", tutorials.findAll);

  // Listar todos os debitos salvos
  router.get("/published", tutorials.findAllPublished);

  // Listar debitos por ID
  router.get("/:id", tutorials.findOne);

  // Atualizar debito por ID
  router.put("/:id", tutorials.update);

  // Deletar debitos por ID
  router.delete("/:id", tutorials.delete);

  // Deletar todos os debitos
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
