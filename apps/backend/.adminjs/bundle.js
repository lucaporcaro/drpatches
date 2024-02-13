(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  function ImageView({
    key = 'image',
    record: {
      params
    }
  }) {
    console.log(params);
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
      src: `${window.location.protocol}//${baseUrl}/${params[key]}`
    }));
  }

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
    }), !custom.multiple && key && path && !filesToUpload.length && file !== null && ( /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
      filename: key,
      src: path,
      onRemove: handleRemove
    })), custom.multiple && key && key.length && path ? ( /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
      // when we remove items we set only path index to nulls.
      // key is still there. This is because
      // we have to maintain all the indexes. So here we simply filter out elements which
      // were removed and display only what was left
      const currentPath = path[index];
      return currentPath ? ( /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
        key: singleKey,
        filename: singleKey,
        src: path[index],
        onRemove: () => handleMultiRemove(singleKey)
      })) : '';
    }))) : '');
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => ( /*#__PURE__*/React__default.default.createElement(SingleFile, {
      key: singlePath,
      path: singlePath,
      name: name[index],
      width: width,
      mimeType: mimeType[index]
    }))));
  };

  const List = props => ( /*#__PURE__*/React__default.default.createElement(File, {
    width: 100,
    ...props
  }));

  const Show = props => {
    const {
      property
    } = props;
    const {
      translateProperty
    } = adminjs.useTranslation();
    return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)), /*#__PURE__*/React__default.default.createElement(File, {
      width: "100%",
      ...props
    }));
  };

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

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.ImageView = ImageView;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;
  AdminJS.UserComponents.ImportComponent = ImportComponent;
  AdminJS.UserComponents.ExportComponent = ExportComponent;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uL2FkbWluanMvY29tcG9uZW50cy9JbWFnZS50c3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4yX2FkbWluanNANy41LjYvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4yX2FkbWluanNANy41LjYvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4yX2FkbWluanNANy41LjYvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2ZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4yX2FkbWluanNANy41LjYvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrdXBsb2FkQDQuMC4yX2FkbWluanNANy41LjYvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS42L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0ltcG9ydENvbXBvbmVudC5qc3giLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzRGF0ZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzVmFsaWQubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRMb2NhbGl6ZUZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbG9jYWxpemUubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4ubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbWF0Y2gubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2RlZmF1bHRPcHRpb25zLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RhbnRzLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0cnVjdEZyb20ubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldERheU9mWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZklTT1dlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRJU09XZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZJU09XZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldElTT1dlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRXZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrWWVhci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldFdlZWsubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2FkZExlYWRpbmdaZXJvcy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2xpZ2h0Rm9ybWF0dGVycy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RhdGUtZm5zQDMuMS4wL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZS1mbnNAMy4xLjAvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvcHJvdGVjdGVkVG9rZW5zLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXRlLWZuc0AzLjEuMC9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZm9ybWF0Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytpbXBvcnQtZXhwb3J0QDMuMC4wX2FkbWluanNANy41LjYvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2V4cG9ydGVyLnR5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS42L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0V4cG9ydENvbXBvbmVudC5qc3giLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW1hZ2VWaWV3KHsga2V5ID0gJ2ltYWdlJywgcmVjb3JkOiB7IHBhcmFtcyB9IH06IGFueSkge1xuICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICBjb25zdCBiYXNlVXJsID0gd2luZG93LmxvY2F0aW9uLmhvc3Q7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxzcGFuXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICBmb250RmFtaWx5OiAnXCJSb2JvdG9cIiwgc2Fucy1zZXJpZicsXG4gICAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDE2LFxuICAgICAgICAgIGNvbG9yOiAncmdiKDEzNywgMTM4LCAxNTQpJyxcbiAgICAgICAgICBmb250V2VpZ2h0OiAzMDAsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIEltYWdlXG4gICAgICA8L3NwYW4+XG4gICAgICA8aW1nXG4gICAgICAgIHdpZHRoPXsyNjB9XG4gICAgICAgIHN0eWxlPXt7IGFzcGVjdFJhdGlvOiAnYXV0bycgfX1cbiAgICAgICAgc3JjPXtgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke2Jhc2VVcmx9LyR7cGFyYW1zW2tleV19YH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgeyBEcm9wWm9uZSwgRHJvcFpvbmVJdGVtLCBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0LCB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5jb25zdCBFZGl0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZDtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KTtcbiAgICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSk7XG4gICAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGUoW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIGl0IG1lYW5zIG1lYW5zIHRoYXQgc29tZW9uZSBoaXQgc2F2ZSBhbmQgbmV3IGZpbGUgaGFzIGJlZW4gdXBsb2FkZWRcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgICAgIGlmICgodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICAgICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHNldE9yaWdpbmFsS2V5KGtleSk7XG4gICAgICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKTtcbiAgICAgICAgfVxuICAgIH0sIFtrZXksIG9yaWdpbmFsS2V5XSk7XG4gICAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXMpID0+IHtcbiAgICAgICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcyk7XG4gICAgICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIGZpbGVzKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNdWx0aVJlbW92ZSA9IChzaW5nbGVLZXkpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpO1xuICAgICAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSkgfHwgW107XG4gICAgICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgubWFwKChjdXJyZW50UGF0aCwgaSkgPT4gKGkgIT09IGluZGV4ID8gY3VycmVudFBhdGggOiBudWxsKSk7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSwgWy4uLmZpbGVzVG9EZWxldGUsIGluZGV4XSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbm5vdCByZW1vdmUgZmlsZSB3aGVuIHRoZXJlIGFyZSBubyB1cGxvYWRlZCBmaWxlcyB5ZXQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZSwgeyBvbkNoYW5nZTogb25VcGxvYWQsIG11bHRpcGxlOiBjdXN0b20ubXVsdGlwbGUsIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBjdXN0b20ubWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICAgICAgfSwgZmlsZXM6IGZpbGVzVG9VcGxvYWQgfSksXG4gICAgICAgICFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmVJdGVtLCB7IGZpbGVuYW1lOiBrZXksIHNyYzogcGF0aCwgb25SZW1vdmU6IGhhbmRsZVJlbW92ZSB9KSksXG4gICAgICAgIGN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYga2V5Lmxlbmd0aCAmJiBwYXRoID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGtleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF07XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsga2V5OiBzaW5nbGVLZXksIGZpbGVuYW1lOiBzaW5nbGVLZXksIHNyYzogcGF0aFtpbmRleF0sIG9uUmVtb3ZlOiAoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpIH0pKSA6ICcnO1xuICAgICAgICB9KSkpIDogJycpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFZGl0O1xuIiwiZXhwb3J0IGNvbnN0IEF1ZGlvTWltZVR5cGVzID0gW1xuICAgICdhdWRpby9hYWMnLFxuICAgICdhdWRpby9taWRpJyxcbiAgICAnYXVkaW8veC1taWRpJyxcbiAgICAnYXVkaW8vbXBlZycsXG4gICAgJ2F1ZGlvL29nZycsXG4gICAgJ2FwcGxpY2F0aW9uL29nZycsXG4gICAgJ2F1ZGlvL29wdXMnLFxuICAgICdhdWRpby93YXYnLFxuICAgICdhdWRpby93ZWJtJyxcbiAgICAnYXVkaW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgICAndmlkZW8veC1tc3ZpZGVvJyxcbiAgICAndmlkZW8vbXBlZycsXG4gICAgJ3ZpZGVvL29nZycsXG4gICAgJ3ZpZGVvL21wMnQnLFxuICAgICd2aWRlby93ZWJtJyxcbiAgICAndmlkZW8vM2dwcCcsXG4gICAgJ3ZpZGVvLzNncHAyJyxcbl07XG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICAgJ2ltYWdlL2JtcCcsXG4gICAgJ2ltYWdlL2dpZicsXG4gICAgJ2ltYWdlL2pwZWcnLFxuICAgICdpbWFnZS9wbmcnLFxuICAgICdpbWFnZS9zdmcreG1sJyxcbiAgICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgICAnaW1hZ2UvdGlmZicsXG4gICAgJ2ltYWdlL3dlYnAnLFxuXTtcbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAyJyxcbiAgICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgICAnYXBwbGljYXRpb24vemlwJyxcbiAgICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl07XG5leHBvcnQgY29uc3QgRG9jdW1lbnRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2snLFxuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLnJhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcbl07XG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgICAndGV4dC9jc3MnLFxuICAgICd0ZXh0L2NzdicsXG4gICAgJ3RleHQvaHRtbCcsXG4gICAgJ3RleHQvY2FsZW5kYXInLFxuICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ3RleHQvcGxhaW4nLFxuICAgICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAgICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICd0ZXh0L3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL2VwdWIremlwJyxcbiAgICAnYXBwbGljYXRpb24vcGRmJyxcbl07XG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgICAnZm9udC9vdGYnLFxuICAgICdmb250L3R0ZicsXG4gICAgJ2ZvbnQvd29mZicsXG4gICAgJ2ZvbnQvd29mZjInLFxuXTtcbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAnYXBwbGljYXRpb24veC1jc2gnLFxuICAgICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgICAnYXBwbGljYXRpb24veC1zaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAndm5kLnZpc2lvJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgICAuLi5WaWRlb01pbWVUeXBlcyxcbiAgICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAgIC4uLkRvY3VtZW50TWltZVR5cGVzLFxuICAgIC4uLlRleHRNaW1lVHlwZXMsXG4gICAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgICAuLi5PdGhlck1pbWVUeXBlcyxcbiAgICAuLi5Gb250TWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuXTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlLmpzJztcbmNvbnN0IFNpbmdsZUZpbGUgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHM7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG1pbWVUeXBlICYmIEltYWdlTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBwYXRoLCBzdHlsZTogeyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfSwgYWx0OiBuYW1lIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWltZVR5cGUgJiYgQXVkaW9NaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiLCB7IGNvbnRyb2xzOiB0cnVlLCBzcmM6IHBhdGggfSxcbiAgICAgICAgICAgICAgICBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVwiLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiYXVkaW9cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyYWNrXCIsIHsga2luZDogXCJjYXB0aW9uc1wiIH0pKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgYXM6IFwiYVwiLCBocmVmOiBwYXRoLCBtbDogXCJkZWZhdWx0XCIsIHNpemU6IFwic21cIiwgcm91bmRlZDogdHJ1ZSwgdGFyZ2V0OiBcIl9ibGFua1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEljb24sIHsgaWNvbjogXCJEb2N1bWVudERvd25sb2FkXCIsIGNvbG9yOiBcIndoaXRlXCIsIG1yOiBcImRlZmF1bHRcIiB9KSxcbiAgICAgICAgICAgIG5hbWUpKSk7XG59O1xuY29uc3QgRmlsZSA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgbGV0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgICAgICYmIGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eSk7XG4gICAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBwYXRoOiBwYXRoLCBuYW1lOiBuYW1lLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZSB9KSk7XG4gICAgfVxuICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBjdXN0b20ub3B0cy5iYXNlVXJsIHx8ICcnO1xuICAgICAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBrZXk6IHNpbmdsZVBhdGgsIHBhdGg6IHNpbmdsZVBhdGgsIG5hbWU6IG5hbWVbaW5kZXhdLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZVtpbmRleF0gfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IExpc3QgPSAocHJvcHMpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGUsIHsgd2lkdGg6IDEwMCwgLi4ucHJvcHMgfSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IFNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHRyYW5zbGF0ZVByb3BlcnR5IH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHRyYW5zbGF0ZVByb3BlcnR5KHByb3BlcnR5LmxhYmVsLCBwcm9wZXJ0eS5yZXNvdXJjZUlkKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogXCIxMDAlXCIsIC4uLnByb3BzIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2hvdztcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBEcm9wWm9uZUl0ZW0sIExvYWRlciwgQm94LCBCdXR0b24sIERyb3Bab25lLCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgSW1wb3J0Q29tcG9uZW50ID0gKHsgcmVzb3VyY2UgfSkgPT4ge1xuICAgIGNvbnN0IFtmaWxlLCBzZXRGaWxlXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IHNlbmROb3RpY2UgPSB1c2VOb3RpY2UoKTtcbiAgICBjb25zdCBbaXNGZXRjaGluZywgc2V0RmV0Y2hpbmddID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBvblVwbG9hZCA9ICh1cGxvYWRlZEZpbGUpID0+IHtcbiAgICAgICAgc2V0RmlsZSh1cGxvYWRlZEZpbGU/LlswXSA/PyBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uU3VibWl0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRGZXRjaGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydERhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIGltcG9ydERhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZT8ubmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBuZXcgQXBpQ2xpZW50KCkucmVzb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdpbXBvcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IGltcG9ydERhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiAnSW1wb3J0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZW5kTm90aWNlKHsgbWVzc2FnZTogZS5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldEZldGNoaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIGlmIChpc0ZldGNoaW5nKSB7XG4gICAgICAgIHJldHVybiA8TG9hZGVyIC8+O1xuICAgIH1cbiAgICByZXR1cm4gKDxCb3ggbWFyZ2luPVwiYXV0b1wiIG1heFdpZHRoPXs2MDB9IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCI+XG4gICAgICA8RHJvcFpvbmUgZmlsZXM9e1tdfSBvbkNoYW5nZT17b25VcGxvYWR9IG11bHRpcGxlPXtmYWxzZX0vPlxuICAgICAge2ZpbGUgJiYgKDxEcm9wWm9uZUl0ZW0gZmlsZT17ZmlsZX0gZmlsZW5hbWU9e2ZpbGUubmFtZX0gb25SZW1vdmU9eygpID0+IHNldEZpbGUobnVsbCl9Lz4pfVxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIgbT17MTB9PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU3VibWl0fSBkaXNhYmxlZD17IWZpbGUgfHwgaXNGZXRjaGluZ30+XG4gICAgICAgICAgVXBsb2FkXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBJbXBvcnRDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBuYW1lIGlzRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gdmFsdWUgYSBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLiBUaGUgZnVuY3Rpb24gd29ya3MgZm9yIGRhdGVzIHRyYW5zZmVycmVkIGFjcm9zcyBpZnJhbWVzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZShOYU4pKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBzb21lIHZhbHVlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIG9iamVjdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSh7fSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBEYXRlXVwiKVxuICApO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzRGF0ZTtcbiIsIi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBhcmd1bWVudCAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKlxuICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgY29uc3QgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoXG4gICAgYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgKHR5cGVvZiBhcmd1bWVudCA9PT0gXCJvYmplY3RcIiAmJiBhcmdTdHIgPT09IFwiW29iamVjdCBEYXRlXVwiKVxuICApIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IGFyZ3VtZW50LmNvbnN0cnVjdG9yKCthcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAoXG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcIm51bWJlclwiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgTnVtYmVyXVwiIHx8XG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcInN0cmluZ1wiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgU3RyaW5nXVwiXG4gICkge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCB0b0RhdGU7XG4iLCJpbXBvcnQgeyBpc0RhdGUgfSBmcm9tIFwiLi9pc0RhdGUubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgaXNWYWxpZFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB2YWxpZD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgZmFsc2UgaWYgYXJndW1lbnQgaXMgSW52YWxpZCBEYXRlIGFuZCB0cnVlIG90aGVyd2lzZS5cbiAqIEFyZ3VtZW50IGlzIGNvbnZlcnRlZCB0byBEYXRlIHVzaW5nIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV0oaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGUpXG4gKiBJbnZhbGlkIERhdGUgaXMgYSBEYXRlLCB3aG9zZSB0aW1lIHZhbHVlIGlzIE5hTi5cbiAqXG4gKiBUaW1lIHZhbHVlIG9mIERhdGU6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuOS4xLjFcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGUgaXMgdmFsaWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgyMDE0LCAxLCAzMSkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWx1ZSwgY29udmVydGFibGUgaW50byBhIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKDEzOTM4MDQ4MDAwMDApXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKCcnKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSAmJiB0eXBlb2YgZGF0ZSAhPT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgcmV0dXJuICFpc05hTihOdW1iZXIoX2RhdGUpKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1ZhbGlkO1xuIiwiY29uc3QgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6IFwibGVzcyB0aGFuIGEgc2Vjb25kXCIsXG4gICAgb3RoZXI6IFwibGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzXCIsXG4gIH0sXG5cbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6IFwiMSBzZWNvbmRcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gc2Vjb25kc1wiLFxuICB9LFxuXG4gIGhhbGZBTWludXRlOiBcImhhbGYgYSBtaW51dGVcIixcblxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiBcImxlc3MgdGhhbiBhIG1pbnV0ZVwiLFxuICAgIG90aGVyOiBcImxlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlc1wiLFxuICB9LFxuXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiBcIjEgbWludXRlXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IG1pbnV0ZXNcIixcbiAgfSxcblxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogXCJhYm91dCAxIGhvdXJcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0gaG91cnNcIixcbiAgfSxcblxuICB4SG91cnM6IHtcbiAgICBvbmU6IFwiMSBob3VyXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IGhvdXJzXCIsXG4gIH0sXG5cbiAgeERheXM6IHtcbiAgICBvbmU6IFwiMSBkYXlcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gZGF5c1wiLFxuICB9LFxuXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiBcImFib3V0IDEgd2Vla1wiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSB3ZWVrc1wiLFxuICB9LFxuXG4gIHhXZWVrczoge1xuICAgIG9uZTogXCIxIHdlZWtcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gd2Vla3NcIixcbiAgfSxcblxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSBtb250aFwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSBtb250aHNcIixcbiAgfSxcblxuICB4TW9udGhzOiB7XG4gICAgb25lOiBcIjEgbW9udGhcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gbW9udGhzXCIsXG4gIH0sXG5cbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgeFllYXJzOiB7XG4gICAgb25lOiBcIjEgeWVhclwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6IFwib3ZlciAxIHllYXJcIixcbiAgICBvdGhlcjogXCJvdmVyIHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogXCJhbG1vc3QgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWxtb3N0IHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERpc3RhbmNlID0gKHRva2VuLCBjb3VudCwgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzdWx0O1xuXG4gIGNvbnN0IHRva2VuVmFsdWUgPSBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl07XG4gIGlmICh0eXBlb2YgdG9rZW5WYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoXCJ7e2NvdW50fX1cIiwgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucz8uYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gXCJpbiBcIiArIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdCArIFwiIGFnb1wiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRm9ybWF0TG9uZ0ZuKGFyZ3MpIHtcbiAgcmV0dXJuIChvcHRpb25zID0ge30pID0+IHtcbiAgICAvLyBUT0RPOiBSZW1vdmUgU3RyaW5nKClcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICBjb25zdCBmb3JtYXQgPSBhcmdzLmZvcm1hdHNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0c1thcmdzLmRlZmF1bHRXaWR0aF07XG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfTtcbn1cbiIsImltcG9ydCB7IGJ1aWxkRm9ybWF0TG9uZ0ZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRGb3JtYXRMb25nRm4ubWpzXCI7XG5cbmNvbnN0IGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiBcIkVFRUUsIE1NTU0gZG8sIHlcIixcbiAgbG9uZzogXCJNTU1NIGRvLCB5XCIsXG4gIG1lZGl1bTogXCJNTU0gZCwgeVwiLFxuICBzaG9ydDogXCJNTS9kZC95eXl5XCIsXG59O1xuXG5jb25zdCB0aW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJoOm1tOnNzIGEgenp6elwiLFxuICBsb25nOiBcImg6bW06c3MgYSB6XCIsXG4gIG1lZGl1bTogXCJoOm1tOnNzIGFcIixcbiAgc2hvcnQ6IFwiaDptbSBhXCIsXG59O1xuXG5jb25zdCBkYXRlVGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBsb25nOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbWVkaXVtOiBcInt7ZGF0ZX19LCB7e3RpbWV9fVwiLFxuICBzaG9ydDogXCJ7e2RhdGV9fSwge3t0aW1lfX1cIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgdGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IHRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJmdWxsXCIsXG4gIH0pLFxuXG4gIGRhdGVUaW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZVRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJmdWxsXCIsXG4gIH0pLFxufTtcbiIsImNvbnN0IGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogXCInbGFzdCcgZWVlZSAnYXQnIHBcIixcbiAgeWVzdGVyZGF5OiBcIid5ZXN0ZXJkYXkgYXQnIHBcIixcbiAgdG9kYXk6IFwiJ3RvZGF5IGF0JyBwXCIsXG4gIHRvbW9ycm93OiBcIid0b21vcnJvdyBhdCcgcFwiLFxuICBuZXh0V2VlazogXCJlZWVlICdhdCcgcFwiLFxuICBvdGhlcjogXCJQXCIsXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0UmVsYXRpdmUgPSAodG9rZW4sIF9kYXRlLCBfYmFzZURhdGUsIF9vcHRpb25zKSA9PlxuICBmb3JtYXRSZWxhdGl2ZUxvY2FsZVt0b2tlbl07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAqIFRoZSBsb2NhbGl6ZSBmdW5jdGlvbiBhcmd1bWVudCBjYWxsYmFjayB3aGljaCBhbGxvd3MgdG8gY29udmVydCByYXcgdmFsdWUgdG9cbiAqIHRoZSBhY3R1YWwgdHlwZS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgdmFsdWVcbiAqL1xuXG4vKipcbiAqIFRoZSBtYXAgb2YgbG9jYWxpemVkIHZhbHVlcyBmb3IgZWFjaCB3aWR0aC5cbiAqL1xuXG4vKipcbiAqIFRoZSBpbmRleCB0eXBlIG9mIHRoZSBsb2NhbGUgdW5pdCB2YWx1ZS4gSXQgdHlwZXMgY29udmVyc2lvbiBvZiB1bml0cyBvZlxuICogdmFsdWVzIHRoYXQgZG9uJ3Qgc3RhcnQgYXQgMCAoaS5lLiBxdWFydGVycykuXG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgdW5pdCB2YWx1ZSB0byB0aGUgdHVwbGUgb2YgdmFsdWVzLlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBlcmEgdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIEJDLFxuICogdGhlIHNlY29uZCBlbGVtZW50IHJlcHJlc2VudHMgQUQuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIHF1YXJ0ZXIgdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIFExLlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBkYXkgdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIFN1bmRheS5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgbW9udGggdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIEphbnVhcnkuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gb3B0aW9ucz8uY29udGV4dCA/IFN0cmluZyhvcHRpb25zLmNvbnRleHQpIDogXCJzdGFuZGFsb25lXCI7XG5cbiAgICBsZXQgdmFsdWVzQXJyYXk7XG4gICAgaWYgKGNvbnRleHQgPT09IFwiZm9ybWF0dGluZ1wiICYmIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlcykge1xuICAgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIHx8IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zPy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGRlZmF1bHRXaWR0aDtcblxuICAgICAgdmFsdWVzQXJyYXkgPVxuICAgICAgICBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucz8ud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcblxuICAgICAgdmFsdWVzQXJyYXkgPSBhcmdzLnZhbHVlc1t3aWR0aF0gfHwgYXJncy52YWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBhcmdzLmFyZ3VtZW50Q2FsbGJhY2sgPyBhcmdzLmFyZ3VtZW50Q2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gRm9yIHNvbWUgcmVhc29uIFR5cGVTY3JpcHQganVzdCBkb24ndCB3YW50IHRvIG1hdGNoIGl0LCBubyBtYXR0ZXIgaG93IGhhcmQgd2UgdHJ5LiBJIGNoYWxsZW5nZSB5b3UgdG8gdHJ5IHRvIHJlbW92ZSBpdCFcbiAgICByZXR1cm4gdmFsdWVzQXJyYXlbaW5kZXhdO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgYnVpbGRMb2NhbGl6ZUZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuLm1qc1wiO1xuXG5jb25zdCBlcmFWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiQlwiLCBcIkFcIl0sXG4gIGFiYnJldmlhdGVkOiBbXCJCQ1wiLCBcIkFEXCJdLFxuICB3aWRlOiBbXCJCZWZvcmUgQ2hyaXN0XCIsIFwiQW5ubyBEb21pbmlcIl0sXG59O1xuXG5jb25zdCBxdWFydGVyVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIjFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIl0sXG4gIGFiYnJldmlhdGVkOiBbXCJRMVwiLCBcIlEyXCIsIFwiUTNcIiwgXCJRNFwiXSxcbiAgd2lkZTogW1wiMXN0IHF1YXJ0ZXJcIiwgXCIybmQgcXVhcnRlclwiLCBcIjNyZCBxdWFydGVyXCIsIFwiNHRoIHF1YXJ0ZXJcIl0sXG59O1xuXG4vLyBOb3RlOiBpbiBFbmdsaXNoLCB0aGUgbmFtZXMgb2YgZGF5cyBvZiB0aGUgd2VlayBhbmQgbW9udGhzIGFyZSBjYXBpdGFsaXplZC5cbi8vIElmIHlvdSBhcmUgbWFraW5nIGEgbmV3IGxvY2FsZSBiYXNlZCBvbiB0aGlzIG9uZSwgY2hlY2sgaWYgdGhlIHNhbWUgaXMgdHJ1ZSBmb3IgdGhlIGxhbmd1YWdlIHlvdSdyZSB3b3JraW5nIG9uLlxuLy8gR2VuZXJhbGx5LCBmb3JtYXR0ZWQgZGF0ZXMgc2hvdWxkIGxvb2sgbGlrZSB0aGV5IGFyZSBpbiB0aGUgbWlkZGxlIG9mIGEgc2VudGVuY2UsXG4vLyBlLmcuIGluIFNwYW5pc2ggbGFuZ3VhZ2UgdGhlIHdlZWtkYXlzIGFuZCBtb250aHMgc2hvdWxkIGJlIGluIHRoZSBsb3dlcmNhc2UuXG5jb25zdCBtb250aFZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCJKXCIsIFwiRlwiLCBcIk1cIiwgXCJBXCIsIFwiTVwiLCBcIkpcIiwgXCJKXCIsIFwiQVwiLCBcIlNcIiwgXCJPXCIsIFwiTlwiLCBcIkRcIl0sXG4gIGFiYnJldmlhdGVkOiBbXG4gICAgXCJKYW5cIixcbiAgICBcIkZlYlwiLFxuICAgIFwiTWFyXCIsXG4gICAgXCJBcHJcIixcbiAgICBcIk1heVwiLFxuICAgIFwiSnVuXCIsXG4gICAgXCJKdWxcIixcbiAgICBcIkF1Z1wiLFxuICAgIFwiU2VwXCIsXG4gICAgXCJPY3RcIixcbiAgICBcIk5vdlwiLFxuICAgIFwiRGVjXCIsXG4gIF0sXG5cbiAgd2lkZTogW1xuICAgIFwiSmFudWFyeVwiLFxuICAgIFwiRmVicnVhcnlcIixcbiAgICBcIk1hcmNoXCIsXG4gICAgXCJBcHJpbFwiLFxuICAgIFwiTWF5XCIsXG4gICAgXCJKdW5lXCIsXG4gICAgXCJKdWx5XCIsXG4gICAgXCJBdWd1c3RcIixcbiAgICBcIlNlcHRlbWJlclwiLFxuICAgIFwiT2N0b2JlclwiLFxuICAgIFwiTm92ZW1iZXJcIixcbiAgICBcIkRlY2VtYmVyXCIsXG4gIF0sXG59O1xuXG5jb25zdCBkYXlWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiU1wiLCBcIk1cIiwgXCJUXCIsIFwiV1wiLCBcIlRcIiwgXCJGXCIsIFwiU1wiXSxcbiAgc2hvcnQ6IFtcIlN1XCIsIFwiTW9cIiwgXCJUdVwiLCBcIldlXCIsIFwiVGhcIiwgXCJGclwiLCBcIlNhXCJdLFxuICBhYmJyZXZpYXRlZDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICB3aWRlOiBbXG4gICAgXCJTdW5kYXlcIixcbiAgICBcIk1vbmRheVwiLFxuICAgIFwiVHVlc2RheVwiLFxuICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgXCJUaHVyc2RheVwiLFxuICAgIFwiRnJpZGF5XCIsXG4gICAgXCJTYXR1cmRheVwiLFxuICBdLFxufTtcblxuY29uc3QgZGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogXCJhXCIsXG4gICAgcG06IFwicFwiLFxuICAgIG1pZG5pZ2h0OiBcIm1pXCIsXG4gICAgbm9vbjogXCJuXCIsXG4gICAgbW9ybmluZzogXCJtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiZXZlbmluZ1wiLFxuICAgIG5pZ2h0OiBcIm5pZ2h0XCIsXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06IFwiQU1cIixcbiAgICBwbTogXCJQTVwiLFxuICAgIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gICAgbm9vbjogXCJub29uXCIsXG4gICAgbW9ybmluZzogXCJtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiZXZlbmluZ1wiLFxuICAgIG5pZ2h0OiBcIm5pZ2h0XCIsXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogXCJhLm0uXCIsXG4gICAgcG06IFwicC5tLlwiLFxuICAgIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gICAgbm9vbjogXCJub29uXCIsXG4gICAgbW9ybmluZzogXCJtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiZXZlbmluZ1wiLFxuICAgIG5pZ2h0OiBcIm5pZ2h0XCIsXG4gIH0sXG59O1xuXG5jb25zdCBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogXCJhXCIsXG4gICAgcG06IFwicFwiLFxuICAgIG1pZG5pZ2h0OiBcIm1pXCIsXG4gICAgbm9vbjogXCJuXCIsXG4gICAgbW9ybmluZzogXCJpbiB0aGUgbW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJpbiB0aGUgYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJpbiB0aGUgZXZlbmluZ1wiLFxuICAgIG5pZ2h0OiBcImF0IG5pZ2h0XCIsXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06IFwiQU1cIixcbiAgICBwbTogXCJQTVwiLFxuICAgIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gICAgbm9vbjogXCJub29uXCIsXG4gICAgbW9ybmluZzogXCJpbiB0aGUgbW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJpbiB0aGUgYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJpbiB0aGUgZXZlbmluZ1wiLFxuICAgIG5pZ2h0OiBcImF0IG5pZ2h0XCIsXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogXCJhLm0uXCIsXG4gICAgcG06IFwicC5tLlwiLFxuICAgIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gICAgbm9vbjogXCJub29uXCIsXG4gICAgbW9ybmluZzogXCJpbiB0aGUgbW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJpbiB0aGUgYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJpbiB0aGUgZXZlbmluZ1wiLFxuICAgIG5pZ2h0OiBcImF0IG5pZ2h0XCIsXG4gIH0sXG59O1xuXG5jb25zdCBvcmRpbmFsTnVtYmVyID0gKGRpcnR5TnVtYmVyLCBfb3B0aW9ucykgPT4ge1xuICBjb25zdCBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuXG4gIC8vIElmIG9yZGluYWwgbnVtYmVycyBkZXBlbmQgb24gY29udGV4dCwgZm9yIGV4YW1wbGUsXG4gIC8vIGlmIHRoZXkgYXJlIGRpZmZlcmVudCBmb3IgZGlmZmVyZW50IGdyYW1tYXRpY2FsIGdlbmRlcnMsXG4gIC8vIHVzZSBgb3B0aW9ucy51bml0YC5cbiAgLy9cbiAgLy8gYHVuaXRgIGNhbiBiZSAneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF0ZScsICdkYXlPZlllYXInLFxuICAvLyAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcuXG5cbiAgY29uc3QgcmVtMTAwID0gbnVtYmVyICUgMTAwO1xuICBpZiAocmVtMTAwID4gMjAgfHwgcmVtMTAwIDwgMTApIHtcbiAgICBzd2l0Y2ggKHJlbTEwMCAlIDEwKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyBcInN0XCI7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyBcIm5kXCI7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyBcInJkXCI7XG4gICAgfVxuICB9XG4gIHJldHVybiBudW1iZXIgKyBcInRoXCI7XG59O1xuXG5leHBvcnQgY29uc3QgbG9jYWxpemUgPSB7XG4gIG9yZGluYWxOdW1iZXIsXG5cbiAgZXJhOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZXJhVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxuXG4gIHF1YXJ0ZXI6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBxdWFydGVyVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gICAgYXJndW1lbnRDYWxsYmFjazogKHF1YXJ0ZXIpID0+IHF1YXJ0ZXIgLSAxLFxuICB9KSxcblxuICBtb250aDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IG1vbnRoVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxuXG4gIGRheTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBkYXlQZXJpb2Q6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRGb3JtYXR0aW5nV2lkdGg6IFwid2lkZVwiLFxuICB9KSxcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRNYXRjaEZuKGFyZ3MpIHtcbiAgcmV0dXJuIChzdHJpbmcsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aDtcblxuICAgIGNvbnN0IG1hdGNoUGF0dGVybiA9XG4gICAgICAod2lkdGggJiYgYXJncy5tYXRjaFBhdHRlcm5zW3dpZHRoXSkgfHxcbiAgICAgIGFyZ3MubWF0Y2hQYXR0ZXJuc1thcmdzLmRlZmF1bHRNYXRjaFdpZHRoXTtcbiAgICBjb25zdCBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChtYXRjaFBhdHRlcm4pO1xuXG4gICAgaWYgKCFtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcblxuICAgIGNvbnN0IHBhcnNlUGF0dGVybnMgPVxuICAgICAgKHdpZHRoICYmIGFyZ3MucGFyc2VQYXR0ZXJuc1t3aWR0aF0pIHx8XG4gICAgICBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG5cbiAgICBjb25zdCBrZXkgPSBBcnJheS5pc0FycmF5KHBhcnNlUGF0dGVybnMpXG4gICAgICA/IGZpbmRJbmRleChwYXJzZVBhdHRlcm5zLCAocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpKVxuICAgICAgOiAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAtLSBJIGNoYWxsYW5nZSB5b3UgdG8gZml4IHRoZSB0eXBlXG4gICAgICAgIGZpbmRLZXkocGFyc2VQYXR0ZXJucywgKHBhdHRlcm4pID0+IHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKSk7XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhrZXkpIDoga2V5O1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrXG4gICAgICA/IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICAgICAgb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKVxuICAgICAgOiB2YWx1ZTtcblxuICAgIGNvbnN0IHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHsgdmFsdWUsIHJlc3QgfTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmXG4gICAgICBwcmVkaWNhdGUob2JqZWN0W2tleV0pXG4gICAgKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSkge1xuICBmb3IgKGxldCBrZXkgPSAwOyBrZXkgPCBhcnJheS5sZW5ndGg7IGtleSsrKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuKGFyZ3MpIHtcbiAgcmV0dXJuIChzdHJpbmcsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MubWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG5cbiAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLnBhcnNlUGF0dGVybik7XG4gICAgaWYgKCFwYXJzZVJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrXG4gICAgICA/IGFyZ3MudmFsdWVDYWxsYmFjayhwYXJzZVJlc3VsdFswXSlcbiAgICAgIDogcGFyc2VSZXN1bHRbMF07XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAtLSBJIGNoYWxsYW5nZSB5b3UgdG8gZml4IHRoZSB0eXBlXG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG5cbiAgICBjb25zdCByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcblxuICAgIHJldHVybiB7IHZhbHVlLCByZXN0IH07XG4gIH07XG59XG4iLCJpbXBvcnQgeyBidWlsZE1hdGNoRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZE1hdGNoRm4ubWpzXCI7XG5pbXBvcnQgeyBidWlsZE1hdGNoUGF0dGVybkZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi5tanNcIjtcblxuY29uc3QgbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9eKFxcZCspKHRofHN0fG5kfHJkKT8vaTtcbmNvbnN0IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXFxkKy9pO1xuXG5jb25zdCBtYXRjaEVyYVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGJ8YSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGJcXC4/XFxzP2NcXC4/fGJcXC4/XFxzP2NcXC4/XFxzP2VcXC4/fGFcXC4/XFxzP2RcXC4/fGNcXC4/XFxzP2VcXC4/KS9pLFxuICB3aWRlOiAvXihiZWZvcmUgY2hyaXN0fGJlZm9yZSBjb21tb24gZXJhfGFubm8gZG9taW5pfGNvbW1vbiBlcmEpL2ksXG59O1xuY29uc3QgcGFyc2VFcmFQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15iL2ksIC9eKGF8YykvaV0sXG59O1xuXG5jb25zdCBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXlsxMjM0XS9pLFxuICBhYmJyZXZpYXRlZDogL15xWzEyMzRdL2ksXG4gIHdpZGU6IC9eWzEyMzRdKHRofHN0fG5kfHJkKT8gcXVhcnRlci9pLFxufTtcbmNvbnN0IHBhcnNlUXVhcnRlclBhdHRlcm5zID0ge1xuICBhbnk6IFsvMS9pLCAvMi9pLCAvMy9pLCAvNC9pXSxcbn07XG5cbmNvbnN0IG1hdGNoTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltqZm1hc29uZF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGphbnxmZWJ8bWFyfGFwcnxtYXl8anVufGp1bHxhdWd8c2VwfG9jdHxub3Z8ZGVjKS9pLFxuICB3aWRlOiAvXihqYW51YXJ5fGZlYnJ1YXJ5fG1hcmNofGFwcmlsfG1heXxqdW5lfGp1bHl8YXVndXN0fHNlcHRlbWJlcnxvY3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyKS9pLFxufTtcbmNvbnN0IHBhcnNlTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbXG4gICAgL15qL2ksXG4gICAgL15mL2ksXG4gICAgL15tL2ksXG4gICAgL15hL2ksXG4gICAgL15tL2ksXG4gICAgL15qL2ksXG4gICAgL15qL2ksXG4gICAgL15hL2ksXG4gICAgL15zL2ksXG4gICAgL15vL2ksXG4gICAgL15uL2ksXG4gICAgL15kL2ksXG4gIF0sXG5cbiAgYW55OiBbXG4gICAgL15qYS9pLFxuICAgIC9eZi9pLFxuICAgIC9ebWFyL2ksXG4gICAgL15hcC9pLFxuICAgIC9ebWF5L2ksXG4gICAgL15qdW4vaSxcbiAgICAvXmp1bC9pLFxuICAgIC9eYXUvaSxcbiAgICAvXnMvaSxcbiAgICAvXm8vaSxcbiAgICAvXm4vaSxcbiAgICAvXmQvaSxcbiAgXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bc210d2ZdL2ksXG4gIHNob3J0OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAgd2lkZTogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2ksXG59O1xuY29uc3QgcGFyc2VEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15zL2ksIC9ebS9pLCAvXnQvaSwgL153L2ksIC9edC9pLCAvXmYvaSwgL15zL2ldLFxuICBhbnk6IFsvXnN1L2ksIC9ebS9pLCAvXnR1L2ksIC9edy9pLCAvXnRoL2ksIC9eZi9pLCAvXnNhL2ldLFxufTtcblxuY29uc3QgbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihhfHB8bWl8bnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2ksXG4gIGFueTogL14oW2FwXVxcLj9cXHM/bVxcLj98bWlkbmlnaHR8bm9vbnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2ksXG59O1xuY29uc3QgcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgYW55OiB7XG4gICAgYW06IC9eYS9pLFxuICAgIHBtOiAvXnAvaSxcbiAgICBtaWRuaWdodDogL15taS9pLFxuICAgIG5vb246IC9ebm8vaSxcbiAgICBtb3JuaW5nOiAvbW9ybmluZy9pLFxuICAgIGFmdGVybm9vbjogL2FmdGVybm9vbi9pLFxuICAgIGV2ZW5pbmc6IC9ldmVuaW5nL2ksXG4gICAgbmlnaHQ6IC9uaWdodC9pLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG1hdGNoID0ge1xuICBvcmRpbmFsTnVtYmVyOiBidWlsZE1hdGNoUGF0dGVybkZuKHtcbiAgICBtYXRjaFBhdHRlcm46IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgcGFyc2VQYXR0ZXJuOiBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHZhbHVlQ2FsbGJhY2s6ICh2YWx1ZSkgPT4gcGFyc2VJbnQodmFsdWUsIDEwKSxcbiAgfSksXG5cbiAgZXJhOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIHF1YXJ0ZXI6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICAgIHZhbHVlQ2FsbGJhY2s6IChpbmRleCkgPT4gaW5kZXggKyAxLFxuICB9KSxcblxuICBtb250aDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaE1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgZGF5OiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIGRheVBlcmlvZDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcImFueVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxufTtcbiIsImltcG9ydCB7IGZvcm1hdERpc3RhbmNlIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanNcIjtcbmltcG9ydCB7IGZvcm1hdExvbmcgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdExvbmcubWpzXCI7XG5pbXBvcnQgeyBmb3JtYXRSZWxhdGl2ZSB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0UmVsYXRpdmUubWpzXCI7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gXCIuL2VuLVVTL19saWIvbG9jYWxpemUubWpzXCI7XG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gXCIuL2VuLVVTL19saWIvbWF0Y2gubWpzXCI7XG5cbi8qKlxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF0oaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnApXG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3MpXG4gKi9cbmV4cG9ydCBjb25zdCBlblVTID0ge1xuICBjb2RlOiBcImVuLVVTXCIsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMCAvKiBTdW5kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxLFxuICB9LFxufTtcblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlblVTO1xuIiwibGV0IGRlZmF1bHRPcHRpb25zID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgY29uc3RhbnRzXG4gKiBAc3VtbWFyeSBVc2VmdWwgY29uc3RhbnRzXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbGxlY3Rpb24gb2YgdXNlZnVsIGRhdGUgY29uc3RhbnRzLlxuICpcbiAqIFRoZSBjb25zdGFudHMgY291bGQgYmUgaW1wb3J0ZWQgZnJvbSBgZGF0ZS1mbnMvY29uc3RhbnRzYDpcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbWF4VGltZSwgbWluVGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBmdW5jdGlvbiBpc0FsbG93ZWRUaW1lKHRpbWUpIHtcbiAqICAgcmV0dXJuIHRpbWUgPD0gbWF4VGltZSAmJiB0aW1lID49IG1pblRpbWU7XG4gKiB9XG4gKiBgYGBcbiAqL1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgZGF5c0luV2Vla1xuICogQHN1bW1hcnkgRGF5cyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBkYXlzSW5XZWVrID0gNztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIGRheXNJblllYXJcbiAqIEBzdW1tYXJ5IERheXMgaW4gMSB5ZWFyLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSG93IG1hbnkgZGF5cyBpbiBhIHllYXIuXG4gKlxuICogT25lIHllYXJzIGVxdWFscyAzNjUuMjQyNSBkYXlzIGFjY29yZGluZyB0byB0aGUgZm9ybXVsYTpcbiAqXG4gKiA+IExlYXAgeWVhciBvY2N1cmVzIGV2ZXJ5IDQgeWVhcnMsIGV4Y2VwdCBmb3IgeWVhcnMgdGhhdCBhcmUgZGl2aXNhYmxlIGJ5IDEwMCBhbmQgbm90IGRpdmlzYWJsZSBieSA0MDAuXG4gKiA+IDEgbWVhbiB5ZWFyID0gKDM2NSsxLzQtMS8xMDArMS80MDApIGRheXMgPSAzNjUuMjQyNSBkYXlzXG4gKi9cbmV4cG9ydCBjb25zdCBkYXlzSW5ZZWFyID0gMzY1LjI0MjU7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtYXhUaW1lXG4gKiBAc3VtbWFyeSBNYXhpbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgbWF4VGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBjb25zdCBpc1ZhbGlkID0gODY0MDAwMDAwMDAwMDAwMSA8PSBtYXhUaW1lO1xuICogLy89PiBmYWxzZVxuICpcbiAqIG5ldyBEYXRlKDg2NDAwMDAwMDAwMDAwMDEpO1xuICogLy89PiBJbnZhbGlkIERhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1heFRpbWUgPSBNYXRoLnBvdygxMCwgOCkgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWluVGltZVxuICogQHN1bW1hcnkgTWluaW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IG1pblRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogY29uc3QgaXNWYWxpZCA9IC04NjQwMDAwMDAwMDAwMDAxID49IG1pblRpbWU7XG4gKiAvLz0+IGZhbHNlXG4gKlxuICogbmV3IERhdGUoLTg2NDAwMDAwMDAwMDAwMDEpXG4gKiAvLz0+IEludmFsaWQgRGF0ZVxuICovXG5leHBvcnQgY29uc3QgbWluVGltZSA9IC1tYXhUaW1lO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5XZWVrXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5XZWVrID0gNjA0ODAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5EYXlcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luRGF5ID0gODY0MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbk1pbnV0ZVxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgbWludXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbk1pbnV0ZSA9IDYwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5Ib3VyXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBob3VyXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbkhvdXIgPSAzNjAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5TZWNvbmRcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIHNlY29uZFxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5TZWNvbmQgPSAxMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luWWVhclxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5ZZWFyID0gNTI1NjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luTW9udGhcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBtb250aC5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbk1vbnRoID0gNDMyMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5EYXlcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5EYXkgPSAxNDQwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luSG91clxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIGhvdXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5Ib3VyID0gNjA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtb250aHNJblF1YXJ0ZXJcbiAqIEBzdW1tYXJ5IE1vbnRocyBpbiAxIHF1YXJ0ZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtb250aHNJblF1YXJ0ZXIgPSAzO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbW9udGhzSW5ZZWFyXG4gKiBAc3VtbWFyeSBNb250aHMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3QgbW9udGhzSW5ZZWFyID0gMTI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBxdWFydGVyc0luWWVhclxuICogQHN1bW1hcnkgUXVhcnRlcnMgaW4gMSB5ZWFyXG4gKi9cbmV4cG9ydCBjb25zdCBxdWFydGVyc0luWWVhciA9IDQ7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5Ib3VyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgaG91ci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbkhvdXIgPSAzNjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luTWludXRlXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgbWludXRlLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luTWludXRlID0gNjA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5EYXlcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5EYXkgPSBzZWNvbmRzSW5Ib3VyICogMjQ7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5XZWVrXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbldlZWsgPSBzZWNvbmRzSW5EYXkgKiA3O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luWWVhclxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5ZZWFyID0gc2Vjb25kc0luRGF5ICogZGF5c0luWWVhcjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbk1vbnRoXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgbW9udGhcbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbk1vbnRoID0gc2Vjb25kc0luWWVhciAvIDEyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luUXVhcnRlclxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHF1YXJ0ZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5RdWFydGVyID0gc2Vjb25kc0luTW9udGggKiAzO1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZEYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIGRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSBkYXkgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMDIgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZkRheShkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZEYXk7XG4iLCIvKipcbiAqIEdvb2dsZSBDaHJvbWUgYXMgb2YgNjcuMC4zMzk2Ljg3IGludHJvZHVjZWQgdGltZXpvbmVzIHdpdGggb2Zmc2V0IHRoYXQgaW5jbHVkZXMgc2Vjb25kcy5cbiAqIFRoZXkgdXN1YWxseSBhcHBlYXIgZm9yIGRhdGVzIHRoYXQgZGVub3RlIHRpbWUgYmVmb3JlIHRoZSB0aW1lem9uZXMgd2VyZSBpbnRyb2R1Y2VkXG4gKiAoZS5nLiBmb3IgJ0V1cm9wZS9QcmFndWUnIHRpbWV6b25lIHRoZSBvZmZzZXQgaXMgR01UKzAwOjU3OjQ0IGJlZm9yZSAxIE9jdG9iZXIgMTg5MVxuICogYW5kIEdNVCswMTowMDowMCBhZnRlciB0aGF0IGRhdGUpXG4gKlxuICogRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIHRoZSBvZmZzZXQgaW4gbWludXRlcyBhbmQgd291bGQgcmV0dXJuIDU3IGZvciB0aGUgZXhhbXBsZSBhYm92ZSxcbiAqIHdoaWNoIHdvdWxkIGxlYWQgdG8gaW5jb3JyZWN0IGNhbGN1bGF0aW9ucy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHRpbWV6b25lIG9mZnNldCBpbiBtaWxsaXNlY29uZHMgdGhhdCB0YWtlcyBzZWNvbmRzIGluIGFjY291bnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgY29uc3QgdXRjRGF0ZSA9IG5ldyBEYXRlKFxuICAgIERhdGUuVVRDKFxuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgZGF0ZS5nZXRNb250aCgpLFxuICAgICAgZGF0ZS5nZXREYXRlKCksXG4gICAgICBkYXRlLmdldEhvdXJzKCksXG4gICAgICBkYXRlLmdldE1pbnV0ZXMoKSxcbiAgICAgIGRhdGUuZ2V0U2Vjb25kcygpLFxuICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSxcbiAgICApLFxuICApO1xuICB1dGNEYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSAtIHV0Y0RhdGUuZ2V0VGltZSgpO1xufVxuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5EYXkgfSBmcm9tIFwiLi9jb25zdGFudHMubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcIi4vc3RhcnRPZkRheS5tanNcIjtcbmltcG9ydCB7IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMgfSBmcm9tIFwiLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLiBUaGlzIG1lYW5zIHRoYXQgdGhlIHRpbWVzIGFyZSByZW1vdmVkXG4gKiBmcm9tIHRoZSBkYXRlcyBhbmQgdGhlbiB0aGUgZGlmZmVyZW5jZSBpbiBkYXlzIGlzIGNhbGN1bGF0ZWQuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGVMZWZ0IC0gVGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSBkYXRlUmlnaHQgLSBUaGUgZWFybGllciBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIGRheXMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDExIDIzOjAwOjAwIGFuZCAyIEp1bHkgMjAxMiAwMDowMDowMD9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMiwgNiwgMiwgMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCAwKVxuICogKVxuICogLy89PiAzNjZcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIGRheXMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDExIDIzOjU5OjAwIGFuZCAzIEp1bHkgMjAxMSAwMDowMTowMD9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMywgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCA1OSlcbiAqIClcbiAqIC8vPT4gMVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGVMZWZ0LCBkYXRlUmlnaHQpIHtcbiAgY29uc3Qgc3RhcnRPZkRheUxlZnQgPSBzdGFydE9mRGF5KGRhdGVMZWZ0KTtcbiAgY29uc3Qgc3RhcnRPZkRheVJpZ2h0ID0gc3RhcnRPZkRheShkYXRlUmlnaHQpO1xuXG4gIGNvbnN0IHRpbWVzdGFtcExlZnQgPVxuICAgIHN0YXJ0T2ZEYXlMZWZ0LmdldFRpbWUoKSAtIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoc3RhcnRPZkRheUxlZnQpO1xuICBjb25zdCB0aW1lc3RhbXBSaWdodCA9XG4gICAgc3RhcnRPZkRheVJpZ2h0LmdldFRpbWUoKSAtXG4gICAgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhzdGFydE9mRGF5UmlnaHQpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSBkYXkgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSBkYXkgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZCgodGltZXN0YW1wTGVmdCAtIHRpbWVzdGFtcFJpZ2h0KSAvIG1pbGxpc2Vjb25kc0luRGF5KTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXM7XG4iLCIvKipcbiAqIEBuYW1lIGNvbnN0cnVjdEZyb21cbiAqIEBjYXRlZ29yeSBHZW5lcmljIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnN0cnVjdHMgYSBkYXRlIHVzaW5nIHRoZSByZWZlcmVuY2UgZGF0ZSBhbmQgdGhlIHZhbHVlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgZnVuY3Rpb24gY29uc3RydWN0cyBhIG5ldyBkYXRlIHVzaW5nIHRoZSBjb25zdHJ1Y3RvciBmcm9tIHRoZSByZWZlcmVuY2VcbiAqIGRhdGUgYW5kIHRoZSBnaXZlbiB2YWx1ZS4gSXQgaGVscHMgdG8gYnVpbGQgZ2VuZXJpYyBmdW5jdGlvbnMgdGhhdCBhY2NlcHRcbiAqIGRhdGUgZXh0ZW5zaW9ucy5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSByZWZlcmVuY2UgZGF0ZSB0byB0YWtlIGNvbnN0cnVjdG9yIGZyb21cbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjcmVhdGUgdGhlIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBEYXRlIGluaXRpYWxpemVkIHVzaW5nIHRoZSBnaXZlbiBkYXRlIGFuZCB2YWx1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSAnZGF0ZS1mbnMnXG4gKlxuICogLy8gQSBmdW5jdGlvbiB0aGF0IGNsb25lcyBhIGRhdGUgcHJlc2VydmluZyB0aGUgb3JpZ2luYWwgdHlwZVxuICogZnVuY3Rpb24gY2xvbmVEYXRlPERhdGVUeXBlIGV4dGVuZHMgRGF0ZShkYXRlOiBEYXRlVHlwZSk6IERhdGVUeXBlIHtcbiAqICAgcmV0dXJuIGNvbnN0cnVjdEZyb20oXG4gKiAgICAgZGF0ZSwgLy8gVXNlIGNvbnRydXN0b3IgZnJvbSB0aGUgZ2l2ZW4gZGF0ZVxuICogICAgIGRhdGUuZ2V0VGltZSgpIC8vIFVzZSB0aGUgZGF0ZSB2YWx1ZSB0byBjcmVhdGUgYSBuZXcgZGF0ZVxuICogICApXG4gKiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RGcm9tKGRhdGUsIHZhbHVlKSB7XG4gIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBuZXcgZGF0ZS5jb25zdHJ1Y3Rvcih2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdEZyb207XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mWWVhclxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB5ZWFyIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZlllYXIobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwMCkpXG4gKiAvLz0+IFdlZCBKYW4gMDEgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZlllYXIoZGF0ZSkge1xuICBjb25zdCBjbGVhbkRhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IF9kYXRlID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgX2RhdGUuc2V0RnVsbFllYXIoY2xlYW5EYXRlLmdldEZ1bGxZZWFyKCksIDAsIDEpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZZZWFyO1xuIiwiaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcIi4vZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZlllYXIgfSBmcm9tIFwiLi9zdGFydE9mWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBnZXREYXlPZlllYXJcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBkYXkgb2YgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGRheSBvZiB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIGRheSBvZiB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIGRheSBvZiB0aGUgeWVhciBpcyAyIEp1bHkgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldERheU9mWWVhcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gMTgzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZlllYXIoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGlmZiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhfZGF0ZSwgc3RhcnRPZlllYXIoX2RhdGUpKTtcbiAgY29uc3QgZGF5T2ZZZWFyID0gZGlmZiArIDE7XG4gIHJldHVybiBkYXlPZlllYXI7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF5T2ZZZWFyO1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgc3RhcnRPZldlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTdW4gQXVnIDMxIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdGhlIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mV2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3Qgd2Vla1N0YXJ0c09uID1cbiAgICBvcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgMDtcblxuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGF5ID0gX2RhdGUuZ2V0RGF5KCk7XG4gIGNvbnN0IGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuXG4gIF9kYXRlLnNldERhdGUoX2RhdGUuZ2V0RGF0ZSgpIC0gZGlmZik7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZldlZWs7XG4iLCJpbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZJU09XZWVrXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBJU08gd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZklTT1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mSVNPV2VlayhkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mV2VlayhkYXRlLCB7IHdlZWtTdGFydHNPbjogMSB9KTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mSVNPV2VlaztcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZklTT1dlZWsgfSBmcm9tIFwiLi9zdGFydE9mSVNPV2Vlay5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBnZXRJU09XZWVrWWVhclxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLFxuICogd2hpY2ggYWx3YXlzIHN0YXJ0cyAzIGRheXMgYmVmb3JlIHRoZSB5ZWFyJ3MgZmlyc3QgVGh1cnNkYXkuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggSVNPLXdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDU/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRJU09XZWVrWWVhcihuZXcgRGF0ZSgyMDA1LCAwLCAyKSlcbiAqIC8vPT4gMjAwNFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPV2Vla1llYXIoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgeWVhciA9IF9kYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgY29uc3QgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0RnVsbFllYXIoeWVhciArIDEsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb25zdCBzdGFydE9mTmV4dFllYXIgPSBzdGFydE9mSVNPV2Vlayhmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyKTtcblxuICBjb25zdCBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhci5zZXRGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhcik7XG5cbiAgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0SVNPV2Vla1llYXI7XG4iLCJpbXBvcnQgeyBnZXRJU09XZWVrWWVhciB9IGZyb20gXCIuL2dldElTT1dlZWtZZWFyLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZklTT1dlZWsgfSBmcm9tIFwiLi9zdGFydE9mSVNPV2Vlay5tanNcIjtcbmltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZJU09XZWVrWWVhclxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcixcbiAqIHdoaWNoIGFsd2F5cyBzdGFydHMgMyBkYXlzIGJlZm9yZSB0aGUgeWVhcidzIGZpcnN0IFRodXJzZGF5LlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIDIgSnVseSAyMDA1OlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZklTT1dlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpKVxuICogLy89PiBNb24gSmFuIDAzIDIwMDUgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZJU09XZWVrWWVhcihkYXRlKSB7XG4gIGNvbnN0IHllYXIgPSBnZXRJU09XZWVrWWVhcihkYXRlKTtcbiAgY29uc3QgZm91cnRoT2ZKYW51YXJ5ID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEZ1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBzdGFydE9mSVNPV2Vlayhmb3VydGhPZkphbnVhcnkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZJU09XZWVrWWVhcjtcbiIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luV2VlayB9IGZyb20gXCIuL2NvbnN0YW50cy5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mSVNPV2Vla1llYXIgfSBmcm9tIFwiLi9zdGFydE9mSVNPV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgZ2V0SVNPV2Vla1xuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIElTTyB3ZWVrIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIElTTyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgb2YgdGhlIElTTy13ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0SVNPV2VlayhuZXcgRGF0ZSgyMDA1LCAwLCAyKSlcbiAqIC8vPT4gNTNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElTT1dlZWsoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGlmZiA9XG4gICAgc3RhcnRPZklTT1dlZWsoX2RhdGUpLmdldFRpbWUoKSAtIHN0YXJ0T2ZJU09XZWVrWWVhcihfZGF0ZSkuZ2V0VGltZSgpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBtaWxsaXNlY29uZHNJbldlZWspICsgMTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXRJU09XZWVrO1xuIiwiaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20ubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZ2V0V2Vla1llYXJ9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBnZXRXZWVrWWVhclxuICogQGNhdGVnb3J5IFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIGV4YWN0IGNhbGN1bGF0aW9uIGRlcGVuZHMgb24gdGhlIHZhbHVlcyBvZlxuICogYG9wdGlvbnMud2Vla1N0YXJ0c09uYCAod2hpY2ggaXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWspXG4gKiBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAod2hpY2ggaXMgdGhlIGRheSBvZiBKYW51YXJ5LCB3aGljaCBpcyBhbHdheXMgaW5cbiAqIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB3ZWVrLW51bWJlcmluZyB5ZWFyKVxuICpcbiAqIFdlZWsgbnVtYmVyaW5nOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XZWVrI1RoZV9JU09fd2Vla19kYXRlX3N5c3RlbVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqXG4gKiBAcmV0dXJucyBUaGUgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB3ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDI2IERlY2VtYmVyIDIwMDQgd2l0aCB0aGUgZGVmYXVsdCBzZXR0aW5ncz9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNikpXG4gKiAvLz0+IDIwMDVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IGlmIHdlZWsgc3RhcnRzIG9uIFNhdHVyZGF5P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0V2Vla1llYXIobmV3IERhdGUoMjAwNCwgMTEsIDI2KSwgeyB3ZWVrU3RhcnRzT246IDYgfSlcbiAqIC8vPT4gMjAwNFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB3ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDI2IERlY2VtYmVyIDIwMDQgaWYgdGhlIGZpcnN0IHdlZWsgY29udGFpbnMgNCBKYW51YXJ5P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0V2Vla1llYXIobmV3IERhdGUoMjAwNCwgMTEsIDI2KSwgeyBmaXJzdFdlZWtDb250YWluc0RhdGU6IDQgfSlcbiAqIC8vPT4gMjAwNFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla1llYXIoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgeWVhciA9IF9kYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCBmaXJzdFdlZWtDb250YWluc0RhdGUgPVxuICAgIG9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICAxO1xuXG4gIGNvbnN0IGZpcnN0V2Vla09mTmV4dFllYXIgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldEZ1bGxZZWFyKHllYXIgKyAxLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb25zdCBzdGFydE9mTmV4dFllYXIgPSBzdGFydE9mV2VlayhmaXJzdFdlZWtPZk5leHRZZWFyLCBvcHRpb25zKTtcblxuICBjb25zdCBmaXJzdFdlZWtPZlRoaXNZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRGdWxsWWVhcih5ZWFyLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWtPZlRoaXNZZWFyLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb25zdCBzdGFydE9mVGhpc1llYXIgPSBzdGFydE9mV2VlayhmaXJzdFdlZWtPZlRoaXNZZWFyLCBvcHRpb25zKTtcblxuICBpZiAoX2RhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDE7XG4gIH0gZWxzZSBpZiAoX2RhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZUaGlzWWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDE7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXRXZWVrWWVhcjtcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgZ2V0V2Vla1llYXIgfSBmcm9tIFwiLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla1llYXJ9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyLlxuICogVGhlIGV4YWN0IGNhbGN1bGF0aW9uIGRlcGVuZHMgb24gdGhlIHZhbHVlcyBvZlxuICogYG9wdGlvbnMud2Vla1N0YXJ0c09uYCAod2hpY2ggaXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWspXG4gKiBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAod2hpY2ggaXMgdGhlIGRheSBvZiBKYW51YXJ5LCB3aGljaCBpcyBhbHdheXMgaW5cbiAqIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB3ZWVrLW51bWJlcmluZyB5ZWFyKVxuICpcbiAqIFdlZWsgbnVtYmVyaW5nOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XZWVrI1RoZV9JU09fd2Vla19kYXRlX3N5c3RlbVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIGEgd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDUgd2l0aCBkZWZhdWx0IHNldHRpbmdzOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpKVxuICogLy89PiBTdW4gRGVjIDI2IDIwMDQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDVcbiAqIC8vIGlmIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcbiAqIC8vIGFuZCA0IEphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpLCB7XG4gKiAgIHdlZWtTdGFydHNPbjogMSxcbiAqICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0XG4gKiB9KVxuICogLy89PiBNb24gSmFuIDAzIDIwMDUgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrWWVhcihkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCB5ZWFyID0gZ2V0V2Vla1llYXIoZGF0ZSwgb3B0aW9ucyk7XG4gIGNvbnN0IGZpcnN0V2VlayA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vlay5zZXRGdWxsWWVhcih5ZWFyLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWsuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IF9kYXRlID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrLCBvcHRpb25zKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZXZWVrWWVhcjtcbiIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luV2VlayB9IGZyb20gXCIuL2NvbnN0YW50cy5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mV2Vla1llYXIgfSBmcm9tIFwiLi9zdGFydE9mV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBnZXRXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZ2V0V2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBsb2NhbCB3ZWVrIGluZGV4IG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBsb2NhbCB3ZWVrIGluZGV4IG9mIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIGV4YWN0IGNhbGN1bGF0aW9uIGRlcGVuZHMgb24gdGhlIHZhbHVlcyBvZlxuICogYG9wdGlvbnMud2Vla1N0YXJ0c09uYCAod2hpY2ggaXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWspXG4gKiBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAod2hpY2ggaXMgdGhlIGRheSBvZiBKYW51YXJ5LCB3aGljaCBpcyBhbHdheXMgaW5cbiAqIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB3ZWVrLW51bWJlcmluZyB5ZWFyKVxuICpcbiAqIFdlZWsgbnVtYmVyaW5nOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XZWVrI1RoZV9JU09fd2Vla19kYXRlX3N5c3RlbVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgb2YgdGhlIGxvY2FsIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDUgd2l0aCBkZWZhdWx0IG9wdGlvbnM/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgb2YgdGhlIGxvY2FsIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDUsXG4gKiAvLyBpZiBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayxcbiAqIC8vIGFuZCB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhciBhbHdheXMgY29udGFpbnMgNCBKYW51YXJ5P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0V2VlayhuZXcgRGF0ZSgyMDA1LCAwLCAyKSwge1xuICogICB3ZWVrU3RhcnRzT246IDEsXG4gKiAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogNFxuICogfSlcbiAqIC8vPT4gNTNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkaWZmID1cbiAgICBzdGFydE9mV2VlayhfZGF0ZSwgb3B0aW9ucykuZ2V0VGltZSgpIC1cbiAgICBzdGFydE9mV2Vla1llYXIoX2RhdGUsIG9wdGlvbnMpLmdldFRpbWUoKTtcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gbWlsbGlzZWNvbmRzSW5XZWVrKSArIDE7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2VlaztcbiIsImV4cG9ydCBmdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCB0YXJnZXRMZW5ndGgpIHtcbiAgY29uc3Qgc2lnbiA9IG51bWJlciA8IDAgPyBcIi1cIiA6IFwiXCI7XG4gIGNvbnN0IG91dHB1dCA9IE1hdGguYWJzKG51bWJlcikudG9TdHJpbmcoKS5wYWRTdGFydCh0YXJnZXRMZW5ndGgsIFwiMFwiKTtcbiAgcmV0dXJuIHNpZ24gKyBvdXRwdXQ7XG59XG4iLCJpbXBvcnQgeyBhZGRMZWFkaW5nWmVyb3MgfSBmcm9tIFwiLi4vYWRkTGVhZGluZ1plcm9zLm1qc1wiO1xuXG4vKlxuICogfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgYSAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgfCAgQSogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZCAgfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgfCAgRCAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaCAgfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgfCAgSCAgfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbSAgfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTSAgfCBNb250aCAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgcyAgfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgfCAgUyAgfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgfFxuICogfCAgeSAgfCBZZWFyIChhYnMpICAgICAgICAgICAgICAgICAgICAgfCAgWSAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICogYXJlIG5vdCBpbXBsZW1lbnRlZCBidXQgcmVzZXJ2ZWQgYnkgVW5pY29kZSBzdGFuZGFyZC5cbiAqL1xuXG5leHBvcnQgY29uc3QgbGlnaHRGb3JtYXR0ZXJzID0ge1xuICAvLyBZZWFyXG4gIHkoZGF0ZSwgdG9rZW4pIHtcbiAgICAvLyBGcm9tIGh0dHA6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtMzEvdHIzNS1kYXRlcy5odG1sI0RhdGVfRm9ybWF0X3Rva2Vuc1xuICAgIC8vIHwgWWVhciAgICAgfCAgICAgeSB8IHl5IHwgICB5eXkgfCAgeXl5eSB8IHl5eXl5IHxcbiAgICAvLyB8LS0tLS0tLS0tLXwtLS0tLS0tfC0tLS18LS0tLS0tLXwtLS0tLS0tfC0tLS0tLS18XG4gICAgLy8gfCBBRCAxICAgICB8ICAgICAxIHwgMDEgfCAgIDAwMSB8ICAwMDAxIHwgMDAwMDEgfFxuICAgIC8vIHwgQUQgMTIgICAgfCAgICAxMiB8IDEyIHwgICAwMTIgfCAgMDAxMiB8IDAwMDEyIHxcbiAgICAvLyB8IEFEIDEyMyAgIHwgICAxMjMgfCAyMyB8ICAgMTIzIHwgIDAxMjMgfCAwMDEyMyB8XG4gICAgLy8gfCBBRCAxMjM0ICB8ICAxMjM0IHwgMzQgfCAgMTIzNCB8ICAxMjM0IHwgMDEyMzQgfFxuICAgIC8vIHwgQUQgMTIzNDUgfCAxMjM0NSB8IDQ1IHwgMTIzNDUgfCAxMjM0NSB8IDEyMzQ1IHxcblxuICAgIGNvbnN0IHNpZ25lZFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICBjb25zdCB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0b2tlbiA9PT0gXCJ5eVwiID8geWVhciAlIDEwMCA6IHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTW9udGhcbiAgTShkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIHJldHVybiB0b2tlbiA9PT0gXCJNXCIgPyBTdHJpbmcobW9udGggKyAxKSA6IGFkZExlYWRpbmdaZXJvcyhtb250aCArIDEsIDIpO1xuICB9LFxuXG4gIC8vIERheSBvZiB0aGUgbW9udGhcbiAgZChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gQU0gb3IgUE1cbiAgYShkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IGRheVBlcmlvZEVudW1WYWx1ZSA9IGRhdGUuZ2V0SG91cnMoKSAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgY2FzZSBcImFhXCI6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJhYWFcIjpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICAgIGNhc2UgXCJhYWFhYVwiOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlWzBdO1xuICAgICAgY2FzZSBcImFhYWFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUgPT09IFwiYW1cIiA/IFwiYS5tLlwiIDogXCJwLm0uXCI7XG4gICAgfVxuICB9LFxuXG4gIC8vIEhvdXIgWzEtMTJdXG4gIGgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0SG91cnMoKSAlIDEyIHx8IDEyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEhvdXIgWzAtMjNdXG4gIEgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0SG91cnMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNaW51dGVcbiAgbShkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNaW51dGVzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gU2Vjb25kXG4gIHMoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0U2Vjb25kcygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEZyYWN0aW9uIG9mIHNlY29uZFxuICBTKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgbnVtYmVyT2ZEaWdpdHMgPSB0b2tlbi5sZW5ndGg7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICBjb25zdCBmcmFjdGlvbmFsU2Vjb25kcyA9IE1hdGguZmxvb3IoXG4gICAgICBtaWxsaXNlY29uZHMgKiBNYXRoLnBvdygxMCwgbnVtYmVyT2ZEaWdpdHMgLSAzKSxcbiAgICApO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZnJhY3Rpb25hbFNlY29uZHMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgZ2V0RGF5T2ZZZWFyIH0gZnJvbSBcIi4uLy4uL2dldERheU9mWWVhci5tanNcIjtcbmltcG9ydCB7IGdldElTT1dlZWsgfSBmcm9tIFwiLi4vLi4vZ2V0SVNPV2Vlay5tanNcIjtcbmltcG9ydCB7IGdldElTT1dlZWtZZWFyIH0gZnJvbSBcIi4uLy4uL2dldElTT1dlZWtZZWFyLm1qc1wiO1xuaW1wb3J0IHsgZ2V0V2VlayB9IGZyb20gXCIuLi8uLi9nZXRXZWVrLm1qc1wiO1xuaW1wb3J0IHsgZ2V0V2Vla1llYXIgfSBmcm9tIFwiLi4vLi4vZ2V0V2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyBhZGRMZWFkaW5nWmVyb3MgfSBmcm9tIFwiLi4vYWRkTGVhZGluZ1plcm9zLm1qc1wiO1xuaW1wb3J0IHsgbGlnaHRGb3JtYXR0ZXJzIH0gZnJvbSBcIi4vbGlnaHRGb3JtYXR0ZXJzLm1qc1wiO1xuXG5jb25zdCBkYXlQZXJpb2RFbnVtID0ge1xuICBhbTogXCJhbVwiLFxuICBwbTogXCJwbVwiLFxuICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICBub29uOiBcIm5vb25cIixcbiAgbW9ybmluZzogXCJtb3JuaW5nXCIsXG4gIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgZXZlbmluZzogXCJldmVuaW5nXCIsXG4gIG5pZ2h0OiBcIm5pZ2h0XCIsXG59O1xuXG4vKlxuICogfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgYSAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgfCAgQSogfCBNaWxsaXNlY29uZHMgaW4gZGF5ICAgICAgICAgICAgfFxuICogfCAgYiAgfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgfCAgQiAgfCBGbGV4aWJsZSBkYXkgcGVyaW9kICAgICAgICAgICAgfFxuICogfCAgYyAgfCBTdGFuZC1hbG9uZSBsb2NhbCBkYXkgb2Ygd2VlayAgfCAgQyogfCBMb2NhbGl6ZWQgaG91ciB3LyBkYXkgcGVyaW9kICAgfFxuICogfCAgZCAgfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgfCAgRCAgfCBEYXkgb2YgeWVhciAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZSAgfCBMb2NhbCBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgfCAgRSAgfCBEYXkgb2Ygd2VlayAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgRiogfCBEYXkgb2Ygd2VlayBpbiBtb250aCAgICAgICAgICAgfFxuICogfCAgZyogfCBNb2RpZmllZCBKdWxpYW4gZGF5ICAgICAgICAgICAgfCAgRyAgfCBFcmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaCAgfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgfCAgSCAgfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaSEgfCBJU08gZGF5IG9mIHdlZWsgICAgICAgICAgICAgICAgfCAgSSEgfCBJU08gd2VlayBvZiB5ZWFyICAgICAgICAgICAgICAgfFxuICogfCAgaiogfCBMb2NhbGl6ZWQgaG91ciB3LyBkYXkgcGVyaW9kICAgfCAgSiogfCBMb2NhbGl6ZWQgaG91ciB3L28gZGF5IHBlcmlvZCAgfFxuICogfCAgayAgfCBIb3VyIFsxLTI0XSAgICAgICAgICAgICAgICAgICAgfCAgSyAgfCBIb3VyIFswLTExXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbCogfCAoZGVwcmVjYXRlZCkgICAgICAgICAgICAgICAgICAgfCAgTCAgfCBTdGFuZC1hbG9uZSBtb250aCAgICAgICAgICAgICAgfFxuICogfCAgbSAgfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTSAgfCBNb250aCAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbyEgfCBPcmRpbmFsIG51bWJlciBtb2RpZmllciAgICAgICAgfCAgTyAgfCBUaW1lem9uZSAoR01UKSAgICAgICAgICAgICAgICAgfFxuICogfCAgcCEgfCBMb25nIGxvY2FsaXplZCB0aW1lICAgICAgICAgICAgfCAgUCEgfCBMb25nIGxvY2FsaXplZCBkYXRlICAgICAgICAgICAgfFxuICogfCAgcSAgfCBTdGFuZC1hbG9uZSBxdWFydGVyICAgICAgICAgICAgfCAgUSAgfCBRdWFydGVyICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgciogfCBSZWxhdGVkIEdyZWdvcmlhbiB5ZWFyICAgICAgICAgfCAgUiEgfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICAgfFxuICogfCAgcyAgfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgfCAgUyAgfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgfFxuICogfCAgdCEgfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICAgICAgfCAgVCEgfCBNaWxsaXNlY29uZHMgdGltZXN0YW1wICAgICAgICAgfFxuICogfCAgdSAgfCBFeHRlbmRlZCB5ZWFyICAgICAgICAgICAgICAgICAgfCAgVSogfCBDeWNsaWMgeWVhciAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgdiogfCBUaW1lem9uZSAoZ2VuZXJpYyBub24tbG9jYXQuKSAgfCAgViogfCBUaW1lem9uZSAobG9jYXRpb24pICAgICAgICAgICAgfFxuICogfCAgdyAgfCBMb2NhbCB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgfCAgVyogfCBXZWVrIG9mIG1vbnRoICAgICAgICAgICAgICAgICAgfFxuICogfCAgeCAgfCBUaW1lem9uZSAoSVNPLTg2MDEgdy9vIFopICAgICAgfCAgWCAgfCBUaW1lem9uZSAoSVNPLTg2MDEpICAgICAgICAgICAgfFxuICogfCAgeSAgfCBZZWFyIChhYnMpICAgICAgICAgICAgICAgICAgICAgfCAgWSAgfCBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgfFxuICogfCAgeiAgfCBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0LikgfCAgWiogfCBUaW1lem9uZSAoYWxpYXNlcykgICAgICAgICAgICAgfFxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICogYXJlIG5vdCBpbXBsZW1lbnRlZCBidXQgcmVzZXJ2ZWQgYnkgVW5pY29kZSBzdGFuZGFyZC5cbiAqXG4gKiBMZXR0ZXJzIG1hcmtlZCBieSAhIGFyZSBub24tc3RhbmRhcmQsIGJ1dCBpbXBsZW1lbnRlZCBieSBkYXRlLWZuczpcbiAqIC0gYG9gIG1vZGlmaWVzIHRoZSBwcmV2aW91cyB0b2tlbiB0byB0dXJuIGl0IGludG8gYW4gb3JkaW5hbCAoc2VlIGBmb3JtYXRgIGRvY3MpXG4gKiAtIGBpYCBpcyBJU08gZGF5IG9mIHdlZWsuIEZvciBgaWAgYW5kIGBpaWAgaXMgcmV0dXJucyBudW1lcmljIElTTyB3ZWVrIGRheXMsXG4gKiAgIGkuZS4gNyBmb3IgU3VuZGF5LCAxIGZvciBNb25kYXksIGV0Yy5cbiAqIC0gYElgIGlzIElTTyB3ZWVrIG9mIHllYXIsIGFzIG9wcG9zZWQgdG8gYHdgIHdoaWNoIGlzIGxvY2FsIHdlZWsgb2YgeWVhci5cbiAqIC0gYFJgIGlzIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyLCBhcyBvcHBvc2VkIHRvIGBZYCB3aGljaCBpcyBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyLlxuICogICBgUmAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGBJYCBhbmQgYGlgXG4gKiAgIGZvciB1bml2ZXJzYWwgSVNPIHdlZWstbnVtYmVyaW5nIGRhdGUsIHdoZXJlYXNcbiAqICAgYFlgIGlzIHN1cHBvc2VkIHRvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgd2AgYW5kIGBlYFxuICogICBmb3Igd2Vlay1udW1iZXJpbmcgZGF0ZSBzcGVjaWZpYyB0byB0aGUgbG9jYWxlLlxuICogLSBgUGAgaXMgbG9uZyBsb2NhbGl6ZWQgZGF0ZSBmb3JtYXRcbiAqIC0gYHBgIGlzIGxvbmcgbG9jYWxpemVkIHRpbWUgZm9ybWF0XG4gKi9cblxuZXhwb3J0IGNvbnN0IGZvcm1hdHRlcnMgPSB7XG4gIC8vIEVyYVxuICBHOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZXJhID0gZGF0ZS5nZXRGdWxsWWVhcigpID4gMCA/IDEgOiAwO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEFELCBCQ1xuICAgICAgY2FzZSBcIkdcIjpcbiAgICAgIGNhc2UgXCJHR1wiOlxuICAgICAgY2FzZSBcIkdHR1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwgeyB3aWR0aDogXCJhYmJyZXZpYXRlZFwiIH0pO1xuICAgICAgLy8gQSwgQlxuICAgICAgY2FzZSBcIkdHR0dHXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcIm5hcnJvd1wiIH0pO1xuICAgICAgLy8gQW5ubyBEb21pbmksIEJlZm9yZSBDaHJpc3RcbiAgICAgIGNhc2UgXCJHR0dHXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwgeyB3aWR0aDogXCJ3aWRlXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFllYXJcbiAgeTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIC8vIE9yZGluYWwgbnVtYmVyXG4gICAgaWYgKHRva2VuID09PSBcInlvXCIpIHtcbiAgICAgIGNvbnN0IHNpZ25lZFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgICAgY29uc3QgeWVhciA9IHNpZ25lZFllYXIgPiAwID8gc2lnbmVkWWVhciA6IDEgLSBzaWduZWRZZWFyO1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoeWVhciwgeyB1bml0OiBcInllYXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLnkoZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJcbiAgWTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHNpZ25lZFdlZWtZZWFyID0gZ2V0V2Vla1llYXIoZGF0ZSwgb3B0aW9ucyk7XG4gICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICBjb25zdCB3ZWVrWWVhciA9IHNpZ25lZFdlZWtZZWFyID4gMCA/IHNpZ25lZFdlZWtZZWFyIDogMSAtIHNpZ25lZFdlZWtZZWFyO1xuXG4gICAgLy8gVHdvIGRpZ2l0IHllYXJcbiAgICBpZiAodG9rZW4gPT09IFwiWVlcIikge1xuICAgICAgY29uc3QgdHdvRGlnaXRZZWFyID0gd2Vla1llYXIgJSAxMDA7XG4gICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHR3b0RpZ2l0WWVhciwgMik7XG4gICAgfVxuXG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09IFwiWW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2Vla1llYXIsIHsgdW5pdDogXCJ5ZWFyXCIgfSk7XG4gICAgfVxuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3Mod2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAgUjogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgaXNvV2Vla1llYXIgPSBnZXRJU09XZWVrWWVhcihkYXRlKTtcblxuICAgIC8vIFBhZGRpbmdcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb1dlZWtZZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEV4dGVuZGVkIHllYXIuIFRoaXMgaXMgYSBzaW5nbGUgbnVtYmVyIGRlc2lnbmF0aW5nIHRoZSB5ZWFyIG9mIHRoaXMgY2FsZW5kYXIgc3lzdGVtLlxuICAvLyBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4gYHlgIGFuZCBgdWAgbG9jYWxpemVycyBhcmUgQi5DLiB5ZWFyczpcbiAgLy8gfCBZZWFyIHwgYHlgIHwgYHVgIHxcbiAgLy8gfC0tLS0tLXwtLS0tLXwtLS0tLXxcbiAgLy8gfCBBQyAxIHwgICAxIHwgICAxIHxcbiAgLy8gfCBCQyAxIHwgICAxIHwgICAwIHxcbiAgLy8gfCBCQyAyIHwgICAyIHwgIC0xIHxcbiAgLy8gQWxzbyBgeXlgIGFsd2F5cyByZXR1cm5zIHRoZSBsYXN0IHR3byBkaWdpdHMgb2YgYSB5ZWFyLFxuICAvLyB3aGlsZSBgdXVgIHBhZHMgc2luZ2xlIGRpZ2l0IHllYXJzIHRvIDIgY2hhcmFjdGVycyBhbmQgcmV0dXJucyBvdGhlciB5ZWFycyB1bmNoYW5nZWQuXG4gIHU6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh5ZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIFF1YXJ0ZXJcbiAgUTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IHF1YXJ0ZXIgPSBNYXRoLmNlaWwoKGRhdGUuZ2V0TW9udGgoKSArIDEpIC8gMyk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgMywgNFxuICAgICAgY2FzZSBcIlFcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhxdWFydGVyKTtcbiAgICAgIC8vIDAxLCAwMiwgMDMsIDA0XG4gICAgICBjYXNlIFwiUVFcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhxdWFydGVyLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAzcmQsIDR0aFxuICAgICAgY2FzZSBcIlFvXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHF1YXJ0ZXIsIHsgdW5pdDogXCJxdWFydGVyXCIgfSk7XG4gICAgICAvLyBRMSwgUTIsIFEzLCBRNFxuICAgICAgY2FzZSBcIlFRUVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyAxLCAyLCAzLCA0IChuYXJyb3cgcXVhcnRlcjsgY291bGQgYmUgbm90IG51bWVyaWNhbClcbiAgICAgIGNhc2UgXCJRUVFRUVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi5cbiAgICAgIGNhc2UgXCJRUVFRXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gU3RhbmQtYWxvbmUgcXVhcnRlclxuICBxOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlIFwicVwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgXCJxcVwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlIFwicW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwgeyB1bml0OiBcInF1YXJ0ZXJcIiB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlIFwicXFxXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSBcInFxcXFxXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSBcInFxcXFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBNb250aFxuICBNOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcIk1cIjpcbiAgICAgIGNhc2UgXCJNTVwiOlxuICAgICAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLk0oZGF0ZSwgdG9rZW4pO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgMTJ0aFxuICAgICAgY2FzZSBcIk1vXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKG1vbnRoICsgMSwgeyB1bml0OiBcIm1vbnRoXCIgfSk7XG4gICAgICAvLyBKYW4sIEZlYiwgLi4uLCBEZWNcbiAgICAgIGNhc2UgXCJNTU1cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBKLCBGLCAuLi4sIERcbiAgICAgIGNhc2UgXCJNTU1NTVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlclxuICAgICAgY2FzZSBcIk1NTU1cIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwgeyB3aWR0aDogXCJ3aWRlXCIsIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBTdGFuZC1hbG9uZSBtb250aFxuICBMOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgLi4uLCAxMlxuICAgICAgY2FzZSBcIkxcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhtb250aCArIDEpO1xuICAgICAgLy8gMDEsIDAyLCAuLi4sIDEyXG4gICAgICBjYXNlIFwiTExcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhtb250aCArIDEsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgMTJ0aFxuICAgICAgY2FzZSBcIkxvXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKG1vbnRoICsgMSwgeyB1bml0OiBcIm1vbnRoXCIgfSk7XG4gICAgICAvLyBKYW4sIEZlYiwgLi4uLCBEZWNcbiAgICAgIGNhc2UgXCJMTExcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBKLCBGLCAuLi4sIERcbiAgICAgIGNhc2UgXCJMTExMTFwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlclxuICAgICAgY2FzZSBcIkxMTExcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwgeyB3aWR0aDogXCJ3aWRlXCIsIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBMb2NhbCB3ZWVrIG9mIHllYXJcbiAgdzogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHdlZWsgPSBnZXRXZWVrKGRhdGUsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHRva2VuID09PSBcIndvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHdlZWssIHsgdW5pdDogXCJ3ZWVrXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIElTTyB3ZWVrIG9mIHllYXJcbiAgSTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGlzb1dlZWsgPSBnZXRJU09XZWVrKGRhdGUpO1xuXG4gICAgaWYgKHRva2VuID09PSBcIklvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGlzb1dlZWssIHsgdW5pdDogXCJ3ZWVrXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29XZWVrLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIERheSBvZiB0aGUgbW9udGhcbiAgZDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJkb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldERhdGUoKSwgeyB1bml0OiBcImRhdGVcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLmQoZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIERheSBvZiB5ZWFyXG4gIEQ6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBkYXlPZlllYXIgPSBnZXREYXlPZlllYXIoZGF0ZSk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwiRG9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF5T2ZZZWFyLCB7IHVuaXQ6IFwiZGF5T2ZZZWFyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXlPZlllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWtcbiAgRTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gVHVlXG4gICAgICBjYXNlIFwiRVwiOlxuICAgICAgY2FzZSBcIkVFXCI6XG4gICAgICBjYXNlIFwiRUVFXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlIFwiRUVFRUVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSBcIkVFRUVFRVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcInNob3J0XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSBcIkVFRUVcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gTG9jYWwgZGF5IG9mIHdlZWtcbiAgZTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgY29uc3QgbG9jYWxEYXlPZldlZWsgPSAoZGF5T2ZXZWVrIC0gb3B0aW9ucy53ZWVrU3RhcnRzT24gKyA4KSAlIDcgfHwgNztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBOdW1lcmljYWwgdmFsdWUgKE50aCBkYXkgb2Ygd2VlayB3aXRoIGN1cnJlbnQgbG9jYWxlIG9yIHdlZWtTdGFydHNPbilcbiAgICAgIGNhc2UgXCJlXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSBcImVlXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgN3RoXG4gICAgICBjYXNlIFwiZW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobG9jYWxEYXlPZldlZWssIHsgdW5pdDogXCJkYXlcIiB9KTtcbiAgICAgIGNhc2UgXCJlZWVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgXCJlZWVlZVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlIFwiZWVlZWVlXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwic2hvcnRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlIFwiZWVlZVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBTdGFuZC1hbG9uZSBsb2NhbCBkYXkgb2Ygd2Vla1xuICBjOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoc2FtZSBhcyBpbiBgZWApXG4gICAgICBjYXNlIFwiY1wiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGxvY2FsRGF5T2ZXZWVrKTtcbiAgICAgIC8vIFBhZGRlZCBudW1lcmljYWwgdmFsdWVcbiAgICAgIGNhc2UgXCJjY1wiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGxvY2FsRGF5T2ZXZWVrLCB0b2tlbi5sZW5ndGgpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgN3RoXG4gICAgICBjYXNlIFwiY29cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobG9jYWxEYXlPZldlZWssIHsgdW5pdDogXCJkYXlcIiB9KTtcbiAgICAgIGNhc2UgXCJjY2NcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgXCJjY2NjY1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlIFwiY2NjY2NjXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwic2hvcnRcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlIFwiY2NjY1wiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBJU08gZGF5IG9mIHdlZWtcbiAgaTogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgY29uc3QgaXNvRGF5T2ZXZWVrID0gZGF5T2ZXZWVrID09PSAwID8gNyA6IGRheU9mV2VlaztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAyXG4gICAgICBjYXNlIFwiaVwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGlzb0RheU9mV2Vlayk7XG4gICAgICAvLyAwMlxuICAgICAgY2FzZSBcImlpXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvRGF5T2ZXZWVrLCB0b2tlbi5sZW5ndGgpO1xuICAgICAgLy8gMm5kXG4gICAgICBjYXNlIFwiaW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaXNvRGF5T2ZXZWVrLCB7IHVuaXQ6IFwiZGF5XCIgfSk7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgXCJpaWlcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgXCJpaWlpaVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlIFwiaWlpaWlpXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwic2hvcnRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlIFwiaWlpaVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBBTSBvciBQTVxuICBhOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgY29uc3QgZGF5UGVyaW9kRW51bVZhbHVlID0gaG91cnMgLyAxMiA+PSAxID8gXCJwbVwiIDogXCJhbVwiO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcImFcIjpcbiAgICAgIGNhc2UgXCJhYVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcImFhYVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemVcbiAgICAgICAgICAuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlIFwiYWFhYWFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYWFhYVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBBTSwgUE0sIG1pZG5pZ2h0LCBub29uXG4gIGI6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBsZXQgZGF5UGVyaW9kRW51bVZhbHVlO1xuICAgIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubm9vbjtcbiAgICB9IGVsc2UgaWYgKGhvdXJzID09PSAwKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1pZG5pZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcImJcIjpcbiAgICAgIGNhc2UgXCJiYlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcImJiYlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemVcbiAgICAgICAgICAuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlIFwiYmJiYmJcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYmJiYlwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBpbiB0aGUgbW9ybmluZywgaW4gdGhlIGFmdGVybm9vbiwgaW4gdGhlIGV2ZW5pbmcsIGF0IG5pZ2h0XG4gIEI6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBsZXQgZGF5UGVyaW9kRW51bVZhbHVlO1xuICAgIGlmIChob3VycyA+PSAxNykge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ldmVuaW5nO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPj0gMTIpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0uYWZ0ZXJub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPj0gNCkge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5tb3JuaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm5pZ2h0O1xuICAgIH1cblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgXCJCXCI6XG4gICAgICBjYXNlIFwiQkJcIjpcbiAgICAgIGNhc2UgXCJCQkJcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJCQkJCQlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJCQkJCXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEhvdXIgWzEtMTJdXG4gIGg6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwiaG9cIikge1xuICAgICAgbGV0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpICUgMTI7XG4gICAgICBpZiAoaG91cnMgPT09IDApIGhvdXJzID0gMTI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3VycywgeyB1bml0OiBcImhvdXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLmgoZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIEhvdXIgWzAtMjNdXG4gIEg6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwiSG9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRIb3VycygpLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuSChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gSG91ciBbMC0xMV1cbiAgSzogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpICUgMTI7XG5cbiAgICBpZiAodG9rZW4gPT09IFwiS29cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHsgdW5pdDogXCJob3VyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhob3VycywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBIb3VyIFsxLTI0XVxuICBrOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgbGV0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAyNDtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJrb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3VycywgeyB1bml0OiBcImhvdXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGhvdXJzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIE1pbnV0ZVxuICBtOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcIm1vXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0TWludXRlcygpLCB7IHVuaXQ6IFwibWludXRlXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5tKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBTZWNvbmRcbiAgczogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJzb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFNlY29uZHMoKSwgeyB1bml0OiBcInNlY29uZFwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMucyhkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFM6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuUyhkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gVGltZXpvbmUgKElTTy04NjAxLiBJZiBvZmZzZXQgaXMgMCwgb3V0cHV0IGlzIGFsd2F5cyBgJ1onYClcbiAgWDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICBjb25zdCB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgaWYgKHRpbWV6b25lT2Zmc2V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gXCJaXCI7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgXCJYXCI6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWGBcbiAgICAgIGNhc2UgXCJYWFhYXCI6XG4gICAgICBjYXNlIFwiWFhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYWGBcbiAgICAgIGNhc2UgXCJYWFhYWFwiOlxuICAgICAgY2FzZSBcIlhYWFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYCcrMDA6MDAnYCBvciBlcXVpdmFsZW50KVxuICB4OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBIb3VycyBhbmQgb3B0aW9uYWwgbWludXRlc1xuICAgICAgY2FzZSBcInhcIjpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYHh4YFxuICAgICAgY2FzZSBcInh4eHhcIjpcbiAgICAgIGNhc2UgXCJ4eFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgeHh4YFxuICAgICAgY2FzZSBcInh4eHh4XCI6XG4gICAgICBjYXNlIFwieHh4XCI6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIFRpbWV6b25lIChHTVQpXG4gIE86IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFNob3J0XG4gICAgICBjYXNlIFwiT1wiOlxuICAgICAgY2FzZSBcIk9PXCI6XG4gICAgICBjYXNlIFwiT09PXCI6XG4gICAgICAgIHJldHVybiBcIkdNVFwiICsgZm9ybWF0VGltZXpvbmVTaG9ydCh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgICAgLy8gTG9uZ1xuICAgICAgY2FzZSBcIk9PT09cIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBcIkdNVFwiICsgZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdGlvbilcbiAgejogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICBjb25zdCB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgXCJ6XCI6XG4gICAgICBjYXNlIFwienpcIjpcbiAgICAgIGNhc2UgXCJ6enpcIjpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlIFwienp6elwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcFxuICB0OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGguZmxvb3Iob3JpZ2luYWxEYXRlLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModGltZXN0YW1wLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXBcbiAgVDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBvcmlnaW5hbERhdGUuZ2V0VGltZSgpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModGltZXN0YW1wLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxufTtcblxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmVTaG9ydChvZmZzZXQsIGRlbGltaXRlciA9IFwiXCIpIHtcbiAgY29uc3Qgc2lnbiA9IG9mZnNldCA+IDAgPyBcIi1cIiA6IFwiK1wiO1xuICBjb25zdCBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApO1xuICBjb25zdCBtaW51dGVzID0gYWJzT2Zmc2V0ICUgNjA7XG4gIGlmIChtaW51dGVzID09PSAwKSB7XG4gICAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpO1xuICB9XG4gIHJldHVybiBzaWduICsgU3RyaW5nKGhvdXJzKSArIGRlbGltaXRlciArIGFkZExlYWRpbmdaZXJvcyhtaW51dGVzLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKG9mZnNldCwgZGVsaW1pdGVyKSB7XG4gIGlmIChvZmZzZXQgJSA2MCA9PT0gMCkge1xuICAgIGNvbnN0IHNpZ24gPSBvZmZzZXQgPiAwID8gXCItXCIgOiBcIitcIjtcbiAgICByZXR1cm4gc2lnbiArIGFkZExlYWRpbmdaZXJvcyhNYXRoLmFicyhvZmZzZXQpIC8gNjAsIDIpO1xuICB9XG4gIHJldHVybiBmb3JtYXRUaW1lem9uZShvZmZzZXQsIGRlbGltaXRlcik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGVsaW1pdGVyID0gXCJcIikge1xuICBjb25zdCBzaWduID0gb2Zmc2V0ID4gMCA/IFwiLVwiIDogXCIrXCI7XG4gIGNvbnN0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIGNvbnN0IGhvdXJzID0gYWRkTGVhZGluZ1plcm9zKE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLCAyKTtcbiAgY29uc3QgbWludXRlcyA9IGFkZExlYWRpbmdaZXJvcyhhYnNPZmZzZXQgJSA2MCwgMik7XG4gIHJldHVybiBzaWduICsgaG91cnMgKyBkZWxpbWl0ZXIgKyBtaW51dGVzO1xufVxuIiwiY29uc3QgZGF0ZUxvbmdGb3JtYXR0ZXIgPSAocGF0dGVybiwgZm9ybWF0TG9uZykgPT4ge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlIFwiUFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcInNob3J0XCIgfSk7XG4gICAgY2FzZSBcIlBQXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwibWVkaXVtXCIgfSk7XG4gICAgY2FzZSBcIlBQUFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcImxvbmdcIiB9KTtcbiAgICBjYXNlIFwiUFBQUFwiOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwiZnVsbFwiIH0pO1xuICB9XG59O1xuXG5jb25zdCB0aW1lTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgXCJwXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwic2hvcnRcIiB9KTtcbiAgICBjYXNlIFwicHBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJtZWRpdW1cIiB9KTtcbiAgICBjYXNlIFwicHBwXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgIGNhc2UgXCJwcHBwXCI6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJmdWxsXCIgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGRhdGVUaW1lTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIGNvbnN0IG1hdGNoUmVzdWx0ID0gcGF0dGVybi5tYXRjaCgvKFArKShwKyk/LykgfHwgW107XG4gIGNvbnN0IGRhdGVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMV07XG4gIGNvbnN0IHRpbWVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMl07XG5cbiAgaWYgKCF0aW1lUGF0dGVybikge1xuICAgIHJldHVybiBkYXRlTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKTtcbiAgfVxuXG4gIGxldCBkYXRlVGltZUZvcm1hdDtcblxuICBzd2l0Y2ggKGRhdGVQYXR0ZXJuKSB7XG4gICAgY2FzZSBcIlBcIjpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcInNob3J0XCIgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUFBcIjpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcIm1lZGl1bVwiIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBQUFwiOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBQUFBcIjpcbiAgICBkZWZhdWx0OlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwiZnVsbFwiIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRpbWVGb3JtYXRcbiAgICAucmVwbGFjZShcInt7ZGF0ZX19XCIsIGRhdGVMb25nRm9ybWF0dGVyKGRhdGVQYXR0ZXJuLCBmb3JtYXRMb25nKSlcbiAgICAucmVwbGFjZShcInt7dGltZX19XCIsIHRpbWVMb25nRm9ybWF0dGVyKHRpbWVQYXR0ZXJuLCBmb3JtYXRMb25nKSk7XG59O1xuXG5leHBvcnQgY29uc3QgbG9uZ0Zvcm1hdHRlcnMgPSB7XG4gIHA6IHRpbWVMb25nRm9ybWF0dGVyLFxuICBQOiBkYXRlVGltZUxvbmdGb3JtYXR0ZXIsXG59O1xuIiwiY29uc3QgZGF5T2ZZZWFyVG9rZW5SRSA9IC9eRCskLztcbmNvbnN0IHdlZWtZZWFyVG9rZW5SRSA9IC9eWSskLztcblxuY29uc3QgdGhyb3dUb2tlbnMgPSBbXCJEXCIsIFwiRERcIiwgXCJZWVwiLCBcIllZWVlcIl07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuKHRva2VuKSB7XG4gIHJldHVybiBkYXlPZlllYXJUb2tlblJFLnRlc3QodG9rZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuKHRva2VuKSB7XG4gIHJldHVybiB3ZWVrWWVhclRva2VuUkUudGVzdCh0b2tlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuT3JUaHJvd1Byb3RlY3RlZEVycm9yKHRva2VuLCBmb3JtYXQsIGlucHV0KSB7XG4gIGNvbnN0IF9tZXNzYWdlID0gbWVzc2FnZSh0b2tlbiwgZm9ybWF0LCBpbnB1dCk7XG4gIGNvbnNvbGUud2FybihfbWVzc2FnZSk7XG4gIGlmICh0aHJvd1Rva2Vucy5pbmNsdWRlcyh0b2tlbikpIHRocm93IG5ldyBSYW5nZUVycm9yKF9tZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gbWVzc2FnZSh0b2tlbiwgZm9ybWF0LCBpbnB1dCkge1xuICBjb25zdCBzdWJqZWN0ID0gdG9rZW5bMF0gPT09IFwiWVwiID8gXCJ5ZWFyc1wiIDogXCJkYXlzIG9mIHRoZSBtb250aFwiO1xuICByZXR1cm4gYFVzZSBcXGAke3Rva2VuLnRvTG93ZXJDYXNlKCl9XFxgIGluc3RlYWQgb2YgXFxgJHt0b2tlbn1cXGAgKGluIFxcYCR7Zm9ybWF0fVxcYCkgZm9yIGZvcm1hdHRpbmcgJHtzdWJqZWN0fSB0byB0aGUgaW5wdXQgXFxgJHtpbnB1dH1cXGA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZGA7XG59XG4iLCJpbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSBcIi4vaXNWYWxpZC5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGRlZmF1bHRMb2NhbGUgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRMb2NhbGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5pbXBvcnQgeyBmb3JtYXR0ZXJzIH0gZnJvbSBcIi4vX2xpYi9mb3JtYXQvZm9ybWF0dGVycy5tanNcIjtcbmltcG9ydCB7IGxvbmdGb3JtYXR0ZXJzIH0gZnJvbSBcIi4vX2xpYi9mb3JtYXQvbG9uZ0Zvcm1hdHRlcnMubWpzXCI7XG5pbXBvcnQge1xuICBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuLFxuICBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4sXG4gIHdhcm5PclRocm93UHJvdGVjdGVkRXJyb3IsXG59IGZyb20gXCIuL19saWIvcHJvdGVjdGVkVG9rZW5zLm1qc1wiO1xuXG4vLyBUaGlzIFJlZ0V4cCBjb25zaXN0cyBvZiB0aHJlZSBwYXJ0cyBzZXBhcmF0ZWQgYnkgYHxgOlxuLy8gLSBbeVlRcU1Md0lkRGVjaWhIS2ttc11vIG1hdGNoZXMgYW55IGF2YWlsYWJsZSBvcmRpbmFsIG51bWJlciB0b2tlblxuLy8gICAob25lIG9mIHRoZSBjZXJ0YWluIGxldHRlcnMgZm9sbG93ZWQgYnkgYG9gKVxuLy8gLSAoXFx3KVxcMSogbWF0Y2hlcyBhbnkgc2VxdWVuY2VzIG9mIHRoZSBzYW1lIGxldHRlclxuLy8gLSAnJyBtYXRjaGVzIHR3byBxdW90ZSBjaGFyYWN0ZXJzIGluIGEgcm93XG4vLyAtICcoJyd8W14nXSkrKCd8JCkgbWF0Y2hlcyBhbnl0aGluZyBzdXJyb3VuZGVkIGJ5IHR3byBxdW90ZSBjaGFyYWN0ZXJzICgnKSxcbi8vICAgZXhjZXB0IGEgc2luZ2xlIHF1b3RlIHN5bWJvbCwgd2hpY2ggZW5kcyB0aGUgc2VxdWVuY2UuXG4vLyAgIFR3byBxdW90ZSBjaGFyYWN0ZXJzIGRvIG5vdCBlbmQgdGhlIHNlcXVlbmNlLlxuLy8gICBJZiB0aGVyZSBpcyBubyBtYXRjaGluZyBzaW5nbGUgcXVvdGVcbi8vICAgdGhlbiB0aGUgc2VxdWVuY2Ugd2lsbCBjb250aW51ZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4vLyAtIC4gbWF0Y2hlcyBhbnkgc2luZ2xlIGNoYXJhY3RlciB1bm1hdGNoZWQgYnkgcHJldmlvdXMgcGFydHMgb2YgdGhlIFJlZ0V4cHNcbmNvbnN0IGZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPVxuICAvW3lZUXFNTHdJZERlY2loSEtrbXNdb3woXFx3KVxcMSp8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbmNvbnN0IGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1ArcCt8UCt8cCt8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbmNvbnN0IGVzY2FwZWRTdHJpbmdSZWdFeHAgPSAvXicoW15dKj8pJz8kLztcbmNvbnN0IGRvdWJsZVF1b3RlUmVnRXhwID0gLycnL2c7XG5jb25zdCB1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCA9IC9bYS16QS1aXS87XG5cbi8qKlxuICogVGhlIHtAbGluayBmb3JtYXR9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBmb3JtYXRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgRm9ybWF0IHRoZSBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gdGhlIGdpdmVuIGZvcm1hdC4gVGhlIHJlc3VsdCBtYXkgdmFyeSBieSBsb2NhbGUuXG4gKlxuICogPiDimqDvuI8gUGxlYXNlIG5vdGUgdGhhdCB0aGUgYGZvcm1hdGAgdG9rZW5zIGRpZmZlciBmcm9tIE1vbWVudC5qcyBhbmQgb3RoZXIgbGlicmFyaWVzLlxuICogPiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGJldHdlZW4gdHdvIHNpbmdsZSBxdW90ZXMgY2hhcmFjdGVycyAoJykgYXJlIGVzY2FwZWQuXG4gKiBUd28gc2luZ2xlIHF1b3RlcyBpbiBhIHJvdywgd2hldGhlciBpbnNpZGUgb3Igb3V0c2lkZSBhIHF1b3RlZCBzZXF1ZW5jZSwgcmVwcmVzZW50IGEgJ3JlYWwnIHNpbmdsZSBxdW90ZS5cbiAqIChzZWUgdGhlIGxhc3QgZXhhbXBsZSlcbiAqXG4gKiBGb3JtYXQgb2YgdGhlIHN0cmluZyBpcyBiYXNlZCBvbiBVbmljb2RlIFRlY2huaWNhbCBTdGFuZGFyZCAjMzU6XG4gKiBodHRwczovL3d3dy51bmljb2RlLm9yZy9yZXBvcnRzL3RyMzUvdHIzNS1kYXRlcy5odG1sI0RhdGVfRmllbGRfU3ltYm9sX1RhYmxlXG4gKiB3aXRoIGEgZmV3IGFkZGl0aW9ucyAoc2VlIG5vdGUgNyBiZWxvdyB0aGUgdGFibGUpLlxuICpcbiAqIEFjY2VwdGVkIHBhdHRlcm5zOlxuICogfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUGF0dGVybiB8IFJlc3VsdCBleGFtcGxlcyAgICAgICAgICAgICAgICAgICB8IE5vdGVzIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS18XG4gKiB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHLi5HR0cgIHwgQUQsIEJDICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgR0dHRyAgICB8IEFubm8gRG9taW5pLCBCZWZvcmUgQ2hyaXN0ICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0dHICAgfCBBLCBCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IENhbGVuZGFyIHllYXIgICAgICAgICAgICAgICAgICAgfCB5ICAgICAgIHwgNDQsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeW8gICAgICB8IDQ0dGgsIDFzdCwgMHRoLCAxN3RoICAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5ICAgICAgfCA0NCwgMDEsIDAwLCAxNyAgICAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXkgICAgIHwgMDQ0LCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5eSAgICB8IDAwNDQsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXl5ICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgfCBZICAgICAgIHwgNDQsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWW8gICAgICB8IDQ0dGgsIDFzdCwgMTkwMHRoLCAyMDE3dGggICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZICAgICAgfCA0NCwgMDEsIDAwLCAxNyAgICAgICAgICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVkgICAgIHwgMDQ0LCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZWSAgICB8IDAwNDQsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICB8IDUsOCAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVlZICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICAgfCBSICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlIgICAgICB8IC00MywgMDAsIDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUiAgICAgfCAtMDQzLCAwMDAsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlJSICAgIHwgLTAwNDMsIDAwMDAsIDAwMDEsIDE5MDAsIDIwMTcgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUlIgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSw3IHxcbiAqIHwgRXh0ZW5kZWQgeWVhciAgICAgICAgICAgICAgICAgICB8IHUgICAgICAgfCAtNDMsIDAsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dSAgICAgIHwgLTQzLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1ICAgICB8IC0wNDMsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dXUgICAgfCAtMDA0MywgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1dSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBRdWFydGVyIChmb3JtYXR0aW5nKSAgICAgICAgICAgIHwgUSAgICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFvICAgICAgfCAxc3QsIDJuZCwgM3JkLCA0dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUSAgICAgIHwgMDEsIDAyLCAwMywgMDQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRICAgICB8IFExLCBRMiwgUTMsIFE0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUVEgICAgfCAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRUSAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgNCAgICAgfFxuICogfCBRdWFydGVyIChzdGFuZC1hbG9uZSkgICAgICAgICAgIHwgcSAgICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFvICAgICAgfCAxc3QsIDJuZCwgM3JkLCA0dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcSAgICAgIHwgMDEsIDAyLCAwMywgMDQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxICAgICB8IFExLCBRMiwgUTMsIFE0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcXEgICAgfCAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxcSAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgNCAgICAgfFxuICogfCBNb250aCAoZm9ybWF0dGluZykgICAgICAgICAgICAgIHwgTSAgICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1vICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMnRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTSAgICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NICAgICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTU0gICAgfCBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlciAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NTSAgIHwgSiwgRiwgLi4uLCBEICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNb250aCAoc3RhbmQtYWxvbmUpICAgICAgICAgICAgIHwgTCAgICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMnRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTCAgICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMICAgICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTEwgICAgfCBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlciAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMTCAgIHwgSiwgRiwgLi4uLCBEICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgIHwgdyAgICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHdvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA1M3RoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3dyAgICAgIHwgMDEsIDAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBJU08gd2VlayBvZiB5ZWFyICAgICAgICAgICAgICAgIHwgSSAgICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IElvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA1M3RoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJSSAgICAgIHwgMDEsIDAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgIHwgZCAgICAgICB8IDEsIDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGRvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAzMXN0ICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZCAgICAgIHwgMDEsIDAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBEYXkgb2YgeWVhciAgICAgICAgICAgICAgICAgICAgIHwgRCAgICAgICB8IDEsIDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAzNjV0aCwgMzY2dGggICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBERCAgICAgIHwgMDEsIDAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgIHwgOSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREREICAgICB8IDAwMSwgMDAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEREREQgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzICAgICB8XG4gKiB8IERheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICAgICAgfCBFLi5FRUUgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRUUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBJU08gZGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICAgIHwgaSAgICAgICB8IDEsIDIsIDMsIC4uLiwgNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA3dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaSAgICAgIHwgMDEsIDAyLCAuLi4sIDA3ICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWkgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyLDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpaSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWlpICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8IDcgICAgIHxcbiAqIHwgTG9jYWwgZGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICB8IGUgICAgICAgfCAyLCAzLCA0LCAuLi4sIDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlbyAgICAgIHwgMm5kLCAzcmQsIC4uLiwgMXN0ICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWUgICAgICB8IDAyLCAwMywgLi4uLCAwMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZWUgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlZSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChzdGFuZC1hbG9uZSkgfCBjICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY28gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2MgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjYyAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjY2MgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgYS4uYWEgICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYSAgICAgfCBhbSwgcG0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWFhICAgIHwgYS5tLiwgcC5tLiAgICAgICAgICAgICAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYWEgICB8IGEsIHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICB8IGIuLmJiICAgfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmIgICAgIHwgYW0sIHBtLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiYiAgICB8IGEubS4sIHAubS4sIG5vb24sIG1pZG5pZ2h0ICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmJiICAgfCBhLCBwLCBuLCBtaSAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICAgfCBCLi5CQkIgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgQkJCQiAgICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkJCICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICAgfCBoICAgICAgIHwgMSwgMiwgLi4uLCAxMSwgMTIgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDExdGgsIDEydGggICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhoICAgICAgfCAwMSwgMDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICAgfCBIICAgICAgIHwgMCwgMSwgMiwgLi4uLCAyMyAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSG8gICAgICB8IDB0aCwgMXN0LCAybmQsIC4uLiwgMjNyZCAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhIICAgICAgfCAwMCwgMDEsIDAyLCAuLi4sIDIzICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICAgfCBLICAgICAgIHwgMSwgMiwgLi4uLCAxMSwgMCAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgS28gICAgICB8IDFzdCwgMm5kLCAuLi4sIDExdGgsIDB0aCAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtLICAgICAgfCAwMSwgMDIsIC4uLiwgMTEsIDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICAgfCBrICAgICAgIHwgMjQsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwga28gICAgICB8IDI0dGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtrICAgICAgfCAyNCwgMDEsIDAyLCAuLi4sIDIzICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtICAgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbW8gICAgICB8IDB0aCwgMXN0LCAuLi4sIDU5dGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1tICAgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzICAgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgc28gICAgICB8IDB0aCwgMXN0LCAuLi4sIDU5dGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNzICAgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICAgfCBTICAgICAgIHwgMCwgMSwgLi4uLCA5ICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1MgICAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTUyAgICAgfCAwMDAsIDAwMSwgLi4uLCA5OTkgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1NTICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy8gWikgICAgICAgIHwgWCAgICAgICB8IC0wOCwgKzA1MzAsIFogICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYICAgICAgfCAtMDgwMCwgKzA1MzAsIFogICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFggICAgIHwgLTA4OjAwLCArMDU6MzAsIFogICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYWCAgICB8IC0wODAwLCArMDUzMCwgWiwgKzEyMzQ1NiAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFhYICAgfCAtMDg6MDAsICswNTozMCwgWiwgKzEyOjM0OjU2ICAgICAgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICAgfCB4ICAgICAgIHwgLTA4LCArMDUzMCwgKzAwICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHggICAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eCAgICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwICAgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHh4ICAgIHwgLTA4MDAsICswNTMwLCArMDAwMCwgKzEyMzQ1NiAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eHggICB8IC0wODowMCwgKzA1OjMwLCArMDA6MDAsICsxMjozNDo1NiB8ICAgICAgIHxcbiAqIHwgVGltZXpvbmUgKEdNVCkgICAgICAgICAgICAgICAgICB8IE8uLi5PT08gfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBPT09PICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiAgICAgfFxuICogfCBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0LikgIHwgei4uLnp6eiB8IEdNVC04LCBHTVQrNTozMCwgR01UKzAgICAgICAgICAgICB8IDYgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHp6enogICAgfCBHTVQtMDg6MDAsIEdNVCswNTozMCwgR01UKzAwOjAwICAgfCAyLDYgICB8XG4gKiB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICAgfCB0ICAgICAgIHwgNTEyOTY5NTIwICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdHQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICB8IFQgICAgICAgfCA1MTI5Njk1MjA5MDAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBUVCAgICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw3ICAgfFxuICogfCBMb25nIGxvY2FsaXplZCBkYXRlICAgICAgICAgICAgIHwgUCAgICAgICB8IDA0LzI5LzE0NTMgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQICAgICAgfCBBcHIgMjksIDE0NTMgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFAgICAgIHwgQXByaWwgMjl0aCwgMTQ1MyAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUCAgICB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyAgICAgICAgICB8IDIsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgdGltZSAgICAgICAgICAgICB8IHAgICAgICAgfCAxMjowMCBBTSAgICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcCAgICAgIHwgMTI6MDA6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHBwICAgICB8IDEyOjAwOjAwIEFNIEdNVCsyICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcHAgICAgfCAxMjowMDowMCBBTSBHTVQrMDI6MDAgICAgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IENvbWJpbmF0aW9uIG9mIGRhdGUgYW5kIHRpbWUgICAgfCBQcCAgICAgIHwgMDQvMjkvMTQ1MywgMTI6MDAgQU0gICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBwcCAgICB8IEFwciAyOSwgMTQ1MywgMTI6MDA6MDAgQU0gICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUHBwcCAgfCBBcHJpbCAyOXRoLCAxNDUzIGF0IC4uLiAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBQcHBwcHwgRnJpZGF5LCBBcHJpbCAyOXRoLCAxNDUzIGF0IC4uLiAgIHwgMiw3ICAgfFxuICogTm90ZXM6XG4gKiAxLiBcIkZvcm1hdHRpbmdcIiB1bml0cyAoZS5nLiBmb3JtYXR0aW5nIHF1YXJ0ZXIpIGluIHRoZSBkZWZhdWx0IGVuLVVTIGxvY2FsZVxuICogICAgYXJlIHRoZSBzYW1lIGFzIFwic3RhbmQtYWxvbmVcIiB1bml0cywgYnV0IGFyZSBkaWZmZXJlbnQgaW4gc29tZSBsYW5ndWFnZXMuXG4gKiAgICBcIkZvcm1hdHRpbmdcIiB1bml0cyBhcmUgZGVjbGluZWQgYWNjb3JkaW5nIHRvIHRoZSBydWxlcyBvZiB0aGUgbGFuZ3VhZ2VcbiAqICAgIGluIHRoZSBjb250ZXh0IG9mIGEgZGF0ZS4gXCJTdGFuZC1hbG9uZVwiIHVuaXRzIGFyZSBhbHdheXMgbm9taW5hdGl2ZSBzaW5ndWxhcjpcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ2RvIExMTEwnLCB7bG9jYWxlOiBjc30pIC8vPT4gJzYuIGxpc3RvcGFkJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ2RvIE1NTU0nLCB7bG9jYWxlOiBjc30pIC8vPT4gJzYuIGxpc3RvcGFkdSdgXG4gKlxuICogMi4gQW55IHNlcXVlbmNlIG9mIHRoZSBpZGVudGljYWwgbGV0dGVycyBpcyBhIHBhdHRlcm4sIHVubGVzcyBpdCBpcyBlc2NhcGVkIGJ5XG4gKiAgICB0aGUgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnMgKHNlZSBiZWxvdykuXG4gKiAgICBJZiB0aGUgc2VxdWVuY2UgaXMgbG9uZ2VyIHRoYW4gbGlzdGVkIGluIHRhYmxlIChlLmcuIGBFRUVFRUVFRUVFRWApXG4gKiAgICB0aGUgb3V0cHV0IHdpbGwgYmUgdGhlIHNhbWUgYXMgZGVmYXVsdCBwYXR0ZXJuIGZvciB0aGlzIHVuaXQsIHVzdWFsbHlcbiAqICAgIHRoZSBsb25nZXN0IG9uZSAoaW4gY2FzZSBvZiBJU08gd2Vla2RheXMsIGBFRUVFYCkuIERlZmF1bHQgcGF0dGVybnMgZm9yIHVuaXRzXG4gKiAgICBhcmUgbWFya2VkIHdpdGggXCIyXCIgaW4gdGhlIGxhc3QgY29sdW1uIG9mIHRoZSB0YWJsZS5cbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTScpIC8vPT4gJ05vdidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU0nKSAvLz0+ICdOJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogMy4gU29tZSBwYXR0ZXJucyBjb3VsZCBiZSB1bmxpbWl0ZWQgbGVuZ3RoIChzdWNoIGFzIGB5eXl5eXl5eWApLlxuICogICAgVGhlIG91dHB1dCB3aWxsIGJlIHBhZGRlZCB3aXRoIHplcm9zIHRvIG1hdGNoIHRoZSBsZW5ndGggb2YgdGhlIHBhdHRlcm4uXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICd5eXl5eXl5eScpIC8vPT4gJzAwMDAyMDE3J2BcbiAqXG4gKiA0LiBgUVFRUVFgIGFuZCBgcXFxcXFgIGNvdWxkIGJlIG5vdCBzdHJpY3RseSBudW1lcmljYWwgaW4gc29tZSBsb2NhbGVzLlxuICogICAgVGhlc2UgdG9rZW5zIHJlcHJlc2VudCB0aGUgc2hvcnRlc3QgZm9ybSBvZiB0aGUgcXVhcnRlci5cbiAqXG4gKiA1LiBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4gYHlgIGFuZCBgdWAgcGF0dGVybnMgYXJlIEIuQy4geWVhcnM6XG4gKlxuICogICAgfCBZZWFyIHwgYHlgIHwgYHVgIHxcbiAqICAgIHwtLS0tLS18LS0tLS18LS0tLS18XG4gKiAgICB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICogICAgfCBCQyAxIHwgICAxIHwgICAwIHxcbiAqICAgIHwgQkMgMiB8ICAgMiB8ICAtMSB8XG4gKlxuICogICAgQWxzbyBgeXlgIGFsd2F5cyByZXR1cm5zIHRoZSBsYXN0IHR3byBkaWdpdHMgb2YgYSB5ZWFyLFxuICogICAgd2hpbGUgYHV1YCBwYWRzIHNpbmdsZSBkaWdpdCB5ZWFycyB0byAyIGNoYXJhY3RlcnMgYW5kIHJldHVybnMgb3RoZXIgeWVhcnMgdW5jaGFuZ2VkOlxuICpcbiAqICAgIHwgWWVhciB8IGB5eWAgfCBgdXVgIHxcbiAqICAgIHwtLS0tLS18LS0tLS0tfC0tLS0tLXxcbiAqICAgIHwgMSAgICB8ICAgMDEgfCAgIDAxIHxcbiAqICAgIHwgMTQgICB8ICAgMTQgfCAgIDE0IHxcbiAqICAgIHwgMzc2ICB8ICAgNzYgfCAgMzc2IHxcbiAqICAgIHwgMTQ1MyB8ICAgNTMgfCAxNDUzIHxcbiAqXG4gKiAgICBUaGUgc2FtZSBkaWZmZXJlbmNlIGlzIHRydWUgZm9yIGxvY2FsIGFuZCBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgKGBZYCBhbmQgYFJgKSxcbiAqICAgIGV4Y2VwdCBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFycyBhcmUgZGVwZW5kZW50IG9uIGBvcHRpb25zLndlZWtTdGFydHNPbmBcbiAqICAgIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgIChjb21wYXJlIFtnZXRJU09XZWVrWWVhcl0oaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9nZXRJU09XZWVrWWVhcilcbiAqICAgIGFuZCBbZ2V0V2Vla1llYXJdKGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0V2Vla1llYXIpKS5cbiAqXG4gKiA2LiBTcGVjaWZpYyBub24tbG9jYXRpb24gdGltZXpvbmVzIGFyZSBjdXJyZW50bHkgdW5hdmFpbGFibGUgaW4gYGRhdGUtZm5zYCxcbiAqICAgIHNvIHJpZ2h0IG5vdyB0aGVzZSB0b2tlbnMgZmFsbCBiYWNrIHRvIEdNVCB0aW1lem9uZXMuXG4gKlxuICogNy4gVGhlc2UgcGF0dGVybnMgYXJlIG5vdCBpbiB0aGUgVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogICAgLSBgaWA6IElTTyBkYXkgb2Ygd2Vla1xuICogICAgLSBgSWA6IElTTyB3ZWVrIG9mIHllYXJcbiAqICAgIC0gYFJgOiBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICogICAgLSBgdGA6IHNlY29uZHMgdGltZXN0YW1wXG4gKiAgICAtIGBUYDogbWlsbGlzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgb2A6IG9yZGluYWwgbnVtYmVyIG1vZGlmaWVyXG4gKiAgICAtIGBQYDogbG9uZyBsb2NhbGl6ZWQgZGF0ZVxuICogICAgLSBgcGA6IGxvbmcgbG9jYWxpemVkIHRpbWVcbiAqXG4gKiA4LiBgWVlgIGFuZCBgWVlZWWAgdG9rZW5zIHJlcHJlc2VudCB3ZWVrLW51bWJlcmluZyB5ZWFycyBidXQgdGhleSBhcmUgb2Z0ZW4gY29uZnVzZWQgd2l0aCB5ZWFycy5cbiAqICAgIFlvdSBzaG91bGQgZW5hYmxlIGBvcHRpb25zLnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIDkuIGBEYCBhbmQgYEREYCB0b2tlbnMgcmVwcmVzZW50IGRheXMgb2YgdGhlIHllYXIgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggZGF5cyBvZiB0aGUgbW9udGguXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zYCB0byB1c2UgdGhlbS4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIGZvcm1hdCAtIFRoZSBzdHJpbmcgb2YgdG9rZW5zXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nXG4gKlxuICogQHRocm93cyBgZGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBsb2NhbGl6ZWAgcHJvcGVydHlcbiAqIEB0aHJvd3MgYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdExvbmdgIHByb3BlcnR5XG4gKiBAdGhyb3dzIHVzZSBgeXl5eWAgaW5zdGVhZCBvZiBgWVlZWWAgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB1c2UgYHl5YCBpbnN0ZWFkIG9mIGBZWWAgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB1c2UgYGRgIGluc3RlYWQgb2YgYERgIGZvciBmb3JtYXR0aW5nIGRheXMgb2YgdGhlIG1vbnRoIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3MgdXNlIGBkZGAgaW5zdGVhZCBvZiBgRERgIGZvciBmb3JtYXR0aW5nIGRheXMgb2YgdGhlIG1vbnRoIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3MgZm9ybWF0IHN0cmluZyBjb250YWlucyBhbiB1bmVzY2FwZWQgbGF0aW4gYWxwaGFiZXQgY2hhcmFjdGVyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxMSBGZWJydWFyeSAyMDE0IGluIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDEsIDExKSwgJ01NL2RkL3l5eXknKVxuICogLy89PiAnMDIvMTEvMjAxNCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDIgSnVseSAyMDE0IGluIEVzcGVyYW50bzpcbiAqIGltcG9ydCB7IGVvTG9jYWxlIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIpLCBcImRvICdkZScgTU1NTSB5eXl5XCIsIHtcbiAqICAgbG9jYWxlOiBlb0xvY2FsZVxuICogfSlcbiAqIC8vPT4gJzItYSBkZSBqdWxpbyAyMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBFc2NhcGUgc3RyaW5nIGJ5IHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzOlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIsIDE1KSwgXCJoICdvJydjbG9jaydcIilcbiAqIC8vPT4gXCIzIG8nY2xvY2tcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IGxvY2FsZSA9IG9wdGlvbnM/LmxvY2FsZSA/PyBkZWZhdWx0T3B0aW9ucy5sb2NhbGUgPz8gZGVmYXVsdExvY2FsZTtcblxuICBjb25zdCBmaXJzdFdlZWtDb250YWluc0RhdGUgPVxuICAgIG9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICAxO1xuXG4gIGNvbnN0IHdlZWtTdGFydHNPbiA9XG4gICAgb3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIDA7XG5cbiAgY29uc3Qgb3JpZ2luYWxEYXRlID0gdG9EYXRlKGRhdGUpO1xuXG4gIGlmICghaXNWYWxpZChvcmlnaW5hbERhdGUpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbnZhbGlkIHRpbWUgdmFsdWVcIik7XG4gIH1cblxuICBjb25zdCBmb3JtYXR0ZXJPcHRpb25zID0ge1xuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogZmlyc3RXZWVrQ29udGFpbnNEYXRlLFxuICAgIHdlZWtTdGFydHNPbjogd2Vla1N0YXJ0c09uLFxuICAgIGxvY2FsZTogbG9jYWxlLFxuICAgIF9vcmlnaW5hbERhdGU6IG9yaWdpbmFsRGF0ZSxcbiAgfTtcblxuICBjb25zdCByZXN1bHQgPSBmb3JtYXRTdHJcbiAgICAubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgICBjb25zdCBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCJwXCIgfHwgZmlyc3RDaGFyYWN0ZXIgPT09IFwiUFwiKSB7XG4gICAgICAgIGNvbnN0IGxvbmdGb3JtYXR0ZXIgPSBsb25nRm9ybWF0dGVyc1tmaXJzdENoYXJhY3Rlcl07XG4gICAgICAgIHJldHVybiBsb25nRm9ybWF0dGVyKHN1YnN0cmluZywgbG9jYWxlLmZvcm1hdExvbmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICB9KVxuICAgIC5qb2luKFwiXCIpXG4gICAgLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgICAvLyBSZXBsYWNlIHR3byBzaW5nbGUgcXVvdGUgY2hhcmFjdGVycyB3aXRoIG9uZSBzaW5nbGUgcXVvdGUgY2hhcmFjdGVyXG4gICAgICBpZiAoc3Vic3RyaW5nID09PSBcIicnXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiJ1wiO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCInXCIpIHtcbiAgICAgICAgcmV0dXJuIGNsZWFuRXNjYXBlZFN0cmluZyhzdWJzdHJpbmcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmb3JtYXR0ZXIgPSBmb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgIGlmIChmb3JtYXR0ZXIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFvcHRpb25zPy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnMgJiZcbiAgICAgICAgICBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4oc3Vic3RyaW5nKVxuICAgICAgICApIHtcbiAgICAgICAgICB3YXJuT3JUaHJvd1Byb3RlY3RlZEVycm9yKHN1YnN0cmluZywgZm9ybWF0U3RyLCBTdHJpbmcoZGF0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhb3B0aW9ucz8udXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyAmJlxuICAgICAgICAgIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4oc3Vic3RyaW5nKVxuICAgICAgICApIHtcbiAgICAgICAgICB3YXJuT3JUaHJvd1Byb3RlY3RlZEVycm9yKHN1YnN0cmluZywgZm9ybWF0U3RyLCBTdHJpbmcoZGF0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXIoXG4gICAgICAgICAgb3JpZ2luYWxEYXRlLFxuICAgICAgICAgIHN1YnN0cmluZyxcbiAgICAgICAgICBsb2NhbGUubG9jYWxpemUsXG4gICAgICAgICAgZm9ybWF0dGVyT3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyLm1hdGNoKHVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwKSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgICAgICBcIkZvcm1hdCBzdHJpbmcgY29udGFpbnMgYW4gdW5lc2NhcGVkIGxhdGluIGFscGhhYmV0IGNoYXJhY3RlciBgXCIgK1xuICAgICAgICAgICAgZmlyc3RDaGFyYWN0ZXIgK1xuICAgICAgICAgICAgXCJgXCIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWJzdHJpbmc7XG4gICAgfSlcbiAgICAuam9pbihcIlwiKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjbGVhbkVzY2FwZWRTdHJpbmcoaW5wdXQpIHtcbiAgY29uc3QgbWF0Y2hlZCA9IGlucHV0Lm1hdGNoKGVzY2FwZWRTdHJpbmdSZWdFeHApO1xuXG4gIGlmICghbWF0Y2hlZCkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVkWzFdLnJlcGxhY2UoZG91YmxlUXVvdGVSZWdFeHAsIFwiJ1wiKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBmb3JtYXQ7XG4iLCJleHBvcnQgY29uc3QgRXhwb3J0ZXJzID0gWydjc3YnLCAnanNvbicsICd4bWwnXTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgTG9hZGVyLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCBmb3JtYXQgZnJvbSAnZGF0ZS1mbnMvZm9ybWF0JztcbmltcG9ydCB7IEV4cG9ydGVycyB9IGZyb20gJy4uL2V4cG9ydGVyLnR5cGUuanMnO1xuZXhwb3J0IGNvbnN0IG1pbWVUeXBlcyA9IHtcbiAgICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgY3N2OiAndGV4dC9jc3YnLFxuICAgIHhtbDogJ3RleHQveG1sJyxcbn07XG5leHBvcnQgY29uc3QgZ2V0RXhwb3J0ZWRGaWxlTmFtZSA9IChleHRlbnNpb24pID0+IGBleHBvcnQtJHtmb3JtYXQoRGF0ZS5ub3coKSwgJ3l5eXktTU0tZGRfSEgtbW0nKX0uJHtleHRlbnNpb259YDtcbmNvbnN0IEV4cG9ydENvbXBvbmVudCA9ICh7IHJlc291cmNlIH0pID0+IHtcbiAgICBjb25zdCBbaXNGZXRjaGluZywgc2V0RmV0Y2hpbmddID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBzZW5kTm90aWNlID0gdXNlTm90aWNlKCk7XG4gICAgY29uc3QgZXhwb3J0RGF0YSA9IGFzeW5jICh0eXBlKSA9PiB7XG4gICAgICAgIHNldEZldGNoaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IGV4cG9ydGVkRGF0YSB9LCB9ID0gYXdhaXQgbmV3IEFwaUNsaWVudCgpLnJlc291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiByZXNvdXJjZS5pZCxcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnZXhwb3J0JyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2V4cG9ydGVkRGF0YV0sIHsgdHlwZTogbWltZVR5cGVzW3R5cGVdIH0pO1xuICAgICAgICAgICAgc2F2ZUFzKGJsb2IsIGdldEV4cG9ydGVkRmlsZU5hbWUodHlwZSkpO1xuICAgICAgICAgICAgc2VuZE5vdGljZSh7IG1lc3NhZ2U6ICdFeHBvcnRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiBlLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmV0Y2hpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgaWYgKGlzRmV0Y2hpbmcpIHtcbiAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz47XG4gICAgfVxuICAgIHJldHVybiAoPEJveD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiPlxuICAgICAgICA8VGV4dCB2YXJpYW50PVwibGdcIj5DaG9vc2UgZXhwb3J0IGZvcm1hdDo8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiPlxuICAgICAgICB7RXhwb3J0ZXJzLm1hcChwYXJzZXJUeXBlID0+ICg8Qm94IGtleT17cGFyc2VyVHlwZX0gbT17Mn0+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IGV4cG9ydERhdGEocGFyc2VyVHlwZSl9IGRpc2FibGVkPXtpc0ZldGNoaW5nfT5cbiAgICAgICAgICAgICAge3BhcnNlclR5cGUudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PikpfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBFeHBvcnRDb21wb25lbnQ7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBJbWFnZVZpZXcgZnJvbSAnLi4vc3JjL2NvbW1vbi9hZG1pbmpzL2NvbXBvbmVudHMvSW1hZ2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlVmlldyA9IEltYWdlVmlld1xuaW1wb3J0IFVwbG9hZEVkaXRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMl9hZG1pbmpzQDcuNS42L25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMl9hZG1pbmpzQDcuNS42L25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRMaXN0Q29tcG9uZW50ID0gVXBsb2FkTGlzdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZFNob3dDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3VwbG9hZEA0LjAuMl9hZG1pbmpzQDcuNS42L25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRTaG93Q29tcG9uZW50ID0gVXBsb2FkU2hvd0NvbXBvbmVudFxuaW1wb3J0IEltcG9ydENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMraW1wb3J0LWV4cG9ydEAzLjAuMF9hZG1pbmpzQDcuNS42L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0ltcG9ydENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1wb3J0Q29tcG9uZW50ID0gSW1wb3J0Q29tcG9uZW50XG5pbXBvcnQgRXhwb3J0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytpbXBvcnQtZXhwb3J0QDMuMC4wX2FkbWluanNANy41LjYvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2NvbXBvbmVudHMvRXhwb3J0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5FeHBvcnRDb21wb25lbnQgPSBFeHBvcnRDb21wb25lbnQiXSwibmFtZXMiOlsiSW1hZ2VWaWV3Iiwia2V5IiwicmVjb3JkIiwicGFyYW1zIiwiY29uc29sZSIsImxvZyIsImJhc2VVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3QiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY29sb3IiLCJmb250V2VpZ2h0Iiwid2lkdGgiLCJhc3BlY3RSYXRpbyIsInNyYyIsInByb3RvY29sIiwiRWRpdCIsInByb3BlcnR5Iiwib25DaGFuZ2UiLCJ0cmFuc2xhdGVQcm9wZXJ0eSIsInVzZVRyYW5zbGF0aW9uIiwiY3VzdG9tIiwicGF0aCIsImZsYXQiLCJnZXQiLCJmaWxlUGF0aFByb3BlcnR5Iiwia2V5UHJvcGVydHkiLCJmaWxlIiwiZmlsZVByb3BlcnR5Iiwib3JpZ2luYWxLZXkiLCJzZXRPcmlnaW5hbEtleSIsInVzZVN0YXRlIiwiZmlsZXNUb1VwbG9hZCIsInNldEZpbGVzVG9VcGxvYWQiLCJ1c2VFZmZlY3QiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJvblVwbG9hZCIsImZpbGVzIiwiaGFuZGxlUmVtb3ZlIiwiaGFuZGxlTXVsdGlSZW1vdmUiLCJzaW5nbGVLZXkiLCJpbmRleCIsImluZGV4T2YiLCJmaWxlc1RvRGVsZXRlIiwiZmlsZXNUb0RlbGV0ZVByb3BlcnR5IiwibmV3UGF0aCIsIm1hcCIsImN1cnJlbnRQYXRoIiwiaSIsIm5ld1BhcmFtcyIsInNldCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJyZXNvdXJjZUlkIiwiRHJvcFpvbmUiLCJtdWx0aXBsZSIsInZhbGlkYXRlIiwibWltZVR5cGVzIiwibWF4U2l6ZSIsIkRyb3Bab25lSXRlbSIsImZpbGVuYW1lIiwib25SZW1vdmUiLCJGcmFnbWVudCIsIkF1ZGlvTWltZVR5cGVzIiwiSW1hZ2VNaW1lVHlwZXMiLCJTaW5nbGVGaWxlIiwicHJvcHMiLCJuYW1lIiwibWltZVR5cGUiLCJpbmNsdWRlcyIsIm1heEhlaWdodCIsIm1heFdpZHRoIiwiYWx0IiwiY29udHJvbHMiLCJraW5kIiwiQm94IiwiQnV0dG9uIiwiYXMiLCJocmVmIiwibWwiLCJzaXplIiwicm91bmRlZCIsInRhcmdldCIsIkljb24iLCJpY29uIiwibXIiLCJGaWxlIiwiZmlsZU5hbWVQcm9wZXJ0eSIsIm1pbWVUeXBlUHJvcGVydHkiLCJvcHRzIiwic2luZ2xlUGF0aCIsIkxpc3QiLCJTaG93IiwiSW1wb3J0Q29tcG9uZW50IiwicmVzb3VyY2UiLCJzZXRGaWxlIiwic2VuZE5vdGljZSIsInVzZU5vdGljZSIsImlzRmV0Y2hpbmciLCJzZXRGZXRjaGluZyIsInVwbG9hZGVkRmlsZSIsIm9uU3VibWl0IiwiaW1wb3J0RGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiQXBpQ2xpZW50IiwicmVzb3VyY2VBY3Rpb24iLCJtZXRob2QiLCJpZCIsImFjdGlvbk5hbWUiLCJkYXRhIiwibWVzc2FnZSIsInR5cGUiLCJlIiwiTG9hZGVyIiwibWFyZ2luIiwianVzdGlmeUNvbnRlbnQiLCJmbGV4RGlyZWN0aW9uIiwibSIsIm9uQ2xpY2siLCJkaXNhYmxlZCIsImlzRGF0ZSIsInZhbHVlIiwiRGF0ZSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInRvRGF0ZSIsImFyZ3VtZW50IiwiYXJnU3RyIiwiY29uc3RydWN0b3IiLCJOYU4iLCJpc1ZhbGlkIiwiZGF0ZSIsIl9kYXRlIiwiaXNOYU4iLCJOdW1iZXIiLCJmb3JtYXREaXN0YW5jZUxvY2FsZSIsImxlc3NUaGFuWFNlY29uZHMiLCJvbmUiLCJvdGhlciIsInhTZWNvbmRzIiwiaGFsZkFNaW51dGUiLCJsZXNzVGhhblhNaW51dGVzIiwieE1pbnV0ZXMiLCJhYm91dFhIb3VycyIsInhIb3VycyIsInhEYXlzIiwiYWJvdXRYV2Vla3MiLCJ4V2Vla3MiLCJhYm91dFhNb250aHMiLCJ4TW9udGhzIiwiYWJvdXRYWWVhcnMiLCJ4WWVhcnMiLCJvdmVyWFllYXJzIiwiYWxtb3N0WFllYXJzIiwiZm9ybWF0RGlzdGFuY2UiLCJ0b2tlbiIsImNvdW50Iiwib3B0aW9ucyIsInJlc3VsdCIsInRva2VuVmFsdWUiLCJyZXBsYWNlIiwiYWRkU3VmZml4IiwiY29tcGFyaXNvbiIsImJ1aWxkRm9ybWF0TG9uZ0ZuIiwiYXJncyIsIlN0cmluZyIsImRlZmF1bHRXaWR0aCIsImZvcm1hdCIsImZvcm1hdHMiLCJkYXRlRm9ybWF0cyIsImZ1bGwiLCJsb25nIiwibWVkaXVtIiwic2hvcnQiLCJ0aW1lRm9ybWF0cyIsImRhdGVUaW1lRm9ybWF0cyIsImZvcm1hdExvbmciLCJ0aW1lIiwiZGF0ZVRpbWUiLCJmb3JtYXRSZWxhdGl2ZUxvY2FsZSIsImxhc3RXZWVrIiwieWVzdGVyZGF5IiwidG9kYXkiLCJ0b21vcnJvdyIsIm5leHRXZWVrIiwiZm9ybWF0UmVsYXRpdmUiLCJfYmFzZURhdGUiLCJfb3B0aW9ucyIsImJ1aWxkTG9jYWxpemVGbiIsImNvbnRleHQiLCJ2YWx1ZXNBcnJheSIsImZvcm1hdHRpbmdWYWx1ZXMiLCJkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIiwidmFsdWVzIiwiYXJndW1lbnRDYWxsYmFjayIsImVyYVZhbHVlcyIsIm5hcnJvdyIsImFiYnJldmlhdGVkIiwid2lkZSIsInF1YXJ0ZXJWYWx1ZXMiLCJtb250aFZhbHVlcyIsImRheVZhbHVlcyIsImRheVBlcmlvZFZhbHVlcyIsImFtIiwicG0iLCJtaWRuaWdodCIsIm5vb24iLCJtb3JuaW5nIiwiYWZ0ZXJub29uIiwiZXZlbmluZyIsIm5pZ2h0IiwiZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyIsIm9yZGluYWxOdW1iZXIiLCJkaXJ0eU51bWJlciIsIm51bWJlciIsInJlbTEwMCIsImxvY2FsaXplIiwiZXJhIiwicXVhcnRlciIsIm1vbnRoIiwiZGF5IiwiZGF5UGVyaW9kIiwiYnVpbGRNYXRjaEZuIiwic3RyaW5nIiwibWF0Y2hQYXR0ZXJuIiwibWF0Y2hQYXR0ZXJucyIsImRlZmF1bHRNYXRjaFdpZHRoIiwibWF0Y2hSZXN1bHQiLCJtYXRjaCIsIm1hdGNoZWRTdHJpbmciLCJwYXJzZVBhdHRlcm5zIiwiZGVmYXVsdFBhcnNlV2lkdGgiLCJmaW5kSW5kZXgiLCJwYXR0ZXJuIiwidGVzdCIsImZpbmRLZXkiLCJ2YWx1ZUNhbGxiYWNrIiwicmVzdCIsInNsaWNlIiwib2JqZWN0IiwicHJlZGljYXRlIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJhcnJheSIsImJ1aWxkTWF0Y2hQYXR0ZXJuRm4iLCJwYXJzZVJlc3VsdCIsInBhcnNlUGF0dGVybiIsIm1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4iLCJwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuIiwibWF0Y2hFcmFQYXR0ZXJucyIsInBhcnNlRXJhUGF0dGVybnMiLCJhbnkiLCJtYXRjaFF1YXJ0ZXJQYXR0ZXJucyIsInBhcnNlUXVhcnRlclBhdHRlcm5zIiwibWF0Y2hNb250aFBhdHRlcm5zIiwicGFyc2VNb250aFBhdHRlcm5zIiwibWF0Y2hEYXlQYXR0ZXJucyIsInBhcnNlRGF5UGF0dGVybnMiLCJtYXRjaERheVBlcmlvZFBhdHRlcm5zIiwicGFyc2VEYXlQZXJpb2RQYXR0ZXJucyIsInBhcnNlSW50IiwiZW5VUyIsImNvZGUiLCJ3ZWVrU3RhcnRzT24iLCJmaXJzdFdlZWtDb250YWluc0RhdGUiLCJkZWZhdWx0T3B0aW9ucyIsImdldERlZmF1bHRPcHRpb25zIiwibWlsbGlzZWNvbmRzSW5XZWVrIiwibWlsbGlzZWNvbmRzSW5EYXkiLCJzdGFydE9mRGF5Iiwic2V0SG91cnMiLCJnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIiwidXRjRGF0ZSIsIlVUQyIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsInNldFVUQ0Z1bGxZZWFyIiwiZ2V0VGltZSIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImRhdGVMZWZ0IiwiZGF0ZVJpZ2h0Iiwic3RhcnRPZkRheUxlZnQiLCJzdGFydE9mRGF5UmlnaHQiLCJ0aW1lc3RhbXBMZWZ0IiwidGltZXN0YW1wUmlnaHQiLCJNYXRoIiwicm91bmQiLCJjb25zdHJ1Y3RGcm9tIiwic3RhcnRPZlllYXIiLCJjbGVhbkRhdGUiLCJzZXRGdWxsWWVhciIsImdldERheU9mWWVhciIsImRpZmYiLCJkYXlPZlllYXIiLCJzdGFydE9mV2VlayIsImxvY2FsZSIsImdldERheSIsInNldERhdGUiLCJzdGFydE9mSVNPV2VlayIsImdldElTT1dlZWtZZWFyIiwieWVhciIsImZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIiLCJzdGFydE9mTmV4dFllYXIiLCJmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyIiwic3RhcnRPZlRoaXNZZWFyIiwic3RhcnRPZklTT1dlZWtZZWFyIiwiZm91cnRoT2ZKYW51YXJ5IiwiZ2V0SVNPV2VlayIsImdldFdlZWtZZWFyIiwiZmlyc3RXZWVrT2ZOZXh0WWVhciIsImZpcnN0V2Vla09mVGhpc1llYXIiLCJzdGFydE9mV2Vla1llYXIiLCJmaXJzdFdlZWsiLCJnZXRXZWVrIiwiYWRkTGVhZGluZ1plcm9zIiwidGFyZ2V0TGVuZ3RoIiwic2lnbiIsIm91dHB1dCIsImFicyIsInBhZFN0YXJ0IiwibGlnaHRGb3JtYXR0ZXJzIiwieSIsInNpZ25lZFllYXIiLCJNIiwiZCIsImEiLCJkYXlQZXJpb2RFbnVtVmFsdWUiLCJ0b1VwcGVyQ2FzZSIsImgiLCJIIiwicyIsIlMiLCJudW1iZXJPZkRpZ2l0cyIsIm1pbGxpc2Vjb25kcyIsImZyYWN0aW9uYWxTZWNvbmRzIiwiZmxvb3IiLCJwb3ciLCJkYXlQZXJpb2RFbnVtIiwiZm9ybWF0dGVycyIsIkciLCJ1bml0IiwiWSIsInNpZ25lZFdlZWtZZWFyIiwid2Vla1llYXIiLCJ0d29EaWdpdFllYXIiLCJSIiwiaXNvV2Vla1llYXIiLCJ1IiwiUSIsImNlaWwiLCJxIiwiTCIsInciLCJ3ZWVrIiwiSSIsImlzb1dlZWsiLCJEIiwiRSIsImRheU9mV2VlayIsImxvY2FsRGF5T2ZXZWVrIiwiYyIsImlzb0RheU9mV2VlayIsImhvdXJzIiwidG9Mb3dlckNhc2UiLCJiIiwiQiIsIksiLCJrIiwiWCIsIl9sb2NhbGl6ZSIsIm9yaWdpbmFsRGF0ZSIsIl9vcmlnaW5hbERhdGUiLCJ0aW1lem9uZU9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwiZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzIiwiZm9ybWF0VGltZXpvbmUiLCJ4IiwiTyIsImZvcm1hdFRpbWV6b25lU2hvcnQiLCJ6IiwidCIsInRpbWVzdGFtcCIsIlQiLCJvZmZzZXQiLCJkZWxpbWl0ZXIiLCJhYnNPZmZzZXQiLCJtaW51dGVzIiwiZGF0ZUxvbmdGb3JtYXR0ZXIiLCJ0aW1lTG9uZ0Zvcm1hdHRlciIsImRhdGVUaW1lTG9uZ0Zvcm1hdHRlciIsImRhdGVQYXR0ZXJuIiwidGltZVBhdHRlcm4iLCJkYXRlVGltZUZvcm1hdCIsImxvbmdGb3JtYXR0ZXJzIiwicCIsIlAiLCJkYXlPZlllYXJUb2tlblJFIiwid2Vla1llYXJUb2tlblJFIiwidGhyb3dUb2tlbnMiLCJpc1Byb3RlY3RlZERheU9mWWVhclRva2VuIiwiaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuIiwid2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvciIsImlucHV0IiwiX21lc3NhZ2UiLCJ3YXJuIiwiUmFuZ2VFcnJvciIsInN1YmplY3QiLCJmb3JtYXR0aW5nVG9rZW5zUmVnRXhwIiwibG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJlc2NhcGVkU3RyaW5nUmVnRXhwIiwiZG91YmxlUXVvdGVSZWdFeHAiLCJ1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCIsImZvcm1hdFN0ciIsImRlZmF1bHRMb2NhbGUiLCJmb3JtYXR0ZXJPcHRpb25zIiwic3Vic3RyaW5nIiwiZmlyc3RDaGFyYWN0ZXIiLCJsb25nRm9ybWF0dGVyIiwiam9pbiIsImNsZWFuRXNjYXBlZFN0cmluZyIsImZvcm1hdHRlciIsInVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyIsInVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMiLCJtYXRjaGVkIiwiRXhwb3J0ZXJzIiwianNvbiIsImNzdiIsInhtbCIsImdldEV4cG9ydGVkRmlsZU5hbWUiLCJleHRlbnNpb24iLCJub3ciLCJFeHBvcnRDb21wb25lbnQiLCJleHBvcnREYXRhIiwiZXhwb3J0ZWREYXRhIiwiYmxvYiIsIkJsb2IiLCJzYXZlQXMiLCJUZXh0IiwidmFyaWFudCIsInBhcnNlclR5cGUiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJVcGxvYWRFZGl0Q29tcG9uZW50IiwiVXBsb2FkTGlzdENvbXBvbmVudCIsIlVwbG9hZFNob3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFFZSxTQUFTQSxTQUFTQSxD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QTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFD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SUFBQUEsY0FBYyxFQUFDLFFBQUE7S0FDaEM0VCxFQUFBQSxTQUFTLENBQUNuWSxHQUFHLENBQUNrWixVQUFVLGlCQUFLL2Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEUsZ0JBQUcsRUFBQTtFQUFDcEYsSUFBQUEsR0FBRyxFQUFFd2MsVUFBVztFQUFDelUsSUFBQUEsQ0FBQyxFQUFFLENBQUE7RUFBRSxHQUFBLGVBQ3JEdEgsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMkUsbUJBQU0sRUFBQTtFQUFDMkMsSUFBQUEsT0FBTyxFQUFFQSxNQUFNaVUsVUFBVSxDQUFDTyxVQUFVLENBQUU7RUFBQ3ZVLElBQUFBLFFBQVEsRUFBRXRCLFVBQUFBO0tBQ3RENlYsRUFBQUEsVUFBVSxDQUFDaEgsV0FBVyxFQUNqQixDQUNMLENBQUUsQ0FDTixDQUNGLENBQUMsQ0FBQTtFQUNWLENBQUM7O0VDbEREaUgsT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0VBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQzNjLFNBQVMsR0FBR0EsU0FBUyxDQUFBO0VBRTVDMGMsT0FBTyxDQUFDQyxjQUFjLENBQUNDLG1CQUFtQixHQUFHQSxJQUFtQixDQUFBO0VBRWhFRixPQUFPLENBQUNDLGNBQWMsQ0FBQ0UsbUJBQW1CLEdBQUdBLElBQW1CLENBQUE7RUFFaEVILE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRyxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtFQUVoRUosT0FBTyxDQUFDQyxjQUFjLENBQUNwVyxlQUFlLEdBQUdBLGVBQWUsQ0FBQTtFQUV4RG1XLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDVixlQUFlLEdBQUdBLGVBQWU7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDNdfQ==
