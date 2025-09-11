<template>
  <section class="w-full py-12 px-4 md:px-12 bg-white">
    <div class="flex flex-col md:flex-row gap-8 items-center max-w-7xl mx-auto">
      <!-- Left Panel -->
      <div class="flex-1 w-full md:w-1/2">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Driven by Insight</h2>
        <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
          Because Strategy Without<br class="hidden md:block" />
          Research is Just a Guess.
        </h3>
        <p class="text-gray-500 mb-6">
          We back every decision with deep analysis and credible data, ensuring your wealth moves are precise and powerful.
        </p>
        <blockquote class="italic text-lg text-gray-700 mb-8">
          "From in-house analysts to global market data feeds, our team examines every angle before we advise a move."
        </blockquote>
        <a
          href="#"
          class="inline-block bg-[#6E2B6B] hover:bg-[#5a235a] text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Explore Our Research Edge
        </a>
      </div>
      <!-- Right Panel: Image Slider -->
      <div class="flex-1 w-full md:w-1/2 relative h-[340px] md:h-[360px] flex items-center">
        <div class="relative w-full h-full flex overflow-visible">
          <!-- Current Slide -->
          <div
            v-for="(slide, idx) in slides"
            :key="slide.id"
            class="absolute top-0 left-0 transition-all duration-700"
            :style="getSlideStyle(idx)"
            ref="slideRefs"
          >
            <div
              class="w-[320px] md:w-[340px] h-[340px] md:h-[360px] rounded-2xl overflow-hidden shadow-lg relative"
              :class="{'z-20': idx === current, 'z-10': idx !== current}"
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
        </div>
        <!-- Optional: Manual Nav -->
        <button
          @click="prev"
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow transition z-30"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          @click="next"
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow transition z-30"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, } from 'vue'

// Example images (replace with your actual images)
import img1 from '@/assets/images/research/research-1.webp'
import img2 from '@/assets/images/research/research-2.webp'
import img3 from '@/assets/images/research/research-1.webp'

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

function getSlideStyle(idx: number) {
  // Current slide: center, others: shifted right with scale
  if (idx === current.value) {
    return {
      transform: 'translateX(0) scale(1)',
      opacity: 1,
      transition: 'all 0.7s cubic-bezier(.4,2,.6,1)',
      left: '0',
      zIndex: 20,
    }
  }
  // Next slides: stack right, slightly scaled down
  const offset = (idx - current.value + slides.length) % slides.length
  if (offset === 1) {
    return {
      transform: 'translateX(220px) scale(0.92)',
      opacity: 1,
      left: '0',
      zIndex: 10,
    }
  }
  if (offset === 2) {
    return {
      transform: 'translateX(340px) scale(0.85)',
      opacity: 1,
      left: '0',
      zIndex: 5,
    }
  }
  // Hide others
  return {
    opacity: 0,
    pointerEvents: 'none',
    left: '0',
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
</style>