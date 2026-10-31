<template>
  <div class="container max-w-3xl py-6 min-h-screen px-4">
    <header class="mbe-6 text-center border-bottom pbe-5">
      <h1 class="h1 font-black mbe-4">About Hygular Starter</h1>
      <p class="text-large text-muted m-0">A lightweight blog foundation for creators, developers and small editorial websites.</p>
    </header>

    <section class="text-base text-body leading-relaxed">
      <h2 class="h3 font-bold mbs-5 mbe-3">Built for simple publishing</h2>
      <p>
        This starter keeps the essentials: a homepage, article index, category archives, single article pages, static content pages and mock data you can edit immediately.
      </p>

      <h2 class="h3 font-bold mbs-5 mbe-3">Upgrade path</h2>
      <p>
        Use this version for a clean free starter. Keep CMS adapters, advanced search, newsletter flows, author archives and premium editorial sections for the Pro version.
      </p>

      <div class="bg-slate-100 border rounded-4 p-5 mbs-6 text-center">
        <h3 class="h4 font-bold mbe-3">Start writing</h3>
        <p class="text-muted mbe-4">Edit the mock posts in <code>lib/data.ts</code> and publish your blog.</p>
        <NuxtLink to="/blog" class="button is-primary rounded-pill px-5">View articles</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description: 'Learn more about Hygular Starter.'
})
</script>
