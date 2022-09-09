const db = require("../models");
const Banco = db.finan;
const Op = db.Sequelize.Op;

// criar e salvar um novo debito
exports.create = (req, res) => {
  // Validador
  if (!req.body.title) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Cria um debito
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    pagamento: req.body.pagamento ? req.body.pagamento : false,
    valor: req.body.valor,
    dia: req.body.dia,
    tipo: req.body.tipo
  };

  // Salva o debito no banco de dados
  Banco.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao conectar ao salvar no banco."
      });
    });
};

// Lista todos os debitos do banco de dados
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Banco.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao conectar ao listar do banco."
      });
    });
};

// Listar com consulta por id 
exports.findOne = (req, res) => {
  const id = req.params.id;

  Banco.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não encontrado debito com ID =${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar o debito com id=" + id
      });
    });
};

// Atualizar um debito pelo id na solicitação
exports.update = (req, res) => {
  const id = req.params.id;

  Banco.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Atualizado debito com sucesso."
        });
      } else {
        res.send({
          message: `Não é possível atualizar o debito com id=${id}. Talvez o debito não foi encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o debito com id=" + id
      });
    });
};

// Deletar um debito
exports.delete = (req, res) => {
  const id = req.params.id;

  Banco.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Debito deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar o debito com id=${id}. Debito não encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o debito com id=" + id
      });
    });
};

// Deletar todos os debitos do Banco de dados 
exports.deleteAll = (req, res) => {
  Banco.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Deletado todos os debitos com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao deletar todos os debitos."
      });
    });
};

// encontrar todos os debitos publicados
exports.findAllPublished = (req, res) => {
  Banco.findAll({ where: { pagamento: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao consultar os debitos."
      });
    });
};
