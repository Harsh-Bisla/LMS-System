import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, { router } from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Homepage from './pages/Homepage/Homepage.jsx';
// import Login from './components/Login/Login.jsx';
// import Signup from './components/Login/Signup.jsx';
// import Profile from './pages/Profile/Profile.jsx';
// import Dashboard from './admin/dashboardHome/Dashboard.jsx';
// import DashHome from './admin/DashHome.jsx';
// import CreateCourse from './admin/CreateCourse/CreateCourse.jsx';
// import Courses from './admin/Courses/Courses.jsx';
// import EditCourse from './admin/EditCourse/EditCourse.jsx';
// import CreateLecture from './admin/CreateLecture/CreteLecture.jsx';
// import EditLecture from './admin/EditLecture/EditLecture.jsx';
// import CourseDetail from './pages/CourseDetail/CourseDetail.jsx';
// import Courseprogress from './components/CourseProgress/Courseprogress.jsx';
// import MyLearning from './pages/MyLearning/MyLearning.jsx';
// import Searchpage from './pages/SearchPage/Searchpage.jsx';
// import { AdminRoute, Authenticated, LoggedIn } from './ProtectedRoutes.jsx';
import UserProvider from './store/userContext.jsx';
import AdminProvider from './admin/store/adminContext.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/", element: <App />, children: [
//       { path: "/", element: <Homepage /> },
//       { path: "/login", element: <Authenticated><Login /></Authenticated> },
//       { path: "/signup", element: <Authenticated><Signup /></Authenticated> },
//       { path: "/profile", element: <LoggedIn><Profile /></LoggedIn> },
//       { path: "/course-detail/:courseId", element: <CourseDetail /> },
//       { path: "course-progress/:courseId", element: <Courseprogress /> },
//       { path: "/my-learning", element: <LoggedIn><MyLearning /></LoggedIn> },
//       { path: "/search-courses/:query", element: <Searchpage /> },

//       // admin route
//       {
//         path: "/admin", element: <Dashboard />, children: [
//           { path: "/admin/dashboard", element: <DashHome /> },
//           { path: "/admin/create-course", element: <CreateCourse /> },
//           { path: "/admin/courses", element: <Courses /> },
//           { path: "/admin/courses/:courseId", element: <EditCourse /> },
//           { path: "/admin/course/:courseId/create-lecture", element: <CreateLecture /> },
//           { path: "/admin/course/:courseId/edit-lecture/:lectureId", element: <EditLecture /> }
//         ]
//       }
//     ]
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
