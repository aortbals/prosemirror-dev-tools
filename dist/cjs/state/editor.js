"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSafeIndex = calculateSafeIndex;
exports.buildColors = buildColors;
exports.findPMNode = findPMNode;
exports.getActiveMarks = getActiveMarks;
exports.buildSelection = buildSelection;
exports.createHistoryEntry = createHistoryEntry;
exports.shrinkEditorHistory = shrinkEditorHistory;
exports.updateEditorHistory = updateEditorHistory;

var _prosemirrorModel = require("prosemirror-model");

var _unstated = require("unstated");

var _jsondiffpatch = require("jsondiffpatch");

var _html = require("html");

var _subscribeOnUpdates = require("../utils/subscribe-on-updates");

var _subscribeOnUpdates2 = _interopRequireDefault(_subscribeOnUpdates);

var _findNode = require("../utils/find-node");

var _findNode2 = _interopRequireDefault(_findNode);

var _getEditorState = require("./get-editor-state");

var _getEditorState2 = _interopRequireDefault(_getEditorState);

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

var NODE_PICKER_DEFAULT = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  active: false
};
var HISTORY_SIZE = 200;
var SNAPSHOTS_KEY = "prosemirror-dev-tools-snapshots";
var nodesColors = [
  "#EA7C7F", // red
  "#67B0C6", // cyan 400
  "#94BB7F", // green
  "#CA9EDB", // deep purple
  "#DCDC5D", // lime
  "#B9CC7C", // light green
  "#DD97D8", // purple
  "#FFB761", // orange
  "#4D8FD1", // light blue
  "#F36E98", // pink
  "#E45F44", // deep orange
  "#A6A4AE", // blue grey
  "#FCC047", // yellow
  "#FFC129", // amber
  "#D3929C", // can can
  "#4CBCD4", // cyan
  "#8D7BC0" // indigo
];

var diff = new _jsondiffpatch.DiffPatcher({
  arrays: { detectMove: false },
  textDiff: { minLength: 1 }
});

function calculateSafeIndex(index, total) {
  var quotient = index / total;
  return Math.round(total * (quotient - Math.floor(quotient)));
}

function buildColors(schema) {
  return Object.keys(schema.nodes).reduce(function(acc, node, index) {
    var safeIndex =
      index >= nodesColors.length
        ? calculateSafeIndex(index, nodesColors.length)
        : index;

    acc[node] = nodesColors[safeIndex];
    return acc;
  }, {});
}

function findPMNode(domNode) {
  var node = void 0;
  var target = domNode;

  while (!node && target) {
    if (target.pmViewDesc) {
      node = target;
    }
    target = target.parentNode;
  }

  return node;
}

function getActiveMarks(editorState) {
  var selection = editorState.selection;
  var marks = [];

  if (selection.empty) {
    marks = selection.storedMarks || selection.$from.marks();
  } else {
    editorState.doc.nodesBetween(selection.from, selection.to, function(node) {
      marks = marks.concat(node.marks);
    });
  }

  marks = marks
    .reduce(function(acc, mark) {
      if (acc.indexOf(mark) === -1) {
        acc.push(mark);
      }
      return acc;
    }, [])
    .map(function(m) {
      return m.toJSON();
    });

  return marks;
}

function buildSelection(selection) {
  return {
    type: selection.type,
    empty: selection.empty,
    anchor: selection.anchor,
    head: selection.head,
    from: selection.from,
    to: selection.to
  };
}

function createHistoryEntry(prevState, editorState) {
  var serializer = _prosemirrorModel.DOMSerializer.fromSchema(
    editorState.schema
  );
  var selection = editorState.selection;
  var domFragment = serializer.serializeFragment(selection.content().content);

  var selectionContent = [];
  if (domFragment) {
    var child = domFragment.firstChild;
    while (child) {
      selectionContent.push(child.outerHTML);
      child = child.nextSibling;
    }
  }

  return {
    state: editorState,
    timestamp: Date.now(),
    diff:
      prevState && diff.diff(prevState.doc.toJSON(), editorState.doc.toJSON()),
    selection:
      prevState &&
      diff.diff(buildSelection(prevState.selection), buildSelection(selection)),
    selectionContent: (0, _html.prettyPrint)(selectionContent.join("\n"), {
      max_char: 60,
      indent_size: 2
    })
  };
}

function shrinkEditorHistory(history, historyRolledBackTo) {
  var startIndex = historyRolledBackTo !== false ? historyRolledBackTo : 0;
  return history.slice(startIndex, HISTORY_SIZE);
}

function updateEditorHistory(history, historyRolledBackTo, tr, newState) {
  var skipHistory = tr.getMeta("_skip-dev-tools-history_");

  if (skipHistory) return;

  var newHistory = shrinkEditorHistory(history, historyRolledBackTo);
  newHistory.unshift(createHistoryEntry(history[0].state, newState));
  return newHistory;
}

