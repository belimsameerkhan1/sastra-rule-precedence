📜 Sastra Rule Precedence | Sanskrit Rule Verification & Conflict Resolution System

Sastra Rule Precedence is a professional full-stack web application developed as an Indian Knowledge Systems (IKS) project for formal verification and precedence analysis of Pāṇinian Sanskrit grammatical rules. The platform enables researchers and students to import rule datasets, detect precedence conflicts, simulate derivations, verify confluence and termination properties, and generate comprehensive verification reports through an intuitive modern interface.

The application features a premium dark-themed dashboard with responsive layouts, interactive visualizations, conflict graphs, verification reports, and an integrated rule management system.
🌟 Key Features
📖 Rule Authoring & Corpus Management
Import Sanskrit rule datasets (JSON/CSV)
Create, edit, update, and delete grammar rules
Rule metadata management
Corpus statistics dashboard
Structured rule storage
⚖️ Rule Verification Engine
Automated precedence verification
Classical Paribhāṣā rule resolution
Conflict detection
Rule dependency analysis
Verification history tracking
🔀 Conflict Detection
Detect overlapping grammar rules
Identify precedence violations
Rule dependency visualization
Conflict categorization
Interactive conflict graph
🔬 Verification Results
Confluence verification
Termination analysis
Conflict summary
Resolution statistics
Verification scorecards
Downloadable verification reports
📊 Interactive Dashboard
Rule statistics
Verification metrics
Recent verification history
Corpus analytics
Quick actions
Responsive data visualization
📑 Report Generation

Generate professional verification reports including:

Rule verification summary
Conflict analysis
Confluence score
Termination score
Resolution statistics
Downloadable JSON reports
🌐 Corpus Explorer
Browse imported Sanskrit corpora
Rule indexing
Search and filter rules
Metadata inspection
Dataset statistics
🎨 Modern Responsive UI
Mobile-first design
Dark theme
Responsive sidebar
Interactive cards
Glassmorphism-inspired interface
Optimized for desktop and mobile devices
🛠 Technology Stack
Frontend
React 18
Vite
Tailwind CSS
Lucide React Icons
Axios
React Router DOM
Backend
Node.js
Express.js
Python Verification Engine
REST APIs
CORS
Deployment
Frontend → Vercel
Backend → Render




📂 Folder Structure

sastra-rule-precedence/

│

├── client/                         # React Frontend

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   │   ├── DashboardView.jsx

│   │   │   ├── RuleAuthoringView.jsx

│   │   │   ├── ConflictGraphView.jsx

│   │   │   ├── VerificationResultView.jsx

│   │   │   ├── ReportsView.jsx

│   │   │   ├── CorpusView.jsx

│   │   │   ├── Navbar.jsx

│   │   │   └── Sidebar.jsx

│   │   │

│   │   ├── services/

│   │   │   └── api.js

│   │   │

│   │   ├── App.jsx

│   │   └── main.jsx

│   │

│   ├── package.json

│   └── vite.config.js

│

├── server/

│   ├── routes/

│   ├── controllers/

│   ├── middleware/

│   ├── package.json

│   └── server.js

│

├── engine/


│   ├── engine.py

│   ├── parser.py

│   ├── verifier.py

│   ├── precedence.py

│   ├── conflict_detector.py

│   └── requirements.txt

│

└── README.md


🚀 Setup & Installation
Prerequisites
Node.js v18+
Python 3.10+
pip
npm
1️⃣ Clone Repository
git clone https://github.com/belimsameerkhan1//sastra-rule-precedence.git

cd sastra-rule-precedence
2️⃣ Backend Setup
cd server

npm install
Create a .env
3️⃣ Python Verification Engine
cd engine

pip install -r requirements.txt
Run
python engine.py
4️⃣ Frontend Setup
cd client

npm install

npm run dev
Runs on
http://localhost:5173
⚙️ Deployment
https://sastra-rule-precedence.vercel.app/
Backend
Render
https://sastra-rule-precedence.onrender.com
📊 Modules
Dashboard
Rule Authoring
Conflict Detection
Verification Engine
Reports
Corpus Explorer

🔍 Verification Workflow
Import Rule Dataset
        │
        ▼
Parsing & Normalization
        │
        ▼
Conflict Detection
        │
        ▼
Precedence Resolution
        │
        ▼
Rewrite Simulation
        │
        ▼
Confluence Verification
        │
        ▼
Termination Analysis
        │
        ▼
Verification Result
        │
        ▼
Generate Report

📈 Features Implemented
✅ Rule Import
✅ Rule Authoring
✅ Conflict Detection
✅ Conflict Graph
✅ Verification Dashboard
✅ Reports Module
✅ Corpus Statistics
✅ Responsive Design
✅ REST API Integration
✅ Render Deployment
✅ Vercel Deployment

🎯 Future Enhancements
Real Sanskrit parser integration
Graph database visualization
Multi-user authentication
Version-controlled rule repository
AI-assisted conflict explanation
Export PDF reports
Interactive derivation trees

📜 Academic Context

This project was developed as part of an Indian Knowledge Systems (IKS) initiative focusing on the computational analysis of Pāṇinian Sanskrit grammar. It demonstrates how classical grammatical principles and Paribhāṣā (meta-rules) can be modeled, verified, and analyzed using modern software engineering techniques.

📄 License

This project is intended for educational and research purposes.
👨‍💻 Developed By

Belim Sameer Khan

B.Sc. Computer Science

Indian Knowledge Systems (IKS) Project
