import React from "react";
import CartItem from "./CartItem";

export default function CartCheck({ items, handleIncrement, handleReset }) {
  return (
    <>
      <div>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            count={item.count}
            id={item.id}
            handleIncrement={() => handleIncrement(item.id)}
          ></CartItem>
        ))}
      </div>
      {items.length > 0 && (
        <button
          onClick={handleReset}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      )}
      {items.length === 0 && <h1>empty cart. add food if you want</h1>}
    </>
  );
}
