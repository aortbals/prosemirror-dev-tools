"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DevToolsExpanded;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDock = require("react-dock");

var _reactDock2 = _interopRequireDefault(_reactDock);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _tabs = require("./components/tabs");

var _unstated = require("unstated");

var _global = require("./state/global");

var _global2 = _interopRequireDefault(_global);

var _editor = require("./state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _state = require("./tabs/state");

var _state2 = _interopRequireDefault(_state);

var _history = require("./tabs/history");

var _history2 = _interopRequireDefault(_history);

var _schema = require("./tabs/schema");

var _schema2 = _interopRequireDefault(_schema);

var _plugins = require("./tabs/plugins");

var _plugins2 = _interopRequireDefault(_plugins);

var _structure = require("./tabs/structure");

var _structure2 = _interopRequireDefault(_structure);

var _snapshots = require("./tabs/snapshots");

var _snapshots2 = _interopRequireDefault(_snapshots);

var _cssReset = require("./components/css-reset");

var _cssReset2 = _interopRequireDefault(_cssReset);

var _nodePicker = require("./components/node-picker");

var _saveSnapshotButton = require("./components/save-snapshot-button");

var _saveSnapshotButton2 = _interopRequireDefault(_saveSnapshotButton);

var _theme = require("./theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var DockContainer = (0, _reactEmotion2.default)("div")({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  background: _theme2.default.mainBg,
  fontFamily: "Helvetica Neue, Calibri Light, Roboto, sans-serif",
  fontSize: "13px"
});
DockContainer.displayName = "DockContainer";

var CloseButton = (0, _reactEmotion2.default)("button")({
  background: "none",
  border: "none",
  position: "absolute",
  right: 0,
  color: _theme2.default.white60,
  fontSize: "18px",

  "&:hover": {
    cursor: "pointer",
    background: _theme2.default.white05,
    color: _theme2.default.white
  },

  "&:focus": {
    outline: "none"
  }
});
CloseButton.displayName = "CloseButton";

var DefaultTabs = {
  state: {
    renderPanel: function renderPanel() {
      return _react2.default.createElement(_state2.default, null);
    }
  },
  history: {
    renderPanel: function renderPanel() {
      return _react2.default.createElement(_history2.default, null);
    }
  },
  plugins: {
    renderPanel: function renderPanel() {
      return _react2.default.createElement(_plugins2.default, null);
    }
  },
  schema: {
    renderPanel: function renderPanel() {
      return _react2.default.createElement(_schema2.default, null);
    }
  },
  structure: {
    renderPanel: function renderPanel() {
      return _react2.default.createElement(_structure2.default, null);
    }
  },
  snapshots: {
    renderPanel: function renderPanel() {
      return _react2.default.createElement(_snapshots2.default, null);
    }
  }
};

function DevToolsExpanded() {
  var props =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var tabsById = props.customTabs
    ? props.customTabs.reduce(function(o, t) {
        o[t.id] = t;
        return o;
      }, DefaultTabs)
    : DefaultTabs;

  function renderTabPanel(index) {
    var tab = tabsById[index];

    if (tab) {
      return tab.renderPanel();
    }

    return _react2.default.createElement(_state2.default, null);
  }

  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_global2.default] },
    function(globalState) {
      var _globalState$state = globalState.state,
        defaultSize = _globalState$state.defaultSize,
        tabIndex = _globalState$state.tabIndex;
      var toggleDevTools = globalState.toggleDevTools,
        updateBodyMargin = globalState.updateBodyMargin,
        selectTab = globalState.selectTab;

      return _react2.default.createElement(
        _cssReset2.default,
        null,
        _react2.default.createElement(
          _unstated.Subscribe,
          { to: [_editor2.default] },
          function(_ref) {
            var nodePicker = _ref.state.nodePicker,
              deactivatePicker = _ref.deactivatePicker,
              updateNodePickerPossition = _ref.updateNodePickerPossition,
              nodePickerSelect = _ref.nodePickerSelect;
            return _react2.default.createElement(_nodePicker.NodePicker, {
              nodePicker: nodePicker,
              onClose: deactivatePicker,
              onMouseMove: updateNodePickerPossition,
              onSelect: function onSelect(target) {
                nodePickerSelect(target);
                selectTab(0); // Switch to the "State" tab.
              }
            });
          }
        ),
        _react2.default.createElement(
          _reactDock2.default,
          {
            position: "bottom",
            dimMode: "none",
            isVisible: true,
            defaultSize: defaultSize,
            onSizeChange: updateBodyMargin
          },
          function() {
            return _react2.default.createElement(
              DockContainer,
              null,
              _react2.default.createElement(
                CloseButton,
                { onClick: toggleDevTools },
                "\xD7"
              ),
              _react2.default.createElement(
                _unstated.Subscribe,
                { to: [_editor2.default] },
                function(_ref2) {
                  var nodePicker = _ref2.state.nodePicker,
                    deactivatePicker = _ref2.deactivatePicker,
                    activatePicker = _ref2.activatePicker;
                  return _react2.default.createElement(
                    _nodePicker.NodePickerTrigger,
                    {
                      onClick: nodePicker.active
                        ? deactivatePicker
                        : activatePicker,
                      isActive: nodePicker.active
                    }
                  );
                }
              ),
              _react2.default.createElement(
                _unstated.Subscribe,
                { to: [_editor2.default] },
                function(_ref3) {
                  var saveSnapshot = _ref3.saveSnapshot;
                  return _react2.default.createElement(
                    _saveSnapshotButton2.default,
                    { onClick: saveSnapshot },
                    "Save Snapshot"
                  );
                }
              ),
              _react2.default.createElement(
                _tabs.Tabs,
                { onSelect: selectTab, selectedIndex: tabIndex },
                _react2.default.createElement(
                  _tabs.TabList,
                  null,
                  _react2.default.createElement(
                    _tabs.Tab,
                    { index: "state" },
                    "State"
                  ),
                  _react2.default.createElement(
                    _tabs.Tab,
                    { index: "history" },
                    "History"
                  ),
                  _react2.default.createElement(
                    _tabs.Tab,
                    { index: "plugins" },
                    "Plugins"
                  ),
                  _react2.default.createElement(
                    _tabs.Tab,
                    { index: "schema" },
                    "Schema"
                  ),
                  _react2.default.createElement(
                    _tabs.Tab,
                    { index: "structure" },
                    "Structure"
                  ),
                  _react2.default.createElement(
                    _tabs.Tab,
                    { index: "snapshots" },
                    "Snapshots"
                  ),
                  props.customTabs &&
                    props.customTabs.map(function(t) {
                      return _react2.default.createElement(
                        _tabs.Tab,
                        { key: t.id, index: t.id },
                        t.name
                      );
                    })
                ),
                _react2.default.createElement(_tabs.TabPanel, null, function(
                  _ref4
                ) {
                  var index = _ref4.index;
                  return renderTabPanel(index);
                })
              )
            );
          }
        )
      );
    }
  );
}
