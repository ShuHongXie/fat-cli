module.exports = class Plugin {
  constructor(id, service = {}) {
    this.id = id;
    this.service = service;
  }

  registerCommand(name, opt, fn) {
    this.service.commands[name] = fn;
  }
};
