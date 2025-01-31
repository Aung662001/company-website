"use client";
import { navItems, navRightItems } from "../utils/navigation";
import { useRouter, usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NavBar() {
  const router = useRouter();
  const pathName = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const toggleNavBar = () => setMobileNavOpen(!mobileNavOpen);

  const isActive = (href: string) => {
    return pathName == href ? "active" : "";
  };

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 opacity-90 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            {/* <Image src={logo} alt="Logo" width={100} height={50} /> */}
            <span className="text-xl tracking-tight">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-white space-x-2 font-extrabold"
              >
                {["M","O","N","I","S","O","F","T"].map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </span>
          </div>
          <ul className="hidden lg:flex space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={` hover:text-white transition-all ease-in-out duration-500 ${
                    isActive(item.href) ? "text-white" : "text-slate-500 "
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="hidden lg:flex space-x-11">
            {navRightItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={` hover:text-white transition-all ease-in-out duration-500 ${
                    isActive(item.href) ? "text-white" : "text-slate-500"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="lg:hidden justify-end relative">
            <button
              onClick={toggleNavBar}
              className="transition-all duration-500"
            >
              <Menu
                className={`absolute top-0 right-0 w-6 h-6 transition-all duration-500 ${
                  mobileNavOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute top-0 right-0 w-6 h-6 transition-all duration-500 ${
                  mobileNavOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      {/* mobile nav container */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileNavOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
        }`}
      >
        <ul className="w-full flex flex-col items-center justify-center my-7">
          {navItems.concat(navRightItems).map((item, index) => (
            <li key={index} className="my-2">
              <a
                href={item.href}
                className={`relative inline-block px-4 py-2 rounded-lg bg-transparent transition-all duration-500 ${
                  isActive(item.href)
                    ? "text-white hover:scale-125"
                    : "hover:text-white text-slate-400 hover:scale-125"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* end mobile nav container */}
    </nav>
  );
}
