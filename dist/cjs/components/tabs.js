"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.TabPanel = exports.TabPanelStyled = exports.Tab = exports.TabStyled = exports.TabsStled = exports.TabList = undefined;

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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var TabList = (exports.TabList = (0, _reactEmotion2.default)("div")({
  display: "flex",
  listStyle: "none",
  borderBottom: "1px solid " + _theme2.default.main20
}));
TabList.displayName = "TabList";

var TabsStled = (exports.TabsStled = (0, _reactEmotion2.default)("div")({
  height: "100%",
  width: "100%"
}));
TabsStled.displayName = "TabsStyled";

var TabStyled = (exports.TabStyled = (0, _reactEmotion2.default)("div")(
  {
    color: _theme2.default.white,
    textTransform: "uppercase",
    fontSize: "13px",
    padding: "16px 24px 14px",
    boxSizing: "border-box",
    userSelect: "none",

    "&:hover": {
      cursor: "pointer",
      background: _theme2.default.white05
    },

    "&:focus": {
      outline: "none"
    }
  },
  function(props) {
    return {
      borderBottom: props.isSelected
        ? "2px solid " + _theme2.default.main
        : "none"
    };
  }
));
TabStyled.displayName = "TabStyled";

var Tab = (exports.Tab = (function(_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(
      this,
      (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments)
    );
  }

  _createClass(Tab, [
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          TabStyled,
          {
            isSelected: this.props.index === this.context.tabs.selectedIndex,
            onClick: function onClick() {
              (_this2.context.tabs.onSelect || function() {})(
                _this2.props.index
              );
            }
          },
          this.props.children
        );
      }
    }
  ]);

  return Tab;
})(_react2.default.Component));

Tab.contextTypes = {
  tabs: _propTypes2.default.object.isRequired
};

var TabPanelStyled = (exports.TabPanelStyled = (0, _reactEmotion2.default)(
  "div"
)({
  width: "100%",
  height: "calc(100% - 48px)",
  boxSizing: "border-box"
}));
TabPanelStyled.displayName = "TabPanelStyled";

var TabPanel = (exports.TabPanel = (function(_React$Component2) {
  _inherits(TabPanel, _React$Component2);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _possibleConstructorReturn(
      this,
      (TabPanel.__proto__ || Object.getPrototypeOf(TabPanel)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(TabPanel, [
    {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          TabPanelStyled,
          null,
          this.props.children({ index: this.context.tabs.selectedIndex })
        );
      }
    }
  ]);

  return TabPanel;
})(_react2.default.Component));

TabPanel.contextTypes = {
  tabs: _propTypes2.default.object.isRequired
};

var Tabs = (exports.Tabs = (function(_React$Component3) {
  _inherits(Tabs, _React$Component3);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(
      this,
      (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments)
    );
  }

  _createClass(Tabs, [
    {
      key: "getChildContext",
      value: function getChildContext() {
        return {
          tabs: {
            onSelect: this.props.onSelect,
            selectedIndex: this.props.selectedIndex
          }
        };
      }
    },
    {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          TabsStled,
          null,
          this.props.children
        );
      }
    }
  ]);

  return Tabs;
})(_react2.default.Component));

Tabs.childContextTypes = {
  tabs: _propTypes2.default.object
};
