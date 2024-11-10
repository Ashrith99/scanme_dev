import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the table number
const TableNumContext = createContext();

export const TableNumProvider = ({ children }) => {
  const [tableNum, setTableNum] = useState(() => {
    // Get the table number from session storage
    const savedTableNum = sessionStorage.getItem('tableNum');
    return savedTableNum ? JSON.parse(savedTableNum) : null;
  });

  useEffect(() => {
    // Save the table number to session storage
    if (tableNum !== null) {
      sessionStorage.setItem('tableNum', JSON.stringify(tableNum));
    } else {
      sessionStorage.removeItem('tableNum');
    }
  }, [tableNum]);

  return (
    <TableNumContext.Provider value={{ tableNum, setTableNum }}>
      {children}
    </TableNumContext.Provider>
  );
};

// Custom hook to use the TableNumContext
export const useTableNum = () => useContext(TableNumContext);
