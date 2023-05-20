import React from "react";
import "./Rooms.css";

const Rooms = () => {
  const components = [
    { id: 1, name: "Component A" },
    { id: 2, name: "Component B" },
    { id: 3, name: "Component C" },
    { id: 4, name: "Component D" },
    { id: 5, name: "Component E" },
  ];

  return (
    <div className="component-list">
      <h1>Component List</h1>
      <ul className="component-list__items">
        {components.map((component) => (
          <li key={component.id} className="component-list__item">
            <span>{component.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
