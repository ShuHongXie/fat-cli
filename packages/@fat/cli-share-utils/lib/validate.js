const { exit } = require("./exit");
exports.createSchema = (fn) => {
  console.log("调用");
  return fn(require("joi"));
};

// 数据段校验 同步方法
exports.validateSync = (object, schema, cb) => {
  const result = schema.validateAsync(object);
  if (result.error) {
    throw result.error;
  } else {
    cb();
  }
};

// 数据段校验 异步方法
exports.validate = async (object, schema) => {
  console.log(object, schema);
  try {
    await schema.validate(object);
  } catch (err) {
    if (err) {
      cb(err.message);
      exit(1);
    }
  }
};
