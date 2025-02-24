# SimpleBox - Your File Storage Solution

SimpleBox is a simplified Dropbox-like application that allows users to upload, download, and manage their files through a web application. Built with a modern tech stack, it provides a seamless user experience for file management.

## Features
- **User Authentication**: Secure user registration and login.
- **File Upload**: Users can upload files with restrictions on file types (txt, jpg, png, json).
- **File Listing**: A user home page that lists all uploaded files.
- **File Download**: Users can download their files easily.
- **File Preview**: View contents of text and JSON files.
- **Responsive Design**: Built with Tailwind CSS for a modern look and feel.

## Technologies
- **Frontend**: 
  - Next.js (React framework)
  - Tailwind CSS (for styling)
- **Backend**: 
  - Node.js with Express
  - MongoDB (for persistent storage)
- **State Management**: React Context API
- **Docker**: For containerization and easy deployment


## API Endpoints
- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Login a user
- **POST** `/api/upload`: Upload a file
- **GET** `/api/files`: Get a list of all files
- **GET** `/api/download/:id`: Download a file by ID
- **GET** `/api/preview/:id`: Preview a file by ID
