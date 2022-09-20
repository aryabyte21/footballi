/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Forms',
  // },
  // {
  //   path: "/app/cards",
  //   icon: "CardsIcon",
  //   name: "Videos",
  // },
  {
    path: "/app/charts",
    icon: "ChartsIcon",
    name: "Visualize",
  },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  {
    path: "/app/modals",
    icon: "ModalsIcon",
    name: "Stats",
  },
  {
    path: "/app/tables",
    icon: "TablesIcon",
    name: "Performance Table",
  },
  {
    icon: "CardsIcon",
    name: "Videos",
    routes: [
      // submenu
      {
        path: "/app/Full_match",
        name: "Full Matches",
      },
      {
        path: "/app/Analyst_insights",
        name: "Analyst Insights",
      },
      {
        path: "/app/Attacking",
        name: "Attacking",
      },
      {
        path: "/app/Corners",
        name: "Corners",
      },
      {
        path: "/app/Defending",
        name: "Defending",
      },
      {
        path: "/app/Freekick",
        name: "Freekick",
      },
      {
        path: "/app/Goals",
        name: "Goals",
      },
      {
        path:"/app/Transd",
        name:"Transition",
      },
    ],
  },
];

export default routes
