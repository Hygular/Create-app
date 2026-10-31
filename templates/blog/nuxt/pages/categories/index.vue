<template>
  <div class="py-6 min-h-screen" style="padding-inline: 2.5rem;">
    <header class="mb-6 text-center max-w-2xl mx-auto">
      <h1 class="h1 font-black mb-3">Categories</h1>
      <p class="text-large text-muted mb-0">Find the topics you care about most.</p>
    </header>

    <div class="is-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/categories/${cat.slug}`"
        class="text-no-decoration"
      >
        <div class="bg-white border rounded-3 p-5 h-full transition-shadow duration-200 hover:shadow-medium hover:border-primary text-center is-flex flex-col align-items-center justify-content-center hover:translate-y-1">
          <h2 class="h3 font-bold text-dark mbe-2">{{ cat.name }}</h2>
          <p class="text-muted m-0">{{ cat.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategories } from '~/lib/data'

const categories = await getCategories()

useSeoMeta({
  title: 'Categories - Hygular',
  description: 'Browse articles by topic.'
})
</script>
