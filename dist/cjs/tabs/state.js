"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldExpandNode = undefined;
exports.getItemString = getItemString;
exports.default = StateTab;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _unstated = require("unstated");

var _editor = require("../state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _stateTab = require("../state/state-tab");

var _stateTab2 = _interopRequireDefault(_stateTab);

var _formatSelectionObject = require("./../utils/format-selection-object");

var _splitView = require("../components/split-view");

var _jsonTree = require("../components/json-tree");

var _jsonTree2 = _interopRequireDefault(_jsonTree);

var _heading = require("./../components/heading");

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var JSONTreeWrapper = (0, _reactEmotion2.default)("div")({
  padding: "0 0 9px 0",
  overflow: "hidden"
});
JSONTreeWrapper.displayName = "JSONTreeWrapper";

var Section = (0, _reactEmotion2.default)("div")({
  minWidth: "180px",
  boxSizing: "border-box",

  "& + &": {
    paddingTop: "9px"
  }
});
Section.displayName = "Section";

var Group = (0, _reactEmotion2.default)("div")({
  margin: "0.5em 0px 0.5em 1em"
});
Group.displayName = "Group";

var GroupRow = (0, _reactEmotion2.default)("div")({
  paddingTop: "0.25em"
});
GroupRow.displayName = "GroupRow";

var Key = (0, _reactEmotion2.default)("span")({
  display: "inline-block",
  color: _theme2.default.syntax.base0D,
  margin: "0px 0.5em 0px 0px"
});
Key.displayName = "Key";

var ValueNum = (0, _reactEmotion2.default)("span")({
  color: _theme2.default.syntax.base09
});
ValueNum.displayName = "ValueNum";

var LogNodeButton = (0, _reactEmotion2.default)("button")({
  color: _theme2.default.white60,
  background: "none",
  border: "none",
  transition: "background 0.3s, color 0.3s",
  borderRadius: "3px",

  "&:hover": {
    cursor: "pointer",
    background: _theme2.default.main40,
    color: _theme2.default.white
  },

  "&:focus": {
    outline: "none"
  }
});
LogNodeButton.displayName = "LogNodeButton";

function getItemString(doc, action) {
  return function getItemStringWithBindedDoc(
    type,
    value,
    defaultView,
    keysCount
  ) {
    var logButton = _react2.default.createElement(
      LogNodeButton,
      {
        onClick: function onClick(e) {
          e.preventDefault();
          e.stopPropagation();
          action({ doc: doc, node: value });
        }
      },
      "log"
    );

    if (type === "Object" && value.type) {
      return _react2.default.createElement(
        "span",
        null,
        "{} ",
        value.type,
        " ",
        logButton
      );
    }

    return _react2.default.createElement(
      "span",
      null,
      defaultView,
      " ",
      keysCount,
      " ",
      logButton
    );
  };
}

function getItemStringForMark(type, value, defaultView, keysCount) {
  if (type === "Object" && value.type) {
    return _react2.default.createElement("span", null, "{} ", value.type);
  }

  return _react2.default.createElement(
    "span",
    null,
    defaultView,
    " ",
    keysCount
  );
}

function _shouldExpandNode(expandPath, nodePath) {
  var path = [].concat(nodePath).reverse();

  if (!expandPath) return false;

  // Expand attrs if node has them.
  expandPath.push("attrs");

  if (path.length > expandPath.length) return false;
  if (path.join(".") === expandPath.join(".")) return true;
  if (
    path.every(function(el, idx) {
      return el === expandPath[idx];
    })
  )
    return true;
  return false;
}

exports.shouldExpandNode = _shouldExpandNode;
function StateTab() {
  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_editor2.default, _stateTab2.default] },
    function(editorState, stateTab) {
      var logNodeFromJSON = editorState.logNodeFromJSON;
      var _editorState$state = editorState.state,
        state = _editorState$state.state,
        activeMarks = _editorState$state.activeMarks,
        expandPath = _editorState$state.expandPath;
      var toggleSelection = stateTab.toggleSelection;
      var selectionExpanded = stateTab.state.selectionExpanded;

      var doc = state.doc.toJSON();

      return _react2.default.createElement(
        _splitView.SplitView,
        null,
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { grow: true },
          _react2.default.createElement(
            _heading.HeadingWithButton,
            null,
            _react2.default.createElement(
              _heading.Heading,
              null,
              "Current Doc"
            ),
            _react2.default.createElement(
              _heading.HeadingButton,
              {
                onClick: function onClick() {
                  return console.log(state);
                }
              },
              "Log State"
            )
          ),
          _react2.default.createElement(_jsonTree2.default, {
            data: doc,
            hideRoot: true,
            getItemString: getItemString(doc, logNodeFromJSON),
            shouldExpandNode: function shouldExpandNode(nodePath) {
              return _shouldExpandNode(expandPath, nodePath);
            }
          })
        ),
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { sep: true, minWidth: 220 },
          _react2.default.createElement(
            Section,
            null,
            _react2.default.createElement(
              _heading.HeadingWithButton,
              null,
              _react2.default.createElement(
                _heading.Heading,
                null,
                "Selection"
              ),
              _react2.default.createElement(
                _heading.HeadingButton,
                {
                  onClick: function onClick() {
                    return toggleSelection();
                  }
                },
                selectionExpanded ? "▼" : "▶"
              )
            ),
            _react2.default.createElement(
              JSONTreeWrapper,
              null,
              _react2.default.createElement(_jsonTree2.default, {
                data: selectionExpanded
                  ? (0, _formatSelectionObject.expandedStateFormatSelection)(
                      state.selection
                    )
                  : (0, _formatSelectionObject.collapsedStateFormatSelection)(
                      state.selection
                    ),
                hideRoot: true
              })
            )
          ),
          _react2.default.createElement(
            Section,
            null,
            _react2.default.createElement(
              _heading.Heading,
              null,
              "Active Marks"
            ),
            _react2.default.createElement(
              JSONTreeWrapper,
              null,
              activeMarks.length
                ? _react2.default.createElement(_jsonTree2.default, {
                    data: activeMarks,
                    hideRoot: true,
                    getItemString: getItemStringForMark
                  })
                : _react2.default.createElement(
                    Group,
                    null,
                    _react2.default.createElement(
                      GroupRow,
                      null,
                      _react2.default.createElement(
                        Key,
                        null,
                        "no active marks"
                      )
                    )
                  )
            )
          ),
          _react2.default.createElement(
            Section,
            null,
            _react2.default.createElement(
              _heading.Heading,
              null,
              "Document Stats"
            ),
            _react2.default.createElement(
              Group,
              null,
              _react2.default.createElement(
                GroupRow,
                null,
                _react2.default.createElement(Key, null, "nodeSize:"),
                _react2.default.createElement(
                  ValueNum,
                  null,
                  state.doc.nodeSize
                )
              ),
              _react2.default.createElement(
                GroupRow,
                null,
                _react2.default.createElement(Key, null, "childCount:"),
                _react2.default.createElement(
                  ValueNum,
                  null,
                  state.doc.childCount
                )
              )
            )
          )
        )
      );
    }
  );
}
