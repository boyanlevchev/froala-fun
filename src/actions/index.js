export function selectEditor(editor) {
  return {
    type: 'SELECT_EDITOR',
    payload: editor
  }
}

export function setDragging(editor) {
  return {
    type: 'SET_DRAGGING',
    payload: editor
  }
}

export function setCanvasDraggable(boolean) {
  return {
    type: 'SET_CANVAS_DRAGGABLE',
    payload: boolean
  }
}
