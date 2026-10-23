<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    openText?: string
    description?: string
    closeText?: string
  }>(),
  {
    openText: '打开全屏遮罩',
    description: 'fixed inset-0，覆盖整个视口。',
    closeText: '退出',
  },
)

const open = ref(false)

function close() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

function lockScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = ''
}

// Keep the page locked until the leave transition finishes.
watch(open, (value) => {
  if (value) lockScroll()
})

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  unlockScroll()
})
</script>

<template>
  <div class="mt-4">
    <button class="px-4 py-2 rounded bg-primary text-white text-sm" @click="open = true">
      {{ props.openText }}
    </button>
  </div>

  <Teleport to="body">
    <Transition name="overlay-demo" @after-leave="unlockScroll">
      <div v-if="open" class="overlay-full flex-center" @click.self="close">
        <div class="overlay-demo-panel w-[80%] max-w-sm rounded-xl bg-white p-6 text-center">
          <div class="text-lg font-semibold">overlay-full</div>
          <p class="mt-2 mb-4 text-sm text-gray-600">
            <code>fixed inset-0</code>{{ props.description }}
          </p>
          <button class="px-4 py-2 rounded bg-primary text-white text-sm" @click="close">
            {{ props.closeText }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.overlay-demo-enter-active,
.overlay-demo-leave-active {
  transition: opacity 200ms ease;
}

.overlay-demo-enter-active .overlay-demo-panel,
.overlay-demo-leave-active .overlay-demo-panel {
  transition:
    opacity 200ms ease,
    transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.overlay-demo-enter-from,
.overlay-demo-leave-to {
  opacity: 0;
}

.overlay-demo-enter-from .overlay-demo-panel,
.overlay-demo-leave-to .overlay-demo-panel {
  opacity: 0;
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .overlay-demo-enter-active,
  .overlay-demo-leave-active,
  .overlay-demo-enter-active .overlay-demo-panel,
  .overlay-demo-leave-active .overlay-demo-panel {
    transition: none;
  }
}
</style>
