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
      <div class="flex flex-col lg:flex-row gap-10 items-stretch">
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
            <template v-if="playing">
              <iframe
                :id="'ytplayer'"
                :src="webinars[currentIndex].videoUrl + '?enablejsapi=1&autoplay=1'"
                class="w-full h-64 md:h-72 rounded-2xl"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe>
              <button
                class="absolute top-2 right-2 bg-white/80 rounded-full p-2"
                @click="playing = false"
                aria-label="Close video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </template>
            <template v-else>
              <img
                :src="webinars[currentIndex].image"
                alt="Webinar thumbnail"
                class="w-full h-64 md:h-72 object-cover rounded-2xl"
              />
              <button
                class="absolute inset-0 flex items-center justify-center"
                aria-label="Play video"
                @click="playing = true"
              >
                <img src="@/assets/icons/play.svg" alt="Play Button" class="w-12 h-12" />
              </button>
            </template>
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
              v-for="(_, idx) in webinars"
              :key="idx"
              @click="goToSlide(idx)"
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
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const webinars = [
  {
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600&h=400&fit=crop',
    title: 'How to Navigate Market Volatility Like a Pro',
    duration: '32 min',
    videoUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ'
  },
  {
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600&h=400&fit=crop',
    title: 'Building a Diversified Portfolio in 2025',
    duration: '28 min',
    videoUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ'
  },
  {
    image: 'https://images.pexels.com/photos/669365/pexels-photo-669365.jpeg?auto=compress&w=600&h=400&fit=crop',
    title: 'Retirement Planning: Strategies for High Earners',
    duration: '35 min',
    videoUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ'
  }
]

const currentIndex = ref(0)
const playing = ref(false)
let intervalId: number | undefined
let ytPlayer: any = null

function goToSlide(idx: number) {
  currentIndex.value = idx
  playing.value = false
  stopSlider()
  startSlider()
}

function startSlider() {
  if (intervalId) clearInterval(intervalId)
  if (!playing.value) {
    intervalId = window.setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % webinars.length
    }, 5000)
  }
}

function stopSlider() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = undefined
  }
}

function onPlayerStateChange(event: any) {
  // 0 = ended, 2 = paused, 1 = playing
  if (event.data === 0) {
    // When video ends, go to next webinar and resume slider
    currentIndex.value = (currentIndex.value + 1) % webinars.length
    playing.value = false // This will trigger the watcher to start the slider
  }
  // If paused (event.data === 2), do nothing (slider remains paused)
  // If playing (event.data === 1), do nothing (slider remains paused)
}

async function createYouTubePlayer() {
  stopSlider()
  await nextTick()
  setTimeout(() => {
    if (ytPlayer) {
      ytPlayer.destroy()
      ytPlayer = null
    }
    const iframeId = 'ytplayer'
    // @ts-ignore
    ytPlayer = new window.YT.Player(iframeId, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    })
  }, 200)
}

// Watch for playing state
watch(playing, (val) => {
  if (val) {
    stopSlider()
    if (window.YT && window.YT.Player) {
      createYouTubePlayer()
    }
  } else {
    if (ytPlayer) {
      ytPlayer.destroy()
      ytPlayer = null
    }
    startSlider()
  }
})

// Load YouTube API
function loadYouTubeAPI() {
  return new Promise<void>((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve()
      return
    }
    if (document.getElementById('youtube-iframe-api')) {
      // Wait for API to be ready
      const check = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(check)
          resolve()
        }
      }, 100)
      return
    }
    const tag = document.createElement('script')
    tag.id = 'youtube-iframe-api'
    tag.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(tag)
    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => resolve()
  })
}

onMounted(async () => {
  await loadYouTubeAPI()
  startSlider()
})

onBeforeUnmount(() => {
  stopSlider()
  if (ytPlayer) ytPlayer.destroy()
})
</script>
