const Assistant = require('../models/assistant');

class AssistantController {
  async getAllAssistants(req, res) {
    try {
      const assistants = await Assistant.find();
      res.json(assistants);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createAssistant(req, res) {
    try {
      const { name } = req.body;
      const image = req.file.filename;

      const assistant = new Assistant({ name, image });
      await assistant.save();

      res.status(201).json(assistant);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateAssistant(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const image = req.file ? req.file.filename : undefined;

      const assistant = await Assistant.findById(id);
      if (!assistant) {
        return res.status(404).json({ error: 'Assistant not found' });
      }

      assistant.name = name;
      if (image) {
        assistant.image = image;
      }

      await assistant.save();

      res.json(assistant);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteAssistant(req, res) {
    try {
      const { id } = req.params;

      const assistant = await Assistant.findByIdAndDelete(id);
      if (!assistant) {
        return res.status(404).json({ error: 'Assistant not found' });
      }

      res.json({ message: 'Assistant deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AssistantController();
