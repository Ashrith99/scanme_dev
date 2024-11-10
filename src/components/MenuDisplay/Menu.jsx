import React, { useState, useEffect } from "react";
import MenuDisplay from "./MenuDisplay";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch the menu items from your server
    fetch('/fetch-media')
      .then(response => response.json())
      .then(data => {
        // Assuming the server returns an array of menu items with Base64 images
        setMenuItems(data.menuItems);
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  return (
    <div className="menu-container">
      {menuItems.map((item) => (
        <MenuDisplay key={item.id} item={item} onClick={() => handleItemClick(item)} />
      ))}
    </div>
  );

  function handleItemClick(item) {
    // Handle the click event on a menu item
    console.log("Item clicked:", item);
  }
}

export default Menu;
