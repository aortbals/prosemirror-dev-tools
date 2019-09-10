"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitViewCol = exports.SplitView = undefined;

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SplitView = (exports.SplitView = (0, _reactEmotion2.default)("div")({
  display: "flex",
  height: "100%"
}));
SplitView.displayName = "SplitView";

var SplitViewCol = (exports.SplitViewCol = (0, _reactEmotion2.default)("div")(
  {
    boxSizing: "border-box",
    height: "100%",
    overflow: "scroll"
  },
  function(_ref) {
    var grow = _ref.grow,
      sep = _ref.sep,
      noPaddings = _ref.noPaddings,
      minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth;
    return {
      flexGrow: grow ? 1 : 0,
      borderLeft: sep ? "1px solid " + _theme2.default.main20 : "none",
      padding: noPaddings ? "" : "16px 18px 18px",
      minWidth: minWidth ? minWidth + "px" : "none",
      maxWidth: maxWidth ? maxWidth + "px" : "none"
    };
  }
));
SplitViewCol.displayName = "SplitViewCol";
