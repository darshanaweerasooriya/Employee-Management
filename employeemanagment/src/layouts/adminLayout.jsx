import React from "react";
import { Outlet } from "react-router-dom";


function Layout() {
    return(
        <div>
            {/* Sidebar stays fixed */}
            
            
            {/* Main content changes based on routes */}
            <div style={{
                flexGrow: 1,
                padding: "30px",
                backgroundColor: "#f4f4f4",
                height: "200vh",
                marginLeft: "300px",
                boxSizing: "border-box",
                overflowY: "auto" 
            }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;