import { Outlet } from "react-router-dom";
import Navbar from "./NavbarComp/Navbar.jsx"
import Footer from "./footer/Footer.jsx"

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer/>
        </>
    );
}