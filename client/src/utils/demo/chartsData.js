export const doughnutLegends = [
  { title: 'lost', color: 'bg-blue-500' },
  { title: 'won', color: 'bg-teal-600' },
  { title: 'draw', color: 'bg-purple-600' },
]

export const lineLegends = [
  { title: 'Kerela Blaster', color: 'bg-teal-600' },
  { title: 'Other teams', color: 'bg-purple-600' },
]

export const barLegends = [
  { title: 'Shoes', color: 'bg-teal-600' },
  { title: 'Bags', color: 'bg-purple-600' },
]

// export const doughnutOptions = {
//   data: {
//     datasets: [
//       {
//         data: [33, 33, 33],
//         /**
//          * These colors come from Tailwind CSS palette
//          * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
//          */
//         backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
//         label: 'Dataset 1',
//       },
//     ],
//     labels: ['Shoes', 'Shirts', 'Bags'],
//   },
//   options: {
//     responsive: true,
//     cutoutPercentage: 80,
//   },
//   legend: {
//     display: false,
//   },
// }

// export const lineOptions = {
//   data: {
//     labels: [
//       "Jamshedpur FC",
//       "Jamshedpur FC",
//       "FC Goa",
//       "Hyderabad FC",
//     ],
//     datasets: [
//       {
//         label: "Kerela Blasters",
//         /**
//          * These colors come from Tailwind CSS palette
//          * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
//          */
//         backgroundColor: "#0694a2",
//         borderColor: "#0694a2",
//         data: [1, 1, 4, 1],
//         fill: false,
//       },
//       {
//         label: "Opponent",
//         fill: false,
//         /**
//          * These colors come from Tailwind CSS palette
//          * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
//          */
//         backgroundColor: "#7e3af2",
//         borderColor: "#7e3af2",
//         data: [1,0,4,1],
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     tooltips: {
//       mode: "index",
//       intersect: false,
//     },
//     hover: {
//       mode: "nearest",
//       intersect: true,
//     },
//     scales: {
//       x: {
//         display: true,
//         scaleLabel: {
//           display: true,
//           labelString: "Month",
//         },
//       },
//       y: {
//         display: true,
//         scaleLabel: {
//           display: true,
//           labelString: "Value",
//         },
//       },
//     },
//   },
//   legend: {
//     display: false,
//   },
// };

export const barOptions = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Shoes',
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70],
      },
      {
        label: 'Bags',
        backgroundColor: '#7e3af2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}
