const Assistant = require('../models/assistant');
const assistantView = require('../views/assistantView');

class AssistantController {
  async getAllAssistants(req, res) {
    try {
      const assistants = await Assistant.getAll();
      res.json(assistantView.renderMany(assistants));
    } catch (err) {
      res.status(500).send('Erro ao obter os assistentes');
    }
  }

  async createAssistant(req, res) {
    const assistantData = req.body;
    if (req.file) {
      assistantData.image = req.file.filename;
    }
    try {
      const createdAssistant = await Assistant.create(assistantData);
      res.json(assistantView.render(createdAssistant));
    } catch (err) {
      res.status(500).send('Erro ao criar o assistente');
    }
  }

  async updateAssistant(req, res) {
    const id = req.params.id;
    const updates = req.body;
    if (req.file) {
      updates.image = req.file.filename;
    }
    try {
      const updatedAssistant = await Assistant.update(id, updates);
      res.json(assistantView.render(updatedAssistant));
    } catch (err) {
      res.status(500).send('Erro ao atualizar o assistente');
    }
  }

  async deleteAssistant(req, res) {
    const id = req.params.id;
    try {
      await Assistant.delete(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send('Erro ao excluir o assistente');
    }
  }
}

module.exports = AssistantController;
