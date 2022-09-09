module.exports = (sequelize, Sequelize) => {
  const Banco = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    valor: {
      type: Sequelize.STRING
    },
    dia: {
      type: Sequelize.DATEONLY
    },
    tipo: {
      type: Sequelize.STRING
    },
    pagamento: {
      type: Sequelize.BOOLEAN
    }
  });

  return Banco;
};
