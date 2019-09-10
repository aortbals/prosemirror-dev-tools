"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unstated = require("unstated");

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

var GlobalStateContainer = (function(_Container) {
  _inherits(GlobalStateContainer, _Container);

  function GlobalStateContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GlobalStateContainer);

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
            (_ref =
              GlobalStateContainer.__proto__ ||
              Object.getPrototypeOf(GlobalStateContainer)).call.apply(
              _ref,
              [this].concat(args)
            )
          )),
          _this)),
        (_this.state = {
          opened: false,
          tabIndex: "state",
          defaultSize: 0.5
        }),
        (_this.toggleDevTools = function() {
          var _this$state = _this.state,
            opened = _this$state.opened,
            defaultSize = _this$state.defaultSize;

          if (opened) {
            document.querySelector("html").style.marginBottom = "";
          } else {
            var size = defaultSize * window.innerHeight;
            document.querySelector("html").style.marginBottom = size + "px";
          }

          _this.setState({ opened: !opened });
        }),
        (_this.selectTab = function() {
          var tabIndex =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : 0;

          _this.setState({ tabIndex: tabIndex });
        }),
        (_this.updateBodyMargin = function(devToolsSize) {
          var size = devToolsSize * window.innerHeight;
          document.querySelector("html").style.marginBottom = size + "px";
        }),
        _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  return GlobalStateContainer;
})(_unstated.Container);

exports.default = GlobalStateContainer;
