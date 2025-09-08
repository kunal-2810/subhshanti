<template>
  <section class="bg-[#ede9e2] py-12 px-2 sm:px-6 lg:px-0">
    <div class="max-w-6xl mx-auto">
      <!-- Title -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-10">Our Testimonials</h2>
      <!-- Testimonial Panels -->
      <div class="flex flex-col lg:flex-row bg-white/60 rounded-3xl overflow-hidden shadow-md">
        <!-- Left: Video/Image -->
        <div class="lg:w-1/2 flex items-center justify-center bg-white/80 p-6">
          <div class="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden">
            <template v-if="currentTestimonial.videoUrl">
              <a
                :href="currentTestimonial.videoUrl"
                target="_blank"
                rel="noopener"
                class="block w-full h-full"
              >
                <img
                  :src="currentTestimonial.image"
                  alt="Client video thumbnail"
                  class="w-full h-full object-cover"
                />
                <!-- Play Button Overlay -->
                <span class="absolute inset-0 flex items-center justify-center">
                  <span class="bg-purple-700 bg-opacity-90 rounded-full p-4">
                    <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="9.5,7.5 16.5,12 9.5,16.5" />
                    </svg>
                  </span>
                </span>
              </a>
            </template>
            <template v-else>
              <img
                :src="currentTestimonial.image"
                alt="Client photo"
                class="w-full h-full object-cover"
              />
            </template>
          </div>
        </div>
        <!-- Right: Testimonial Content -->
        <div class="lg:w-1/2 flex flex-col justify-between p-6 md:p-10">
          <div>
            <!-- Feedback (quote) -->
            <blockquote class="text-xl md:text-2xl italic text-gray-700 mb-4">
              “{{ currentTestimonial.feedback }}”
            </blockquote>
            <!-- Detailed review -->
            <p class="text-gray-700 mb-4">
              {{ currentTestimonial.review }}
            </p>
            <!-- Client info -->
            <div class="text-gray-700 mb-6">
              — <span class="font-semibold">{{ currentTestimonial.name }}</span
              >, {{ currentTestimonial.designation }}, {{ currentTestimonial.sector }}
            </div>
          </div>
          <!-- Subhshanti feedback -->
          <div class="flex items-center gap-4 mt-4">
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
            'w-4 h-4 rounded-full border-2',
            idx === currentIndex
              ? 'bg-purple-700 border-purple-700'
              : 'bg-transparent border-purple-400'
          ]"
          aria-label="Go to testimonial"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const testimonials = [
  {
    image: require('@/assets/images/testimonials/client1.jpg'),
    videoUrl: 'https://www.youtube.com/watch?v=xxxxxxx',
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
    image: require('@/assets/images/testimonials/client2.jpg'),
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
    image: require('@/assets/images/testimonials/client3.jpg'),
    videoUrl: 'https://www.youtube.com/watch?v=yyyyyyy',
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
let intervalId = null

const currentTestimonial = computed(() => testimonials[currentIndex.value])

function goTo(idx) {
  currentIndex.value = idx
  resetInterval()
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}

function resetInterval() {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(next, 5000)
}

onMounted(() => {
  intervalId = setInterval(next, 5000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>