// 此时 exports.name 是无效的
module.exports = {
  name: "《React进阶实践指南》",
  author: "我不是外星人",
  say() {
    console.log(666);
  },
};
exports.src = "alien";
