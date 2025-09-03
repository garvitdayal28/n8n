import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Settings } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function Navbar({ onSettingsClick, showLogo = true }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left side - Search Bot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-start"
          >
            <motion.h1
              className="text-2xl md:text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-gray-900 dark:text-white">
                Search{" "}
              </span>
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Bot
              </span>
            </motion.h1>
          </motion.div>

          {/* Center - Empty */}
          <div></div>

          {/* Right side - Controls */}
          <div className="flex items-center space-x-3 justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onSettingsClick}
              className="relative group p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200"
            >
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-amber-400/30 transition-all duration-200"></div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="relative group p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200"
            >
              <motion.div
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="w-6 h-6 text-amber-500" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-600" />
                )}
              </motion.div>
              <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-amber-400/30 transition-all duration-200"></div>
            </motion.button>

            {/* Google Logo positioned last on the right - conditionally rendered */}
            {showLogo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
