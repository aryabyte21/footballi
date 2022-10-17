import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const Analyst_insights = lazy(() => import("../pages/Videos/Analyst_insights"));
const Attacking = lazy(() => import("../pages/Videos/Attacking"));
const Corners = lazy(() => import("../pages/Videos/Corners"));
const Defending = lazy(() => import("../pages/Videos/Defending"));
const Freekick = lazy(() => import("../pages/Videos/Freekick"));
const Full_match = lazy(() => import("../pages/Videos/Full_matches"));
const Goals_conceded = lazy(() => import("../pages/Videos/Goals"));
const Goals_scored = lazy(() => import("../pages/Videos/Goals_scored"));
const Transd = lazy(() => import("../pages/Videos/Transd"));
const UploadVideo = lazy(()=> import("../pages/UploadVideo"));
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/stats",
    component: Modals,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/Analyst_insights",
    component: Analyst_insights,
  },
  {
    path: "/Attacking",
    component: Attacking,
  },
  {
    path: "/Corners",
    component: Corners,
  },
  {
    path: "/Defending",
    component: Defending,
  },
  {
    path: "/Freekick",
    component: Freekick,
  },
  {
    path: "/Full_match",
    component: Full_match,
  },
  {
    path: "/Goals",
    component: Goals_conceded,
  },
  {
    path: "/Goals_scored",
    component: Goals_scored,
  },
  {
    path: "/Transd",
    component: Transd,
  },
  {
    path: "/UploadVideo",
    component: UploadVideo,
  },
];

export default routes;
