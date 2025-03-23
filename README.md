# User Management System

This is a user management system built with React and Material-UI. The application allows the creation, display, search, and deletion of users for a given company. It also provides a user-friendly interface for managing users with validation checks during user creation.

## Features

- Create new users with validation for required fields, matching emails and passwords.
- Check if the user already exists in the system before creating a new user.
- Search for users by their name.
- Delete users from the system.
- Pagination to navigate through users if there are many.
- Display error and success messages with Snackbar alerts.
- Responsive design built with Material-UI components.

## Tech Stack

- **Frontend**: React, Material-UI
- **State Management**: React Hooks (useState, useEffect)
- **Backend Services**: Fetching user data and interacting with the server using `userService.js`
- **Icons**: Material-UI Icons

## Prerequisites

Before you start, you need to have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/miriam-altman/Users-Frontend.git
2. Install the packages
 ```bash
   npm install
3. Run the project
 ```bash
   npm start