# 1. 개요

## 1-1. 계층

- Nivo, Victory, Recharts: 완성형 리액트 전용 차트 라이브러리
- Visx: 부품형 차트 라이브러리
- D3: 엔진 (내부적으로 SVG, Canvas 사용)
- SVG, Canvas: 최하위 계층

---

## 1-2. 브라우저 렌더링 기술

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
      .style("height", (data) => data.value * 15 + "px");
    
    ```
    

- 화면
    
<img width="263" height="224" alt="image" src="https://github.com/user-attachments/assets/7e4ebf61-572b-4aca-bfb0-89008b193cc7" />

    
- app.js 수정
    
    ```jsx
      .style("height", (data) => data.value * 15 + "px");
    ```
<img width="267" height="210" alt="image" src="https://github.com/user-attachments/assets/d8225b02-e8e2-4db7-820f-f1456e6fcb0a" />

