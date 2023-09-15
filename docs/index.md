---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  image: /avatar.png
  name: "ziggy-docs"
  text: "Master piece"
  tagline: Stay hungry stay foolish
  actions:
    - theme: brand
      text: Getting Started
      link: /computer/code

features:
  - title: Hello World
    details: There's no place like 127.0.0.1
  - title: 冲冲冲
    details: 路漫漫其修远兮，吾将上下而求索
  - title: 昨日已逝，未来可期
    details: 北海虽赊，扶摇可接；东隅已逝，桑榆非晚
---

<div class=" h-[300px] !lt-sm:h-[200px] relative">
  <VzFlipClock class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
 flex !lt-sm:(scale-80)"></VzFlipClock>
</div>


<script setup lang="ts">
import 'vz-components/theme-chalk/index.css'
import { VzFlipClock } from 'vz-components'
</script>
