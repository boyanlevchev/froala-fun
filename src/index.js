import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import selectedEditorReducer from './reducers/selected_editor_reducer'
import setDraggingReducer from './reducers/set_dragging_reducer'
import setCanvasDraggable from './reducers/set_canvas_draggable_reducer'
const reducers = combineReducers({
  selectedEditor: selectedEditorReducer,
  draggableEditor: setDraggingReducer,
  canvasDraggable: setCanvasDraggable
});

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
