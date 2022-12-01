import React from "react";
import "./AppNavigation.scss";
import { NavLink } from "react-router-dom";

const AppNavigation = () => {
  return (
    <div className="navigation-container">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "when-active" : "navigation-item"
        }
      >
        <span className="mx-4">Dashboard</span>
      </NavLink>

      <NavLink
        to="/employee"
        className={({ isActive }) =>
          isActive ? "when-active" : "navigation-item"
        }
      >
        <span className="mx-4">Employee</span>
      </NavLink>
      <NavLink
        to="/department"
        className={({ isActive }) =>
          isActive ? "when-active" : "navigation-item"
        }
      >
        <span className="mx-4">Department</span>
      </NavLink>
      <NavLink
        to="/position"
        className={({ isActive }) =>
          isActive ? "when-active" : "navigation-item"
        }
      >
        <span className="mx-4">Position</span>
      </NavLink>
    </div>
  );
};

export default AppNavigation;
