import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Hambermenuoptions.css";
import { generalpics } from "../../assets/Suraj Menu/pictures";
import { icons } from "../../assets/icons/icons";
import Footer from "../Footer/Footer";

const Hambermenuoptions = ({ setopt }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const optionsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        optionsRef.current &&
        imageRef.current &&
        !optionsRef.current.contains(event.target) &&
        !imageRef.current.contains(event.target)
      ) {
        setopt(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setopt]);

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setopt(false);
  };

  return (
    <>
      <div className="hamber-menu" ref={menuRef}>
        <div className="hamber-menu-image" ref={imageRef}>
          <a href="#">
            <img src={generalpics.scanme_img} alt="afterlife" />
          </a>
        </div>
        <div className="hamber-menu-options" ref={optionsRef}>
          <div onClick={() => handleNavigation("/")} className="hamber-menu-options-home">
            <img
              onClick={() => handleNavigation("/")}
              src={icons.home_icon}
              alt="home"
            />
            <p>Home</p>
          </div>
          <div onClick={() => handleNavigation("/added-items")} className="hamber-menu-options-cart">
            <img
              onClick={() => handleNavigation("/added-items")}
              src={icons.pallet_icon}
              alt="pallet_icon"
            />
            <p>Go to Pallet</p>
          </div>
          <div onClick={() => handleNavigation("/about-restaurant")} className="hamber-menu-options-about-res">
            <img src={icons.about_us_icon} alt="aboutus" />
            <p>About Us</p>
          </div>

          <button
            className="hamber-menu-go-back-button-option"
            onClick={() => setopt(false)}
          >
            close
          </button>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Hambermenuoptions;
