module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "root",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5, // maximo de conexões
    min: 0, // minino de conexões
    acquire: 30000, 
    idle: 10000 // tem maximo em segundos que uma conexão pode ficar ausente
  }
};
