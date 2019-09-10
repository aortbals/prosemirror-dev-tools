"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodePickerTrigger = exports.NodePicker = undefined;

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

var _theme = require("../../theme");

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

var icon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAQAAAACNCElAAAAxklEQVRIx+2Vuw3DMAxEXWUD9VrKvTYJRzAygWpPkSVcBlDtJS6Fg8AQqQ+lAEECXU08iid+pmnoTwWDKzbU6IEbLnkYQaMlD9uA6iqAUArQwDBgX4T1Z+uF4Q4PB/sZmH/1e1BCRZiLhqgWKsJsYjJLUPkDEJKjvmPWwnwCtcKoW4O5VnpTFmaVb8o3LXONOiZAcI3aYe5UIFXiUmv77doOc7oUpDoozLU5iiPFqYtcW4W01LJP3FEiwzXBLG9SUBNq6Ef0BJ8IApq+rItIAAAAAElFTkSuQmCC";

var NodePickerStyled = (0, _reactEmotion2.default)("div")(
  {
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    left: 0,
    background: "rgba(0, 0, 255, 0.3)",
    zIndex: 99999,
    cursor: "pointer"
  },
  function(_ref) {
    var nodePicker = _ref.nodePicker;
    return {
      transform:
        "translateX(" +
        nodePicker.left +
        "px) translateY(" +
        nodePicker.top +
        "px)",
      display: nodePicker.top && nodePicker.left ? "block" : "none",
      width: nodePicker.width + "px",
      height: nodePicker.height + "px"
    };
  }
);
NodePickerStyled.displayName = "NodePickerStyled";

var NodePicker = (function(_React$Component) {
  _inherits(NodePicker, _React$Component);

  function NodePicker() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, NodePicker);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret =
        ((_temp =
          ((_this = _possibleConstructorReturn(
            this,
            (_ref2 =
              NodePicker.__proto__ ||
              Object.getPrototypeOf(NodePicker)).call.apply(
              _ref2,
              [this].concat(args)
            )
          )),
          _this)),
        (_this.handleMouseMove = function(e) {
          if (!_this.props.nodePicker.active) return;
          _this.props.onMouseMove(e.target);
        }),
        (_this.handleNodeClick = function(e) {
          if (!_this.props.nodePicker.active) return;
          e.preventDefault();
          _this.props.onSelect(e.target);
        }),
        (_this.closePicker = function() {
          if (!_this.props.nodePicker.active) return;
          _this.props.onClose();
        }),
        _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(NodePicker, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.nodePicker.active) {
          this.initEventHandlers();
        }
      }
    },
    {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.destroyEventHandlers();

        if (nextProps.nodePicker.active) {
          this.initEventHandlers();
        }
      }
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.destroyEventHandlers();
      }
    },
    {
      key: "initEventHandlers",
      value: function initEventHandlers() {
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("click", this.handleNodeClick);
        document.addEventListener("keydown", this.closePicker);
      }
    },
    {
      key: "destroyEventHandlers",
      value: function destroyEventHandlers() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("click", this.handleNodeClick);
        document.removeEventListener("keydown", this.closePicker);
      }
    },
    {
      key: "render",
      value: function render() {
        return _react2.default.createElement(NodePickerStyled, {
          nodePicker: this.props.nodePicker
        });
      }
    }
  ]);

  return NodePicker;
})(_react2.default.Component);

var NodePickerTrigger = (0, _reactEmotion2.default)("div")(
  {
    position: "absolute",
    right: "4px",
    top: "-28px",
    width: "24px",
    height: "24px",
    borderRadius: "3px",

    "&:hover": {
      backgroundColor: _theme2.default.main80,
      cursor: "pointer"
    }
  },
  function(_ref3) {
    var isActive = _ref3.isActive;
    return {
      background:
        (isActive ? _theme2.default.main : _theme2.default.main60) +
        ' url("' +
        icon +
        '")',
      backgroundSize: "20px 20px",
      backgroundRepeat: "none",
      backgroundPosition: "50% 50%"
    };
  }
);
NodePickerTrigger.displayName = "NodePickerTrigger";

exports.NodePicker = NodePicker;
exports.NodePickerTrigger = NodePickerTrigger;
