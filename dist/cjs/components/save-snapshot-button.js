"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SaveSnapshotButton = (0, _reactEmotion2.default)("div")({
  position: "absolute",
  right: "32px",
  top: "-28px",
  color: _theme2.default.white,
  background: _theme2.default.main60,
  fontSize: "12px",
  lineHeight: "25px",
  padding: "0 6px",
  height: "24px",
  backgroundSize: "20px 20px",
  backgroundRepeat: "none",
  backgroundPosition: "50% 50%",
  borderRadius: "3px",

  "&:hover": {
    backgroundColor: _theme2.default.main80,
    cursor: "pointer"
  }
});
SaveSnapshotButton.displayName = "SaveSnapshotButton";

exports.default = SaveSnapshotButton;
