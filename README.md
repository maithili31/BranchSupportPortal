BranchSupportPortal : - 

BranchSupportPortal is a real-time customer support messaging system designed for support agents to efficiently manage, prioritize, and respond to customer inquiries at scale.

The application provides an agent dashboard where incoming customer messages can be viewed in real time, urgent issues are highlighted, and replies can be sent quickly using pre-configured canned responses. The system is built to simulate how modern customer support tools like Zendesk or Intercom work internally.

Key Features :- 
1. Agent Dashboard to view and respond to customer messages
2. Real-time updates using polling (no page refresh required)
3. Urgency detection for loan and payment-related messages
4. Canned replies for faster agent responses
5. Message status tracking (Replied / Pending)
6. Persistent replies stored in database
7. Multi-agent support (multiple tabs or browsers stay in sync)
8. Clean, production-style UI optimized for agent workflows

Tech Stack:- 
Frontend
    React (Vite)
    JavaScript
    CSS (inline styling for clarity)
Backend
    Node.js
    Express
    SQLite (lightweight relational database)

Project Structure : - 

BranchSupportPortal/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   ├── messages.js
│   │   └── canned.js
│   ├── urgency.js
│   └── seed.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── api.js
    │   └── App.jsx
    ├── package.json
    └── vite.config.js

Setup Instructions (Local Development)
    Prerequisites
        Node.js (v18 or later recommended)
        npm
        SQLite (CLI or DB Browser for SQLite)

1. Clone the Repository
    git clone https://github.com/<your-username>/BranchSupportPortal.git
    cd BranchSupportPortal
2. Backend Setup
    cd backend
    npm install
Create database : - 
    Ensure the database has the replied column:
    ALTER TABLE messages ADD COLUMN replied INTEGER DEFAULT 0;
    (Only required once if database already exists.)

Seed initial data:-
    node seed.js

Start backend server
    npm start

Backend will run at: http://localhost:5000
Test backend:
    http://localhost:5000/api/messages
    http://localhost:5000/api/canned

3. Frontend Setup
    cd ../frontend
    npm install

    Start frontend
    npm run dev

    Frontend will run at:   http://localhost:5173

4. Simulate Incoming Customer Messages

Use PowerShell (Windows):

    Invoke-RestMethod -Uri http://localhost:5000/api/messages `
    -Method POST `
    -ContentType "application/json" `
    -Body '{ "customer": "User 999", "content": "My loan has not been disbursed yet" }'

The message will appear in the agent dashboard automatically within a few seconds.

