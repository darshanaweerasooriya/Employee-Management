import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../component/AdminSideBar";

function Layout() {
    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <AdminSideBar />

            {/* Main content */}
            <div
                style={{
                    flexGrow: 1,
                    padding: "30px",
                    backgroundColor: "#f4f4f4",
                    minHeight: "100vh",
                    marginLeft: "300px", // same as sidebar width
                    boxSizing: "border-box",
                    overflowY: "auto"
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
