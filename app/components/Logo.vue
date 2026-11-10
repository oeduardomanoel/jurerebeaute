<script setup lang="ts">
defineProps<{ stacked?: boolean }>()
</script>

<template>
  <span class="logo" :class="{ stacked }">
    <Monogram class="logo-mark" />
    <span class="logo-word">
      <span class="logo-jurere">Jurerê</span>
      <span class="logo-rule" aria-hidden="true"><i /></span>
      <span class="logo-beaute">Beauté</span>
    </span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: var(--gold);
  line-height: 1;
}

.logo-mark {
  font-size: 40px;
  transition: transform 0.8s var(--ease);
}

.logo:hover .logo-mark {
  transform: rotate(-4deg) scale(1.04);
}

.logo-word {
  display: grid;
  justify-items: center;
  gap: 4px;
}

.logo-jurere {
  font-family: var(--f-caps);
  font-size: 19px;
  letter-spacing: 0.3em;
  margin-right: -0.3em;
  text-transform: uppercase;
}

.logo-rule {
  position: relative;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, currentColor 20%, currentColor 80%, transparent);
  opacity: 0.8;
}

.logo-rule i {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  transform: translate(-50%, -50%);
}

.logo-beaute {
  font-family: var(--f-body);
  font-size: 8.5px;
  font-weight: 400;
  letter-spacing: 0.55em;
  margin-right: -0.55em;
  text-transform: uppercase;
}

.stacked {
  flex-direction: column;
  gap: 18px;
}

.stacked .logo-mark {
  font-size: 84px;
}

.stacked .logo-jurere {
  font-size: 30px;
}

.stacked .logo-beaute {
  font-size: 12px;
}
</style>
