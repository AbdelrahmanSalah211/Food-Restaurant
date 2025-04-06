import React from "react";
import { Link, NavLink } from "react-router";

export default function NavBar({ items }) {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Restaurant</a>
        </div>
        <ul className="flex flex-1">
          <li className="mr-2">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "font-bold btn" : "btn")}
            >
              Menu
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "font-bold btn" : "btn")}
            >
              About
            </NavLink>
          </li>
        </ul>
        <div className="flex-none">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Link to="/cartCheck" className="btn btn-ghost">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span className="badge badge-sm indicator-item">{items.reduce((acc, item) => {
                  return acc + (item.isCart ? 1 : 0);
                }, 0)}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
