<template>
  <footer class="bg-[#D9D9D9] pt-12 pb-6 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Top Footer -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <!-- Column 1 -->
        <div>
          <h3 class="text-lg font-medium mb-4 font-primary text-primary">Menu Title</h3>
          <ul class="space-y-2">
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
          </ul>
        </div>
        <!-- Column 2 -->
        <div>
          <h3 class="text-lg font-medium mb-4 font-primary text-primary">Menu Title</h3>
          <ul class="space-y-2">
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
          </ul>
        </div>
        <!-- Column 3 -->
        <div>
          <h3 class="text-lg font-medium mb-4 font-primary text-primary">Menu Title</h3>
          <ul class="space-y-2">
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
          </ul>
          <h3 class="text-lg font-medium mt-8 mb-4 font-primary text-primary">Menu Title</h3>
          <ul class="space-y-2">
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
            <li><a href="#">Menu Name</a></li>
          </ul>
        </div>
        <!-- Column 4 -->
        <div>
          <h3 class="text-lg font-medium mb-4 font-primary text-primary">Menu Title</h3>
          <ul class="space-y-2">
            <li><a href="tel:+911234567890" class="hover:underline">+91 12345 67890</a></li>
            <li><a href="tel:+919000000000" class="hover:underline">+91 90000 00000</a></li>
            <li><a href="mailto:info@subhshanti.com" class="hover:underline">info@subhshanti.com</a></li>
          </ul>
          <div class="flex space-x-4 mt-6">
            <!-- Social Icons (using simple SVGs for demo) -->
            <a href="#" aria-label="Facebook" class="text-gray-600 hover:text-primary">
              <img src="@/assets/icons/facebook.svg" alt="Facebook" class="w-8 h-8"/>
            </a>
            <a href="#" aria-label="Instagram" class="text-gray-600 hover:text-primary">
              <img src="@/assets/icons/instagram.svg" alt="Instagram" class="w-8 h-8"/>
            </a>
            <a href="#" aria-label="LinkedIn" class="text-gray-600 hover:text-primary">
              <img src="@/assets/icons/linkedin.svg" alt="LinkedIn" class="w-8 h-8"/>
            </a>
            <a href="#" aria-label="YouTube" class="text-gray-600 hover:text-primary">
              <img src="@/assets/icons/youtube.svg" alt="YouTube" class="w-8 h-8"/>
            </a>
          </div>
        </div>
      </div>
      <!-- Divider -->
      <div class="border-t border-gray-500 my-8"></div>
      <!-- Bottom Footer -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          © 2025 SubhShanti Wealth.
        </div>
        <div class="flex flex-wrap items-center gap-2 md:gap-2">
          <a href="#" class="hover:underline">Terms &amp; Conditions</a>
          <span class="text-primary">•</span>
          <a href="#" class="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No logic needed for static footer
</script>
