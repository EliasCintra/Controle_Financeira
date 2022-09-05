module.exports = app => {
  const finan = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Criar um novo debito
  router.post("/", finan.create);

  // Listar todos os debitos
  router.get("/", finan.findAll);

  // Listar todos os debitos salvos
  router.get("/pagamento", finan.findAllPublished);

  // Listar debitos por ID
  router.get("/:id", finan.findOne);

  // Atualizar debito por ID
  router.put("/:id", finan.update);

  // Deletar debitos por ID
  router.delete("/:id", finan.delete);

  // Deletar todos os debitos
  router.delete("/", finan.deleteAll);

  app.use("/api/finan", router);
};
