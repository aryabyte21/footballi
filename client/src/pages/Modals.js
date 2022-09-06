import React, { useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import CTA from "../components/CTA";
import {
  Modal,
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

  const PerformanceState = rj({
    effectCaller: rj.configured(),
    effect:
      (token) =>
      (search = "") =>
        ajax.getJSON(`/api/performance/?search=${search}`, {
          Authorization: `Bearer ${token}`,
        }),
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

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <PageTitle>Modals</PageTitle>
      <CTA />
      <div>
        <Button onClick={openModal}>Open modal</Button>
      </div>

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
            />{" "}
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
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>
                    {team && team.map((player1) => player1.name)}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {cardIndex !== null &&
                      counter &&
                      counter[cardIndex].opponent}
                  </TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].goals}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Goals</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].opponent_goals}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_fouls}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Fouls</span>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_yellow}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Yellow Cards</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_yellow}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_red}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Red Cards</span>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_passes}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Passes</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_passes}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_tackles}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Tackles</span>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_corners}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Corners</span>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_possession}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Possession</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_possession}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="success">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].home_cross}
                      </Badge>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">Cross</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      <Badge type="warning">
                        {cardIndex !== null &&
                          counter &&
                          counter[cardIndex].away_cross}
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
        {console.log(counter && counter[0].opponent_icon)}
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
                    <button class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
