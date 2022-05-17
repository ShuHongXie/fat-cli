/*
 * @Author: 谢树宏
 * @Date: 2022-05-17 11:57:37
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-05-17 15:57:17
 * @FilePath: /fat-cli/packages/share-utils/lib/joi.js
 */
const { exit } = require('./exit')
exports.createSchema = (fn) => fn(require("joi"));

// 数据段校验
exports.validate = async (obj, schema, cb) => {
  const result = object.validate(obj, schema)
  if (result.error) {
    throw result.error
  } else {
    cb()
  }
};

// 数据段校验
exports.validateSync = (obj, schema) => {
  try {
    await schema.validateAsync(obj);
  } catch (err) {
    if (err) {
      cb(err.message);
      exit(1);
    }
  }
}
