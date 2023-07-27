<script setup>
import { ref, computed } from 'vue'

const day = ref('')
const month = ref('')
const year = ref('')
const error = ref({
  day: {
    empty: false,
    invalid: false
  },
  month: {
    empty: false,
    invalid: false
  },
  year: {
    empty: false,
    invalid: false
  },
  inputError: false
})

const emit = defineEmits(['handleClick'])

const labelClasses = computed(() => {
  return [
    'flex',
    'flex-col',
    'text-sm',
    'font-bold',
    'uppercase',
    'h-32',
    'w-[90px]',
    'md:w-[158px]'
  ]
})

const inputClasses = computed(() => {
  return [
    'mt-2',
    'h-[54px]',
    'w-full',
    'rounded-md',
    'border',
    'border-light-grey',
    'p-4',
    'text-xl',
    'text-primary',
    '[appearance:textfield]',
    'focus:border-transparent',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-secondary',
    'md:h-[70px]',
    'md:px-6',
    'md:py-2',
    'md:text-[32px]',
    '[&::-webkit-inner-spin-button]:appearance-none',
    '[&::-webkit-outer-spin-button]:appearance-none'
  ]
})

const handleClick = () => {
  if (day.value === '' || month.value === '' || year.value === '') {
    validateEmpty()
    error.value.inputError = true
    return
  }

  validateDate()

  emit('handleClick', {
    day: day.value,
    month: month.value,
    year: year.value,
    error: error.value.inputError
  })
}

const validateEmpty = () => {
  day.value === ''
    ? (error.value.day.empty = true)
    : (error.value.day.empty = false)

  month.value === ''
    ? (error.value.month.empty = true)
    : (error.value.month.empty = false)

  year.value === ''
    ? (error.value.year.empty = true)
    : (error.value.year.empty = false)
}

const validateDate = () => {
  const monthValue = parseInt(month.value, 10)
  const dayValue = parseInt(day.value, 10)
  const yearValue = parseInt(year.value, 10)
  const currentYear = new Date().getFullYear()

  // Check if the month is valid (0-indexed, so we need to subtract 1)
  if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
    error.value.month.invalid = true
    error.value.inputError = true
  } else {
    error.value.month.invalid = false
    error.value.inputError = false
  }

  // Check if the day is valid for the given month and year
  const isValidDay =
    dayValue > 0 && dayValue <= new Date(yearValue, monthValue, 0).getDate()
  if (isNaN(dayValue) || !isValidDay) {
    error.value.day.invalid = true
    error.value.inputError = true
  } else {
    error.value.day.invalid = false
    error.value.inputError = false
  }

  // Check if the year is valid (assuming it should not be in the future)
  if (isNaN(yearValue) || yearValue > currentYear) {
    error.value.year.invalid = true
    error.value.inputError = true
  } else {
    error.value.year.invalid = false
    error.value.inputError = false
  }
}
</script>

<template>
  <form>
    <div class="flex items-center gap-4 md:gap-8">
      <label
        for="day"
        :class="[
          labelClasses,
          error.day.empty || error.day.invalid
            ? '!text-red-500'
            : 'text-smokey-grey'
        ]"
      >
        <span class="tracking-widest">Day</span>
        <input
          v-model="day"
          type="number"
          :class="[
            inputClasses,
            error.day.empty || error.day.invalid
              ? 'border-red-500'
              : 'border-light-grey'
          ]"
          name="day"
          placeholder="DD"
        />
        <span
          v-if="error.day.empty"
          class="mt-2 text-xs font-normal normal-case italic text-red-500"
          >This field is required</span
        >
        <span
          v-if="error.day.invalid && !error.day.empty"
          class="mt-2 text-xs font-normal normal-case italic text-red-500"
          >Must be a valid day</span
        >
      </label>
      <label
        for="month"
        :class="[
          labelClasses,
          error.month.empty || error.month.invalid
            ? '!text-red-500'
            : 'text-smokey-grey'
        ]"
      >
        <span class="tracking-widest">Month</span>
        <input
          v-model="month"
          type="number"
          :class="[
            inputClasses,
            error.month.empty || error.month.invalid
              ? 'border-red-500'
              : 'border-light-grey'
          ]"
          name="month"
          placeholder="MM"
        />
        <span
          v-if="error.month.empty"
          class="mt-2 text-xs font-normal normal-case italic text-red-500"
          >This field is required</span
        >
        <span
          v-if="error.month.invalid && !error.month.empty"
          class="mt-2 text-xs font-normal normal-case italic text-red-500"
          >Must be a valid month</span
        >
      </label>
      <label
        for="year"
        :class="[
          labelClasses,
          error.year.empty || error.year.invalid
            ? '!text-red-500'
            : 'text-smokey-grey'
        ]"
      >
        <span class="tracking-widest">Year</span>
        <input
          v-model="year"
          type="number"
          :class="[
            inputClasses,
            error.year.empty || error.year.invalid
              ? 'border-red-500'
              : 'border-light-grey'
          ]"
          name="year"
          placeholder="YYYY"
        />
        <span
          v-if="error.year.empty"
          class="mt-2 text-xs font-normal normal-case italic text-red-500"
          >This field is required</span
        >
        <span
          v-if="error.year.invalid && !error.year.empty"
          class="mt-2 text-xs font-normal normal-case italic text-red-500"
          >Must be in the past</span
        >
      </label>
    </div>
    <div class="flex h-24 w-full items-center justify-center md:h-16">
      <div role="presentation" class="h-[1px] w-full bg-light-grey"></div>
      <button
        type="submit"
        class="durantion-200 absolute flex h-16 w-[66px] items-center justify-center rounded-full border-transparent bg-secondary transition-colors hover:bg-primary focus:outline-none focus:ring-transparent md:right-14"
        @click.prevent="handleClick"
        @keyup="handleClick"
      >
        <img
          src="../assets/icon-arrow.svg"
          alt="arrow"
          width="28"
          height="28"
        />
      </button>
    </div>
  </form>
</template>
