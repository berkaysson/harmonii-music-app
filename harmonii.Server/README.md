### Backend - harmonii Music Library Project

This backend repository is part of the harmonii, serving as the core of the platform's functionalities.

**Technology Stack:**
- **Framework:** ASP.NET Core using C#
- **Authentication:** ASP.NET Identity, JWT
- **Database ORM:** Entity Framework

**Features:**
- **Authentication and Authorization:** ASP.NET Identity and JWT tokens are used for user authentication and authorization.
- **Endpoints for Frontend:** Various endpoints have been created to facilitate communication with the frontend.
- **Database Management:** Entity Framework is employed to establish and manage database relations.

**Setup Instructions:**
1. Clone this repository.
2. Set up the necessary configurations for ASP.NET Identity and JWT.
3. Ensure Entity Framework migrations are up to date and reflect the database schema.
4. Configure the endpoints to interact with the frontend application.

**Authentication and Authorization:**
- ASP.NET Identity is utilized for user authentication and management.
- JWT tokens are generated and used for secure communication between frontend and backend.

**Database Relations:**
- Entity Framework is used to define and manage relationships between different entities:
  - Users, Songs, Playlists, etc.
