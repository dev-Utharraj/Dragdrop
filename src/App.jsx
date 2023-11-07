import React, { useState } from "react";
import DraganddropComponents from "./components/DraganddropComponents";
import Imageselect from "./components/imageselect/imageselect";
import { FaTrash, FaFileImage, FaEnvelopeOpenText } from 'react-icons/fa';

function App() {
  const sidebarStyle = {
    width: "20vw",
    height: "100vh",
    padding: "25px",
    position: "relative",
    overflow: "hidden",
  };

  const contentStyle = {
    width: "80vw",
    height: "100vh",
    padding: "25px",
    position: "relative",
    overflow: "hidden",
  };

  const buttonStyle = {
    width: "30px",
    margin: "10px 0", 
    
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
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

  const deleteSelectedElement = (elementId) => {
    setElements(elements.filter((element) => element.id !== elementId));
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card" style={sidebarStyle}>
          <div className="card-body">
            <div style={buttonContainerStyle}>
              <button
                className="border-0"
                onClick={() => addNewElement("text")}
                style={buttonStyle}
              >
                <FaEnvelopeOpenText />
              </button>
              <button
                className="border-0"
                onClick={() => addNewElement("image")}
                style={buttonStyle}
              >
                <FaFileImage />
              </button>
              <button
                className="border-0"
                onClick={() => {
                  if (elements.length > 0) {
                    deleteSelectedElement(elements[elements.length - 1].id);
                  }
                }}
                style={buttonStyle}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="card" style={contentStyle}>
          <div className="card-body">
            {elements.map((element) => (
              <div key={element.id}>
                {displayedComponent === "text" && (
                  <DraganddropComponents
                    element={element}
                    setSelectedElement={() => deleteSelectedElement(element.id)}
                  />
                )}
                {displayedComponent === "image" && (
                  <Imageselect
                    element={element}
                    setSelectedElement={() => deleteSelectedElement(element.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
