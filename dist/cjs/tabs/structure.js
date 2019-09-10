"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockNodeContent = BlockNodeContent;
exports.BlockNode = BlockNode;
exports.InlineNode = InlineNode;
exports.default = GraphTab;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _unstated = require("unstated");

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

var _editor = require("../state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _structureTab = require("../state/structure-tab");

var _structureTab2 = _interopRequireDefault(_structureTab);

var _splitView = require("../components/split-view");

var _jsonTree = require("../components/json-tree");

var _jsonTree2 = _interopRequireDefault(_jsonTree);

var _heading = require("./../components/heading");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var GraphWrapper = (0, _reactEmotion2.default)("div")({
  marginTop: "12px"
});
GraphWrapper.displayName = "GraphWrapper";

var BlockNodeWrapper = (0, _reactEmotion2.default)("div")({});
BlockNodeWrapper.displayName = "BlockNodeWrapper";

var BlockNodeContentView = (0, _reactEmotion2.default)("div")({
  padding: "0 12px",
  boxSizing: "border-box",
  borderLeft: "1px solid " + _theme2.default.white20,
  borderRight: "1px solid " + _theme2.default.white20
});
BlockNodeContentView.displayName = "BlockNodeContentView";

var BlockNodeContentViewWithInline = (0, _reactEmotion2.default)("div")({
  padding: "0 12px",
  display: "flex",
  width: "100%",
  boxSizing: "border-box",
  borderLeft: "1px solid " + _theme2.default.white20,
  borderRight: "1px solid " + _theme2.default.white20,
  flexWrap: "wrap"
});
BlockNodeContentViewWithInline.displayName = "BlockNodeContentViewWithInline";

var BlockNodeView = (0, _reactEmotion2.default)("div")(
  {
    width: "100%",
    marginBottom: "3px",
    boxSizing: "border-box",
    display: "flex",

    "&:hover": {
      cursor: "pointer"
    }
  },
  function(_ref) {
    var bg = _ref.bg;
    return {
      background: bg
    };
  }
);
BlockNodeView.displayName = "BlockNodeView";

var Side = (0, _reactEmotion2.default)("div")({
  padding: "3px 6px",
  background: "rgba(255, 255, 255, 0.3)"
});
Side.displayName = "Side";

var Center = (0, _reactEmotion2.default)("div")({
  flexGrow: 1,
  padding: "3px 9px",
  whiteSpace: "pre"
});
Center.displayName = "Center";

var InlineNodeView = (0, _reactEmotion2.default)("div")(
  {
    flexGrow: 1,
    marginBottom: "3px",
    display: "flex",
    boxSizing: "border-box",

    "&:hover": {
      cursor: "pointer"
    }
  },
  function(_ref2) {
    var bg = _ref2.bg;
    return {
      background: bg
    };
  }
);
InlineNodeView.displayName = "InlineNodeView";

function BlockNodeContent(props) {
  if (!props.content || !props.content.content || !props.content.content.length)
    return null;

  var content = props.content.content;

  if (content[0].isBlock) {
    var _startPos = props.startPos + 1;
    return _react2.default.createElement(
      BlockNodeContentView,
      null,
      content.map(function(childNode, index) {
        var pos = _startPos;
        _startPos += childNode.nodeSize;
        return _react2.default.createElement(BlockNode, {
          key: index,
          node: childNode,
          colors: props.colors,
          onNodeSelected: props.onNodeSelected,
          startPos: pos
        });
      })
    );
  }

  var startPos = props.startPos;
  return _react2.default.createElement(
    BlockNodeContentViewWithInline,
    null,
    content.map(function(childNode, index) {
      var pos = startPos;
      startPos += childNode.nodeSize;
      return _react2.default.createElement(InlineNode, {
        key: index,
        index: index,
        node: childNode,
        bg: props.colors[childNode.type.name],
        onNodeSelected: props.onNodeSelected,
        startPos: pos
      });
    })
  );
}

function BlockNode(props) {
  var colors = props.colors,
    node = props.node,
    startPos = props.startPos;

  var color = colors[node.type.name];
  return _react2.default.createElement(
    BlockNodeWrapper,
    null,
    _react2.default.createElement(
      BlockNodeView,
      {
        bg: color,
        onClick: function onClick() {
          return props.onNodeSelected({ node: node });
        }
      },
      _react2.default.createElement(Side, null, startPos),
      _react2.default.createElement(Center, null, node.type.name),
      _react2.default.createElement(Side, null, startPos + node.nodeSize - 1)
    ),
    _react2.default.createElement(BlockNodeContent, {
      content: node.content,
      colors: colors,
      onNodeSelected: props.onNodeSelected,
      startPos: startPos
    })
  );
}

function InlineNode(props) {
  var node = props.node,
    bg = props.bg,
    startPos = props.startPos,
    index = props.index;

  var marks =
    node.marks.length === 1
      ? " - [" + node.marks[0].type.name + "]"
      : node.marks.length > 1
      ? " - [" + node.marks.length + " marks]"
      : "";
  return _react2.default.createElement(
    InlineNodeView,
    {
      onClick: function onClick() {
        return props.onNodeSelected({ node: node });
      },
      bg: bg
    },
    index === 0 ? _react2.default.createElement(Side, null, startPos) : null,
    _react2.default.createElement(Center, null, node.type.name, " ", marks),
    _react2.default.createElement(Side, null, startPos + node.nodeSize)
  );
}

function GraphTab() {
  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_editor2.default, _structureTab2.default] },
    function(editorState, structureTabState) {
      var _editorState$state = editorState.state,
        state = _editorState$state.state,
        nodeColors = _editorState$state.nodeColors;
      var selectedNode = structureTabState.state.selectedNode;

      var selected = selectedNode ? selectedNode : state.doc;

      return _react2.default.createElement(
        _splitView.SplitView,
        null,
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { grow: true },
          _react2.default.createElement(_heading.Heading, null, "Current Doc"),
          _react2.default.createElement(
            GraphWrapper,
            null,
            _react2.default.createElement(BlockNode, {
              colors: nodeColors,
              node: state.doc,
              startPos: 0,
              onNodeSelected: structureTabState.selectNode
            })
          )
        ),
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { sep: true, minWidth: 200, maxWidth: 300 },
          _react2.default.createElement(
            _heading.HeadingWithButton,
            null,
            _react2.default.createElement(_heading.Heading, null, "Node Info"),
            _react2.default.createElement(
              _heading.HeadingButton,
              {
                onClick: function onClick() {
                  return console.log(selected);
                }
              },
              "Log Node"
            )
          ),
          _react2.default.createElement(_jsonTree2.default, {
            data: selected.toJSON(),
            hideRoot: true,
            shouldExpandNode: function shouldExpandNode() {
              return selected.type.name !== "doc" ? true : false;
            }
          })
        )
      );
    }
  );
}
