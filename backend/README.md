# Event Booking API - Backend

## Setup Instructions

### Prerequisites
- .NET 8 SDK installed
- Visual Studio or VS Code

### Installation

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Restore NuGet packages:
\`\`\`bash
dotnet restore
\`\`\`

3. Update appsettings.json with your configuration:
   - Change JWT Key to a secure 32+ character string
   - Configure Email settings (SMTP server, sender email, password)

4. Run the application:
\`\`\`bash
dotnet run
\`\`\`

The API will be available at `https://localhost:5001` or `http://localhost:5000`

### Database

The SQLite database will be automatically created and migrated on first run.

### API Endpoints

**Authentication:**
- POST /api/auth/register
- POST /api/auth/login

**Events:**
- GET /api/events
- GET /api/events/{id}
- POST /api/events (requires auth)
- PUT /api/events/{id} (requires auth)
- DELETE /api/events/{id} (requires auth)
- GET /api/events/user/my-events (requires auth)

**Bookings:**
- POST /api/bookings (requires auth)
- GET /api/bookings/my-bookings (requires auth)
- GET /api/bookings/event/{eventId} (requires auth)
- DELETE /api/bookings/{id} (requires auth)
