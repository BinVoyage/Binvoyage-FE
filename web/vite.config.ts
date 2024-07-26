import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'

interface types {
  mode:string;
}

export default ({ mode }:types) => {  
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoMapId: env.VITE_KAKAOMAP_KEY,
          }
        }
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: "http://3.37.135.150:8000",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
}