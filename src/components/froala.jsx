import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectEditor, setDragging, setCanvasDraggable } from '../actions'

import FroalaEditor from 'react-froala-wysiwyg';

import  'froala-editor/js/froala_editor.pkgd.min.js';
import  'froala-editor/js/plugins/image.min.js';
import  'froala-editor/js/plugins/video.min.js';
import  'froala-editor/js/plugins/colors.min.js';
import  'froala-editor/js/plugins/emoticons.min.js';
import  'froala-editor/js/plugins/font_family.min.js';
import  'froala-editor/js/plugins/font_size.min.js';
import  'froala-editor/js/plugins/line_height.min.js';
import  'froala-editor/js/plugins/lists.min.js';
import  'froala-editor/js/plugins/align.min.js';




// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/video.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';

import { froalaBanner } from '../javascript/on_load';

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstClick: 0,
      editorComponents: {},
      editorIDs: []
    };
  }

  handleClick = () => {
    this.props.selectEditor(this.props.id)
  }

  handleMouseDown = (event) => {
    this.props.selectEditor(this.props.id)
    const yOffset = (event.clientY-this.props.y)
    const xOffset = (event.clientX-this.props.x)
    this.props.setDragging({key: this.props.id, yOffset: yOffset, xOffset: xOffset})
  }

  render() {

    let editorClass = "editor"

    if (this.props.id === this.props.selectedEditor){
      editorClass = "editor selected-editor"
    }
    // console.log(`${this.props.selectedEditor} = ${this.props.id}`)
    // console.log(editorClass)

    let style = {
      position: 'absolute',
      top: `${this.props.y}px`,
      left: `${this.props.x}px`,
      minWidth: '150px'
    }

    const config = {
      events: {
        'initialized': function () {
          setTimeout(froalaBanner(), 100);
        },
        'click': (e) => {
          this.handleClick(e);
          this.props.setDragging(null);
        },
        'mousedown': (e) => {
          this.handleMouseDown(e);
        },
        'mouseup': (e) => {
          // console.log("should be null now...")

        },
        'keydown': (e) => {
          if ( e.keyCode === 91 || e.keyCode === 93 ){
            this.props.setCanvasDraggable(true);
          }
          // this.props.setDragging(null);
        },
        'keyup': (e) => {
          this.props.setCanvasDraggable(false);
          // this.props.setDragging(null);
        }
      },
      toolbarButtons: {
        'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
          },
        'moreParagraph': {
            'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
          },
        'moreRich': {
            'buttons': ['insertImage', 'insertVideo','emoticons']
          }
      },
      autofocus: true,
      toolbarInline: true,
      toolbarVisibleWithoutSelection: true,
      heightMin: '30',
      // width: '150',
      charCounterCount: true,
      attribution: false,
      imageTUIOptions: {
        includeUI: {
            initMenu: "filter",
            menuBarPosition: "left",
            theme: {
              "menu.activeIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-b.svg",
              "menu.disabledIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-a.svg",
              "menu.hoverIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-c.svg",
              "menu.normalIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-d.svg",
              "submenu.activeIcon.name": "icon-c",
              "submenu.activeIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-c.svg",
              "submenu.normalIcon.name": "icon-d",
              "submenu.normalIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-d.svg"
            }
        }
      }
    }

    return (
      <div
        className={editorClass}
        style={style}
        id={this.props.id}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
      >
        <FroalaEditor
          config={config}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    selectEditor: selectEditor,
    setDragging: setDragging,
    setCanvasDraggable: setCanvasDraggable
  },
    dispatch
  );
}

function mapReduxStateToProps(reduxState) {
  return {
    selectedEditor: reduxState.selectedEditor,
    canvasDraggable: reduxState.canvasDraggable
  }
}


export default connect(mapReduxStateToProps, mapDispatchToProps)(Editor);
