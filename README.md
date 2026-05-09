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
│    └─ D3 (SVG 모드 가능)
│
├── Canvas
│    ├─ 특징: 2D bitmap 렌더링
│    ├─ 장점: 많은 데이터 처리 빠름
│    ├─ 대표 라이브러리
│    │    └─ Chart.js
│    │
│    └─ D3 (Canvas 모드 가능)
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
    

### 6-2-3. 그렇다면 차트 생성 시, SVG 단독이 아닌 D3 사용 이유는?

Data binding, Scale, Axis 를 직접 구현하지 않고, D3 기능을 이용 가능하기 때문.

### 6-2-4. enter() vs exit()

- enter: 데이터는 있는데 DOM 없음
    - append()와 사용됨 → DOM 추가 대상
    
- exit: 데이터는 없는데 DOM은 있음
    - remove()와 사용됨 →  DOM 삭제 대상

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


