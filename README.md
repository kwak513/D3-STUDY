# 목차

- [1. 개요](#1-개요)
  - [1-1. 브라우저 렌더링 기술](#1-1-브라우저-렌더링-기술)

- [2. SVG / Canvas / WebGL 요약](#2-svg--canvas--webgl-요약)
  - [2-1. 비교](#2-1-비교)
  - [2-2. 사용처](#2-2-사용처)

- [3. SVG (Scalable Vector Graphic)](#3-svg-scalable-vector-graphic)
  - [3-1. SVG vs JPG/PNG](#3-1-svg-vs-jpgpng)
  - [3-2. SVG 특징](#3-2-svg-특징)
  - [3-3. SVG의 Chart](#3-3-svg의-chart)

- [4. Canvas](#4-canvas)

- [5. WebGL (Web Graphics Library)](#5-webgl-web-graphics-library)
  - [5-1. 특징](#5-1-특징)

- [6. D3](#6-d3)
  - [6-1. D3 기본 with div](#6-1-d3-기본-with-div)
  - [6-2. D3 with SVG](#6-2-d3-with-svg)
    - [6-2-1. 영어 용어 정리](#6-2-1-영어-용어-정리)
    - [6-2-2. D3를 왜 SVG와 사용할까?](#6-2-2-d3를-왜-svg와-사용할까)
    - [6-2-3. SVG 단독이 아닌 D3 사용 이유](#6-2-3-svg-단독이-아닌-d3-사용-이유)
    - [6-2-4. D3 핵심 개념](#6-2-4-d3-핵심-개념)
    - [6-2-5. Simple Bar Chart 예시 코드](#6-2-5-simple-bar-chart-예시-코드)
    - [6-2-6. x/y 좌표와 Scale](#6-2-6-xy-좌표와-scale)
  - [6-3. Simple Bar Chart](#6-3-simple-bar-chart)
  - [6-4. Simple Line Chart](#6-4-simple-line-chart)
  - [6-5. Line Chart & Tooltip](#6-5-line-chart--tooltip)

- [7. 참고 자료](#7-참고-자료)
# 1. 개요


## 1-1. 브라우저 렌더링 기술

- **렌더링**: 데이터를 실제 **화면에 그려서** 보여주는 것

```markdown
HTML
 ├─ CSS (스타일)
 └─ 그래픽 렌더링
      ├─ SVG
      ├─ Canvas
      └─ WebGL
```

```markdown
├── SVG
│    ├─ 특징: DOM 기반 벡터 그래픽
│    ├─ 장점: 인터랙션/CSS 쉬움
│    ├─ 대표 라이브러리
│    │    ├─ Recharts
│    │    ├─ Nivo
│    │    └─ Victory
│    │
│    └─ D3 (+ SVG 조합 가능)
│
├── Canvas
│    ├─ 특징: 2D bitmap 렌더링
│    ├─ 장점: 많은 데이터 처리 빠름
│    ├─ 대표 라이브러리
│    │    └─ Chart.js
│    │
│    └─ D3 (+ Canvas 조합 가능)
│
└── WebGL
     ├─ 특징: GPU 기반 렌더링
     ├─ 장점: 초대용량 데이터 / 3D
     ├─ 대표 라이브러리
     │    ├─ deck.gl
     │    └─ Three.js
     │
     └─ 내부적으로 GPU 사용
```
---

# 2. SVG / Canvas / WebGL 요약

## 2-1. 비교

- SVG: “도형 자체”를 관리
    
    ```jsx
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="30" fill="red" />
    </svg>
    ```
    
- Canvas: CPU로 픽셀에 그림 그리기 → 도형 기억 X
    
    ```jsx
    <canvas id="c" width="100" height="100"></canvas>
    
    <script>
    const ctx = document.getElementById("c").getContext("2d");
    
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    </script>
    ```
    
- WebGL: GPU로 픽셀에 그림 그리기 & 내부적으로 Canvas 이용
    
    ```jsx
    <canvas id="gl"></canvas>
    
    <script>
    const canvas = document.getElementById("gl");
    const gl = canvas.getContext("webgl");
    </script>
    ```
    

## 2-2. 사용처

- 일반 차트 → SVG
- 대용량 데이터 → Canvas
- 초대용량 / GPU 사용 → WebGL

---

# 3. SVG (Scalable Vector Graphic)

- Scalable : 확장 가능한 → 확대해도 깨지지 않음
- Vector Graphic: 도형 기반 그래픽 → 도형을 ‘어떻게’ 그릴지를 저장

## 3-1. SVG vs JPG/PNG

ex) 원 그리기

- JPG/PNG: ‘픽셀’ 저장 → 확대하면 깨짐
    - (1,1) 픽셀: 빨강
    - (1,2) 픽셀: 빨강
    - …
- SVG: 원의 중심좌표, 반지름, 색 저장 → 확대하면 수학적으로 다시 계산 & 그림 (안깨짐)
    
    ```jsx
    <circle cx="50" cy="50" r="40" fill=red />
    ```
    

## 3-2. SVG 특징

① DOM 기반

도형 자체가 DOM 요소

cf) DOM 요소: HTML 태그 → 객체 ex)  div 객체

```jsx
<rect>
<circle>
<line>
```

② 인터렉션 쉬움 → DOM 요소니까.

Styling, Hover

③ 데이터 많아지면 느려짐

ex) 점 10만개 → circle DOM 요소 10만개

## 3-3. SVG의 Chart

ex) Bar Chart: 

선(line), 사각형(rect), 텍스트(text) 등을 배치해서 만든 것

- 축 → `<line>`
- 막대 → `<rect>`
- 라벨 → `<text>`

---

# 4. Canvas

픽셀(작은 점)에 그림 그리기 → 도형 기억 X

cf) Bitmap: 픽셀의 집합 → 이미지

cf) 1 픽셀, 1 색상 정보

- 장점: DOM 요소 X → 빠른 속도
    
    ex) 점 10만개 구현
    
    - DOM은 <canvas> 하나만 존재
    - ↔ SVG:  circle DOM 10만개
- 단점: 객체 X → Hover, Click 구현 어려움
    
    → 마우스 좌표 계산하여 해결
    

---

# 5. WebGL (Web Graphics Library)

## 5-1. 특징

- GPU로 픽셀 그림
    
    ```jsx
    // GPU 모드
    canvas.getContext("webgl")
    ```
    
- 내부적으로 Canvas 사용
- 3D 그래픽에 사용

---

# 6. D3

데이터를 기반으로 문서(DOM)를 조작하는 JavaScript 라이브러리

데이터와 DOM을 연결

## 6-1. D3 기본 with div

- index.html
    
    ```html
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>D3.js</title>
        <script src="https://d3js.org/d3.v5.min.js"></script>
        <script src="app.js" defer></script>
    
        <style>
          .container {
            width: 250px;
            height: 200px;
            display: flex;
            justify-content: space-around;
          }
    
          .bar {
            background-color: bisque;
          }
        </style>
      </head>
      <body>
        <div></div>
      </body>
    </html>
    
    ```
    
- app.js
    
    ```jsx
    const DUMMY_DATA = [
      { id: "d1", value: 10, region: "USA" },
      { id: "d2", value: 11, region: "Germany" },
      { id: "d3", value: 12, region: "Korea" },
      { id: "d4", value: 6, region: "Japan" },
    ];
    
    // 첫 div의 class를 container로 하고, style 적용
    const container = d3
      .select("div")
      .classed("container", true)
      .style("border", "1px solid red");
    
    // .enter(): DOM에 대응되지 못한 남은 데이터 선택
    const bars = container
      .selectAll(".bar")
      .data(DUMMY_DATA) // DOM 요소 1개 ↔ 데이터 1개
      .enter()
      .append("div")
      .classed("bar", true)
      .style("width", "50px")
      .style("height", "150px");
    
    ```
    

- 화면
    
<img width="263" height="224" alt="image" src="https://github.com/user-attachments/assets/7e4ebf61-572b-4aca-bfb0-89008b193cc7" />

    
- app.js 수정
    
    ```jsx
      .style("height", (data) => data.value * 15 + "px");
    ```
<img width="267" height="210" alt="image" src="https://github.com/user-attachments/assets/d8225b02-e8e2-4db7-820f-f1456e6fcb0a" />

## 6-2. D3 with SVG

### 6-2-1. 영어 용어 정리

- coordinate: 좌표
- axis: 축
- scale: 데이터 → 좌표 변환 함수
    
    ex) 데이터 값 50 → x 좌표 250px
    

---

- Data Mapping:  값 ↔ 값 대응
    
    ex) Scale: 데이터값 100 ↔ 높이 300px
    
- Data Binding: 데이터 ↔ 객체(UI 등) 연결
    
    ex) 데이터 객체 ↔ DOM 요소(rect/div): `.data(DUMMY_DATA)`
    

### 6-2-2. D3를 왜 SVG와 사용할까?

- 차트는 선, 원, 사각형 같은 **도형들의 조합**
- SVG는 도형 표현용 기술
    - 막대 → `<rect>`
    - 점 → `<circle>`
    - 축 → `<line>`
    - 곡선 → `<path>`
- SVG 장점
    
    DOM 기반이라서 Hover, Click, Animation, CSS 가능 → Interactive Chart에 적절
    

### 6-2-3. SVG 단독이 아닌 D3 사용 이유

Data binding, Scale, Axis 를 직접 구현하지 않고, D3 기능을 이용 가능하기 때문.

### 6-2-4. D3 핵심 개념


1. **domain()** vs **range()**
- **domain()**: 입력 데이터 범위
- **range()**: 화면 출력 범위 (px)
    - x는 0부터 width
    - y는 height부터 0
        - SVG에서는 최상단이 y=0이고 아래로 갈수록 y값이 증가한다. 하지만 우리가 원하는 그래프는 ‘값이 클수록 위로’ 올라가야 하므로, y축 range를 [height, 0]처럼 반대로 설정한다.
        - **원본 데이터 y값 ↑ ⇒ 화면 y좌표 ↓**
            
            ```jsx
            .domain([0, 100])
            .range([500, 0])
            
            // 데이터 0 → y=500
            // 데이터 100 → y=0
            ```
            

---

2. **enter()** vs **exit()**
- **enter()**: 데이터는 있는데 DOM 없음
    - append()와 사용됨 → DOM 추가 대상
- **exit()**: 데이터는 없는데 DOM은 있음
    - remove()와 사용됨 →  DOM 삭제 대상

---

3. **enter()** vs **datum()**
- **enter()**: 요소 여러 개 ↔ 데이터 여러 개
    
    ⇒ 보통 Bar Chart
    
    Rect 여러 개 ↔ Data 행 여러 개
    
- **datum()**: 요소 1개 ↔ 데이터 1개
    
    ⇒ 보통 Line Chart
    
    Line 1개 ↔ Data 배열 1개
    

---

4. **axisBottom/Top/Left/Right**
    
    tick/text가 어느 방향으로 나올지 결정
    
    - axisBottom
        
        <img width="501" height="70" alt="image" src="https://github.com/user-attachments/assets/3ecd494d-64b0-4ef5-9609-dccc18837118" />

        
    - axisTop
        
        <img width="488" height="69" alt="image" src="https://github.com/user-attachments/assets/37268d21-48c0-4a47-a83a-97f44f1e26a5" />

        
    - axisLeft
        
       <img width="120" height="332" alt="image" src="https://github.com/user-attachments/assets/bfef73d1-c7a6-4b90-84ce-ca88f125267c" />

        
    - axisRight
        <img width="113" height="318" alt="image" src="https://github.com/user-attachments/assets/5fca1193-d6f4-465d-8eb6-a9a2b0122046" />








### 6-2-5. Simple Bar Chart 예시 코드

- index.html
    
    ```jsx
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>D3.js</title>
        <script src="https://d3js.org/d3.v5.min.js" defer></script>
        <script src="https://d3js.org/d3-scale.v3.min.js" defer></script>
        <script src="app.js" defer></script>
    
        <style>
          .container {
            width: 250px;
            height: 200px;
            border: 1px solid red;
          }
    
          .bar {
            fill: skyblue;
          }
        </style>
      </head>
      <body>
        <svg></svg>
      </body>
    </html>
    
    ```
    
- app.js
    
    ```jsx
    const DUMMY_DATA = [
      { id: "d1", value: 10, region: "USA" },
      { id: "d2", value: 11, region: "Germany" },
      { id: "d3", value: 12, region: "Korea" },
      { id: "d4", value: 6, region: "Japan" },
    ];
    
    // 첫 div의 class를 container로 하고, style 적용
    const container = d3.select("svg").classed("container", true);
    
    // xScale: x 좌표 구하기
    // scaleBand: 구간(band) 분배 -> 보통 x축에 사용
    // domain: 입력 데이터 범위
    //        xScale이 어떤 카테고리를 다룰지 알려줌.
    // rangeRound: 출력 화면 좌표 범위
    //             250은 .container의 width
    const xScale = d3
      .scaleBand()
      .domain(DUMMY_DATA.map((dataPoint) => dataPoint.region))
      .rangeRound([0, 250])
      .padding(0.1);
    
    // yScale: y 좌표 구하기
    // scaleLinear: 값이 일정 비율로 증가 -> 보통 y축에 사용
    // domain: 입력 데이터 범위
    //        DUMMY_DATA의 value 범위인 6~12 고려하여 위 아래 공백
    // range: .container의 heigth & y는 위 -> 아래 방향이므로 200부터 0
    const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);
    
    // .enter(): DOM에 대응되지 못한 남은 데이터 선택
    const bars = container
      .selectAll(".bar")
      .data(DUMMY_DATA) // DOM 요소 1개 ↔ 데이터 1개
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("width", xScale.bandwidth())
      .attr("height", (data) => 200 - yScale(data.value)) // 높이
      .attr("x", (data) => xScale(data.region))
      .attr("y", (data) => yScale(data.value)); // y 좌표 시작점
    
    // ex) value: 10 ->
    //      yScale(data.value): 66 (y 좌표 시작점),
    //      200 - yScale(data.value): 134 (높이)
    
    ```
    
- 화면
    <img width="267" height="213" alt="image" src="https://github.com/user-attachments/assets/a2f0fbc2-64a5-454c-847e-87a9710d5f50" />

    
    

### 6-2-6. x/y 좌표와 Scale

SVG 내부 도형은 좌표 기반 → CSS Flex 적용 불가

- Default x, y 좌표는 (0,0) 이고, Top Left 위치임.
    - x는 커짐에 따라 왼쪽 → 오른쪽 방향
    - y는 커짐에 따라 위 → 아래 방향

- Scale: 데이터 값을 좌표(px)로 변환하는 함수
    
    
- y좌표, Height 구하는 예시
    
    <img width="680" height="872" alt="image" src="https://github.com/user-attachments/assets/883c1f62-84b6-4b5d-804c-2af6a2a4e205" />


## 6-3. Simple Bar Chart

- simple-bar.html
    
    ```jsx
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>D3.js</title>
        <script src="https://d3js.org/d3.v5.min.js" defer></script>
        <script src="https://d3js.org/d3-scale.v3.min.js" defer></script>
        <script src="./simple-bar.js" defer></script>
    
        <style>
          .bar {
            fill: skyblue;
          }
        </style>
      </head>
      <body>
        <svg></svg>
      </body>
    </html>
    
    ```
    
- simple-bar.js
    
    ```jsx
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
    ```
    
- 화면
    <img width="338" height="247" alt="image" src="https://github.com/user-attachments/assets/8a5631f0-ad12-4431-9551-2ab7e5dabb1c" />


## 6-4. Simple Line Chart

- simple-line.html
    
    ```jsx
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Simple Line Chart</title>
        <script src="https://d3js.org/d3.v5.min.js" defer></script>
        <script src="./simple-line.js" defer></script>
      </head>
      <body>
        <div id="chart-container"></div>
      </body>
    </html>
    
    ```
    
- simple-line.js
    
    ```jsx
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
    
    // DUMMY_DATA
    const DUMMY_DATA = [
      { date: new Date("2025-01-01"), value: 200 },
      { date: new Date("2025-02-01"), value: 100 },
      { date: new Date("2025-03-01"), value: 300 },
      { date: new Date("2025-04-01"), value: 400 },
      { date: new Date("2025-05-01"), value: 180 },
      { date: new Date("2025-06-01"), value: 600 },
      { date: new Date("2025-07-01"), value: 340 },
      { date: new Date("2025-08-01"), value: 800 },
      { date: new Date("2025-09-01"), value: 900 },
      { date: new Date("2025-10-01"), value: 1200 },
      { date: new Date("2025-11-01"), value: 230 },
      { date: new Date("2025-12-01"), value: 500 },
    ];
    
    // Domain 설정
    // extent(): 데이터의 최솟값과 최댓값 구하는 함수 -> [min, max] 반환
    /*
      const data = [10, 30, 5, 80];
      d3.extent(data);    // [5, 80]
    */
    x.domain(d3.extent(DUMMY_DATA, (d) => d.date));
    y.domain([0, d3.max(DUMMY_DATA, (d) => d.value)]);
    
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
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%b %Y")),
      );
    
    // Y-axis 추가
    // axisBottom/Top/Left/Right: tick/text가 어느 방향으로 나올지 결정
    svg.append("g").call(d3.axisLeft(y));
    
    // Line Chart
    const line = d3
      .line()
      .x((data) => x(data.date))
      .y((data) => y(data.value));
    
    // path: SVG에서 선·도형 그리는 요소
    // datum(): 요소 1개 ↔ 데이터 1개
    // enter() → 요소 여러 개 ↔ 데이터 여러 개
    svg
      .append("path")
      .datum(DUMMY_DATA)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line);
    
    ```
    
- 화면
    <img width="1235" height="513" alt="image" src="https://github.com/user-attachments/assets/5195d995-d01b-44be-9b58-14962f279e54" />



## 6-5. Line Chart & Tooltip

- simple-line-v3.html
    
    ```jsx
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Simple Line Chart</title>
        <script src="https://d3js.org/d3.v5.min.js" defer></script>
        <script src="./simple-line-v3.js" defer></script>
        <style>
          rect {
            pointer-events: all;
            fill-opacity: 0; /*내부 채우기 투명도*/
            stroke-opacity: 0; /*테두리투명도*/
            z-index: 1;
          }
    
          .tooltip {
            position: absolute;
            padding: 10px;
            background-color: steelblue;
            color: white;
            border: 1px solid white;
            border-radius: 10px;
            display: none;
            opacity: 0.75;
          }
        </style>
      </head>
      <body>
        <div id="chart-container"></div>
      </body>
    </html>
    
    ```
    
- simple-line-v3.js
    
    ```jsx
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
    
    ```
    
- 화면
    
    <img width="1169" height="495" alt="image" src="https://github.com/user-attachments/assets/5416d5c4-fc85-46b4-912f-b4eb8ded069c" />
 

---

# 7. 참고 자료

- https://www.youtube.com/watch?v=TOJ9yjvlapY
- https://www.youtube.com/watch?v=j8RxmELtmKY
- https://www.youtube.com/watch?v=g5bp02-CRAc
- https://www.youtube.com/watch?v=Wk8pIxcidv8
- https://www.youtube.com/watch?v=uyPYxx-WGxc


