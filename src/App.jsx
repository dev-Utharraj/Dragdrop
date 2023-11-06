import React, { useState } from "react";
import DraganddropComponents from "./components/DraganddropComponents";
import Imageselect from "./components/imageselect/imageselect";
import Add_text from "../src/assets/add-text.png";
import Add_image from "../src/assets/image.png";

function App() {
  const cardStyle = {
    width: "60vw",
    height: "60vh",
    padding: "25px",
    position: "relative",
    overflow: "hidden",
  };

  const buttonStyle = {
    width: "30px",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const secondButtonStyle = {
    width: "30px",
    marginTop: "20px", // Add margin-top to the second button
  };

  const [elements, setElements] = useState([]);
  const [currentTop, setCurrentTop] = useState(0);
  const [displayedComponent, setDisplayedComponent] = useState(null);

  const addNewElement = (componentType) => {
    const newElement = {
      id: Date.now(),
      left: 0,
      top: currentTop,
      width: 100,
      height: 100,
    };

    setElements([...elements, newElement]);
    setCurrentTop(currentTop + 0);

    if (componentType === "text") {
      setDisplayedComponent("text");
    } else if (componentType === "image") {
      setDisplayedComponent("image");
    }
  };

  const deleteElement = (elementToDelete) => {
    setElements(elements.filter((element) => element.id !== elementToDelete.id));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <div style={buttonContainerStyle}>
                <button
                  className="border-0"
                  onClick={() => addNewElement("text")}
                  style={buttonStyle}
                >
                  <img src={Add_text} alt="Add Text Element" style={buttonStyle} />
                </button>
                <button
                  className="border-0"
                  onClick={() => addNewElement("image")}
                  style={secondButtonStyle}
                >
                  <img src={Add_image} alt="Add Image Element" style={buttonStyle} />
                </button>
              </div>
              {displayedComponent === "text" && (
                <DraganddropComponents
                  element={elements[elements.length - 1]}
                  setSelectedElement={deleteElement}
                />
              )}
              {displayedComponent === "image" && (
                <Imageselect
                  element={elements[elements.length - 1]}
                  setSelectedElement={deleteElement}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
