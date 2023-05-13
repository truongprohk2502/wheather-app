<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emits = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="props.open"
        class="absolute left-0 top-0 flex h-screen w-full justify-center bg-black bg-opacity-30 px-8"
      >
        <Transition name="modal-inner">
          <div v-show="props.open" class="mt-32 max-w-screen-md self-start bg-white p-4">
            <slot />
            <button class="mt-8 bg-primary px-6 py-2 text-white" @click="emits('close')">
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active,
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from,
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
