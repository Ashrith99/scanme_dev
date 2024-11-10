import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons/icons";
import "./Header.css";
import Hambermenuoptions from "../Hambermenuoptions/Hambermenuoptions";
import { useTableNum } from "../context/TableNumContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FaCalendarCheck } from 'react-icons/fa'; // Icon import for button

function Header({ onSearchChange, isMenu, isAddpage }) {
  const { tableNum } = useTableNum();
  const navigate = useNavigate();
  const [option, setOption] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    persons: "",
  });

  const handleMenuoption = () => {
    setOption(true);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "time") {
      e.target.blur();
    }
  };

  const sendReservationData = async () => {
    try {
      const response = await fetch("http://localhost:5000/reserveTable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Reservation successful!");
      } else {
        toast.error("Failed to reserve. Please try again.")
      }
    } catch (error) {
      console.error("Error sending reservation:", error);
    }
  };

  const handleReservationSubmit = () => { 
    //sendReservationData();
      sendReservationData();
      setReservation({ name: "", phone: "", date: "", time: "", persons: "" });  // Clear form fields
      setIsFormVisible(false);  // Close form
  };

  return (
    <>
      {option && <Hambermenuoptions setopt={setOption} />}
      
      <div className="header">
        <img
          src={icons.menuicon}
          alt="Menu"
          onClick={handleMenuoption}
          className="menu-icon"
          style={{ opacity: option ? 0 : 1 }}
        />
        
        {!isMenu && (
          <div className="welcome">
            <h2>SOORAJ☀️</h2>
          </div>
        )}

        {isMenu && (
          <div className="welcome">
            <h2>SOORAJ☀️</h2>
          </div>
        )}

        {isAddpage ? (
          <img
            src={icons.home_icon}
            onClick={() => navigate("/")}
            alt="Home"
            className="home-icon"
          />
        ) : (
          <img
            src={icons.pallet_icon}
            onClick={() => navigate("/added-items")}
            alt="Pallet"
            className="pallet-icon"
          />
        )}
      </div>
      {/* New Heading */}

      {!isAddpage && !isMenu && tableNum === 0 && (
        <>
          <button
            onClick={toggleFormVisibility}
            className="toggle-form-btn"
          >
            {/* <FaCalendarCheck className="button-icon" />  */}
            {isFormVisible ? "Close Reservation Form" : "Tap to Reserve a Table"}
          </button>
          
          {isFormVisible && (
            <div className="reservation-form">  
              <form className="reservation-row">
                <div className="reservation-input">
                  <input
                    type="text"
                    name="name"
                    value={reservation.name}
                    onChange={handleReservationChange}
                    required
                    placeholder="Name"
                    className="reservation-name"
                  />
                </div>

                <div className="reservation-input">
                  <input
                    type="tel"
                    name="phone"
                    value={reservation.phone}
                    onChange={handleReservationChange}
                    required
                    placeholder="Phone"
                    className="reservation-phone"
                  />
                </div>

                <div className="reservation-input">
                  <input
                    type="date"
                    name="date"
                    value={reservation.date}
                    onChange={handleReservationChange}
                    required
                    className="reservation-date"
                  />
                  <i className="fa fa-calendar reservation-icon"></i>
                </div>

                <div className="reservation-input">
                  <input
                    type="time"
                    name="time"
                    value={reservation.time}
                    onChange={handleReservationChange}
                    required
                    className="reservation-time"
                  />
                  
                </div>
                
                <div className="reservation-input">
                  <select
                    name="persons"
                    value={reservation.persons}
                    onChange={handleReservationChange}
                    required
                    className="reservation-persons"
                  >
                    <option value="" disabled>
                      Persons
                    </option>
                    {[...Array(20).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleReservationSubmit}
                  className="reservation-btn"
                >
                  Reserve
                </button>
                
              </form>
            </div>
          )}
        </>
      )}

      {!isAddpage && !isMenu && tableNum===0 && (
        <>
          <h3 className="order-heading">cliquez et récupérez</h3>
        </>
      )}
      <ToastContainer />
      

      

      {!isAddpage && !isMenu && (
        <>
          <div className="wrap-input-17">
            <div className="search-box">
              <button className="btn-search">🔍</button>
              <input
                onChange={onSearchChange}
                type="text"
                className="input-search"
                placeholder="Search..."
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
