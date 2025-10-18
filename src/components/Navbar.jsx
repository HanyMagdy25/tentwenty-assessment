import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "News", href: "#news" },
    { name: "Services", href: "#services" },
    { name: "Our Team", href: "#team" },
    { name: "Make Enquiry", href: "#enquiry" },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="bg-white shadow-sm">
          <div className="mx-auto px-6 py-4 flex items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-8 md:flex">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Contact Button */}
            <button className="flex items-center space-x-2 border-2 border-black px-6 py-2 gap-2 hover:bg-black hover:text-white transition-all duration-300">
              <span className="font-medium">Contact us</span>
              <ArrowRight size={18} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-12 h-12 border-2 border-gray-300 hover:border-gray-400 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                  }
                  className="w-6 h-0.5 bg-gray-800 transition-all"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-gray-800 transition-all"
                />
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                  }
                  className="w-6 h-0.5 bg-gray-800 transition-all"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={toggleMenu}
                  className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-gray-800" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="px-6 py-8">
                <ul className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        onClick={toggleMenu}
                        className="block text-2xl font-medium text-gray-800 hover:text-gray-600 transition-colors py-2"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Contact Button in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="px-6 mt-8"
              >
                <button className="w-full flex items-center justify-center space-x-2 border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-300">
                  <span className="font-medium">Contact us</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
