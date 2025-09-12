<template>
  <!-- Banner Section: No space on top and bottom, image fills area -->
  <section class="relative m-0 p-0 w-full">
    <div
      class="overflow-hidden shadow w-full relative m-0 p-0"
      @mouseenter="showNav = true"
      @mouseleave="showNav = false"
    >
      <!-- Desktop Banner (≥1024px) -->
      <a href="#" class="hidden lg:block" aria-label="Banner Link">
        <img
          :src="desktopBanners[currentBanner]"
          :alt="`Banner ${currentBanner + 1}`"
          class="w-full h-[600px] object-cover m-0 p-0 block"
          style="display:block;margin:0;padding:0;"
        />
      </a>
      <!-- Tablet Banner (≥640px and <1024px) -->
      <a href="#" class="hidden sm:block lg:hidden" aria-label="Banner Link">
        <img
          :src="tabletBanners[currentBanner]"
          :alt="`Tablet Banner ${currentBanner + 1}`"
          class="w-full h-[400px] md:h-[500px] object-cover m-0 p-0 block"
          style="display:block;margin:0;padding:0;"
        />
      </a>
      <!-- Mobile Banner (<640px) -->
      <a href="#" class="block sm:hidden" aria-label="Banner Link">
        <img
          :src="mobileBanners[currentBanner]"
          :alt="`Mobile Banner ${currentBanner + 1}`"
          class="w-full h-[420px] object-cover m-0 p-0 block bg-gray-100"
          style="display:block;margin:0;padding:0;"
        />
      </a>
      <!-- Prev/Next Buttons (Desktop & Tablet) -->
      <button
        v-if="showNav"
        @click="prevBanner"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition hidden sm:flex"
      >
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        v-if="showNav"
        @click="nextBanner"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition hidden sm:flex"
      >
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      <!-- Prev/Next Buttons (Mobile) -->
      <button
        v-if="showNav"
        @click="prevBanner"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition sm:hidden flex"
      >
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        v-if="showNav"
        @click="nextBanner"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition sm:hidden flex"
      >
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </section>

  


  <SipCalculator />
  <Research />
  <Testimonial />
  <Blogs />
  <Webinar />
  <Resources />
  <Newsletter />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SipCalculator from '../components/SipCalculator.vue';
import Research from '../components/Research.vue';
import Blogs from '../components/Blogs.vue';
import Newsletter from '../components/Newsletter.vue';
import Resources from '../components/Resources.vue';
import Testimonial from '../components/Testimonial.vue';
import Webinar from '../components/Webinar.vue';

// Use different images for each device type
import desktopBanner1 from '@/assets/images/banners/first-crore/desktop-banner-1.webp';
import desktopBanner2 from '@/assets/images/banners/first-crore/desktop-banner-1.webp';

import tabletBanner1 from '@/assets/images/banners/first-crore/tablet-banner-1.webp';
import tabletBanner2 from '@/assets/images/banners/first-crore/tablet-banner-1.webp';

// Placeholder for mobile banners (640x420)
import mobileBanner1 from '@/assets/images/banners/first-crore/mobile-banner-1.webp';
import mobileBanner2 from '@/assets/images/banners/first-crore/mobile-banner-1.webp';

const desktopBanners = [
  desktopBanner1,
  desktopBanner2
];

const tabletBanners = [
  tabletBanner1,
  tabletBanner2
];

const mobileBanners = [
  mobileBanner1,
  mobileBanner2
];

const currentBanner = ref(0);
const showNav = ref(false);

function prevBanner() {
  currentBanner.value = (currentBanner.value - 1 + desktopBanners.length) % desktopBanners.length;
}
function nextBanner() {
  currentBanner.value = (currentBanner.value + 1) % desktopBanners.length;
}
</script>
