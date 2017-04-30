'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React;
var ReactDOM;
var $;

// ---------- HELPERS ----------
//
// renderReplace = function(reactNode, target) {
//   const temp = document.createElement("div");
//   ReactDOM.render(reactNode, temp);
//   const container = document.getElementById("container");
//   container.replaceChild(temp.querySelector("#destination"), document.getElementById("destination"));
// };

var overalIdx = 0;
var worksFlattened = [];

for (var colIdx in works) {
  for (var rowIdx in works[colIdx]) {
    if (works[colIdx][rowIdx].invisible !== true) {
      works[colIdx][rowIdx].index = overalIdx;
      overalIdx++;
      worksFlattened.push(works[colIdx][rowIdx]);
    }
  }
}

var PictureThumbnails = (function (_React$Component) {
  _inherits(PictureThumbnails, _React$Component);

  function PictureThumbnails(props) {
    _classCallCheck(this, PictureThumbnails);

    _get(Object.getPrototypeOf(PictureThumbnails.prototype), 'constructor', this).call(this, props);
  }

  _createClass(PictureThumbnails, [{
    key: 'thumbnailClick',
    value: function thumbnailClick(row) {
      this.props.browser.setState({ index: row.index });
      return false;
    }
  }, {
    key: 'computeStyle',
    value: function computeStyle(row) {
      var style = {};
      style.height = row.thumbnailHeight + 'px';
      if (row.thumbnailColor) {
        style.backgroundColor = row.thumbnailColor;
      } else if (row.thumbnail) {
        style.backgroundImage = 'url(' + row.thumbnail + ')';
      }
      if (row.spanRight === true) {
        style.width = 'calc(200% + 5px)';
        style.position = 'relative';
        style.zIndex = 1;
      }
      if (row.invisible === true) {
        style.visibility = 'hidden';
      }
      return style;
    }
  }, {
    key: 'renderColumnElements',
    value: function renderColumnElements(column, colIdx) {
      var _this = this;

      return column.map(function (row, idx) {
        return React.createElement('a', { key: 'item' + colIdx + '-' + idx,
          href: '#',
          className: "single-work",
          style: _this.computeStyle(row),
          onClick: function () {
            return _this.thumbnailClick(row);
          } });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        ' ',
        this.props.works.map(function (column, idx) {
          return React.createElement(
            'div',
            { key: 'col' + idx, className: 'works-body-column' },
            _this2.renderColumnElements(column, idx)
          );
        }),
        ' '
      );
    }
  }]);

  return PictureThumbnails;
})(React.Component);

var PictureBrowser = (function (_React$Component2) {
  _inherits(PictureBrowser, _React$Component2);

  function PictureBrowser(props) {
    _classCallCheck(this, PictureBrowser);

    _get(Object.getPrototypeOf(PictureBrowser.prototype), 'constructor', this).call(this, props);
    this.state = { index: null };
  }

  // ---------- RENDERS ----------

  _createClass(PictureBrowser, [{
    key: 'isFirst',
    value: function isFirst() {
      return this.state.index === 0;
    }
  }, {
    key: 'isList',
    value: function isList() {
      return this.state.index === worksFlattened.length - 1;
    }
  }, {
    key: 'previous',
    value: function previous() {
      this.setState({ index: this.state.index - 1 });
    }
  }, {
    key: 'next',
    value: function next() {
      this.setState({ index: this.state.index + 1 });
    }
  }, {
    key: 'exit',
    value: function exit() {
      this.setState({ index: null });
    }
  }, {
    key: 'showFullscreenViewer',
    value: function showFullscreenViewer() {
      var _this3 = this;

      $('#works-scroller').removeClass("hidden");
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { id: 'controllers-wrapper' },
          React.createElement(
            'a',
            { href: '#', onClick: this.isFirst() ? null : function () {
                return _this3.previous();
              } },
            React.createElement('img', { style: this.isFirst() ? { opacity: 0.2 } : {}, src: 'images/works-browser-left.svg' })
          ),
          React.createElement(
            'a',
            { href: '#', onClick: function () {
                return _this3.exit();
              } },
            React.createElement('img', { src: 'images/works-browser-exit.svg' })
          ),
          React.createElement(
            'a',
            { href: '#', onClick: this.isList() ? null : function () {
                return _this3.next();
              } },
            React.createElement('img', { style: this.isList() ? { opacity: 0.2 } : {}, src: 'images/works-browser-right.svg' })
          )
        ),
        React.createElement('img', { onClick: function () {
            return _this3.exit();
          }, src: worksFlattened[this.state.index].picture })
      );
    }
  }, {
    key: 'hideFullscreenViewer',
    value: function hideFullscreenViewer() {
      $('#works-scroller').addClass("hidden");
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.index !== null ? this.showFullscreenViewer() : this.hideFullscreenViewer();
    }
  }]);

  return PictureBrowser;
})(React.Component);

var pictureBrowser = ReactDOM.render(React.createElement(PictureBrowser, null), document.getElementById('works-scroller'));

ReactDOM.render(React.createElement(PictureThumbnails, { works: works, browser: pictureBrowser }), document.getElementById('works-body'));