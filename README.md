# GIS Application

This is a GIS (Geographic Information System) application for displaying schools and residential buildings in Banja Luka. The application allows for editing and deletion of schools and buildings, as well as finding a suitable location for a new school based on the distance from existing schools, proximity to roads, and the number of residential buildings in its vicinity.
Application consists of a frontend built with React, a backend built with Axios server, and a PostgreSQL database.

## Frontend Setup

To set up the frontend part of the application, follow these steps:

1. Obtain an API token from [Mapbox](https://www.mapbox.com). You will need this token to display maps and geospatial data.

2. Open a terminal or command prompt and navigate to the frontend directory.

3. Run the following command to install the required dependencies:

   npm install

4. After the installation is complete, start the application using the following command:


5. The frontend should now be running and accessible at `http://localhost:3000` in your web browser.

## Backend Setup

To set up the backend part of the application, follow these steps:

1. Modify the parameters in the `.env` file to configure the database connection. Update the necessary values such as the database URL, username, password, etc., to match your PostgreSQL database setup.

2. Open a terminal or command prompt and navigate to the backend directory.

3. Run the following command to install the required dependencies:

   npm install

4. Once the installation is complete, start the backend server using the following command:


5. The backend server should now be running and listening for incoming requests.

## Additional Notes

- Ensure that you have Node.js and npm (Node Package Manager) installed on your system before proceeding with the setup.

- Make sure your PostgreSQL database is up and running with the required schema and tables before starting the backend server.

- Feel free to customize and extend the application according to your requirements.
