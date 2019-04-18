// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import AddListing from "views/Forms/AddListing.jsx";
import PropertiesPage from "views/Properties/Properties.jsx";
import FirebaseTest from "views/FirebaseTest/FirebaseTest.jsx";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";
import PropertyItem from "./components/PropertyItem";

const dashboardRoutes = [
  {
    path: "/properties",
    name: "Properties",
    icon: Dashboard,
    component: PropertiesPage,
    layout: "/admin",
    display: true
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    display: false
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    display: false
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    display: false
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
    display: false
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
    display: false
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
    display: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
    display: false
  },
  {
    path: "/listings/add",
    name: "Add Listing",
    icon: Notifications,
    component: AddListing,
    layout: "/admin",
    display: true
  },
  {
    path: "/firebasetest",
    name: "FirebaseTest",
    icon: Dashboard,
    component: FirebaseTest,
    layout: "/admin",
    display: false
  }
];

export default dashboardRoutes;
