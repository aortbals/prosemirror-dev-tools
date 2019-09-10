"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaTab = undefined;

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

exports.postprocessValue = postprocessValue;
exports.default = SchemaTabContainer;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _unstated = require("unstated");

var _editor = require("../state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _splitView = require("../components/split-view");

var _jsonTree = require("../components/json-tree");

var _jsonTree2 = _interopRequireDefault(_jsonTree);

var _heading = require("./../components/heading");

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

var ignoreFields = ["schema", "contentExpr", "schema", "parseDOM", "toDOM"];

function postprocessValue(ignore, data) {
  if (!data || Object.prototype.toString.call(data) !== "[object Object]") {
    return data;
  }

  return Object.keys(data)
    .filter(function(key) {
      return ignore.indexOf(key) === -1;
    })
    .reduce(function(res, key) {
      res[key] = data[key];
      return res;
    }, {});
}

var SchemaTab = (exports.SchemaTab = (function(_React$Component) {
  _inherits(SchemaTab, _React$Component);

  function SchemaTab() {
    _classCallCheck(this, SchemaTab);

    return _possibleConstructorReturn(
      this,
      (SchemaTab.__proto__ || Object.getPrototypeOf(SchemaTab)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(SchemaTab, [
    {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return this.props.schema !== nextProps.schema;
      }
    },
    {
      key: "render",
      value: function render() {
        var schema = this.props.schema;

        return _react2.default.createElement(
          _splitView.SplitView,
          null,
          _react2.default.createElement(
            _splitView.SplitViewCol,
            { grow: true },
            _react2.default.createElement(_heading.Heading, null, "Nodes"),
            _react2.default.createElement(_jsonTree2.default, {
              data: schema.nodes,
              postprocessValue: postprocessValue.bind(null, ignoreFields)
            })
          ),
          _react2.default.createElement(
            _splitView.SplitViewCol,
            { grow: true, sep: true },
            _react2.default.createElement(_heading.Heading, null, "Marks"),
            _react2.default.createElement(_jsonTree2.default, {
              data: schema.marks,
              postprocessValue: postprocessValue.bind(null, ignoreFields)
            })
          )
        );
      }
    }
  ]);

  return SchemaTab;
})(_react2.default.Component));

function SchemaTabContainer() {
  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_editor2.default] },
    function(_ref) {
      var schema = _ref.state.state.schema;
      return _react2.default.createElement(SchemaTab, { schema: schema });
    }
  );
}
