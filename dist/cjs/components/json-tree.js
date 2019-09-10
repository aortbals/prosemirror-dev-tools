"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

exports.default = JSONTree;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactJsonTree = require("react-json-tree");

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _theme = require("./../theme");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function JSONTree(props) {
  return _react2.default.createElement(
    _reactJsonTree2.default,
    _extends(
      {
        invertTheme: false,
        theme: _theme.jsonTreeTheme,
        hideRoot: true
      },
      props
    )
  );
}
