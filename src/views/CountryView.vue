<script setup lang="ts">
import { useRoute } from 'vue-router'
import * as axios from 'axios'
import { ref } from 'vue'
import {Country, Holiday} from '@/types.ts'

const route = useRoute()

const currentYear = new Date().getFullYear()

const country = ref<Country | null>(null)
const holidays = ref<Holiday[]>([])
const selectedYear = ref<number>(currentYear)
const pending = ref()

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

const getCountryInfo = async () => {
  try {
    const response = await axios.default.get(
      `${import.meta.env.VITE_BASE_URL}/CountryInfo/${route.params.id}`
    )
    country.value = response.data
  } catch (e) {
    console.error(e)
  }
}

const getCountryHolidays = async (year: number) => {
  pending.value = true
  try {
    const response = await axios.default.get(
      `${import.meta.env.VITE_BASE_URL}/PublicHolidays/${year}/${route.params.id}`
    )
    holidays.value = response.data as Holiday[]
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}

getCountryInfo()
getCountryHolidays(selectedYear.value)
</script>

<template>
  <section class="container mx-auto pt-10">
    <p>
      {{ country ? country.officialName : 'Loading...' }}
    </p>

    <div>
      <div v-if="holidays.length" class="h-[600px] overflow-y-auto w-max mb-10">
        <div
          v-for="(holiday, index) of holidays"
          :key="index"
          class="block bg-white border text-black p-4 mb-4 w-[300px]"
        >
          <p>{{ holiday.name }}</p>
          <p>
            <span v-if="holiday.date && !pending">{{ holiday.date }}</span>
            <span v-else>Loading...</span>
          </p>
        </div>
      </div>
      <span v-else>Loading...</span>
    </div>

    <div v-for="year in years" :key="year" class="inline-block mx-2">
      <button
        @click="
          () => {
            getCountryHolidays(year)
            selectedYear = year
          }
        "
        :class="{
          'bg-blue-500 text-white': selectedYear === year,
          'bg-gray-200': selectedYear !== year
        }"
        class="px-4 py-2 border rounded text-black"
      >
        {{ year }}
      </button>
    </div>
  </section>
</template>