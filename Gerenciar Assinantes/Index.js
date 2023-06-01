const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 3000;

// Configuração do Multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/assistantDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(port, () => {
      console.log(`Servidor em execução na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Configuração das rotas
routes(app, upload);
