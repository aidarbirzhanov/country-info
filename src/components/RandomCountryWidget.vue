<script setup lang="ts">
import * as axios from 'axios'
import { ref } from 'vue'

interface Props {
  country: {
    countryCode: string
    name: string
  }
}

const props = defineProps<Props>()

interface Holiday {
  date: string
  name: string
}

const holidays = ref<Holiday[] | null>(null)

const getNextHolidays = async () => {
  try {
    const response = await axios.default.get<Holiday[]>(
      `${import.meta.env.VITE_BASE_URL}/NextPublicHolidays/${props.country.countryCode}`
    )
    holidays.value = response.data
  } catch (e) {
    console.error(e)
  }
}

getNextHolidays()
</script>

<template>
  <RouterLink
    v-if="props.country"
    class="block bg-white border text-black p-4 mb-4 w-[300px]"
    :to="`/country/${props.country?.countryCode}`"
    :key="props.country?.countryCode"
  >
    {{ country.name }}
    <div v-if="holidays">
      <p>{{ holidays[0].name }}</p>
      <p>{{ holidays[0].date }}</p>
    </div>
  </RouterLink>
</template>
