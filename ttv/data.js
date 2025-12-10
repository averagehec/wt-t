/*partially outdated functions, will later be merged with <ee.js>*/
(function () {
  "use strict";

  const iDB = (() => {
    const DB_NAME = "__wt-tools__";
    const STORE_NAME = "kv";
    let dbPromise = null;

    function openDB() {
      if (dbPromise) return dbPromise;

      dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);

        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };

        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result);
      });

      return dbPromise;
    }

    async function getStore(mode = "readonly") {
      const db = await openDB();
      return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
    }

    async function getItem(key) {
      const store = await getStore("readonly");
      return new Promise((resolve, reject) => {
        const req = store.get(key);
        req.onerror = () => resolve(null);
        req.onsuccess = () => resolve(req.result || null);
      });
    }

    async function setItem(key, value, meta = {}) {
      const store = await getStore("readwrite");

      let exp = meta?.expiresInMinutes ?? meta?.expireTime ?? 30;

      exp = exp * 30_6000;

      const wrapper = {
        value,
        created: Date.now(),
        version: meta.version || null,
        expiresIn: exp,
      };

      return new Promise((resolve, reject) => {
        const req = store.put(wrapper, key);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(true);
      });
    }

    async function removeItem(key) {
      const store = await getStore("readwrite");
      return new Promise((resolve) => {
        const req = store.delete(key);
        req.onerror = () => resolve(false);
        req.onsuccess = () => resolve(true);
      });
    }

    async function clear() {
      const store = await getStore("readwrite");
      return new Promise((resolve) => {
        const req = store.clear();
        req.onerror = () => resolve(false);
        req.onsuccess = () => resolve(true);
      });
    }

    async function length() {
      const store = await getStore("readonly");
      return new Promise((resolve) => {
        const req = store.count();
        req.onerror = () => resolve(0);
        req.onsuccess = () => resolve(req.result);
      });
    }

    async function getFreshItem(key, currentVersion) {
      const wrapper = await getItem(key);
      if (!wrapper) return null;

      if (currentVersion && wrapper.version !== currentVersion) {
        return null;
      }

      const age = Date.now() - wrapper.created;
      if (wrapper.expiresIn && age > wrapper.expiresIn) {
        return null;
      }

      return wrapper.value;
    }

    return {
      getItem,
      setItem,
      removeItem,
      clear,
      length,
      getFreshItem
    };
  })();


  /**
   * Easily convert content from a .BLK file into an Object.
   * @param {String} blkText your input BLK text
   * @returns {Object} the converted Object.
   */
 function blk_to_json(blkText) {
    function remove_comments(text) {
      let out = "",
        inString = false,
        stringChar = null;
      for (let i = 0; i < text.length; i++) {
        const c = text[i],
          next = text[i + 1];
        if (!inString && (c === '"' || c === "'")) {
          inString = true;
          stringChar = c;
        } else if (inString && c === stringChar) inString = false;
        if (!inString) {
          if (c === "/" && next === "*") {
            i += 2;
            while (i < text.length && !(text[i] === "*" && text[i + 1] === "/"))
              i++;
            i++;
            continue;
          }
          if (c === "/" && next === "/") {
            i += 2;
            while (i < text.length && text[i] !== "\n") i++;
            continue;
          }
        }
        out += c;
      }
      return out;
    }

    blkText = remove_comments(blkText);
    const lines = blkText.split(/\r?\n/).map((l) => l.trimStart());
    let i = 0;

    function parseValue(type, raw) {
      raw = raw.trim();
      switch (type) {
      case "b":
        return raw === "yes";
      case "i":
        return parseInt(raw, 10);
      case "r":
        return parseFloat(raw);
      case "t":
        return raw.slice(1, -1);
      case "p2":
      case "ip2":
      case "p3":
      case "ip3":
      case "p4":
      case "ip4":
      case "c":
        return raw.split(",").map((n) => parseFloat(n.trim()));
      case "m":
        const nested = raw.includes("[") ? [...raw.matchAll(/\[([^\]]+)\]/g)].map((m) =>
            m[1].split(",").map((n) => parseFloat(n.trim())),
          ) :
          raw
          .replace(/\[|\]/g, "")
          .split(/\s*,\s*/)
          .map((n) => parseFloat(n.trim()));
        return nested;
      default:
        return raw;
      }
    }

    function parseBlock() {
      const obj = {};
      while (i < lines.length) {
        let line = lines[i++].trim();
        if (!line) continue;
        if (line === "}") break;
        if (line.endsWith("{")) {
          const key = line.slice(0, -1).trim();
          const nested = parseBlock();
          if (obj[key])
            obj[key] = Array.isArray(obj[key]) ? [...obj[key], nested] : [obj[key], nested];
          else obj[key] = nested;
          continue;
        }
        const match = line.match(/^([^:\s]+):([a-z0-9]+)\s*=\s*(.*)$/i);
        if (!match) continue;
        const [, key, type, raw] = match;
        const value = parseValue(type, raw);
        if (obj[key] !== undefined)
          obj[key] = Array.isArray(obj[key]) ? [...obj[key], value] : [obj[key], value];
        else obj[key] = value;
      }
      return obj;
    }

    const result = {};
    while (i < lines.length) {
      let line = lines[i].trim();
      if (!line) {
        i++;
        continue;
      }
      if (line.endsWith("{")) {
        const key = line.slice(0, -1).trim();
        i++;
        const nested = parseBlock();
        if (result[key])
          result[key] = Array.isArray(result[key]) ? [...result[key], nested] : [result[key], nested];
        else result[key] = nested;
        continue;
      }
      const match = line.match(/^([^:\s]+):([a-z0-9]+)\s*=\s*(.*)$/i);
      if (match) {
        const [, key, type, raw] = match;
        const value = parseValue(type, raw);
        if (result[key] !== undefined)
          result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value];
        else result[key] = value;
      }
      i++;
    }
    return result;
  }

  /**
   * Easily convert content from a JSON object to a .BLK.
   * @param {String|Object} input your input Object (can be stringified)
   * @returns {String} the resulted conversion as BLK text
   */
  function json_to_blk(input, options = {}) {
    const {
      ipStrict = false, indent = 2
    } = options;

    const isStringInput = typeof input === "string";
    const jsonStr = isStringInput ? input : JSON.stringify(input, null, 2);
    const jsonObj = isStringInput ? JSON.parse(input) : input;

    const rawNumbersByKey = {};
    const numberRegex = /"([^"]+)"\s*:\s*(-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)/g;
    let match;
    while ((match = numberRegex.exec(jsonStr)) !== null) {
      const [, key, val] = match;
      if (!rawNumbersByKey[key]) rawNumbersByKey[key] = [];
      rawNumbersByKey[key].push(val);
    }

    const isIntArray = (arr) =>
      arr.every(
        (v) =>
        (typeof v === "number" && Number.isInteger(v)) ||
        (!ipStrict && typeof v === "number" && Math.floor(v) === v),
      );

    const isNumberArray = (arr) =>
      Array.isArray(arr) && arr.every((v) => typeof v === "number");

    const isMatrix = (arr) =>
      Array.isArray(arr) &&
      arr.every(
        (row) => Array.isArray(row) && row.every((n) => typeof n === "number"),
      );

    const isColor = (key) => key.toLowerCase().includes("color");

    function getRawNumberString(key, value) {
      const candidates = rawNumbersByKey[key] || [];
      const strVal = String(value);
      return (
        candidates.find((c) => c === strVal || c === strVal + ".0") || strVal
      );
    }

    function detectType(key, value) {
      if (typeof value === "boolean") return "b";
      if (typeof value === "string") return "t";
      if (typeof value === "number") {
        const raw = getRawNumberString(key, value);
        return raw.includes(".") || /e/i.test(raw) ? "r" : "i";
      }
      if (Array.isArray(value)) {
        const len = value.length;
        if (isMatrix(value)) return "m";
        if (isNumberArray(value)) {
          if (len === 2) return isIntArray(value) ? "ip2" : "p2";
          if (len === 3) return isIntArray(value) ? "ip3" : "p3";
          if (len === 4)
            return isColor(key) ? "c" : isIntArray(value) ? "ip4" : "p4";
        }
      }
      return null;
    }

    function formatValue(type, value) {
      switch (type) {
      case "b":
        return `b=${value ? "yes" : "no"}`;
      case "t":
        return `t="${value}"`;
      case "i":
        return `i=${value}`;
      case "r":
        return `r=${value}`;
      case "p2":
      case "ip2":
      case "p3":
      case "ip3":
      case "p4":
      case "ip4":
      case "c":
        return `${type}=${value.join(", ")}`;
      case "m":
        return `m=[${value.map((v) => `[${v.join(",")}]`).join(" ")}]`;
      default:
        return `t="${value}"`;
      }
    }

    function processBlock(name, value, level = 0) {
      const pad = " ".repeat(level * indent);
      const nextPad = " ".repeat((level + 1) * indent);
      let lines = [];

      const writeKeyValue = (k, v) => {
        const type = detectType(k, v);
        lines.push(`${nextPad}${k}:${formatValue(type, v)}`);
      };

      if (Array.isArray(value)) {
        if (value.length === 0) {
          lines.push(`${pad}${name}{}`);
        } else if (
          value.length === 2 &&
          typeof value[0] === "string" &&
          typeof value[1] === "object" &&
          !Array.isArray(value[1])
        ) {

          lines.push(`${pad}${name}{`);
          lines.push(`${nextPad}${value[0]}{`);
          for (const [k, v] of Object.entries(value[1])) {
            if (typeof v === "object" && v !== null) {
              lines.push(processBlock(k, v, level + 2));
            } else {
              const type = detectType(k, v);
              lines.push(
                `${" ".repeat((level + 2) * indent)}${k}:${formatValue(type, v)}`,
              );
            }
          }
          lines.push(`${nextPad}}`);
          lines.push(`${pad}}`);
        } else if (
          value.every((v) => typeof v === "object" && !Array.isArray(v))
        ) {
          lines.push(`${pad}${name}{`);
          for (const entry of value) {
            for (const [k, v] of Object.entries(entry)) {
              if (typeof v === "object" && v !== null) {
                lines.push(processBlock(k, v, level + 1));
              } else {
                writeKeyValue(k, v);
              }
            }
          }
          lines.push(`${pad}}`);
        } else if (isMatrix(value)) {
          lines.push(`${pad}${name}:${formatValue("m", value)}`);
        } else if (value.every((v) => typeof v === "string")) {
          for (const str of value) {
            lines.push(`${pad}${name}:t="${str}"`);
          }
        } else {
          const type = detectType(name, value);
          lines.push(`${pad}${name}:${formatValue(type, value)}`);
        }
      } else if (typeof value === "object" && value !== null) {
        if (name !== null) lines.push(`${pad}${name}{`);
        for (const [k, v] of Object.entries(value)) {
          if (typeof v === "object" && v !== null) {
            lines.push(processBlock(k, v, level + 1));
          } else {
            writeKeyValue(k, v);
          }
        }
        if (name !== null) lines.push(`${pad}}`);
      } else {
        const type = detectType(name, value);
        lines.push(`${pad}${name}:${formatValue(type, value)}`);
      }

      return lines.join("\n");
    }

    return processBlock(null, jsonObj, 0);
  }

  const newFunctions = (function () {
    /**
     * Checks whether given text is a URL or not.
     * @param {*} text text to check
     * @returns {true|false} is this a URL?
     */
    function is_url(text) {
      try {
        if (typeof text != "string" && !(text instanceof URL)) return false;
        let url = new URL(text);
        return true;
      } catch (error) {
        return false;
      }
    }

    /**
     * Converts a number into Roman numerals.
     * @param {Number} num
     * @returns {String} The converted numeral.
     */
    function to_roman(num) {
      if (isNaN(num)) return NaN;

      var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
                ],
        roman = "",
        i = 3;
      while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    }

    /**
     * Reads a file's content.
     * @param {File} file The file to read.
     * @param {String} type The type (uri, arraybuffer, binary, text).
     * @returns {any} File content.
     */
    async function read_file(file, type = "uri") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        switch (type) {
        case "uri":
          reader.readAsDataURL(file);
          break;
        case "arraybuffer":
          reader.readAsArrayBuffer(file);
          break;
        case "binary":
          reader.readAsBinaryString(file);
          break;
        case "text":
          reader.readAsText(file);
          break;
        default:
          return reject(new Error("Invalid type specified."));
        }
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
      });
    }

    let version = false ? "tags/2.5.1.157" : "heads/master";
    let serv = false ? "War-Thunder-Mobile-Datamine" : "War-Thunder-Datamine";

    setTimeout(() => {if(document?.querySelector?.(".version") && version != null && version != undefined) {
      document.querySelector(".version").textContent = 
        (
          version.startsWith("tags/")?version.split("tags/").slice(1).join("tags/"):
          version.startsWith("heads/")?version.split("heads/").slice(1).join("heads/"):
          "unknown"
        );
        if(document.querySelector(".version").textContent.trim() == "master")
          document.querySelector(".version").textContent = "current version";
      };
    }, 1);
    /*
    Versions
    2.35.1.36 -     Mad Thunder 2024
    2.25.1.27 - Mobile Infantry 2023
    2.15.1.22 -    Worm Thunder 2022
    2.5.1.48 -     Warfare 2077 2021

    2.23.0.9 -    Pandora's Box 2022
    2.31.1.16 - Atlantic Battle 2023
    2.27.1.32 - Atomic Thunder  2023

    2.5.1.157 -       in files  2021
    2.13.0.79 -    IA.58 Pucara 2022
    2.22.0.19 -           J-35J 2022
    */

    /**
     * Retrieves latest wpcost data or null.
     * @returns {Object|null} The retrieved wpcost data.
     */
    async function get_wpcost() {
      const cacheKey = "wpcost";

      const cached = await iDB.getFreshItem(cacheKey, version);

      if (cached) {
        try {
          let parsed = JSON.parse(cached);
          if (parsed?.["__lowerCaseUnits__"] || parsed?.["economicRankMax"])
            return JSON.parse(cached);
        } catch {}
      }

      const url = `//raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/char.vromfs.bin_u/config/wpcost.blkx`;

      const response = await fetch(url);
      if (!response.ok) return null;

      const text = await response.text();
      let json;

      try {
        json = JSON.parse(text);
      } catch {
        json = blk_to_json(text);
      }

      if (!json || typeof json !== "object" || Array.isArray(json) || Object.keys(json).length === 0)
        return null;

      const lower = {};
      for (const key in json) {
        if (!Object.prototype.hasOwnProperty.call(json, key)) continue;
        lower[key.toLowerCase()] = json[key];
      }
      Object.freeze(lower);

      const finalObj = {
        ...json,
        __lowerCaseUnits__: lower
      };

      await iDB.setItem(cacheKey, JSON.stringify(finalObj), {
        version: version,
        expiresInMinutes: 30
      });

      return finalObj;
    }



    /**
     * Retrieves latest unittags data or null.
     * @returns {Object|null} The retrieved unittags data.
     */
    async function get_unittags() {
      const cacheKey = "unittags";

      const cached = await iDB.getFreshItem(cacheKey, version);

      if (cached) {
        try {
          let parsed = JSON.parse(cached);
          if (parsed?.["__lowerCaseUnits__"])
            return JSON.parse(cached);
        } catch {}
      }

      const url = `//raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/char.vromfs.bin_u/config/unittags.blkx`;

      const response = await fetch(url);
      if (!response.ok) return null;

      const text = await response.text();
      let json;

      try {
        json = JSON.parse(text);
      } catch {
        json = blk_to_json(text);
      }

      if (!json || typeof json !== "object" || Array.isArray(json) || Object.keys(json).length === 0)
        return null;

      const lower = {};
      for (const key in json) {
        if (!Object.prototype.hasOwnProperty.call(json, key)) continue;
        lower[key.toLowerCase()] = json[key];
      }
      Object.freeze(lower);

      const finalObj = {
        ...json,
        __lowerCaseUnits__: lower
      };

      await iDB.setItem(cacheKey, JSON.stringify(finalObj), {
        version: version,
        expiresInMinutes: 30
      });

      return finalObj;
    }

    /**
     * Retrieves latest tech tree information or null.
     * @returns {Object|null} The retrieved tech tree(s).
     */
    async function get_techtree() {
      const cacheKey = "techtree";

      const cached = await iDB.getFreshItem(cacheKey, version);

      if (cached) {
        try {
          let parsed = JSON.parse(cached);
          let checked = false;
          Object.keys(parsed).forEach((k) => {
            let v = parsed[k];
            if (k.startsWith("country_") || v?.army || v?.aviation) checked = true;
          })

          if (checked)
            return JSON.parse(cached);
        } catch {}
      }

      const url = `//raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/char.vromfs.bin_u/config/shop.blkx`;

      const response = await fetch(url);
      if (!response.ok) return null;

      const text = await response.text();
      let json;

      try {
        json = JSON.parse(text);
      } catch {
        json = blk_to_json(text);
      }

      if (!json || typeof json !== "object" || Array.isArray(json) || Object.keys(json).length === 0)
        return null;

      const finalObj = {
        ...json
      };

      await iDB.setItem(cacheKey, JSON.stringify(finalObj), {
        version: version,
        expiresInMinutes: 30
      });

      return finalObj;
    }

    /**
     * Retrieves latest modification information or null.
     * @returns {Object|null} The retrieved modifications.
     */
    async function get_modifications() {
      const cacheKey = "modifications";

      const cached = await iDB.getFreshItem(cacheKey, version);

      if (cached) {
        try {
          let parsed = JSON.parse(cached);
          if (parsed?.["__lowerCaseUnits__"])
            return JSON.parse(cached);
        } catch {}
      }

      const url = `//raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/char.vromfs.bin_u/config/modifications.blkx`;

      const response = await fetch(url);
      if (!response.ok) return null;

      const text = await response.text();
      let json;

      try {
        json = JSON.parse(text);
      } catch {
        json = blk_to_json(text);
      }

      if (!json || typeof json !== "object" || Array.isArray(json) || Object.keys(json).length === 0)
        return null;

      const lower = {};
      for (const key in json) {
        if (!Object.prototype.hasOwnProperty.call(json, key)) continue;
        lower[key.toLowerCase()] = json[key];
      }
      Object.freeze(lower);

      const finalObj = {
        ...json,
        __lowerCaseUnits__: lower
      };

      await iDB.setItem(cacheKey, JSON.stringify(finalObj), {
        version: version,
        expiresInMinutes: 30
      });

      return finalObj;
    }

    /**
     * Parses a WT CSV into a JavaScript readable Object.
     * @param {String} csv_data Input raw CSV
     * @param {Null|string[]} custom_headers Custom headers, optional
     * @returns {Object} Your parsed CSV
     */
    function parse_wtcsv(csv_data, custom_headers = null) {
      function splitCsvLn(line) {
        const result = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];

          if (char === '"') {
            inQuotes = !inQuotes;
            continue;
          }

          if (char === ";" && !inQuotes) {
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result.map((v) => v.replace(/^"|"$/g, ""));
      }

      function csvCheckVal(val) {
        const lower = val.toLowerCase();

        if (lower === "true" || lower === "yes") return true;
        if (lower === "false" || lower === "no") return false;

        if (!isNaN(val) && val.trim() !== "") {
          return Number(val);
        }

        return val;
      }

      if (!csv_data || typeof csv_data !== "string") return {};

      const lines = csv_data
        .trim()
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "");

      if (lines.length < 2) return {};

      const headers = custom_headers || splitCsvLn(lines[0]);

      const data = {};

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const cols = splitCsvLn(lines[i]);
        if (!cols[0]) continue;

        const id = cols[0];
        const entry = {};

        for (let j = 1; j < headers.length; j++) {
          const lang = headers[j];
          const rawVal = cols[j];

          if (!rawVal) continue;

          const val = csvCheckVal(rawVal);

          entry[lang] = val;
        }

        if (Object.keys(entry).length > 0) {
          data[id] = entry;
        }
      }

      return data;
    }


    /**
     * Easily fetch and parse your CSV file.
     * This function uses {@link parse_wtcsv}
     * @param {URL} url Input CSV url
     * @param {String} storageKey Key to use incase the fetch request has failed. Optional.
     * @returns {Object} Your parsed CSV
     */
    async function fetch_csv(url, storageKey) {
      if (!is_url(url)) return null;

      let cached = null;
      if (storageKey) {
        try {
          cached = await iDB.getFreshItem(storageKey, version);
          if (cached) {
            return JSON.parse(cached);
          }
        } catch {}
      }

      let text;
      try {
        const response = await fetch(url);
        if (!response.ok) return null;
        text = await response.text();
      } catch (err) {
        console.warn(
          `fetch failed for ${url}${storageKey ? `, using cached data if available` : ``}`
        );

        if (cached) return JSON.parse(cached);

        throw err;
      }

      const parsed = parse_wtcsv(text);

      if (storageKey) {
        try {
          await iDB.setItem(storageKey, JSON.stringify(parsed), {
            version: version,
            expiresInMinutes: 30
          });
        } catch {}
      }

      return parsed;
    }


    /**
     * Fetches modification CSV as JSON.
     * This requires {@link fetch_csv}.
     * @returns {Object|Null} Your parsed CSV
     */
    async function get_mod_csv() {
      const url =
        `https://raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/lang.vromfs.bin_u/lang/units_modifications.csv`;
      const data = await fetch_csv(url, "___mods-storageKey");
      return data;
    }

    /**
     * Fetches menu options and country CSV as JSON.
     * This requires {@link fetch_csv}.
     * @returns {Object|Null} Your parsed CSV
     */
    async function get_mo_csv() {
      let data01, data02;
      const url01 =
        `https://raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/lang.vromfs.bin_u/lang/menu_options.csv`;
      const url02 =
        `https://raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/lang.vromfs.bin_u/lang/unlocks_conditions.csv`;
      try{data01 = await fetch_csv(url01, "___mo-storageKey")}catch(err){};
      try{data02 = await fetch_csv(url02, "___uc-storageKey")}catch(err){};
      return {
        ...data01,
        ...data02
      };
    }


    /**
     * Fetches menu CSV as JSON.
     * This requires {@link fetch_csv}.
     * @returns {Object|Null} Your parsed CSV
     */
    async function get_menu_csv() {
      const url =
        `https://raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/lang.vromfs.bin_u/lang/menu.csv`;
      const data = await fetch_csv(url, "___menu-storageKey");
      return data;
    }

    /**
     * Fetches weapons CSV as JSON.
     * This requires {@link fetch_csv}.
     * @returns {Object|Null} Your parsed CSV
     */
    async function get_weapon_csv() {
      const url =
        `https://raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/lang.vromfs.bin_u/lang/units_weaponry.csv`;
      const data = await fetch_csv(url, "___weapons-storageKey");

      const lower = {};
      for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
        lower[key.toLowerCase()] = data[key];
      };

      Object.freeze(lower);
      return {
        ...data,
        __lowerCaseWeapons__: lower
      };
    }

    /**
     * Fetches unit CSV as JSON.
     * This requires {@link fetch_csv}.
     * @returns {Object|Null} Your parsed CSV
     */
    async function get_unit_csv() {
      const url = `https://raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/lang.vromfs.bin_u/lang/units.csv`;
      const data = await fetch_csv(url, "___units-storageKey");

      if (!data || typeof data !== "object") return data;

      const lower = {};
      for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
        lower[key.toLowerCase()] = data[key];
      }

      Object.freeze(lower);

      return {
        ...data,
        __lowerCaseUnits__: lower
      };
    }

    /**
     * Fetches data about a vehicle with ID.
     * @param {String} id The vehicle ID.
     * @param {String} type Type of this vehicle [tank, plane, helicopter, ship, structure, infantry, air_defence]
     * @returns {Object|null} The vehicles data as an Object.
     */
    async function get_vehicle(id, type = "tank") {
      let base =
        `//raw.githubusercontent.com/gszabi99/${serv}/refs/${version}/aces.vromfs.bin_u/gamedata`;
      var url = null;

      switch (type) {
      case "tank":
      case "tanks":
        url = `${base}/units/tankmodels/${id}.blkx`;
        break;
      case "plane":
      case "helicopter":
      case "helicopters":
      case "flightModels":
      case "flightModel":
      case "aircraft":
      case "planes":
        url = `${base}/flightModels/${id}.blkx`;
        break;
      case "ship":
      case "ships":
        url = `${base}/units/ships/${id}.blkx`;
        break;
      case "structure":
      case "structures":
        url = `${base}/units/structures/${id}.blkx`;
        break;
      case "infantry":
        url = `${base}/units/infantry/${id}.blkx`;
        break;
      case "air_defence":
      case "ad":
        url = `${base}/units/air_defence/${id}.blkx`;
        break;
      }

      if (!url) return null;
      const response = await fetch(url);
      if (!response.ok) return null;

      const vehicle = await response.text();

      var json = null;

      try {
        json = JSON.parse(vehicle);
      } catch (error) {
        console.warn("Vehicle is formatted seperately than JSON, testing BLK");
        json = blk_to_json(vehicle);
      }

      if (!json || json == {} || json == []) {
        console.error("Vehicle couldn't be retrieved properly");
        return null;
      }

      return json;
    }

    function get_techtree_layout(treeJSON) {
      const layout = {};

      function process_branch(rangeArray, branchType, country) {
        if (!Array.isArray(rangeArray)) return {};
        const branchLayout = {};

        rangeArray.forEach((rangeBlock, rangeIndex) => {
          if (!rangeBlock || typeof rangeBlock !== "object") return;

          if ("range" in rangeBlock && typeof rangeBlock.range === "object") {
            rangeBlock = rangeBlock.range;
          }

          let yOffset = 0;
          for (const [key, value] of Object.entries(rangeBlock)) {
            if (!value || typeof value !== "object") continue;
            const customX = value.rankPosXY ? Math.max(value.rankPosXY[0] - 1, 0) : rangeIndex;
            const customY = value.rankPosXY ? Math.max(value.rankPosXY[1] - 1, 0) : null;

            if (key.endsWith("_group")) {
              const groupVehicles = {};
              for (const [subKey, subVal] of Object.entries(value)) {
                if (subVal && typeof subVal === "object" && "rank" in subVal) {
                  const y = customY !== null ? customY : yOffset;

                  const hidden = !!subVal.showOnlyWhenBought || !!subVal.showOnlyWhenResearched || !!subVal.showOnlyIfPlayerHasUnlock
                  const researchable = !hidden;

                  const fakeReqs = [];
                  if (subVal.fakeReqUnitType) {
                    for (let i = 0; i < subVal.fakeReqUnitType.length; i++) {
                      fakeReqs.push({
                        type: subVal.fakeReqUnitType[i],
                        image: subVal.fakeReqUnitImage?.[i] || null,
                        rank: subVal.fakeReqUnitRank?.[i] || null,
                        position: subVal.fakeReqUnitPosXY?.[i] || null,
                      });
                    }
                  }

                  branchLayout[subKey] = {
                    group: false,
                    originalValue: {
                      ...subVal
                    },
                    _meta: {
                      vehicleType: branchType,
                      vehicleRank: subVal.rank,
                      country,
                      position: {
                        x: customX,
                        y
                      },
                      positionIfOwned: {
                        x: customX,
                        y
                      },
                      isGiftVehicle: !!subVal.gift,
                      isEventVehicle: !!subVal.event,
                      isResearchable: researchable,
                      fakeRequirements: fakeReqs,
                    },
                  };

                  groupVehicles[subKey] = branchLayout[subKey];
                  yOffset++;
                }
              }

              const groupFakeReqs = [];
              if (value.fakeReqUnitType) {
                for (let i = 0; i < value.fakeReqUnitType.length; i++) {
                  groupFakeReqs.push({
                    type: value.fakeReqUnitType[i],
                    image: value.fakeReqUnitImage?.[i] || null,
                    rank: value.fakeReqUnitRank?.[i] || null,
                    position: value.fakeReqUnitPosXY?.[i] || null,
                  });
                }
              }

              branchLayout[key] = {
                position: {
                  x: customX,
                  y: yOffset
                },
                rank: Object.keys(groupVehicles).length ?
                  Math.min(...Object.values(groupVehicles).map((v) => v._meta.vehicleRank)) : undefined,
                group: true,
                vehicles: groupVehicles,
                original: {
                  ...value
                },
                _meta: {
                  type: branchType,
                  country,
                  fakeRequirements: groupFakeReqs,
                },
              };
            }

            else if ("rank" in value) {
              const y = yOffset;
              const hidden = !!value.showOnlyWhenBought || !!value.showOnlyWhenResearched || !!value.showOnlyIfPlayerHasUnlock
              const researchable = !hidden;

              const fakeReqs = [];
              if (value.fakeReqUnitType) {
                for (let i = 0; i < value.fakeReqUnitType.length; i++) {
                  fakeReqs.push({
                    type: value.fakeReqUnitType[i],
                    image: value.fakeReqUnitImage?.[i] || null,
                    rank: value.fakeReqUnitRank?.[i] || null,
                    position: value.fakeReqUnitPosXY?.[i] || null,
                  });
                }
              }

              branchLayout[key] = {
                group: false,
                originalValue: {
                  ...value
                },
                _meta: {
                  vehicleType: branchType,
                  vehicleRank: value.rank,
                  country,
                  position: {
                    x: customX,
                    y
                  },
                  relativeY: customY ?? null,
                  positionIfOwned: {
                    x: customX,
                    y
                  },
                  isGiftVehicle: !!value.gift,
                  isEventVehicle: !!value.event,
                  isResearchable: researchable,
                  fakeRequirements: fakeReqs,
                },
              };

              yOffset++;
            }
          }
        });

        return branchLayout;
      }


      for (const [country, branches] of Object.entries(treeJSON)) {
        layout[country] = {};

        for (const [branchType, branchData] of Object.entries(branches)) {
          let branchRange = null;

          if (Array.isArray(branchData)) branchRange = branchData;
          else if (branchData && Array.isArray(branchData.range)) branchRange = branchData.range;

          if (!branchRange) continue;

          layout[country][branchType] = process_branch(branchRange, branchType, country);
        }
      }

      return layout;
    }


    /**
     * Component consisting of tools to get the URL of certain images.
     */
    const imgUrls = {
      /*expanded image*/
      unitImg: (id) => {
        return is_url(id) || !typeof id == "string" ?
          false :
          `https://static.encyclopedia.warthunder.com/images/${id}.png`;
      },
      /*for slot image*/
      unitTreeImg: (id) => {
        return is_url(id) || !typeof id == "string" ?
          false :
          `https://static.encyclopedia.warthunder.com/slots/${id}.png`;
      },
      /*for country tt*/
      countryTooltip: (c) => {
        return is_url(c) || !typeof c == "string" ?
          false :
          c.startsWith("country_") ?
          `https://static.encyclopedia.warthunder.com/unit_tooltip/${c}.png` :
          `https://static.encyclopedia.warthunder.com/unit_tooltip/country_${c}.png`;
      },
      /*only for .avif*/
      gameuiskin: (fn) => {
        return is_url(id) || !typeof id == "string" ?
          false :
          `https://static.encyclopedia.warthunder.com/gui_skin/${fn.replace(/\.([A-Za-z0-9_\-]+)$/, "")}.png`;
      },
      /*for unit side */
      unitIco: (id) => {
        return is_url(id) || !typeof id == "string" ?
          false :
          `https://static.encyclopedia.warthunder.com/icons/${id.replace("_ico", "")}_ico.svg`;
      },
      /*for card icons*/
      cardIcon: (id) => {
        return is_url(id) || !typeof id == "string" ?
          false :
          `https://avatars.warthunder.com/img/cardicon_${id.replace("cardicon_", "").replace(/\.([A-Za-z0-9_\-]+)$/, "")}.png`;
      },
      /*for background*/
      cardBackground: (id) => {
        return is_url(id) || !typeof id == "string" ?
          false :
          `https://avatars.warthunder.com/header/profile_header_${id.replace("profile_header", "").replace(/\.([A-Za-z0-9_\-]+)$/, "")}.png`;
      },
      /*for 2d country*/
      countryIcon: (c) => {
        return is_url(c) || !typeof c == "string" ?
          false :
          c.startsWith("country_") ?
          `https://wiki.warthunder.com/static/country_svg/${c}.svg` :
          `https://wiki.warthunder.com/static/country_svg/country_${c}.svg`;
      },
    };

    /**
     * Component consisting of tools to get the Wiki stats of certain values.
     */
    const shopConv = {
      maxAltitude: (alt) => alt != null ? `${alt.toLocaleString()} m` : `0 m`,
      maxSpeed: (speed, alt = 0) => {
        if (speed == null) return "0 km/h";
        const kmh = speed * 3.60062893081761;
        return `${Math.round(kmh)} km/h${alt > 0 ? ` at ${alt.toLocaleString()} m` : ""}`;
      },
      maxSpeedAlt: (alt) => alt != null ? `${alt.toLocaleString()} m` : "",
      climbSpeed: (spd) => spd != null ? `${spd} m/s` : "0 m/s",
      climbAlt: (alt) => alt != null ? `${alt.toLocaleString()} m` : "",
      climbTime: (time) => time != null ? `${time} s` : "0 s",
      turnTime: (sec) => sec != null ? `${sec} s` : "0 s",
      airfieldLen: (len) => len != null ? `${len} m` : "0 m",
      wingLoading: (wl) => wl != null ? `${wl} kg/m²` : "0 kg/m²",
      powerToWeightRatio: (pwr) => pwr != null ? pwr.toFixed(2) : "0.00",
      thrustToWeightRatio: (thr) => thr != null ? thr.toFixed(2) : "0.00",
      rollRate: (rate) => rate != null ? `${rate} °/s` : "0 °/s"
    };

    const module = {
      utils: {
        parse_wtcsv: parse_wtcsv,
        fetch_csv: fetch_csv,
        read_file: read_file,
        is_url: is_url,
      },
      wt: {
        get_wpcost: get_wpcost,
        get_unittags: get_unittags,
        get_techtree: get_techtree,
        get_modifications: get_modifications,
        get_vehicle: get_vehicle,

        get_units_csv: get_unit_csv,
        get_weapons_csv: get_weapon_csv,
        get_mods_csv: get_mod_csv,
        get_menuOptions_csv: get_mo_csv,
        get_menu_csv,
        get_techtree_layout: get_techtree_layout,

        static_img_conv: imgUrls,
        shop_data_conv: shopConv,
      },
    };

    return module;
  })();
  /* SEPERATOR */




  /* SEPERATOR */
  /**
   * Extract visible IDs from Github
   * @returns {Object} sorted array of vehicles
   * @deprecated No longer majorly used although it does work.
   */
  function getModels() {
    let aircraft = [];
    let ships = [];
    let objectGroups = [];
    let countermeasures = [];
    let airDefense = [];
    let infantry = [];
    let tanks = [];
    let vehicles = [];

    function edf(x, y) {
      try {
        return !x.endsWith(y);
      } catch (err) {
        return false;
      }
    }

    function edfl(x, y) {
      let k = true;
      if (typeof y != "object") {
        try {
          return !x.endsWith(y);
        } catch (err) {
          Object.keys(y).forEach((key) => {
            let val = y[key];
            if (x.endsWith(key) || (x.endsWith(val) && val.length > 0)) {
              k = false;
              return false;
            }
          });
          try {
            key.forEach((item) => {
              if (x.endsWith(item)) {
                k = false;
                return false;
              }
            });
          } catch (err) {}
        }
      }
      if (typeof y == "object") {
        try {
          key.forEach((item) => {
            if (x.endsWith(item)) {
              k = false;
              return false;
            }
          });
        } catch (err) {}
        Object.keys(y).forEach((key) => {
          let val = y[key];
          if (x.endsWith(key) || (x.endsWith(val) && val.length > 0)) {
            k = false;
            return false;
          }
        });
      }
      if (k) {
        return true;
      } else {
        return false;
      }
    }
    document.querySelectorAll('[class="Link--primary"').forEach((item) => {
      let hrf = item.href.toLowerCase().trim();
      if (
        hrf.includes("flightmodels") &&
        item.href.includes("blk") &&
        edfl(hrf, "/flightmodels")
      ) {
        let name = item.title;
        name = name.replaceAll(".blkx", "");
        name = name.replaceAll(".blk", "");
        if (!aircraft.includes(name)) {
          aircraft.push(name);
        }
      } else {
        if (
          hrf.includes("ships") &&
          item.href.includes("blk") &&
          edfl(hrf, "/ships")
        ) {
          let name = item.title;
          name = name.replaceAll(".blkx", "");
          name = name.replaceAll(".blk", "");
          if (!ships.includes(name)) {
            ships.push(name);
          }
        } else {
          if (
            (hrf.includes("tankmodels") ||
              hrf.includes("tank_models") ||
              hrf.includes("tanks")) &&
            item.href.includes("blk") &&
            edfl(hrf, ["/tankmodels", "/tank_models"])
          ) {
            let name = item.title;
            name = name.replaceAll(".blkx", "");
            name = name.replaceAll(".blk", "");
            if (!tanks.includes(name)) {
              tanks.push(name);
            }
          } else {
            if (
              hrf.includes("objectgroups") &&
              item.href.includes("blkx") &&
              edfl(hrf, "/objectgroups")
            ) {
              let name = item.title;
              name = name.replaceAll(".blkx", "");
              name = name.replaceAll(".blk", "");
              if (!objectGroups.includes(name)) {
                objectGroups.push(name);
              }
            } else {
              if (
                hrf.includes("countermeasures") &&
                item.href.includes("blk") &&
                edfl(hrf, "/countermeasures")
              ) {
                let name = item.title;
                name = name.replaceAll(".blkx", "");
                name = name.replaceAll(".blk", "");
                if (!countermeasures.includes(name)) {
                  countermeasures.push(name);
                }
              } else {
                if (
                  (hrf.includes("air_defence") || hrf.includes("airdefense")) &&
                  item.href.includes("blk") &&
                  edfl(hrf, ["/air_defense", "/airdefence"])
                ) {
                  let name = item.title;
                  name = name.replaceAll(".blkx", "");
                  name = name.replaceAll(".blk", "");
                  if (!airDefense.includes(name)) {
                    airDefense.push(name);
                  }
                } else {
                  if (
                    hrf.includes("infantry") &&
                    item.href.includes("blk") &&
                    edfl(hrf, "/infantry")
                  ) {
                    let name = item.title;
                    name = name.replaceAll(".blkx", "");
                    name = name.replaceAll(".blk", "");
                    if (!infantry.includes(name)) {
                      infantry.push(name);
                    }
                  } else {
                    if (
                      (hrf.includes("wheeled_vehicles") ||
                        hrf.includes("wheeledvehicles") ||
                        hrf.includes("vehicles")) &&
                      item.href.includes("blk") &&
                      edfl(hrf, [
                                                "/wheeled_vehicles",
                                                "/wheeledvehicles",
                                                "/vehicles",
                                            ])
                    ) {
                      let name = item.title;
                      name = name.replaceAll(".blkx", "");
                      name = name.replaceAll(".blk", "");
                      if (!vehicles.includes(name)) {
                        vehicles.push(name);
                      }
                    } else {
                      if (
                        hrf.includes("units") &&
                        item.href.includes("blk") &&
                        edfl(hrf, [
                                                    "/tankmodels",
                                                    "/tank_models",
                                                    "/air_defence",
                                                    "/infantry",
                                                    "/phys_obj",
                                                    "/radars",
                                                    "/ships",
                                                    "/structures",
                                                    "/tracked_vehicles",
                                                    "/wheeled_vehicles",
                                                    "/humans",
                                                    "/vehicles",
                                                    "/wagens",
                                                    "/walkers",
                                                ])
                      ) {
                        let name = item.title;
                        name = name.replaceAll(".blkx", "");
                        name = name.replaceAll(".blk", "");
                        if (!units.includes(name)) {
                          units.push(name);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    let available = {};
    let availableCraft = [];
    let availableNames = [];
    let all = {
      tanks: tanks,
      infantry: infantry,
      airDefense: airDefense,
      countermeasures: countermeasures,
      objectGroups: objectGroups,
      ships: ships,
      aircraft: aircraft,
      vehicles: vehicles,
    };
    Object.keys(all).forEach((key) => {
      let list = all[key];
      if (list.length > 0) {
        availableNames.push(key);
        available[key] = list;
        availableCraft.push.apply(availableCraft, list);
      }
    });
    return {
      raw: all,
      allAvailableModels: availableCraft,
      availableCategories: availableNames,
      available: available,
    };
  }

  /**
   * Wait function for async functions.
   * @param {Number} ms Number in milliseconds to wait
   * @returns {Promise<number>}
   * @internal
   */
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Uses War Thunder Wiki 2.0 to check viewable vehicles in-game.
   * @param {Array} blkArray
   * @returns {Promise<object>} The completed process object
   * @deprecated As the new Wiki 3.0 has been introduced, the features of Wiki 2.0 are now deprecated.
   */
  async function runProcess(blkArray) {
    function log(msg, color, bgColor) {
      color = color || "black";
      let bgc = bgColor;
      switch (color) {
      case "success":
        color = "Green";
        bgc = "LimeGreen";
        break;
      case "info":
        color = "DodgerBlue";
        bgc = "Turquoise";
        break;
      case "error":
        color = "Red";
        bgc = "Black";
        break;
      case "start":
        color = "OliveDrab";
        bgc = "PaleGreen";
        break;
      case "warning":
        color = "Tomato";
        bgc = "Black";
        break;
      case "end":
        color = "Orchid";
        bgc = "MediumVioletRed";
        break;
      default:
        color = color;
      }

      if (typeof msg == "object") console.log(msg);
      else if (typeof color == "object") {
        console.log(
          "%c" + msg,
          "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;",
        );
        console.log(color);
      } else {
        console.log(
          "%c" + msg,
          `color:${color};font-weight:bold;${bgColor ? "background-color:" + bgColor + ";" : ""}`,
        );
      }
    }

    function removeItem(arr, value) {
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1);
      return arr;
    }

    if (window.process) {
      if (!window.process.completed || window.prompt?.run) {
        throw new Error("Another process is still running.");
      } else {
        delete window.process;
      }
    }

    const process = (window.process = {
      craft: blkArray || window.aircraft || [],
      run: true,
      debug: false,
      completed: false,
      viewableCraft: [],
      unviewableCraft: [],
      hiddenCraft: [],
      unknownCraft: [],
      delay: (ms) => new Promise((res) => setTimeout(res, ms)),
      delayIfHangarNotReady: true,
    });

    process.aircraftIsListed = async function (id) {
      if (!process.run || process.completed) {
        return (
          process.hiddenCraft.includes(id) ||
          process.unknownCraft.includes(id) ||
          process.viewableCraft.includes(id) ||
          process.unviewableCraft.includes(id)
        );
      } else {
        throw new Error("Process hasn't completed yet.");
      }
    };

    async function doForId(id, r = 0, g = false, k = null, v = null, index0) {
      const percentage = (((index0 + 1) / process.craft.length) * 100).toFixed(
        0,
      );
      console.log(
        `ID ${id} || ${index0 + 1} out of ${process.craft.length} (${percentage}%)`,
      );
      if (!process.run || process.completed) return;

      try {
        await process.delay(250);
        const response = await fetch(
          `https://wiki.warthunder.com/Special:GameObjectView?object_id=${id}`,
        );
        if (response.status !== 200) throw new Error("Error fetching.");
        const json = await response.json();
        const details = json.details;
        if (json.status !== 200) throw new Error("Error fetching.");
        if (!details) return;

        const error = details.error || null;
        const reply = details.reply ? details.reply.result : null;

        if (error) {
          let rs = "";
          let halt = false;
          switch (error) {
          case "SERVER_ERROR_PEER_OFFLINE":
            rs = "War Thunder isn't open.";
            halt = true;
            break;
          case "Invalid token":
            rs = "Invalid token. Try logging out/in the Wiki.";
            halt = true;
            break;
          case "Not logged in user":
            rs = "Log into the War Thunder Wiki.";
            halt = true;
            break;
          default:
            rs = error;
          }
          if (halt) throw new Error(rs);
          if (process.debug) console.error(rs);
        }

        let statusColor = "black";
        let resultText = "";
        let un = false,
          f = false;
        let warn = false,
          sc = false,
          unv = false,
          unf = false,
          hnr = false,
          u = false;
        let addUnitName = false;

        if (reply) {
          await process.delay(250);
          switch (reply) {
          case "hangar_not_ready":
            resultText = "Hangar not ready";
            warn = true;
            statusColor = "red";
            hnr = true;
            break;
          case "success":
            resultText = "Success (viewable in hangar)";
            addUnitName = true;
            statusColor = "#00c17a";
            sc = true;
            break;
          case "unit_not_found":
            resultText = "Unit not found, or is hidden";
            addUnitName = true;
            statusColor = "orange";
            unf = true;
            un = true;
            break;
          case "unit_not_viewable":
            resultText = "Unit not viewable";
            addUnitName = true;
            statusColor = "yellow";
            unv = true;
            break;
          default:
            resultText = reply;
            u = true;
            if (process.debug) console.error(reply);
            break;
          }

          const logMsg = resultText + (addUnitName ? `: ${id}` : "");
          warn
            ?
            process.debug && console.warn(logMsg) :
            log(logMsg, statusColor);

          if (hnr && process.delayIfHangarNotReady) {
            await process.delay(700);
            return doForId(id, r, g, k, v, index0);
          }

          if (unv && !process.unviewableCraft.includes(id))
            process.unviewableCraft.push(id);
          if (sc && !process.viewableCraft.includes(id))
            process.viewableCraft.push(id);
          if (unf && !process.hiddenCraft.includes(id) && k == null)
            process.hiddenCraft.push(id);
          if (u && !process.unknownCraft.includes(id))
            process.unknownCraft.push(id);

          if (unv || sc) {
            f = true;
            if (k != null && v != null) {
              const sets = {
                success: process.viewableCraft,
                unit_not_found: process.hiddenCraft,
                unit_not_viewable: process.unviewableCraft,
              };
              for (const setName in sets) removeItem(sets[setName], k);
              removeItem(process.unknownCraft, k);
              log(
                `Existing object found with ID ${id} and original ID ${k}.`,
                "green",
              );
            }
          }

          if (unv || sc || unf || u) {
            await process.delay(350 + (u ? 2200 : 0));
          }
        }

        if (!f && un && !k && !v && !g) {
          const km = id.replaceAll("_", "-");
          if (km !== id && !g) {
            await process.delay(4000);
            log(`Checking '${id}' as '${km}'`, "grey");
            await doForId(km, r, true, id, reply, index0);
          }
        }
      } catch (err) {
        if (r > 39) {
          process.unknownCraft.push(id);
          await process.delay(10000);
        } else {
          await process.delay(5750);
          await doForId(id, r + 1, g, k, v, index0);
        }
      }

      await process.delay(150);
    }

    for (let i = 0; i < process.craft.length; i++) {
      const id = process.craft[i];
      await doForId(id, 0, false, null, null, i);
      await process.delay(1250);
    }

    process.run = false;
    process.completed = true;
    return process;
  }

  /**
   * Checks if a vehicle page exists on the War Thunder Wiki 3.0
   * Returns true if hidden, false if viewable.
   * Handles 405 error.
   * @param {string} name Unit ID
   * @returns {Promise<Object>} result if the unit has a wiki page.
   */
  async function isVehicleHiddenUsingWiki(name) {
    /**
     * Upon an error, this function is used to wait for the user to continue.
     * This function is nested and primarily used in {@link isVehicleHiddenUsingWiki}.
     * @param {String?} unitName
     * @internal
     */
    async function waitForUserContinue(unitName) {
      alert(
        `405/202 Not Allowed${unitName ? ` (${unitName}).` : `.`}\nSet 'finished = true' in the console to continue.`,
      );
      while (!window.finished) {
        await delay(500);
      }
      window.finished = false;
      return true;
    }
    try {
      let id = null;
      const response = await fetch(`https://wiki.warthunder.com/unit/${name}`);
      if (response.status === 405 || response.status === 202) {
        await waitForUserContinue(name);
        return await isVehicleHiddenUsingWiki(name);
      }

      if (response.status !== 200)
        return {
          id: id,
          result: true,
        };

      const html = await response.text();

      const match = html.match(
        /<textarea\b[^>]*\bid\s*=\s*"game-unit-initial"[^>]*>([\s\S]*?)<\/textarea>/i,
      );
      if (match && match[1]) {
        const jsonString = match[1].trim();

        try {
          const parsed = JSON.parse(jsonString);
          id = parsed.id;
        } catch (err) {}
      } else {}

      return {
        id: id,
        result: html.includes("There is currently no text in this page"),
      };
    } catch (err) {
      console.error("Fetch error:", err);
      return {
        id: id,
        result: true,
      };
    }
  }

  /**
   * Checks which vehicles in a list are viewable using {@link isVehicleHiddenUsingWiki}.
   * @param {string[]} list the list of IDs.
   * @returns {Promise<Object>} object containing key and value pairs whether not each vehicle is viisble.
   */
  async function viewableItemsInList(list) {
    window.finished = true;
    const result = {};

    for (let i = 0; i < list.length; i++) {
      const unit = list[i];
      let ih = await isVehicleHiddenUsingWiki(unit);
      const isHidden = ih.result;
      const id = ih.id ? ih.id : null;

      if (isHidden) {
        console.warn(`[${i + 1}/${list.length}] Hidden Vehicle: ${unit}`);
        await delay(100);
      } else {
        console.log(
          `[${i + 1}/${list.length}] Viewable Vehicle: ${unit}\n${id ? "ID: " + id : ""}`,
        );
      }

      result[unit] = {
        id: id,
        viewable: !isHidden,
      };
      await delay(125);
    }

    return result;
  }

  /**
   * Filters the result provided by {@link viewableItemsInList}.
   * This is normally used in War Thunder Wiki 3.0.
   * @param {Object} list the list of IDs
   * @param {Boolean} viewable filter the list whether or not the vehicles are viewable.
   * @returns {string[]} the result containing only vehicles that are of selected value.
   */
  function filterViewableItemsList(list, viewable = false) {
    try {
      const filteredUnits = Object.fromEntries(
        Object.entries(list).filter(([_, val]) => val.viewable === viewable),
      );
      return filteredUnits;
    } catch (error) {}
  }

  /**
   *
   * @param {string[]} list the list containing ID numbers, normally provided by {@link viewableItemsInList}.
   * This is normally used in War Thunder Wiki 3.0.
   * @returns {Object} the missing values and info.
   * @internal
   */
  function checkMissingIds(list) {
    try {
      const entries = Object.entries(list);

      const filtered = entries.filter(function ([, value]) {
        return value.id != null; 
      });

      filtered.sort(function (a, b) {
        return a[1].id - b[1].id;
      });

      const formattedList = [];
      for (let i = 0; i < filtered.length; i++) {
        const key = filtered[i][0];
        const value = filtered[i][1];
        formattedList.push({
          name: key,
          id: value.id,
          viewable: value.viewable,
        });
      }

      const ids = formattedList.map((item) => item.id);
      const minId = ids[0];
      const maxId = ids[ids.length - 1];

      const missingIds = [];
      for (let i = minId; i <= maxId; i++) {
        if (!ids.includes(i)) {
          missingIds.push(i);
        }
      }
      return {
        formatted_list: formattedList,
        lowest_id: lowest_id,
        highest_id: highest_id,
        missing_ids: missingIds,
      };
    } catch (error) {
      console.error("Error in idNumberTest:", error);
    }
  }

  /**
   * Returns the currently loaded vehicle on the wiki page, if available.
   * This is normally used in War Thunder Wiki 3.0.
   * @returns {Object|null}
   */
  function getCurrentWikiVehicle() {
    try {
      const elem = document.getElementById("game-unit-initial");
      if (!elem) return null;

      const data = elem.value || elem.textContent;
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  /**
   * Returns a random item from an Array or Object (keys).
   *
   * @param {string[] | Object} list The input Array or Object.
   * @returns {any} The random value from your list.
   * @example
   * random_from_list(["apple", "banana", "cherry"]);
   * // → "banana"
   */
  function random_from_list(list) {
    try {
      let array = Array.isArray(list) ? list : Object.keys(list);
      let results = [];

      for (let i = 0; i < 5; i++) {
        results.push(array[Math.floor(Math.random() * array.length)]);
      }
      let item =
        results.length > 0 ?
        results[Math.floor(Math.random() * results.length)] :
        array[Math.floor(Math.random() * array.length)];
      return item;
    } catch (err) {
      return null;
    }
  }

  /**
   * Retrieves the CSRF token from the page or app context.
   * This is normally used in War Thunder Wiki 3.0.
   * @returns {{param: string, token: string}|null}
   */
  function getCSRFToken() {
    try {
      const meta = document.querySelector('meta[name="csrf-token"]');
      const param = meta?.content || "_csrf";
      const token = meta?.content;

      if (window.app && typeof window.app.getCSRFToken === "function") {
        return {
          param: typeof window.app.getCSRFParam === "function" ?
            window.app.getCSRFParam() || param : "_csrf",
          token: window.app.getCSRFToken() || token,
        };
      }

      return token ? {
          param,
          token,
        } :
        null;
    } catch {
      return null;
    }
  }

  /**
   * Toggles a vehicle's "favorite" status.
   * This is normally used in War Thunder Wiki 3.0.
   * @param {string} id
   * @param {boolean} to
   * @returns {Promise<Object>}
   */
  async function vehicleSetFavorite(id, to) {
    try {
      const csrf = getCSRFToken();
      if (!csrf) throw new Error("CSRF token missing.");

      const form = new FormData();
      form.append(csrf.param, csrf.token);
      form.append("unit_id", id);
      form.append("value", to ? 1 : 0);

      const res = await fetch("https://wiki.warthunder.com/api/gunitFavorite", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      return await res.json();
    } catch {
      return {
        success: false,
      };
    }
  }

  /**
   * Searches the Wiki using the search API.
   * This is normally used in War Thunder Wiki 3.0.
   * @param {string} q Query
   * @returns {Promise<Object>}
   */
  async function searchFor(q) {
    try {
      const csrf = getCSRFToken();
      const form = new FormData();
      form.append(csrf.param, csrf.token);
      form.append("q", q);

      const res = await fetch("https://wiki.warthunder.com/api/search", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      return await res.json();
    } catch {
      return {
        success: false,
      };
    }
  }

  /**
   * Requests to show a vehicle in-game. This requires {@link getCSRFToken}.
   * This is normally used in War Thunder Wiki 3.0.
   * @param {string} id
   * @returns {Promise<Object|false>}
   */
  async function showVehicle(id) {
    try {
      const csrf = getCSRFToken();
      const form = new FormData();
      form.append(csrf.param, csrf.token);
      form.append("unit_id", id);

      const res = await fetch(
        "https://wiki.warthunder.com/api/gunitIngameShow", {
          method: "POST",
          credentials: "include",
          body: form,
        },
      );

      const data = await res.json();
      const message = data.message.toLowerCase();
      const reply = data.debug?.reply;

      let resultMsg = message;

      if (message === "the vehicle is shown in the game window!") {
        resultMsg = "success";
      } else if (
        message === "service unavailable, try again later" &&
        reply?.result === "not_in_hangar"
      ) {
        resultMsg = "not in hangar";
      }

      return {
        message: resultMsg,
        success: data.success,
        raw: data,
      };
    } catch {
      return false;
    }
  }

  /**
   * Picks a random object from a list and copies it as text.
   * @param {Array|Object} list The input Object or Array.
   * @returns {any} whether or not there was a successs.
   */
  async function copyRandomItemFromList(list) {
    try {
      document.body.focus();
      let randomItem = random_from_list(list);
      let result = await navigator.clipboard.writeText(randomItem);
      return result;
    } catch (err) {
      return false;
    }
  }

  /**
   * Compares items that have been removed or added in Array Y from X.
   * @param {Array} x The first Array to compare.
   * @param {Array} y The second Array to compare.
   * @returns {Object} Object containing which values were added or removed.
   */
  function find_diff(x, y) {
    const isxValid = Array.isArray(x) || (typeof x === "object" && x !== null);
    const isyValid = Array.isArray(y) || (typeof y === "object" && y !== null);

    if (!isxValid || !isyValid) {
      throw new Error("Invalid input(s).");
    }

    const added = Array.isArray(y) ? [] : {};
    const removed = Array.isArray(x) ? [] : {};

    if (Array.isArray(x) && Array.isArray(y)) {
      y.forEach((item) => {
        if (!x.includes(item)) {
          added.push(item);
        }
      });
      x.forEach((item) => {
        if (!y.includes(item)) {
          removed.push(item);
        }
      });
    } else if (typeof x === "object" && typeof y === "object") {
      for (const key in y) {
        if (!(key in x)) {
          added[key] = y[key];
        }
      }
      for (const key in x) {
        if (!(key in y)) {
          removed[key] = x[key];
        }
      }
    } else {
      throw new Error("Invalid input(s).");
    }

    return {
      added: added,
      removed: removed,
    };
  }

  /**
   * Converts an internal matrix into the more used one.
   * @param {String|Object|Array} m The input position matrix value.
   * @returns {String} The converted matrix value used in missions.
   * @internal
   */
  function replace_matrix(m) {
    try {
      m = JSON.parse(m);
    } catch (error) {}

    function ensureDecimal(num) {
      if (num % 1 === 0) {
        return num.toFixed(1);
      }
      return num.toString();
    }

    function tblFrom( /*infinite args*/ ) {
      let args = Array.prototype.slice.call(arguments);
      let table = [];
      args.forEach((arg) => {
        table.push(arg);
      });
      return table;
    }
    let p0 = tblFrom(
      ensureDecimal(m[0]),
      ensureDecimal(m[1]),
      ensureDecimal(m[2]),
    );
    let p1 = tblFrom(
      ensureDecimal(m[3]),
      ensureDecimal(m[4]),
      ensureDecimal(m[5]),
    );
    let p2 = tblFrom(
      ensureDecimal(m[6]),
      ensureDecimal(m[7]),
      ensureDecimal(m[8]),
    );
    let p3 = tblFrom(
      ensureDecimal(m[9]),
      ensureDecimal(m[10]),
      ensureDecimal(m[11]),
    );

    return `[[${p0}] [${p1}] [${p2}] [${p3}]]`;
  }

  /**
   * Replaces any internal values in provided BLK text or matrix.
   * @param {String} text The input internal BLK or matrix.
   * @returns {String} The new BLK text / matrix.
   */
  function replace_all_matrix(text) {
    let coordsList = text.match(/:m ?= ?\[([-0-9.e+-]+,? ?){12}\]/gim);
    let nText = text;
    nText = nText.replaceAll("true", "yes");
    nText = nText.replaceAll("false", "no");
    nText = nText.replaceAll(" = ", "=");
    if (coordsList && coordsList.forEach) {
      coordsList.forEach((item) => {
        let m = item.split(/:m ?= ?/gim);
        m = m[1] || m[0];
        if (m) {
          let m2 = m;
          try {
            m2 = JSON.parse(m2);
          } catch (error) {}
          let parsed = null;
          try {
            parsed = replace_matrix(m2);
          } catch (error) {
            console.error(error);
          }
          nText = nText.replace(m, parsed);
        }
      });
    }
    return nText.trim();
  }

  /**
   *
   * @param {Boolean} includeSubFolders If subfolders are implemented.
   * @param {Boolean} getFileData If file content is included.
   * @returns {Object} Result with all values.
   */
  async function folder_to_json(includeSubFolders = true, getFileData = true) {
    async function readFile(file, type = "uri") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        switch (type) {
        case "uri":
          reader.readAsDataURL(file);
          break;
        case "arraybuffer":
          reader.readAsArrayBuffer(file);
          break;
        case "binary":
          reader.readAsBinaryString(file);
          break;
        case "text":
          reader.readAsText(file);
          break;
        default:
          return reject(new Error("Invalid type specified."));
        }
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
      });
    }

    try {
      const handle = await window.showDirectoryPicker();
      const allFiles = [];
      const fs_ = {};
      const filtered = {};
      const filteredAllFiles = [];
      const flatFileList = [];

      async function doFor(folder, directoryPosition) {
        for await (const entry of folder.values()) {
          if (entry.kind === "directory" && includeSubFolders) {
            const newHandle = await folder.getDirectoryHandle(entry.name);
            directoryPosition[entry.name] = {};
            await doFor(newHandle, directoryPosition[entry.name]);
          } else if (entry.kind === "file") {
            allFiles.push(entry.name);
            directoryPosition[entry.name] = entry;
          }
        }
      }

      await doFor(handle, fs_);

      async function filterSection(folder, directoryPosition) {
        const newFolder = {};
        for (const key of Object.keys(folder)) {
          const value = folder[key];
          if (value instanceof FileSystemFileHandle) {
            let file = null;
            let fileData = null;
            try {
              file = await value.getFile();
              if (getFileData) {
                fileData = (await readFile(file, "text")).trim();
              }
            } catch (err) {
              file = null;
              fileData = null;
            }

            const name = key.replace(/\.[^/.]+$/, "");
            const fileType = key.slice(name.length);
            const fileObj = {
              kind: "file",
              fileType,
              name,
              fullName: key,
              file,
            };
            if (getFileData) fileObj.fileData = fileData;

            newFolder[name] = fileObj;
            directoryPosition[name] = fileObj;

            flatFileList.push({
              name,
              fullName: key,
              fileType,
              fileData,
            });
          } else {
            directoryPosition[key] = {};
            await filterSection(folder[key], directoryPosition[key]);
          }
        }
        return newFolder;
      }

      await filterSection(fs_, filtered);

      allFiles.forEach((file) => {
        const name = file.replace(/\.[^/.]+$/, "");
        filteredAllFiles.push(name);
      });

      return {
        filtered,
        raw: fs_,
        allFiles,
        filteredAllFiles,
        flatFileList,
      };
    } catch (err) {
      if (String(err).includes("AbortError")) return false;
      else throw new Error(err);
    }
  }

  /**
   * Gets the name of an aircraft using the Wiki.
   * This is normally used in War Thunder Wiki 2.0.
   * @param {String} objectId Unit ID.
   * @returns {String} The unit's name.
   */
  async function getAircraftNameFromOldWiki(objectId) {
    let page = await fetch(
      `https://old-wiki.warthunder.com/objects/?game_id=${objectId}`,
    );

    let html = await page.text();
    html = html.trim();
    let match = html.match(/<title>[\s\S]*?<\/title>/i);
    let titleText = match[0].replace(/<\/?title>/i, "");
    titleText = titleText.replace(/<\/?title>/i, "");
    titleText = titleText.replace(" - War Thunder Wiki", "");
    if (titleText.toLowerCase() == "war thunder wiki") {
      return objectId;
    }
    return titleText;
  }

  /**
   * Gets the BR of an aircraft using the Wiki.
   * This is normally used in War Thunder Wiki 2.0.
   * @param {String} objectId Unit ID.
   * @returns {String} The unit's BRs.
   */
  async function getAircraftBattleRatingsFromOldWiki(objectId) {
    let page = await fetch(
      `https://old-wiki.warthunder.com/objects/?game_id=${objectId}`,
    );

    let html = await page.text();
    html = html.trim();
    let brMatches = html.match(/<td>[0-9]*\.[0-9]+<\/td>/g) || [
            "1.0",
            "1.0",
            "1.0",
        ];
    let arcade = brMatches[0];
    let realistic = brMatches[1];
    let simulator = brMatches[2];

    arcade = arcade.replace(/<\/?td>/i, "");
    arcade = arcade.replace(/<\/?td>/i, "");
    realistic = realistic.replace(/<\/?td>/i, "");
    realistic = realistic.replace(/<\/?td>/i, "");
    simulator = simulator.replace(/<\/?td>/i, "");
    simulator = simulator.replace(/<\/?td>/i, "");

    let brMatch = [arcade, realistic, simulator];
    let data = {
      AB: brMatch[0] || "1.0",
      RB: brMatch[1] || "1.0",
      SB: brMatch[2] || "1.0",
    };
    return data;
  }

  /**
   * Gets the required RP of an aircraft using the Wiki.
   * This is normally used in War Thunder Wiki 2.0.
   * @param {String} objectId Unit ID.
   * @returns {Number} The unit's required RP.
   */
  async function getAircraftResearchPointsFromOldWiki(objectId) {
    let page = await fetch(
      `https://old-wiki.warthunder.com/objects/?game_id=${objectId}`,
    );

    let html = await page.text();
    html = html.trim();
    let match = html.match(
      /<span class="value">([A-Za-z0-9]+ ?[A-Za-z0-9]*) ?<a/g,
    ) || [`<span class="value">0 <a`];
    let value = match[0];
    value = value.replace(/<span class="value">| ?<a/g, "");
    value = value.replace(/<span class="value">| ?<a/g, "");
    value = value.replace(",", "");
    value = value.replace(/[\s,]/g, "");
    value = value.replaceAll(" ", "");
    if (html.toLowerCase().includes(`<span class="desc">research:</span>`)) {
      if (Number(value) != NaN) {
        return Number(value);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  /**
   * Gets the nation of an aircraft using the Wiki.
   * This is normally used in War Thunder Wiki 2.0.
   * @param {String} objectId Unit ID.
   * @returns {String} The unit's nation.
   */
  async function getAircraftNationFromOldWiki(objectId) {
    let page = await fetch(
      `https://old-wiki.warthunder.com/objects/?game_id=${objectId}`,
    );

    let html = await page.text();
    html = html.trim();
    let match = html.match(
      /<a href="\/Category:[A-Za-z0-9]+_[A-Za-z0-9]+" title="Category:[A-Za-z0-9]+ ?[A-Za-z0-9]+">[A-Za-z0-9]+<\/a/i,
    ) || [`>Unknown</a>`];
    let result = match[0];
    let match2 = result.match(/>[A-Za-z0-9]+<\/a/i);
    let nation = match2[0].replace(/>(.*?)<\/a>/g, "");
    nation = nation.replaceAll(">", "");
    nation = nation.replaceAll("</a", "");
    nation = nation.replaceAll("<", "");

    return nation;
  }

  /**
   * Gets the type of an aircraft using the Wiki.
   * This is normally used in War Thunder Wiki 2.0.
   * @param {String} objectId Unit ID.
   * @returns {String} The unit's type.
   */
  async function getAircraftTypeFromOldWiki(objectId) {
    /**
     *
     * @param {String} text The value to search for.
     * @param {Array|Object} list The input Object or Array.
     * @returns {Boolean} whether or not the value is inside the list.
     * @internal
     */
    function includesList(text, list) {
      let val = false;
      if (typeof list == "string") {
        return text.includes(list);
      } else {
        try {
          list.forEach((val) => {
            if (typeof val == "string") {
              if (text.includes(val)) {
                val = true;
              }
            }
          });
        } catch (err) {}
        Object.keys(list).forEach((key) => {
          let value = list[key];
          if (value == undefined || value == null) {
            if (text.includes(String(key))) {
              val = true;
            }
            try {
              if (text.includes(value)) {
                val = true;
              }
            } catch (err) {}
          }
          try {
            if (text.includes(value)) {
              val = true;
            }
          } catch (err) {}
        });
      }
      return val;
    }
    let page = await fetch(
      `https://old-wiki.warthunder.com/objects/?game_id=${objectId}`,
    );

    let html = await page.text();
    html = html.trim();
    html = html.toLowerCase();
    let found = true;
    let match = html.match(/<title>[\s\S]*?<\/title>/i);
    let titleText = match[0].replace(/<\/?title>/i, "");
    titleText = titleText.replace(/<\/?title>/i, "");
    titleText = titleText.replace(" - War Thunder Wiki", "");
    if (titleText.toLowerCase() == "war thunder wiki") {
      titleText = objectId;
      found = false;
    }
    if (found) {
      if (includesList(html, ["attack helicopter", "utility helicopter"])) {
        return "helicopter";
      }
      if (
        includesList(html, [
                    "plane",
                    "hydroplane",
                    "fighter",
                    "bomber",
                    "interceptor",
                    "torpedo bomber",
                    "dive bomber",
                    "aircraft",
                    "naval aircraft",
                    "longe range bomber",
                    "strike aircraft",
                    "frontline bomber",
                    "air defence fighter",
                    "jet fighter",
                    "jet bomber",
                    "pony fighter",
                    "pony bomber",
                    "pony",
                ])
      ) {
        return "aircraft";
      }
      if (
        includesList(html, [
                    "light tank",
                    "medium tank",
                    "spaa",
                    "tank destroyer",
                    "heavy tank",
                    "anti-tank missile carrier",
                    "anti tank missile carrier",
                    "tank",
                    "aa",
                    "space combat unit",
                ])
      ) {
        return "tank";
      }
      if (
        includesList(html, [
                    "ship",
                    "destroyer",
                    "light cruiser",
                    "heavy cruiser",
                    "battleship",
                    "battlecruiser",
                    "motor torpedo boat",
                    "motor gun boat",
                    "sub-chaser",
                    "sub chaser",
                    "frigate",
                    "submarine",
                    "sub",
                    "galleon",
                ])
      ) {
        return "ship";
      }
    } else {
      return "unknown";
    }
  }

  /**
   * Extracts the triggers and mission settings from a mission.
   * @param {String|Object} blkOrJson The input BLK text or JSON.
   * @returns {Object} object with sorted values.
   */
  function extractDataFromMission(blkOrJson) {
    let parsedJson =
      typeof blkOrJson === "string" ? blk_to_json(blkOrJson) : blkOrJson;

    const missionKeys = [];
    const extraKeys = [];
    const missionSettingKeys = [];
    const triggersResult = {
      actions: {},
      conditions: {},
      events: {},
    };

    function getType(val) {
      if (typeof val === "boolean") return "bool";
      if (typeof val === "string") return "string";
      if (typeof val === "number")
        return Number.isInteger(val) ? "int" : "real";
      if (Array.isArray(val)) {
        if (val.every((v) => typeof v === "number")) {
          if (val.length === 2) return "p2";
          if (val.length === 3) return "p3";
          if (val.length === 4) return "p4";
        }
        return "array";
      }
      if (typeof val === "object") return "block";
      return "unknown";
    }

    if (parsedJson?.mission_settings) {
      const mission_settings = parsedJson.mission_settings;
      for (const key in mission_settings) {
        if (key != "mission") {
          const val = mission_settings[key];
          if (typeof val === "object" && val !== null && !Array.isArray(val)) {
            missionSettingKeys.push({
              name: key,
              type: "block",
              values: [val],
            });
          } else {
            missionSettingKeys.push({
              name: key,
              type: getType(val),
              values: [val],
            });
          }
        }
      }
    }

    if (parsedJson?.mission_settings?.mission) {
      const mission = parsedJson.mission_settings.mission;
      for (const key in mission) {
        const val = mission[key];
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          missionKeys.push({
            name: key,
            type: "block",
            values: [val],
          });
        } else {
          missionKeys.push({
            name: key,
            type: getType(val),
            values: [val],
          });
        }
      }
    }

    if (parsedJson && parsedJson.mission_settings) {
      const jsonItself = parsedJson;
      for (const key in jsonItself) {
        if (
          key != "mission_settings" &&
          key != "imports" &&
          key != "triggers" &&
          key != "mission_objectives" &&
          key != "variables" &&
          key != "dialogs" &&
          key != "airfields" &&
          key != "effects" &&
          key != "units" &&
          key != "areas" &&
          key != "objLayers" &&
          key != "wayPoints"
        ) {
          const val = jsonItself[key];
          if (typeof val === "object" && val !== null && !Array.isArray(val)) {
            extraKeys.push({
              name: key,
              type: "block",
              values: [val],
            });
          } else {
            extraKeys.push({
              name: key,
              type: getType(val),
              values: [val],
            });
          }
        }
      }
    }

    function walkTriggers(node) {
      if (!node || typeof node !== "object") return;

      if (node.isCategory !== undefined) {
        for (const key in node) {
          if (key === "isCategory" || key === "is_enabled") continue;
          walkTriggers(node[key]);
        }
        return;
      }

      function addToGroup(group, name, value) {
        const cleanName = name.startsWith("__") ? name.slice(2) : name;
        if (!group[cleanName]) group[cleanName] = [];
        group[cleanName].push(value);
      }

            ["actions", "conditions", "events"].forEach((type) => {
        const group = triggersResult[type];
        if (node[type] && typeof node[type] === "object") {
          for (const name in node[type]) {
            addToGroup(group, name, node[type][name]);
          }
        }
      });

      if (node.else_actions && typeof node.else_actions === "object") {
        for (const name in node.else_actions) {
          addToGroup(triggersResult.actions, name, node.else_actions[name]);
        }
      }

      for (const key in node) {
        if (
                    [
                        "actions",
                        "conditions",
                        "events",
                        "else_actions",
                        "is_enabled",
                        "isCategory",
                        "comments",
                        "props",
                    ].includes(key)
        )
          continue;

        walkTriggers(node[key]);
      }
    }
    walkTriggers(parsedJson?.triggers);

    return {
      missionKeys,
      missionSettingKeys,
      extraKeys,
      triggers: triggersResult,
    };
  }

  /**
   * Extracts the triggers and mission settings from multiple missions.
   * This uses {@link extractDataFromMission}.
   * @returns {Object} object with sorted values in total of all missions.
   */
  async function extractDataFromMissions() {
    const combined = {
      missionKeys: [],
      extraKeys: [],
      missionSettingKeys: [],
      triggers: {
        actions: {},
        conditions: {},
        events: {},
      },
    };

    const folderData = await folder_to_json(true, true);
    if (!folderData || !folderData.flatFileList) return combined;

    const missionKeyMap = new Map();
    const extraKeyMap = new Map();
    const missionSettingKeyMap = new Map();

    for (const file of folderData.flatFileList) {
      const content = file.fileData;
      if (!content) continue;

      const {
        missionKeys,
        extraKeys,
        missionSettingKeys,
        triggers
      } =
      extractDataFromMission(content);

      for (const mk of missionKeys) {
        if (!missionKeyMap.has(mk.name)) {
          missionKeyMap.set(mk.name, {
            name: mk.name,
            type: mk.type,
            values: [...mk.values],
          });
        } else {
          const existing = missionKeyMap.get(mk.name);
          for (const val of mk.values) {
            if (
              !existing.values.some(
                (v) => JSON.stringify(v) === JSON.stringify(val),
              )
            ) {
              existing.values.push(val);
            }
          }
        }
      }

      for (const mk of missionSettingKeys) {
        if (!missionSettingKeyMap.has(mk.name)) {
          missionSettingKeyMap.set(mk.name, {
            name: mk.name,
            type: mk.type,
            values: [...mk.values],
          });
        } else {
          const existing = missionSettingKeyMap.get(mk.name);
          for (const val of mk.values) {
            if (
              !existing.values.some(
                (v) => JSON.stringify(v) === JSON.stringify(val),
              )
            ) {
              existing.values.push(val);
            }
          }
        }
      }

      for (const mk of extraKeys) {
        if (!extraKeyMap.has(mk.name)) {
          extraKeyMap.set(mk.name, {
            name: mk.name,
            type: mk.type,
            values: [...mk.values],
          });
        } else {
          const existing = extraKeyMap.get(mk.name);
          for (const val of mk.values) {
            if (
              !existing.values.some(
                (v) => JSON.stringify(v) === JSON.stringify(val),
              )
            ) {
              existing.values.push(val);
            }
          }
        }
      }

      for (const category of ["actions", "conditions", "events"]) {
        const srcGroup = triggers[category];
        const dstGroup = combined.triggers[category];

        for (const key in srcGroup) {
          if (!dstGroup[key]) {
            dstGroup[key] = [...srcGroup[key]];
          } else {
            for (const entry of srcGroup[key]) {
              if (
                !dstGroup[key].some(
                  (e) => JSON.stringify(e) === JSON.stringify(entry),
                )
              ) {
                dstGroup[key].push(entry);
              }
            }
          }
        }
      }
    }

    combined.missionKeys = Array.from(missionKeyMap.values());
    combined.extraKeys = Array.from(extraKeyMap.values());
    combined.missionSettingKeys = Array.from(missionSettingKeyMap.values());
    return combined;
  }

  /**
   * Filters wpcost data using OR logic.
   * Returns an object keyed by filter condition, listing matching object keys.
   * @param {String|Object} data The input BLK text or JSON.
   * @param {String} filter The filter.
   * @returns {Object} the result containing filters.
   */
  function wpcost_filter(data, filter) {
    if (typeof data !== "object") {
      try {
        data = blk_to_json(data);
      } catch {
        return false;
      }
    }
    if (!data) return false;

    if (typeof filter === "string") filter = [filter];

    let filters = {};
    for (let f of filter) {
      let negate = f.startsWith("!");
      let keyStr = negate ? f.slice(1) : f;
      let value = true;

      if (keyStr.includes("=")) {
        let [key, rawVal] = keyStr.split("=");
        key = key.trim();
        rawVal = rawVal.trim();

        if (
          (rawVal.startsWith('"') && rawVal.endsWith('"')) ||
          (rawVal.startsWith("'") && rawVal.endsWith("'"))
        )
          rawVal = rawVal.slice(1, -1);

        if (rawVal === "__any__") value = "__any__";
        else if (!isNaN(rawVal)) value = Number(rawVal);
        else if (/^(true|yes)$/i.test(rawVal)) value = true;
        else if (/^(false|no)$/i.test(rawVal)) value = false;
        else value = rawVal;

        filters[f] = {
          key,
          negate,
          expected: value,
        };
      } else {
        filters[f] = {
          key: keyStr,
          negate,
          expected: true,
        };
      }
    }

    let result = {};
    Object.keys(filters).forEach((k) => (result[k] = []));

    for (let objKey in data) {
      let obj = data[objKey];
      if (typeof obj !== "object") continue;

      for (let fKey in filters) {
        let {
          key,
          negate,
          expected
        } = filters[fKey];
        let actual = obj[key];
        let matched = false;

        if (expected === "__any__") {
          matched = actual !== undefined;
        } else if (fKey.includes("=")) {
          matched = negate ? actual !== expected : actual === expected;
        } else {
          if (negate) {
            matched =
              actual !== undefined &&
              (actual === false || actual === 0 || /^no$/i.test(actual));
          } else {
            matched =
              actual !== undefined &&
              (actual === true || actual === 1 || /^yes$/i.test(actual));
          }
        }

        if (matched) result[fKey].push(objKey);
      }
    }

    return result;
  }

  /**
   * Extracts unit info and DM parts from multiple files.
   * @returns {Object} contains values used in each vehicle class.
   */
  async function extractUnitsAndDM() {
    const folderData = await folder_to_json(true, true);
    if (!folderData) return;

    const result = {
      dmParts: [],
      usedWeapons: [],
      shipBlocks: {},
      airBlocks: {},
      unitBlocks: {},
    };

    const blkFiles = folderData.flatFileList.filter(
      (f) => f.fileType === ".blk" && f.fileData,
    );

    const addUsedValue = (target, key, value) => {
      if (!key || value == null) return;
      if (!target[key])
        target[key] = {
          usedValues: [],
        };
      if (!target[key].usedValues.includes(value)) {
        target[key].usedValues.push(value);
      }
    };

    for (const file of blkFiles) {
      const text = file.fileData;

      if (!/DamageParts|model|fmFile|fightAiBehaviour|moveType/i.test(text))
        continue;

      const blkJson = blk_to_json(text);
      const topKeys = Object.keys(blkJson);

      const isShip =
        /SoundMove\s*:\s*t\s*=\s*"models\.Ship"/.test(text) ||
        /propSplashEffects\s*:\s*t\s*=\s*"propSplashEffects_underwater"/.test(
          text,
        ) ||
        /\b(defaultShipFlag|availableShipFlags|shipSinkingFx|breaches|shipCover)\b\s*\{/.test(
          text,
        ) ||
        /moveType\s*:\s*t\s*=\s*"ship"/.test(text) ||
        /\b(periscopeDepth|divingLockCooldown|ShipPhys)\b\s*[:{]/.test(text);

      const isAir =
        /fmFile\s*:\s*t\s*=\s*".+?"/.test(text) ||
        /fightAiBehaviour\s*:\s*t\s*=\s*".+?"/.test(text) ||
        /\b(turbulence|bailout|cutting|overheatBlk|damagePartsToCollisionObjectsMapBlk|damagePartsToFmPartsMapBlk|damagePartsToHudPartsMapBlk|damagePartsDependencyMapBlk|damagePartsToCollisionPointsMapBlk|damagePartsToWeaponsMapBlk|damagePartsToAvionicsPartsMapBlk|damagePartsToVisualEffectsMapBlk|advancedInstructor|damagePartsExcludeFromHoleBlk|disableExhaustFxIfContrailIsActive|explosion_dmBlk|orbitAvaible|paratrooper|canTakeoffWithoutGear)\b/.test(
          text,
        );

      const target = isShip ?
        result.shipBlocks :
        isAir ?
        result.airBlocks :
        result.unitBlocks;

      for (const key of topKeys) {
        const val = blkJson[key];

        if (typeof val === "object" && !Array.isArray(val)) continue;

        if (Array.isArray(val)) {
          for (const v of val) {
            if (typeof v !== "object") addUsedValue(target, key, v);
          }
        } else {
          addUsedValue(target, key, val);
        }
      }

      const dmgBlocks = text.matchAll(/DamageParts\s*\{([\s\S]*?)\n\}/g);
      for (const match of dmgBlocks) {
        const dmgContent = match[1];
        for (const dmMatch of dmgContent.matchAll(/([A-Za-z0-9_]+_dm)\s*\{/g)) {
          const part = dmMatch[1];
          if (!result.dmParts.includes(part)) result.dmParts.push(part);
        }
      }

      const commonWeaponsBlock = text.match(/commonWeapons\s*\{([\s\S]*?)\n\}/);
      if (commonWeaponsBlock) {
        for (const wm of commonWeaponsBlock[1].matchAll(
            /blk\s*:\s*t\s*=\s*"([^"]+)"/gi,
          )) {
          let wpath = wm[1].replace(/gameData\/weapons\//i, ""); 
          if (!result.usedWeapons.includes(wpath))
            result.usedWeapons.push(wpath);
        }
      }
    }

    result.dmParts = [...new Set(result.dmParts)];
    result.usedWeapons = [...new Set(result.usedWeapons)];

    return result;
  }

  window.randomFromList = random_from_list;
  window.findDifferencesInArray = find_diff;
  window.inGameMtoM = replace_matrix;
  window.folderToJson = folder_to_json;
  window.replaceMs = replace_all_matrix;
  window.jsonToBlk = json_to_blk;
  window.blkToJson = blk_to_json;

  window.wt_tools = {
    extract_units_dm: extractUnitsAndDM,
    extract_md_from_folder: extractDataFromMissions,
    extract_md_from_one: extractDataFromMission,
    filter_wpcost: wpcost_filter,
    fix_matrix: replace_matrix,
    fix_mission: replace_all_matrix,
    json_to_blk: json_to_blk,
    blk_to_json: blk_to_json,

    new: newFunctions,

    github: {
      get_models: getModels,
    },
    utils: {
      random_from_list: random_from_list,
      diff_from_arrays: find_diff,
      folder_to_json: folder_to_json,
      copy_random_from_list: copyRandomItemFromList,
    },
    wiki_2: {
      get_aircraft_name: getAircraftNameFromOldWiki,
      get_aircraft_br: getAircraftBattleRatingsFromOldWiki,
      get_aircraft_rp: getAircraftResearchPointsFromOldWiki,
      get_aircraft_nation: getAircraftNationFromOldWiki,
      get_aircraft_type: getAircraftTypeFromOldWiki,
    },
    wiki_3: {
      is_vehicle_hidden: isVehicleHiddenUsingWiki,
      viewable_vehicles_from_list: viewableItemsInList,
      filter_viewable: filterViewableItemsList,
      show_vehicle: showVehicle,
      check_missing_ids: checkMissingIds,
      get_csrf_token: getCSRFToken,
      vehicle_set_fav: vehicleSetFavorite,
      search: searchFor,
    },
  };
})();
