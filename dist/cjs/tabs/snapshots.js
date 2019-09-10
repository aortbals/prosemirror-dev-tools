"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.SnapshotsList = SnapshotsList;
exports.default = SnapshotsTabContainer;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _unstated = require("unstated");

var _editor = require("../state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _splitView = require("../components/split-view");

var _list = require("../components/list");

var _infoPanel = require("../components/info-panel");

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

var ActionButton = (0, _reactEmotion2.default)("button")({
  padding: "6px 10px",
  fontWeight: 400,
  letterSpacing: "1px",
  fontSize: "11px",
  color: _theme2.default.white80,
  background: _theme2.default.white10,
  textTransform: "uppercase",
  transition: "background 0.3s, color 0.3s",
  borderRadius: "2px",
  border: "none",

  "& + &": {
    marginLeft: "4px"
  },

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
ActionButton.displayName = "ActionButton";

var ListItem = (0, _reactEmotion2.default)("div")({
  height: "24px",
  lineHeight: "24px",
  display: "flex",
  width: "100%"
});
ListItem.displayName = "ListItem";

var ListItemTitle = (0, _reactEmotion2.default)("div")({
  flexGrow: 1
});
ListItemTitle.displayName = "ListItemTitle";

function SnapshotsList(_ref) {
  var snapshots = _ref.snapshots,
    deleteSnapshot = _ref.deleteSnapshot,
    loadSnapshot = _ref.loadSnapshot;

  return _react2.default.createElement(_list.List, {
    getKey: function getKey(item) {
      return item.name + item.timestamp;
    },
    items: snapshots,
    title: function title(item) {
      return _react2.default.createElement(
        ListItem,
        null,
        _react2.default.createElement(ListItemTitle, null, item.name),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            ActionButton,
            {
              onClick: function onClick() {
                return deleteSnapshot(item);
              }
            },
            "delete"
          ),
          _react2.default.createElement(
            ActionButton,
            {
              onClick: function onClick() {
                return loadSnapshot(item);
              }
            },
            "restore"
          )
        )
      );
    }
  });
}

var SnapshotTab = (function(_React$Component) {
  _inherits(SnapshotTab, _React$Component);

  function SnapshotTab() {
    _classCallCheck(this, SnapshotTab);

    return _possibleConstructorReturn(
      this,
      (SnapshotTab.__proto__ || Object.getPrototypeOf(SnapshotTab)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(SnapshotTab, [
    {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return this.props.snapshots !== nextProps.snapshots;
      }
    },
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          snapshots = _props.snapshots,
          loadSnapshot = _props.loadSnapshot,
          deleteSnapshot = _props.deleteSnapshot;

        return _react2.default.createElement(
          _splitView.SplitView,
          null,
          _react2.default.createElement(
            _splitView.SplitViewCol,
            { noPaddings: true, grow: true },
            snapshots && snapshots.length
              ? _react2.default.createElement(SnapshotsList, {
                  snapshots: snapshots,
                  loadSnapshot: loadSnapshot,
                  deleteSnapshot: deleteSnapshot
                })
              : _react2.default.createElement(
                  _infoPanel.InfoPanel,
                  null,
                  'No saved snapshots yet. Press "Save Snapshot" button to add one.'
                )
          )
        );
      }
    }
  ]);

  return SnapshotTab;
})(_react2.default.Component);

function SnapshotsTabContainer() {
  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_editor2.default] },
    function(_ref2) {
      var snapshots = _ref2.state.snapshots,
        loadSnapshot = _ref2.loadSnapshot,
        deleteSnapshot = _ref2.deleteSnapshot;

      return _react2.default.createElement(SnapshotTab, {
        snapshots: snapshots,
        loadSnapshot: loadSnapshot,
        deleteSnapshot: deleteSnapshot
      });
    }
  );
}
