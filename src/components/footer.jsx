import React from "react";

const Footer = ({ open }) => {
  return (
    <footer
      className={`${
        open ? "w-[84.4%]" : "w-[93.8%]"
      } py-4 bg-white text-[#3e3e3e] fixed bottom-0 right-0 border-t border-solid transition-all duration-[0.3s]`}
    >
      <p className="text-center">© 2024. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
