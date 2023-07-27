<script setup>
import AppForm from './components/AppForm.vue'
import { ref } from 'vue'

const day = ref('--')
const month = ref('--')
const year = ref('--')
const error = ref('')
const userDays = ref('')
const userMonths = ref('')
const userYears = ref('')

const handleButtonClick = (value) => {
  day.value = value.day
  month.value = value.month
  year.value = value.year
  error.value = value.error
  if (!error.value) {
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
    class="flex min-h-screen w-full items-center justify-center bg-off-white p-4 font-poppins lg:p-0"
  >
    <section
      class="relative flex h-[500px] w-full max-w-[840px] flex-col justify-center rounded-[22px_22px_100px_22px] bg-white p-6 shadow-2xl shadow-light-grey md:h-[664px] md:p-14"
    >
      <AppForm @handle-click="handleButtonClick" />
      <div
        class="space-y-2 text-[52px] font-extrabold italic leading-none text-primary md:text-8xl"
      >
        <p>
          <span v-if="error" class="tracking-widest text-secondary">--</span>
          <span v-else class="tracking-widest text-secondary">{{
            userYears || '--'
          }}</span
          >years
        </p>
        <p>
          <span v-if="error" class="tracking-widest text-secondary">--</span>
          <span v-else class="tracking-widest text-secondary">{{
            userMonths || '--'
          }}</span
          >months
        </p>
        <p>
          <span v-if="error" class="tracking-widest text-secondary">--</span>
          <span v-else class="tracking-widest text-secondary">{{
            userDays || '--'
          }}</span
          >days
        </p>
      </div>
    </section>
  </main>
</template>
