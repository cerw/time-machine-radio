const mix = require('laravel-mix');
const webpack = require('webpack')
const WorkboxPlugin = require('workbox-webpack-plugin');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
.webpackConfig({
    output: {
      publicPath: '' // must set public path when using laravel mix, otherwise it will cause issues with precache manifest -- see https://github.com/GoogleChrome/workbox/issues/1534
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        '@': __dirname + '/resources/js'
      },
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'eslint-loader',
          test: /\.(js|vue)?$/,
          options: {
            failOnError: false,
            fix: true
          }
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new WorkboxPlugin.InjectManifest({
        swSrc: "./resources/pwa/service-worker.js",
        swDest: "sw.js",
        // app shell
        // additionalManifestEntries: [
        //   {url: '/', revision: Date.now().toString()}
        // ],
        exclude: [
          /\.map$/,
          /manifest$/,
          /\.htaccess$/,
          /service-worker\.js$/,
          /sw\.js$/,
          /app\.js$/,
          /app\.css$/,
          /vendor\.js$/,
          /manifest\.js$/,
        ],
        maximumFileSizeToCacheInBytes: 50000000
      })
    ]
  })
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .extract()
    .options({
      extractVueStyles: true, // Extract .vue component styling to file, rather than inline.
      // globalVueStyles: file, // Variables file to be imported in every component.
      processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
      purifyCss: false, // Remove unused CSS selectors.
      // postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
      watchOptions: {
        ignored: /node_modules/
      },
      postCss: [require('autoprefixer')],
      terser: {
        sourceMap: true,
        extractComments: false,
        terserOptions: {
          warnings: true,
             compress: {
                drop_console: true,
            }
        }
      }
    })

if (mix.inProduction()) {
    mix.version()
}

if (process.env.APP_URL === 'https://timemachine.test') {
  let hosts = process.env.APP_URL.split('//')
  mix.options({
    hmrOptions: {
      host: hosts[1],
      port: '8080'
    }
  })
} else {
  mix.version()
}
