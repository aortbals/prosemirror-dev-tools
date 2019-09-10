"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionContentSection = SelectionContentSection;
exports.DocDiffSection = DocDiffSection;
exports.SelectionSection = SelectionSection;
exports.default = HistoryView;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _unstated = require("unstated");

var _editor = require("../state/editor");

var _editor2 = _interopRequireDefault(_editor);

var _infoPanel = require("../components/info-panel");

var _heading = require("./../components/heading");

var _list = require("../components/list");

var _jsonDiff = require("../components/json-diff");

var _jsonDiff2 = _interopRequireDefault(_jsonDiff);

var _splitView = require("../components/split-view");

var _highlighter = require("../components/highlighter");

var _theme = require("../theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Section = (0, _reactEmotion2.default)("div")({
  minWidth: "180px",
  boxSizing: "border-box",

  "& + &": {
    paddingTop: "9px"
  }
});
Section.displayName = "Section";

function pad(num) {
  return ("00" + num).slice(-2);
}

function pad3(num) {
  return ("000" + num).slice(-3);
}

var formatTimestamp = function formatTimestamp(timestamp) {
  var date = new Date(timestamp);
  return [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
    pad3(date.getMilliseconds())
  ].join(":");
};

function SelectionContentSection(props) {
  if (!props.selectionContent) return null;

  return _react2.default.createElement(
    Section,
    null,
    _react2.default.createElement(_heading.Heading, null, "Selection Content"),
    _react2.default.createElement(
      _highlighter.Highlighter,
      null,
      props.selectionContent
    )
  );
}

function DocDiffSection(props) {
  if (!props.diff) return null;

  return _react2.default.createElement(
    Section,
    null,
    _react2.default.createElement(_heading.Heading, null, "Doc diff"),
    _react2.default.createElement(_jsonDiff2.default, { delta: props.diff })
  );
}

function SelectionSection(props) {
  if (!props.selection) return null;

  return _react2.default.createElement(
    Section,
    null,
    _react2.default.createElement(_heading.Heading, null, "Selection diff"),
    _react2.default.createElement(_jsonDiff2.default, {
      delta: props.selection
    })
  );
}

function HistoryView() {
  return _react2.default.createElement(
    _unstated.Subscribe,
    { to: [_editor2.default] },
    function(editorState) {
      var selectHistoryItem = editorState.selectHistoryItem,
        rollbackHistory = editorState.rollbackHistory;
      var _editorState$state = editorState.state,
        history = _editorState$state.history,
        selectedHistoryItem = _editorState$state.selectedHistoryItem,
        historyRolledBackTo = _editorState$state.historyRolledBackTo;

      var prevItem = history[selectedHistoryItem + 1];
      var selectedItem = history[selectedHistoryItem];
      var historyRolledBackToItem = history[historyRolledBackTo];
      var historyList = history
        .reduce(function(h, item, index) {
          var prev = h[h.length - 1];

          item.index = index;

          if (!item.diff) {
            if (!prev || !Array.isArray(prev)) {
              h.push([item]);
            } else {
              prev.push(item);
            }
          } else {
            h.push(item);
          }

          return h;
        }, [])
        .reduce(function(h, item) {
          if (Array.isArray(item) && item.length === 1) {
            h.push(item[0]);
          } else {
            h.push(item);
          }
          return h;
        }, []);

      var isSelected = function isSelected(item) {
        return item.timestamp === selectedItem.timestamp;
      };
      var isPrevious = function isPrevious(item) {
        return prevItem && item.timestamp === prevItem.timestamp;
      };
      var isDimmed = function isDimmed(item) {
        return (
          historyRolledBackToItem &&
          item.timestamp > historyRolledBackToItem.timestamp
        );
      };

      return _react2.default.createElement(
        _splitView.SplitView,
        null,
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { noPaddings: true, minWidth: 190 },
          _react2.default.createElement(_list.List, {
            items: historyList,
            getKey: function getKey(item) {
              return item.timestamp;
            },
            title: function title(item) {
              return formatTimestamp(item.timestamp);
            },
            groupTitle: function groupTitle(item) {
              return (
                formatTimestamp(item[0].timestamp) + (" [" + item.length + "]")
              );
            },
            isSelected: isSelected,
            isPrevious: isPrevious,
            isDimmed: isDimmed,
            customItemBackground: function customItemBackground(props) {
              return props.isSelected
                ? _theme2.default.main40
                : props.isPrevious
                ? _theme2.default.main20
                : "transparent";
            },
            onListItemClick: function onListItemClick(item) {
              return selectHistoryItem(item.index);
            },
            onListItemDoubleClick: function onListItemDoubleClick(item) {
              return rollbackHistory(item.index);
            }
          })
        ),
        _react2.default.createElement(
          _splitView.SplitViewCol,
          { grow: true, sep: true },
          _react2.default.createElement(DocDiffSection, {
            diff: selectedItem.diff
          }),
          _react2.default.createElement(SelectionSection, {
            selection: selectedItem.selection
          }),
          _react2.default.createElement(SelectionContentSection, {
            selectionContent: selectedItem.selectionContent
          }),
          !selectedItem.diff &&
            !selectedItem.selectionContent &&
            _react2.default.createElement(
              _infoPanel.InfoPanel,
              null,
              "Doc are equal."
            )
        )
      );
    }
  );
}
