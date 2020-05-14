import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectEditor, setDragging, setCanvasDraggable } from '../actions'

import { froalaBanner } from '../javascript/on_load';

import Editor from '../components/froala'
import {SketchField, Tools} from 'react-sketch';


class Canvas extends Component {
  constructor(props) {
    super(props);

    this.props.setCanvasDraggable(false);

    this.state = {
      firstClick: 0,
      editorComponents: {},
      editorIDs: [],
      drawable: false
      // draggable: false
    };
  }

  handleKeyDown = (event) => {
    // console.log("keydown")
    if ( event.keyCode === 91 || event.keyCode === 93 ){
      // console.log("key 91")
      document.documentElement.style.cursor = "grab";
      this.props.setCanvasDraggable(true);
    }
    if ( event.keyCode === 18 ){
      // console.log("key 18")
      this.setState({
        drawable: true
      })
    }
  }

  handleKeyUp = (event) => {
    if ( event.keyCode === 91 || event.keyCode === 93 ){
      document.documentElement.style.cursor = "default";
      this.props.setCanvasDraggable(false);
    }
    if ( event.keyCode === 18 ){
      this.setState({
        drawable: false
      })
    }
  }

  handleClick = (event) => {
    froalaBanner(); // temporary
    if (event.target.id === "canvas"){
      this.props.selectEditor(null)
    }
    if (this.state.firstClick === 0) {
      this.setState({
        firstClick: new Date()
      });
      setTimeout(() => {this.setState({firstClick: 0})}, 250)
    } else {
      let secondClick = new Date();
      if ((secondClick - this.state.firstClick) < 250) {
        this.doubleClick(event);
      }
    }

  }

  doubleClick = (event) => {
    if (event.target.id === "canvas" && this.props.canvasDraggable === false){
      const x = event.clientX
      const y = (event.clientY - 60)
      if ( this.state.editorIDs.length === 0) {
        this.setState({
          editorIDs: [0],
          editorComponents: {editor0: {x:x, y:y}}
        })
        this.props.selectEditor("editor0")
      } else {
        let id = (this.state.editorIDs[this.state.editorIDs.length - 1] + 1)
        let key = `editor${this.state.editorIDs[this.state.editorIDs.length - 1] + 1}`

        this.setState(prevState => ({
          editorIDs: [...prevState.editorIDs, id],
          editorComponents: {                         // object that we want to update
              ...prevState.editorComponents,          // keep all other key-value pairs
              [key]: {x:x, y:y}                       // update the value of specific key
          }
        }))
        this.props.selectEditor(key)
      }
    }
  }

  handleMouseMove = (event) => {
    // console.log(this.props.draggableEditor)
    if(this.props.draggableEditor !== null && this.props.canvasDraggable === true){
      let key = this.props.draggableEditor.key
      const x = (event.clientX - this.props.draggableEditor.xOffset)
      const y = (event.clientY - this.props.draggableEditor.yOffset)
      this.setState(prevState => ({
          editorComponents: {                         // object that we want to update
              ...prevState.editorComponents,          // keep all other key-value pairs
              [key]: {x:x, y:y}                       // update the value of specific key
          }
        }))
    }
  }

  handleMouseUp = () => {
    this.props.setDragging(null)
  }

  render(){

    let placeholderClass = ""
    let sketchFieldClass = "sketchField sketchFieldInactive"

    if (this.state.editorIDs.length > 0){
      placeholderClass = "canvas-placeholder-hidden"
    }
    if (this.state.drawable === true){
      sketchFieldClass = "sketchField"
    }



    return(
      <div>
        <div id="canvas-header">
          <h1>Froala Canvas</h1>
        </div>

        <div
          id="canvas"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          tabIndex="0"
        >
          <div id="canvas-placeholder">
            <h3 className={placeholderClass} >Double-click anywhere to begin...</h3>
          </div>
          <div id="controls">
            <p>Hold 'cmd' to drag items</p>
            <p>Hold 'alt' to draw</p>
          </div>

          <div className={sketchFieldClass} onKeyDown={this.handleKeyDown}>
            <SketchField  width='100%'
                          height='100%'
                          tool={Tools.Pencil}
                          lineColor='black'
                          lineWidth={3}/>
          </div>

          {Object.keys(this.state.editorComponents).map( editor => {
            // console.log(editor)
            return <Editor id={editor}
                           x={this.state.editorComponents[editor].x}
                           y={this.state.editorComponents[editor].y}
                           key={editor}/>
          })}
        </div>
      </div>
    )
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
    draggableEditor: reduxState.draggableEditor,
    canvasDraggable: reduxState.canvasDraggable
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Canvas);
