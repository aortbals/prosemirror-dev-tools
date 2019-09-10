"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoPanel = undefined;

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var InfoPanel = (0, _reactEmotion2.default)("div")({
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
  textAlign: "center",
  color: _theme2.default.main,
  fontSize: "14px"
});
InfoPanel.displayName = "InfoPanel";

exports.InfoPanel = InfoPanel;
