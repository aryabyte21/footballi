import React from 'react'
import { useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import { Card, CardBody, Input } from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon, SearchIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { rj, useRunRj } from "react-rocketjump";
import { ajax } from "rxjs/ajax";

const MatchState = rj({
  effectCaller: rj.configured(),
  effect:
    (token) =>
    (search = "") =>
      ajax.getJSON(`/api/match/?search=${search}`, {
        Authorization: `Bearer ${token}`,
      }),
});
const VideoState = rj({
  effectCaller: rj.configured(),
  effect:
    (token) =>
    (search = "") =>
      ajax.getJSON(`/api/video/?search=${search}`, {
        Authorization: `Bearer ${token}`,
      }),
});

function Cards() {
  const [search, setSearch] = useState("");
  const [{ data: v }] = useRunRj(VideoState, [search], false);
  const [{ data: match }] = useRunRj(MatchState, [search], false);

  return (
    <>
      <PageTitle>Videos</PageTitle>

      <CTA />
      {/* {v && v.map((player) => <h1 key={player.id}>{player.opponent}</h1>)} */}
      {/* <SectionTitle>Big section cards</SectionTitle> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" color="purple" />
          </div>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the video"
            aria-label="Search"
            className="pl-8 text-gray-700"
          />
        </div>
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
      <SectionTitle>All Videos</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {v &&
          v.map((m) => (
            <div key={m.id}>
              <Card>
                <a href="" class="block overflow-hidden rounded-2xl">
                  <iframe
                    class="w-full aspect-video ..."
                    src={m.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    allowfullscreen
                  ></iframe>
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

export default Cards
