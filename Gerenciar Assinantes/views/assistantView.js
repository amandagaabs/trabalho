class AssistantView {
    render(assistant) {
      return {
        id: assistant._id,
        name: assistant.name,
        role: assistant.role,
        image: assistant.image
      };
    }
  
    renderMany(assistants) {
      return assistants.map((assistant) => this.render(assistant));
    }
  }
  
  module.exports = new AssistantView();
  