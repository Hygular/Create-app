import { onMounted, onUnmounted, ref } from 'vue'
import { Hygular } from '@hygular/core'
import hygularConfig from '~/hygular.config.js'

export function useHygular() {
  const hygular = ref<any>(null)

  onMounted(() => {
    if (typeof window !== 'undefined') {
      hygular.value = new Hygular(hygularConfig)
    }
  })

  onUnmounted(() => {
    if (hygular.value && typeof hygular.value.dispose === 'function') {
      hygular.value.dispose()
      hygular.value = null
    }
  })

  return {
    hygular
  }
}
