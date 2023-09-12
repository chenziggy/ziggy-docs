import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    breakpoints: {
      sm: '450px',
    },
  },
})
