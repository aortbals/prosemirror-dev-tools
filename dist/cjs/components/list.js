"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = undefined;

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

exports.List = List;

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

var noop = function noop() {};

var ListItem = (exports.ListItem = (0, _reactEmotion2.default)("div")(
  {
    minWidth: "190px",
    width: "100%",
    display: "flex",
    boxSizing: "border-box",
    fontWeight: 400,
    letterSpacing: "1px",
    fontSize: "11px",
    color: _theme2.default.white80,
    textTransform: "uppercase",
    transition: "background .3s",
    textAlign: "left",
    fontFamily: "monospace",
    border: "none",
    borderTop: "1px solid " + _theme2.default.main20,
    margin: 0,

    "&:first-child": {
      borderTop: "none"
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
  },
  function(props) {
    return {
      opacity: props.isDimmed ? 0.3 : 1,
      padding: props.nested ? "6px 18px 6px 36px" : "6px 18px",
      background: props.background
        ? props.background(props)
        : props.isSelected
        ? _theme2.default.main40
        : "transparent"
    };
  }
));
ListItem.displayName = "ListItem";

var ListItemGroupContent = (0, _reactEmotion2.default)("div")(
  {
    display: "block"
  },
  function(props) {
    return {
      display: props.collapsed ? "none" : "block"
    };
  }
);
ListItemGroupContent.displayName = "ListItemGroupContent";

var ListItemGroup = (function(_PureComponent) {
  _inherits(ListItemGroup, _PureComponent);

  function ListItemGroup(props) {
    _classCallCheck(this, ListItemGroup);

    var _this = _possibleConstructorReturn(
      this,
      (ListItemGroup.__proto__ || Object.getPrototypeOf(ListItemGroup)).call(
        this,
        props
      )
    );

    _this.state = { collapsed: true };
    return _this;
  }

  _createClass(ListItemGroup, [
    {
      key: "toggle",
      value: function toggle() {
        this.setState({ collapsed: !this.state.collapsed });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _props = this.props,
          items = _props.items,
          groupTitle = _props.groupTitle,
          title = _props.title,
          _props$isSelected = _props.isSelected,
          isSelected =
            _props$isSelected === undefined ? noop : _props$isSelected,
          _props$isPrevious = _props.isPrevious,
          isPrevious =
            _props$isPrevious === undefined ? noop : _props$isPrevious,
          _props$isDimmed = _props.isDimmed,
          isDimmed = _props$isDimmed === undefined ? noop : _props$isDimmed,
          _props$getKey = _props.getKey,
          getKey = _props$getKey === undefined ? noop : _props$getKey,
          _props$onListItemClic = _props.onListItemClick,
          onListItemClick =
            _props$onListItemClic === undefined ? noop : _props$onListItemClic,
          _props$onListItemDoub = _props.onListItemDoubleClick,
          onListItemDoubleClick =
            _props$onListItemDoub === undefined ? noop : _props$onListItemDoub,
          customItemBackground = _props.customItemBackground;

        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            ListItem,
            {
              key: getKey(items[0]),
              onClick: function onClick() {
                return _this2.toggle();
              },
              isSelected: items.some(isSelected) && this.state.collapsed,
              isPrevious: isPrevious(items[0], 0) && this.state.collapsed,
              isDimmed: items.every(isDimmed),
              background: customItemBackground
            },
            _react2.default.createElement(
              "div",
              { style: { flexGrow: 1 } },
              groupTitle(items, 0)
            ),
            _react2.default.createElement(
              "div",
              null,
              this.state.collapsed ? "▶" : "▼"
            )
          ),
          _react2.default.createElement(
            ListItemGroupContent,
            { collapsed: this.state.collapsed },
            (items || []).map(function(item, index) {
              return _react2.default.createElement(
                ListItem,
                {
                  key: getKey(item),
                  nested: true,
                  isSelected: isSelected(item, index),
                  isPrevious: isPrevious(item, index),
                  isDimmed: isDimmed(item, index),
                  background: customItemBackground,
                  onClick: function onClick() {
                    return onListItemClick(item, index);
                  },
                  onDoubleClick: function onDoubleClick() {
                    return onListItemDoubleClick(item, index);
                  }
                },
                title(item, index)
              );
            })
          )
        );
      }
    }
  ]);

  return ListItemGroup;
})(_react.PureComponent);

function List(props) {
  var _props$isSelected2 = props.isSelected,
    isSelected = _props$isSelected2 === undefined ? noop : _props$isSelected2,
    _props$isPrevious2 = props.isPrevious,
    isPrevious = _props$isPrevious2 === undefined ? noop : _props$isPrevious2,
    _props$isDimmed2 = props.isDimmed,
    isDimmed = _props$isDimmed2 === undefined ? noop : _props$isDimmed2,
    _props$getKey2 = props.getKey,
    getKey = _props$getKey2 === undefined ? noop : _props$getKey2,
    _props$onListItemClic2 = props.onListItemClick,
    onListItemClick =
      _props$onListItemClic2 === undefined ? noop : _props$onListItemClic2,
    _props$onListItemDoub2 = props.onListItemDoubleClick,
    onListItemDoubleClick =
      _props$onListItemDoub2 === undefined ? noop : _props$onListItemDoub2;

  return _react2.default.createElement(
    "div",
    null,
    (props.items || []).map(function(item, index) {
      if (Array.isArray(item)) {
        return _react2.default.createElement(
          ListItemGroup,
          _extends({}, props, { items: item, key: item[0].timestamp }),
          props.groupTitle(item, index)
        );
      }

      return _react2.default.createElement(
        ListItem,
        {
          key: getKey(item),
          isSelected: isSelected(item, index),
          isPrevious: isPrevious(item, index),
          isDimmed: isDimmed(item, index),
          background: props.customItemBackground,
          onClick: function onClick() {
            return onListItemClick(item, index);
          },
          onDoubleClick: function onDoubleClick() {
            return onListItemDoubleClick(item, index);
          }
        },
        props.title(item, index)
      );
    })
  );
}
