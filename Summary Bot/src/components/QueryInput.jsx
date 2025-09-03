import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { sendToN8nWorkflow, validateEmail, validateCompanyName } from '../utils/api';

export function QueryInput({ isAuthenticated = false }) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    // Validate form data
    const newErrors = {};
    if (!isAuthenticated) {
      newErrors.authentication = "Please authenticate using the settings panel first";
    }
    if (!validateCompanyName(formData.companyName)) {
      newErrors.companyName = "Company name must be at least 2 characters long";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Send to n8n workflow
      await sendToN8nWorkflow(formData);

      setSubmitStatus("success");
      setFormData({ companyName: "", email: "" });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="space-y-6">
              {/* Authentication Status */}
              {!isAuthenticated && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-amber-800 dark:text-amber-400 text-sm font-medium">
                    🔒 Authentication Required
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
                    Please click the settings icon and enter your access key to unlock the form.
                  </p>
                </div>
              )}

              {isAuthenticated && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-400 text-sm font-medium">
                    ✅ Authenticated - Form is now unlocked
                  </p>
                </div>
              )}

              {/* How to Use Instructions */}
              {isAuthenticated && (
                <div className="text-center space-y-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Enter your company name and email address to receive detailed company information directly to your inbox.
                  </p>
                </div>
              )}

              {/* Company Name Input */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${!isAuthenticated
                    ? "bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500 cursor-not-allowed"
                    : "bg-white dark:bg-gray-700"
                    } ${errors.companyName
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-amber-500"
                    }`}
                  placeholder={isAuthenticated ? "Enter your company name" : "Please authenticate first using settings"}
                  disabled={isSubmitting || !isAuthenticated}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.companyName}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${!isAuthenticated
                    ? "bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500 cursor-not-allowed"
                    : "bg-white dark:bg-gray-700"
                    } ${errors.email
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-amber-500"
                    }`}
                  placeholder={isAuthenticated ? "Enter your email address" : "Please authenticate first using settings"}
                  disabled={isSubmitting || !isAuthenticated}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !isAuthenticated}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p className="text-green-800 dark:text-green-400 text-sm font-medium">Email sent successfully!</p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-800 dark:text-red-400 text-sm font-medium">Failed to send email</p>
                  <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                    Please check if your n8n workflow is active and running.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}