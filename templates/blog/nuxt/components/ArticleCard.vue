<template>
  <!-- Featured card -->
  <article
    v-if="featured"
    class="is-relative is-block overflow-hidden rounded-4 bg-slate-900 h-full"
    style="min-height: 430px;"
  >
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="is-absolute inset-0"
      :aria-label="post.title"
      style="z-index: 4;"
    ></NuxtLink>

    <img
      v-if="hasCoverImage"
      :src="post.coverImage"
      :alt="post.title"
      class="object-fit-cover transition-transform hover:scale-105"
      referrerpolicy="no-referrer"
      style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0;"
    />
    <div
      v-else
      class="is-absolute inset-0 bg-slate-800"
      style="z-index: 0;"
      aria-hidden="true"
    ></div>

    <div
      class="is-absolute inset-0"
      style="background: linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.38), rgba(0,0,0,.08)); z-index: 2; pointer-events: none;"
    ></div>

    <div
      class="is-absolute bottom-0 w-full p-4 md:p-6 text-white"
      style="z-index: 3; pointer-events: none;"
    >
      <NuxtLink
        :to="`/categories/${post.category.slug}`"
        class="badge is-primary is-pill text-no-decoration mb-3"
        style="pointer-events: auto; position: relative; z-index: 5;"
      >
        {{ post.category.name }}
      </NuxtLink>

      <h1 class="h2 text-white font-black leading-tight mbe-3 max-w-4xl">
        {{ post.title }}
      </h1>

      <p class="text-large text-slate-200 line-clamp-2 mbe-4 max-w-3xl">
        {{ post.excerpt }}
      </p>

      <div class="is-flex align-items-center gap-3 text-slate-300 text-small">
        <span class="font-semibold text-white">{{ post.author.name }}</span>
        <span>&bull;</span>
        <span>{{ formattedDate }}</span>
        <span>&bull;</span>
        <span>{{ post.readingTime }}</span>
      </div>
    </div>
  </article>

  <!-- Regular card -->
  <article
    v-else
    class="is-flex flex-col gap-3 h-full bg-white border rounded-4 p-2"
  >
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="ratio is-16x9 is-block rounded-3 overflow-hidden bg-slate-100"
      :aria-label="post.title"
    >
      <img
        v-if="hasCoverImage"
        :src="post.coverImage"
        :alt="post.title"
        class="object-fit-cover transition-transform hover:scale-105"
        referrerpolicy="no-referrer"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      />
      <div
        v-else
        class="w-full h-full is-flex align-items-center justify-content-center bg-slate-100 text-slate-400 text-small"
        aria-hidden="true"
      >
        No image
      </div>
    </NuxtLink>

    <div class="p-2 is-flex flex-col flex-1">
      <NuxtLink
        :to="`/categories/${post.category.slug}`"
        class="text-tiny text-primary font-bold text-uppercase text-no-decoration mb-2"
      >
        {{ post.category.name }}
      </NuxtLink>

      <h3 class="text-base font-bold line-clamp-2 leading-tight mb-2">
        <NuxtLink
          :to="`/blog/${post.slug}`"
          class="text-dark text-no-decoration hover:text-primary transition-colors"
        >
          {{ post.title }}
        </NuxtLink>
      </h3>

      <p class="text-small text-muted line-clamp-2 mbe-3">
        {{ post.excerpt }}
      </p>

      <div class="is-flex justify-content-between align-items-center mbs-auto text-tiny text-muted">
        <span class="font-medium">{{ post.author.name }}</span>
        <span>{{ post.readingTime }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '~/lib/data'

const props = withDefaults(
  defineProps<{
    post: Post
    featured?: boolean
  }>(),
  {
    featured: false
  }
)

const hasCoverImage = computed(() => Boolean(props.post.coverImage))

const formattedDate = computed(() => {
  return new Date(props.post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})
</script>
