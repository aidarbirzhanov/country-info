<script setup lang="ts">
import { computed, ref } from 'vue'
import * as axios from 'axios'
import RandomCountryWidget from '@/components/RandomCountryWidget.vue'
import {Country} from '@/types.ts'

const searchInput = ref<string>('')
const countries = ref<Country[]>([])
const randomCountries = ref<Country[]>([])

const getCountries = async () => {
  try {
    const response = await axios.default.get(
      `${import.meta.env.VITE_BASE_URL}/AvailableCountries`
    )
    countries.value = response.data as Country[]
    generateRandomCountries()
  } catch (e) {
    console.error(e)
  }
}

const generateRandomCountries = () => {
  randomCountries.value = Array.from({ length: 3 }, () => {
    const randomIndex = Math.floor(Math.random() * countries.value.length)
    return countries.value[randomIndex]
  })
}

const filteredCountries = computed(() => {
  return countries.value.filter(country => {
    return country.name.toLowerCase().includes(searchInput.value.toLowerCase())
  })
})

getCountries()
</script>

<template>
  <section class="container mx-auto pt-10">
    <div class="flex">
      <div class="w-1/2">
        <div class="flex flex-col mb-10">
          <label class="w-max" for="country"> Search a country </label>
          <input
            id="country"
            placeholder="Search input"
            name="country"
            class="w-max py-2 px-4"
            v-model="searchInput"
            type="text"
          />
        </div>

        <div>
          <h2>Countries List</h2>

          <div
            v-if="filteredCountries.length"
            class="h-[500px] overflow-y-auto border w-max"
          >
            <RouterLink
              v-for="country of filteredCountries"
              class="block bg-white border text-black text-center p-4 mb-4 w-[300px]"
              :to="`/country/${country.countryCode}`"
              :key="country.countryCode"
            >
              {{ country.name }}
            </RouterLink>
          </div>

          <div v-else>
            <span class="text-red-500">No countries found</span>
          </div>
        </div>
      </div>

      <div v-if="randomCountries.length" class="w-1/2">
        <h2>Random Countries Widget</h2>

        <div class="flex flex-col">
          <RandomCountryWidget
            v-for="(country, index) of randomCountries"
            :country="country"
            :key="index"
          />
        </div>
      </div>
    </div>
  </section>
</template>