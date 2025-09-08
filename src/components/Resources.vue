<template>
  <!-- Section background: top half pink, bottom half white -->
  <section
    class="relative overflow-hidden"
    style="background: linear-gradient(to bottom, #ffccfd85 0%, #ffccfd85 30%, #ffffff 30%, #ffffff 100%);"
    aria-labelledby="webinar-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[60px] pb-[180px]">
      <div class="relative">
        <!-- IMAGE WRAPPER (centered, with responsive bottom padding for card overlap) -->
        <div
          class="mx-auto max-w-5xl relative"
          :style="{
            paddingBottom: cardPaddingBottom
          }"
        >
          <img
            :src="image ? image : resourceBannerImage"
            alt="Webinar banner placeholder"
            class="w-full h-[320px] sm:h-[380px] md:h-[460px] lg:h-[520px] object-cover rounded-[28px] shadow-md"
          />

          <!-- CONTENT CARD: overlays bottom 20% on mobile/tablet, bottom right with 50% overlap on desktop -->
          <div
            class="
              absolute
              left-1/2
              bottom-0
              translate-x-[-50%]
              translate-y-[35%]
              w-[96%]
              sm:w-[90%]
              md:w-[80%]
              max-w-4xl
              bg-[#833375]
              text-white
              p-6 sm:p-8
              rounded-[28px]
              shadow-xl
              flex flex-col
              z-10
              lg:left-auto
              lg:right-0
              lg:bottom-0
              lg:translate-x-0
              lg:w-[60%]
              xl:w-[60%]
              lg:translate-y-[50%]
            "
            role="region"
            aria-label="Webinar resources"
          >
            <!-- Title -->
            <h2 id="webinar-heading" class="text-2xl sm:text-3xl font-bold leading-tight mb-3">
              {{ title }}
            </h2>

            <!-- Description -->
            <p class="text-sm sm:text-base text-purple-100 mb-6">
              {{ description }}
            </p>

            <!-- Horizontal resource list -->
            <div class="flex flex-wrap items-center gap-4 justify-between">
              <div
                v-for="(r, idx) in resources"
                :key="idx"
                class="flex flex-col items-center min-w-[86px]"
              >
                <img
                  :src="getIcon(r.type)"
                  :alt="r.label + ' icon'"
                  class="w-12 h-12 object-contain mb-2"
                />
                <span class="text-white text-center">{{ r.label }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END IMAGE WRAPPER -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import resourceBannerImage from '@/assets/images/podcasts/podcast.webp'
import podcastIcon from '@/assets/icons/podcast.svg'
import youtubeIcon from '@/assets/icons/youtube-gold.svg'
import blogIcon from '@/assets/icons/blog.svg'
import researchIcon from '@/assets/icons/market-research.svg'

const props = defineProps({
  image: { type: String, default: '' },
  title: { type: String, default: 'Your Gateway to Financial Wisdom' },
  description: {
    type: String,
    default:
      "From deep-dive research and expert-led podcasts to engaging videos and insightful blogs — our resources are designed to keep you informed and inspired.",
  },
  resources: {
    type: Array,
    default: () => [
      { label: 'Podcast', type: 'podcast' },
      { label: 'YouTube', type: 'youtube' },
      { label: 'Blog', type: 'blog' },
      { label: 'Research', type: 'research' },
    ],
  },
})

// Responsive padding bottom for image wrapper
const cardPaddingBottom = ref('0px')

function updateCardPadding() {
  const width = window.innerWidth
  if (width < 640) {
    // mobile
    cardPaddingBottom.value = '200px'
  } else if (width < 1024) {
    // tablet
    cardPaddingBottom.value = '128px'
  } else {
    // desktop
    cardPaddingBottom.value = '0px'
  }
}

onMounted(() => {
  updateCardPadding()
  window.addEventListener('resize', updateCardPadding)
})

function getIcon(type) {
  switch (type) {
    case 'podcast':
      return podcastIcon
    case 'youtube':
      return youtubeIcon
    case 'blog':
      return blogIcon
    case 'research':
      return researchIcon
    default:
      return ''
  }
}
</script>

<!-- No additional CSS required; Tailwind handles styling -->
