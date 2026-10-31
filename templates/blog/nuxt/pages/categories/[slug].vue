<template>
  <div class="py-6" style="padding-inline: 2.5rem;">
    <header class="mb-6 text-center max-w-3xl mx-auto border-bottom pbe-5">
      <span class="badge is-primary-outline is-pill mbe-2">Category</span>

      <h1 class="h1 font-black mbe-3 capitalize text-capitalize">
        {{ category.name }}
      </h1>

      <p class="text-large text-muted m-0">{{ category.description }}</p>
    </header>

    <div v-if="posts.length > 0" class="is-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <ArticleCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <div v-else class="text-center py-6 bg-slate-100 rounded-3 border">
      <p class="text-muted text-large m-0">
        No articles published in this category yet.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategoryBySlug, getPostsByCategory } from '~/lib/data'

const route = useRoute()
const slug = route.params.slug as string

const category = await getCategoryBySlug(slug)

if (!category) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category Not Found',
    fatal: true
  })
}

const posts = await getPostsByCategory(slug)

useSeoMeta({
  title: `${category.name} Articles - Hygular`,
  description: category.description
})
</script>
