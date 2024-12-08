import Signup from './components/auth/Signup';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CreateCompany from './components/admin/CreateCompany';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AboutUs from './components/AboutUs';
import Navbar from './components/shared/Navbar';

// Layout component to include the Navbar
const MainLayout = () => (
  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen">
    <Navbar />
    <Outlet /> {/* Renders the child route components */}
  </div>
);

// Create a separate layout for admin routes, if needed
const AdminLayout = () => (
  <div className="bg-white min-h-screen">
    <Navbar /> {/* Display the Navbar in admin routes too */}
    <Outlet /> {/* Renders the admin child route components */}
  </div>
);

const appRouter = createBrowserRouter([
  {
    element: <MainLayout />, // Use MainLayout for these routes
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/browse', element: <Browse /> },
      { path: '/profile', element: <Profile /> },
      { path: '/description/:id', element: <JobDescription /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    element: <AdminLayout />, // Use AdminLayout for admin routes
    children: [
      { path: '/admin/companies', element: <ProtectedRoute><Companies /></ProtectedRoute> },
      { path: '/admin/companies/create', element: <ProtectedRoute><CreateCompany /></ProtectedRoute> },
      { path: '/admin/companies/:id', element: <ProtectedRoute><CompanySetup /></ProtectedRoute> },
      { path: '/admin/jobs', element: <ProtectedRoute><AdminJobs /></ProtectedRoute> },
      { path: '/admin/jobs/create', element: <ProtectedRoute><PostJobs /></ProtectedRoute> },
      { path: '/admin/jobs/:id/applicants', element: <ProtectedRoute><Applicants /></ProtectedRoute> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
