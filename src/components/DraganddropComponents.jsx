import React, { useRef, useState, useEffect } from "react";
import './DraganddropComponents.css';

const DraganddropComponents = ({ element, setSelectedElement, elements, setElements }) => {
  const divRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startLeft, setStartLeft] = useState(element.left);
  const [startTop, setStartTop] = useState(element.top);
  const [startWidth, setStartWidth] = useState(element.width);
  const [startHeight, setStartHeight] = useState(element.height);
  const [showHandles, setShowHandles] = useState(false);
  const [text, setText] = useState(element.text || ""); // Track the text content

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setShowHandles(false);
        setDragging(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Update the text content and adjust the div size
  useEffect(() => {
    const div = divRef.current;
    const textWidth = div.clientWidth; // Use clientWidth for width calculation
    const textHeight = div.clientHeight; // Use clientHeight for height calculation
    const minWidth = 100; // Minimum width
    const minHeight = 100; // Minimum height

    if (textWidth > minWidth) {
      div.style.width = `${textWidth}px`;
    } else {
      div.style.width = `${minWidth}px`;
    }

    if (textHeight > minHeight) {
      div.style.height = `${textHeight}px`;
    } else {
      div.style.height = `${minHeight}px`;
    }
  }, [text]);

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

  const handleDelete = () => { 
    divRef.current.remove();
    const updatedElements = elements.filter((el) => el.id !== element.id);
    setElements(updatedElements);
  };
  const toggleHandles = () => {
    setShowHandles(!showHandles);
  };

  const handleTextChange = (e) => {
    setText(e.target.textContent);

    // Update the text content in the elements array
    const updatedElements = elements.map((el) =>
      el.id === element.id ? { ...el, text: e.target.textContent } : el
    );
    setElements(updatedElements);
  };

  return (
    <div
      className="resizable-div"
      ref={divRef}
      onMouseDown={handleMouseDown}
      onClick={toggleHandles}
      onInput={handleTextChange}
      contentEditable="true"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: `${element.left}px`,
        top: `${element.top}px`,
        width: `${element.width}px`,
        height: `${element.height}px`,
      }}
    >
      {showHandles && (
        <>
          <div className="resize-handle top" />
          <div className="resize-handle right" />
          <div className="resize-handle bottom" />
          <div className="resize-handle left" />
          <div className="resize-handle top-left" />
          <div className="resize-handle top-right" />
          <div className="resize-handle bottom-left" />
          <div className="resize-handle bottom-right" />
        </>
      )}

      <div
        className="delete-button"
        onClick={handleDelete}
      >
        ✖
      </div>
      {text}
    </div>
  );
};

export default DraganddropComponents;
