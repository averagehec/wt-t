const SETUP_UNIT = () => {
  /*
  var AIR_WEAPON_TYPE = {
      BOMB_GUN: "bomb",
      ROCKET_GUN: "rocket",
      TORPEDO_GUN: "torpedo",
      BOOSTER_GUN: "booster",
      AIR_DROP_GUN: "air_drop",
      CONTAINER: "container",
      FUEL_TANK_GUN: "fuel_tank",
      TARGETTING_POD_GUN: "targeting_pod",
      CANNON: "cannon",
      NONE: "default",
  };

  var PURPOSE_TYPE = {
      AIR_TO_AIR: [BULLET_TYPE.AAM, BULLET_TYPE.ROCKET_AIR],
      AIR_TO_SEA: [BULLET_TYPE.TORPEDO],
      ARMORED: [
          BULLET_TYPE.ATGM_TANK,
          BULLET_TYPE.AP_TANK,
          BULLET_TYPE.ATGM_TANDEM_TANK,
      ],
  };

  var UNIT_INFO_ORDER = {
      TRAIN_COST: 0,
      FREE_REPAIRS: 1,
      FULL_REPAIR_COST: 2,
      FULL_REPAIR_TIME_CREW: 3,
      MAX_SPEED: 4,
      MAX_SPEED_ALT: 5,
      MAX_ALTITUDE: 6,
      TURN_TIME: 7,
      CLIMB_SPEED: 8,
      AIRFIELD_LEN: 9,
      WEAPON_PRESETS: 10,
      MASS_PER_SEC: 11,
      CLIMB_TIME: 12,
      CLIMB_ALT: 13,
      WING_LOADING: 14,
      THRUST_TO_WEIGHT_RATIO: 15,
      POWER_TO_WEIGHT_RATIO: 16,
      MASS: 17,
      HORSE_POWERS: 18,
      HORSE_POWERS_RPM: 19,
      MAX_SPEED_TANK: 20,
      MAX_INCLINATION: 21,
      TURN_TURRET_SPEED: 22,
      MIN_ANGLE_VERTICAL_GUIDANCE: 23,
      MAX_ANGLE_VERTICAL_GUIDANCE: 24,
      ARMOR_THICKNESS_HULL_FRONT: 25,
      ARMOR_THICKNESS_HULL_REAR: 26,
      ARMOR_THICKNESS_HULL_BACK: 27,
      ARMOR_THICKNESS_TURRET_FRONT: 28,
      ARMOR_THICKNESS_TURRET_REAR: 29,
      ARMOR_THICKNESS_TURRET_BACK: 30,
      ARMOR_PIERCING_10: 31,
      ARMOR_PIERCING_100: 32,
      ARMOR_PIERCING_500: 33,
      SHOT_FREQ: 34,
      RELOAD_TIME: 35,
      VISIBILITY: 36,
      WEAPON_PRESET_TANK: 37,
      SHIP_SPEED: 38,
      DISPLACEMENT: 39,
      ARMOR_THICKNESS_CITADEL_FRONT: 40,
      ARMOR_THICKNESS_CITADEL_REAR: 41,
      ARMOR_THICKNESS_CITADEL_BACK: 42,
      ARMOR_THICKNESS_TOWER_FRONT: 43,
      ARMOR_THICKNESS_TOWER_REAR: 44,
      ARMOR_THICKNESS_TOWER_BACK: 45,
      HULL_MATERIAL: 46,
      SUPERSTRUCTURE_MATERIAL: 47,
      WEAPON_INFO_TEXT: 48,
      MODIFICATIONS: 49,
      WEAPON_PRESETS_SLOTS: 50,
      PILONS_INFO: 51,
  };
  */

  const override_vehicle_images = {
    //TODO: use wt_tools
    tooltip: {
      /*ussr_atomic_hedgie: {
        use_flag: true,
        url: "images/tooltip/ussr_atomic_hedgie.png",
      },
      us_atomic_hedgie: {
        use_flag: true,
        url: "images/tooltip/ussr_atomic_hedgie.png",
      },*/
      atomic_pchela_lazer_ussr: {
        use_flag: true,
        url: "images/tooltip/atomic_pchela_lazer_ussr.png",
      },
      atomic_pchela_ussr: {
        use_flag: true,
        url: "images/tooltip/atomic_pchela_ussr.png",
      },
      atomic_pchela_lazer_usa: {
        use_flag: true,
        url: "images/tooltip/atomic_pchela_lazer_ussr.png",
      },
      atomic_pchela_usa: {
        use_flag: true,
        url: "images/tooltip/atomic_pchela_ussr.png",
      },
      us_destroyer_fletcher_sub_event: {
        use_flag: true,
        url: "images/tooltip/us_destroyer_fletcher_sub_event.png",
      },
      us_frigate_tacoma_sub_event: {
        use_flag: true,
        url: "images/tooltip/us_frigate_tacoma_sub_event.png",
      },
      germ_sub_type_7: {
        use_flag: true,
        url: "images/tooltip/germ_sub_type_7.png",
      },
      ucav_assault: {
        use_flag: false,
        url: "images/tooltip/ucav_assault.png",
      },
      uav_quadcopter: {
        use_flag: false,
        url: "images/tooltip/uav_quadcopter.png",
      },
      dragonfly_a: {
        use_flag: false,
        url: "images/tooltip/dragonfly_a.png",
      },
      dragonfly_h: {
        use_flag: false,
        url: "images/tooltip/dragonfly_h.png",
      },
      dragonfly_99_na: {
        use_flag: false,
        url: "images/tooltip/dragonfly_99_na.png",
      },
      dragonfly_99_rda: {
        use_flag: false,
        url: "images/tooltip/dragonfly_99_rda.png",
      },
      acoustic_heavy_tank_a: {
        use_flag: false,
        url: "images/tooltip/acoustic_heavy_tank_a.png",
      },
      mlrs_tank_a: {
        use_flag: false,
        url: "images/tooltip/mlrs_tank_a.png",
      },
      combat_tank_a: {
        use_flag: false,
        url: "images/tooltip/combat_tank_a.png",
      },
      combat_track_a: {
        use_flag: false,
        url: "images/tooltip/combat_track_a.png",
      },
      combat_tank_h: {
        use_flag: false,
        url: "images/tooltip/combat_tank_h.png",
      },
      combat_track_h: {
        use_flag: false,
        url: "images/tooltip/combat_track_h.png",
      },
      destroyer_heavy_tank_h: {
        use_flag: false,
        url: "images/tooltip/destroyer_heavy_tank_h.png",
      },
      mlrs_tank_h: {
        use_flag: false,
        url: "images/tooltip/mlrs_tank_h.png",
      },
      toon_f13t_2s: {
        use_flag: false,
        url: "images/tooltip/toon_f13t_2s.png",
      },
      toon_mb_3: {
        use_flag: false,
        url: "images/tooltip/toon_mb_3.png",
      },
      toon_panthera: {
        use_flag: false,
        url: "images/tooltip/toon_panthera.png",
      },
      toon_pbl_161: {
        use_flag: false,
        url: "images/tooltip/toon_pbl_161.png",
      },
      toon_tornado: {
        use_flag: false,
        url: "images/tooltip/toon_tornado.png",
      },
      toon_x_bee: {
        use_flag: false,
        url: "images/tooltip/toon_x_bee.png",
      },
      toon_x_bee: {
        use_flag: false,
        url: "images/tooltip/toon_x_bee.png",
      },
      toon_yk_27: {
        use_flag: false,
        url: "images/tooltip/toon_yk_27.png",
      },
      toon_yk_37: {
        use_flag: false,
        url: "images/tooltip/toon_yk_37.png",
      },
      us_mk_5_assault_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      us_mk_5_aa_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      us_mk_5_at_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      us_mk_5_sniper_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_assault_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_aa_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_at_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_sniper_combat_exoskeleton: {
        use_flag: false,
        url: "images/tooltip/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      sdi_harpy: {
        use_flag: false,
        url: "images/tooltip/sdi_harpy.png",
      },
      sdi_hydra: {
        use_flag: false,
        url: "images/tooltip/sdi_hydra.png",
      },
      sdi_minotaur: {
        use_flag: false,
        url: "images/tooltip/sdi_minotaur.png",
      },
      /*space suits*/
    },
    shop: {
      ussr_atomic_hedgie: {
        use_flag: true,
        url: "images/shop/ussr_atomic_hedgie.png",
      },
      us_atomic_hedgie: {
        use_flag: true,
        url: "images/shop/ussr_atomic_hedgie.png",
      },
      atomic_pchela_lazer_ussr: {
        use_flag: true,
        url: "images/shop/atomic_pchela_lazer_ussr.png",
      },
      atomic_pchela_ussr: {
        use_flag: true,
        url: "images/shop/atomic_pchela_ussr.png",
      },
      atomic_pchela_lazer_usa: {
        use_flag: true,
        url: "images/shop/atomic_pchela_lazer_ussr.png",
      },
      atomic_pchela_usa: {
        use_flag: true,
        url: "images/shop/atomic_pchela_ussr.png",
      },
      us_destroyer_fletcher_sub_event: {
        url: "images/shop/us_destroyer_fletcher_sub_event.png",
      },
      us_frigate_tacoma_sub_event: {
        url: "images/shop/us_frigate_tacoma_sub_event.png",
      },
      germ_sub_type_7: {
        url: "images/shop/germ_sub_type_7.png",
      },
      ucav_assault: {
        url: "images/shop/ucav_assault.png",
      },
      uav_quadcopter: {
        url: "images/shop/uav_quadcopter.png",
      },
      dragonfly_a: {
        url: "images/shop/dragonfly_a.png",
      },
      dragonfly_h: {
        url: "images/shop/dragonfly_h.png",
      },
      dragonfly_99_na: {
        url: "images/shop/dragonfly_99_na.png",
      },
      dragonfly_99_rda: {
        url: "images/shop/dragonfly_99_rda.png",
      },
      acoustic_heavy_tank_a: {
        url: "images/shop/acoustic_heavy_tank_a.png",
      },
      mlrs_tank_a: {
        url: "images/shop/mlrs_tank_a.png",
      },
      combat_tank_a: {
        url: "images/shop/combat_tank_a.png",
      },
      combat_track_a: {
        url: "images/shop/combat_track_a.png",
      },
      combat_tank_h: {
        url: "images/shop/combat_tank_h.png",
      },
      combat_track_h: {
        url: "images/shop/combat_track_h.png",
      },
      destroyer_heavy_tank_h: {
        url: "images/shop/destroyer_heavy_tank_h.png",
      },
      mlrs_tank_h: {
        url: "images/shop/mlrs_tank_h.png",
      },
      toon_f13t_2s: {
        url: "images/shop/toon_f13t_2s.png",
      },
      toon_mb_3: {
        url: "images/shop/toon_mb_3.png",
      },
      toon_panthera: {
        url: "images/shop/toon_panthera.png",
      },
      toon_pbl_161: {
        url: "images/shop/toon_pbl_161.png",
      },
      toon_tornado: {
        url: "images/shop/toon_tornado.png",
      },
      toon_x_bee: {
        url: "images/shop/toon_x_bee.png",
      },
      toon_x_bee: {
        url: "images/shop/toon_x_bee.png",
      },
      toon_yk_27: {
        url: "images/shop/toon_yk_27.png",
      },
      toon_yk_37: {
        url: "images/shop/toon_yk_37.png",
      },
      us_mk_5_assault_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      us_mk_5_aa_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      us_mk_5_at_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      us_mk_5_sniper_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_assault_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_aa_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_at_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      ussr_mk_5_sniper_combat_exoskeleton: {
        url: "images/shop/ussr_mk_5_assault_combat_exoskeleton.png",
      },
      sdi_harpy: {
        url: "images/shop/sdi_harpy.png",
      },
      sdi_hydra: {
        url: "images/shop/sdi_hydra.png",
      },
      sdi_minotaur: {
        url: "images/shop/sdi_minotaur.png",
      },
    },
  };

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

      if(!handle) {
        return null;
      }

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

  async function findUnviewable(list) {
    let inTechTree = [];
    let inTechTree_hidden = [];
    let notInTechTree = [];
    let notViewable = [];
    let newVehicles = [];
    let notInTechTree_wishlist = [];
    let categories = {
      promo: [],
      squadron: [],
      reserve: [],
      marketplace: [],
      countries: {},
      operators: {},
    };

    let currentDate = new Date();

    list = list ?? (await folderToJSON(false, false));
    list = list?.filteredAllFiles || list;

    list.forEach((id) => {
      id = (typeof id === "string" ? id : id?.getUnitId?.() ?? id?.id ?? id?.unitId ?? id?.vehId);
      let unit = new Unit(id);

      let {
        operator,
        countryName
      } = unit.getUnitOperatorCountry();

      let data = {
        id,
        operator: unit.getUnitOperatorCountry()?.countryId,
        country: unit.getUnitOperatorCountry()?.baseCountryId,
        type: unit.getUnitType()?.mainType ?? "tank",
        rank: unit.getUnitRank() ?? "I",
        br: unit.getUnitBattleRating() ?? "1.0",
      };

      categories.countries[countryName] = categories.countries[countryName] || [];
      categories.operators[operator] = categories.operators[operator] || [];
      categories.countries[countryName].push(data);
      categories.operators[operator].push(data);

      if (unit.getUnitIsNew() || unit.getUnitIsFuture()) newVehicles.push(data);

      if (unit.getUnitIsMarketplace()) categories.marketplace.push(data);
      if (unit.getUnitIsPromo()) categories.promo.push(data);
      if (unit.getUnitIsReserve()) categories.reserve.push(data);
      if (unit.getUnitIsSquadron()) categories.squadron.push(data);

      if (unit.getUnitIsHidden() && unit.getUnitIsTechTree()) {
        inTechTree_hidden.push(data);
      }
      if (!unit.getUnitIsViewable()) {
        notViewable.push(data);
      }
      if ((!unit.getUnitIsTechTree()) && unit.getUnitIsViewable() && !unit.getUnitCanWishlist()) {
        notInTechTree.push(data);
      }
      if ((!unit.getUnitIsTechTree()) && unit.getUnitCanWishlist()) {
        notInTechTree_wishlist.push(data);
      }
      if (unit.getUnitIsTechTree() && unit.getUnitIsViewable()) {
        inTechTree.push(data);
      }
    });


    return {
      inTechTree,
      inTechTree_hidden,
      notInTechTree,
      notInTechTree_wishlist,
      notViewable,
      newVehicles,
      categories,
    };
  }

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

  function json_to_blk(input, options = {}) {
    const {
      indent = 2
    } = options;
    const jsonObj = typeof input === "string" ? JSON.parse(input) : input;

    function isIntArray(arr) {
      return arr.every((v) => typeof v === "number" && Math.floor(v) === v);
    }

    function isNumberArray(arr) {
      return arr.every((v) => typeof v === "number");
    }

    function isMatrix(arr) {
      return arr.every(
        (row) => Array.isArray(row) && row.every((n) => typeof n === "number"),
      );
    }

    function isColor(key) {
      return key.toLowerCase().includes("color");
    }

    function detectType(key, value) {
      if (typeof value === "boolean") return "b";
      if (typeof value === "string") return "t";
      if (typeof value === "number") return Number.isInteger(value) ? "i" : "r";
      if (Array.isArray(value)) {
        if (isMatrix(value)) return "m";
        if (isNumberArray(value)) {
          if (value.length === 2) return isIntArray(value) ? "ip2" : "p2";
          if (value.length === 3) return isIntArray(value) ? "ip3" : "p3";
          if (value.length === 4)
            return isColor(key) ? "c" : isIntArray(value) ? "ip4" : "p4";
        }
      }
      return null;
    }

    function formatValue(type, value) {
      switch (type) {
      case "b":
        return `b=${value ? "yes" : "no"}`;
      case "i":
        return `i=${value}`;
      case "r":
        return `r=${value}`;
      case "t":
        return `t="${value}"`;
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
      let lines = [];
      const writeKeyValue = (k, v, lvl = level) => {
        lines.push(
          `${" ".repeat(lvl * indent)}${k}:${formatValue(detectType(k, v), v)}`,
        );
      };

      if (Array.isArray(value)) {
        if (value.length === 0) lines.push(`${pad}${name}{`);
        else if (isMatrix(value))
          lines.push(`${pad}${name}:${formatValue("m", value)}`);
        else if (isNumberArray(value)) writeKeyValue(name, value);
        else if (value.every((v) => typeof v === "string"))
          value.forEach((str) => writeKeyValue(name, str));
        else if (
          value.every(
            (v) => typeof v === "object" && v !== null && !Array.isArray(v),
          )
        ) {
          value.forEach((obj) => {
            lines.push(`${pad}${name}{`);
            for (const [k, v] of Object.entries(obj)) {
              if (typeof v === "object" && v !== null)
                lines.push(processBlock(k, v, level + 1));
              else writeKeyValue(k, v, level + 1);
            }
            lines.push(`${pad}}`);
          });
        } else {
          writeKeyValue(name, value);
        }
      } else if (typeof value === "object" && value !== null) {
        if (name !== null) lines.push(`${pad}${name}{`);
        for (const [k, v] of Object.entries(value)) {
          if (typeof v === "object" && v !== null)
            lines.push(processBlock(k, v, level + 1));
          else writeKeyValue(k, v, level + 1);
        }
        if (name !== null) lines.push(`${pad}}`);
      } else {
        writeKeyValue(name, value);
      }

      return lines.join("\n");
    }

    return processBlock(null, jsonObj, 0);
  }
  window.findUnviewable = findUnviewable;
  window.folderToJSON = folder_to_json;

  const Unit = (function (vehData) {
    /* DEF-----------------*/
    if (!vehData) throw new Error("Invalid vehicle data");

    let [
      WPC /*wpcost*/ ,
      UT /*unitTags*/ ,
      UN /*unitNames*/ ,
      MD /*modData*/ ,
      OP /*operators*/ ,
      MN /*modNames*/ ,
      TT /*techTree*/ ,
      MC /*menu csv*/ ,
      WN /*weapon csv*/ ,
      LANG,
    ] = [
      vehData.wpcost,
      vehData.unitTags,
      vehData.unitNames || {},
      vehData.modData,
      vehData.operatorNames || {},
      vehData.modNames || {},
      vehData.techTree || {},
      vehData.menuNames,
      vehData.weaponNames,
      vehData.lang,
    ];

    if (!WPC || !UT || !UN || !MD || !OP || !MN)
      throw new Error("Invalid vehicle data");

    const FT = {
      init: (t) => {
        let c = {},
          b = {},
          u = {},
          l = {};
        g = {};

        function flattenUnits(obj) {
          for (const key in obj) {
            const value = obj[key];
            const isGroup = (key?.toLowerCase()?.endsWith("_group"));

            if (
              key === "image" ||
              key === "reqAir" ||
              key === "rank" ||
              key === "gift" ||
              key === "event" ||
              key === "reqUnlock" ||
              key === "isCrossPromo" ||
              key === "marketplaceItemdefId" ||
              key === "hideFeature" ||
              key === "rankPosXY" ||
              key === "fakeReqUnitType" ||
              key === "fakeReqUnitRank" ||
              key === "fakeReqUnitImage" ||
              key === "fakeReqUnitPosXY" ||
              key === "reqFeature" ||
              key === "isClanVehicle" ||
              key === "beginPurchaseDate" ||
              key === "showOnlyWhenBought" ||
              key === "showOnlyWhenResearch" ||
              key === "crossPromoBanner" ||
              key === "showByPlatform" ||
              key === "futureReqAir" ||
              key === "futureReqAirText" ||
              key === "giftParam" ||
              key === "slaveUnit" ||
              key === "eventLabelId" ||
              key === "endPurchaseDate"
            ) continue;

            if (value && typeof value === "object" && (value?.rank || value?.reqAir) && !isGroup) {
              let data = {
                ...value
              };
              u[key] = {
                ...value
              };
              l[key.toLowerCase()] = {
                ...value
              };
              flattenUnits(value);
            } else {
              Object.keys(typeof value == "object" ? value : {}).forEach((sKey) => {
                if (!(
                    sKey === "image" ||
                    sKey === "reqAir" ||
                    sKey === "rank" ||
                    sKey === "gift" ||
                    sKey === "event" ||
                    sKey === "reqUnlock" ||
                    sKey === "isCrossPromo" ||
                    sKey === "marketplaceItemdefId" ||
                    sKey === "hideFeature" ||
                    sKey === "rankPosXY" ||
                    sKey === "fakeReqUnitType" ||
                    sKey === "fakeReqUnitRank" ||
                    sKey === "fakeReqUnitImage" ||
                    sKey === "fakeReqUnitPosXY" ||
                    sKey === "reqFeature" ||
                    sKey === "isClanVehicle" ||
                    sKey === "beginPurchaseDate" ||
                    sKey === "showOnlyWhenBought" ||
                    sKey === "showOnlyWhenResearch" ||
                    sKey === "crossPromoBanner" ||
                    sKey === "showByPlatform" ||
                    sKey === "futureReqAir" ||
                    sKey === "futureReqAirText" ||
                    sKey === "giftParam" ||
                    sKey === "slaveUnit" ||
                    sKey === "eventLabelId" ||
                    sKey === "endPurchaseDate"
                  )) {
                  g[sKey] = {
                    ...value?.[sKey],
                    groupId: key
                  };
                };
              });

              u[key] = {
                ...value
              };
              l[key.toLowerCase()] = {
                ...value
              };
            };
          };
        };

        for (const C in t) {
          c[C] = 1;

          for (const B in t[C]) {
            const br = t[C][B];
            b[B] = 1;

            if (Array.isArray(br.range)) {
              for (const group of br.range) {
                flattenUnits(group);
              }
            }
          }
        }

        Object.keys(g).forEach((U) => {
          let D = g[U];

          l[U.toLowerCase()] = {
            ...l[U.toLowerCase()] ?? {},
            ...D ?? {},
            isGroup: true
          };
          u[U] = {
            ...u[U] ?? {},
            ...D ?? {},
            isGroup: true
          };
        })

        return {
          countries: Object.keys(c),
          branches: Object.keys(b),
          units: u,
          __lowerCaseUnits__: l,
          get: (e) => l[(e || "").toLowerCase()] || null,
          has: (e) => !!l[(e || "").toLowerCase()],
          all: () => ({
            countries: Object.keys(c),
            branches: Object.keys(b),
            units: u,
            __lowerCaseUnits__: l,
          }),
        };
      },
    }.init(TT);

    const SU = {
      roman: (num) => {
        if (isNaN(num)) return NaN;
        var digits = String(+num).split(""),
          key = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
          ],
          roman = "",
          i = 3;
        while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
      },
      speed: (speed, unit = "kmh") => {
        if (speed == null) return null;
        let measure_coeff = 3.6;
        let round_after = 30;

        switch (unit.toLowerCase()) {
        case "kmh":
        case "km/h":
        case "kilometers/hour":
        case "kilometers per hour":
        case "kilometres per hour":
          measure_coeff = 3.6;
          break;

        case "mph":
        case "m/h":
        case "miles/hour":
        case "miles per hour":
          measure_coeff = 2.237;
          break;

        case "kt":
        case "kts":
        case "knots":
          measure_coeff = 1.94;
          break;

        default:
          measure_coeff = 3.6;
        }

        const spd = speed * measure_coeff;
        return Math.abs(spd) > round_after ? Math.round(spd) : spd;
      },

      alt: (altitude, unit = "m") => {
        if (altitude == null) return null;
        let measure_coeff = 1;

        switch (unit.toLowerCase()) {
        case "m":
        case "meters":
          measure_coeff = 1;
          break;

        case "ft":
        case "feet":
          measure_coeff = 3.28084;
          break;

        default:
          measure_coeff = 1;
        }

        return altitude * measure_coeff;
      },

      distance: (dist, unit = "km") => {
        if (dist == null) return null;

        let measure_coeff = 0.001;
        let round_after = 20;

        switch (unit.toLowerCase()) {
        case "km":
        case "kilometers":
        case "kilometres":
          measure_coeff = 0.001;
          break;

        case "ft":
        case "feet":
          measure_coeff = 3.28084;
          round_after = 15000;
          break;

        case "mile":
        case "miles":
          measure_coeff = 0.000621371;
          break;

        case "yard":
        case "yards":
          measure_coeff = 1.09361;
          round_after = 20000;
          break;

        default:
          measure_coeff = 0.001;
        }

        const out = dist * measure_coeff;
        return Math.abs(out) > round_after ? Math.round(out) : out;
      },

      climb_speed: (speed, unit = "m") => {
        if (speed == null) return null;
        let measure_coeff = 1;

        switch (unit.toLowerCase()) {
        case "m":
        case "m/s":
        case "meters/sec":
        case "meters per second":
          measure_coeff = 1;
          break;

        case "ft":
        case "ft/m":
        case "ft/min":
        case "feet/min":
        case "feet per minute":
          // 1 m/s → 196.850 ft/min
          measure_coeff = 196.85;
          break;

        default:
          measure_coeff = 1;
        }

        return speed * measure_coeff;
      },

      temperature: (temp, unit = "c") => {
        if (temp == null) return null;
        unit = unit.toLowerCase();

        if (unit === "f" || unit === "fahrenheit") {
          return temp * 1.8 + 32;
        }

        // Celsius default
        return temp;
      },

      wing_loading: (weight, unit = "kg/m2") => {
        if (weight == null) return null;
        let measure_coeff = 1;

        switch (unit.toLowerCase()) {
        case "kg":
        case "kg/m2":
        case "kilograms":
          measure_coeff = 1;
          break;

        case "lb":
        case "lbs":
        case "pounds":
        case "lb/ft2":
          // kg/m² → lb/ft² = * 0.204816
          measure_coeff = 0.204816;
          break;

        default:
          measure_coeff = 1;
        }

        return weight * measure_coeff;
      },

      power_to_weight: (hp, unit = "hp/kg") => {
        if (hp == null) return null;

        let measure_coeff = 1;

        switch (unit.toLowerCase()) {
        case "hp/kg":
        case "kg":
          measure_coeff = 1;
          break;

        case "hp/lb":
        case "lb":
        case "lbs":
          measure_coeff = 0.453592;
          break;

        default:
          measure_coeff = 1;
        }

        return hp * measure_coeff;
      },

      displacement: (dsp) => {
        if (dsp == null) return null;
        return dsp / 1000;
      },

      weight: (x) => {
        if(x == null) return null;
        return x / 1000;
      }
    };

    function find_in_tree(tree, searchKey) {
      try {
        if (typeof tree !== "object" || tree === null) return null;

        for (const [key, value] of Object.entries(tree)) {
          if (key === searchKey) return value;
          if (typeof value === "object") {
            const result = find_in_tree(value, searchKey);
            if (result !== null) return result;
          }
        }
        return null;
      } catch {
        return null;
      }
    }

    /*------------------------------------*/

    //Unit - reference to an in-game unit
    class Unit {
      /*DEF*/
      #extraData;
      #id;
      #WPC /*wpcost  */;
      #UT /*unittags*/;
      #TT /*techTree*/;

      /*Internal*/

      #format_hrs(hours) {
        if (typeof hours !== "number" || isNaN(hours) || hours < 0) return "";
        const days = Math.floor(hours / 24);
        const remH = hours % 24;
        const livH = Math.floor(remH);
        const minutes = Math.floor((remH - livH) * 60);
        let str = "";
        if (days > 0) {
          str = `${days} day${days !== 1 ? "s" : ""} ${String(livH).padStart(2, "0")} hr`;
        } else {
          str = `${String(livH).padStart(2, "0")} hr${minutes > 0 ? ` ${String(minutes).padStart(2, "0")} m` : ""}`;
        }
        return str;
      }
      #format_er(index) {
        if (typeof index !== "number" || isNaN(index) || index < 0) return NaN;
        const pattern = [0.0, 0.3, 0.7];
        const base = Math.floor(index / pattern.length) + 1;
        const val = base + pattern[index % pattern.length];
        return parseFloat(val.toFixed(1));
      }
      #handle_empty(ifValid, ifEmpty = null) {
        return typeof this.#id === "string" && this.#id.length > 0 ?
          ifValid :
          ifEmpty;
      }
      #add_unit(data, unit) {
        unit = String(unit) || unit;
        if (data != null) {
          return `${data} ${unit || ""}`;
        }
      }

      /*Getters*/
      /**
       * Returns the given unit's ID.
       * @returns {String} Unit ID
       */
      getUnitId() {
        return this.#id;
      }
      /**
       * Returns the given unit's full name.
       * @returns {String} Unit name
       */
      getUnitName() {
        let id = String(this.#id || "");
        return this.#handle_empty(
          (UN?.[`${id}_0`]?.[LANG] ||
            UN?.[`${id}_shop`]?.[LANG] ||
            UN?.[`${id}_1`]?.[LANG] ||
            UN?.[`${id}_2`]?.[LANG] ||
            UN?.[id]?.[LANG] ||
            UN?.[`ships/${id}_0`]?.[LANG] ||
            UN?.[`ships/${id}_shop`]?.[LANG] ||
            UN?.[`ships/${id}_1`]?.[LANG] ||
            UN?.[`ships/${id}_2`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[`${id.toLowerCase()}_0`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[`${id?.toLowerCase()}_shop`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[`${id?.toLowerCase()}_1`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[`${id?.toLowerCase()}_2`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[id?.toLowerCase()]?.[LANG] ||
            id)?.replaceAll(`""`, `"`),
          "",
        );
      }
      /**
       * Returns the given unit's shortened name for the Shop.
       * @returns {String} Unit name
       */
      getUnitShopName() {
        let id = String(this.#id || "");
        return this.#handle_empty(
          (
            UN?.[`${id}_shop`]?.[LANG] ||
            UN?.[`${id}_0`]?.[LANG] ||
            UN?.[`${id}_1`]?.[LANG] ||
            UN?.[`${id}_2`]?.[LANG] ||
            UN?.[id]?.[LANG] ||
            UN?.[`ships/${id}_shop`]?.[LANG] ||
            UN?.[`ships/${id}_0`]?.[LANG] ||
            UN?.[`ships/${id}_1`]?.[LANG] ||
            UN?.[`ships/${id}_2`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[`${id?.toLowerCase()}_shop`]?.[
              LANG
            ] ||
            UN?.__lowerCaseUnits__?.[`${id?.toLowerCase()}_0`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[`${id?.toLowerCase()}_1`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[`${id?.toLowerCase()}_2`]?.[LANG] ||
            UN?.__lowerCaseUnits__?.[id]?.[LANG] ||
            id
          )?.replaceAll(`""`, `"`),
          "",
        );
      }
      getUnitShopImage() {
        let imageURL = `https://static.encyclopedia.warthunder.com/slots/${this.#id}.png`;

        let customURL = override_vehicle_images?.shop?.[this.#id];
        let reqCheck = true;
        if (
          typeof customURL == "object" ||
          (typeof customURL == "string" && customURL != undefined)
        ) {
          imageURL =
            typeof customURL == "string" ?
            (customURL ?? imageURL) :
            (customURL?.url ?? imageURL);
          reqCheck = false;
        }
        let cI = this.#WPC?.customImage;
        if (!!cI && reqCheck) {
          imageURL = cI;

          if (
            imageURL.startsWith("!#ui/unitskin#") ||
            imageURL.startsWith("ui/unitskin/")
          ) {
            imageURL =
              imageURL.split("!#ui/unitskin#")[1] ||
              imageURL.split("ui/unitskin/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/slots/${imageURL}.png` :
              `https://static.encyclopedia.warthunder.com/slots/${this.#id}.png`;
          }
          if (
            imageURL.startsWith("!#ui/tanks/") ||
            imageURL.startsWith("ui/tanks/")
          ) {
            imageURL =
              imageURL.split("!#ui/tanks/")[1] ||
              imageURL.split("ui/tanks/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/slots/${imageURL}.png` :
              `https://static.encyclopedia.warthunder.com/slots/${this.#id}.png`;
          }
          if (
            imageURL.startsWith("!#ui/aircrafts/") ||
            imageURL.startsWith("ui/aircrafts/")
          ) {
            imageURL =
              imageURL.split("!#ui/aircrafts/")[1] ||
              imageURL.split("ui/aircrafts/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/slots/${imageURL}.png` :
              `https://static.encyclopedia.warthunder.com/slots/${this.#id}.png`;
          }
        }

        return this.#handle_empty(imageURL?.toLowerCase());
      }
      /**
       * Returns the given unit's tooltip image.
       * @returns {String} Unit tooltip image URL
       */ //"!#ui/tanks/us_m18_hellcat_black_cat.avif"
      getUnitTooltipImage() {
        let id = this.#WPC?.unitForImg ?? this.#id;
        let imageURL = `https://static.encyclopedia.warthunder.com/images/${id}.png`;

        let customURL = override_vehicle_images?.tooltip?.[id];
        let reqCheck = true;
        if (
          typeof customURL == "object" ||
          (typeof customURL == "string" && customURL != undefined)
        ) {
          imageURL =
            typeof customURL == "string" ?
            (customURL ?? imageURL) :
            (customURL?.url ?? imageURL);
          reqCheck = false;
        }
        let cI = this.#WPC?.customTooltipImage ?? (this.#WPC?.customClassIco && this.#WPC?.customClassIco?.includes("in_prog") ? "ui/aircrafts/image_in_progress" : null)
        if (cI && reqCheck) {
          imageURL = cI;
          if (
            imageURL.startsWith("!#ui/unitskin#") ||
            imageURL.startsWith("ui/unitskin/")
          ) {
            imageURL =
              imageURL.split("!#ui/unitskin#")[1] ||
              imageURL.split("ui/unitskin/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/images/${imageURL}.png` :
              `https://static.encyclopedia.warthunder.com/images/${id}.png`;
          }
          if (
            imageURL.startsWith("!#ui/tanks/") ||
            imageURL.startsWith("ui/tanks/")
          ) {
            imageURL =
              imageURL.split("!#ui/tanks/")[1] ||
              imageURL.split("ui/tanks/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/images/${imageURL}.png` :
              `https://static.encyclopedia.warthunder.com/images/${id}.png`;
          }
          if (
            imageURL.startsWith("!#ui/aircrafts/") ||
            imageURL.startsWith("ui/aircrafts/")
          ) {
            imageURL =
              imageURL.split("!#ui/aircrafts/")[1] ||
              imageURL.split("ui/aircrafts/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/images/${imageURL}.png` :
              `https://static.encyclopedia.warthunder.com/images/${id}.png`;
          }
        }

        return this.#handle_empty(imageURL?.toLowerCase());
      }
      getUnitIcon() {
        let id = this.#WPC?.unitForImg ?? this.#id;
        let imageURL = `https://static.encyclopedia.warthunder.com/icons/${id}_ico.svg`;

        let customURL = override_vehicle_images?.tooltip?.[id];
        let reqCheck = true;
        if (
          typeof customURL == "object" ||
          (typeof customURL == "string" && customURL != undefined)
        ) {
          imageURL =
            typeof customURL == "string" ?
            (customURL ?? imageURL) :
            (customURL?.url ?? imageURL);
          reqCheck = false;
        }

        if (this.#WPC?.customTooltipImage && reqCheck) {
          imageURL = this.#WPC.customTooltipImage;
          if (
            imageURL.startsWith("!#ui/unitskin#") ||
            imageURL.startsWith("ui/unitskin/")
          ) {
            imageURL =
              imageURL.split("!#ui/unitskin#")[1] ||
              imageURL.split("ui/unitskin/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/icons/${imageURL}_ico.svg` :
              `https://static.encyclopedia.warthunder.com/icons/${id}_ico.svg`;
          }
          if (
            imageURL.startsWith("!#ui/tanks/") ||
            imageURL.startsWith("ui/tanks/")
          ) {
            imageURL =
              imageURL.split("!#ui/tanks/")[1] ||
              imageURL.split("ui/tanks/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/icons/${imageURL}_ico.svg` :
              `https://static.encyclopedia.warthunder.com/icons/${id}_ico.svg`;
          }
          if (
            imageURL.startsWith("!#ui/aircrafts/") ||
            imageURL.startsWith("ui/aircrafts/")
          ) {
            imageURL =
              imageURL.split("!#ui/aircrafts/")[1] ||
              imageURL.split("ui/aircrafts/")[1] ||
              "";
            imageURL = imageURL.replace(/\.([A-Za-z0-9_\-]+)$/, "");
            imageURL = imageURL ?
              `https://static.encyclopedia.warthunder.com/icons/${imageURL}_ico.svg` :
              `https://static.encyclopedia.warthunder.com/icons/${id}_ico.svg`;
          }
        }

        return this.#handle_empty(imageURL?.toLowerCase());
      }
      /**
       * Returns the given unit's class icon.
       * @returns {String} Unit class icon URL
       */
      getUnitClassIco() {}
      /**
       * Returns the given unit's class color.
       * @returns {String} Unit class color
       */
      getUnitClassColor() {}
      /**
       * Returns the given unit's role(s).
       * Merged, override-adjusted, multi-tag string: "type_dive_bomber/type_naval_aircraft/type_torpedo"
       * @returns {String}
       */
      getUnitRole() {
        // --- Base role groups -----------------------------------------------
        const BASE_0 = [
          "type_helicopter",
          "type_boat",
          "type_hydroplane",
          "type_flying_boat",
          "type_assault",
          "type_biplane",
          "type_aircraft",
          "type_tank",
        ];
        const BASE_1 = [
          "type_transport",
          "type_fighter",
          "type_bomber",
          "type_torpedo",
          "type_light_tank",
          "type_medium_tank",
          "type_heavy_tank",
          "type_human",
          "type_tank_destroyer",
          "type_spaa",
          "type_SPAA",
          "type_armored_boat",
          "type_heavy_boat",
          "type_minelayer",
          "type_minesweeper",
          "type_gun_boat",
          "type_torpedo_boat",
          "type_missile_boat",
          "type_heavy_gun_boat",
          "type_submarine_chaser",
          "type_cruiser",
          "type_frigate",
          "type_barge",
          "type_naval_aa_ferry",
          "type_battleship",
          "type_battlecruiser",
          "type_destroyer",
          "type_cv_ship",
        ];
        const BASE_2 = [
          "type_naval_ferry_barge",
          "type_light_cruiser",
          "type_heavy_cruiser",
          "type_small_submarine_chaser",
          "type_armored_submarine_chaser",
          "type_hydrofoil_torpedo_boat",
          "type_missile_tank",
          "type_light_bomber",
          "type_medium_bomber",
          "type_heavy_bomber",
          "type_frontline_bomber",
          "type_dive_bomber",
          "type_jet_bomber",
          "type_long_range_bomber",
          "type_strike_aircraft",
          "type_light_fighter",
          "type_medium_fighter",
          "type_heavy_fighter",
          "type_assault_fighter",
          "type_aa_fighter",
          "type_strike_fighter",
          "type_naval_fighter",
          "type_interceptor",
          "type_drone"
        ];
        const BASE_3 = [
          "type_football_tank",
          "type_submarine",
          "submarine",
          "type_ufo",
          "type_exoskeleton",
          "type_robot",
          "type_md_interceptor",
          "type_md_loot_carrier",
          "type_md_combat_loot_carrier",
        ];
        const ALL_BASE_TAGS = [...BASE_0, ...BASE_1, ...BASE_2, ...BASE_3];

        // OVERRIDES: child -> base(s) to remove
        const OVERRIDES = {
          type_light_fighter: "type_fighter",
          type_medium_fighter: "type_fighter",
          type_heavy_fighter: "type_fighter",
          type_assault_fighter: "type_fighter",
          type_aa_fighter: "type_fighter",
          type_strike_fighter: "type_fighter",
          type_naval_fighter: "type_fighter",
          type_jet_fighter: "type_fighter",
          type_interceptor: "type_fighter",
          type_strike_aircraft: "type_assault",
          type_missile_tank: "type_tank_destroyer",
          type_heavy_boat: "type_boat",
          type_submarine_chaser: "type_heavy_boat",
          type_gun_boat: ["type_heavy_boat", "type_boat"],
          type_torpedo_boat: ["type_heavy_boat", "type_boat"],
          type_armored_boat: "type_heavy_boat",
          type_heavy_gun_boat: "type_frigate",

          type_bomber: "type_transport",
          type_strike_aircraft: "type_transport",
          type_light_bomber: ["type_bomber"],
          type_medium_bomber: "type_bomber",
          type_heavy_bomber: "type_bomber",
          type_dive_bomber: "type_bomber",
          type_frontline_bomber: "type_bomber",
          type_jet_bomber: "type_bomber",
          type_long_range_bomber: "type_bomber",

          type_light_cruiser: "type_cruiser",
          type_heavy_cruiser: "type_cruiser",
          type_hydroplane: "type_fighter",

          type_drone: ["type_attack_helicopter", "type_utility_helicopter", "type_fighter"],

          type_football_tank: "type_light_tank",
          type_md_interceptor: ["type_light_tank", "type_medium_tank", "type_heavy_tank", "type_tank_destroyer"],
          type_md_loot_carrier: ["type_light_tank", "type_medium_tank", "type_heavy_tank", "type_tank_destroyer"],
          type_md_combat_loot_carrier: ["type_light_tank", "type_medium_tank", "type_heavy_tank", "type_tank_destroyer"],
          type_exoskeleton: ["type_light_tank", "type_medium_tank", "type_heavy_tank", "type_tank_destroyer"],
          type_robot: "type_exoskeleton",
          type_torpedo: "type_bomber",
          submarine: "type_destroyer",
          type_submarine: "submarine",
        };

        const ADDITIVES = {
          type_naval_aircraft: ["type_fighter", "type_strike_aircraft"],
          type_hydroplane: ["type_fighter"],
        };

        const unitTags = (this.unitTags || []).filter((t) =>
          t.startsWith("type_"),
        );
        const roles = new Set(unitTags);

        for (const tag of ALL_BASE_TAGS) {
          if (this.getUnitHasTag(tag)) roles.add(tag);
        }

        for (const tag of Array.from(roles)) {
          if (OVERRIDES[tag]) {
            const bases = Array.isArray(OVERRIDES[tag]) ?
              OVERRIDES[tag] : [OVERRIDES[tag]];
            for (const base of bases) {
              if (roles.has(base)) roles.delete(base);
            }
          }
        }

        for (const tag of Array.from(roles)) {
          if (ADDITIVES[tag]) {
            for (const extra of ADDITIVES[tag]) {
              if (!roles.has(extra)) roles.add(extra);
            }
          }
        }

        let new_roles = [];
        let new_roles_array = [];
        for (const role of roles) {
          new_roles_array.push(role);
          const nR = MC?.[`mainmenu/${role}`]?.[LANG] || (role == "submarine" ? "Submarine" : role);
          new_roles.push(nR || role);
        }

        return {
          text: new_roles.join("/"),
          array: new_roles_array
        };
      }

      /**
       * Returns the given unit's basic role.
       * @returns {String} Unit role
       */
      getUnitBasicRole() {
        const BASE_0 = [
          "type_helicopter",
          "type_boat",
          "type_hydroplane",
          "type_flying_boat",
          "type_assault",
          "type_biplane",
          "type_aircraft",
          "type_tank",
        ];

        const BASE_1 = [
          "type_interceptor",
          "type_transport",
          "type_fighter",
          "type_bomber",
          "type_torpedo",
          "type_light_tank",
          "type_medium_tank",
          "type_heavy_tank",
          "type_human",
          "type_tank_destroyer",
          "type_spaa",
          "type_SPAA",
          "type_armored_boat",
          "type_heavy_boat",
          "type_minelayer",
          "type_minesweeper",
          "type_gun_boat",
          "type_torpedo_boat",
          "type_missile_boat",
          "type_heavy_gun_boat",
          "type_submarine_chaser",
          "type_cruiser",
          "type_frigate",
          "type_barge",
          "type_naval_aa_ferry",
          "type_battleship",
          "type_battlecruiser",
          "type_destroyer",
          "type_cv_ship",
        ];

        const BASE_2 = [
          "type_naval_ferry_barge",
          "type_light_cruiser",
          "type_heavy_cruiser",
          "type_small_submarine_chaser",
          "type_armored_submarine_chaser",
          "type_hydrofoil_torpedo_boat",
          "type_missile_tank",
          "type_light_bomber",
          "type_medium_bomber",
          "type_heavy_bomber",
          "type_frontline_bomber",
          "type_dive_bomber",
          "type_jet_bomber",
          "type_long_range_bomber",
          "type_strike_aircraft",
          "type_light_fighter",
          "type_medium_fighter",
          "type_heavy_fighter",
          "type_assault_fighter",
          "type_aa_fighter",
          "type_strike_fighter",
          "type_naval_fighter",
        ];

        const BASE_3 = [
          "type_football_tank",
          "type_submarine",
          "type_ufo",
          "type_exoskeleton",
          "type_robot",
          "type_md_interceptor",
          "type_md_loot_carrier",
          "type_md_combat_loot_carrier",
        ];

        const PRIORITY_LIST = [BASE_0, BASE_1, BASE_2, BASE_3];

        for (const group of PRIORITY_LIST) {
          for (const tag of group) {
            if (this.getUnitHasTag(tag)) {
              return MC?.[`mainmenu/${tag}`]?.[LANG] || tag;
            }
          }
        }

        for (const tag of this.unitTags || []) {
          if (tag.startsWith("type_")) {
            return MC?.[`mainmenu/${tag}`]?.[LANG] || tag;
          }
        }

        return "unknown";
      }

      /**
       * Returns the given unit's BR.
       * @param {String} mode The BR for the given gamemode
       * [Arcade, Realistic, Simulator].
       * @returns {Number} Unit BR
       */
      getUnitBattleRating(mode = "historical") {
        if (typeof mode !== "string") mode = "historical";
        mode = mode.toLowerCase();

        if (mode.startsWith("h") || mode.startsWith("r")) mode = "Historical";
        else if (mode.startsWith("a") || mode.startsWith("u")) mode = "Arcade";
        else if (mode.startsWith("s") || mode.startsWith("ha"))
          mode = "Simulation";
        else mode = "Historical";

        return this.#handle_empty(
          this.#format_er(
            this.#WPC?.[`economicRank${mode}`] ||
            this.#WPC?.[`economicRank`] ||
            0,
          ).toFixed(1),
          1.0,
        );
      }
      getUnitShowBattleRating() {
        return this.#handle_empty(
          !!!(this.#UT?.tags?.hideBrForVehicle ?? false),
          true,
        );
      }
      /**
       * Returns the given unit's rank.
       * @returns {String} Unit rank (Numeral)
       */
      getUnitRank() {
        return this.#handle_empty(SU.roman(Math.max(this.#WPC?.rank || 1, 1)));
      }
      /**
       * Returns the given unit's GE and SL price.
       * @returns {Object} Unit price [wp, gold]
       */
      getUnitPrice() {
        let [WP, GE] = [this.#WPC?.value, this.#WPC?.costGold];
        let trophyGift = this.#WPC?.purchaseTrophyGift;
        return this.#handle_empty({
          wp: trophyGift && GE > 0 ? null : WP,
          gold: GE,
        });
      }
      /**
       * Returns the given unit's WP multiplier.
       * @returns {Number} Unit WP multiplier
       */
      getUnitWpMultiplier(mode = "historical") {
        if (typeof mode !== "string") mode = "historical";
        mode = mode.toLowerCase();

        if (mode.startsWith("h") || mode.startsWith("r")) mode = "Historical";
        else if (mode.startsWith("a") || mode.startsWith("u")) mode = "Arcade";
        else if (mode.startsWith("s") || mode.startsWith("ha"))
          mode = "Simulation";
        else mode = "Historical";

        return this.#handle_empty(
          (
            this.#WPC?.[`rewardMul${mode}`] ||
            this.#WPC?.[`rewardMulSimulation`] ||
            this.#WPC?.[`rewardMulHistorical`] ||
            this.#WPC?.[`rewardMulArcade`] ||
            1
          ).toFixed(1),
        );
      }
      /**
       * Returns the given unit's RP multiplier.
       * @returns {Number} Unit RP multiplier
       */
      getUnitRpMultiplier() {
        return this.#handle_empty(this.#WPC?.expMul || 1);
      }
      /**
       * Returns the given unit's crew train cost.
       * @returns {Number} Unit crew train cost
       */
      getUnitTrainCost() {
        return this.#handle_empty(this.#WPC?.trainCost);
      }
      /**
       * Returns the given unit's highest repair cost for the given gamemode
       * @param {String} mode The BR for the given gamemode
       * [Arcade, Realistic, Simulator].
       * @returns {Number} Unit's highest repair cost
       */
      getUnitFullRepairCost(mode = "historical") {
        if (typeof mode !== "string") mode = "historical";
        mode = mode.toLowerCase();

        if (mode.startsWith("h") || mode.startsWith("r")) mode = "Historical";
        else if (mode.startsWith("a") || mode.startsWith("u")) mode = "Arcade";
        else if (mode.startsWith("s") || mode.startsWith("ha"))
          mode = "Simulation";
        else mode = "historical";

        return this.#handle_empty(
          this.#WPC?.[`repairCostFullUpgraded${mode}`] ||
          this.#WPC?.[`repairCostFullUpgradedSimulation`] ||
          this.#WPC?.[`repairCostFullUpgradedHistorical`] ||
          this.#WPC?.[`repairCostFullUpgradedArcade`] ||
          this.#WPC?.[`repairCost${mode}`] ||
          0,
        );
      }
      /**
       * Returns the given unit's repair cost for the given gamemode
       * @param {String} mode The BR for the given gamemode
       * [Arcade, Realistic, Simulator].
       * @returns {Number} Unit's repair cost
       */
      getUnitRepairCost(mode = "historical") {
        if (typeof mode !== "string") mode = "historical";
        mode = mode.toLowerCase();

        if (mode.startsWith("h") || mode.startsWith("r")) mode = "Historical";
        else if (mode.startsWith("a") || mode.startsWith("u")) mode = "Arcade";
        else if (mode.startsWith("s") || mode.startsWith("ha"))
          mode = "Simulation";
        else mode = "historical";

        return this.#handle_empty(
          this.#WPC?.[`repairCost${mode}`] ||
          this.#WPC?.[`repairCostSimulation`] ||
          this.#WPC?.[`repairCostHstorical`] ||
          this.#WPC?.[`repairCostArcade`] ||
          0,
        );
      }
      /**
       * Returns the given unit's available free repairs upon initial obtaining.
       * @returns {Number} Unit free repairs
       */
      getUnitFreeRepairs() {
        return this.#handle_empty(this.#WPC?.freeRepairs || 0);
      }
      /**
       * Returns the given unit's highest repair time with crew.
       * @param {String} mode The BR for the given gamemode
       * [Arcade, Realistic, Simulator].
       * @returns {Number} Unit highest repair time with crew
       */
      getFullRepairTimeCrew(mode = "historical") {
        if (typeof mode !== "string") mode = "historical";
        mode = mode.toLowerCase();

        if (mode.startsWith("h") || mode.startsWith("r")) mode = "Historical";
        else if (mode.startsWith("a") || mode.startsWith("u")) mode = "Arcade";
        else if (mode.startsWith("s") || mode.startsWith("ha"))
          mode = "Simulation";
        else mode = "historical";

        return this.#handle_empty(
          this.#WPC?.[`repairTimeHrs${mode}`] ||
          this.#WPC?.[`repairTimeHrsSimulation`] ||
          this.#WPC?.[`repairTimeHrsHistorical`] ||
          this.#WPC?.[`repairTimeHrsArcade`] ||
          0,
        );
      }
      /**
       * Returns the given unit's weapon text for the tooltip.
       * @returns {String} Unit weapon details and text
       */
      getUnitWeaponText() {
        let navalWeapons = this.getUnitReloadTime()?.naval_weapons;
        let bulletIconParams = this.#WPC?.bulletsIconParams ?? this.#UT?.Shop?.weapons ?? this.#UT?.bullets;

        let weaponNames = Object.keys(bulletIconParams ?? {});
        let text = null;

        weaponNames.forEach((weapon, i) => {
          let txt = weapon.toLowerCase().includes("gamedata") ? txt.split("/").pop().replace(/\.[^.]+$/, "") : weapon;

          let isFirst = (i == 0);
          let isLast = (i == weaponNames.length - 1);

          let weaponText =
            WN?.[`weapons/${txt}`]?.[LANG] ||
            WN?.[`${txt}`]?.[LANG] ||
            WN?.__lowerCaseWeapons__?.[`weapons/${txt}`]?.[LANG] ||
            WN?.__lowerCaseWeapons__?.[`${txt}`]?.[LANG] ||
            txt;
          if (text == null) {
            text = "";
          }
          if (weaponText == "dummy_weapon") {
            if (isFirst && isLast)
              weaponText = "Without armament";
            else {
              weaponText = "";
            }
          }
          text = text + `${text != "" ? `\n` : ``}${weaponText}`;
        });

        if (text == null || text == "") {
          Object.keys(navalWeapons || {}).forEach((weapon, i) => {
            let isFirst = (i == 0);
            let isLast = (i == navalWeapons.length - 1);
            let weaponText =
              WN?.[`weapons/${weapon}`]?.[LANG] ||
              WN?.[`${weapon}`]?.[LANG] ||
              WN?.__lowerCaseWeapons__?.[`weapons/${weapon}`]?.[LANG] ||
              WN?.__lowerCaseWeapons__?.[`${weapon}`]?.[LANG] ||
              weapon;
            if (text == null) {
              text = "";
            }
            if (weaponText == "dummy_weapon") {
              if (isFirst && isLast)
                weaponText = "Without armament";
              else {
                weaponText = "";
              }
            }
            text = text + `${text != "" ? `\n` : ``}${weaponText}`;
          });
        }

        return {
          headerText: text,
        };
      }
      /**
       * Returns the given unit's information such as event or if it's a new vehicle for the tooltip.
       * @returns {String} Unit extra details and text
       */
      getUnitOtherInfo() {
        let text = null;
        let marketplaceId = this.#TT?.marketplaceItemdefId;
        let cost = this.getUnitPrice();
        let event = this.#TT?.event ?? this.#WPC?.event;
        let gift = this.#TT?.gift ?? this.#WPC?.gift;
        let trophyGift = this.#WPC?.purchaseTrophyGift;
        let customDt = override_vehicle_images?.tooltip?.[this.#id] ?? override_vehicle_images?.shop?.[this.#id];
        let endRS = this.#WPC?.endResearchDate ?? this.#TT?.endResearchDate;
        let startPS=this.#WPC?.startPurchaseDate??this.#TT?.startPurchaseDate;
        let endPS = this.#WPC?.endPurchaseDate ?? this.#TT?.endPurchaseDate;

        let isPremium =
          (trophyGift && cost?.gold > 0) ||
          (this.#WPC?.value == 0 && cost?.gold > 0);
        let isNew = this.getUnitIsNew();
        let isSquadronVehicle =
          this.#TT?.isClanVehicle || this.#WPC?.researchType == "clanVehicle";
        let showFlag =
          customDt?.use_flag ?? true;

        if (event) {
          if (text == null) {
            text = "";
          }
          text =
            text +
            `${text != "" ? `\n` : ``}[color=yellow]Event vehicle[/color]`;
        }
        if (isNew) {
          if (text == null) {
            text = "";
          }
          text =
            text +
            `${text != "" ? `\n` : ``}[color=yellow]New vehicle![/color]`;
        }
        if (gift && trophyGift && cost?.gold > 0) {
          if (text == null) {
            text = "";
          }
          isPremium = true;
          text =
            text +
            `${text != "" ? `\n` : ``}[color=orange]${!marketplaceId ? "This vehicle can only be obtained by purchasing a special pack.[/color]" : "This vehicle can only be obtained with coupon by purchasing it on Marketplace.[/color]"}`;
        }
        if (isSquadronVehicle) {
          if (text == null) {
            text = "";
          }
          text =
            text +
            `${text != "" ? `\n` : ``}[color=green]Squadron vehicle[/color]`;
        }
        return {
          headerText: text,
          isPremium,
          isSquadronVehicle,
          isNew,
          showFlag,
          gift,
          event,
          isPromo: this.#TT?.isCrossPromo ?? false,
          startPS,
          endPS,
          endRS
        };
      }
      /**
       * Returns the given unit's highest speed.
       * @param {String} unit The conversion unit
       * [kmh, mph, kts]
       * @returns {Number} Unit max speed
       */
      getUnitMaxSpeed(unit = "kmh") {
        return this.#handle_empty(SU.speed(this.#UT?.Shop?.maxSpeed, unit));
      }
      /**
       * Returns the altitude for the max speed of the unit.
       * @param {String} unit The conversion unit
       * [m, ft]
       * @returns {Number} Unit max speed altitude
       */
      getUnitMaxSpeedAlt(unit = "m") {
        return this.#handle_empty(SU.alt(this.#UT?.Shop?.maxSpeedAlt, unit));
      }
      /**
       * Returns the unit's turn time
       * @returns {Number} Unit turn time (in seconds)
       */
      getUnitTurnTime() {
        if (isNaN(this.#UT?.Shop?.turnTime) || this.#UT?.Shop?.turnTime == undefined)
          return null;
        return this.#handle_empty(Math.round(this.#UT?.Shop?.turnTime * 10) / 10 || null);
      }
      /**
       * Returns the unit's climb-speed.
       * @param {String} unit The conversion unit
       * [m/s, ft/min]
       * @returns {Number} Unit climb-speed
       */
      getUnitClimbSpeed(unit = "m/s") {
        return this.#handle_empty(
          SU.climb_speed(this.#UT?.Shop?.climbSpeed, unit),
        );
      }
      /**
       * Returns the unit's total crew
       * @returns {Number} Unit total crew
       */
      getUnitCrewCount() {
        return this.#handle_empty(this.#WPC?.crewTotalCount);
      }
      getUnitFullRepairTimeCrew() {}
      /**
       * Returns the unit's max altitude.
       * @param {String} unit The conversion unit
       * [m, ft]
       * @returns {Number} Unit max altitude
       */
      getUnitMaxAltitude(unit = "m") {
        return this.#handle_empty(SU.alt(this.#UT?.Shop?.maxAltitude, unit));
      }
      /**
       * Returns the unit's required airfield length.
       * @param {String} unit The conversion unit
       * [m, ft]
       * @returns {Number} Unit required runway length
       */
      getUnitAirfieldLen(unit = "m") {
        if (isNaN(this.#UT?.Shop?.airfieldLen) || this.#UT?.Shop?.airfieldLen == undefined)
          return null;
        return this.#handle_empty(SU.alt(Math.round(this.#UT?.Shop?.airfieldLen * 10) / 10, unit));
      }
      /**
       * Returns the unit's wing-loading.
       * @param {String} unit The conversion unit
       * [kg/m2, lb/ft2]
       * @returns {Number} Unit wing-loading
       */
      getUnitWingLoading(unit = "kg/m2") {
        return this.#handle_empty(
          SU.wing_loading(this.#UT?.Shop?.wingLoading, unit),
        );
      }
      /**
       * Returns the unit's power to weight ratio.
       * @param {String} unit The conversion unit
       * [hp/kg, hp/lb]
       * @returns {Number} Unit power to weight ratio.
       */
      getUnitPowerToWeightRatio(unit = "hp/kg") {
        return this.#handle_empty(
          SU.power_to_weight(this.#UT?.Shop?.powerToWeightRatio, unit),
        );
      }
      /**
       * Returns the unit's climb altitude.
       * @param {String} unit The conversion unit
       * [m, ft]
       * @returns {Number} Unit climb altitude
       */
      getUnitClimbAlt(unit = "m") {
        return this.#handle_empty(SU.alt(this.#UT?.Shop?.climbAlt, unit));
      }
      /**
       * Returns the unit's climb time.
       * @returns {Number} Unit climb time (in seconds)
       */
      getUnitClimbTime() {
        return this.#handle_empty(this.#UT?.Shop?.climbTime || null);
      }
      /**
       * Returns the unit's weapon presets.
       * @returns {Object} Unit weapon preset list
       */
      getUnitWeaponPresets() {
        let weapons = this.#WPC?.weapons || {};

        let defaultWep = weapons?.[`${this.#id}_default`] ?? null;
        let presetCount = 0;
        Object.keys(weapons).forEach((preset_name) => {
          let value = weapons[preset_name];
          if (preset_name.toLowerCase()?.endsWith("_default") && !defaultWep)
            defaultWep = value;
          if (!value?.isWeaponForCustomSlot && value?.weaponmask != null) {
            presetCount++;
          }
        });

        return this.#handle_empty({
          count:
            !this.getUnitIsTank() && !this.getUnitIsShip() ? presetCount : null,
          default: defaultWep,
        });
      }
      getUnitMassPerSec() {
        let weaponsBlock = this.#WPC?.weapons;

        let foundPreset, defaultPreset;

        defaultPreset = weaponsBlock?.[`${this.#id}_default`];

        if (defaultPreset && defaultPreset?.mass_per_sec)
          return defaultPreset?.mass_per_sec;

        Object.keys(weaponsBlock ?? []).forEach((weaponPreset) => {
          let presetData = weaponsBlock?.[weaponPreset] ?? {};
          if (weaponPreset?.toLowerCase()?.endsWith("_default") && presetData?.mass_per_sec && !foundPreset) {
            foundPreset = presetData;
          };

        });

        if (foundPreset && foundPreset?.mass_per_sec)
          return foundPreset?.mass_per_sec;
        return null;
      }
      getUnitHasDepthCharge() {
        let weaponsBlock = this.#WPC?.weapons;

        let foundPreset;

        Object.keys(weaponsBlock ?? []).forEach((weaponPreset) => {
          let presetData = weaponsBlock?.[weaponPreset] ?? {};
          if (presetData?.hasDepthCharge == true && !foundPreset) {
            foundPreset = presetData;
          };

        });

        if (foundPreset && foundPreset?.hasDepthCharge)
          return foundPreset?.hasDepthCharge ? true : false;
        return false;
      }
      getUnitMass() {
        return this.#handle_empty(SU.weight(this.#WPC?.mass));
      }
      getUnitHorsePowers() {
        return this.#UT?.Shop?.horsePowers;
      }
      getUnitRPM() {
        return this.#UT?.Shop?.rpm;
      }
      getUnitMaxInclination() {}
      /**
       * Returns the unit's turret rotation speed.
       * @returns {Object} Unit turret rotation speed [x, y]
       */
      getUnitTurretSpeed() {
        let speed = this.#WPC?.turretSpeed;
        let [x, y] = speed || [null, null];
        return this.#handle_empty(
          x != null ? {
            x,
            y,
          } :
          speed,
        );
      }
      getUnitVerticalGuidance() {
        let vGuidance = this.#UT?.Shop?.angleVerticalGuidance ?? null;
        let { min = null, max = null } = vGuidance ?? {};

        return this.#handle_empty({
          min,
          max
        })
      }
      getUnitArmorThicknessHull() {
        let shopData = this.#UT?.Shop;
        let [front = 0, side = 0, back = 0] = shopData?.armorThicknessHull || [
          null,
          null,
          null,
        ];
        return this.#handle_empty({
          front,
          side,
          back,
        });
      }
      getUnitArmorThicknessTurret() {
        let shopData = this.#UT?.Shop;
        let [front = 0, side = 0, back = 0] =
        shopData?.armorThicknessTurret || [null, null, null];
        return this.#handle_empty({
          front,
          side,
          back,
        });
      }
      getUnitArmorThicknessTurretCumulative() {
        let shopData = this.#UT?.Shop;
        let [front = 0, side = 0, back = 0] =
        shopData?.armorThicknessCumulativeTurret || [null, null, null];
        return this.#handle_empty({
          front,
          side,
          back,
        });
      }
      getUnitArmorPiercing() {
        return {
          range_10: null,
          range_100: null,
          range_500: null,
        };
      }
      /**
       * Returns the unit's shot frequency (% / s)
       * @returns {Number} Unit shot frequency
       */
      getUnitShotFrequency() {
        let reloadT =
          this.getUnitReloadTime()?.primary_weapon ||
          this.getUnitReloadTime()?.cannon ||
          this.getUnitReloadTime()?.mgun ||
          this.getUnitReloadTime()?.additionalGun ||
          this.getUnitReloadTime()?.gunner ||
          null;
        return this.#handle_empty(reloadT ? 1 / reloadT : null);
      }
      getUnitReloadTime() {
        if (!this.#WPC) return {};

        const weapons_Naval = {};
        const regex = /^ship([A-Za-z0-9-_.]+)reloadtime_([A-Za-z0-9-_.]+)$/i;

        Object.entries(this.#WPC).forEach(([key, value]) => {
          const match = key.match(regex);
          if (match) {
            const [, type, weaponName] = match; // first group = type, second = weaponName
            weapons_Naval[weaponName] = {
              type: type.toLowerCase(), // normalize if needed
              reloadTime: value,
            };
          }
        });

        const {
          reloadTime_cannon: cannon,
          reloadTime_gunner: gunner,
          reloadTime_mgun: mgun,
          reloadTime_additionalGun: additionalGun,
        } = this.#WPC;

        return {
          naval_weapons: weapons_Naval,
          cannon,
          gunner,
          mgun,
          additionalGun,
          primary_weapon: cannon || additionalGun || mgun || gunner,
        };
      }
      getUnitVisibiltyFactor() {}
      getUnitDisplacement() {
        return this.#handle_empty(
          SU.displacement(this.#UT?.Shop?.displacement),
        );
      }
      getUnitArmorThicknessCitadel() {
        let shopData = this.#UT?.Shop;
        let [front = 0, side = 0, back = 0] =
        shopData?.armorThicknessCitadel || [null, null, null];
        return this.#handle_empty({
          front,
          side,
          back,
        });
      }
      getUnitArmorThicknessTower() {
        let shopData = this.#UT?.Shop;
        let [front = 0, side = 0, back = 0] =
        shopData?.armorThicknessMainFireTower || [null, null, null];
        return this.#handle_empty({
          front,
          side,
          back,
        });
      }
      getUnitHullMaterial() {}
      getUnitSuperstructureMaterial() {}
      getUnitRequiredUnit() {}
      getUnitModifications() {
        let modifications = this.#WPC?.modifications || {};
        let mod_data = {};
        let mods = [];

        Object.keys(modifications).forEach((modName) => {
          let modInfo = modifications[modName] || {};
          let modConstInfo = MD?.modifications?.[modName] || {};

          let data = {
            id: modName,
            name: MN?.[`modification/${modName}`]?.[LANG] ||
              MN?.[`${modName}/name`]?.[LANG] ||
              modName,
            reserve: modInfo?.isReserve ?? modConstInfo?.isReserve ?? false,
            group: modInfo?.group ?? modConstInfo?.group,
            image: modInfo?.image ?? modConstInfo?.image,
            tier: modInfo?.tier ?? modConstInfo?.tier ?? 0,
            reqExp: modInfo?.reqExp ?? modConstInfo?.reqExp,
            value: modInfo?.value ?? modConstInfo?.value,
            class: modInfo?.modClass ?? modConstInfo?.modClass ?? "misc",
          };

          data.className =
            MN?.[`modification/category/${data.class}`]?.[LANG] || data.class;

          let modCat = (mod_data[data.class] = mod_data[data.class] || {});
          let modList = (mod_data[data.class][data.tier] =
            mod_data[data.class][data.tier] || []);
          let classNumber = Object.keys(mod_data).findIndex(
            (category) => category === data.class,
          );

          let x = classNumber + modList.length;
          let y = data.tier;

          data.position = {
            x,
            y,
          };
          modList.push(data);
          mods.push(data);
        });

        if (false) {
          let categoryOffsets = {};
          let currentX = 0;

          Object.keys(mod_data).forEach((category) => {
            categoryOffsets[category] = currentX;
            let maxX = 0;
            Object.values(mod_data[category]).forEach((tiers) => {
              tiers.forEach((mod) => {
                if (mod.position && mod.position.x > maxX)
                  maxX = mod.position.x;
              });
            });
            currentX += maxX + 1;
          });

          let maxY = 0;
          Object.values(mod_data).forEach((category) => {
            Object.values(category).forEach((tiers) => {
              tiers.forEach((mod) => {
                if (mod.position && mod.position.y > maxY)
                  maxY = mod.position.y;
              });
            });
          });

          let grid = Array.from({
              length: maxY + 2,
            },
            () => Array(currentX).fill(""),
          );

          Object.entries(categoryOffsets).forEach(([category, offset]) => {
            let firstMod = Object.values(mod_data[category])[0]?.[0];
            grid[0][offset] = firstMod?.className || category;
          });

          Object.entries(mod_data).forEach(([category, tiers]) => {
            let xOffset = categoryOffsets[category];
            Object.values(tiers).forEach((mods) => {
              mods.forEach((mod) => {
                if (mod.position) {
                  let x = xOffset + mod.position.x;
                  let y = mod.position.y + 1;
                  grid[y][x] = mod.name || "•";
                }
              });
            });
          });

          console.table(grid);
        }
        return {...mod_data, modifications: mods};
      }

      getUnitWeaponPresetSlots() {}
      getUnitPilonInfo() {}
      getUnitHasTag(tag) {
        let tags = this.#UT?.tags ?? [];

        return !!this.#handle_empty(tags[tag]);
      }
      getUnitIsHydroplane() {
        let tags = this.#UT?.tags ?? [];
        let hangarPlace = this.#UT?.hangar_place;

        return this.#handle_empty(
          hangarPlace == "hydroplane" || tags["type_hydroplane"] == true,
        );
      }
      getUnitIsAirship() {
        let tags = this.#UT?.tags ?? [];
        let hangarPlace = this.#UT?.hangar_place;
        return this.#handle_empty(hangarPlace == "airship");
      }
      getUnitIsReserve() {
        let [ecoRank, WP, GE] = [
          this.#WPC?.economicRank || 0,
          this.#WPC?.value || 0,
          this.#WPC?.costGold || 0,
        ];
        return this.#handle_empty(ecoRank < 1 && WP < 1 && GE < 1);
      }
      getUnitRequiredEXP() {
        return this.#handle_empty(this.#WPC?.reqExp || null);
      }
      getUnitCountry() {
        let country = this.#WPC?.country || null;
        country =
          country ||
          (this.getUnitHasTag("country_usa") ?
            "country_usa" :
            this.getUnitHasTag("country_germany") ?
            "country_germany" :
            this.getUnitHasTag("country_ussr") ?
            "country_ussr" :
            this.getUnitHasTag("country_britain") ?
            "country_britain" :
            this.getUnitHasTag("country_japan") ?
            "country_japan" :
            this.getUnitHasTag("country_china") ?
            "country_china" :
            this.getUnitHasTag("country_france") ?
            "country_france" :
            this.getUnitHasTag("country_italy") ?
            "country_italy" :
            this.getUnitHasTag("country_israel") ?
            "country_israel" :
            this.getUnitHasTag("country_sweden") ?
            "country_sweden" :
            this.getUnitHasTag("country_0") ?
            "country_0" :
            null);

        if (!country) {
          if (this.#id?.startsWith("us_")) country = "country_usa";
          if (this.#id?.startsWith("germ_")) country = "country_germany";
          if (this.#id?.startsWith("ussr_")) country = "country_ussr";
          if (this.#id?.startsWith("uk_")) country = "country_britain";
          if (this.#id?.startsWith("jp_")) country = "country_japan";
          if (this.#id?.startsWith("cn_")) country = "country_china";
          if (this.#id?.startsWith("fr_")) country = "country_france";
          if (this.#id?.startsWith("it_")) country = "country_italy";
          if (this.#id?.startsWith("il_")) country = "country_israel";
          if (this.#id?.startsWith("sw_")) country = "country_sweden";
          if (this.#id?.startsWith("uss_")) country = "country_usa";
          if (this.#id?.startsWith("ijn_")) country = "country_japan";
          if (!country) country = "country_usa";
        }
        return this.#handle_empty(country);
      }
      getUnitIsViewable() {
        return this.#handle_empty(this.#UT?.hangar_place != null, false);
      }
      getUnitCanWishlist() {
        return this.#handle_empty(this.#UT != null && this.#WPC != null, false);
      }
      getUnitIsTechTree() {
        return this.#handle_empty(this.#TT != null, false);
      }
      getUnitOperatorCountry() {
        let baseCountryId = this.getUnitCountry() || "country_usa";
        let countryId =
          this.#UT?.operatorCountry || this.getUnitCountry() || "country_usa";

        let countryName =
          OP?.[countryId]?.[LANG] ||
          OP?.[`unlockTag/${countryId}`]?.[LANG] ||
          countryId;

        if (countryName == "country_invisible") countryName = "Invisible";
        if (countryName == "country_sky_pirates") countryName = "Sky Pirates";

        return this.#handle_empty({
          countryId,
          countryName,
          baseCountryId: baseCountryId,
          baseCountryName: OP?.[baseCountryId]?.[LANG] ||
            OP?.[`unlockTag/${baseCountryId}`]?.[LANG] ||
            baseCountryId,
        });
      }
      /**
       * Returns the given unit's tooltip country flag.
       * @returns {String} Unit tooltip flag URL
       */
      getUnitTooltipFlag() {
        let id = this.#WPC?.unitForImg ?? this.#id;
        let country = this.getUnitOperatorCountry()?.countryId || this.getUnitCountry() || "country_usa";
        let imageURL = `https://static.encyclopedia.warthunder.com/unit_tooltip/${country}.png`;
        let customData = override_vehicle_images?.tooltip?.[id];
        if (customData?.use_flag == false) {
          return this.#handle_empty("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
        }
        return this.#handle_empty(imageURL);
      }
      getUnitReleaseDate() {
        let date = this.#UT?.releaseDate || null;
        return this.#handle_empty(date ? new Date(date) : null);
      }
      getUnitIsPromo() {
        return this.#handle_empty(!!this.#TT?.isCrossPromo);
      }
      getUnitIsSquadron() {
        return this.#handle_empty(
          !!(
            this.#TT?.isClanVehicle || this.#WPC?.researchType == "clanVehicle"
          ),
        );
      }
      getUnitIsHidden() {
        let TT = this.#TT;
        let WPC = this.#WPC;

        let availWhenStatus = TT?.showOnlyWhenBought || TT?.showOnlyWhenResearch || TT?.showOnlyIfPlayerHasUnlock;
        let noResearch = !TT && !WPC?.researchType && !WPC?.reqAir;
        let noWPC = !WPC;
        let isReserve = WPC && WPC.value === 0 && !WPC.costGold;
        let hidden = (availWhenStatus || noResearch || noWPC) && !isReserve;

        return this.#handle_empty(hidden);
      }

      getUnitIsMarketplace() {
        return this.#handle_empty(this.#TT?.marketplaceItemdefId);
      }
      /**
       * Returns if the given unit was recently added.
       * @returns {Boolean} Is the unit relatively new?
       */
      getUnitIsNew() {
        let currentDate = new Date();
        let releaseDate = this.getUnitReleaseDate();
        if (releaseDate && releaseDate < currentDate) {
          let diff = currentDate - releaseDate;
          let d = diff / (1000 * 60 * 60 * 24);
          if (d <= 28) return true;
        }
        return false;
      }
      /**
       * Returns if the given unit is upcoming or is from the future.
       * @returns {Boolean} Is the unit future?
       */
      getUnitIsFuture() {
        let currentDate = new Date();
        let releaseDate = this.getUnitReleaseDate();
        if (releaseDate && releaseDate > currentDate) {
          return true;
        }
        return false;
      }
      /**
       * Returns if the given unit can be researched.
       * @returns {Boolean} Can this unit be researched?
       */
      getUnitCanResearch() {
        return this.#handle_empty(
          !this.getUnitIsHidden() ||
          this.#WPC?.researchType != null ||
          this.#WPC?.reqAir != null,
        );
      }
      /**
       * Returns the given unit's type (if available).
       * @returns {Object} An Object containing the object's main type and Tech Tree range.
       */
      getUnitType() {
        let tags = this.#UT?.tags ?? [];
        let mainType,
          treeType = null;
        if (tags["air"] == true && !mainType) {
          mainType = "aircraft";
          treeType = "aviation";
        }
        if (tags["tank"] == true && !mainType) {
          mainType = "tank";
          treeType = "army";
        }
        if (tags["boat"] == true && !mainType) {
          mainType = "ship";
          treeType = "boats";
        } /*BOAT goes first*/
        if (tags["submarine"] == true && !mainType) {
          mainType = "ship";
          treeType = "ships";
        }
        if (tags["ship"] == true && !mainType) {
          mainType = "ship";
          treeType = "ships";
        }
        if (tags["human"] == true && !mainType) {
          mainType = "human";
          treeType = "humans";
        }
        if (
          (tags["helicopter"] == true ||
            tags["type_attack_helicopter"] == true ||
            (tags["type_utility_helicopter"] == true) && !mainType)
        ) {
          mainType = "aircraft";
          treeType = "helicopters";
        }
        if (tags["walker"] == true && !mainType) {
          mainType = "tank";
          treeType = "army";
        }

        mainType = mainType ?? null;
        treeType = treeType ?? null;

        if (!mainType && !treeType) {
          if (this.#id?.toLowerCase()?.includes("hydrofoil")) {
            mainType = "boat";
            treeType = "boats";
          }
          if (this.#id?.toLowerCase()?.startsWith("ijn_")) {
            mainType == "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.startsWith("uss_")) {
            mainType == "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.includes("battleship")) {
            mainType = "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.includes("cruiser")) {
            mainType = "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.includes("destroyer")) {
            mainType = "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.includes("aircraftcarrier")) {
            mainType = "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.includes("battlecruiser")) {
            mainType = "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.includes("frigate")) {
            mainType = "ship";
            treeType = "ships";
          }
          if (this.#id?.toLowerCase()?.includes("cargo_ship")) {
            mainType = "ship";
            treeType = "ships";
          }
        };

        mainType = mainType ?? "aircraft";
        mainType = mainType ?? "aviation";

        return this.#handle_empty({
          mainType,
          treeType,
        });
      }
      /**
       * Returns if the given unit is an aircraft.
       * @returns {Boolean} Is the unit an aircraft?
       */
      getUnitIsAircraft() {
        return (
          !this.getUnitIsTank() &&
          (this.getUnitType()?.mainType == "aircraft" ||
            this.getUnitAirfieldLen() != null ||
            this.getUnitClimbAlt() != null ||
            this.getUnitClimbSpeed() != null ||
            this.getUnitClimbTime() != null ||
            this.getUnitMassPerSec() != null ||
            this.getUnitMaxAltitude() != null ||
            this.getUnitMaxSpeedAlt() != null ||
            this.getUnitWingLoading() != null)
        );
      }
      /**
       *  Returns if the given unit is an aircraft.
       * @returns {Boolean} Is the unit a tank?
       */
      getUnitIsTank() {
        return (
          this.getUnitType()?.mainType == "tank" ||
          (this.getUnitArmorThicknessHull()?.front != null &&
            this.getUnitArmorThicknessTurret()?.front != null) ||
          this.getUnitTurretSpeed()?.x != null ||
          this.getUnitVerticalGuidance()?.min != null ||
          this.getUnitVisibiltyFactor() != null
        );
      }
      /**
       * Returns if the given unit is a ship.
       * @returns {Boolean} Is the unit a ship?
       */
      getUnitIsShip() {
        return (
          !this.getUnitIsTank() &&
          (this.getUnitType()?.mainType == "ship" ||
            (this.getUnitArmorThicknessCitadel()?.front != null &&
              this.getUnitArmorThicknessTower()?.front != null) ||
            Object.entries(this.getUnitReloadTime()?.naval_weapons || []) > 0 ||
            this.getUnitDisplacement() != null)
        );
      }

      /**
       * Returns the unit's ready-to-use tooltip data.
       */
      getUnitTooltipData() {
        let is_plane = this.getUnitIsAircraft();
        let is_tank = this.getUnitIsTank();
        let is_ship = this.getUnitIsShip();

        this.getUnitModifications();

        let unit_speed = "kmh";
        let unit_alt = "m";
        let unit_cs = "m/s";
        let unit_wl = "kg/m2";
        let unit_t2w = "hp/kg";

        let isPremium = this.getUnitOtherInfo()?.isPremium;

        let hull_armor = this.getUnitArmorThicknessHull();
        let turret_armor = this.getUnitArmorThicknessTurret();
        let turret_armor_cumulative =
          this.getUnitArmorThicknessTurretCumulative();
        let armor_piercing = this.getUnitArmorPiercing();

        let _top = {
          /*IN RESEARCH: ....*/
          /*-----------------*/
          /*THE PREV. VEHICLE MUST BE PURCHASED*/
          OTHER_INFO_TEXT: this.getUnitOtherInfo()?.headerText,
          WEAPON_INFO_TEXT: this.getUnitWeaponText()?.headerText,
        };

        let _sorted = {
          WEAPON_PRESET_COUNT: this.getUnitWeaponPresets()?.count > 0 ?
            this.getUnitWeaponPresets()?.count : null,
          MASS_PER_SEC: this.#add_unit(this.getUnitMassPerSec(), "kg/s"),
          /*SPLIT*/
          SPLIT_AREA_01: ".split",
          TURN_TURRET_SPEED: is_tank ?
            this.#add_unit(this.getUnitTurretSpeed()?.x, "°/s") : null,
          ANGLE_VERTICAL_GUIDANCE: is_tank ?
            this.getUnitVerticalGuidance()?.min != null ?
            `${this.getUnitVerticalGuidance()?.min?.toFixed?.(1)} / ${this.getUnitVerticalGuidance()?.max?.toFixed?.(1)}°` : null : null,
          RELOAD_TIME: is_tank ?
            this.#add_unit(
              (
                this.getUnitReloadTime()?.primary_weapon ||
                this.getUnitReloadTime()?.cannon ||
                this.getUnitReloadTime()?.mgun ||
                this.getUnitReloadTime()?.additionalGun ||
                this.getUnitReloadTime()?.gunner ||
                null
              )?.toFixed(1),
              "s",
            ) : null,
          /*SPLIT*/
          SPLIT_AREA_02: ".split",
          ARMOR_THICKNESS_HULL: is_tank && hull_armor?.front != null ?
            `${hull_armor?.front || 0} / ${hull_armor?.side || 0} / ${hull_armor?.back || 0}` : null,
          ARMOR_THICKNESS_TURRET: is_tank && turret_armor?.front != null ?
            `${turret_armor?.front || 0} / ${turret_armor?.side || 0} / ${turret_armor?.back || 0}` : null,
          ARMOR_THICKNESS_CUMULATIVE_TURRET: is_tank && turret_armor_cumulative?.front != null ?
            `${turret_armor_cumulative?.front || 0} / ${turret_armor_cumulative?.side || 0} / ${turret_armor_cumulative?.back || 0}` : null,
          ARMOR_PIERCING: is_tank && armor_piercing?.range_10 != null ?
            `${armor_piercing?.range_10 || 0} / ${armor_piercing?.range_100 || 0} / ${armor_piercing?.range_500 || 0}` : null,
          ARMOR_AT_DISTANCE: is_tank && this.getUnitArmorThicknessHull()?.front != null ?
            this.#add_unit("10 / 100 / 500", "m") : null,
          /*SPLIT*/
          SPLIT_AREA_03: ".split",
          CREW_COUNT: this.getUnitCrewCount(),
          MASS: this.#add_unit(this.getUnitMass(), "t"),
          HORSE_POWER_RPM: this.getUnitHorsePowers() && this.getUnitRPM() ? `${this.#add_unit(this.getUnitHorsePowers(), "hp")} at ${this.#add_unit(this.getUnitRPM(), "rpm")}` : null,
          MAX_SPEED: this.#add_unit(
            this.getUnitMaxSpeed(unit_speed),
            unit_speed,
          ),
          MAX_SPEED_ALT: is_plane ?
            this.#add_unit(
              this.getUnitMaxSpeedAlt(unit_alt) == 0 ?
              "Sea level" :
              this.getUnitMaxSpeedAlt(),
              this.getUnitMaxSpeedAlt(unit_alt) == 0 ? "" : "m",
            ) : null,
          DISPLACEMENT: is_ship ?
            this.#add_unit(this.getUnitDisplacement(), "t") : null,
          MAX_ALTITUDE: is_plane ?
            this.#add_unit(this.getUnitMaxAltitude(unit_alt), unit_alt) : null,
          TURN_TIME: is_plane ?
            this.#add_unit(this.getUnitTurnTime(), "s") : null,
          CLIMB_SPEED: is_plane ?
            this.#add_unit(this.getUnitClimbSpeed(unit_cs), unit_cs) : null,
          CLIMB_TIME: is_plane ?
            this.#add_unit(this.getUnitClimbTime(), "s") : null,
          CLIMB_ALT: is_plane ?
            this.#add_unit(this.getUnitClimbAlt(unit_alt), unit_alt) : null,
          AIRFIELD_LEN: is_plane ?
            this.#add_unit(this.getUnitAirfieldLen(unit_alt), unit_alt) : null,
          WING_LOADING: is_plane ?
            this.#add_unit(this.getUnitWingLoading(unit_wl), unit_wl) : null,
          /*SPLIT*/
          SPLIT_AREA_04: ".split",
          REQUIRED_EXP: this.#add_unit(
            this.getUnitRequiredEXP()?.toLocaleString(),
            "RP",
          ),
          PRICE: this.#add_unit(this.getUnitPrice()?.wp?.toLocaleString(), "SL") ||
            this.#add_unit(this.getUnitPrice()?.gold?.toLocaleString(), "GE"),
          TRAIN_COST: this.#add_unit(
            this.getUnitTrainCost()?.toLocaleString(),
            "SL",
          ),
          /*SPLIT*/
          SPLIT_AREA_05: ".split",
          FREE_REPAIRS: this.getUnitFreeRepairs(),
          COST_PER_MIN: null,
          FULL_REPAIR_COST: this.#add_unit(
            this.getUnitFullRepairCost()?.toLocaleString(),
            "SL",
          ),
          FULL_REPAIR_TIME_CREW: this.getUnitFullRepairTimeCrew(),
          /*SPLIT*/
          SPLIT_AREA_06: ".split",
          /*RESEARCH EFF.*/
          RP_MULTIPLIER: this.getUnitRpMultiplier() ?
            `${this.getUnitRpMultiplier()}×(100%)` : null,
          WP_MULTIPLIER: this.getUnitWpMultiplier() ?
            `${this.getUnitWpMultiplier()}×(100%)` : null,
          /*SPLIT*/
          SPLIT_AREA_07: ".split",
          THRUST_TO_WEIGHT_RATIO: this.getUnitPowerToWeightRatio(unit_t2w),
          MAX_SPEED_TANK: is_tank ? this.getUnitMaxSpeed(unit_speed) : null,
          MAX_INCLINATION: is_tank ? this.getUnitMaxInclination() : null,
          VISIBILITY: is_tank ?
            (this.getUnitVisibiltyFactor() ?
              Number(this.getUnitVisibiltyFactor()) * 100 :
              null
            )?.toFixed(0) : null,
          ARMOR_THICKNESS_CITADEL_FRONT: is_ship ?
            this.getUnitArmorThicknessCitadel()?.front : null,
          ARMOR_THICKNESS_CITADEL_REAR: is_ship ?
            this.getUnitArmorThicknessCitadel()?.side : null,
          ARMOR_THICKNESS_CITADEL_BACK: is_ship ?
            this.getUnitArmorThicknessCitadel()?.back : null,
          ARMOR_THICKNESS_TOWER_FRONT: is_ship ?
            this.getUnitArmorThicknessTower()?.front : null,
          ARMOR_THICKNESS_TOWER_REAR: is_ship ?
            this.getUnitArmorThicknessTower()?.side : null,
          ARMOR_THICKNESS_TOWER_BACK: is_ship ?
            this.getUnitArmorThicknessTower()?.back : null,
          HULL_MATERIAL: is_ship ? this.getUnitHullMaterial() : null,
          SUPERSTRUCTURE_MATERIAL: is_ship ?
            this.getUnitSuperstructureMaterial() : null,
          PILONS_INFO: this.getUnitPilonInfo(),
        };

        let MAPPING = {
          WEAPON_PRESET_COUNT: "Armament Presets:",
          MASS_PER_SEC: "One-second Burst Mass:",
          CREW_COUNT: "Crew:",
          MAX_SPEED: "Max Speed:",
          MAX_SPEED_ALT: "at height:",
          MAX_ALTITUDE: "Max Altitude:",
          TURN_TIME: "Turn Time:",
          CLIMB_SPEED: "Climb Speed:",
          CLIMB_TIME: "Climb Time:",
          CLIMB_ALT: "to altitude:",
          AIRFIELD_LEN: "Takeoff Run:",
          WING_LOADING: "Wing Loading:",
          PRICE: "Price:",
          TRAIN_COST: "Crew train cost:",
          FREE_REPAIRS: "Free repairs:",
          COST_PER_MIN: "Repair cost depending on \nlifetime:",
          FULL_REPAIR_COST: "Max repair cost:",
          FULL_REPAIR_TIME_CREW: "Free repair time:",
          RP_MULTIPLIER: `Reward ${(this.getUnitRpMultiplier() ? this.getUnitRpMultiplier() * 100 : 100)?.toFixed(0)}% RP:`,
          WP_MULTIPLIER: `Reward ${(this.getUnitWpMultiplier() ? this.getUnitWpMultiplier() * 100 : 100)?.toFixed(0)}% SL:`,
          THRUST_TO_WEIGHT_RATIO: "Thrust to Weight Ratio:",
          MASS: "Mass:",
          MAX_SPEED: "Max Speed:",
          MAX_INCLINATION: "Max Inclination:",
          TURN_TURRET_SPEED: "Turret Rotation Speed:",
          ANGLE_VERTICAL_GUIDANCE: "Vertical Guidance:",
          ARMOR_THICKNESS_HULL: "Hull Armor:",
          ARMOR_THICKNESS_TURRET: "Turret Armor:",
          ARMOR_THICKNESS_CUMULATIVE_TURRET: "Turret Armor (Cumulative):",
          ARMOR_PIERCING: "Armor Penetration:",
          ARMOR_AT_DISTANCE: "at distances:",
          RELOAD_TIME: "Reloading Rate:",
          HORSE_POWER_RPM: "Engine Power:",
          MAX_SPEED_TANK: "Max Speed:",
          MAX_SPEED_SHIP: "Max Speed:",
          VISIBILITY: "Visibility:",
          BACKUPS: "Back-ups:",
          REQUIRED_EXP: "Required RP:",
          DISPLACEMENT: "Displacement:",
          SPLIT_AREA_01: ".split",
          SPLIT_AREA_02: ".split",
          SPLIT_AREA_03: ".split",
          SPLIT_AREA_04: ".split",
          SPLIT_AREA_05: ".split",
          SPLIT_AREA_06: ".split",
          SPLIT_AREA_07: ".split",
        };

        let renamed_sorted = {};
        for (const [key, val] of Object.entries(_sorted)) {
          const displayName = MAPPING[key] || key;

          // Only set if we don't already have a value for this displayName
          if (
            val !== null &&
            val !== undefined &&
            !(typeof val === "number" && isNaN(val))
          ) {
            if (!(displayName in renamed_sorted)) {
              renamed_sorted[displayName] = val;
            }
          }
        }

        let rows = [];

        for (const [name, value] of Object.entries(renamed_sorted)) {
          const isSplit = value === ".split" || name.startsWith("SPLIT_");

          if (isSplit) {
            // Always include splits as a visual break
            rows.push({
              name: "\n",
              value: "",
            });
            continue;
          }

          if (
            value === null ||
            value === undefined ||
            (typeof value === "number" && isNaN(value))
          ) {
            continue;
          }

          // Add all real values
          rows.push({
            name,
            value,
          });
        }

        let final = rows.filter((row, idx, arr) => {
          if (row.name !== "__SPLIT__") return true;

          if (idx === 0) return false;

          if (arr[idx - 1].name === "__SPLIT__") return false;

          return true;
        });

        final = final.map((r) => {
          if (r.name === "__SPLIT__") {
            return {
              name: "\n",
              value: "",
            };
          }
          return r;
        });

        const filtered_topData = Object.entries(_top)
          .filter(
            ([_, val]) =>
            val !== null &&
            val !== undefined &&
            !(typeof val === "number" && isNaN(val)),
          )
          .map(([key, val]) => ({
            name: key,
            value: val,
          }));

        return {
          header: filtered_topData,
          data: final,
          otherData: {
            isPremium,
            showBR: this.getUnitShowBattleRating(),
          },
        };
      }

      getUnitReqUnit() {
        return this.#TT?.reqAir ?? this.#WPC?.reqAir ?? null;
      }

      /*Getters Pt.2*/

      get techTreePosition() {
        let relativeXY = this.#TT?.rankPosXY;
        let setPos = this.#extraData?._meta.position || this.#extraData?.position;
        let rX = (relativeXY?.x ?? relativeXY?.[0]) - 1;
        let rY = (relativeXY?.y ?? relativeXY?.[1]) - 1;
        let mobileGroup = (this.#UT?.tierGroup);
        if (!Array.isArray(setPos) && typeof setPos == "object" && rX >= 0 && rY >= 0 && !isNaN(rX) && !isNaN(rY)) {
          setPos.relativeX = rX ?? null;
          setPos.relativeY = rY ?? null;
        };
        if (!isNaN(mobileGroup) && mobileGroup != undefined && mobileGroup != null)
          setPos = {
            ...setPos ?? {},
            mobileY: mobileGroup
          };
        return setPos;
      }

      get name() {
        return this?.getUnitName() ?? this?.getUnitId();
      }

      get shopName() {
        return this?.getUnitShopName() ?? this?.getUnitId();
      }

      get rank() {
        return this?.getUnitRank() ?? "I";
      }

      get shopCountry() {
        return this?.#WPC?.country ?? this?.getUnitOperatorCountry()?.baseCountryId ?? "country_usa";
      }

      get cost() {
        return this?.getUnitPrice()?.wp ?? null;
      }

      get costGold() {
        return this?.getUnitPrice()?.gold ?? null;
      }

      get reqExp() {
        return this?.getUnitRequiredEXP() ?? null;
      }

      get expMul() {
        return this?.getUnitRpMultiplier() ?? 1.0;
      }

      get gift() {
        return this.#TT?.gift ?? this?.#WPC?.gift;
      }

      get event() {
        return this.#TT?.event ?? this?.#WPC?.event;
      }

      get repairCost() {
        return this?.getUnitRepairCost() ?? 0;
      }

      get repairTimeHrsArcade() {
        return this?.getFullRepairTimeCrew("arcade")
      }

      get repairTimeHrsHistorical() {
        return this?.getFullRepairTimeCrew("historical")
      }

      get repairTimeHrsSimulation() {
        return this?.getFullRepairTimeCrew("simulation")
      }

      get freeRepairs() {
        return this?.getUnitFreeRepairs()
      }

      get trainCost() {
        return this?.getUnitTrainCost()
      }

      get train2Cost() {
        return this?.#WPC?.train2Cost ?? null;
      }

      get train3Cost_gold() {
        return this?.#WPC?.train3Cost_gold ?? null;
      }

      get train3Cost_exp() {
        return this?.#WPC?.train3Cost_exp ?? null;
      }

      get gunnersCount() {
        return this?.#WPC?.gunnersCount ?? null;
      }

      get hasDepthCharge() {
        return this?.getUnitHasDepthCharge();
      }
      get isInShop() {
        return this?.getUnitIsTechTree();
      }

      get reqAir() {
        return this?.getUnitReqUnit() ?? this?.#TT?.reqAir ?? this?.#WPC?.reqAir ?? "";
      }

      get futureReqAir() {
        return this?.#TT?.futureReqAir ?? this?.#WPC?.futureReqAir ?? null;
      }

      get futureReqAirDesc() {
        let newUnit = this?.TT?.futureReqAir ?? this?.#WPC?.futureReqAir ?? null;
        let isUnitNew = false;

        if (newUnit == this.#id || newUnit == null) return null;

        let newUnitWPC =
          WPC?.[newUnit] || WPC?.__lowerCaseUnits__?.[newUnit.toLowerCase()];
        let newUnitUT =
          UT?.[newUnit] || UT?.__lowerCaseUnits__?.[newUnit.toLowerCase()];

        let currentDate = new Date();
        let releaseDate = new Date(newUnitUT?.releaseDate || null);

        if (releaseDate && releaseDate < currentDate) {
          let diff = currentDate - releaseDate;
          let d = diff / (1000 * 60 * 60 * 24);
          if (d <= 28) isUnitNew = true;
        }

        let newUnitName = newUnit ? (UN?.[`${newUnit}_0`]?.[LANG] ||
          UN?.[`${newUnit}_shop`]?.[LANG] ||
          UN?.[`${newUnit}_1`]?.[LANG] ||
          UN?.[`${newUnit}_2`]?.[LANG] ||
          UN?.[newUnit]?.[LANG] ||
          UN?.[`ships/${newUnit}_0`]?.[LANG] ||
          UN?.[`ships/${newUnit}_shop`]?.[LANG] ||
          UN?.[`ships/${newUnit}_1`]?.[LANG] ||
          UN?.[`ships/${newUnit}_2`]?.[LANG] ||
          UN?.__lowerCaseUnits__?.[`${newUnit.toLowerCase()}_0`]?.[LANG] ||
          UN?.__lowerCaseUnits__?.[`${newUnit?.toLowerCase()}_shop`]?.[LANG] ||
          UN?.__lowerCaseUnits__?.[`${newUnit?.toLowerCase()}_1`]?.[LANG] ||
          UN?.__lowerCaseUnits__?.[`${newUnit?.toLowerCase()}_2`]?.[LANG] ||
          UN?.__lowerCaseUnits__?.[newUnit?.toLowerCase()]?.[LANG] ||
          newUnit)?.replaceAll(`""`, `"`) : "";

        return this?.#TT?.futureReqAirDesc ?? this?.#WPC?.futureReqAirDesc ?? `The ${isUnitNew?"new ":""}${newUnitName} is not required in order to research and purchase the next vehicle, a future connection is shown between them.`;
      }

      get group() {
        if (!this?.getUnitIsTechTree()) return null;

        return this?.#TT?.groupId ?? this?.#TT?.group ?? this?.#WPC?.group;
      }

      get fakeReqUnits() {
        return null;
      }

      get showOnlyWhenBought() {
        let sH = (this?.#TT?.showOnlyWhenBought ?? this?.#WPC?.showOnlyWhenBought);
        return sH ?? false;
      }

      get showOnlyWhenResearch() {
        let sH = (this?.#TT?.showOnlyWhenResearch ?? this?.#WPC?.showOnlyWhenResearch);
        return sH ?? false;
      }

      get showOnlyIfPlayerHasUnlock() {
        let sH = (this?.#TT?.showOnlyIfPlayerHasUnlock ?? this?.#WPC?.showOnlyIfPlayerHasUnlock);
        return sH ?? false;
      }

      get hideForLangs() {
        return null;
      }

      get reqFeature() {
        return this?.#TT?.reqFeature ?? this?.#WPC?.reqFeature ?? null;
      }

      get hideFeature() {
        return this?.#TT?.hideFeature ?? this?.#WPC?.hideFeature ?? null;
      }

      get reqUnlock() {
        return this?.#TT?.reqUnlock ?? this?.#WPC?.reqUnlock ?? null;
      }

      get isCrossPromo() {
        let sH = (this?.#TT?.isCrossPromo ?? this?.#WPC?.isCrossPromo) ?? false;
        return sH;
      }

      get crossPromoBanner() {
        return this?.#TT?.crossPromoBanner ?? this?.#WPC?.crossPromoBanner ?? null;
      }

      get customImage() {
        return this?.#WPC?.customImage ?? null;
      }

      get customClassIco() {
        return this?.#WPC?.customClassIco ?? null;
      }

      get customTooltipImage() {
        return this?.#WPC?.customTooltipImage ?? null;
      }

      get tags() {
        return this?.#UT?.tags ?? {};
      }

      get weapons() {
        return this?.#WPC?.weapons ?? this?.#UT?.weapons ?? {};
      }

      get modifications() {
        return this?.getUnitModifications() ?? {};
      }

      get skins() {
        return this.#WPC?.skins ?? this?.#UT?.skins ?? {}; /* find a way */
      }

      get skinsBlocks() {
        return this?.#WPC?.skinsBlocks ?? this?.#UT?.skinsBlocks ?? null; /* find a way */
      }

      get previewSkinId() {
        return this?.#WPC?.previewSkinId ?? this?.#UT?.previewSkinId ?? null; /* find a way */
      }

      get weaponUpgrades() {
        let wpc = this?.#WPC;

        let upgradeList = [];

        Object.keys(wpc ?? {}).forEach((key) => {
          let value = wpc[key];
          if (key.toLowerCase()?.startsWith("weaponupgrade")) {
            let id = Number(key.toLowerCase().split("weaponupgrade")[1] || key.toLowerCase());
            upgradeList[isNaN(id) ? upgradeList.length : id] = value;
          };
        });

        return upgradeList.filter(upgrade => (upgrade != null && upgrade != undefined && upgrade != NaN));
      }

      get spare() {
        return this?.#WPC?.spare ?? this?.#UT?.spare ?? null;
      }

      get needBuyToOpenNextInTier() {
        let wpc = this?.#WPC;

        let tierList = [];

        Object.keys(wpc ?? {}).forEach((key) => {
          let value = wpc[key];
          if (key.toLowerCase()?.startsWith("needbuytoopennextintier")) {
            let id = Number(key.toLowerCase().split("needbuytoopennextintier")[1] || key.toLowerCase());
            tierList[isNaN(id) ? tierList.length : id] = value;
          };
        });

        return tierList.filter(tr => (tr != null && tr != undefined && tr != NaN));
      }

      get commonWeaponImage() {
        return this?.#WPC?.commonWeaponImage ?? "#ui/gameuiskin#weapon";
      }

      get primaryBullets() {
        return null;
      }

      get secondaryBullets() {
        return null;
      }

      get bulletsIconParam() {
        let wpc = this?.#WPC;

        let paramKeys = Object.keys(wpc?.bulletsIconParams ?? {});
        let fParam = wpc?.bulletsIconParams?.[paramKeys?.[0]];

        return (wpc?.bulletsIconParam ? wpc.bulletsIconParam : wpc?.bulletsIconParams ? fParam : null);
      }

      get shop() {
        return this?.#UT?.Shop ?? {};
      }

      get info() {
        return null;
      }

      get testFlight() {
        let testFlightMap = this?.#UT?.testFlight ?? null;
        return testFlightMap;
      }

      get isToStringForDebug() {
        return true;
      }

      get modificatorsRequestTime() {
        return null;
      }

      get modificators() {
        return null;
      }

      get modificatorsBase() {
        return null;
      }

      get minChars() {
        return null;
      }

      get maxChars() {
        return null;
      }

      get primaryWeaponMods() {
        return null;
      }

      get secondaryWeaponMods() {
        return null;
      }

      get bulGroups() {
        return -1;
      }

      get bulModsGroups() {
        return -1;
      }

      get bulletsSets() {
        return null;
      }

      get shopReq() {
        return true;
      }

      get researchType() {
        return this?.#WPC?.researchType ?? this?.#TT?.researchType ?? null;
      }

      get marketplaceItemdefId() {
        return this?.#WPC?.marketplaceItemdefId ?? this?.#TT?.marketplaceItemdefId ?? null;
      }

      get defaultWeaponPreset() {
        return this?.getUnitWeaponPresets()?.default ?? null;
      }

      get disableFlyout() {
        return false;
      }

      get hideBrForVehicle() {
        let tags = this?.#UT?.tags;
        return (tags?.hideBrForVehicle == true || this?.#WPC?.hideBrForVehicle == true);
      }

      get showShortestUnitInfo() {
        let tags = this?.#UT?.tags;
        return (tags?.showShortestUnitInfo == true || this?.#WPC?.showShortestUnitInfo == true);
      }

      get nvdSights() {
        return null;
      }

      get hasWeaponSlots() {
        return this?.#WPC?.hasWeaponSlots ?? false;
      }

      get weaponsContainers() {
        return null;
      }

      get defaultBeltParam() {
        return this?.#WPC?.defaultBeltParam;
      }

      get endResearchDate() {
        let date = this?.#UT?.endResearchDate ?? this?.#WPC?.endResearchDate;
        return date ? new Date(date) : null;
      }

      get slaveUnits() {
        let sU = this?.#TT?.slaveUnit ?? this?.#WPC?.slaveUnit;
        return sU ? [sU] : null;
      }

      get masterUnit() {
        return null;
      }

      get bulletsIconParams() {
        let wpc = this?.#WPC;

        return wpc?.bulletsIconParams ?? wpc?.bulletsIconParam ? [wpc?.bulletsIconParam] : null;
      }

      get premPackAir() {
        return this?.#WPC?.premPackAir ?? null;
      }

      get giftParam() {
        return this?.#WPC?.giftParam ?? null;
      }

      get isPkgDev() {
        /*also is dev version..*/

        return this?.#WPC?.pkgDev ?? false;
      }

      get expClass() {
        return this?.#WPC?.expClass; /*getUnitClassTypeByExpClass(expClass)*/
      }

      /*
        techTree.eventLabelId => addUnitEventId
        techTree.newsLabelId  => addUnitNewsId

        SOURCE DATA-----------------------

        if ("fakeReqUnitType" in shopUnitBlk)
          this.fakeReqUnits = shopUnitBlk % "fakeReqUnitType"

        let isVisibleUnbought = !shopUnitBlk?.showOnlyWhenBought
          && this.hasPlatformFromBlkStr(shopUnitBlk, "showByPlatform", true)
          && !this.hasPlatformFromBlkStr(shopUnitBlk, "hideByPlatform", false)

        if (isVisibleUnbought && isString(shopUnitBlk?.hideForLangs))
          this.hideForLangs = split_by_chars(shopUnitBlk?.hideForLangs, "; ")
        
        foreach (key in ["reqFeature", "hideFeature", "showOnlyIfPlayerHasUnlock", "reqUnlock"])
          if ((shopUnitBlk?[key] ?? "") != "")
            this[key] = shopUnitBlk[key] // (this[key] = stuff such as expClass, gift, ...etc)
        
        this.disableFlyout = shopUnitBlk?.disableFlyout ?? false
        this.endResearchDate = shopUnitBlk?.endResearchDate

        isAir                 = @() this.esUnitType == ES_UNIT_TYPE_AIRCRAFT
        isTank                = @() this.esUnitType == ES_UNIT_TYPE_TANK
        isShip                = @() this.esUnitType == ES_UNIT_TYPE_SHIP
        isBoat                = @() this.esUnitType == ES_UNIT_TYPE_BOAT
        isShipOrBoat          = @() this.esUnitType == ES_UNIT_TYPE_SHIP || this.esUnitType == ES_UNIT_TYPE_BOAT
        isSubmarine           = @() this.esUnitType == ES_UNIT_TYPE_SHIP && this.tags.indexof("submarine") != null
        isHelicopter          = @() this.esUnitType == ES_UNIT_TYPE_HELICOPTER
        isHuman               = @() this.esUnitType == ES_UNIT_TYPE_HUMAN

        function getOperatorCountry() {
          if (this._operatorCountry)
            return this._operatorCountry
          local res = get_unittags_blk()?[this.name].operatorCountry ?? ""
          this._operatorCountry = res != "" && hasCountryIcon(res) ? res : this.shopCountry
          return this._operatorCountry
        }

        function getSkins() {
          if (this.skins.len() == 0)
            this.skins = get_skins_for_unit(this.name) 
          return this.skins
        }

        function updateSkinBlocks() {
          if (!this.skinsBlocks.len()) 
            foreach (skin in this.getSkins())
              this.skinsBlocks[skin.name] <- skin
        }

        function getPreviewSkinId() {
          if (!this.previewSkinId) {
            this.previewSkinId = ""
            foreach (skin in this.getSkins())
              if (getDecorator($"{this.name}/{skin.name}", decoratorTypes.SKINS)?.blk?.useByDefault)
                this.previewSkinId = skin.name
          }
          return this.previewSkinId
        }

        unformatted
  function invalidateModificators() {
    if (this.modificatorsRequestTime > 0) {
      remove_calculate_modification_effect_jobs()
      this.modificatorsRequestTime = -1
    }
    this.modificators = null
  }

  function canPreview() {
    return this.isInShop
  }

  function doPreview() {
    if (this.canPreview())
      contentPreview.showUnitSkin(this.name)
  }

  isDepthChargeAvailable = @() this.hasDepthCharge || isModificationEnabled(this.name, "ship_depth_charge")

  function getNVDSights(modName) {
    if (!this.isTank())
      return []

    this.initNVDSightsOnce()
    return this.nvdSights?[modName] ?? []
  }

  function initNVDSightsOnce() {
    if (this.nvdSights)
      return

    this.nvdSights = {}
    eachBlock(getFullUnitBlk(this.name)?.modifications, function(mode, modeName) {
      this.nvdSights[modeName] <- []
      eachBlock(mode?.effects.nightVision, @(_, name) this.nvdSights[modeName].append(name), this) 
    }, this)
  }

  function getEntitlements() {
    if (this.gift == null)
      return []

    return searchEntitlementsByUnit(this.name)
  }

   function getUnlockImage() {
    if (this.isAir())
      return "#ui/gameuiskin#blueprint_items_aircraft"
    if (this.isTank())
      return "#ui/gameuiskin#blueprint_items_tank"
    if (this.isShipOrBoat())
      return "#ui/gameuiskin#blueprint_items_ship"

    return "#ui/gameuiskin#blueprint_items_aircraft"
  }

  isSquadronVehicle       = @() this.researchType == "clanVehicle"

  getOpenCost             = @() Cost(0, clan_get_unit_open_cost_gold(this.name))

  getWeapons = function() {
    if (!this.hasWeaponSlots || !hasFeature("WeaponryCustomPresets"))
      return this.weapons

    return [].extend(this.weapons, getWeaponryCustomPresets(this))
  }

  

        

      /*isInited BOOL | expClass | unitType | esUnitType | isPkgDev BOOL | premPackAir | giftParam*/

      /*Constructor*/

      constructor(id = "", extraData) {
        if (typeof id != "string") {
          id = id?.id ?? id?.unitId ?? id?.getUnitId() ?? "UNKNOWN_UNIT"
        };
        this.#id = id;
        this.#extraData = extraData;
        this.unitId = this.#id;
        this.unitName = this.getUnitName();
        this.unitShopName = this.getUnitShopName();

        let customWPC = extraData?.WPC ?? null;
        let customUT = extraData?.UT ?? null;
        let customTT = extraData?.TT ?? null;

        this.#WPC =
          WPC?.[this.#id] ?? WPC?.__lowerCaseUnits__?.[this.#id.toLowerCase()] ?? null;
        this.#UT =
          UT?.[this.#id] ?? UT?.__lowerCaseUnits__?.[this.#id.toLowerCase()] ?? null;
        this.#TT = FT ?
          FT.get(id) :
          find_in_tree(TT ?? null, id) ??
          find_in_tree(TT ?? {}, this.#id.toLowerCase()) ??
          null;

        this.#WPC = (this.#WPC ?? customWPC) ? {
            ...(this.#WPC ?? {}),
            ...(customWPC ?? {})
          } :
          null;

        this.#UT = (this.#UT ?? customUT) ? {
            ...(this.#UT ?? {}),
            ...(customUT ?? {})
          } :
          null;

        const hasAnyTT = (this.#TT && Object.keys(this.#TT).length > 0) ||
          (customTT && Object.keys(customTT).length > 0);

        this.#TT = hasAnyTT ? {
            ...(this.#TT ?? {}),
            ...(customTT ?? {})
          } :
          null;



        if (Array.isArray(this.#WPC) || typeof this.#WPC != "object")
          this.#WPC = null;

        if (!(typeof this.#id == "string" && this.#id.length > 0))
          throw new Error("Empty ID");
      }
    }

    const unit_from_blk = (blkData, id = null) => {
      if (typeof blkData !== "string" && typeof blkData !== "object")
        return null;

      const JSON = typeof blkData === "object" ? blkData : blk_to_json(blkData);
      const VALUES = {
        FM_FILE: JSON?.fmFile ?? null,
        MODEL: JSON?.model ?? null,
        TYPE: JSON?.type ?? null,
        EXP_CLASS: JSON?.expClass ?? null,
        CLASS_TAGS: JSON?.class_tags ?? {},
        RADAR_CLASS: JSON?.onRadarAs ?? null,
        SIGHT_NAME: JSON?.cockpit?.sightName ?? null,
        TAGS: JSON?.tags ?? JSON?.unitTags ?? [],
        CUTTING: JSON?.cutting ?? null,
        SUBCLASS: JSON?.subclass ?? null,

        HAS_FAKE_DM: JSON?.thisIsFakeDM ?? false,
        HAS_RANGEFINDER: JSON?.gunConvergence?.updateFromRangefinder ?? false,
        HAS_COMMANDER_SIGHT: JSON?.commanderView ?? false,
        HAS_ADVANCED_MOUSE_AIM: JSON?.advancedMouseAim ?? false,
        HAS_ADVANCED_INSTRUCTOR: JSON?.advancedInstructor ?? false,
        HAS_POINT_OF_INTEREST_DESIGNATOR: JSON?.havePointOfInterestDesignator ?? false,
        HAS_HELMET_DESIGNATOR: JSON?.hasHelmetDesignator ?? false,
        HAS_BOMB_CCRP: JSON?.haveCCRPForBombs ?? false,
        HAS_FUEL_DUMPING: JSON?.fuelDumpingSettings ?? false,
        HAS_TURRET_OPTIC: JSON?.haveOpticTurret ?? false,
        HAS_SHIP_DAMAGE_CONTROL: JSON?.shipDamageControl?.shipDamageControlEnabled ?? false,
        HAS_DRIVER_CAMERA: JSON?.hasDriverCamera ?? true,
        HAS_BINOCULAR_CAMERA: JSON?.hasBinocularCamera ?? true,
        HAS_SNIPER_CAMERA: JSON?.hasSniperView ?? true,
        HAS_VISUAL_DAMAGE_MODEL: JSON?.haveDamageableVisualModel ?? true,
        CAN_DETONATE: JSON?.canMineDetonation ?? false,
        ECS_TEMPLATES: JSON?.ecsTemplate && Array.isArray(JSON?.ecsTemplate) ? Object.values(JSON?.ecsTemplate) : [JSON?.ecsTemplate],

        USE_BOT_FOR_AI: JSON?.useBotForAi ?? false,
        DISABLE_AEROBATIC_SMOKE: JSON?.disableAerobaticsSmoke ?? false,
        CAN_TAKEOFF_WITHOUT_GEAR: JSON?.canTakeoffWithoutGear ?? false,
        CAN_RELOAD_NON_GUNS: JSON?.canReloadNonGuns ?? false,
        IS_SUBMARINE: JSON?.isSubmarine ?? false,
        TURBULENCE_DATA: JSON?.turbulence ?? null,

        CREW: JSON?.tank_crew ?? {},
        WEAPONS: JSON?.commonWeapons ?? JSON?.weapons ?? JSON?.weapon ?? {},
        WEAPON_PRESETS: JSON?.weapon_presets ?? JSON?.WeaponSlots?.WeaponSlot ?? {},
        WEAPON_SLOTS: JSON?.WeaponSlots ?? {},
        AMMO_STOWAGE: JSON?.ammoStowages ?? {},
        ARTILLERY_CLASS: JSON?.support_unit_class ?? null,
        ARTILLERY_TAG: JSON?.support_unit_tag ?? null,
        SUPPORT_PLANE_CLASS: JSON?.supportPlaneClass ?? null,

        MASS: JSON?.mass ?? 0,
        VEHICLE_PHYS: JSON?.VehiclePhys ?? null,
        SUIT_PHYS: JSON?.SuitPhys ?? null,
        SHIP_PHYS: JSON?.ShipPhys ?? null,
        WALKER_PHYS: JSON?.WalkerPhys ?? null,
        BAILOUT_DATA: JSON?.bailout ?? null,
        PARATROOPER_MODEL: JSON?.paratrooper ?? null,
        BREACHES: JSON?.breaches ?? null,
        OXYGEN_SYSTEM_DATA: JSON?.oxygenSystem ?? null,
        SPAWN_COUNT_DATA: JSON?.spawn_count ?? null,

        SENSORS: JSON?.sensors ?? null,
        RWR_INDICATOR: JSON?.rwrIndicator ?? null,
        AI_FIGHT_BEHAVIOUR: JSON?.fightAiBehaviour ?? null,

        DRIVER_OPTICS: JSON?.optics?.driverReticule ?? null,
        TANK_CROSSHAIR_PRESET: JSON?.crosshairPreset ?? null,
        TANK_FORCE_USE_SIGHT: JSON?.forceSetCameraToSight ?? false,

        INFANTRY_SPEED: JSON?.walkSpeed ||
          JSON?.runSpeed ||
          JSON?.rotSpeed ||
          JSON?.sprintSpeed ||
          JSON?.standState ? {
            WALK_SPEED: JSON?.walkSpeed ?? JSON?.standState?.walkSpeed ?? null,
            RUN_SPEED: JSON?.runSpeed ?? JSON?.standState?.runSpeed ?? null,
            SPRINT_SPEED: JSON?.sprintSpeed ?? JSON?.standState?.sprintSpeed ?? null,
            ROTATE_SPEED: JSON?.rotSpeed ?? JSON?.standState?.rotateSpeed ?? null,
            JUMP_STAMINA_DRAIN: JSON?.jumpStaminaDrain ?? null,
            REST_STAMINA_RESTORE: JSON?.restStaminaRestore ?? null,
            SPRINT_STAMINA_DRAIN: JSON?.sprintStaminaDrain ?? null,
          } : null,

        WIKI_DATA: JSON?.wiki ?? {},
        BALANCE_DATA: JSON?.balanceData ?? {},
        MODIFICATIONS: JSON?.modifications ?? {},

        CUSTOM_CLASS_ICO: JSON?.customClassIco ?? null,
        CUSTOM_UNIT_IMAGE: JSON?.customImage ?? null,
        CUSTOM_TOOLTIP_IMAGE: JSON?.customTooltipImage ?? null,

        DP_AIRCRAFT: JSON?.Aircraft ?? null,
        DP_SELF_SEALING: JSON?.SelfSealingTanks ?? null,
        GM_MASS: JSON?.mass ?? null,
        AD_IMGID: null,

        DAMAGE_PARTS: JSON?.DamageParts ?? JSON?.damageParts ?? null,

        FIRE_PARAM_PRESET: JSON?.fireParamsPreset ?? null,
      };

      if(!VALUES.FM_FILE && !VALUES.MODEL && !VALUES.TYPE && !VALUES.TAGS && !VALUES.EXP_CLASS) {
        return null;
      }

      let formatted_weapon_data = [];
      let formatted_preset_data = {};
      let max_armor = {
        turret: {
          front: 0,
          side: 0,
          rear: 0,
        },
        hull: {
          front: 0,
          side: 0,
          rear: 0,
        }
      };

      let sID = id ?? (VALUES.FM_FILE ? VALUES.FM_FILE.split("/") : null);

      if (sID && Array.isArray(sID)) {
        sID = sID.slice(1).join("/");

        let parts = sID.split(".");
        parts.pop();
        sID = parts.join(".");
      };
      if (sID && String(sID.toLowerCase()).startsWith(String(VALUES.MODEL).toLowerCase().slice(0, 3))) {
        id = id ?? sID;
      } else {
        VALUES.AD_IMGID = sID;
        if (sID && (VALUES.AD_IMGID.match(/_/g) || []).length === 1) {
          VALUES.AD_IMGID = VALUES.AD_IMGID.replace("_", "-");
        }

        if (VALUES.MODEL) {
          id = id ?? VALUES.MODEL.toLowerCase();
        }
      };

    let armorData = {};

    function checkArmorBlock(json) {
      if (!json || typeof json !== "object") return; // only recurse into objects
      if (Array.isArray(json)) return;               // skip arrays

      for (const key of Object.keys(json)) {
        const value = json[key];
        const lower = key.toLowerCase();

        const isDmPart = lower.endsWith("_dm");

        if (isDmPart) {
          if (typeof value === "object" && value?.armorThickness != null) {
            armorData[key] = value.armorThickness;
          } else {
            armorData[key] = value;
          }
        }

        else if (typeof value === "object" && value?.armorThickness != null) {
          armorData[key] = value.armorThickness;
        }

        checkArmorBlock(value);
      }
    };

    checkArmorBlock(VALUES.DAMAGE_PARTS);
    /*todo: citadel and tower*/
    Object.keys(armorData).forEach((part) => {
      let armor = armorData[part];
      let thickness = (typeof armor == "number" ? armor : armor?.armorThickness);
      
      if(thickness > 0) {
        let name = part.toLowerCase().replaceAll("_dm", "");
        if((name.startsWith("body_") || name.startsWith("superstructure_")) && (name.endsWith("front")))
          max_armor.hull.front = (thickness > max_armor.hull.front ? thickness : max_armor.hull.front);
        if((name.startsWith("body_") || name.startsWith("superstructure_")) && (name.endsWith("back") ||name.endsWith("rear")))
          max_armor.hull.rear = (thickness > max_armor.hull.rear ? thickness : max_armor.hull.rear);
        if((name.startsWith("body_") || name.startsWith("superstructure_")) && (name.endsWith("side")))
          max_armor.hull.side = (thickness > max_armor.hull.side ? thickness : max_armor.hull.side);
        if((name.startsWith("turret_")) && (name.endsWith("front")) | name.startsWith("gun_mask"))
          max_armor.turret.front = (thickness > max_armor.turret.front ? thickness : max_armor.turret.front);
        if((name.startsWith("turret_")) && (name.endsWith("back")||name.endsWith("rear")))
          max_armor.turret.rear = (thickness > max_armor.turret.rear ? thickness : max_armor.turret.rear);
        if((name.startsWith("turret_")) && (name.endsWith("side")))
          max_armor.turret.side = (thickness > max_armor.turret.side ? thickness : max_armor.turret.side);
      }
    });


    let weaponPresetData = Array.isArray(VALUES.WEAPON_PRESETS) ?
        VALUES.WEAPON_PRESETS :
        VALUES.WEAPON_PRESETS?.preset ? [VALUES.WEAPON_PRESETS.preset] :
        Object.values(VALUES.WEAPON_PRESETS || {});

      weaponPresetData?.forEach?.((preset) => {
        let preset_id = preset.name ?? preset.id ?? preset.blk;
        if (!preset || !preset_id) return;

        formatted_preset_data[preset_id] = {
          blk: preset.blk ?? preset.id ?? null,
          tags: preset.tags ?? {},
          reqModification: preset.reqModification ?? null,
        };

        if (preset_id.toLowerCase().endsWith("_default")) {
          let pID = preset_id.replace(/_default/d, "");
          if (pID.length > 0 && ((id.toLowerCase().startsWith(pID.toLowerCase().slice(0, 1) ?? id)) || pID.length / id.length > 1.7) && !WPC[pID]) {
            id = pID;
          }
        }
      });

      let weaponData = Array.isArray(VALUES.WEAPONS) ?
        VALUES.WEAPONS :
        VALUES.WEAPONS?.Weapon ?
        Array.isArray(VALUES.WEAPONS.Weapon) ?
        VALUES.WEAPONS.Weapon : [VALUES.WEAPONS.Weapon] :
        Object.values(VALUES.WEAPONS || {});

      weaponData.forEach((weapon) => {
        if (!weapon) return;
        const triggerGroupMap = {
          primary: "primary",
          secondary: "secondary",
          tertiary: "secondary",
          quaternary: "secondary",
          melee: "special",
          grenade: "special",
          coaxial: "coaxial",
          machinegun: "machinegun",
          "machine gun": "machinegun",
          special: "special",
          mortar: "mortar",
          torpedoes: "torpedoes",
          torpedo: "torpedoes",
          depth_charge: "depth_charge",
          smoke: "smoke",
          mine: "mine",
          mines: "mine",
          bombs: "bombs",
          bomb: "bombs",
        };
        const group =
          triggerGroupMap[(weapon.triggerGroup || "primary").toLowerCase()] ||
          "primary";

        let gunnerNumber = String(weapon.trigger ?? "gunner0");
        let bullets = weapon.bullets;
        let isCannon = (group != "machinegun" && group != "bombs" && group != "coaxial") && !!(weapon.breechDP ?? weapon.yawSpdLowBattery ?? weapon.pitchSpdLowBattery ?? (weapon.aimingFromBoneGun != null && weapon.aimingFromBoneGun != undefined));

        if (isNaN(bullets) || bullets == null || bullets == undefined)
          bullets = weapon.numSpareMagazines >= 0 ? weapon.numSpareMagazines + 1 : 1;
        gunnerNumber = gunnerNumber?.split("gunner");
        gunnerNumber = gunnerNumber?.slice(1);

        if (gunnerNumber?.length > 1)
          gunnerNumber = 0;

        gunnerNumber = gunnerNumber?.join("");
        formatted_weapon_data.push({
          trigger: weapon.trigger ?? "gunner0",
          triggerGroup: group,
          blk: weapon.blk ?? weapon.name,
          reloadTime: weapon.reloadTime ??
            weapon.jammedReloadTime ??
            (weapon.shotFreq ? 1 / weapon.shotFreq : weapon.DelayAfterShoot) ??
            null,
          turretSpeed: [weapon.speedYaw ?? null, weapon.speedPitch ?? null],
          recoilMultiplier: weapon.recoilMultiplier ?? 1,
          autoLoader: weapon.autoLoader ?? false,
          defaultYaw: weapon.defaultYaw ?? 1,
          defaultPitch: weapon.defaultPitch ?? 1,
          limits: weapon.limits ? {
            yaw: {
              min: weapon.limits?.yaw?.[0]??0, 
              max: weapon.limits?.yaw?.[1]??0
            },
            pitch: {
              min: weapon.limits?.pitch?.[0]??0, 
              max: weapon.limits?.pitch?.[1]??0
            },
          } : null,
          bullets: bullets,
          dm: weapon.dm,
          gunDm: weapon.gunDm,
          gunnerDm: weapon.gunnerDm,
          turret: weapon.turret,
          limitsDeadzone: weapon.limitsDeadzone,
          limitsTable: weapon.limitsTable,
          gunStabilizer: weapon.gunStabilizer,
          emitter: weapon.emitter || weapon.shootNode,
          flash: weapon.flash,
          useDataAsMain: !!(gunnerNumber < 1) && !weapon.gunnerDm,
          type: group == "machinegun" ? "mgun" : isCannon ? "cannon" : (gunnerNumber >= 1 ?? weapon.gunnerDm) ? "gunner" : "unknown",
        });
      });

      let unit_tags = {
        ...VALUES.TAGS,
      };
      let unitCountry = null;
      let unitOperatorCountry = null;

      Object.keys(unit_tags).forEach((tag) => {
        const value = unit_tags[tag];
        if (!unitCountry && tag.toLowerCase().startsWith("country_"))
          unitCountry = tag.toLowerCase();
        if (!unitOperatorCountry) unitOperatorCountry = tag.toLowerCase();
      });

      if (!unitCountry && id) {
        const prefixes = {
          us_: "country_usa",
          germ_: "country_germany",
          ussr_: "country_ussr",
          uk_: "country_britain",
          jp_: "country_japan",
          cn_: "country_china",
          fr_: "country_france",
          it_: "country_italy",
          il_: "country_israel",
          sw_: "country_sweden",
          uss_: "country_usa",
          ijn_: "country_japan"
        };
        for (const p in prefixes) {
          if (id.toLowerCase().startsWith(p)) {
            unitCountry = prefixes[p];
            break;
          }
        }
        if (!unitCountry) unitCountry = "country_usa";
      }

      let typesArray = Array.isArray(VALUES.TYPE) ? VALUES.TYPE : [VALUES.TYPE];
      let typeMap = {
        typeLightTank: "type_light_tank",
        typeMediumTank: "type_medium_tank",
        typeHeavyTank: "type_heavy_tank",
        typeTankDestroyer: "type_tank_destroyer",
        typeSPAA: "type_spaa",
        typeShip: "type_ship",
        typeTorpedoBoat: "type_torpedo_boat",
        typeGunBoat: "type_gun_boat",
        typeDestroyer: "type_destroyer",
        typeTorpedoGunBoat: "type_torpedo_gun_boat",
        typeNavalFerryBarge: "type_naval_ferry_barge",
        typeSubmarineChaser: "type_submarine_chaser",
        typeMinelayer: "type_minelayer",
        typeStormovik: "type_strike_aircraft",
        typeBomber: "type_bomber",
        typeTransport: "type_transport",
        typeFighter: "type_fighter",
        typeDiveBomber: "type_dive_bomber",
        exp_SPAA: "type_spaa",
        exp_ai_sam_tracking_radar: "type_light_tank",
        exp_tank: "type_light_tank",

      };

      let vehicle_blk_types = typesArray.map((t) => typeMap[t] || t);

      vehicle_blk_types.forEach((t) => {
        if (!unit_tags[t]) unit_tags[t] = true;
      });

      const is_human = !!VALUES.INFANTRY_SPEED;

      const is_ship =
        true;

      const is_tank = !!VALUES.TANK_CROSSHAIR_PRESET ||
        !!VALUES.TANK_FORCE_USE_SIGHT ||
        !!VALUES.SUIT_PHYS ||
        !!VALUES.WALKER_PHYS ||
        !!VALUES.AMMO_STOWAGE ||
        (VALUES.DRIVER_OPTICS !== undefined && VALUES.SIGHT_NAME !== undefined) ?
        !unit_tags?.["type_fighter"] &&
        !unit_tags?.["type_bomber"] &&
        !unit_tags?.["type_strike_aircraft"] &&
        !unit_tags?.["type_transport"] &&
        !unit_tags?.["type_dive_bmober"] :
        false;

      const is_plane = !!VALUES.FM_FILE ||
        !!VALUES.BAILOUT_DATA ||
        !!VALUES.CAN_TAKEOFF_WITHOUT_GEAR ||
        !!VALUES.CUTTING ?
        !unit_tags?.["type_light_tank"] &&
        !unit_tags?.["type_medium_tank"] &&
        !unit_tags?.["type_heavy_tank"] &&
        !unit_tags?.["type_football_tank"] &&
        !unit_tags?.["type_missile_tank"] &&
        !unit_tags?.["type_spaa"] &&
        !unit_tags?.["type_SPAA"] &&
        !unit_tags?.["type_tank_destroyer"] :
        false;

      const unit_type = is_human ? "human" : is_tank ? "tank" : is_plane ? "plane" : is_ship ? "ship" : "tank"; /*human , plane , tank , ship , helicopter*/

      id = id ?? `vehicle_${Math.floor(Math.random()*2048)}`;

      let primaryWeapon =
        formatted_weapon_data.find((w) => w.triggerGroup === "primary" || w.useDataAsMain == true) ||
        formatted_weapon_data[0] ||
        null;

      let fData = {
        horsePowers: VALUES?.VEHICLE_PHYS?.engine?.horsePowers ?? null,
        rpm: VALUES?.VEHICLE_PHYS?.engine?.maxRPM ?? VALUES?.VEHICLE_PHYS?.engine?.minRPM ?? null,
        mass: VALUES?.VEHICLE_PHYS?.Mass?.Empty ?? VALUES?.WIKI_DATA?.general?.normalWeight ?? VALUES?.WIKI_DATA?.general?.emptyWeight ?? VALUES.GM_MASS ?? null,
        rollRate: VALUES?.WIKI_DATA?.performance?.table?.rollRate ?? null,
        takeoffDistance: VALUES?.WIKI_DATA?.performance?.table?.takeoffDistance ?? null,
        powerToWeightRatio: VALUES?.WIKI_DATA?.performance?.table?.thrustToWeightRatio ?? VALUES?.WIKI_DATA?.performance?.table?.powerToWeightRatio ?? null,
        wingLoading: VALUES?.WIKI_DATA?.performance?.table?.wingLoading ?? null,
        maxAltitude: VALUES?.WIKI_DATA?.performance?.table?.ceiling ?? null,
        climbSpeed: VALUES?.BALANCE_DATA?.climbSpeed ?? null,
        maxSpeed: VALUES?.BALANCE_DATA?.maxSpeed ?? null,
        turnTime: VALUES?.BALANCE_DATA?.turnTime ?? null,
        gunnersCount: VALUES?.DP_AIRCRAFT?.gunnersCount ?? null,
        modifications: VALUES.MODIFICATIONS ?? null,
        reqAir: "",
        country: unitCountry ?? null,
        operatorCountry: unitOperatorCountry ?? null,
        type: unit_type ?? "tank",
        customClassIco: VALUES.CUSTOM_CLASS_ICO ?? null,
        customTooltipImage: VALUES.CUSTOM_TOOLTIP_IMAGE ?? null,
        customImage: VALUES.CUSTOM_UNIT_IMAGE ?? null,
        speed: Number((VALUES.FIRE_PARAM_PRESET?.match(/[0-9.-]+/m) ?? [])[0] ?? 50) ?? 50,
        weaponPresets: formatted_preset_data ?? null,
        bulletsIconParam: primaryWeapon?.bullets ?? null,
        turretSpeed: primaryWeapon?.turretSpeed ?? null,
        angleVerticalGuidance: primaryWeapon?.limits?.pitch ?? null,
        armorThicknessHull: max_armor.hull,
        armorThicknessTurret: max_armor.turret
      };

      if (formatted_weapon_data?.length > 0) {
        let ps = {};
        formatted_weapon_data.forEach((weapon) => {
          let id = (weapon.blk ?? "").split("/").pop().replace(/\.[^.]+$/, "");
          if (ps[id] == undefined || ps[id] == null || isNaN(ps[id]))
            ps[id] = weapon.bullets ?? 1;
        });
        fData.bulletsIconParams = ps;
      };

      if (primaryWeapon) fData[`reloadTime_${primaryWeapon.type}`] = primaryWeapon.reloadTime;

      if (!fData.customClassIco && !fData.customTooltipImage && !fData.customImage)
        fData.unitForImg = VALUES.AD_IMGID ?? null;


      let V_WPC = {};
      let V_UT = {
        hangar_place: unit_type,
        type: unit_type,
        tags: unit_tags,
        //testFlight:...
        Shop: {},
      };
      let V_TT = {
        rank: 1,
        ...(FT.has(VALUES?.AD_IMGID ?? "") ? FT.get(VALUES?.AD_IMGID ?? "") : {}),
        reqAir: ""
      };

      delete V_TT?.event;
      delete V_TT?.gift;
      delete V_TT?.reqFeature;
      delete V_TT?.reqUnlock;
      delete V_TT?.isCrossPromo;
      delete V_TT?.isClanVehicle;
      delete V_TT?.slaveUnit;
      delete V_TT?.hideFeature;
      delete V_TT?.marketplaceItemdefId;

      Object.keys(fData).forEach((key) => {
        let value = fData[key];

        if (value != null && value != undefined) {
          switch (key) {
          case "mass":
            V_WPC.mass = value;
            break;
          case "rollRate":
            V_UT.Shop.rollRate = value;
            break;
          case "powerToWeightRatio":
          case "thrustToWeightRatio":
            V_UT.Shop.powerToWeightRatio = value;
            break;
          case "wingLoading":
            V_UT.Shop.wingLoading = value;
            break;
          case "maxAltitude":
            V_UT.Shop.maxAltitude = value;
            break;
          case "climbSpeed":
            V_UT.Shop.climbSpeed = value;
            break;
          case "maxSpeed":
            V_UT.Shop.maxSpeed = value;
            break;
          case "turnTime":
            V_UT.Shop.turnTime = value;
            break;
          case "maxSpeedAlt":
            V_UT.Shop.maxSpeedAlt = value;
            break;
          case "climbTime":
            V_UT.Shop.climbTime = value;
            break;
          case "climbAlt":
            V_UT.Shop.climbAlt = value;
            break;
          case "gunnersCount":
          case "gunnerCount":
            V_WPC.gunnersCount = value;
            break;
          case "takeoffDistance":
          case "airfieldLen":
            V_UT.Shop.airfieldLen = value;
            break;
          case "modifications":
            V_WPC.modifications = value;
            break;
          case "reqAir":
            V_WPC.reqAir = value;
            V_TT.reqAir = value;
            break;
          case "rank":
            V_WPC.rank = value;
            V_TT.rank = value;
            break;
          case "economicRank":
            V_WPC.economicRank = value;
            V_TT.economicRank = value;
            break;
          case "value":
            V_WPC.value = value;
            V_TT.value = value;
          case "costGold":
            V_WPC.costGold = value;
            V_TT.costGold = value;
          case "country":
            V_WPC.country = value;
            break;
          case "operatorCountry":
            V_UT.operatorCountry = value;
            break;
          case "type":
            V_UT.type = value;
            break;
          case "unitForImg":
            V_WPC.unitForImg = value;
            break;
          case "customClassIco":
            V_WPC.customClassIco = value;
            break;
          case "customTootipImage":
            V_WPC.customTooltipImage = value;
            break;
          case "customImage":
            V_WPC.customImage = value;
            break;
          case "speed":
            V_WPC.speed = value;
            break;
          case "weaponPresets":
            V_WPC.weapons = value;
            break;
          case "bulletsIconParam":
            V_WPC.bulletsIconParam = value;
            break;
          case "bulletsIconParams":
            V_WPC.bulletsIconParams = value;
            break;
          case "turretSpeed":
            V_WPC.turretSpeed = value;
            break;
          case "angleVerticalGuidance":
          case "verticalGuidance":
            V_UT.Shop.angleVerticalGuidance = value;
            break;
          case "armorThicknessHull":
            if(value?.front > 0 || value?.side > 0 || value?.rear > 0) {
              V_UT.Shop.armorThicknessHull = [value.front, value.side, value.rear];
            }
            break;
          case "armorThicknessTurret":
            if(value?.front > 0 || value?.side > 0 || value?.rear > 0) {
              V_UT.Shop.armorThicknessTurret = [value.front, value.side, value.rear];
            }
            break;
          case "horsePowers":
            V_UT.Shop.horsePowers = value;
          case "rpm":
            V_UT.Shop.rpm = value;
          };

          if (key.toLowerCase().startsWith("reloadtime_")) {
            V_WPC[key] = value;
          }
        }
      })

      return {
        unit: new Unit(id ?? "vehicle_0", {
          WPC: V_WPC,
          UT: V_UT,
          TT: V_TT,
        }),
        WPC: V_WPC,
        UT: V_UT,
        TT: V_TT,
        unitId: id
      };
    };

    const import_units =  async () => {
      let ct = {}
      let content = await folder_to_json(true, true);
      let files = content?.flatFileList ?? [];

      files.forEach((file) => {
        let id = file?.name ?? null;
        let data = file?.fileData ?? file?.data;

        if(data && !WPC[id] && !UT[id]) {
          if(data.includes("model:t") || data.includes("hasExpl:b") || data.includes("type:t") || data.includes("subclass:t") || data.includes("expClass:t")) {
            ct[id ?? Math.floor(Math.random()*2048)] = data;
          }
        };
      });

      if(window.test_custom_tt) {
        window.test_custom_tt(ct);
      }

      return ct;
    };

    window.unit_from_blk = unit_from_blk;
    window.importUnits = import_units;
    window.TechTree = TechTree;

    Unit.Utilities = {
      viewable_in_list: findUnviewable
    }

    return Unit;
  })({
    wpcost: wpcost,
    unitTags: unitTags,
    unitNames: unitNames,
    modData: modData,
    operatorNames: operatorNames,
    modNames: modNames,
    techTree: techTree,
    menuNames: menuCsv || window.menuNames,
    weaponNames: weaponCsv || window.weaponNames,
    lang: lang ?? "<English>",
  });
  window.Unit = Unit;

  return {
    Unit: Unit,
  };
};
