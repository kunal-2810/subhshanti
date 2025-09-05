<template>
  <nav class="bg-white shadow-sm">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <img src="@/assets/images/logo.webp" alt="Logo" class="h-[68px] w-[160px]" />
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex flex-1 items-center justify-end space-x-8">
          <!-- Menu Items -->
          <div class="flex space-x-6">
            <!-- What We Cover Dropdown -->
            <div class="relative">
              <button
                class="flex items-center text-lg font-medium text-yellow-700 focus:outline-none"
                @click="toggleDropdown('cover')"
                type="button"
              >
                What We Cover
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <!-- Dropdown -->
              <div
                v-if="dropdownOpen === 'cover'"
                class="absolute left-0 mt-4 w-[700px] bg-white rounded-xl shadow-lg p-8 flex space-x-8 z-30"
                @click.stop
              >
                <div v-for="(col, colIdx) in desktopMenus.cover" :key="colIdx" class="flex-1">
                  <a :href="col.link" class="font-semibold text-lg mb-2 block text-purple-700 hover:underline">
                    {{ col.title }}
                  </a>
                  <ul class="space-y-1">
                    <li v-for="(item, itemIdx) in col.items" :key="itemIdx">
                      <a :href="item.link" class="text-gray-700 hover:text-yellow-700 hover:underline">
                        {{ item.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- How it Works -->
            <a href="#" class="text-lg font-medium text-gray-700 hover:text-yellow-700">How it Works</a>
            <!-- Explore Dropdown -->
            <div class="relative">
              <button
                class="flex items-center text-lg font-medium text-gray-700 focus:outline-none"
                @click="toggleDropdown('explore')"
                type="button"
              >
                Explore
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <!-- Dropdown -->
              <div
                v-if="dropdownOpen === 'explore'"
                class="absolute left-0 mt-4 w-[700px] bg-white rounded-xl shadow-lg p-8 flex space-x-8 z-30"
                @click.stop
              >
                <div v-for="(col, colIdx) in desktopMenus.explore" :key="colIdx" class="flex-1">
                  <a :href="col.link" class="font-semibold text-lg mb-2 block text-purple-700 hover:underline">
                    {{ col.title }}
                  </a>
                  <ul class="space-y-1">
                    <li v-for="(item, itemIdx) in col.items" :key="itemIdx">
                      <a :href="item.link" class="text-gray-700 hover:text-yellow-700 hover:underline">
                        {{ item.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- NRI Zone -->
            <a href="#" class="text-lg font-medium">NRI Zone</a>
          </div>
          <!-- Login Button -->
          <button class="ml-8 flex items-center bg-primary text-white px-6 py-2 rounded-full text-lg hover:bg-purple-900 transition">
            <img src="@/assets/icons/user.svg" alt="User" class="w-5 h-5 mr-2" />
            Login
          </button>
        </div>

        <!-- Mobile/Tablet Right Panel -->
        <div class="flex items-center lg:hidden space-x-2">
          <button class="flex items-center bg-purple-800 text-white px-5 py-2 rounded-full font-semibold text-base hover:bg-purple-900 transition">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Login
          </button>
          <button @click="drawerOpen = true" class="ml-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none">
            <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <transition name="fade">
      <div v-if="drawerOpen" class="fixed inset-0 z-40 flex">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-30" @click="drawerOpen = false"></div>
        <!-- Drawer -->
        <div class="relative ml-auto w-80 max-w-full bg-white h-full shadow-xl flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <span class="text-xl font-bold">Menu</span>
            <button @click="drawerOpen = false" class="p-2 rounded hover:bg-gray-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <!-- Menu List -->
          <div class="flex-1 overflow-y-auto px-6 py-4">
            <div v-for="(menu, idx) in mobileMenus" :key="menu.title" class="mb-2">
              <div class="flex items-center justify-between">
                <a :href="menu.link || '#'" class="font-medium text-lg hover:text-yellow-700">{{ menu.title }}</a>
                <button v-if="menu.subMenus" @click="toggleExpand(idx)" class="ml-2">
                  <span v-if="expandedMenus[idx]">-</span>
                  <span v-else>+</span>
                </button>
              </div>
              <div v-if="menu.subMenus && expandedMenus[idx]" class="ml-4 mt-2">
                <div v-for="sub in menu.subMenus" :key="sub.title" class="mb-2">
                  <a :href="sub.link || '#'" class="font-semibold text-base block text-purple-700 hover:underline">{{ sub.title }}</a>
                  <ul class="ml-2">
                    <li v-for="item in sub.items" :key="item.name">
                      <a :href="item.link" class="text-gray-700 text-sm py-1 hover:text-yellow-700 hover:underline">{{ item.name }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- Fixed Bottom Area -->
          <div class="border-t px-6 py-4 bg-white">
            <div class="flex items-center mb-2">
              <img src="@/assets/icons/phone.svg" alt="Phone" class="w-5 h-5 mr-2" />
              <span class="text-base font-medium">+91 12345 67890</span>
            </div>
            <div class="flex items-center mb-2">
              <img src="@/assets/icons/mail.svg" alt="Email" class="w-5 h-5 mr-2" />
              <span class="text-base font-medium">info@subhshanti.com</span>
            </div>
            <div class="flex space-x-4 mt-2">
              <a href="#" target="_blank"><img src="@/assets/icons/facebook.svg" class="w-5 h-5" /></a>
              <a href="#" target="_blank"><img src="@/assets/icons/instagram.svg" class="w-5 h-5" /></a>
              <a href="#" target="_blank"><img src="@/assets/icons/linkedin.svg" class="w-5 h-5" /></a>
              <a href="#" target="_blank"><img src="@/assets/icons/youtube.svg" class="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const dropdownOpen = ref<string | null>(null)
const drawerOpen = ref(false)
const expandedMenus = ref<{ [key: number]: boolean }>({})

// Desktop dropdown menu data
const desktopMenus = {
  cover: [
    {
      title: 'Insurance',
      link: '/insurance',
      items: [
        { name: 'Life Insurance', link: '/insurance/life' },
        { name: 'Health Insurance', link: '/insurance/health' },
        { name: 'Car Insurance', link: '/insurance/car' },
        { name: 'Travel Insurance', link: '/insurance/travel' },
      ],
    },
    {
      title: 'Investments',
      link: '/investments',
      items: [
        { name: 'Mutual Funds', link: '/investments/mutual-funds' },
        { name: 'Stocks', link: '/investments/stocks' },
        { name: 'Bonds', link: '/investments/bonds' },
        { name: 'Fixed Deposits', link: '/investments/fd' },
      ],
    },
    {
      title: 'Loans',
      link: '/loans',
      items: [
        { name: 'Home Loan', link: '/loans/home' },
        { name: 'Personal Loan', link: '/loans/personal' },
        { name: 'Car Loan', link: '/loans/car' },
        { name: 'Education Loan', link: '/loans/education' },
      ],
    },
    {
      title: 'Tax & Legal',
      link: '/tax-legal',
      items: [
        { name: 'Tax Filing', link: '/tax-legal/tax-filing' },
        { name: 'Legal Advice', link: '/tax-legal/legal-advice' },
        { name: 'Will Writing', link: '/tax-legal/will-writing' },
        { name: 'NRI Services', link: '/tax-legal/nri' },
      ],
    },
  ],
  explore: [
    {
      title: 'Resources',
      link: '/resources',
      items: [
        { name: 'Blog', link: '/resources/blog' },
        { name: 'FAQs', link: '/resources/faqs' },
        { name: 'Guides', link: '/resources/guides' },
        { name: 'Calculators', link: '/resources/calculators' },
      ],
    },
    {
      title: 'Company',
      link: '/company',
      items: [
        { name: 'About Us', link: '/company/about' },
        { name: 'Careers', link: '/company/careers' },
        { name: 'Contact', link: '/company/contact' },
        { name: 'Press', link: '/company/press' },
      ],
    },
    {
      title: 'Partners',
      link: '/partners',
      items: [
        { name: 'Become a Partner', link: '/partners/become' },
        { name: 'Partner Login', link: '/partners/login' },
        { name: 'Partner Resources', link: '/partners/resources' },
        { name: 'Partner FAQs', link: '/partners/faqs' },
      ],
    },
    {
      title: 'Support',
      link: '/support',
      items: [
        { name: 'Help Center', link: '/support/help-center' },
        { name: 'Live Chat', link: '/support/live-chat' },
        { name: 'Email Support', link: '/support/email' },
        { name: 'Phone Support', link: '/support/phone' },
      ],
    },
  ],
}

// Mobile menu structure (can be similar to desktopMenus)
const mobileMenus = [
  {
    title: 'What We Cover',
    link: '/insurance',
    subMenus: desktopMenus.cover.map(col => ({
      title: col.title,
      link: col.link,
      items: col.items,
    })),
  },
  {
    title: 'How it Works',
    link: '/how-it-works',
  },
  {
    title: 'Explore',
    link: '/explore',
    subMenus: desktopMenus.explore.map(col => ({
      title: col.title,
      link: col.link,
      items: col.items,
    })),
  },
  {
    title: 'NRI Zone',
    link: '/nri-zone',
  },
]

function toggleDropdown(name: string) {
  dropdownOpen.value = dropdownOpen.value === name ? null : name
}

// Close dropdown when clicking outside (desktop only)
function handleClickOutside(event: MouseEvent) {
  if (window.innerWidth < 1024) return
  const dropdowns = document.querySelectorAll('.z-30')
  let clickedInside = false
  dropdowns.forEach(dropdown => {
    if (dropdown.contains(event.target as Node)) {
      clickedInside = true
    }
  })
  // Also check if the click was on the dropdown button itself
  const buttons = document.querySelectorAll('.flex.items-center.text-lg')
  buttons.forEach(btn => {
    if (btn.contains(event.target as Node)) {
      clickedInside = true
    }
  })
  if (!clickedInside) {
    dropdownOpen.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function toggleExpand(idx: number) {
  expandedMenus.value[idx] = !expandedMenus.value[idx]
}
</script>