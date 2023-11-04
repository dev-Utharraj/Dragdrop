import React, { useRef, useState, useEffect } from "react";
import '../components/DraganddropComponents.css'

const DraganddropComponents = () => {
  const divRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing) {
        const offsetX = e.clientX - startX;
        const offsetY = e.clientY - startY;

        const div = divRef.current;
        const newWidth = startWidth + offsetX;
        const newHeight = startHeight + offsetY;

        div.style.width = `${newWidth}px`;
        div.style.height = `${newHeight}px`;
      }
      if (dragging) {
        const offsetX = e.clientX - startX;
        const offsetY = e.clientY - startY;

        const div = divRef.current;
        const newLeft = startLeft + offsetX;
        const newTop = startTop + offsetY;

        div.style.left = `${newLeft}px`;
        div.style.top = `${newTop}px`;
      }
    };

    const handleMouseUp = () => {
      setResizing(false);
      setDragging(false);
    };

    if (resizing || dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, dragging, startX, startY, startLeft, startTop, startWidth, startHeight]);

  const handleMouseDown = (e) => {
    const target = e.target;

    if (target.classList.contains("resize-handle")) {
      setResizing(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
      setStartWidth(divRef.current.clientWidth);
      setStartHeight(divRef.current.clientHeight);
    } else {
      setDragging(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
      const div = divRef.current;
      setStartLeft(div.offsetLeft);
      setStartTop(div.offsetTop);
    }
  };

  return (
    <div className="App" style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div
        className="resizable-div"
        ref={divRef}
        onMouseDown={handleMouseDown}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", 
        }}
      >
        <img className="flex-item" src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Clothes_hanger_icon_3.svg/2560px-Clothes_hanger_icon_3.svg.png' key="editableText" style={{ overflow: "hidden", maxHeight: "100%", maxWidth: "100%" }}>
  
        </img>
        <div className="resize-handle top" />
        <div className="resize-handle right" />
        <div className="resize-handle bottom" />
        <div className="resize-handle left" />
      </div>
      {/* <div
        className="resizable-div"
        ref={divRef}
        onMouseDown={handleMouseDown}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", 
        }}
      >
        <div className="flex-item" contentEditable={true} key="editableText" style={{ overflow: "hidden", maxHeight: "100%", maxWidth: "100%" }}>
            You Can Edit This Content 
        </div>
        <div className="resize-handle top" />
        <div className="resize-handle right" />
        <div className="resize-handle bottom" />
        <div className="resize-handle left" />
      </div> */}
    </div>
    
  );
};

export default DraganddropComponents;
