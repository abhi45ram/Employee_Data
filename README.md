Employee Data Management System
Host Link:
https://employee-data-ku9c.vercel.app/login

Getting Started
How to Run the Project
Clone the Repository:

git clone <-repo-link>

cd emplowise

Install Dependencies:
npm install

Start the Development Server:
npm start

Open the App:
Go to your browser and navigate to:
http://localhost:3000

Tech Stack Used
Frontend: React.js (with Hooks)

State Management: React Hooks (useState, useEffect)

HTTP Client: Axios

Styling: Tailwind CSS

Routing: React Router DOM

API: https://reqres.in (Mock Data)

Deployment: Vercel

 API Endpoints
The project uses the reqres.in API for fetching mock user data.

GET /api/users?page=1 → Fetches paginated list of users

POST /api/login → Authenticates the user and returns a token

PUT /api/users/:id → Updates user data

DELETE /api/users/:id → Deletes a user

Features
Login & Logout:

Secure authentication with token storage in localStorage.

Redirects to the login page if the token is missing or invalid.

User List:

Displays users with pagination.

Shows user avatar, name, and email.

Client-side Filtering:

Search users by full name (first_name + last_name).

Case-insensitive filtering.

 Edit & Delete Users:

Edit and remove users with real-time updates.

Displays success/error messages.

📱 Responsive Design:

Works on both desktop and mobile devices.
