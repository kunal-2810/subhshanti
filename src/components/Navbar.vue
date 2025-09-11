<template>
  <nav
    class="w-full bg-white shadow z-50 transition-transform duration-500 ease-in-out"
    :class="[{ 'fixed top-0 left-0': true }]"
    :style="navbarStyle"
  >
    <div class="w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center py-2">
        <img src="@/assets/images/logo.webp" alt="Logo" class="h-[68px] w-[160px]" />
      </div>

      <!-- Desktop Menu (unchanged) -->
      <div class="hidden lg:flex items-center flex-1 justify-end space-x-8">
        <div class="flex space-x-6">
          <!-- What We Cover -->
          <div v-if="menus[0]" :key="menus[0].title" class="relative">
            <button
              class="flex items-center text-lg font-medium transition-colors"
              :class="{'text-yellow-600': openDropdown === menus[0].title, 'text-gray-700': openDropdown !== menus[0].title}"
              @click="toggleDropdown(menus[0].title)"
              type="button"
            >
              {{ menus[0].title }}
              <svg v-if="menus[0].subMenus" class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
          <!-- Mega Dropdown for "What We Cover" -->
          <transition name="fade">
            <div
              v-if="openDropdown === menus[0].title"
              class="absolute left-0 top-full mt-1 w-screen max-w-none bg-white rounded-xl shadow-lg p-8 flex z-50 overflow-x-auto"
              style="min-width:320px;"
              @click.stop
            >
              <div
                v-for="(col, idx) in menus[0].subMenus"
                :key="col.title"
                class="flex-1 min-w-[180px] max-w-[240px] px-4 mb-4"
                :class="{'text-center': menus[0].subMenus.length < 4}"
              >
                <div class="font-semibold text-lg mb-2">{{ col.title }}</div>
                <ul>
                  <li v-for="item in col.items" :key="item.label" class="py-1">
                    <a :href="item.href" class="text-gray-700 hover:text-yellow-700 transition-colors">
                      {{ item.label }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
          <a href="#" class="text-lg font-medium text-gray-700 hover:text-yellow-700">About Us</a>
          <!-- Explore (WITH relative class) -->
          <div
            v-if="menus[1]"
            :key="menus[1].title"
            class="relative"
          >
            <button
              class="flex items-center text-lg font-medium transition-colors"
              :class="{'text-yellow-600': openDropdown === menus[1].title, 'text-gray-700': openDropdown !== menus[1].title}"
              @click="toggleDropdown(menus[1].title)"
              type="button"
            >
              {{ menus[1].title }}
              <svg v-if="menus[1].subMenus" class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <!-- Vertical Dropdown for "Explore" -->
            <transition name="fade">
              <div
                v-if="openDropdown === menus[1].title"
                class="absolute left-0 top-full mt-8 w-56 bg-white rounded-xl shadow-lg p-4 flex flex-col z-50"
                @click.stop
              >
                <ul>
                  <li
                    v-for="(col, idx) in menus[1].subMenus"
                    :key="col.items[0]?.label || idx"
                    class="py-1"
                  >
                    <a
                      :href="col.items[0]?.href"
                      class="block text-gray-700 hover:text-yellow-700 transition-colors"
                    >
                      {{ col.items[0]?.label }}
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
          <a href="#" class="text-lg font-medium text-purple hover:text-yellow-700">NRI Zone</a>
        </div>
        <!-- Login Button -->
        <button class="flex items-center bg-primary text-white rounded-full px-6 py-2 shadow hover:bg-purple-800 transition">
          <img src="@/assets/icons/user.svg" alt="User Icon" class="w-5 h-5 mr-2" />
          Login
        </button>
      </div>

      <!-- Mobile/Tablet Right Panel -->
      <div class="flex items-center lg:hidden space-x-2">
        <button class="flex items-center bg-primary text-white rounded-full px-5 py-2 shadow hover:bg-purple-800 transition">
          <img src="@/assets/icons/user.svg" alt="User Icon" class="w-5 h-5 mr-2" />
          Login
        </button>
        <button @click="openDrawer" class="ml-2 p-2 rounded-full hover:bg-gray-100">
          <img src="@/assets/icons/menu.svg" alt="Menu Icon" class="w-7 h-7" />
        </button>
      </div>
    </div>

    <!-- Overlay for dropdown and drawer -->
    <div
      v-if="openDropdown || drawerOpen"
      class="fixed inset-0 z-40"
      @click="closeAll"
    ></div>

    <!-- Mobile Drawer -->
    <transition name="slide">
      <aside
        v-if="drawerOpen"
        class="fixed top-0 right-0 w-80 max-w-full h-screen bg-white shadow-2xl z-50 flex flex-col"
        style="height: 100dvh; max-height: 100dvh;"
        @touchmove.prevent
      >
        <!-- Fixed Top: Menu Title and Close -->
        <div ref="drawerHeader" class="flex items-center justify-between px-6 py-4 border-b bg-white flex-shrink-0 z-10">
          <span class="text-xl font-bold">Menu</span>
          <button @click="closeDrawer" class="p-2 rounded-full hover:bg-gray-100">
            <img src="@/assets/icons/close.svg" alt="Close Icon" class="w-6 h-6" />
          </button>
        </div>
        <!-- Scrollable Menu List -->
        <div
          class="px-0 py-0 bg-white z-0"
          :style="menuListStyle"
        >
          <nav>
            <ul class="px-6 py-2">
              <!-- What We Cover (mobile) -->
              <li class="mb-2">
                <div class="flex items-center justify-between py-2">
                  <a :href="mobileWhatWeCover.href || '#'" class="font-medium text-lg flex-1">{{ mobileWhatWeCover.title }}</a>
                  <button
                    @click="toggleMobileMenu('What We Cover')"
                    class="ml-2 p-1"
                    aria-label="Expand What We Cover"
                  >
                    <span v-if="mobileOpenMenus.includes('What We Cover')" class="text-2xl font-bold leading-none">-</span>
                    <span v-else class="text-2xl font-bold leading-none">+</span>
                  </button>
                </div>
                <transition name="fade">
                  <div v-if="mobileOpenMenus.includes('What We Cover')" class="pl-2">
                    <div
                      v-for="col in mobileWhatWeCover.subMenus"
                      :key="col.title"
                      class="mb-2"
                    >
                      <div class="font-semibold text-base my-2" v-if="col.title">{{ col.title }}</div>
                      <ul>
                        <li
                          v-for="item in col.items"
                          :key="item.label"
                          class="text-base py-2"
                        >
                          <a :href="item.href" class="text-gray-700 hover:text-yellow-700 transition-colors">
                            {{ item.label }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </transition>
              </li>
              <!-- About -->
              <li class="mb-2">
                <a href="#" class="block py-2 text-lg">About</a>
              </li>
              <!-- Explore (mobile) -->
              <li class="mb-2">
                <div class="flex items-center justify-between py-2">
                  <a :href="mobileExplore.href || '#'" class="font-medium text-lg flex-1">{{ mobileExplore.title }}</a>
                  <button
                    @click="toggleMobileMenu('Explore')"
                    class="ml-2 p-1"
                    aria-label="Expand Explore"
                  >
                    <span v-if="mobileOpenMenus.includes('Explore')" class="text-2xl font-bold leading-none">-</span>
                    <span v-else class="text-2xl font-bold leading-none">+</span>
                  </button>
                </div>
                <transition name="fade">
                  <div v-if="mobileOpenMenus.includes('Explore')" class="pl-2">
                    <div
                      v-for="col in mobileExplore.subMenus"
                      :key="col.title || col.items[0]?.label"
                      class="mb-2"
                    >
                      <div class="font-semibold text-base my-2" v-if="col.title">{{ col.title }}</div>
                      <ul>
                        <li
                          v-for="item in col.items"
                          :key="item.label"
                          class="text-base py-2"
                        >
                          <a :href="item.href" class="text-gray-700 hover:text-yellow-700 transition-colors">
                            {{ item.label }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </transition>
              </li>
              <!-- Other Menus -->
              <li class="mb-2">
                <a href="#" class="block py-2 text-lg font-medium text-purple">NRI Zone</a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- Fixed Bottom Contact/Social -->
        <div ref="drawerFooter" class="border-t px-6 py-4 bg-white flex-shrink-0 z-10"
             style="position: sticky; bottom: 0; background: white;">
          <div class="flex items-center mb-2">
            <img src="@/assets/icons/phone.svg" alt="Phone" class="w-6 h-6 mr-2" />
            <span class="font-medium text-gray-700">+91 12345 67890</span>
          </div>
          <div class="flex items-center mb-2">
            <img src="@/assets/icons/mail.svg" alt="Email" class="w-6 h-6 mr-2" />
            <span class="font-medium text-gray-700">info@subhshanti.com</span>
          </div>
          <div class="flex space-x-4 mt-4">
            <a href="#" target="_blank"><img src="@/assets/icons/facebook.svg" class="w-6 h-6" /></a>
            <a href="#" target="_blank"><img src="@/assets/icons/instagram.svg" class="w-6 h-6" /></a>
            <a href="#" target="_blank"><img src="@/assets/icons/linkedin.svg" class="w-6 h-6" /></a>
            <a href="#" target="_blank"><img src="@/assets/icons/youtube.svg" class="w-6 h-6" /></a>
          </div>
        </div>
      </aside>
    </transition>
  </nav>

  <!-- Main content area, push down by navbar height -->
  <main class="pt-[68px]">
    <!-- Your main content goes here -->
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'

// Desktop/Large menus (unchanged)
const menus = [
  {
    title: 'What We Cover',
    href: '#',
    subMenus: [
      {
        title: 'Menu Title',
        items: [
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
        ],
      },
      {
        title: 'Menu Title',
        items: [
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
        ],
      },
      {
        title: 'Menu Title',
        items: [
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
        ],
      },
      {
        title: 'Menu Title',
        items: [
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
        ],
      },
      {
        title: 'Menu Title',
        items: [
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
        ],
      },
      {
        title: 'Menu Title',
        items: [
          { label: 'Menu Name', href: '#' },
          { label: 'Menu Name', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Explore',
    href: '#',
    subMenus: [
      {
        items: [
          { label: 'Webinar', href: '#' },
        ],
      },
      {
        items: [
          { label: 'Podcast', href: '#' },
        ],
      },
      {
        items: [
          { label: 'YouTube', href: '#' },
        ],
      },
      {
        items: [
          { label: 'Blogs', href: '#' },
        ],
      },
      {
        items: [
          { label: 'Research', href: '#' },
        ],
      },
    ],
  },
]

// Separate mobile data for What We Cover
const mobileWhatWeCover = {
  title: 'What We Cover',
  href: '#',
  subMenus: [
    {
      title: 'Mobile Menu Title 1',
      items: [
        { label: 'Mobile Menu Name 1', href: '#' },
        { label: 'Mobile Menu Name 2', href: '#' },
      ],
    },
    {
      title: 'Mobile Menu Title 2',
      items: [
        { label: 'Mobile Menu Name 3', href: '#' },
        { label: 'Mobile Menu Name 4', href: '#' },
      ],
    },
  ],
}

// Separate mobile data for Explore
const mobileExplore = {
  title: 'Explore',
  href: '#',
  subMenus: [
    {
      title: 'Mobile Explore Title 1',
      items: [
        { label: 'Mobile Explore Name 1', href: '#' },
        { label: 'Mobile Explore Name 2', href: '#' },
      ],
    },
    {
      title: 'Mobile Explore Title 2',
      items: [
        { label: 'Mobile Explore Name 3', href: '#' },
      ],
    },
  ],
}

const openDropdown = ref(null)
const drawerOpen = ref(false)
const mobileOpenMenus = ref([])

const drawerHeader = ref(null)
const drawerFooter = ref(null)
const menuListHeight = ref('auto')

const updateMenuListHeight = () => {
  nextTick(() => {
    const headerH = drawerHeader.value?.offsetHeight || 0
    const footerH = drawerFooter.value?.offsetHeight || 0
    // Use 100dvh for viewport height (handles mobile browser bars)
    menuListHeight.value = `calc(100dvh - ${headerH + footerH}px)`
  })
}

const menuListStyle = computed(() => ({
  height: menuListHeight.value,
  overflowY: 'auto',
  flex: '1 1 auto',
  minHeight: 0,
}))

function openDrawer() {
  drawerOpen.value = true
  document.body.style.overflow = 'hidden'
  updateMenuListHeight()
}
function closeDrawer() {
  drawerOpen.value = false
  document.body.style.overflow = ''
}

function closeAll() {
  openDropdown.value = null
  closeDrawer()
}

function toggleDropdown(title) {
  openDropdown.value = openDropdown.value === title ? null : title
}

function toggleMobileMenu(title) {
  if (mobileOpenMenus.value.includes(title)) {
    mobileOpenMenus.value = mobileOpenMenus.value.filter(t => t !== title)
  } else {
    mobileOpenMenus.value.push(title)
  }
}

// Sticky on scroll up logic with smooth transition
const navbarVisible = ref(true)
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
let ticking = false

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 10) {
        navbarVisible.value = true
      } else if (currentScrollY < lastScrollY) {
        navbarVisible.value = true
      } else {
        navbarVisible.value = false
      }
      lastScrollY = currentScrollY
      ticking = false
    })
    ticking = true
  }
}

const navbarStyle = computed(() => {
  return {
    transform: navbarVisible.value ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform',
  }
})

// Close dropdown on outside click (desktop)
function handleClick(e) {
  if (
    !e.target.closest('.relative') &&
    !e.target.closest('.absolute') &&
    !e.target.closest('.shadow-lg')
  ) {
    openDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', updateMenuListHeight)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', updateMenuListHeight)
  document.body.style.overflow = ''
})
</script>