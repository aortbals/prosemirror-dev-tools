"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadingButton = exports.HeadingWithButton = exports.Heading = undefined;

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Heading = (0, _reactEmotion2.default)("h2")({
  color: _theme2.default.softerMain,
  padding: 0,
  margin: 0,
  fontWeight: 400,
  letterSpacing: "1px",
  fontSize: "13px",
  textTransform: "uppercase",
  flexGrow: 1
});
Heading.displayName = "Heading";

var HeadingWithButton = (0, _reactEmotion2.default)("div")({
  display: "flex"
});
HeadingWithButton.displayName = "HeadingWithButton";

var HeadingButton = (0, _reactEmotion2.default)("button")({
  padding: "6px 10px",
  margin: "-6px -10px 0 8px",
  fontWeight: 400,
  letterSpacing: "1px",
  fontSize: "11px",
  color: _theme2.default.white80,
  textTransform: "uppercase",
  transition: "background 0.3s, color 0.3s",
  borderRadius: "2px",
  border: "none",
  background: "transparent",

  "&:hover": {
    background: _theme2.default.main40,
    color: _theme2.default.white,
    cursor: "pointer"
  },

  "&:focus": {
    outline: "none"
  },

  "&:active": {
    background: _theme2.default.main60
  }
});
HeadingButton.displayName = "HeadingButton";

exports.Heading = Heading;
exports.HeadingWithButton = HeadingWithButton;
exports.HeadingButton = HeadingButton;
