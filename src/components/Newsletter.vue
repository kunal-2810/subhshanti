<template>
  <section class="w-full py-12 px-4 bg-white">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-2xl md:text-[32px] font-primary text-primary leading-snug font-bold mb-8">
        Stay Ahead with Wealth Insights
      </h2>
      <p class="text-lg text-gray-600 mb-10">
        Subscribe to receive actionable tips, financial wisdom, and investment ideas designed to grow with your goals.
      </p>
      <form
        class="flex flex-col md:flex-row items-center gap-6 md:gap-4"
        @submit.prevent="submitForm"
      >
        <input
          v-model="fullName"
          type="text"
          placeholder="Enter your full name"
          class="flex-1 bg-transparent border-0 border-b-2 border-primary text-gray-900 placeholder-gray-400 py-3 px-2 mb-2 md:mb-0 outline-none focus:outline-none focus:ring-0 focus:border-primary"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="flex-1 bg-transparent border-0 border-b-2 border-primary text-gray-900 placeholder-gray-400 py-3 px-2 mb-2 md:mb-0 outline-none focus:outline-none focus:ring-0 focus:border-primary"
        />
        <button
          type="submit"
          class="inline-block bg-primary text-white px-16 py-3 rounded-full hover-bg-secondary transition"
        >
          Submit
        </button>
      </form>
      <div v-if="successMessage" class="mt-6 text-green-500 font-medium">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mt-6 text-red-500 font-medium">
        {{ errorMessage }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fullName = ref('')
const email = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: fullName.value, email: email.value }),
    })
    if (response.ok) {
      successMessage.value = 'Thank you for subscribing!'
      fullName.value = ''
      email.value = ''
    } else {
      const data = await response.json().catch(() => ({}))
      errorMessage.value = data.message || 'Something went wrong. Please try again.'
    }
  } catch (error) {
    errorMessage.value = 'Network error. Please try again later.'
  }
}
</script>
