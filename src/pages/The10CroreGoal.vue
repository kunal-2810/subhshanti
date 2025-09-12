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

  <!-- Responsive Segment Section -->
  <section class="w-full mx-auto">
    <div class="flex flex-col lg:flex-row lg:h-[480px] h-auto">
      <!-- Panel 1 -->
      <a
        href="#"
        class="relative h-[320px] xs:h-[380px] md:h-[420px] lg:h-[480px] w-full lg:w-1/3 overflow-hidden group block"
      >
        <img
          src="@/assets/images/segments/1crore.webp"
          alt="The First Crore"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#6E2B6B] via-[#6e2b6b38] to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col items-center justify-center text-center">
          <h3 class="text-2xl font-bold mb-2">The First Crore</h3>
          <span
            class="inline-block mt-1 text-base font-medium transition group-hover:underline"
          >Read More</span>
        </div>
      </a>
      <!-- Panel 2 -->
      <a
        href="#"
        class="relative h-[320px] xs:h-[380px] md:h-[420px] lg:h-[480px] w-full lg:w-1/3 overflow-hidden group block"
      >
        <img
          src="@/assets/images/segments/10crore.webp"
          alt="The 10 Cr Goal"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#6E2B6B] via-[#6e2b6b38] to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col items-center justify-center text-center">
          <h3 class="text-2xl font-bold mb-2">The 10 Cr Goal</h3>
          <span
            class="inline-block mt-1 text-base font-medium transition group-hover:underline"
          >Read More</span>
        </div>
      </a>
      <!-- Panel 3 -->
      <a
        href="#"
        class="relative h-[320px] xs:h-[380px] md:h-[420px] lg:h-[480px] w-full lg:w-1/3 overflow-hidden group block"
      >
        <img
          src="@/assets/images/segments/100crore.webp"
          alt="100 + Cr and Beyond"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#6E2B6B] via-[#6e2b6b38] to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col items-center justify-center text-center">
          <h3 class="text-2xl font-bold mb-2">100 + Cr and Beyond</h3>
          <span
            class="inline-block mt-1 text-base font-medium transition group-hover:underline"
          >Read More</span>
        </div>
      </a>
    </div>
  </section>



  <Research />
  <Testimonial />
  <Blogs />
  <Webinar />
  <Resources />
  <Newsletter />
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
