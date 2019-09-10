"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DevTools;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _unstated = require("unstated");

var _global = require("./state/global");

var _global2 = _interopRequireDefault(_global);

var _devToolsCollapsed = require("./dev-tools-collapsed");

var _devToolsCollapsed2 = _interopRequireDefault(_devToolsCollapsed);

var _devToolsExpanded = require("./dev-tools-expanded");

var _devToolsExpanded2 = _interopRequireDefault(_devToolsExpanded);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function DevTools() {
  var props =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_global2.default] },
    function(_ref) {
      var state = _ref.state,
        toggleDevTools = _ref.toggleDevTools;
      return state.opened
        ? _react2.default.createElement(_devToolsExpanded2.default, {
            customTabs: props.customTabs
          })
        : _react2.default.createElement(_devToolsCollapsed2.default, {
            onClick: toggleDevTools
          });
    }
  );
}
