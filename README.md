# BRD Agent - Frontend Prototype

A complete React + Tailwind CSS frontend prototype for generating Business Requirements Documents (BRDs) from conversation platforms.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Button, Input, Modal, etc.)
│   ├── layout/          # Layout components (Navbar, Sidebar)
│   └── project/         # Project-specific components (Step components)
├── context/             # Context API for state management
│   ├── AuthContext.jsx  # Authentication state
│   └── ProjectContext.jsx # Project and step state
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── SignIn.jsx       # Login/Signup pages
│   ├── UserDashboard.jsx # Dashboard with projects
│   ├── NewProject.jsx   # Create new project
│   └── ProjectDashboard.jsx # Project processing steps
├── data/
│   └── dummyData.js     # Mock data for development
├── routes/
│   └── AppRoutes.jsx    # Route configuration
├── App.jsx              # Main app wrapper
├── index.jsx           # React entry point
└── index.css           # Global styles
```

## 🔐 Authentication

**Demo Credentials:**
- Email: `test@example.com`
- Password: `123456`

The authentication is dummy (stored in Context) and doesn't call any backend. All data is simulated.

## 🌍 Routes

| Route | Purpose | Protected |
|-------|---------|-----------|
| `/` | Home/Landing page | ❌ No |
| `/signin` | Sign in page | ❌ No |
| `/signup` | Sign up page | ❌ No |
| `/user/dashboard` | User's projects dashboard | ✅ Yes |
| `/user/project/new` | Create new project | ✅ Yes |
| `/user/project/:projectId/dashboard` | Project processing (4 steps) | ✅ Yes |

## 📊 4-Step Project Processing

1. **Data Extraction** - View and manage extracted facts from conversations
2. **Conflict Detection** - Identify and resolve conflicting requirements
3. **Final Summary** - Review all facts and generate BRD
4. **BRD Generated** - View final document and edit with natural language

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563EB`
- **Light Blue Hover**: `#1E40AF`
- **Background**: `#F8FAFC`
- **Surface**: `#FFFFFF`
- **Border**: `#E5E7EB`
- **Text Primary**: `#111827`
- **Text Secondary**: `#6B7280`
- **Success Green**: `#16A34A`
- **Warning Yellow**: `#EAB308`
- **Danger Red**: `#DC2626`

### Styling Features
- Tailwind CSS for styling
- `rounded-xl` for corners
- `shadow-sm` for soft shadows
- No gradients
- No dark mode
- Smooth transitions (0.3s)

## 💾 State Management

### AuthContext
- User authentication
- Login/signup/logout functions
- Current user information
- Loading and error states

### ProjectContext
- Projects list
- Current project
- Step progress tracking
- Facts extraction
- Conflict detection
- BRD document generation

## 🔄 Async Operations

All async operations use `setTimeout` to simulate API calls:
- Login: 1.5 seconds
- Project creation: 1.5 seconds
- Fact extraction: 2 seconds
- Conflict detection: 2 seconds
- BRD generation: 2 seconds
- BRD editing: 1.5 seconds

## 📱 Key Features

✅ Responsive sidebar (collapsible)
✅ Project cards with progress indicators
✅ Platform connection status
✅ File upload with drag & drop
✅ Confirmation modals for destructive actions
✅ Step progress tracking
✅ Natural language BRD editing
✅ Export simulation
✅ Data validation on all forms

## 🛠️ Technology Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool & dev server
- **Context API** - State management

## 📝 Code Comments

Every file includes beginner-friendly comments explaining:
- Component purpose
- Function behavior
- State management
- UI logic
- Data flow

## 🚀 Ready for Production

This prototype includes:
- ✅ Clean, professional SaaS design
- ✅ Proper error handling
- ✅ Form validation
- ✅ Loading states
- ✅ Empty states
- ✅ Responsive layout
- ✅ Accessible components
- ✅ Well-documented code

## 📋 Demo Data

The application comes with realistic dummy data:
- 3 sample projects
- 4 sample conversation facts
- 2 sample conflicts
- Complete sample BRD document

All can be customized in `src/data/dummyData.js`

## 🔮 Future Enhancements

To connect this to a real backend:
1. Replace dummy data with API calls
2. Replace `setTimeout` with actual HTTP requests
3. Implement real authentication
4. Add websocket support for real-time updates
5. Implement PDF export functionality

---

**Note:** This is a fully functional frontend prototype. All data is simulated and stored in Context API. No backend is required to run this application. 
