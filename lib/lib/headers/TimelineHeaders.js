'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HeadersContext = require('./HeadersContext');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SidebarHeader = require('./SidebarHeader');

var _SidebarHeader2 = _interopRequireDefault(_SidebarHeader);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineHeaders = function (_React$Component) {
  _inherits(TimelineHeaders, _React$Component);

  function TimelineHeaders(props) {
    _classCallCheck(this, TimelineHeaders);

    var _this = _possibleConstructorReturn(this, (TimelineHeaders.__proto__ || Object.getPrototypeOf(TimelineHeaders)).call(this, props));

    _this.getRootStyle = function () {
      return _extends({}, _this.props.style, {
        display: 'flex',
        width: '100%'
      });
    };

    _this.getCalendarHeaderStyle = function () {
      var _this$props = _this.props,
          leftSidebarWidth = _this$props.leftSidebarWidth,
          rightSidebarWidth = _this$props.rightSidebarWidth,
          calendarHeaderStyle = _this$props.calendarHeaderStyle;

      return _extends({}, calendarHeaderStyle, {
        overflow: 'hidden',
        width: 'calc(100% - ' + (leftSidebarWidth + rightSidebarWidth) + 'px)'
      });
    };

    _this.handleRootRef = function (element) {
      if (_this.props.headerRef) {
        _this.props.headerRef(element);
      }
    };

    return _this;
  }

  _createClass(TimelineHeaders, [{
    key: 'render',
    value: function render() {
      var rightSidebarHeader = void 0;
      var leftSidebarHeader = void 0;
      var calendarHeaders = [];
      var children = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];
      _react2.default.Children.map(children, function (child) {
        if (child.type === _SidebarHeader2.default) {
          if (child.props.variant === _constants.RIGHT_VARIANT) {
            rightSidebarHeader = child;
          } else {
            leftSidebarHeader = child;
          }
        } else {
          calendarHeaders.push(child);
        }
      });
      if (!leftSidebarHeader) {
        leftSidebarHeader = _react2.default.createElement(_SidebarHeader2.default, null);
      }
      if (!rightSidebarHeader && this.props.rightSidebarWidth) {
        rightSidebarHeader = _react2.default.createElement(_SidebarHeader2.default, { variant: 'right' });
      }
      return _react2.default.createElement(
        'div',
        {
          ref: this.handleRootRef,

          style: this.getRootStyle(),
          className: 'rct-header-root ' + this.props.className
        },
        leftSidebarHeader,
        _react2.default.createElement(
          'div',
          {
            ref: this.props.registerScroll,
            style: this.getCalendarHeaderStyle(),
            className: 'rct-calendar-header ' + this.props.calendarHeaderClassName
          },
          calendarHeaders
        ),
        rightSidebarHeader
      );
    }
  }]);

  return TimelineHeaders;
}(_react2.default.Component);

TimelineHeaders.propTypes = {
  registerScroll: _propTypes2.default.func.isRequired,
  leftSidebarWidth: _propTypes2.default.number.isRequired,
  rightSidebarWidth: _propTypes2.default.number.isRequired,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  calendarHeaderStyle: _propTypes2.default.object,
  calendarHeaderClassName: _propTypes2.default.string,
  headerRef: _propTypes2.default.func
};


var TimelineHeadersWrapper = function TimelineHeadersWrapper(_ref) {
  var children = _ref.children,
      style = _ref.style,
      className = _ref.className,
      calendarHeaderStyle = _ref.calendarHeaderStyle,
      calendarHeaderClassName = _ref.calendarHeaderClassName;
  return _react2.default.createElement(
    _HeadersContext.TimelineHeadersConsumer,
    null,
    function (_ref2) {
      var leftSidebarWidth = _ref2.leftSidebarWidth,
          rightSidebarWidth = _ref2.rightSidebarWidth,
          registerScroll = _ref2.registerScroll;

      return _react2.default.createElement(TimelineHeaders, {
        leftSidebarWidth: leftSidebarWidth,
        rightSidebarWidth: rightSidebarWidth,
        registerScroll: registerScroll,
        children: children,
        style: style,
        className: className,
        calendarHeaderStyle: calendarHeaderStyle,
        calendarHeaderClassName: calendarHeaderClassName
      });
    }
  );
};

TimelineHeadersWrapper.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  calendarHeaderStyle: _propTypes2.default.object,
  calendarHeaderClassName: _propTypes2.default.string,
  headerRef: _propTypes2.default.func
};

exports.default = TimelineHeadersWrapper;