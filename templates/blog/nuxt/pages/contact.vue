<template>
  <div class="container max-w-3xl py-6 min-h-screen">
    <header class="mbe-6 text-center border-bottom pbe-5">
      <h1 class="h1 font-black mbe-4">Contact Us</h1>
      <p class="text-large text-muted m-0">Have a question or want to write for us? Drop a message below.</p>
    </header>

    <form class="is-flex flex-col gap-4">
      <div class="is-grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="group m-0">
          <label for="name" class="form-label mbe-2">Name</label>
          <input type="text" id="name" class="form-input is-large" placeholder="Your name" required />
        </div>
        <div class="group m-0">
          <label for="email" class="form-label mbe-2">Email</label>
          <input type="email" id="email" class="form-input is-large" placeholder="your@email.com" required />
        </div>
      </div>
      <div class="group m-0">
        <label for="subject" class="form-label mbe-2">Subject</label>
        <input type="text" id="subject" class="form-input is-large" placeholder="How can we help?" required />
      </div>
      <div class="group m-0">
        <label for="message" class="form-label mbe-2">Message</label>
        <textarea id="message" class="form-textarea is-large" :rows="6" placeholder="Your message..." required></textarea>
      </div>
      <div class="mbs-3">
        <button type="submit" class="button is-primary is-large is-block font-semibold">
          Send Message
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contact Us - Hygular',
  description: 'Get in touch with the Hygular team.'
})
</script>
