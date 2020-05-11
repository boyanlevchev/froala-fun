import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Editor from './froala'

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstClick: 0,
      objectID: []
    };
  }

  handleKeyDown = (event) => {
    console.log("keydown")
    if ( event.keyCode === 91 || event.keyCode === 93 ){
      console.log("key 91")
      document.documentElement.style.cursor = "grab";
      event.target.childNodes.forEach( child => {
        child.setAttribute("draggable", true)
      })
    }
  }

  handleKeyUp = (event) => {
    if ( event.keyCode === 91 || event.keyCode === 93 ){
      document.documentElement.style.cursor = "default";
      event.target.childNodes.forEach( child => {
        child.setAttribute("draggable", false)
      })
    }
  }

  handleClick = (event) => {
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
    if ( this.state.objectID.last === null ) {
      this.setState({
        objectID: [0]
      })
    } else {
      this.setState( prevState => ({
        objectID: [...prevState.objectID, this.state.objectID.last + 1]
      }))
    }
  }

  render(){
    return(
      <div>
        <div>
          <h1>Double click anywhere below to get started</h1>
        </div>
        <div className="canvas" onClick={this.handleClick} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex="0">
          {this.state.objectID.map( id => {

            return <Editor id={id} />
          })}
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    setFlats: setFlats },
    dispatch
  );
}

function mapReduxStateToProps(reduxState) {
  return {
    flats: reduxState.flats
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Canvas);
