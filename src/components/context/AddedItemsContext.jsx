import React, { createContext, useContext, useState, useEffect } from 'react';

const AddedItemsContext = createContext();

export const useAddedItems = () => useContext(AddedItemsContext);

export const AddedItemsProvider = ({ children }) => {
  const [addedItems, setAddedItems] = useState(() => {
    const savedItems = sessionStorage.getItem('addedItems');
    if (savedItems) {
      const { items, timestamp } = JSON.parse(savedItems);
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - timestamp;

      if (timeElapsed < 24 * 60 * 60 * 1000) {
        return items;
      } else {
        sessionStorage.removeItem('addedItems');
      }
    }
    return [];
  });

  useEffect(() => {
    const timestamp = new Date().getTime();
    sessionStorage.setItem('addedItems', JSON.stringify({ items: addedItems, timestamp }));
  }, [addedItems]);

  const addItem = (item, count) => {
    setAddedItems(prevItems => {
      const existingItem = prevItems.find(prevItem => prevItem.id === item.id);
      if (existingItem) {
        return prevItems.map(prevItem =>
          prevItem.id === item.id
            ? { ...prevItem, count: prevItem.count + count }
            : prevItem
        );
      }
      return [...prevItems, { ...item, count }];
    });
  };

  const updateItemCount = (itemId, count) => {
    setAddedItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem.id === itemId ? { ...prevItem, count } : prevItem
      )
    );
  };

  const removeItem = (itemId) => {
    setAddedItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearItems = () => {
    setAddedItems([]);
    sessionStorage.removeItem('addedItems');
  };

  const isItemAdded = (itemId) => {
    return addedItems.some(item => item.id === itemId);
  };

  return (
    <AddedItemsContext.Provider value={{ addedItems, addItem, removeItem, isItemAdded, updateItemCount, clearItems }}>
      {children}
    </AddedItemsContext.Provider>
  );
};
