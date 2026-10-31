<template>
  <footer class="bg-slate-900 text-white mbs-auto pt-6 pbe-4">
    <div class="container px-4">
      <div class="is-grid grid-cols-1 md:grid-cols-4 gap-4 mbe-5">
        <div class="md:col-span-2">
          <NuxtLink href="/" class="text-white text-no-decoration font-bold text-large mbe-3 is-inline-block">
            HGPress<span class="text-muted">.</span>
          </NuxtLink>
          <p class="text-slate-400 text-small max-w-md">
            A lightweight blog starter built with Hygular. Edit the mock data, customize the pages and publish.
          </p>
        </div>
        <div>
          <h3 class="h6 font-semibold mbe-3 text-uppercase text-muted">Links</h3>
          <ul class="list is-unstyled text-small">
            <li><NuxtLink to="/" class="link text-slate-300 hover:text-primary transition">Home</NuxtLink></li>
            <li><NuxtLink to="/blog" class="link text-slate-300 hover:text-primary transition">Articles</NuxtLink></li>
            <li><NuxtLink to="/categories" class="link text-slate-300 hover:text-primary transition">Categories</NuxtLink></li>
            <li><NuxtLink to="/about" class="link text-slate-300 hover:text-primary transition">About</NuxtLink></li>
            <li><NuxtLink to="/contact" class="link text-slate-300 hover:text-primary transition">Contact</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3 class="h6 font-semibold mbe-3 text-uppercase text-muted">Legal</h3>
          <ul class="list is-unstyled text-small">
            <li><NuxtLink to="/privacy" class="link text-slate-300 hover:text-primary transition">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="link text-slate-300 hover:text-primary transition">Terms of Service</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="border-top pbs-4">
        <p class="text-muted text-tiny text-uppercase font-bold m-0">&copy; {{ currentYear }} Hygular Starter.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
