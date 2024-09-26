import React, { useEffect, useState } from "react";
import { IoNewspaper } from "react-icons/io5";
import { FaBlogger } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import Logo from "../assets/logo.png";
import { HiUsers } from "react-icons/hi";
import { TbSettingsCog } from "react-icons/tb";
import { GrResources } from "react-icons/gr";

const sidebarData = [
  {
    id: 1,
    title: "Categories",
    icon: <BiSolidCategory />,
    path: "/categories",
  },
  { id: 2, title: "Faqs", icon: <HiUsers />, path: "/faqs" },
  { id: 3, title: "News", icon: <IoNewspaper />, path: "/news" },
  { id: 4, title: "Blogs", icon: <FaBlogger />, path: "/Blogs" },
  {
    id: 5,
    title: "Services",
    icon: <TbSettingsCog />,
    path: "/services",
  },
  { id: 6, title: "Sources", icon: <GrResources />, path: "/sources" },
];

const Sidebar = ({ open }) => {
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentItem = sidebarData.find((item) => item.path === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      setActiveItem(sidebarData[0].id); // Default to the first item
    }
  }, []);

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <aside
      className={`${
        open ? "w-[15.6%]" : "w-[6.2%]"
      } h-full bg-[#001529] pt-6 -mt-[60px] text-center text-[#A6ADB4] float-left z-[999] transition-all duration-[0.3s]`}
    >
      {open ? (
        <h1 className="font-bold text-[20px] leading-[28px] mb-6">
          Uzloyal Admin
        </h1>
      ) : (
        <a href="/">
          <img
            src={Logo}
            alt="logo"
            width={60}
            height={60}
            className="m-auto mb-6"
          />
        </a>
      )}
      <ul className="list-none">
        {sidebarData.map((item) => (
          <li
            key={item.id}
            className={`${activeItem === item.id ? "active" : ""} m-1 ${
              open ? "pl-6" : "pl-4"
            } pr-4 py-3 rounded-[10px]`}
            onClick={() => handleItemClick(item.id)}
          >
            <a
              href={item.path}
              className={`${
                open ? "gap-2" : "gap-0" && "text-xl"
              } flex items-center transition-all duration-[0.3s] text-center`}
            >
              {item.icon} {open && item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
