# Overview of the Peak District

>
>   “If your experiment needs statistics, you ought to have done a better experiment.”
>

::: tip

“Scientific literacy is an intellectual vaccine against the charlatans of the world that would exploit your ignorance.”

:::

<div class="mt-5"></div>

# Using charts

You can see all the supported chart types at https://s00d.github.io/vitepress-plugin-chartjs/examples.html.

## Bar chart

```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: 2023
      data: [50, 60, 70, 80]
    - label: 2024
      data: [55, 70, 85, 95]
options:
  plugins:
    title:
      display: true
      text: Quarterly Revenue Comparison
```

## Line chart

```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: This Week
      data: [120, 190, 300, 250, 420, 380, 450]
    - label: Last Week
      data: [100, 150, 280, 220, 380, 350, 400]
options:
  plugins:
    title:
      display: true
      text: Weekly Comparison
```

## Area chart

```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Desktop
      data: [100, 120, 115, 134, 168, 132]
      fill: true
    - label: Mobile
      data: [50, 65, 70, 80, 95, 100]
      fill: true
    - label: Tablet
      data: [20, 25, 30, 28, 35, 40]
      fill: true
options:
  plugins:
    title:
      display: true
      text: Traffic by Device
  scales:
    y:
      stacked: true
```
## Doughnut

```chart
type: doughnut
data:
  labels: [Desktop, Mobile, Tablet, Spaceship, Watch, Freezer, Other]
  datasets:
    - data: [55, 30, 10, 7, 4, 3, 5]
options:
  plugins:
    title:
      display: true
      text: Device Distribution
```

## Bubble

```chart
type: bubble
data:
  datasets:
    - label: Companies A
      data:
        - { x: 10, y: 20, r: 5 }
        - { x: 20, y: 30, r: 10 }
        - { x: 30, y: 25, r: 15 }
    - label: Companies B
      data:
        - { x: 15, y: 15, r: 8 }
        - { x: 25, y: 35, r: 12 }
        - { x: 35, y: 20, r: 6 }
options:
  plugins:
    title:
      display: true
      text: Market Analysis
    legend:
      position: top
```