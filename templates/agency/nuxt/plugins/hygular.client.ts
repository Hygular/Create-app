import { Hygular, DarkMode } from '@hygular/core'

export default defineNuxtPlugin((nuxtApp) => {
  let hgInstance: Hygular | null = null
  let darkModeInstance: DarkMode | null = null

  if (import.meta.client) {
    hgInstance = new Hygular()
    darkModeInstance = new DarkMode()

    nuxtApp.hook('page:finish', () => {
      const toggler = document.querySelector('[fa-toggle="navbar"].is-active')
      if (toggler) {
        (toggler as HTMLElement).click()
      }
    })
  }

  return {
    provide: {
      hygular: hgInstance,
      darkMode: darkModeInstance,
    },
  }
})
