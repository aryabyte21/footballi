import React, {useRef, useEffect, useState, useInterval} from 'react'

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
      <Circles/>
      {/* <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Doughnut">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div> */}
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
