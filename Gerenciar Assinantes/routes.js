const express = require('express');
const router = express.Router();
const assistantController = require('./controllers/assistantController.');

module.exports = function (app, upload) {
  router.get('/assistants', assistantController.getAllAssistants);
  router.post('/assistants', upload.single('image'), assistantController.createAssistant);
  router.put('/assistants/:id', upload.single('image'), assistantController.updateAssistant);
  router.delete('/assistants/:id', assistantController.deleteAssistant);

  app.use('/api', router);
};
