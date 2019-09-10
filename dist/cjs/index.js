"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadingWithButton = exports.HeadingButton = exports.Heading = exports.SplitViewCol = exports.SplitView = exports.JSONTree = exports.applyDevTools = undefined;

var _splitView = require("./components/split-view");

Object.defineProperty(exports, "SplitView", {
  enumerable: true,
  get: function get() {
    return _splitView.SplitView;
  }
});
Object.defineProperty(exports, "SplitViewCol", {
  enumerable: true,
  get: function get() {
    return _splitView.SplitViewCol;
  }
});

var _heading = require("./components/heading");

Object.defineProperty(exports, "Heading", {
  enumerable: true,
  get: function get() {
    return _heading.Heading;
  }
});
Object.defineProperty(exports, "HeadingButton", {
  enumerable: true,
  get: function get() {
    return _heading.HeadingButton;
  }
});
Object.defineProperty(exports, "HeadingWithButton", {
  enumerable: true,
  get: function get() {
    return _heading.HeadingWithButton;
  }
});

require("ie-array-find-polyfill");

var _es6ObjectAssign = require("es6-object-assign");

var _es6ObjectAssign2 = _interopRequireDefault(_es6ObjectAssign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _unstated = require("unstated");

var _devTools = require("./dev-tools");

var _devTools2 = _interopRequireDefault(_devTools);

var _editor = require("./state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _jsonTree = require("./components/json-tree");

var _jsonTree2 = _interopRequireDefault(_jsonTree);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var DEVTOOLS_CLASS_NAME = "__prosemirror-dev-tools__";

_es6ObjectAssign2.default.polyfill();

function createPlace() {
  var place = document.querySelector("." + DEVTOOLS_CLASS_NAME);

  if (!place) {
    place = document.createElement("div");
    place.className = DEVTOOLS_CLASS_NAME;
    document.body.appendChild(place);
  } else {
    _reactDom2.default.unmountComponentAtNode(place);
    place.innerHTML = "";
  }

  return place;
}

function applyDevTools(editorView, props) {
  var place = createPlace();
  var editorState = new _editor2.default(editorView, props);

  _reactDom2.default.render(
    _react2.default.createElement(
      _unstated.Provider,
      { inject: [editorState] },
      _react2.default.createElement(_devTools2.default, {
        customTabs: props ? props.customTabs : undefined
      })
    ),
    place
  );
}

exports.default = applyDevTools;
exports.applyDevTools = applyDevTools;
exports.JSONTree = _jsonTree2.default;
