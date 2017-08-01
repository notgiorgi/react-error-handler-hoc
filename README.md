# Error handler HOC for React 16

Error handler HOC gives you an ability to wrap your components with error handling logic which is most of the times repetitive

[Demo on codepen](https://codepen.io/notgiorgi/pen/pryOwg?editors=0010) (TO BE UPTATED)

# Installation

```sh
# using npm
$ npm install --save error-handler-hoc

# using yarn
$ yarn add error-handler-hoc
```


# Usage

```js
// ErrorReporter.js
import withErrorHandler from 'error-handler-hoc'
import myErrorReportingService from './services/ErrorReporting'

export const ErrorReporter = withErrorHandler(
    myErrorReportingService
)

// MyComponent.js
import { ErrorReporter } from './ErrorReporter'

class MyComponent extends React.Component {
     /* ... */
     render() {
         /* ... */
     }
}


const MyFallbackComponent = ({ error }) => (
    <div>
        <p>Something went wrong</p>
        {error.toString()}
    </div>
)

export default ErrorReporter(
    MyFallbackComponent,
    MyComponent
)
```

# API

### withErrorHandler
```js
function withErrorHandler(
    errorCallback: function,
    FallbackComponent: React.Component,
    Component: React.Component,
): React.Component
```

HOC takes 3 arguments, but it is also curried, so you can use it like this:

```js
withErrorHandler(errReporter)(Fallback, MyComponent)
// or
withErrorHandler(errReporter)(Fallback)(MyComponent)
```

and etc. See more about currying in lodash docs [here](https://lodash.com/docs/4.17.4#curry)

### errorCallback

```js
function errorCallback(
    error: Error,
    errorInfo: any,
    props: any,
)
```

`errorCallback` function is the first argument of the HOC and it gets called when the exception happens in render or lifecycle methods. It gets `error`, `errorInfo` and props that were passed to component as arguments.

### FallbackComponent

FallbackComponent is the second argument of the HOC and is rendered if the exception happens. Recieves same three arguments as props as `errorCallback` (`error`, `errorInfo` and `props`)

### Component

Which component to render.