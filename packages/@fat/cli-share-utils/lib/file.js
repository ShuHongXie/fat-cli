const fs = require("fs");

/*
F_OK	指示文件对调用进程可见的标志。 这对于确定文件是否存在很有用，但没有说明 rwx 权限。 未指定模式时的默认值。
R_OK	指示文件可以被调用进程读取的标志。
W_OK	指示文件可以被调用进程写入的标志。
X_OK	指示文件可以被调用进程执行的标志。 这在 Windows 上不起作用（行为类似于 fs.constants.F_OK）。
*/

// 判断是否为文件
exports.existFile = function (path) {
  try {
    fs.accessSync(path, fs.constants.F_OK);
    return fs.statSync(path).isFile();
  } catch (err) {
    return false;
  }
};
