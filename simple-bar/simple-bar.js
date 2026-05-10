const DUMMY_DATA = [
  { id: "d1", value: 10, region: "USA" },
  { id: "d2", value: 11, region: "Germany" },
  { id: "d3", value: 12, region: "Korea" },
  { id: "d4", value: 6, region: "Japan" },
];

// Margin 적용
const margin = { top: 20, right: 20, bottom: 40, left: 40 };
const width = 300 - margin.left - margin.right;
const height = 240 - margin.top - margin.bottom;

// SVG 생성
const svg = d3
  .select("svg")
  .classed("container", true)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Scale
const xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map((dataPoint) => dataPoint.region))
  .range([0, width])
  .padding(0.1);

const yScale = d3.scaleLinear().domain([0, 15]).range([height, 0]);

// Bar Chart
svg
  .selectAll(".bar")
  .data(DUMMY_DATA)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("width", xScale.bandwidth())
  .attr("height", (data) => height - yScale(data.value))
  .attr("x", (data) => xScale(data.region))
  .attr("y", (data) => yScale(data.value));

// X-axis
svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Y-axis
svg.append("g").call(d3.axisLeft(yScale));
