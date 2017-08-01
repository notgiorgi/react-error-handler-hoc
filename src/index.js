const React = require('react')
const curry = require('lodash.curry')

function withErrorHandler (errorCallback, FallbackComponent, Component) {
  class WithErrorHandler extends React.Component {
    constructor () {
      super()

      this.state = {
        hasError: false,
        error: null,
        errorInfo: null
      }
    }

    componentDidCatch (error, info) {
      this.setState({ hasError: true, error, errorInfo: info })

      errorCallback(error, info, this.props)
    }

    render () {
      if (this.state.hasError) {
        const { error, errorInfo } = this.state
        return (
          <FallbackComponent
            {...this.props}
            error={error}
            errorInfo={errorInfo}
          />
        )
      }

      return <Component {...this.props} />
    }
  }
  WithErrorHandler.displayName = `withErrorHandler(${Component.displayName})`
  return WithErrorHandler
}

module.exports = curry(withErrorHandler)
