const express = require('express');
const multer = require('multer');
const assistantController = require('./controllers/assistantController');

const app = express();
const port = 3000;

// Configurando o armazenamento das imagens usando o Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Configurando o controlador dos assistentes
const assistantCtrl = new assistantController();

// Rota para listar todos os assistentes
app.get('/assistants', assistantCtrl.getAllAssistants.bind(assistantCtrl));

// Rota para criar um novo assistente com imagem
app.post('/assistants', upload.single('image'), assistantCtrl.createAssistant.bind(assistantCtrl));

// Rota para atualizar um assistente existente com imagem
app.put('/assistants/:id', upload.single('image'), assistantCtrl.updateAssistant.bind(assistantCtrl));

// Rota para excluir um assistente
app.delete('/assistants/:id', assistantCtrl.deleteAssistant.bind(assistantCtrl));

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
