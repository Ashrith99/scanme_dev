
import React from "react";
import ItemDetails from "../../components/ItemDetails/ItemDetails";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function MenuDetails() {
    const isMenu = true;
 return(
    <>
    <Header isMenu = {isMenu} />
    <ItemDetails />
    <Footer />
    </>
 )
}

export default MenuDetails;
