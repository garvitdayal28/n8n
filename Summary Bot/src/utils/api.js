// API utilities for n8n workflow integration

const API_CONFIG = {
  // n8n webhook URL - use proxy in development to avoid CORS
  N8N_WEBHOOK_URL: import.meta.env.DEV 
    ? '/api/n8n'  // Use Vite proxy in development
    : import.meta.env.VITE_N8N_WEBHOOK_URL || 
      "https://garvitdayal.app.n8n.cloud/webhook-test/eb22e461-2f50-4fcc-bf3e-d334a17b7766",
  TIMEOUT: 10000, // 10 seconds
};

/**
 * Send form data to n8n workflow
 * @param {Object} formData - The form data containing companyName and email
 * @returns {Promise<Object>} - Response from the n8n workflow
 */
export const sendToN8nWorkflow = async (formData) => {
  try {
    console.log("Sending data to n8n:", formData);
    
    const response = await fetch(API_CONFIG.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: formData.companyName,
        email: formData.email,
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending data to n8n workflow:", error);
    
    // If it's a CORS or network error, provide helpful feedback
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Please check if the n8n workflow is active and CORS is configured');
    }
    
    throw error;
  }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate company name
 * @param {string} companyName - Company name to validate
 * @returns {boolean} - Whether company name is valid
 */
export const validateCompanyName = (companyName) => {
  return companyName && companyName.trim().length >= 2;
};
