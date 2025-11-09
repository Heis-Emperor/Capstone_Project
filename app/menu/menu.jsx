'use client';

import React, { useState, useRef, useCallback,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef(null);
    
    const toggleMenu = useCallback((e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setIsOpen(!isOpen);
    }, [isOpen]);

    const menuItems = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/contact', label: 'Contact' },
        { href: '/about', label: 'About' },
    ];
    // Close on outside click
    useEffect(() => {
        function handleOutside(e) {
            // Skip if menu is not open
            if (!isOpen) return;
            
            // Close if click is outside both the menu and the button
            const menuContent = drawerRef.current;
            const hamburgerButton = e.target.closest('button');
            
            if (!menuContent?.contains(e.target) && !hamburgerButton) {
                setIsOpen(false);
            }
        }
        
        function handleEsc(e) {
            if (e.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    // Lock body scroll when drawer open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <motion.button
                onClick={toggleMenu}
                className="relative z-50 flex flex-col justify-center items-center w-10 h-10 hover:bg-primary-foreground/10 rounded-lg transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.span
                    initial={false}
                    animate={{ 
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 2 : 0,
                        backgroundColor: "currentColor"
                    }}
                    className="w-6 h-0.5 transition-all duration-200 origin-center"
                />
                <motion.span
                    initial={false}
                    animate={{ 
                        opacity: isOpen ? 0 : 1,
                        backgroundColor: "currentColor"
                    }}
                    className="w-6 h-0.5 my-1 transition-all duration-200"
                />
                <motion.span
                    initial={false}
                    animate={{ 
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -2 : 0,
                        backgroundColor: "currentColor"
                    }}
                    className="w-6 h-0.5 transition-all duration-200 origin-center"
                />
            </motion.button>

            {/* Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            ref={drawerRef}
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-[60px] right-0 h-auto w-60 bg-background shadow-xl rounded-lg border"
                            onClick={(e) => {
                                // Only close if clicking the menu container itself, not its children
                                if (e.target === e.currentTarget) {
                                    setIsOpen(false);
                                }
                            }}
                        >
                            <div className="p-6">
                                <nav className="space-y-4 mt-4">
                                    {menuItems.map((item) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full py-2 text-lg text-black rounded-md hover:bg-primary hover:text-primary-foreground px-3"
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default HamburgerMenu;
