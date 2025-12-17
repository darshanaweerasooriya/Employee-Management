import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebarData } from "./AdminSidebarData";
import "./AdminSideBar.css";

function AdminSideBar() {
    const navigate = useNavigate();

    return (
        <div className="adminSidebar">
            <div className="logo">Admin Panel</div>
            <ul className="adminSidebarList">
                {AdminSidebarData.map((item, index) => (
                    <li
                        key={index}
                        className="adminRow"
                        onClick={() => navigate(item.link)}
                    >
                        <div className="adminIcon">{item.icon}</div>
                        <div className="adminTitle">{item.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminSideBar;
