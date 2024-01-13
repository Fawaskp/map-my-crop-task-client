# 🚀 POI Application (Client)
_This application is designed to manage Places of Interests (POIs) with their respective locations and names. this application provides client side for handling user authentication, CRUD operations on POIs, and user management._

## Features
  - ### User
      - Registration & Login
      - POI (Place of interest) Adding by clicking on map
  - ### Admin
      - Login
      - View and Create Normal User as well as Admin
      - view all POI's
  - ### Design
      - neet UI
      - Dark and Light Theme implemented (system preference)
      - Responsive design

## Installation and Setup

#### 1 Prerequisites:
- Make sure you have __Node.js 18.17 or later__  and npm (Node Package Manager) installed on your system. You can download and install them from the official Node.js website: https://nodejs.org/

#### 2 Clone the Repository:

- Open your terminal or command prompt.
- Change the current working directory to where you want to store the POI application.
- Run the following command to clone the frontend repository:
```bash
git clone https://github.com/Fawaskp/map-my-crop-task-client.git
```
#### 3 Install Frontend Dependencies:
- Change the current working directory to the project's frontend folder
- Run the following command to install the frontend dependencies:
```bach
npm install
```

#### 4 Environment Variables:
- Refer [environment variables](https://github.com/Fawaskp/map-my-crop-task-client#environment-variables) for setting up the required environment variables for the LearnEase frontend.


#### 5 Start the Development Server (Frontend):
- After the dependencies are installed, start the frontend development server by running the following command:
```bash
npm run dev
```
- This will build the frontend and open the development server at http://localhost:3000 (or another available port if 3000 is already in use).

### Setup Backend
Before running this application, set up the backend server and make sure its working proper, otherwise  it will lead to errors.

[POI API Repository](https://github.com/Fawaskp/map-my-crop-task-api)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file and store it in the root directory of the project:

` BASE_URL`

` NEXT_PUBLIC_USER_BASE_URL = $BASE_URL/user`

` NEXT_PUBLIC_ADMIN_BASE_URL = $BASE_URL/admin`

 `NEXT_PUBLIC_API_BASE_URL = $BASE_URL`
