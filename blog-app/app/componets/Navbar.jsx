"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Create Post", href: "/create" },
  ];

  useEffect(() => {
    // Check login status on mount
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.reload(); // refresh UI
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        Blog<span className="text-blue-400">App</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {links.map(
          (link) =>
            (link.name !== "Create Post" || isLoggedIn) && ( // Show Create Post only if logged in
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-blue-400 ${
                  pathname === link.href ? "text-blue-400" : ""
                }`}
              >
                {link.name}
              </Link>
            )
        )}

        {/* Right-side Auth Section */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className={`text-white hover:text-blue-400 ${
                pathname === "/auth/login" ? "text-blue-400" : ""
              }`}
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div
        className="md:hidden text-2xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center py-4 gap-4 md:hidden">
          {links.map(
            (link) =>
              (link.name !== "Create Post" || isLoggedIn) && (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`hover:text-blue-400 ${
                    pathname === link.href ? "text-blue-400" : ""
                  }`}
                >
                  {link.name}
                </Link>
              )
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-blue-400 px-4 py-1 rounded-lg text-center"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
