"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Highlighter = undefined;

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var CustomPre = (0, _reactEmotion2.default)("pre")({
  padding: "9px 0 18px 0 !important",
  margin: 0,
  color: _theme2.default.white80,
  "& .prosemirror-dev-tools-highlighter-tag": {
    color: _theme2.default.main
  }
});
CustomPre.displayName = "CustomPre";

var regexp = /(&lt;\/?[\w\d\s="']+&gt;)/gim;
var highlight = function highlight(str) {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      regexp,
      "<span class='prosemirror-dev-tools-highlighter-tag'>$&</span>"
    );
};

var Highlighter = (exports.Highlighter = (function(_React$Component) {
  _inherits(Highlighter, _React$Component);

  function Highlighter() {
    _classCallCheck(this, Highlighter);

    return _possibleConstructorReturn(
      this,
      (Highlighter.__proto__ || Object.getPrototypeOf(Highlighter)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(Highlighter, [
    {
      key: "render",
      value: function render() {
        if (!this.props.children) return null;
        return _react2.default.createElement(CustomPre, {
          dangerouslySetInnerHTML: {
            __html: highlight(this.props.children)
          }
        });
      }
    }
  ]);

  return Highlighter;
})(_react2.default.Component));
