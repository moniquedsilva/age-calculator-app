<script setup>
defineProps({
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
  }
})
</script>
<template>
  <label :for="label" :class="classes" class="flex flex-col">
    <span>
      {{ label }}
    </span>
    <input
      type="number"
      :placeholder="placeholder"
      :class="inputClasses"
      class="w-max"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :pattern="pattern"
      :readonly="readonly"
    />
  </label>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
