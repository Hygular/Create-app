<template>
  <div class="is-flex flex-col min-h-screen text-body">
    <SiteHeader />
    <div class="container py-6 min-h-screen is-flex flex-col align-items-center justify-content-center text-center flex-1">
      <h1 class="font-black text-primary" style="font-size: 6rem; line-height: 1;">
        {{ error?.statusCode || 404 }}
      </h1>
      <h2 class="h2 font-bold mbe-3">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'An error occurred' }}
      </h2>
      <p class="text-large text-muted max-w-md mx-auto mbe-5">
        {{ error?.statusCode === 404 ? "We couldn't find the page you were looking for. It might have been moved or deleted." : (error?.message || 'Something went wrong.') }}
      </p>
      <button
        type="button"
        class="button is-primary is-large rounded-pill px-5"
        @click="handleClearError"
      >
        Return Home
      </button>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleClearError = () => clearError({ redirect: '/' })

useSeoMeta({
  title: 'Page Not Found',
  description: 'The requested page could not be found.'
})
</script>
