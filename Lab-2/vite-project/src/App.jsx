import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/About";
import { Routes, Route } from "react-router";
import CartCheck from "./components/CartCheck";
import Menu from "./components/Menu";

export default function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const pageSize = 4;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [catederyResponse, productResponse] = await Promise.all([
        fetch("http://localhost:3000/category?_delay=10000"),
        fetch("http://localhost:3000/product?_delay=10000"),
      ]);
      const [categoryData, productData] = await Promise.all([
        catederyResponse.json(),
        productResponse.json(),
      ]);
      setLoading(false);
      setCategories([{ id: 0, name: "All" }, ...categoryData]);
      setItems(productData);
    })();
  }, []);

  const handleAddCart = (id) => {
    const clonedItems = items.map((item) => ({
      ...item,
      isCart: item.id === id ? !item.isCart : item.isCart,
    }));
    setItems(clonedItems);
  };

  const handleIncrement = (id) => {
    const clonedItems = [...items];
    const itemIndex = clonedItems.findIndex((item) => item.id === id);
    clonedItems[itemIndex] = { ...clonedItems[itemIndex] };
    clonedItems[itemIndex].count = clonedItems[itemIndex].count + 1;
    setItems(clonedItems);
  };

  let filterdItems =
    selectedCat === 0
      ? items
      : items.filter((item) => item.category === selectedCat);

  if (searchVal.trim() !== "") {
    filterdItems = filterdItems.filter((item) =>
      item.name.toLowerCase().includes(searchVal.toLowerCase())
    );
  }

  const nymPages = Math.ceil(filterdItems.length / pageSize);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  filterdItems = filterdItems.slice(start, end);

  const handleDelete = (id) => {
    const clonedItems = items.filter((item) => item.id !== id);
    setItems(clonedItems);
  };

  const handleReset = () => {
    const clonedItems = items.map((item) => ({ ...item, count: 0 }));
    setItems(clonedItems);
  };

  const handleSelectCat = (id) => {
    setSelectedCat(id);
    setCurrentPage(1);
  };

  const handleSelectPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <NavBar items={filterdItems} />
      <Routes>
        <Route
          path="/"
          element={
            <Menu
              items={filterdItems}
              categories={categories}
              handleAddCart={handleAddCart}
              loading={loading}
              selectedCat={selectedCat}
              handleSelectCat={handleSelectCat}
              numPages={nymPages}
              currentPage={currentPage}
              handleSelectPage={handleSelectPage}
              searchVal={searchVal}
              setSearchVal={setSearchVal}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route
          path="/cartCheck"
          element={
            <CartCheck
              items={items.filter((item) => item.isCart)}
              handleDelete={handleDelete}
              handleIncrement={handleIncrement}
              handleReset={handleReset}
            />
          }
        />
      </Routes>
    </div>
  );
}
