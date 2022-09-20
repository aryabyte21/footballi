import React, {useRef, useEffect, useState, useInterval} from 'react'
import {
  Card,
  CardBody,
  Input,
  Label,
  Dropdown,
  DropdownItem,
  Button,
} from "@windmill/react-ui";
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'
import SectionTitle from "../components/Typography/SectionTitle";
import Finals1 from "../pages/images/Finals1.png";
import Finals2 from "../pages/images/Finals2.png";
import M109f from "../pages/images/M109f.png";
import M109s from "../pages/images/M109s.png";
import M111f from "../pages/images/M111f.png";
import M111s from "../pages/images/M111s.png";
import M113f from "../pages/images/M113f.png";
import M113s from "../pages/images/M113s.png";
import * as d3 from "d3";
// import { vz } from "@gjmcn/vizsla-and-vega-lite";
function Charts() {
  const ref = useRef();
const Svg = () => {
  return (
    <svg
      style={{
        border: "2px solid #1cff00",
      }}
    />
  );
};

  return (
    <>
      <PageTitle>Visualization</PageTitle>
      <SectionTitle>Kerela Blasters 1 : 0 Jamshedpur FC</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
        <img src={M111f} alt="horse" />
        <img src={M111s} alt="horse" />
      </div>
      <SectionTitle>Kerela Blasters 1 : 1 Jamshedpur FC</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
        <img src={M113f} alt="horse" />
        <img src={M113s} alt="horse" />
      </div>
      <SectionTitle>Full Matches</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
        <img src={M109f} alt="horse" />
        <img src={M109s} alt="horse" />
      </div>
      <SectionTitle>Kerela Blasters 1 : 1 Hyderabad FC</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
        <img src={Finals1} alt="horse" />
        <img src={Finals2} alt="horse" />
      </div>
    </>
  );
}
const Circle = () => {
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.append("circle").attr("cx", 150).attr("cy", 70).attr("r", 50);
  }, []);

  return <svg ref={ref} />;
};
const Svg = () => {
  return (
    <svg
      style={{
        border: "2px solid #1cff00",
      }}
    />
  );
};
const generateDataset = () =>
  Array(10)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);

const Circles = () => {
  const [dataset, setDataset] = useState(generateDataset());
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement
      .selectAll("circle")
      .data(dataset)
      .join("circle")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 3);
  }, [dataset]);
  return <svg viewBox="0 0 100 50" ref={ref} />;
};

export default Charts
