<script setup>
import AppInput from './components/global/AppInput.vue'
import AppButton from './components/global/AppButton.vue'
import { ref } from 'vue'

const day = ref('--')
const month = ref('--')
const year = ref('--')
const error = ref({})
const checkError = ref(false)
const userDays = ref('')
const userMonths = ref('')
const userYears = ref('')

const handleButtonClick = (value) => {
  error.value = value
  checkError.value = error.value?.error?.inputError ? true : false
  if (!checkError.value) {
    calculateAge()
  }
}

const calculateAge = () => {
  const date = new Date(`${month.value}/${day.value}/${year.value}`)
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()
  const birthYear = date.getFullYear()
  const birthMonth = date.getMonth() + 1
  const birthDay = date.getDate()

  userDays.value = currentDay - birthDay
  userMonths.value = currentMonth - birthMonth
  userYears.value = currentYear - birthYear

  if (userDays.value < 0) {
    userMonths.value--
    userDays.value = 30 + userDays.value
  }

  if (userMonths.value < 0) {
    userYears.value--
    userMonths.value = 12 + userMonths.value
  }
}
</script>

<template>
  <main
    class="flex h-screen w-screen items-center justify-center bg-off-white p-4 font-poppins"
  >
    <section
      class="relative flex h-[500px] w-full max-w-[840px] flex-col justify-center rounded-[22px_22px_100px_22px] bg-white p-6 shadow-2xl shadow-light-grey md:h-[664px] md:p-14"
    >
      <header class="flex items-center gap-4 md:gap-8">
        <AppInput v-model="day" label="Day" :error="error" />
        <AppInput v-model="month" label="Month" :error="error" />
        <AppInput v-model="year" label="Year" :error="error" />
      </header>
      <div class="flex h-32 w-full items-center justify-center md:h-24">
        <div role="presentation" class="h-[1px] w-full bg-light-grey"></div>
        <AppButton
          type="submit"
          class="absolute md:right-14"
          :day="day"
          :month="month"
          :year="year"
          @handle-click="handleButtonClick"
        >
          <img src="./assets/icon-arrow.svg" alt="arrow" class="w-7" />
        </AppButton>
      </div>
      <div
        class="space-y-2 text-[56px] font-extrabold italic leading-none text-primary md:text-8xl"
      >
        <p>
          <span v-if="checkError" class="text-secondary">--</span>
          <span v-else class="text-secondary">{{ userYears || '--' }}</span>
          years
        </p>
        <p>
          <span v-if="checkError" class="text-secondary">--</span>
          <span v-else class="text-secondary">{{ userMonths || '--' }}</span
          >months
        </p>
        <p>
          <span v-if="checkError" class="text-secondary">--</span>
          <span v-else class="text-secondary">{{ userDays || '--' }}</span
          >days
        </p>
      </div>
    </section>
  </main>
</template>
