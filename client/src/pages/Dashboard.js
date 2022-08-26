import React, { useState, useEffect } from 'react'
import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { sad, won, match, draw } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Input,
} from '@windmill/react-ui'

import {
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import { rj, useRunRj } from "react-rocketjump";
import { ajax } from "rxjs/ajax";
const PlayersState = rj({
  effectCaller: rj.configured(),
  effect:
    (token) =>
    (search = "") =>
      ajax.getJSON(`/api/players/?search=${search}`, {
        Authorization: `Bearer ${token}`,
      }),
});

const CounterState = rj({
  effectCaller: rj.configured(),
  effect:
    (token) =>
    (search = "") =>
      ajax.getJSON(`/api/match/?search=${search}`, {
        Authorization: `Bearer ${token}`,
      }),
});

const TeamState = rj({
  effectCaller: rj.configured(),
  effect:
    (token) =>
    (search = "") =>
      ajax.getJSON(`/api/team/?search=${search}`, {
        Authorization: `Bearer ${token}`,
      }),
});

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  //player data
   const [search, setSearch] = useState("");
   const [{ data: players}] = useRunRj(PlayersState, [search], false);
  const [{ data: counter }] = useRunRj(CounterState, [search], false);
    const [{ data: team }] = useRunRj(TeamState, [search], false);

  // const sum1 = counter.reduce((total, currentValue)=>total = total + currentValue.win, 0);
const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [
          counter &&
            counter.reduce(
              (total, currentValue) => (total = total + currentValue.win),
              0
            ),
          counter &&
            counter.reduce(
              (total, currentValue) => (total = total + currentValue.lose),
              0
            ),
          counter &&
            counter
              .reduce(
                (total, currentValue) => (total = total + currentValue.draw),
                0
              ),
        ],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
        label: "Dataset 1",
      },
    ],
    labels: ["won", "lost", "draw"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};
   // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length
  const [name, setName] = useState(10);
   const handleSubmit = (evt) => {
     evt.preventDefault();
   };
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      {/* CTA */}
      <div
        className="flex items-center justify-between p-4 mb-8 text-m font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
        href="https://www.sportskpi.com/"
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="flex">
            The last
            {
              <input
                type="text"
                className="focus:ring-black-500 focus:border-black-500 block w-8 h-4 align-middle mt-1 p-1 m-auto  sm:text-sm text-center text bg-purple-400 mr-1 ml-1 static text-gray-200 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            }{" "}
            matches.{" "}
          </span>
        </div>
        {/* <span>
          View more{" "}
          <span dangerouslySetInnerHTML={{ __html: "&RightArrow;" }}></span>
        </span> */}
      </div>

      {/* <h1>hello world</h1>

      {team &&
        team
          .slice(0, 4)
          .map((player) => <h1 key={player.id}>{player.name}</h1>)}
      {counter &&
        counter.reduce((total, currentValue) => (total = total + 1), 0)}
      {name} */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Total Matches"
          value={
            counter &&
            counter
              .slice(0, name)
              .reduce((total, currentValue) => (total = total + 1), 0)
          }
        >
          <RoundIcon
            icon={match}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Won"
          value={
            counter &&
            counter
              .slice(0, name)
              .reduce(
                (total, currentValue) => (total = total + currentValue.win),
                0
              )
          }
        >
          <RoundIcon
            icon={won}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Lost"
          value={
            counter &&
            counter
              .slice(0, name)
              .reduce(
                (total, currentValue) => (total = total + currentValue.lose),
                0
              )
          }
        >
          <RoundIcon
            icon={sad}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Draw"
          value={
            counter &&
            counter
              .slice(0, name)
              .reduce(
                (total, currentValue) => (total = total + currentValue.draw),
                0
              )
          }
        >
          <RoundIcon
            icon={draw}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <TableContainer>
        <div className="h-64 overflow-scroll">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>foot</TableCell>
                <TableCell>height</TableCell>
                <TableCell>DOB</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {players &&
                players.map((player, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {player.position}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{player.player_foot}</span>
                    </TableCell>
                    <TableCell>
                      <Badge type={player.position}>
                        {player.player_height}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(player.dob).toLocaleDateString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <TableFooter>
          {/* <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          /> */}
        </TableFooter>
      </TableContainer>
      {/* vs */}

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-8">
        {/* <InfoCard
          title="Total Matches"
          value={
            counter &&
            counter
              .slice(0, name)
              .reduce((total, currentValue) => (total = total + 1), 0)
          }
        >
        </InfoCard> */}
        {counter &&
          counter.slice(0, 4).map((player) => (
            <div key={player.id}>
              <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4"></div>
                <div class="flex flex-col items-center pb-10">
                  <div className="flex">
                    <img
                      class="mb-3 w-20 h-20 rounded-full shadow-lg mx-2"
                      src={
                        team &&
                        team.map((player1) => (
                            player1.logo
                        ))
                      }
                      alt="Bonnie image"
                    />{" "}
                    <img
                      class="mb-3 w-20 h-20 rounded-full shadow-lg mx-2 object-scale-down"
                      src={player.opponent_icon}
                      alt="Bonnie image"
                    />
                  </div>
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {player.goals} : {player.opponent_goals}
                  </h5>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {team &&
                      team.map((player1) => (
                        <h1 key={player1.id}>
                          {player1.name} vs {player.opponent}
                        </h1>
                      ))}
                  </span>
                  <div class="flex mt-4 space-x-3 md:mt-6">
                    <a
                      href="#"
                      class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Videos
                    </a>
                    <a
                      href="#"
                      class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                      Analysis
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="total stats">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="performance">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard
