<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title & One-liner -->
      <div class="text-center mb-10">
        <h1 class="text-2xl md:text-[32px] font-primary text-primary font-bold mb-4">You Don't Need a Wand to Be Rich</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Wealth isn't magic — it's a habit. Start early, stay consistent, and watch your money work for you.
        </p>
      </div>

      <!-- Panels: responsive grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <!-- LEFT PANEL -->
        <div class="bg-white">
          <h2 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">It’s Not About How Much You Earn. <br>It’s About How You Invest.</h2>
          <p class="text-gray-500 mb-6">
            A disciplined ₹5,000/month habit can unlock dreams that no salary hike can match. Here’s proof.
          </p>

          <!-- Age group -->
          <div class="mb-6 flex items-center justify-between">
            <label class="font-medium text-gray-700 mb-0">Age</label>
            <select
              v-model="selectedAgeKey"
              class="w-48 border-b border-gray-300 focus:border-purple-600 focus:ring-0 py-2"
              aria-label="Select age group"
            >
              <option v-for="(opt, key) in ageOptions" :key="key" :value="key">
                {{ opt.label }}
              </option>
            </select>
          </div>

          <!-- Monthly Investment -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-medium text-gray-700">Monthly Investment</label>
              <div class="flex items-center gap-2">
                <span class="text-lg text-purple">₹</span>
                <input
                  type="number"
                  v-model.number="monthly"
                  @input="onInputChange"
                  min="0"
                  class="w-28 border-b border-gray-300 focus:border-purple-600 focus:ring-0 py-1 text-right"
                  aria-label="Monthly investment amount"
                />
              </div>
            </div>
            <input
              type="range"
              :min="monthlyRange.min"
              :max="monthlyRange.max"
              :step="monthlyRange.step"
              v-model.number="monthly"
              @input="onInputChange"
              class="w-full accent-primary"
            />
            <!-- <div class="text-xs text-gray-400 mt-1">Change monthly investment using slider or input</div> -->
          </div>

          <!-- Expected Return -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-medium text-gray-700">Expected Return Rate (per annum)</label>
              <div class="flex items-center gap-2">
                <input
                  type="number"
                  v-model.number="rate"
                  @input="onInputChange"
                  min="7"
                  step="0.1"
                  class="w-24 border-b border-gray-300 focus:border-purple-600 focus:ring-0 py-1 text-right"
                  aria-label="Expected annual return rate"
                />
                <span class="text-lg text-purple">%</span>
              </div>
            </div>
            <input
              type="range"
              :min="rateRange.min"
              :max="rateRange.max"
              :step="rateRange.step"
              v-model.number="rate"
              @input="onInputChange"
              class="w-full accent-primary"
            />
            <!-- <div class="text-xs text-gray-400 mt-1">Typical SIP returns vary; use conservative estimate</div> -->
          </div>
        </div>

        <!-- RIGHT PANEL: Chart & loader -->
        <div class="bg-white p-4">
          <div class="relative min-h-[300px] flex items-center justify-center">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg z-10">
              <!-- Simple loader -->
              <svg class="animate-spin h-10 w-10 text-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>

            <canvas ref="chartRef" class="w-full"></canvas>
          </div>
        </div>
      </div>

      <!-- Summary row -->
      <div class="mt-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
          <div>
            <div class="text-sm text-medium text-gray-500">Invested Amount:</div>
            <div class="text-xl font-bold text-purple">₹{{ formatNumber(investedAmount) }}</div>
          </div>
          <div>
            <div class="text-sm text-medium text-gray-500">Estimated Return:</div>
            <div class="text-xl font-bold text-purple">₹{{ formatNumber(estimatedReturn) }}</div>
          </div>
          <div>
            <div class="text-sm text-medium text-gray-500">Total Value:</div>
            <div class="text-xl font-bold text-purple">₹{{ formatNumber(totalValue) }}</div>
          </div>
        </div>

        <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-6">Every habit you build today is a dream secured tomorrow. Stop wishing. Start planning.</p>

        <div class="mt-6 flex justify-center">
          <button class="bg-primary text-white px-16 py-3 rounded-full hover-bg-secondary transition">
            Start Your Wealth Habit Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
  SIP Calculator Vue 3 component (script setup)
  - Uses chart.js (install: npm i chart.js)
  - Tailwind handles layout
*/

import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

// --- Config / state ---
const ageOptions = {
  a: { label: '20 - 30 Y', years: 10 }, // 10-year horizon
  b: { label: '30 - 40 Y', years: 10 }, // 10-year horizon
  c: { label: '40 - 50 Y', years: 10 }, // 10-year horizon
  d: { label: '50 - 60 Y', years: 10 }, // 10-year horizon
  e: { label: '60 - 70 Y', years: 10 }, // 10-year horizon
  f: { label: '70 - 80 Y', years: 10 }, // 10-year horizon
}

const selectedAgeKey = ref('a')
const monthly = ref(5000)
const rate = ref(12) // percent per annum

// slider ranges
const monthlyRange = { min: 500, max: 100000, step: 500 }
const rateRange = { min: 7, max: 25, step: 0.1 }

// loading state when inputs change
const loading = ref(false)
let loadingTimer = null

// Chart ref
const chartRef = ref(null)
let chart = null

// Helper formatting
function formatNumber(num) {
  if (!num && num !== 0) return '0'
  return new Intl.NumberFormat('en-IN').format(Math.round(num))
}

// Calculation logic: monthly SIP future value for each year
function calculateSeries(monthlyContribution, annualRatePercent, years) {
  // monthly rate (decimal)
  const i = annualRatePercent / 100 / 12
  const monthsPerYear = 12
  const data = []
  const labels = []
  for (let y = 1; y <= years; y++) {
    const N = monthsPerYear * y
    // FV of series (contributions at period end):
    // FV = P * [ ( (1 + i)^N - 1 ) / i ]
    const fv = i === 0 ? monthlyContribution * N : monthlyContribution * (Math.pow(1 + i, N) - 1) / i
    data.push(Math.round(fv))
    labels.push(`${y} Y`)
  }
  // invested amount:
  const invested = monthlyContribution * 12 * years
  const totalValue = data[data.length - 1] || 0
  const estimatedReturn = totalValue - invested
  return { labels, data, invested, estimatedReturn, totalValue }
}

// Combined computed derived values
const computedYears = computed(() => ageOptions[selectedAgeKey.value].years)

const seriesResult = ref(calculateSeries(monthly.value, rate.value, computedYears.value))

const investedAmount = computed(() => seriesResult.value.invested)
const estimatedReturn = computed(() => seriesResult.value.estimatedReturn)
const totalValue = computed(() => seriesResult.value.totalValue)

// --- Chart handling ---
function createChart() {
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: seriesResult.value.labels,
      datasets: [
        {
          label: 'Value (₹)',
          data: seriesResult.value.data,
          borderColor: '#833375', // purple line
          backgroundColor: 'rgba(131,51,117,0.05)',
          tension: 0.25,
          pointRadius: 0,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: true, color: '#eee' },
          ticks: { color: '#666' },
        },
        y: {
          grid: { display: false },
          ticks: {
            callback: function (val) {
              // show compact values
              if (val >= 10000000) return '₹' + Math.round(val / 10000000) + 'Cr'
              if (val >= 100000) return '₹' + Math.round(val / 100000) + 'L'
              return '₹' + val
            },
            color: '#666',
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return '₹' + new Intl.NumberFormat('en-IN').format(context.parsed.y)
            },
          },
        },
      },
    },
  })
}

function updateChart() {
  if (!chart) {
    createChart()
    return
  }
  chart.data.labels = seriesResult.value.labels
  chart.data.datasets[0].data = seriesResult.value.data
  chart.update()
}

// --- Input change handler (shows loader, recalculates, updates chart) ---
function onInputChange() {
  // Show loader
  loading.value = true
  if (loadingTimer) clearTimeout(loadingTimer)
  // simulate computing time (e.g., network or heavy calc)
  loadingTimer = setTimeout(() => {
    // re-calc series
    seriesResult.value = calculateSeries(monthly.value, rate.value, computedYears.value)
    updateChart()
    loading.value = false
  }, 650) // 650ms loader
}

// watch age change to trigger recompute
watch(selectedAgeKey, () => onInputChange())

// initial mount
onMounted(() => {
  seriesResult.value = calculateSeries(monthly.value, rate.value, computedYears.value)
  // small delay to ensure canvas size
  setTimeout(() => {
    createChart()
  }, 120)
})

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
    chart = null
  }
  if (loadingTimer) clearTimeout(loadingTimer)
})
</script>

<style>
/* small style so canvas has a sensible height */
canvas {
  width: 100% !important;
  height: 320px !important;
}
</style>
