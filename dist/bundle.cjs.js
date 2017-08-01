'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var curry = require('lodash.curry');

function withErrorHandler(errorCallback, FallbackComponent, Component) {
  var WithErrorHandler = function (_React$Component) {
    _inherits(WithErrorHandler, _React$Component);

    function WithErrorHandler() {
      _classCallCheck(this, WithErrorHandler);

      var _this = _possibleConstructorReturn(this, (WithErrorHandler.__proto__ || Object.getPrototypeOf(WithErrorHandler)).call(this));

      _this.state = {
        hasError: false,
        error: null,
        errorInfo: null
      };
      return _this;
    }

    _createClass(WithErrorHandler, [{
      key: 'componentDidCatch',
      value: function componentDidCatch(error, info) {
        this.setState({ hasError: true, error: error, errorInfo: info });

        errorCallback(error, info, this.props);
      }
    }, {
      key: 'render',
      value: function render() {
        if (this.state.hasError) {
          var _state = this.state,
              error = _state.error,
              errorInfo = _state.errorInfo;

          return React.createElement(FallbackComponent, _extends({}, this.props, {
            error: error,
            errorInfo: errorInfo
          }));
        }

        return React.createElement(Component, this.props);
      }
    }]);

    return WithErrorHandler;
  }(React.Component);

  WithErrorHandler.displayName = 'withErrorHandler(' + Component.displayName + ')';
  return WithErrorHandler;
}

module.exports = curry(withErrorHandler);
//# sourceMappingURL=bundle.cjs.js.map
