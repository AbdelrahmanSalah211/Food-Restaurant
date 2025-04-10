import React from "react";
import ToogleButton from "./ToggleButton";

export default function Menu({
  items,
  categories,
  handleAddCart,
  loading,
  selectedCat,
  handleSelectCat,
  numPages,
  currentPage,
  handleSelectPage,
  searchVal,
  setSearchVal,
}) {
  const pages = Array(numPages)
    .fill(0)
    .map((item, index) => index + 1);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mx-w-lg my-10">
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-10 items-center justify-center">
            <h1 className="text-2xl ">Categories</h1>
            <ul className="w-1/5">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`px-4 py-2 border text-center cursor-pointer hover:bg-gray-100 ${
                    category.id === selectedCat &&
                    "bg-gray-300 hover:bg-gray-300"
                  }`}
                  onClick={() => handleSelectCat(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-x-auto col-span-2 flex flex-col gap-10 ">
            <label className="input self-center">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search"
              />
            </label>
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>name</th>
                  <th>price</th>
                  <th>button</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <ToogleButton
                          handleAddCart={handleAddCart}
                          id={item.id}
                          isCart={item.isCart}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="join self-center">
              {pages.map((page) => (
                <button
                  key={page}
                  className={`join-item btn btn-xs ${
                    page === currentPage && "btn-active"
                  }`}
                  onClick={() => handleSelectPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
