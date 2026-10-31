<template>
  <div>
    <article class="py-6 px-4 md:px-5 lg:px-6">
      <div class="max-w-4xl mx-auto">
        <header class="text-center mbe-5">
          <NuxtLink
            :to="`/categories/${post.category.slug}`"
            class="badge is-primary-outline is-pill text-no-decoration mbe-3"
          >
            {{ post.category.name }}
          </NuxtLink>

          <h1 class="h1 font-black mbe-4 mx-auto max-w-3xl">{{ post.title }}</h1>
          <p class="text-large text-muted mbe-4 max-w-3xl mx-auto">{{ post.excerpt }}</p>

          <p class="text-small text-muted m-0">
            By <span class="font-semibold text-dark">{{ post.author.name }}</span> &middot;
            {{ formattedDate }} &middot; {{ post.readingTime }}
          </p>
        </header>

        <div class="ratio is-21x9 rounded-4 overflow-hidden shadow-medium bg-slate-100 mbe-6">
          <img
            :src="post.coverImage"
            :alt="post.title"
            class="object-fit-cover"
            referrerpolicy="no-referrer"
            style="position: absolute; inset: 0; width: 100%; height: 100%;"
          />
        </div>

        <div class="max-w-3xl mx-auto">
          <div class="text-base text-body leading-relaxed mbe-6" v-html="post.content" />

          <div class="border-top pbs-4">
            <h2 class="h6 font-semibold mbe-3">Tags</h2>
            <div class="is-flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="badge is-light text-dark font-medium is-pill"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>

    <RelatedArticles :posts="relatedPosts" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPostBySlug, getRelatedPosts } from '~/lib/data'

const route = useRoute()
const slug = route.params.slug as string

const post = await getPostBySlug(slug)

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post Not Found',
    fatal: true
  })
}

const relatedPosts = await getRelatedPosts(post.slug, 3)

const formattedDate = computed(() => {
  return new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})

useSeoMeta({
  title: post.seoTitle || post.title,
  description: post.seoDescription || post.excerpt,
  ogTitle: post.seoTitle || post.title,
  ogDescription: post.seoDescription || post.excerpt,
  ogImage: post.coverImage || undefined
})
</script>
