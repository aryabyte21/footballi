import React from "react";
import { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import {
  Card,
  CardBody,
  Input,
  Label,
  Dropdown,
  DropdownItem,
  Button,
} from "@windmill/react-ui";
import {
  CartIcon,
  ChatIcon,
  MoneyIcon,
  PeopleIcon,
  SearchIcon,
} from "../icons";
import RoundIcon from "../components/RoundIcon";
import { rj, useRunRj } from "react-rocketjump";
import { ajax } from "rxjs/ajax";
const MatchState = rj({
  effectCaller: rj.configured(),
  effect:
    (token) =>
    (search = "") =>
      ajax.getJSON(`https://api.sportskpi.com/api/match/?search=${search}`, {
        Authorization: `Bearer ${token}`,
      }),
});
const VideoState = rj({
  effectCaller: rj.configured(),
  effect:
    (token) =>
    (search = "") =>
      ajax.getJSON(`https://api.sportskpi.com/api/video/?search=${search}`, {
        Authorization: `Bearer ${token}`,
      }),
});

function Cards() {
  const [search, setSearch] = useState("");
  const [{ data: v }] = useRunRj(VideoState, [search], false);
  const [{ data: match }] = useRunRj(MatchState, [search], false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);


  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }
  
  return (
    <>
      <PageTitle>Videos</PageTitle>
      <div
        className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
        href="https://www.sportskpi.com/"
      >
        <div classsName="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          
        </div>
        <span>
          View more{" "}
          <span dangerouslySetInnerHTML={{ __html: "&RightArrow;" }}></span>
        </span>
      </div>
      {/* {v && v.map((player) => <h1 key={player.id}>{player.opponent}</h1>)} */}
      {/* <SectionTitle>Big section cards</SectionTitle> */}
      <center>
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon
                className="w-4 h-4"
                aria-hidden="true"
                color="purple"
              />
            </div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the video"
              aria-label="Search"
              className="pl-8 text-gray-700 py-3"
            />
          </div>
          <p class="">
            <button
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              filters
            </button>
          </p>
        </div>
      </center>
      <br />

      <div class="collapse" id="collapseExample">
        <center>
          <form class="relative max-w-lg mx-auto overflow-auto bg-white border border-gray-100 rounded-lg shadow-lg divide-y divide-gray-100">
            <header class="px-6 py-4">
              <strong class="text-lg font-medium text-gray-900">
                Filter Videos
              </strong>

              <p class="text-sm mt-1.5 text-gray-500">
                Select your favorite shots, analysis and transitions.
              </p>
            </header>

            <main class="px-6 overflow-y-auto flow-root h-96">
              <div class="divide-y divide-gray-100">
                <div class="py-8">
                  <fieldset>
                    <legend class="font-medium text-gray-900">Result</legend>

                    <ul class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="study_type"
                            class="w-6 h-6 border-gray-200"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Won 🥳
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="study_type"
                            class="w-6 h-6 border-gray-200"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Lost 😣
                          </span>
                        </label>
                      </li>
                    </ul>
                  </fieldset>
                </div>

                <div class="py-8">
                  <fieldset>
                    <legend class="font-medium text-gray-900">Locations</legend>

                    <ul class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="location"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            All regions
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="location"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            East Midlands
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="location"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            East of England
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="location"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            {" "}
                            London{" "}
                          </span>
                        </label>
                      </li>
                    </ul>
                  </fieldset>
                </div>

                <div class="py-8">
                  <fieldset>
                    <legend class="font-medium text-gray-900">
                      Universities
                    </legend>

                    <ul class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="univeristy"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Aston University
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="univeristy"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Bangor University
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="univeristy"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Brunel University of London
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="univeristy"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Glyndwr University
                          </span>
                        </label>
                      </li>
                    </ul>
                  </fieldset>

                  <button
                    class="flex items-center px-4 py-2 mt-6 text-gray-700 rounded-lg gap-2 bg-gray-50"
                    type="button"
                  >
                    <span class="text-sm font-medium"> Show all </span>

                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div class="py-8">
                  <fieldset>
                    <legend class="font-medium">Commitment</legend>

                    <ul class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="commitment"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Full time
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="commitment"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            Part time
                          </span>
                        </label>
                      </li>
                    </ul>
                  </fieldset>
                </div>

                <div class="py-8">
                  <fieldset>
                    <legend class="font-medium">University rating</legend>

                    <ul class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="radting"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            {" "}
                            1+{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="rating"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            {" "}
                            2+{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="rating"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            {" "}
                            3+{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label class="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="rating"
                            class="w-6 h-6 border-gray-200 rounded-md"
                          />

                          <span class="text-sm font-medium text-gray-700">
                            {" "}
                            4+{" "}
                          </span>
                        </label>
                      </li>
                    </ul>
                  </fieldset>
                </div>
              </div>
            </main>

            <footer class="flex items-center justify-between px-6 py-4">
              <input
                type="reset"
                value="Clear all"
                class="px-5 py-3 text-sm font-medium text-gray-700 rounded-lg bg-gray-50"
              />

              <button
                class="px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                type="submit"
              >
                Show 300+ results
              </button>
            </footer>
          </form>
        </center>
      </div>
      <br />
      <br />
      {/* <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Large, full width sections goes here
          </p>
        </CardBody>
  </Card> */}

      <br />

      <SectionTitle>All Videos</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {v &&
          v.map((m) => (
            <div key={m.id}>
              <Card>
                <a href="" class="block overflow-hidden rounded-2xl">
                  <video
                    class="w-full aspect-video ..."
                    allowfullscreen
                    controls
                  >
                    <source src={m.video} />
                    frameborder = "0" allow="accelerometer; gyroscope;
                    clipboard-write; encrypted-media; gyroscope;
                    picture-in-picture; allowfullscreen;"
                  </video>
                  <div class="p-4 bg-gray-700">
                    <p class="text-xs text-gray-500">
                      {m.type} | {m.tournament} {m.date} | {m.win_lose}
                    </p>
                    <h5 class="text-xs text-white"> {m.opponent}</h5>
                  </div>
                </a>
              </Card>
            </div>
          ))}
      </div>

      <SectionTitle>Full Matches</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {match &&
          match.map((m) => (
            <div key={m.id}>
              <Card>
                <a href="" class="block overflow-hidden rounded-2xl">
                  <iframe
                    class="w-full aspect-video ..."
                    src={m.full_match}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    allowfullscreen
                  ></iframe>
                  <div class="p-4 bg-gray-700">
                    <p class="text-xs text-gray-500">
                      {m.tournament_name} {m.date}
                    </p>
                    <h5 class="text-xs text-white"> {m.opponent}</h5>
                  </div>
                </a>
              </Card>
            </div>
          ))}
      </div>

      <SectionTitle>First Half</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {match &&
          match.map((m) => (
            <div key={m.id}>
              <Card>
                <a href="" class="block overflow-hidden rounded-2xl">
                  {/* <img
                    class="object-cover w-full h-32"
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt=""
                  /> */}
                  {/* <iframe
                    class="w-full aspect-video ..."
                    src="https://www.youtube.com/embed/v=h4m68r8kWAc"
                  ></iframe> */}
                  <iframe
                    class="w-full aspect-video ..."
                    src={m.first_half}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    allowfullscreen
                  ></iframe>
                  <div class="p-4 bg-gray-700">
                    <p class="text-xs text-gray-500">
                      {m.tournament_name} {m.date}
                    </p>

                    <h5 class="text-xs text-white"> {m.opponent}</h5>
                    {/* <p class="mt-1 text-xs text-gray-500">
               PSG vs ManCity
              </p> */}
                  </div>
                </a>
              </Card>
            </div>
          ))}
      </div>
      <SectionTitle>Second Half</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {match &&
          match.map((m) => (
            <div key={m.id}>
              <Card>
                <a href="" class="block overflow-hidden rounded-2xl">
                  {/* <img
                    class="object-cover w-full h-32"
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt=""
                  /> */}
                  {/* <iframe
                    class="w-full aspect-video ..."
                    src="https://www.youtube.com/embed/v=h4m68r8kWAc"
                  ></iframe> */}
                  <iframe
                    class="w-full aspect-video ..."
                    src={m.second_half}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    allowfullscreen
                  ></iframe>
                  <div class="p-4 bg-gray-700">
                    <p class="text-xs text-gray-500">
                      {m.tournament_name} {m.date}
                    </p>

                    <h5 class="text-xs text-white"> {m.opponent}</h5>
                    {/* <p class="mt-1 text-xs text-gray-500">
               PSG vs ManCity
              </p> */}
                  </div>
                </a>
              </Card>
            </div>
          ))}
      </div>

      <SectionTitle>Cards with title</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Revenue
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>

        <Card colored className="text-white bg-purple-600">
          <CardBody>
            <p className="mb-4 font-semibold">Colored card</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Cards;
