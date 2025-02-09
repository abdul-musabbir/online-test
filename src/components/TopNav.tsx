import { Bell, Mail, Menu, Search } from "lucide-react";
import React from "react";

interface TopNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onCloseSidebar: () => void;
}

const TopNav: React.FC<TopNavProps> = ({
  isOpen,
  onToggle,
  onCloseSidebar,
}) => {
  return (
    <div
      className={`h-16 bg-white border-b fixed top-0 right-0 left-0 md:left-20 z-10 shadow-sm transition-all duration-300 ${
        isOpen ? "md:left-64" : ""
      }`}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              onToggle();
              if (isOpen) onCloseSidebar(); // Close sidebar when opened
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          <div className="hidden sm:flex items-center bg-gray-50 rounded-lg w-96">
            <Search size={18} className="ml-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
            <Mail size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                Abdul Mottalib
              </p>
              <p className="text-xs text-gray-500">Grade 11-A</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=120"
              alt="Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer ring-2 ring-offset-2 ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
