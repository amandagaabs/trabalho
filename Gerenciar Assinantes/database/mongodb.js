const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/assinantes';
const db = mongoose.connect(URL);
const con =  mongoose.connection;

con.on('open', function() {
    console.log('conectado ao MongoDB!');
});

con.on('errror', function() {
    console.log('Erro na conexão com o MongoDB!');
});

con.on('close', function () {
    console.log('Desconectado ao MongoDB!');
});

module.exports = db;