var EditorStateContainer = (function(_Container) {
  _inherits(EditorStateContainer, _Container);

  function EditorStateContainer(editorView, props) {
    _classCallCheck(this, EditorStateContainer);

    var _this = _possibleConstructorReturn(
      this,
      (
        EditorStateContainer.__proto__ ||
        Object.getPrototypeOf(EditorStateContainer)
      ).call(this)
    );

    _initialiseProps.call(_this);

    _this.state = Object.assign({}, _this.state, {
      EditorState: (0, _getEditorState2.default)(props),
      view: editorView,
      state: editorView.state,
      nodeColors: buildColors(editorView.state.schema),
      history: [{ state: editorView.state, timestamp: Date.now() }]
    });

    (0, _subscribeOnUpdates2.default)(editorView, function(
      tr,
      oldState,
      newState
    ) {
      var updatedHistory = updateEditorHistory(
        _this.state.history,
        _this.state.historyRolledBackTo,
        tr,
        newState
      );

      _this.setState({
        state: newState,
        nodeColors: buildColors(newState.schema),
        activeMarks: getActiveMarks(newState),
        history: updatedHistory || _this.state.history,
        selectedHistoryItem: updatedHistory
          ? 0
          : _this.state.selectedHistoryItem,
        historyRolledBackTo: updatedHistory
          ? false
          : _this.state.historyRolledBackTo
      });
    });
    return _this;
  }

  return EditorStateContainer;
})(_unstated.Container);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {
    EditorState: function EditorState() {},
    view: null,
    state: {},
    schema: {},
    nodeColors: {},
    activeMarks: [],
    history: [],
    expandPath: [],
    historyRolledBackTo: false,
    selectedHistoryItem: 0,
    snapshots: JSON.parse(window.localStorage.getItem(SNAPSHOTS_KEY)) || [],
    nodePicker: NODE_PICKER_DEFAULT
  };

  this.activatePicker = function() {
    _this2.setState({
      nodePicker: Object.assign({}, NODE_PICKER_DEFAULT, { active: true })
    });
  };

  this.deactivatePicker = function() {
    var picker = _this2.state.nodePicker;

    if (picker.onMouseOver) {
      document.removeEventListener("mouseover", picker.onMouseOver);
    }

    if (picker.onMouseOver) {
      document.removeEventListener("click", picker.onClick);
    }

    _this2.setState({ nodePicker: NODE_PICKER_DEFAULT });
  };

  this.updateNodePickerPossition = function(target) {
    var node = findPMNode(target);

    if (
      node &&
      ((node.pmViewDesc.node && node.pmViewDesc.node.type.name !== "doc") ||
        node.pmViewDesc.mark)
    ) {
      var _node$getBoundingClie = node.getBoundingClientRect(),
        top = _node$getBoundingClie.top,
        left = _node$getBoundingClie.left,
        width = _node$getBoundingClie.width,
        height = _node$getBoundingClie.height;

      _this2.setState({
        nodePicker: {
          top: top + window.scrollY,
          left: left,
          width: width,
          height: height,
          active: true
        }
      });
    } else {
      _this2.setState({
        nodePicker: Object.assign({}, NODE_PICKER_DEFAULT, { active: true })
      });
    }
  };

  this.nodePickerSelect = function(target) {
    var node = findPMNode(target);

    if (node) {
      var editorState = _this2.state.state;
      var path = (0, _findNode2.default)(
        editorState.doc,
        editorState.doc.nodeAt(node.pmViewDesc.posAtStart)
      );

      _this2.setState({ expandPath: path });
    }

    _this2.setState({ nodePicker: NODE_PICKER_DEFAULT });
  };

  this.saveSnapshot = function() {
    var snapshotName = prompt("Enter snapshot name", Date.now());

    if (!snapshotName) return;

    var snapshots = [
      {
        name: snapshotName,
        timestamp: Date.now(),
        snapshot: _this2.state.state.doc.toJSON()
      }
    ].concat(_this2.state.snapshots);

    _this2.setState({ snapshots: snapshots });

    window.localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
  };

  this.loadSnapshot = function(snapshot) {
    var EditorState = _this2.state.EditorState;
    var editorView = _this2.state.view;
    var editorState = editorView.state;

    var newState = EditorState.create({
      schema: editorState.schema,
      plugins: editorState.plugins,
      doc: editorState.schema.nodeFromJSON(snapshot.snapshot)
    });

    _this2.setState({
      history: [createHistoryEntry(null, newState)],
      state: newState
    });

    editorView.updateState(newState);
  };

  this.deleteSnapshot = function(snapshot) {
    var snapshots = _this2.state.snapshots;
    var snapshotIndex = snapshots.indexOf(snapshot);
    snapshots.splice(snapshotIndex, 1);
    _this2.setState({ snapshots: [].concat(snapshots) });
    window.localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
  };

  this.logNodeFromJSON = function(_ref) {
    var doc = _ref.doc,
      node = _ref.node;

    var fullDoc = _this2.state.state.doc;
    var path = (0, _findNode.findNodeInJSON)(doc, node);
    if (path) {
      console.log(
        path.reduce(function(node, pathItem) {
          return node[pathItem];
        }, fullDoc)
      );
    } else {
      console.log(node);
    }
  };

  this.selectHistoryItem = function(index) {
    return _this2.setState({ selectedHistoryItem: index });
  };

  this.rollbackHistory = function(index) {
    var EditorState = _this2.state.EditorState;
    var editorState = _this2.state.history[index].state;

    var editorView = _this2.state.view;

    var newState = EditorState.create({
      schema: editorState.schema,
      plugins: editorState.plugins,
      doc: editorState.schema.nodeFromJSON(editorState.doc.toJSON())
    });

    editorView.updateState(newState);
    editorView.dom.focus();
    var tr = editorView.state.tr
      .setSelection(editorState.selection)
      .setMeta("addToHistory", false)
      .setMeta("_skip-dev-tools-history_", true);

    editorView.dispatch(tr);

    _this2.setState({
      state: newState,
      historyRolledBackTo: index
    });
  };
};

exports.default = EditorStateContainer;
