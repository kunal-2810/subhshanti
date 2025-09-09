<template>
  <section class="bg-secondary-light py-12 px-2 sm:px-6 lg:px-0">
    <div class="max-w-6xl mx-auto">
      <!-- Title -->
      <h2 class="text-2xl md:text-[32px] font-primary text-primary text-center leading-snug font-bold mb-8">Our Testimonials</h2>
      <!-- Testimonial Panels -->
      <div class="flex flex-col lg:flex-row rounded-3xl overflow-hidden">
        <!-- Left: Video/Image (fixed, larger size, vertically centered) -->
        <div class="lg:w-1/2 flex items-center justify-center p-8">
          <div
            class="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center"
            style="min-height: 320px;"
          >
            <template v-if="currentTestimonial.videoUrl">
              <div class="w-full h-full flex items-center justify-center">
                <template v-if="showVideo">
                  <iframe
                    :src="youtubeEmbedUrl(currentTestimonial.videoUrl)"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    class="w-full h-full rounded-2xl"
                  ></iframe>
                </template>
                <template v-else>
                  <button
                    @click="showVideo = true"
                    class="relative w-full h-full focus:outline-none"
                  >
                    <img
                      :src="currentTestimonial.image"
                      alt="Client video thumbnail"
                      class="w-full h-full object-cover"
                    />
                    <!-- Play Button Overlay -->
                    <span class="absolute inset-0 flex items-center justify-center">
                      <img src="@/assets/icons/play.svg" alt="Play Button" class="w-12 h-12" />
                    </span>
                  </button>
                </template>
              </div>
            </template>
            <template v-else-if="currentTestimonial.image">
              <img
                :src="currentTestimonial.image"
                alt="Client photo"
                class="w-full h-full object-cover"
              />
            </template>
            <template v-else>
              <!-- Placeholder for missing image -->
              <div class="flex items-center justify-center w-full h-full bg-gray-300">
                <span class="text-gray-500 text-lg text-center">Image Placeholder<br />(16:9)</span>
              </div>
            </template>
          </div>
        </div>
        <!-- Right: Testimonial Content (reduced gap above Subhshanti feedback) -->
        <div class="lg:w-1/2 flex flex-col justify-between p-6 md:p-10 min-h-[320px]">
          <div class="flex-1 flex flex-col justify-center">
            <!-- Feedback (quote) -->
            <blockquote class="text-xl md:text-2xl italic text-gray-700 mb-4">
              “{{ currentTestimonial.feedback }}”
            </blockquote>
            <!-- Detailed review -->
            <p class="text-gray-700 mb-4">
              {{ currentTestimonial.review }}
            </p>
            <!-- Client info -->
            <div class="text-gray-700 mb-2">
              — <span class="font-semibold">{{ currentTestimonial.name }}</span
              >, {{ currentTestimonial.designation }}, {{ currentTestimonial.sector }}
            </div>
          </div>
          <!-- Subhshanti feedback: reduced margin-top -->
          <div class="flex items-center gap-4 mt-2">
            <img
              src="@/assets/images/logo-icon.webp"
              alt="Subhshanti Logo"
              class="w-10 h-10"
            />
            <span class="text-gray-700 text-base">
              "{{ currentTestimonial.subhshantiFeedback }}"
            </span>
          </div>
        </div>
      </div>
      <!-- Dots Navigation -->
      <div class="flex justify-center gap-4 mt-8">
        <button
          v-for="(t, idx) in testimonials"
          :key="idx"
          @click="goTo(idx)"
          :class="[
            'w-3 h-3 rounded-full',
            idx === currentIndex
              ? 'bg-primary'
              : 'bg-purple-400'
          ]"
          aria-label="Go to testimonial"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import testimonialImage1 from '@/assets/images/testimonial.webp'
import testimonialImage2 from '@/assets/images/testimonial.webp'
import testimonialImage3 from '@/assets/images/testimonial.webp'

// One testimonial has no image to show the placeholder
const testimonials = [
  {
    image: testimonialImage1,
    videoUrl: '',
    feedback: 'Subhshanti made my investment journey simple, transparent, and rewarding.',
    review:
      'When I first approached Subhshanti, I had no clear strategy for my capital. Their expert guidance not only helped me grow my portfolio but also gave me confidence in my decisions. The process was professional, personalised, and result-driven.',
    name: 'Amit R.',
    designation: 'Senior VP',
    sector: 'Technology Sector',
    subhshantiFeedback:
      'Every client has a unique story. We focus on understanding their needs deeply and crafting strategies that deliver long-term success.',
  },
  {
    image: testimonialImage2,
    videoUrl: '',
    feedback: 'The team at Subhshanti truly cares about your goals.',
    review:
      'They took the time to understand my aspirations and risk appetite. Their recommendations were always in my best interest.',
    name: 'Priya S.',
    designation: 'Entrepreneur',
    sector: 'Retail',
    subhshantiFeedback:
      'We believe in building lasting relationships and empowering our clients to achieve financial freedom.',
  },
  {
    image: testimonialImage3,
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ&t',
    feedback: 'Professional, trustworthy, and always available.',
    review:
      'Subhshanti’s team was always there to answer my queries and guide me through market ups and downs.',
    name: 'Rahul M.',
    designation: 'CFO',
    sector: 'Manufacturing',
    subhshantiFeedback:
      'Our commitment is to provide clarity and confidence at every step of your investment journey.',
  },
]

const currentIndex = ref(0)
const intervalId = ref<any>(null)
const showVideo = ref(false)

const currentTestimonial = computed(() => testimonials[currentIndex.value])

function goTo(idx: number) {
  currentIndex.value = idx
  showVideo.value = false
  resetInterval()
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
  showVideo.value = false
}

function resetInterval() {
  if (intervalId.value) clearInterval(intervalId.value)
  intervalId.value = setInterval(next, 5000)
}

onMounted(() => {
  intervalId.value = setInterval(next, 5000)
})

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})

// Reset video when testimonial changes
watch(currentIndex, () => {
  showVideo.value = false
})

function youtubeEmbedUrl(url: string) {
  // Extract video ID from YouTube URL
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  const videoId = match ? match[1] : ''
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : ''
}
</script>