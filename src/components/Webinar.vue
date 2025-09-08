<template>
  <section class="bg-primary-light py-12 px-4 md:px-12">
    <div class="max-w-7xl mx-auto">
      <!-- Title & Description -->
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-[32px] font-primary font-bold text-gray-800 mb-4">Webinars That Build Wealth</h2>
        <p class="text-lg text-gray-600">
          Join our expert-led live sessions or explore our archive of deep-dive conversations on building, preserving, and growing wealth.
        </p>
      </div>
      <!-- Panels -->
      <div class="flex flex-col md:flex-row gap-10 items-stretch">
        <!-- Left Panel: Upcoming Webinar -->
        <div class="flex-1 p-8 flex flex-col justify-center">
          <h3 class="text-2xl font-primary font-semibold text-primary mb-6">Upcoming Live Webinar</h3>
          <div>
            <div class="mb-2 text-primary font-semibold">
              <span class="font-medium text-secondary">Topic:</span> Tax-Optimised Wealth Planning for High Earners
            </div>
            <div class="mb-2 text-primary font-semibold">
              <span class="font-medium text-secondary">Date:</span> 28 July 2025
            </div>
            <div class="mb-2 text-primary font-semibold">
              <span class="font-medium text-secondary">Time:</span> 05:30 PM - 06:30 PM IST
            </div>
          </div>
          <button
            class="mt-8 bg-primary text-white px-16 py-3 rounded-full hover-bg-secondary transition self-start"
          >
            Save my Spot
          </button>
        </div>
        <!-- Right Panel: Webinar Videos Slider -->
        <div class="flex-1 flex flex-col justify-center">
          <div class="relative">
            <img
              :src="webinars[currentIndex].image"
              alt="Webinar thumbnail"
              class="w-full h-64 md:h-72 object-cover rounded-2xl"
            />
            <button
              class="absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
            >
              <img src="@/assets/icons/play.svg" alt="Play Button" class="w-12 h-12" />
            </button>
          </div>
          <div class="mt-6">
            <div class="text-lg font-primary font-semibold text-gray-700 mb-1">
              {{ webinars[currentIndex].title }}
            </div>
            <div class="text-primary font-semibold">
              <span class="font-medium text-secondary">Duration:</span> {{ webinars[currentIndex].duration }}
            </div>
          </div>
          <!-- Dots -->
          <div class="flex justify-center mt-6 space-x-3">
            <button
              v-for="(webinar, idx) in webinars"
              :key="idx"
              @click="currentIndex = idx"
              :class="[
                'w-3 h-3 rounded-full transition',
                currentIndex === idx ? 'bg-primary' : 'bg-purple-400'
              ]"
              aria-label="Go to slide"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const webinars = [
  {
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600&h=400&fit=crop',
    title: 'How to Navigate Market Volatility Like a Pro',
    duration: '32 min'
  },
  {
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600&h=400&fit=crop',
    title: 'Building a Diversified Portfolio in 2025',
    duration: '28 min'
  },
  {
    image: 'https://images.pexels.com/photos/669365/pexels-photo-669365.jpeg?auto=compress&w=600&h=400&fit=crop',
    title: 'Retirement Planning: Strategies for High Earners',
    duration: '35 min'
  }
]

const currentIndex = ref(0)
let intervalId: number | undefined

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % webinars.length
  }, 10000)
})

onBeforeUnmount(() => {
  if (intervalId)
    window.clearInterval(intervalId)
})
</script>
