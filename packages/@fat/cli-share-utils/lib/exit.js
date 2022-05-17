/*
 * @Author: 谢树宏
 * @Date: 2022-05-17 15:56:34
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-05-17 15:56:53
 * @FilePath: /fat-cli/packages/share-utils/lib/exit.js
 */
exports.exitProcess =
  !process.env.VUE_CLI_API_MODE && !process.env.VUE_CLI_TEST;

exports.exit = function (code) {
  // if (exports.exitProcess) {
  //   process.exit(code)
  // } else if (code > 0) {
  //   throw new Error(`Process exited with code ${code}`)
  // }
  if (code > 0) {
    throw new Error(`Process exited with code ${code}`);
  }
};
