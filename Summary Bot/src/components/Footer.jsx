import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="text-center py-8 px-4"
    >
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Powered by AI-driven analytics for intelligent data insights
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs">
          API Server: https://querybot-production.up.railway.app
        </p>
      </div>
    </motion.footer>
  );
}