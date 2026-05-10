// CSV Date 불러오기
d3.csv("jdi_data_daily.csv").then(function (data) {
  const parseData = d3.timeParse("%Y-%m-%d");
  data.forEach((d) => {
    d.date = parseData(d.date);
    d.population = +d.population; // +: 문자 -> 숫자
  });

  // Margin 적용
  const margin = { top: 70, right: 30, bottom: 40, left: 80 };
  const width = 1200 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // Scale
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // append SVG
  // <g>: SVG 요소 (축, 선, 원, 텍스트 등)를 묶는 컨테이너
  // translate(x, y): 요소를 x, y만큼 이동
  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Domain 설정
  // extent(): 데이터의 최솟값과 최댓값 구하는 함수 -> [min, max] 반환
  /*
  const data = [10, 30, 5, 80];
  d3.extent(data);    // [5, 80]
*/
  x.domain(d3.extent(data, (d) => d.date));
  y.domain([65000, d3.max(data, (d) => d.population)]);

  // X-axis 추가
  // call(): 현재 선택한 요소를 함수에 넘겨서 실행
  //  ex) .call(axisFunction) ===  axisFunction(g)
  //      g를 axis 함수에 넘겨서 실행
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.timeMonth.every(6))
        .tickFormat(d3.timeFormat("%b %Y")),
    );

  // Y-axis 추가
  // axisBottom/Top/Left/Right: tick/text가 어느 방향으로 나올지 결정
  svg.append("g").call(d3.axisLeft(y));

  // Line Chart
  const line = d3
    .line()
    .x((data) => x(data.date))
    .y((data) => y(data.population));

  // path: 점과 점을 연결하는 경로를 그리는 태그
  // datum(): 요소 1개 ↔ 데이터 1개
  // enter(): 요소 여러 개 ↔ 데이터 여러 개
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1)
    .attr("d", line);

  // Title 추가
  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", margin.left - 115)
    .attr("y", margin.top - 100)
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .style("font-family", "sans-serif")
    .text("Prison Populations in the US Have Trended Upward Since Summer 2020");
});
