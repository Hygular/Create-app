<template>
  <main class="py-6 px-4 md:px-5 lg:px-6">
    <div class="container">
      <header class="mbe-6 text-center max-w-3xl mx-auto">
        <h1 class="h1 font-black mbe-3">All articles</h1>
        <p class="text-large text-muted mbe-0">Browse insights, tutorials and practical publishing notes.</p>
      </header>

      <div class="is-flex justify-content-center mbe-6">
        <nav class="nav is-pill overflow-x-auto pbe-2" aria-label="Article categories">
          <div class="nav-item is-active">
            <NuxtLink to="/blog" class="nav-link">All</NuxtLink>
          </div>
          <div v-for="category in categories" :key="category.id" class="nav-item">
            <NuxtLink :to="`/categories/${category.slug}`" class="nav-link">{{ category.name }}</NuxtLink>
          </div>
        </nav>
      </div>

      <div class="is-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ArticleCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getPosts, getCategories } from '~/lib/data'

const [posts, categories] = await Promise.all([
  getPosts(),
  getCategories()
])

useSeoMeta({
  title: 'Articles',
  description: 'Browse all articles from Hygular Starter.'
})
</script>
