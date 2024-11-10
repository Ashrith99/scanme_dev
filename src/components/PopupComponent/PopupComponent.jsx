import React, { useEffect, useState } from "react";
import { useAddedItems } from "../context/AddedItemsContext";
import { toast } from "react-toastify";
import "./PopupComponent.css";
import { icons } from "../../assets/icons/icons";

const PopupComponent = ({ setPopup, combinationItem }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem, isItemAdded, updateItemCount, addedItems } = useAddedItems();
  const [count, setCount] = useState(1);

  // Initialize count based on the current item in the cart
  useEffect(() => {
    const currentItem = addedItems.find(
      (item) => item.id === combinationItem.id
    );
    setCount(currentItem ? currentItem.count : 1);
  }, [combinationItem.id, addedItems]);

  // Handle quantity increment
  const handleQuantityIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Handle quantity decrement
  const handleQuantityDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  // Display the popup with a slight delay for CSS transition effects
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".popup-overlay").classList.add("show");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle adding the combination item to the cart
  const handleAddItem = () => {
    if (isItemAdded(combinationItem.id)) {
      updateItemCount(combinationItem.id, count);
      toast.info(`${combinationItem.name} quantity updated!`);
    } else {
      addItem(combinationItem, count);
      toast.success(`${combinationItem.name} added to the cart!`);
    }
    setPopup(false); // Close the popup after adding the item
  };

  return (
    <div className={`popup-overlay ${imageLoaded ? "show" : ""}`}>
      <div className="popup-content">
        <div className="popup-item-close">
          <img
            onClick={() => setPopup(false)}
            className="popup-item-close-icon"
            src={icons.close_icon}
            alt="close"
          />
        </div>
        <h1 className="popup-item-name">{combinationItem.name}</h1>
        {!imageLoaded && (
          <div className="image-loading-placeholder">Loading image...</div>
        )}
        <div className="popup-item-img">
          <img
            src={combinationItem.image}
            alt={combinationItem.name}
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
        <p className="popup-item-desc">{combinationItem.desc}</p>
        <p className="popup-item-price">{combinationItem.price}</p>
        <div className="popup-buttons">
          <button onClick={handleQuantityDecrement} className="quantity-button">
            -
          </button>
          <span className="quantity-count">{count}</span>
          <button onClick={handleQuantityIncrement} className="quantity-button">
            +
          </button>

          <button onClick={handleAddItem} className="add-button">
            Add
          </button>
          <button onClick={() => setPopup(false)} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
