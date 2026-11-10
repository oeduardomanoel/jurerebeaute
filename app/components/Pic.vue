<script setup lang="ts">
import images from '#shared/data/images.json'

const props = withDefaults(
  defineProps<{
    name: string
    alt: string
    sizes?: string
    eager?: boolean
    ratio?: string
  }>(),
  { sizes: '(min-width: 1024px) 40vw, 90vw', eager: false },
)

type Meta = { w: number; h: number; sizes: number[]; color: string }
const meta = computed<Meta | undefined>(() => (images as Record<string, Meta>)[props.name])
const largest = computed(() => meta.value?.sizes.at(-1) ?? 1080)
const src = computed(() => `/images/${props.name}-${largest.value}.webp`)
const srcset = computed(() => meta.value?.sizes.map((s) => `/images/${props.name}-${s}.webp ${s}w`).join(', '))
</script>

<template>
  <img
    :src="src"
    :srcset="srcset"
    :sizes="sizes"
    :width="meta?.w"
    :height="meta?.h"
    :alt="alt"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
    :style="{ backgroundColor: meta?.color, aspectRatio: ratio }"
  />
</template>
