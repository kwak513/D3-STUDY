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

  // ToolTip 만들기
  const tooltip = d3.select("body").append("div").attr("class", "tooltip");

  // Circle 만들기
  const circle = svg
    .append("circle")
    .attr("r", 0)
    .attr("fill", "steelblue")
    .style("stroke", "white")
    .attr("opacity", 0.7)
    .style("pointer-events", "none");

  // 차트 영역 전체를 덮는 rect 생성 for 마우스 이벤트 감지
  const listeningRect = svg
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  listeningRect.on("mousemove", function (event) {
    const [xCoord] = d3.mouse(this); // 현재 커서의 x좌표만 가져옴
    const bisectDate = d3.bisector((d) => d.date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    // 이전/다음 중 더 가까운 데이터(날짜)를 선택
    const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    const xPos = x(d.date);
    const yPos = y(d.population);

    circle.attr("cx", xPos).attr("cy", yPos);

    circle.transition().duration(50).attr("r", 5);

    tooltip
      .style("display", "block")
      .style("left", `${xPos + 100}px`)
      .style("top", `${yPos + 50}px`)
      .html(
        `Date: ${d.date.toLocaleDateString()}<br>Population: ${d.population !== undefined && d.population}`,
      );
  });

  listeningRect.on("mouseleave", function () {
    circle.transition().duration(50).attr("r", 0);

    tooltip.style("display", "none");
  });

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

  // path: SVG에서 선·도형 그리는 요소
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
