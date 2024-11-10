import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { generalpics, loadMenuData } from "../../assets/Suraj Menu/pictures";
import { useAddedItems } from "../context/AddedItemsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ItemDetails.css";
import PopupComponent from "../PopupComponent/PopupComponent";
import { icons } from "../../assets/icons/icons";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { addItem, isItemAdded, updateItemCount, addedItems } = useAddedItems();
  const [popUp, setPopup] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuItemsData = await loadMenuData();
        setMenuItems(menuItemsData);

        const initialItemIndex = menuItemsData.findIndex(
          (item) => item.id === parseInt(id)
        );
        setItemIndex(initialItemIndex);
        setLoading(false);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const currentItem = addedItems.find(
      (item) => item.id === menuItems[itemIndex]?.id
    );
    setCount(currentItem ? currentItem.count : 1);
  }, [itemIndex, addedItems, menuItems]);

  useEffect(() => {
    const arrowTimer = setInterval(() => {
      setShowArrows(true);
      setTimeout(() => {
        setShowArrows(false);
      }, 3000);
    }, 15000);

    return () => clearInterval(arrowTimer);
  }, []);

  useEffect(() => {
    const combinationsList = document.querySelector(".combinations-list");
    if (combinationsList) {
      combinationsList.scrollLeft = 0;
    }
  }, [menuItems[itemIndex]]);

  const handleAddItem = () => {
    if (isItemAdded(menuItems[itemIndex].id)) {
      updateItemCount(menuItems[itemIndex].id, count);
      toast.info(`${menuItems[itemIndex].name} quantity updated!`);
    } else {
      addItem(menuItems[itemIndex], count);
      toast.success(`${menuItems[itemIndex].name} added to the cart!`);
    }
  };

  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/added-items");
    }, 600);
  };

  const handleCombinationClick = (combination) => {
    const combinationItem = menuItems.find(
      (menuItem) => menuItem.name === combination
    );
    if (combinationItem) {
      setSelectedCombination(combinationItem);
      setPopup(true);
    }
  };

  const handleSwipeChange = (index) => {
    setItemIndex(index);
  };

  const handleNextItem = () => {
    setItemIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
  };

  const handlePreviousItem = () => {
    setItemIndex(
      (prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length
    );
  };

  const handleQuantityIncrement = () => {
    setCount((c) => c + 1);
  };

  const handleQuantityDecrement = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };

  const getVisibleDots = () => {
    const totalItems = menuItems.length;
    const maxDots = 5;
    if (totalItems <= maxDots) return [...Array(totalItems).keys()];

    const half = Math.floor(maxDots / 2);
    if (itemIndex <= half) return [...Array(maxDots).keys()];
    if (itemIndex >= totalItems - half - 1)
      return [...Array(maxDots).keys()].map((i) => totalItems - maxDots + i);

    return [...Array(maxDots).keys()].map((i) => itemIndex - half + i);
  };

  const renderPaginationDots = () => {
    const visibleDots = getVisibleDots();
    return (
      <div className="pagination-dots">
        {visibleDots.map((index) => (
          <span
            key={index}
            className={`dot ${index === itemIndex ? "active" : ""}`}
            onClick={() => setItemIndex(index)}
          ></span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <img src={generalpics.suraj_img} alt="surajlogo" />
        Powered by&nbsp;
        <span className="scanme_logo">
          <img src={icons.scanme_logo} alt="scanmelogo" />
        </span>
      </div>
    );
  }

  return (
    <div className="temp-div">
      {!loading && menuItems[itemIndex] && (
        <div className={`menu-details ${loaded ? "loaded" : ""}`}>
          <SwipeableViews
            index={itemIndex}
            onChangeIndex={handleSwipeChange}
            containerStyle={{ height: "100%", width: "100%" }}
            axis="x"
            resistance
            enableMouseEvents
          >
            {menuItems.map((item) => (
              <div className="menu-details-content" key={item.id}>
                <div className="menu-details-inner">
                  <h2 className="menu-details-name">{item.name}</h2>
                  <div className="menu-details-content-info">
                    <p className="menu-details-price">{item.price}</p>
                  </div>

                  <div className="menu-details-image-container">
                    {item.video ? (
                      <img
                        src={item.video}
                        alt={item.name}
                        className="menu-details-thumbnail"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="menu-details-thumbnail"
                      />
                    )}
                  </div>

                  <p className="menu-details-desc">{item.desc}</p>

                  <div className="quantity-buttons">
                    <p
                      onClick={handleQuantityDecrement}
                      className="quantity-edit decrement"
                    >
                      -
                    </p>
                    <div className="plate-icon">
                      <span className="quantity-number">{count}</span>
                    </div>

                    <p
                      onClick={handleQuantityIncrement}
                      className="quantity-edit increment"
                    >
                      +
                    </p>
                  </div>
                  
                  <div className="menu-details-buttons">
                    <button
                      onClick={handleNavigate}
                      className="menu-details-button btn-29"
                    >
                      <span className="text-container">
                        <span className="text">Go to cart</span>
                      </span>
                    </button>
                    <button
                      onClick={handleAddItem}
                      className="btn-80 menu-details-button"
                    >
                      <span>Add</span>
                    </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </SwipeableViews>

          {itemIndex > 0 && (
            <div
              className={`swipe-arrow swipe-arrow-left ${
                showArrows ? "visible" : ""
              }`}
              onClick={handlePreviousItem}
            >
              &lt;
            </div>
          )}
          {itemIndex < menuItems.length - 1 && (
            <div
              className={`swipe-arrow swipe-arrow-right ${
                showArrows ? "visible" : ""
              }`}
              onClick={handleNextItem}
            >
              &gt;
            </div>
          )}
        </div>
      )}

      {!loading && renderPaginationDots()}

      {!loading && menuItems[itemIndex].combinations && (
        <div className="item-combinations">
          <h1 className="combinations-header">meilleures combinaisons</h1>
          <div className="combinations-list-container">
            <div className="combinations-list">
              {menuItems[itemIndex].combinations.map((combination, index) => {
                const combinationItem = menuItems.find(
                  (menuItem) => menuItem.name === combination
                );
                return (
                  <div
                    key={index}
                    className="combination-item"
                    onClick={() => handleCombinationClick(combination)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3 className="combination-item-name">
                      {combinationItem?.name || combination}
                    </h3>
                    {combinationItem && (
                      <img
                        src={combinationItem.image}
                        alt={combinationItem.name}
                        className="combination-item-thumbnail"
                      />
                    )}
                    {combinationItem && (
                      <h4 className="combination-item-price">
                        {combinationItem.price}
                      </h4>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {popUp && selectedCombination && (
        <PopupComponent
          setPopup={setPopup}
          combinationItem={selectedCombination}
        />
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ItemDetails;
