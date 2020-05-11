import React, { Component } from 'react'

import 'froala-editor/js/froala_editor.pkgd.min.js';
import  'froala-editor/js/plugins/video.min.js';
import  'froala-editor/js/plugins/image.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/video.min.css';

import { setDraggableActions, addNewTextView, setStyles, setResizeableAction } from '../javascript/on_load';

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

class Editor extends Component {

  render() {

    let style = {
      position: 'relative',
      top: '150px',
      left: '500px'
    }

    const config = {
      // events: {
      //     'focus': function () {
      //       // setStyles();
      //       // setDraggableActions();
      //       // setResizeableAction();
      //     },
      //     'contentChanged': function () {
      //       // setDraggableActions();
      //       // addNewTextView();
      //     },
      //     'mousedown': function (event) {
      //       console.log(`mousedown event target = ${event.target}`)
      //       // console.log(this.style)
      //       if (event.target.parentNode.parentNode.getAttribute("draggable") === true ) {
      //         event.target.parentNode.parentNode.setAttribute("dragging", true)
      //       }
      //     },
      //     'mouseup': function (event) {
      //       if (event.target.parentNode.parentNode.getAttribute("draggable") === true ) {
      //         event.target.setAttribute("dragging", false)
      //       }
      //     }
      //   },
      toolbarButtons: {
        'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
          },
        'moreRich': {
            'buttons': ['insertImage', 'insertVideo']
          }
      },
      autofocus: true,
      toolbarInline: true,
      height: '500',
      width: '200',
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
      <div style={style} id={this.props.id}>
        <FroalaEditor
          config={config}
        />
      </div>
    );
  }
}

export default Editor;
