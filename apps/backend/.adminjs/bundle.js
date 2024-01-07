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

    /**
     * @name isDate
     * @category Common Helpers
     * @summary Is the given value a date?
     *
     * @description
     * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
     *
     * @param value - The value to check
     *
     * @returns True if the given value is a date
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
      return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
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
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param argument - The value to convert
     *
     * @returns The parsed date in the local time zone
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
      const argStr = Object.prototype.toString.call(argument);

      // Clone the date
      if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new argument.constructor(+argument);
      } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
        // TODO: Can we get rid of as?
        return new Date(argument);
      } else {
        // TODO: Can we get rid of as?
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
     * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
     * Invalid Date is a Date, whose time value is NaN.
     *
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The date to check
     *
     * @returns The date is valid
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
    function isValid(date) {
      if (!isDate(date) && typeof date !== "number") {
        return false;
      }
      const _date = toDate(date);
      return !isNaN(Number(_date));
    }

    const formatDistanceLocale = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
      },
      xSeconds: {
        one: "1 second",
        other: "{{count}} seconds"
      },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
      },
      xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes"
      },
      aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours"
      },
      xHours: {
        one: "1 hour",
        other: "{{count}} hours"
      },
      xDays: {
        one: "1 day",
        other: "{{count}} days"
      },
      aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks"
      },
      xWeeks: {
        one: "1 week",
        other: "{{count}} weeks"
      },
      aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months"
      },
      xMonths: {
        one: "1 month",
        other: "{{count}} months"
      },
      aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years"
      },
      xYears: {
        one: "1 year",
        other: "{{count}} years"
      },
      overXYears: {
        one: "over 1 year",
        other: "over {{count}} years"
      },
      almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years"
      }
    };
    const formatDistance = (token, count, options) => {
      let result;
      const tokenValue = formatDistanceLocale[token];
      if (typeof tokenValue === "string") {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace("{{count}}", count.toString());
      }
      if (options?.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return "in " + result;
        } else {
          return result + " ago";
        }
      }
      return result;
    };

    function buildFormatLongFn(args) {
      return (options = {}) => {
        // TODO: Remove String()
        const width = options.width ? String(options.width) : args.defaultWidth;
        const format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    }

    const dateFormats = {
      full: "EEEE, MMMM do, y",
      long: "MMMM do, y",
      medium: "MMM d, y",
      short: "MM/dd/yyyy"
    };
    const timeFormats = {
      full: "h:mm:ss a zzzz",
      long: "h:mm:ss a z",
      medium: "h:mm:ss a",
      short: "h:mm a"
    };
    const dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: "{{date}}, {{time}}",
      short: "{{date}}, {{time}}"
    };
    const formatLong = {
      date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: "full"
      }),
      time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: "full"
      }),
      dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: "full"
      })
    };

    const formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P"
    };
    const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

    /* eslint-disable no-unused-vars */

    /**
     * The localize function argument callback which allows to convert raw value to
     * the actual type.
     *
     * @param value - The value to convert
     *
     * @returns The converted value
     */

    /**
     * The map of localized values for each width.
     */

    /**
     * The index type of the locale unit value. It types conversion of units of
     * values that don't start at 0 (i.e. quarters).
     */

    /**
     * Converts the unit value to the tuple of values.
     */

    /**
     * The tuple of localized era values. The first element represents BC,
     * the second element represents AD.
     */

    /**
     * The tuple of localized quarter values. The first element represents Q1.
     */

    /**
     * The tuple of localized day values. The first element represents Sunday.
     */

    /**
     * The tuple of localized month values. The first element represents January.
     */

    function buildLocalizeFn(args) {
      return (value, options) => {
        const context = options?.context ? String(options.context) : "standalone";
        let valuesArray;
        if (context === "formatting" && args.formattingValues) {
          const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          const width = options?.width ? String(options.width) : defaultWidth;
          valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          const defaultWidth = args.defaultWidth;
          const width = options?.width ? String(options.width) : args.defaultWidth;
          valuesArray = args.values[width] || args.values[defaultWidth];
        }
        const index = args.argumentCallback ? args.argumentCallback(value) : value;

        // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
        return valuesArray[index];
      };
    }

    const eraValues = {
      narrow: ["B", "A"],
      abbreviated: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"]
    };
    const quarterValues = {
      narrow: ["1", "2", "3", "4"],
      abbreviated: ["Q1", "Q2", "Q3", "Q4"],
      wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
    };

    // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.
    const monthValues = {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    const dayValues = {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };
    const dayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      }
    };
    const formattingDayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      }
    };
    const ordinalNumber = (dirtyNumber, _options) => {
      const number = Number(dirtyNumber);

      // If ordinal numbers depend on context, for example,
      // if they are different for different grammatical genders,
      // use `options.unit`.
      //
      // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
      // 'day', 'hour', 'minute', 'second'.

      const rem100 = number % 100;
      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "rd";
        }
      }
      return number + "th";
    };
    const localize = {
      ordinalNumber,
      era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: "wide"
      }),
      quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: "wide",
        argumentCallback: quarter => quarter - 1
      }),
      month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: "wide"
      }),
      day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: "wide"
      }),
      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: "wide",
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: "wide"
      })
    };

    function buildMatchFn(args) {
      return (string, options = {}) => {
        const width = options.width;
        const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        const matchResult = string.match(matchPattern);
        if (!matchResult) {
          return null;
        }
        const matchedString = matchResult[0];
        const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, pattern => pattern.test(matchedString)) :
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        findKey(parsePatterns, pattern => pattern.test(matchedString));
        let value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ?
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        options.valueCallback(value) : value;
        const rest = string.slice(matchedString.length);
        return {
          value,
          rest
        };
      };
    }
    function findKey(object, predicate) {
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
          return key;
        }
      }
      return undefined;
    }
    function findIndex(array, predicate) {
      for (let key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }
      return undefined;
    }

    function buildMatchPatternFn(args) {
      return (string, options = {}) => {
        const matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        const matchedString = matchResult[0];
        const parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        value = options.valueCallback ? options.valueCallback(value) : value;
        const rest = string.slice(matchedString.length);
        return {
          value,
          rest
        };
      };
    }

    const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    const parseOrdinalNumberPattern = /\d+/i;
    const matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i
    };
    const parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i]
    };
    const matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i
    };
    const parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i]
    };
    const matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    };
    const parseMonthPatterns = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    };
    const matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    };
    const parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    };
    const matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    };
    const parseDayPeriodPatterns = {
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
    const match = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: value => parseInt(value, 10)
      }),
      era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseEraPatterns,
        defaultParseWidth: "any"
      }),
      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: "any",
        valueCallback: index => index + 1
      }),
      month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: "any"
      }),
      day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseDayPatterns,
        defaultParseWidth: "any"
      }),
      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: "any",
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: "any"
      })
    };

    /**
     * @category Locales
     * @summary English locale (United States).
     * @language English
     * @iso-639-2 eng
     * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
     * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
     */
    const enUS = {
      code: "en-US",
      formatDistance: formatDistance,
      formatLong: formatLong,
      formatRelative: formatRelative,
      localize: localize,
      match: match,
      options: {
        weekStartsOn: 0 /* Sunday */,
        firstWeekContainsDate: 1
      }
    };

    let defaultOptions = {};
    function getDefaultOptions() {
      return defaultOptions;
    }

    /**
     * @module constants
     * @summary Useful constants
     * @description
     * Collection of useful date constants.
     *
     * The constants could be imported from `date-fns/constants`:
     *
     * ```ts
     * import { maxTime, minTime } from "./constants/date-fns/constants";
     *
     * function isAllowedTime(time) {
     *   return time <= maxTime && time >= minTime;
     * }
     * ```
     */


    /**
     * @constant
     * @name millisecondsInWeek
     * @summary Milliseconds in 1 week.
     */
    const millisecondsInWeek = 604800000;

    /**
     * @constant
     * @name millisecondsInDay
     * @summary Milliseconds in 1 day.
     */
    const millisecondsInDay = 86400000;

    /**
     * @name startOfDay
     * @category Day Helpers
     * @summary Return the start of a day for the given date.
     *
     * @description
     * Return the start of a day for the given date.
     * The result will be in the local timezone.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of a day
     *
     * @example
     * // The start of a day for 2 September 2014 11:55:00:
     * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Sep 02 2014 00:00:00
     */
    function startOfDay(date) {
      const _date = toDate(date);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }

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
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      utcDate.setUTCFullYear(date.getFullYear());
      return date.getTime() - utcDate.getTime();
    }

    /**
     * @name differenceInCalendarDays
     * @category Day Helpers
     * @summary Get the number of calendar days between the given dates.
     *
     * @description
     * Get the number of calendar days between the given dates. This means that the times are removed
     * from the dates and then the difference in days is calculated.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param dateLeft - The later date
     * @param dateRight - The earlier date
     *
     * @returns The number of calendar days
     *
     * @example
     * // How many calendar days are between
     * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
     * const result = differenceInCalendarDays(
     *   new Date(2012, 6, 2, 0, 0),
     *   new Date(2011, 6, 2, 23, 0)
     * )
     * //=> 366
     * // How many calendar days are between
     * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
     * const result = differenceInCalendarDays(
     *   new Date(2011, 6, 3, 0, 1),
     *   new Date(2011, 6, 2, 23, 59)
     * )
     * //=> 1
     */
    function differenceInCalendarDays(dateLeft, dateRight) {
      const startOfDayLeft = startOfDay(dateLeft);
      const startOfDayRight = startOfDay(dateRight);
      const timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
      const timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);

      // Round the number of days to the nearest integer
      // because the number of milliseconds in a day is not constant
      // (e.g. it's different in the day of the daylight saving time clock shift)
      return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
    }

    /**
     * @name constructFrom
     * @category Generic Helpers
     * @summary Constructs a date using the reference date and the value
     *
     * @description
     * The function constructs a new date using the constructor from the reference
     * date and the given value. It helps to build generic functions that accept
     * date extensions.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The reference date to take constructor from
     * @param value - The value to create the date
     *
     * @returns Date initialized using the given date and value
     *
     * @example
     * import { constructFrom } from 'date-fns'
     *
     * // A function that clones a date preserving the original type
     * function cloneDate<DateType extends Date(date: DateType): DateType {
     *   return constructFrom(
     *     date, // Use contrustor from the given date
     *     date.getTime() // Use the date value to create a new date
     *   )
     * }
     */
    function constructFrom(date, value) {
      if (date instanceof Date) {
        return new date.constructor(value);
      } else {
        return new Date(value);
      }
    }

    /**
     * @name startOfYear
     * @category Year Helpers
     * @summary Return the start of a year for the given date.
     *
     * @description
     * Return the start of a year for the given date.
     * The result will be in the local timezone.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of a year
     *
     * @example
     * // The start of a year for 2 September 2014 11:55:00:
     * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
     * //=> Wed Jan 01 2014 00:00:00
     */
    function startOfYear(date) {
      const cleanDate = toDate(date);
      const _date = constructFrom(date, 0);
      _date.setFullYear(cleanDate.getFullYear(), 0, 1);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }

    /**
     * @name getDayOfYear
     * @category Day Helpers
     * @summary Get the day of the year of the given date.
     *
     * @description
     * Get the day of the year of the given date.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     *
     * @returns The day of year
     *
     * @example
     * // Which day of the year is 2 July 2014?
     * const result = getDayOfYear(new Date(2014, 6, 2))
     * //=> 183
     */
    function getDayOfYear(date) {
      const _date = toDate(date);
      const diff = differenceInCalendarDays(_date, startOfYear(_date));
      const dayOfYear = diff + 1;
      return dayOfYear;
    }

    /**
     * The {@link startOfWeek} function options.
     */

    /**
     * @name startOfWeek
     * @category Week Helpers
     * @summary Return the start of a week for the given date.
     *
     * @description
     * Return the start of a week for the given date.
     * The result will be in the local timezone.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param options - An object with options
     *
     * @returns The start of a week
     *
     * @example
     * // The start of a week for 2 September 2014 11:55:00:
     * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Sun Aug 31 2014 00:00:00
     *
     * @example
     * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
     * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
     * //=> Mon Sep 01 2014 00:00:00
     */
    function startOfWeek(date, options) {
      const defaultOptions = getDefaultOptions();
      const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
      const _date = toDate(date);
      const day = _date.getDay();
      const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      _date.setDate(_date.getDate() - diff);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }

    /**
     * @name startOfISOWeek
     * @category ISO Week Helpers
     * @summary Return the start of an ISO week for the given date.
     *
     * @description
     * Return the start of an ISO week for the given date.
     * The result will be in the local timezone.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of an ISO week
     *
     * @example
     * // The start of an ISO week for 2 September 2014 11:55:00:
     * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Mon Sep 01 2014 00:00:00
     */
    function startOfISOWeek(date) {
      return startOfWeek(date, {
        weekStartsOn: 1
      });
    }

    /**
     * @name getISOWeekYear
     * @category ISO Week-Numbering Year Helpers
     * @summary Get the ISO week-numbering year of the given date.
     *
     * @description
     * Get the ISO week-numbering year of the given date,
     * which always starts 3 days before the year's first Thursday.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     *
     * @returns The ISO week-numbering year
     *
     * @example
     * // Which ISO-week numbering year is 2 January 2005?
     * const result = getISOWeekYear(new Date(2005, 0, 2))
     * //=> 2004
     */
    function getISOWeekYear(date) {
      const _date = toDate(date);
      const year = _date.getFullYear();
      const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
      fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
      const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
      const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
      fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
      const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
      if (_date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (_date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    /**
     * @name startOfISOWeekYear
     * @category ISO Week-Numbering Year Helpers
     * @summary Return the start of an ISO week-numbering year for the given date.
     *
     * @description
     * Return the start of an ISO week-numbering year,
     * which always starts 3 days before the year's first Thursday.
     * The result will be in the local timezone.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of an ISO week-numbering year
     *
     * @example
     * // The start of an ISO week-numbering year for 2 July 2005:
     * const result = startOfISOWeekYear(new Date(2005, 6, 2))
     * //=> Mon Jan 03 2005 00:00:00
     */
    function startOfISOWeekYear(date) {
      const year = getISOWeekYear(date);
      const fourthOfJanuary = constructFrom(date, 0);
      fourthOfJanuary.setFullYear(year, 0, 4);
      fourthOfJanuary.setHours(0, 0, 0, 0);
      return startOfISOWeek(fourthOfJanuary);
    }

    /**
     * @name getISOWeek
     * @category ISO Week Helpers
     * @summary Get the ISO week of the given date.
     *
     * @description
     * Get the ISO week of the given date.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     *
     * @returns The ISO week
     *
     * @example
     * // Which week of the ISO-week numbering year is 2 January 2005?
     * const result = getISOWeek(new Date(2005, 0, 2))
     * //=> 53
     */
    function getISOWeek(date) {
      const _date = toDate(date);
      const diff = startOfISOWeek(_date).getTime() - startOfISOWeekYear(_date).getTime();

      // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)
      return Math.round(diff / millisecondsInWeek) + 1;
    }

    /**
     * The {@link getWeekYear} function options.
     */

    /**
     * @name getWeekYear
     * @category Week-Numbering Year Helpers
     * @summary Get the local week-numbering year of the given date.
     *
     * @description
     * Get the local week-numbering year of the given date.
     * The exact calculation depends on the values of
     * `options.weekStartsOn` (which is the index of the first day of the week)
     * and `options.firstWeekContainsDate` (which is the day of January, which is always in
     * the first week of the week-numbering year)
     *
     * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     * @param options - An object with options.
     *
     * @returns The local week-numbering year
     *
     * @example
     * // Which week numbering year is 26 December 2004 with the default settings?
     * const result = getWeekYear(new Date(2004, 11, 26))
     * //=> 2005
     *
     * @example
     * // Which week numbering year is 26 December 2004 if week starts on Saturday?
     * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
     * //=> 2004
     *
     * @example
     * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
     * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
     * //=> 2004
     */
    function getWeekYear(date, options) {
      const _date = toDate(date);
      const year = _date.getFullYear();
      const defaultOptions = getDefaultOptions();
      const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
      const firstWeekOfNextYear = constructFrom(date, 0);
      firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setHours(0, 0, 0, 0);
      const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
      const firstWeekOfThisYear = constructFrom(date, 0);
      firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setHours(0, 0, 0, 0);
      const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
      if (_date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (_date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    /**
     * The {@link startOfWeekYear} function options.
     */

    /**
     * @name startOfWeekYear
     * @category Week-Numbering Year Helpers
     * @summary Return the start of a local week-numbering year for the given date.
     *
     * @description
     * Return the start of a local week-numbering year.
     * The exact calculation depends on the values of
     * `options.weekStartsOn` (which is the index of the first day of the week)
     * and `options.firstWeekContainsDate` (which is the day of January, which is always in
     * the first week of the week-numbering year)
     *
     * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param options - An object with options
     *
     * @returns The start of a week-numbering year
     *
     * @example
     * // The start of an a week-numbering year for 2 July 2005 with default settings:
     * const result = startOfWeekYear(new Date(2005, 6, 2))
     * //=> Sun Dec 26 2004 00:00:00
     *
     * @example
     * // The start of a week-numbering year for 2 July 2005
     * // if Monday is the first day of week
     * // and 4 January is always in the first week of the year:
     * const result = startOfWeekYear(new Date(2005, 6, 2), {
     *   weekStartsOn: 1,
     *   firstWeekContainsDate: 4
     * })
     * //=> Mon Jan 03 2005 00:00:00
     */
    function startOfWeekYear(date, options) {
      const defaultOptions = getDefaultOptions();
      const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
      const year = getWeekYear(date, options);
      const firstWeek = constructFrom(date, 0);
      firstWeek.setFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setHours(0, 0, 0, 0);
      const _date = startOfWeek(firstWeek, options);
      return _date;
    }

    /**
     * The {@link getWeek} function options.
     */

    /**
     * @name getWeek
     * @category Week Helpers
     * @summary Get the local week index of the given date.
     *
     * @description
     * Get the local week index of the given date.
     * The exact calculation depends on the values of
     * `options.weekStartsOn` (which is the index of the first day of the week)
     * and `options.firstWeekContainsDate` (which is the day of January, which is always in
     * the first week of the week-numbering year)
     *
     * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     * @param options - An object with options
     *
     * @returns The week
     *
     * @example
     * // Which week of the local week numbering year is 2 January 2005 with default options?
     * const result = getWeek(new Date(2005, 0, 2))
     * //=> 2
     *
     * @example
     * // Which week of the local week numbering year is 2 January 2005,
     * // if Monday is the first day of the week,
     * // and the first week of the year always contains 4 January?
     * const result = getWeek(new Date(2005, 0, 2), {
     *   weekStartsOn: 1,
     *   firstWeekContainsDate: 4
     * })
     * //=> 53
     */

    function getWeek(date, options) {
      const _date = toDate(date);
      const diff = startOfWeek(_date, options).getTime() - startOfWeekYear(_date, options).getTime();

      // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)
      return Math.round(diff / millisecondsInWeek) + 1;
    }

    function addLeadingZeros(number, targetLength) {
      const sign = number < 0 ? "-" : "";
      const output = Math.abs(number).toString().padStart(targetLength, "0");
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

    const lightFormatters = {
      // Year
      y(date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

        const signedYear = date.getFullYear();
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        const year = signedYear > 0 ? signedYear : 1 - signedYear;
        return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
      },
      // Month
      M(date, token) {
        const month = date.getMonth();
        return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
      },
      // Day of the month
      d(date, token) {
        return addLeadingZeros(date.getDate(), token.length);
      },
      // AM or PM
      a(date, token) {
        const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
        switch (token) {
          case "a":
          case "aa":
            return dayPeriodEnumValue.toUpperCase();
          case "aaa":
            return dayPeriodEnumValue;
          case "aaaaa":
            return dayPeriodEnumValue[0];
          case "aaaa":
          default:
            return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
        }
      },
      // Hour [1-12]
      h(date, token) {
        return addLeadingZeros(date.getHours() % 12 || 12, token.length);
      },
      // Hour [0-23]
      H(date, token) {
        return addLeadingZeros(date.getHours(), token.length);
      },
      // Minute
      m(date, token) {
        return addLeadingZeros(date.getMinutes(), token.length);
      },
      // Second
      s(date, token) {
        return addLeadingZeros(date.getSeconds(), token.length);
      },
      // Fraction of second
      S(date, token) {
        const numberOfDigits = token.length;
        const milliseconds = date.getMilliseconds();
        const fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
        return addLeadingZeros(fractionalSeconds, token.length);
      }
    };

    const dayPeriodEnum = {
      am: "am",
      pm: "pm",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
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

    const formatters = {
      // Era
      G: function (date, token, localize) {
        const era = date.getFullYear() > 0 ? 1 : 0;
        switch (token) {
          // AD, BC
          case "G":
          case "GG":
          case "GGG":
            return localize.era(era, {
              width: "abbreviated"
            });
          // A, B
          case "GGGGG":
            return localize.era(era, {
              width: "narrow"
            });
          // Anno Domini, Before Christ
          case "GGGG":
          default:
            return localize.era(era, {
              width: "wide"
            });
        }
      },
      // Year
      y: function (date, token, localize) {
        // Ordinal number
        if (token === "yo") {
          const signedYear = date.getFullYear();
          // Returns 1 for 1 BC (which is year 0 in JavaScript)
          const year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, {
            unit: "year"
          });
        }
        return lightFormatters.y(date, token);
      },
      // Local week-numbering year
      Y: function (date, token, localize, options) {
        const signedWeekYear = getWeekYear(date, options);
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

        // Two digit year
        if (token === "YY") {
          const twoDigitYear = weekYear % 100;
          return addLeadingZeros(twoDigitYear, 2);
        }

        // Ordinal number
        if (token === "Yo") {
          return localize.ordinalNumber(weekYear, {
            unit: "year"
          });
        }

        // Padding
        return addLeadingZeros(weekYear, token.length);
      },
      // ISO week-numbering year
      R: function (date, token) {
        const isoWeekYear = getISOWeekYear(date);

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
      u: function (date, token) {
        const year = date.getFullYear();
        return addLeadingZeros(year, token.length);
      },
      // Quarter
      Q: function (date, token, localize) {
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case "Q":
            return String(quarter);
          // 01, 02, 03, 04
          case "QQ":
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case "Qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter"
            });
          // Q1, Q2, Q3, Q4
          case "QQQ":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "formatting"
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case "QQQQQ":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "formatting"
            });
          // 1st quarter, 2nd quarter, ...
          case "QQQQ":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // Stand-alone quarter
      q: function (date, token, localize) {
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case "q":
            return String(quarter);
          // 01, 02, 03, 04
          case "qq":
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case "qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter"
            });
          // Q1, Q2, Q3, Q4
          case "qqq":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "standalone"
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case "qqqqq":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "standalone"
            });
          // 1st quarter, 2nd quarter, ...
          case "qqqq":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      // Month
      M: function (date, token, localize) {
        const month = date.getMonth();
        switch (token) {
          case "M":
          case "MM":
            return lightFormatters.M(date, token);
          // 1st, 2nd, ..., 12th
          case "Mo":
            return localize.ordinalNumber(month + 1, {
              unit: "month"
            });
          // Jan, Feb, ..., Dec
          case "MMM":
            return localize.month(month, {
              width: "abbreviated",
              context: "formatting"
            });
          // J, F, ..., D
          case "MMMMM":
            return localize.month(month, {
              width: "narrow",
              context: "formatting"
            });
          // January, February, ..., December
          case "MMMM":
          default:
            return localize.month(month, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // Stand-alone month
      L: function (date, token, localize) {
        const month = date.getMonth();
        switch (token) {
          // 1, 2, ..., 12
          case "L":
            return String(month + 1);
          // 01, 02, ..., 12
          case "LL":
            return addLeadingZeros(month + 1, 2);
          // 1st, 2nd, ..., 12th
          case "Lo":
            return localize.ordinalNumber(month + 1, {
              unit: "month"
            });
          // Jan, Feb, ..., Dec
          case "LLL":
            return localize.month(month, {
              width: "abbreviated",
              context: "standalone"
            });
          // J, F, ..., D
          case "LLLLL":
            return localize.month(month, {
              width: "narrow",
              context: "standalone"
            });
          // January, February, ..., December
          case "LLLL":
          default:
            return localize.month(month, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      // Local week of year
      w: function (date, token, localize, options) {
        const week = getWeek(date, options);
        if (token === "wo") {
          return localize.ordinalNumber(week, {
            unit: "week"
          });
        }
        return addLeadingZeros(week, token.length);
      },
      // ISO week of year
      I: function (date, token, localize) {
        const isoWeek = getISOWeek(date);
        if (token === "Io") {
          return localize.ordinalNumber(isoWeek, {
            unit: "week"
          });
        }
        return addLeadingZeros(isoWeek, token.length);
      },
      // Day of the month
      d: function (date, token, localize) {
        if (token === "do") {
          return localize.ordinalNumber(date.getDate(), {
            unit: "date"
          });
        }
        return lightFormatters.d(date, token);
      },
      // Day of year
      D: function (date, token, localize) {
        const dayOfYear = getDayOfYear(date);
        if (token === "Do") {
          return localize.ordinalNumber(dayOfYear, {
            unit: "dayOfYear"
          });
        }
        return addLeadingZeros(dayOfYear, token.length);
      },
      // Day of week
      E: function (date, token, localize) {
        const dayOfWeek = date.getDay();
        switch (token) {
          // Tue
          case "E":
          case "EE":
          case "EEE":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting"
            });
          // T
          case "EEEEE":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting"
            });
          // Tu
          case "EEEEEE":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting"
            });
          // Tuesday
          case "EEEE":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // Local day of week
      e: function (date, token, localize, options) {
        const dayOfWeek = date.getDay();
        const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (Nth day of week with current locale or weekStartsOn)
          case "e":
            return String(localDayOfWeek);
          // Padded numerical value
          case "ee":
            return addLeadingZeros(localDayOfWeek, 2);
          // 1st, 2nd, ..., 7th
          case "eo":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day"
            });
          case "eee":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting"
            });
          // T
          case "eeeee":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting"
            });
          // Tu
          case "eeeeee":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting"
            });
          // Tuesday
          case "eeee":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // Stand-alone local day of week
      c: function (date, token, localize, options) {
        const dayOfWeek = date.getDay();
        const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (same as in `e`)
          case "c":
            return String(localDayOfWeek);
          // Padded numerical value
          case "cc":
            return addLeadingZeros(localDayOfWeek, token.length);
          // 1st, 2nd, ..., 7th
          case "co":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day"
            });
          case "ccc":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "standalone"
            });
          // T
          case "ccccc":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "standalone"
            });
          // Tu
          case "cccccc":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "standalone"
            });
          // Tuesday
          case "cccc":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      // ISO day of week
      i: function (date, token, localize) {
        const dayOfWeek = date.getDay();
        const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch (token) {
          // 2
          case "i":
            return String(isoDayOfWeek);
          // 02
          case "ii":
            return addLeadingZeros(isoDayOfWeek, token.length);
          // 2nd
          case "io":
            return localize.ordinalNumber(isoDayOfWeek, {
              unit: "day"
            });
          // Tue
          case "iii":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting"
            });
          // T
          case "iiiii":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting"
            });
          // Tu
          case "iiiiii":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting"
            });
          // Tuesday
          case "iiii":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // AM or PM
      a: function (date, token, localize) {
        const hours = date.getHours();
        const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        switch (token) {
          case "a":
          case "aa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            });
          case "aaa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            }).toLowerCase();
          case "aaaaa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting"
            });
          case "aaaa":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // AM, PM, midnight, noon
      b: function (date, token, localize) {
        const hours = date.getHours();
        let dayPeriodEnumValue;
        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        }
        switch (token) {
          case "b":
          case "bb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            });
          case "bbb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            }).toLowerCase();
          case "bbbbb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting"
            });
          case "bbbb":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // in the morning, in the afternoon, in the evening, at night
      B: function (date, token, localize) {
        const hours = date.getHours();
        let dayPeriodEnumValue;
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
          case "B":
          case "BB":
          case "BBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            });
          case "BBBBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting"
            });
          case "BBBB":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      // Hour [1-12]
      h: function (date, token, localize) {
        if (token === "ho") {
          let hours = date.getHours() % 12;
          if (hours === 0) hours = 12;
          return localize.ordinalNumber(hours, {
            unit: "hour"
          });
        }
        return lightFormatters.h(date, token);
      },
      // Hour [0-23]
      H: function (date, token, localize) {
        if (token === "Ho") {
          return localize.ordinalNumber(date.getHours(), {
            unit: "hour"
          });
        }
        return lightFormatters.H(date, token);
      },
      // Hour [0-11]
      K: function (date, token, localize) {
        const hours = date.getHours() % 12;
        if (token === "Ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour"
          });
        }
        return addLeadingZeros(hours, token.length);
      },
      // Hour [1-24]
      k: function (date, token, localize) {
        let hours = date.getHours();
        if (hours === 0) hours = 24;
        if (token === "ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour"
          });
        }
        return addLeadingZeros(hours, token.length);
      },
      // Minute
      m: function (date, token, localize) {
        if (token === "mo") {
          return localize.ordinalNumber(date.getMinutes(), {
            unit: "minute"
          });
        }
        return lightFormatters.m(date, token);
      },
      // Second
      s: function (date, token, localize) {
        if (token === "so") {
          return localize.ordinalNumber(date.getSeconds(), {
            unit: "second"
          });
        }
        return lightFormatters.s(date, token);
      },
      // Fraction of second
      S: function (date, token) {
        return lightFormatters.S(date, token);
      },
      // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
      X: function (date, token, _localize, options) {
        const originalDate = options._originalDate || date;
        const timezoneOffset = originalDate.getTimezoneOffset();
        if (timezoneOffset === 0) {
          return "Z";
        }
        switch (token) {
          // Hours and optional minutes
          case "X":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XX`
          case "XXXX":
          case "XX":
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XXX`
          case "XXXXX":
          case "XXX": // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },
      // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
      x: function (date, token, _localize, options) {
        const originalDate = options._originalDate || date;
        const timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Hours and optional minutes
          case "x":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xx`
          case "xxxx":
          case "xx":
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xxx`
          case "xxxxx":
          case "xxx": // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },
      // Timezone (GMT)
      O: function (date, token, _localize, options) {
        const originalDate = options._originalDate || date;
        const timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Short
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          // Long
          case "OOOO":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },
      // Timezone (specific non-location)
      z: function (date, token, _localize, options) {
        const originalDate = options._originalDate || date;
        const timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Short
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          // Long
          case "zzzz":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },
      // Seconds timestamp
      t: function (date, token, _localize, options) {
        const originalDate = options._originalDate || date;
        const timestamp = Math.floor(originalDate.getTime() / 1000);
        return addLeadingZeros(timestamp, token.length);
      },
      // Milliseconds timestamp
      T: function (date, token, _localize, options) {
        const originalDate = options._originalDate || date;
        const timestamp = originalDate.getTime();
        return addLeadingZeros(timestamp, token.length);
      }
    };
    function formatTimezoneShort(offset, delimiter = "") {
      const sign = offset > 0 ? "-" : "+";
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset / 60);
      const minutes = absOffset % 60;
      if (minutes === 0) {
        return sign + String(hours);
      }
      return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
    }
    function formatTimezoneWithOptionalMinutes(offset, delimiter) {
      if (offset % 60 === 0) {
        const sign = offset > 0 ? "-" : "+";
        return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
      }
      return formatTimezone(offset, delimiter);
    }
    function formatTimezone(offset, delimiter = "") {
      const sign = offset > 0 ? "-" : "+";
      const absOffset = Math.abs(offset);
      const hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
      const minutes = addLeadingZeros(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }

    const dateLongFormatter = (pattern, formatLong) => {
      switch (pattern) {
        case "P":
          return formatLong.date({
            width: "short"
          });
        case "PP":
          return formatLong.date({
            width: "medium"
          });
        case "PPP":
          return formatLong.date({
            width: "long"
          });
        case "PPPP":
        default:
          return formatLong.date({
            width: "full"
          });
      }
    };
    const timeLongFormatter = (pattern, formatLong) => {
      switch (pattern) {
        case "p":
          return formatLong.time({
            width: "short"
          });
        case "pp":
          return formatLong.time({
            width: "medium"
          });
        case "ppp":
          return formatLong.time({
            width: "long"
          });
        case "pppp":
        default:
          return formatLong.time({
            width: "full"
          });
      }
    };
    const dateTimeLongFormatter = (pattern, formatLong) => {
      const matchResult = pattern.match(/(P+)(p+)?/) || [];
      const datePattern = matchResult[1];
      const timePattern = matchResult[2];
      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }
      let dateTimeFormat;
      switch (datePattern) {
        case "P":
          dateTimeFormat = formatLong.dateTime({
            width: "short"
          });
          break;
        case "PP":
          dateTimeFormat = formatLong.dateTime({
            width: "medium"
          });
          break;
        case "PPP":
          dateTimeFormat = formatLong.dateTime({
            width: "long"
          });
          break;
        case "PPPP":
        default:
          dateTimeFormat = formatLong.dateTime({
            width: "full"
          });
          break;
      }
      return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
    };
    const longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter
    };

    const dayOfYearTokenRE = /^D+$/;
    const weekYearTokenRE = /^Y+$/;
    const throwTokens = ["D", "DD", "YY", "YYYY"];
    function isProtectedDayOfYearToken(token) {
      return dayOfYearTokenRE.test(token);
    }
    function isProtectedWeekYearToken(token) {
      return weekYearTokenRE.test(token);
    }
    function warnOrThrowProtectedError(token, format, input) {
      const _message = message(token, format, input);
      console.warn(_message);
      if (throwTokens.includes(token)) throw new RangeError(_message);
    }
    function message(token, format, input) {
      const subject = token[0] === "Y" ? "years" : "days of the month";
      return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
    }

    // This RegExp consists of three parts separated by `|`:
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
    const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

    // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
    const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;
    const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

    /**
     * The {@link format} function options.
     */

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
     *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
     *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
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
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param format - The string of tokens
     * @param options - An object with options
     *
     * @returns The formatted date string
     *
     * @throws `date` must not be Invalid Date
     * @throws `options.locale` must contain `localize` property
     * @throws `options.locale` must contain `formatLong` property
     * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws format string contains an unescaped latin alphabet character
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
    function format(date, formatStr, options) {
      const defaultOptions = getDefaultOptions();
      const locale = options?.locale ?? defaultOptions.locale ?? enUS;
      const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
      const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
      const originalDate = toDate(date);
      if (!isValid(originalDate)) {
        throw new RangeError("Invalid time value");
      }
      const formatterOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale,
        _originalDate: originalDate
      };
      const result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
        const firstCharacter = substring[0];
        if (firstCharacter === "p" || firstCharacter === "P") {
          const longFormatter = longFormatters[firstCharacter];
          return longFormatter(substring, locale.formatLong);
        }
        return substring;
      }).join("").match(formattingTokensRegExp).map(function (substring) {
        // Replace two single quote characters with one single quote character
        if (substring === "''") {
          return "'";
        }
        const firstCharacter = substring[0];
        if (firstCharacter === "'") {
          return cleanEscapedString(substring);
        }
        const formatter = formatters[firstCharacter];
        if (formatter) {
          if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
            warnOrThrowProtectedError(substring, formatStr, String(date));
          }
          if (!options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
            warnOrThrowProtectedError(substring, formatStr, String(date));
          }
          return formatter(originalDate, substring, locale.localize, formatterOptions);
        }
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        return substring;
      }).join("");
      return result;
    }
    function cleanEscapedString(input) {
      const matched = input.match(escapedStringRegExp);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0ltcG9ydENvbXBvbmVudC5qc3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzRGF0ZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzVmFsaWQubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRMb2NhbGl6ZUZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbG9jYWxpemUubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4ubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbWF0Y2gubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2RlZmF1bHRPcHRpb25zLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RhbnRzLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0cnVjdEZyb20ubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldERheU9mWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZklTT1dlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRJU09XZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZJU09XZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldElTT1dlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRXZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldFdlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2FkZExlYWRpbmdaZXJvcy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2xpZ2h0Rm9ybWF0dGVycy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvcHJvdGVjdGVkVG9rZW5zLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZm9ybWF0Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytpbXBvcnQtZXhwb3J0QDMuMC4wX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2V4cG9ydGVyLnR5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0V4cG9ydENvbXBvbmVudC5qc3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2ZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQuanMiLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IERyb3Bab25lSXRlbSwgTG9hZGVyLCBCb3gsIEJ1dHRvbiwgRHJvcFpvbmUsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBJbXBvcnRDb21wb25lbnQgPSAoeyByZXNvdXJjZSB9KSA9PiB7XG4gICAgY29uc3QgW2ZpbGUsIHNldEZpbGVdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgc2VuZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICAgIGNvbnN0IFtpc0ZldGNoaW5nLCBzZXRGZXRjaGluZ10gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IG9uVXBsb2FkID0gKHVwbG9hZGVkRmlsZSkgPT4ge1xuICAgICAgICBzZXRGaWxlKHVwbG9hZGVkRmlsZT8uWzBdID8/IG51bGwpO1xuICAgIH07XG4gICAgY29uc3Qgb25TdWJtaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldEZldGNoaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0RGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgaW1wb3J0RGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlPy5uYW1lKTtcbiAgICAgICAgICAgIGF3YWl0IG5ldyBBcGlDbGllbnQoKS5yZXNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogcmVzb3VyY2UuaWQsXG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2ltcG9ydCcsXG4gICAgICAgICAgICAgICAgZGF0YTogaW1wb3J0RGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VuZE5vdGljZSh7IG1lc3NhZ2U6ICdJbXBvcnRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiBlLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmV0Y2hpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgaWYgKGlzRmV0Y2hpbmcpIHtcbiAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz47XG4gICAgfVxuICAgIHJldHVybiAoPEJveCBtYXJnaW49XCJhdXRvXCIgbWF4V2lkdGg9ezYwMH0gZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIj5cbiAgICAgIDxEcm9wWm9uZSBmaWxlcz17W119IG9uQ2hhbmdlPXtvblVwbG9hZH0gbXVsdGlwbGU9e2ZhbHNlfS8+XG4gICAgICB7ZmlsZSAmJiAoPERyb3Bab25lSXRlbSBmaWxlPXtmaWxlfSBmaWxlbmFtZT17ZmlsZS5uYW1lfSBvblJlbW92ZT17KCkgPT4gc2V0RmlsZShudWxsKX0vPil9XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiBtPXsxMH0+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17b25TdWJtaXR9IGRpc2FibGVkPXshZmlsZSB8fCBpc0ZldGNoaW5nfT5cbiAgICAgICAgICBVcGxvYWRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEltcG9ydENvbXBvbmVudDtcbiIsIi8qKlxuICogQG5hbWUgaXNEYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiB2YWx1ZSBhIGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGUuIFRoZSBmdW5jdGlvbiB3b3JrcyBmb3IgZGF0ZXMgdHJhbnNmZXJyZWQgYWNyb3NzIGlmcmFtZXMuXG4gKlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBkYXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYW4gaW52YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKE5hTikpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHNvbWUgdmFsdWU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoJzIwMTQtMDItMzEnKVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYW4gb2JqZWN0OlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKHt9KVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNEYXRlO1xuIiwiLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGFyZ3VtZW50IC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICBjb25zdCBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpO1xuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChcbiAgICBhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAodHlwZW9mIGFyZ3VtZW50ID09PSBcIm9iamVjdFwiICYmIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgYXJndW1lbnQuY29uc3RydWN0b3IoK2FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwibnVtYmVyXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBOdW1iZXJdXCIgfHxcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwic3RyaW5nXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBTdHJpbmddXCJcbiAgKSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHRvRGF0ZTtcbiIsImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCIuL2lzRGF0ZS5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBpc1ZhbGlkXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogQXJndW1lbnQgaXMgY29udmVydGVkIHRvIERhdGUgdXNpbmcgYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZSlcbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyB2YWxpZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQoMTM5MzgwNDgwMDAwMClcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChkYXRlKSB7XG4gIGlmICghaXNEYXRlKGRhdGUpICYmIHR5cGVvZiBkYXRlICE9PSBcIm51bWJlclwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICByZXR1cm4gIWlzTmFOKE51bWJlcihfZGF0ZSkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzVmFsaWQ7XG4iLCJjb25zdCBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogXCJsZXNzIHRoYW4gYSBzZWNvbmRcIixcbiAgICBvdGhlcjogXCJsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHNcIixcbiAgfSxcblxuICB4U2Vjb25kczoge1xuICAgIG9uZTogXCIxIHNlY29uZFwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBzZWNvbmRzXCIsXG4gIH0sXG5cbiAgaGFsZkFNaW51dGU6IFwiaGFsZiBhIG1pbnV0ZVwiLFxuXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6IFwibGVzcyB0aGFuIGEgbWludXRlXCIsXG4gICAgb3RoZXI6IFwibGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzXCIsXG4gIH0sXG5cbiAgeE1pbnV0ZXM6IHtcbiAgICBvbmU6IFwiMSBtaW51dGVcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gbWludXRlc1wiLFxuICB9LFxuXG4gIGFib3V0WEhvdXJzOiB7XG4gICAgb25lOiBcImFib3V0IDEgaG91clwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSBob3Vyc1wiLFxuICB9LFxuXG4gIHhIb3Vyczoge1xuICAgIG9uZTogXCIxIGhvdXJcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gaG91cnNcIixcbiAgfSxcblxuICB4RGF5czoge1xuICAgIG9uZTogXCIxIGRheVwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBkYXlzXCIsXG4gIH0sXG5cbiAgYWJvdXRYV2Vla3M6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSB3ZWVrXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IHdlZWtzXCIsXG4gIH0sXG5cbiAgeFdlZWtzOiB7XG4gICAgb25lOiBcIjEgd2Vla1wiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSB3ZWVrc1wiLFxuICB9LFxuXG4gIGFib3V0WE1vbnRoczoge1xuICAgIG9uZTogXCJhYm91dCAxIG1vbnRoXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IG1vbnRoc1wiLFxuICB9LFxuXG4gIHhNb250aHM6IHtcbiAgICBvbmU6IFwiMSBtb250aFwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBtb250aHNcIixcbiAgfSxcblxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogXCJhYm91dCAxIHllYXJcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0geWVhcnNcIixcbiAgfSxcblxuICB4WWVhcnM6IHtcbiAgICBvbmU6IFwiMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgb3ZlclhZZWFyczoge1xuICAgIG9uZTogXCJvdmVyIDEgeWVhclwiLFxuICAgIG90aGVyOiBcIm92ZXIge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiBcImFsbW9zdCAxIHllYXJcIixcbiAgICBvdGhlcjogXCJhbG1vc3Qge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGlzdGFuY2UgPSAodG9rZW4sIGNvdW50LCBvcHRpb25zKSA9PiB7XG4gIGxldCByZXN1bHQ7XG5cbiAgY29uc3QgdG9rZW5WYWx1ZSA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXTtcbiAgaWYgKHR5cGVvZiB0b2tlblZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub25lO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub3RoZXIucmVwbGFjZShcInt7Y291bnR9fVwiLCBjb3VudC50b1N0cmluZygpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zPy5hZGRTdWZmaXgpIHtcbiAgICBpZiAob3B0aW9ucy5jb21wYXJpc29uICYmIG9wdGlvbnMuY29tcGFyaXNvbiA+IDApIHtcbiAgICAgIHJldHVybiBcImluIFwiICsgcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0ICsgXCIgYWdvXCI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gKG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIC8vIFRPRE86IFJlbW92ZSBTdHJpbmcoKVxuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgIGNvbnN0IGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufVxuIiwiaW1wb3J0IHsgYnVpbGRGb3JtYXRMb25nRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi5tanNcIjtcblxuY29uc3QgZGF0ZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwiRUVFRSwgTU1NTSBkbywgeVwiLFxuICBsb25nOiBcIk1NTU0gZG8sIHlcIixcbiAgbWVkaXVtOiBcIk1NTSBkLCB5XCIsXG4gIHNob3J0OiBcIk1NL2RkL3l5eXlcIixcbn07XG5cbmNvbnN0IHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcImg6bW06c3MgYSB6enp6XCIsXG4gIGxvbmc6IFwiaDptbTpzcyBhIHpcIixcbiAgbWVkaXVtOiBcImg6bW06c3MgYVwiLFxuICBzaG9ydDogXCJoOm1tIGFcIixcbn07XG5cbmNvbnN0IGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIGxvbmc6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBtZWRpdW06IFwie3tkYXRlfX0sIHt7dGltZX19XCIsXG4gIHNob3J0OiBcInt7ZGF0ZX19LCB7e3RpbWV9fVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdExvbmcgPSB7XG4gIGRhdGU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcblxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG59O1xuIiwiY29uc3QgZm9ybWF0UmVsYXRpdmVMb2NhbGUgPSB7XG4gIGxhc3RXZWVrOiBcIidsYXN0JyBlZWVlICdhdCcgcFwiLFxuICB5ZXN0ZXJkYXk6IFwiJ3llc3RlcmRheSBhdCcgcFwiLFxuICB0b2RheTogXCIndG9kYXkgYXQnIHBcIixcbiAgdG9tb3Jyb3c6IFwiJ3RvbW9ycm93IGF0JyBwXCIsXG4gIG5leHRXZWVrOiBcImVlZWUgJ2F0JyBwXCIsXG4gIG90aGVyOiBcIlBcIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRSZWxhdGl2ZSA9ICh0b2tlbiwgX2RhdGUsIF9iYXNlRGF0ZSwgX29wdGlvbnMpID0+XG4gIGZvcm1hdFJlbGF0aXZlTG9jYWxlW3Rva2VuXTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogVGhlIGxvY2FsaXplIGZ1bmN0aW9uIGFyZ3VtZW50IGNhbGxiYWNrIHdoaWNoIGFsbG93cyB0byBjb252ZXJ0IHJhdyB2YWx1ZSB0b1xuICogdGhlIGFjdHVhbCB0eXBlLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKlxuICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCB2YWx1ZVxuICovXG5cbi8qKlxuICogVGhlIG1hcCBvZiBsb2NhbGl6ZWQgdmFsdWVzIGZvciBlYWNoIHdpZHRoLlxuICovXG5cbi8qKlxuICogVGhlIGluZGV4IHR5cGUgb2YgdGhlIGxvY2FsZSB1bml0IHZhbHVlLiBJdCB0eXBlcyBjb252ZXJzaW9uIG9mIHVuaXRzIG9mXG4gKiB2YWx1ZXMgdGhhdCBkb24ndCBzdGFydCBhdCAwIChpLmUuIHF1YXJ0ZXJzKS5cbiAqL1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB1bml0IHZhbHVlIHRvIHRoZSB0dXBsZSBvZiB2YWx1ZXMuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIGVyYSB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgQkMsXG4gKiB0aGUgc2Vjb25kIGVsZW1lbnQgcmVwcmVzZW50cyBBRC5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgcXVhcnRlciB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgUTEuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIGRheSB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgU3VuZGF5LlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBtb250aCB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgSmFudWFyeS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMb2NhbGl6ZUZuKGFyZ3MpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBvcHRpb25zPy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiBcInN0YW5kYWxvbmVcIjtcblxuICAgIGxldCB2YWx1ZXNBcnJheTtcbiAgICBpZiAoY29udGV4dCA9PT0gXCJmb3JtYXR0aW5nXCIgJiYgYXJncy5mb3JtYXR0aW5nVmFsdWVzKSB7XG4gICAgICBjb25zdCBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRGb3JtYXR0aW5nV2lkdGggfHwgYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnM/LndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YWx1ZXNBcnJheSA9XG4gICAgICAgIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1t3aWR0aF0gfHwgYXJncy5mb3JtYXR0aW5nVmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zPy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW3dpZHRoXSB8fCBhcmdzLnZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGFyZ3MuYXJndW1lbnRDYWxsYmFjayA/IGFyZ3MuYXJndW1lbnRDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBGb3Igc29tZSByZWFzb24gVHlwZVNjcmlwdCBqdXN0IGRvbid0IHdhbnQgdG8gbWF0Y2ggaXQsIG5vIG1hdHRlciBob3cgaGFyZCB3ZSB0cnkuIEkgY2hhbGxlbmdlIHlvdSB0byB0cnkgdG8gcmVtb3ZlIGl0IVxuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF07XG4gIH07XG59XG4iLCJpbXBvcnQgeyBidWlsZExvY2FsaXplRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZExvY2FsaXplRm4ubWpzXCI7XG5cbmNvbnN0IGVyYVZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCJCXCIsIFwiQVwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIkJDXCIsIFwiQURcIl0sXG4gIHdpZGU6IFtcIkJlZm9yZSBDaHJpc3RcIiwgXCJBbm5vIERvbWluaVwiXSxcbn07XG5cbmNvbnN0IHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIlExXCIsIFwiUTJcIiwgXCJRM1wiLCBcIlE0XCJdLFxuICB3aWRlOiBbXCIxc3QgcXVhcnRlclwiLCBcIjJuZCBxdWFydGVyXCIsIFwiM3JkIHF1YXJ0ZXJcIiwgXCI0dGggcXVhcnRlclwiXSxcbn07XG5cbi8vIE5vdGU6IGluIEVuZ2xpc2gsIHRoZSBuYW1lcyBvZiBkYXlzIG9mIHRoZSB3ZWVrIGFuZCBtb250aHMgYXJlIGNhcGl0YWxpemVkLlxuLy8gSWYgeW91IGFyZSBtYWtpbmcgYSBuZXcgbG9jYWxlIGJhc2VkIG9uIHRoaXMgb25lLCBjaGVjayBpZiB0aGUgc2FtZSBpcyB0cnVlIGZvciB0aGUgbGFuZ3VhZ2UgeW91J3JlIHdvcmtpbmcgb24uXG4vLyBHZW5lcmFsbHksIGZvcm1hdHRlZCBkYXRlcyBzaG91bGQgbG9vayBsaWtlIHRoZXkgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBzZW50ZW5jZSxcbi8vIGUuZy4gaW4gU3BhbmlzaCBsYW5ndWFnZSB0aGUgd2Vla2RheXMgYW5kIG1vbnRocyBzaG91bGQgYmUgaW4gdGhlIGxvd2VyY2FzZS5cbmNvbnN0IG1vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIkpcIiwgXCJGXCIsIFwiTVwiLCBcIkFcIiwgXCJNXCIsIFwiSlwiLCBcIkpcIiwgXCJBXCIsIFwiU1wiLCBcIk9cIiwgXCJOXCIsIFwiRFwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcbiAgICBcIkphblwiLFxuICAgIFwiRmViXCIsXG4gICAgXCJNYXJcIixcbiAgICBcIkFwclwiLFxuICAgIFwiTWF5XCIsXG4gICAgXCJKdW5cIixcbiAgICBcIkp1bFwiLFxuICAgIFwiQXVnXCIsXG4gICAgXCJTZXBcIixcbiAgICBcIk9jdFwiLFxuICAgIFwiTm92XCIsXG4gICAgXCJEZWNcIixcbiAgXSxcblxuICB3aWRlOiBbXG4gICAgXCJKYW51YXJ5XCIsXG4gICAgXCJGZWJydWFyeVwiLFxuICAgIFwiTWFyY2hcIixcbiAgICBcIkFwcmlsXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1bmVcIixcbiAgICBcIkp1bHlcIixcbiAgICBcIkF1Z3VzdFwiLFxuICAgIFwiU2VwdGVtYmVyXCIsXG4gICAgXCJPY3RvYmVyXCIsXG4gICAgXCJOb3ZlbWJlclwiLFxuICAgIFwiRGVjZW1iZXJcIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCJTXCIsIFwiTVwiLCBcIlRcIiwgXCJXXCIsIFwiVFwiLCBcIkZcIiwgXCJTXCJdLFxuICBzaG9ydDogW1wiU3VcIiwgXCJNb1wiLCBcIlR1XCIsIFwiV2VcIiwgXCJUaFwiLCBcIkZyXCIsIFwiU2FcIl0sXG4gIGFiYnJldmlhdGVkOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gIHdpZGU6IFtcbiAgICBcIlN1bmRheVwiLFxuICAgIFwiTW9uZGF5XCIsXG4gICAgXCJUdWVzZGF5XCIsXG4gICAgXCJXZWRuZXNkYXlcIixcbiAgICBcIlRodXJzZGF5XCIsXG4gICAgXCJGcmlkYXlcIixcbiAgICBcIlNhdHVyZGF5XCIsXG4gIF0sXG59O1xuXG5jb25zdCBkYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiBcImFcIixcbiAgICBwbTogXCJwXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlcIixcbiAgICBub29uOiBcIm5cIixcbiAgICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwibmlnaHRcIixcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogXCJBTVwiLFxuICAgIHBtOiBcIlBNXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwibmlnaHRcIixcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiBcImEubS5cIixcbiAgICBwbTogXCJwLm0uXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwibmlnaHRcIixcbiAgfSxcbn07XG5cbmNvbnN0IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiBcImFcIixcbiAgICBwbTogXCJwXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlcIixcbiAgICBub29uOiBcIm5cIixcbiAgICBtb3JuaW5nOiBcImluIHRoZSBtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImluIHRoZSBhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImluIHRoZSBldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwiYXQgbmlnaHRcIixcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogXCJBTVwiLFxuICAgIHBtOiBcIlBNXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcImluIHRoZSBtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImluIHRoZSBhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImluIHRoZSBldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwiYXQgbmlnaHRcIixcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiBcImEubS5cIixcbiAgICBwbTogXCJwLm0uXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcImluIHRoZSBtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImluIHRoZSBhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImluIHRoZSBldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwiYXQgbmlnaHRcIixcbiAgfSxcbn07XG5cbmNvbnN0IG9yZGluYWxOdW1iZXIgPSAoZGlydHlOdW1iZXIsIF9vcHRpb25zKSA9PiB7XG4gIGNvbnN0IG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgLy8gSWYgb3JkaW5hbCBudW1iZXJzIGRlcGVuZCBvbiBjb250ZXh0LCBmb3IgZXhhbXBsZSxcbiAgLy8gaWYgdGhleSBhcmUgZGlmZmVyZW50IGZvciBkaWZmZXJlbnQgZ3JhbW1hdGljYWwgZ2VuZGVycyxcbiAgLy8gdXNlIGBvcHRpb25zLnVuaXRgLlxuICAvL1xuICAvLyBgdW5pdGAgY2FuIGJlICd5ZWFyJywgJ3F1YXJ0ZXInLCAnbW9udGgnLCAnd2VlaycsICdkYXRlJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJy5cblxuICBjb25zdCByZW0xMDAgPSBudW1iZXIgJSAxMDA7XG4gIGlmIChyZW0xMDAgPiAyMCB8fCByZW0xMDAgPCAxMCkge1xuICAgIHN3aXRjaCAocmVtMTAwICUgMTApIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG51bWJlciArIFwic3RcIjtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIG51bWJlciArIFwibmRcIjtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArIFwicmRcIjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlciArIFwidGhcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcixcblxuICBlcmE6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBlcmFWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgcXVhcnRlcjogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IHF1YXJ0ZXJWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgICBhcmd1bWVudENhbGxiYWNrOiAocXVhcnRlcikgPT4gcXVhcnRlciAtIDEsXG4gIH0pLFxuXG4gIG1vbnRoOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogbW9udGhWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5OiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5VmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxuXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGZvcm1hdHRpbmdWYWx1ZXM6IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdEZvcm1hdHRpbmdXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZE1hdGNoRm4oYXJncykge1xuICByZXR1cm4gKHN0cmluZywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoO1xuXG4gICAgY29uc3QgbWF0Y2hQYXR0ZXJuID1cbiAgICAgICh3aWR0aCAmJiBhcmdzLm1hdGNoUGF0dGVybnNbd2lkdGhdKSB8fFxuICAgICAgYXJncy5tYXRjaFBhdHRlcm5zW2FyZ3MuZGVmYXVsdE1hdGNoV2lkdGhdO1xuICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKG1hdGNoUGF0dGVybik7XG5cbiAgICBpZiAoIW1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuXG4gICAgY29uc3QgcGFyc2VQYXR0ZXJucyA9XG4gICAgICAod2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSkgfHxcbiAgICAgIGFyZ3MucGFyc2VQYXR0ZXJuc1thcmdzLmRlZmF1bHRQYXJzZVdpZHRoXTtcblxuICAgIGNvbnN0IGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucylcbiAgICAgID8gZmluZEluZGV4KHBhcnNlUGF0dGVybnMsIChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZykpXG4gICAgICA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICAgICAgZmluZEtleShwYXJzZVBhdHRlcm5zLCAocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKGtleSkgOiBrZXk7XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgLS0gSSBjaGFsbGFuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgICAgICBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpXG4gICAgICA6IHZhbHVlO1xuXG4gICAgY29uc3QgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geyB2YWx1ZSwgcmVzdCB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChcbiAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiZcbiAgICAgIHByZWRpY2F0ZShvYmplY3Rba2V5XSlcbiAgICApIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAobGV0IGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gKHN0cmluZywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcblxuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKVxuICAgICAgOiBwYXJzZVJlc3VsdFswXTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFjayA/IG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIGNvbnN0IHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHsgdmFsdWUsIHJlc3QgfTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IGJ1aWxkTWF0Y2hGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hGbi5tanNcIjtcbmltcG9ydCB7IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuLm1qc1wiO1xuXG5jb25zdCBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL14oXFxkKykodGh8c3R8bmR8cmQpPy9pO1xuY29uc3QgcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9cXGQrL2k7XG5cbmNvbnN0IG1hdGNoRXJhUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYnxhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oYlxcLj9cXHM/Y1xcLj98YlxcLj9cXHM/Y1xcLj9cXHM/ZVxcLj98YVxcLj9cXHM/ZFxcLj98Y1xcLj9cXHM/ZVxcLj8pL2ksXG4gIHdpZGU6IC9eKGJlZm9yZSBjaHJpc3R8YmVmb3JlIGNvbW1vbiBlcmF8YW5ubyBkb21pbml8Y29tbW9uIGVyYSkvaSxcbn07XG5jb25zdCBwYXJzZUVyYVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmIvaSwgL14oYXxjKS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoUXVhcnRlclBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eWzEyMzRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXnFbMTIzNF0vaSxcbiAgd2lkZTogL15bMTIzNF0odGh8c3R8bmR8cmQpPyBxdWFydGVyL2ksXG59O1xuY29uc3QgcGFyc2VRdWFydGVyUGF0dGVybnMgPSB7XG4gIGFueTogWy8xL2ksIC8yL2ksIC8zL2ksIC80L2ldLFxufTtcblxuY29uc3QgbWF0Y2hNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW2pmbWFzb25kXS9pLFxuICBhYmJyZXZpYXRlZDogL14oamFufGZlYnxtYXJ8YXByfG1heXxqdW58anVsfGF1Z3xzZXB8b2N0fG5vdnxkZWMpL2ksXG4gIHdpZGU6IC9eKGphbnVhcnl8ZmVicnVhcnl8bWFyY2h8YXByaWx8bWF5fGp1bmV8anVseXxhdWd1c3R8c2VwdGVtYmVyfG9jdG9iZXJ8bm92ZW1iZXJ8ZGVjZW1iZXIpL2ksXG59O1xuY29uc3QgcGFyc2VNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFtcbiAgICAvXmovaSxcbiAgICAvXmYvaSxcbiAgICAvXm0vaSxcbiAgICAvXmEvaSxcbiAgICAvXm0vaSxcbiAgICAvXmovaSxcbiAgICAvXmovaSxcbiAgICAvXmEvaSxcbiAgICAvXnMvaSxcbiAgICAvXm8vaSxcbiAgICAvXm4vaSxcbiAgICAvXmQvaSxcbiAgXSxcblxuICBhbnk6IFtcbiAgICAvXmphL2ksXG4gICAgL15mL2ksXG4gICAgL15tYXIvaSxcbiAgICAvXmFwL2ksXG4gICAgL15tYXkvaSxcbiAgICAvXmp1bi9pLFxuICAgIC9eanVsL2ksXG4gICAgL15hdS9pLFxuICAgIC9ecy9pLFxuICAgIC9eby9pLFxuICAgIC9ebi9pLFxuICAgIC9eZC9pLFxuICBdLFxufTtcblxuY29uc3QgbWF0Y2hEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltzbXR3Zl0vaSxcbiAgc2hvcnQ6IC9eKHN1fG1vfHR1fHdlfHRofGZyfHNhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oc3VufG1vbnx0dWV8d2VkfHRodXxmcml8c2F0KS9pLFxuICB3aWRlOiAvXihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSkvaSxcbn07XG5jb25zdCBwYXJzZURheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXnMvaSwgL15tL2ksIC9edC9pLCAvXncvaSwgL150L2ksIC9eZi9pLCAvXnMvaV0sXG4gIGFueTogWy9ec3UvaSwgL15tL2ksIC9edHUvaSwgL153L2ksIC9edGgvaSwgL15mL2ksIC9ec2EvaV0sXG59O1xuXG5jb25zdCBtYXRjaERheVBlcmlvZFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGF8cHxtaXxufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaSxcbiAgYW55OiAvXihbYXBdXFwuP1xccz9tXFwuP3xtaWRuaWdodHxub29ufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaSxcbn07XG5jb25zdCBwYXJzZURheVBlcmlvZFBhdHRlcm5zID0ge1xuICBhbnk6IHtcbiAgICBhbTogL15hL2ksXG4gICAgcG06IC9ecC9pLFxuICAgIG1pZG5pZ2h0OiAvXm1pL2ksXG4gICAgbm9vbjogL15uby9pLFxuICAgIG1vcm5pbmc6IC9tb3JuaW5nL2ksXG4gICAgYWZ0ZXJub29uOiAvYWZ0ZXJub29uL2ksXG4gICAgZXZlbmluZzogL2V2ZW5pbmcvaSxcbiAgICBuaWdodDogL25pZ2h0L2ksXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgbWF0Y2ggPSB7XG4gIG9yZGluYWxOdW1iZXI6IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oe1xuICAgIG1hdGNoUGF0dGVybjogbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICBwYXJzZVBhdHRlcm46IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgdmFsdWVDYWxsYmFjazogKHZhbHVlKSA9PiBwYXJzZUludCh2YWx1ZSwgMTApLFxuICB9KSxcblxuICBlcmE6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgcXVhcnRlcjogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gICAgdmFsdWVDYWxsYmFjazogKGluZGV4KSA9PiBpbmRleCArIDEsXG4gIH0pLFxuXG4gIG1vbnRoOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwiYW55XCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2UgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlLm1qc1wiO1xuaW1wb3J0IHsgZm9ybWF0TG9uZyB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0TG9uZy5tanNcIjtcbmltcG9ydCB7IGZvcm1hdFJlbGF0aXZlIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS5tanNcIjtcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9sb2NhbGl6ZS5tanNcIjtcbmltcG9ydCB7IG1hdGNoIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9tYXRjaC5tanNcIjtcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTG9jYWxlc1xuICogQHN1bW1hcnkgRW5nbGlzaCBsb2NhbGUgKFVuaXRlZCBTdGF0ZXMpLlxuICogQGxhbmd1YWdlIEVuZ2xpc2hcbiAqIEBpc28tNjM5LTIgZW5nXG4gKiBAYXV0aG9yIFNhc2hhIEtvc3MgW0Brb3Nzbm9jb3JwXShodHRwczovL2dpdGh1Yi5jb20va29zc25vY29ycClcbiAqIEBhdXRob3IgTGVzaGEgS29zcyBbQGxlc2hha29zc10oaHR0cHM6Ly9naXRodWIuY29tL2xlc2hha29zcylcbiAqL1xuZXhwb3J0IGNvbnN0IGVuVVMgPSB7XG4gIGNvZGU6IFwiZW4tVVNcIixcbiAgZm9ybWF0RGlzdGFuY2U6IGZvcm1hdERpc3RhbmNlLFxuICBmb3JtYXRMb25nOiBmb3JtYXRMb25nLFxuICBmb3JtYXRSZWxhdGl2ZTogZm9ybWF0UmVsYXRpdmUsXG4gIGxvY2FsaXplOiBsb2NhbGl6ZSxcbiAgbWF0Y2g6IG1hdGNoLFxuICBvcHRpb25zOiB7XG4gICAgd2Vla1N0YXJ0c09uOiAwIC8qIFN1bmRheSAqLyxcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDEsXG4gIH0sXG59O1xuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGVuVVM7XG4iLCJsZXQgZGVmYXVsdE9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn1cbiIsIi8qKlxuICogQG1vZHVsZSBjb25zdGFudHNcbiAqIEBzdW1tYXJ5IFVzZWZ1bCBjb25zdGFudHNcbiAqIEBkZXNjcmlwdGlvblxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgZGF0ZSBjb25zdGFudHMuXG4gKlxuICogVGhlIGNvbnN0YW50cyBjb3VsZCBiZSBpbXBvcnRlZCBmcm9tIGBkYXRlLWZucy9jb25zdGFudHNgOlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBtYXhUaW1lLCBtaW5UaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGZ1bmN0aW9uIGlzQWxsb3dlZFRpbWUodGltZSkge1xuICogICByZXR1cm4gdGltZSA8PSBtYXhUaW1lICYmIHRpbWUgPj0gbWluVGltZTtcbiAqIH1cbiAqIGBgYFxuICovXG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5XZWVrXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IGRheXNJbldlZWsgPSA3O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgZGF5c0luWWVhclxuICogQHN1bW1hcnkgRGF5cyBpbiAxIHllYXIuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBIb3cgbWFueSBkYXlzIGluIGEgeWVhci5cbiAqXG4gKiBPbmUgeWVhcnMgZXF1YWxzIDM2NS4yNDI1IGRheXMgYWNjb3JkaW5nIHRvIHRoZSBmb3JtdWxhOlxuICpcbiAqID4gTGVhcCB5ZWFyIG9jY3VyZXMgZXZlcnkgNCB5ZWFycywgZXhjZXB0IGZvciB5ZWFycyB0aGF0IGFyZSBkaXZpc2FibGUgYnkgMTAwIGFuZCBub3QgZGl2aXNhYmxlIGJ5IDQwMC5cbiAqID4gMSBtZWFuIHllYXIgPSAoMzY1KzEvNC0xLzEwMCsxLzQwMCkgZGF5cyA9IDM2NS4yNDI1IGRheXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRheXNJblllYXIgPSAzNjUuMjQyNTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1heFRpbWVcbiAqIEBzdW1tYXJ5IE1heGltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtYXhUaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSA4NjQwMDAwMDAwMDAwMDAxIDw9IG1heFRpbWU7XG4gKiAvLz0+IGZhbHNlXG4gKlxuICogbmV3IERhdGUoODY0MDAwMDAwMDAwMDAwMSk7XG4gKiAvLz0+IEludmFsaWQgRGF0ZVxuICovXG5leHBvcnQgY29uc3QgbWF4VGltZSA9IE1hdGgucG93KDEwLCA4KSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW5UaW1lXG4gKiBAc3VtbWFyeSBNaW5pbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgbWluVGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBjb25zdCBpc1ZhbGlkID0gLTg2NDAwMDAwMDAwMDAwMDEgPj0gbWluVGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSgtODY0MDAwMDAwMDAwMDAwMSlcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtaW5UaW1lID0gLW1heFRpbWU7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbldlZWsgPSA2MDQ4MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5EYXkgPSA4NjQwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luTWludXRlXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBtaW51dGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luTWludXRlID0gNjAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIGhvdXJcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luSG91ciA9IDM2MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJblNlY29uZFxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgc2Vjb25kXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJblNlY29uZCA9IDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5ZZWFyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJblllYXIgPSA1MjU2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Nb250aFxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIG1vbnRoLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luTW9udGggPSA0MzIwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkRheVxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkRheSA9IDE0NDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Ib3VyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgaG91ci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luUXVhcnRlclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luUXVhcnRlciA9IDM7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtb250aHNJblllYXJcbiAqIEBzdW1tYXJ5IE1vbnRocyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtb250aHNJblllYXIgPSAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHF1YXJ0ZXJzSW5ZZWFyXG4gKiBAc3VtbWFyeSBRdWFydGVycyBpbiAxIHllYXJcbiAqL1xuZXhwb3J0IGNvbnN0IHF1YXJ0ZXJzSW5ZZWFyID0gNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luSG91ciA9IDM2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtaW51dGUuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5NaW51dGUgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbkRheSA9IHNlY29uZHNJbkhvdXIgKiAyNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luV2VlayA9IHNlY29uZHNJbkRheSAqIDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5ZZWFyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblllYXIgPSBzZWNvbmRzSW5EYXkgKiBkYXlzSW5ZZWFyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luTW9udGhcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtb250aFxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luTW9udGggPSBzZWNvbmRzSW5ZZWFyIC8gMTI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblF1YXJ0ZXIgPSBzZWNvbmRzSW5Nb250aCAqIDM7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF5KGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZkRheTtcbiIsIi8qKlxuICogR29vZ2xlIENocm9tZSBhcyBvZiA2Ny4wLjMzOTYuODcgaW50cm9kdWNlZCB0aW1lem9uZXMgd2l0aCBvZmZzZXQgdGhhdCBpbmNsdWRlcyBzZWNvbmRzLlxuICogVGhleSB1c3VhbGx5IGFwcGVhciBmb3IgZGF0ZXMgdGhhdCBkZW5vdGUgdGltZSBiZWZvcmUgdGhlIHRpbWV6b25lcyB3ZXJlIGludHJvZHVjZWRcbiAqIChlLmcuIGZvciAnRXVyb3BlL1ByYWd1ZScgdGltZXpvbmUgdGhlIG9mZnNldCBpcyBHTVQrMDA6NTc6NDQgYmVmb3JlIDEgT2N0b2JlciAxODkxXG4gKiBhbmQgR01UKzAxOjAwOjAwIGFmdGVyIHRoYXQgZGF0ZSlcbiAqXG4gKiBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgdGhlIG9mZnNldCBpbiBtaW51dGVzIGFuZCB3b3VsZCByZXR1cm4gNTcgZm9yIHRoZSBleGFtcGxlIGFib3ZlLFxuICogd2hpY2ggd291bGQgbGVhZCB0byBpbmNvcnJlY3QgY2FsY3VsYXRpb25zLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGltZXpvbmUgb2Zmc2V0IGluIG1pbGxpc2Vjb25kcyB0aGF0IHRha2VzIHNlY29uZHMgaW4gYWNjb3VudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZSkge1xuICBjb25zdCB1dGNEYXRlID0gbmV3IERhdGUoXG4gICAgRGF0ZS5VVEMoXG4gICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBkYXRlLmdldE1vbnRoKCksXG4gICAgICBkYXRlLmdldERhdGUoKSxcbiAgICAgIGRhdGUuZ2V0SG91cnMoKSxcbiAgICAgIGRhdGUuZ2V0TWludXRlcygpLFxuICAgICAgZGF0ZS5nZXRTZWNvbmRzKCksXG4gICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpLFxuICAgICksXG4gICk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59XG4iLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbkRheSB9IGZyb20gXCIuL2NvbnN0YW50cy5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiLi9zdGFydE9mRGF5Lm1qc1wiO1xuaW1wb3J0IHsgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyB9IGZyb20gXCIuL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuIFRoaXMgbWVhbnMgdGhhdCB0aGUgdGltZXMgYXJlIHJlbW92ZWRcbiAqIGZyb20gdGhlIGRhdGVzIGFuZCB0aGVuIHRoZSBkaWZmZXJlbmNlIGluIGRheXMgaXMgY2FsY3VsYXRlZC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZUxlZnQgLSBUaGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIGRhdGVSaWdodCAtIFRoZSBlYXJsaWVyIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6MDA6MDAgYW5kIDIgSnVseSAyMDEyIDAwOjAwOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDEyLCA2LCAyLCAwLCAwKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDApXG4gKiApXG4gKiAvLz0+IDM2NlxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6NTk6MDAgYW5kIDMgSnVseSAyMDExIDAwOjAxOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAzLCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDU5KVxuICogKVxuICogLy89PiAxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQsIGRhdGVSaWdodCkge1xuICBjb25zdCBzdGFydE9mRGF5TGVmdCA9IHN0YXJ0T2ZEYXkoZGF0ZUxlZnQpO1xuICBjb25zdCBzdGFydE9mRGF5UmlnaHQgPSBzdGFydE9mRGF5KGRhdGVSaWdodCk7XG5cbiAgY29uc3QgdGltZXN0YW1wTGVmdCA9XG4gICAgc3RhcnRPZkRheUxlZnQuZ2V0VGltZSgpIC0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhzdGFydE9mRGF5TGVmdCk7XG4gIGNvbnN0IHRpbWVzdGFtcFJpZ2h0ID1cbiAgICBzdGFydE9mRGF5UmlnaHQuZ2V0VGltZSgpIC1cbiAgICBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlSaWdodCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIGRheSBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIGRheSBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aW1lc3RhbXBMZWZ0IC0gdGltZXN0YW1wUmlnaHQpIC8gbWlsbGlzZWNvbmRzSW5EYXkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cztcbiIsIi8qKlxuICogQG5hbWUgY29uc3RydWN0RnJvbVxuICogQGNhdGVnb3J5IEdlbmVyaWMgSGVscGVyc1xuICogQHN1bW1hcnkgQ29uc3RydWN0cyBhIGRhdGUgdXNpbmcgdGhlIHJlZmVyZW5jZSBkYXRlIGFuZCB0aGUgdmFsdWVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBmdW5jdGlvbiBjb25zdHJ1Y3RzIGEgbmV3IGRhdGUgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIGZyb20gdGhlIHJlZmVyZW5jZVxuICogZGF0ZSBhbmQgdGhlIGdpdmVuIHZhbHVlLiBJdCBoZWxwcyB0byBidWlsZCBnZW5lcmljIGZ1bmN0aW9ucyB0aGF0IGFjY2VwdFxuICogZGF0ZSBleHRlbnNpb25zLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRha2UgY29uc3RydWN0b3IgZnJvbVxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNyZWF0ZSB0aGUgZGF0ZVxuICpcbiAqIEByZXR1cm5zIERhdGUgaW5pdGlhbGl6ZWQgdXNpbmcgdGhlIGdpdmVuIGRhdGUgYW5kIHZhbHVlXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tICdkYXRlLWZucydcbiAqXG4gKiAvLyBBIGZ1bmN0aW9uIHRoYXQgY2xvbmVzIGEgZGF0ZSBwcmVzZXJ2aW5nIHRoZSBvcmlnaW5hbCB0eXBlXG4gKiBmdW5jdGlvbiBjbG9uZURhdGU8RGF0ZVR5cGUgZXh0ZW5kcyBEYXRlKGRhdGU6IERhdGVUeXBlKTogRGF0ZVR5cGUge1xuICogICByZXR1cm4gY29uc3RydWN0RnJvbShcbiAqICAgICBkYXRlLCAvLyBVc2UgY29udHJ1c3RvciBmcm9tIHRoZSBnaXZlbiBkYXRlXG4gKiAgICAgZGF0ZS5nZXRUaW1lKCkgLy8gVXNlIHRoZSBkYXRlIHZhbHVlIHRvIGNyZWF0ZSBhIG5ldyBkYXRlXG4gKiAgIClcbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdEZyb20oZGF0ZSwgdmFsdWUpIHtcbiAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBkYXRlLmNvbnN0cnVjdG9yKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgY29uc3RydWN0RnJvbTtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZZZWFyXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHllYXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mWWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDAwKSlcbiAqIC8vPT4gV2VkIEphbiAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mWWVhcihkYXRlKSB7XG4gIGNvbnN0IGNsZWFuRGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgX2RhdGUgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBfZGF0ZS5zZXRGdWxsWWVhcihjbGVhbkRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZlllYXI7XG4iLCJpbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMgfSBmcm9tIFwiLi9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZZZWFyLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGdldERheU9mWWVhclxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGRheSBvZiB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgZGF5IG9mIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF5IG9mIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggZGF5IG9mIHRoZSB5ZWFyIGlzIDIgSnVseSAyMDE0P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0RGF5T2ZZZWFyKG5ldyBEYXRlKDIwMTQsIDYsIDIpKVxuICogLy89PiAxODNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mWWVhcihkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkaWZmID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKF9kYXRlLCBzdGFydE9mWWVhcihfZGF0ZSkpO1xuICBjb25zdCBkYXlPZlllYXIgPSBkaWZmICsgMTtcbiAgcmV0dXJuIGRheU9mWWVhcjtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXREYXlPZlllYXI7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG5cbiAgX2RhdGUuc2V0RGF0ZShfZGF0ZS5nZXREYXRlKCkgLSBkaWZmKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mV2VlaztcbiIsImltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZklTT1dlZWtcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhbiBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mSVNPV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZJU09XZWVrKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZXZWVrKGRhdGUsIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZJU09XZWVrO1xuIiwiaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20ubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mSVNPV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGdldElTT1dlZWtZZWFyXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBJU08td2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldElTT1dlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiAyMDA0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJU09XZWVrWWVhcihkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gX2RhdGUuZ2V0RnVsbFllYXIoKTtcblxuICBjb25zdCBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIpO1xuXG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldEZ1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb25zdCBzdGFydE9mVGhpc1llYXIgPSBzdGFydE9mSVNPV2Vlayhmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyKTtcblxuICBpZiAoX2RhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDE7XG4gIH0gZWxzZSBpZiAoX2RhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZUaGlzWWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDE7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXRJU09XZWVrWWVhcjtcbiIsImltcG9ydCB7IGdldElTT1dlZWtZZWFyIH0gZnJvbSBcIi4vZ2V0SVNPV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mSVNPV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20ubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZklTT1dlZWtZZWFyXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyLFxuICogd2hpY2ggYWx3YXlzIHN0YXJ0cyAzIGRheXMgYmVmb3JlIHRoZSB5ZWFyJ3MgZmlyc3QgVGh1cnNkYXkuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDU6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mSVNPV2Vla1llYXIobmV3IERhdGUoMjAwNSwgNiwgMikpXG4gKiAvLz0+IE1vbiBKYW4gMDMgMjAwNSAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZklTT1dlZWtZZWFyKGRhdGUpIHtcbiAgY29uc3QgeWVhciA9IGdldElTT1dlZWtZZWFyKGRhdGUpO1xuICBjb25zdCBmb3VydGhPZkphbnVhcnkgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmb3VydGhPZkphbnVhcnkuc2V0RnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZklTT1dlZWtZZWFyO1xuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5XZWVrIH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZklTT1dlZWsgfSBmcm9tIFwiLi9zdGFydE9mSVNPV2Vlay5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBnZXRJU09XZWVrXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBJU08gd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgSVNPLXdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDU/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRJU09XZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiA1M1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPV2VlayhkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkaWZmID1cbiAgICBzdGFydE9mSVNPV2VlayhfZGF0ZSkuZ2V0VGltZSgpIC0gc3RhcnRPZklTT1dlZWtZZWFyKF9kYXRlKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIG1pbGxpc2Vjb25kc0luV2VlaykgKyAxO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldElTT1dlZWs7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBnZXRXZWVrWWVhcn0gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGdldFdlZWtZZWFyXG4gKiBAY2F0ZWdvcnkgV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgZXhhY3QgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgdmFsdWVzIG9mXG4gKiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gICh3aGljaCBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlaylcbiAqIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgICh3aGljaCBpcyB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzIGFsd2F5cyBpblxuICogdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIpXG4gKlxuICogV2VlayBudW1iZXJpbmc6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlZWsjVGhlX0lTT193ZWVrX2RhdGVfc3lzdGVtXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICpcbiAqIEByZXR1cm5zIFRoZSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMjYgRGVjZW1iZXIgMjAwNCB3aXRoIHRoZSBkZWZhdWx0IHNldHRpbmdzP1xuICogY29uc3QgcmVzdWx0ID0gZ2V0V2Vla1llYXIobmV3IERhdGUoMjAwNCwgMTEsIDI2KSlcbiAqIC8vPT4gMjAwNVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB3ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDI2IERlY2VtYmVyIDIwMDQgaWYgd2VlayBzdGFydHMgb24gU2F0dXJkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrWWVhcihuZXcgRGF0ZSgyMDA0LCAxMSwgMjYpLCB7IHdlZWtTdGFydHNPbjogNiB9KVxuICogLy89PiAyMDA0XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMjYgRGVjZW1iZXIgMjAwNCBpZiB0aGUgZmlyc3Qgd2VlayBjb250YWlucyA0IEphbnVhcnk/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrWWVhcihuZXcgRGF0ZSgyMDA0LCAxMSwgMjYpLCB7IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogNCB9KVxuICogLy89PiAyMDA0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrWWVhcihkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gX2RhdGUuZ2V0RnVsbFllYXIoKTtcblxuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9XG4gICAgb3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIDE7XG5cbiAgY29uc3QgZmlyc3RXZWVrT2ZOZXh0WWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vla09mTmV4dFllYXIuc2V0RnVsbFllYXIoeWVhciArIDEsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vla09mTmV4dFllYXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZXZWVrKGZpcnN0V2Vla09mTmV4dFllYXIsIG9wdGlvbnMpO1xuXG4gIGNvbnN0IGZpcnN0V2Vla09mVGhpc1llYXIgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmaXJzdFdlZWtPZlRoaXNZZWFyLnNldEZ1bGxZZWFyKHllYXIsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZXZWVrKGZpcnN0V2Vla09mVGhpc1llYXIsIG9wdGlvbnMpO1xuXG4gIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZlRoaXNZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldFdlZWtZZWFyO1xuIiwiaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20ubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrWWVhciB9IGZyb20gXCIuL2dldFdlZWtZZWFyLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIHN0YXJ0T2ZXZWVrWWVhcn0gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrWWVhclxuICogQGNhdGVnb3J5IFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIuXG4gKiBUaGUgZXhhY3QgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgdmFsdWVzIG9mXG4gKiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gICh3aGljaCBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlaylcbiAqIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgICh3aGljaCBpcyB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzIGFsd2F5cyBpblxuICogdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIpXG4gKlxuICogV2VlayBudW1iZXJpbmc6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlZWsjVGhlX0lTT193ZWVrX2RhdGVfc3lzdGVtXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gYSB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNSB3aXRoIGRlZmF1bHQgc2V0dGluZ3M6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2Vla1llYXIobmV3IERhdGUoMjAwNSwgNiwgMikpXG4gKiAvLz0+IFN1biBEZWMgMjYgMjAwNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNVxuICogLy8gaWYgTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2Ygd2Vla1xuICogLy8gYW5kIDQgSmFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXI6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2Vla1llYXIobmV3IERhdGUoMjAwNSwgNiwgMiksIHtcbiAqICAgd2Vla1N0YXJ0c09uOiAxLFxuICogICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDRcbiAqIH0pXG4gKiAvLz0+IE1vbiBKYW4gMDMgMjAwNSAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZldlZWtZZWFyKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCBmaXJzdFdlZWtDb250YWluc0RhdGUgPVxuICAgIG9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICAxO1xuXG4gIGNvbnN0IHllYXIgPSBnZXRXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgY29uc3QgZmlyc3RXZWVrID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZmlyc3RXZWVrLnNldEZ1bGxZZWFyKHllYXIsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vlay5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3QgX2RhdGUgPSBzdGFydE9mV2VlayhmaXJzdFdlZWssIG9wdGlvbnMpO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZldlZWtZZWFyO1xuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5XZWVrIH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGdldFdlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBnZXRXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGxvY2FsIHdlZWsgaW5kZXggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGxvY2FsIHdlZWsgaW5kZXggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgZXhhY3QgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgdmFsdWVzIG9mXG4gKiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gICh3aGljaCBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlaylcbiAqIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgICh3aGljaCBpcyB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzIGFsd2F5cyBpblxuICogdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIpXG4gKlxuICogV2VlayBudW1iZXJpbmc6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlZWsjVGhlX0lTT193ZWVrX2RhdGVfc3lzdGVtXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgbG9jYWwgd2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNSB3aXRoIGRlZmF1bHQgb3B0aW9ucz9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWsobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgbG9jYWwgd2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNSxcbiAqIC8vIGlmIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLFxuICogLy8gYW5kIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyIGFsd2F5cyBjb250YWlucyA0IEphbnVhcnk/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpLCB7XG4gKiAgIHdlZWtTdGFydHNPbjogMSxcbiAqICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0XG4gKiB9KVxuICogLy89PiA1M1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRpZmYgPVxuICAgIHN0YXJ0T2ZXZWVrKF9kYXRlLCBvcHRpb25zKS5nZXRUaW1lKCkgLVxuICAgIHN0YXJ0T2ZXZWVrWWVhcihfZGF0ZSwgb3B0aW9ucykuZ2V0VGltZSgpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBtaWxsaXNlY29uZHNJbldlZWspICsgMTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXRXZWVrO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIHRhcmdldExlbmd0aCkge1xuICBjb25zdCBzaWduID0gbnVtYmVyIDwgMCA/IFwiLVwiIDogXCJcIjtcbiAgY29uc3Qgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpLnBhZFN0YXJ0KHRhcmdldExlbmd0aCwgXCIwXCIpO1xuICByZXR1cm4gc2lnbiArIG91dHB1dDtcbn1cbiIsImltcG9ydCB7IGFkZExlYWRpbmdaZXJvcyB9IGZyb20gXCIuLi9hZGRMZWFkaW5nWmVyb3MubWpzXCI7XG5cbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICovXG5cbmV4cG9ydCBjb25zdCBsaWdodEZvcm1hdHRlcnMgPSB7XG4gIC8vIFllYXJcbiAgeShkYXRlLCB0b2tlbikge1xuICAgIC8vIEZyb20gaHR0cDovL3d3dy51bmljb2RlLm9yZy9yZXBvcnRzL3RyMzUvdHIzNS0zMS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9Gb3JtYXRfdG9rZW5zXG4gICAgLy8gfCBZZWFyICAgICB8ICAgICB5IHwgeXkgfCAgIHl5eSB8ICB5eXl5IHwgeXl5eXkgfFxuICAgIC8vIHwtLS0tLS0tLS0tfC0tLS0tLS18LS0tLXwtLS0tLS0tfC0tLS0tLS18LS0tLS0tLXxcbiAgICAvLyB8IEFEIDEgICAgIHwgICAgIDEgfCAwMSB8ICAgMDAxIHwgIDAwMDEgfCAwMDAwMSB8XG4gICAgLy8gfCBBRCAxMiAgICB8ICAgIDEyIHwgMTIgfCAgIDAxMiB8ICAwMDEyIHwgMDAwMTIgfFxuICAgIC8vIHwgQUQgMTIzICAgfCAgIDEyMyB8IDIzIHwgICAxMjMgfCAgMDEyMyB8IDAwMTIzIHxcbiAgICAvLyB8IEFEIDEyMzQgIHwgIDEyMzQgfCAzNCB8ICAxMjM0IHwgIDEyMzQgfCAwMTIzNCB8XG4gICAgLy8gfCBBRCAxMjM0NSB8IDEyMzQ1IHwgNDUgfCAxMjM0NSB8IDEyMzQ1IHwgMTIzNDUgfFxuXG4gICAgY29uc3Qgc2lnbmVkWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIGNvbnN0IHllYXIgPSBzaWduZWRZZWFyID4gMCA/IHNpZ25lZFllYXIgOiAxIC0gc2lnbmVkWWVhcjtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRva2VuID09PSBcInl5XCIgPyB5ZWFyICUgMTAwIDogeWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNb250aFxuICBNKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgcmV0dXJuIHRva2VuID09PSBcIk1cIiA/IFN0cmluZyhtb250aCArIDEpIDogYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldERhdGUoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBBTSBvciBQTVxuICBhKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF0ZS5nZXRIb3VycygpIC8gMTIgPj0gMSA/IFwicG1cIiA6IFwiYW1cIjtcblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICBjYXNlIFwiYWFcIjpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY2FzZSBcImFhYVwiOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlO1xuICAgICAgY2FzZSBcImFhYWFhXCI6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWVbMF07XG4gICAgICBjYXNlIFwiYWFhYVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZSA9PT0gXCJhbVwiID8gXCJhLm0uXCIgOiBcInAubS5cIjtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91ciBbMS0xMl1cbiAgaChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRIb3VycygpICUgMTIgfHwgMTIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSG91ciBbMC0yM11cbiAgSChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRIb3VycygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIE1pbnV0ZVxuICBtKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1pbnV0ZXMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBTZWNvbmRcbiAgcyhkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRTZWNvbmRzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFMoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBudW1iZXJPZkRpZ2l0cyA9IHRva2VuLmxlbmd0aDtcbiAgICBjb25zdCBtaWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpO1xuICAgIGNvbnN0IGZyYWN0aW9uYWxTZWNvbmRzID0gTWF0aC5mbG9vcihcbiAgICAgIG1pbGxpc2Vjb25kcyAqIE1hdGgucG93KDEwLCBudW1iZXJPZkRpZ2l0cyAtIDMpLFxuICAgICk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmcmFjdGlvbmFsU2Vjb25kcywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBnZXREYXlPZlllYXIgfSBmcm9tIFwiLi4vLi4vZ2V0RGF5T2ZZZWFyLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCIuLi8uLi9nZXRJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi4vLi4vZ2V0SVNPV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrIH0gZnJvbSBcIi4uLy4uL2dldFdlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrWWVhciB9IGZyb20gXCIuLi8uLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IGFkZExlYWRpbmdaZXJvcyB9IGZyb20gXCIuLi9hZGRMZWFkaW5nWmVyb3MubWpzXCI7XG5pbXBvcnQgeyBsaWdodEZvcm1hdHRlcnMgfSBmcm9tIFwiLi9saWdodEZvcm1hdHRlcnMubWpzXCI7XG5cbmNvbnN0IGRheVBlcmlvZEVudW0gPSB7XG4gIGFtOiBcImFtXCIsXG4gIHBtOiBcInBtXCIsXG4gIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gIG5vb246IFwibm9vblwiLFxuICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgYWZ0ZXJub29uOiBcImFmdGVybm9vblwiLFxuICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgbmlnaHQ6IFwibmlnaHRcIixcbn07XG5cbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8IE1pbGxpc2Vjb25kcyBpbiBkYXkgICAgICAgICAgICB8XG4gKiB8ICBiICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICB8ICBCICB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICB8XG4gKiB8ICBjICB8IFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrICB8ICBDKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBlICB8IExvY2FsIGRheSBvZiB3ZWVrICAgICAgICAgICAgICB8ICBFICB8IERheSBvZiB3ZWVrICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBmICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBGKiB8IERheSBvZiB3ZWVrIGluIG1vbnRoICAgICAgICAgICB8XG4gKiB8ICBnKiB8IE1vZGlmaWVkIEp1bGlhbiBkYXkgICAgICAgICAgICB8ICBHICB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBpISB8IElTTyBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgICB8ICBJISB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICB8XG4gKiB8ICBqKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8ICBKKiB8IExvY2FsaXplZCBob3VyIHcvbyBkYXkgcGVyaW9kICB8XG4gKiB8ICBrICB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICB8ICBLICB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBsKiB8IChkZXByZWNhdGVkKSAgICAgICAgICAgICAgICAgICB8ICBMICB8IFN0YW5kLWFsb25lIG1vbnRoICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBuICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBOICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBvISB8IE9yZGluYWwgbnVtYmVyIG1vZGlmaWVyICAgICAgICB8ICBPICB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICB8XG4gKiB8ICBwISB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICB8ICBQISB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICB8XG4gKiB8ICBxICB8IFN0YW5kLWFsb25lIHF1YXJ0ZXIgICAgICAgICAgICB8ICBRICB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICByKiB8IFJlbGF0ZWQgR3JlZ29yaWFuIHllYXIgICAgICAgICB8ICBSISB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB0ISB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICB8ICBUISB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICB8XG4gKiB8ICB1ICB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICB8ICBVKiB8IEN5Y2xpYyB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICB2KiB8IFRpbWV6b25lIChnZW5lcmljIG5vbi1sb2NhdC4pICB8ICBWKiB8IFRpbWV6b25lIChsb2NhdGlvbikgICAgICAgICAgICB8XG4gKiB8ICB3ICB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICB8ICBXKiB8IFdlZWsgb2YgbW9udGggICAgICAgICAgICAgICAgICB8XG4gKiB8ICB4ICB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICB8ICBYICB8IFRpbWV6b25lIChJU08tODYwMSkgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICB8XG4gKiB8ICB6ICB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSB8ICBaKiB8IFRpbWV6b25lIChhbGlhc2VzKSAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICEgYXJlIG5vbi1zdGFuZGFyZCwgYnV0IGltcGxlbWVudGVkIGJ5IGRhdGUtZm5zOlxuICogLSBgb2AgbW9kaWZpZXMgdGhlIHByZXZpb3VzIHRva2VuIHRvIHR1cm4gaXQgaW50byBhbiBvcmRpbmFsIChzZWUgYGZvcm1hdGAgZG9jcylcbiAqIC0gYGlgIGlzIElTTyBkYXkgb2Ygd2Vlay4gRm9yIGBpYCBhbmQgYGlpYCBpcyByZXR1cm5zIG51bWVyaWMgSVNPIHdlZWsgZGF5cyxcbiAqICAgaS5lLiA3IGZvciBTdW5kYXksIDEgZm9yIE1vbmRheSwgZXRjLlxuICogLSBgSWAgaXMgSVNPIHdlZWsgb2YgeWVhciwgYXMgb3Bwb3NlZCB0byBgd2Agd2hpY2ggaXMgbG9jYWwgd2VlayBvZiB5ZWFyLlxuICogLSBgUmAgaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsIGFzIG9wcG9zZWQgdG8gYFlgIHdoaWNoIGlzIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIuXG4gKiAgIGBSYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYElgIGFuZCBgaWBcbiAqICAgZm9yIHVuaXZlcnNhbCBJU08gd2Vlay1udW1iZXJpbmcgZGF0ZSwgd2hlcmVhc1xuICogICBgWWAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGB3YCBhbmQgYGVgXG4gKiAgIGZvciB3ZWVrLW51bWJlcmluZyBkYXRlIHNwZWNpZmljIHRvIHRoZSBsb2NhbGUuXG4gKiAtIGBQYCBpcyBsb25nIGxvY2FsaXplZCBkYXRlIGZvcm1hdFxuICogLSBgcGAgaXMgbG9uZyBsb2NhbGl6ZWQgdGltZSBmb3JtYXRcbiAqL1xuXG5leHBvcnQgY29uc3QgZm9ybWF0dGVycyA9IHtcbiAgLy8gRXJhXG4gIEc6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBlcmEgPSBkYXRlLmdldEZ1bGxZZWFyKCkgPiAwID8gMSA6IDA7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gQUQsIEJDXG4gICAgICBjYXNlIFwiR1wiOlxuICAgICAgY2FzZSBcIkdHXCI6XG4gICAgICBjYXNlIFwiR0dHXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcImFiYnJldmlhdGVkXCIgfSk7XG4gICAgICAvLyBBLCBCXG4gICAgICBjYXNlIFwiR0dHR0dcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHsgd2lkdGg6IFwibmFycm93XCIgfSk7XG4gICAgICAvLyBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdFxuICAgICAgY2FzZSBcIkdHR0dcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcIndpZGVcIiB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09IFwieW9cIikge1xuICAgICAgY29uc3Qgc2lnbmVkWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgICBjb25zdCB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih5ZWFyLCB7IHVuaXQ6IFwieWVhclwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMueShkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhclxuICBZOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc2lnbmVkV2Vla1llYXIgPSBnZXRXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIGNvbnN0IHdlZWtZZWFyID0gc2lnbmVkV2Vla1llYXIgPiAwID8gc2lnbmVkV2Vla1llYXIgOiAxIC0gc2lnbmVkV2Vla1llYXI7XG5cbiAgICAvLyBUd28gZGlnaXQgeWVhclxuICAgIGlmICh0b2tlbiA9PT0gXCJZWVwiKSB7XG4gICAgICBjb25zdCB0d29EaWdpdFllYXIgPSB3ZWVrWWVhciAlIDEwMDtcbiAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModHdvRGlnaXRZZWFyLCAyKTtcbiAgICB9XG5cbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gXCJZb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrWWVhciwgeyB1bml0OiBcInllYXJcIiB9KTtcbiAgICB9XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICBSOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBpc29XZWVrWWVhciA9IGdldElTT1dlZWtZZWFyKGRhdGUpO1xuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRXh0ZW5kZWQgeWVhci4gVGhpcyBpcyBhIHNpbmdsZSBudW1iZXIgZGVzaWduYXRpbmcgdGhlIHllYXIgb2YgdGhpcyBjYWxlbmRhciBzeXN0ZW0uXG4gIC8vIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBsb2NhbGl6ZXJzIGFyZSBCLkMuIHllYXJzOlxuICAvLyB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICAvLyB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICAvLyB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICAvLyB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICAvLyB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICAvLyBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gIC8vIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZC5cbiAgdTogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gUXVhcnRlclxuICBROiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlIFwiUVwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgXCJRUVwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlIFwiUW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwgeyB1bml0OiBcInF1YXJ0ZXJcIiB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlIFwiUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSBcIlFRUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSBcIlFRUVFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBTdGFuZC1hbG9uZSBxdWFydGVyXG4gIHE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldE1vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgXCJxXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSBcInFxXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgXCJxb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7IHVuaXQ6IFwicXVhcnRlclwiIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgXCJxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlIFwicXFxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlIFwicXFxcVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1vbnRoXG4gIE06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiTVwiOlxuICAgICAgY2FzZSBcIk1NXCI6XG4gICAgICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuTShkYXRlLCB0b2tlbik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIk1NTVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIk1NTU1NXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTU1NTVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJmb3JtYXR0aW5nXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIG1vbnRoXG4gIEw6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAuLi4sIDEyXG4gICAgICBjYXNlIFwiTFwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKG1vbnRoICsgMSk7XG4gICAgICAvLyAwMSwgMDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgXCJMTFwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTG9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIkxMTFwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIkxMTExMXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTExMTFwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJzdGFuZGFsb25lXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIExvY2FsIHdlZWsgb2YgeWVhclxuICB3OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgd2VlayA9IGdldFdlZWsoZGF0ZSwgb3B0aW9ucyk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwid29cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWsgb2YgeWVhclxuICBJOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaXNvV2VlayA9IGdldElTT1dlZWsoZGF0ZSk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwiSW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaXNvV2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb1dlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcImRvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0RGF0ZSgpLCB7IHVuaXQ6IFwiZGF0ZVwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuZChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXJcbiAgRDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGRheU9mWWVhciA9IGdldERheU9mWWVhcihkYXRlKTtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJEb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXlPZlllYXIsIHsgdW5pdDogXCJkYXlPZlllYXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRheU9mWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2Vla1xuICBFOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgXCJFXCI6XG4gICAgICBjYXNlIFwiRUVcIjpcbiAgICAgIGNhc2UgXCJFRUVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgXCJFRUVFRVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlIFwiRUVFRUVFXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwic2hvcnRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlIFwiRUVFRVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBMb2NhbCBkYXkgb2Ygd2Vla1xuICBlOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoTnRoIGRheSBvZiB3ZWVrIHdpdGggY3VycmVudCBsb2NhbGUgb3Igd2Vla1N0YXJ0c09uKVxuICAgICAgY2FzZSBcImVcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlIFwiZWVcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJlb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImVlZVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImVlZWVlXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJlZWVlZWVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJlZWVlXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrXG4gIGM6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChzYW1lIGFzIGluIGBlYClcbiAgICAgIGNhc2UgXCJjXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSBcImNjXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJjb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImNjY1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImNjY2NjXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJjY2NjY2NcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJjY2NjXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIElTTyBkYXkgb2Ygd2Vla1xuICBpOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBpc29EYXlPZldlZWsgPSBkYXlPZldlZWsgPT09IDAgPyA3IDogZGF5T2ZXZWVrO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDJcbiAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcoaXNvRGF5T2ZXZWVrKTtcbiAgICAgIC8vIDAyXG4gICAgICBjYXNlIFwiaWlcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29EYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAybmRcbiAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29EYXlPZldlZWssIHsgdW5pdDogXCJkYXlcIiB9KTtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSBcImlpaVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImlpaWlpXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJpaWlpaWlcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJpaWlpXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNIG9yIFBNXG4gIGE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgY2FzZSBcImFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYWFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJhYWFhYVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJhYWFhXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNLCBQTSwgbWlkbmlnaHQsIG5vb25cbiAgYjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubWlkbmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/IFwicG1cIiA6IFwiYW1cIjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgY2FzZSBcImJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYmJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJiYmJiYlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJiYmJiXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIGluIHRoZSBtb3JuaW5nLCBpbiB0aGUgYWZ0ZXJub29uLCBpbiB0aGUgZXZlbmluZywgYXQgbmlnaHRcbiAgQjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID49IDE3KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmV2ZW5pbmc7XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5hZnRlcm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSA0KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1vcm5pbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubmlnaHQ7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcIkJcIjpcbiAgICAgIGNhc2UgXCJCQlwiOlxuICAgICAgY2FzZSBcIkJCQlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJCXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91ciBbMS0xMl1cbiAgaDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJob1wiKSB7XG4gICAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcbiAgICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAxMjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuaChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJIb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldEhvdXJzKCksIHsgdW5pdDogXCJob3VyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5IKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBIb3VyIFswLTExXVxuICBLOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJLb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3VycywgeyB1bml0OiBcImhvdXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGhvdXJzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEhvdXIgWzEtMjRdXG4gIGs6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDI0O1xuXG4gICAgaWYgKHRva2VuID09PSBcImtvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTWludXRlXG4gIG06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwibW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRNaW51dGVzKCksIHsgdW5pdDogXCJtaW51dGVcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLm0oZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcInNvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0U2Vjb25kcygpLCB7IHVuaXQ6IFwic2Vjb25kXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5zKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUzogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5TKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYWx3YXlzIGAnWidgKVxuICBYOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICBpZiAodGltZXpvbmVPZmZzZXQgPT09IDApIHtcbiAgICAgIHJldHVybiBcIlpcIjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBIb3VycyBhbmQgb3B0aW9uYWwgbWludXRlc1xuICAgICAgY2FzZSBcIlhcIjpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYYFxuICAgICAgY2FzZSBcIlhYWFhcIjpcbiAgICAgIGNhc2UgXCJYWFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgWFhYYFxuICAgICAgY2FzZSBcIlhYWFhYXCI6XG4gICAgICBjYXNlIFwiWFhYXCI6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIFRpbWV6b25lIChJU08tODYwMS4gSWYgb2Zmc2V0IGlzIDAsIG91dHB1dCBpcyBgJyswMDowMCdgIG9yIGVxdWl2YWxlbnQpXG4gIHg6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEhvdXJzIGFuZCBvcHRpb25hbCBtaW51dGVzXG4gICAgICBjYXNlIFwieFwiOlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgeHhgXG4gICAgICBjYXNlIFwieHh4eFwiOlxuICAgICAgY2FzZSBcInh4XCI6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eHhgXG4gICAgICBjYXNlIFwieHh4eHhcIjpcbiAgICAgIGNhc2UgXCJ4eHhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gVGltZXpvbmUgKEdNVClcbiAgTzogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICBjb25zdCB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgXCJPXCI6XG4gICAgICBjYXNlIFwiT09cIjpcbiAgICAgIGNhc2UgXCJPT09cIjpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlIFwiT09PT1wiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0aW9uKVxuICB6OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBTaG9ydFxuICAgICAgY2FzZSBcInpcIjpcbiAgICAgIGNhc2UgXCJ6elwiOlxuICAgICAgY2FzZSBcInp6elwiOlxuICAgICAgICByZXR1cm4gXCJHTVRcIiArIGZvcm1hdFRpbWV6b25lU2hvcnQodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICAgIC8vIExvbmdcbiAgICAgIGNhc2UgXCJ6enp6XCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gXCJHTVRcIiArIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIFNlY29uZHMgdGltZXN0YW1wXG4gIHQ6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5mbG9vcihvcmlnaW5hbERhdGUuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcFxuICBUOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVNob3J0KG9mZnNldCwgZGVsaW1pdGVyID0gXCJcIikge1xuICBjb25zdCBzaWduID0gb2Zmc2V0ID4gMCA/IFwiLVwiIDogXCIrXCI7XG4gIGNvbnN0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MDtcbiAgaWYgKG1pbnV0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gc2lnbiArIFN0cmluZyhob3Vycyk7XG4gIH1cbiAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpICsgZGVsaW1pdGVyICsgYWRkTGVhZGluZ1plcm9zKG1pbnV0ZXMsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMob2Zmc2V0LCBkZWxpbWl0ZXIpIHtcbiAgaWYgKG9mZnNldCAlIDYwID09PSAwKSB7XG4gICAgY29uc3Qgc2lnbiA9IG9mZnNldCA+IDAgPyBcIi1cIiA6IFwiK1wiO1xuICAgIHJldHVybiBzaWduICsgYWRkTGVhZGluZ1plcm9zKE1hdGguYWJzKG9mZnNldCkgLyA2MCwgMik7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGVsaW1pdGVyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkZWxpbWl0ZXIgPSBcIlwiKSB7XG4gIGNvbnN0IHNpZ24gPSBvZmZzZXQgPiAwID8gXCItXCIgOiBcIitcIjtcbiAgY29uc3QgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgY29uc3QgaG91cnMgPSBhZGRMZWFkaW5nWmVyb3MoTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCksIDIpO1xuICBjb25zdCBtaW51dGVzID0gYWRkTGVhZGluZ1plcm9zKGFic09mZnNldCAlIDYwLCAyKTtcbiAgcmV0dXJuIHNpZ24gKyBob3VycyArIGRlbGltaXRlciArIG1pbnV0ZXM7XG59XG4iLCJjb25zdCBkYXRlTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgXCJQXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwic2hvcnRcIiB9KTtcbiAgICBjYXNlIFwiUFBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoeyB3aWR0aDogXCJtZWRpdW1cIiB9KTtcbiAgICBjYXNlIFwiUFBQXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgIGNhc2UgXCJQUFBQXCI6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoeyB3aWR0aDogXCJmdWxsXCIgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVMb25nRm9ybWF0dGVyID0gKHBhdHRlcm4sIGZvcm1hdExvbmcpID0+IHtcbiAgc3dpdGNoIChwYXR0ZXJuKSB7XG4gICAgY2FzZSBcInBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJzaG9ydFwiIH0pO1xuICAgIGNhc2UgXCJwcFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7IHdpZHRoOiBcIm1lZGl1bVwiIH0pO1xuICAgIGNhc2UgXCJwcHBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJsb25nXCIgfSk7XG4gICAgY2FzZSBcInBwcHBcIjpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7IHdpZHRoOiBcImZ1bGxcIiB9KTtcbiAgfVxufTtcblxuY29uc3QgZGF0ZVRpbWVMb25nRm9ybWF0dGVyID0gKHBhdHRlcm4sIGZvcm1hdExvbmcpID0+IHtcbiAgY29uc3QgbWF0Y2hSZXN1bHQgPSBwYXR0ZXJuLm1hdGNoKC8oUCspKHArKT8vKSB8fCBbXTtcbiAgY29uc3QgZGF0ZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsxXTtcbiAgY29uc3QgdGltZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsyXTtcblxuICBpZiAoIXRpbWVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGRhdGVMb25nRm9ybWF0dGVyKHBhdHRlcm4sIGZvcm1hdExvbmcpO1xuICB9XG5cbiAgbGV0IGRhdGVUaW1lRm9ybWF0O1xuXG4gIHN3aXRjaCAoZGF0ZVBhdHRlcm4pIHtcbiAgICBjYXNlIFwiUFwiOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwic2hvcnRcIiB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQUFwiOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwibWVkaXVtXCIgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUFBQXCI6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoeyB3aWR0aDogXCJsb25nXCIgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUFBQUFwiOlxuICAgIGRlZmF1bHQ6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoeyB3aWR0aDogXCJmdWxsXCIgfSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBkYXRlVGltZUZvcm1hdFxuICAgIC5yZXBsYWNlKFwie3tkYXRlfX1cIiwgZGF0ZUxvbmdGb3JtYXR0ZXIoZGF0ZVBhdHRlcm4sIGZvcm1hdExvbmcpKVxuICAgIC5yZXBsYWNlKFwie3t0aW1lfX1cIiwgdGltZUxvbmdGb3JtYXR0ZXIodGltZVBhdHRlcm4sIGZvcm1hdExvbmcpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBsb25nRm9ybWF0dGVycyA9IHtcbiAgcDogdGltZUxvbmdGb3JtYXR0ZXIsXG4gIFA6IGRhdGVUaW1lTG9uZ0Zvcm1hdHRlcixcbn07XG4iLCJjb25zdCBkYXlPZlllYXJUb2tlblJFID0gL15EKyQvO1xuY29uc3Qgd2Vla1llYXJUb2tlblJFID0gL15ZKyQvO1xuXG5jb25zdCB0aHJvd1Rva2VucyA9IFtcIkRcIiwgXCJERFwiLCBcIllZXCIsIFwiWVlZWVwiXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIGRheU9mWWVhclRva2VuUkUudGVzdCh0b2tlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHdlZWtZZWFyVG9rZW5SRS50ZXN0KHRva2VuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhcm5PclRocm93UHJvdGVjdGVkRXJyb3IodG9rZW4sIGZvcm1hdCwgaW5wdXQpIHtcbiAgY29uc3QgX21lc3NhZ2UgPSBtZXNzYWdlKHRva2VuLCBmb3JtYXQsIGlucHV0KTtcbiAgY29uc29sZS53YXJuKF9tZXNzYWdlKTtcbiAgaWYgKHRocm93VG9rZW5zLmluY2x1ZGVzKHRva2VuKSkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoX21lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBtZXNzYWdlKHRva2VuLCBmb3JtYXQsIGlucHV0KSB7XG4gIGNvbnN0IHN1YmplY3QgPSB0b2tlblswXSA9PT0gXCJZXCIgPyBcInllYXJzXCIgOiBcImRheXMgb2YgdGhlIG1vbnRoXCI7XG4gIHJldHVybiBgVXNlIFxcYCR7dG9rZW4udG9Mb3dlckNhc2UoKX1cXGAgaW5zdGVhZCBvZiBcXGAke3Rva2VufVxcYCAoaW4gXFxgJHtmb3JtYXR9XFxgKSBmb3IgZm9ybWF0dGluZyAke3N1YmplY3R9IHRvIHRoZSBpbnB1dCBcXGAke2lucHV0fVxcYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kYDtcbn1cbiIsImltcG9ydCB7IGlzVmFsaWQgfSBmcm9tIFwiLi9pc1ZhbGlkLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuaW1wb3J0IHsgZGVmYXVsdExvY2FsZSB9IGZyb20gXCIuL19saWIvZGVmYXVsdExvY2FsZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcbmltcG9ydCB7IGZvcm1hdHRlcnMgfSBmcm9tIFwiLi9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzLm1qc1wiO1xuaW1wb3J0IHsgbG9uZ0Zvcm1hdHRlcnMgfSBmcm9tIFwiLi9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanNcIjtcbmltcG9ydCB7XG4gIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4sXG4gIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbixcbiAgd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcixcbn0gZnJvbSBcIi4vX2xpYi9wcm90ZWN0ZWRUb2tlbnMubWpzXCI7XG5cbi8vIFRoaXMgUmVnRXhwIGNvbnNpc3RzIG9mIHRocmVlIHBhcnRzIHNlcGFyYXRlZCBieSBgfGA6XG4vLyAtIFt5WVFxTUx3SWREZWNpaEhLa21zXW8gbWF0Y2hlcyBhbnkgYXZhaWxhYmxlIG9yZGluYWwgbnVtYmVyIHRva2VuXG4vLyAgIChvbmUgb2YgdGhlIGNlcnRhaW4gbGV0dGVycyBmb2xsb3dlZCBieSBgb2ApXG4vLyAtIChcXHcpXFwxKiBtYXRjaGVzIGFueSBzZXF1ZW5jZXMgb2YgdGhlIHNhbWUgbGV0dGVyXG4vLyAtICcnIG1hdGNoZXMgdHdvIHF1b3RlIGNoYXJhY3RlcnMgaW4gYSByb3dcbi8vIC0gJygnJ3xbXiddKSsoJ3wkKSBtYXRjaGVzIGFueXRoaW5nIHN1cnJvdW5kZWQgYnkgdHdvIHF1b3RlIGNoYXJhY3RlcnMgKCcpLFxuLy8gICBleGNlcHQgYSBzaW5nbGUgcXVvdGUgc3ltYm9sLCB3aGljaCBlbmRzIHRoZSBzZXF1ZW5jZS5cbi8vICAgVHdvIHF1b3RlIGNoYXJhY3RlcnMgZG8gbm90IGVuZCB0aGUgc2VxdWVuY2UuXG4vLyAgIElmIHRoZXJlIGlzIG5vIG1hdGNoaW5nIHNpbmdsZSBxdW90ZVxuLy8gICB0aGVuIHRoZSBzZXF1ZW5jZSB3aWxsIGNvbnRpbnVlIHVudGlsIHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cbi8vIC0gLiBtYXRjaGVzIGFueSBzaW5nbGUgY2hhcmFjdGVyIHVubWF0Y2hlZCBieSBwcmV2aW91cyBwYXJ0cyBvZiB0aGUgUmVnRXhwc1xuY29uc3QgZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9XG4gIC9beVlRcU1Md0lkRGVjaWhIS2ttc11vfChcXHcpXFwxKnwnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcblxuLy8gVGhpcyBSZWdFeHAgY2F0Y2hlcyBzeW1ib2xzIGVzY2FwZWQgYnkgcXVvdGVzLCBhbmQgYWxzb1xuLy8gc2VxdWVuY2VzIG9mIHN5bWJvbHMgUCwgcCwgYW5kIHRoZSBjb21iaW5hdGlvbnMgbGlrZSBgUFBQUFBQUHBwcHBwYFxuY29uc3QgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcblxuY29uc3QgZXNjYXBlZFN0cmluZ1JlZ0V4cCA9IC9eJyhbXl0qPyknPyQvO1xuY29uc3QgZG91YmxlUXVvdGVSZWdFeHAgPSAvJycvZztcbmNvbnN0IHVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwID0gL1thLXpBLVpdLztcblxuLyoqXG4gKiBUaGUge0BsaW5rIGZvcm1hdH0gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGZvcm1hdFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBGb3JtYXQgdGhlIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiB0aGUgZ2l2ZW4gZm9ybWF0LiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiA+IOKaoO+4jyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBgZm9ybWF0YCB0b2tlbnMgZGlmZmVyIGZyb20gTW9tZW50LmpzIGFuZCBvdGhlciBsaWJyYXJpZXMuXG4gKiA+IFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIFRoZSBjaGFyYWN0ZXJzIHdyYXBwZWQgYmV0d2VlbiB0d28gc2luZ2xlIHF1b3RlcyBjaGFyYWN0ZXJzICgnKSBhcmUgZXNjYXBlZC5cbiAqIFR3byBzaW5nbGUgcXVvdGVzIGluIGEgcm93LCB3aGV0aGVyIGluc2lkZSBvciBvdXRzaWRlIGEgcXVvdGVkIHNlcXVlbmNlLCByZXByZXNlbnQgYSAncmVhbCcgc2luZ2xlIHF1b3RlLlxuICogKHNlZSB0aGUgbGFzdCBleGFtcGxlKVxuICpcbiAqIEZvcm1hdCBvZiB0aGUgc3RyaW5nIGlzIGJhc2VkIG9uIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqIGh0dHBzOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9GaWVsZF9TeW1ib2xfVGFibGVcbiAqIHdpdGggYSBmZXcgYWRkaXRpb25zIChzZWUgbm90ZSA3IGJlbG93IHRoZSB0YWJsZSkuXG4gKlxuICogQWNjZXB0ZWQgcGF0dGVybnM6XG4gKiB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQYXR0ZXJuIHwgUmVzdWx0IGV4YW1wbGVzICAgICAgICAgICAgICAgICAgIHwgTm90ZXMgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLXxcbiAqIHwgRXJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEcuLkdHRyAgfCBBRCwgQkMgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHICAgIHwgQW5ubyBEb21pbmksIEJlZm9yZSBDaHJpc3QgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgR0dHR0cgICB8IEEsIEIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgQ2FsZW5kYXIgeWVhciAgICAgICAgICAgICAgICAgICB8IHkgICAgICAgfCA0NCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5byAgICAgIHwgNDR0aCwgMXN0LCAwdGgsIDE3dGggICAgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXkgICAgICB8IDQ0LCAwMSwgMDAsIDE3ICAgICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eSAgICAgfCAwNDQsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5ICAgIHwgMDA0NCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5eXkgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICB8IFkgICAgICAgfCA0NCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZbyAgICAgIHwgNDR0aCwgMXN0LCAxOTAwdGgsIDIwMTd0aCAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVkgICAgICB8IDQ0LCAwMSwgMDAsIDE3ICAgICAgICAgICAgICAgICAgICB8IDUsOCAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWSAgICAgfCAwNDQsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZICAgIHwgMDA0NCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZWVkgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgICB8IFIgICAgICAgfCAtNDMsIDAsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUiAgICAgIHwgLTQzLCAwMCwgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSICAgICB8IC0wNDMsIDAwMCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlIgICAgfCAtMDA0MywgMDAwMCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlJSUiAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1LDcgfFxuICogfCBFeHRlbmRlZCB5ZWFyICAgICAgICAgICAgICAgICAgIHwgdSAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1ICAgICAgfCAtNDMsIDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXUgICAgIHwgLTA0MywgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dSAgICB8IC0wMDQzLCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dXV1ICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IFF1YXJ0ZXIgKGZvcm1hdHRpbmcpICAgICAgICAgICAgfCBRICAgICAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUW8gICAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRICAgICAgfCAwMSwgMDIsIDAzLCAwNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVEgICAgIHwgUTEsIFEyLCBRMywgUTQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUSAgICB8IDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUVFRICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCA0ICAgICB8XG4gKiB8IFF1YXJ0ZXIgKHN0YW5kLWFsb25lKSAgICAgICAgICAgfCBxICAgICAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcW8gICAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxICAgICAgfCAwMSwgMDIsIDAzLCAwNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXEgICAgIHwgUTEsIFEyLCBRMywgUTQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcSAgICB8IDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcXFxICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCA0ICAgICB8XG4gKiB8IE1vbnRoIChmb3JtYXR0aW5nKSAgICAgICAgICAgICAgfCBNICAgICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NICAgICAgfCAwMSwgMDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU0gICAgIHwgSmFuLCBGZWIsIC4uLiwgRGVjICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTSAgICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTU1NICAgfCBKLCBGLCAuLi4sIEQgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IE1vbnRoIChzdGFuZC1hbG9uZSkgICAgICAgICAgICAgfCBMICAgICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMICAgICAgfCAwMSwgMDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTEwgICAgIHwgSmFuLCBGZWIsIC4uLiwgRGVjICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTCAgICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTExMICAgfCBKLCBGLCAuLi4sIEQgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgfCB3ICAgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd28gICAgICB8IDFzdCwgMm5kLCAuLi4sIDUzdGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHd3ICAgICAgfCAwMSwgMDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICAgfCBJICAgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDUzdGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IElJICAgICAgfCAwMSwgMDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICAgfCBkICAgICAgIHwgMSwgMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDMxc3QgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGRkICAgICAgfCAwMSwgMDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICAgfCBEICAgICAgIHwgMSwgMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICAgIHwgOSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDM2NXRoLCAzNjZ0aCAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEREICAgICAgfCAwMSwgMDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREQgICAgIHwgMDAxLCAwMDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRERERCAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICAgICAgICB8IEUuLkVFRSAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUUgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFRSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IElTTyBkYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgfCBpICAgICAgIHwgMSwgMiwgMywgLi4uLCA3ICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDd0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpICAgICAgfCAwMSwgMDIsIC4uLiwgMDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWkgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpaWkgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgNyAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgIHwgZSAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZSAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZWVlICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgZGF5IG9mIHdlZWsgKHN0YW5kLWFsb25lKSB8IGMgICAgICAgfCAyLCAzLCA0LCAuLi4sIDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjbyAgICAgIHwgMm5kLCAzcmQsIC4uLiwgMXN0ICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2MgICAgICB8IDAyLCAwMywgLi4uLCAwMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjYyAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2MgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjYyAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhLi5hYSAgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhICAgICB8IGFtLCBwbSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWEgICAgfCBhLm0uLCBwLm0uICAgICAgICAgICAgICAgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWFhYSAgIHwgYSwgcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgIHwgYi4uYmIgICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYiAgICAgfCBhbSwgcG0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiICAgIHwgYS5tLiwgcC5tLiwgbm9vbiwgbWlkbmlnaHQgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiYmIgICB8IGEsIHAsIG4sIG1pICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRmxleGlibGUgZGF5IHBlcmlvZCAgICAgICAgICAgICB8IEIuLkJCQiAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCICAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgQkJCQkIgICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgICB8IGggICAgICAgfCAxLCAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBobyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTF0aCwgMTJ0aCAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaGggICAgICB8IDAxLCAwMiwgLi4uLCAxMSwgMTIgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgICB8IEggICAgICAgfCAwLCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBIbyAgICAgIHwgMHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSEggICAgICB8IDAwLCAwMSwgMDIsIC4uLiwgMjMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMC0xMV0gICAgICAgICAgICAgICAgICAgICB8IEsgICAgICAgfCAxLCAyLCAuLi4sIDExLCAwICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTF0aCwgMHRoICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgS0sgICAgICB8IDAxLCAwMiwgLi4uLCAxMSwgMDAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMS0yNF0gICAgICAgICAgICAgICAgICAgICB8IGsgICAgICAgfCAyNCwgMSwgMiwgLi4uLCAyMyAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrbyAgICAgIHwgMjR0aCwgMXN0LCAybmQsIC4uLiwgMjNyZCAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwga2sgICAgICB8IDI0LCAwMSwgMDIsIC4uLiwgMjMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgICB8IG0gICAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbyAgICAgIHwgMHRoLCAxc3QsIC4uLiwgNTl0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbW0gICAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgICB8IHMgICAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzbyAgICAgIHwgMHRoLCAxc3QsIC4uLiwgNTl0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgc3MgICAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgICB8IFMgICAgICAgfCAwLCAxLCAuLi4sIDkgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTUyAgICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTICAgICB8IDAwMCwgMDAxLCAuLi4sIDk5OSAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTU1MgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzICAgICB8XG4gKiB8IFRpbWV6b25lIChJU08tODYwMSB3LyBaKSAgICAgICAgfCBYICAgICAgIHwgLTA4LCArMDUzMCwgWiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFggICAgICB8IC0wODAwLCArMDUzMCwgWiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWCAgICAgfCAtMDg6MDAsICswNTozMCwgWiAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYICAgIHwgLTA4MDAsICswNTMwLCBaLCArMTIzNDU2ICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYWFggICB8IC0wODowMCwgKzA1OjMwLCBaLCArMTI6MzQ6NTYgICAgICB8ICAgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvbyBaKSAgICAgICB8IHggICAgICAgfCAtMDgsICswNTMwLCArMDAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eCAgICAgIHwgLTA4MDAsICswNTMwLCArMDAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4ICAgICB8IC0wODowMCwgKzA1OjMwLCArMDA6MDAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHggICAgfCAtMDgwMCwgKzA1MzAsICswMDAwLCArMTIzNDU2ICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHh4eCAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCwgKzEyOjM0OjU2IHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoR01UKSAgICAgICAgICAgICAgICAgIHwgTy4uLk9PTyB8IEdNVC04LCBHTVQrNTozMCwgR01UKzAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE9PT08gICAgfCBHTVQtMDg6MDAsIEdNVCswNTozMCwgR01UKzAwOjAwICAgfCAyICAgICB8XG4gKiB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSAgfCB6Li4uenp6IHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgNiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgenp6eiAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIsNiAgIHxcbiAqIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgICAgICB8IHQgICAgICAgfCA1MTI5Njk1MjAgICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB0dCAgICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw3ICAgfFxuICogfCBNaWxsaXNlY29uZHMgdGltZXN0YW1wICAgICAgICAgIHwgVCAgICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFRUICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICAgfCBQICAgICAgIHwgMDQvMjkvMTQ1MyAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFAgICAgICB8IEFwciAyOSwgMTQ1MyAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUCAgICAgfCBBcHJpbCAyOXRoLCAxNDUzICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBQICAgIHwgRnJpZGF5LCBBcHJpbCAyOXRoLCAxNDUzICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBMb25nIGxvY2FsaXplZCB0aW1lICAgICAgICAgICAgIHwgcCAgICAgICB8IDEyOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwICAgICAgfCAxMjowMDowMCBBTSAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHAgICAgIHwgMTI6MDA6MDAgQU0gR01UKzIgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHBwcCAgICB8IDEyOjAwOjAwIEFNIEdNVCswMjowMCAgICAgICAgICAgICB8IDIsNyAgIHxcbiAqIHwgQ29tYmluYXRpb24gb2YgZGF0ZSBhbmQgdGltZSAgICB8IFBwICAgICAgfCAwNC8yOS8xNDUzLCAxMjowMCBBTSAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUHBwICAgIHwgQXByIDI5LCAxNDUzLCAxMjowMDowMCBBTSAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQcHBwICB8IEFwcmlsIDI5dGgsIDE0NTMgYXQgLi4uICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFBwcHBwfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgYXQgLi4uICAgfCAyLDcgICB8XG4gKiBOb3RlczpcbiAqIDEuIFwiRm9ybWF0dGluZ1wiIHVuaXRzIChlLmcuIGZvcm1hdHRpbmcgcXVhcnRlcikgaW4gdGhlIGRlZmF1bHQgZW4tVVMgbG9jYWxlXG4gKiAgICBhcmUgdGhlIHNhbWUgYXMgXCJzdGFuZC1hbG9uZVwiIHVuaXRzLCBidXQgYXJlIGRpZmZlcmVudCBpbiBzb21lIGxhbmd1YWdlcy5cbiAqICAgIFwiRm9ybWF0dGluZ1wiIHVuaXRzIGFyZSBkZWNsaW5lZCBhY2NvcmRpbmcgdG8gdGhlIHJ1bGVzIG9mIHRoZSBsYW5ndWFnZVxuICogICAgaW4gdGhlIGNvbnRleHQgb2YgYSBkYXRlLiBcIlN0YW5kLWFsb25lXCIgdW5pdHMgYXJlIGFsd2F5cyBub21pbmF0aXZlIHNpbmd1bGFyOlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnZG8gTExMTCcsIHtsb2NhbGU6IGNzfSkgLy89PiAnNi4gbGlzdG9wYWQnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnZG8gTU1NTScsIHtsb2NhbGU6IGNzfSkgLy89PiAnNi4gbGlzdG9wYWR1J2BcbiAqXG4gKiAyLiBBbnkgc2VxdWVuY2Ugb2YgdGhlIGlkZW50aWNhbCBsZXR0ZXJzIGlzIGEgcGF0dGVybiwgdW5sZXNzIGl0IGlzIGVzY2FwZWQgYnlcbiAqICAgIHRoZSBzaW5nbGUgcXVvdGUgY2hhcmFjdGVycyAoc2VlIGJlbG93KS5cbiAqICAgIElmIHRoZSBzZXF1ZW5jZSBpcyBsb25nZXIgdGhhbiBsaXN0ZWQgaW4gdGFibGUgKGUuZy4gYEVFRUVFRUVFRUVFYClcbiAqICAgIHRoZSBvdXRwdXQgd2lsbCBiZSB0aGUgc2FtZSBhcyBkZWZhdWx0IHBhdHRlcm4gZm9yIHRoaXMgdW5pdCwgdXN1YWxseVxuICogICAgdGhlIGxvbmdlc3Qgb25lIChpbiBjYXNlIG9mIElTTyB3ZWVrZGF5cywgYEVFRUVgKS4gRGVmYXVsdCBwYXR0ZXJucyBmb3IgdW5pdHNcbiAqICAgIGFyZSBtYXJrZWQgd2l0aCBcIjJcIiBpbiB0aGUgbGFzdCBjb2x1bW4gb2YgdGhlIHRhYmxlLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NJykgLy89PiAnTm92J2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTScpIC8vPT4gJ04nYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAzLiBTb21lIHBhdHRlcm5zIGNvdWxkIGJlIHVubGltaXRlZCBsZW5ndGggKHN1Y2ggYXMgYHl5eXl5eXl5YCkuXG4gKiAgICBUaGUgb3V0cHV0IHdpbGwgYmUgcGFkZGVkIHdpdGggemVyb3MgdG8gbWF0Y2ggdGhlIGxlbmd0aCBvZiB0aGUgcGF0dGVybi5cbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ3l5eXl5eXl5JykgLy89PiAnMDAwMDIwMTcnYFxuICpcbiAqIDQuIGBRUVFRUWAgYW5kIGBxcXFxcWAgY291bGQgYmUgbm90IHN0cmljdGx5IG51bWVyaWNhbCBpbiBzb21lIGxvY2FsZXMuXG4gKiAgICBUaGVzZSB0b2tlbnMgcmVwcmVzZW50IHRoZSBzaG9ydGVzdCBmb3JtIG9mIHRoZSBxdWFydGVyLlxuICpcbiAqIDUuIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBwYXR0ZXJucyBhcmUgQi5DLiB5ZWFyczpcbiAqXG4gKiAgICB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICogICAgfC0tLS0tLXwtLS0tLXwtLS0tLXxcbiAqICAgIHwgQUMgMSB8ICAgMSB8ICAgMSB8XG4gKiAgICB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICogICAgfCBCQyAyIHwgICAyIHwgIC0xIHxcbiAqXG4gKiAgICBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gKiAgICB3aGlsZSBgdXVgIHBhZHMgc2luZ2xlIGRpZ2l0IHllYXJzIHRvIDIgY2hhcmFjdGVycyBhbmQgcmV0dXJucyBvdGhlciB5ZWFycyB1bmNoYW5nZWQ6XG4gKlxuICogICAgfCBZZWFyIHwgYHl5YCB8IGB1dWAgfFxuICogICAgfC0tLS0tLXwtLS0tLS18LS0tLS0tfFxuICogICAgfCAxICAgIHwgICAwMSB8ICAgMDEgfFxuICogICAgfCAxNCAgIHwgICAxNCB8ICAgMTQgfFxuICogICAgfCAzNzYgIHwgICA3NiB8ICAzNzYgfFxuICogICAgfCAxNDUzIHwgICA1MyB8IDE0NTMgfFxuICpcbiAqICAgIFRoZSBzYW1lIGRpZmZlcmVuY2UgaXMgdHJ1ZSBmb3IgbG9jYWwgYW5kIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyAoYFlgIGFuZCBgUmApLFxuICogICAgZXhjZXB0IGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJzIGFyZSBkZXBlbmRlbnQgb24gYG9wdGlvbnMud2Vla1N0YXJ0c09uYFxuICogICAgYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKGNvbXBhcmUgW2dldElTT1dlZWtZZWFyXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldElTT1dlZWtZZWFyKVxuICogICAgYW5kIFtnZXRXZWVrWWVhcl0oaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9nZXRXZWVrWWVhcikpLlxuICpcbiAqIDYuIFNwZWNpZmljIG5vbi1sb2NhdGlvbiB0aW1lem9uZXMgYXJlIGN1cnJlbnRseSB1bmF2YWlsYWJsZSBpbiBgZGF0ZS1mbnNgLFxuICogICAgc28gcmlnaHQgbm93IHRoZXNlIHRva2VucyBmYWxsIGJhY2sgdG8gR01UIHRpbWV6b25lcy5cbiAqXG4gKiA3LiBUaGVzZSBwYXR0ZXJucyBhcmUgbm90IGluIHRoZSBVbmljb2RlIFRlY2huaWNhbCBTdGFuZGFyZCAjMzU6XG4gKiAgICAtIGBpYDogSVNPIGRheSBvZiB3ZWVrXG4gKiAgICAtIGBJYDogSVNPIHdlZWsgb2YgeWVhclxuICogICAgLSBgUmA6IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKiAgICAtIGB0YDogc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYFRgOiBtaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gKiAgICAtIGBvYDogb3JkaW5hbCBudW1iZXIgbW9kaWZpZXJcbiAqICAgIC0gYFBgOiBsb25nIGxvY2FsaXplZCBkYXRlXG4gKiAgICAtIGBwYDogbG9uZyBsb2NhbGl6ZWQgdGltZVxuICpcbiAqIDguIGBZWWAgYW5kIGBZWVlZYCB0b2tlbnMgcmVwcmVzZW50IHdlZWstbnVtYmVyaW5nIHllYXJzIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIHllYXJzLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zYCB0byB1c2UgdGhlbS4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogOS4gYERgIGFuZCBgRERgIHRva2VucyByZXByZXNlbnQgZGF5cyBvZiB0aGUgeWVhciBidXQgdGhleSBhcmUgb2Z0ZW4gY29uZnVzZWQgd2l0aCBkYXlzIG9mIHRoZSBtb250aC5cbiAqICAgIFlvdSBzaG91bGQgZW5hYmxlIGBvcHRpb25zLnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gZm9ybWF0IC0gVGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqXG4gKiBAdGhyb3dzIGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3MgYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGxvY2FsaXplYCBwcm9wZXJ0eVxuICogQHRocm93cyBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0TG9uZ2AgcHJvcGVydHlcbiAqIEB0aHJvd3MgdXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgeXlgIGluc3RlYWQgb2YgYFlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgZGAgaW5zdGVhZCBvZiBgRGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB1c2UgYGRkYCBpbnN0ZWFkIG9mIGBERGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyBmb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDExIEZlYnJ1YXJ5IDIwMTQgaW4gbWlkZGxlLWVuZGlhbiBmb3JtYXQ6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAnTU0vZGQveXl5eScpXG4gKiAvLz0+ICcwMi8xMS8yMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMiBKdWx5IDIwMTQgaW4gRXNwZXJhbnRvOlxuICogaW1wb3J0IHsgZW9Mb2NhbGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW8nXG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiksIFwiZG8gJ2RlJyBNTU1NIHl5eXlcIiwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAnMi1hIGRlIGp1bGlvIDIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEVzY2FwZSBzdHJpbmcgYnkgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnM6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiwgMTUpLCBcImggJ28nJ2Nsb2NrJ1wiKVxuICogLy89PiBcIjMgbydjbG9ja1wiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgbG9jYWxlID0gb3B0aW9ucz8ubG9jYWxlID8/IGRlZmF1bHRPcHRpb25zLmxvY2FsZSA/PyBkZWZhdWx0TG9jYWxlO1xuXG4gIGNvbnN0IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9XG4gICAgb3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIDE7XG5cbiAgY29uc3Qgd2Vla1N0YXJ0c09uID1cbiAgICBvcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgMDtcblxuICBjb25zdCBvcmlnaW5hbERhdGUgPSB0b0RhdGUoZGF0ZSk7XG5cbiAgaWYgKCFpc1ZhbGlkKG9yaWdpbmFsRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkludmFsaWQgdGltZSB2YWx1ZVwiKTtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlck9wdGlvbnMgPSB7XG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiBmaXJzdFdlZWtDb250YWluc0RhdGUsXG4gICAgd2Vla1N0YXJ0c09uOiB3ZWVrU3RhcnRzT24sXG4gICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgX29yaWdpbmFsRGF0ZTogb3JpZ2luYWxEYXRlLFxuICB9O1xuXG4gIGNvbnN0IHJlc3VsdCA9IGZvcm1hdFN0clxuICAgIC5tYXRjaChsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcInBcIiB8fCBmaXJzdENoYXJhY3RlciA9PT0gXCJQXCIpIHtcbiAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgcmV0dXJuIGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGUuZm9ybWF0TG9uZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgIH0pXG4gICAgLmpvaW4oXCJcIilcbiAgICAubWF0Y2goZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgIC8vIFJlcGxhY2UgdHdvIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIHdpdGggb25lIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJcbiAgICAgIGlmIChzdWJzdHJpbmcgPT09IFwiJydcIikge1xuICAgICAgICByZXR1cm4gXCInXCI7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcIidcIikge1xuICAgICAgICByZXR1cm4gY2xlYW5Fc2NhcGVkU3RyaW5nKHN1YnN0cmluZyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZvcm1hdHRlciA9IGZvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgaWYgKGZvcm1hdHRlcikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIW9wdGlvbnM/LnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyAmJlxuICAgICAgICAgIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbihzdWJzdHJpbmcpXG4gICAgICAgICkge1xuICAgICAgICAgIHdhcm5PclRocm93UHJvdGVjdGVkRXJyb3Ioc3Vic3RyaW5nLCBmb3JtYXRTdHIsIFN0cmluZyhkYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFvcHRpb25zPy51c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zICYmXG4gICAgICAgICAgaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbihzdWJzdHJpbmcpXG4gICAgICAgICkge1xuICAgICAgICAgIHdhcm5PclRocm93UHJvdGVjdGVkRXJyb3Ioc3Vic3RyaW5nLCBmb3JtYXRTdHIsIFN0cmluZyhkYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlcihcbiAgICAgICAgICBvcmlnaW5hbERhdGUsXG4gICAgICAgICAgc3Vic3RyaW5nLFxuICAgICAgICAgIGxvY2FsZS5sb2NhbGl6ZSxcbiAgICAgICAgICBmb3JtYXR0ZXJPcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlyc3RDaGFyYWN0ZXIubWF0Y2godW5lc2NhcGVkTGF0aW5DaGFyYWN0ZXJSZWdFeHApKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgICAgIFwiRm9ybWF0IHN0cmluZyBjb250YWlucyBhbiB1bmVzY2FwZWQgbGF0aW4gYWxwaGFiZXQgY2hhcmFjdGVyIGBcIiArXG4gICAgICAgICAgICBmaXJzdENoYXJhY3RlciArXG4gICAgICAgICAgICBcImBcIixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICB9KVxuICAgIC5qb2luKFwiXCIpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGNsZWFuRXNjYXBlZFN0cmluZyhpbnB1dCkge1xuICBjb25zdCBtYXRjaGVkID0gaW5wdXQubWF0Y2goZXNjYXBlZFN0cmluZ1JlZ0V4cCk7XG5cbiAgaWYgKCFtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZWRbMV0ucmVwbGFjZShkb3VibGVRdW90ZVJlZ0V4cCwgXCInXCIpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdDtcbiIsImV4cG9ydCBjb25zdCBFeHBvcnRlcnMgPSBbJ2NzdicsICdqc29uJywgJ3htbCddO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBMb2FkZXIsIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IGZvcm1hdCBmcm9tICdkYXRlLWZucy9mb3JtYXQnO1xuaW1wb3J0IHsgRXhwb3J0ZXJzIH0gZnJvbSAnLi4vZXhwb3J0ZXIudHlwZS5qcyc7XG5leHBvcnQgY29uc3QgbWltZVR5cGVzID0ge1xuICAgIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICBjc3Y6ICd0ZXh0L2NzdicsXG4gICAgeG1sOiAndGV4dC94bWwnLFxufTtcbmV4cG9ydCBjb25zdCBnZXRFeHBvcnRlZEZpbGVOYW1lID0gKGV4dGVuc2lvbikgPT4gYGV4cG9ydC0ke2Zvcm1hdChEYXRlLm5vdygpLCAneXl5eS1NTS1kZF9ISC1tbScpfS4ke2V4dGVuc2lvbn1gO1xuY29uc3QgRXhwb3J0Q29tcG9uZW50ID0gKHsgcmVzb3VyY2UgfSkgPT4ge1xuICAgIGNvbnN0IFtpc0ZldGNoaW5nLCBzZXRGZXRjaGluZ10gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IHNlbmROb3RpY2UgPSB1c2VOb3RpY2UoKTtcbiAgICBjb25zdCBleHBvcnREYXRhID0gYXN5bmMgKHR5cGUpID0+IHtcbiAgICAgICAgc2V0RmV0Y2hpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgZXhwb3J0ZWREYXRhIH0sIH0gPSBhd2FpdCBuZXcgQXBpQ2xpZW50KCkucmVzb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdleHBvcnQnLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZXhwb3J0ZWREYXRhXSwgeyB0eXBlOiBtaW1lVHlwZXNbdHlwZV0gfSk7XG4gICAgICAgICAgICBzYXZlQXMoYmxvYiwgZ2V0RXhwb3J0ZWRGaWxlTmFtZSh0eXBlKSk7XG4gICAgICAgICAgICBzZW5kTm90aWNlKHsgbWVzc2FnZTogJ0V4cG9ydGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgc2VuZE5vdGljZSh7IG1lc3NhZ2U6IGUubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRGZXRjaGluZyhmYWxzZSk7XG4gICAgfTtcbiAgICBpZiAoaXNGZXRjaGluZykge1xuICAgICAgICByZXR1cm4gPExvYWRlciAvPjtcbiAgICB9XG4gICAgcmV0dXJuICg8Qm94PlxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCI+XG4gICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJsZ1wiPkNob29zZSBleHBvcnQgZm9ybWF0OjwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCI+XG4gICAgICAgIHtFeHBvcnRlcnMubWFwKHBhcnNlclR5cGUgPT4gKDxCb3gga2V5PXtwYXJzZXJUeXBlfSBtPXsyfT5cbiAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gZXhwb3J0RGF0YShwYXJzZXJUeXBlKX0gZGlzYWJsZWQ9e2lzRmV0Y2hpbmd9PlxuICAgICAgICAgICAgICB7cGFyc2VyVHlwZS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+KSl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEV4cG9ydENvbXBvbmVudDtcbiIsImltcG9ydCB7IERyb3Bab25lLCBEcm9wWm9uZUl0ZW0sIEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IEVkaXQgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGVQcm9wZXJ0eSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpO1xuICAgIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KTtcbiAgICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICAgICAgaWYgKCh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKSkge1xuICAgICAgICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KTtcbiAgICAgICAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pO1xuICAgICAgICB9XG4gICAgfSwgW2tleSwgb3JpZ2luYWxLZXldKTtcbiAgICBjb25zdCBvblVwbG9hZCA9IChmaWxlcykgPT4ge1xuICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKTtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSk7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXTtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LCBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdKTtcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpO1xuICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCB0cmFuc2xhdGVQcm9wZXJ0eShwcm9wZXJ0eS5sYWJlbCwgcHJvcGVydHkucmVzb3VyY2VJZCkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lLCB7IG9uQ2hhbmdlOiBvblVwbG9hZCwgbXVsdGlwbGU6IGN1c3RvbS5tdWx0aXBsZSwgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgICAgICB9LCBmaWxlczogZmlsZXNUb1VwbG9hZCB9KSxcbiAgICAgICAgIWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsgZmlsZW5hbWU6IGtleSwgc3JjOiBwYXRoLCBvblJlbW92ZTogaGFuZGxlUmVtb3ZlIH0pKSxcbiAgICAgICAgY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwga2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBrZXk6IHNpbmdsZUtleSwgZmlsZW5hbWU6IHNpbmdsZUtleSwgc3JjOiBwYXRoW2luZGV4XSwgb25SZW1vdmU6ICgpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSkgfSkpIDogJyc7XG4gICAgICAgIH0pKSkgOiAnJykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICAgJ2F1ZGlvL2FhYycsXG4gICAgJ2F1ZGlvL21pZGknLFxuICAgICdhdWRpby94LW1pZGknLFxuICAgICdhdWRpby9tcGVnJyxcbiAgICAnYXVkaW8vb2dnJyxcbiAgICAnYXBwbGljYXRpb24vb2dnJyxcbiAgICAnYXVkaW8vb3B1cycsXG4gICAgJ2F1ZGlvL3dhdicsXG4gICAgJ2F1ZGlvL3dlYm0nLFxuICAgICdhdWRpby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAgICd2aWRlby94LW1zdmlkZW8nLFxuICAgICd2aWRlby9tcGVnJyxcbiAgICAndmlkZW8vb2dnJyxcbiAgICAndmlkZW8vbXAydCcsXG4gICAgJ3ZpZGVvL3dlYm0nLFxuICAgICd2aWRlby8zZ3BwJyxcbiAgICAndmlkZW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgICAnaW1hZ2UvYm1wJyxcbiAgICAnaW1hZ2UvZ2lmJyxcbiAgICAnaW1hZ2UvanBlZycsXG4gICAgJ2ltYWdlL3BuZycsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAgICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAgICdpbWFnZS90aWZmJyxcbiAgICAnaW1hZ2Uvd2VicCcsXG5dO1xuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXTtcbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgICAnYXBwbGljYXRpb24vcnRmJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXTtcbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAgICd0ZXh0L2NzcycsXG4gICAgJ3RleHQvY3N2JyxcbiAgICAndGV4dC9odG1sJyxcbiAgICAndGV4dC9jYWxlbmRhcicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbicsXG4gICAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgJ3RleHQveG1sJyxcbl07XG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9wZGYnLFxuXTtcbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAgICdmb250L290ZicsXG4gICAgJ2ZvbnQvdHRmJyxcbiAgICAnZm9udC93b2ZmJyxcbiAgICAnZm9udC93b2ZmMicsXG5dO1xuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAgICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICd2bmQudmlzaW8nLFxuICAgICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl07XG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAgIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAgIC4uLlZpZGVvTWltZVR5cGVzLFxuICAgIC4uLkltYWdlTWltZVR5cGVzLFxuICAgIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gICAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gICAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuICAgIC4uLkZvbnRNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMnO1xuY29uc3QgU2luZ2xlRmlsZSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wcztcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHBhdGgsIHN0eWxlOiB7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9LCBhbHQ6IG5hbWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIsIHsgY29udHJvbHM6IHRydWUsIHNyYzogcGF0aCB9LFxuICAgICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCJhdWRpb1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIiwgeyBraW5kOiBcImNhcHRpb25zXCIgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBhczogXCJhXCIsIGhyZWY6IHBhdGgsIG1sOiBcImRlZmF1bHRcIiwgc2l6ZTogXCJzbVwiLCByb3VuZGVkOiB0cnVlLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkRvY3VtZW50RG93bmxvYWRcIiwgY29sb3I6IFwid2hpdGVcIiwgbXI6IFwiZGVmYXVsdFwiIH0pLFxuICAgICAgICAgICAgbmFtZSkpKTtcbn07XG5jb25zdCBGaWxlID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAgICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KTtcbiAgICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgICAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IHBhdGg6IHBhdGgsIG5hbWU6IG5hbWUsIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlIH0pKTtcbiAgICB9XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJyc7XG4gICAgICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YCk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IGtleTogc2luZ2xlUGF0aCwgcGF0aDogc2luZ2xlUGF0aCwgbmFtZTogbmFtZVtpbmRleF0sIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlW2luZGV4XSB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgTGlzdCA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogMTAwLCAuLi5wcm9wcyB9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZS5qcyc7XG5jb25zdCBTaG93ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBwcm9wZXJ0eSB9ID0gcHJvcHM7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgcHJvcGVydHkubGFiZWwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGUsIHsgd2lkdGg6IFwiMTAwJVwiLCAuLi5wcm9wcyB9KSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNob3c7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBJbXBvcnRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK2ltcG9ydC1leHBvcnRAMy4wLjBfYWRtaW5qc0A3LjUuMi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9JbXBvcnRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltcG9ydENvbXBvbmVudCA9IEltcG9ydENvbXBvbmVudFxuaW1wb3J0IEV4cG9ydENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0V4cG9ydENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRXhwb3J0Q29tcG9uZW50ID0gRXhwb3J0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkRWRpdENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZEVkaXRDb21wb25lbnQgPSBVcGxvYWRFZGl0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkTGlzdENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZExpc3RDb21wb25lbnQgPSBVcGxvYWRMaXN0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkU2hvd0NvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZFNob3dDb21wb25lbnQgPSBVcGxvYWRTaG93Q29tcG9uZW50Il0sIm5hbWVzIjpbIkltcG9ydENvbXBvbmVudCIsInJlc291cmNlIiwiZmlsZSIsInNldEZpbGUiLCJ1c2VTdGF0ZSIsInNlbmROb3RpY2UiLCJ1c2VOb3RpY2UiLCJpc0ZldGNoaW5nIiwic2V0RmV0Y2hpbmciLCJvblVwbG9hZCIsInVwbG9hZGVkRmlsZSIsIm9uU3VibWl0IiwiaW1wb3J0RGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwibmFtZSIsIkFwaUNsaWVudCIsInJlc291cmNlQWN0aW9uIiwibWV0aG9kIiwicmVzb3VyY2VJZCIsImlkIiwiYWN0aW9uTmFtZSIsImRhdGEiLCJtZXNzYWdlIiwidHlwZSIsImUiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJMb2FkZXIiLCJCb3giLCJtYXJnaW4iLCJtYXhXaWR0aCIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhEaXJlY3Rpb24iLCJEcm9wWm9uZSIsImZpbGVzIiwib25DaGFuZ2UiLCJtdWx0aXBsZSIsIkRyb3Bab25lSXRlbSIsImZpbGVuYW1lIiwib25SZW1vdmUiLCJtIiwiQnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIiwiaXNEYXRlIiwidmFsdWUiLCJEYXRlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwidG9EYXRlIiwiYXJndW1lbnQiLCJhcmdTdHIiLCJjb25zdHJ1Y3RvciIsIk5hTiIsImlzVmFsaWQiLCJkYXRlIiwiX2RhdGUiLCJpc05hTiIsIk51bWJlciIsImZvcm1hdERpc3RhbmNlTG9jYWxlIiwibGVzc1RoYW5YU2Vjb25kcyIsIm9uZSIsIm90aGVyIiwieFNlY29uZHMiLCJoYWxmQU1pbnV0ZSIsImxlc3NUaGFuWE1pbnV0ZXMiLCJ4TWludXRlcyIsImFib3V0WEhvdXJzIiwieEhvdXJzIiwieERheXMiLCJhYm91dFhXZWVrcyIsInhXZWVrcyIsImFib3V0WE1vbnRocyIsInhNb250aHMiLCJhYm91dFhZZWFycyIsInhZZWFycyIsIm92ZXJYWWVhcnMiLCJhbG1vc3RYWWVhcnMiLCJmb3JtYXREaXN0YW5jZSIsInRva2VuIiwiY291bnQiLCJvcHRpb25zIiwicmVzdWx0IiwidG9rZW5WYWx1ZSIsInJlcGxhY2UiLCJhZGRTdWZmaXgiLCJjb21wYXJpc29uIiwiYnVpbGRGb3JtYXRMb25nRm4iLCJhcmdzIiwid2lkdGgiLCJTdHJpbmciLCJkZWZhdWx0V2lkdGgiLCJmb3JtYXQiLCJmb3JtYXRzIiwiZGF0ZUZvcm1hdHMiLCJmdWxsIiwibG9uZyIsIm1lZGl1bSIsInNob3J0IiwidGltZUZvcm1hdHMiLCJkYXRlVGltZUZvcm1hdHMiLCJmb3JtYXRMb25nIiwidGltZSIsImRhdGVUaW1lIiwiZm9ybWF0UmVsYXRpdmVMb2NhbGUiLCJsYXN0V2VlayIsInllc3RlcmRheSIsInRvZGF5IiwidG9tb3Jyb3ciLCJuZXh0V2VlayIsImZvcm1hdFJlbGF0aXZlIiwiX2Jhc2VEYXRlIiwiX29wdGlvbnMiLCJidWlsZExvY2FsaXplRm4iLCJjb250ZXh0IiwidmFsdWVzQXJyYXkiLCJmb3JtYXR0aW5nVmFsdWVzIiwiZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCIsInZhbHVlcyIsImluZGV4IiwiYXJndW1lbnRDYWxsYmFjayIsImVyYVZhbHVlcyIsIm5hcnJvdyIsImFiYnJldmlhdGVkIiwid2lkZSIsInF1YXJ0ZXJWYWx1ZXMiLCJtb250aFZhbHVlcyIsImRheVZhbHVlcyIsImRheVBlcmlvZFZhbHVlcyIsImFtIiwicG0iLCJtaWRuaWdodCIsIm5vb24iLCJtb3JuaW5nIiwiYWZ0ZXJub29uIiwiZXZlbmluZyIsIm5pZ2h0IiwiZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyIsIm9yZGluYWxOdW1iZXIiLCJkaXJ0eU51bWJlciIsIm51bWJlciIsInJlbTEwMCIsImxvY2FsaXplIiwiZXJhIiwicXVhcnRlciIsIm1vbnRoIiwiZGF5IiwiZGF5UGVyaW9kIiwiYnVpbGRNYXRjaEZuIiwic3RyaW5nIiwibWF0Y2hQYXR0ZXJuIiwibWF0Y2hQYXR0ZXJucyIsImRlZmF1bHRNYXRjaFdpZHRoIiwibWF0Y2hSZXN1bHQiLCJtYXRjaCIsIm1hdGNoZWRTdHJpbmciLCJwYXJzZVBhdHRlcm5zIiwiZGVmYXVsdFBhcnNlV2lkdGgiLCJrZXkiLCJBcnJheSIsImlzQXJyYXkiLCJmaW5kSW5kZXgiLCJwYXR0ZXJuIiwidGVzdCIsImZpbmRLZXkiLCJ2YWx1ZUNhbGxiYWNrIiwicmVzdCIsInNsaWNlIiwibGVuZ3RoIiwib2JqZWN0IiwicHJlZGljYXRlIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJhcnJheSIsImJ1aWxkTWF0Y2hQYXR0ZXJuRm4iLCJwYXJzZVJlc3VsdCIsInBhcnNlUGF0dGVybiIsIm1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4iLCJwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuIiwibWF0Y2hFcmFQYXR0ZXJucyIsInBhcnNlRXJhUGF0dGVybnMiLCJhbnkiLCJtYXRjaFF1YXJ0ZXJQYXR0ZXJucyIsInBhcnNlUXVhcnRlclBhdHRlcm5zIiwibWF0Y2hNb250aFBhdHRlcm5zIiwicGFyc2VNb250aFBhdHRlcm5zIiwibWF0Y2hEYXlQYXR0ZXJucyIsInBhcnNlRGF5UGF0dGVybnMiLCJtYXRjaERheVBlcmlvZFBhdHRlcm5zIiwicGFyc2VEYXlQZXJpb2RQYXR0ZXJucyIsInBhcnNlSW50IiwiZW5VUyIsImNvZGUiLCJ3ZWVrU3RhcnRzT24iLCJmaXJzdFdlZWtDb250YWluc0RhdGUiLCJkZWZhdWx0T3B0aW9ucyIsImdldERlZmF1bHRPcHRpb25zIiwibWlsbGlzZWNvbmRzSW5XZWVrIiwibWlsbGlzZWNvbmRzSW5EYXkiLCJzdGFydE9mRGF5Iiwic2V0SG91cnMiLCJnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIiwidXRjRGF0ZSIsIlVUQyIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsInNldFVUQ0Z1bGxZZWFyIiwiZ2V0VGltZSIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImRhdGVMZWZ0IiwiZGF0ZVJpZ2h0Iiwic3RhcnRPZkRheUxlZnQiLCJzdGFydE9mRGF5UmlnaHQiLCJ0aW1lc3RhbXBMZWZ0IiwidGltZXN0YW1wUmlnaHQiLCJNYXRoIiwicm91bmQiLCJjb25zdHJ1Y3RGcm9tIiwic3RhcnRPZlllYXIiLCJjbGVhbkRhdGUiLCJzZXRGdWxsWWVhciIsImdldERheU9mWWVhciIsImRpZmYiLCJkYXlPZlllYXIiLCJzdGFydE9mV2VlayIsImxvY2FsZSIsImdldERheSIsInNldERhdGUiLCJzdGFydE9mSVNPV2VlayIsImdldElTT1dlZWtZZWFyIiwieWVhciIsImZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIiLCJzdGFydE9mTmV4dFllYXIiLCJmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyIiwic3RhcnRPZlRoaXNZZWFyIiwic3RhcnRPZklTT1dlZWtZZWFyIiwiZm91cnRoT2ZKYW51YXJ5IiwiZ2V0SVNPV2VlayIsImdldFdlZWtZZWFyIiwiZmlyc3RXZWVrT2ZOZXh0WWVhciIsImZpcnN0V2Vla09mVGhpc1llYXIiLCJzdGFydE9mV2Vla1llYXIiLCJmaXJzdFdlZWsiLCJnZXRXZWVrIiwiYWRkTGVhZGluZ1plcm9zIiwidGFyZ2V0TGVuZ3RoIiwic2lnbiIsIm91dHB1dCIsImFicyIsInBhZFN0YXJ0IiwibGlnaHRGb3JtYXR0ZXJzIiwieSIsInNpZ25lZFllYXIiLCJNIiwiZCIsImEiLCJkYXlQZXJpb2RFbnVtVmFsdWUiLCJ0b1VwcGVyQ2FzZSIsImgiLCJIIiwicyIsIlMiLCJudW1iZXJPZkRpZ2l0cyIsIm1pbGxpc2Vjb25kcyIsImZyYWN0aW9uYWxTZWNvbmRzIiwiZmxvb3IiLCJwb3ciLCJkYXlQZXJpb2RFbnVtIiwiZm9ybWF0dGVycyIsIkciLCJ1bml0IiwiWSIsInNpZ25lZFdlZWtZZWFyIiwid2Vla1llYXIiLCJ0d29EaWdpdFllYXIiLCJSIiwiaXNvV2Vla1llYXIiLCJ1IiwiUSIsImNlaWwiLCJxIiwiTCIsInciLCJ3ZWVrIiwiSSIsImlzb1dlZWsiLCJEIiwiRSIsImRheU9mV2VlayIsImxvY2FsRGF5T2ZXZWVrIiwiYyIsImkiLCJpc29EYXlPZldlZWsiLCJob3VycyIsInRvTG93ZXJDYXNlIiwiYiIsIkIiLCJLIiwiayIsIlgiLCJfbG9jYWxpemUiLCJvcmlnaW5hbERhdGUiLCJfb3JpZ2luYWxEYXRlIiwidGltZXpvbmVPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyIsImZvcm1hdFRpbWV6b25lIiwieCIsIk8iLCJmb3JtYXRUaW1lem9uZVNob3J0IiwieiIsInQiLCJ0aW1lc3RhbXAiLCJUIiwib2Zmc2V0IiwiZGVsaW1pdGVyIiwiYWJzT2Zmc2V0IiwibWludXRlcyIsImRhdGVMb25nRm9ybWF0dGVyIiwidGltZUxvbmdGb3JtYXR0ZXIiLCJkYXRlVGltZUxvbmdGb3JtYXR0ZXIiLCJkYXRlUGF0dGVybiIsInRpbWVQYXR0ZXJuIiwiZGF0ZVRpbWVGb3JtYXQiLCJsb25nRm9ybWF0dGVycyIsInAiLCJQIiwiZGF5T2ZZZWFyVG9rZW5SRSIsIndlZWtZZWFyVG9rZW5SRSIsInRocm93VG9rZW5zIiwiaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbiIsImlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbiIsIndhcm5PclRocm93UHJvdGVjdGVkRXJyb3IiLCJpbnB1dCIsIl9tZXNzYWdlIiwiY29uc29sZSIsIndhcm4iLCJpbmNsdWRlcyIsIlJhbmdlRXJyb3IiLCJzdWJqZWN0IiwiZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsImxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwIiwiZXNjYXBlZFN0cmluZ1JlZ0V4cCIsImRvdWJsZVF1b3RlUmVnRXhwIiwidW5lc2NhcGVkTGF0aW5DaGFyYWN0ZXJSZWdFeHAiLCJmb3JtYXRTdHIiLCJkZWZhdWx0TG9jYWxlIiwiZm9ybWF0dGVyT3B0aW9ucyIsIm1hcCIsInN1YnN0cmluZyIsImZpcnN0Q2hhcmFjdGVyIiwibG9uZ0Zvcm1hdHRlciIsImpvaW4iLCJjbGVhbkVzY2FwZWRTdHJpbmciLCJmb3JtYXR0ZXIiLCJ1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnMiLCJ1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zIiwibWF0Y2hlZCIsIkV4cG9ydGVycyIsIm1pbWVUeXBlcyIsImpzb24iLCJjc3YiLCJ4bWwiLCJnZXRFeHBvcnRlZEZpbGVOYW1lIiwiZXh0ZW5zaW9uIiwibm93IiwiRXhwb3J0Q29tcG9uZW50IiwiZXhwb3J0RGF0YSIsImV4cG9ydGVkRGF0YSIsInBhcmFtcyIsImJsb2IiLCJCbG9iIiwic2F2ZUFzIiwiVGV4dCIsInZhcmlhbnQiLCJwYXJzZXJUeXBlIiwiRWRpdCIsInByb3BlcnR5IiwicmVjb3JkIiwidHJhbnNsYXRlUHJvcGVydHkiLCJ1c2VUcmFuc2xhdGlvbiIsImN1c3RvbSIsInBhdGgiLCJmbGF0IiwiZ2V0IiwiZmlsZVBhdGhQcm9wZXJ0eSIsImtleVByb3BlcnR5IiwiZmlsZVByb3BlcnR5Iiwib3JpZ2luYWxLZXkiLCJzZXRPcmlnaW5hbEtleSIsImZpbGVzVG9VcGxvYWQiLCJzZXRGaWxlc1RvVXBsb2FkIiwidXNlRWZmZWN0IiwiaGFuZGxlUmVtb3ZlIiwiaGFuZGxlTXVsdGlSZW1vdmUiLCJzaW5nbGVLZXkiLCJpbmRleE9mIiwiZmlsZXNUb0RlbGV0ZSIsImZpbGVzVG9EZWxldGVQcm9wZXJ0eSIsIm5ld1BhdGgiLCJjdXJyZW50UGF0aCIsIm5ld1BhcmFtcyIsInNldCIsImxvZyIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJ2YWxpZGF0ZSIsIm1heFNpemUiLCJzcmMiLCJGcmFnbWVudCIsIkF1ZGlvTWltZVR5cGVzIiwiSW1hZ2VNaW1lVHlwZXMiLCJTaW5nbGVGaWxlIiwicHJvcHMiLCJtaW1lVHlwZSIsInN0eWxlIiwibWF4SGVpZ2h0IiwiYWx0IiwiY29udHJvbHMiLCJraW5kIiwiYXMiLCJocmVmIiwibWwiLCJzaXplIiwicm91bmRlZCIsInRhcmdldCIsIkljb24iLCJpY29uIiwiY29sb3IiLCJtciIsIkZpbGUiLCJmaWxlTmFtZVByb3BlcnR5IiwibWltZVR5cGVQcm9wZXJ0eSIsIm9wdHMiLCJiYXNlVXJsIiwic2luZ2xlUGF0aCIsIkxpc3QiLCJTaG93IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiVXBsb2FkRWRpdENvbXBvbmVudCIsIlVwbG9hZExpc3RDb21wb25lbnQiLCJVcGxvYWRTaG93Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBR0EsTUFBTUEsZUFBZSxHQUFHQSxDQUFDO0lBQUVDLEVBQUFBLFFBQUFBO0lBQVMsQ0FBQyxLQUFLO01BQ3RDLE1BQU0sQ0FBQ0MsSUFBSSxFQUFFQyxPQUFPLENBQUMsR0FBR0MsY0FBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RDLEVBQUEsTUFBTUMsVUFBVSxHQUFHQyxpQkFBUyxFQUFFLENBQUE7TUFDOUIsTUFBTSxDQUFDQyxVQUFVLEVBQUVDLFdBQVcsQ0FBQyxHQUFHSixjQUFRLEVBQUUsQ0FBQTtNQUM1QyxNQUFNSyxRQUFRLEdBQUlDLFlBQVksSUFBSztJQUMvQlAsSUFBQUEsT0FBTyxDQUFDTyxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUE7T0FDckMsQ0FBQTtJQUNELEVBQUEsTUFBTUMsUUFBUSxHQUFHLFlBQVk7UUFDekIsSUFBSSxDQUFDVCxJQUFJLEVBQUU7SUFDUCxNQUFBLE9BQUE7SUFDSixLQUFBO1FBQ0FNLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixJQUFJO0lBQ0EsTUFBQSxNQUFNSSxVQUFVLEdBQUcsSUFBSUMsUUFBUSxFQUFFLENBQUE7VUFDakNELFVBQVUsQ0FBQ0UsTUFBTSxDQUFDLE1BQU0sRUFBRVosSUFBSSxFQUFFQSxJQUFJLEVBQUVhLElBQUksQ0FBQyxDQUFBO0lBQzNDLE1BQUEsTUFBTSxJQUFJQyxpQkFBUyxFQUFFLENBQUNDLGNBQWMsQ0FBQztJQUNqQ0MsUUFBQUEsTUFBTSxFQUFFLE1BQU07WUFDZEMsVUFBVSxFQUFFbEIsUUFBUSxDQUFDbUIsRUFBRTtJQUN2QkMsUUFBQUEsVUFBVSxFQUFFLFFBQVE7SUFDcEJDLFFBQUFBLElBQUksRUFBRVYsVUFBQUE7SUFDVixPQUFDLENBQUMsQ0FBQTtJQUNGUCxNQUFBQSxVQUFVLENBQUM7SUFBRWtCLFFBQUFBLE9BQU8sRUFBRSx1QkFBdUI7SUFBRUMsUUFBQUEsSUFBSSxFQUFFLFNBQUE7SUFBVSxPQUFDLENBQUMsQ0FBQTtTQUNwRSxDQUNELE9BQU9DLENBQUMsRUFBRTtJQUNOcEIsTUFBQUEsVUFBVSxDQUFDO1lBQUVrQixPQUFPLEVBQUVFLENBQUMsQ0FBQ0YsT0FBTztJQUFFQyxRQUFBQSxJQUFJLEVBQUUsT0FBQTtJQUFRLE9BQUMsQ0FBQyxDQUFBO0lBQ3JELEtBQUE7UUFDQWhCLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtPQUNyQixDQUFBO0lBQ0QsRUFBQSxJQUFJRCxVQUFVLEVBQUU7SUFDWixJQUFBLG9CQUFPbUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxtQkFBTSxNQUFFLENBQUMsQ0FBQTtJQUNyQixHQUFBO0lBQ0EsRUFBQSxvQkFBUUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDRSxnQkFBRyxFQUFBO0lBQUNDLElBQUFBLE1BQU0sRUFBQyxNQUFNO0lBQUNDLElBQUFBLFFBQVEsRUFBRSxHQUFJO0lBQUNDLElBQUFBLE9BQU8sRUFBQyxNQUFNO0lBQUNDLElBQUFBLGNBQWMsRUFBQyxRQUFRO0lBQUNDLElBQUFBLGFBQWEsRUFBQyxRQUFBO0lBQVEsR0FBQSxlQUNyR1Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDUSxxQkFBUSxFQUFBO0lBQUNDLElBQUFBLEtBQUssRUFBRSxFQUFHO0lBQUNDLElBQUFBLFFBQVEsRUFBRTVCLFFBQVM7SUFBQzZCLElBQUFBLFFBQVEsRUFBRSxLQUFBO09BQU8sQ0FBQyxFQUMxRHBDLElBQUksaUJBQUt3QixzQkFBQSxDQUFBQyxhQUFBLENBQUNZLHlCQUFZLEVBQUE7SUFBQ3JDLElBQUFBLElBQUksRUFBRUEsSUFBSztRQUFDc0MsUUFBUSxFQUFFdEMsSUFBSSxDQUFDYSxJQUFLO0lBQUMwQixJQUFBQSxRQUFRLEVBQUVBLE1BQU10QyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQUUsR0FBQyxDQUFFLGVBQzFGdUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDRSxnQkFBRyxFQUFBO0lBQUNHLElBQUFBLE9BQU8sRUFBQyxNQUFNO0lBQUNDLElBQUFBLGNBQWMsRUFBQyxRQUFRO0lBQUNTLElBQUFBLENBQUMsRUFBRSxFQUFBO0lBQUcsR0FBQSxlQUNoRGhCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2dCLG1CQUFNLEVBQUE7SUFBQ0MsSUFBQUEsT0FBTyxFQUFFakMsUUFBUztRQUFDa0MsUUFBUSxFQUFFLENBQUMzQyxJQUFJLElBQUlLLFVBQUFBO09BQVksRUFBQSxRQUVsRCxDQUNMLENBQ0YsQ0FBQyxDQUFBO0lBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzNDRDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ08sU0FBU3VDLE1BQU1BLENBQUNDLEtBQUssRUFBRTtNQUM1QixPQUNFQSxLQUFLLFlBQVlDLElBQUksSUFDcEIsT0FBT0QsS0FBSyxLQUFLLFFBQVEsSUFDeEJFLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxRQUFRLENBQUNDLElBQUksQ0FBQ0wsS0FBSyxDQUFDLEtBQUssZUFBZ0IsQ0FBQTtJQUVoRTs7SUN0Q0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNPLFNBQVNNLE1BQU1BLENBQUNDLFFBQVEsRUFBRTtNQUMvQixNQUFNQyxNQUFNLEdBQUdOLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxRQUFRLENBQUNDLElBQUksQ0FBQ0UsUUFBUSxDQUFDLENBQUE7O0lBRXZEO0lBQ0EsRUFBQSxJQUNFQSxRQUFRLFlBQVlOLElBQUksSUFDdkIsT0FBT00sUUFBUSxLQUFLLFFBQVEsSUFBSUMsTUFBTSxLQUFLLGVBQWdCLEVBQzVEO0lBQ0E7SUFDQSxJQUFBLE9BQU8sSUFBSUQsUUFBUSxDQUFDRSxXQUFXLENBQUMsQ0FBQ0YsUUFBUSxDQUFDLENBQUE7SUFDNUMsR0FBQyxNQUFNLElBQ0wsT0FBT0EsUUFBUSxLQUFLLFFBQVEsSUFDNUJDLE1BQU0sS0FBSyxpQkFBaUIsSUFDNUIsT0FBT0QsUUFBUSxLQUFLLFFBQVEsSUFDNUJDLE1BQU0sS0FBSyxpQkFBaUIsRUFDNUI7SUFDQTtJQUNBLElBQUEsT0FBTyxJQUFJUCxJQUFJLENBQUNNLFFBQVEsQ0FBQyxDQUFBO0lBQzNCLEdBQUMsTUFBTTtJQUNMO0lBQ0EsSUFBQSxPQUFPLElBQUlOLElBQUksQ0FBQ1MsR0FBRyxDQUFDLENBQUE7SUFDdEIsR0FBQTtJQUNGOztJQ25EQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxTQUFTQyxPQUFPQSxDQUFDQyxJQUFJLEVBQUU7TUFDNUIsSUFBSSxDQUFDYixNQUFNLENBQUNhLElBQUksQ0FBQyxJQUFJLE9BQU9BLElBQUksS0FBSyxRQUFRLEVBQUU7SUFDN0MsSUFBQSxPQUFPLEtBQUssQ0FBQTtJQUNkLEdBQUE7SUFDQSxFQUFBLE1BQU1DLEtBQUssR0FBR1AsTUFBTSxDQUFDTSxJQUFJLENBQUMsQ0FBQTtJQUMxQixFQUFBLE9BQU8sQ0FBQ0UsS0FBSyxDQUFDQyxNQUFNLENBQUNGLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDOUI7O0lDMUNBLE1BQU1HLG9CQUFvQixHQUFHO0lBQzNCQyxFQUFBQSxnQkFBZ0IsRUFBRTtJQUNoQkMsSUFBQUEsR0FBRyxFQUFFLG9CQUFvQjtJQUN6QkMsSUFBQUEsS0FBSyxFQUFFLDZCQUFBO09BQ1I7SUFFREMsRUFBQUEsUUFBUSxFQUFFO0lBQ1JGLElBQUFBLEdBQUcsRUFBRSxVQUFVO0lBQ2ZDLElBQUFBLEtBQUssRUFBRSxtQkFBQTtPQUNSO0lBRURFLEVBQUFBLFdBQVcsRUFBRSxlQUFlO0lBRTVCQyxFQUFBQSxnQkFBZ0IsRUFBRTtJQUNoQkosSUFBQUEsR0FBRyxFQUFFLG9CQUFvQjtJQUN6QkMsSUFBQUEsS0FBSyxFQUFFLDZCQUFBO09BQ1I7SUFFREksRUFBQUEsUUFBUSxFQUFFO0lBQ1JMLElBQUFBLEdBQUcsRUFBRSxVQUFVO0lBQ2ZDLElBQUFBLEtBQUssRUFBRSxtQkFBQTtPQUNSO0lBRURLLEVBQUFBLFdBQVcsRUFBRTtJQUNYTixJQUFBQSxHQUFHLEVBQUUsY0FBYztJQUNuQkMsSUFBQUEsS0FBSyxFQUFFLHVCQUFBO09BQ1I7SUFFRE0sRUFBQUEsTUFBTSxFQUFFO0lBQ05QLElBQUFBLEdBQUcsRUFBRSxRQUFRO0lBQ2JDLElBQUFBLEtBQUssRUFBRSxpQkFBQTtPQUNSO0lBRURPLEVBQUFBLEtBQUssRUFBRTtJQUNMUixJQUFBQSxHQUFHLEVBQUUsT0FBTztJQUNaQyxJQUFBQSxLQUFLLEVBQUUsZ0JBQUE7T0FDUjtJQUVEUSxFQUFBQSxXQUFXLEVBQUU7SUFDWFQsSUFBQUEsR0FBRyxFQUFFLGNBQWM7SUFDbkJDLElBQUFBLEtBQUssRUFBRSx1QkFBQTtPQUNSO0lBRURTLEVBQUFBLE1BQU0sRUFBRTtJQUNOVixJQUFBQSxHQUFHLEVBQUUsUUFBUTtJQUNiQyxJQUFBQSxLQUFLLEVBQUUsaUJBQUE7T0FDUjtJQUVEVSxFQUFBQSxZQUFZLEVBQUU7SUFDWlgsSUFBQUEsR0FBRyxFQUFFLGVBQWU7SUFDcEJDLElBQUFBLEtBQUssRUFBRSx3QkFBQTtPQUNSO0lBRURXLEVBQUFBLE9BQU8sRUFBRTtJQUNQWixJQUFBQSxHQUFHLEVBQUUsU0FBUztJQUNkQyxJQUFBQSxLQUFLLEVBQUUsa0JBQUE7T0FDUjtJQUVEWSxFQUFBQSxXQUFXLEVBQUU7SUFDWGIsSUFBQUEsR0FBRyxFQUFFLGNBQWM7SUFDbkJDLElBQUFBLEtBQUssRUFBRSx1QkFBQTtPQUNSO0lBRURhLEVBQUFBLE1BQU0sRUFBRTtJQUNOZCxJQUFBQSxHQUFHLEVBQUUsUUFBUTtJQUNiQyxJQUFBQSxLQUFLLEVBQUUsaUJBQUE7T0FDUjtJQUVEYyxFQUFBQSxVQUFVLEVBQUU7SUFDVmYsSUFBQUEsR0FBRyxFQUFFLGFBQWE7SUFDbEJDLElBQUFBLEtBQUssRUFBRSxzQkFBQTtPQUNSO0lBRURlLEVBQUFBLFlBQVksRUFBRTtJQUNaaEIsSUFBQUEsR0FBRyxFQUFFLGVBQWU7SUFDcEJDLElBQUFBLEtBQUssRUFBRSx3QkFBQTtJQUNULEdBQUE7SUFDRixDQUFDLENBQUE7SUFFTSxNQUFNZ0IsY0FBYyxHQUFHQSxDQUFDQyxLQUFLLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxLQUFLO0lBQ3ZELEVBQUEsSUFBSUMsTUFBTSxDQUFBO0lBRVYsRUFBQSxNQUFNQyxVQUFVLEdBQUd4QixvQkFBb0IsQ0FBQ29CLEtBQUssQ0FBQyxDQUFBO0lBQzlDLEVBQUEsSUFBSSxPQUFPSSxVQUFVLEtBQUssUUFBUSxFQUFFO0lBQ2xDRCxJQUFBQSxNQUFNLEdBQUdDLFVBQVUsQ0FBQTtJQUNyQixHQUFDLE1BQU0sSUFBSUgsS0FBSyxLQUFLLENBQUMsRUFBRTtRQUN0QkUsTUFBTSxHQUFHQyxVQUFVLENBQUN0QixHQUFHLENBQUE7SUFDekIsR0FBQyxNQUFNO0lBQ0xxQixJQUFBQSxNQUFNLEdBQUdDLFVBQVUsQ0FBQ3JCLEtBQUssQ0FBQ3NCLE9BQU8sQ0FBQyxXQUFXLEVBQUVKLEtBQUssQ0FBQ2pDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDbEUsR0FBQTtNQUVBLElBQUlrQyxPQUFPLEVBQUVJLFNBQVMsRUFBRTtRQUN0QixJQUFJSixPQUFPLENBQUNLLFVBQVUsSUFBSUwsT0FBTyxDQUFDSyxVQUFVLEdBQUcsQ0FBQyxFQUFFO1VBQ2hELE9BQU8sS0FBSyxHQUFHSixNQUFNLENBQUE7SUFDdkIsS0FBQyxNQUFNO1VBQ0wsT0FBT0EsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixLQUFBO0lBQ0YsR0FBQTtJQUVBLEVBQUEsT0FBT0EsTUFBTSxDQUFBO0lBQ2YsQ0FBQzs7SUNwR00sU0FBU0ssaUJBQWlCQSxDQUFDQyxJQUFJLEVBQUU7SUFDdEMsRUFBQSxPQUFPLENBQUNQLE9BQU8sR0FBRyxFQUFFLEtBQUs7SUFDdkI7SUFDQSxJQUFBLE1BQU1RLEtBQUssR0FBR1IsT0FBTyxDQUFDUSxLQUFLLEdBQUdDLE1BQU0sQ0FBQ1QsT0FBTyxDQUFDUSxLQUFLLENBQUMsR0FBR0QsSUFBSSxDQUFDRyxZQUFZLENBQUE7SUFDdkUsSUFBQSxNQUFNQyxNQUFNLEdBQUdKLElBQUksQ0FBQ0ssT0FBTyxDQUFDSixLQUFLLENBQUMsSUFBSUQsSUFBSSxDQUFDSyxPQUFPLENBQUNMLElBQUksQ0FBQ0csWUFBWSxDQUFDLENBQUE7SUFDckUsSUFBQSxPQUFPQyxNQUFNLENBQUE7T0FDZCxDQUFBO0lBQ0g7O0lDTEEsTUFBTUUsV0FBVyxHQUFHO0lBQ2xCQyxFQUFBQSxJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsWUFBWTtJQUNsQkMsRUFBQUEsTUFBTSxFQUFFLFVBQVU7SUFDbEJDLEVBQUFBLEtBQUssRUFBRSxZQUFBO0lBQ1QsQ0FBQyxDQUFBO0lBRUQsTUFBTUMsV0FBVyxHQUFHO0lBQ2xCSixFQUFBQSxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsYUFBYTtJQUNuQkMsRUFBQUEsTUFBTSxFQUFFLFdBQVc7SUFDbkJDLEVBQUFBLEtBQUssRUFBRSxRQUFBO0lBQ1QsQ0FBQyxDQUFBO0lBRUQsTUFBTUUsZUFBZSxHQUFHO0lBQ3RCTCxFQUFBQSxJQUFJLEVBQUUsd0JBQXdCO0lBQzlCQyxFQUFBQSxJQUFJLEVBQUUsd0JBQXdCO0lBQzlCQyxFQUFBQSxNQUFNLEVBQUUsb0JBQW9CO0lBQzVCQyxFQUFBQSxLQUFLLEVBQUUsb0JBQUE7SUFDVCxDQUFDLENBQUE7SUFFTSxNQUFNRyxVQUFVLEdBQUc7TUFDeEI5QyxJQUFJLEVBQUVnQyxpQkFBaUIsQ0FBQztJQUN0Qk0sSUFBQUEsT0FBTyxFQUFFQyxXQUFXO0lBQ3BCSCxJQUFBQSxZQUFZLEVBQUUsTUFBQTtJQUNoQixHQUFDLENBQUM7TUFFRlcsSUFBSSxFQUFFZixpQkFBaUIsQ0FBQztJQUN0Qk0sSUFBQUEsT0FBTyxFQUFFTSxXQUFXO0lBQ3BCUixJQUFBQSxZQUFZLEVBQUUsTUFBQTtJQUNoQixHQUFDLENBQUM7TUFFRlksUUFBUSxFQUFFaEIsaUJBQWlCLENBQUM7SUFDMUJNLElBQUFBLE9BQU8sRUFBRU8sZUFBZTtJQUN4QlQsSUFBQUEsWUFBWSxFQUFFLE1BQUE7T0FDZixDQUFBO0lBQ0gsQ0FBQzs7SUN0Q0QsTUFBTWEsb0JBQW9CLEdBQUc7SUFDM0JDLEVBQUFBLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUJDLEVBQUFBLFNBQVMsRUFBRSxrQkFBa0I7SUFDN0JDLEVBQUFBLEtBQUssRUFBRSxjQUFjO0lBQ3JCQyxFQUFBQSxRQUFRLEVBQUUsaUJBQWlCO0lBQzNCQyxFQUFBQSxRQUFRLEVBQUUsYUFBYTtJQUN2Qi9DLEVBQUFBLEtBQUssRUFBRSxHQUFBO0lBQ1QsQ0FBQyxDQUFBO0lBRU0sTUFBTWdELGNBQWMsR0FBR0EsQ0FBQy9CLEtBQUssRUFBRXZCLEtBQUssRUFBRXVELFNBQVMsRUFBRUMsUUFBUSxLQUM5RFIsb0JBQW9CLENBQUN6QixLQUFLLENBQUM7O0lDVjdCOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTs7SUFFTyxTQUFTa0MsZUFBZUEsQ0FBQ3pCLElBQUksRUFBRTtJQUNwQyxFQUFBLE9BQU8sQ0FBQzdDLEtBQUssRUFBRXNDLE9BQU8sS0FBSztJQUN6QixJQUFBLE1BQU1pQyxPQUFPLEdBQUdqQyxPQUFPLEVBQUVpQyxPQUFPLEdBQUd4QixNQUFNLENBQUNULE9BQU8sQ0FBQ2lDLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQTtJQUV6RSxJQUFBLElBQUlDLFdBQVcsQ0FBQTtJQUNmLElBQUEsSUFBSUQsT0FBTyxLQUFLLFlBQVksSUFBSTFCLElBQUksQ0FBQzRCLGdCQUFnQixFQUFFO1VBQ3JELE1BQU16QixZQUFZLEdBQUdILElBQUksQ0FBQzZCLHNCQUFzQixJQUFJN0IsSUFBSSxDQUFDRyxZQUFZLENBQUE7SUFDckUsTUFBQSxNQUFNRixLQUFLLEdBQUdSLE9BQU8sRUFBRVEsS0FBSyxHQUFHQyxNQUFNLENBQUNULE9BQU8sQ0FBQ1EsS0FBSyxDQUFDLEdBQUdFLFlBQVksQ0FBQTtJQUVuRXdCLE1BQUFBLFdBQVcsR0FDVDNCLElBQUksQ0FBQzRCLGdCQUFnQixDQUFDM0IsS0FBSyxDQUFDLElBQUlELElBQUksQ0FBQzRCLGdCQUFnQixDQUFDekIsWUFBWSxDQUFDLENBQUE7SUFDdkUsS0FBQyxNQUFNO0lBQ0wsTUFBQSxNQUFNQSxZQUFZLEdBQUdILElBQUksQ0FBQ0csWUFBWSxDQUFBO0lBQ3RDLE1BQUEsTUFBTUYsS0FBSyxHQUFHUixPQUFPLEVBQUVRLEtBQUssR0FBR0MsTUFBTSxDQUFDVCxPQUFPLENBQUNRLEtBQUssQ0FBQyxHQUFHRCxJQUFJLENBQUNHLFlBQVksQ0FBQTtJQUV4RXdCLE1BQUFBLFdBQVcsR0FBRzNCLElBQUksQ0FBQzhCLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQyxJQUFJRCxJQUFJLENBQUM4QixNQUFNLENBQUMzQixZQUFZLENBQUMsQ0FBQTtJQUMvRCxLQUFBO0lBQ0EsSUFBQSxNQUFNNEIsS0FBSyxHQUFHL0IsSUFBSSxDQUFDZ0MsZ0JBQWdCLEdBQUdoQyxJQUFJLENBQUNnQyxnQkFBZ0IsQ0FBQzdFLEtBQUssQ0FBQyxHQUFHQSxLQUFLLENBQUE7O0lBRTFFO1FBQ0EsT0FBT3dFLFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLENBQUE7T0FDMUIsQ0FBQTtJQUNIOztJQzdEQSxNQUFNRSxTQUFTLEdBQUc7SUFDaEJDLEVBQUFBLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDbEJDLEVBQUFBLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDekJDLEVBQUFBLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUE7SUFDdkMsQ0FBQyxDQUFBO0lBRUQsTUFBTUMsYUFBYSxHQUFHO01BQ3BCSCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7TUFDNUJDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztNQUNyQ0MsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFBO0lBQ25FLENBQUMsQ0FBQTs7SUFFRDtJQUNBO0lBQ0E7SUFDQTtJQUNBLE1BQU1FLFdBQVcsR0FBRztNQUNsQkosTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7TUFDcEVDLFdBQVcsRUFBRSxDQUNYLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxDQUNOO01BRURDLElBQUksRUFBRSxDQUNKLFNBQVMsRUFDVCxVQUFVLEVBQ1YsT0FBTyxFQUNQLE9BQU8sRUFDUCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxDQUFBO0lBRWQsQ0FBQyxDQUFBO0lBRUQsTUFBTUcsU0FBUyxHQUFHO0lBQ2hCTCxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDM0N4QixFQUFBQSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7SUFDakR5QixFQUFBQSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDOURDLEVBQUFBLElBQUksRUFBRSxDQUNKLFFBQVEsRUFDUixRQUFRLEVBQ1IsU0FBUyxFQUNULFdBQVcsRUFDWCxVQUFVLEVBQ1YsUUFBUSxFQUNSLFVBQVUsQ0FBQTtJQUVkLENBQUMsQ0FBQTtJQUVELE1BQU1JLGVBQWUsR0FBRztJQUN0Qk4sRUFBQUEsTUFBTSxFQUFFO0lBQ05PLElBQUFBLEVBQUUsRUFBRSxHQUFHO0lBQ1BDLElBQUFBLEVBQUUsRUFBRSxHQUFHO0lBQ1BDLElBQUFBLFFBQVEsRUFBRSxJQUFJO0lBQ2RDLElBQUFBLElBQUksRUFBRSxHQUFHO0lBQ1RDLElBQUFBLE9BQU8sRUFBRSxTQUFTO0lBQ2xCQyxJQUFBQSxTQUFTLEVBQUUsV0FBVztJQUN0QkMsSUFBQUEsT0FBTyxFQUFFLFNBQVM7SUFDbEJDLElBQUFBLEtBQUssRUFBRSxPQUFBO09BQ1I7SUFDRGIsRUFBQUEsV0FBVyxFQUFFO0lBQ1hNLElBQUFBLEVBQUUsRUFBRSxJQUFJO0lBQ1JDLElBQUFBLEVBQUUsRUFBRSxJQUFJO0lBQ1JDLElBQUFBLFFBQVEsRUFBRSxVQUFVO0lBQ3BCQyxJQUFBQSxJQUFJLEVBQUUsTUFBTTtJQUNaQyxJQUFBQSxPQUFPLEVBQUUsU0FBUztJQUNsQkMsSUFBQUEsU0FBUyxFQUFFLFdBQVc7SUFDdEJDLElBQUFBLE9BQU8sRUFBRSxTQUFTO0lBQ2xCQyxJQUFBQSxLQUFLLEVBQUUsT0FBQTtPQUNSO0lBQ0RaLEVBQUFBLElBQUksRUFBRTtJQUNKSyxJQUFBQSxFQUFFLEVBQUUsTUFBTTtJQUNWQyxJQUFBQSxFQUFFLEVBQUUsTUFBTTtJQUNWQyxJQUFBQSxRQUFRLEVBQUUsVUFBVTtJQUNwQkMsSUFBQUEsSUFBSSxFQUFFLE1BQU07SUFDWkMsSUFBQUEsT0FBTyxFQUFFLFNBQVM7SUFDbEJDLElBQUFBLFNBQVMsRUFBRSxXQUFXO0lBQ3RCQyxJQUFBQSxPQUFPLEVBQUUsU0FBUztJQUNsQkMsSUFBQUEsS0FBSyxFQUFFLE9BQUE7SUFDVCxHQUFBO0lBQ0YsQ0FBQyxDQUFBO0lBRUQsTUFBTUMseUJBQXlCLEdBQUc7SUFDaENmLEVBQUFBLE1BQU0sRUFBRTtJQUNOTyxJQUFBQSxFQUFFLEVBQUUsR0FBRztJQUNQQyxJQUFBQSxFQUFFLEVBQUUsR0FBRztJQUNQQyxJQUFBQSxRQUFRLEVBQUUsSUFBSTtJQUNkQyxJQUFBQSxJQUFJLEVBQUUsR0FBRztJQUNUQyxJQUFBQSxPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCQyxJQUFBQSxTQUFTLEVBQUUsa0JBQWtCO0lBQzdCQyxJQUFBQSxPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCQyxJQUFBQSxLQUFLLEVBQUUsVUFBQTtPQUNSO0lBQ0RiLEVBQUFBLFdBQVcsRUFBRTtJQUNYTSxJQUFBQSxFQUFFLEVBQUUsSUFBSTtJQUNSQyxJQUFBQSxFQUFFLEVBQUUsSUFBSTtJQUNSQyxJQUFBQSxRQUFRLEVBQUUsVUFBVTtJQUNwQkMsSUFBQUEsSUFBSSxFQUFFLE1BQU07SUFDWkMsSUFBQUEsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QkMsSUFBQUEsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QkMsSUFBQUEsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QkMsSUFBQUEsS0FBSyxFQUFFLFVBQUE7T0FDUjtJQUNEWixFQUFBQSxJQUFJLEVBQUU7SUFDSkssSUFBQUEsRUFBRSxFQUFFLE1BQU07SUFDVkMsSUFBQUEsRUFBRSxFQUFFLE1BQU07SUFDVkMsSUFBQUEsUUFBUSxFQUFFLFVBQVU7SUFDcEJDLElBQUFBLElBQUksRUFBRSxNQUFNO0lBQ1pDLElBQUFBLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekJDLElBQUFBLFNBQVMsRUFBRSxrQkFBa0I7SUFDN0JDLElBQUFBLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekJDLElBQUFBLEtBQUssRUFBRSxVQUFBO0lBQ1QsR0FBQTtJQUNGLENBQUMsQ0FBQTtJQUVELE1BQU1FLGFBQWEsR0FBR0EsQ0FBQ0MsV0FBVyxFQUFFM0IsUUFBUSxLQUFLO0lBQy9DLEVBQUEsTUFBTTRCLE1BQU0sR0FBR2xGLE1BQU0sQ0FBQ2lGLFdBQVcsQ0FBQyxDQUFBOztJQUVsQztJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUEsRUFBQSxNQUFNRSxNQUFNLEdBQUdELE1BQU0sR0FBRyxHQUFHLENBQUE7SUFDM0IsRUFBQSxJQUFJQyxNQUFNLEdBQUcsRUFBRSxJQUFJQSxNQUFNLEdBQUcsRUFBRSxFQUFFO1FBQzlCLFFBQVFBLE1BQU0sR0FBRyxFQUFFO0lBQ2pCLE1BQUEsS0FBSyxDQUFDO1lBQ0osT0FBT0QsTUFBTSxHQUFHLElBQUksQ0FBQTtJQUN0QixNQUFBLEtBQUssQ0FBQztZQUNKLE9BQU9BLE1BQU0sR0FBRyxJQUFJLENBQUE7SUFDdEIsTUFBQSxLQUFLLENBQUM7WUFDSixPQUFPQSxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBQ3hCLEtBQUE7SUFDRixHQUFBO01BQ0EsT0FBT0EsTUFBTSxHQUFHLElBQUksQ0FBQTtJQUN0QixDQUFDLENBQUE7SUFFTSxNQUFNRSxRQUFRLEdBQUc7TUFDdEJKLGFBQWE7TUFFYkssR0FBRyxFQUFFOUIsZUFBZSxDQUFDO0lBQ25CSyxJQUFBQSxNQUFNLEVBQUVHLFNBQVM7SUFDakI5QixJQUFBQSxZQUFZLEVBQUUsTUFBQTtJQUNoQixHQUFDLENBQUM7TUFFRnFELE9BQU8sRUFBRS9CLGVBQWUsQ0FBQztJQUN2QkssSUFBQUEsTUFBTSxFQUFFTyxhQUFhO0lBQ3JCbEMsSUFBQUEsWUFBWSxFQUFFLE1BQU07SUFDcEI2QixJQUFBQSxnQkFBZ0IsRUFBR3dCLE9BQU8sSUFBS0EsT0FBTyxHQUFHLENBQUE7SUFDM0MsR0FBQyxDQUFDO01BRUZDLEtBQUssRUFBRWhDLGVBQWUsQ0FBQztJQUNyQkssSUFBQUEsTUFBTSxFQUFFUSxXQUFXO0lBQ25CbkMsSUFBQUEsWUFBWSxFQUFFLE1BQUE7SUFDaEIsR0FBQyxDQUFDO01BRUZ1RCxHQUFHLEVBQUVqQyxlQUFlLENBQUM7SUFDbkJLLElBQUFBLE1BQU0sRUFBRVMsU0FBUztJQUNqQnBDLElBQUFBLFlBQVksRUFBRSxNQUFBO0lBQ2hCLEdBQUMsQ0FBQztNQUVGd0QsU0FBUyxFQUFFbEMsZUFBZSxDQUFDO0lBQ3pCSyxJQUFBQSxNQUFNLEVBQUVVLGVBQWU7SUFDdkJyQyxJQUFBQSxZQUFZLEVBQUUsTUFBTTtJQUNwQnlCLElBQUFBLGdCQUFnQixFQUFFcUIseUJBQXlCO0lBQzNDcEIsSUFBQUEsc0JBQXNCLEVBQUUsTUFBQTtPQUN6QixDQUFBO0lBQ0gsQ0FBQzs7SUMxTE0sU0FBUytCLFlBQVlBLENBQUM1RCxJQUFJLEVBQUU7SUFDakMsRUFBQSxPQUFPLENBQUM2RCxNQUFNLEVBQUVwRSxPQUFPLEdBQUcsRUFBRSxLQUFLO0lBQy9CLElBQUEsTUFBTVEsS0FBSyxHQUFHUixPQUFPLENBQUNRLEtBQUssQ0FBQTtJQUUzQixJQUFBLE1BQU02RCxZQUFZLEdBQ2Y3RCxLQUFLLElBQUlELElBQUksQ0FBQytELGFBQWEsQ0FBQzlELEtBQUssQ0FBQyxJQUNuQ0QsSUFBSSxDQUFDK0QsYUFBYSxDQUFDL0QsSUFBSSxDQUFDZ0UsaUJBQWlCLENBQUMsQ0FBQTtJQUM1QyxJQUFBLE1BQU1DLFdBQVcsR0FBR0osTUFBTSxDQUFDSyxLQUFLLENBQUNKLFlBQVksQ0FBQyxDQUFBO1FBRTlDLElBQUksQ0FBQ0csV0FBVyxFQUFFO0lBQ2hCLE1BQUEsT0FBTyxJQUFJLENBQUE7SUFDYixLQUFBO0lBQ0EsSUFBQSxNQUFNRSxhQUFhLEdBQUdGLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVwQyxJQUFBLE1BQU1HLGFBQWEsR0FDaEJuRSxLQUFLLElBQUlELElBQUksQ0FBQ29FLGFBQWEsQ0FBQ25FLEtBQUssQ0FBQyxJQUNuQ0QsSUFBSSxDQUFDb0UsYUFBYSxDQUFDcEUsSUFBSSxDQUFDcUUsaUJBQWlCLENBQUMsQ0FBQTtRQUU1QyxNQUFNQyxHQUFHLEdBQUdDLEtBQUssQ0FBQ0MsT0FBTyxDQUFDSixhQUFhLENBQUMsR0FDcENLLFNBQVMsQ0FBQ0wsYUFBYSxFQUFHTSxPQUFPLElBQUtBLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDUixhQUFhLENBQUMsQ0FBQztJQUNsRTtRQUNBUyxPQUFPLENBQUNSLGFBQWEsRUFBR00sT0FBTyxJQUFLQSxPQUFPLENBQUNDLElBQUksQ0FBQ1IsYUFBYSxDQUFDLENBQUMsQ0FBQTtJQUVwRSxJQUFBLElBQUloSCxLQUFLLENBQUE7SUFFVEEsSUFBQUEsS0FBSyxHQUFHNkMsSUFBSSxDQUFDNkUsYUFBYSxHQUFHN0UsSUFBSSxDQUFDNkUsYUFBYSxDQUFDUCxHQUFHLENBQUMsR0FBR0EsR0FBRyxDQUFBO1FBQzFEbkgsS0FBSyxHQUFHc0MsT0FBTyxDQUFDb0YsYUFBYTtJQUN6QjtJQUNBcEYsSUFBQUEsT0FBTyxDQUFDb0YsYUFBYSxDQUFDMUgsS0FBSyxDQUFDLEdBQzVCQSxLQUFLLENBQUE7UUFFVCxNQUFNMkgsSUFBSSxHQUFHakIsTUFBTSxDQUFDa0IsS0FBSyxDQUFDWixhQUFhLENBQUNhLE1BQU0sQ0FBQyxDQUFBO1FBRS9DLE9BQU87VUFBRTdILEtBQUs7SUFBRTJILE1BQUFBLElBQUFBO1NBQU0sQ0FBQTtPQUN2QixDQUFBO0lBQ0gsQ0FBQTtJQUVBLFNBQVNGLE9BQU9BLENBQUNLLE1BQU0sRUFBRUMsU0FBUyxFQUFFO0lBQ2xDLEVBQUEsS0FBSyxNQUFNWixHQUFHLElBQUlXLE1BQU0sRUFBRTtRQUN4QixJQUNFNUgsTUFBTSxDQUFDQyxTQUFTLENBQUM2SCxjQUFjLENBQUMzSCxJQUFJLENBQUN5SCxNQUFNLEVBQUVYLEdBQUcsQ0FBQyxJQUNqRFksU0FBUyxDQUFDRCxNQUFNLENBQUNYLEdBQUcsQ0FBQyxDQUFDLEVBQ3RCO0lBQ0EsTUFBQSxPQUFPQSxHQUFHLENBQUE7SUFDWixLQUFBO0lBQ0YsR0FBQTtJQUNBLEVBQUEsT0FBT2MsU0FBUyxDQUFBO0lBQ2xCLENBQUE7SUFFQSxTQUFTWCxTQUFTQSxDQUFDWSxLQUFLLEVBQUVILFNBQVMsRUFBRTtJQUNuQyxFQUFBLEtBQUssSUFBSVosR0FBRyxHQUFHLENBQUMsRUFBRUEsR0FBRyxHQUFHZSxLQUFLLENBQUNMLE1BQU0sRUFBRVYsR0FBRyxFQUFFLEVBQUU7SUFDM0MsSUFBQSxJQUFJWSxTQUFTLENBQUNHLEtBQUssQ0FBQ2YsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUN6QixNQUFBLE9BQU9BLEdBQUcsQ0FBQTtJQUNaLEtBQUE7SUFDRixHQUFBO0lBQ0EsRUFBQSxPQUFPYyxTQUFTLENBQUE7SUFDbEI7O0lDeERPLFNBQVNFLG1CQUFtQkEsQ0FBQ3RGLElBQUksRUFBRTtJQUN4QyxFQUFBLE9BQU8sQ0FBQzZELE1BQU0sRUFBRXBFLE9BQU8sR0FBRyxFQUFFLEtBQUs7UUFDL0IsTUFBTXdFLFdBQVcsR0FBR0osTUFBTSxDQUFDSyxLQUFLLENBQUNsRSxJQUFJLENBQUM4RCxZQUFZLENBQUMsQ0FBQTtJQUNuRCxJQUFBLElBQUksQ0FBQ0csV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFBO0lBQzdCLElBQUEsTUFBTUUsYUFBYSxHQUFHRixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFcEMsTUFBTXNCLFdBQVcsR0FBRzFCLE1BQU0sQ0FBQ0ssS0FBSyxDQUFDbEUsSUFBSSxDQUFDd0YsWUFBWSxDQUFDLENBQUE7SUFDbkQsSUFBQSxJQUFJLENBQUNELFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQTtJQUM3QixJQUFBLElBQUlwSSxLQUFLLEdBQUc2QyxJQUFJLENBQUM2RSxhQUFhLEdBQzFCN0UsSUFBSSxDQUFDNkUsYUFBYSxDQUFDVSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FDbENBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7SUFFbEI7SUFDQXBJLElBQUFBLEtBQUssR0FBR3NDLE9BQU8sQ0FBQ29GLGFBQWEsR0FBR3BGLE9BQU8sQ0FBQ29GLGFBQWEsQ0FBQzFILEtBQUssQ0FBQyxHQUFHQSxLQUFLLENBQUE7UUFFcEUsTUFBTTJILElBQUksR0FBR2pCLE1BQU0sQ0FBQ2tCLEtBQUssQ0FBQ1osYUFBYSxDQUFDYSxNQUFNLENBQUMsQ0FBQTtRQUUvQyxPQUFPO1VBQUU3SCxLQUFLO0lBQUUySCxNQUFBQSxJQUFBQTtTQUFNLENBQUE7T0FDdkIsQ0FBQTtJQUNIOztJQ2hCQSxNQUFNVyx5QkFBeUIsR0FBRyx1QkFBdUIsQ0FBQTtJQUN6RCxNQUFNQyx5QkFBeUIsR0FBRyxNQUFNLENBQUE7SUFFeEMsTUFBTUMsZ0JBQWdCLEdBQUc7SUFDdkJ6RCxFQUFBQSxNQUFNLEVBQUUsU0FBUztJQUNqQkMsRUFBQUEsV0FBVyxFQUFFLDREQUE0RDtJQUN6RUMsRUFBQUEsSUFBSSxFQUFFLDREQUFBO0lBQ1IsQ0FBQyxDQUFBO0lBQ0QsTUFBTXdELGdCQUFnQixHQUFHO0lBQ3ZCQyxFQUFBQSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFBO0lBQ3hCLENBQUMsQ0FBQTtJQUVELE1BQU1DLG9CQUFvQixHQUFHO0lBQzNCNUQsRUFBQUEsTUFBTSxFQUFFLFVBQVU7SUFDbEJDLEVBQUFBLFdBQVcsRUFBRSxXQUFXO0lBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsZ0NBQUE7SUFDUixDQUFDLENBQUE7SUFDRCxNQUFNMkQsb0JBQW9CLEdBQUc7TUFDM0JGLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQTtJQUM5QixDQUFDLENBQUE7SUFFRCxNQUFNRyxrQkFBa0IsR0FBRztJQUN6QjlELEVBQUFBLE1BQU0sRUFBRSxjQUFjO0lBQ3RCQyxFQUFBQSxXQUFXLEVBQUUscURBQXFEO0lBQ2xFQyxFQUFBQSxJQUFJLEVBQUUsMkZBQUE7SUFDUixDQUFDLENBQUE7SUFDRCxNQUFNNkQsa0JBQWtCLEdBQUc7TUFDekIvRCxNQUFNLEVBQUUsQ0FDTixLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssQ0FDTjtNQUVEMkQsR0FBRyxFQUFFLENBQ0gsTUFBTSxFQUNOLEtBQUssRUFDTCxPQUFPLEVBQ1AsTUFBTSxFQUNOLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxFQUNQLE1BQU0sRUFDTixLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLENBQUE7SUFFVCxDQUFDLENBQUE7SUFFRCxNQUFNSyxnQkFBZ0IsR0FBRztJQUN2QmhFLEVBQUFBLE1BQU0sRUFBRSxXQUFXO0lBQ25CeEIsRUFBQUEsS0FBSyxFQUFFLDBCQUEwQjtJQUNqQ3lCLEVBQUFBLFdBQVcsRUFBRSxpQ0FBaUM7SUFDOUNDLEVBQUFBLElBQUksRUFBRSw4REFBQTtJQUNSLENBQUMsQ0FBQTtJQUNELE1BQU0rRCxnQkFBZ0IsR0FBRztJQUN2QmpFLEVBQUFBLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUN6RDJELEVBQUFBLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQTtJQUMzRCxDQUFDLENBQUE7SUFFRCxNQUFNTyxzQkFBc0IsR0FBRztJQUM3QmxFLEVBQUFBLE1BQU0sRUFBRSw0REFBNEQ7SUFDcEUyRCxFQUFBQSxHQUFHLEVBQUUsZ0ZBQUE7SUFDUCxDQUFDLENBQUE7SUFDRCxNQUFNUSxzQkFBc0IsR0FBRztJQUM3QlIsRUFBQUEsR0FBRyxFQUFFO0lBQ0hwRCxJQUFBQSxFQUFFLEVBQUUsS0FBSztJQUNUQyxJQUFBQSxFQUFFLEVBQUUsS0FBSztJQUNUQyxJQUFBQSxRQUFRLEVBQUUsTUFBTTtJQUNoQkMsSUFBQUEsSUFBSSxFQUFFLE1BQU07SUFDWkMsSUFBQUEsT0FBTyxFQUFFLFVBQVU7SUFDbkJDLElBQUFBLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCQyxJQUFBQSxPQUFPLEVBQUUsVUFBVTtJQUNuQkMsSUFBQUEsS0FBSyxFQUFFLFFBQUE7SUFDVCxHQUFBO0lBQ0YsQ0FBQyxDQUFBO0lBRU0sTUFBTWtCLEtBQUssR0FBRztNQUNuQmhCLGFBQWEsRUFBRW9DLG1CQUFtQixDQUFDO0lBQ2pDeEIsSUFBQUEsWUFBWSxFQUFFMkIseUJBQXlCO0lBQ3ZDRCxJQUFBQSxZQUFZLEVBQUVFLHlCQUF5QjtJQUN2Q2IsSUFBQUEsYUFBYSxFQUFHMUgsS0FBSyxJQUFLbUosUUFBUSxDQUFDbkosS0FBSyxFQUFFLEVBQUUsQ0FBQTtJQUM5QyxHQUFDLENBQUM7TUFFRm9HLEdBQUcsRUFBRUssWUFBWSxDQUFDO0lBQ2hCRyxJQUFBQSxhQUFhLEVBQUU0QixnQkFBZ0I7SUFDL0IzQixJQUFBQSxpQkFBaUIsRUFBRSxNQUFNO0lBQ3pCSSxJQUFBQSxhQUFhLEVBQUV3QixnQkFBZ0I7SUFDL0J2QixJQUFBQSxpQkFBaUIsRUFBRSxLQUFBO0lBQ3JCLEdBQUMsQ0FBQztNQUVGYixPQUFPLEVBQUVJLFlBQVksQ0FBQztJQUNwQkcsSUFBQUEsYUFBYSxFQUFFK0Isb0JBQW9CO0lBQ25DOUIsSUFBQUEsaUJBQWlCLEVBQUUsTUFBTTtJQUN6QkksSUFBQUEsYUFBYSxFQUFFMkIsb0JBQW9CO0lBQ25DMUIsSUFBQUEsaUJBQWlCLEVBQUUsS0FBSztJQUN4QlEsSUFBQUEsYUFBYSxFQUFHOUMsS0FBSyxJQUFLQSxLQUFLLEdBQUcsQ0FBQTtJQUNwQyxHQUFDLENBQUM7TUFFRjBCLEtBQUssRUFBRUcsWUFBWSxDQUFDO0lBQ2xCRyxJQUFBQSxhQUFhLEVBQUVpQyxrQkFBa0I7SUFDakNoQyxJQUFBQSxpQkFBaUIsRUFBRSxNQUFNO0lBQ3pCSSxJQUFBQSxhQUFhLEVBQUU2QixrQkFBa0I7SUFDakM1QixJQUFBQSxpQkFBaUIsRUFBRSxLQUFBO0lBQ3JCLEdBQUMsQ0FBQztNQUVGWCxHQUFHLEVBQUVFLFlBQVksQ0FBQztJQUNoQkcsSUFBQUEsYUFBYSxFQUFFbUMsZ0JBQWdCO0lBQy9CbEMsSUFBQUEsaUJBQWlCLEVBQUUsTUFBTTtJQUN6QkksSUFBQUEsYUFBYSxFQUFFK0IsZ0JBQWdCO0lBQy9COUIsSUFBQUEsaUJBQWlCLEVBQUUsS0FBQTtJQUNyQixHQUFDLENBQUM7TUFFRlYsU0FBUyxFQUFFQyxZQUFZLENBQUM7SUFDdEJHLElBQUFBLGFBQWEsRUFBRXFDLHNCQUFzQjtJQUNyQ3BDLElBQUFBLGlCQUFpQixFQUFFLEtBQUs7SUFDeEJJLElBQUFBLGFBQWEsRUFBRWlDLHNCQUFzQjtJQUNyQ2hDLElBQUFBLGlCQUFpQixFQUFFLEtBQUE7T0FDcEIsQ0FBQTtJQUNILENBQUM7O0lDN0hEO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxNQUFNa0MsSUFBSSxHQUFHO0lBQ2xCQyxFQUFBQSxJQUFJLEVBQUUsT0FBTztJQUNibEgsRUFBQUEsY0FBYyxFQUFFQSxjQUFjO0lBQzlCdUIsRUFBQUEsVUFBVSxFQUFFQSxVQUFVO0lBQ3RCUyxFQUFBQSxjQUFjLEVBQUVBLGNBQWM7SUFDOUJnQyxFQUFBQSxRQUFRLEVBQUVBLFFBQVE7SUFDbEJZLEVBQUFBLEtBQUssRUFBRUEsS0FBSztJQUNaekUsRUFBQUEsT0FBTyxFQUFFO1FBQ1BnSCxZQUFZLEVBQUUsQ0FBQztJQUNmQyxJQUFBQSxxQkFBcUIsRUFBRSxDQUFBO0lBQ3pCLEdBQUE7SUFDRixDQUFDOztJQ3pCRCxJQUFJQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0lBRWhCLFNBQVNDLGlCQUFpQkEsR0FBRztJQUNsQyxFQUFBLE9BQU9ELGNBQWMsQ0FBQTtJQUN2Qjs7SUNKQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7O0lBd0RBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxNQUFNRSxrQkFBa0IsR0FBRyxTQUFTLENBQUE7O0lBRTNDO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxNQUFNQyxpQkFBaUIsR0FBRyxRQUFROztJQ2pGekM7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNPLFNBQVNDLFVBQVVBLENBQUNoSixJQUFJLEVBQUU7SUFDL0IsRUFBQSxNQUFNQyxLQUFLLEdBQUdQLE1BQU0sQ0FBQ00sSUFBSSxDQUFDLENBQUE7TUFDMUJDLEtBQUssQ0FBQ2dKLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUMxQixFQUFBLE9BQU9oSixLQUFLLENBQUE7SUFDZDs7SUMxQkE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNPLFNBQVNpSiwrQkFBK0JBLENBQUNsSixJQUFJLEVBQUU7TUFDcEQsTUFBTW1KLE9BQU8sR0FBRyxJQUFJOUosSUFBSSxDQUN0QkEsSUFBSSxDQUFDK0osR0FBRyxDQUNOcEosSUFBSSxDQUFDcUosV0FBVyxFQUFFLEVBQ2xCckosSUFBSSxDQUFDc0osUUFBUSxFQUFFLEVBQ2Z0SixJQUFJLENBQUN1SixPQUFPLEVBQUUsRUFDZHZKLElBQUksQ0FBQ3dKLFFBQVEsRUFBRSxFQUNmeEosSUFBSSxDQUFDeUosVUFBVSxFQUFFLEVBQ2pCekosSUFBSSxDQUFDMEosVUFBVSxFQUFFLEVBQ2pCMUosSUFBSSxDQUFDMkosZUFBZSxFQUN0QixDQUNGLENBQUMsQ0FBQTtNQUNEUixPQUFPLENBQUNTLGNBQWMsQ0FBQzVKLElBQUksQ0FBQ3FKLFdBQVcsRUFBRSxDQUFDLENBQUE7TUFDMUMsT0FBT3JKLElBQUksQ0FBQzZKLE9BQU8sRUFBRSxHQUFHVixPQUFPLENBQUNVLE9BQU8sRUFBRSxDQUFBO0lBQzNDOztJQ3JCQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ08sU0FBU0Msd0JBQXdCQSxDQUFDQyxRQUFRLEVBQUVDLFNBQVMsRUFBRTtJQUM1RCxFQUFBLE1BQU1DLGNBQWMsR0FBR2pCLFVBQVUsQ0FBQ2UsUUFBUSxDQUFDLENBQUE7SUFDM0MsRUFBQSxNQUFNRyxlQUFlLEdBQUdsQixVQUFVLENBQUNnQixTQUFTLENBQUMsQ0FBQTtNQUU3QyxNQUFNRyxhQUFhLEdBQ2pCRixjQUFjLENBQUNKLE9BQU8sRUFBRSxHQUFHWCwrQkFBK0IsQ0FBQ2UsY0FBYyxDQUFDLENBQUE7TUFDNUUsTUFBTUcsY0FBYyxHQUNsQkYsZUFBZSxDQUFDTCxPQUFPLEVBQUUsR0FDekJYLCtCQUErQixDQUFDZ0IsZUFBZSxDQUFDLENBQUE7O0lBRWxEO0lBQ0E7SUFDQTtNQUNBLE9BQU9HLElBQUksQ0FBQ0MsS0FBSyxDQUFDLENBQUNILGFBQWEsR0FBR0MsY0FBYyxJQUFJckIsaUJBQWlCLENBQUMsQ0FBQTtJQUN6RTs7SUNsREE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxTQUFTd0IsYUFBYUEsQ0FBQ3ZLLElBQUksRUFBRVosS0FBSyxFQUFFO01BQ3pDLElBQUlZLElBQUksWUFBWVgsSUFBSSxFQUFFO0lBQ3hCLElBQUEsT0FBTyxJQUFJVyxJQUFJLENBQUNILFdBQVcsQ0FBQ1QsS0FBSyxDQUFDLENBQUE7SUFDcEMsR0FBQyxNQUFNO0lBQ0wsSUFBQSxPQUFPLElBQUlDLElBQUksQ0FBQ0QsS0FBSyxDQUFDLENBQUE7SUFDeEIsR0FBQTtJQUNGOztJQy9CQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ08sU0FBU29MLFdBQVdBLENBQUN4SyxJQUFJLEVBQUU7SUFDaEMsRUFBQSxNQUFNeUssU0FBUyxHQUFHL0ssTUFBTSxDQUFDTSxJQUFJLENBQUMsQ0FBQTtJQUM5QixFQUFBLE1BQU1DLEtBQUssR0FBR3NLLGFBQWEsQ0FBQ3ZLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNwQ0MsRUFBQUEsS0FBSyxDQUFDeUssV0FBVyxDQUFDRCxTQUFTLENBQUNwQixXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7TUFDaERwSixLQUFLLENBQUNnSixRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDMUIsRUFBQSxPQUFPaEosS0FBSyxDQUFBO0lBQ2Q7O0lDekJBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ08sU0FBUzBLLFlBQVlBLENBQUMzSyxJQUFJLEVBQUU7SUFDakMsRUFBQSxNQUFNQyxLQUFLLEdBQUdQLE1BQU0sQ0FBQ00sSUFBSSxDQUFDLENBQUE7TUFDMUIsTUFBTTRLLElBQUksR0FBR2Qsd0JBQXdCLENBQUM3SixLQUFLLEVBQUV1SyxXQUFXLENBQUN2SyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ2hFLEVBQUEsTUFBTTRLLFNBQVMsR0FBR0QsSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUMxQixFQUFBLE9BQU9DLFNBQVMsQ0FBQTtJQUNsQjs7SUN6QkE7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxTQUFTQyxXQUFXQSxDQUFDOUssSUFBSSxFQUFFMEIsT0FBTyxFQUFFO0lBQ3pDLEVBQUEsTUFBTWtILGNBQWMsR0FBR0MsaUJBQWlCLEVBQUUsQ0FBQTtNQUMxQyxNQUFNSCxZQUFZLEdBQ2hCaEgsT0FBTyxFQUFFZ0gsWUFBWSxJQUNyQmhILE9BQU8sRUFBRXFKLE1BQU0sRUFBRXJKLE9BQU8sRUFBRWdILFlBQVksSUFDdENFLGNBQWMsQ0FBQ0YsWUFBWSxJQUMzQkUsY0FBYyxDQUFDbUMsTUFBTSxFQUFFckosT0FBTyxFQUFFZ0gsWUFBWSxJQUM1QyxDQUFDLENBQUE7SUFFSCxFQUFBLE1BQU16SSxLQUFLLEdBQUdQLE1BQU0sQ0FBQ00sSUFBSSxDQUFDLENBQUE7SUFDMUIsRUFBQSxNQUFNMkYsR0FBRyxHQUFHMUYsS0FBSyxDQUFDK0ssTUFBTSxFQUFFLENBQUE7SUFDMUIsRUFBQSxNQUFNSixJQUFJLEdBQUcsQ0FBQ2pGLEdBQUcsR0FBRytDLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJL0MsR0FBRyxHQUFHK0MsWUFBWSxDQUFBO01BRTlEekksS0FBSyxDQUFDZ0wsT0FBTyxDQUFDaEwsS0FBSyxDQUFDc0osT0FBTyxFQUFFLEdBQUdxQixJQUFJLENBQUMsQ0FBQTtNQUNyQzNLLEtBQUssQ0FBQ2dKLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUMxQixFQUFBLE9BQU9oSixLQUFLLENBQUE7SUFDZDs7SUMvQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxTQUFTaUwsY0FBY0EsQ0FBQ2xMLElBQUksRUFBRTtNQUNuQyxPQUFPOEssV0FBVyxDQUFDOUssSUFBSSxFQUFFO0lBQUUwSSxJQUFBQSxZQUFZLEVBQUUsQ0FBQTtJQUFFLEdBQUMsQ0FBQyxDQUFBO0lBQy9DOztJQ3RCQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNPLFNBQVN5QyxjQUFjQSxDQUFDbkwsSUFBSSxFQUFFO0lBQ25DLEVBQUEsTUFBTUMsS0FBSyxHQUFHUCxNQUFNLENBQUNNLElBQUksQ0FBQyxDQUFBO0lBQzFCLEVBQUEsTUFBTW9MLElBQUksR0FBR25MLEtBQUssQ0FBQ29KLFdBQVcsRUFBRSxDQUFBO0lBRWhDLEVBQUEsTUFBTWdDLHlCQUF5QixHQUFHZCxhQUFhLENBQUN2SyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7TUFDeERxTCx5QkFBeUIsQ0FBQ1gsV0FBVyxDQUFDVSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUNyREMseUJBQXlCLENBQUNwQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUMsRUFBQSxNQUFNcUMsZUFBZSxHQUFHSixjQUFjLENBQUNHLHlCQUF5QixDQUFDLENBQUE7SUFFakUsRUFBQSxNQUFNRSx5QkFBeUIsR0FBR2hCLGFBQWEsQ0FBQ3ZLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUN4RHVMLHlCQUF5QixDQUFDYixXQUFXLENBQUNVLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7TUFDakRHLHlCQUF5QixDQUFDdEMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzlDLEVBQUEsTUFBTXVDLGVBQWUsR0FBR04sY0FBYyxDQUFDSyx5QkFBeUIsQ0FBQyxDQUFBO01BRWpFLElBQUl0TCxLQUFLLENBQUM0SixPQUFPLEVBQUUsSUFBSXlCLGVBQWUsQ0FBQ3pCLE9BQU8sRUFBRSxFQUFFO1FBQ2hELE9BQU91QixJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ2pCLEdBQUMsTUFBTSxJQUFJbkwsS0FBSyxDQUFDNEosT0FBTyxFQUFFLElBQUkyQixlQUFlLENBQUMzQixPQUFPLEVBQUUsRUFBRTtJQUN2RCxJQUFBLE9BQU91QixJQUFJLENBQUE7SUFDYixHQUFDLE1BQU07UUFDTCxPQUFPQSxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ2pCLEdBQUE7SUFDRjs7SUMzQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNPLFNBQVNLLGtCQUFrQkEsQ0FBQ3pMLElBQUksRUFBRTtJQUN2QyxFQUFBLE1BQU1vTCxJQUFJLEdBQUdELGNBQWMsQ0FBQ25MLElBQUksQ0FBQyxDQUFBO0lBQ2pDLEVBQUEsTUFBTTBMLGVBQWUsR0FBR25CLGFBQWEsQ0FBQ3ZLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUM5QzBMLGVBQWUsQ0FBQ2hCLFdBQVcsQ0FBQ1UsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUN2Q00sZUFBZSxDQUFDekMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO01BQ3BDLE9BQU9pQyxjQUFjLENBQUNRLGVBQWUsQ0FBQyxDQUFBO0lBQ3hDOztJQzVCQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxTQUFTQyxVQUFVQSxDQUFDM0wsSUFBSSxFQUFFO0lBQy9CLEVBQUEsTUFBTUMsS0FBSyxHQUFHUCxNQUFNLENBQUNNLElBQUksQ0FBQyxDQUFBO0lBQzFCLEVBQUEsTUFBTTRLLElBQUksR0FDUk0sY0FBYyxDQUFDakwsS0FBSyxDQUFDLENBQUM0SixPQUFPLEVBQUUsR0FBRzRCLGtCQUFrQixDQUFDeEwsS0FBSyxDQUFDLENBQUM0SixPQUFPLEVBQUUsQ0FBQTs7SUFFdkU7SUFDQTtJQUNBO01BQ0EsT0FBT1EsSUFBSSxDQUFDQyxLQUFLLENBQUNNLElBQUksR0FBRzlCLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2xEOztJQzlCQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ08sU0FBUzhDLFdBQVdBLENBQUM1TCxJQUFJLEVBQUUwQixPQUFPLEVBQUU7SUFDekMsRUFBQSxNQUFNekIsS0FBSyxHQUFHUCxNQUFNLENBQUNNLElBQUksQ0FBQyxDQUFBO0lBQzFCLEVBQUEsTUFBTW9MLElBQUksR0FBR25MLEtBQUssQ0FBQ29KLFdBQVcsRUFBRSxDQUFBO0lBRWhDLEVBQUEsTUFBTVQsY0FBYyxHQUFHQyxpQkFBaUIsRUFBRSxDQUFBO01BQzFDLE1BQU1GLHFCQUFxQixHQUN6QmpILE9BQU8sRUFBRWlILHFCQUFxQixJQUM5QmpILE9BQU8sRUFBRXFKLE1BQU0sRUFBRXJKLE9BQU8sRUFBRWlILHFCQUFxQixJQUMvQ0MsY0FBYyxDQUFDRCxxQkFBcUIsSUFDcENDLGNBQWMsQ0FBQ21DLE1BQU0sRUFBRXJKLE9BQU8sRUFBRWlILHFCQUFxQixJQUNyRCxDQUFDLENBQUE7SUFFSCxFQUFBLE1BQU1rRCxtQkFBbUIsR0FBR3RCLGFBQWEsQ0FBQ3ZLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUNsRDZMLG1CQUFtQixDQUFDbkIsV0FBVyxDQUFDVSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRXpDLHFCQUFxQixDQUFDLENBQUE7TUFDbkVrRCxtQkFBbUIsQ0FBQzVDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN4QyxFQUFBLE1BQU1xQyxlQUFlLEdBQUdSLFdBQVcsQ0FBQ2UsbUJBQW1CLEVBQUVuSyxPQUFPLENBQUMsQ0FBQTtJQUVqRSxFQUFBLE1BQU1vSyxtQkFBbUIsR0FBR3ZCLGFBQWEsQ0FBQ3ZLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUNsRDhMLG1CQUFtQixDQUFDcEIsV0FBVyxDQUFDVSxJQUFJLEVBQUUsQ0FBQyxFQUFFekMscUJBQXFCLENBQUMsQ0FBQTtNQUMvRG1ELG1CQUFtQixDQUFDN0MsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3hDLEVBQUEsTUFBTXVDLGVBQWUsR0FBR1YsV0FBVyxDQUFDZ0IsbUJBQW1CLEVBQUVwSyxPQUFPLENBQUMsQ0FBQTtNQUVqRSxJQUFJekIsS0FBSyxDQUFDNEosT0FBTyxFQUFFLElBQUl5QixlQUFlLENBQUN6QixPQUFPLEVBQUUsRUFBRTtRQUNoRCxPQUFPdUIsSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNqQixHQUFDLE1BQU0sSUFBSW5MLEtBQUssQ0FBQzRKLE9BQU8sRUFBRSxJQUFJMkIsZUFBZSxDQUFDM0IsT0FBTyxFQUFFLEVBQUU7SUFDdkQsSUFBQSxPQUFPdUIsSUFBSSxDQUFBO0lBQ2IsR0FBQyxNQUFNO1FBQ0wsT0FBT0EsSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNqQixHQUFBO0lBQ0Y7O0lDckVBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxTQUFTVyxlQUFlQSxDQUFDL0wsSUFBSSxFQUFFMEIsT0FBTyxFQUFFO0lBQzdDLEVBQUEsTUFBTWtILGNBQWMsR0FBR0MsaUJBQWlCLEVBQUUsQ0FBQTtNQUMxQyxNQUFNRixxQkFBcUIsR0FDekJqSCxPQUFPLEVBQUVpSCxxQkFBcUIsSUFDOUJqSCxPQUFPLEVBQUVxSixNQUFNLEVBQUVySixPQUFPLEVBQUVpSCxxQkFBcUIsSUFDL0NDLGNBQWMsQ0FBQ0QscUJBQXFCLElBQ3BDQyxjQUFjLENBQUNtQyxNQUFNLEVBQUVySixPQUFPLEVBQUVpSCxxQkFBcUIsSUFDckQsQ0FBQyxDQUFBO0lBRUgsRUFBQSxNQUFNeUMsSUFBSSxHQUFHUSxXQUFXLENBQUM1TCxJQUFJLEVBQUUwQixPQUFPLENBQUMsQ0FBQTtJQUN2QyxFQUFBLE1BQU1zSyxTQUFTLEdBQUd6QixhQUFhLENBQUN2SyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7TUFDeENnTSxTQUFTLENBQUN0QixXQUFXLENBQUNVLElBQUksRUFBRSxDQUFDLEVBQUV6QyxxQkFBcUIsQ0FBQyxDQUFBO01BQ3JEcUQsU0FBUyxDQUFDL0MsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzlCLEVBQUEsTUFBTWhKLEtBQUssR0FBRzZLLFdBQVcsQ0FBQ2tCLFNBQVMsRUFBRXRLLE9BQU8sQ0FBQyxDQUFBO0lBQzdDLEVBQUEsT0FBT3pCLEtBQUssQ0FBQTtJQUNkOztJQ3ZEQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVPLFNBQVNnTSxPQUFPQSxDQUFDak0sSUFBSSxFQUFFMEIsT0FBTyxFQUFFO0lBQ3JDLEVBQUEsTUFBTXpCLEtBQUssR0FBR1AsTUFBTSxDQUFDTSxJQUFJLENBQUMsQ0FBQTtNQUMxQixNQUFNNEssSUFBSSxHQUNSRSxXQUFXLENBQUM3SyxLQUFLLEVBQUV5QixPQUFPLENBQUMsQ0FBQ21JLE9BQU8sRUFBRSxHQUNyQ2tDLGVBQWUsQ0FBQzlMLEtBQUssRUFBRXlCLE9BQU8sQ0FBQyxDQUFDbUksT0FBTyxFQUFFLENBQUE7O0lBRTNDO0lBQ0E7SUFDQTtNQUNBLE9BQU9RLElBQUksQ0FBQ0MsS0FBSyxDQUFDTSxJQUFJLEdBQUc5QixrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNsRDs7SUN4RE8sU0FBU29ELGVBQWVBLENBQUM3RyxNQUFNLEVBQUU4RyxZQUFZLEVBQUU7TUFDcEQsTUFBTUMsSUFBSSxHQUFHL0csTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ2xDLEVBQUEsTUFBTWdILE1BQU0sR0FBR2hDLElBQUksQ0FBQ2lDLEdBQUcsQ0FBQ2pILE1BQU0sQ0FBQyxDQUFDN0YsUUFBUSxFQUFFLENBQUMrTSxRQUFRLENBQUNKLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtNQUN0RSxPQUFPQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQTtJQUN0Qjs7SUNGQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRU8sTUFBTUcsZUFBZSxHQUFHO0lBQzdCO0lBQ0FDLEVBQUFBLENBQUNBLENBQUN6TSxJQUFJLEVBQUV3QixLQUFLLEVBQUU7SUFDYjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBLElBQUEsTUFBTWtMLFVBQVUsR0FBRzFNLElBQUksQ0FBQ3FKLFdBQVcsRUFBRSxDQUFBO0lBQ3JDO1FBQ0EsTUFBTStCLElBQUksR0FBR3NCLFVBQVUsR0FBRyxDQUFDLEdBQUdBLFVBQVUsR0FBRyxDQUFDLEdBQUdBLFVBQVUsQ0FBQTtJQUN6RCxJQUFBLE9BQU9SLGVBQWUsQ0FBQzFLLEtBQUssS0FBSyxJQUFJLEdBQUc0SixJQUFJLEdBQUcsR0FBRyxHQUFHQSxJQUFJLEVBQUU1SixLQUFLLENBQUN5RixNQUFNLENBQUMsQ0FBQTtPQUN6RTtJQUVEO0lBQ0EwRixFQUFBQSxDQUFDQSxDQUFDM00sSUFBSSxFQUFFd0IsS0FBSyxFQUFFO0lBQ2IsSUFBQSxNQUFNa0UsS0FBSyxHQUFHMUYsSUFBSSxDQUFDc0osUUFBUSxFQUFFLENBQUE7SUFDN0IsSUFBQSxPQUFPOUgsS0FBSyxLQUFLLEdBQUcsR0FBR1csTUFBTSxDQUFDdUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHd0csZUFBZSxDQUFDeEcsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtPQUN6RTtJQUVEO0lBQ0FrSCxFQUFBQSxDQUFDQSxDQUFDNU0sSUFBSSxFQUFFd0IsS0FBSyxFQUFFO1FBQ2IsT0FBTzBLLGVBQWUsQ0FBQ2xNLElBQUksQ0FBQ3VKLE9BQU8sRUFBRSxFQUFFL0gsS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDckQ7SUFFRDtJQUNBNEYsRUFBQUEsQ0FBQ0EsQ0FBQzdNLElBQUksRUFBRXdCLEtBQUssRUFBRTtJQUNiLElBQUEsTUFBTXNMLGtCQUFrQixHQUFHOU0sSUFBSSxDQUFDd0osUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBRWxFLElBQUEsUUFBUWhJLEtBQUs7SUFDWCxNQUFBLEtBQUssR0FBRyxDQUFBO0lBQ1IsTUFBQSxLQUFLLElBQUk7SUFDUCxRQUFBLE9BQU9zTCxrQkFBa0IsQ0FBQ0MsV0FBVyxFQUFFLENBQUE7SUFDekMsTUFBQSxLQUFLLEtBQUs7SUFDUixRQUFBLE9BQU9ELGtCQUFrQixDQUFBO0lBQzNCLE1BQUEsS0FBSyxPQUFPO1lBQ1YsT0FBT0Esa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDOUIsTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUE7SUFDRSxRQUFBLE9BQU9BLGtCQUFrQixLQUFLLElBQUksR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hELEtBQUE7T0FDRDtJQUVEO0lBQ0FFLEVBQUFBLENBQUNBLENBQUNoTixJQUFJLEVBQUV3QixLQUFLLEVBQUU7SUFDYixJQUFBLE9BQU8wSyxlQUFlLENBQUNsTSxJQUFJLENBQUN3SixRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFaEksS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDakU7SUFFRDtJQUNBZ0csRUFBQUEsQ0FBQ0EsQ0FBQ2pOLElBQUksRUFBRXdCLEtBQUssRUFBRTtRQUNiLE9BQU8wSyxlQUFlLENBQUNsTSxJQUFJLENBQUN3SixRQUFRLEVBQUUsRUFBRWhJLEtBQUssQ0FBQ3lGLE1BQU0sQ0FBQyxDQUFBO09BQ3REO0lBRUQ7SUFDQWxJLEVBQUFBLENBQUNBLENBQUNpQixJQUFJLEVBQUV3QixLQUFLLEVBQUU7UUFDYixPQUFPMEssZUFBZSxDQUFDbE0sSUFBSSxDQUFDeUosVUFBVSxFQUFFLEVBQUVqSSxLQUFLLENBQUN5RixNQUFNLENBQUMsQ0FBQTtPQUN4RDtJQUVEO0lBQ0FpRyxFQUFBQSxDQUFDQSxDQUFDbE4sSUFBSSxFQUFFd0IsS0FBSyxFQUFFO1FBQ2IsT0FBTzBLLGVBQWUsQ0FBQ2xNLElBQUksQ0FBQzBKLFVBQVUsRUFBRSxFQUFFbEksS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDeEQ7SUFFRDtJQUNBa0csRUFBQUEsQ0FBQ0EsQ0FBQ25OLElBQUksRUFBRXdCLEtBQUssRUFBRTtJQUNiLElBQUEsTUFBTTRMLGNBQWMsR0FBRzVMLEtBQUssQ0FBQ3lGLE1BQU0sQ0FBQTtJQUNuQyxJQUFBLE1BQU1vRyxZQUFZLEdBQUdyTixJQUFJLENBQUMySixlQUFlLEVBQUUsQ0FBQTtJQUMzQyxJQUFBLE1BQU0yRCxpQkFBaUIsR0FBR2pELElBQUksQ0FBQ2tELEtBQUssQ0FDbENGLFlBQVksR0FBR2hELElBQUksQ0FBQ21ELEdBQUcsQ0FBQyxFQUFFLEVBQUVKLGNBQWMsR0FBRyxDQUFDLENBQ2hELENBQUMsQ0FBQTtJQUNELElBQUEsT0FBT2xCLGVBQWUsQ0FBQ29CLGlCQUFpQixFQUFFOUwsS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7SUFDekQsR0FBQTtJQUNGLENBQUM7O0lDbkZELE1BQU13RyxhQUFhLEdBQUc7SUFDcEIvSSxFQUFBQSxFQUFFLEVBQUUsSUFBSTtJQUNSQyxFQUFBQSxFQUFFLEVBQUUsSUFBSTtJQUNSQyxFQUFBQSxRQUFRLEVBQUUsVUFBVTtJQUNwQkMsRUFBQUEsSUFBSSxFQUFFLE1BQU07SUFDWkMsRUFBQUEsT0FBTyxFQUFFLFNBQVM7SUFDbEJDLEVBQUFBLFNBQVMsRUFBRSxXQUFXO0lBQ3RCQyxFQUFBQSxPQUFPLEVBQUUsU0FBUztJQUNsQkMsRUFBQUEsS0FBSyxFQUFFLE9BQUE7SUFDVCxDQUFDLENBQUE7O0lBRUQ7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVPLE1BQU15SSxVQUFVLEdBQUc7SUFDeEI7TUFDQUMsQ0FBQyxFQUFFLFVBQVUzTixJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxNQUFNQyxHQUFHLEdBQUd4RixJQUFJLENBQUNxSixXQUFXLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQyxJQUFBLFFBQVE3SCxLQUFLO0lBQ1g7SUFDQSxNQUFBLEtBQUssR0FBRyxDQUFBO0lBQ1IsTUFBQSxLQUFLLElBQUksQ0FBQTtJQUNULE1BQUEsS0FBSyxLQUFLO0lBQ1IsUUFBQSxPQUFPK0QsUUFBUSxDQUFDQyxHQUFHLENBQUNBLEdBQUcsRUFBRTtJQUFFdEQsVUFBQUEsS0FBSyxFQUFFLGFBQUE7SUFBYyxTQUFDLENBQUMsQ0FBQTtJQUNwRDtJQUNBLE1BQUEsS0FBSyxPQUFPO0lBQ1YsUUFBQSxPQUFPcUQsUUFBUSxDQUFDQyxHQUFHLENBQUNBLEdBQUcsRUFBRTtJQUFFdEQsVUFBQUEsS0FBSyxFQUFFLFFBQUE7SUFBUyxTQUFDLENBQUMsQ0FBQTtJQUMvQztJQUNBLE1BQUEsS0FBSyxNQUFNLENBQUE7SUFDWCxNQUFBO0lBQ0UsUUFBQSxPQUFPcUQsUUFBUSxDQUFDQyxHQUFHLENBQUNBLEdBQUcsRUFBRTtJQUFFdEQsVUFBQUEsS0FBSyxFQUFFLE1BQUE7SUFBTyxTQUFDLENBQUMsQ0FBQTtJQUMvQyxLQUFBO09BQ0Q7SUFFRDtNQUNBdUssQ0FBQyxFQUFFLFVBQVV6TSxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEM7UUFDQSxJQUFJL0QsS0FBSyxLQUFLLElBQUksRUFBRTtJQUNsQixNQUFBLE1BQU1rTCxVQUFVLEdBQUcxTSxJQUFJLENBQUNxSixXQUFXLEVBQUUsQ0FBQTtJQUNyQztVQUNBLE1BQU0rQixJQUFJLEdBQUdzQixVQUFVLEdBQUcsQ0FBQyxHQUFHQSxVQUFVLEdBQUcsQ0FBQyxHQUFHQSxVQUFVLENBQUE7SUFDekQsTUFBQSxPQUFPbkgsUUFBUSxDQUFDSixhQUFhLENBQUNpRyxJQUFJLEVBQUU7SUFBRXdDLFFBQUFBLElBQUksRUFBRSxNQUFBO0lBQU8sT0FBQyxDQUFDLENBQUE7SUFDdkQsS0FBQTtJQUVBLElBQUEsT0FBT3BCLGVBQWUsQ0FBQ0MsQ0FBQyxDQUFDek0sSUFBSSxFQUFFd0IsS0FBSyxDQUFDLENBQUE7T0FDdEM7SUFFRDtNQUNBcU0sQ0FBQyxFQUFFLFVBQVU3TixJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU3RCxPQUFPLEVBQUU7SUFDM0MsSUFBQSxNQUFNb00sY0FBYyxHQUFHbEMsV0FBVyxDQUFDNUwsSUFBSSxFQUFFMEIsT0FBTyxDQUFDLENBQUE7SUFDakQ7UUFDQSxNQUFNcU0sUUFBUSxHQUFHRCxjQUFjLEdBQUcsQ0FBQyxHQUFHQSxjQUFjLEdBQUcsQ0FBQyxHQUFHQSxjQUFjLENBQUE7O0lBRXpFO1FBQ0EsSUFBSXRNLEtBQUssS0FBSyxJQUFJLEVBQUU7SUFDbEIsTUFBQSxNQUFNd00sWUFBWSxHQUFHRCxRQUFRLEdBQUcsR0FBRyxDQUFBO0lBQ25DLE1BQUEsT0FBTzdCLGVBQWUsQ0FBQzhCLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN6QyxLQUFBOztJQUVBO1FBQ0EsSUFBSXhNLEtBQUssS0FBSyxJQUFJLEVBQUU7SUFDbEIsTUFBQSxPQUFPK0QsUUFBUSxDQUFDSixhQUFhLENBQUM0SSxRQUFRLEVBQUU7SUFBRUgsUUFBQUEsSUFBSSxFQUFFLE1BQUE7SUFBTyxPQUFDLENBQUMsQ0FBQTtJQUMzRCxLQUFBOztJQUVBO0lBQ0EsSUFBQSxPQUFPMUIsZUFBZSxDQUFDNkIsUUFBUSxFQUFFdk0sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDL0M7SUFFRDtJQUNBZ0gsRUFBQUEsQ0FBQyxFQUFFLFVBQVVqTyxJQUFJLEVBQUV3QixLQUFLLEVBQUU7SUFDeEIsSUFBQSxNQUFNME0sV0FBVyxHQUFHL0MsY0FBYyxDQUFDbkwsSUFBSSxDQUFDLENBQUE7O0lBRXhDO0lBQ0EsSUFBQSxPQUFPa00sZUFBZSxDQUFDZ0MsV0FBVyxFQUFFMU0sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDbEQ7SUFFRDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQWtILEVBQUFBLENBQUMsRUFBRSxVQUFVbk8sSUFBSSxFQUFFd0IsS0FBSyxFQUFFO0lBQ3hCLElBQUEsTUFBTTRKLElBQUksR0FBR3BMLElBQUksQ0FBQ3FKLFdBQVcsRUFBRSxDQUFBO0lBQy9CLElBQUEsT0FBTzZDLGVBQWUsQ0FBQ2QsSUFBSSxFQUFFNUosS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDM0M7SUFFRDtNQUNBbUgsQ0FBQyxFQUFFLFVBQVVwTyxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxNQUFNRSxPQUFPLEdBQUc0RSxJQUFJLENBQUNnRSxJQUFJLENBQUMsQ0FBQ3JPLElBQUksQ0FBQ3NKLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNwRCxJQUFBLFFBQVE5SCxLQUFLO0lBQ1g7SUFDQSxNQUFBLEtBQUssR0FBRztZQUNOLE9BQU9XLE1BQU0sQ0FBQ3NELE9BQU8sQ0FBQyxDQUFBO0lBQ3hCO0lBQ0EsTUFBQSxLQUFLLElBQUk7SUFDUCxRQUFBLE9BQU95RyxlQUFlLENBQUN6RyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDcEM7SUFDQSxNQUFBLEtBQUssSUFBSTtJQUNQLFFBQUEsT0FBT0YsUUFBUSxDQUFDSixhQUFhLENBQUNNLE9BQU8sRUFBRTtJQUFFbUksVUFBQUEsSUFBSSxFQUFFLFNBQUE7SUFBVSxTQUFDLENBQUMsQ0FBQTtJQUM3RDtJQUNBLE1BQUEsS0FBSyxLQUFLO0lBQ1IsUUFBQSxPQUFPckksUUFBUSxDQUFDRSxPQUFPLENBQUNBLE9BQU8sRUFBRTtJQUMvQnZELFVBQUFBLEtBQUssRUFBRSxhQUFhO0lBQ3BCeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKO0lBQ0EsTUFBQSxLQUFLLE9BQU87SUFDVixRQUFBLE9BQU80QixRQUFRLENBQUNFLE9BQU8sQ0FBQ0EsT0FBTyxFQUFFO0lBQy9CdkQsVUFBQUEsS0FBSyxFQUFFLFFBQVE7SUFDZnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxNQUFNLENBQUE7SUFDWCxNQUFBO0lBQ0UsUUFBQSxPQUFPNEIsUUFBUSxDQUFDRSxPQUFPLENBQUNBLE9BQU8sRUFBRTtJQUMvQnZELFVBQUFBLEtBQUssRUFBRSxNQUFNO0lBQ2J5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ04sS0FBQTtPQUNEO0lBRUQ7TUFDQTJLLENBQUMsRUFBRSxVQUFVdE8sSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFO0lBQ2xDLElBQUEsTUFBTUUsT0FBTyxHQUFHNEUsSUFBSSxDQUFDZ0UsSUFBSSxDQUFDLENBQUNyTyxJQUFJLENBQUNzSixRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDcEQsSUFBQSxRQUFROUgsS0FBSztJQUNYO0lBQ0EsTUFBQSxLQUFLLEdBQUc7WUFDTixPQUFPVyxNQUFNLENBQUNzRCxPQUFPLENBQUMsQ0FBQTtJQUN4QjtJQUNBLE1BQUEsS0FBSyxJQUFJO0lBQ1AsUUFBQSxPQUFPeUcsZUFBZSxDQUFDekcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3BDO0lBQ0EsTUFBQSxLQUFLLElBQUk7SUFDUCxRQUFBLE9BQU9GLFFBQVEsQ0FBQ0osYUFBYSxDQUFDTSxPQUFPLEVBQUU7SUFBRW1JLFVBQUFBLElBQUksRUFBRSxTQUFBO0lBQVUsU0FBQyxDQUFDLENBQUE7SUFDN0Q7SUFDQSxNQUFBLEtBQUssS0FBSztJQUNSLFFBQUEsT0FBT3JJLFFBQVEsQ0FBQ0UsT0FBTyxDQUFDQSxPQUFPLEVBQUU7SUFDL0J2RCxVQUFBQSxLQUFLLEVBQUUsYUFBYTtJQUNwQnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxPQUFPO0lBQ1YsUUFBQSxPQUFPNEIsUUFBUSxDQUFDRSxPQUFPLENBQUNBLE9BQU8sRUFBRTtJQUMvQnZELFVBQUFBLEtBQUssRUFBRSxRQUFRO0lBQ2Z5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ0o7SUFDQSxNQUFBLEtBQUssTUFBTSxDQUFBO0lBQ1gsTUFBQTtJQUNFLFFBQUEsT0FBTzRCLFFBQVEsQ0FBQ0UsT0FBTyxDQUFDQSxPQUFPLEVBQUU7SUFDL0J2RCxVQUFBQSxLQUFLLEVBQUUsTUFBTTtJQUNieUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNOLEtBQUE7T0FDRDtJQUVEO01BQ0FnSixDQUFDLEVBQUUsVUFBVTNNLElBQUksRUFBRXdCLEtBQUssRUFBRStELFFBQVEsRUFBRTtJQUNsQyxJQUFBLE1BQU1HLEtBQUssR0FBRzFGLElBQUksQ0FBQ3NKLFFBQVEsRUFBRSxDQUFBO0lBQzdCLElBQUEsUUFBUTlILEtBQUs7SUFDWCxNQUFBLEtBQUssR0FBRyxDQUFBO0lBQ1IsTUFBQSxLQUFLLElBQUk7SUFDUCxRQUFBLE9BQU9nTCxlQUFlLENBQUNHLENBQUMsQ0FBQzNNLElBQUksRUFBRXdCLEtBQUssQ0FBQyxDQUFBO0lBQ3ZDO0lBQ0EsTUFBQSxLQUFLLElBQUk7SUFDUCxRQUFBLE9BQU8rRCxRQUFRLENBQUNKLGFBQWEsQ0FBQ08sS0FBSyxHQUFHLENBQUMsRUFBRTtJQUFFa0ksVUFBQUEsSUFBSSxFQUFFLE9BQUE7SUFBUSxTQUFDLENBQUMsQ0FBQTtJQUM3RDtJQUNBLE1BQUEsS0FBSyxLQUFLO0lBQ1IsUUFBQSxPQUFPckksUUFBUSxDQUFDRyxLQUFLLENBQUNBLEtBQUssRUFBRTtJQUMzQnhELFVBQUFBLEtBQUssRUFBRSxhQUFhO0lBQ3BCeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKO0lBQ0EsTUFBQSxLQUFLLE9BQU87SUFDVixRQUFBLE9BQU80QixRQUFRLENBQUNHLEtBQUssQ0FBQ0EsS0FBSyxFQUFFO0lBQzNCeEQsVUFBQUEsS0FBSyxFQUFFLFFBQVE7SUFDZnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxNQUFNLENBQUE7SUFDWCxNQUFBO0lBQ0UsUUFBQSxPQUFPNEIsUUFBUSxDQUFDRyxLQUFLLENBQUNBLEtBQUssRUFBRTtJQUFFeEQsVUFBQUEsS0FBSyxFQUFFLE1BQU07SUFBRXlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQWEsU0FBQyxDQUFDLENBQUE7SUFDMUUsS0FBQTtPQUNEO0lBRUQ7TUFDQTRLLENBQUMsRUFBRSxVQUFVdk8sSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFO0lBQ2xDLElBQUEsTUFBTUcsS0FBSyxHQUFHMUYsSUFBSSxDQUFDc0osUUFBUSxFQUFFLENBQUE7SUFDN0IsSUFBQSxRQUFROUgsS0FBSztJQUNYO0lBQ0EsTUFBQSxLQUFLLEdBQUc7SUFDTixRQUFBLE9BQU9XLE1BQU0sQ0FBQ3VELEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMxQjtJQUNBLE1BQUEsS0FBSyxJQUFJO0lBQ1AsUUFBQSxPQUFPd0csZUFBZSxDQUFDeEcsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN0QztJQUNBLE1BQUEsS0FBSyxJQUFJO0lBQ1AsUUFBQSxPQUFPSCxRQUFRLENBQUNKLGFBQWEsQ0FBQ08sS0FBSyxHQUFHLENBQUMsRUFBRTtJQUFFa0ksVUFBQUEsSUFBSSxFQUFFLE9BQUE7SUFBUSxTQUFDLENBQUMsQ0FBQTtJQUM3RDtJQUNBLE1BQUEsS0FBSyxLQUFLO0lBQ1IsUUFBQSxPQUFPckksUUFBUSxDQUFDRyxLQUFLLENBQUNBLEtBQUssRUFBRTtJQUMzQnhELFVBQUFBLEtBQUssRUFBRSxhQUFhO0lBQ3BCeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKO0lBQ0EsTUFBQSxLQUFLLE9BQU87SUFDVixRQUFBLE9BQU80QixRQUFRLENBQUNHLEtBQUssQ0FBQ0EsS0FBSyxFQUFFO0lBQzNCeEQsVUFBQUEsS0FBSyxFQUFFLFFBQVE7SUFDZnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxNQUFNLENBQUE7SUFDWCxNQUFBO0lBQ0UsUUFBQSxPQUFPNEIsUUFBUSxDQUFDRyxLQUFLLENBQUNBLEtBQUssRUFBRTtJQUFFeEQsVUFBQUEsS0FBSyxFQUFFLE1BQU07SUFBRXlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQWEsU0FBQyxDQUFDLENBQUE7SUFDMUUsS0FBQTtPQUNEO0lBRUQ7TUFDQTZLLENBQUMsRUFBRSxVQUFVeE8sSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFN0QsT0FBTyxFQUFFO0lBQzNDLElBQUEsTUFBTStNLElBQUksR0FBR3hDLE9BQU8sQ0FBQ2pNLElBQUksRUFBRTBCLE9BQU8sQ0FBQyxDQUFBO1FBRW5DLElBQUlGLEtBQUssS0FBSyxJQUFJLEVBQUU7SUFDbEIsTUFBQSxPQUFPK0QsUUFBUSxDQUFDSixhQUFhLENBQUNzSixJQUFJLEVBQUU7SUFBRWIsUUFBQUEsSUFBSSxFQUFFLE1BQUE7SUFBTyxPQUFDLENBQUMsQ0FBQTtJQUN2RCxLQUFBO0lBRUEsSUFBQSxPQUFPMUIsZUFBZSxDQUFDdUMsSUFBSSxFQUFFak4sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDM0M7SUFFRDtNQUNBeUgsQ0FBQyxFQUFFLFVBQVUxTyxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxNQUFNb0osT0FBTyxHQUFHaEQsVUFBVSxDQUFDM0wsSUFBSSxDQUFDLENBQUE7UUFFaEMsSUFBSXdCLEtBQUssS0FBSyxJQUFJLEVBQUU7SUFDbEIsTUFBQSxPQUFPK0QsUUFBUSxDQUFDSixhQUFhLENBQUN3SixPQUFPLEVBQUU7SUFBRWYsUUFBQUEsSUFBSSxFQUFFLE1BQUE7SUFBTyxPQUFDLENBQUMsQ0FBQTtJQUMxRCxLQUFBO0lBRUEsSUFBQSxPQUFPMUIsZUFBZSxDQUFDeUMsT0FBTyxFQUFFbk4sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDOUM7SUFFRDtNQUNBMkYsQ0FBQyxFQUFFLFVBQVU1TSxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7UUFDbEMsSUFBSS9ELEtBQUssS0FBSyxJQUFJLEVBQUU7VUFDbEIsT0FBTytELFFBQVEsQ0FBQ0osYUFBYSxDQUFDbkYsSUFBSSxDQUFDdUosT0FBTyxFQUFFLEVBQUU7SUFBRXFFLFFBQUFBLElBQUksRUFBRSxNQUFBO0lBQU8sT0FBQyxDQUFDLENBQUE7SUFDakUsS0FBQTtJQUVBLElBQUEsT0FBT3BCLGVBQWUsQ0FBQ0ksQ0FBQyxDQUFDNU0sSUFBSSxFQUFFd0IsS0FBSyxDQUFDLENBQUE7T0FDdEM7SUFFRDtNQUNBb04sQ0FBQyxFQUFFLFVBQVU1TyxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxNQUFNc0YsU0FBUyxHQUFHRixZQUFZLENBQUMzSyxJQUFJLENBQUMsQ0FBQTtRQUVwQyxJQUFJd0IsS0FBSyxLQUFLLElBQUksRUFBRTtJQUNsQixNQUFBLE9BQU8rRCxRQUFRLENBQUNKLGFBQWEsQ0FBQzBGLFNBQVMsRUFBRTtJQUFFK0MsUUFBQUEsSUFBSSxFQUFFLFdBQUE7SUFBWSxPQUFDLENBQUMsQ0FBQTtJQUNqRSxLQUFBO0lBRUEsSUFBQSxPQUFPMUIsZUFBZSxDQUFDckIsU0FBUyxFQUFFckosS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDaEQ7SUFFRDtNQUNBNEgsQ0FBQyxFQUFFLFVBQVU3TyxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxNQUFNdUosU0FBUyxHQUFHOU8sSUFBSSxDQUFDZ0wsTUFBTSxFQUFFLENBQUE7SUFDL0IsSUFBQSxRQUFReEosS0FBSztJQUNYO0lBQ0EsTUFBQSxLQUFLLEdBQUcsQ0FBQTtJQUNSLE1BQUEsS0FBSyxJQUFJLENBQUE7SUFDVCxNQUFBLEtBQUssS0FBSztJQUNSLFFBQUEsT0FBTytELFFBQVEsQ0FBQ0ksR0FBRyxDQUFDbUosU0FBUyxFQUFFO0lBQzdCNU0sVUFBQUEsS0FBSyxFQUFFLGFBQWE7SUFDcEJ5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ0o7SUFDQSxNQUFBLEtBQUssT0FBTztJQUNWLFFBQUEsT0FBTzRCLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDbUosU0FBUyxFQUFFO0lBQzdCNU0sVUFBQUEsS0FBSyxFQUFFLFFBQVE7SUFDZnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxRQUFRO0lBQ1gsUUFBQSxPQUFPNEIsUUFBUSxDQUFDSSxHQUFHLENBQUNtSixTQUFTLEVBQUU7SUFDN0I1TSxVQUFBQSxLQUFLLEVBQUUsT0FBTztJQUNkeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKO0lBQ0EsTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUE7SUFDRSxRQUFBLE9BQU80QixRQUFRLENBQUNJLEdBQUcsQ0FBQ21KLFNBQVMsRUFBRTtJQUM3QjVNLFVBQUFBLEtBQUssRUFBRSxNQUFNO0lBQ2J5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ04sS0FBQTtPQUNEO0lBRUQ7TUFDQTdGLENBQUMsRUFBRSxVQUFVa0MsSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFN0QsT0FBTyxFQUFFO0lBQzNDLElBQUEsTUFBTW9OLFNBQVMsR0FBRzlPLElBQUksQ0FBQ2dMLE1BQU0sRUFBRSxDQUFBO0lBQy9CLElBQUEsTUFBTStELGNBQWMsR0FBRyxDQUFDRCxTQUFTLEdBQUdwTixPQUFPLENBQUNnSCxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEUsSUFBQSxRQUFRbEgsS0FBSztJQUNYO0lBQ0EsTUFBQSxLQUFLLEdBQUc7WUFDTixPQUFPVyxNQUFNLENBQUM0TSxjQUFjLENBQUMsQ0FBQTtJQUMvQjtJQUNBLE1BQUEsS0FBSyxJQUFJO0lBQ1AsUUFBQSxPQUFPN0MsZUFBZSxDQUFDNkMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzNDO0lBQ0EsTUFBQSxLQUFLLElBQUk7SUFDUCxRQUFBLE9BQU94SixRQUFRLENBQUNKLGFBQWEsQ0FBQzRKLGNBQWMsRUFBRTtJQUFFbkIsVUFBQUEsSUFBSSxFQUFFLEtBQUE7SUFBTSxTQUFDLENBQUMsQ0FBQTtJQUNoRSxNQUFBLEtBQUssS0FBSztJQUNSLFFBQUEsT0FBT3JJLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDbUosU0FBUyxFQUFFO0lBQzdCNU0sVUFBQUEsS0FBSyxFQUFFLGFBQWE7SUFDcEJ5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ0o7SUFDQSxNQUFBLEtBQUssT0FBTztJQUNWLFFBQUEsT0FBTzRCLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDbUosU0FBUyxFQUFFO0lBQzdCNU0sVUFBQUEsS0FBSyxFQUFFLFFBQVE7SUFDZnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxRQUFRO0lBQ1gsUUFBQSxPQUFPNEIsUUFBUSxDQUFDSSxHQUFHLENBQUNtSixTQUFTLEVBQUU7SUFDN0I1TSxVQUFBQSxLQUFLLEVBQUUsT0FBTztJQUNkeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKO0lBQ0EsTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUE7SUFDRSxRQUFBLE9BQU80QixRQUFRLENBQUNJLEdBQUcsQ0FBQ21KLFNBQVMsRUFBRTtJQUM3QjVNLFVBQUFBLEtBQUssRUFBRSxNQUFNO0lBQ2J5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ04sS0FBQTtPQUNEO0lBRUQ7TUFDQXFMLENBQUMsRUFBRSxVQUFVaFAsSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFN0QsT0FBTyxFQUFFO0lBQzNDLElBQUEsTUFBTW9OLFNBQVMsR0FBRzlPLElBQUksQ0FBQ2dMLE1BQU0sRUFBRSxDQUFBO0lBQy9CLElBQUEsTUFBTStELGNBQWMsR0FBRyxDQUFDRCxTQUFTLEdBQUdwTixPQUFPLENBQUNnSCxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEUsSUFBQSxRQUFRbEgsS0FBSztJQUNYO0lBQ0EsTUFBQSxLQUFLLEdBQUc7WUFDTixPQUFPVyxNQUFNLENBQUM0TSxjQUFjLENBQUMsQ0FBQTtJQUMvQjtJQUNBLE1BQUEsS0FBSyxJQUFJO0lBQ1AsUUFBQSxPQUFPN0MsZUFBZSxDQUFDNkMsY0FBYyxFQUFFdk4sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7SUFDdEQ7SUFDQSxNQUFBLEtBQUssSUFBSTtJQUNQLFFBQUEsT0FBTzFCLFFBQVEsQ0FBQ0osYUFBYSxDQUFDNEosY0FBYyxFQUFFO0lBQUVuQixVQUFBQSxJQUFJLEVBQUUsS0FBQTtJQUFNLFNBQUMsQ0FBQyxDQUFBO0lBQ2hFLE1BQUEsS0FBSyxLQUFLO0lBQ1IsUUFBQSxPQUFPckksUUFBUSxDQUFDSSxHQUFHLENBQUNtSixTQUFTLEVBQUU7SUFDN0I1TSxVQUFBQSxLQUFLLEVBQUUsYUFBYTtJQUNwQnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxPQUFPO0lBQ1YsUUFBQSxPQUFPNEIsUUFBUSxDQUFDSSxHQUFHLENBQUNtSixTQUFTLEVBQUU7SUFDN0I1TSxVQUFBQSxLQUFLLEVBQUUsUUFBUTtJQUNmeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKO0lBQ0EsTUFBQSxLQUFLLFFBQVE7SUFDWCxRQUFBLE9BQU80QixRQUFRLENBQUNJLEdBQUcsQ0FBQ21KLFNBQVMsRUFBRTtJQUM3QjVNLFVBQUFBLEtBQUssRUFBRSxPQUFPO0lBQ2R5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ0o7SUFDQSxNQUFBLEtBQUssTUFBTSxDQUFBO0lBQ1gsTUFBQTtJQUNFLFFBQUEsT0FBTzRCLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDbUosU0FBUyxFQUFFO0lBQzdCNU0sVUFBQUEsS0FBSyxFQUFFLE1BQU07SUFDYnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDTixLQUFBO09BQ0Q7SUFFRDtNQUNBc0wsQ0FBQyxFQUFFLFVBQVVqUCxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxNQUFNdUosU0FBUyxHQUFHOU8sSUFBSSxDQUFDZ0wsTUFBTSxFQUFFLENBQUE7UUFDL0IsTUFBTWtFLFlBQVksR0FBR0osU0FBUyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUdBLFNBQVMsQ0FBQTtJQUNwRCxJQUFBLFFBQVF0TixLQUFLO0lBQ1g7SUFDQSxNQUFBLEtBQUssR0FBRztZQUNOLE9BQU9XLE1BQU0sQ0FBQytNLFlBQVksQ0FBQyxDQUFBO0lBQzdCO0lBQ0EsTUFBQSxLQUFLLElBQUk7SUFDUCxRQUFBLE9BQU9oRCxlQUFlLENBQUNnRCxZQUFZLEVBQUUxTixLQUFLLENBQUN5RixNQUFNLENBQUMsQ0FBQTtJQUNwRDtJQUNBLE1BQUEsS0FBSyxJQUFJO0lBQ1AsUUFBQSxPQUFPMUIsUUFBUSxDQUFDSixhQUFhLENBQUMrSixZQUFZLEVBQUU7SUFBRXRCLFVBQUFBLElBQUksRUFBRSxLQUFBO0lBQU0sU0FBQyxDQUFDLENBQUE7SUFDOUQ7SUFDQSxNQUFBLEtBQUssS0FBSztJQUNSLFFBQUEsT0FBT3JJLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDbUosU0FBUyxFQUFFO0lBQzdCNU0sVUFBQUEsS0FBSyxFQUFFLGFBQWE7SUFDcEJ5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ0o7SUFDQSxNQUFBLEtBQUssT0FBTztJQUNWLFFBQUEsT0FBTzRCLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDbUosU0FBUyxFQUFFO0lBQzdCNU0sVUFBQUEsS0FBSyxFQUFFLFFBQVE7SUFDZnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSjtJQUNBLE1BQUEsS0FBSyxRQUFRO0lBQ1gsUUFBQSxPQUFPNEIsUUFBUSxDQUFDSSxHQUFHLENBQUNtSixTQUFTLEVBQUU7SUFDN0I1TSxVQUFBQSxLQUFLLEVBQUUsT0FBTztJQUNkeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKO0lBQ0EsTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUE7SUFDRSxRQUFBLE9BQU80QixRQUFRLENBQUNJLEdBQUcsQ0FBQ21KLFNBQVMsRUFBRTtJQUM3QjVNLFVBQUFBLEtBQUssRUFBRSxNQUFNO0lBQ2J5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ04sS0FBQTtPQUNEO0lBRUQ7TUFDQWtKLENBQUMsRUFBRSxVQUFVN00sSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFO0lBQ2xDLElBQUEsTUFBTTRKLEtBQUssR0FBR25QLElBQUksQ0FBQ3dKLFFBQVEsRUFBRSxDQUFBO1FBQzdCLE1BQU1zRCxrQkFBa0IsR0FBR3FDLEtBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUE7SUFFeEQsSUFBQSxRQUFRM04sS0FBSztJQUNYLE1BQUEsS0FBSyxHQUFHLENBQUE7SUFDUixNQUFBLEtBQUssSUFBSTtJQUNQLFFBQUEsT0FBTytELFFBQVEsQ0FBQ0ssU0FBUyxDQUFDa0gsa0JBQWtCLEVBQUU7SUFDNUM1SyxVQUFBQSxLQUFLLEVBQUUsYUFBYTtJQUNwQnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSixNQUFBLEtBQUssS0FBSztJQUNSLFFBQUEsT0FBTzRCLFFBQVEsQ0FDWkssU0FBUyxDQUFDa0gsa0JBQWtCLEVBQUU7SUFDN0I1SyxVQUFBQSxLQUFLLEVBQUUsYUFBYTtJQUNwQnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQ0R5TCxXQUFXLEVBQUUsQ0FBQTtJQUNsQixNQUFBLEtBQUssT0FBTztJQUNWLFFBQUEsT0FBTzdKLFFBQVEsQ0FBQ0ssU0FBUyxDQUFDa0gsa0JBQWtCLEVBQUU7SUFDNUM1SyxVQUFBQSxLQUFLLEVBQUUsUUFBUTtJQUNmeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKLE1BQUEsS0FBSyxNQUFNLENBQUE7SUFDWCxNQUFBO0lBQ0UsUUFBQSxPQUFPNEIsUUFBUSxDQUFDSyxTQUFTLENBQUNrSCxrQkFBa0IsRUFBRTtJQUM1QzVLLFVBQUFBLEtBQUssRUFBRSxNQUFNO0lBQ2J5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ04sS0FBQTtPQUNEO0lBRUQ7TUFDQTBMLENBQUMsRUFBRSxVQUFVclAsSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFO0lBQ2xDLElBQUEsTUFBTTRKLEtBQUssR0FBR25QLElBQUksQ0FBQ3dKLFFBQVEsRUFBRSxDQUFBO0lBQzdCLElBQUEsSUFBSXNELGtCQUFrQixDQUFBO1FBQ3RCLElBQUlxQyxLQUFLLEtBQUssRUFBRSxFQUFFO1VBQ2hCckMsa0JBQWtCLEdBQUdXLGFBQWEsQ0FBQzVJLElBQUksQ0FBQTtJQUN6QyxLQUFDLE1BQU0sSUFBSXNLLEtBQUssS0FBSyxDQUFDLEVBQUU7VUFDdEJyQyxrQkFBa0IsR0FBR1csYUFBYSxDQUFDN0ksUUFBUSxDQUFBO0lBQzdDLEtBQUMsTUFBTTtVQUNMa0ksa0JBQWtCLEdBQUdxQyxLQUFLLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ3BELEtBQUE7SUFFQSxJQUFBLFFBQVEzTixLQUFLO0lBQ1gsTUFBQSxLQUFLLEdBQUcsQ0FBQTtJQUNSLE1BQUEsS0FBSyxJQUFJO0lBQ1AsUUFBQSxPQUFPK0QsUUFBUSxDQUFDSyxTQUFTLENBQUNrSCxrQkFBa0IsRUFBRTtJQUM1QzVLLFVBQUFBLEtBQUssRUFBRSxhQUFhO0lBQ3BCeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNKLE1BQUEsS0FBSyxLQUFLO0lBQ1IsUUFBQSxPQUFPNEIsUUFBUSxDQUNaSyxTQUFTLENBQUNrSCxrQkFBa0IsRUFBRTtJQUM3QjVLLFVBQUFBLEtBQUssRUFBRSxhQUFhO0lBQ3BCeUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FDRHlMLFdBQVcsRUFBRSxDQUFBO0lBQ2xCLE1BQUEsS0FBSyxPQUFPO0lBQ1YsUUFBQSxPQUFPN0osUUFBUSxDQUFDSyxTQUFTLENBQUNrSCxrQkFBa0IsRUFBRTtJQUM1QzVLLFVBQUFBLEtBQUssRUFBRSxRQUFRO0lBQ2Z5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ0osTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUE7SUFDRSxRQUFBLE9BQU80QixRQUFRLENBQUNLLFNBQVMsQ0FBQ2tILGtCQUFrQixFQUFFO0lBQzVDNUssVUFBQUEsS0FBSyxFQUFFLE1BQU07SUFDYnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDTixLQUFBO09BQ0Q7SUFFRDtNQUNBMkwsQ0FBQyxFQUFFLFVBQVV0UCxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxNQUFNNEosS0FBSyxHQUFHblAsSUFBSSxDQUFDd0osUUFBUSxFQUFFLENBQUE7SUFDN0IsSUFBQSxJQUFJc0Qsa0JBQWtCLENBQUE7UUFDdEIsSUFBSXFDLEtBQUssSUFBSSxFQUFFLEVBQUU7VUFDZnJDLGtCQUFrQixHQUFHVyxhQUFhLENBQUN6SSxPQUFPLENBQUE7SUFDNUMsS0FBQyxNQUFNLElBQUltSyxLQUFLLElBQUksRUFBRSxFQUFFO1VBQ3RCckMsa0JBQWtCLEdBQUdXLGFBQWEsQ0FBQzFJLFNBQVMsQ0FBQTtJQUM5QyxLQUFDLE1BQU0sSUFBSW9LLEtBQUssSUFBSSxDQUFDLEVBQUU7VUFDckJyQyxrQkFBa0IsR0FBR1csYUFBYSxDQUFDM0ksT0FBTyxDQUFBO0lBQzVDLEtBQUMsTUFBTTtVQUNMZ0ksa0JBQWtCLEdBQUdXLGFBQWEsQ0FBQ3hJLEtBQUssQ0FBQTtJQUMxQyxLQUFBO0lBRUEsSUFBQSxRQUFRekQsS0FBSztJQUNYLE1BQUEsS0FBSyxHQUFHLENBQUE7SUFDUixNQUFBLEtBQUssSUFBSSxDQUFBO0lBQ1QsTUFBQSxLQUFLLEtBQUs7SUFDUixRQUFBLE9BQU8rRCxRQUFRLENBQUNLLFNBQVMsQ0FBQ2tILGtCQUFrQixFQUFFO0lBQzVDNUssVUFBQUEsS0FBSyxFQUFFLGFBQWE7SUFDcEJ5QixVQUFBQSxPQUFPLEVBQUUsWUFBQTtJQUNYLFNBQUMsQ0FBQyxDQUFBO0lBQ0osTUFBQSxLQUFLLE9BQU87SUFDVixRQUFBLE9BQU80QixRQUFRLENBQUNLLFNBQVMsQ0FBQ2tILGtCQUFrQixFQUFFO0lBQzVDNUssVUFBQUEsS0FBSyxFQUFFLFFBQVE7SUFDZnlCLFVBQUFBLE9BQU8sRUFBRSxZQUFBO0lBQ1gsU0FBQyxDQUFDLENBQUE7SUFDSixNQUFBLEtBQUssTUFBTSxDQUFBO0lBQ1gsTUFBQTtJQUNFLFFBQUEsT0FBTzRCLFFBQVEsQ0FBQ0ssU0FBUyxDQUFDa0gsa0JBQWtCLEVBQUU7SUFDNUM1SyxVQUFBQSxLQUFLLEVBQUUsTUFBTTtJQUNieUIsVUFBQUEsT0FBTyxFQUFFLFlBQUE7SUFDWCxTQUFDLENBQUMsQ0FBQTtJQUNOLEtBQUE7T0FDRDtJQUVEO01BQ0FxSixDQUFDLEVBQUUsVUFBVWhOLElBQUksRUFBRXdCLEtBQUssRUFBRStELFFBQVEsRUFBRTtRQUNsQyxJQUFJL0QsS0FBSyxLQUFLLElBQUksRUFBRTtVQUNsQixJQUFJMk4sS0FBSyxHQUFHblAsSUFBSSxDQUFDd0osUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ2hDLE1BQUEsSUFBSTJGLEtBQUssS0FBSyxDQUFDLEVBQUVBLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDM0IsTUFBQSxPQUFPNUosUUFBUSxDQUFDSixhQUFhLENBQUNnSyxLQUFLLEVBQUU7SUFBRXZCLFFBQUFBLElBQUksRUFBRSxNQUFBO0lBQU8sT0FBQyxDQUFDLENBQUE7SUFDeEQsS0FBQTtJQUVBLElBQUEsT0FBT3BCLGVBQWUsQ0FBQ1EsQ0FBQyxDQUFDaE4sSUFBSSxFQUFFd0IsS0FBSyxDQUFDLENBQUE7T0FDdEM7SUFFRDtNQUNBeUwsQ0FBQyxFQUFFLFVBQVVqTixJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7UUFDbEMsSUFBSS9ELEtBQUssS0FBSyxJQUFJLEVBQUU7VUFDbEIsT0FBTytELFFBQVEsQ0FBQ0osYUFBYSxDQUFDbkYsSUFBSSxDQUFDd0osUUFBUSxFQUFFLEVBQUU7SUFBRW9FLFFBQUFBLElBQUksRUFBRSxNQUFBO0lBQU8sT0FBQyxDQUFDLENBQUE7SUFDbEUsS0FBQTtJQUVBLElBQUEsT0FBT3BCLGVBQWUsQ0FBQ1MsQ0FBQyxDQUFDak4sSUFBSSxFQUFFd0IsS0FBSyxDQUFDLENBQUE7T0FDdEM7SUFFRDtNQUNBK04sQ0FBQyxFQUFFLFVBQVV2UCxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7UUFDbEMsTUFBTTRKLEtBQUssR0FBR25QLElBQUksQ0FBQ3dKLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUVsQyxJQUFJaEksS0FBSyxLQUFLLElBQUksRUFBRTtJQUNsQixNQUFBLE9BQU8rRCxRQUFRLENBQUNKLGFBQWEsQ0FBQ2dLLEtBQUssRUFBRTtJQUFFdkIsUUFBQUEsSUFBSSxFQUFFLE1BQUE7SUFBTyxPQUFDLENBQUMsQ0FBQTtJQUN4RCxLQUFBO0lBRUEsSUFBQSxPQUFPMUIsZUFBZSxDQUFDaUQsS0FBSyxFQUFFM04sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDNUM7SUFFRDtNQUNBdUksQ0FBQyxFQUFFLFVBQVV4UCxJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7SUFDbEMsSUFBQSxJQUFJNEosS0FBSyxHQUFHblAsSUFBSSxDQUFDd0osUUFBUSxFQUFFLENBQUE7SUFDM0IsSUFBQSxJQUFJMkYsS0FBSyxLQUFLLENBQUMsRUFBRUEsS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUUzQixJQUFJM04sS0FBSyxLQUFLLElBQUksRUFBRTtJQUNsQixNQUFBLE9BQU8rRCxRQUFRLENBQUNKLGFBQWEsQ0FBQ2dLLEtBQUssRUFBRTtJQUFFdkIsUUFBQUEsSUFBSSxFQUFFLE1BQUE7SUFBTyxPQUFDLENBQUMsQ0FBQTtJQUN4RCxLQUFBO0lBRUEsSUFBQSxPQUFPMUIsZUFBZSxDQUFDaUQsS0FBSyxFQUFFM04sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDNUM7SUFFRDtNQUNBbEksQ0FBQyxFQUFFLFVBQVVpQixJQUFJLEVBQUV3QixLQUFLLEVBQUUrRCxRQUFRLEVBQUU7UUFDbEMsSUFBSS9ELEtBQUssS0FBSyxJQUFJLEVBQUU7VUFDbEIsT0FBTytELFFBQVEsQ0FBQ0osYUFBYSxDQUFDbkYsSUFBSSxDQUFDeUosVUFBVSxFQUFFLEVBQUU7SUFBRW1FLFFBQUFBLElBQUksRUFBRSxRQUFBO0lBQVMsT0FBQyxDQUFDLENBQUE7SUFDdEUsS0FBQTtJQUVBLElBQUEsT0FBT3BCLGVBQWUsQ0FBQ3pOLENBQUMsQ0FBQ2lCLElBQUksRUFBRXdCLEtBQUssQ0FBQyxDQUFBO09BQ3RDO0lBRUQ7TUFDQTBMLENBQUMsRUFBRSxVQUFVbE4sSUFBSSxFQUFFd0IsS0FBSyxFQUFFK0QsUUFBUSxFQUFFO1FBQ2xDLElBQUkvRCxLQUFLLEtBQUssSUFBSSxFQUFFO1VBQ2xCLE9BQU8rRCxRQUFRLENBQUNKLGFBQWEsQ0FBQ25GLElBQUksQ0FBQzBKLFVBQVUsRUFBRSxFQUFFO0lBQUVrRSxRQUFBQSxJQUFJLEVBQUUsUUFBQTtJQUFTLE9BQUMsQ0FBQyxDQUFBO0lBQ3RFLEtBQUE7SUFFQSxJQUFBLE9BQU9wQixlQUFlLENBQUNVLENBQUMsQ0FBQ2xOLElBQUksRUFBRXdCLEtBQUssQ0FBQyxDQUFBO09BQ3RDO0lBRUQ7SUFDQTJMLEVBQUFBLENBQUMsRUFBRSxVQUFVbk4sSUFBSSxFQUFFd0IsS0FBSyxFQUFFO0lBQ3hCLElBQUEsT0FBT2dMLGVBQWUsQ0FBQ1csQ0FBQyxDQUFDbk4sSUFBSSxFQUFFd0IsS0FBSyxDQUFDLENBQUE7T0FDdEM7SUFFRDtNQUNBaU8sQ0FBQyxFQUFFLFVBQVV6UCxJQUFJLEVBQUV3QixLQUFLLEVBQUVrTyxTQUFTLEVBQUVoTyxPQUFPLEVBQUU7SUFDNUMsSUFBQSxNQUFNaU8sWUFBWSxHQUFHak8sT0FBTyxDQUFDa08sYUFBYSxJQUFJNVAsSUFBSSxDQUFBO0lBQ2xELElBQUEsTUFBTTZQLGNBQWMsR0FBR0YsWUFBWSxDQUFDRyxpQkFBaUIsRUFBRSxDQUFBO1FBRXZELElBQUlELGNBQWMsS0FBSyxDQUFDLEVBQUU7SUFDeEIsTUFBQSxPQUFPLEdBQUcsQ0FBQTtJQUNaLEtBQUE7SUFFQSxJQUFBLFFBQVFyTyxLQUFLO0lBQ1g7SUFDQSxNQUFBLEtBQUssR0FBRztZQUNOLE9BQU91TyxpQ0FBaUMsQ0FBQ0YsY0FBYyxDQUFDLENBQUE7O0lBRTFEO0lBQ0E7SUFDQTtJQUNBLE1BQUEsS0FBSyxNQUFNLENBQUE7SUFDWCxNQUFBLEtBQUssSUFBSTtJQUFFO1lBQ1QsT0FBT0csY0FBYyxDQUFDSCxjQUFjLENBQUMsQ0FBQTs7SUFFdkM7SUFDQTtJQUNBO0lBQ0EsTUFBQSxLQUFLLE9BQU8sQ0FBQTtVQUNaLEtBQUssS0FBSyxDQUFDO0lBQ1gsTUFBQTtJQUNFLFFBQUEsT0FBT0csY0FBYyxDQUFDSCxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDOUMsS0FBQTtPQUNEO0lBRUQ7TUFDQUksQ0FBQyxFQUFFLFVBQVVqUSxJQUFJLEVBQUV3QixLQUFLLEVBQUVrTyxTQUFTLEVBQUVoTyxPQUFPLEVBQUU7SUFDNUMsSUFBQSxNQUFNaU8sWUFBWSxHQUFHak8sT0FBTyxDQUFDa08sYUFBYSxJQUFJNVAsSUFBSSxDQUFBO0lBQ2xELElBQUEsTUFBTTZQLGNBQWMsR0FBR0YsWUFBWSxDQUFDRyxpQkFBaUIsRUFBRSxDQUFBO0lBRXZELElBQUEsUUFBUXRPLEtBQUs7SUFDWDtJQUNBLE1BQUEsS0FBSyxHQUFHO1lBQ04sT0FBT3VPLGlDQUFpQyxDQUFDRixjQUFjLENBQUMsQ0FBQTs7SUFFMUQ7SUFDQTtJQUNBO0lBQ0EsTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUEsS0FBSyxJQUFJO0lBQUU7WUFDVCxPQUFPRyxjQUFjLENBQUNILGNBQWMsQ0FBQyxDQUFBOztJQUV2QztJQUNBO0lBQ0E7SUFDQSxNQUFBLEtBQUssT0FBTyxDQUFBO1VBQ1osS0FBSyxLQUFLLENBQUM7SUFDWCxNQUFBO0lBQ0UsUUFBQSxPQUFPRyxjQUFjLENBQUNILGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5QyxLQUFBO09BQ0Q7SUFFRDtNQUNBSyxDQUFDLEVBQUUsVUFBVWxRLElBQUksRUFBRXdCLEtBQUssRUFBRWtPLFNBQVMsRUFBRWhPLE9BQU8sRUFBRTtJQUM1QyxJQUFBLE1BQU1pTyxZQUFZLEdBQUdqTyxPQUFPLENBQUNrTyxhQUFhLElBQUk1UCxJQUFJLENBQUE7SUFDbEQsSUFBQSxNQUFNNlAsY0FBYyxHQUFHRixZQUFZLENBQUNHLGlCQUFpQixFQUFFLENBQUE7SUFFdkQsSUFBQSxRQUFRdE8sS0FBSztJQUNYO0lBQ0EsTUFBQSxLQUFLLEdBQUcsQ0FBQTtJQUNSLE1BQUEsS0FBSyxJQUFJLENBQUE7SUFDVCxNQUFBLEtBQUssS0FBSztJQUNSLFFBQUEsT0FBTyxLQUFLLEdBQUcyTyxtQkFBbUIsQ0FBQ04sY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3pEO0lBQ0EsTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUE7SUFDRSxRQUFBLE9BQU8sS0FBSyxHQUFHRyxjQUFjLENBQUNILGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN0RCxLQUFBO09BQ0Q7SUFFRDtNQUNBTyxDQUFDLEVBQUUsVUFBVXBRLElBQUksRUFBRXdCLEtBQUssRUFBRWtPLFNBQVMsRUFBRWhPLE9BQU8sRUFBRTtJQUM1QyxJQUFBLE1BQU1pTyxZQUFZLEdBQUdqTyxPQUFPLENBQUNrTyxhQUFhLElBQUk1UCxJQUFJLENBQUE7SUFDbEQsSUFBQSxNQUFNNlAsY0FBYyxHQUFHRixZQUFZLENBQUNHLGlCQUFpQixFQUFFLENBQUE7SUFFdkQsSUFBQSxRQUFRdE8sS0FBSztJQUNYO0lBQ0EsTUFBQSxLQUFLLEdBQUcsQ0FBQTtJQUNSLE1BQUEsS0FBSyxJQUFJLENBQUE7SUFDVCxNQUFBLEtBQUssS0FBSztJQUNSLFFBQUEsT0FBTyxLQUFLLEdBQUcyTyxtQkFBbUIsQ0FBQ04sY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3pEO0lBQ0EsTUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLE1BQUE7SUFDRSxRQUFBLE9BQU8sS0FBSyxHQUFHRyxjQUFjLENBQUNILGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN0RCxLQUFBO09BQ0Q7SUFFRDtNQUNBUSxDQUFDLEVBQUUsVUFBVXJRLElBQUksRUFBRXdCLEtBQUssRUFBRWtPLFNBQVMsRUFBRWhPLE9BQU8sRUFBRTtJQUM1QyxJQUFBLE1BQU1pTyxZQUFZLEdBQUdqTyxPQUFPLENBQUNrTyxhQUFhLElBQUk1UCxJQUFJLENBQUE7SUFDbEQsSUFBQSxNQUFNc1EsU0FBUyxHQUFHakcsSUFBSSxDQUFDa0QsS0FBSyxDQUFDb0MsWUFBWSxDQUFDOUYsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFDM0QsSUFBQSxPQUFPcUMsZUFBZSxDQUFDb0UsU0FBUyxFQUFFOU8sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7T0FDaEQ7SUFFRDtNQUNBc0osQ0FBQyxFQUFFLFVBQVV2USxJQUFJLEVBQUV3QixLQUFLLEVBQUVrTyxTQUFTLEVBQUVoTyxPQUFPLEVBQUU7SUFDNUMsSUFBQSxNQUFNaU8sWUFBWSxHQUFHak8sT0FBTyxDQUFDa08sYUFBYSxJQUFJNVAsSUFBSSxDQUFBO0lBQ2xELElBQUEsTUFBTXNRLFNBQVMsR0FBR1gsWUFBWSxDQUFDOUYsT0FBTyxFQUFFLENBQUE7SUFDeEMsSUFBQSxPQUFPcUMsZUFBZSxDQUFDb0UsU0FBUyxFQUFFOU8sS0FBSyxDQUFDeUYsTUFBTSxDQUFDLENBQUE7SUFDakQsR0FBQTtJQUNGLENBQUMsQ0FBQTtJQUVELFNBQVNrSixtQkFBbUJBLENBQUNLLE1BQU0sRUFBRUMsU0FBUyxHQUFHLEVBQUUsRUFBRTtNQUNuRCxNQUFNckUsSUFBSSxHQUFHb0UsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO0lBQ25DLEVBQUEsTUFBTUUsU0FBUyxHQUFHckcsSUFBSSxDQUFDaUMsR0FBRyxDQUFDa0UsTUFBTSxDQUFDLENBQUE7TUFDbEMsTUFBTXJCLEtBQUssR0FBRzlFLElBQUksQ0FBQ2tELEtBQUssQ0FBQ21ELFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUN4QyxFQUFBLE1BQU1DLE9BQU8sR0FBR0QsU0FBUyxHQUFHLEVBQUUsQ0FBQTtNQUM5QixJQUFJQyxPQUFPLEtBQUssQ0FBQyxFQUFFO0lBQ2pCLElBQUEsT0FBT3ZFLElBQUksR0FBR2pLLE1BQU0sQ0FBQ2dOLEtBQUssQ0FBQyxDQUFBO0lBQzdCLEdBQUE7SUFDQSxFQUFBLE9BQU8vQyxJQUFJLEdBQUdqSyxNQUFNLENBQUNnTixLQUFLLENBQUMsR0FBR3NCLFNBQVMsR0FBR3ZFLGVBQWUsQ0FBQ3lFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN2RSxDQUFBO0lBRUEsU0FBU1osaUNBQWlDQSxDQUFDUyxNQUFNLEVBQUVDLFNBQVMsRUFBRTtJQUM1RCxFQUFBLElBQUlELE1BQU0sR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU1wRSxJQUFJLEdBQUdvRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUE7SUFDbkMsSUFBQSxPQUFPcEUsSUFBSSxHQUFHRixlQUFlLENBQUM3QixJQUFJLENBQUNpQyxHQUFHLENBQUNrRSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDekQsR0FBQTtJQUNBLEVBQUEsT0FBT1IsY0FBYyxDQUFDUSxNQUFNLEVBQUVDLFNBQVMsQ0FBQyxDQUFBO0lBQzFDLENBQUE7SUFFQSxTQUFTVCxjQUFjQSxDQUFDUSxNQUFNLEVBQUVDLFNBQVMsR0FBRyxFQUFFLEVBQUU7TUFDOUMsTUFBTXJFLElBQUksR0FBR29FLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtJQUNuQyxFQUFBLE1BQU1FLFNBQVMsR0FBR3JHLElBQUksQ0FBQ2lDLEdBQUcsQ0FBQ2tFLE1BQU0sQ0FBQyxDQUFBO0lBQ2xDLEVBQUEsTUFBTXJCLEtBQUssR0FBR2pELGVBQWUsQ0FBQzdCLElBQUksQ0FBQ2tELEtBQUssQ0FBQ21ELFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUM1RCxNQUFNQyxPQUFPLEdBQUd6RSxlQUFlLENBQUN3RSxTQUFTLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xELEVBQUEsT0FBT3RFLElBQUksR0FBRytDLEtBQUssR0FBR3NCLFNBQVMsR0FBR0UsT0FBTyxDQUFBO0lBQzNDOztJQzd3QkEsTUFBTUMsaUJBQWlCLEdBQUdBLENBQUNqSyxPQUFPLEVBQUU3RCxVQUFVLEtBQUs7SUFDakQsRUFBQSxRQUFRNkQsT0FBTztJQUNiLElBQUEsS0FBSyxHQUFHO1VBQ04sT0FBTzdELFVBQVUsQ0FBQzlDLElBQUksQ0FBQztJQUFFa0MsUUFBQUEsS0FBSyxFQUFFLE9BQUE7SUFBUSxPQUFDLENBQUMsQ0FBQTtJQUM1QyxJQUFBLEtBQUssSUFBSTtVQUNQLE9BQU9ZLFVBQVUsQ0FBQzlDLElBQUksQ0FBQztJQUFFa0MsUUFBQUEsS0FBSyxFQUFFLFFBQUE7SUFBUyxPQUFDLENBQUMsQ0FBQTtJQUM3QyxJQUFBLEtBQUssS0FBSztVQUNSLE9BQU9ZLFVBQVUsQ0FBQzlDLElBQUksQ0FBQztJQUFFa0MsUUFBQUEsS0FBSyxFQUFFLE1BQUE7SUFBTyxPQUFDLENBQUMsQ0FBQTtJQUMzQyxJQUFBLEtBQUssTUFBTSxDQUFBO0lBQ1gsSUFBQTtVQUNFLE9BQU9ZLFVBQVUsQ0FBQzlDLElBQUksQ0FBQztJQUFFa0MsUUFBQUEsS0FBSyxFQUFFLE1BQUE7SUFBTyxPQUFDLENBQUMsQ0FBQTtJQUM3QyxHQUFBO0lBQ0YsQ0FBQyxDQUFBO0lBRUQsTUFBTTJPLGlCQUFpQixHQUFHQSxDQUFDbEssT0FBTyxFQUFFN0QsVUFBVSxLQUFLO0lBQ2pELEVBQUEsUUFBUTZELE9BQU87SUFDYixJQUFBLEtBQUssR0FBRztVQUNOLE9BQU83RCxVQUFVLENBQUNDLElBQUksQ0FBQztJQUFFYixRQUFBQSxLQUFLLEVBQUUsT0FBQTtJQUFRLE9BQUMsQ0FBQyxDQUFBO0lBQzVDLElBQUEsS0FBSyxJQUFJO1VBQ1AsT0FBT1ksVUFBVSxDQUFDQyxJQUFJLENBQUM7SUFBRWIsUUFBQUEsS0FBSyxFQUFFLFFBQUE7SUFBUyxPQUFDLENBQUMsQ0FBQTtJQUM3QyxJQUFBLEtBQUssS0FBSztVQUNSLE9BQU9ZLFVBQVUsQ0FBQ0MsSUFBSSxDQUFDO0lBQUViLFFBQUFBLEtBQUssRUFBRSxNQUFBO0lBQU8sT0FBQyxDQUFDLENBQUE7SUFDM0MsSUFBQSxLQUFLLE1BQU0sQ0FBQTtJQUNYLElBQUE7VUFDRSxPQUFPWSxVQUFVLENBQUNDLElBQUksQ0FBQztJQUFFYixRQUFBQSxLQUFLLEVBQUUsTUFBQTtJQUFPLE9BQUMsQ0FBQyxDQUFBO0lBQzdDLEdBQUE7SUFDRixDQUFDLENBQUE7SUFFRCxNQUFNNE8scUJBQXFCLEdBQUdBLENBQUNuSyxPQUFPLEVBQUU3RCxVQUFVLEtBQUs7TUFDckQsTUFBTW9ELFdBQVcsR0FBR1MsT0FBTyxDQUFDUixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3BELEVBQUEsTUFBTTRLLFdBQVcsR0FBRzdLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQyxFQUFBLE1BQU04SyxXQUFXLEdBQUc5SyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFFbEMsSUFBSSxDQUFDOEssV0FBVyxFQUFFO0lBQ2hCLElBQUEsT0FBT0osaUJBQWlCLENBQUNqSyxPQUFPLEVBQUU3RCxVQUFVLENBQUMsQ0FBQTtJQUMvQyxHQUFBO0lBRUEsRUFBQSxJQUFJbU8sY0FBYyxDQUFBO0lBRWxCLEVBQUEsUUFBUUYsV0FBVztJQUNqQixJQUFBLEtBQUssR0FBRztJQUNORSxNQUFBQSxjQUFjLEdBQUduTyxVQUFVLENBQUNFLFFBQVEsQ0FBQztJQUFFZCxRQUFBQSxLQUFLLEVBQUUsT0FBQTtJQUFRLE9BQUMsQ0FBQyxDQUFBO0lBQ3hELE1BQUEsTUFBQTtJQUNGLElBQUEsS0FBSyxJQUFJO0lBQ1ArTyxNQUFBQSxjQUFjLEdBQUduTyxVQUFVLENBQUNFLFFBQVEsQ0FBQztJQUFFZCxRQUFBQSxLQUFLLEVBQUUsUUFBQTtJQUFTLE9BQUMsQ0FBQyxDQUFBO0lBQ3pELE1BQUEsTUFBQTtJQUNGLElBQUEsS0FBSyxLQUFLO0lBQ1IrTyxNQUFBQSxjQUFjLEdBQUduTyxVQUFVLENBQUNFLFFBQVEsQ0FBQztJQUFFZCxRQUFBQSxLQUFLLEVBQUUsTUFBQTtJQUFPLE9BQUMsQ0FBQyxDQUFBO0lBQ3ZELE1BQUEsTUFBQTtJQUNGLElBQUEsS0FBSyxNQUFNLENBQUE7SUFDWCxJQUFBO0lBQ0UrTyxNQUFBQSxjQUFjLEdBQUduTyxVQUFVLENBQUNFLFFBQVEsQ0FBQztJQUFFZCxRQUFBQSxLQUFLLEVBQUUsTUFBQTtJQUFPLE9BQUMsQ0FBQyxDQUFBO0lBQ3ZELE1BQUEsTUFBQTtJQUNKLEdBQUE7TUFFQSxPQUFPK08sY0FBYyxDQUNsQnBQLE9BQU8sQ0FBQyxVQUFVLEVBQUUrTyxpQkFBaUIsQ0FBQ0csV0FBVyxFQUFFak8sVUFBVSxDQUFDLENBQUMsQ0FDL0RqQixPQUFPLENBQUMsVUFBVSxFQUFFZ1AsaUJBQWlCLENBQUNHLFdBQVcsRUFBRWxPLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFDcEUsQ0FBQyxDQUFBO0lBRU0sTUFBTW9PLGNBQWMsR0FBRztJQUM1QkMsRUFBQUEsQ0FBQyxFQUFFTixpQkFBaUI7SUFDcEJPLEVBQUFBLENBQUMsRUFBRU4scUJBQUFBO0lBQ0wsQ0FBQzs7SUMvREQsTUFBTU8sZ0JBQWdCLEdBQUcsTUFBTSxDQUFBO0lBQy9CLE1BQU1DLGVBQWUsR0FBRyxNQUFNLENBQUE7SUFFOUIsTUFBTUMsV0FBVyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFdEMsU0FBU0MseUJBQXlCQSxDQUFDaFEsS0FBSyxFQUFFO0lBQy9DLEVBQUEsT0FBTzZQLGdCQUFnQixDQUFDekssSUFBSSxDQUFDcEYsS0FBSyxDQUFDLENBQUE7SUFDckMsQ0FBQTtJQUVPLFNBQVNpUSx3QkFBd0JBLENBQUNqUSxLQUFLLEVBQUU7SUFDOUMsRUFBQSxPQUFPOFAsZUFBZSxDQUFDMUssSUFBSSxDQUFDcEYsS0FBSyxDQUFDLENBQUE7SUFDcEMsQ0FBQTtJQUVPLFNBQVNrUSx5QkFBeUJBLENBQUNsUSxLQUFLLEVBQUVhLE1BQU0sRUFBRXNQLEtBQUssRUFBRTtNQUM5RCxNQUFNQyxRQUFRLEdBQUdoVSxPQUFPLENBQUM0RCxLQUFLLEVBQUVhLE1BQU0sRUFBRXNQLEtBQUssQ0FBQyxDQUFBO0lBQzlDRSxFQUFBQSxPQUFPLENBQUNDLElBQUksQ0FBQ0YsUUFBUSxDQUFDLENBQUE7SUFDdEIsRUFBQSxJQUFJTCxXQUFXLENBQUNRLFFBQVEsQ0FBQ3ZRLEtBQUssQ0FBQyxFQUFFLE1BQU0sSUFBSXdRLFVBQVUsQ0FBQ0osUUFBUSxDQUFDLENBQUE7SUFDakUsQ0FBQTtJQUVBLFNBQVNoVSxPQUFPQSxDQUFDNEQsS0FBSyxFQUFFYSxNQUFNLEVBQUVzUCxLQUFLLEVBQUU7TUFDckMsTUFBTU0sT0FBTyxHQUFHelEsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxPQUFPLEdBQUcsbUJBQW1CLENBQUE7SUFDaEUsRUFBQSxPQUFRLENBQVFBLE1BQUFBLEVBQUFBLEtBQUssQ0FBQzROLFdBQVcsRUFBRyxDQUFBLGdCQUFBLEVBQWtCNU4sS0FBTSxDQUFBLFNBQUEsRUFBV2EsTUFBTyxDQUFBLG1CQUFBLEVBQXFCNFAsT0FBUSxDQUFBLGdCQUFBLEVBQWtCTixLQUFNLENBQWdGLCtFQUFBLENBQUEsQ0FBQTtJQUNyTjs7SUNWQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsTUFBTU8sc0JBQXNCLEdBQzFCLHVEQUF1RCxDQUFBOztJQUV6RDtJQUNBO0lBQ0EsTUFBTUMsMEJBQTBCLEdBQUcsbUNBQW1DLENBQUE7SUFFdEUsTUFBTUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFBO0lBQzFDLE1BQU1DLGlCQUFpQixHQUFHLEtBQUssQ0FBQTtJQUMvQixNQUFNQyw2QkFBNkIsR0FBRyxVQUFVLENBQUE7O0lBRWhEO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDTyxTQUFTalEsTUFBTUEsQ0FBQ3JDLElBQUksRUFBRXVTLFNBQVMsRUFBRTdRLE9BQU8sRUFBRTtJQUMv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LEtBQUssRUFBRSxNQUFNO1FBQUUsR0FBRzBVLEtBQUFBO0lBQU0sR0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvRCxDQUFDOztJQ1JEeUIsT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0lBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQ2pjLGVBQWUsR0FBR0EsZUFBZSxDQUFBO0lBRXhEZ2MsT0FBTyxDQUFDQyxjQUFjLENBQUMxRSxlQUFlLEdBQUdBLGVBQWUsQ0FBQTtJQUV4RHlFLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDQyxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtJQUVoRUYsT0FBTyxDQUFDQyxjQUFjLENBQUNFLG1CQUFtQixHQUFHQSxJQUFtQixDQUFBO0lBRWhFSCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0csbUJBQW1CLEdBQUdBLElBQW1COzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDJdfQ==
