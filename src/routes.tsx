import { createBrowserRouter } from "react-router-dom";
import AccountSettings from "./components/common/AccountSettings";
import Comments from "./components/common/Comments";
import Notification from "./components/common/Notification";
import Notifications from "./components/common/Notifications";
import ProfileDetails from "./components/common/ProfileDetails";
import Grading from "./components/doctor/Grading";
import MergeGroups from "./components/doctor/MergeGroups";
import SupervisedProjects from "./components/doctor/SupervisedProjects";
import SupervisorSubmissions from "./components/doctor/SupervisorSubmissions";
import AvailableGroups from "./components/student/AvailableGroups";
import AvailableSupervisors from "./components/student/AvailableSupervisors";
import Prerequisites from "./components/student/Prerequisites";
import ProjectDetails from "./components/student/ProjectDetails";
import Submissions from "./components/student/Submissions";
import useAuth from "./hooks/useAuth";
import AdminPage from "./pages/AdminPage";
import DoctorPage from "./pages/DoctorPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import CreateStudentAccount from "./pages/auth/CreateStudentAccount";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import SignUp from "./pages/auth/SignUp";
import VerifyEmail from "./pages/auth/VerifyEmail";
import VerifyEmailForPassword from "./pages/auth/VerifyEmailForPassword";

const { user } = useAuth();

const mainRoute =
  user.type === "student"
    ? {
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <StudentPage />,
          },
          { path: "prerequisites/gp/:projectType", element: <Prerequisites /> },
          { path: "prerequisites/gp/:projectType", element: <Prerequisites /> },
          { path: "available-groups", element: <AvailableGroups /> },
          { path: "available-supervisors", element: <AvailableSupervisors /> },
          { path: "my-project", element: <ProjectDetails /> },
          { path: "submissions", element: <Submissions /> },
          { path: "submissions/abstract-comments", element: <Comments /> },
          { path: "account-settings", element: <AccountSettings /> },
          { path: ":username", element: <ProfileDetails withGPStates /> },
          { path: "notifications", element: <Notifications /> },
          { path: "notification/:id", element: <Notification /> },
        ],
      }
    : user.type === "doctor"
    ? {
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DoctorPage />,
          },
          { path: "account-settings", element: <AccountSettings /> },
          { path: ":username", element: <ProfileDetails /> },
          { path: "supervised-projects", element: <SupervisedProjects /> },
          { path: "submissions", element: <SupervisorSubmissions /> },
          { path: "merge-groups", element: <MergeGroups /> },
          { path: "grading", element: <Grading /> },
          { path: "notifications", element: <Notifications /> },
          { path: "notification/:id", element: <Notification /> },
        ],
      }
    : user.type === "admin"
    ? {
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      }
    : {
        path: "/",
        element: <ErrorPage />,
      };

const router = createBrowserRouter([
  mainRoute,
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/create-student-account", element: <CreateStudentAccount /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/verify-email-for-password", element: <VerifyEmailForPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

export default router;
