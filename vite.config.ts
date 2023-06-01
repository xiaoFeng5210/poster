import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          // 其他选项
          prefix: 'i-',
          extraProperties: {
            display: 'inline-block',
          },
        })],
    })],
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}/`,
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'composable': path.resolve(__dirname, 'src/composable'),
      'styles': path.resolve(__dirname, 'src/styles'),
    },
  },
})
