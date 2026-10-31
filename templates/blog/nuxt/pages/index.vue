<template>
  <main>
    <section class="py-6 px-4 md:px-5 lg:px-6 bg-slate-50 border-bottom">
      <div class="container">
        <div class="is-grid grid-cols-1 lg:grid-cols-2 gap-6 align-items-center">
          <div>
            <span class="badge is-primary is-pill mbe-3">Hygular Blog Starter</span>
            <h1 class="text-4xlarge font-black leading-tight mbe-4">
              A clean publishing starter for modern blogs.
            </h1>
            <p class="text-large text-muted mbe-4 max-w-2xl">
              Hygular Starter gives you a fast, responsive blog foundation with mock content, categories, article pages and SEO-ready metadata.
            </p>
            <div class="is-flex flex-wrap gap-3">
              <NuxtLink to="/blog" class="button is-primary rounded-pill">Browse articles</NuxtLink>
              <NuxtLink to="/about" class="button is-light rounded-pill">Learn more</NuxtLink>
            </div>
          </div>

          <ArticleCard v-if="heroPost" :post="heroPost" :featured="true" />
        </div>
      </div>
    </section>

    <section class="py-6 px-4 md:px-5 lg:px-6">
      <div class="container">
        <div class="is-flex flex-column md:flex-row justify-content-between gap-3 mbe-5">
          <div>
            <span class="text-tiny text-primary text-uppercase font-bold">Topics</span>
            <h2 class="h2 font-black mbe-2">Explore categories</h2>
            <p class="text-muted m-0">Simple category archives are included in the starter.</p>
          </div>
        </div>

        <div class="is-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/categories/${category.slug}`"
            class="is-block p-4 rounded-4 border bg-white text-no-decoration hover:bg-slate-50 transition-colors"
          >
            <h3 class="text-base font-bold text-slate-900 mbe-2">{{ category.name }}</h3>
            <p class="text-small text-muted m-0">{{ category.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-6 px-4 md:px-5 lg:px-6 bg-slate-50 border-top">
      <div class="container">
        <div class="is-flex flex-column md:flex-row justify-content-between gap-3 mbe-5">
          <div>
            <span class="text-tiny text-primary text-uppercase font-bold">Latest</span>
            <h2 class="h2 font-black mbe-2">Fresh articles</h2>
            <p class="text-muted m-0">Replace the mock posts with your own content and publish.</p>
          </div>
          <NuxtLink to="/blog" class="button is-light rounded-pill align-self-start">View all</NuxtLink>
        </div>

        <div class="is-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ArticleCard v-for="post in latestPosts" :key="post.id" :post="post" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getPosts, getFeaturedPosts, getCategories } from '~/lib/data'

const [posts, featuredPosts, categories] = await Promise.all([
  getPosts(),
  getFeaturedPosts(),
  getCategories()
])

const heroPost = featuredPosts[0] ?? posts[0]
const latestPosts = posts.filter((post) => post.slug !== heroPost?.slug).slice(0, 6)

useSeoMeta({
  title: 'Hygular Starter - A clean publishing starter for modern blogs',
  description: 'Hygular Starter gives you a fast, responsive blog foundation with mock content, categories, article pages and SEO-ready metadata.'
})
</script>
