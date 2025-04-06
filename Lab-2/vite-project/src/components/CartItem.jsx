import React from "react";

export default function CartItemNew(props) {
  return (
    <>
      <div>
        <div key={props.id} className="flex gap-10  py-2">
          <p className="flex-2">{props.name}</p>
          <p className="flex-1">{props.count}</p>
          <div className="flex-1">
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg"
              onClick={props.handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
