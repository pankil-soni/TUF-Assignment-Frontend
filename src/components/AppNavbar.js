import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { motion } from "framer-motion";

const AppNavbar = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link to="/" className="font-bold ">
            FlashMaster
          </Link>
        </motion.div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/flashcards">Flashcards</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/dashboard">Admin Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
