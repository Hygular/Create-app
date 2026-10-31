<template>
  <section v-if="posts && posts.length" class="px-4 md:px-5 lg:px-6 pbe-6">
    <div class="container">
      <div class="is-flex flex-column md:flex-row justify-content-between gap-3 mbe-5">
        <div>
          <span class="text-tiny text-primary text-uppercase font-bold">Read next</span>
          <h2 class="h2 font-black mbe-2">Related articles</h2>
        </div>
        <NuxtLink to="/blog" class="button is-light rounded-pill align-self-start">
          All articles
        </NuxtLink>
      </div>

      <div class="is-grid grid-cols-1 md:grid-cols-3 gap-5">
        <ArticleCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/lib/data'

defineProps<{
  posts: Post[]
}>()
</script>
