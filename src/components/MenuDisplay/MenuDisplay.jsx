import React from "react";
import "./MenuDisplay.css";

function MenuDisplay({ item, onClick }) {
  return (
    <div className="menu-item" id={item.id} onClick={onClick}>
      <div className="carousel-container">
        <div className="carousel-items">
          <img
            src={item.image}
            alt={item.name}
            className="menu-item-image"
          />
        </div>
      </div>

      <div className="menu-item-info">
        <h3 className="menu-item-name">{item.name}</h3>
        <div className="menu-item-otherinfo">
          <p className="menu-item-otherinfo-price">{item.price}</p>
        </div>
        {/* <p className="menu-item-description">{item.desc}</p> */}
      </div>
    </div>
  );
}

export default MenuDisplay;
