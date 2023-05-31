const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

class Assistant {
  static async connect() {
    try {
      await client.connect();
      console.log('Conectado ao MongoDB');
      Assistant.collection = client.db('assistant-manager').collection('assistants');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
    }
  }

  static async getAll() {
    try {
      const assistants = await Assistant.collection.find().toArray();
      return assistants;
    } catch (err) {
      console.error('Erro ao obter os assistentes:', err);
      throw err;
    }
  }

  static async create(assistantData) {
    try {
      const result = await Assistant.collection.insertOne(assistantData);
      return result.ops[0];
    } catch (err) {
      console.error('Erro ao criar o assistente:', err);
      throw err;
    }
  }

  static async update(id, updates) {
    try {
      const result = await Assistant.collection.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updates },
        { returnOriginal: false }
      );
      return result.value;
    } catch (err) {
      console.error('Erro ao atualizar o assistente:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const result = await Assistant.collection.deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 0) {
        throw new Error('Assistente não encontrado');
      }
    } catch (err) {
      console.error('Erro ao excluir o assistente:', err);
      throw err;
    }
  }
}

module.exports = Assistant;
