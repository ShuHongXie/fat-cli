const dotenvExpand = require("dotenv-expand");

const dotenv = {
  parsed: {
    BASIC: "basic",
    BASIC_EXPAND: "${BASIC}",
    BASIC_EXPAND_SIMPLE: "$BASIC",
  },
};

const obj = dotenvExpand.expand(dotenv);

console.log(obj);
