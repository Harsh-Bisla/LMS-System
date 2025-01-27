import { createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import AdminProvider from './admin/store/adminContext'
import UserProvider from './store/userContext';
import { ToastContainer, Zoom } from 'react-toastify';
import Homepage from './pages/Homepage/Homepage';
import Login from './components/Login/Login';
import { AdminRoute, Authenticated, LoggedIn } from './ProtectedRoutes';
import Signup from './components/Login/Signup';
import Profile from './pages/Profile/Profile';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import Courseprogress from './components/CourseProgress/CourseProgress';
import MyLearning from './pages/MyLearning/MyLearning';
import Searchpage from './pages/SearchPage/Searchpage';
import Dashboard from './admin/dashboardHome/Dashboard';
import DashHome from './admin/DashHome';
import CreateCourse from './admin/CreateCourse/CreateCourse';
import Courses from './admin/Courses/Courses';
import EditCourse from './admin/EditCourse/EditCourse';
import EditLecture from './admin/EditLecture/EditLecture';
import CreateLecture from './admin/CreateLecture/CreteLecture';
import Footer from './components/Footer/Footer';

export const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      { path: "/", element: <Homepage /> },
      { path: "/login", element: <Authenticated><Login /></Authenticated> },
      { path: "/signup", element: <Authenticated><Signup /></Authenticated> },
      { path: "/profile", element: <LoggedIn><Profile /></LoggedIn> },
      { path: "/course-detail/:courseId", element: <CourseDetail /> },
      { path: "course-progress/:courseId", element: <LoggedIn><Courseprogress /></LoggedIn> },
      { path: "/my-learning", element: <LoggedIn><MyLearning /></LoggedIn> },
      { path: "/search-courses/:query", element: <Searchpage /> },

      // admin route
      {
        path: "/admin", element: <AdminRoute><Dashboard /></AdminRoute>, children: [
          { path: "/admin/dashboard", element: <DashHome /> },
          { path: "/admin/create-course", element: <CreateCourse /> },
          { path: "/admin/courses", element: <Courses /> },
          { path: "/admin/courses/:courseId", element: <EditCourse /> },
          { path: "/admin/course/:courseId/create-lecture", element: <CreateLecture /> },
          { path: "/admin/course/:courseId/edit-lecture/:lectureId", element: <EditLecture /> }
        ]
      }
    ]
  }
])

function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
        <Navbar />
        <Outlet />
        <Footer />
      </UserProvider>
    </AdminProvider>
  )
}

export default App
