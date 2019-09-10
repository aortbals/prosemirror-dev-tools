"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueRenderer = valueRenderer;
exports.PluginState = PluginState;
exports.default = PluginsTab;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _unstated = require("unstated");

var _editor = require("../state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _pluginsTab = require("../state/plugins-tab");

var _pluginsTab2 = _interopRequireDefault(_pluginsTab);

var _infoPanel = require("../components/info-panel");

var _heading = require("./../components/heading");

var _jsonTree = require("../components/json-tree");

var _jsonTree2 = _interopRequireDefault(_jsonTree);

var _list = require("../components/list");

var _splitView = require("../components/split-view");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function valueRenderer(raw) {
  if (
    typeof (arguments.length <= 1 ? undefined : arguments[1]) === "function"
  ) {
    return "func";
  }
  return raw;
}

function PluginState(props) {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_heading.Heading, null, "Plugin State"),
    _react2.default.createElement(_jsonTree2.default, {
      data: props.pluginState,
      valueRenderer: valueRenderer
    })
  );
}

function PluginsTab() {
  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_editor2.default, _pluginsTab2.default] },
    function(editorState, pluginsTabState) {
      var state = editorState.state.state;

      var plugins = state.plugins;
      var selectedPlugin = plugins[pluginsTabState.state.selected];
      var selectedPluginState = selectedPlugin.getState(state);

      return _react2.default.createElement(
        _splitView.SplitView,
        null,
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { noPaddings: true },
          _react2.default.createElement(_list.List, {
            items: plugins,
            getKey: function getKey(plugin) {
              return plugin.key;
            },
            title: function title(plugin) {
              return plugin.key;
            },
            isSelected: function isSelected(plugin, index) {
              return pluginsTabState.state.selected === index;
            },
            isDimmed: function isDimmed(plugin) {
              return !plugin.getState(state);
            },
            onListItemClick: function onListItemClick(plugin, index) {
              return pluginsTabState.selectPlugin(index);
            }
          })
        ),
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { grow: true, sep: true },
          selectedPluginState
            ? _react2.default.createElement(PluginState, {
                pluginState: selectedPluginState
              })
            : _react2.default.createElement(
                _infoPanel.InfoPanel,
                null,
                "Plugin doesn't have any state"
              )
        )
      );
    }
  );
}
