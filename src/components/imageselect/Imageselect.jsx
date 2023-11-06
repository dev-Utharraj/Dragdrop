import React, { useRef, useState, useEffect } from "react";
import './DraganddropComponents.css'

const Imageselect = ({ element, setSelectedElement }) => {
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
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleDelete = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const toggleHandles = () => {
    setShowHandles(!showHandles);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="resizable-div"
      ref={divRef}
      onMouseDown={handleMouseDown}
      onClick={toggleHandles}
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

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
        ref={(fileInput) => (this.fileInput = fileInput)}
      />
      <button onClick={() => this.fileInput.click()}>Choose Image</button>

      {selectedImage && <img src={selectedImage} alt="Selected Image" />}
    </div>
  );
};

export default Imageselect;
