<template>
  <header class="bg-white">
    <nav class="navbar border-bottom is-sticky z-sticky px-4 lg:px-6">
      <div class="navbar-start">
        <NuxtLink
          to="/"
          class="navbar-brand text-primary text-no-decoration font-bold text-large m-0"
        >
          HGPress<span class="text-slate-400">.</span>
        </NuxtLink>
      </div>

      <div class="navbar-center is-hidden md:is-flex ms-5">
        <ul class="nav expand gap-4">
          <li v-for="item in navItems" :key="item.href" class="nav-item">
            <NuxtLink
              :to="item.href"
              class="nav-link text-small font-medium text-muted hover:text-slate-900 text-uppercase"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <NuxtLink
          to="/blog"
          class="button is-primary is-small rounded-pill is-hidden sm:is-inline-flex"
        >
          Read the blog
        </NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-hygular-toggle="navbar"
          data-target="#blog-mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <div id="blog-mobile-menu" class="navbar-menu">
      <div class="p-4">
        <ul class="nav is-vertical gap-2">
          <li v-for="item in navItems" :key="item.href" class="nav-item">
            <NuxtLink
              :to="item.href"
              class="nav-link text-small font-medium text-slate-900 text-uppercase"
            >
              {{ item.label }}
            </NuxtLink>
          </li>

          <li class="nav-item mt-3">
            <NuxtLink
              to="/blog"
              class="button is-primary w-full rounded-pill"
            >
              Read the blog
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
</script>
