import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navbar } from "./components/Navbar";
import { QueryInput } from "./components/QueryInput";
import { Footer } from "./components/Footer";
import SettingsModal from "./components/SettingsModal";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load logo visibility from localStorage on component mount
  useEffect(() => {
    const savedLogoVisibility = localStorage.getItem("showLogo");
    if (savedLogoVisibility !== null) {
      setShowLogo(JSON.parse(savedLogoVisibility));
    }
  }, []);

  // Save logo visibility to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("showLogo", JSON.stringify(showLogo));
  }, [showLogo]);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar onSettingsClick={handleSettingsClick} showLogo={showLogo} />

        <main className="flex flex-col min-h-[calc(100vh-4rem)]">
          <QueryInput isAuthenticated={isAuthenticated} />
          <Footer />
        </main>

        <SettingsModal
          isOpen={showSettings}
          onClose={handleCloseSettings}
          showLogo={showLogo}
          setShowLogo={setShowLogo}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
