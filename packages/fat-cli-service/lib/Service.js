module.exports = class Service {
  constructor(context, { plugins = {} } = {}) {
    this.context = context;
    this.command = {};
    this.plugins = this.resolvePlugins(plugins);
    console.log(this.plugins);
    this.mode = this.plugins.reduce((last, current) => {
      console.log(last.apply, current);
    });
  }

  run() {}

  loadEnv() {}

  resolvePlugins() {
    const formatPlugins = (id) => ({
      id: id.replace(/^.\//, "built-it:"),
      apply: require(id),
    });

    const defaultPlugins = ["./command/serve", "./command/build"].map(
      formatPlugins
    );

    return defaultPlugins;
  }
};
