# Summary Bot

A clean, professional React application built with Vite and Tailwind CSS that collects company information and integrates with n8n workflows to send automated emails.

## Features

- 🎨 Clean, professional design with Tailwind CSS
- 📱 Fully responsive layout
- ✅ Form validation with real-time feedback
- 🔗 n8n workflow integration ready
- ⚡ Fast development with Vite
- 🎯 TypeScript support ready

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ContactForm.jsx  # Main form component
│   ├── Header.jsx       # Page header
│   └── Footer.jsx       # Page footer
├── layouts/             # Layout components
│   └── MainLayout.jsx   # Main page layout
├── utils/               # Utility functions
│   └── api.js          # API and validation utilities
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles with Tailwind
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your n8n webhook URL:
   ```
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/summary-bot
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## n8n Integration

The app is designed to work with n8n workflows. The form sends a POST request to your configured webhook URL with the following payload:

```json
{
  "companyName": "Example Company",
  "email": "contact@example.com",
  "timestamp": "2025-02-09T10:30:00.000Z"
}
```

### Setting up n8n Workflow

1. Create a new workflow in n8n
2. Add a Webhook node as the trigger
3. Configure your email sending logic
4. Copy the webhook URL to your `.env` file

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Inter Font** - Clean, professional typography

## Development

The app includes:
- Form validation with real-time feedback
- Loading states and error handling
- Professional styling with hover and focus states
- Accessibility considerations
- Clean component architecture

## Customization

You can easily customize:
- Colors and styling in Tailwind classes
- Form fields in `ContactForm.jsx`
- API endpoint in `utils/api.js`
- Layout and content in respective components