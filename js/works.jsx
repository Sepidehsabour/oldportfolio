---
---
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

class PictureThumbnails extends React.Component {
  constructor(props) {
    super(props);
  }
  thumbnailClick(row) {
    this.props.browser.setState({ index: row.index });
    return false;
  }
  computeStyle(row) {
    var style = {};
    style.height = `${row.thumbnailHeight}px`;
    if (row.thumbnailColor) {
      style.backgroundColor = row.thumbnailColor;
    } else if (row.thumbnail) {
      style.backgroundImage = `url(${row.thumbnail})`;
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
  renderColumnElements(column, colIdx) {
    return column.map((row, idx) => {
        return (
          <a key={`item${colIdx}-${idx}`}
             href="#"
             className={"single-work"}
             style={this.computeStyle(row)}
             onClick={() => this.thumbnailClick(row)}>
          </a>
        );
    });
  }
  render() {
    return (
      <div> {
        this.props.works.map((column, idx) => (
          <div key={`col${idx}`}  className="works-body-column">
            { this.renderColumnElements(column, idx) }
          </div>
        ))
      } </div>
    )
  }
}

class PictureBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: null };
  }
  isFirst() {
    return this.state.index === 0;
  }
  isList() {
    return this.state.index === (worksFlattened.length - 1);
  }
  previous() {
    this.setState({ index: this.state.index - 1 });
  }
  next() {
    this.setState({ index: this.state.index + 1 });
  }
  exit() {
    this.setState({ index: null });
  }
  showFullscreenViewer() {
    $('#works-scroller').removeClass("hidden");
    $('body').css('overflow','hidden');
    return (
      <div>
        <div id="controllers-wrapper">
          <a href="#" onClick={this.isFirst() ? null : () => this.previous()}>
            <img style={this.isFirst() ? {opacity: 0.2} : {}} src="images/works-browser-left.svg"/>
          </a>
          <a href="#" onClick={() => this.exit()}>
            <img src="images/works-browser-exit.svg"/>
          </a>
          <a href="#" onClick={this.isList() ? null : () => this.next()}>
            <img style={this.isList() ? {opacity: 0.2} : {}} src="images/works-browser-right.svg"/>
          </a>
        </div>
        <img onClick={() => this.exit()} src={worksFlattened[this.state.index].picture} />
      </div>
    );
  }
  hideFullscreenViewer() {
    $('#works-scroller').addClass("hidden");
    $('body').css('overflow','auto');
    return null;
  }
  render() {
    return (this.state.index !== null) ? this.showFullscreenViewer() : this.hideFullscreenViewer();
  }
}

// ---------- RENDERS ----------

const pictureBrowser = ReactDOM.render(
  <PictureBrowser />,
  document.getElementById('works-scroller')
);

ReactDOM.render(
  <PictureThumbnails works={works} browser={pictureBrowser} />,
  document.getElementById('works-body')
);