"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var CSSReset = (0, _reactEmotion2.default)("div")({
  fontSize: "100%",
  lineHeight: 1,

  "& li + li": {
    margin: 0
  }
});
CSSReset.displayName = "CSSReset";

exports.default = CSSReset;
