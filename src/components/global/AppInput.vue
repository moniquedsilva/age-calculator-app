<script setup>
defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  labelClasses: {
    type: Array,
    default: () => ['']
  },
  inputClasses: {
    type: Array,
    default: () => ['']
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  error: {
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <label
    :for="label"
    :class="labelClasses"
    class="flex flex-col text-sm font-bold uppercase text-smokey-grey"
  >
    <span class="tracking-widest">
      {{ label }}
    </span>
    <input
      type="number"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :pattern="pattern"
      :readonly="readonly"
      class="mt-2 h-[54px] w-[86px] rounded-md border border-light-grey p-4 text-xl [appearance:textfield] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary md:h-[70px] md:w-[158px] md:px-6 md:py-2 md:text-[32px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
