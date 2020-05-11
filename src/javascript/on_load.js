// let lastZIndex = 0;

export const setStyles = () => {
  const viewWrapper = document.querySelector(".fr-wrapper");
  viewWrapper.style.position = "relative";
}

let lastViewer = null;

export const setResizeableAction = () => {

  const viewWrapper = document.querySelector(".fr-wrapper");
  viewWrapper.addEventListener("mousedown", function(e) {
    if (e.target !== viewWrapper) {
      if (e.target !== lastViewer || e.target.parentNode !== lastViewer) {
        if (lastViewer) {lastViewer.style.outline = "0"}
        if (e.target.nodeName === "P"){
          e.target.parentNode.style.outline = "1px dashed black"
          lastViewer = e.target.parentNode;
        } else {
          e.target.style.outline = "1px dashed black"
          lastViewer = e.target
        }
      }
    } else {
      if (lastViewer) {lastViewer.style.outline = "0"}
    }
  })
}

export const setDraggableActions = () => {

  // let mouseInitialY = 0;
  // let mouseInitialX = 0;
  // To get the thing to move correctly, and not jump position, you have to calculate difference between mouse position, and distance from end of box

  console.log('positions set');
  const textFields = document.querySelectorAll(".fr-view")

  textFields.forEach( textField => {
    // textField.style.padding = "0";

    textField.style.width = "fit-content";
    textField.style.minHeight = "50px";
    textField.style.position = "absolute";

    function RespondToClick(e) {
      textField.setAttribute('draggable', 'true')
      document.documentElement.style.cursor = "grabbing";
      // mouseInitialY = e.clientY;
      // mouseInitialX = e.clientX;
      // console.log('mouse pressed');
    }

    document.addEventListener('keydown', function(e){
      if ( e.keyCode === 91 || e.keyCode === 93 ) {
        // console.log('key pressed')
        document.documentElement.style.cursor = "grab";

        textField.addEventListener('mousedown', RespondToClick);

        document.addEventListener('mousemove', function(e) {
          if (textField.getAttribute('draggable')==='true') {
            // console.log("dragging");
            textField.style.left = `${e.clientX}px`
            textField.style.top = `${e.clientY}px`
            // console.log(`${e.clientX} + ${e.clientY}`)
          }
        })

        document.addEventListener('mouseup', function(e){
          textField.removeEventListener('mousedown', RespondToClick)
          textField.setAttribute('draggable', 'false')
          document.documentElement.style.cursor = "text";
          // console.log("mouse released")
        })
      };
    });

    document.addEventListener('keyup', function(e){
      if (e.keyCode === 91 || e.keyCode === 93 ) {
        // console.log('key released')
        textField.removeEventListener('mousedown', RespondToClick)
        document.documentElement.style.cursor = "text";
      }
    })
  })
}

export const addNewTextView = () => {
  let firstClick = 0;
  const viewWrapper = document.querySelector(".fr-wrapper");

  viewWrapper.addEventListener('click', function(e){
    if (firstClick === 0) {
      firstClick = new Date();
      console.log(firstClick)
      setTimeout( function() { firstClick = 0 }, 250)
    } else {
      let secondClick = new Date();
      console.log(secondClick - firstClick)
      if ((secondClick - firstClick) < 250) {
        if (e.target.className === "fr-wrapper"){
          const div = document.createElement("DIV");
          const pNode = document.createElement("P");
          const brNode = document.createElement("BR");
          pNode.setAttribute("class", "fr-tag")
          div.setAttribute("class", "fr-element fr-view");
          div.setAttribute("dir", "auto");
          div.setAttribute("contenteditable", "true");
          div.setAttribute("style", "min-height: 50px; height: min-content;position:absolute;width:fit-content; outline:1px dashed black;");
          div.setAttribute("aria-disabled", "false");
          div.setAttribute("spellcheck", "true");
          div.style.left = `${e.clientX}px`
          div.style.top = `${e.clientY}px`

          pNode.appendChild(brNode);
          div.appendChild(pNode);

          viewWrapper.appendChild(div);
          // console.log(div)
          setDraggableActions();
          if(lastViewer){lastViewer.style.outline = "0"}
          setResizeableAction();
        }
      }
    }
  })
}

//double clicking on Text area to add text feature - removing auto input when you just click.

// export default setParagraphPosition;

//onFocus shows button you can grab to drag n drop - perhaps you can add it to subscript menu as a custom button
