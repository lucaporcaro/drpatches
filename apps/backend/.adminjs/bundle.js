(function (React, adminjs, designSystem) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  function ImageView(props) {
    const baseUrl = window.location.host;
    return /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        display: 'block',
        fontFamily: '"Roboto", sans-serif',
        fontSize: 12,
        lineHeight: 16,
        color: 'rgb(137, 138, 154)',
        fontWeight: 300
      }
    }, "Image"), /*#__PURE__*/React__default.default.createElement("img", {
      width: 260,
      style: {
        aspectRatio: 'auto'
      },
      src: `${window.location.protocol}//${baseUrl}/${props.record.params.image}`
    }));
  }

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
  AdminJS.UserComponents.ImageView = ImageView;
  AdminJS.UserComponents.ImportComponent = ImportComponent;
  AdminJS.UserComponents.ExportComponent = ExportComponent;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uL2FkbWluanMvY29tcG9uZW50cy9JbWFnZS50c3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0ltcG9ydENvbXBvbmVudC5qc3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzRGF0ZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzVmFsaWQubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRMb2NhbGl6ZUZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbG9jYWxpemUubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4ubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbWF0Y2gubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2RlZmF1bHRPcHRpb25zLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RhbnRzLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0cnVjdEZyb20ubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldERheU9mWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZklTT1dlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRJU09XZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZJU09XZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldElTT1dlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRXZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldFdlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2FkZExlYWRpbmdaZXJvcy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2xpZ2h0Rm9ybWF0dGVycy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvcHJvdGVjdGVkVG9rZW5zLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZm9ybWF0Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytpbXBvcnQtZXhwb3J0QDMuMC4wX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2V4cG9ydGVyLnR5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0V4cG9ydENvbXBvbmVudC5qc3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2ZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4xX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQuanMiLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW1hZ2VWaWV3KHByb3BzOiBhbnkpIHtcbiAgY29uc3QgYmFzZVVybCA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8c3BhblxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgZm9udEZhbWlseTogJ1wiUm9ib3RvXCIsIHNhbnMtc2VyaWYnLFxuICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxNixcbiAgICAgICAgICBjb2xvcjogJ3JnYigxMzcsIDEzOCwgMTU0KScsXG4gICAgICAgICAgZm9udFdlaWdodDogMzAwLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBJbWFnZVxuICAgICAgPC9zcGFuPlxuICAgICAgPGltZ1xuICAgICAgICB3aWR0aD17MjYwfVxuICAgICAgICBzdHlsZT17eyBhc3BlY3RSYXRpbzogJ2F1dG8nIH19XG4gICAgICAgIHNyYz17YCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHtiYXNlVXJsfS8ke3Byb3BzLnJlY29yZC5wYXJhbXMuaW1hZ2V9YH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgRHJvcFpvbmVJdGVtLCBMb2FkZXIsIEJveCwgQnV0dG9uLCBEcm9wWm9uZSwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IEltcG9ydENvbXBvbmVudCA9ICh7IHJlc291cmNlIH0pID0+IHtcbiAgICBjb25zdCBbZmlsZSwgc2V0RmlsZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBzZW5kTm90aWNlID0gdXNlTm90aWNlKCk7XG4gICAgY29uc3QgW2lzRmV0Y2hpbmcsIHNldEZldGNoaW5nXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3Qgb25VcGxvYWQgPSAodXBsb2FkZWRGaWxlKSA9PiB7XG4gICAgICAgIHNldEZpbGUodXBsb2FkZWRGaWxlPy5bMF0gPz8gbnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBvblN1Ym1pdCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmV0Y2hpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnREYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICBpbXBvcnREYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGU/Lm5hbWUpO1xuICAgICAgICAgICAgYXdhaXQgbmV3IEFwaUNsaWVudCgpLnJlc291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiByZXNvdXJjZS5pZCxcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnaW1wb3J0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiBpbXBvcnREYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZW5kTm90aWNlKHsgbWVzc2FnZTogJ0ltcG9ydGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgc2VuZE5vdGljZSh7IG1lc3NhZ2U6IGUubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRGZXRjaGluZyhmYWxzZSk7XG4gICAgfTtcbiAgICBpZiAoaXNGZXRjaGluZykge1xuICAgICAgICByZXR1cm4gPExvYWRlciAvPjtcbiAgICB9XG4gICAgcmV0dXJuICg8Qm94IG1hcmdpbj1cImF1dG9cIiBtYXhXaWR0aD17NjAwfSBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIgZmxleERpcmVjdGlvbj1cImNvbHVtblwiPlxuICAgICAgPERyb3Bab25lIGZpbGVzPXtbXX0gb25DaGFuZ2U9e29uVXBsb2FkfSBtdWx0aXBsZT17ZmFsc2V9Lz5cbiAgICAgIHtmaWxlICYmICg8RHJvcFpvbmVJdGVtIGZpbGU9e2ZpbGV9IGZpbGVuYW1lPXtmaWxlLm5hbWV9IG9uUmVtb3ZlPXsoKSA9PiBzZXRGaWxlKG51bGwpfS8+KX1cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIG09ezEwfT5cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvblN1Ym1pdH0gZGlzYWJsZWQ9eyFmaWxlIHx8IGlzRmV0Y2hpbmd9PlxuICAgICAgICAgIFVwbG9hZFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94Pik7XG59O1xuZXhwb3J0IGRlZmF1bHQgSW1wb3J0Q29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbmFtZSBpc0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIHZhbHVlIGEgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS4gVGhlIGZ1bmN0aW9uIHdvcmtzIGZvciBkYXRlcyB0cmFuc2ZlcnJlZCBhY3Jvc3MgaWZyYW1lcy5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGRhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGEgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZSgpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoTmFOKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igc29tZSB2YWx1ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSgnMjAxNC0wMi0zMScpXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBvYmplY3Q6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoe30pXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgRGF0ZV1cIilcbiAgKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc0RhdGU7XG4iLCIvKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gYXJndW1lbnQgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIGNvbnN0IGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKFxuICAgIGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgYXJndW1lbnQgPT09IFwib2JqZWN0XCIgJiYgYXJnU3RyID09PSBcIltvYmplY3QgRGF0ZV1cIilcbiAgKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBhcmd1bWVudC5jb25zdHJ1Y3RvcigrYXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJudW1iZXJcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiB8fFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIlxuICApIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgdG9EYXRlO1xuIiwiaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSBcIi4vaXNEYXRlLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzVmFsaWRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdmFsaWQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGFyZ3VtZW50IGlzIEludmFsaWQgRGF0ZSBhbmQgdHJ1ZSBvdGhlcndpc2UuXG4gKiBBcmd1bWVudCBpcyBjb252ZXJ0ZWQgdG8gRGF0ZSB1c2luZyBgdG9EYXRlYC4gU2VlIFt0b0RhdGVdKGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlKVxuICogSW52YWxpZCBEYXRlIGlzIGEgRGF0ZSwgd2hvc2UgdGltZSB2YWx1ZSBpcyBOYU4uXG4gKlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZGF0ZSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIFRoZSBkYXRlIGlzIHZhbGlkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoMjAxNCwgMSwgMzEpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsdWUsIGNvbnZlcnRhYmxlIGludG8gYSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZCgxMzkzODA0ODAwMDAwKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgaW52YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgnJykpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKGRhdGUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkgJiYgdHlwZW9mIGRhdGUgIT09IFwibnVtYmVyXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIHJldHVybiAhaXNOYU4oTnVtYmVyKF9kYXRlKSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNWYWxpZDtcbiIsImNvbnN0IGZvcm1hdERpc3RhbmNlTG9jYWxlID0ge1xuICBsZXNzVGhhblhTZWNvbmRzOiB7XG4gICAgb25lOiBcImxlc3MgdGhhbiBhIHNlY29uZFwiLFxuICAgIG90aGVyOiBcImxlc3MgdGhhbiB7e2NvdW50fX0gc2Vjb25kc1wiLFxuICB9LFxuXG4gIHhTZWNvbmRzOiB7XG4gICAgb25lOiBcIjEgc2Vjb25kXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IHNlY29uZHNcIixcbiAgfSxcblxuICBoYWxmQU1pbnV0ZTogXCJoYWxmIGEgbWludXRlXCIsXG5cbiAgbGVzc1RoYW5YTWludXRlczoge1xuICAgIG9uZTogXCJsZXNzIHRoYW4gYSBtaW51dGVcIixcbiAgICBvdGhlcjogXCJsZXNzIHRoYW4ge3tjb3VudH19IG1pbnV0ZXNcIixcbiAgfSxcblxuICB4TWludXRlczoge1xuICAgIG9uZTogXCIxIG1pbnV0ZVwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBtaW51dGVzXCIsXG4gIH0sXG5cbiAgYWJvdXRYSG91cnM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSBob3VyXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IGhvdXJzXCIsXG4gIH0sXG5cbiAgeEhvdXJzOiB7XG4gICAgb25lOiBcIjEgaG91clwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBob3Vyc1wiLFxuICB9LFxuXG4gIHhEYXlzOiB7XG4gICAgb25lOiBcIjEgZGF5XCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IGRheXNcIixcbiAgfSxcblxuICBhYm91dFhXZWVrczoge1xuICAgIG9uZTogXCJhYm91dCAxIHdlZWtcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0gd2Vla3NcIixcbiAgfSxcblxuICB4V2Vla3M6IHtcbiAgICBvbmU6IFwiMSB3ZWVrXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IHdlZWtzXCIsXG4gIH0sXG5cbiAgYWJvdXRYTW9udGhzOiB7XG4gICAgb25lOiBcImFib3V0IDEgbW9udGhcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0gbW9udGhzXCIsXG4gIH0sXG5cbiAgeE1vbnRoczoge1xuICAgIG9uZTogXCIxIG1vbnRoXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IG1vbnRoc1wiLFxuICB9LFxuXG4gIGFib3V0WFllYXJzOiB7XG4gICAgb25lOiBcImFib3V0IDEgeWVhclwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIHhZZWFyczoge1xuICAgIG9uZTogXCIxIHllYXJcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0geWVhcnNcIixcbiAgfSxcblxuICBvdmVyWFllYXJzOiB7XG4gICAgb25lOiBcIm92ZXIgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwib3ZlciB7e2NvdW50fX0geWVhcnNcIixcbiAgfSxcblxuICBhbG1vc3RYWWVhcnM6IHtcbiAgICBvbmU6IFwiYWxtb3N0IDEgeWVhclwiLFxuICAgIG90aGVyOiBcImFsbW9zdCB7e2NvdW50fX0geWVhcnNcIixcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREaXN0YW5jZSA9ICh0b2tlbiwgY291bnQsIG9wdGlvbnMpID0+IHtcbiAgbGV0IHJlc3VsdDtcblxuICBjb25zdCB0b2tlblZhbHVlID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dO1xuICBpZiAodHlwZW9mIHRva2VuVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlO1xuICB9IGVsc2UgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZS5vbmU7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZS5vdGhlci5yZXBsYWNlKFwie3tjb3VudH19XCIsIGNvdW50LnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnM/LmFkZFN1ZmZpeCkge1xuICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gJiYgb3B0aW9ucy5jb21wYXJpc29uID4gMCkge1xuICAgICAgcmV0dXJuIFwiaW4gXCIgKyByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQgKyBcIiBhZ29cIjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1hdExvbmdGbihhcmdzKSB7XG4gIHJldHVybiAob3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgLy8gVE9ETzogUmVtb3ZlIFN0cmluZygpXG4gICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgY29uc3QgZm9ybWF0ID0gYXJncy5mb3JtYXRzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHNbYXJncy5kZWZhdWx0V2lkdGhdO1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBidWlsZEZvcm1hdExvbmdGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuLm1qc1wiO1xuXG5jb25zdCBkYXRlRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJFRUVFLCBNTU1NIGRvLCB5XCIsXG4gIGxvbmc6IFwiTU1NTSBkbywgeVwiLFxuICBtZWRpdW06IFwiTU1NIGQsIHlcIixcbiAgc2hvcnQ6IFwiTU0vZGQveXl5eVwiLFxufTtcblxuY29uc3QgdGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwiaDptbTpzcyBhIHp6enpcIixcbiAgbG9uZzogXCJoOm1tOnNzIGEgelwiLFxuICBtZWRpdW06IFwiaDptbTpzcyBhXCIsXG4gIHNob3J0OiBcImg6bW0gYVwiLFxufTtcblxuY29uc3QgZGF0ZVRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbG9uZzogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIG1lZGl1bTogXCJ7e2RhdGV9fSwge3t0aW1lfX1cIixcbiAgc2hvcnQ6IFwie3tkYXRlfX0sIHt7dGltZX19XCIsXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0TG9uZyA9IHtcbiAgZGF0ZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJmdWxsXCIsXG4gIH0pLFxuXG4gIHRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiB0aW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcblxuICBkYXRlVGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVUaW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcbn07XG4iLCJjb25zdCBmb3JtYXRSZWxhdGl2ZUxvY2FsZSA9IHtcbiAgbGFzdFdlZWs6IFwiJ2xhc3QnIGVlZWUgJ2F0JyBwXCIsXG4gIHllc3RlcmRheTogXCIneWVzdGVyZGF5IGF0JyBwXCIsXG4gIHRvZGF5OiBcIid0b2RheSBhdCcgcFwiLFxuICB0b21vcnJvdzogXCIndG9tb3Jyb3cgYXQnIHBcIixcbiAgbmV4dFdlZWs6IFwiZWVlZSAnYXQnIHBcIixcbiAgb3RoZXI6IFwiUFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdFJlbGF0aXZlID0gKHRva2VuLCBfZGF0ZSwgX2Jhc2VEYXRlLCBfb3B0aW9ucykgPT5cbiAgZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBUaGUgbG9jYWxpemUgZnVuY3Rpb24gYXJndW1lbnQgY2FsbGJhY2sgd2hpY2ggYWxsb3dzIHRvIGNvbnZlcnQgcmF3IHZhbHVlIHRvXG4gKiB0aGUgYWN0dWFsIHR5cGUuXG4gKlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHZhbHVlXG4gKi9cblxuLyoqXG4gKiBUaGUgbWFwIG9mIGxvY2FsaXplZCB2YWx1ZXMgZm9yIGVhY2ggd2lkdGguXG4gKi9cblxuLyoqXG4gKiBUaGUgaW5kZXggdHlwZSBvZiB0aGUgbG9jYWxlIHVuaXQgdmFsdWUuIEl0IHR5cGVzIGNvbnZlcnNpb24gb2YgdW5pdHMgb2ZcbiAqIHZhbHVlcyB0aGF0IGRvbid0IHN0YXJ0IGF0IDAgKGkuZS4gcXVhcnRlcnMpLlxuICovXG5cbi8qKlxuICogQ29udmVydHMgdGhlIHVuaXQgdmFsdWUgdG8gdGhlIHR1cGxlIG9mIHZhbHVlcy5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgZXJhIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBCQyxcbiAqIHRoZSBzZWNvbmQgZWxlbWVudCByZXByZXNlbnRzIEFELlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBxdWFydGVyIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBRMS5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgZGF5IHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBTdW5kYXkuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIG1vbnRoIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBKYW51YXJ5LlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExvY2FsaXplRm4oYXJncykge1xuICByZXR1cm4gKHZhbHVlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IG9wdGlvbnM/LmNvbnRleHQgPyBTdHJpbmcob3B0aW9ucy5jb250ZXh0KSA6IFwic3RhbmRhbG9uZVwiO1xuXG4gICAgbGV0IHZhbHVlc0FycmF5O1xuICAgIGlmIChjb250ZXh0ID09PSBcImZvcm1hdHRpbmdcIiAmJiBhcmdzLmZvcm1hdHRpbmdWYWx1ZXMpIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCB8fCBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucz8ud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBkZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhbHVlc0FycmF5ID1cbiAgICAgICAgYXJncy5mb3JtYXR0aW5nVmFsdWVzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnM/LndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy52YWx1ZXNbd2lkdGhdIHx8IGFyZ3MudmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gYXJncy5hcmd1bWVudENhbGxiYWNrID8gYXJncy5hcmd1bWVudENhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIEZvciBzb21lIHJlYXNvbiBUeXBlU2NyaXB0IGp1c3QgZG9uJ3Qgd2FudCB0byBtYXRjaCBpdCwgbm8gbWF0dGVyIGhvdyBoYXJkIHdlIHRyeS4gSSBjaGFsbGVuZ2UgeW91IHRvIHRyeSB0byByZW1vdmUgaXQhXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5W2luZGV4XTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IGJ1aWxkTG9jYWxpemVGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTG9jYWxpemVGbi5tanNcIjtcblxuY29uc3QgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIkJcIiwgXCJBXCJdLFxuICBhYmJyZXZpYXRlZDogW1wiQkNcIiwgXCJBRFwiXSxcbiAgd2lkZTogW1wiQmVmb3JlIENocmlzdFwiLCBcIkFubm8gRG9taW5pXCJdLFxufTtcblxuY29uc3QgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCJdLFxuICBhYmJyZXZpYXRlZDogW1wiUTFcIiwgXCJRMlwiLCBcIlEzXCIsIFwiUTRcIl0sXG4gIHdpZGU6IFtcIjFzdCBxdWFydGVyXCIsIFwiMm5kIHF1YXJ0ZXJcIiwgXCIzcmQgcXVhcnRlclwiLCBcIjR0aCBxdWFydGVyXCJdLFxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxuY29uc3QgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiSlwiLCBcIkZcIiwgXCJNXCIsIFwiQVwiLCBcIk1cIiwgXCJKXCIsIFwiSlwiLCBcIkFcIiwgXCJTXCIsIFwiT1wiLCBcIk5cIiwgXCJEXCJdLFxuICBhYmJyZXZpYXRlZDogW1xuICAgIFwiSmFuXCIsXG4gICAgXCJGZWJcIixcbiAgICBcIk1hclwiLFxuICAgIFwiQXByXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1blwiLFxuICAgIFwiSnVsXCIsXG4gICAgXCJBdWdcIixcbiAgICBcIlNlcFwiLFxuICAgIFwiT2N0XCIsXG4gICAgXCJOb3ZcIixcbiAgICBcIkRlY1wiLFxuICBdLFxuXG4gIHdpZGU6IFtcbiAgICBcIkphbnVhcnlcIixcbiAgICBcIkZlYnJ1YXJ5XCIsXG4gICAgXCJNYXJjaFwiLFxuICAgIFwiQXByaWxcIixcbiAgICBcIk1heVwiLFxuICAgIFwiSnVuZVwiLFxuICAgIFwiSnVseVwiLFxuICAgIFwiQXVndXN0XCIsXG4gICAgXCJTZXB0ZW1iZXJcIixcbiAgICBcIk9jdG9iZXJcIixcbiAgICBcIk5vdmVtYmVyXCIsXG4gICAgXCJEZWNlbWJlclwiLFxuICBdLFxufTtcblxuY29uc3QgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIlNcIiwgXCJNXCIsIFwiVFwiLCBcIldcIiwgXCJUXCIsIFwiRlwiLCBcIlNcIl0sXG4gIHNob3J0OiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgd2lkZTogW1xuICAgIFwiU3VuZGF5XCIsXG4gICAgXCJNb25kYXlcIixcbiAgICBcIlR1ZXNkYXlcIixcbiAgICBcIldlZG5lc2RheVwiLFxuICAgIFwiVGh1cnNkYXlcIixcbiAgICBcIkZyaWRheVwiLFxuICAgIFwiU2F0dXJkYXlcIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3QgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3Qgb3JkaW5hbE51bWJlciA9IChkaXJ0eU51bWJlciwgX29wdGlvbnMpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIGNvbnN0IHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJzdFwiO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJuZFwiO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJyZFwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgXCJ0aFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyLFxuXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IChxdWFydGVyKSA9PiBxdWFydGVyIC0gMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiBcIndpZGVcIixcbiAgfSksXG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hGbihhcmdzKSB7XG4gIHJldHVybiAoc3RyaW5nLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG5cbiAgICBjb25zdCBtYXRjaFBhdHRlcm4gPVxuICAgICAgKHdpZHRoICYmIGFyZ3MubWF0Y2hQYXR0ZXJuc1t3aWR0aF0pIHx8XG4gICAgICBhcmdzLm1hdGNoUGF0dGVybnNbYXJncy5kZWZhdWx0TWF0Y2hXaWR0aF07XG4gICAgY29uc3QgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2gobWF0Y2hQYXR0ZXJuKTtcblxuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG5cbiAgICBjb25zdCBwYXJzZVBhdHRlcm5zID1cbiAgICAgICh3aWR0aCAmJiBhcmdzLnBhcnNlUGF0dGVybnNbd2lkdGhdKSB8fFxuICAgICAgYXJncy5wYXJzZVBhdHRlcm5zW2FyZ3MuZGVmYXVsdFBhcnNlV2lkdGhdO1xuXG4gICAgY29uc3Qga2V5ID0gQXJyYXkuaXNBcnJheShwYXJzZVBhdHRlcm5zKVxuICAgICAgPyBmaW5kSW5kZXgocGFyc2VQYXR0ZXJucywgKHBhdHRlcm4pID0+IHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKSlcbiAgICAgIDogLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgLS0gSSBjaGFsbGFuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgICAgICBmaW5kS2V5KHBhcnNlUGF0dGVybnMsIChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZykpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2soa2V5KSA6IGtleTtcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFja1xuICAgICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAtLSBJIGNoYWxsYW5nZSB5b3UgdG8gZml4IHRoZSB0eXBlXG4gICAgICAgIG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSlcbiAgICAgIDogdmFsdWU7XG5cbiAgICBjb25zdCByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcblxuICAgIHJldHVybiB7IHZhbHVlLCByZXN0IH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqZWN0LCBwcmVkaWNhdGUpIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKFxuICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJlxuICAgICAgcHJlZGljYXRlKG9iamVjdFtrZXldKVxuICAgICkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgZm9yIChsZXQga2V5ID0gMDsga2V5IDwgYXJyYXkubGVuZ3RoOyBrZXkrKykge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlba2V5XSkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRNYXRjaFBhdHRlcm5GbihhcmdzKSB7XG4gIHJldHVybiAoc3RyaW5nLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLm1hdGNoUGF0dGVybik7XG4gICAgaWYgKCFtYXRjaFJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuXG4gICAgY29uc3QgcGFyc2VSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5wYXJzZVBhdHRlcm4pO1xuICAgIGlmICghcGFyc2VSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIGxldCB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFja1xuICAgICAgPyBhcmdzLnZhbHVlQ2FsbGJhY2socGFyc2VSZXN1bHRbMF0pXG4gICAgICA6IHBhcnNlUmVzdWx0WzBdO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgLS0gSSBjaGFsbGFuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgY29uc3QgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geyB2YWx1ZSwgcmVzdCB9O1xuICB9O1xufVxuIiwiaW1wb3J0IHsgYnVpbGRNYXRjaEZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaEZuLm1qc1wiO1xuaW1wb3J0IHsgYnVpbGRNYXRjaFBhdHRlcm5GbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4ubWpzXCI7XG5cbmNvbnN0IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2k7XG5jb25zdCBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcblxuY29uc3QgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihifGEpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihiXFwuP1xccz9jXFwuP3xiXFwuP1xccz9jXFwuP1xccz9lXFwuP3xhXFwuP1xccz9kXFwuP3xjXFwuP1xccz9lXFwuPykvaSxcbiAgd2lkZTogL14oYmVmb3JlIGNocmlzdHxiZWZvcmUgY29tbW9uIGVyYXxhbm5vIGRvbWluaXxjb21tb24gZXJhKS9pLFxufTtcbmNvbnN0IHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9eYi9pLCAvXihhfGMpL2ldLFxufTtcblxuY29uc3QgbWF0Y2hRdWFydGVyUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bMTIzNF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9ecVsxMjM0XS9pLFxuICB3aWRlOiAvXlsxMjM0XSh0aHxzdHxuZHxyZCk/IHF1YXJ0ZXIvaSxcbn07XG5jb25zdCBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV0sXG59O1xuXG5jb25zdCBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaSxcbn07XG5jb25zdCBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogW1xuICAgIC9eai9pLFxuICAgIC9eZi9pLFxuICAgIC9ebS9pLFxuICAgIC9eYS9pLFxuICAgIC9ebS9pLFxuICAgIC9eai9pLFxuICAgIC9eai9pLFxuICAgIC9eYS9pLFxuICAgIC9ecy9pLFxuICAgIC9eby9pLFxuICAgIC9ebi9pLFxuICAgIC9eZC9pLFxuICBdLFxuXG4gIGFueTogW1xuICAgIC9eamEvaSxcbiAgICAvXmYvaSxcbiAgICAvXm1hci9pLFxuICAgIC9eYXAvaSxcbiAgICAvXm1heS9pLFxuICAgIC9eanVuL2ksXG4gICAgL15qdWwvaSxcbiAgICAvXmF1L2ksXG4gICAgL15zL2ksXG4gICAgL15vL2ksXG4gICAgL15uL2ksXG4gICAgL15kL2ksXG4gIF0sXG59O1xuXG5jb25zdCBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW3NtdHdmXS9pLFxuICBzaG9ydDogL14oc3V8bW98dHV8d2V8dGh8ZnJ8c2EpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihzdW58bW9ufHR1ZXx3ZWR8dGh1fGZyaXxzYXQpL2ksXG4gIHdpZGU6IC9eKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9ecy9pLCAvXm0vaSwgL150L2ksIC9edy9pLCAvXnQvaSwgL15mL2ksIC9ecy9pXSxcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiAodmFsdWUpID0+IHBhcnNlSW50KHZhbHVlLCAxMCksXG4gIH0pLFxuXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgICB2YWx1ZUNhbGxiYWNrOiAoaW5kZXgpID0+IGluZGV4ICsgMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJhbnlcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcbn07XG4iLCJpbXBvcnQgeyBmb3JtYXREaXN0YW5jZSB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UubWpzXCI7XG5pbXBvcnQgeyBmb3JtYXRMb25nIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXRMb25nLm1qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UmVsYXRpdmUgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlLm1qc1wiO1xuaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2xvY2FsaXplLm1qc1wiO1xuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tIFwiLi9lbi1VUy9fbGliL21hdGNoLm1qc1wiO1xuXG4vKipcbiAqIEBjYXRlZ29yeSBMb2NhbGVzXG4gKiBAc3VtbWFyeSBFbmdsaXNoIGxvY2FsZSAoVW5pdGVkIFN0YXRlcykuXG4gKiBAbGFuZ3VhZ2UgRW5nbGlzaFxuICogQGlzby02MzktMiBlbmdcbiAqIEBhdXRob3IgU2FzaGEgS29zcyBbQGtvc3Nub2NvcnBdKGh0dHBzOi8vZ2l0aHViLmNvbS9rb3Nzbm9jb3JwKVxuICogQGF1dGhvciBMZXNoYSBLb3NzIFtAbGVzaGFrb3NzXShodHRwczovL2dpdGh1Yi5jb20vbGVzaGFrb3NzKVxuICovXG5leHBvcnQgY29uc3QgZW5VUyA9IHtcbiAgY29kZTogXCJlbi1VU1wiLFxuICBmb3JtYXREaXN0YW5jZTogZm9ybWF0RGlzdGFuY2UsXG4gIGZvcm1hdExvbmc6IGZvcm1hdExvbmcsXG4gIGZvcm1hdFJlbGF0aXZlOiBmb3JtYXRSZWxhdGl2ZSxcbiAgbG9jYWxpemU6IGxvY2FsaXplLFxuICBtYXRjaDogbWF0Y2gsXG4gIG9wdGlvbnM6IHtcbiAgICB3ZWVrU3RhcnRzT246IDAgLyogU3VuZGF5ICovLFxuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogMSxcbiAgfSxcbn07XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZW5VUztcbiIsImxldCBkZWZhdWx0T3B0aW9ucyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRPcHRpb25zKG5ld09wdGlvbnMpIHtcbiAgZGVmYXVsdE9wdGlvbnMgPSBuZXdPcHRpb25zO1xufVxuIiwiLyoqXG4gKiBAbW9kdWxlIGNvbnN0YW50c1xuICogQHN1bW1hcnkgVXNlZnVsIGNvbnN0YW50c1xuICogQGRlc2NyaXB0aW9uXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCBkYXRlIGNvbnN0YW50cy5cbiAqXG4gKiBUaGUgY29uc3RhbnRzIGNvdWxkIGJlIGltcG9ydGVkIGZyb20gYGRhdGUtZm5zL2NvbnN0YW50c2A6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IG1heFRpbWUsIG1pblRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogZnVuY3Rpb24gaXNBbGxvd2VkVGltZSh0aW1lKSB7XG4gKiAgIHJldHVybiB0aW1lIDw9IG1heFRpbWUgJiYgdGltZSA+PSBtaW5UaW1lO1xuICogfVxuICogYGBgXG4gKi9cblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIGRheXNJbldlZWtcbiAqIEBzdW1tYXJ5IERheXMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3QgZGF5c0luV2VlayA9IDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5ZZWFyXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgeWVhci5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEhvdyBtYW55IGRheXMgaW4gYSB5ZWFyLlxuICpcbiAqIE9uZSB5ZWFycyBlcXVhbHMgMzY1LjI0MjUgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIGZvcm11bGE6XG4gKlxuICogPiBMZWFwIHllYXIgb2NjdXJlcyBldmVyeSA0IHllYXJzLCBleGNlcHQgZm9yIHllYXJzIHRoYXQgYXJlIGRpdmlzYWJsZSBieSAxMDAgYW5kIG5vdCBkaXZpc2FibGUgYnkgNDAwLlxuICogPiAxIG1lYW4geWVhciA9ICgzNjUrMS80LTEvMTAwKzEvNDAwKSBkYXlzID0gMzY1LjI0MjUgZGF5c1xuICovXG5leHBvcnQgY29uc3QgZGF5c0luWWVhciA9IDM2NS4yNDI1O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWF4VGltZVxuICogQHN1bW1hcnkgTWF4aW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IG1heFRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogY29uc3QgaXNWYWxpZCA9IDg2NDAwMDAwMDAwMDAwMDEgPD0gbWF4VGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSg4NjQwMDAwMDAwMDAwMDAxKTtcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtYXhUaW1lID0gTWF0aC5wb3coMTAsIDgpICogMjQgKiA2MCAqIDYwICogMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pblRpbWVcbiAqIEBzdW1tYXJ5IE1pbmltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtaW5UaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSAtODY0MDAwMDAwMDAwMDAwMSA+PSBtaW5UaW1lO1xuICogLy89PiBmYWxzZVxuICpcbiAqIG5ldyBEYXRlKC04NjQwMDAwMDAwMDAwMDAxKVxuICogLy89PiBJbnZhbGlkIERhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pblRpbWUgPSAtbWF4VGltZTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luV2VlayA9IDYwNDgwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIG1pbnV0ZVxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5NaW51dGUgPSA2MDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgaG91clxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5Ib3VyID0gMzYwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luU2Vjb25kXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBzZWNvbmRcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luU2Vjb25kID0gMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJblllYXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luWWVhciA9IDUyNTYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbk1vbnRoXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgbW9udGguXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5Nb250aCA9IDQzMjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luRGF5XG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luRGF5ID0gMTQ0MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbW9udGhzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBNb250aHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3QgbW9udGhzSW5RdWFydGVyID0gMztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luWWVhclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luWWVhciA9IDEyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgcXVhcnRlcnNJblllYXJcbiAqIEBzdW1tYXJ5IFF1YXJ0ZXJzIGluIDEgeWVhclxuICovXG5leHBvcnQgY29uc3QgcXVhcnRlcnNJblllYXIgPSA0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGhvdXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbk1pbnV0ZVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1pbnV0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbk1pbnV0ZSA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luRGF5ID0gc2Vjb25kc0luSG91ciAqIDI0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5XZWVrID0gc2Vjb25kc0luRGF5ICogNztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblllYXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luWWVhciA9IHNlY29uZHNJbkRheSAqIGRheXNJblllYXI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5Nb250aFxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1vbnRoXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Nb250aCA9IHNlY29uZHNJblllYXIgLyAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblF1YXJ0ZXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luUXVhcnRlciA9IHNlY29uZHNJbk1vbnRoICogMztcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSBkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXkoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mRGF5O1xuIiwiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gIGNvbnN0IHV0Y0RhdGUgPSBuZXcgRGF0ZShcbiAgICBEYXRlLlVUQyhcbiAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgIGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgZGF0ZS5nZXRIb3VycygpLFxuICAgICAgZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICBkYXRlLmdldFNlY29uZHMoKSxcbiAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCksXG4gICAgKSxcbiAgKTtcbiAgdXRjRGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkpO1xuICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgLSB1dGNEYXRlLmdldFRpbWUoKTtcbn1cbiIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luRGF5IH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCIuL3N0YXJ0T2ZEYXkubWpzXCI7XG5pbXBvcnQgeyBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIH0gZnJvbSBcIi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1xuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy4gVGhpcyBtZWFucyB0aGF0IHRoZSB0aW1lcyBhcmUgcmVtb3ZlZFxuICogZnJvbSB0aGUgZGF0ZXMgYW5kIHRoZW4gdGhlIGRpZmZlcmVuY2UgaW4gZGF5cyBpcyBjYWxjdWxhdGVkLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIGVhcmxpZXIgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5c1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxMSAyMzowMDowMCBhbmQgMiBKdWx5IDIwMTIgMDA6MDA6MDA/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gKiAgIG5ldyBEYXRlKDIwMTIsIDYsIDIsIDAsIDApLFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAyLCAyMywgMClcbiAqIClcbiAqIC8vPT4gMzY2XG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxMSAyMzo1OTowMCBhbmQgMyBKdWx5IDIwMTEgMDA6MDE6MDA/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDMsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAyLCAyMywgNTkpXG4gKiApXG4gKiAvLz0+IDFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSB7XG4gIGNvbnN0IHN0YXJ0T2ZEYXlMZWZ0ID0gc3RhcnRPZkRheShkYXRlTGVmdCk7XG4gIGNvbnN0IHN0YXJ0T2ZEYXlSaWdodCA9IHN0YXJ0T2ZEYXkoZGF0ZVJpZ2h0KTtcblxuICBjb25zdCB0aW1lc3RhbXBMZWZ0ID1cbiAgICBzdGFydE9mRGF5TGVmdC5nZXRUaW1lKCkgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlMZWZ0KTtcbiAgY29uc3QgdGltZXN0YW1wUmlnaHQgPVxuICAgIHN0YXJ0T2ZEYXlSaWdodC5nZXRUaW1lKCkgLVxuICAgIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoc3RhcnRPZkRheVJpZ2h0KTtcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgZGF5IGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgZGF5IG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoKHRpbWVzdGFtcExlZnQgLSB0aW1lc3RhbXBSaWdodCkgLyBtaWxsaXNlY29uZHNJbkRheSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzO1xuIiwiLyoqXG4gKiBAbmFtZSBjb25zdHJ1Y3RGcm9tXG4gKiBAY2F0ZWdvcnkgR2VuZXJpYyBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb25zdHJ1Y3RzIGEgZGF0ZSB1c2luZyB0aGUgcmVmZXJlbmNlIGRhdGUgYW5kIHRoZSB2YWx1ZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGZ1bmN0aW9uIGNvbnN0cnVjdHMgYSBuZXcgZGF0ZSB1c2luZyB0aGUgY29uc3RydWN0b3IgZnJvbSB0aGUgcmVmZXJlbmNlXG4gKiBkYXRlIGFuZCB0aGUgZ2l2ZW4gdmFsdWUuIEl0IGhlbHBzIHRvIGJ1aWxkIGdlbmVyaWMgZnVuY3Rpb25zIHRoYXQgYWNjZXB0XG4gKiBkYXRlIGV4dGVuc2lvbnMuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgcmVmZXJlbmNlIGRhdGUgdG8gdGFrZSBjb25zdHJ1Y3RvciBmcm9tXG4gKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY3JlYXRlIHRoZSBkYXRlXG4gKlxuICogQHJldHVybnMgRGF0ZSBpbml0aWFsaXplZCB1c2luZyB0aGUgZ2l2ZW4gZGF0ZSBhbmQgdmFsdWVcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gJ2RhdGUtZm5zJ1xuICpcbiAqIC8vIEEgZnVuY3Rpb24gdGhhdCBjbG9uZXMgYSBkYXRlIHByZXNlcnZpbmcgdGhlIG9yaWdpbmFsIHR5cGVcbiAqIGZ1bmN0aW9uIGNsb25lRGF0ZTxEYXRlVHlwZSBleHRlbmRzIERhdGUoZGF0ZTogRGF0ZVR5cGUpOiBEYXRlVHlwZSB7XG4gKiAgIHJldHVybiBjb25zdHJ1Y3RGcm9tKFxuICogICAgIGRhdGUsIC8vIFVzZSBjb250cnVzdG9yIGZyb20gdGhlIGdpdmVuIGRhdGVcbiAqICAgICBkYXRlLmdldFRpbWUoKSAvLyBVc2UgdGhlIGRhdGUgdmFsdWUgdG8gY3JlYXRlIGEgbmV3IGRhdGVcbiAqICAgKVxuICogfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0RnJvbShkYXRlLCB2YWx1ZSkge1xuICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gbmV3IGRhdGUuY29uc3RydWN0b3IodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBjb25zdHJ1Y3RGcm9tO1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20ubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZlllYXJcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZZZWFyKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMDApKVxuICogLy89PiBXZWQgSmFuIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZZZWFyKGRhdGUpIHtcbiAgY29uc3QgY2xlYW5EYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBfZGF0ZSA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIF9kYXRlLnNldEZ1bGxZZWFyKGNsZWFuRGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAxKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mWWVhcjtcbiIsImltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyB9IGZyb20gXCIuL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZZZWFyIH0gZnJvbSBcIi4vc3RhcnRPZlllYXIubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgZ2V0RGF5T2ZZZWFyXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgZGF5IG9mIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBkYXkgb2YgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBkYXkgb2YgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBkYXkgb2YgdGhlIHllYXIgaXMgMiBKdWx5IDIwMTQ/XG4gKiBjb25zdCByZXN1bHQgPSBnZXREYXlPZlllYXIobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IDE4M1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZZZWFyKGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRpZmYgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoX2RhdGUsIHN0YXJ0T2ZZZWFyKF9kYXRlKSk7XG4gIGNvbnN0IGRheU9mWWVhciA9IGRpZmYgKyAxO1xuICByZXR1cm4gZGF5T2ZZZWFyO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldERheU9mWWVhcjtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIHN0YXJ0T2ZXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZldlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU3VuIEF1ZyAzMSAyMDE0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBzdGFydCBvZiB0aGUgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCksIHsgd2Vla1N0YXJ0c09uOiAxIH0pXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZldlZWsoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IHdlZWtTdGFydHNPbiA9XG4gICAgb3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIDA7XG5cbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRheSA9IF9kYXRlLmdldERheSgpO1xuICBjb25zdCBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcblxuICBfZGF0ZS5zZXREYXRlKF9kYXRlLmdldERhdGUoKSAtIGRpZmYpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZXZWVrO1xuIiwiaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mSVNPV2Vla1xuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBJU08gd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhbiBJU08gd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZJU09XZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZklTT1dlZWsoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwgeyB3ZWVrU3RhcnRzT246IDEgfSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZklTT1dlZWs7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgZ2V0SVNPV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZSxcbiAqIHdoaWNoIGFsd2F5cyBzdGFydHMgMyBkYXlzIGJlZm9yZSB0aGUgeWVhcidzIGZpcnN0IFRodXJzZGF5LlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIElTTy13ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0SVNPV2Vla1llYXIobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDIwMDRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElTT1dlZWtZZWFyKGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldEZ1bGxZZWFyKHllYXIgKyAxLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhcik7XG5cbiAgY29uc3QgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIpO1xuXG4gIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZlRoaXNZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldElTT1dlZWtZZWFyO1xuIiwiaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi9nZXRJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mSVNPV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNTpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZJU09XZWVrWWVhcihuZXcgRGF0ZSgyMDA1LCA2LCAyKSlcbiAqIC8vPT4gTW9uIEphbiAwMyAyMDA1IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mSVNPV2Vla1llYXIoZGF0ZSkge1xuICBjb25zdCB5ZWFyID0gZ2V0SVNPV2Vla1llYXIoZGF0ZSk7XG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeSA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5KTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mSVNPV2Vla1llYXI7XG4iLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbldlZWsgfSBmcm9tIFwiLi9jb25zdGFudHMubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mSVNPV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZklTT1dlZWtZZWFyIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWtZZWFyLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGdldElTT1dlZWtcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIElTTyB3ZWVrIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBJU08gd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB3ZWVrIG9mIHRoZSBJU08td2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldElTT1dlZWsobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDUzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJU09XZWVrKGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRpZmYgPVxuICAgIHN0YXJ0T2ZJU09XZWVrKF9kYXRlKS5nZXRUaW1lKCkgLSBzdGFydE9mSVNPV2Vla1llYXIoX2RhdGUpLmdldFRpbWUoKTtcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gbWlsbGlzZWNvbmRzSW5XZWVrKSArIDE7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0SVNPV2VlaztcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGdldFdlZWtZZWFyfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZ2V0V2Vla1llYXJcbiAqIEBjYXRlZ29yeSBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBleGFjdCBjYWxjdWxhdGlvbiBkZXBlbmRzIG9uIHRoZSB2YWx1ZXMgb2ZcbiAqIGBvcHRpb25zLndlZWtTdGFydHNPbmAgKHdoaWNoIGlzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrKVxuICogYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKHdoaWNoIGlzIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXMgYWx3YXlzIGluXG4gKiB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhcilcbiAqXG4gKiBXZWVrIG51bWJlcmluZzogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2VlayNUaGVfSVNPX3dlZWtfZGF0ZV9zeXN0ZW1cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMgVGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IHdpdGggdGhlIGRlZmF1bHQgc2V0dGluZ3M/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrWWVhcihuZXcgRGF0ZSgyMDA0LCAxMSwgMjYpKVxuICogLy89PiAyMDA1XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMjYgRGVjZW1iZXIgMjAwNCBpZiB3ZWVrIHN0YXJ0cyBvbiBTYXR1cmRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgd2Vla1N0YXJ0c09uOiA2IH0pXG4gKiAvLz0+IDIwMDRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IGlmIHRoZSBmaXJzdCB3ZWVrIGNvbnRhaW5zIDQgSmFudWFyeT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0IH0pXG4gKiAvLz0+IDIwMDRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtZZWFyKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCBmaXJzdFdlZWtPZk5leHRZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZOZXh0WWVhciwgb3B0aW9ucyk7XG5cbiAgY29uc3QgZmlyc3RXZWVrT2ZUaGlzWWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZUaGlzWWVhciwgb3B0aW9ucyk7XG5cbiAgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2Vla1llYXI7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcbmltcG9ydCB7IGdldFdlZWtZZWFyIH0gZnJvbSBcIi4vZ2V0V2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrLm1qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgc3RhcnRPZldlZWtZZWFyfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZldlZWtZZWFyXG4gKiBAY2F0ZWdvcnkgV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhci5cbiAqIFRoZSBleGFjdCBjYWxjdWxhdGlvbiBkZXBlbmRzIG9uIHRoZSB2YWx1ZXMgb2ZcbiAqIGBvcHRpb25zLndlZWtTdGFydHNPbmAgKHdoaWNoIGlzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrKVxuICogYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKHdoaWNoIGlzIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXMgYWx3YXlzIGluXG4gKiB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhcilcbiAqXG4gKiBXZWVrIG51bWJlcmluZzogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2VlayNUaGVfSVNPX3dlZWtfZGF0ZV9zeXN0ZW1cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhbiBhIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIDIgSnVseSAyMDA1IHdpdGggZGVmYXVsdCBzZXR0aW5nczpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrWWVhcihuZXcgRGF0ZSgyMDA1LCA2LCAyKSlcbiAqIC8vPT4gU3VuIERlYyAyNiAyMDA0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIDIgSnVseSAyMDA1XG4gKiAvLyBpZiBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB3ZWVrXG4gKiAvLyBhbmQgNCBKYW51YXJ5IGlzIGFsd2F5cyBpbiB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhcjpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrWWVhcihuZXcgRGF0ZSgyMDA1LCA2LCAyKSwge1xuICogICB3ZWVrU3RhcnRzT246IDEsXG4gKiAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogNFxuICogfSlcbiAqIC8vPT4gTW9uIEphbiAwMyAyMDA1IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mV2Vla1llYXIoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9XG4gICAgb3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIDE7XG5cbiAgY29uc3QgeWVhciA9IGdldFdlZWtZZWFyKGRhdGUsIG9wdGlvbnMpO1xuICBjb25zdCBmaXJzdFdlZWsgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmaXJzdFdlZWsuc2V0RnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb25zdCBfZGF0ZSA9IHN0YXJ0T2ZXZWVrKGZpcnN0V2Vlaywgb3B0aW9ucyk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mV2Vla1llYXI7XG4iLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbldlZWsgfSBmcm9tIFwiLi9jb25zdGFudHMubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWtZZWFyIH0gZnJvbSBcIi4vc3RhcnRPZldlZWtZZWFyLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZ2V0V2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGdldFdlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbG9jYWwgd2VlayBpbmRleCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbG9jYWwgd2VlayBpbmRleCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBleGFjdCBjYWxjdWxhdGlvbiBkZXBlbmRzIG9uIHRoZSB2YWx1ZXMgb2ZcbiAqIGBvcHRpb25zLndlZWtTdGFydHNPbmAgKHdoaWNoIGlzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrKVxuICogYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKHdoaWNoIGlzIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXMgYWx3YXlzIGluXG4gKiB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhcilcbiAqXG4gKiBXZWVrIG51bWJlcmluZzogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2VlayNUaGVfSVNPX3dlZWtfZGF0ZV9zeXN0ZW1cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB3ZWVrIG9mIHRoZSBsb2NhbCB3ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1IHdpdGggZGVmYXVsdCBvcHRpb25zP1xuICogY29uc3QgcmVzdWx0ID0gZ2V0V2VlayhuZXcgRGF0ZSgyMDA1LCAwLCAyKSlcbiAqIC8vPT4gMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB3ZWVrIG9mIHRoZSBsb2NhbCB3ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1LFxuICogLy8gaWYgTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWssXG4gKiAvLyBhbmQgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIgYWx3YXlzIGNvbnRhaW5zIDQgSmFudWFyeT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWsobmV3IERhdGUoMjAwNSwgMCwgMiksIHtcbiAqICAgd2Vla1N0YXJ0c09uOiAxLFxuICogICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDRcbiAqIH0pXG4gKiAvLz0+IDUzXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWsoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGlmZiA9XG4gICAgc3RhcnRPZldlZWsoX2RhdGUsIG9wdGlvbnMpLmdldFRpbWUoKSAtXG4gICAgc3RhcnRPZldlZWtZZWFyKF9kYXRlLCBvcHRpb25zKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIG1pbGxpc2Vjb25kc0luV2VlaykgKyAxO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldFdlZWs7XG4iLCJleHBvcnQgZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIGNvbnN0IHNpZ24gPSBudW1iZXIgPCAwID8gXCItXCIgOiBcIlwiO1xuICBjb25zdCBvdXRwdXQgPSBNYXRoLmFicyhudW1iZXIpLnRvU3RyaW5nKCkucGFkU3RhcnQodGFyZ2V0TGVuZ3RoLCBcIjBcIik7XG4gIHJldHVybiBzaWduICsgb3V0cHV0O1xufVxuIiwiaW1wb3J0IHsgYWRkTGVhZGluZ1plcm9zIH0gZnJvbSBcIi4uL2FkZExlYWRpbmdaZXJvcy5tanNcIjtcblxuLypcbiAqIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGEgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEEqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGQgIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgIHwgIEQgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGggIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgIHwgIEggIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG0gIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE0gIHwgTW9udGggICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHMgIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgIHwgIFMgIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgIHxcbiAqIHwgIHkgIHwgWWVhciAoYWJzKSAgICAgICAgICAgICAgICAgICAgIHwgIFkgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiBMZXR0ZXJzIG1hcmtlZCBieSAqIGFyZSBub3QgaW1wbGVtZW50ZWQgYnV0IHJlc2VydmVkIGJ5IFVuaWNvZGUgc3RhbmRhcmQuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGxpZ2h0Rm9ybWF0dGVycyA9IHtcbiAgLy8gWWVhclxuICB5KGRhdGUsIHRva2VuKSB7XG4gICAgLy8gRnJvbSBodHRwOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LTMxL3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0Zvcm1hdF90b2tlbnNcbiAgICAvLyB8IFllYXIgICAgIHwgICAgIHkgfCB5eSB8ICAgeXl5IHwgIHl5eXkgfCB5eXl5eSB8XG4gICAgLy8gfC0tLS0tLS0tLS18LS0tLS0tLXwtLS0tfC0tLS0tLS18LS0tLS0tLXwtLS0tLS0tfFxuICAgIC8vIHwgQUQgMSAgICAgfCAgICAgMSB8IDAxIHwgICAwMDEgfCAgMDAwMSB8IDAwMDAxIHxcbiAgICAvLyB8IEFEIDEyICAgIHwgICAgMTIgfCAxMiB8ICAgMDEyIHwgIDAwMTIgfCAwMDAxMiB8XG4gICAgLy8gfCBBRCAxMjMgICB8ICAgMTIzIHwgMjMgfCAgIDEyMyB8ICAwMTIzIHwgMDAxMjMgfFxuICAgIC8vIHwgQUQgMTIzNCAgfCAgMTIzNCB8IDM0IHwgIDEyMzQgfCAgMTIzNCB8IDAxMjM0IHxcbiAgICAvLyB8IEFEIDEyMzQ1IHwgMTIzNDUgfCA0NSB8IDEyMzQ1IHwgMTIzNDUgfCAxMjM0NSB8XG5cbiAgICBjb25zdCBzaWduZWRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgY29uc3QgeWVhciA9IHNpZ25lZFllYXIgPiAwID8gc2lnbmVkWWVhciA6IDEgLSBzaWduZWRZZWFyO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModG9rZW4gPT09IFwieXlcIiA/IHllYXIgJSAxMDAgOiB5ZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIE1vbnRoXG4gIE0oZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICByZXR1cm4gdG9rZW4gPT09IFwiTVwiID8gU3RyaW5nKG1vbnRoICsgMSkgOiBhZGRMZWFkaW5nWmVyb3MobW9udGggKyAxLCAyKTtcbiAgfSxcblxuICAvLyBEYXkgb2YgdGhlIG1vbnRoXG4gIGQoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RGF0ZSgpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEFNIG9yIFBNXG4gIGEoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXRlLmdldEhvdXJzKCkgLyAxMiA+PSAxID8gXCJwbVwiIDogXCJhbVwiO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcImFcIjpcbiAgICAgIGNhc2UgXCJhYVwiOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjYXNlIFwiYWFhXCI6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgICBjYXNlIFwiYWFhYWFcIjpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZVswXTtcbiAgICAgIGNhc2UgXCJhYWFhXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlID09PSBcImFtXCIgPyBcImEubS5cIiA6IFwicC5tLlwiO1xuICAgIH1cbiAgfSxcblxuICAvLyBIb3VyIFsxLTEyXVxuICBoKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldEhvdXJzKCkgJSAxMiB8fCAxMiwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBIb3VyIFswLTIzXVxuICBIKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldEhvdXJzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTWludXRlXG4gIG0oZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0TWludXRlcygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIFNlY29uZFxuICBzKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFNlY29uZHMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUyhkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IG51bWJlck9mRGlnaXRzID0gdG9rZW4ubGVuZ3RoO1xuICAgIGNvbnN0IG1pbGxpc2Vjb25kcyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gICAgY29uc3QgZnJhY3Rpb25hbFNlY29uZHMgPSBNYXRoLmZsb29yKFxuICAgICAgbWlsbGlzZWNvbmRzICogTWF0aC5wb3coMTAsIG51bWJlck9mRGlnaXRzIC0gMyksXG4gICAgKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGZyYWN0aW9uYWxTZWNvbmRzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxufTtcbiIsImltcG9ydCB7IGdldERheU9mWWVhciB9IGZyb20gXCIuLi8uLi9nZXREYXlPZlllYXIubWpzXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrIH0gZnJvbSBcIi4uLy4uL2dldElTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrWWVhciB9IGZyb20gXCIuLi8uLi9nZXRJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IGdldFdlZWsgfSBmcm9tIFwiLi4vLi4vZ2V0V2Vlay5tanNcIjtcbmltcG9ydCB7IGdldFdlZWtZZWFyIH0gZnJvbSBcIi4uLy4uL2dldFdlZWtZZWFyLm1qc1wiO1xuaW1wb3J0IHsgYWRkTGVhZGluZ1plcm9zIH0gZnJvbSBcIi4uL2FkZExlYWRpbmdaZXJvcy5tanNcIjtcbmltcG9ydCB7IGxpZ2h0Rm9ybWF0dGVycyB9IGZyb20gXCIuL2xpZ2h0Rm9ybWF0dGVycy5tanNcIjtcblxuY29uc3QgZGF5UGVyaW9kRW51bSA9IHtcbiAgYW06IFwiYW1cIixcbiAgcG06IFwicG1cIixcbiAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgbm9vbjogXCJub29uXCIsXG4gIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICBhZnRlcm5vb246IFwiYWZ0ZXJub29uXCIsXG4gIGV2ZW5pbmc6IFwiZXZlbmluZ1wiLFxuICBuaWdodDogXCJuaWdodFwiLFxufTtcblxuLypcbiAqIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGEgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEEqIHwgTWlsbGlzZWNvbmRzIGluIGRheSAgICAgICAgICAgIHxcbiAqIHwgIGIgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgIHwgIEIgIHwgRmxleGlibGUgZGF5IHBlcmlvZCAgICAgICAgICAgIHxcbiAqIHwgIGMgIHwgU3RhbmQtYWxvbmUgbG9jYWwgZGF5IG9mIHdlZWsgIHwgIEMqIHwgTG9jYWxpemVkIGhvdXIgdy8gZGF5IHBlcmlvZCAgIHxcbiAqIHwgIGQgIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgIHwgIEQgIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGUgIHwgTG9jYWwgZGF5IG9mIHdlZWsgICAgICAgICAgICAgIHwgIEUgIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGYgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEYqIHwgRGF5IG9mIHdlZWsgaW4gbW9udGggICAgICAgICAgIHxcbiAqIHwgIGcqIHwgTW9kaWZpZWQgSnVsaWFuIGRheSAgICAgICAgICAgIHwgIEcgIHwgRXJhICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGggIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgIHwgIEggIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGkhIHwgSVNPIGRheSBvZiB3ZWVrICAgICAgICAgICAgICAgIHwgIEkhIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgIHxcbiAqIHwgIGoqIHwgTG9jYWxpemVkIGhvdXIgdy8gZGF5IHBlcmlvZCAgIHwgIEoqIHwgTG9jYWxpemVkIGhvdXIgdy9vIGRheSBwZXJpb2QgIHxcbiAqIHwgIGsgIHwgSG91ciBbMS0yNF0gICAgICAgICAgICAgICAgICAgIHwgIEsgIHwgSG91ciBbMC0xMV0gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGwqIHwgKGRlcHJlY2F0ZWQpICAgICAgICAgICAgICAgICAgIHwgIEwgIHwgU3RhbmQtYWxvbmUgbW9udGggICAgICAgICAgICAgIHxcbiAqIHwgIG0gIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE0gIHwgTW9udGggICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG4gIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE4gIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG8hIHwgT3JkaW5hbCBudW1iZXIgbW9kaWZpZXIgICAgICAgIHwgIE8gIHwgVGltZXpvbmUgKEdNVCkgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHAhIHwgTG9uZyBsb2NhbGl6ZWQgdGltZSAgICAgICAgICAgIHwgIFAhIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgIHxcbiAqIHwgIHEgIHwgU3RhbmQtYWxvbmUgcXVhcnRlciAgICAgICAgICAgIHwgIFEgIHwgUXVhcnRlciAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHIqIHwgUmVsYXRlZCBHcmVnb3JpYW4geWVhciAgICAgICAgIHwgIFIhIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgIHxcbiAqIHwgIHMgIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgIHwgIFMgIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgIHxcbiAqIHwgIHQhIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgICAgIHwgIFQhIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgIHxcbiAqIHwgIHUgIHwgRXh0ZW5kZWQgeWVhciAgICAgICAgICAgICAgICAgIHwgIFUqIHwgQ3ljbGljIHllYXIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHYqIHwgVGltZXpvbmUgKGdlbmVyaWMgbm9uLWxvY2F0LikgIHwgIFYqIHwgVGltZXpvbmUgKGxvY2F0aW9uKSAgICAgICAgICAgIHxcbiAqIHwgIHcgIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgIHwgIFcqIHwgV2VlayBvZiBtb250aCAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHggIHwgVGltZXpvbmUgKElTTy04NjAxIHcvbyBaKSAgICAgIHwgIFggIHwgVGltZXpvbmUgKElTTy04NjAxKSAgICAgICAgICAgIHxcbiAqIHwgIHkgIHwgWWVhciAoYWJzKSAgICAgICAgICAgICAgICAgICAgIHwgIFkgIHwgTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciAgICAgIHxcbiAqIHwgIHogIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pIHwgIFoqIHwgVGltZXpvbmUgKGFsaWFzZXMpICAgICAgICAgICAgIHxcbiAqXG4gKiBMZXR0ZXJzIG1hcmtlZCBieSAqIGFyZSBub3QgaW1wbGVtZW50ZWQgYnV0IHJlc2VydmVkIGJ5IFVuaWNvZGUgc3RhbmRhcmQuXG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgISBhcmUgbm9uLXN0YW5kYXJkLCBidXQgaW1wbGVtZW50ZWQgYnkgZGF0ZS1mbnM6XG4gKiAtIGBvYCBtb2RpZmllcyB0aGUgcHJldmlvdXMgdG9rZW4gdG8gdHVybiBpdCBpbnRvIGFuIG9yZGluYWwgKHNlZSBgZm9ybWF0YCBkb2NzKVxuICogLSBgaWAgaXMgSVNPIGRheSBvZiB3ZWVrLiBGb3IgYGlgIGFuZCBgaWlgIGlzIHJldHVybnMgbnVtZXJpYyBJU08gd2VlayBkYXlzLFxuICogICBpLmUuIDcgZm9yIFN1bmRheSwgMSBmb3IgTW9uZGF5LCBldGMuXG4gKiAtIGBJYCBpcyBJU08gd2VlayBvZiB5ZWFyLCBhcyBvcHBvc2VkIHRvIGB3YCB3aGljaCBpcyBsb2NhbCB3ZWVrIG9mIHllYXIuXG4gKiAtIGBSYCBpcyBJU08gd2Vlay1udW1iZXJpbmcgeWVhciwgYXMgb3Bwb3NlZCB0byBgWWAgd2hpY2ggaXMgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhci5cbiAqICAgYFJgIGlzIHN1cHBvc2VkIHRvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgSWAgYW5kIGBpYFxuICogICBmb3IgdW5pdmVyc2FsIElTTyB3ZWVrLW51bWJlcmluZyBkYXRlLCB3aGVyZWFzXG4gKiAgIGBZYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYHdgIGFuZCBgZWBcbiAqICAgZm9yIHdlZWstbnVtYmVyaW5nIGRhdGUgc3BlY2lmaWMgdG8gdGhlIGxvY2FsZS5cbiAqIC0gYFBgIGlzIGxvbmcgbG9jYWxpemVkIGRhdGUgZm9ybWF0XG4gKiAtIGBwYCBpcyBsb25nIGxvY2FsaXplZCB0aW1lIGZvcm1hdFxuICovXG5cbmV4cG9ydCBjb25zdCBmb3JtYXR0ZXJzID0ge1xuICAvLyBFcmFcbiAgRzogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGVyYSA9IGRhdGUuZ2V0RnVsbFllYXIoKSA+IDAgPyAxIDogMDtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBBRCwgQkNcbiAgICAgIGNhc2UgXCJHXCI6XG4gICAgICBjYXNlIFwiR0dcIjpcbiAgICAgIGNhc2UgXCJHR0dcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHsgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIiB9KTtcbiAgICAgIC8vIEEsIEJcbiAgICAgIGNhc2UgXCJHR0dHR1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwgeyB3aWR0aDogXCJuYXJyb3dcIiB9KTtcbiAgICAgIC8vIEFubm8gRG9taW5pLCBCZWZvcmUgQ2hyaXN0XG4gICAgICBjYXNlIFwiR0dHR1wiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHsgd2lkdGg6IFwid2lkZVwiIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBZZWFyXG4gIHk6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gXCJ5b1wiKSB7XG4gICAgICBjb25zdCBzaWduZWRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICAgIGNvbnN0IHllYXIgPSBzaWduZWRZZWFyID4gMCA/IHNpZ25lZFllYXIgOiAxIC0gc2lnbmVkWWVhcjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHllYXIsIHsgdW5pdDogXCJ5ZWFyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy55KGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gIFk6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBzaWduZWRXZWVrWWVhciA9IGdldFdlZWtZZWFyKGRhdGUsIG9wdGlvbnMpO1xuICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgY29uc3Qgd2Vla1llYXIgPSBzaWduZWRXZWVrWWVhciA+IDAgPyBzaWduZWRXZWVrWWVhciA6IDEgLSBzaWduZWRXZWVrWWVhcjtcblxuICAgIC8vIFR3byBkaWdpdCB5ZWFyXG4gICAgaWYgKHRva2VuID09PSBcIllZXCIpIHtcbiAgICAgIGNvbnN0IHR3b0RpZ2l0WWVhciA9IHdlZWtZZWFyICUgMTAwO1xuICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0d29EaWdpdFllYXIsIDIpO1xuICAgIH1cblxuICAgIC8vIE9yZGluYWwgbnVtYmVyXG4gICAgaWYgKHRva2VuID09PSBcIllvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHdlZWtZZWFyLCB7IHVuaXQ6IFwieWVhclwiIH0pO1xuICAgIH1cblxuICAgIC8vIFBhZGRpbmdcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWtZZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gIFI6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IGlzb1dlZWtZZWFyID0gZ2V0SVNPV2Vla1llYXIoZGF0ZSk7XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29XZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBFeHRlbmRlZCB5ZWFyLiBUaGlzIGlzIGEgc2luZ2xlIG51bWJlciBkZXNpZ25hdGluZyB0aGUgeWVhciBvZiB0aGlzIGNhbGVuZGFyIHN5c3RlbS5cbiAgLy8gVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGB5YCBhbmQgYHVgIGxvY2FsaXplcnMgYXJlIEIuQy4geWVhcnM6XG4gIC8vIHwgWWVhciB8IGB5YCB8IGB1YCB8XG4gIC8vIHwtLS0tLS18LS0tLS18LS0tLS18XG4gIC8vIHwgQUMgMSB8ICAgMSB8ICAgMSB8XG4gIC8vIHwgQkMgMSB8ICAgMSB8ICAgMCB8XG4gIC8vIHwgQkMgMiB8ICAgMiB8ICAtMSB8XG4gIC8vIEFsc28gYHl5YCBhbHdheXMgcmV0dXJucyB0aGUgbGFzdCB0d28gZGlnaXRzIG9mIGEgeWVhcixcbiAgLy8gd2hpbGUgYHV1YCBwYWRzIHNpbmdsZSBkaWdpdCB5ZWFycyB0byAyIGNoYXJhY3RlcnMgYW5kIHJldHVybnMgb3RoZXIgeWVhcnMgdW5jaGFuZ2VkLlxuICB1OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoeWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBRdWFydGVyXG4gIFE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldE1vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgXCJRXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSBcIlFRXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgXCJRb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7IHVuaXQ6IFwicXVhcnRlclwiIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgXCJRUVFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlIFwiUVFRUVFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlIFwiUVFRUVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIHF1YXJ0ZXJcbiAgcTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IHF1YXJ0ZXIgPSBNYXRoLmNlaWwoKGRhdGUuZ2V0TW9udGgoKSArIDEpIC8gMyk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgMywgNFxuICAgICAgY2FzZSBcInFcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhxdWFydGVyKTtcbiAgICAgIC8vIDAxLCAwMiwgMDMsIDA0XG4gICAgICBjYXNlIFwicXFcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhxdWFydGVyLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAzcmQsIDR0aFxuICAgICAgY2FzZSBcInFvXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHF1YXJ0ZXIsIHsgdW5pdDogXCJxdWFydGVyXCIgfSk7XG4gICAgICAvLyBRMSwgUTIsIFEzLCBRNFxuICAgICAgY2FzZSBcInFxcVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyAxLCAyLCAzLCA0IChuYXJyb3cgcXVhcnRlcjsgY291bGQgYmUgbm90IG51bWVyaWNhbClcbiAgICAgIGNhc2UgXCJxcXFxcVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi5cbiAgICAgIGNhc2UgXCJxcXFxXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gTW9udGhcbiAgTTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgXCJNXCI6XG4gICAgICBjYXNlIFwiTU1cIjpcbiAgICAgICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5NKGRhdGUsIHRva2VuKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDEydGhcbiAgICAgIGNhc2UgXCJNb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihtb250aCArIDEsIHsgdW5pdDogXCJtb250aFwiIH0pO1xuICAgICAgLy8gSmFuLCBGZWIsIC4uLiwgRGVjXG4gICAgICBjYXNlIFwiTU1NXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gSiwgRiwgLi4uLCBEXG4gICAgICBjYXNlIFwiTU1NTU1cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgICAgIGNhc2UgXCJNTU1NXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHsgd2lkdGg6IFwid2lkZVwiLCBjb250ZXh0OiBcImZvcm1hdHRpbmdcIiB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gU3RhbmQtYWxvbmUgbW9udGhcbiAgTDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcobW9udGggKyAxKTtcbiAgICAgIC8vIDAxLCAwMiwgLi4uLCAxMlxuICAgICAgY2FzZSBcIkxMXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobW9udGggKyAxLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDEydGhcbiAgICAgIGNhc2UgXCJMb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihtb250aCArIDEsIHsgdW5pdDogXCJtb250aFwiIH0pO1xuICAgICAgLy8gSmFuLCBGZWIsIC4uLiwgRGVjXG4gICAgICBjYXNlIFwiTExMXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gSiwgRiwgLi4uLCBEXG4gICAgICBjYXNlIFwiTExMTExcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgICAgIGNhc2UgXCJMTExMXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHsgd2lkdGg6IFwid2lkZVwiLCBjb250ZXh0OiBcInN0YW5kYWxvbmVcIiB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gTG9jYWwgd2VlayBvZiB5ZWFyXG4gIHc6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB3ZWVrID0gZ2V0V2VlayhkYXRlLCBvcHRpb25zKTtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJ3b1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrLCB7IHVuaXQ6IFwid2Vla1wiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3Mod2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBJU08gd2VlayBvZiB5ZWFyXG4gIEk6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBpc29XZWVrID0gZ2V0SVNPV2VlayhkYXRlKTtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJJb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29XZWVrLCB7IHVuaXQ6IFwid2Vla1wiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBEYXkgb2YgdGhlIG1vbnRoXG4gIGQ6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwiZG9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXREYXRlKCksIHsgdW5pdDogXCJkYXRlXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5kKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhclxuICBEOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZZZWFyID0gZ2V0RGF5T2ZZZWFyKGRhdGUpO1xuXG4gICAgaWYgKHRva2VuID09PSBcIkRvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRheU9mWWVhciwgeyB1bml0OiBcImRheU9mWWVhclwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF5T2ZZZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrXG4gIEU6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSBcIkVcIjpcbiAgICAgIGNhc2UgXCJFRVwiOlxuICAgICAgY2FzZSBcIkVFRVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcIkVFRUVFXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJFRUVFRUVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJFRUVFXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIExvY2FsIGRheSBvZiB3ZWVrXG4gIGU6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChOdGggZGF5IG9mIHdlZWsgd2l0aCBjdXJyZW50IGxvY2FsZSBvciB3ZWVrU3RhcnRzT24pXG4gICAgICBjYXNlIFwiZVwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGxvY2FsRGF5T2ZXZWVrKTtcbiAgICAgIC8vIFBhZGRlZCBudW1lcmljYWwgdmFsdWVcbiAgICAgIGNhc2UgXCJlZVwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGxvY2FsRGF5T2ZXZWVrLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDd0aFxuICAgICAgY2FzZSBcImVvXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGxvY2FsRGF5T2ZXZWVrLCB7IHVuaXQ6IFwiZGF5XCIgfSk7XG4gICAgICBjYXNlIFwiZWVlXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlIFwiZWVlZWVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSBcImVlZWVlZVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcInNob3J0XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSBcImVlZWVcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gU3RhbmQtYWxvbmUgbG9jYWwgZGF5IG9mIHdlZWtcbiAgYzogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgY29uc3QgbG9jYWxEYXlPZldlZWsgPSAoZGF5T2ZXZWVrIC0gb3B0aW9ucy53ZWVrU3RhcnRzT24gKyA4KSAlIDcgfHwgNztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBOdW1lcmljYWwgdmFsdWUgKHNhbWUgYXMgaW4gYGVgKVxuICAgICAgY2FzZSBcImNcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlIFwiY2NcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDd0aFxuICAgICAgY2FzZSBcImNvXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGxvY2FsRGF5T2ZXZWVrLCB7IHVuaXQ6IFwiZGF5XCIgfSk7XG4gICAgICBjYXNlIFwiY2NjXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlIFwiY2NjY2NcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSBcImNjY2NjY1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcInNob3J0XCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSBcImNjY2NcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSVNPIGRheSBvZiB3ZWVrXG4gIGk6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGlzb0RheU9mV2VlayA9IGRheU9mV2VlayA9PT0gMCA/IDcgOiBkYXlPZldlZWs7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMlxuICAgICAgY2FzZSBcImlcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhpc29EYXlPZldlZWspO1xuICAgICAgLy8gMDJcbiAgICAgIGNhc2UgXCJpaVwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb0RheU9mV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgICAgIC8vIDJuZFxuICAgICAgY2FzZSBcImlvXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGlzb0RheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgLy8gVHVlXG4gICAgICBjYXNlIFwiaWlpXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlIFwiaWlpaWlcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSBcImlpaWlpaVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcInNob3J0XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSBcImlpaWlcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQU0gb3IgUE1cbiAgYTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/IFwicG1cIiA6IFwiYW1cIjtcblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICBjYXNlIFwiYWFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJhYWFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplXG4gICAgICAgICAgLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FzZSBcImFhYWFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcImFhYWFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQU0sIFBNLCBtaWRuaWdodCwgbm9vblxuICBiOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgbGV0IGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5taWRuaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gaG91cnMgLyAxMiA+PSAxID8gXCJwbVwiIDogXCJhbVwiO1xuICAgIH1cblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgXCJiXCI6XG4gICAgICBjYXNlIFwiYmJcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJiYmJcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplXG4gICAgICAgICAgLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FzZSBcImJiYmJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcImJiYmJcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gaW4gdGhlIG1vcm5pbmcsIGluIHRoZSBhZnRlcm5vb24sIGluIHRoZSBldmVuaW5nLCBhdCBuaWdodFxuICBCOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgbGV0IGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICBpZiAoaG91cnMgPj0gMTcpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0uZXZlbmluZztcbiAgICB9IGVsc2UgaWYgKGhvdXJzID49IDEyKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmFmdGVybm9vbjtcbiAgICB9IGVsc2UgaWYgKGhvdXJzID49IDQpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubW9ybmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5uaWdodDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiQlwiOlxuICAgICAgY2FzZSBcIkJCXCI6XG4gICAgICBjYXNlIFwiQkJCXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiQkJCQkJcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiQkJCQlwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBIb3VyIFsxLTEyXVxuICBoOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcImhvXCIpIHtcbiAgICAgIGxldCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKSAlIDEyO1xuICAgICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDEyO1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHsgdW5pdDogXCJob3VyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5oKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBIb3VyIFswLTIzXVxuICBIOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcIkhvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0SG91cnMoKSwgeyB1bml0OiBcImhvdXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLkgoZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIEhvdXIgWzAtMTFdXG4gIEs6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKSAlIDEyO1xuXG4gICAgaWYgKHRva2VuID09PSBcIktvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSG91ciBbMS0yNF1cbiAgazogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGxldCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBpZiAoaG91cnMgPT09IDApIGhvdXJzID0gMjQ7XG5cbiAgICBpZiAodG9rZW4gPT09IFwia29cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHsgdW5pdDogXCJob3VyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhob3VycywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNaW51dGVcbiAgbTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJtb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldE1pbnV0ZXMoKSwgeyB1bml0OiBcIm1pbnV0ZVwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMubShkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gU2Vjb25kXG4gIHM6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwic29cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRTZWNvbmRzKCksIHsgdW5pdDogXCJzZWNvbmRcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLnMoZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIEZyYWN0aW9uIG9mIHNlY29uZFxuICBTOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLlMoZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIFRpbWV6b25lIChJU08tODYwMS4gSWYgb2Zmc2V0IGlzIDAsIG91dHB1dCBpcyBhbHdheXMgYCdaJ2ApXG4gIFg6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIGlmICh0aW1lem9uZU9mZnNldCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFwiWlwiO1xuICAgIH1cblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEhvdXJzIGFuZCBvcHRpb25hbCBtaW51dGVzXG4gICAgICBjYXNlIFwiWFwiOlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgWFhgXG4gICAgICBjYXNlIFwiWFhYWFwiOlxuICAgICAgY2FzZSBcIlhYXCI6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWFhgXG4gICAgICBjYXNlIFwiWFhYWFhcIjpcbiAgICAgIGNhc2UgXCJYWFhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gVGltZXpvbmUgKElTTy04NjAxLiBJZiBvZmZzZXQgaXMgMCwgb3V0cHV0IGlzIGAnKzAwOjAwJ2Agb3IgZXF1aXZhbGVudClcbiAgeDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICBjb25zdCB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgXCJ4XCI6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eGBcbiAgICAgIGNhc2UgXCJ4eHh4XCI6XG4gICAgICBjYXNlIFwieHhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYHh4eGBcbiAgICAgIGNhc2UgXCJ4eHh4eFwiOlxuICAgICAgY2FzZSBcInh4eFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoR01UKVxuICBPOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBTaG9ydFxuICAgICAgY2FzZSBcIk9cIjpcbiAgICAgIGNhc2UgXCJPT1wiOlxuICAgICAgY2FzZSBcIk9PT1wiOlxuICAgICAgICByZXR1cm4gXCJHTVRcIiArIGZvcm1hdFRpbWV6b25lU2hvcnQodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICAgIC8vIExvbmdcbiAgICAgIGNhc2UgXCJPT09PXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gXCJHTVRcIiArIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXRpb24pXG4gIHo6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFNob3J0XG4gICAgICBjYXNlIFwielwiOlxuICAgICAgY2FzZSBcInp6XCI6XG4gICAgICBjYXNlIFwienp6XCI6XG4gICAgICAgIHJldHVybiBcIkdNVFwiICsgZm9ybWF0VGltZXpvbmVTaG9ydCh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgICAgLy8gTG9uZ1xuICAgICAgY2FzZSBcInp6enpcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBcIkdNVFwiICsgZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXBcbiAgdDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gIFQ6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXN0YW1wID0gb3JpZ2luYWxEYXRlLmdldFRpbWUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lU2hvcnQob2Zmc2V0LCBkZWxpbWl0ZXIgPSBcIlwiKSB7XG4gIGNvbnN0IHNpZ24gPSBvZmZzZXQgPiAwID8gXCItXCIgOiBcIitcIjtcbiAgY29uc3QgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKTtcbiAgY29uc3QgbWludXRlcyA9IGFic09mZnNldCAlIDYwO1xuICBpZiAobWludXRlcyA9PT0gMCkge1xuICAgIHJldHVybiBzaWduICsgU3RyaW5nKGhvdXJzKTtcbiAgfVxuICByZXR1cm4gc2lnbiArIFN0cmluZyhob3VycykgKyBkZWxpbWl0ZXIgKyBhZGRMZWFkaW5nWmVyb3MobWludXRlcywgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyhvZmZzZXQsIGRlbGltaXRlcikge1xuICBpZiAob2Zmc2V0ICUgNjAgPT09IDApIHtcbiAgICBjb25zdCBzaWduID0gb2Zmc2V0ID4gMCA/IFwiLVwiIDogXCIrXCI7XG4gICAgcmV0dXJuIHNpZ24gKyBhZGRMZWFkaW5nWmVyb3MoTWF0aC5hYnMob2Zmc2V0KSAvIDYwLCAyKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkZWxpbWl0ZXIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZShvZmZzZXQsIGRlbGltaXRlciA9IFwiXCIpIHtcbiAgY29uc3Qgc2lnbiA9IG9mZnNldCA+IDAgPyBcIi1cIiA6IFwiK1wiO1xuICBjb25zdCBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICBjb25zdCBob3VycyA9IGFkZExlYWRpbmdaZXJvcyhNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKSwgMik7XG4gIGNvbnN0IG1pbnV0ZXMgPSBhZGRMZWFkaW5nWmVyb3MoYWJzT2Zmc2V0ICUgNjAsIDIpO1xuICByZXR1cm4gc2lnbiArIGhvdXJzICsgZGVsaW1pdGVyICsgbWludXRlcztcbn1cbiIsImNvbnN0IGRhdGVMb25nRm9ybWF0dGVyID0gKHBhdHRlcm4sIGZvcm1hdExvbmcpID0+IHtcbiAgc3dpdGNoIChwYXR0ZXJuKSB7XG4gICAgY2FzZSBcIlBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoeyB3aWR0aDogXCJzaG9ydFwiIH0pO1xuICAgIGNhc2UgXCJQUFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcIm1lZGl1bVwiIH0pO1xuICAgIGNhc2UgXCJQUFBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoeyB3aWR0aDogXCJsb25nXCIgfSk7XG4gICAgY2FzZSBcIlBQUFBcIjpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcImZ1bGxcIiB9KTtcbiAgfVxufTtcblxuY29uc3QgdGltZUxvbmdGb3JtYXR0ZXIgPSAocGF0dGVybiwgZm9ybWF0TG9uZykgPT4ge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlIFwicFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7IHdpZHRoOiBcInNob3J0XCIgfSk7XG4gICAgY2FzZSBcInBwXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwibWVkaXVtXCIgfSk7XG4gICAgY2FzZSBcInBwcFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7IHdpZHRoOiBcImxvbmdcIiB9KTtcbiAgICBjYXNlIFwicHBwcFwiOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwiZnVsbFwiIH0pO1xuICB9XG59O1xuXG5jb25zdCBkYXRlVGltZUxvbmdGb3JtYXR0ZXIgPSAocGF0dGVybiwgZm9ybWF0TG9uZykgPT4ge1xuICBjb25zdCBtYXRjaFJlc3VsdCA9IHBhdHRlcm4ubWF0Y2goLyhQKykocCspPy8pIHx8IFtdO1xuICBjb25zdCBkYXRlUGF0dGVybiA9IG1hdGNoUmVzdWx0WzFdO1xuICBjb25zdCB0aW1lUGF0dGVybiA9IG1hdGNoUmVzdWx0WzJdO1xuXG4gIGlmICghdGltZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZGF0ZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZyk7XG4gIH1cblxuICBsZXQgZGF0ZVRpbWVGb3JtYXQ7XG5cbiAgc3dpdGNoIChkYXRlUGF0dGVybikge1xuICAgIGNhc2UgXCJQXCI6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoeyB3aWR0aDogXCJzaG9ydFwiIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBQXCI6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoeyB3aWR0aDogXCJtZWRpdW1cIiB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQUFBcIjpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcImxvbmdcIiB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQUFBQXCI6XG4gICAgZGVmYXVsdDpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcImZ1bGxcIiB9KTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVUaW1lRm9ybWF0XG4gICAgLnJlcGxhY2UoXCJ7e2RhdGV9fVwiLCBkYXRlTG9uZ0Zvcm1hdHRlcihkYXRlUGF0dGVybiwgZm9ybWF0TG9uZykpXG4gICAgLnJlcGxhY2UoXCJ7e3RpbWV9fVwiLCB0aW1lTG9uZ0Zvcm1hdHRlcih0aW1lUGF0dGVybiwgZm9ybWF0TG9uZykpO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvbmdGb3JtYXR0ZXJzID0ge1xuICBwOiB0aW1lTG9uZ0Zvcm1hdHRlcixcbiAgUDogZGF0ZVRpbWVMb25nRm9ybWF0dGVyLFxufTtcbiIsImNvbnN0IGRheU9mWWVhclRva2VuUkUgPSAvXkQrJC87XG5jb25zdCB3ZWVrWWVhclRva2VuUkUgPSAvXlkrJC87XG5cbmNvbnN0IHRocm93VG9rZW5zID0gW1wiRFwiLCBcIkREXCIsIFwiWVlcIiwgXCJZWVlZXCJdO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gZGF5T2ZZZWFyVG9rZW5SRS50ZXN0KHRva2VuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gd2Vla1llYXJUb2tlblJFLnRlc3QodG9rZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcih0b2tlbiwgZm9ybWF0LCBpbnB1dCkge1xuICBjb25zdCBfbWVzc2FnZSA9IG1lc3NhZ2UodG9rZW4sIGZvcm1hdCwgaW5wdXQpO1xuICBjb25zb2xlLndhcm4oX21lc3NhZ2UpO1xuICBpZiAodGhyb3dUb2tlbnMuaW5jbHVkZXModG9rZW4pKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihfbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIG1lc3NhZ2UodG9rZW4sIGZvcm1hdCwgaW5wdXQpIHtcbiAgY29uc3Qgc3ViamVjdCA9IHRva2VuWzBdID09PSBcIllcIiA/IFwieWVhcnNcIiA6IFwiZGF5cyBvZiB0aGUgbW9udGhcIjtcbiAgcmV0dXJuIGBVc2UgXFxgJHt0b2tlbi50b0xvd2VyQ2FzZSgpfVxcYCBpbnN0ZWFkIG9mIFxcYCR7dG9rZW59XFxgIChpbiBcXGAke2Zvcm1hdH1cXGApIGZvciBmb3JtYXR0aW5nICR7c3ViamVjdH0gdG8gdGhlIGlucHV0IFxcYCR7aW5wdXR9XFxgOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRgO1xufVxuIiwiaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gXCIuL2lzVmFsaWQubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBkZWZhdWx0TG9jYWxlIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0TG9jYWxlLm1qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLm1qc1wiO1xuaW1wb3J0IHsgZm9ybWF0dGVycyB9IGZyb20gXCIuL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMubWpzXCI7XG5pbXBvcnQgeyBsb25nRm9ybWF0dGVycyB9IGZyb20gXCIuL19saWIvZm9ybWF0L2xvbmdGb3JtYXR0ZXJzLm1qc1wiO1xuaW1wb3J0IHtcbiAgaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbixcbiAgaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuLFxuICB3YXJuT3JUaHJvd1Byb3RlY3RlZEVycm9yLFxufSBmcm9tIFwiLi9fbGliL3Byb3RlY3RlZFRva2Vucy5tanNcIjtcblxuLy8gVGhpcyBSZWdFeHAgY29uc2lzdHMgb2YgdGhyZWUgcGFydHMgc2VwYXJhdGVkIGJ5IGB8YDpcbi8vIC0gW3lZUXFNTHdJZERlY2loSEtrbXNdbyBtYXRjaGVzIGFueSBhdmFpbGFibGUgb3JkaW5hbCBudW1iZXIgdG9rZW5cbi8vICAgKG9uZSBvZiB0aGUgY2VydGFpbiBsZXR0ZXJzIGZvbGxvd2VkIGJ5IGBvYClcbi8vIC0gKFxcdylcXDEqIG1hdGNoZXMgYW55IHNlcXVlbmNlcyBvZiB0aGUgc2FtZSBsZXR0ZXJcbi8vIC0gJycgbWF0Y2hlcyB0d28gcXVvdGUgY2hhcmFjdGVycyBpbiBhIHJvd1xuLy8gLSAnKCcnfFteJ10pKygnfCQpIG1hdGNoZXMgYW55dGhpbmcgc3Vycm91bmRlZCBieSB0d28gcXVvdGUgY2hhcmFjdGVycyAoJyksXG4vLyAgIGV4Y2VwdCBhIHNpbmdsZSBxdW90ZSBzeW1ib2wsIHdoaWNoIGVuZHMgdGhlIHNlcXVlbmNlLlxuLy8gICBUd28gcXVvdGUgY2hhcmFjdGVycyBkbyBub3QgZW5kIHRoZSBzZXF1ZW5jZS5cbi8vICAgSWYgdGhlcmUgaXMgbm8gbWF0Y2hpbmcgc2luZ2xlIHF1b3RlXG4vLyAgIHRoZW4gdGhlIHNlcXVlbmNlIHdpbGwgY29udGludWUgdW50aWwgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuLy8gLSAuIG1hdGNoZXMgYW55IHNpbmdsZSBjaGFyYWN0ZXIgdW5tYXRjaGVkIGJ5IHByZXZpb3VzIHBhcnRzIG9mIHRoZSBSZWdFeHBzXG5jb25zdCBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID1cbiAgL1t5WVFxTUx3SWREZWNpaEhLa21zXW98KFxcdylcXDEqfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG5jb25zdCBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG5jb25zdCBlc2NhcGVkU3RyaW5nUmVnRXhwID0gL14nKFteXSo/KSc/JC87XG5jb25zdCBkb3VibGVRdW90ZVJlZ0V4cCA9IC8nJy9nO1xuY29uc3QgdW5lc2NhcGVkTGF0aW5DaGFyYWN0ZXJSZWdFeHAgPSAvW2EtekEtWl0vO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZm9ybWF0fSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZm9ybWF0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIHRoZSBnaXZlbiBmb3JtYXQuIFRoZSByZXN1bHQgbWF5IHZhcnkgYnkgbG9jYWxlLlxuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhlIGBmb3JtYXRgIHRva2VucyBkaWZmZXIgZnJvbSBNb21lbnQuanMgYW5kIG90aGVyIGxpYnJhcmllcy5cbiAqID4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogVGhlIGNoYXJhY3RlcnMgd3JhcHBlZCBiZXR3ZWVuIHR3byBzaW5nbGUgcXVvdGVzIGNoYXJhY3RlcnMgKCcpIGFyZSBlc2NhcGVkLlxuICogVHdvIHNpbmdsZSBxdW90ZXMgaW4gYSByb3csIHdoZXRoZXIgaW5zaWRlIG9yIG91dHNpZGUgYSBxdW90ZWQgc2VxdWVuY2UsIHJlcHJlc2VudCBhICdyZWFsJyBzaW5nbGUgcXVvdGUuXG4gKiAoc2VlIHRoZSBsYXN0IGV4YW1wbGUpXG4gKlxuICogRm9ybWF0IG9mIHRoZSBzdHJpbmcgaXMgYmFzZWQgb24gVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogaHR0cHM6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0ZpZWxkX1N5bWJvbF9UYWJsZVxuICogd2l0aCBhIGZldyBhZGRpdGlvbnMgKHNlZSBub3RlIDcgYmVsb3cgdGhlIHRhYmxlKS5cbiAqXG4gKiBBY2NlcHRlZCBwYXR0ZXJuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBhdHRlcm4gfCBSZXN1bHQgZXhhbXBsZXMgICAgICAgICAgICAgICAgICAgfCBOb3RlcyB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tfFxuICogfCBFcmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRy4uR0dHICB8IEFELCBCQyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0cgICAgfCBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHRyAgIHwgQSwgQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBDYWxlbmRhciB5ZWFyICAgICAgICAgICAgICAgICAgIHwgeSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHlvICAgICAgfCA0NHRoLCAxc3QsIDB0aCwgMTd0aCAgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5ICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5eSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgIHwgWSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlvICAgICAgfCA0NHRoLCAxc3QsIDE5MDB0aCwgMjAxN3RoICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZWSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICAgIHwgUiAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSICAgICAgfCAtNDMsIDAwLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlIgICAgIHwgLTA0MywgMDAwLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUiAgICB8IC0wMDQzLCAwMDAwLCAwMDAxLCAxOTAwLCAyMDE3ICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlJSICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUsNyB8XG4gKiB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICAgfCB1ICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXUgICAgICB8IC00MywgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dSAgICAgfCAtMDQzLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1ICAgIHwgLTAwNDMsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dXUgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgUXVhcnRlciAoZm9ybWF0dGluZykgICAgICAgICAgICB8IFEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUVEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgUXVhcnRlciAoc3RhbmQtYWxvbmUpICAgICAgICAgICB8IHEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcXEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgTW9udGggKGZvcm1hdHRpbmcpICAgICAgICAgICAgICB8IE0gICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU0gICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTSAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTU0gICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTW9udGggKHN0YW5kLWFsb25lKSAgICAgICAgICAgICB8IEwgICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTEwgICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTCAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTEwgICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgICB8IHcgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3byAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd3cgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgICB8IEkgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSUkgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgICB8IGQgICAgICAgfCAxLCAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzFzdCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZGQgICAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgICB8IEQgICAgICAgfCAxLCAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzY1dGgsIDM2NnRoICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREQgICAgICB8IDAxLCAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERERCAgICAgfCAwMDEsIDAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBEYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgICAgIHwgRS4uRUVFICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUVFICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICB8IGkgICAgICAgfCAxLCAyLCAzLCAuLi4sIDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgN3RoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWkgICAgICB8IDAxLCAwMiwgLi4uLCAwNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWkgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpaSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCA3ICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgfCBlICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZW8gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWUgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZWUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoc3RhbmQtYWxvbmUpIHwgYyAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjYyAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2MgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjYyAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2NjICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICB8IGEuLmFhICAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWEgICAgIHwgYW0sIHBtICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWFhICAgfCBhLCBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgfCBiLi5iYiAgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiICAgICB8IGFtLCBwbSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmIgICAgfCBhLm0uLCBwLm0uLCBub29uLCBtaWRuaWdodCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiYiAgIHwgYSwgcCwgbiwgbWkgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGbGV4aWJsZSBkYXkgcGVyaW9kICAgICAgICAgICAgIHwgQi4uQkJCICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkIgICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCQiAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgIHwgaCAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAxMnRoICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgIHwgSCAgICAgICB8IDAsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhvICAgICAgfCAwdGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICAgIHwgMDAsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTExXSAgICAgICAgICAgICAgICAgICAgIHwgSyAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAwdGggICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLSyAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTI0XSAgICAgICAgICAgICAgICAgICAgIHwgayAgICAgICB8IDI0LCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtvICAgICAgfCAyNHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrayAgICAgIHwgMjQsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbSAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1vICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcyAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNvICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgIHwgUyAgICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTICAgICAgfCAwMCwgMDEsIC4uLiwgOTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1MgICAgIHwgMDAwLCAwMDEsIC4uLiwgOTk5ICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTUyAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvIFopICAgICAgICB8IFggICAgICAgfCAtMDgsICswNTMwLCBaICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWCAgICAgIHwgLTA4MDAsICswNTMwLCBaICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYICAgICB8IC0wODowMCwgKzA1OjMwLCBaICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFggICAgfCAtMDgwMCwgKzA1MzAsIFosICsxMjM0NTYgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYWCAgIHwgLTA4OjAwLCArMDU6MzAsIFosICsxMjozNDo1NiAgICAgIHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy9vIFopICAgICAgIHwgeCAgICAgICB8IC0wOCwgKzA1MzAsICswMCAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4ICAgICAgfCAtMDgwMCwgKzA1MzAsICswMDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHggICAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eCAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAsICsxMjM0NTYgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHh4ICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwLCArMTI6MzQ6NTYgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICAgfCBPLi4uT09PIHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgT09PTyAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIgICAgIHxcbiAqIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pICB8IHouLi56enogfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCA2ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB6enp6ICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiw2ICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICAgICAgIHwgdCAgICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHR0ICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgfCBUICAgICAgIHwgNTEyOTY5NTIwOTAwICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVFQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgICB8IFAgICAgICAgfCAwNC8yOS8xNDUzICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUCAgICAgIHwgQXByIDI5LCAxNDUzICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQICAgICB8IEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFAgICAgfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICAgfCBwICAgICAgIHwgMTI6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHAgICAgICB8IDEyOjAwOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcCAgICAgfCAxMjowMDowMCBBTSBHTVQrMiAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHBwICAgIHwgMTI6MDA6MDAgQU0gR01UKzAyOjAwICAgICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBDb21iaW5hdGlvbiBvZiBkYXRlIGFuZCB0aW1lICAgIHwgUHAgICAgICB8IDA0LzI5LzE0NTMsIDEyOjAwIEFNICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQcHAgICAgfCBBcHIgMjksIDE0NTMsIDEyOjAwOjAwIEFNICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBwcHAgIHwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUHBwcHB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICB8IDIsNyAgIHxcbiAqIE5vdGVzOlxuICogMS4gXCJGb3JtYXR0aW5nXCIgdW5pdHMgKGUuZy4gZm9ybWF0dGluZyBxdWFydGVyKSBpbiB0aGUgZGVmYXVsdCBlbi1VUyBsb2NhbGVcbiAqICAgIGFyZSB0aGUgc2FtZSBhcyBcInN0YW5kLWFsb25lXCIgdW5pdHMsIGJ1dCBhcmUgZGlmZmVyZW50IGluIHNvbWUgbGFuZ3VhZ2VzLlxuICogICAgXCJGb3JtYXR0aW5nXCIgdW5pdHMgYXJlIGRlY2xpbmVkIGFjY29yZGluZyB0byB0aGUgcnVsZXMgb2YgdGhlIGxhbmd1YWdlXG4gKiAgICBpbiB0aGUgY29udGV4dCBvZiBhIGRhdGUuIFwiU3RhbmQtYWxvbmVcIiB1bml0cyBhcmUgYWx3YXlzIG5vbWluYXRpdmUgc2luZ3VsYXI6XG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBMTExMJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZCdgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBNTU1NJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZHUnYFxuICpcbiAqIDIuIEFueSBzZXF1ZW5jZSBvZiB0aGUgaWRlbnRpY2FsIGxldHRlcnMgaXMgYSBwYXR0ZXJuLCB1bmxlc3MgaXQgaXMgZXNjYXBlZCBieVxuICogICAgdGhlIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIChzZWUgYmVsb3cpLlxuICogICAgSWYgdGhlIHNlcXVlbmNlIGlzIGxvbmdlciB0aGFuIGxpc3RlZCBpbiB0YWJsZSAoZS5nLiBgRUVFRUVFRUVFRUVgKVxuICogICAgdGhlIG91dHB1dCB3aWxsIGJlIHRoZSBzYW1lIGFzIGRlZmF1bHQgcGF0dGVybiBmb3IgdGhpcyB1bml0LCB1c3VhbGx5XG4gKiAgICB0aGUgbG9uZ2VzdCBvbmUgKGluIGNhc2Ugb2YgSVNPIHdlZWtkYXlzLCBgRUVFRWApLiBEZWZhdWx0IHBhdHRlcm5zIGZvciB1bml0c1xuICogICAgYXJlIG1hcmtlZCB3aXRoIFwiMlwiIGluIHRoZSBsYXN0IGNvbHVtbiBvZiB0aGUgdGFibGUuXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU0nKSAvLz0+ICdOb3YnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NJykgLy89PiAnTidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqIDMuIFNvbWUgcGF0dGVybnMgY291bGQgYmUgdW5saW1pdGVkIGxlbmd0aCAoc3VjaCBhcyBgeXl5eXl5eXlgKS5cbiAqICAgIFRoZSBvdXRwdXQgd2lsbCBiZSBwYWRkZWQgd2l0aCB6ZXJvcyB0byBtYXRjaCB0aGUgbGVuZ3RoIG9mIHRoZSBwYXR0ZXJuLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAneXl5eXl5eXknKSAvLz0+ICcwMDAwMjAxNydgXG4gKlxuICogNC4gYFFRUVFRYCBhbmQgYHFxcXFxYCBjb3VsZCBiZSBub3Qgc3RyaWN0bHkgbnVtZXJpY2FsIGluIHNvbWUgbG9jYWxlcy5cbiAqICAgIFRoZXNlIHRva2VucyByZXByZXNlbnQgdGhlIHNob3J0ZXN0IGZvcm0gb2YgdGhlIHF1YXJ0ZXIuXG4gKlxuICogNS4gVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGB5YCBhbmQgYHVgIHBhdHRlcm5zIGFyZSBCLkMuIHllYXJzOlxuICpcbiAqICAgIHwgWWVhciB8IGB5YCB8IGB1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICogICAgfCBBQyAxIHwgICAxIHwgICAxIHxcbiAqICAgIHwgQkMgMSB8ICAgMSB8ICAgMCB8XG4gKiAgICB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICpcbiAqICAgIEFsc28gYHl5YCBhbHdheXMgcmV0dXJucyB0aGUgbGFzdCB0d28gZGlnaXRzIG9mIGEgeWVhcixcbiAqICAgIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZDpcbiAqXG4gKiAgICB8IFllYXIgfCBgeXlgIHwgYHV1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tLXwtLS0tLS18XG4gKiAgICB8IDEgICAgfCAgIDAxIHwgICAwMSB8XG4gKiAgICB8IDE0ICAgfCAgIDE0IHwgICAxNCB8XG4gKiAgICB8IDM3NiAgfCAgIDc2IHwgIDM3NiB8XG4gKiAgICB8IDE0NTMgfCAgIDUzIHwgMTQ1MyB8XG4gKlxuICogICAgVGhlIHNhbWUgZGlmZmVyZW5jZSBpcyB0cnVlIGZvciBsb2NhbCBhbmQgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIChgWWAgYW5kIGBSYCksXG4gKiAgICBleGNlcHQgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhcnMgYXJlIGRlcGVuZGVudCBvbiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gXG4gKiAgICBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAoY29tcGFyZSBbZ2V0SVNPV2Vla1llYXJdKGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0SVNPV2Vla1llYXIpXG4gKiAgICBhbmQgW2dldFdlZWtZZWFyXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldFdlZWtZZWFyKSkuXG4gKlxuICogNi4gU3BlY2lmaWMgbm9uLWxvY2F0aW9uIHRpbWV6b25lcyBhcmUgY3VycmVudGx5IHVuYXZhaWxhYmxlIGluIGBkYXRlLWZuc2AsXG4gKiAgICBzbyByaWdodCBub3cgdGhlc2UgdG9rZW5zIGZhbGwgYmFjayB0byBHTVQgdGltZXpvbmVzLlxuICpcbiAqIDcuIFRoZXNlIHBhdHRlcm5zIGFyZSBub3QgaW4gdGhlIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqICAgIC0gYGlgOiBJU08gZGF5IG9mIHdlZWtcbiAqICAgIC0gYElgOiBJU08gd2VlayBvZiB5ZWFyXG4gKiAgICAtIGBSYDogSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqICAgIC0gYHRgOiBzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgVGA6IG1pbGxpc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYG9gOiBvcmRpbmFsIG51bWJlciBtb2RpZmllclxuICogICAgLSBgUGA6IGxvbmcgbG9jYWxpemVkIGRhdGVcbiAqICAgIC0gYHBgOiBsb25nIGxvY2FsaXplZCB0aW1lXG4gKlxuICogOC4gYFlZYCBhbmQgYFlZWVlgIHRva2VucyByZXByZXNlbnQgd2Vlay1udW1iZXJpbmcgeWVhcnMgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggeWVhcnMuXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiA5LiBgRGAgYW5kIGBERGAgdG9rZW5zIHJlcHJlc2VudCBkYXlzIG9mIHRoZSB5ZWFyIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIGRheXMgb2YgdGhlIG1vbnRoLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBmb3JtYXQgLSBUaGUgc3RyaW5nIG9mIHRva2Vuc1xuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICpcbiAqIEB0aHJvd3MgYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgbG9jYWxpemVgIHByb3BlcnR5XG4gKiBAdGhyb3dzIGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXRMb25nYCBwcm9wZXJ0eVxuICogQHRocm93cyB1c2UgYHl5eXlgIGluc3RlYWQgb2YgYFlZWVlgIGZvciBmb3JtYXR0aW5nIHllYXJzIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3MgdXNlIGB5eWAgaW5zdGVhZCBvZiBgWVlgIGZvciBmb3JtYXR0aW5nIHllYXJzIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3MgdXNlIGBkYCBpbnN0ZWFkIG9mIGBEYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgZGRgIGluc3RlYWQgb2YgYEREYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIGZvcm1hdCBzdHJpbmcgY29udGFpbnMgYW4gdW5lc2NhcGVkIGxhdGluIGFscGhhYmV0IGNoYXJhY3RlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMTEgRmVicnVhcnkgMjAxNCBpbiBtaWRkbGUtZW5kaWFuIGZvcm1hdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdChuZXcgRGF0ZSgyMDE0LCAxLCAxMSksICdNTS9kZC95eXl5JylcbiAqIC8vPT4gJzAyLzExLzIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAyIEp1bHkgMjAxNCBpbiBFc3BlcmFudG86XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdChuZXcgRGF0ZSgyMDE0LCA2LCAyKSwgXCJkbyAnZGUnIE1NTU0geXl5eVwiLCB7XG4gKiAgIGxvY2FsZTogZW9Mb2NhbGVcbiAqIH0pXG4gKiAvLz0+ICcyLWEgZGUganVsaW8gMjAxNCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRXNjYXBlIHN0cmluZyBieSBzaW5nbGUgcXVvdGUgY2hhcmFjdGVyczpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdChuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxNSksIFwiaCAnbycnY2xvY2snXCIpXG4gKiAvLz0+IFwiMyBvJ2Nsb2NrXCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCBsb2NhbGUgPSBvcHRpb25zPy5sb2NhbGUgPz8gZGVmYXVsdE9wdGlvbnMubG9jYWxlID8/IGRlZmF1bHRMb2NhbGU7XG5cbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IHRvRGF0ZShkYXRlKTtcblxuICBpZiAoIWlzVmFsaWQob3JpZ2luYWxEYXRlKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiSW52YWxpZCB0aW1lIHZhbHVlXCIpO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVyT3B0aW9ucyA9IHtcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSxcbiAgICB3ZWVrU3RhcnRzT246IHdlZWtTdGFydHNPbixcbiAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICBfb3JpZ2luYWxEYXRlOiBvcmlnaW5hbERhdGUsXG4gIH07XG5cbiAgY29uc3QgcmVzdWx0ID0gZm9ybWF0U3RyXG4gICAgLm1hdGNoKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09IFwicFwiIHx8IGZpcnN0Q2hhcmFjdGVyID09PSBcIlBcIikge1xuICAgICAgICBjb25zdCBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgICByZXR1cm4gbG9uZ0Zvcm1hdHRlcihzdWJzdHJpbmcsIGxvY2FsZS5mb3JtYXRMb25nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWJzdHJpbmc7XG4gICAgfSlcbiAgICAuam9pbihcIlwiKVxuICAgIC5tYXRjaChmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgLy8gUmVwbGFjZSB0d28gc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnMgd2l0aCBvbmUgc2luZ2xlIHF1b3RlIGNoYXJhY3RlclxuICAgICAgaWYgKHN1YnN0cmluZyA9PT0gXCInJ1wiKSB7XG4gICAgICAgIHJldHVybiBcIidcIjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09IFwiJ1wiKSB7XG4gICAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmcoc3Vic3RyaW5nKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1tmaXJzdENoYXJhY3Rlcl07XG4gICAgICBpZiAoZm9ybWF0dGVyKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhb3B0aW9ucz8udXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zICYmXG4gICAgICAgICAgaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuKHN1YnN0cmluZylcbiAgICAgICAgKSB7XG4gICAgICAgICAgd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcihzdWJzdHJpbmcsIGZvcm1hdFN0ciwgU3RyaW5nKGRhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIW9wdGlvbnM/LnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMgJiZcbiAgICAgICAgICBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuKHN1YnN0cmluZylcbiAgICAgICAgKSB7XG4gICAgICAgICAgd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcihzdWJzdHJpbmcsIGZvcm1hdFN0ciwgU3RyaW5nKGRhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0dGVyKFxuICAgICAgICAgIG9yaWdpbmFsRGF0ZSxcbiAgICAgICAgICBzdWJzdHJpbmcsXG4gICAgICAgICAgbG9jYWxlLmxvY2FsaXplLFxuICAgICAgICAgIGZvcm1hdHRlck9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdENoYXJhY3Rlci5tYXRjaCh1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgICAgXCJGb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXIgYFwiICtcbiAgICAgICAgICAgIGZpcnN0Q2hhcmFjdGVyICtcbiAgICAgICAgICAgIFwiYFwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgIH0pXG4gICAgLmpvaW4oXCJcIik7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIGNvbnN0IG1hdGNoZWQgPSBpbnB1dC5tYXRjaChlc2NhcGVkU3RyaW5nUmVnRXhwKTtcblxuICBpZiAoIW1hdGNoZWQpIHtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlZFsxXS5yZXBsYWNlKGRvdWJsZVF1b3RlUmVnRXhwLCBcIidcIik7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0O1xuIiwiZXhwb3J0IGNvbnN0IEV4cG9ydGVycyA9IFsnY3N2JywgJ2pzb24nLCAneG1sJ107XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIExvYWRlciwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgZm9ybWF0IGZyb20gJ2RhdGUtZm5zL2Zvcm1hdCc7XG5pbXBvcnQgeyBFeHBvcnRlcnMgfSBmcm9tICcuLi9leHBvcnRlci50eXBlLmpzJztcbmV4cG9ydCBjb25zdCBtaW1lVHlwZXMgPSB7XG4gICAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIGNzdjogJ3RleHQvY3N2JyxcbiAgICB4bWw6ICd0ZXh0L3htbCcsXG59O1xuZXhwb3J0IGNvbnN0IGdldEV4cG9ydGVkRmlsZU5hbWUgPSAoZXh0ZW5zaW9uKSA9PiBgZXhwb3J0LSR7Zm9ybWF0KERhdGUubm93KCksICd5eXl5LU1NLWRkX0hILW1tJyl9LiR7ZXh0ZW5zaW9ufWA7XG5jb25zdCBFeHBvcnRDb21wb25lbnQgPSAoeyByZXNvdXJjZSB9KSA9PiB7XG4gICAgY29uc3QgW2lzRmV0Y2hpbmcsIHNldEZldGNoaW5nXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3Qgc2VuZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICAgIGNvbnN0IGV4cG9ydERhdGEgPSBhc3luYyAodHlwZSkgPT4ge1xuICAgICAgICBzZXRGZXRjaGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogeyBleHBvcnRlZERhdGEgfSwgfSA9IGF3YWl0IG5ldyBBcGlDbGllbnQoKS5yZXNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogcmVzb3VyY2UuaWQsXG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2V4cG9ydCcsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtleHBvcnRlZERhdGFdLCB7IHR5cGU6IG1pbWVUeXBlc1t0eXBlXSB9KTtcbiAgICAgICAgICAgIHNhdmVBcyhibG9iLCBnZXRFeHBvcnRlZEZpbGVOYW1lKHR5cGUpKTtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiAnRXhwb3J0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZW5kTm90aWNlKHsgbWVzc2FnZTogZS5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldEZldGNoaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIGlmIChpc0ZldGNoaW5nKSB7XG4gICAgICAgIHJldHVybiA8TG9hZGVyIC8+O1xuICAgIH1cbiAgICByZXR1cm4gKDxCb3g+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgPFRleHQgdmFyaWFudD1cImxnXCI+Q2hvb3NlIGV4cG9ydCBmb3JtYXQ6PC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAge0V4cG9ydGVycy5tYXAocGFyc2VyVHlwZSA9PiAoPEJveCBrZXk9e3BhcnNlclR5cGV9IG09ezJ9PlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBleHBvcnREYXRhKHBhcnNlclR5cGUpfSBkaXNhYmxlZD17aXNGZXRjaGluZ30+XG4gICAgICAgICAgICAgIHtwYXJzZXJUeXBlLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD4pKX1cbiAgICAgIDwvQm94PlxuICAgIDwvQm94Pik7XG59O1xuZXhwb3J0IGRlZmF1bHQgRXhwb3J0Q29tcG9uZW50O1xuIiwiaW1wb3J0IHsgRHJvcFpvbmUsIERyb3Bab25lSXRlbSwgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgZmxhdCwgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuY29uc3QgRWRpdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgICBjb25zdCB7IHRyYW5zbGF0ZVByb3BlcnR5IH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIGNvbnN0IHsgcGFyYW1zIH0gPSByZWNvcmQ7XG4gICAgY29uc3QgeyBjdXN0b20gfSA9IHByb3BlcnR5O1xuICAgIGNvbnN0IHBhdGggPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5KTtcbiAgICBjb25zdCBrZXkgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSk7XG4gICAgY29uc3QgZmlsZSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQcm9wZXJ0eSk7XG4gICAgY29uc3QgW29yaWdpbmFsS2V5LCBzZXRPcmlnaW5hbEtleV0gPSB1c2VTdGF0ZShrZXkpO1xuICAgIGNvbnN0IFtmaWxlc1RvVXBsb2FkLCBzZXRGaWxlc1RvVXBsb2FkXSA9IHVzZVN0YXRlKFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICAvLyBpdCBtZWFucyBtZWFucyB0aGF0IHNvbWVvbmUgaGl0IHNhdmUgYW5kIG5ldyBmaWxlIGhhcyBiZWVuIHVwbG9hZGVkXG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSBmbGllc1RvVXBsb2FkIHNob3VsZCBiZSBjbGVhcmVkLlxuICAgICAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiB1c2VyIHR1cm5zIG9mZiByZWRpcmVjdCBhZnRlciBuZXcvZWRpdFxuICAgICAgICBpZiAoKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGtleSAhPT0gb3JpZ2luYWxLZXkpXG4gICAgICAgICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgIW9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmIEFycmF5LmlzQXJyYXkoa2V5KSAmJiBrZXkubGVuZ3RoICE9PSBvcmlnaW5hbEtleS5sZW5ndGgpKSB7XG4gICAgICAgICAgICBzZXRPcmlnaW5hbEtleShrZXkpO1xuICAgICAgICAgICAgc2V0RmlsZXNUb1VwbG9hZChbXSk7XG4gICAgICAgIH1cbiAgICB9LCBba2V5LCBvcmlnaW5hbEtleV0pO1xuICAgIGNvbnN0IG9uVXBsb2FkID0gKGZpbGVzKSA9PiB7XG4gICAgICAgIHNldEZpbGVzVG9VcGxvYWQoZmlsZXMpO1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBmaWxlcyk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIG51bGwpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTXVsdGlSZW1vdmUgPSAoc2luZ2xlS2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gKGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSkgfHwgW10pLmluZGV4T2Yoc2luZ2xlS2V5KTtcbiAgICAgICAgY29uc3QgZmlsZXNUb0RlbGV0ZSA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHkpIHx8IFtdO1xuICAgICAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BhdGggPSBwYXRoLm1hcCgoY3VycmVudFBhdGgsIGkpID0+IChpICE9PSBpbmRleCA/IGN1cnJlbnRQYXRoIDogbnVsbCkpO1xuICAgICAgICAgICAgbGV0IG5ld1BhcmFtcyA9IGZsYXQuc2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHksIFsuLi5maWxlc1RvRGVsZXRlLCBpbmRleF0pO1xuICAgICAgICAgICAgbmV3UGFyYW1zID0gZmxhdC5zZXQobmV3UGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSwgbmV3UGF0aCk7XG4gICAgICAgICAgICBvbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgLi4ucmVjb3JkLFxuICAgICAgICAgICAgICAgIHBhcmFtczogbmV3UGFyYW1zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjYW5ub3QgcmVtb3ZlIGZpbGUgd2hlbiB0aGVyZSBhcmUgbm8gdXBsb2FkZWQgZmlsZXMgeWV0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHRyYW5zbGF0ZVByb3BlcnR5KHByb3BlcnR5LmxhYmVsLCBwcm9wZXJ0eS5yZXNvdXJjZUlkKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmUsIHsgb25DaGFuZ2U6IG9uVXBsb2FkLCBtdWx0aXBsZTogY3VzdG9tLm11bHRpcGxlLCB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogY3VzdG9tLm1pbWVUeXBlcyxcbiAgICAgICAgICAgICAgICBtYXhTaXplOiBjdXN0b20ubWF4U2l6ZSxcbiAgICAgICAgICAgIH0sIGZpbGVzOiBmaWxlc1RvVXBsb2FkIH0pLFxuICAgICAgICAhY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBwYXRoICYmICFmaWxlc1RvVXBsb2FkLmxlbmd0aCAmJiBmaWxlICE9PSBudWxsICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBmaWxlbmFtZToga2V5LCBzcmM6IHBhdGgsIG9uUmVtb3ZlOiBoYW5kbGVSZW1vdmUgfSkpLFxuICAgICAgICBjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIGtleS5sZW5ndGggJiYgcGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBrZXkubWFwKChzaW5nbGVLZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyB3aGVuIHdlIHJlbW92ZSBpdGVtcyB3ZSBzZXQgb25seSBwYXRoIGluZGV4IHRvIG51bGxzLlxuICAgICAgICAgICAgLy8ga2V5IGlzIHN0aWxsIHRoZXJlLiBUaGlzIGlzIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gbWFpbnRhaW4gYWxsIHRoZSBpbmRleGVzLiBTbyBoZXJlIHdlIHNpbXBseSBmaWx0ZXIgb3V0IGVsZW1lbnRzIHdoaWNoXG4gICAgICAgICAgICAvLyB3ZXJlIHJlbW92ZWQgYW5kIGRpc3BsYXkgb25seSB3aGF0IHdhcyBsZWZ0XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UGF0aCA9IHBhdGhbaW5kZXhdO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQYXRoID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmVJdGVtLCB7IGtleTogc2luZ2xlS2V5LCBmaWxlbmFtZTogc2luZ2xlS2V5LCBzcmM6IHBhdGhbaW5kZXhdLCBvblJlbW92ZTogKCkgPT4gaGFuZGxlTXVsdGlSZW1vdmUoc2luZ2xlS2V5KSB9KSkgOiAnJztcbiAgICAgICAgfSkpKSA6ICcnKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRWRpdDtcbiIsImV4cG9ydCBjb25zdCBBdWRpb01pbWVUeXBlcyA9IFtcbiAgICAnYXVkaW8vYWFjJyxcbiAgICAnYXVkaW8vbWlkaScsXG4gICAgJ2F1ZGlvL3gtbWlkaScsXG4gICAgJ2F1ZGlvL21wZWcnLFxuICAgICdhdWRpby9vZ2cnLFxuICAgICdhcHBsaWNhdGlvbi9vZ2cnLFxuICAgICdhdWRpby9vcHVzJyxcbiAgICAnYXVkaW8vd2F2JyxcbiAgICAnYXVkaW8vd2VibScsXG4gICAgJ2F1ZGlvLzNncHAyJyxcbl07XG5leHBvcnQgY29uc3QgVmlkZW9NaW1lVHlwZXMgPSBbXG4gICAgJ3ZpZGVvL3gtbXN2aWRlbycsXG4gICAgJ3ZpZGVvL21wZWcnLFxuICAgICd2aWRlby9vZ2cnLFxuICAgICd2aWRlby9tcDJ0JyxcbiAgICAndmlkZW8vd2VibScsXG4gICAgJ3ZpZGVvLzNncHAnLFxuICAgICd2aWRlby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IEltYWdlTWltZVR5cGVzID0gW1xuICAgICdpbWFnZS9ibXAnLFxuICAgICdpbWFnZS9naWYnLFxuICAgICdpbWFnZS9qcGVnJyxcbiAgICAnaW1hZ2UvcG5nJyxcbiAgICAnaW1hZ2Uvc3ZnK3htbCcsXG4gICAgJ2ltYWdlL3ZuZC5taWNyb3NvZnQuaWNvbicsXG4gICAgJ2ltYWdlL3RpZmYnLFxuICAgICdpbWFnZS93ZWJwJyxcbl07XG5leHBvcnQgY29uc3QgQ29tcHJlc3NlZE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1iemlwJyxcbiAgICAnYXBwbGljYXRpb24veC1iemlwMicsXG4gICAgJ2FwcGxpY2F0aW9uL2d6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmUnLFxuICAgICdhcHBsaWNhdGlvbi94LXRhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZCcsXG5dO1xuZXhwb3J0IGNvbnN0IERvY3VtZW50TWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWFiaXdvcmQnLFxuICAgICdhcHBsaWNhdGlvbi94LWZyZWVhcmMnLFxuICAgICdhcHBsaWNhdGlvbi92bmQuYW1hem9uLmVib29rJyxcbiAgICAnYXBwbGljYXRpb24vbXN3b3JkJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5zcHJlYWRzaGVldCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5yYXInLFxuICAgICdhcHBsaWNhdGlvbi9ydGYnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5dO1xuZXhwb3J0IGNvbnN0IFRleHRNaW1lVHlwZXMgPSBbXG4gICAgJ3RleHQvY3NzJyxcbiAgICAndGV4dC9jc3YnLFxuICAgICd0ZXh0L2h0bWwnLFxuICAgICd0ZXh0L2NhbGVuZGFyJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAnYXBwbGljYXRpb24vanNvbicsXG4gICAgJ2FwcGxpY2F0aW9uL2xkK2pzb24nLFxuICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICd0ZXh0L3BsYWluJyxcbiAgICAnYXBwbGljYXRpb24veGh0bWwreG1sJyxcbiAgICAnYXBwbGljYXRpb24veG1sJyxcbiAgICAndGV4dC94bWwnLFxuXTtcbmV4cG9ydCBjb25zdCBCaW5hcnlEb2NzTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9lcHViK3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3BkZicsXG5dO1xuZXhwb3J0IGNvbnN0IEZvbnRNaW1lVHlwZXMgPSBbXG4gICAgJ2ZvbnQvb3RmJyxcbiAgICAnZm9udC90dGYnLFxuICAgICdmb250L3dvZmYnLFxuICAgICdmb250L3dvZmYyJyxcbl07XG5leHBvcnQgY29uc3QgT3RoZXJNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtY3NoJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFwcGxlLmluc3RhbGxlcit4bWwnLFxuICAgICdhcHBsaWNhdGlvbi94LWh0dHBkLXBocCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtc2gnLFxuICAgICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcsXG4gICAgJ3ZuZC52aXNpbycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tb3ppbGxhLnh1bCt4bWwnLFxuXTtcbmV4cG9ydCBjb25zdCBNaW1lVHlwZXMgPSBbXG4gICAgLi4uQXVkaW9NaW1lVHlwZXMsXG4gICAgLi4uVmlkZW9NaW1lVHlwZXMsXG4gICAgLi4uSW1hZ2VNaW1lVHlwZXMsXG4gICAgLi4uQ29tcHJlc3NlZE1pbWVUeXBlcyxcbiAgICAuLi5Eb2N1bWVudE1pbWVUeXBlcyxcbiAgICAuLi5UZXh0TWltZVR5cGVzLFxuICAgIC4uLkJpbmFyeURvY3NNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG4gICAgLi4uRm9udE1pbWVUeXBlcyxcbiAgICAuLi5PdGhlck1pbWVUeXBlcyxcbl07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgZmxhdCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEF1ZGlvTWltZVR5cGVzLCBJbWFnZU1pbWVUeXBlcyB9IGZyb20gJy4uL3R5cGVzL21pbWUtdHlwZXMudHlwZS5qcyc7XG5jb25zdCBTaW5nbGVGaWxlID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCBwYXRoLCBtaW1lVHlwZSwgd2lkdGggfSA9IHByb3BzO1xuICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBJbWFnZU1pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogcGF0aCwgc3R5bGU6IHsgbWF4SGVpZ2h0OiB3aWR0aCwgbWF4V2lkdGg6IHdpZHRoIH0sIGFsdDogbmFtZSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1pbWVUeXBlICYmIEF1ZGlvTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIiwgeyBjb250cm9sczogdHJ1ZSwgc3JjOiBwYXRoIH0sXG4gICAgICAgICAgICAgICAgXCJZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGVcIixcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcImF1ZGlvXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0cmFja1wiLCB7IGtpbmQ6IFwiY2FwdGlvbnNcIiB9KSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IGFzOiBcImFcIiwgaHJlZjogcGF0aCwgbWw6IFwiZGVmYXVsdFwiLCBzaXplOiBcInNtXCIsIHJvdW5kZWQ6IHRydWUsIHRhcmdldDogXCJfYmxhbmtcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLCB7IGljb246IFwiRG9jdW1lbnREb3dubG9hZFwiLCBjb2xvcjogXCJ3aGl0ZVwiLCBtcjogXCJkZWZhdWx0XCIgfSksXG4gICAgICAgICAgICBuYW1lKSkpO1xufTtcbmNvbnN0IEZpbGUgPSAoeyB3aWR0aCwgcmVjb3JkLCBwcm9wZXJ0eSB9KSA9PiB7XG4gICAgY29uc3QgeyBjdXN0b20gfSA9IHByb3BlcnR5O1xuICAgIGxldCBwYXRoID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5KTtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG5hbWUgPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgPyBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA6IGN1c3RvbS5rZXlQcm9wZXJ0eSk7XG4gICAgY29uc3QgbWltZVR5cGUgPSBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eVxuICAgICAgICAmJiBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLm1pbWVUeXBlUHJvcGVydHkpO1xuICAgIGlmICghcHJvcGVydHkuY3VzdG9tLm11bHRpcGxlKSB7XG4gICAgICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICAgICAgICBwYXRoID0gYCR7Y3VzdG9tLm9wdHMuYmFzZVVybH0vJHtuYW1lfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFNpbmdsZUZpbGUsIHsgcGF0aDogcGF0aCwgbmFtZTogbmFtZSwgd2lkdGg6IHdpZHRoLCBtaW1lVHlwZTogbWltZVR5cGUgfSkpO1xuICAgIH1cbiAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gY3VzdG9tLm9wdHMuYmFzZVVybCB8fCAnJztcbiAgICAgICAgcGF0aCA9IHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gYCR7YmFzZVVybH0vJHtuYW1lW2luZGV4XX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFNpbmdsZUZpbGUsIHsga2V5OiBzaW5nbGVQYXRoLCBwYXRoOiBzaW5nbGVQYXRoLCBuYW1lOiBuYW1lW2luZGV4XSwgd2lkdGg6IHdpZHRoLCBtaW1lVHlwZTogbWltZVR5cGVbaW5kZXhdIH0pKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBGaWxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZS5qcyc7XG5jb25zdCBMaXN0ID0gKHByb3BzKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiAxMDAsIC4uLnByb3BzIH0pKTtcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iLCJpbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IFNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCBwcm9wZXJ0eS5sYWJlbCksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogXCIxMDAlXCIsIC4uLnByb3BzIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2hvdztcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEltYWdlVmlldyBmcm9tICcuLi9zcmMvY29tbW9uL2FkbWluanMvY29tcG9uZW50cy9JbWFnZSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1hZ2VWaWV3ID0gSW1hZ2VWaWV3XG5pbXBvcnQgSW1wb3J0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytpbXBvcnQtZXhwb3J0QDMuMC4wX2FkbWluanNANy41LjIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2NvbXBvbmVudHMvSW1wb3J0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbXBvcnRDb21wb25lbnQgPSBJbXBvcnRDb21wb25lbnRcbmltcG9ydCBFeHBvcnRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK2ltcG9ydC1leHBvcnRAMy4wLjBfYWRtaW5qc0A3LjUuMi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9FeHBvcnRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkV4cG9ydENvbXBvbmVudCA9IEV4cG9ydENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZEVkaXRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRMaXN0Q29tcG9uZW50ID0gVXBsb2FkTGlzdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZFNob3dDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMV9hZG1pbmpzQDcuNS4yL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRTaG93Q29tcG9uZW50ID0gVXBsb2FkU2hvd0NvbXBvbmVudCJdLCJuYW1lcyI6WyJJbWFnZVZpZXciLCJwcm9wcyIsImJhc2VVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3QiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY29sb3IiLCJmb250V2VpZ2h0Iiwid2lkdGgiLCJhc3BlY3RSYXRpbyIsInNyYyIsInByb3RvY29sIiwicmVjb3JkIiwicGFyYW1zIiwiaW1hZ2UiLCJJbXBvcnRDb21wb25lbnQiLCJyZXNvdXJjZSIsImZpbGUiLCJzZXRGaWxlIiwidXNlU3RhdGUiLCJzZW5kTm90aWNlIiwidXNlTm90aWNlIiwiaXNGZXRjaGluZyIsInNldEZldGNoaW5nIiwib25VcGxvYWQiLCJ1cGxvYWRlZEZpbGUiLCJvblN1Ym1pdCIsImltcG9ydERhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsIm5hbWUiLCJBcGlDbGllbnQiLCJyZXNvdXJjZUFjdGlvbiIsIm1ldGhvZCIsInJlc291cmNlSWQiLCJpZCIsImFjdGlvbk5hbWUiLCJkYXRhIiwibWVzc2FnZSIsInR5cGUiLCJlIiwiTG9hZGVyIiwiQm94IiwibWFyZ2luIiwibWF4V2lkdGgiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhEaXJlY3Rpb24iLCJEcm9wWm9uZSIsImZpbGVzIiwib25DaGFuZ2UiLCJtdWx0aXBsZSIsIkRyb3Bab25lSXRlbSIsImZpbGVuYW1lIiwib25SZW1vdmUiLCJtIiwiQnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIiwiaXNEYXRlIiwidmFsdWUiLCJEYXRlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwidG9EYXRlIiwiYXJndW1lbnQiLCJhcmdTdHIiLCJjb25zdHJ1Y3RvciIsIk5hTiIsImlzVmFsaWQiLCJkYXRlIiwiX2RhdGUiLCJpc05hTiIsIk51bWJlciIsImZvcm1hdERpc3RhbmNlTG9jYWxlIiwibGVzc1RoYW5YU2Vjb25kcyIsIm9uZSIsIm90aGVyIiwieFNlY29uZHMiLCJoYWxmQU1pbnV0ZSIsImxlc3NUaGFuWE1pbnV0ZXMiLCJ4TWludXRlcyIsImFib3V0WEhvdXJzIiwieEhvdXJzIiwieERheXMiLCJhYm91dFhXZWVrcyIsInhXZWVrcyIsImFib3V0WE1vbnRocyIsInhNb250aHMiLCJhYm91dFhZZWFycyIsInhZZWFycyIsIm92ZXJYWWVhcnMiLCJhbG1vc3RYWWVhcnMiLCJmb3JtYXREaXN0YW5jZSIsInRva2VuIiwiY291bnQiLCJvcHRpb25zIiwicmVzdWx0IiwidG9rZW5WYWx1ZSIsInJlcGxhY2UiLCJhZGRTdWZmaXgiLCJjb21wYXJpc29uIiwiYnVpbGRGb3JtYXRMb25nRm4iLCJhcmdzIiwiU3RyaW5nIiwiZGVmYXVsdFdpZHRoIiwiZm9ybWF0IiwiZm9ybWF0cyIsImRhdGVGb3JtYXRzIiwiZnVsbCIsImxvbmciLCJtZWRpdW0iLCJzaG9ydCIsInRpbWVGb3JtYXRzIiwiZGF0ZVRpbWVGb3JtYXRzIiwiZm9ybWF0TG9uZyIsInRpbWUiLCJkYXRlVGltZSIsImZvcm1hdFJlbGF0aXZlTG9jYWxlIiwibGFzdFdlZWsiLCJ5ZXN0ZXJkYXkiLCJ0b2RheSIsInRvbW9ycm93IiwibmV4dFdlZWsiLCJmb3JtYXRSZWxhdGl2ZSIsIl9iYXNlRGF0ZSIsIl9vcHRpb25zIiwiYnVpbGRMb2NhbGl6ZUZuIiwiY29udGV4dCIsInZhbHVlc0FycmF5IiwiZm9ybWF0dGluZ1ZhbHVlcyIsImRlZmF1bHRGb3JtYXR0aW5nV2lkdGgiLCJ2YWx1ZXMiLCJpbmRleCIsImFyZ3VtZW50Q2FsbGJhY2siLCJlcmFWYWx1ZXMiLCJuYXJyb3ciLCJhYmJyZXZpYXRlZCIsIndpZGUiLCJxdWFydGVyVmFsdWVzIiwibW9udGhWYWx1ZXMiLCJkYXlWYWx1ZXMiLCJkYXlQZXJpb2RWYWx1ZXMiLCJhbSIsInBtIiwibWlkbmlnaHQiLCJub29uIiwibW9ybmluZyIsImFmdGVybm9vbiIsImV2ZW5pbmciLCJuaWdodCIsImZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMiLCJvcmRpbmFsTnVtYmVyIiwiZGlydHlOdW1iZXIiLCJudW1iZXIiLCJyZW0xMDAiLCJsb2NhbGl6ZSIsImVyYSIsInF1YXJ0ZXIiLCJtb250aCIsImRheSIsImRheVBlcmlvZCIsImJ1aWxkTWF0Y2hGbiIsInN0cmluZyIsIm1hdGNoUGF0dGVybiIsIm1hdGNoUGF0dGVybnMiLCJkZWZhdWx0TWF0Y2hXaWR0aCIsIm1hdGNoUmVzdWx0IiwibWF0Y2giLCJtYXRjaGVkU3RyaW5nIiwicGFyc2VQYXR0ZXJucyIsImRlZmF1bHRQYXJzZVdpZHRoIiwia2V5IiwiQXJyYXkiLCJpc0FycmF5IiwiZmluZEluZGV4IiwicGF0dGVybiIsInRlc3QiLCJmaW5kS2V5IiwidmFsdWVDYWxsYmFjayIsInJlc3QiLCJzbGljZSIsImxlbmd0aCIsIm9iamVjdCIsInByZWRpY2F0ZSIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiYXJyYXkiLCJidWlsZE1hdGNoUGF0dGVybkZuIiwicGFyc2VSZXN1bHQiLCJwYXJzZVBhdHRlcm4iLCJtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuIiwicGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiIsIm1hdGNoRXJhUGF0dGVybnMiLCJwYXJzZUVyYVBhdHRlcm5zIiwiYW55IiwibWF0Y2hRdWFydGVyUGF0dGVybnMiLCJwYXJzZVF1YXJ0ZXJQYXR0ZXJucyIsIm1hdGNoTW9udGhQYXR0ZXJucyIsInBhcnNlTW9udGhQYXR0ZXJucyIsIm1hdGNoRGF5UGF0dGVybnMiLCJwYXJzZURheVBhdHRlcm5zIiwibWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyIsInBhcnNlRGF5UGVyaW9kUGF0dGVybnMiLCJwYXJzZUludCIsImVuVVMiLCJjb2RlIiwid2Vla1N0YXJ0c09uIiwiZmlyc3RXZWVrQ29udGFpbnNEYXRlIiwiZGVmYXVsdE9wdGlvbnMiLCJnZXREZWZhdWx0T3B0aW9ucyIsIm1pbGxpc2Vjb25kc0luV2VlayIsIm1pbGxpc2Vjb25kc0luRGF5Iiwic3RhcnRPZkRheSIsInNldEhvdXJzIiwiZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyIsInV0Y0RhdGUiLCJVVEMiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJzZXRVVENGdWxsWWVhciIsImdldFRpbWUiLCJkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMiLCJkYXRlTGVmdCIsImRhdGVSaWdodCIsInN0YXJ0T2ZEYXlMZWZ0Iiwic3RhcnRPZkRheVJpZ2h0IiwidGltZXN0YW1wTGVmdCIsInRpbWVzdGFtcFJpZ2h0IiwiTWF0aCIsInJvdW5kIiwiY29uc3RydWN0RnJvbSIsInN0YXJ0T2ZZZWFyIiwiY2xlYW5EYXRlIiwic2V0RnVsbFllYXIiLCJnZXREYXlPZlllYXIiLCJkaWZmIiwiZGF5T2ZZZWFyIiwic3RhcnRPZldlZWsiLCJsb2NhbGUiLCJnZXREYXkiLCJzZXREYXRlIiwic3RhcnRPZklTT1dlZWsiLCJnZXRJU09XZWVrWWVhciIsInllYXIiLCJmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyIiwic3RhcnRPZk5leHRZZWFyIiwiZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciIsInN0YXJ0T2ZUaGlzWWVhciIsInN0YXJ0T2ZJU09XZWVrWWVhciIsImZvdXJ0aE9mSmFudWFyeSIsImdldElTT1dlZWsiLCJnZXRXZWVrWWVhciIsImZpcnN0V2Vla09mTmV4dFllYXIiLCJmaXJzdFdlZWtPZlRoaXNZZWFyIiwic3RhcnRPZldlZWtZZWFyIiwiZmlyc3RXZWVrIiwiZ2V0V2VlayIsImFkZExlYWRpbmdaZXJvcyIsInRhcmdldExlbmd0aCIsInNpZ24iLCJvdXRwdXQiLCJhYnMiLCJwYWRTdGFydCIsImxpZ2h0Rm9ybWF0dGVycyIsInkiLCJzaWduZWRZZWFyIiwiTSIsImQiLCJhIiwiZGF5UGVyaW9kRW51bVZhbHVlIiwidG9VcHBlckNhc2UiLCJoIiwiSCIsInMiLCJTIiwibnVtYmVyT2ZEaWdpdHMiLCJtaWxsaXNlY29uZHMiLCJmcmFjdGlvbmFsU2Vjb25kcyIsImZsb29yIiwicG93IiwiZGF5UGVyaW9kRW51bSIsImZvcm1hdHRlcnMiLCJHIiwidW5pdCIsIlkiLCJzaWduZWRXZWVrWWVhciIsIndlZWtZZWFyIiwidHdvRGlnaXRZZWFyIiwiUiIsImlzb1dlZWtZZWFyIiwidSIsIlEiLCJjZWlsIiwicSIsIkwiLCJ3Iiwid2VlayIsIkkiLCJpc29XZWVrIiwiRCIsIkUiLCJkYXlPZldlZWsiLCJsb2NhbERheU9mV2VlayIsImMiLCJpIiwiaXNvRGF5T2ZXZWVrIiwiaG91cnMiLCJ0b0xvd2VyQ2FzZSIsImIiLCJCIiwiSyIsImsiLCJYIiwiX2xvY2FsaXplIiwib3JpZ2luYWxEYXRlIiwiX29yaWdpbmFsRGF0ZSIsInRpbWV6b25lT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMiLCJmb3JtYXRUaW1lem9uZSIsIngiLCJPIiwiZm9ybWF0VGltZXpvbmVTaG9ydCIsInoiLCJ0IiwidGltZXN0YW1wIiwiVCIsIm9mZnNldCIsImRlbGltaXRlciIsImFic09mZnNldCIsIm1pbnV0ZXMiLCJkYXRlTG9uZ0Zvcm1hdHRlciIsInRpbWVMb25nRm9ybWF0dGVyIiwiZGF0ZVRpbWVMb25nRm9ybWF0dGVyIiwiZGF0ZVBhdHRlcm4iLCJ0aW1lUGF0dGVybiIsImRhdGVUaW1lRm9ybWF0IiwibG9uZ0Zvcm1hdHRlcnMiLCJwIiwiUCIsImRheU9mWWVhclRva2VuUkUiLCJ3ZWVrWWVhclRva2VuUkUiLCJ0aHJvd1Rva2VucyIsImlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4iLCJpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4iLCJ3YXJuT3JUaHJvd1Byb3RlY3RlZEVycm9yIiwiaW5wdXQiLCJfbWVzc2FnZSIsImNvbnNvbGUiLCJ3YXJuIiwiaW5jbHVkZXMiLCJSYW5nZUVycm9yIiwic3ViamVjdCIsImZvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsImVzY2FwZWRTdHJpbmdSZWdFeHAiLCJkb3VibGVRdW90ZVJlZ0V4cCIsInVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwIiwiZm9ybWF0U3RyIiwiZGVmYXVsdExvY2FsZSIsImZvcm1hdHRlck9wdGlvbnMiLCJtYXAiLCJzdWJzdHJpbmciLCJmaXJzdENoYXJhY3RlciIsImxvbmdGb3JtYXR0ZXIiLCJqb2luIiwiY2xlYW5Fc2NhcGVkU3RyaW5nIiwiZm9ybWF0dGVyIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwidXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyIsIm1hdGNoZWQiLCJFeHBvcnRlcnMiLCJtaW1lVHlwZXMiLCJqc29uIiwiY3N2IiwieG1sIiwiZ2V0RXhwb3J0ZWRGaWxlTmFtZSIsImV4dGVuc2lvbiIsIm5vdyIsIkV4cG9ydENvbXBvbmVudCIsImV4cG9ydERhdGEiLCJleHBvcnRlZERhdGEiLCJibG9iIiwiQmxvYiIsInNhdmVBcyIsIlRleHQiLCJ2YXJpYW50IiwicGFyc2VyVHlwZSIsIkVkaXQiLCJwcm9wZXJ0eSIsInRyYW5zbGF0ZVByb3BlcnR5IiwidXNlVHJhbnNsYXRpb24iLCJjdXN0b20iLCJwYXRoIiwiZmxhdCIsImdldCIsImZpbGVQYXRoUHJvcGVydHkiLCJrZXlQcm9wZXJ0eSIsImZpbGVQcm9wZXJ0eSIsIm9yaWdpbmFsS2V5Iiwic2V0T3JpZ2luYWxLZXkiLCJmaWxlc1RvVXBsb2FkIiwic2V0RmlsZXNUb1VwbG9hZCIsInVzZUVmZmVjdCIsImhhbmRsZVJlbW92ZSIsImhhbmRsZU11bHRpUmVtb3ZlIiwic2luZ2xlS2V5IiwiaW5kZXhPZiIsImZpbGVzVG9EZWxldGUiLCJmaWxlc1RvRGVsZXRlUHJvcGVydHkiLCJuZXdQYXRoIiwiY3VycmVudFBhdGgiLCJuZXdQYXJhbXMiLCJzZXQiLCJsb2ciLCJGb3JtR3JvdXAiLCJMYWJlbCIsImxhYmVsIiwidmFsaWRhdGUiLCJtYXhTaXplIiwiRnJhZ21lbnQiLCJBdWRpb01pbWVUeXBlcyIsIkltYWdlTWltZVR5cGVzIiwiU2luZ2xlRmlsZSIsIm1pbWVUeXBlIiwibWF4SGVpZ2h0IiwiYWx0IiwiY29udHJvbHMiLCJraW5kIiwiYXMiLCJocmVmIiwibWwiLCJzaXplIiwicm91bmRlZCIsInRhcmdldCIsIkljb24iLCJpY29uIiwibXIiLCJGaWxlIiwiZmlsZU5hbWVQcm9wZXJ0eSIsIm1pbWVUeXBlUHJvcGVydHkiLCJvcHRzIiwic2luZ2xlUGF0aCIsIkxpc3QiLCJTaG93IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiVXBsb2FkRWRpdENvbXBvbmVudCIsIlVwbG9hZExpc3RDb21wb25lbnQiLCJVcGxvYWRTaG93Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBRWUsU0FBU0EsU0FBU0EsQ0FBQ0MsS0FBVSxFQUFFO0VBQzVDLEVBQUEsTUFBTUMsT0FBTyxHQUFHQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFBO0VBQ3BDLEVBQUEsb0JBQ0VDLHNCQUFBLENBQUFDLGFBQUEsQ0FDRUQsS0FBQUEsRUFBQUEsSUFBQUEsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFB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R0FBRyxFQUFFLENBQUE7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDNWMsU0FBUyxHQUFHQSxTQUFTLENBQUE7RUFFNUMyYyxPQUFPLENBQUNDLGNBQWMsQ0FBQ3RiLGVBQWUsR0FBR0EsZUFBZSxDQUFBO0VBRXhEcWIsT0FBTyxDQUFDQyxjQUFjLENBQUNuRSxlQUFlLEdBQUdBLGVBQWUsQ0FBQTtFQUV4RGtFLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDQyxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtFQUVoRUYsT0FBTyxDQUFDQyxjQUFjLENBQUNFLG1CQUFtQixHQUFHQSxJQUFtQixDQUFBO0VBRWhFSCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0csbUJBQW1CLEdBQUdBLElBQW1COzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzXX0=
