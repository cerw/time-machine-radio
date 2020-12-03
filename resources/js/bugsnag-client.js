import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
console.log('bugsnag on')
const bugsnagClient = Bugsnag.start(
  {
    apiKey: process.env.MIX_BUGSNAG_API_KEY,
    releaseStage: process.env.MIX_APP_ENV,
    plugins: [new BugsnagPluginVue()],
    // notifyReleaseStages: process.env.MIX_BUGSNAG_NOTIFY_RELEASE_STAGES.split(','),
    consoleBreadcrumbsEnabled: true,
    autoCaptureSessions: true
    // logger: null
  }
)

export default bugsnagClient
