# Nepal Disaster Response System

## Full Project Structure

```Bash
DisasterManagementApp
├── Server
│ ├── .env
│ ├── .gitignore
│ ├── package.json
│ ├── package-lock.json
│ ├── src
│ │ ├── app.js # Main application entry point
│ │ ├── server.js # Server setup and configuration
│ │ ├── config
│ │ │ └── db.js # Database configuration
│ │ ├── controllers
│ │ │ ├── authController.js # Authentication logic
│ │ │ ├── incidentController.js # Incident management logic
│ │ │ ├── resourceController.js # Resource management logic
│ │ │ └── responseController.js # Response management logic
│ │ ├── models
│ │ │ ├── User.js # User schema and model
│ │ │ ├── Incident.js # Incident schema and model
│ │ │ ├── Resource.js # Resource schema and model
│ │ │ └── Response.js # Response schema and model
│ │ ├── routes
│ │ │ ├── authRoutes.js # Authentication routes
│ │ │ ├── incidentRoutes.js # Incident routes
│ │ │ ├── resourceRoutes.js # Resource routes
│ │ │ └── responseRoutes.js # Response routes
│ │ ├── services
│ │ │ ├── authService.js # Authentication service
│ │ │ ├── incidentService.js # Incident service
│ │ │ ├── resourceService.js # Resource service
│ │ │ └── responseService.js # Response service
│ │ ├── utils
│ │ │ ├── apiUtils.js # Utility functions for API
│ │ │ ├── errorHandler.js # Error handling middleware
│ │ │ └── logger.js # Logging utility
│ │ └── tests
│ │ ├── auth.test.js # Authentication tests
│ │ ├── incident.test.js # Incident management tests
│ │ ├── resource.test.js # Resource management tests
│ │ └── response.test.js # Response management tests
|
├─ Client
├── .eslintrc.json
├── .gitignore
├── base.tldr
├── components.json
├── next-env.d.js
├── next.config.js
├── package-lock.json
├── package.json
├── tailwind.config.js
├── app
│ ├── globals.css
│ ├── layout.jsx
│ ├── page.jsx
│ ├── incidents
│ │ └── page.jsx # Incident reporting and overview
│ ├── resources
│ │ └── page.jsx # Resource tracking and management
│ ├── response
│ │ └── page.jsx # Response actions and status tracking
│ ├── alerts
│ │ └── page.jsx # Disaster alerts and notifications
│ ├── profile
│ │ └── page.jsx # User profile and role-based access
│ ├── login
│ │ └── page.jsx # Login page for disaster response personnel
│ └── signup
│ └── page.jsx # Signup page for new responders or volunteers
├── components
│ ├── IncidentForm.jsx # Form for submitting new disaster incidents
│ ├── ResourceForm.jsx # Form for adding resources (e.g., food, medicine)
│ ├── ResponseForm.jsx # Form for submitting response actions
│ ├── Navbar.jsx # Navigation bar
│ ├── Footer.jsx # Footer for the application
│ ├── DisasterMap.jsx # Map to visualize disaster locations and resources
│ ├── AlertNotification.jsx # Component to display disaster alerts
│ └── Sidebar.jsx # Sidebar for navigation
├── ui
│ ├── accordion.jsx
│ ├── alert-dialog.jsx
│ ├── button.jsx
│ ├── calendar.jsx
│ ├── card.jsx
│ ├── dialog.jsx
│ ├── dropdown-menu.jsx
│ ├── input.jsx
│ ├── label.jsx
│ ├── progress.jsx
│ ├── table.jsx
│ ├── toast.jsx
│ ├── tooltip.jsx
│ └── map.jsx # Map component for visualizing disaster data
├── hooks
│ └── useToast.js # Hook for managing toasts/notifications
├── lib
│ ├── auth.js # Authentication logic
│ ├── disasterUtils.js # Utility functions for managing disaster data
│ ├── data
│ │ ├── disasterData.js # Static disaster-related data (e.g., location details)
│ │ └── resources.js # Resource data (e.g., available resources, locations)
│ └── apiUtils.js # API utility functions for communicating with backend
├── public
│ └── images
│ └── logo.svg # Application logo
├── services
│ └── DisasterQueryService.js # Service to fetch disaster and resource data from backend
└── types
└── disasterTypes.js # Types for disaster-related data (e.g., Incident, Resource)
```

---

## **Tech Stack**

### **Frontend**
1. **React & Next.js**: For building the UI and handling routing.
2. **Tailwind CSS**: For styling.
3. **Leaflet**: For map visualization.
4. **TanStack Query**: For data fetching and caching.

### **Backend**
1. **Node.js & Express**: For building the API.
2. **PostgreSQL**: For database.
3. **JWT**: For authentication.
4. **Jest**: For testing.

---

## **Backend Implementation Details**

### **1. Database Configuration (`src/config/db.js`)**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

### **2. User Model (`src/models/User.js`)**

```javascript
const pool = require('../config/db');

const createUser = async (name, email, password) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1;
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

module.exports = { createUser, findUserByEmail };
```

### **3. Authentication Controller (`src/controllers/authController.js`)**

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashedPassword);
  res.status(201).json({ message: 'User registered successfully', user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
```

### **4. Server Setup (`src/server.js`)**

```javascript
const express = require('express');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## **Frontend Implementation Details**

### **1. API Utility (`lib/apiUtils.js`)**

```javascript
export const fetchDisasterData = async () => {
  const response = await fetch('https://bipadportal.gov.np/api/v1/');
  return response.json();
};
```

### **Disaster Map Component (`components/DisasterMap.jsx`)**

```javascript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const DisasterMap = () => {
  const disasterLocation = [27.7172, 85.3240]; // Kathmandu, Nepal
  
  return (
    <MapContainer center={disasterLocation} zoom={13} style={{ width: '100%', height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker position={disasterLocation}>
        <Popup>Disaster location</Popup>
      </Marker>
    </MapContainer>
  );
};
export default DisasterMap;
```
