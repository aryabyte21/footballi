import React, { useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import CTA from "../components/CTA";
import { SearchIcon } from "../icons";
import {
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Dropdown,
  DropdownItem,
  Badge,
} from "@windmill/react-ui";
import { rj, useRunRj } from "react-rocketjump";
import { ajax } from "rxjs/ajax";

function Modals() {
  const [cardIndex, setcardIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardIndex1, setcardIndex1] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const [isClicked, setIsClicked] = useState([]);
  //  const handleOpen = (id) => {
  //    // setIsClicked(isClicked.push(beers.filter((item) => item.id === id)));
  //    setIsClicked(beers.find((x) => x.id === id));
  //    setOpen(true);
  //    // console.log(isClicked[0]);
  //  };

  //  const handleClose = () => {
  //    setOpen(false);
  //    setIsClicked([]);
  //  };

  const CounterState = rj({
    effectCaller: rj.configured(),
    effect:
      (token) =>
      (search = "") =>
        ajax.getJSON(`https://api.sportskpi.com/api/match/?search=${search}`, {
          Authorization: `Bearer ${token}`,
        }),
  });

  const TeamState = rj({
    effectCaller: rj.configured(),
    effect:
      (token) =>
      (search = "") =>
        ajax.getJSON(`https://api.sportskpi.com/api/team/?search=${search}`, {
          Authorization: `Bearer ${token}`,
        }),
  });

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

  const [search, setSearch] = useState("");
  const [{ data: counter }] = useRunRj(CounterState, [search], false);
  const [{ data: team }] = useRunRj(TeamState, [search], false);
  const [{ data: performance }] = useRunRj(PerformanceState, [search], false);
  function openModal(id) {
    console.log(id);
    setcardIndex(id);
    setIsModalOpen(true);
  }
  function openModal1(id) {
    console.log(id);
    setcardIndex1(id);
    setIsModalOpen1(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  function closeModal1() {
    setIsModalOpen1(false);
  }

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <PageTitle>Stats</PageTitle>
      <CTA />
      {/* <div>
        <Button onClick={openModal}>Open modal</Button>
      </div> */}
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
      <br />
      <Modal
        className="container mx-auto p-5"
        isOpen={isModalOpen1}
        toggle={(e) => openModal1(cardIndex1)}
        onClose={closeModal1}
      >
        <ModalBody>
          <TableContainer className="overflow-scroll" style={{ height: 600 }}>
            <Table>
              <TableHeader closeName="">
                <tr>
                  <TableCell>Player</TableCell>
                  <TableCell>Goals</TableCell>
                  <TableCell>Corners</TableCell>
                  <TableCell>Tackle Accuracy</TableCell>
                  <TableCell>Assists</TableCell>
                  <TableCell>Tackles</TableCell>
                  <TableCell>Freekicks</TableCell>
                  <TableCell>Corners</TableCell>
                  <TableCell>fouls</TableCell>
                  <TableCell>Red Card</TableCell>
                  <TableCell>Yellow Card</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {performance &&
                  performance
                    .filter((n) => n.match === cardIndex1)
                    .map((user, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                            <div>
                              <p className="font-semibold">{user.name1}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {user.position}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>{user.goals}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>{user.corners}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>
                            {user.tackles_accuracy}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>{user.assists}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>
                            {user.tackles}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>{user.freekicks}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>{user.corners}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>
                            {user.fouls_commited}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>{user.reds}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge type={user.status}>{user.yellows}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            <TableFooter></TableFooter>
          </TableContainer>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        toggle={(e) => openModal(cardIndex)}
        onClose={closeModal}
      >
        <div class="flex flex-col items-center ">
          <div className="flex">
            <img
              class="mb-3 w-20 h-20 rounded-full shadow-lg mx-2"
              src={team && team.map((player1) => player1.logo)}
              alt="Bonnie image"
            />
            <div className="text-3xl subpixel-antialiased	text-end px-2 py-3 dark:text-white">
              {cardIndex !== null && counter && counter[cardIndex].goals} :{" "}
              {cardIndex !== null &&
                counter &&
                counter[cardIndex].opponent_goals}
            </div>
            <img
              class="mb-3 w-20 h-20 rounded-full shadow-lg mx-2 object-scale-down"
              src={
                cardIndex !== null &&
                counter &&
                counter[cardIndex].opponent_icon
              }
              alt="Bonnie image"
            />
          </div>
        </div>
        {/* {cardIndex !== null && counter && counter[cardIndex].opponent} */}
        {/* <ModalHeader>
          {(cardIndex) => counter && counter[cardIndex].name}
        </ModalHeader> */}

        <ModalBody>
          <TableContainer className="table-layout: auto">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className="text-center">
                    {team && team.map((player1) => player1.name)}
                  </TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center">
                    {cardIndex !== null &&
                      counter &&
                      counter[cardIndex].opponent}
                  </TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_possession}{" "}
                        %
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Possession</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_possession}{" "}
                        %
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_shots}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Shots</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_shots}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_shoton}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Shots On</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_shoton}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_tackles}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Tackles</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_tackles}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_corners}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Corners</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_corners}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_cross}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Cross</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_cross}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_fouls}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Fouls</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_fouls}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_red}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Red Card</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_red}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_yellow}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold">Yellow Card</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_yellow}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          {/* <div className="hidden sm:block">
            <Button>Accept</Button>
          </div> */}
          <div className="hidden sm:block">
            <Button block size="regular" layout="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="regular" layout="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
          {/* <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div> */}
        </ModalFooter>
      </Modal>
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
          counter.map((player, key) => (
            <div key={key}>
              <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4"></div>
                <div class="flex flex-col items-center pb-10">
                  <div className="flex">
                    <img
                      class="mb-3 w-20 h-20 rounded-full shadow-lg mx-2"
                      src={team && team.map((player1) => player1.logo)}
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
                    {/* <button class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> */}
                    <button
                      key={key}
                      class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={(e) => openModal1(player.id)}
                    >
                      Player
                    </button>
                    <button
                      key={key}
                      class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      onClick={(e) => openModal(key)}
                    >
                      Match
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Modals;
