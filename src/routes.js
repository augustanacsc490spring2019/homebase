// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import AddBox from "@material-ui/icons/AddBox";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import AddListing from "views/Forms/AddListing.jsx";
import PropertiesPage from "views/Properties/Properties.jsx";
import PropertyInfo from "./components/PropertyInfo";
// import FirebaseTest from "views/FirebaseTest/FirebaseTest.jsx";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";
// import PropertyItem from "./components/PropertyItem";

const dashboardRoutes = [
  {
    path: "/landing",
    name: "Landing",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    display: false
  },
  {
    path: "/listings",
    name: "Listings",
    icon: Dashboard,
    component: PropertiesPage,
    layout: "/admin",
    display: true
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    display: true
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
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  //   display: true
  // },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
    display: false
  },
  {
    path: "/addlisting",
    name: "Add Listing",
    icon: AddBox,
    component: AddListing,
    layout: "/admin",
    display: true
  },
  {
    path: "/listings/view/:id",
    name: "Listing",
    icon: Notifications,
    component: PropertyInfo,
    layout: "/admin",
    display: false
  }
  // ,
  // {
  //   path: "/listings/:id",
  //   name: "Listing",
  //   icon: Notifications,
  //   component: PropertyInfo,
  //   layout: "/admin",
  //   display: false
  // }

  // {
  //   path: "/firebasetest",
  //   name: "FirebaseTest",
  //   icon: Dashboard,
  //   component: FirebaseTest,
  //   layout: "/admin",
  //   display: false
  // }
];

export default dashboardRoutes;
