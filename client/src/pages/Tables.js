import React, { useState, useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import CTA from '../components/CTA'
import {
  Input,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { SearchIcon } from '../icons';
import { EditIcon, TrashIcon } from '../icons'
import { rj, useRunRj } from "react-rocketjump";
import { ajax } from "rxjs/ajax";

import response from '../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Tables() {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])

  const PerformanceState = rj({
    effectCaller: rj.configured(),
    effect:
      (token) =>
      (search = "") =>
        ajax.getJSON(
          `https://api.sportskpi.com/api/performance/?search=${search}`,
          {
            Authorization: `Bearer ${token}`,
          }
        ),
  });

  const TeamState = rj({
    effectCaller: rj.configured(),
    effect:
      (token) =>
      (search = "") =>
        ajax.getJSON(`https://api.sportskpi.com/api/players/?search=${search}`, {
          Authorization: `Bearer ${token}`,
        }),
  });


  const [search, setSearch] = useState("");
  const [{ data: performance }] = useRunRj(PerformanceState, [search], false);
  const [{ data: players }] = useRunRj(TeamState, [search], false);

  return (
    <>
      <PageTitle>Performance Table</PageTitle>
      <CTA />

      {/* <div className="flex justify-center flex-1 lg:mr-32 ">
        <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the player"
            className="pl-8 text-gray-700"
            aria-label="Search"
          />
        </div>
      </div> */}
      {/* {players &&
        players.map(
          (player, i) =>
            performance &&
            performance
              .filter((n) => n.name1 === player.name)
              .reduce(
                (total, currentValue) =>
                  (total = total + currentValue.recovered_balls),
                0
              )
        )} */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" color="purple" />
          </div>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the player"
            aria-label="Search"
            className="pl-8 text-gray-700"
          />
        </div>
      </div>
      <br />
      {/* <SectionTitle>Simple table</SectionTitle> */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Player</TableCell>
              <TableCell>Goals</TableCell>
              <TableCell>Corners</TableCell>
              <TableCell>Assists</TableCell>
              <TableCell>tackles</TableCell>
              <TableCell>freekicks</TableCell>
              <TableCell>fouls</TableCell>
              <TableCell>red card</TableCell>
              <TableCell>yellow card</TableCell>
              <TableCell>recovered balls</TableCell>
              <TableCell>Penalties taken</TableCell>
              <TableCell>Penalties scored</TableCell>
              <TableCell>Jersey no</TableCell>
              <TableCell>Minutes</TableCell>
              <TableCell>Own goals</TableCell>
              <TableCell>Clearances</TableCell>
              <TableCell>Blocks</TableCell>
              <TableCell>Interceptions</TableCell>
              <TableCell>Catches</TableCell>
              <TableCell>Punches</TableCell>
              <TableCell>Saves</TableCell>
              <TableCell>Cleansheet</TableCell>
              <TableCell>Throws</TableCell>
              <TableCell>Offside</TableCell>
              <TableCell>Long passes</TableCell>
              <TableCell>Short passes</TableCell>
              <TableCell>Lost balls</TableCell>
              <TableCell>Chances created</TableCell>
              <TableCell>Crosses</TableCell>
              <TableCell>Dribbles</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {players &&
              players.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.position}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.goals),
                            0
                          )}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge type={user.status}>
                      {" "}
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.corners),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.assists),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.tackles),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.freekicks),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.fouls_commited),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.reds),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.yellows),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.recovered_balls),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.penalties_taken),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.penalties_scored),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = currentValue.jersey_no),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.minutes),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.own_goals),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.clearances),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.blocks),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.interceptions),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.catches),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.punches),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.saves),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.cleansheet),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.throws),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.offside),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.long_passes),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.short_passes),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.lost_balls),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.chances_created),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.crosses),
                            0
                          )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>
                      {performance &&
                        performance
                          .filter((n) => n.name1 === user.name)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.dribbles),
                            0
                          )}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter></TableFooter>
      </TableContainer>
    </>
  );
}

export default Tables
