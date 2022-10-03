import React from "react";
import { useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";

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
} from "../../icons";
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

function Goals_conceded() {
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
        </div>
      </center>
      <br />
      <br />

      <SectionTitle>Team Goals</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {v &&
          v
            .filter((n) => n.type === "team goal")
            .map((m) => (
              <div key={m.id}>
                <Card>
                  <a href="" class="block overflow-hidden rounded-2xl">
                    <video
                      class="w-full aspect-video ..."
                      allowfullscreen
                      controls
                      controlsList="nodownload"
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
      <SectionTitle>Oppponent Goals</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {v &&
          v
            .filter((n) => n.type === "opponent goal")
            .map((m) => (
              <div key={m.id}>
                <Card>
                  <a href="" class="block overflow-hidden rounded-2xl">
                    <video
                      class="w-full aspect-video ..."
                      allowfullscreen
                      controls
                      controlsList="nodownload"
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
    </>
  );
}

export default Goals_conceded;


