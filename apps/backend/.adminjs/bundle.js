(function (React, adminjs, designSystem) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const ImportComponent = ({
      resource
    }) => {
      const [file, setFile] = React.useState(null);
      const sendNotice = adminjs.useNotice();
      const [isFetching, setFetching] = React.useState();
      const onUpload = uploadedFile => {
        setFile(uploadedFile?.[0] ?? null);
      };
      const onSubmit = async () => {
        if (!file) {
          return;
        }
        setFetching(true);
        try {
          const importData = new FormData();
          importData.append('file', file, file?.name);
          await new adminjs.ApiClient().resourceAction({
            method: 'post',
            resourceId: resource.id,
            actionName: 'import',
            data: importData
          });
          sendNotice({
            message: 'Imported successfully',
            type: 'success'
          });
        } catch (e) {
          sendNotice({
            message: e.message,
            type: 'error'
          });
        }
        setFetching(false);
      };
      if (isFetching) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null);
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        margin: "auto",
        maxWidth: 600,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.DropZone, {
        files: [],
        onChange: onUpload,
        multiple: false
      }), file && /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
        file: file,
        filename: file.name,
        onRemove: () => setFile(null)
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "center",
        m: 10
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        onClick: onSubmit,
        disabled: !file || isFetching
      }, "Upload")));
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var FileSaver_min = {exports: {}};

    (function (module, exports) {
      (function (a, b) {
        b();
      })(commonjsGlobal, function () {

        function b(a, b) {
          return "undefined" == typeof b ? b = {
            autoBom: !1
          } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
            autoBom: !b
          }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
            type: a.type
          }) : a;
        }
        function c(a, b, c) {
          var d = new XMLHttpRequest();
          d.open("GET", a), d.responseType = "blob", d.onload = function () {
            g(d.response, b, c);
          }, d.onerror = function () {
            console.error("could not download file");
          }, d.send();
        }
        function d(a) {
          var b = new XMLHttpRequest();
          b.open("HEAD", a, !1);
          try {
            b.send();
          } catch (a) {}
          return 200 <= b.status && 299 >= b.status;
        }
        function e(a) {
          try {
            a.dispatchEvent(new MouseEvent("click"));
          } catch (c) {
            var b = document.createEvent("MouseEvents");
            b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
          }
        }
        var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0,
          a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
          g = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) {
            var i = f.URL || f.webkitURL,
              j = document.createElement("a");
            g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
              i.revokeObjectURL(j.href);
            }, 4E4), setTimeout(function () {
              e(j);
            }, 0));
          } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
            if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
              var i = document.createElement("a");
              i.href = f, i.target = "_blank", setTimeout(function () {
                e(i);
              });
            }
          } : function (b, d, e, g) {
            if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
            var h = "application/octet-stream" === b.type,
              i = /constructor/i.test(f.HTMLElement) || f.safari,
              j = /CriOS\/[\d]+/.test(navigator.userAgent);
            if ((j || h && i || a) && "undefined" != typeof FileReader) {
              var k = new FileReader();
              k.onloadend = function () {
                var a = k.result;
                a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
              }, k.readAsDataURL(b);
            } else {
              var l = f.URL || f.webkitURL,
                m = l.createObjectURL(b);
              g ? g.location = m : location.href = m, g = null, setTimeout(function () {
                l.revokeObjectURL(m);
              }, 4E4);
            }
          });
        f.saveAs = g.saveAs = g, (module.exports = g);
      });
    })(FileSaver_min);
    var FileSaver_minExports = FileSaver_min.exports;

    function _typeof(o) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
        return typeof o;
      } : function (o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
      }, _typeof(o);
    }

    function requiredArgs(required, args) {
      if (args.length < required) {
        throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
      }
    }

    /**
     * @name isDate
     * @category Common Helpers
     * @summary Is the given value a date?
     *
     * @description
     * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
     *
     * @param {*} value - the value to check
     * @returns {boolean} true if the given value is a date
     * @throws {TypeError} 1 arguments required
     *
     * @example
     * // For a valid date:
     * const result = isDate(new Date())
     * //=> true
     *
     * @example
     * // For an invalid date:
     * const result = isDate(new Date(NaN))
     * //=> true
     *
     * @example
     * // For some value:
     * const result = isDate('2014-02-31')
     * //=> false
     *
     * @example
     * // For an object:
     * const result = isDate({})
     * //=> false
     */
    function isDate(value) {
      requiredArgs(1, arguments);
      return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
    }

    /**
     * @name toDate
     * @category Common Helpers
     * @summary Convert the given argument to an instance of Date.
     *
     * @description
     * Convert the given argument to an instance of Date.
     *
     * If the argument is an instance of Date, the function returns its clone.
     *
     * If the argument is a number, it is treated as a timestamp.
     *
     * If the argument is none of the above, the function returns Invalid Date.
     *
     * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
     *
     * @param {Date|Number} argument - the value to convert
     * @returns {Date} the parsed date in the local time zone
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Clone the date:
     * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
     * //=> Tue Feb 11 2014 11:30:30
     *
     * @example
     * // Convert the timestamp to date:
     * const result = toDate(1392098430000)
     * //=> Tue Feb 11 2014 11:30:30
     */
    function toDate(argument) {
      requiredArgs(1, arguments);
      var argStr = Object.prototype.toString.call(argument);

      // Clone the date
      if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
      } else if (typeof argument === 'number' || argStr === '[object Number]') {
        return new Date(argument);
      } else {
        if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
          // eslint-disable-next-line no-console
          console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
          // eslint-disable-next-line no-console
          console.warn(new Error().stack);
        }
        return new Date(NaN);
      }
    }

    /**
     * @name isValid
     * @category Common Helpers
     * @summary Is the given date valid?
     *
     * @description
     * Returns false if argument is Invalid Date and true otherwise.
     * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
     * Invalid Date is a Date, whose time value is NaN.
     *
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * @param {*} date - the date to check
     * @returns {Boolean} the date is valid
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // For the valid date:
     * const result = isValid(new Date(2014, 1, 31))
     * //=> true
     *
     * @example
     * // For the value, convertable into a date:
     * const result = isValid(1393804800000)
     * //=> true
     *
     * @example
     * // For the invalid date:
     * const result = isValid(new Date(''))
     * //=> false
     */
    function isValid(dirtyDate) {
      requiredArgs(1, arguments);
      if (!isDate(dirtyDate) && typeof dirtyDate !== 'number') {
        return false;
      }
      var date = toDate(dirtyDate);
      return !isNaN(Number(date));
    }

    function toInteger(dirtyNumber) {
      if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
        return NaN;
      }
      var number = Number(dirtyNumber);
      if (isNaN(number)) {
        return number;
      }
      return number < 0 ? Math.ceil(number) : Math.floor(number);
    }

    /**
     * @name addMilliseconds
     * @category Millisecond Helpers
     * @summary Add the specified number of milliseconds to the given date.
     *
     * @description
     * Add the specified number of milliseconds to the given date.
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
     * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:30.750
     */
    function addMilliseconds(dirtyDate, dirtyAmount) {
      requiredArgs(2, arguments);
      var timestamp = toDate(dirtyDate).getTime();
      var amount = toInteger(dirtyAmount);
      return new Date(timestamp + amount);
    }

    /**
     * @name subMilliseconds
     * @category Millisecond Helpers
     * @summary Subtract the specified number of milliseconds from the given date.
     *
     * @description
     * Subtract the specified number of milliseconds from the given date.
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
     * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:29.250
     */
    function subMilliseconds(dirtyDate, dirtyAmount) {
      requiredArgs(2, arguments);
      var amount = toInteger(dirtyAmount);
      return addMilliseconds(dirtyDate, -amount);
    }

    var MILLISECONDS_IN_DAY = 86400000;
    function getUTCDayOfYear(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var timestamp = date.getTime();
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
      var startOfYearTimestamp = date.getTime();
      var difference = timestamp - startOfYearTimestamp;
      return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
    }

    function startOfUTCISOWeek(dirtyDate) {
      requiredArgs(1, arguments);
      var weekStartsOn = 1;
      var date = toDate(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    function getUTCISOWeekYear(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var year = date.getUTCFullYear();
      var fourthOfJanuaryOfNextYear = new Date(0);
      fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
      var fourthOfJanuaryOfThisYear = new Date(0);
      fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    function startOfUTCISOWeekYear(dirtyDate) {
      requiredArgs(1, arguments);
      var year = getUTCISOWeekYear(dirtyDate);
      var fourthOfJanuary = new Date(0);
      fourthOfJanuary.setUTCFullYear(year, 0, 4);
      fourthOfJanuary.setUTCHours(0, 0, 0, 0);
      var date = startOfUTCISOWeek(fourthOfJanuary);
      return date;
    }

    var MILLISECONDS_IN_WEEK$1 = 604800000;
    function getUTCISOWeek(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();

      // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)
      return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
    }

    var defaultOptions = {};
    function getDefaultOptions() {
      return defaultOptions;
    }

    function startOfUTCWeek(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
      requiredArgs(1, arguments);
      var defaultOptions = getDefaultOptions();
      var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

      // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
      }
      var date = toDate(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    function getUTCWeekYear(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var year = date.getUTCFullYear();
      var defaultOptions = getDefaultOptions();
      var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

      // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
      }
      var firstWeekOfNextYear = new Date(0);
      firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
      var firstWeekOfThisYear = new Date(0);
      firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    function startOfUTCWeekYear(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
      requiredArgs(1, arguments);
      var defaultOptions = getDefaultOptions();
      var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
      var year = getUTCWeekYear(dirtyDate, options);
      var firstWeek = new Date(0);
      firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setUTCHours(0, 0, 0, 0);
      var date = startOfUTCWeek(firstWeek, options);
      return date;
    }

    var MILLISECONDS_IN_WEEK = 604800000;
    function getUTCWeek(dirtyDate, options) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();

      // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)
      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }

    function addLeadingZeros(number, targetLength) {
      var sign = number < 0 ? '-' : '';
      var output = Math.abs(number).toString();
      while (output.length < targetLength) {
        output = '0' + output;
      }
      return sign + output;
    }

    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* |                                |
     * |  d  | Day of month                   |  D  |                                |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  m  | Minute                         |  M  | Month                          |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  y  | Year (abs)                     |  Y  |                                |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     */
    var formatters$2 = {
      // Year
      y: function y(date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

        var signedYear = date.getUTCFullYear();
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
      },
      // Month
      M: function M(date, token) {
        var month = date.getUTCMonth();
        return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
      },
      // Day of the month
      d: function d(date, token) {
        return addLeadingZeros(date.getUTCDate(), token.length);
      },
      // AM or PM
      a: function a(date, token) {
        var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
        switch (token) {
          case 'a':
          case 'aa':
            return dayPeriodEnumValue.toUpperCase();
          case 'aaa':
            return dayPeriodEnumValue;
          case 'aaaaa':
            return dayPeriodEnumValue[0];
          case 'aaaa':
          default:
            return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
        }
      },
      // Hour [1-12]
      h: function h(date, token) {
        return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
      },
      // Hour [0-23]
      H: function H(date, token) {
        return addLeadingZeros(date.getUTCHours(), token.length);
      },
      // Minute
      m: function m(date, token) {
        return addLeadingZeros(date.getUTCMinutes(), token.length);
      },
      // Second
      s: function s(date, token) {
        return addLeadingZeros(date.getUTCSeconds(), token.length);
      },
      // Fraction of second
      S: function S(date, token) {
        var numberOfDigits = token.length;
        var milliseconds = date.getUTCMilliseconds();
        var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
        return addLeadingZeros(fractionalSeconds, token.length);
      }
    };
    var lightFormatters = formatters$2;

    var dayPeriodEnum = {
      am: 'am',
      pm: 'pm',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    };
    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
     * |  p! | Long localized time            |  P! | Long localized date            |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     * - `P` is long localized date format
     * - `p` is long localized time format
     */

    var formatters = {
      // Era
      G: function G(date, token, localize) {
        var era = date.getUTCFullYear() > 0 ? 1 : 0;
        switch (token) {
          // AD, BC
          case 'G':
          case 'GG':
          case 'GGG':
            return localize.era(era, {
              width: 'abbreviated'
            });
          // A, B
          case 'GGGGG':
            return localize.era(era, {
              width: 'narrow'
            });
          // Anno Domini, Before Christ
          case 'GGGG':
          default:
            return localize.era(era, {
              width: 'wide'
            });
        }
      },
      // Year
      y: function y(date, token, localize) {
        // Ordinal number
        if (token === 'yo') {
          var signedYear = date.getUTCFullYear();
          // Returns 1 for 1 BC (which is year 0 in JavaScript)
          var year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, {
            unit: 'year'
          });
        }
        return lightFormatters.y(date, token);
      },
      // Local week-numbering year
      Y: function Y(date, token, localize, options) {
        var signedWeekYear = getUTCWeekYear(date, options);
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

        // Two digit year
        if (token === 'YY') {
          var twoDigitYear = weekYear % 100;
          return addLeadingZeros(twoDigitYear, 2);
        }

        // Ordinal number
        if (token === 'Yo') {
          return localize.ordinalNumber(weekYear, {
            unit: 'year'
          });
        }

        // Padding
        return addLeadingZeros(weekYear, token.length);
      },
      // ISO week-numbering year
      R: function R(date, token) {
        var isoWeekYear = getUTCISOWeekYear(date);

        // Padding
        return addLeadingZeros(isoWeekYear, token.length);
      },
      // Extended year. This is a single number designating the year of this calendar system.
      // The main difference between `y` and `u` localizers are B.C. years:
      // | Year | `y` | `u` |
      // |------|-----|-----|
      // | AC 1 |   1 |   1 |
      // | BC 1 |   1 |   0 |
      // | BC 2 |   2 |  -1 |
      // Also `yy` always returns the last two digits of a year,
      // while `uu` pads single digit years to 2 characters and returns other years unchanged.
      u: function u(date, token) {
        var year = date.getUTCFullYear();
        return addLeadingZeros(year, token.length);
      },
      // Quarter
      Q: function Q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case 'Q':
            return String(quarter);
          // 01, 02, 03, 04
          case 'QQ':
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case 'Qo':
            return localize.ordinalNumber(quarter, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4
          case 'QQQ':
            return localize.quarter(quarter, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case 'QQQQQ':
            return localize.quarter(quarter, {
              width: 'narrow',
              context: 'formatting'
            });
          // 1st quarter, 2nd quarter, ...
          case 'QQQQ':
          default:
            return localize.quarter(quarter, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone quarter
      q: function q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case 'q':
            return String(quarter);
          // 01, 02, 03, 04
          case 'qq':
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case 'qo':
            return localize.ordinalNumber(quarter, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4
          case 'qqq':
            return localize.quarter(quarter, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case 'qqqqq':
            return localize.quarter(quarter, {
              width: 'narrow',
              context: 'standalone'
            });
          // 1st quarter, 2nd quarter, ...
          case 'qqqq':
          default:
            return localize.quarter(quarter, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // Month
      M: function M(date, token, localize) {
        var month = date.getUTCMonth();
        switch (token) {
          case 'M':
          case 'MM':
            return lightFormatters.M(date, token);
          // 1st, 2nd, ..., 12th
          case 'Mo':
            return localize.ordinalNumber(month + 1, {
              unit: 'month'
            });
          // Jan, Feb, ..., Dec
          case 'MMM':
            return localize.month(month, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // J, F, ..., D
          case 'MMMMM':
            return localize.month(month, {
              width: 'narrow',
              context: 'formatting'
            });
          // January, February, ..., December
          case 'MMMM':
          default:
            return localize.month(month, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone month
      L: function L(date, token, localize) {
        var month = date.getUTCMonth();
        switch (token) {
          // 1, 2, ..., 12
          case 'L':
            return String(month + 1);
          // 01, 02, ..., 12
          case 'LL':
            return addLeadingZeros(month + 1, 2);
          // 1st, 2nd, ..., 12th
          case 'Lo':
            return localize.ordinalNumber(month + 1, {
              unit: 'month'
            });
          // Jan, Feb, ..., Dec
          case 'LLL':
            return localize.month(month, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // J, F, ..., D
          case 'LLLLL':
            return localize.month(month, {
              width: 'narrow',
              context: 'standalone'
            });
          // January, February, ..., December
          case 'LLLL':
          default:
            return localize.month(month, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // Local week of year
      w: function w(date, token, localize, options) {
        var week = getUTCWeek(date, options);
        if (token === 'wo') {
          return localize.ordinalNumber(week, {
            unit: 'week'
          });
        }
        return addLeadingZeros(week, token.length);
      },
      // ISO week of year
      I: function I(date, token, localize) {
        var isoWeek = getUTCISOWeek(date);
        if (token === 'Io') {
          return localize.ordinalNumber(isoWeek, {
            unit: 'week'
          });
        }
        return addLeadingZeros(isoWeek, token.length);
      },
      // Day of the month
      d: function d(date, token, localize) {
        if (token === 'do') {
          return localize.ordinalNumber(date.getUTCDate(), {
            unit: 'date'
          });
        }
        return lightFormatters.d(date, token);
      },
      // Day of year
      D: function D(date, token, localize) {
        var dayOfYear = getUTCDayOfYear(date);
        if (token === 'Do') {
          return localize.ordinalNumber(dayOfYear, {
            unit: 'dayOfYear'
          });
        }
        return addLeadingZeros(dayOfYear, token.length);
      },
      // Day of week
      E: function E(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        switch (token) {
          // Tue
          case 'E':
          case 'EE':
          case 'EEE':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T
          case 'EEEEE':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu
          case 'EEEEEE':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday
          case 'EEEE':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Local day of week
      e: function e(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (Nth day of week with current locale or weekStartsOn)
          case 'e':
            return String(localDayOfWeek);
          // Padded numerical value
          case 'ee':
            return addLeadingZeros(localDayOfWeek, 2);
          // 1st, 2nd, ..., 7th
          case 'eo':
            return localize.ordinalNumber(localDayOfWeek, {
              unit: 'day'
            });
          case 'eee':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T
          case 'eeeee':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu
          case 'eeeeee':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday
          case 'eeee':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone local day of week
      c: function c(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (same as in `e`)
          case 'c':
            return String(localDayOfWeek);
          // Padded numerical value
          case 'cc':
            return addLeadingZeros(localDayOfWeek, token.length);
          // 1st, 2nd, ..., 7th
          case 'co':
            return localize.ordinalNumber(localDayOfWeek, {
              unit: 'day'
            });
          case 'ccc':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // T
          case 'ccccc':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'standalone'
            });
          // Tu
          case 'cccccc':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'standalone'
            });
          // Tuesday
          case 'cccc':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // ISO day of week
      i: function i(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch (token) {
          // 2
          case 'i':
            return String(isoDayOfWeek);
          // 02
          case 'ii':
            return addLeadingZeros(isoDayOfWeek, token.length);
          // 2nd
          case 'io':
            return localize.ordinalNumber(isoDayOfWeek, {
              unit: 'day'
            });
          // Tue
          case 'iii':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T
          case 'iiiii':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu
          case 'iiiiii':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday
          case 'iiii':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // AM or PM
      a: function a(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
        switch (token) {
          case 'a':
          case 'aa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });
          case 'aaa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            }).toLowerCase();
          case 'aaaaa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });
          case 'aaaa':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // AM, PM, midnight, noon
      b: function b(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
        }
        switch (token) {
          case 'b':
          case 'bb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });
          case 'bbb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            }).toLowerCase();
          case 'bbbbb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });
          case 'bbbb':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // in the morning, in the afternoon, in the evening, at night
      B: function B(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours >= 17) {
          dayPeriodEnumValue = dayPeriodEnum.evening;
        } else if (hours >= 12) {
          dayPeriodEnumValue = dayPeriodEnum.afternoon;
        } else if (hours >= 4) {
          dayPeriodEnumValue = dayPeriodEnum.morning;
        } else {
          dayPeriodEnumValue = dayPeriodEnum.night;
        }
        switch (token) {
          case 'B':
          case 'BB':
          case 'BBB':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });
          case 'BBBBB':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });
          case 'BBBB':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Hour [1-12]
      h: function h(date, token, localize) {
        if (token === 'ho') {
          var hours = date.getUTCHours() % 12;
          if (hours === 0) hours = 12;
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }
        return lightFormatters.h(date, token);
      },
      // Hour [0-23]
      H: function H(date, token, localize) {
        if (token === 'Ho') {
          return localize.ordinalNumber(date.getUTCHours(), {
            unit: 'hour'
          });
        }
        return lightFormatters.H(date, token);
      },
      // Hour [0-11]
      K: function K(date, token, localize) {
        var hours = date.getUTCHours() % 12;
        if (token === 'Ko') {
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }
        return addLeadingZeros(hours, token.length);
      },
      // Hour [1-24]
      k: function k(date, token, localize) {
        var hours = date.getUTCHours();
        if (hours === 0) hours = 24;
        if (token === 'ko') {
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }
        return addLeadingZeros(hours, token.length);
      },
      // Minute
      m: function m(date, token, localize) {
        if (token === 'mo') {
          return localize.ordinalNumber(date.getUTCMinutes(), {
            unit: 'minute'
          });
        }
        return lightFormatters.m(date, token);
      },
      // Second
      s: function s(date, token, localize) {
        if (token === 'so') {
          return localize.ordinalNumber(date.getUTCSeconds(), {
            unit: 'second'
          });
        }
        return lightFormatters.s(date, token);
      },
      // Fraction of second
      S: function S(date, token) {
        return lightFormatters.S(date, token);
      },
      // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
      X: function X(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        if (timezoneOffset === 0) {
          return 'Z';
        }
        switch (token) {
          // Hours and optional minutes
          case 'X':
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XX`
          case 'XXXX':
          case 'XX':
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XXX`
          case 'XXXXX':
          case 'XXX': // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
      x: function x(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Hours and optional minutes
          case 'x':
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xx`
          case 'xxxx':
          case 'xx':
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xxx`
          case 'xxxxx':
          case 'xxx': // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (GMT)
      O: function O(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Short
          case 'O':
          case 'OO':
          case 'OOO':
            return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
          // Long
          case 'OOOO':
          default:
            return 'GMT' + formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (specific non-location)
      z: function z(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Short
          case 'z':
          case 'zz':
          case 'zzz':
            return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
          // Long
          case 'zzzz':
          default:
            return 'GMT' + formatTimezone(timezoneOffset, ':');
        }
      },
      // Seconds timestamp
      t: function t(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = Math.floor(originalDate.getTime() / 1000);
        return addLeadingZeros(timestamp, token.length);
      },
      // Milliseconds timestamp
      T: function T(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = originalDate.getTime();
        return addLeadingZeros(timestamp, token.length);
      }
    };
    function formatTimezoneShort(offset, dirtyDelimiter) {
      var sign = offset > 0 ? '-' : '+';
      var absOffset = Math.abs(offset);
      var hours = Math.floor(absOffset / 60);
      var minutes = absOffset % 60;
      if (minutes === 0) {
        return sign + String(hours);
      }
      var delimiter = dirtyDelimiter || '';
      return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
    }
    function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
      if (offset % 60 === 0) {
        var sign = offset > 0 ? '-' : '+';
        return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
      }
      return formatTimezone(offset, dirtyDelimiter);
    }
    function formatTimezone(offset, dirtyDelimiter) {
      var delimiter = dirtyDelimiter || '';
      var sign = offset > 0 ? '-' : '+';
      var absOffset = Math.abs(offset);
      var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
      var minutes = addLeadingZeros(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }
    var formatters$1 = formatters;

    var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case 'P':
          return formatLong.date({
            width: 'short'
          });
        case 'PP':
          return formatLong.date({
            width: 'medium'
          });
        case 'PPP':
          return formatLong.date({
            width: 'long'
          });
        case 'PPPP':
        default:
          return formatLong.date({
            width: 'full'
          });
      }
    };
    var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case 'p':
          return formatLong.time({
            width: 'short'
          });
        case 'pp':
          return formatLong.time({
            width: 'medium'
          });
        case 'ppp':
          return formatLong.time({
            width: 'long'
          });
        case 'pppp':
        default:
          return formatLong.time({
            width: 'full'
          });
      }
    };
    var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
      var matchResult = pattern.match(/(P+)(p+)?/) || [];
      var datePattern = matchResult[1];
      var timePattern = matchResult[2];
      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }
      var dateTimeFormat;
      switch (datePattern) {
        case 'P':
          dateTimeFormat = formatLong.dateTime({
            width: 'short'
          });
          break;
        case 'PP':
          dateTimeFormat = formatLong.dateTime({
            width: 'medium'
          });
          break;
        case 'PPP':
          dateTimeFormat = formatLong.dateTime({
            width: 'long'
          });
          break;
        case 'PPPP':
        default:
          dateTimeFormat = formatLong.dateTime({
            width: 'full'
          });
          break;
      }
      return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
    };
    var longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter
    };
    var longFormatters$1 = longFormatters;

    /**
     * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
     * They usually appear for dates that denote time before the timezones were introduced
     * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
     * and GMT+01:00:00 after that date)
     *
     * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
     * which would lead to incorrect calculations.
     *
     * This function returns the timezone offset in milliseconds that takes seconds in account.
     */
    function getTimezoneOffsetInMilliseconds(date) {
      var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      utcDate.setUTCFullYear(date.getFullYear());
      return date.getTime() - utcDate.getTime();
    }

    var protectedDayOfYearTokens = ['D', 'DD'];
    var protectedWeekYearTokens = ['YY', 'YYYY'];
    function isProtectedDayOfYearToken(token) {
      return protectedDayOfYearTokens.indexOf(token) !== -1;
    }
    function isProtectedWeekYearToken(token) {
      return protectedWeekYearTokens.indexOf(token) !== -1;
    }
    function throwProtectedError(token, format, input) {
      if (token === 'YYYY') {
        throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'YY') {
        throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'D') {
        throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'DD') {
        throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      }
    }

    var formatDistanceLocale = {
      lessThanXSeconds: {
        one: 'less than a second',
        other: 'less than {{count}} seconds'
      },
      xSeconds: {
        one: '1 second',
        other: '{{count}} seconds'
      },
      halfAMinute: 'half a minute',
      lessThanXMinutes: {
        one: 'less than a minute',
        other: 'less than {{count}} minutes'
      },
      xMinutes: {
        one: '1 minute',
        other: '{{count}} minutes'
      },
      aboutXHours: {
        one: 'about 1 hour',
        other: 'about {{count}} hours'
      },
      xHours: {
        one: '1 hour',
        other: '{{count}} hours'
      },
      xDays: {
        one: '1 day',
        other: '{{count}} days'
      },
      aboutXWeeks: {
        one: 'about 1 week',
        other: 'about {{count}} weeks'
      },
      xWeeks: {
        one: '1 week',
        other: '{{count}} weeks'
      },
      aboutXMonths: {
        one: 'about 1 month',
        other: 'about {{count}} months'
      },
      xMonths: {
        one: '1 month',
        other: '{{count}} months'
      },
      aboutXYears: {
        one: 'about 1 year',
        other: 'about {{count}} years'
      },
      xYears: {
        one: '1 year',
        other: '{{count}} years'
      },
      overXYears: {
        one: 'over 1 year',
        other: 'over {{count}} years'
      },
      almostXYears: {
        one: 'almost 1 year',
        other: 'almost {{count}} years'
      }
    };
    var formatDistance = function formatDistance(token, count, options) {
      var result;
      var tokenValue = formatDistanceLocale[token];
      if (typeof tokenValue === 'string') {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace('{{count}}', count.toString());
      }
      if (options !== null && options !== void 0 && options.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return 'in ' + result;
        } else {
          return result + ' ago';
        }
      }
      return result;
    };
    var formatDistance$1 = formatDistance;

    function buildFormatLongFn(args) {
      return function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // TODO: Remove String()
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    }

    var dateFormats = {
      full: 'EEEE, MMMM do, y',
      long: 'MMMM do, y',
      medium: 'MMM d, y',
      short: 'MM/dd/yyyy'
    };
    var timeFormats = {
      full: 'h:mm:ss a zzzz',
      long: 'h:mm:ss a z',
      medium: 'h:mm:ss a',
      short: 'h:mm a'
    };
    var dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}'
    };
    var formatLong = {
      date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: 'full'
      }),
      time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: 'full'
      }),
      dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: 'full'
      })
    };
    var formatLong$1 = formatLong;

    var formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: 'P'
    };
    var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
      return formatRelativeLocale[token];
    };
    var formatRelative$1 = formatRelative;

    function buildLocalizeFn(args) {
      return function (dirtyIndex, options) {
        var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
        var valuesArray;
        if (context === 'formatting' && args.formattingValues) {
          var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
          valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          var _defaultWidth = args.defaultWidth;
          var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
          valuesArray = args.values[_width] || args.values[_defaultWidth];
        }
        var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
        // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
        return valuesArray[index];
      };
    }

    var eraValues = {
      narrow: ['B', 'A'],
      abbreviated: ['BC', 'AD'],
      wide: ['Before Christ', 'Anno Domini']
    };
    var quarterValues = {
      narrow: ['1', '2', '3', '4'],
      abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
      wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
    };

    // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.
    var monthValues = {
      narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    var dayValues = {
      narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    var dayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      }
    };
    var formattingDayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      }
    };
    var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
      var number = Number(dirtyNumber);

      // If ordinal numbers depend on context, for example,
      // if they are different for different grammatical genders,
      // use `options.unit`.
      //
      // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
      // 'day', 'hour', 'minute', 'second'.

      var rem100 = number % 100;
      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + 'st';
          case 2:
            return number + 'nd';
          case 3:
            return number + 'rd';
        }
      }
      return number + 'th';
    };
    var localize = {
      ordinalNumber: ordinalNumber,
      era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: 'wide'
      }),
      quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: 'wide',
        argumentCallback: function argumentCallback(quarter) {
          return quarter - 1;
        }
      }),
      month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: 'wide'
      }),
      day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: 'wide'
      }),
      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: 'wide',
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: 'wide'
      })
    };
    var localize$1 = localize;

    function buildMatchFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var width = options.width;
        var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);
        if (!matchResult) {
          return null;
        }
        var matchedString = matchResult[0];
        var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        }) : findKey(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
        var value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }
    function findKey(object, predicate) {
      for (var key in object) {
        if (object.hasOwnProperty(key) && predicate(object[key])) {
          return key;
        }
      }
      return undefined;
    }
    function findIndex(array, predicate) {
      for (var key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }
      return undefined;
    }

    function buildMatchPatternFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }

    var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    var parseOrdinalNumberPattern = /\d+/i;
    var matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i
    };
    var parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i]
    };
    var matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i
    };
    var parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i]
    };
    var matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    };
    var parseMonthPatterns = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    };
    var matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    };
    var parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    };
    var matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    };
    var parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
      }
    };
    var match = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: function valueCallback(value) {
          return parseInt(value, 10);
        }
      }),
      era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseEraPatterns,
        defaultParseWidth: 'any'
      }),
      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: 'any',
        valueCallback: function valueCallback(index) {
          return index + 1;
        }
      }),
      month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: 'any'
      }),
      day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseDayPatterns,
        defaultParseWidth: 'any'
      }),
      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: 'any',
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: 'any'
      })
    };
    var match$1 = match;

    /**
     * @type {Locale}
     * @category Locales
     * @summary English locale (United States).
     * @language English
     * @iso-639-2 eng
     * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
     * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
     */
    var locale = {
      code: 'en-US',
      formatDistance: formatDistance$1,
      formatLong: formatLong$1,
      formatRelative: formatRelative$1,
      localize: localize$1,
      match: match$1,
      options: {
        weekStartsOn: 0 /* Sunday */,
        firstWeekContainsDate: 1
      }
    };
    var defaultLocale = locale;

    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps
    var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

    // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
    var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    var escapedStringRegExp = /^'([^]*?)'?$/;
    var doubleQuoteRegExp = /''/g;
    var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

    /**
     * @name format
     * @category Common Helpers
     * @summary Format the date.
     *
     * @description
     * Return the formatted date string in the given format. The result may vary by locale.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * The characters wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     * (see the last example)
     *
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 7 below the table).
     *
     * Accepted patterns:
     * | Unit                            | Pattern | Result examples                   | Notes |
     * |---------------------------------|---------|-----------------------------------|-------|
     * | Era                             | G..GGG  | AD, BC                            |       |
     * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 | GGGGG   | A, B                              |       |
     * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
     * |                                 | yy      | 44, 01, 00, 17                    | 5     |
     * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
     * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
     * |                                 | yyyyy   | ...                               | 3,5   |
     * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
     * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
     * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
     * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
     * |                                 | YYYYY   | ...                               | 3,5   |
     * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
     * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
     * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
     * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
     * |                                 | RRRRR   | ...                               | 3,5,7 |
     * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
     * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
     * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
     * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
     * |                                 | uuuuu   | ...                               | 3,5   |
     * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
     * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | QQ      | 01, 02, 03, 04                    |       |
     * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
     * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | qq      | 01, 02, 03, 04                    |       |
     * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
     * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
     * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | MM      | 01, 02, ..., 12                   |       |
     * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 | MMMM    | January, February, ..., December  | 2     |
     * |                                 | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
     * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | LL      | 01, 02, ..., 12                   |       |
     * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 | LLLL    | January, February, ..., December  | 2     |
     * |                                 | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | w       | 1, 2, ..., 53                     |       |
     * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
     * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | II      | 01, 02, ..., 53                   | 7     |
     * | Day of month                    | d       | 1, 2, ..., 31                     |       |
     * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
     * |                                 | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
     * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
     * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
     * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 | DDDD    | ...                               | 3     |
     * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
     * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
     * |                                 | ii      | 01, 02, ..., 07                   | 7     |
     * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
     * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
     * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
     * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
     * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | ee      | 02, 03, ..., 01                   |       |
     * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | cc      | 02, 03, ..., 01                   |       |
     * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          | a..aa   | AM, PM                            |       |
     * |                                 | aaa     | am, pm                            |       |
     * |                                 | aaaa    | a.m., p.m.                        | 2     |
     * |                                 | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
     * |                                 | bbb     | am, pm, noon, midnight            |       |
     * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
     * |                                 | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
     * |                                 | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
     * |                                 | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
     * |                                 | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
     * |                                 | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          | m       | 0, 1, ..., 59                     |       |
     * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | mm      | 00, 01, ..., 59                   |       |
     * | Second                          | s       | 0, 1, ..., 59                     |       |
     * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | ss      | 00, 01, ..., 59                   |       |
     * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
     * |                                 | SS      | 00, 01, ..., 99                   |       |
     * |                                 | SSS     | 000, 001, ..., 999                |       |
     * |                                 | SSSS    | ...                               | 3     |
     * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
     * |                                 | XX      | -0800, +0530, Z                   |       |
     * |                                 | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
     * |                                 | xx      | -0800, +0530, +0000               |       |
     * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
     * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
     * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
     * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
     * | Seconds timestamp               | t       | 512969520                         | 7     |
     * |                                 | tt      | ...                               | 3,7   |
     * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
     * |                                 | TT      | ...                               | 3,7   |
     * | Long localized date             | P       | 04/29/1453                        | 7     |
     * |                                 | PP      | Apr 29, 1453                      | 7     |
     * |                                 | PPP     | April 29th, 1453                  | 7     |
     * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
     * | Long localized time             | p       | 12:00 AM                          | 7     |
     * |                                 | pp      | 12:00:00 AM                       | 7     |
     * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
     * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
     * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
     * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
     * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
     * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
     *    the output will be the same as default pattern for this unit, usually
     *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
     *    are marked with "2" in the last column of the table.
     *
     *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
     *
     * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
     *    The output will be padded with zeros to match the length of the pattern.
     *
     *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
     *
     * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 5. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` always returns the last two digits of a year,
     *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
     *
     *    | Year | `yy` | `uu` |
     *    |------|------|------|
     *    | 1    |   01 |   01 |
     *    | 14   |   14 |   14 |
     *    | 376  |   76 |  376 |
     *    | 1453 |   53 | 1453 |
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
     *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
     *
     * 6. Specific non-location timezones are currently unavailable in `date-fns`,
     *    so right now these tokens fall back to GMT timezones.
     *
     * 7. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `t`: seconds timestamp
     *    - `T`: milliseconds timestamp
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * @param {Date|Number} date - the original date
     * @param {String} format - the string of tokens
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
     * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @returns {String} the formatted date string
     * @throws {TypeError} 2 arguments required
     * @throws {RangeError} `date` must not be Invalid Date
     * @throws {RangeError} `options.locale` must contain `localize` property
     * @throws {RangeError} `options.locale` must contain `formatLong` property
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
     * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} format string contains an unescaped latin alphabet character
     *
     * @example
     * // Represent 11 February 2014 in middle-endian format:
     * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
     * //=> '02/11/2014'
     *
     * @example
     * // Represent 2 July 2014 in Esperanto:
     * import { eoLocale } from 'date-fns/locale/eo'
     * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
     *   locale: eoLocale
     * })
     * //=> '2-a de julio 2014'
     *
     * @example
     * // Escape string by single quote characters:
     * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
     * //=> "3 o'clock"
     */

    function format(dirtyDate, dirtyFormatStr, options) {
      var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
      requiredArgs(2, arguments);
      var formatStr = String(dirtyFormatStr);
      var defaultOptions = getDefaultOptions();
      var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
      var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

      // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
      }
      var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

      // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
      }
      if (!locale.localize) {
        throw new RangeError('locale must contain localize property');
      }
      if (!locale.formatLong) {
        throw new RangeError('locale must contain formatLong property');
      }
      var originalDate = toDate(dirtyDate);
      if (!isValid(originalDate)) {
        throw new RangeError('Invalid time value');
      }

      // Convert the date in system timezone to the same date in UTC+00:00 timezone.
      // This ensures that when UTC functions will be implemented, locales will be compatible with them.
      // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
      var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
      var utcDate = subMilliseconds(originalDate, timezoneOffset);
      var formatterOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale,
        _originalDate: originalDate
      };
      var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          var longFormatter = longFormatters$1[firstCharacter];
          return longFormatter(substring, locale.formatLong);
        }
        return substring;
      }).join('').match(formattingTokensRegExp).map(function (substring) {
        // Replace two single quote characters with one single quote character
        if (substring === "''") {
          return "'";
        }
        var firstCharacter = substring[0];
        if (firstCharacter === "'") {
          return cleanEscapedString(substring);
        }
        var formatter = formatters$1[firstCharacter];
        if (formatter) {
          if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
            throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
          }
          if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
            throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
          }
          return formatter(utcDate, substring, locale.localize, formatterOptions);
        }
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
        }
        return substring;
      }).join('');
      return result;
    }
    function cleanEscapedString(input) {
      var matched = input.match(escapedStringRegExp);
      if (!matched) {
        return input;
      }
      return matched[1].replace(doubleQuoteRegExp, "'");
    }

    const Exporters = ['csv', 'json', 'xml'];

    const mimeTypes = {
      json: 'application/json',
      csv: 'text/csv',
      xml: 'text/xml'
    };
    const getExportedFileName = extension => `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;
    const ExportComponent = ({
      resource
    }) => {
      const [isFetching, setFetching] = React.useState();
      const sendNotice = adminjs.useNotice();
      const exportData = async type => {
        setFetching(true);
        try {
          const {
            data: {
              exportedData
            }
          } = await new adminjs.ApiClient().resourceAction({
            method: 'post',
            resourceId: resource.id,
            actionName: 'export',
            params: {
              type
            }
          });
          const blob = new Blob([exportedData], {
            type: mimeTypes[type]
          });
          FileSaver_minExports.saveAs(blob, getExportedFileName(type));
          sendNotice({
            message: 'Exported successfully',
            type: 'success'
          });
        } catch (e) {
          sendNotice({
            message: e.message,
            type: 'error'
          });
        }
        setFetching(false);
      };
      if (isFetching) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null);
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "lg"
      }, "Choose export format:")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "center"
      }, Exporters.map(parserType => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: parserType,
        m: 2
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        onClick: () => exportData(parserType),
        disabled: isFetching
      }, parserType.toUpperCase())))));
    };

    const Edit = ({
      property,
      record,
      onChange
    }) => {
      const {
        translateProperty
      } = adminjs.useTranslation();
      const {
        params
      } = record;
      const {
        custom
      } = property;
      const path = adminjs.flat.get(params, custom.filePathProperty);
      const key = adminjs.flat.get(params, custom.keyProperty);
      const file = adminjs.flat.get(params, custom.fileProperty);
      const [originalKey, setOriginalKey] = React.useState(key);
      const [filesToUpload, setFilesToUpload] = React.useState([]);
      React.useEffect(() => {
        // it means means that someone hit save and new file has been uploaded
        // in this case fliesToUpload should be cleared.
        // This happens when user turns off redirect after new/edit
        if (typeof key === 'string' && key !== originalKey || typeof key !== 'string' && !originalKey || typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length) {
          setOriginalKey(key);
          setFilesToUpload([]);
        }
      }, [key, originalKey]);
      const onUpload = files => {
        setFilesToUpload(files);
        onChange(custom.fileProperty, files);
      };
      const handleRemove = () => {
        onChange(custom.fileProperty, null);
      };
      const handleMultiRemove = singleKey => {
        const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
        const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
        if (path && path.length > 0) {
          const newPath = path.map((currentPath, i) => i !== index ? currentPath : null);
          let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
          newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
          onChange({
            ...record,
            params: newParams
          });
        } else {
          // eslint-disable-next-line no-console
          console.log('You cannot remove file when there are no uploaded files yet');
        }
      };
      return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)), /*#__PURE__*/React__default.default.createElement(designSystem.DropZone, {
        onChange: onUpload,
        multiple: custom.multiple,
        validate: {
          mimeTypes: custom.mimeTypes,
          maxSize: custom.maxSize
        },
        files: filesToUpload
      }), !custom.multiple && key && path && !filesToUpload.length && file !== null && /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
        filename: key,
        src: path,
        onRemove: handleRemove
      }), custom.multiple && key && key.length && path ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
        // when we remove items we set only path index to nulls.
        // key is still there. This is because
        // we have to maintain all the indexes. So here we simply filter out elements which
        // were removed and display only what was left
        const currentPath = path[index];
        return currentPath ? /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
          key: singleKey,
          filename: singleKey,
          src: path[index],
          onRemove: () => handleMultiRemove(singleKey)
        }) : '';
      })) : '');
    };

    const AudioMimeTypes = ['audio/aac', 'audio/midi', 'audio/x-midi', 'audio/mpeg', 'audio/ogg', 'application/ogg', 'audio/opus', 'audio/wav', 'audio/webm', 'audio/3gpp2'];
    const ImageMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp'];

    // eslint-disable-next-line import/no-extraneous-dependencies
    const SingleFile = props => {
      const {
        name,
        path,
        mimeType,
        width
      } = props;
      if (path && path.length) {
        if (mimeType && ImageMimeTypes.includes(mimeType)) {
          return /*#__PURE__*/React__default.default.createElement("img", {
            src: path,
            style: {
              maxHeight: width,
              maxWidth: width
            },
            alt: name
          });
        }
        if (mimeType && AudioMimeTypes.includes(mimeType)) {
          return /*#__PURE__*/React__default.default.createElement("audio", {
            controls: true,
            src: path
          }, "Your browser does not support the", /*#__PURE__*/React__default.default.createElement("code", null, "audio"), /*#__PURE__*/React__default.default.createElement("track", {
            kind: "captions"
          }));
        }
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        as: "a",
        href: path,
        ml: "default",
        size: "sm",
        rounded: true,
        target: "_blank"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "DocumentDownload",
        color: "white",
        mr: "default"
      }), name));
    };
    const File = ({
      width,
      record,
      property
    }) => {
      const {
        custom
      } = property;
      let path = adminjs.flat.get(record?.params, custom.filePathProperty);
      if (!path) {
        return null;
      }
      const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
      const mimeType = custom.mimeTypeProperty && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
      if (!property.custom.multiple) {
        if (custom.opts && custom.opts.baseUrl) {
          path = `${custom.opts.baseUrl}/${name}`;
        }
        return /*#__PURE__*/React__default.default.createElement(SingleFile, {
          path: path,
          name: name,
          width: width,
          mimeType: mimeType
        });
      }
      if (custom.opts && custom.opts.baseUrl) {
        const baseUrl = custom.opts.baseUrl || '';
        path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
      }
      return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => /*#__PURE__*/React__default.default.createElement(SingleFile, {
        key: singlePath,
        path: singlePath,
        name: name[index],
        width: width,
        mimeType: mimeType[index]
      })));
    };

    const List = props => /*#__PURE__*/React__default.default.createElement(File, {
      width: 100,
      ...props
    });

    const Show = props => {
      const {
        property
      } = props;
      return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default.default.createElement(File, {
        width: "100%",
        ...props
      }));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.ImportComponent = ImportComponent;
    AdminJS.UserComponents.ExportComponent = ExportComponent;
    AdminJS.UserComponents.UploadEditComponent = Edit;
    AdminJS.UserComponents.UploadListComponent = List;
    AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0ltcG9ydENvbXBvbmVudC5qc3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGJhYmVsK3J1bnRpbWVANy4yMy4yL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNEYXRlL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1ZhbGlkL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2FkZE1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zdWJNaWxsaXNlY29uZHMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENEYXlPZlllYXIvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDSVNPV2Vlay9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ1dlZWsvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENXZWVrWWVhci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3N0YXJ0T2ZVVENXZWVrWWVhci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ1dlZWsvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9mb3JtYXQvbGlnaHRGb3JtYXR0ZXJzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9mb3JtYXQvbG9uZ0Zvcm1hdHRlcnMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcHJvdGVjdGVkVG9rZW5zL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdExvbmcvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0UmVsYXRpdmUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMi4zMC4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2xvY2FsaXplL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hGbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL21hdGNoL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDIuMzAuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AyLjMwLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXQvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9leHBvcnRlci50eXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK2ltcG9ydC1leHBvcnRAMy4wLjBfYWRtaW5qc0A3LjUuMi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9FeHBvcnRDb21wb25lbnQuanN4IiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50LmpzIiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBEcm9wWm9uZUl0ZW0sIExvYWRlciwgQm94LCBCdXR0b24sIERyb3Bab25lLCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgSW1wb3J0Q29tcG9uZW50ID0gKHsgcmVzb3VyY2UgfSkgPT4ge1xuICAgIGNvbnN0IFtmaWxlLCBzZXRGaWxlXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IHNlbmROb3RpY2UgPSB1c2VOb3RpY2UoKTtcbiAgICBjb25zdCBbaXNGZXRjaGluZywgc2V0RmV0Y2hpbmddID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBvblVwbG9hZCA9ICh1cGxvYWRlZEZpbGUpID0+IHtcbiAgICAgICAgc2V0RmlsZSh1cGxvYWRlZEZpbGU/LlswXSA/PyBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uU3VibWl0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRGZXRjaGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydERhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIGltcG9ydERhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZT8ubmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBuZXcgQXBpQ2xpZW50KCkucmVzb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdpbXBvcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IGltcG9ydERhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiAnSW1wb3J0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZW5kTm90aWNlKHsgbWVzc2FnZTogZS5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldEZldGNoaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIGlmIChpc0ZldGNoaW5nKSB7XG4gICAgICAgIHJldHVybiA8TG9hZGVyIC8+O1xuICAgIH1cbiAgICByZXR1cm4gKDxCb3ggbWFyZ2luPVwiYXV0b1wiIG1heFdpZHRoPXs2MDB9IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCI+XG4gICAgICA8RHJvcFpvbmUgZmlsZXM9e1tdfSBvbkNoYW5nZT17b25VcGxvYWR9IG11bHRpcGxlPXtmYWxzZX0vPlxuICAgICAge2ZpbGUgJiYgKDxEcm9wWm9uZUl0ZW0gZmlsZT17ZmlsZX0gZmlsZW5hbWU9e2ZpbGUubmFtZX0gb25SZW1vdmU9eygpID0+IHNldEZpbGUobnVsbCl9Lz4pfVxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIgbT17MTB9PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU3VibWl0fSBkaXNhYmxlZD17IWZpbGUgfHwgaXNGZXRjaGluZ30+XG4gICAgICAgICAgVXBsb2FkXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBJbXBvcnRDb21wb25lbnQ7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG8pIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gdHlwZW9mIG87XG4gIH0gOiBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiBvICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG8uY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvO1xuICB9LCBfdHlwZW9mKG8pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVpcmVkQXJncyhyZXF1aXJlZCwgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocmVxdWlyZWQgKyAnIGFyZ3VtZW50JyArIChyZXF1aXJlZCA+IDEgPyAncycgOiAnJykgKyAnIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJncy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2ZcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gdmFsdWUgYSBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLiBUaGUgZnVuY3Rpb24gd29ya3MgZm9yIGRhdGVzIHRyYW5zZmVycmVkIGFjcm9zcyBpZnJhbWVzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGEgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZSgpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoTmFOKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igc29tZSB2YWx1ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSgnMjAxNC0wMi0zMScpXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBvYmplY3Q6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoe30pXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCBfdHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2ZcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8IF90eXBlb2YoYXJndW1lbnQpID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjc3RyaW5nLWFyZ3VtZW50c1wiKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsImltcG9ydCBpc0RhdGUgZnJvbSBcIi4uL2lzRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc1ZhbGlkXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogQXJndW1lbnQgaXMgY29udmVydGVkIHRvIERhdGUgdXNpbmcgYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdmFsaWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQoMTM5MzgwNDgwMDAwMClcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1ZhbGlkKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgaWYgKCFpc0RhdGUoZGlydHlEYXRlKSAmJiB0eXBlb2YgZGlydHlEYXRlICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICByZXR1cm4gIWlzTmFOKE51bWJlcihkYXRlKSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9JbnRlZ2VyKGRpcnR5TnVtYmVyKSB7XG4gIGlmIChkaXJ0eU51bWJlciA9PT0gbnVsbCB8fCBkaXJ0eU51bWJlciA9PT0gdHJ1ZSB8fCBkaXJ0eU51bWJlciA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXI7XG4gIH1cbiAgcmV0dXJuIG51bWJlciA8IDAgPyBNYXRoLmNlaWwobnVtYmVyKSA6IE1hdGguZmxvb3IobnVtYmVyKTtcbn0iLCJpbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBhZGRNaWxsaXNlY29uZHNcbiAqIEBjYXRlZ29yeSBNaWxsaXNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIGFkZGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbGxpc2Vjb25kcyBhZGRlZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgNzUwIG1pbGxpc2Vjb25kcyB0byAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogY29uc3QgcmVzdWx0ID0gYWRkTWlsbGlzZWNvbmRzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgNDUsIDMwLCAwKSwgNzUwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6NDU6MzAuNzUwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgdGltZXN0YW1wID0gdG9EYXRlKGRpcnR5RGF0ZSkuZ2V0VGltZSgpO1xuICB2YXIgYW1vdW50ID0gdG9JbnRlZ2VyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIGFtb3VudCk7XG59IiwiaW1wb3J0IGFkZE1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vYWRkTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgc3ViTWlsbGlzZWNvbmRzXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIHN1YnRyYWN0ZWQuIFBvc2l0aXZlIGRlY2ltYWxzIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5mbG9vcmAsIGRlY2ltYWxzIGxlc3MgdGhhbiB6ZXJvIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5jZWlsYC5cbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIHN1YnRyYWN0ZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgNzUwIG1pbGxpc2Vjb25kcyBmcm9tIDEwIEp1bHkgMjAxNCAxMjo0NTozMC4wMDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdWJNaWxsaXNlY29uZHMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDEyLCA0NSwgMzAsIDApLCA3NTApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjo0NToyOS4yNTBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ViTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBhbW91bnQgPSB0b0ludGVnZXIoZGlydHlBbW91bnQpO1xuICByZXR1cm4gYWRkTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgLWFtb3VudCk7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDA7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENEYXlPZlllYXIoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mWWVhclRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICB2YXIgZGlmZmVyZW5jZSA9IHRpbWVzdGFtcCAtIHN0YXJ0T2ZZZWFyVGltZXN0YW1wO1xuICByZXR1cm4gTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gTUlMTElTRUNPTkRTX0lOX0RBWSkgKyAxO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mVVRDSVNPV2VlayhkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSAxO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGF5ID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgdmFyIGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSBkaWZmKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ0lTT1dlZWtZZWFyKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIHZhciBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0VVRDRnVsbFllYXIoeWVhciArIDEsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZlVUQ0lTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhcik7XG4gIHZhciBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mVGhpc1llYXIgPSBzdGFydE9mVVRDSVNPV2Vlayhmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyKTtcbiAgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDE7XG4gIH0gZWxzZSBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZlRoaXNZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMTtcbiAgfVxufSIsImltcG9ydCBnZXRVVENJU09XZWVrWWVhciBmcm9tIFwiLi4vZ2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ0lTT1dlZWtZZWFyKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIHllYXIgPSBnZXRVVENJU09XZWVrWWVhcihkaXJ0eURhdGUpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5ID0gbmV3IERhdGUoMCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZVVENJU09XZWVrKGZvdXJ0aE9mSmFudWFyeSk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENJU09XZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENJU09XZWVrWWVhciBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fV0VFSyA9IDYwNDgwMDAwMDtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ0lTT1dlZWsoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGlmZiA9IHN0YXJ0T2ZVVENJU09XZWVrKGRhdGUpLmdldFRpbWUoKSAtIHN0YXJ0T2ZVVENJU09XZWVrWWVhcihkYXRlKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLKSArIDE7XG59IiwidmFyIGRlZmF1bHRPcHRpb25zID0ge307XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ1dlZWsoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJHdlZWtTdGFydHNPbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkd2Vla1N0YXJ0c09uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX29wdGlvbnMkd2Vla1N0YXJ0c09uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyR3ZWVrU3RhcnRzT24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMCk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBkYXkgPSBkYXRlLmdldFVUQ0RheSgpO1xuICB2YXIgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIGRpZmYpO1xuICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgZmlyc3RXZWVrQ29udGFpbnNEYXRlID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDEpO1xuXG4gIC8vIFRlc3QgaWYgd2Vla1N0YXJ0c09uIGlzIGJldHdlZW4gMSBhbmQgNyBfYW5kXyBpcyBub3QgTmFOXG4gIGlmICghKGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA+PSAxICYmIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA8PSA3KSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdmaXJzdFdlZWtDb250YWluc0RhdGUgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDcgaW5jbHVzaXZlbHknKTtcbiAgfVxuICB2YXIgZmlyc3RXZWVrT2ZOZXh0WWVhciA9IG5ldyBEYXRlKDApO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIgKyAxLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZlVUQ1dlZWsoZmlyc3RXZWVrT2ZOZXh0WWVhciwgb3B0aW9ucyk7XG4gIHZhciBmaXJzdFdlZWtPZlRoaXNZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZVVENXZWVrKGZpcnN0V2Vla09mVGhpc1llYXIsIG9wdGlvbnMpO1xuICBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59IiwiaW1wb3J0IGdldFVUQ1dlZWtZZWFyIGZyb20gXCIuLi9nZXRVVENXZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENXZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4uL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mVVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBmaXJzdFdlZWtDb250YWluc0RhdGUgPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkZmlyc3RXZWVrQ29uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX29wdGlvbnMkZmlyc3RXZWVrQ29uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRmaXJzdFdlZWtDb24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMSk7XG4gIHZhciB5ZWFyID0gZ2V0VVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKTtcbiAgdmFyIGZpcnN0V2VlayA9IG5ldyBEYXRlKDApO1xuICBmaXJzdFdlZWsuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZVVENXZWVrKGZpcnN0V2Vlaywgb3B0aW9ucyk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrWWVhciBmcm9tIFwiLi4vc3RhcnRPZlVUQ1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fV0VFSyA9IDYwNDgwMDAwMDtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ1dlZWsoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGlmZiA9IHN0YXJ0T2ZVVENXZWVrKGRhdGUsIG9wdGlvbnMpLmdldFRpbWUoKSAtIHN0YXJ0T2ZVVENXZWVrWWVhcihkYXRlLCBvcHRpb25zKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLKSArIDE7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIHZhciBzaWduID0gbnVtYmVyIDwgMCA/ICctJyA6ICcnO1xuICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpO1xuICB3aGlsZSAob3V0cHV0Lmxlbmd0aCA8IHRhcmdldExlbmd0aCkge1xuICAgIG91dHB1dCA9ICcwJyArIG91dHB1dDtcbiAgfVxuICByZXR1cm4gc2lnbiArIG91dHB1dDtcbn0iLCJpbXBvcnQgYWRkTGVhZGluZ1plcm9zIGZyb20gXCIuLi8uLi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanNcIjtcbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICovXG52YXIgZm9ybWF0dGVycyA9IHtcbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiB5KGRhdGUsIHRva2VuKSB7XG4gICAgLy8gRnJvbSBodHRwOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LTMxL3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0Zvcm1hdF90b2tlbnNcbiAgICAvLyB8IFllYXIgICAgIHwgICAgIHkgfCB5eSB8ICAgeXl5IHwgIHl5eXkgfCB5eXl5eSB8XG4gICAgLy8gfC0tLS0tLS0tLS18LS0tLS0tLXwtLS0tfC0tLS0tLS18LS0tLS0tLXwtLS0tLS0tfFxuICAgIC8vIHwgQUQgMSAgICAgfCAgICAgMSB8IDAxIHwgICAwMDEgfCAgMDAwMSB8IDAwMDAxIHxcbiAgICAvLyB8IEFEIDEyICAgIHwgICAgMTIgfCAxMiB8ICAgMDEyIHwgIDAwMTIgfCAwMDAxMiB8XG4gICAgLy8gfCBBRCAxMjMgICB8ICAgMTIzIHwgMjMgfCAgIDEyMyB8ICAwMTIzIHwgMDAxMjMgfFxuICAgIC8vIHwgQUQgMTIzNCAgfCAgMTIzNCB8IDM0IHwgIDEyMzQgfCAgMTIzNCB8IDAxMjM0IHxcbiAgICAvLyB8IEFEIDEyMzQ1IHwgMTIzNDUgfCA0NSB8IDEyMzQ1IHwgMTIzNDUgfCAxMjM0NSB8XG5cbiAgICB2YXIgc2lnbmVkWWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIHZhciB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0b2tlbiA9PT0gJ3l5JyA/IHllYXIgJSAxMDAgOiB5ZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNb250aFxuICBNOiBmdW5jdGlvbiBNKGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgIHJldHVybiB0b2tlbiA9PT0gJ00nID8gU3RyaW5nKG1vbnRoICsgMSkgOiBhZGRMZWFkaW5nWmVyb3MobW9udGggKyAxLCAyKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiBkKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0RhdGUoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gQU0gb3IgUE1cbiAgYTogZnVuY3Rpb24gYShkYXRlLCB0b2tlbikge1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXRlLmdldFVUQ0hvdXJzKCkgLyAxMiA+PSAxID8gJ3BtJyA6ICdhbSc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnYSc6XG4gICAgICBjYXNlICdhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNhc2UgJ2FhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgICBjYXNlICdhYWFhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWVbMF07XG4gICAgICBjYXNlICdhYWFhJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUgPT09ICdhbScgPyAnYS5tLicgOiAncC5tLic7XG4gICAgfVxuICB9LFxuICAvLyBIb3VyIFsxLTEyXVxuICBoOiBmdW5jdGlvbiBoKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0hvdXJzKCkgJSAxMiB8fCAxMiwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gSChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENIb3VycygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNaW51dGVcbiAgbTogZnVuY3Rpb24gbShkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENNaW51dGVzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiBzKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ1NlY29uZHMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFM6IGZ1bmN0aW9uIFMoZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgbnVtYmVyT2ZEaWdpdHMgPSB0b2tlbi5sZW5ndGg7XG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IGRhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gICAgdmFyIGZyYWN0aW9uYWxTZWNvbmRzID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgKiBNYXRoLnBvdygxMCwgbnVtYmVyT2ZEaWdpdHMgLSAzKSk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmcmFjdGlvbmFsU2Vjb25kcywgdG9rZW4ubGVuZ3RoKTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7IiwiaW1wb3J0IGdldFVUQ0RheU9mWWVhciBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENEYXlPZlllYXIvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENJU09XZWVrIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENJU09XZWVrWWVhciBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENJU09XZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IGdldFVUQ1dlZWsgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IGdldFVUQ1dlZWtZZWFyIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgYWRkTGVhZGluZ1plcm9zIGZyb20gXCIuLi8uLi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanNcIjtcbmltcG9ydCBsaWdodEZvcm1hdHRlcnMgZnJvbSBcIi4uL2xpZ2h0Rm9ybWF0dGVycy9pbmRleC5qc1wiO1xudmFyIGRheVBlcmlvZEVudW0gPSB7XG4gIGFtOiAnYW0nLFxuICBwbTogJ3BtJyxcbiAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gIG5vb246ICdub29uJyxcbiAgbW9ybmluZzogJ21vcm5pbmcnLFxuICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICBldmVuaW5nOiAnZXZlbmluZycsXG4gIG5pZ2h0OiAnbmlnaHQnXG59O1xuLypcbiAqIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGEgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEEqIHwgTWlsbGlzZWNvbmRzIGluIGRheSAgICAgICAgICAgIHxcbiAqIHwgIGIgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgIHwgIEIgIHwgRmxleGlibGUgZGF5IHBlcmlvZCAgICAgICAgICAgIHxcbiAqIHwgIGMgIHwgU3RhbmQtYWxvbmUgbG9jYWwgZGF5IG9mIHdlZWsgIHwgIEMqIHwgTG9jYWxpemVkIGhvdXIgdy8gZGF5IHBlcmlvZCAgIHxcbiAqIHwgIGQgIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgIHwgIEQgIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGUgIHwgTG9jYWwgZGF5IG9mIHdlZWsgICAgICAgICAgICAgIHwgIEUgIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGYgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEYqIHwgRGF5IG9mIHdlZWsgaW4gbW9udGggICAgICAgICAgIHxcbiAqIHwgIGcqIHwgTW9kaWZpZWQgSnVsaWFuIGRheSAgICAgICAgICAgIHwgIEcgIHwgRXJhICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGggIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgIHwgIEggIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGkhIHwgSVNPIGRheSBvZiB3ZWVrICAgICAgICAgICAgICAgIHwgIEkhIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgIHxcbiAqIHwgIGoqIHwgTG9jYWxpemVkIGhvdXIgdy8gZGF5IHBlcmlvZCAgIHwgIEoqIHwgTG9jYWxpemVkIGhvdXIgdy9vIGRheSBwZXJpb2QgIHxcbiAqIHwgIGsgIHwgSG91ciBbMS0yNF0gICAgICAgICAgICAgICAgICAgIHwgIEsgIHwgSG91ciBbMC0xMV0gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGwqIHwgKGRlcHJlY2F0ZWQpICAgICAgICAgICAgICAgICAgIHwgIEwgIHwgU3RhbmQtYWxvbmUgbW9udGggICAgICAgICAgICAgIHxcbiAqIHwgIG0gIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE0gIHwgTW9udGggICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG4gIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE4gIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG8hIHwgT3JkaW5hbCBudW1iZXIgbW9kaWZpZXIgICAgICAgIHwgIE8gIHwgVGltZXpvbmUgKEdNVCkgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHAhIHwgTG9uZyBsb2NhbGl6ZWQgdGltZSAgICAgICAgICAgIHwgIFAhIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgIHxcbiAqIHwgIHEgIHwgU3RhbmQtYWxvbmUgcXVhcnRlciAgICAgICAgICAgIHwgIFEgIHwgUXVhcnRlciAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHIqIHwgUmVsYXRlZCBHcmVnb3JpYW4geWVhciAgICAgICAgIHwgIFIhIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgIHxcbiAqIHwgIHMgIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgIHwgIFMgIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgIHxcbiAqIHwgIHQhIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgICAgIHwgIFQhIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgIHxcbiAqIHwgIHUgIHwgRXh0ZW5kZWQgeWVhciAgICAgICAgICAgICAgICAgIHwgIFUqIHwgQ3ljbGljIHllYXIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHYqIHwgVGltZXpvbmUgKGdlbmVyaWMgbm9uLWxvY2F0LikgIHwgIFYqIHwgVGltZXpvbmUgKGxvY2F0aW9uKSAgICAgICAgICAgIHxcbiAqIHwgIHcgIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgIHwgIFcqIHwgV2VlayBvZiBtb250aCAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHggIHwgVGltZXpvbmUgKElTTy04NjAxIHcvbyBaKSAgICAgIHwgIFggIHwgVGltZXpvbmUgKElTTy04NjAxKSAgICAgICAgICAgIHxcbiAqIHwgIHkgIHwgWWVhciAoYWJzKSAgICAgICAgICAgICAgICAgICAgIHwgIFkgIHwgTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciAgICAgIHxcbiAqIHwgIHogIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pIHwgIFoqIHwgVGltZXpvbmUgKGFsaWFzZXMpICAgICAgICAgICAgIHxcbiAqXG4gKiBMZXR0ZXJzIG1hcmtlZCBieSAqIGFyZSBub3QgaW1wbGVtZW50ZWQgYnV0IHJlc2VydmVkIGJ5IFVuaWNvZGUgc3RhbmRhcmQuXG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgISBhcmUgbm9uLXN0YW5kYXJkLCBidXQgaW1wbGVtZW50ZWQgYnkgZGF0ZS1mbnM6XG4gKiAtIGBvYCBtb2RpZmllcyB0aGUgcHJldmlvdXMgdG9rZW4gdG8gdHVybiBpdCBpbnRvIGFuIG9yZGluYWwgKHNlZSBgZm9ybWF0YCBkb2NzKVxuICogLSBgaWAgaXMgSVNPIGRheSBvZiB3ZWVrLiBGb3IgYGlgIGFuZCBgaWlgIGlzIHJldHVybnMgbnVtZXJpYyBJU08gd2VlayBkYXlzLFxuICogICBpLmUuIDcgZm9yIFN1bmRheSwgMSBmb3IgTW9uZGF5LCBldGMuXG4gKiAtIGBJYCBpcyBJU08gd2VlayBvZiB5ZWFyLCBhcyBvcHBvc2VkIHRvIGB3YCB3aGljaCBpcyBsb2NhbCB3ZWVrIG9mIHllYXIuXG4gKiAtIGBSYCBpcyBJU08gd2Vlay1udW1iZXJpbmcgeWVhciwgYXMgb3Bwb3NlZCB0byBgWWAgd2hpY2ggaXMgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhci5cbiAqICAgYFJgIGlzIHN1cHBvc2VkIHRvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgSWAgYW5kIGBpYFxuICogICBmb3IgdW5pdmVyc2FsIElTTyB3ZWVrLW51bWJlcmluZyBkYXRlLCB3aGVyZWFzXG4gKiAgIGBZYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYHdgIGFuZCBgZWBcbiAqICAgZm9yIHdlZWstbnVtYmVyaW5nIGRhdGUgc3BlY2lmaWMgdG8gdGhlIGxvY2FsZS5cbiAqIC0gYFBgIGlzIGxvbmcgbG9jYWxpemVkIGRhdGUgZm9ybWF0XG4gKiAtIGBwYCBpcyBsb25nIGxvY2FsaXplZCB0aW1lIGZvcm1hdFxuICovXG5cbnZhciBmb3JtYXR0ZXJzID0ge1xuICAvLyBFcmFcbiAgRzogZnVuY3Rpb24gRyhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgZXJhID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpID4gMCA/IDEgOiAwO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEFELCBCQ1xuICAgICAgY2FzZSAnRyc6XG4gICAgICBjYXNlICdHRyc6XG4gICAgICBjYXNlICdHR0cnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnXG4gICAgICAgIH0pO1xuICAgICAgLy8gQSwgQlxuICAgICAgY2FzZSAnR0dHR0cnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93J1xuICAgICAgICB9KTtcbiAgICAgIC8vIEFubm8gRG9taW5pLCBCZWZvcmUgQ2hyaXN0XG4gICAgICBjYXNlICdHR0dHJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIFllYXJcbiAgeTogZnVuY3Rpb24geShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gJ3lvJykge1xuICAgICAgdmFyIHNpZ25lZFllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgICAgdmFyIHllYXIgPSBzaWduZWRZZWFyID4gMCA/IHNpZ25lZFllYXIgOiAxIC0gc2lnbmVkWWVhcjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHllYXIsIHtcbiAgICAgICAgdW5pdDogJ3llYXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy55KGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhclxuICBZOiBmdW5jdGlvbiBZKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBzaWduZWRXZWVrWWVhciA9IGdldFVUQ1dlZWtZZWFyKGRhdGUsIG9wdGlvbnMpO1xuICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgdmFyIHdlZWtZZWFyID0gc2lnbmVkV2Vla1llYXIgPiAwID8gc2lnbmVkV2Vla1llYXIgOiAxIC0gc2lnbmVkV2Vla1llYXI7XG5cbiAgICAvLyBUd28gZGlnaXQgeWVhclxuICAgIGlmICh0b2tlbiA9PT0gJ1lZJykge1xuICAgICAgdmFyIHR3b0RpZ2l0WWVhciA9IHdlZWtZZWFyICUgMTAwO1xuICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0d29EaWdpdFllYXIsIDIpO1xuICAgIH1cblxuICAgIC8vIE9yZGluYWwgbnVtYmVyXG4gICAgaWYgKHRva2VuID09PSAnWW8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrWWVhciwge1xuICAgICAgICB1bml0OiAneWVhcidcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFBhZGRpbmdcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWtZZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICBSOiBmdW5jdGlvbiBSKGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIGlzb1dlZWtZZWFyID0gZ2V0VVRDSVNPV2Vla1llYXIoZGF0ZSk7XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29XZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRXh0ZW5kZWQgeWVhci4gVGhpcyBpcyBhIHNpbmdsZSBudW1iZXIgZGVzaWduYXRpbmcgdGhlIHllYXIgb2YgdGhpcyBjYWxlbmRhciBzeXN0ZW0uXG4gIC8vIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBsb2NhbGl6ZXJzIGFyZSBCLkMuIHllYXJzOlxuICAvLyB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICAvLyB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICAvLyB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICAvLyB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICAvLyB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICAvLyBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gIC8vIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZC5cbiAgdTogZnVuY3Rpb24gdShkYXRlLCB0b2tlbikge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoeWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gUXVhcnRlclxuICBROiBmdW5jdGlvbiBRKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgJ1EnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgJ1FRJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhxdWFydGVyLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAzcmQsIDR0aFxuICAgICAgY2FzZSAnUW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7XG4gICAgICAgICAgdW5pdDogJ3F1YXJ0ZXInXG4gICAgICAgIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgJ1FRUSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyAxLCAyLCAzLCA0IChuYXJyb3cgcXVhcnRlcjsgY291bGQgYmUgbm90IG51bWVyaWNhbClcbiAgICAgIGNhc2UgJ1FRUVFRJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSAnUVFRUSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBTdGFuZC1hbG9uZSBxdWFydGVyXG4gIHE6IGZ1bmN0aW9uIHEoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIHF1YXJ0ZXIgPSBNYXRoLmNlaWwoKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpIC8gMyk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgMywgNFxuICAgICAgY2FzZSAncSc6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSAncXEnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlICdxbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB1bml0OiAncXVhcnRlcidcbiAgICAgICAgfSk7XG4gICAgICAvLyBRMSwgUTIsIFEzLCBRNFxuICAgICAgY2FzZSAncXFxJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSAncXFxcXEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlICdxcXFxJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIE1vbnRoXG4gIE06IGZ1bmN0aW9uIE0oZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ00nOlxuICAgICAgY2FzZSAnTU0nOlxuICAgICAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLk0oZGF0ZSwgdG9rZW4pO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgMTJ0aFxuICAgICAgY2FzZSAnTW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihtb250aCArIDEsIHtcbiAgICAgICAgICB1bml0OiAnbW9udGgnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFuLCBGZWIsIC4uLiwgRGVjXG4gICAgICBjYXNlICdNTU0nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBKLCBGLCAuLi4sIERcbiAgICAgIGNhc2UgJ01NTU1NJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlICdNTU1NJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gU3RhbmQtYWxvbmUgbW9udGhcbiAgTDogZnVuY3Rpb24gTChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgLi4uLCAxMlxuICAgICAgY2FzZSAnTCc6XG4gICAgICAgIHJldHVybiBTdHJpbmcobW9udGggKyAxKTtcbiAgICAgIC8vIDAxLCAwMiwgLi4uLCAxMlxuICAgICAgY2FzZSAnTEwnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlICdMbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKG1vbnRoICsgMSwge1xuICAgICAgICAgIHVuaXQ6ICdtb250aCdcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW4sIEZlYiwgLi4uLCBEZWNcbiAgICAgIGNhc2UgJ0xMTCc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSAnTExMTEwnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgICAgIGNhc2UgJ0xMTEwnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbCB3ZWVrIG9mIHllYXJcbiAgdzogZnVuY3Rpb24gdyhkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgd2VlayA9IGdldFVUQ1dlZWsoZGF0ZSwgb3B0aW9ucyk7XG4gICAgaWYgKHRva2VuID09PSAnd28nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrLCB7XG4gICAgICAgIHVuaXQ6ICd3ZWVrJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3Mod2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSVNPIHdlZWsgb2YgeWVhclxuICBJOiBmdW5jdGlvbiBJKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBpc29XZWVrID0gZ2V0VVRDSVNPV2VlayhkYXRlKTtcbiAgICBpZiAodG9rZW4gPT09ICdJbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGlzb1dlZWssIHtcbiAgICAgICAgdW5pdDogJ3dlZWsnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29XZWVrLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBEYXkgb2YgdGhlIG1vbnRoXG4gIGQ6IGZ1bmN0aW9uIGQoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnZG8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFVUQ0RhdGUoKSwge1xuICAgICAgICB1bml0OiAnZGF0ZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLmQoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBEYXkgb2YgeWVhclxuICBEOiBmdW5jdGlvbiBEKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBkYXlPZlllYXIgPSBnZXRVVENEYXlPZlllYXIoZGF0ZSk7XG4gICAgaWYgKHRva2VuID09PSAnRG8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXlPZlllYXIsIHtcbiAgICAgICAgdW5pdDogJ2RheU9mWWVhcidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRheU9mWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHdlZWtcbiAgRTogZnVuY3Rpb24gRShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgZGF5T2ZXZWVrID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgY2FzZSAnRUUnOlxuICAgICAgY2FzZSAnRUVFJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdFRUVFRSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdFRUVFRUUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ0VFRUUnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsIGRheSBvZiB3ZWVrXG4gIGU6IGZ1bmN0aW9uIGUoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgdmFyIGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChOdGggZGF5IG9mIHdlZWsgd2l0aCBjdXJyZW50IGxvY2FsZSBvciB3ZWVrU3RhcnRzT24pXG4gICAgICBjYXNlICdlJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlICdlZSc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgN3RoXG4gICAgICBjYXNlICdlbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGxvY2FsRGF5T2ZXZWVrLCB7XG4gICAgICAgICAgdW5pdDogJ2RheSdcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdlZWUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgJ2VlZWVlJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgJ2VlZWVlZSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdzaG9ydCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSAnZWVlZSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gU3RhbmQtYWxvbmUgbG9jYWwgZGF5IG9mIHdlZWtcbiAgYzogZnVuY3Rpb24gYyhkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGF5T2ZXZWVrID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgICB2YXIgbG9jYWxEYXlPZldlZWsgPSAoZGF5T2ZXZWVrIC0gb3B0aW9ucy53ZWVrU3RhcnRzT24gKyA4KSAlIDcgfHwgNztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBOdW1lcmljYWwgdmFsdWUgKHNhbWUgYXMgaW4gYGVgKVxuICAgICAgY2FzZSAnYyc6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSAnY2MnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGxvY2FsRGF5T2ZXZWVrLCB0b2tlbi5sZW5ndGgpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgN3RoXG4gICAgICBjYXNlICdjbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGxvY2FsRGF5T2ZXZWVrLCB7XG4gICAgICAgICAgdW5pdDogJ2RheSdcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdjY2MnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgJ2NjY2NjJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgJ2NjY2NjYyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdzaG9ydCcsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSAnY2NjYyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gSVNPIGRheSBvZiB3ZWVrXG4gIGk6IGZ1bmN0aW9uIGkoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgdmFyIGlzb0RheU9mV2VlayA9IGRheU9mV2VlayA9PT0gMCA/IDcgOiBkYXlPZldlZWs7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMlxuICAgICAgY2FzZSAnaSc6XG4gICAgICAgIHJldHVybiBTdHJpbmcoaXNvRGF5T2ZXZWVrKTtcbiAgICAgIC8vIDAyXG4gICAgICBjYXNlICdpaSc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvRGF5T2ZXZWVrLCB0b2tlbi5sZW5ndGgpO1xuICAgICAgLy8gMm5kXG4gICAgICBjYXNlICdpbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGlzb0RheU9mV2Vlaywge1xuICAgICAgICAgIHVuaXQ6ICdkYXknXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlXG4gICAgICBjYXNlICdpaWknOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgJ2lpaWlpJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgJ2lpaWlpaSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdzaG9ydCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSAnaWlpaSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gQU0gb3IgUE1cbiAgYTogZnVuY3Rpb24gYShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgdmFyIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/ICdwbScgOiAnYW0nO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgY2FzZSAnYWEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2FhYSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlICdhYWFhYSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2FhYWEnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIEFNLCBQTSwgbWlkbmlnaHQsIG5vb25cbiAgYjogZnVuY3Rpb24gYihkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgdmFyIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5taWRuaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gaG91cnMgLyAxMiA+PSAxID8gJ3BtJyA6ICdhbSc7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ2InOlxuICAgICAgY2FzZSAnYmInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2JiYic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlICdiYmJiYic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2JiYmInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIGluIHRoZSBtb3JuaW5nLCBpbiB0aGUgYWZ0ZXJub29uLCBpbiB0aGUgZXZlbmluZywgYXQgbmlnaHRcbiAgQjogZnVuY3Rpb24gQihkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgdmFyIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICBpZiAoaG91cnMgPj0gMTcpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0uZXZlbmluZztcbiAgICB9IGVsc2UgaWYgKGhvdXJzID49IDEyKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmFmdGVybm9vbjtcbiAgICB9IGVsc2UgaWYgKGhvdXJzID49IDQpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubW9ybmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5uaWdodDtcbiAgICB9XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnQic6XG4gICAgICBjYXNlICdCQic6XG4gICAgICBjYXNlICdCQkInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ0JCQkJCJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnQkJCQic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gSG91ciBbMS0xMl1cbiAgaDogZnVuY3Rpb24gaChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdobycpIHtcbiAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKSAlIDEyO1xuICAgICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDEyO1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5oKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gSChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdIbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDSG91cnMoKSwge1xuICAgICAgICB1bml0OiAnaG91cidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLkgoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBIb3VyIFswLTExXVxuICBLOiBmdW5jdGlvbiBLKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKSAlIDEyO1xuICAgIGlmICh0b2tlbiA9PT0gJ0tvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhob3VycywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSG91ciBbMS0yNF1cbiAgazogZnVuY3Rpb24gayhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDI0O1xuICAgIGlmICh0b2tlbiA9PT0gJ2tvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhob3VycywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gTWludXRlXG4gIG06IGZ1bmN0aW9uIG0oZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnbW8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFVUQ01pbnV0ZXMoKSwge1xuICAgICAgICB1bml0OiAnbWludXRlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMubShkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiBzKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ3NvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENTZWNvbmRzKCksIHtcbiAgICAgICAgdW5pdDogJ3NlY29uZCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLnMoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUzogZnVuY3Rpb24gUyhkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuUyhkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIFRpbWV6b25lIChJU08tODYwMS4gSWYgb2Zmc2V0IGlzIDAsIG91dHB1dCBpcyBhbHdheXMgYCdaJ2ApXG4gIFg6IGZ1bmN0aW9uIFgoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICBpZiAodGltZXpvbmVPZmZzZXQgPT09IDApIHtcbiAgICAgIHJldHVybiAnWic7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEhvdXJzIGFuZCBvcHRpb25hbCBtaW51dGVzXG4gICAgICBjYXNlICdYJzpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYYFxuICAgICAgY2FzZSAnWFhYWCc6XG4gICAgICBjYXNlICdYWCc6XG4gICAgICAgIC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWFhgXG4gICAgICBjYXNlICdYWFhYWCc6XG4gICAgICBjYXNlICdYWFgnOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICB9XG4gIH0sXG4gIC8vIFRpbWV6b25lIChJU08tODYwMS4gSWYgb2Zmc2V0IGlzIDAsIG91dHB1dCBpcyBgJyswMDowMCdgIG9yIGVxdWl2YWxlbnQpXG4gIHg6IGZ1bmN0aW9uIHgoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBIb3VycyBhbmQgb3B0aW9uYWwgbWludXRlc1xuICAgICAgY2FzZSAneCc6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eGBcbiAgICAgIGNhc2UgJ3h4eHgnOlxuICAgICAgY2FzZSAneHgnOlxuICAgICAgICAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgeHh4YFxuICAgICAgY2FzZSAneHh4eHgnOlxuICAgICAgY2FzZSAneHh4JzogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBUaW1lem9uZSAoR01UKVxuICBPOiBmdW5jdGlvbiBPKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgJ08nOlxuICAgICAgY2FzZSAnT08nOlxuICAgICAgY2FzZSAnT09PJzpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmVTaG9ydCh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICAgIC8vIExvbmdcbiAgICAgIGNhc2UgJ09PT08nOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0aW9uKVxuICB6OiBmdW5jdGlvbiB6KGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgJ3onOlxuICAgICAgY2FzZSAnenonOlxuICAgICAgY2FzZSAnenp6JzpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmVTaG9ydCh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICAgIC8vIExvbmdcbiAgICAgIGNhc2UgJ3p6enonOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcFxuICB0OiBmdW5jdGlvbiB0KGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWVzdGFtcCA9IE1hdGguZmxvb3Iob3JpZ2luYWxEYXRlLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModGltZXN0YW1wLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gIFQ6IGZ1bmN0aW9uIFQoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXN0YW1wID0gb3JpZ2luYWxEYXRlLmdldFRpbWUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lU2hvcnQob2Zmc2V0LCBkaXJ0eURlbGltaXRlcikge1xuICB2YXIgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKyc7XG4gIHZhciBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKTtcbiAgdmFyIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MDtcbiAgaWYgKG1pbnV0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gc2lnbiArIFN0cmluZyhob3Vycyk7XG4gIH1cbiAgdmFyIGRlbGltaXRlciA9IGRpcnR5RGVsaW1pdGVyIHx8ICcnO1xuICByZXR1cm4gc2lnbiArIFN0cmluZyhob3VycykgKyBkZWxpbWl0ZXIgKyBhZGRMZWFkaW5nWmVyb3MobWludXRlcywgMik7XG59XG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMob2Zmc2V0LCBkaXJ0eURlbGltaXRlcikge1xuICBpZiAob2Zmc2V0ICUgNjAgPT09IDApIHtcbiAgICB2YXIgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKyc7XG4gICAgcmV0dXJuIHNpZ24gKyBhZGRMZWFkaW5nWmVyb3MoTWF0aC5hYnMob2Zmc2V0KSAvIDYwLCAyKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkaXJ0eURlbGltaXRlcik7XG59XG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZShvZmZzZXQsIGRpcnR5RGVsaW1pdGVyKSB7XG4gIHZhciBkZWxpbWl0ZXIgPSBkaXJ0eURlbGltaXRlciB8fCAnJztcbiAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnO1xuICB2YXIgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgdmFyIGhvdXJzID0gYWRkTGVhZGluZ1plcm9zKE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLCAyKTtcbiAgdmFyIG1pbnV0ZXMgPSBhZGRMZWFkaW5nWmVyb3MoYWJzT2Zmc2V0ICUgNjAsIDIpO1xuICByZXR1cm4gc2lnbiArIGhvdXJzICsgZGVsaW1pdGVyICsgbWludXRlcztcbn1cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7IiwidmFyIGRhdGVMb25nRm9ybWF0dGVyID0gZnVuY3Rpb24gZGF0ZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZykge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlICdQJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgY2FzZSAnUFAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnbWVkaXVtJ1xuICAgICAgfSk7XG4gICAgY2FzZSAnUFBQJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ2xvbmcnXG4gICAgICB9KTtcbiAgICBjYXNlICdQUFBQJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICB9XG59O1xudmFyIHRpbWVMb25nRm9ybWF0dGVyID0gZnVuY3Rpb24gdGltZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZykge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlICdwJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgY2FzZSAncHAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnbWVkaXVtJ1xuICAgICAgfSk7XG4gICAgY2FzZSAncHBwJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ2xvbmcnXG4gICAgICB9KTtcbiAgICBjYXNlICdwcHBwJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICB9XG59O1xudmFyIGRhdGVUaW1lTG9uZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uIGRhdGVUaW1lTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKSB7XG4gIHZhciBtYXRjaFJlc3VsdCA9IHBhdHRlcm4ubWF0Y2goLyhQKykocCspPy8pIHx8IFtdO1xuICB2YXIgZGF0ZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsxXTtcbiAgdmFyIHRpbWVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMl07XG4gIGlmICghdGltZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZGF0ZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZyk7XG4gIH1cbiAgdmFyIGRhdGVUaW1lRm9ybWF0O1xuICBzd2l0Y2ggKGRhdGVQYXR0ZXJuKSB7XG4gICAgY2FzZSAnUCc6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQUCc6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ21lZGl1bSdcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUFBQJzpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnbG9uZydcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUFBQUCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGRhdGVUaW1lRm9ybWF0LnJlcGxhY2UoJ3t7ZGF0ZX19JywgZGF0ZUxvbmdGb3JtYXR0ZXIoZGF0ZVBhdHRlcm4sIGZvcm1hdExvbmcpKS5yZXBsYWNlKCd7e3RpbWV9fScsIHRpbWVMb25nRm9ybWF0dGVyKHRpbWVQYXR0ZXJuLCBmb3JtYXRMb25nKSk7XG59O1xudmFyIGxvbmdGb3JtYXR0ZXJzID0ge1xuICBwOiB0aW1lTG9uZ0Zvcm1hdHRlcixcbiAgUDogZGF0ZVRpbWVMb25nRm9ybWF0dGVyXG59O1xuZXhwb3J0IGRlZmF1bHQgbG9uZ0Zvcm1hdHRlcnM7IiwiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgdmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKSk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59IiwidmFyIHByb3RlY3RlZERheU9mWWVhclRva2VucyA9IFsnRCcsICdERCddO1xudmFyIHByb3RlY3RlZFdlZWtZZWFyVG9rZW5zID0gWydZWScsICdZWVlZJ107XG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gcHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHByb3RlY3RlZFdlZWtZZWFyVG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd1Byb3RlY3RlZEVycm9yKHRva2VuLCBmb3JtYXQsIGlucHV0KSB7XG4gIGlmICh0b2tlbiA9PT0gJ1lZWVknKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJVc2UgYHl5eXlgIGluc3RlYWQgb2YgYFlZWVlgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyB5ZWFycyB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ1lZJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGB5eWAgaW5zdGVhZCBvZiBgWVlgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyB5ZWFycyB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ0QnKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJVc2UgYGRgIGluc3RlYWQgb2YgYERgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ0REJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGBkZGAgaW5zdGVhZCBvZiBgRERgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfVxufSIsInZhciBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIHNlY29uZCcsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIHhTZWNvbmRzOiB7XG4gICAgb25lOiAnMSBzZWNvbmQnLFxuICAgIG90aGVyOiAne3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIGhhbGZBTWludXRlOiAnaGFsZiBhIG1pbnV0ZScsXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBtaW51dGUnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICB4TWludXRlczoge1xuICAgIG9uZTogJzEgbWludXRlJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgaG91cicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhIb3Vyczoge1xuICAgIG9uZTogJzEgaG91cicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhEYXlzOiB7XG4gICAgb25lOiAnMSBkYXknLFxuICAgIG90aGVyOiAne3tjb3VudH19IGRheXMnXG4gIH0sXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiAnYWJvdXQgMSB3ZWVrJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgeFdlZWtzOiB7XG4gICAgb25lOiAnMSB3ZWVrJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgYWJvdXRYTW9udGhzOiB7XG4gICAgb25lOiAnYWJvdXQgMSBtb250aCcsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICB4TW9udGhzOiB7XG4gICAgb25lOiAnMSBtb250aCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIHhZZWFyczoge1xuICAgIG9uZTogJzEgeWVhcicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6ICdvdmVyIDEgeWVhcicsXG4gICAgb3RoZXI6ICdvdmVyIHt7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiAnYWxtb3N0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhbG1vc3Qge3tjb3VudH19IHllYXJzJ1xuICB9XG59O1xudmFyIGZvcm1hdERpc3RhbmNlID0gZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2UodG9rZW4sIGNvdW50LCBvcHRpb25zKSB7XG4gIHZhciByZXN1bHQ7XG4gIHZhciB0b2tlblZhbHVlID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dO1xuICBpZiAodHlwZW9mIHRva2VuVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub25lO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub3RoZXIucmVwbGFjZSgne3tjb3VudH19JywgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gJ2luICcgKyByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQgKyAnIGFnbyc7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0RGlzdGFuY2U7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAvLyBUT0RPOiBSZW1vdmUgU3RyaW5nKClcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgdmFyIGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufSIsImltcG9ydCBidWlsZEZvcm1hdExvbmdGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qc1wiO1xudmFyIGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiAnRUVFRSwgTU1NTSBkbywgeScsXG4gIGxvbmc6ICdNTU1NIGRvLCB5JyxcbiAgbWVkaXVtOiAnTU1NIGQsIHknLFxuICBzaG9ydDogJ01NL2RkL3l5eXknXG59O1xudmFyIHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiAnaDptbTpzcyBhIHp6enonLFxuICBsb25nOiAnaDptbTpzcyBhIHonLFxuICBtZWRpdW06ICdoOm1tOnNzIGEnLFxuICBzaG9ydDogJ2g6bW0gYSdcbn07XG52YXIgZGF0ZVRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbG9uZzogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIG1lZGl1bTogJ3t7ZGF0ZX19LCB7e3RpbWV9fScsXG4gIHNob3J0OiAne3tkYXRlfX0sIHt7dGltZX19J1xufTtcbnZhciBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIHRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiB0aW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KSxcbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXRMb25nOyIsInZhciBmb3JtYXRSZWxhdGl2ZUxvY2FsZSA9IHtcbiAgbGFzdFdlZWs6IFwiJ2xhc3QnIGVlZWUgJ2F0JyBwXCIsXG4gIHllc3RlcmRheTogXCIneWVzdGVyZGF5IGF0JyBwXCIsXG4gIHRvZGF5OiBcIid0b2RheSBhdCcgcFwiLFxuICB0b21vcnJvdzogXCIndG9tb3Jyb3cgYXQnIHBcIixcbiAgbmV4dFdlZWs6IFwiZWVlZSAnYXQnIHBcIixcbiAgb3RoZXI6ICdQJ1xufTtcbnZhciBmb3JtYXRSZWxhdGl2ZSA9IGZ1bmN0aW9uIGZvcm1hdFJlbGF0aXZlKHRva2VuLCBfZGF0ZSwgX2Jhc2VEYXRlLCBfb3B0aW9ucykge1xuICByZXR1cm4gZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdFJlbGF0aXZlOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlJbmRleCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiAnc3RhbmRhbG9uZSc7XG4gICAgdmFyIHZhbHVlc0FycmF5O1xuICAgIGlmIChjb250ZXh0ID09PSAnZm9ybWF0dGluZycgJiYgYXJncy5mb3JtYXR0aW5nVmFsdWVzKSB7XG4gICAgICB2YXIgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIHx8IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFyIHdpZHRoID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGRlZmF1bHRXaWR0aDtcbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy5mb3JtYXR0aW5nVmFsdWVzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9kZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhciBfd2lkdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW193aWR0aF0gfHwgYXJncy52YWx1ZXNbX2RlZmF1bHRXaWR0aF07XG4gICAgfVxuICAgIHZhciBpbmRleCA9IGFyZ3MuYXJndW1lbnRDYWxsYmFjayA/IGFyZ3MuYXJndW1lbnRDYWxsYmFjayhkaXJ0eUluZGV4KSA6IGRpcnR5SW5kZXg7XG4gICAgLy8gQHRzLWlnbm9yZTogRm9yIHNvbWUgcmVhc29uIFR5cGVTY3JpcHQganVzdCBkb24ndCB3YW50IHRvIG1hdGNoIGl0LCBubyBtYXR0ZXIgaG93IGhhcmQgd2UgdHJ5LiBJIGNoYWxsZW5nZSB5b3UgdG8gdHJ5IHRvIHJlbW92ZSBpdCFcbiAgICByZXR1cm4gdmFsdWVzQXJyYXlbaW5kZXhdO1xuICB9O1xufSIsImltcG9ydCBidWlsZExvY2FsaXplRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzXCI7XG52YXIgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnQicsICdBJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0JDJywgJ0FEJ10sXG4gIHdpZGU6IFsnQmVmb3JlIENocmlzdCcsICdBbm5vIERvbWluaSddXG59O1xudmFyIHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWycxJywgJzInLCAnMycsICc0J10sXG4gIGFiYnJldmlhdGVkOiBbJ1ExJywgJ1EyJywgJ1EzJywgJ1E0J10sXG4gIHdpZGU6IFsnMXN0IHF1YXJ0ZXInLCAnMm5kIHF1YXJ0ZXInLCAnM3JkIHF1YXJ0ZXInLCAnNHRoIHF1YXJ0ZXInXVxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxudmFyIG1vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgd2lkZTogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ11cbn07XG52YXIgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxuICBzaG9ydDogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICBhYmJyZXZpYXRlZDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgd2lkZTogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG59O1xudmFyIGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06ICdhJyxcbiAgICBwbTogJ3AnLFxuICAgIG1pZG5pZ2h0OiAnbWknLFxuICAgIG5vb246ICduJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogJ0FNJyxcbiAgICBwbTogJ1BNJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogJ2EubS4nLFxuICAgIHBtOiAncC5tLicsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9XG59O1xudmFyIGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiAnYScsXG4gICAgcG06ICdwJyxcbiAgICBtaWRuaWdodDogJ21pJyxcbiAgICBub29uOiAnbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06ICdBTScsXG4gICAgcG06ICdQTScsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9LFxuICB3aWRlOiB7XG4gICAgYW06ICdhLm0uJyxcbiAgICBwbTogJ3AubS4nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfVxufTtcbnZhciBvcmRpbmFsTnVtYmVyID0gZnVuY3Rpb24gb3JkaW5hbE51bWJlcihkaXJ0eU51bWJlciwgX29wdGlvbnMpIHtcbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgLy8gSWYgb3JkaW5hbCBudW1iZXJzIGRlcGVuZCBvbiBjb250ZXh0LCBmb3IgZXhhbXBsZSxcbiAgLy8gaWYgdGhleSBhcmUgZGlmZmVyZW50IGZvciBkaWZmZXJlbnQgZ3JhbW1hdGljYWwgZ2VuZGVycyxcbiAgLy8gdXNlIGBvcHRpb25zLnVuaXRgLlxuICAvL1xuICAvLyBgdW5pdGAgY2FuIGJlICd5ZWFyJywgJ3F1YXJ0ZXInLCAnbW9udGgnLCAnd2VlaycsICdkYXRlJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJy5cblxuICB2YXIgcmVtMTAwID0gbnVtYmVyICUgMTAwO1xuICBpZiAocmVtMTAwID4gMjAgfHwgcmVtMTAwIDwgMTApIHtcbiAgICBzd2l0Y2ggKHJlbTEwMCAlIDEwKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAnc3QnO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ25kJztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdyZCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBudW1iZXIgKyAndGgnO1xufTtcbnZhciBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcjogb3JkaW5hbE51bWJlcixcbiAgZXJhOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZXJhVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBhcmd1bWVudENhbGxiYWNrOiBmdW5jdGlvbiBhcmd1bWVudENhbGxiYWNrKHF1YXJ0ZXIpIHtcbiAgICAgIHJldHVybiBxdWFydGVyIC0gMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IG1vbnRoVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRGb3JtYXR0aW5nV2lkdGg6ICd3aWRlJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsaXplOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgdmFyIG1hdGNoUGF0dGVybiA9IHdpZHRoICYmIGFyZ3MubWF0Y2hQYXR0ZXJuc1t3aWR0aF0gfHwgYXJncy5tYXRjaFBhdHRlcm5zW2FyZ3MuZGVmYXVsdE1hdGNoV2lkdGhdO1xuICAgIHZhciBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChtYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVBhdHRlcm5zID0gd2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG4gICAgdmFyIGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucykgPyBmaW5kSW5kZXgocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSkgOiBmaW5kS2V5KHBhcnNlUGF0dGVybnMsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpO1xuICAgIH0pO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhrZXkpIDoga2V5O1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59XG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkgJiYgcHJlZGljYXRlKG9iamVjdFtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIHZhciBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgdmFyIHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2socGFyc2VSZXN1bHRbMF0pIDogcGFyc2VSZXN1bHRbMF07XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG4gICAgdmFyIHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZXN0OiByZXN0XG4gICAgfTtcbiAgfTtcbn0iLCJpbXBvcnQgYnVpbGRNYXRjaEZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hGbi9pbmRleC5qc1wiO1xuaW1wb3J0IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qc1wiO1xudmFyIG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2k7XG52YXIgcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9cXGQrL2k7XG52YXIgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihifGEpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihiXFwuP1xccz9jXFwuP3xiXFwuP1xccz9jXFwuP1xccz9lXFwuP3xhXFwuP1xccz9kXFwuP3xjXFwuP1xccz9lXFwuPykvaSxcbiAgd2lkZTogL14oYmVmb3JlIGNocmlzdHxiZWZvcmUgY29tbW9uIGVyYXxhbm5vIGRvbWluaXxjb21tb24gZXJhKS9pXG59O1xudmFyIHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9eYi9pLCAvXihhfGMpL2ldXG59O1xudmFyIG1hdGNoUXVhcnRlclBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eWzEyMzRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXnFbMTIzNF0vaSxcbiAgd2lkZTogL15bMTIzNF0odGh8c3R8bmR8cmQpPyBxdWFydGVyL2lcbn07XG52YXIgcGFyc2VRdWFydGVyUGF0dGVybnMgPSB7XG4gIGFueTogWy8xL2ksIC8yL2ksIC8zL2ksIC80L2ldXG59O1xudmFyIG1hdGNoTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltqZm1hc29uZF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGphbnxmZWJ8bWFyfGFwcnxtYXl8anVufGp1bHxhdWd8c2VwfG9jdHxub3Z8ZGVjKS9pLFxuICB3aWRlOiAvXihqYW51YXJ5fGZlYnJ1YXJ5fG1hcmNofGFwcmlsfG1heXxqdW5lfGp1bHl8YXVndXN0fHNlcHRlbWJlcnxvY3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyKS9pXG59O1xudmFyIHBhcnNlTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15qL2ksIC9eZi9pLCAvXm0vaSwgL15hL2ksIC9ebS9pLCAvXmovaSwgL15qL2ksIC9eYS9pLCAvXnMvaSwgL15vL2ksIC9ebi9pLCAvXmQvaV0sXG4gIGFueTogWy9eamEvaSwgL15mL2ksIC9ebWFyL2ksIC9eYXAvaSwgL15tYXkvaSwgL15qdW4vaSwgL15qdWwvaSwgL15hdS9pLCAvXnMvaSwgL15vL2ksIC9ebi9pLCAvXmQvaV1cbn07XG52YXIgbWF0Y2hEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltzbXR3Zl0vaSxcbiAgc2hvcnQ6IC9eKHN1fG1vfHR1fHdlfHRofGZyfHNhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oc3VufG1vbnx0dWV8d2VkfHRodXxmcml8c2F0KS9pLFxuICB3aWRlOiAvXihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSkvaVxufTtcbnZhciBwYXJzZURheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXnMvaSwgL15tL2ksIC9edC9pLCAvXncvaSwgL150L2ksIC9eZi9pLCAvXnMvaV0sXG4gIGFueTogWy9ec3UvaSwgL15tL2ksIC9edHUvaSwgL153L2ksIC9edGgvaSwgL15mL2ksIC9ec2EvaV1cbn07XG52YXIgbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihhfHB8bWl8bnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2ksXG4gIGFueTogL14oW2FwXVxcLj9cXHM/bVxcLj98bWlkbmlnaHR8bm9vbnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2lcbn07XG52YXIgcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgYW55OiB7XG4gICAgYW06IC9eYS9pLFxuICAgIHBtOiAvXnAvaSxcbiAgICBtaWRuaWdodDogL15taS9pLFxuICAgIG5vb246IC9ebm8vaSxcbiAgICBtb3JuaW5nOiAvbW9ybmluZy9pLFxuICAgIGFmdGVybm9vbjogL2FmdGVybm9vbi9pLFxuICAgIGV2ZW5pbmc6IC9ldmVuaW5nL2ksXG4gICAgbmlnaHQ6IC9uaWdodC9pXG4gIH1cbn07XG52YXIgbWF0Y2ggPSB7XG4gIG9yZGluYWxOdW1iZXI6IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oe1xuICAgIG1hdGNoUGF0dGVybjogbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICBwYXJzZVBhdHRlcm46IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gdmFsdWVDYWxsYmFjayh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgfVxuICB9KSxcbiAgZXJhOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KSxcbiAgcXVhcnRlcjogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55JyxcbiAgICB2YWx1ZUNhbGxiYWNrOiBmdW5jdGlvbiB2YWx1ZUNhbGxiYWNrKGluZGV4KSB7XG4gICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgIH1cbiAgfSksXG4gIG1vbnRoOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnYW55JyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IG1hdGNoOyIsImltcG9ydCBmb3JtYXREaXN0YW5jZSBmcm9tIFwiLi9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0TG9uZyBmcm9tIFwiLi9fbGliL2Zvcm1hdExvbmcvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXRSZWxhdGl2ZSBmcm9tIFwiLi9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9jYWxpemUgZnJvbSBcIi4vX2xpYi9sb2NhbGl6ZS9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoIGZyb20gXCIuL19saWIvbWF0Y2gvaW5kZXguanNcIjtcbi8qKlxuICogQHR5cGUge0xvY2FsZX1cbiAqIEBjYXRlZ29yeSBMb2NhbGVzXG4gKiBAc3VtbWFyeSBFbmdsaXNoIGxvY2FsZSAoVW5pdGVkIFN0YXRlcykuXG4gKiBAbGFuZ3VhZ2UgRW5nbGlzaFxuICogQGlzby02MzktMiBlbmdcbiAqIEBhdXRob3IgU2FzaGEgS29zcyBbQGtvc3Nub2NvcnBde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9rb3Nzbm9jb3JwfVxuICogQGF1dGhvciBMZXNoYSBLb3NzIFtAbGVzaGFrb3NzXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbGVzaGFrb3NzfVxuICovXG52YXIgbG9jYWxlID0ge1xuICBjb2RlOiAnZW4tVVMnLFxuICBmb3JtYXREaXN0YW5jZTogZm9ybWF0RGlzdGFuY2UsXG4gIGZvcm1hdExvbmc6IGZvcm1hdExvbmcsXG4gIGZvcm1hdFJlbGF0aXZlOiBmb3JtYXRSZWxhdGl2ZSxcbiAgbG9jYWxpemU6IGxvY2FsaXplLFxuICBtYXRjaDogbWF0Y2gsXG4gIG9wdGlvbnM6IHtcbiAgICB3ZWVrU3RhcnRzT246IDAgLyogU3VuZGF5ICovLFxuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogMVxuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9jYWxlOyIsImltcG9ydCBpc1ZhbGlkIGZyb20gXCIuLi9pc1ZhbGlkL2luZGV4LmpzXCI7XG5pbXBvcnQgc3ViTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9zdWJNaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGZvcm1hdHRlcnMgZnJvbSBcIi4uL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMvaW5kZXguanNcIjtcbmltcG9ydCBsb25nRm9ybWF0dGVycyBmcm9tIFwiLi4vX2xpYi9mb3JtYXQvbG9uZ0Zvcm1hdHRlcnMvaW5kZXguanNcIjtcbmltcG9ydCBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4sIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbiwgdGhyb3dQcm90ZWN0ZWRFcnJvciB9IGZyb20gXCIuLi9fbGliL3Byb3RlY3RlZFRva2Vucy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9fbGliL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5pbXBvcnQgZGVmYXVsdExvY2FsZSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0TG9jYWxlL2luZGV4LmpzXCI7IC8vIFRoaXMgUmVnRXhwIGNvbnNpc3RzIG9mIHRocmVlIHBhcnRzIHNlcGFyYXRlZCBieSBgfGA6XG4vLyAtIFt5WVFxTUx3SWREZWNpaEhLa21zXW8gbWF0Y2hlcyBhbnkgYXZhaWxhYmxlIG9yZGluYWwgbnVtYmVyIHRva2VuXG4vLyAgIChvbmUgb2YgdGhlIGNlcnRhaW4gbGV0dGVycyBmb2xsb3dlZCBieSBgb2ApXG4vLyAtIChcXHcpXFwxKiBtYXRjaGVzIGFueSBzZXF1ZW5jZXMgb2YgdGhlIHNhbWUgbGV0dGVyXG4vLyAtICcnIG1hdGNoZXMgdHdvIHF1b3RlIGNoYXJhY3RlcnMgaW4gYSByb3dcbi8vIC0gJygnJ3xbXiddKSsoJ3wkKSBtYXRjaGVzIGFueXRoaW5nIHN1cnJvdW5kZWQgYnkgdHdvIHF1b3RlIGNoYXJhY3RlcnMgKCcpLFxuLy8gICBleGNlcHQgYSBzaW5nbGUgcXVvdGUgc3ltYm9sLCB3aGljaCBlbmRzIHRoZSBzZXF1ZW5jZS5cbi8vICAgVHdvIHF1b3RlIGNoYXJhY3RlcnMgZG8gbm90IGVuZCB0aGUgc2VxdWVuY2UuXG4vLyAgIElmIHRoZXJlIGlzIG5vIG1hdGNoaW5nIHNpbmdsZSBxdW90ZVxuLy8gICB0aGVuIHRoZSBzZXF1ZW5jZSB3aWxsIGNvbnRpbnVlIHVudGlsIHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cbi8vIC0gLiBtYXRjaGVzIGFueSBzaW5nbGUgY2hhcmFjdGVyIHVubWF0Y2hlZCBieSBwcmV2aW91cyBwYXJ0cyBvZiB0aGUgUmVnRXhwc1xudmFyIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvW3lZUXFNTHdJZERlY2loSEtrbXNdb3woXFx3KVxcMSp8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbnZhciBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xudmFyIGVzY2FwZWRTdHJpbmdSZWdFeHAgPSAvXicoW15dKj8pJz8kLztcbnZhciBkb3VibGVRdW90ZVJlZ0V4cCA9IC8nJy9nO1xudmFyIHVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwID0gL1thLXpBLVpdLztcblxuLyoqXG4gKiBAbmFtZSBmb3JtYXRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgRm9ybWF0IHRoZSBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gdGhlIGdpdmVuIGZvcm1hdC4gVGhlIHJlc3VsdCBtYXkgdmFyeSBieSBsb2NhbGUuXG4gKlxuICogPiDimqDvuI8gUGxlYXNlIG5vdGUgdGhhdCB0aGUgYGZvcm1hdGAgdG9rZW5zIGRpZmZlciBmcm9tIE1vbWVudC5qcyBhbmQgb3RoZXIgbGlicmFyaWVzLlxuICogPiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGJldHdlZW4gdHdvIHNpbmdsZSBxdW90ZXMgY2hhcmFjdGVycyAoJykgYXJlIGVzY2FwZWQuXG4gKiBUd28gc2luZ2xlIHF1b3RlcyBpbiBhIHJvdywgd2hldGhlciBpbnNpZGUgb3Igb3V0c2lkZSBhIHF1b3RlZCBzZXF1ZW5jZSwgcmVwcmVzZW50IGEgJ3JlYWwnIHNpbmdsZSBxdW90ZS5cbiAqIChzZWUgdGhlIGxhc3QgZXhhbXBsZSlcbiAqXG4gKiBGb3JtYXQgb2YgdGhlIHN0cmluZyBpcyBiYXNlZCBvbiBVbmljb2RlIFRlY2huaWNhbCBTdGFuZGFyZCAjMzU6XG4gKiBodHRwczovL3d3dy51bmljb2RlLm9yZy9yZXBvcnRzL3RyMzUvdHIzNS1kYXRlcy5odG1sI0RhdGVfRmllbGRfU3ltYm9sX1RhYmxlXG4gKiB3aXRoIGEgZmV3IGFkZGl0aW9ucyAoc2VlIG5vdGUgNyBiZWxvdyB0aGUgdGFibGUpLlxuICpcbiAqIEFjY2VwdGVkIHBhdHRlcm5zOlxuICogfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUGF0dGVybiB8IFJlc3VsdCBleGFtcGxlcyAgICAgICAgICAgICAgICAgICB8IE5vdGVzIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS18XG4gKiB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHLi5HR0cgIHwgQUQsIEJDICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgR0dHRyAgICB8IEFubm8gRG9taW5pLCBCZWZvcmUgQ2hyaXN0ICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0dHICAgfCBBLCBCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IENhbGVuZGFyIHllYXIgICAgICAgICAgICAgICAgICAgfCB5ICAgICAgIHwgNDQsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeW8gICAgICB8IDQ0dGgsIDFzdCwgMHRoLCAxN3RoICAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5ICAgICAgfCA0NCwgMDEsIDAwLCAxNyAgICAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXkgICAgIHwgMDQ0LCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5eSAgICB8IDAwNDQsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXl5ICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgfCBZICAgICAgIHwgNDQsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWW8gICAgICB8IDQ0dGgsIDFzdCwgMTkwMHRoLCAyMDE3dGggICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZICAgICAgfCA0NCwgMDEsIDAwLCAxNyAgICAgICAgICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVkgICAgIHwgMDQ0LCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZWSAgICB8IDAwNDQsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICB8IDUsOCAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVlZICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICAgfCBSICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlIgICAgICB8IC00MywgMDAsIDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUiAgICAgfCAtMDQzLCAwMDAsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlJSICAgIHwgLTAwNDMsIDAwMDAsIDAwMDEsIDE5MDAsIDIwMTcgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUlIgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSw3IHxcbiAqIHwgRXh0ZW5kZWQgeWVhciAgICAgICAgICAgICAgICAgICB8IHUgICAgICAgfCAtNDMsIDAsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dSAgICAgIHwgLTQzLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1ICAgICB8IC0wNDMsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dXUgICAgfCAtMDA0MywgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1dSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBRdWFydGVyIChmb3JtYXR0aW5nKSAgICAgICAgICAgIHwgUSAgICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFvICAgICAgfCAxc3QsIDJuZCwgM3JkLCA0dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUSAgICAgIHwgMDEsIDAyLCAwMywgMDQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRICAgICB8IFExLCBRMiwgUTMsIFE0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUVEgICAgfCAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRUSAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgNCAgICAgfFxuICogfCBRdWFydGVyIChzdGFuZC1hbG9uZSkgICAgICAgICAgIHwgcSAgICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFvICAgICAgfCAxc3QsIDJuZCwgM3JkLCA0dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcSAgICAgIHwgMDEsIDAyLCAwMywgMDQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxICAgICB8IFExLCBRMiwgUTMsIFE0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcXEgICAgfCAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxcSAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgNCAgICAgfFxuICogfCBNb250aCAoZm9ybWF0dGluZykgICAgICAgICAgICAgIHwgTSAgICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1vICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMnRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTSAgICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NICAgICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTU0gICAgfCBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlciAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NTSAgIHwgSiwgRiwgLi4uLCBEICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNb250aCAoc3RhbmQtYWxvbmUpICAgICAgICAgICAgIHwgTCAgICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMnRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTCAgICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMICAgICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTEwgICAgfCBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlciAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMTCAgIHwgSiwgRiwgLi4uLCBEICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgIHwgdyAgICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHdvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA1M3RoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3dyAgICAgIHwgMDEsIDAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBJU08gd2VlayBvZiB5ZWFyICAgICAgICAgICAgICAgIHwgSSAgICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IElvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA1M3RoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJSSAgICAgIHwgMDEsIDAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgIHwgZCAgICAgICB8IDEsIDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGRvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAzMXN0ICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZCAgICAgIHwgMDEsIDAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBEYXkgb2YgeWVhciAgICAgICAgICAgICAgICAgICAgIHwgRCAgICAgICB8IDEsIDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAzNjV0aCwgMzY2dGggICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBERCAgICAgIHwgMDEsIDAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgIHwgOSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREREICAgICB8IDAwMSwgMDAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEREREQgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzICAgICB8XG4gKiB8IERheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICAgICAgfCBFLi5FRUUgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRUUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBJU08gZGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICAgIHwgaSAgICAgICB8IDEsIDIsIDMsIC4uLiwgNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA3dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaSAgICAgIHwgMDEsIDAyLCAuLi4sIDA3ICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWkgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyLDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpaSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWlpICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8IDcgICAgIHxcbiAqIHwgTG9jYWwgZGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICB8IGUgICAgICAgfCAyLCAzLCA0LCAuLi4sIDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlbyAgICAgIHwgMm5kLCAzcmQsIC4uLiwgMXN0ICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWUgICAgICB8IDAyLCAwMywgLi4uLCAwMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZWUgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlZSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChzdGFuZC1hbG9uZSkgfCBjICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY28gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2MgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjYyAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjY2MgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgYS4uYWEgICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYSAgICAgfCBhbSwgcG0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWFhICAgIHwgYS5tLiwgcC5tLiAgICAgICAgICAgICAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYWEgICB8IGEsIHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICB8IGIuLmJiICAgfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmIgICAgIHwgYW0sIHBtLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiYiAgICB8IGEubS4sIHAubS4sIG5vb24sIG1pZG5pZ2h0ICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmJiICAgfCBhLCBwLCBuLCBtaSAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICAgfCBCLi5CQkIgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgQkJCQiAgICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkJCICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICAgfCBoICAgICAgIHwgMSwgMiwgLi4uLCAxMSwgMTIgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDExdGgsIDEydGggICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhoICAgICAgfCAwMSwgMDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICAgfCBIICAgICAgIHwgMCwgMSwgMiwgLi4uLCAyMyAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSG8gICAgICB8IDB0aCwgMXN0LCAybmQsIC4uLiwgMjNyZCAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhIICAgICAgfCAwMCwgMDEsIDAyLCAuLi4sIDIzICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICAgfCBLICAgICAgIHwgMSwgMiwgLi4uLCAxMSwgMCAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgS28gICAgICB8IDFzdCwgMm5kLCAuLi4sIDExdGgsIDB0aCAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtLICAgICAgfCAwMSwgMDIsIC4uLiwgMTEsIDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICAgfCBrICAgICAgIHwgMjQsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwga28gICAgICB8IDI0dGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtrICAgICAgfCAyNCwgMDEsIDAyLCAuLi4sIDIzICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtICAgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbW8gICAgICB8IDB0aCwgMXN0LCAuLi4sIDU5dGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1tICAgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzICAgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgc28gICAgICB8IDB0aCwgMXN0LCAuLi4sIDU5dGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNzICAgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICAgfCBTICAgICAgIHwgMCwgMSwgLi4uLCA5ICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1MgICAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTUyAgICAgfCAwMDAsIDAwMSwgLi4uLCA5OTkgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1NTICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy8gWikgICAgICAgIHwgWCAgICAgICB8IC0wOCwgKzA1MzAsIFogICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYICAgICAgfCAtMDgwMCwgKzA1MzAsIFogICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFggICAgIHwgLTA4OjAwLCArMDU6MzAsIFogICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYWCAgICB8IC0wODAwLCArMDUzMCwgWiwgKzEyMzQ1NiAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFhYICAgfCAtMDg6MDAsICswNTozMCwgWiwgKzEyOjM0OjU2ICAgICAgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICAgfCB4ICAgICAgIHwgLTA4LCArMDUzMCwgKzAwICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHggICAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eCAgICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwICAgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHh4ICAgIHwgLTA4MDAsICswNTMwLCArMDAwMCwgKzEyMzQ1NiAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eHggICB8IC0wODowMCwgKzA1OjMwLCArMDA6MDAsICsxMjozNDo1NiB8ICAgICAgIHxcbiAqIHwgVGltZXpvbmUgKEdNVCkgICAgICAgICAgICAgICAgICB8IE8uLi5PT08gfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBPT09PICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiAgICAgfFxuICogfCBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0LikgIHwgei4uLnp6eiB8IEdNVC04LCBHTVQrNTozMCwgR01UKzAgICAgICAgICAgICB8IDYgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHp6enogICAgfCBHTVQtMDg6MDAsIEdNVCswNTozMCwgR01UKzAwOjAwICAgfCAyLDYgICB8XG4gKiB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICAgfCB0ICAgICAgIHwgNTEyOTY5NTIwICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdHQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICB8IFQgICAgICAgfCA1MTI5Njk1MjA5MDAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBUVCAgICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw3ICAgfFxuICogfCBMb25nIGxvY2FsaXplZCBkYXRlICAgICAgICAgICAgIHwgUCAgICAgICB8IDA0LzI5LzE0NTMgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQICAgICAgfCBBcHIgMjksIDE0NTMgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFAgICAgIHwgQXByaWwgMjl0aCwgMTQ1MyAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUCAgICB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyAgICAgICAgICB8IDIsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgdGltZSAgICAgICAgICAgICB8IHAgICAgICAgfCAxMjowMCBBTSAgICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcCAgICAgIHwgMTI6MDA6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHBwICAgICB8IDEyOjAwOjAwIEFNIEdNVCsyICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcHAgICAgfCAxMjowMDowMCBBTSBHTVQrMDI6MDAgICAgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IENvbWJpbmF0aW9uIG9mIGRhdGUgYW5kIHRpbWUgICAgfCBQcCAgICAgIHwgMDQvMjkvMTQ1MywgMTI6MDAgQU0gICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBwcCAgICB8IEFwciAyOSwgMTQ1MywgMTI6MDA6MDAgQU0gICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUHBwcCAgfCBBcHJpbCAyOXRoLCAxNDUzIGF0IC4uLiAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBQcHBwcHwgRnJpZGF5LCBBcHJpbCAyOXRoLCAxNDUzIGF0IC4uLiAgIHwgMiw3ICAgfFxuICogTm90ZXM6XG4gKiAxLiBcIkZvcm1hdHRpbmdcIiB1bml0cyAoZS5nLiBmb3JtYXR0aW5nIHF1YXJ0ZXIpIGluIHRoZSBkZWZhdWx0IGVuLVVTIGxvY2FsZVxuICogICAgYXJlIHRoZSBzYW1lIGFzIFwic3RhbmQtYWxvbmVcIiB1bml0cywgYnV0IGFyZSBkaWZmZXJlbnQgaW4gc29tZSBsYW5ndWFnZXMuXG4gKiAgICBcIkZvcm1hdHRpbmdcIiB1bml0cyBhcmUgZGVjbGluZWQgYWNjb3JkaW5nIHRvIHRoZSBydWxlcyBvZiB0aGUgbGFuZ3VhZ2VcbiAqICAgIGluIHRoZSBjb250ZXh0IG9mIGEgZGF0ZS4gXCJTdGFuZC1hbG9uZVwiIHVuaXRzIGFyZSBhbHdheXMgbm9taW5hdGl2ZSBzaW5ndWxhcjpcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ2RvIExMTEwnLCB7bG9jYWxlOiBjc30pIC8vPT4gJzYuIGxpc3RvcGFkJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ2RvIE1NTU0nLCB7bG9jYWxlOiBjc30pIC8vPT4gJzYuIGxpc3RvcGFkdSdgXG4gKlxuICogMi4gQW55IHNlcXVlbmNlIG9mIHRoZSBpZGVudGljYWwgbGV0dGVycyBpcyBhIHBhdHRlcm4sIHVubGVzcyBpdCBpcyBlc2NhcGVkIGJ5XG4gKiAgICB0aGUgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnMgKHNlZSBiZWxvdykuXG4gKiAgICBJZiB0aGUgc2VxdWVuY2UgaXMgbG9uZ2VyIHRoYW4gbGlzdGVkIGluIHRhYmxlIChlLmcuIGBFRUVFRUVFRUVFRWApXG4gKiAgICB0aGUgb3V0cHV0IHdpbGwgYmUgdGhlIHNhbWUgYXMgZGVmYXVsdCBwYXR0ZXJuIGZvciB0aGlzIHVuaXQsIHVzdWFsbHlcbiAqICAgIHRoZSBsb25nZXN0IG9uZSAoaW4gY2FzZSBvZiBJU08gd2Vla2RheXMsIGBFRUVFYCkuIERlZmF1bHQgcGF0dGVybnMgZm9yIHVuaXRzXG4gKiAgICBhcmUgbWFya2VkIHdpdGggXCIyXCIgaW4gdGhlIGxhc3QgY29sdW1uIG9mIHRoZSB0YWJsZS5cbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTScpIC8vPT4gJ05vdidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU0nKSAvLz0+ICdOJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogMy4gU29tZSBwYXR0ZXJucyBjb3VsZCBiZSB1bmxpbWl0ZWQgbGVuZ3RoIChzdWNoIGFzIGB5eXl5eXl5eWApLlxuICogICAgVGhlIG91dHB1dCB3aWxsIGJlIHBhZGRlZCB3aXRoIHplcm9zIHRvIG1hdGNoIHRoZSBsZW5ndGggb2YgdGhlIHBhdHRlcm4uXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICd5eXl5eXl5eScpIC8vPT4gJzAwMDAyMDE3J2BcbiAqXG4gKiA0LiBgUVFRUVFgIGFuZCBgcXFxcXFgIGNvdWxkIGJlIG5vdCBzdHJpY3RseSBudW1lcmljYWwgaW4gc29tZSBsb2NhbGVzLlxuICogICAgVGhlc2UgdG9rZW5zIHJlcHJlc2VudCB0aGUgc2hvcnRlc3QgZm9ybSBvZiB0aGUgcXVhcnRlci5cbiAqXG4gKiA1LiBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4gYHlgIGFuZCBgdWAgcGF0dGVybnMgYXJlIEIuQy4geWVhcnM6XG4gKlxuICogICAgfCBZZWFyIHwgYHlgIHwgYHVgIHxcbiAqICAgIHwtLS0tLS18LS0tLS18LS0tLS18XG4gKiAgICB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICogICAgfCBCQyAxIHwgICAxIHwgICAwIHxcbiAqICAgIHwgQkMgMiB8ICAgMiB8ICAtMSB8XG4gKlxuICogICAgQWxzbyBgeXlgIGFsd2F5cyByZXR1cm5zIHRoZSBsYXN0IHR3byBkaWdpdHMgb2YgYSB5ZWFyLFxuICogICAgd2hpbGUgYHV1YCBwYWRzIHNpbmdsZSBkaWdpdCB5ZWFycyB0byAyIGNoYXJhY3RlcnMgYW5kIHJldHVybnMgb3RoZXIgeWVhcnMgdW5jaGFuZ2VkOlxuICpcbiAqICAgIHwgWWVhciB8IGB5eWAgfCBgdXVgIHxcbiAqICAgIHwtLS0tLS18LS0tLS0tfC0tLS0tLXxcbiAqICAgIHwgMSAgICB8ICAgMDEgfCAgIDAxIHxcbiAqICAgIHwgMTQgICB8ICAgMTQgfCAgIDE0IHxcbiAqICAgIHwgMzc2ICB8ICAgNzYgfCAgMzc2IHxcbiAqICAgIHwgMTQ1MyB8ICAgNTMgfCAxNDUzIHxcbiAqXG4gKiAgICBUaGUgc2FtZSBkaWZmZXJlbmNlIGlzIHRydWUgZm9yIGxvY2FsIGFuZCBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgKGBZYCBhbmQgYFJgKSxcbiAqICAgIGV4Y2VwdCBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFycyBhcmUgZGVwZW5kZW50IG9uIGBvcHRpb25zLndlZWtTdGFydHNPbmBcbiAqICAgIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgIChjb21wYXJlIFtnZXRJU09XZWVrWWVhcl17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9nZXRJU09XZWVrWWVhcn1cbiAqICAgIGFuZCBbZ2V0V2Vla1llYXJde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0V2Vla1llYXJ9KS5cbiAqXG4gKiA2LiBTcGVjaWZpYyBub24tbG9jYXRpb24gdGltZXpvbmVzIGFyZSBjdXJyZW50bHkgdW5hdmFpbGFibGUgaW4gYGRhdGUtZm5zYCxcbiAqICAgIHNvIHJpZ2h0IG5vdyB0aGVzZSB0b2tlbnMgZmFsbCBiYWNrIHRvIEdNVCB0aW1lem9uZXMuXG4gKlxuICogNy4gVGhlc2UgcGF0dGVybnMgYXJlIG5vdCBpbiB0aGUgVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogICAgLSBgaWA6IElTTyBkYXkgb2Ygd2Vla1xuICogICAgLSBgSWA6IElTTyB3ZWVrIG9mIHllYXJcbiAqICAgIC0gYFJgOiBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICogICAgLSBgdGA6IHNlY29uZHMgdGltZXN0YW1wXG4gKiAgICAtIGBUYDogbWlsbGlzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgb2A6IG9yZGluYWwgbnVtYmVyIG1vZGlmaWVyXG4gKiAgICAtIGBQYDogbG9uZyBsb2NhbGl6ZWQgZGF0ZVxuICogICAgLSBgcGA6IGxvbmcgbG9jYWxpemVkIHRpbWVcbiAqXG4gKiA4LiBgWVlgIGFuZCBgWVlZWWAgdG9rZW5zIHJlcHJlc2VudCB3ZWVrLW51bWJlcmluZyB5ZWFycyBidXQgdGhleSBhcmUgb2Z0ZW4gY29uZnVzZWQgd2l0aCB5ZWFycy5cbiAqICAgIFlvdSBzaG91bGQgZW5hYmxlIGBvcHRpb25zLnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIDkuIGBEYCBhbmQgYEREYCB0b2tlbnMgcmVwcmVzZW50IGRheXMgb2YgdGhlIHllYXIgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggZGF5cyBvZiB0aGUgbW9udGguXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zYCB0byB1c2UgdGhlbS4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0IC0gdGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcGFyYW0gezB8MXwyfDN8NHw1fDZ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZT0xXSAtIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zPWZhbHNlXSAtIGlmIHRydWUsIGFsbG93cyB1c2FnZSBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhciB0b2tlbnMgYFlZYCBhbmQgYFlZWVlgO1xuICogICBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2Vucz1mYWxzZV0gLSBpZiB0cnVlLCBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGRheSBvZiB5ZWFyIHRva2VucyBgRGAgYW5kIGBERGA7XG4gKiAgIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGxvY2FsaXplYCBwcm9wZXJ0eVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdExvbmdgIHByb3BlcnR5XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy53ZWVrU3RhcnRzT25gIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCA3XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYHl5eXlgIGluc3RlYWQgb2YgYFlZWVlgIGZvciBmb3JtYXR0aW5nIHllYXJzIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IHVzZSBgeXlgIGluc3RlYWQgb2YgYFlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYGRgIGluc3RlYWQgb2YgYERgIGZvciBmb3JtYXR0aW5nIGRheXMgb2YgdGhlIG1vbnRoIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IHVzZSBgZGRgIGluc3RlYWQgb2YgYEREYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBmb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDExIEZlYnJ1YXJ5IDIwMTQgaW4gbWlkZGxlLWVuZGlhbiBmb3JtYXQ6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAnTU0vZGQveXl5eScpXG4gKiAvLz0+ICcwMi8xMS8yMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMiBKdWx5IDIwMTQgaW4gRXNwZXJhbnRvOlxuICogaW1wb3J0IHsgZW9Mb2NhbGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW8nXG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiksIFwiZG8gJ2RlJyBNTU1NIHl5eXlcIiwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAnMi1hIGRlIGp1bGlvIDIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEVzY2FwZSBzdHJpbmcgYnkgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnM6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiwgMTUpLCBcImggJ28nJ2Nsb2NrJ1wiKVxuICogLy89PiBcIjMgbydjbG9ja1wiXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0KGRpcnR5RGF0ZSwgZGlydHlGb3JtYXRTdHIsIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYsIF9vcHRpb25zJGxvY2FsZSwgX3JlZjIsIF9yZWYzLCBfcmVmNCwgX29wdGlvbnMkZmlyc3RXZWVrQ29uLCBfb3B0aW9ucyRsb2NhbGUyLCBfb3B0aW9ucyRsb2NhbGUyJG9wdGksIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMiwgX3JlZjUsIF9yZWY2LCBfcmVmNywgX29wdGlvbnMkd2Vla1N0YXJ0c09uLCBfb3B0aW9ucyRsb2NhbGUzLCBfb3B0aW9ucyRsb2NhbGUzJG9wdGksIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQ7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZm9ybWF0U3RyID0gU3RyaW5nKGRpcnR5Rm9ybWF0U3RyKTtcbiAgdmFyIGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgdmFyIGxvY2FsZSA9IChfcmVmID0gKF9vcHRpb25zJGxvY2FsZSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5sb2NhbGUpICE9PSBudWxsICYmIF9vcHRpb25zJGxvY2FsZSAhPT0gdm9pZCAwID8gX29wdGlvbnMkbG9jYWxlIDogZGVmYXVsdE9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogZGVmYXVsdExvY2FsZTtcbiAgdmFyIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9IHRvSW50ZWdlcigoX3JlZjIgPSAoX3JlZjMgPSAoX3JlZjQgPSAoX29wdGlvbnMkZmlyc3RXZWVrQ29uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX29wdGlvbnMkZmlyc3RXZWVrQ29uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRmaXJzdFdlZWtDb24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUyID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUyJG9wdGkgPSBfb3B0aW9ucyRsb2NhbGUyLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTIkb3B0aSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlMiRvcHRpLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjQgIT09IHZvaWQgMCA/IF9yZWY0IDogZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMyAhPT0gdm9pZCAwID8gX3JlZjMgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAxKTtcblxuICAvLyBUZXN0IGlmIHdlZWtTdGFydHNPbiBpcyBiZXR3ZWVuIDEgYW5kIDcgX2FuZF8gaXMgbm90IE5hTlxuICBpZiAoIShmaXJzdFdlZWtDb250YWluc0RhdGUgPj0gMSAmJiBmaXJzdFdlZWtDb250YWluc0RhdGUgPD0gNykpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignZmlyc3RXZWVrQ29udGFpbnNEYXRlIG11c3QgYmUgYmV0d2VlbiAxIGFuZCA3IGluY2x1c2l2ZWx5Jyk7XG4gIH1cbiAgdmFyIHdlZWtTdGFydHNPbiA9IHRvSW50ZWdlcigoX3JlZjUgPSAoX3JlZjYgPSAoX3JlZjcgPSAoX29wdGlvbnMkd2Vla1N0YXJ0c09uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX29wdGlvbnMkd2Vla1N0YXJ0c09uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyR3ZWVrU3RhcnRzT24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUzID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUzJG9wdGkgPSBfb3B0aW9ucyRsb2NhbGUzLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTMkb3B0aSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlMyRvcHRpLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjcgIT09IHZvaWQgMCA/IF9yZWY3IDogZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmNiAhPT0gdm9pZCAwID8gX3JlZjYgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMyA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMyA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQgPSBfZGVmYXVsdE9wdGlvbnMkbG9jYWwzLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmNSAhPT0gdm9pZCAwID8gX3JlZjUgOiAwKTtcblxuICAvLyBUZXN0IGlmIHdlZWtTdGFydHNPbiBpcyBiZXR3ZWVuIDAgYW5kIDYgX2FuZF8gaXMgbm90IE5hTlxuICBpZiAoISh3ZWVrU3RhcnRzT24gPj0gMCAmJiB3ZWVrU3RhcnRzT24gPD0gNikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignd2Vla1N0YXJ0c09uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2IGluY2x1c2l2ZWx5Jyk7XG4gIH1cbiAgaWYgKCFsb2NhbGUubG9jYWxpemUpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBsb2NhbGl6ZSBwcm9wZXJ0eScpO1xuICB9XG4gIGlmICghbG9jYWxlLmZvcm1hdExvbmcpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBmb3JtYXRMb25nIHByb3BlcnR5Jyk7XG4gIH1cbiAgdmFyIG9yaWdpbmFsRGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICBpZiAoIWlzVmFsaWQob3JpZ2luYWxEYXRlKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdGhlIGRhdGUgaW4gc3lzdGVtIHRpbWV6b25lIHRvIHRoZSBzYW1lIGRhdGUgaW4gVVRDKzAwOjAwIHRpbWV6b25lLlxuICAvLyBUaGlzIGVuc3VyZXMgdGhhdCB3aGVuIFVUQyBmdW5jdGlvbnMgd2lsbCBiZSBpbXBsZW1lbnRlZCwgbG9jYWxlcyB3aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGVtLlxuICAvLyBTZWUgYW4gaXNzdWUgYWJvdXQgVVRDIGZ1bmN0aW9uczogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbiAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhvcmlnaW5hbERhdGUpO1xuICB2YXIgdXRjRGF0ZSA9IHN1Yk1pbGxpc2Vjb25kcyhvcmlnaW5hbERhdGUsIHRpbWV6b25lT2Zmc2V0KTtcbiAgdmFyIGZvcm1hdHRlck9wdGlvbnMgPSB7XG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiBmaXJzdFdlZWtDb250YWluc0RhdGUsXG4gICAgd2Vla1N0YXJ0c09uOiB3ZWVrU3RhcnRzT24sXG4gICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgX29yaWdpbmFsRGF0ZTogb3JpZ2luYWxEYXRlXG4gIH07XG4gIHZhciByZXN1bHQgPSBmb3JtYXRTdHIubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgdmFyIGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gJ3AnIHx8IGZpcnN0Q2hhcmFjdGVyID09PSAnUCcpIHtcbiAgICAgIHZhciBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgcmV0dXJuIGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGUuZm9ybWF0TG9uZyk7XG4gICAgfVxuICAgIHJldHVybiBzdWJzdHJpbmc7XG4gIH0pLmpvaW4oJycpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnNSZWdFeHApLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgLy8gUmVwbGFjZSB0d28gc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnMgd2l0aCBvbmUgc2luZ2xlIHF1b3RlIGNoYXJhY3RlclxuICAgIGlmIChzdWJzdHJpbmcgPT09IFwiJydcIikge1xuICAgICAgcmV0dXJuIFwiJ1wiO1xuICAgIH1cbiAgICB2YXIgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcIidcIikge1xuICAgICAgcmV0dXJuIGNsZWFuRXNjYXBlZFN0cmluZyhzdWJzdHJpbmcpO1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1tmaXJzdENoYXJhY3Rlcl07XG4gICAgaWYgKGZvcm1hdHRlcikge1xuICAgICAgaWYgKCEob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnMpICYmIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbihzdWJzdHJpbmcpKSB7XG4gICAgICAgIHRocm93UHJvdGVjdGVkRXJyb3Ioc3Vic3RyaW5nLCBkaXJ0eUZvcm1hdFN0ciwgU3RyaW5nKGRpcnR5RGF0ZSkpO1xuICAgICAgfVxuICAgICAgaWYgKCEob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy51c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zKSAmJiBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuKHN1YnN0cmluZykpIHtcbiAgICAgICAgdGhyb3dQcm90ZWN0ZWRFcnJvcihzdWJzdHJpbmcsIGRpcnR5Rm9ybWF0U3RyLCBTdHJpbmcoZGlydHlEYXRlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9ybWF0dGVyKHV0Y0RhdGUsIHN1YnN0cmluZywgbG9jYWxlLmxvY2FsaXplLCBmb3JtYXR0ZXJPcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGZpcnN0Q2hhcmFjdGVyLm1hdGNoKHVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0Zvcm1hdCBzdHJpbmcgY29udGFpbnMgYW4gdW5lc2NhcGVkIGxhdGluIGFscGhhYmV0IGNoYXJhY3RlciBgJyArIGZpcnN0Q2hhcmFjdGVyICsgJ2AnKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0cmluZztcbiAgfSkuam9pbignJyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjbGVhbkVzY2FwZWRTdHJpbmcoaW5wdXQpIHtcbiAgdmFyIG1hdGNoZWQgPSBpbnB1dC5tYXRjaChlc2NhcGVkU3RyaW5nUmVnRXhwKTtcbiAgaWYgKCFtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIHJldHVybiBtYXRjaGVkWzFdLnJlcGxhY2UoZG91YmxlUXVvdGVSZWdFeHAsIFwiJ1wiKTtcbn0iLCJleHBvcnQgY29uc3QgRXhwb3J0ZXJzID0gWydjc3YnLCAnanNvbicsICd4bWwnXTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgTG9hZGVyLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCBmb3JtYXQgZnJvbSAnZGF0ZS1mbnMvZm9ybWF0JztcbmltcG9ydCB7IEV4cG9ydGVycyB9IGZyb20gJy4uL2V4cG9ydGVyLnR5cGUuanMnO1xuZXhwb3J0IGNvbnN0IG1pbWVUeXBlcyA9IHtcbiAgICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgY3N2OiAndGV4dC9jc3YnLFxuICAgIHhtbDogJ3RleHQveG1sJyxcbn07XG5leHBvcnQgY29uc3QgZ2V0RXhwb3J0ZWRGaWxlTmFtZSA9IChleHRlbnNpb24pID0+IGBleHBvcnQtJHtmb3JtYXQoRGF0ZS5ub3coKSwgJ3l5eXktTU0tZGRfSEgtbW0nKX0uJHtleHRlbnNpb259YDtcbmNvbnN0IEV4cG9ydENvbXBvbmVudCA9ICh7IHJlc291cmNlIH0pID0+IHtcbiAgICBjb25zdCBbaXNGZXRjaGluZywgc2V0RmV0Y2hpbmddID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBzZW5kTm90aWNlID0gdXNlTm90aWNlKCk7XG4gICAgY29uc3QgZXhwb3J0RGF0YSA9IGFzeW5jICh0eXBlKSA9PiB7XG4gICAgICAgIHNldEZldGNoaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IGV4cG9ydGVkRGF0YSB9LCB9ID0gYXdhaXQgbmV3IEFwaUNsaWVudCgpLnJlc291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiByZXNvdXJjZS5pZCxcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnZXhwb3J0JyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2V4cG9ydGVkRGF0YV0sIHsgdHlwZTogbWltZVR5cGVzW3R5cGVdIH0pO1xuICAgICAgICAgICAgc2F2ZUFzKGJsb2IsIGdldEV4cG9ydGVkRmlsZU5hbWUodHlwZSkpO1xuICAgICAgICAgICAgc2VuZE5vdGljZSh7IG1lc3NhZ2U6ICdFeHBvcnRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiBlLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmV0Y2hpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgaWYgKGlzRmV0Y2hpbmcpIHtcbiAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz47XG4gICAgfVxuICAgIHJldHVybiAoPEJveD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiPlxuICAgICAgICA8VGV4dCB2YXJpYW50PVwibGdcIj5DaG9vc2UgZXhwb3J0IGZvcm1hdDo8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiPlxuICAgICAgICB7RXhwb3J0ZXJzLm1hcChwYXJzZXJUeXBlID0+ICg8Qm94IGtleT17cGFyc2VyVHlwZX0gbT17Mn0+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IGV4cG9ydERhdGEocGFyc2VyVHlwZSl9IGRpc2FibGVkPXtpc0ZldGNoaW5nfT5cbiAgICAgICAgICAgICAge3BhcnNlclR5cGUudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PikpfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBFeHBvcnRDb21wb25lbnQ7XG4iLCJpbXBvcnQgeyBEcm9wWm9uZSwgRHJvcFpvbmVJdGVtLCBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0LCB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5jb25zdCBFZGl0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZDtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KTtcbiAgICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSk7XG4gICAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGUoW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIGl0IG1lYW5zIG1lYW5zIHRoYXQgc29tZW9uZSBoaXQgc2F2ZSBhbmQgbmV3IGZpbGUgaGFzIGJlZW4gdXBsb2FkZWRcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgICAgIGlmICgodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICAgICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHNldE9yaWdpbmFsS2V5KGtleSk7XG4gICAgICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKTtcbiAgICAgICAgfVxuICAgIH0sIFtrZXksIG9yaWdpbmFsS2V5XSk7XG4gICAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXMpID0+IHtcbiAgICAgICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcyk7XG4gICAgICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIGZpbGVzKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNdWx0aVJlbW92ZSA9IChzaW5nbGVLZXkpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpO1xuICAgICAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSkgfHwgW107XG4gICAgICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgubWFwKChjdXJyZW50UGF0aCwgaSkgPT4gKGkgIT09IGluZGV4ID8gY3VycmVudFBhdGggOiBudWxsKSk7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSwgWy4uLmZpbGVzVG9EZWxldGUsIGluZGV4XSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbm5vdCByZW1vdmUgZmlsZSB3aGVuIHRoZXJlIGFyZSBubyB1cGxvYWRlZCBmaWxlcyB5ZXQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZSwgeyBvbkNoYW5nZTogb25VcGxvYWQsIG11bHRpcGxlOiBjdXN0b20ubXVsdGlwbGUsIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBjdXN0b20ubWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICAgICAgfSwgZmlsZXM6IGZpbGVzVG9VcGxvYWQgfSksXG4gICAgICAgICFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmVJdGVtLCB7IGZpbGVuYW1lOiBrZXksIHNyYzogcGF0aCwgb25SZW1vdmU6IGhhbmRsZVJlbW92ZSB9KSksXG4gICAgICAgIGN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYga2V5Lmxlbmd0aCAmJiBwYXRoID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGtleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF07XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsga2V5OiBzaW5nbGVLZXksIGZpbGVuYW1lOiBzaW5nbGVLZXksIHNyYzogcGF0aFtpbmRleF0sIG9uUmVtb3ZlOiAoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpIH0pKSA6ICcnO1xuICAgICAgICB9KSkpIDogJycpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFZGl0O1xuIiwiZXhwb3J0IGNvbnN0IEF1ZGlvTWltZVR5cGVzID0gW1xuICAgICdhdWRpby9hYWMnLFxuICAgICdhdWRpby9taWRpJyxcbiAgICAnYXVkaW8veC1taWRpJyxcbiAgICAnYXVkaW8vbXBlZycsXG4gICAgJ2F1ZGlvL29nZycsXG4gICAgJ2FwcGxpY2F0aW9uL29nZycsXG4gICAgJ2F1ZGlvL29wdXMnLFxuICAgICdhdWRpby93YXYnLFxuICAgICdhdWRpby93ZWJtJyxcbiAgICAnYXVkaW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgICAndmlkZW8veC1tc3ZpZGVvJyxcbiAgICAndmlkZW8vbXBlZycsXG4gICAgJ3ZpZGVvL29nZycsXG4gICAgJ3ZpZGVvL21wMnQnLFxuICAgICd2aWRlby93ZWJtJyxcbiAgICAndmlkZW8vM2dwcCcsXG4gICAgJ3ZpZGVvLzNncHAyJyxcbl07XG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICAgJ2ltYWdlL2JtcCcsXG4gICAgJ2ltYWdlL2dpZicsXG4gICAgJ2ltYWdlL2pwZWcnLFxuICAgICdpbWFnZS9wbmcnLFxuICAgICdpbWFnZS9zdmcreG1sJyxcbiAgICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgICAnaW1hZ2UvdGlmZicsXG4gICAgJ2ltYWdlL3dlYnAnLFxuXTtcbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAyJyxcbiAgICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgICAnYXBwbGljYXRpb24vemlwJyxcbiAgICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl07XG5leHBvcnQgY29uc3QgRG9jdW1lbnRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2snLFxuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLnJhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcbl07XG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgICAndGV4dC9jc3MnLFxuICAgICd0ZXh0L2NzdicsXG4gICAgJ3RleHQvaHRtbCcsXG4gICAgJ3RleHQvY2FsZW5kYXInLFxuICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ3RleHQvcGxhaW4nLFxuICAgICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAgICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICd0ZXh0L3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL2VwdWIremlwJyxcbiAgICAnYXBwbGljYXRpb24vcGRmJyxcbl07XG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgICAnZm9udC9vdGYnLFxuICAgICdmb250L3R0ZicsXG4gICAgJ2ZvbnQvd29mZicsXG4gICAgJ2ZvbnQvd29mZjInLFxuXTtcbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAnYXBwbGljYXRpb24veC1jc2gnLFxuICAgICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgICAnYXBwbGljYXRpb24veC1zaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAndm5kLnZpc2lvJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgICAuLi5WaWRlb01pbWVUeXBlcyxcbiAgICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAgIC4uLkRvY3VtZW50TWltZVR5cGVzLFxuICAgIC4uLlRleHRNaW1lVHlwZXMsXG4gICAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgICAuLi5PdGhlck1pbWVUeXBlcyxcbiAgICAuLi5Gb250TWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuXTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlLmpzJztcbmNvbnN0IFNpbmdsZUZpbGUgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHM7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG1pbWVUeXBlICYmIEltYWdlTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBwYXRoLCBzdHlsZTogeyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfSwgYWx0OiBuYW1lIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWltZVR5cGUgJiYgQXVkaW9NaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiLCB7IGNvbnRyb2xzOiB0cnVlLCBzcmM6IHBhdGggfSxcbiAgICAgICAgICAgICAgICBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVwiLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiYXVkaW9cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyYWNrXCIsIHsga2luZDogXCJjYXB0aW9uc1wiIH0pKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgYXM6IFwiYVwiLCBocmVmOiBwYXRoLCBtbDogXCJkZWZhdWx0XCIsIHNpemU6IFwic21cIiwgcm91bmRlZDogdHJ1ZSwgdGFyZ2V0OiBcIl9ibGFua1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEljb24sIHsgaWNvbjogXCJEb2N1bWVudERvd25sb2FkXCIsIGNvbG9yOiBcIndoaXRlXCIsIG1yOiBcImRlZmF1bHRcIiB9KSxcbiAgICAgICAgICAgIG5hbWUpKSk7XG59O1xuY29uc3QgRmlsZSA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgbGV0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgICAgICYmIGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eSk7XG4gICAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBwYXRoOiBwYXRoLCBuYW1lOiBuYW1lLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZSB9KSk7XG4gICAgfVxuICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBjdXN0b20ub3B0cy5iYXNlVXJsIHx8ICcnO1xuICAgICAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBrZXk6IHNpbmdsZVBhdGgsIHBhdGg6IHNpbmdsZVBhdGgsIG5hbWU6IG5hbWVbaW5kZXhdLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZVtpbmRleF0gfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IExpc3QgPSAocHJvcHMpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGUsIHsgd2lkdGg6IDEwMCwgLi4ucHJvcHMgfSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgU2hvdyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHByb3BlcnR5LmxhYmVsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiBcIjEwMCVcIiwgLi4ucHJvcHMgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaG93O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgSW1wb3J0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytpbXBvcnQtZXhwb3J0QDMuMC4wX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2NvbXBvbmVudHMvSW1wb3J0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbXBvcnRDb21wb25lbnQgPSBJbXBvcnRDb21wb25lbnRcbmltcG9ydCBFeHBvcnRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK2ltcG9ydC1leHBvcnRAMy4wLjBfYWRtaW5qc0A3LjUuMi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9FeHBvcnRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkV4cG9ydENvbXBvbmVudCA9IEV4cG9ydENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZEVkaXRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRMaXN0Q29tcG9uZW50ID0gVXBsb2FkTGlzdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZFNob3dDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRTaG93Q29tcG9uZW50ID0gVXBsb2FkU2hvd0NvbXBvbmVudCJdLCJuYW1lcyI6WyJJbXBvcnRDb21wb25lbnQiLCJyZXNvdXJjZSIsImZpbGUiLCJzZXRGaWxlIiwidXNlU3RhdGUiLCJzZW5kTm90aWNlIiwidXNlTm90aWNlIiwiaXNGZXRjaGluZyIsInNldEZldGNoaW5nIiwib25VcGxvYWQiLCJ1cGxvYWRlZEZpbGUiLCJvblN1Ym1pdCIsImltcG9ydERhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsIm5hbWUiLCJBcGlDbGllbnQiLCJyZXNvdXJjZUFjdGlvbiIsIm1ldGhvZCIsInJlc291cmNlSWQiLCJpZCIsImFjdGlvbk5hbWUiLCJkYXRhIiwibWVzc2FnZSIsInR5cGUiLCJlIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiTG9hZGVyIiwiQm94IiwibWFyZ2luIiwibWF4V2lkdGgiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJmbGV4RGlyZWN0aW9uIiwiRHJvcFpvbmUiLCJmaWxlcyIsIm9uQ2hhbmdlIiwibXVsdGlwbGUiLCJEcm9wWm9uZUl0ZW0iLCJmaWxlbmFtZSIsIm9uUmVtb3ZlIiwibSIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJkaXNhYmxlZCIsIl90eXBlb2YiLCJvIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsInJlcXVpcmVkQXJncyIsInJlcXVpcmVkIiwiYXJncyIsImxlbmd0aCIsIlR5cGVFcnJvciIsImlzRGF0ZSIsInZhbHVlIiwiYXJndW1lbnRzIiwiRGF0ZSIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsInRvRGF0ZSIsImFyZ3VtZW50IiwiYXJnU3RyIiwiZ2V0VGltZSIsImNvbnNvbGUiLCJ3YXJuIiwiRXJyb3IiLCJzdGFjayIsIk5hTiIsImlzVmFsaWQiLCJkaXJ0eURhdGUiLCJkYXRlIiwiaXNOYU4iLCJOdW1iZXIiLCJ0b0ludGVnZXIiLCJkaXJ0eU51bWJlciIsIm51bWJlciIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJhZGRNaWxsaXNlY29uZHMiLCJkaXJ0eUFtb3VudCIsInRpbWVzdGFtcCIsImFtb3VudCIsInN1Yk1pbGxpc2Vjb25kcyIsIk1JTExJU0VDT05EU19JTl9EQVkiLCJnZXRVVENEYXlPZlllYXIiLCJzZXRVVENNb250aCIsInNldFVUQ0hvdXJzIiwic3RhcnRPZlllYXJUaW1lc3RhbXAiLCJkaWZmZXJlbmNlIiwic3RhcnRPZlVUQ0lTT1dlZWsiLCJ3ZWVrU3RhcnRzT24iLCJkYXkiLCJnZXRVVENEYXkiLCJkaWZmIiwic2V0VVRDRGF0ZSIsImdldFVUQ0RhdGUiLCJnZXRVVENJU09XZWVrWWVhciIsInllYXIiLCJnZXRVVENGdWxsWWVhciIsImZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIiLCJzZXRVVENGdWxsWWVhciIsInN0YXJ0T2ZOZXh0WWVhciIsImZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIiLCJzdGFydE9mVGhpc1llYXIiLCJzdGFydE9mVVRDSVNPV2Vla1llYXIiLCJmb3VydGhPZkphbnVhcnkiLCJNSUxMSVNFQ09ORFNfSU5fV0VFSyIsImdldFVUQ0lTT1dlZWsiLCJyb3VuZCIsImRlZmF1bHRPcHRpb25zIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJzdGFydE9mVVRDV2VlayIsIm9wdGlvbnMiLCJfcmVmIiwiX3JlZjIiLCJfcmVmMyIsIl9vcHRpb25zJHdlZWtTdGFydHNPbiIsIl9vcHRpb25zJGxvY2FsZSIsIl9vcHRpb25zJGxvY2FsZSRvcHRpbyIsIl9kZWZhdWx0T3B0aW9ucyRsb2NhbCIsIl9kZWZhdWx0T3B0aW9ucyRsb2NhbDIiLCJsb2NhbGUiLCJSYW5nZUVycm9yIiwiZ2V0VVRDV2Vla1llYXIiLCJfb3B0aW9ucyRmaXJzdFdlZWtDb24iLCJmaXJzdFdlZWtDb250YWluc0RhdGUiLCJmaXJzdFdlZWtPZk5leHRZZWFyIiwiZmlyc3RXZWVrT2ZUaGlzWWVhciIsInN0YXJ0T2ZVVENXZWVrWWVhciIsImZpcnN0V2VlayIsImdldFVUQ1dlZWsiLCJhZGRMZWFkaW5nWmVyb3MiLCJ0YXJnZXRMZW5ndGgiLCJzaWduIiwib3V0cHV0IiwiYWJzIiwiZm9ybWF0dGVycyIsInkiLCJ0b2tlbiIsInNpZ25lZFllYXIiLCJNIiwibW9udGgiLCJnZXRVVENNb250aCIsIlN0cmluZyIsImQiLCJhIiwiZGF5UGVyaW9kRW51bVZhbHVlIiwiZ2V0VVRDSG91cnMiLCJ0b1VwcGVyQ2FzZSIsImgiLCJIIiwiZ2V0VVRDTWludXRlcyIsInMiLCJnZXRVVENTZWNvbmRzIiwiUyIsIm51bWJlck9mRGlnaXRzIiwibWlsbGlzZWNvbmRzIiwiZ2V0VVRDTWlsbGlzZWNvbmRzIiwiZnJhY3Rpb25hbFNlY29uZHMiLCJwb3ciLCJkYXlQZXJpb2RFbnVtIiwiYW0iLCJwbSIsIm1pZG5pZ2h0Iiwibm9vbiIsIm1vcm5pbmciLCJhZnRlcm5vb24iLCJldmVuaW5nIiwibmlnaHQiLCJHIiwibG9jYWxpemUiLCJlcmEiLCJ3aWR0aCIsIm9yZGluYWxOdW1iZXIiLCJ1bml0IiwibGlnaHRGb3JtYXR0ZXJzIiwiWSIsInNpZ25lZFdlZWtZZWFyIiwid2Vla1llYXIiLCJ0d29EaWdpdFllYXIiLCJSIiwiaXNvV2Vla1llYXIiLCJ1IiwiUSIsInF1YXJ0ZXIiLCJjb250ZXh0IiwicSIsIkwiLCJ3Iiwid2VlayIsIkkiLCJpc29XZWVrIiwiRCIsImRheU9mWWVhciIsIkUiLCJkYXlPZldlZWsiLCJsb2NhbERheU9mV2VlayIsImMiLCJpIiwiaXNvRGF5T2ZXZWVrIiwiaG91cnMiLCJkYXlQZXJpb2QiLCJ0b0xvd2VyQ2FzZSIsImIiLCJCIiwiSyIsImsiLCJYIiwiX2xvY2FsaXplIiwib3JpZ2luYWxEYXRlIiwiX29yaWdpbmFsRGF0ZSIsInRpbWV6b25lT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMiLCJmb3JtYXRUaW1lem9uZSIsIngiLCJPIiwiZm9ybWF0VGltZXpvbmVTaG9ydCIsInoiLCJ0IiwiVCIsIm9mZnNldCIsImRpcnR5RGVsaW1pdGVyIiwiYWJzT2Zmc2V0IiwibWludXRlcyIsImRlbGltaXRlciIsImRhdGVMb25nRm9ybWF0dGVyIiwicGF0dGVybiIsImZvcm1hdExvbmciLCJ0aW1lTG9uZ0Zvcm1hdHRlciIsInRpbWUiLCJkYXRlVGltZUxvbmdGb3JtYXR0ZXIiLCJtYXRjaFJlc3VsdCIsIm1hdGNoIiwiZGF0ZVBhdHRlcm4iLCJ0aW1lUGF0dGVybiIsImRhdGVUaW1lRm9ybWF0IiwiZGF0ZVRpbWUiLCJyZXBsYWNlIiwibG9uZ0Zvcm1hdHRlcnMiLCJwIiwiUCIsImdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMiLCJ1dGNEYXRlIiwiVVRDIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiZ2V0TWlsbGlzZWNvbmRzIiwicHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW5zIiwicHJvdGVjdGVkV2Vla1llYXJUb2tlbnMiLCJpc1Byb3RlY3RlZERheU9mWWVhclRva2VuIiwiaW5kZXhPZiIsImlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbiIsInRocm93UHJvdGVjdGVkRXJyb3IiLCJmb3JtYXQiLCJpbnB1dCIsImNvbmNhdCIsImZvcm1hdERpc3RhbmNlTG9jYWxlIiwibGVzc1RoYW5YU2Vjb25kcyIsIm9uZSIsIm90aGVyIiwieFNlY29uZHMiLCJoYWxmQU1pbnV0ZSIsImxlc3NUaGFuWE1pbnV0ZXMiLCJ4TWludXRlcyIsImFib3V0WEhvdXJzIiwieEhvdXJzIiwieERheXMiLCJhYm91dFhXZWVrcyIsInhXZWVrcyIsImFib3V0WE1vbnRocyIsInhNb250aHMiLCJhYm91dFhZZWFycyIsInhZZWFycyIsIm92ZXJYWWVhcnMiLCJhbG1vc3RYWWVhcnMiLCJmb3JtYXREaXN0YW5jZSIsImNvdW50IiwicmVzdWx0IiwidG9rZW5WYWx1ZSIsImFkZFN1ZmZpeCIsImNvbXBhcmlzb24iLCJidWlsZEZvcm1hdExvbmdGbiIsInVuZGVmaW5lZCIsImRlZmF1bHRXaWR0aCIsImZvcm1hdHMiLCJkYXRlRm9ybWF0cyIsImZ1bGwiLCJsb25nIiwibWVkaXVtIiwic2hvcnQiLCJ0aW1lRm9ybWF0cyIsImRhdGVUaW1lRm9ybWF0cyIsImZvcm1hdFJlbGF0aXZlTG9jYWxlIiwibGFzdFdlZWsiLCJ5ZXN0ZXJkYXkiLCJ0b2RheSIsInRvbW9ycm93IiwibmV4dFdlZWsiLCJmb3JtYXRSZWxhdGl2ZSIsIl9kYXRlIiwiX2Jhc2VEYXRlIiwiX29wdGlvbnMiLCJidWlsZExvY2FsaXplRm4iLCJkaXJ0eUluZGV4IiwidmFsdWVzQXJyYXkiLCJmb3JtYXR0aW5nVmFsdWVzIiwiZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCIsIl9kZWZhdWx0V2lkdGgiLCJfd2lkdGgiLCJ2YWx1ZXMiLCJpbmRleCIsImFyZ3VtZW50Q2FsbGJhY2siLCJlcmFWYWx1ZXMiLCJuYXJyb3ciLCJhYmJyZXZpYXRlZCIsIndpZGUiLCJxdWFydGVyVmFsdWVzIiwibW9udGhWYWx1ZXMiLCJkYXlWYWx1ZXMiLCJkYXlQZXJpb2RWYWx1ZXMiLCJmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzIiwicmVtMTAwIiwiYnVpbGRNYXRjaEZuIiwic3RyaW5nIiwibWF0Y2hQYXR0ZXJuIiwibWF0Y2hQYXR0ZXJucyIsImRlZmF1bHRNYXRjaFdpZHRoIiwibWF0Y2hlZFN0cmluZyIsInBhcnNlUGF0dGVybnMiLCJkZWZhdWx0UGFyc2VXaWR0aCIsImtleSIsIkFycmF5IiwiaXNBcnJheSIsImZpbmRJbmRleCIsInRlc3QiLCJmaW5kS2V5IiwidmFsdWVDYWxsYmFjayIsInJlc3QiLCJzbGljZSIsIm9iamVjdCIsInByZWRpY2F0ZSIsImhhc093blByb3BlcnR5IiwiYXJyYXkiLCJidWlsZE1hdGNoUGF0dGVybkZuIiwicGFyc2VSZXN1bHQiLCJwYXJzZVBhdHRlcm4iLCJtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuIiwicGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiIsIm1hdGNoRXJhUGF0dGVybnMiLCJwYXJzZUVyYVBhdHRlcm5zIiwiYW55IiwibWF0Y2hRdWFydGVyUGF0dGVybnMiLCJwYXJzZVF1YXJ0ZXJQYXR0ZXJucyIsIm1hdGNoTW9udGhQYXR0ZXJucyIsInBhcnNlTW9udGhQYXR0ZXJucyIsIm1hdGNoRGF5UGF0dGVybnMiLCJwYXJzZURheVBhdHRlcm5zIiwibWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyIsInBhcnNlRGF5UGVyaW9kUGF0dGVybnMiLCJwYXJzZUludCIsImNvZGUiLCJmb3JtYXR0aW5nVG9rZW5zUmVnRXhwIiwibG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJlc2NhcGVkU3RyaW5nUmVnRXhwIiwiZG91YmxlUXVvdGVSZWdFeHAiLCJ1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCIsImRpcnR5Rm9ybWF0U3RyIiwiX3JlZjQiLCJfb3B0aW9ucyRsb2NhbGUyIiwiX29wdGlvbnMkbG9jYWxlMiRvcHRpIiwiX3JlZjUiLCJfcmVmNiIsIl9yZWY3IiwiX29wdGlvbnMkbG9jYWxlMyIsIl9vcHRpb25zJGxvY2FsZTMkb3B0aSIsIl9kZWZhdWx0T3B0aW9ucyRsb2NhbDMiLCJfZGVmYXVsdE9wdGlvbnMkbG9jYWw0IiwiZm9ybWF0U3RyIiwiZGVmYXVsdExvY2FsZSIsImZvcm1hdHRlck9wdGlvbnMiLCJtYXAiLCJzdWJzdHJpbmciLCJmaXJzdENoYXJhY3RlciIsImxvbmdGb3JtYXR0ZXIiLCJqb2luIiwiY2xlYW5Fc2NhcGVkU3RyaW5nIiwiZm9ybWF0dGVyIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwidXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyIsIm1hdGNoZWQiLCJFeHBvcnRlcnMiLCJtaW1lVHlwZXMiLCJqc29uIiwiY3N2IiwieG1sIiwiZ2V0RXhwb3J0ZWRGaWxlTmFtZSIsImV4dGVuc2lvbiIsIm5vdyIsIkV4cG9ydENvbXBvbmVudCIsImV4cG9ydERhdGEiLCJleHBvcnRlZERhdGEiLCJwYXJhbXMiLCJibG9iIiwiQmxvYiIsInNhdmVBcyIsIlRleHQiLCJ2YXJpYW50IiwicGFyc2VyVHlwZSIsIkVkaXQiLCJwcm9wZXJ0eSIsInJlY29yZCIsInRyYW5zbGF0ZVByb3BlcnR5IiwidXNlVHJhbnNsYXRpb24iLCJjdXN0b20iLCJwYXRoIiwiZmxhdCIsImdldCIsImZpbGVQYXRoUHJvcGVydHkiLCJrZXlQcm9wZXJ0eSIsImZpbGVQcm9wZXJ0eSIsIm9yaWdpbmFsS2V5Iiwic2V0T3JpZ2luYWxLZXkiLCJmaWxlc1RvVXBsb2FkIiwic2V0RmlsZXNUb1VwbG9hZCIsInVzZUVmZmVjdCIsImhhbmRsZVJlbW92ZSIsImhhbmRsZU11bHRpUmVtb3ZlIiwic2luZ2xlS2V5IiwiZmlsZXNUb0RlbGV0ZSIsImZpbGVzVG9EZWxldGVQcm9wZXJ0eSIsIm5ld1BhdGgiLCJjdXJyZW50UGF0aCIsIm5ld1BhcmFtcyIsInNldCIsImxvZyIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJ2YWxpZGF0ZSIsIm1heFNpemUiLCJzcmMiLCJGcmFnbWVudCIsIkF1ZGlvTWltZVR5cGVzIiwiSW1hZ2VNaW1lVHlwZXMiLCJTaW5nbGVGaWxlIiwicHJvcHMiLCJtaW1lVHlwZSIsImluY2x1ZGVzIiwic3R5bGUiLCJtYXhIZWlnaHQiLCJhbHQiLCJjb250cm9scyIsImtpbmQiLCJhcyIsImhyZWYiLCJtbCIsInNpemUiLCJyb3VuZGVkIiwidGFyZ2V0IiwiSWNvbiIsImljb24iLCJjb2xvciIsIm1yIiwiRmlsZSIsImZpbGVOYW1lUHJvcGVydHkiLCJtaW1lVHlwZVByb3BlcnR5Iiwib3B0cyIsImJhc2VVcmwiLCJzaW5nbGVQYXRoIiwiTGlzdCIsIlNob3ciLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJVcGxvYWRFZGl0Q29tcG9uZW50IiwiVXBsb2FkTGlzdENvbXBvbmVudCIsIlVwbG9hZFNob3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQSxNQUFNQSxlQUFlLEdBQUdBLENBQUM7SUFBRUMsRUFBQUEsUUFBQUE7SUFBUyxDQUFDLEtBQUs7TUFDdEMsTUFBTSxDQUFDQyxJQUFJLEVBQUVDLE9BQU8sQ0FBQyxHQUFHQyxjQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEMsRUFBQSxNQUFNQyxVQUFVLEdBQUdDLGlCQUFTLEVBQUUsQ0FBQTtNQUM5QixNQUFNLENBQUNDLFVBQVUsRUFBRUMsV0FBVyxDQUFD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LENBQUMsQ0FBQTtJQUMvRCxDQUFDOztJQ1JEMEIsT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0lBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQ25lLGVBQWUsR0FBR0EsZUFBZSxDQUFBO0lBRXhEa2UsT0FBTyxDQUFDQyxjQUFjLENBQUMxRSxlQUFlLEdBQUdBLGVBQWUsQ0FBQTtJQUV4RHlFLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDQyxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtJQUVoRUYsT0FBTyxDQUFDQyxjQUFjLENBQUNFLG1CQUFtQixHQUFHQSxJQUFtQixDQUFBO0lBRWhFSCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0csbUJBQW1CLEdBQUdBLElBQW1COzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDJdfQ==
