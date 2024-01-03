### harmonii Music Library Project

This project aims to create a social music-sharing platform where users can contribute and curate their own library of songs. The flow of the platform is outlined as follows:

- Users must log in to access the platform.
- New users need to register, and their memberships will be approved by platform administrators.
- Logged-in users can access all songs and create their playlists.
- There will be three types of users:
  - **Standard Users**: They can view, listen songs and create playlists.
  - **Moderator Users**: In addition to standard user privileges, they can add and delete songs and genres to the platform.
  - **Admin Users**: They approve user registrations, can elevate standard users to moderators, delete users, and possess all moderator privileges.

Information stored for each song on the platform includes:
- Song Title
- Artist
- Genre
- Cover Image
- Audio File
- User who added the song to the platform

**Frontend (React.js):**
- The frontend utilizes React.js for the user interface as single page app.
- Firebase Cloud Storage is utilized to store song files.

**Backend (C#):**
- The backend is written in C#, Asp.Net Core.
- Utilizes MsSql as the database.
- Implements user authentication, song management, and user roles.

**Deployment:**
- Azure services are utilized for deployment:
  - **Azure SQL Server**: Used for the MsSql database.
  - **Azure App Services**: Hosts the backend C# application.
  - **Azure API Management**: Manages and secures by the Cors of APIs used for communication between frontend and backend.

**Setup Instructions:**
1. Clone the repository.
2. Configure the backend with C# and MsSql database.
3. Connect the frontend to the backend API for communication.

**Usage:**
1. Run the backend server.
2. Launch the frontend application.
3. Users can register/login, view songs, create playlists, and perform actions based on their assigned roles.

Feel free to customize and enhance this project based on specific requirements or additional functionalities.

For more detailed instructions on setup and deployment, refer to the respective README files in the frontend and backend directories of the repository.
