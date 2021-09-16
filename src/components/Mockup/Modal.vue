<template>
  <div class="modal" tabindex="0">
    <div class="modal-header">
      <div class="modal-header--title label">
        <span class="heading">{{ title }}</span>
      </div>

      <div class="modal-header--action">
        <IconExit class="icon" @click="$emit('state', false)" />
      </div>
    </div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IconExit from "virtual:vite-icons/mdi/close";

export default {
  name: "Modal",
  props: {
    title: String
  },
  components: {
    IconExit
  }
}
</script>

<style lang="scss">
.modal {
  width: 536px;
  background-color: var(--gradient-800);
}
</style>