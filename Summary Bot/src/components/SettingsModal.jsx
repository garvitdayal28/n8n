import React, { useState } from "react";
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
          }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          <button
            onClick={handleClose}
            className={`transition-colors ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          <div className="space-y-6">
            {/* Authentication Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isDark ? 'border-gray-400' : 'border-gray-500'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'
                    }`}></div>
                </div>
                <h3 className="text-sm font-medium">Authentication Required</h3>
              </div>
              <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Please enter the access key to proceed.
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Unlock
                </button>
              </form>
            </div>

            {/* Company Logo Toggle - Always visible */}
            <div className={`pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Show Company Logo</h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    Toggle visibility of the company logo in the navbar
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLogo}
                    onChange={(e) => setShowLogo(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-blue-600 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                    }`}></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
