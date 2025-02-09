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
} from "lucide-react";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: PenTool, label: "Active Test", active: true },
    { icon: History, label: "Test History", active: false },
    { icon: GraduationCap, label: "My Courses", active: false },
    { icon: BookOpen, label: "Study Materials", active: false },
    { icon: Calendar, label: "Schedule", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: LogOut, label: "Log Out", active: false },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white h-full transition-width duration-300`}
    >
      <div className="flex justify-between items-center p-4">
        <span className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
          Sidebar
        </span>
      </div>
      <div className="flex flex-col">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-3 ${
              item.active ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className={`${isOpen ? "block" : "hidden"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
