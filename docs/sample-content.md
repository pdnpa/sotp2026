---
features:
    - title: Feature A
      details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    - title: Feature B
      details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    - title: Feature C
      details: Lorem ipsum dolor sit amet, consectetur adipiscing elit

hero:
    actions:
      - theme: brand
        text: Introduction
        link: /introduction/introduction.md
---

We read <ReferenceFootnote footnoteref='4'>[4]</ReferenceFootnote>

## Look <ReferenceFootnote footnoteref='2'>[2]</ReferenceFootnote>here

<!--

![PDNPA Logo in dark grey](/pdnpa_logo.png)

<img :src="$withBase('/pdnpa_logo_white.png')" alt="White logo" />

[family](family.md)

actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress

-->

### Smaller header

```chart
type: bar
data:
  labels: [January, February, March, April, May]
  datasets:
    - label: Sales 2024
      data: [65, 59, 80, 81, 56]
    - label: Sales 2025
      data: [45, 79, 60, 91, 76]
options:
  plugins:
    title:
      display: true
      text: Monthly Sales Comparison
```