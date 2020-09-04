import Bugsnag from '@bugsnag/js'
let bugsnagClient = false
if (process.env.MIX_BUGSNAG_JS_ENABLE === 'true') {
  console.log('bugsnag on')
  bugsnagClient = Bugsnag(
    {
      apiKey: process.env.MIX_BUGSNAG_API_KEY,
      releaseStage: process.env.MIX_APP_ENV,
      notifyReleaseStages: process.env.MIX_BUGSNAG_NOTIFY_RELEASE_STAGES.split(','),
      consoleBreadcrumbsEnabled: false,
      autoCaptureSessions: false,
      logger: null
    }
  )
}
export default bugsnagClient
