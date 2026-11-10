<script setup lang="ts">
// O letreiro oficial do salão ("Jurerê" manuscrito + "Beauté" dourado), extraído do logo.
withDefaults(defineProps<{ eager?: boolean }>(), { eager: true })
</script>

<template>
  <img class="brand-logo" src="/brand/jurere-beaute-letreiro.webp" width="1585" height="332" alt="Jurerê Beauté" :loading="eager ? 'eager' : 'lazy'" decoding="async" />
</template>

<style scoped>
.brand-logo {
  width: auto;
  height: 1em;
}
</style>
