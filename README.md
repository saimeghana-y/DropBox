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

## Running the Application with Docker

To run the application using Docker, follow these steps:

1. **Ensure Docker is Installed**: Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).

2. **Clone the Repository**: If you haven't already, clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/SimpleBox.git
   cd SimpleBox
   ```

3. **Build the Docker Images**: Navigate to the root of the project and run the following command to build the Docker images:
   ```bash
   docker-compose build
   ```

4. **Start the Docker Containers**: After building the images, start the containers using:
   ```bash
   docker-compose up -d
   ```

5. **Access the Application**: Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the application running.

6. **Stopping the Application**: To stop the running containers, use:
   ```bash
   docker-compose down
   ```

## API Endpoints
- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Login a user
- **POST** `/api/upload`: Upload a file
- **GET** `/api/files`: Get a list of all files
- **GET** `/api/download/:id`: Download a file by ID
- **GET** `/api/preview/:id`: Preview a file by ID


## Screens
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/792be425-2e5f-483f-b3a6-0bea1dcc6689" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/09b3b158-0825-4df9-b97b-fd77fa2e21ef" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/e3771b14-89b5-424e-a79e-ef388e5ae918" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/48bb7954-cb03-40f0-88a9-510e05429043" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/d7c75225-0ee0-4075-956e-683d50e6f37b" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/3c87db6a-d098-4d88-8b20-926e499bedc0" />
