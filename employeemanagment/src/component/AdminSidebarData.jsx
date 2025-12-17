import React from "react";
import PersonIcon from '@mui/icons-material/Person'; 
import ApartmentIcon from '@mui/icons-material/Apartment'; 

export const AdminSidebarData = [
    {
        title: "Employee",
        icon: <PersonIcon />,
        link: "/addemployee"
    },
    {
        title: "Department",
        icon: <ApartmentIcon />,
        link: "/addDepartment"
    },
];
