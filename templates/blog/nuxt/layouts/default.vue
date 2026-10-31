<template>
  <div class="is-flex flex-col min-h-screen text-body">
    <SiteHeader />
    <div class="flex-1">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { useHygular } from '~/composables/useHygular'

// Initialize Hygular
useHygular()
</script>
