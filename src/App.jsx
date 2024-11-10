import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddedItemsProvider } from './components/context/AddedItemsContext';
import { TableNumProvider } from './components/context/TableNumContext';
import LandingPage from './pages/LandingPage/Landingpage';
import AddedItems from './components/AddedItems/AddedItems';
import MenuDetails from './pages/MenuDetails/MenuDetails';
import AboutRestaurant from './components/AboutRestaurant/AboutRestaurant';
import './App.css';

const App = () => {
  return (
    <TableNumProvider>
      <AddedItemsProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/menu/:id" element={<MenuDetails />} />
          <Route path="/added-items" element={<AddedItems />} />
          <Route path="/about-restaurant" element={<AboutRestaurant />} />
        </Routes>
      </AddedItemsProvider>
    </TableNumProvider>
  );
};

export default App;


