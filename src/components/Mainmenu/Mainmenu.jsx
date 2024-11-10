import React, { useState, useEffect } from "react";
import "./Mainmenu.css";
import { useNavigate } from "react-router-dom";
import MenuDisplay from "../MenuDisplay/MenuDisplay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Mainmenu({ items, searchTerm }) {
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleItemClick = (id) => {
    navigate(`/menu/${id}`);
  };

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(categories.length, 3),
    slidesToScroll: 3,
  };

  return (
    <div className="app">
      {/* Categories Slider */}
      <div className="categories-container">
        <Slider {...settings}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`category-button btn-15 ${
                selectedCategory === category ? "active" : ""
              }`}
            >
              <span>{category}</span>
            </button>
          ))}
        </Slider>
      </div>

      {/* Selected Category Display */}
      <div className="selected-category">
        {selectedCategory !== "All" ? selectedCategory : "All Items"}
      </div>

      {/* Menu List Display */}
      <div className="menu-list">
        {filteredItems.map((item) => (
          <MenuDisplay
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item.id)}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Mainmenu;
