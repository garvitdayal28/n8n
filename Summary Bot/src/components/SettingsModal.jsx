import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Settings } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const SettingsModal = ({ isOpen, onClose, showLogo, setShowLogo, isAuthenticated, setIsAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { isDark } = useTheme();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "pass@123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
      setPassword("");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    setShowPassword(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.5
            }}
            className={`fixed top-0 right-0 h-full w-80 shadow-2xl z-50 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
                >
                  <Settings className="w-5 h-5" />
                </motion.div>
                <h2 className="text-lg font-semibold">Settings</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className={`transition-colors ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="p-6 h-full overflow-y-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="space-y-6"
              >
                {/* Authentication Section */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                    className="flex items-center space-x-2 mb-4"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isDark ? 'border-gray-400' : 'border-gray-500'
                      }`}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'
                          }`}
                      ></motion.div>
                    </div>
                    <h3 className="text-sm font-medium">Authentication Required</h3>
                  </motion.div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                  >
                    Please enter the access key to proceed.
                  </motion.p>

                  <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    onSubmit={handlePasswordSubmit}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <motion.input
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.2 }}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        placeholder="Enter access key"
                        required
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        <motion.div
                          animate={{ rotate: showPassword ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </motion.div>
                      </motion.button>
                    </div>
                    {error && (
                      <motion.p
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {error}
                      </motion.p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      Unlock
                    </motion.button>
                  </motion.form>
                </motion.div>

                {/* Company Logo Toggle - Always visible */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className={`pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                    >
                      <h3 className="text-sm font-medium">Show Company Logo</h3>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Toggle visibility of the company logo in the navbar
                      </p>
                    </motion.div>
                    <motion.label
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.3, type: "spring" }}
                      className="relative inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={showLogo}
                        onChange={(e) => setShowLogo(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-blue-600 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                        }`}></div>
                    </motion.label>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
