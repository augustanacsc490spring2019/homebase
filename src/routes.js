// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AddBox from "@material-ui/icons/AddBox";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
// import Maps from "views/Maps/Maps.jsx";
import AddListing from "views/Forms/AddListing.jsx";
import PropertiesPage from "views/Properties/Properties.jsx";
import PropertyInfo from "./components/Property/PropertyInfo";
import EditProfile from "./views/EditProfile/EditProfile";
import EditListing from "./views/Forms/EditListing";
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
    path: "/listings/current",
    name: "Listings",
    icon: Dashboard,
    component: PropertiesPage,
    layout: "/admin",
    display: true
  },
  {
    path: "/listings/:lat/:lng",
    name: "Listings within 10 miles",
    icon: Dashboard,
    component: PropertiesPage,
    layout: "/admin",
    display: false
  },
  {
    path: "/user/profile",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    display: true
  },
  {
    path: "/user/edit",
    name: "Edit Profile",
    icon: Notifications,
    component: EditProfile,
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
    path: "/listings/add",
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
  },
  {
    path: "/listings/edit/:id",
    name: "Listing",
    icon: Notifications,
    component: EditListing,
    layout: "/admin",
    display: false
  }
];

export default dashboardRoutes;
