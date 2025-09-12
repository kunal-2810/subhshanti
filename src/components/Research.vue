<template>
  <section class="w-full py-12 px-4 md:px-12 bg-white">
    <!-- Responsive flex: col on md, row on lg+ -->
    <div class="flex flex-col md:flex-col lg:flex-row gap-8 items-center max-w-7xl mx-auto">
      <!-- Left Panel -->
      <div class="flex-1 w-full lg:w-1/2">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Driven by Insight</h2>
        <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
          Because Strategy without Research is Just a Guess.
        </h3>
        <p class="text-gray-500 mb-6">
          We back every decision with deep analysis and credible data, ensuring your wealth moves are precise and powerful.
        </p>
        <blockquote class="italic text-lg text-gray-700 mb-8">
          "From in-house analysts to global market data feeds, our team examines every angle before we advise a move."
        </blockquote>
        <a
          href="#"
          class="inline-block bg-primary text-white px-16 py-3 rounded-full hover-bg-secondary transition"
        >
          Explore Our Research Edge
        </a>
      </div>
      <!-- Right Panel: Image Slider -->
      <div class="flex-1 w-full lg:w-1/2 relative h-[340px] md:h-[360px] flex items-center justify-center">
        <!-- Desktop/Tablet: Show center + sides -->
        <div class="relative w-full h-full items-center justify-center overflow-visible hidden md:flex">
          <div
            v-for="(slide, idx) in slides"
            :key="slide.id"
            class="absolute top-1/2 left-1/2 transition-all duration-700"
            :style="getSlideStyle(idx) as any"
            ref="slideRefs"
          >
            <div
              class="rounded-2xl overflow-hidden shadow-lg relative transition-all duration-700"
              :class="{
                'w-[340px] h-[360px] md:w-[380px] md:h-[400px] z-30': idx === current,
                'w-[220px] h-[220px] md:w-[240px] md:h-[240px] z-20': isSide(idx),
                'opacity-0 pointer-events-none z-0': !isVisible(idx)
              }"
            >
              <img
                :src="slide.img"
                :alt="slide.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#6E2B6B]/80 via-[#6e2b6b38] to-transparent"></div>
              <div class="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                <h4 class="text-xl font-bold mb-1">{{ slide.title }}</h4>
                <p class="text-base font-medium">{{ slide.caption }}</p>
              </div>
            </div>
          </div>
          <!-- Manual Nav -->
          <button
            @click="prev"
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow transition z-40"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            @click="next"
            class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow transition z-40"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <!-- Mobile: Show only current, stacked layout -->
        <div class="relative w-full h-full flex items-center justify-center md:hidden">
          <div class="w-[90vw] max-w-[340px] h-[340px] xs:w-[320px] xs:h-[320px] sm:w-[360px] sm:h-[360px] rounded-2xl overflow-hidden shadow-lg relative transition-all duration-700 z-30">
            <img
              :src="slides[current].img"
              :alt="slides[current].title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#6E2B6B]/80 via-[#6e2b6b38] to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-white z-10">
              <h4 class="text-xl font-bold mb-1">{{ slides[current].title }}</h4>
              <p class="text-base font-medium">{{ slides[current].caption }}</p>
            </div>
          </div>
          <!-- Manual Nav -->
          <button
            @click="prev"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow transition z-40"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            @click="next"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow transition z-40"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import img1 from '@/assets/images/research/research-1.webp'
import img2 from '@/assets/images/research/research-2.webp'
import img3 from '@/assets/images/research/research-3.webp'

const slides = [
  {
    id: 1,
    img: img1,
    title: '₹500+ Cr Wealth Under Advisory',
    caption: '',
  },
  {
    id: 2,
    img: img2,
    title: '10+ Years of Market Expertise',
    caption: '',
  },
  {
    id: 3,
    img: img3,
    title: '95% Client Retention Rate',
    caption: '',
  },
]

const current = ref(0)
const slideRefs = ref([])

let interval: ReturnType<typeof setInterval> | null = null

function next() {
  current.value = (current.value + 1) % slides.length
}
function prev() {
  current.value = (current.value - 1 + slides.length) % slides.length
}

// Helper to check if slide is left/right of current
function isSide(idx: number) {
  return (
    (idx === (current.value - 1 + slides.length) % slides.length) ||
    (idx === (current.value + 1) % slides.length)
  )
}

// Helper to check if slide should be visible
function isVisible(idx: number) {
  return idx === current.value || isSide(idx)
}

// Positioning logic for center and side slides (desktop/tablet only)
function getSlideStyle(idx: number) {
  const transition = 'all 1.2s cubic-bezier(0.77, 0, 0.175, 1)';
  if (idx === current.value) {
    return {
      transform: `translate(-50%, -50%) scale(1)`,
      opacity: 1,
      zIndex: 30,
      transition,
      filter: 'blur(0px)',
    }
  }
  if (idx === (current.value - 1 + slides.length) % slides.length) {
    // Left slide
    return {
      transform: `translate(calc(-50% - 160px), -50%) scale(0.7)`,
      opacity: 0.7,
      zIndex: 20,
      transition,
      filter: 'blur(1.5px)',
    }
  }
  if (idx === (current.value + 1) % slides.length) {
    // Right slide
    return {
      transform: `translate(calc(-50% + 160px), -50%) scale(0.7)`,
      opacity: 0.7,
      zIndex: 20,
      transition,
      filter: 'blur(1.5px)',
    }
  }
  // Hide others
  return {
    opacity: 0,
    zIndex: 0,
    transition,
    filter: 'blur(2px)',
  }
}

onMounted(() => {
  interval = setInterval(() => {
    next()
  }, 5000)
})
onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
/* Optional: smooth transitions for slides */
:deep(.transition-all) {
  will-change: transform, opacity;
}
</style>