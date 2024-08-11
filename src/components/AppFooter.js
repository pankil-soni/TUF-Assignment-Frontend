import React from "react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="py-6 border-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold">FlashMaster</h2>
            <p className="mt-2">Master any subject with our flashcards</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/flashcards" className="hover:text-blue-500">
                  Flashcards
                </Link>
              </li>
              <li>
                <Link to="/dashboard">Admin Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          &copy; 2024 FlashMaster. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
