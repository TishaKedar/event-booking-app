# Event Booking Web Application

A modern, full-stack event booking platform built with ASP.NET Core 8, React 18, and SQLite. This application allows users to create, manage, and book events with a beautiful, responsive interface featuring vibrant gradients, smooth animations, and professional design.

## Features

### User Authentication & Security
- Secure user registration and login with JWT authentication
- Password hashing using SHA256
- Token-based API authorization
- Protected routes and endpoints

### Event Management
- Create, view, update, and delete events
- Rich event details: title, description, date, time, location, max attendees, and image
- Real-time attendee count tracking
- User-specific event listings

### Event Booking System
- Browse and search events
- Book events with personal details (name, email, phone, additional info)
- Booking history and management
- Cancel bookings functionality

### Dashboard
- Comprehensive user dashboard for event creators
- View and manage created events
- Monitor all bookings for your events
- Edit or delete events
- Cancel bookings on behalf of attendees

### Modern UI/UX
- Vibrant gradient color scheme (purples, blues, oranges)
- Smooth animations and transitions
- Responsive design for all devices
- Professional component styling with Tailwind CSS
- Loading states and error handling

## Technology Stack

### Backend
- **ASP.NET Core 8** - Web API framework
- **Entity Framework Core** - ORM for database operations
- **SQLite** - Lightweight database
- **JWT Bearer Authentication** - Secure token-based auth
- **Swashbuckle** - API documentation

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Styled Components** - Component styling

## Prerequisites

Before running this application, ensure you have the following installed:

- **.NET 8 SDK** - Download from [Microsoft](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - Download from [Node.js](https://nodejs.org/)
- **npm or yarn** - Package manager (comes with Node.js)
- **Git** - Version control system

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/event-booking-app.git
cd event-booking-app
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Restore NuGet packages:
```bash
dotnet restore
```

3. Configure the application settings (see Configuration section below)

4. Run the backend:
```bash
dotnet ef database update

-If you don't have EF Core tools installed:
dotnet tool install --global dotnet-ef

dotnet run
```

The API will be available at:
- HTTPS: `https://localhost:5001`
- HTTP: `http://localhost:5000`
- Swagger UI: `https://localhost:5001/swagger` (in development)

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. **Configure Frontend Environment**

   Create a `.env` file inside the frontend folder and add the following line:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   This tells the React frontend where your backend API is running.
   If you deploy your backend later (for example, to Azure or Netlify), update this line with your live API URL:
   ```
   VITE_API_BASE_URL=https://your-live-api-url/api
   ```

4. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## ⚙️ Configuration

### Backend Configuration (appsettings.json)

Update the `backend/appsettings.json` file with your settings:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "AllowedHosts": "*",
  "Jwt": {
    "Key": "your-super-secret-jwt-key-at-least-32-characters-long-change-in-production",
    "Issuer": "EventBookingAPI",
    "Audience": "EventBookingClient"
  }
}
```

## Database

SQLite is automatically created and migrated on the first run. The database file `eventbooking.db` will be created in the backend directory.

## API Documentation

Swagger is available at:

`https://localhost:5001/swagger`

##  Project Structure

```
event-booking-app/
├── backend/                          # ASP.NET Core Web API
│   ├── Controllers/                  # API endpoint controllers
│   │   ├── AuthController.cs
│   │   ├── EventsController.cs
│   │   ├── BookingsController.cs
│   ├── Models/                       # Data models and DTOs
│   │   ├── User.cs
│   │   ├── Event.cs
│   │   ├── Booking.cs
│   │   └── DTOs/
│   ├── Services/                     # Business logic services
│   │   ├── AuthService.cs
│   │   ├── EventService.cs
│   │   └── BookingService.cs
│   ├── Data/
│   │   └── ApplicationDbContext.cs   # EF Core database context
│   ├── Migrations/                   # Database migrations
│   ├── Program.cs                    # Application entry point
│   ├── appsettings.json              # Configuration
│   └── EventBookingAPI.csproj        # Project file
├── frontend/                         # React application
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/                    # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── EventList.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── EventForm.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # App entry point
│   │   └── index.css                 # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── hooks/                            # Custom React hooks
├── lib/                              # Utility functions
├── components/                       # Shared UI components
├── public/                           # Static assets
└── README.md                         # This file
```

##  Troubleshooting

### Backend Issues
- **Port already in use**: Change the port in `Program.cs` or kill the process using the port
- **Database connection failed**: Ensure SQLite is properly installed and the connection string is correct
- **JWT authentication fails**: Verify the JWT key is at least 32 characters long

### Frontend Issues
- **API connection failed**: Ensure the backend is running and CORS is configured correctly
- **Build fails**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- **Styling issues**: Ensure Tailwind CSS is properly configured

### Database Issues
- **Migration errors**: Delete the database file and let EF Core recreate it
- **Data corruption**: Reset the database by deleting `eventbooking.db`

##  Deployment

### Backend Deployment
1. Publish the application:
```bash
cd backend
dotnet publish -c Release -o ./publish
```

2. Configure production `appsettings.json` with secure secrets
3. Deploy to your hosting platform (Azure, AWS, etc.)

### Frontend Deployment
1. Build the application:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)
3. Update API base URL for production

##  Future Enhancements

- OAuth integration (Google, GitHub)
- Event categories and advanced filtering
- Event ratings and reviews
- Payment integration (Stripe, PayPal)
- Admin dashboard with analytics
- Mobile app version
- Event templates
- Social sharing features
- Calendar integration
- Multi-language support

---




