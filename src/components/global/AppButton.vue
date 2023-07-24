<script setup>
import { ref } from 'vue'
const emit = defineEmits(['handleClick'])

defineProps({
  type: {
    type: String,
    default: 'button'
  },
  classes: {
    type: Array,
    default: () => ['']
  },
  disabled: {
    type: Boolean,
    default: false
  },
  day: {
    type: [String, Number],
    default: '--'
  },
  month: {
    type: [String, Number],
    default: '--'
  },
  year: {
    type: [String, Number],
    default: '--'
  }
})

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
    invalid: false,
    fromFurure: false
  },
  inputError: false
})

const handleClick = (day, month, year) => {
  if (day === '--' || day === '') {
    error.value.day.empty = true
    error.value.inputError = true
  }

  if (month === '--' || month === '') {
    error.value.month.empty = true
    error.value.inputError = true
  }

  if (year === '--' || year === '') {
    error.value.year.empty = true
    error.value.inputError = true
  }

  validateDate(day, month, year)

  emit('handleClick', { error: error.value })
}

const validateDate = (day, month, year) => {
  const date = new Date(`${month}/${day}/${year}`)
  const currentYear = new Date().getFullYear()

  if (date.toString() === 'Invalid Date') {
    isNaN(date.getDate())
      ? (error.value.day.invalid = true)
      : (error.value.day.invalid = false)
    isNaN(date.getMonth())
      ? (error.value.month.invalid = true)
      : (error.value.month.invalid = false)
    isNaN(date.getFullYear())
      ? (error.value.year.invalid = true)
      : (error.value.year.invalid = false)

    year > currentYear
      ? (error.value.year.fromFurure = true)
      : (error.value.year.fromFurure = false)

    error.value.inputError = true
  }
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
    class="durantion-200 flex h-16 w-[66px] items-center justify-center rounded-full border-transparent bg-secondary transition-colors hover:bg-primary focus:outline-none focus:ring-transparent"
    @click="handleClick(day, month, year)"
  >
    <slot></slot>
  </button>
</template>
