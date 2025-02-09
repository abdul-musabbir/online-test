import {
  BookOpen,
  Calendar,
  GraduationCap,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PenTool,
  Settings,
  X,
} from "lucide-react";
import React, { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: PenTool, label: "Active Test", active: true },
    { icon: History, label: "Test History", active: false },
    { icon: GraduationCap, label: "My Courses", active: false },
    { icon: BookOpen, label: "Study Materials", active: false },
    { icon: Calendar, label: "Schedule", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 z-20
      ${isOpen ? "w-64" : "w-0 md:w-20"}`}
    >
      <div
        className={`h-full ${
          isOpen ? "opacity-100" : "opacity-0 md:opacity-100"
        } transition-opacity duration-300`}
      >
        <div className="flex items-center justify-between h-16 mb-8 px-3">
          <div className="flex items-center">
            <GraduationCap size={24} className="mr-2" />
            <h1
              className={`text-xl font-bold transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "hidden md:hidden"
              }`}
            >
              ExamPro
            </h1>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-full hover:bg-gray-600"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <nav className="space-y-1.5 px-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${
                  item.active
                    ? "bg-white/10 text-white shadow-lg backdrop-blur-sm"
                    : "hover:bg-white/5 hover:translate-x-1"
                }`}
            >
              <item.icon size={18} className="text-blue-200 shrink-0" />
              <span
                className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300
                ${isOpen ? "opacity-100" : "hidden md:hidden"}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-3">
          <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-red-500/20 text-red-200 transition-colors">
            <LogOut size={18} className="shrink-0" />
            <span
              className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300
              ${isOpen ? "opacity-100" : "hidden md:hidden"}`}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
