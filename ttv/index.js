/*this is also in an older format, will be improved later, but it gets the job done */
const CONFIG = {
  DEBUG: true,
  USE_CLASSIC_GRID: false,
  DEFAULT_COUNTRY: "country_usa",
  DEFAULT_TYPE: "army",
  DEFAULT_LANG: "<English>",
  GRID_CELL_SIZE: {
    width: "70px",
    height: "14px"
  },
  RAINBOW_COLORS: [
        "red", "orange", "yellow", "green", "cyan",
        "blue", "purple", "magenta"
    ]
};

(async function (_debug = false) {
  try {
    if (!window.wt_tools) throw new Error("WT TOOLS not activated!");
    const delay = async (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    await delay(1);

    const wpcost = await wt_tools.new.wt.get_wpcost();
    const unitTags = await wt_tools.new.wt.get_unittags();
    let [techTree, unitNames, modNames, operatorNames, modData, menuCsv, weaponCsv] =
    await Promise.all([
      wt_tools.new.wt.get_techtree(),
      wt_tools.new.wt.get_units_csv(),
      wt_tools.new.wt.get_mods_csv(),
      wt_tools.new.wt.get_menuOptions_csv(),
      wt_tools.new.wt.get_modifications(),
      wt_tools.new.wt.get_menu_csv(),
      wt_tools.new.wt.get_weapons_csv()
    ]);

    let selected_nation = document.querySelector("#sel_nation");
    let selected_tree = document.querySelector("#sel_tree");
    let vehicle_search = document.querySelector("#select_vehicle");
    //let vehicleList_elem = document.querySelector("#vehicle_list");
    let vehicle_previewButton = document.querySelector("#vehicle_preview");
    let available_subTrees = [];
    let country = CONFIG.DEFAULT_COUNTRY;
    let type = CONFIG.DEFAULT_TYPE;
    let lang = CONFIG.DEFAULT_LANG;
    let vehicles = [];
    let all_vehicles = [];
    let non_techTree_vehicles = [];
    let selectedCell = null;


    window.wpcost = wpcost;
    window.lang = lang;
    window.unitTags = unitTags;
    window.techTree = techTree;
    window.unitNames = unitNames;
    window.modNames = modNames;
    window.operatorNames = operatorNames;
    window.modData = modData;
    window.menuCsv = menuCsv;
    window.weaponCsv = weaponCsv;

    SETUP_UNIT();

    function formatPrice(value) {
      if (typeof value !== "number") return value;
      return value.toLocaleString("en-US");
    }

    function getTags(vehUnitTags = {}) {
      const tags = {};
      if (vehUnitTags.tags) {
        for (const [tag, value] of Object.entries(vehUnitTags.tags)) {
          tags[tag] = !!value;
        }
      }
      return tags;
    }

    function getVehicleColor(meta, data, title) {
      if (!meta) return "white";
      if (meta.isSquadronVehicle || meta.isSquadron) return "green";
      if (meta.isHidden || data.hidden) return "grey";
      if (meta.isPromo) return "purple";
      if (meta.purchaseWindow) return "yellow";
      if (meta.isMarketplace) return "orange";
      if (title) return "#B7F1F4";
      return "white";
    }

    function collect_vehicles(vList) {
      if (!vList) {
        return null
      };
      if (vList.range) vList = vList.range;
      for (const [name, data] of Object.entries(vList)) {
        if (!data || typeof data !== "object") continue;
        if (data.vehicles && typeof data.vehicles === "object")
          collect_vehicles(data.vehicles);
        if (data.group == null || data.group == undefined) {
          collect_vehicles(data);
          continue
        };
        let veh = new Unit(name, data);
        if (veh) vehicles.push(veh);
      }
    }

    function generateOtherTechTree() {
      let premX = [5, 6];
      let maxPerColumn = 5;

      let xPos = {
        type_human: [2, 3, 0],
        type_light_tank: [0],
        type_medium_tank: [1],
        type_heavy_tank: [2],
        type_tank_destroyer: [4],
        type_missile_tank: [4],
        type_destroyer: [0, 1, 2],
        type_light_cruiser: [1],
        type_heavy_cruiser: [2],
        type_battlecruiser: [2],
        type_boat: [0, 1, 3, 2, 4],
        type_torpedo_boat: [0, 1],
        type_gun_boat: [0, 2],
        type_submarine_chaser: [1, 2],
        type_heavy_boat: [0, 1],
        type_frigate: [0, 1],
        type_fighter: [0, 1],
        type_interceptor: [0, 1],
        type_naval_aircraft: [2],
        type_strike_aircraft: [3],
        type_assault: [3],
        type_light_bomber: [3, 4],
        type_bomber: [4],
        type_torpedo: [3, 4],
        type_transport: [3, 4]
      };

      let sTT = {
        army: {
          range: []
        },
      };

      const romanToInt = (r) => {
        if (typeof r === "number") return r;
        let map = {
          I: 1,
          V: 5,
          X: 10,
          L: 50,
          C: 100,
          D: 500,
          M: 1000
        };
        let total = 0;
        for (let i = 0; i < r.length; i++) {
          let curr = map[r[i]];
          let next = map[r[i + 1]] || 0;
          total += curr < next ? -curr : curr;
        }
        return total || 1;
      };

      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

      let columnCount = {
        army: [0, 0, 0, 0, 0],
        aviation: [0, 0, 0, 0, 0],
        boats: [0, 0, 0, 0, 0],
        helicopters: [0, 0, 0, 0, 0],
        ships: [0, 0, 0, 0, 0],
        fleet: [0, 0, 0, 0, 0],
        humans: [0, 0, 0, 0, 0],
      };

      non_techTree_vehicles.forEach((vehicle) => {
        let id = (typeof vehicle == 'string' ? vehicle : vehicle?.id ?? vehicle?.unitId ?? vehicle?.vehId ?? vehicle?.getUnitId?.() ?? "");
        let unit = new Unit(id);
        let name = unit.getUnitShopName() ?? vehicle;
        let type = unit.getUnitType()?.treeType ?? "army";
        if (!sTT?.[type])
          sTT[type] = {
            range: []
          };
        let rank = unit.getUnitRank() ?? "I";
        let roles = unit.getUnitRole()?.array ?? unit.getUnitRole();
        let br = unit.getUnitBattleRating() ?? "1.0";
        let isPremium = unit.getUnitOtherInfo()?.isPremium ?? false;
        let isSquadron = unit.getUnitOtherInfo()?.isSquadronVehicle ?? false;

        if (!Array.isArray(roles)) roles = roles ? [roles] : [];
        if (roles.length === 0) roles = ["type_light_tank"];

        let selRole = pick(roles);

        let x = unit.techTreePosition?.relativeX ?? unit.techTreePosition?.x ?? null;
        if (isPremium || isSquadron) {
          x = x ?? pick(premX);
        } else {
          x = x ?? xPos[selRole] ? pick(xPos[selRole]) : Math.floor(Math.random() * 5);
        }

        let y = unit.techTreePosition?.y ?? null;

        if (isPremium || isSquadron) {
          y = y ?? sTT[type].range.length;
        } else {
          let count = columnCount[type][x];
          y = y ?? Math.floor(count / maxPerColumn);
          columnCount[type][x]++;
          if (!sTT[type].range[y]) sTT[type].range[y] = {};
        }

        if (!sTT[type].range[y]) sTT[type].range[y] = {};

        sTT[type].range[y][id] = {
          rank: romanToInt(rank),
          x,
          y,
          br
        };
      });
      return sTT;
    }

    async function SETUP_INPUTS() {

      all_vehicles = [];
      allTags = [];

      Object.keys(wpcost || []).forEach((vehId) => {
        let vehVal = wpcost[vehId];
        if (!all_vehicles.includes(vehId) && (vehVal.value || vehVal.trainCost || vehVal.rank)) {
          all_vehicles.push(vehId)
        }
      });
      Object.keys(unitTags || []).forEach((vehId) => {
        let vehVal = unitTags[vehId];
        if (!all_vehicles.includes(vehId) && vehVal.tags) {
          all_vehicles.push(vehId);
          let tgs = unitTags[vehId];
          if(tgs) {
            Object.keys(tgs?.tags)?.forEach?.((tag) => {
              if(!allTags.includes(tag))
                allTags.push(tag);
            });
          };
        };
      });
      setTimeout(console.log(allTags), 100);

      Object.keys(techTree).forEach((c) => {
        techTree[c].army = techTree[c].army || {
          range: []
        };
        techTree[c].aviation = techTree[c].aviation || {
          range: []
        };
        techTree[c].helicopters = techTree[c].helicopters || {
          range: []
        };
        techTree[c].ships = techTree[c].ships || {
          range: []
        };
        techTree[c].boats = techTree[c].boats || {
          range: []
        };
      })
      let func = Unit?.Utilities?.viewable_in_list;
      let data = (func ? await func(all_vehicles) : null);

      if (data) non_techTree_vehicles = [...non_techTree_vehicles ?? [], ...data?.notInTechTree ?? [], ...data?.notInTechTree_wishlist ?? [], ...data?.notViewable ?? []];
      if (!non_techTree_vehicles) {
        all_vehicles.forEach((id) => {
          let unit = new Unit(id);
          if (unit.getUnitIsHidden() && !unit.getUnitIsTechTree() && !all_vehicles.includes(id)) non_techTree_vehicles.push(id);
        })
      };

      non_techTree_vehicles = [...new Set(non_techTree_vehicles)];

      let sTT = generateOtherTechTree();
      techTree.country_other = sTT;

      if (selected_nation && selected_tree) {
        selected_nation.innerHTML = "";
        selected_tree.innerHTML = "";
        selected_nation.removeAttribute("disabled");
        selected_tree.removeAttribute("disabled");
        selected_nation.innerHTML = ``;
        selected_tree.innerHTML = ``;

        Object.keys(techTree || []).forEach((nation_name) => {
          let value = techTree[nation_name];
          if (nation_name.startsWith("country_")) {
            let option = document.createElement("option");
            option.value = nation_name;
            option.textContent = operatorNames?.[nation_name]?.[lang] ||
              operatorNames?.[`unlockTag/${nation_name}`]?.[lang] || (nation_name == "country_other" ? "Other" : nation_name);
            selected_nation.appendChild(option);

            Object.keys(typeof value == "object" ? value : []).forEach((subTree_name) => {
              if (!available_subTrees.includes(subTree_name)) available_subTrees.push(subTree_name)
            });
          }
        });

        available_subTrees.forEach((subTree) => {
          let option = document.createElement("option");
          let subTree_name = subTree;

          switch (subTree_name) {
          case "boats":
            subTree_name = "Coastal fleet";
            break;
          case "ships":
            subTree_name = "Bluewater fleet";
            break;
          case "army":
            subTree_name = "Ground vehicles";
            break;
          case "aviation":
            subTree_name = "Aviation";
            break;
          case "helicopters":
            subTree_name = "Helicopters";
            break;
          case "fleet":
            subTree_name = "Fleet";
            break;
          }

          option.value = subTree;
          option.textContent = subTree_name;
          selected_tree.appendChild(option);
        });
      }
      if (vehicle_search /*&& vehicleList_elem*/ && vehicle_previewButton) {
        vehicle_search.innerHTML = "";
        //vehicleList_elem.innerHTML = "";
        vehicle_search.removeAttribute("disabled");
        /*all_vehicles.forEach((vehId) => {
          let option = document.createElement("option");
          let unitName = (
            unitNames?.[`${vehId}_0`]?.[lang] ||
            unitNames?.[`${vehId}_shop`]?.[lang] ||
            unitNames?.[`${vehId}_1`]?.[lang] ||
            unitNames?.[`${vehId}_2`]?.[lang] ||
            unitNames?.[vehId]?.[lang],
            unitNames?.__lowerCaseUnits__?.[`${vehId}_0`]?.[lang] ||
            unitNames?.__lowerCaseUnits__?.[`${vehId}_shop`]?.[lang] ||
            unitNames?.__lowerCaseUnits__?.[`${vehId}_1`]?.[lang] ||
            unitNames?.__lowerCaseUnits__?.[`${vehId}_2`]?.[lang] ||
            unitNames?.__lowerCaseUnits__?.[vehId]?.[lang] ||
            vehId
          )?.replaceAll(`""`, `"`);
          option.value = vehId;
          option.textContent = unitName || vehId;
          vehicleList_elem.appendChild(option);
        });*/

        vehicle_search.addEventListener("change", (e) => {
          searchUnits(e?.target?.value ?? "");
          if (all_vehicles.includes(e?.target?.value)) {
            let vehId = e?.target?.value;
            vehicle_previewButton.removeAttribute("disabled");
          } else {
            vehicle_previewButton.setAttribute("disabled", "");
          }
        });

        vehicle_search.addEventListener("click", (e) => {
          if (e?.target?.value != "" && e?.target?.value) searchUnits(e?.target?.value ?? "");
          else searchUnits("");
        })

        vehicle_previewButton.addEventListener('click', (e) => {
          let vehId = vehicle_search.value;
          if (all_vehicles.includes(vehId)) {
            console.log(new Unit(vehId));
            if (window.Tooltip) return void new window.Tooltip(vehId);
            if (window.createUnitTooltip) return void window.createUnitTooltip(vehId);
          }
        });
      };

    };

    await SETUP_INPUTS();

    let layout = await wt_tools.new.wt.get_techtree_layout(techTree);
    let dt = layout[country]?.[type];

    collect_vehicles(dt);

    function render_grid() {
      if (!vehicles?.length || vehicles?.length == 0)
        return false;

      if (!CONFIG?.USE_CLASSIC_GRID) {
        if ("TechTree" in window) {
          document.querySelector(".wt-tree_instance")?.remove();
          let tt = new TechTree(vehicles, {
            container: document.querySelector(".wt-tree_wrapper") ?? document.body
          });
          window.ActiveTechTree = tt;
          return true;
        } else {
          document.querySelector(".wt-tree_wrapper")?.remove();
        }
      } else {
        document.querySelector(".wt-tree_wrapper")?.remove();
      }
      const max_x = Math.max(...vehicles.map((v) => v?.x || v?.techTreePosition?.x));
      const max_y = Math.max(...vehicles.map((v) => v?.y || v?.techTreePosition?.y));
      const grid = Array.from({
          length: max_y + 1
        },
        () => Array(max_x + 1).fill(null),
      );

      for (const v of vehicles) {
        let pos = null;
        if (v.x != null && v.y != null) pos = {
          x: v.x,
          y: v.y
        };
        else {
          pos = v.techTreePosition
        };
        if (pos.x >= 0 && pos.y >= 0) grid[pos.y][pos.x] = v;
      };

      const tbl = document.createElement("table");
      tbl.style.borderCollapse = "collapse";
      tbl.style.fontSize = "8px";

      for (let y = 0; y <= max_y; y++) {
        const tr = document.createElement("tr");
        for (let x = 0; x <= max_x; x++) {
          const td = document.createElement("td");
          td.style.border = "0.25px solid white";
          td.style.width = CONFIG.GRID_CELL_SIZE.width;
          td.style.height = CONFIG.GRID_CELL_SIZE.height;
          td.style.textAlign = "center";
          td.style.verticalAlign = "middle";

          const cell = grid[y][x];
          td._cellData = cell;
          if (cell) {
            td.style.color =
              cell.getUnitIsHidden() ? "grey" :
              cell.getUnitIsPromo() ? "purple" :
              cell.getUnitIsSquadron() ? "green" :
              cell.getUnitOtherInfo()?.isPremium ? "orange" :
              cell.getUnitOtherInfo()?.isNew ? "yellow" :
              cell.getUnitIsFuture() ? "cyan" :
              "white";
            td.textContent = cell.getUnitShopName();
            td.setAttribute("title", cell.getUnitBasicRole() || "");

            td.onclick = async function () {
              const lines = [];

              function add(label, value, color = "#00bfff") {
                if (value !== undefined && value !== null && value !== "")
                  lines.push({
                    label,
                    value,
                    color
                  });
              }

              add(" Unit", cell.getUnitName(), "#7fff00");
              add(" ID", cell.getUnitId(), "#ffcc00");
              add(" Main Role", cell.getUnitBasicRole(), "orange");
              add(" Viewable", cell.getUnitIsViewable(), "yellow");
              add(" BR", cell.getUnitBattleRating(), "blue");


              console.clear();
              const formatted = lines.map(() => "%c%s: %c%s").join("\n");
              const args = [];
              for (const l of lines)
                args.push(`color:${l.color};font-weight:bold;`, l.label, "color:white;", l.value);
              console.log(formatted, ...args);
            };
          } else td.textContent = "";
          tr.appendChild(td);
        }
        tbl.appendChild(tr);
      }

      document.querySelector(".table-container").appendChild(tbl);
      return true;
    }

    function refreshGrid() {
      document.querySelector("table")?.remove();
      vehicles = [];

      let newNation = selected_nation.value;
      let newType = selected_tree.value;
      let newDt = layout?.[newNation]?.[newType];

      if (!newDt) {
        console.warn("No tree for", newNation, newType);
        return false;
      };

      newDt = newDt?.range || newDt;
      if (!!newDt) collect_vehicles(newDt);
      if (!!newDt) render_grid();
    }

    selected_nation.addEventListener("change", (e) => {
      let v = techTree[e?.target?.value ?? selected_nation.value] ?? {};
      Array.from(selected_tree?.children ?? []).forEach((el) => {
        let eV = el?.value ?? "";
        if (!v[eV] || v[eV]?.range?.length < 1) {
          el?.setAttribute?.("disabled", "true");
        } else {
          el?.removeAttribute?.('disabled');
        }
      });
      if (selected_tree?.querySelector?.(`[value=${selected_tree?.value??""}`)?.getAttribute("disabled")) {
        selected_tree.value = "aviation";
      }
      refreshGrid();
    });
    selected_tree.addEventListener("change", refreshGrid);

    document.addEventListener("click", function (e) {

      if (e?.target && e.target.tagName === "TD" && e.target.textContent.trim() !== "") {
        const td = e.target;
        if (td._cellData) {
          searchUnits("");
          if (window.Tooltip) return void new window.Tooltip(selectedCel?.getUnitId() ?? selectedCell?.id ?? selectedCell);
          if (window.createUnitTooltip) return void window.createUnitTooltip(selectedCell?.getUnitId() ?? selectedCell?.id ?? selectedCell);
          return true;
        }
      };
      let item = e?.target?.closest(".wt-tree_item") ?? e?.target?.closest(".wt-tree_item--prem") ?? e?.target?.closest(".wt-tree_item--squad") ?? e?.target?.closest(".wt-tree_item--broken")
      if (!item) return false;

      let id = item.getAttribute("data-unit-id");
      if (id) {
        console.clear();
        console.log(new Unit(id));
        searchUnits("");

        if (window.Tooltip) return void new window.Tooltip(id);
        if (window.createUnitTooltip) return void window.createUnitTooltip(id);
        return true;
      };
      return false;
    });

    async function reload_techTree() {
      selected_nation?.addAttribute?.("disabled");
      selected_tree?.addAttribute?.("disabled");
      vehicle_search?.addAttribute?.("disabled");
      techTree = window.techTree ?? techTree;
      
      layout = await wt_tools.new.wt.get_techtree_layout(techTree);
      await SETUP_INPUTS();
      return true;
    };

    async function test_custom_tt(blk) {
      let list = {};
      techTree.country_dev = techTree.country_dev ?? {
        army: {range: []},
        aviation: {range: []}
      };
      if(Array.isArray(blk)) {
        Object.values(blk).forEach((blkData, i) => {
          list[i] = blkData;
        });
      } else if(typeof blk == "object") {
        Object.keys(blk).forEach((id) => {
          let blkData = blk[id];
          if(Number(id) >= 0 && !isNaN(id)) {
            list[Number(id)] = blkData;
          } else {
            list[id] = blkData;
          }
        })
      }
      Object.keys(list).forEach((D) => {
        let vID = (typeof D == "string" && isNaN(Number(D)) ? D : null);
        let vehicle = list[D];

        let u = unit_from_blk(vehicle, vID);
        let typ = u.UT.type ?? "tank";
        switch(typ) {
          case "tank":
            typ = "army";
            break;
          case "ship":
            typ = "ships";
            break;
          case "boat":
            typ = "boats";
            break;
          case "plane":
          case "aircraft":
            typ = "aviation";
            break;
          case "human":
            typ = "humans";
            break;
          case "helicopter":
            typ = "helicopters";
            break;
          default:
            typ = "army";
            break;
        }
        let id = u.unitId ?? "vehicle_0";
        let u0 = {rank:1, ...(u.TT ?? {})};
        let r = Math.min(Math.max(Math.floor((Math.random()*1000)/200),0), 5);
        wpcost[id] = { ...(wpcost[id] ?? {}), ...u.WPC };
        unitTags[id] = { ...(unitTags[id] ?? {}), ...u.UT };
        techTree.country_dev[typ] = techTree.country_dev[typ]??{range: {}};
        techTree.country_dev[typ].range[r]=techTree.country_dev[typ].range[r]??{};
        techTree.country_dev[typ].range[r][id] = u0;
      })
      
      return await reload_techTree();
    };
    window.test_custom_tt  = test_custom_tt;

    window.reload_techTree = reload_techTree;

    function searchUnits(phrase) {
      let elem = document.querySelector(".gsearch-results-list") ||
        document.querySelector(".gsearch-results-list--side") ||
        document.createElement("div");

      elem.setAttribute("class", "gsearch-results-list--side");
      elem.innerHTML = ``;

      if (!phrase || phrase == "") return [];

      phrase = String(phrase);

      if (!elem.parentNode) {
        document.body.appendChild(elem);
      }

      const lowerPhrase = phrase.toLowerCase();
      const selection = [];
      const directMatches = [];
      const startsWithMatches = [];
      const includesMatches = [];

      const shouldSearchNames = !(
        lowerPhrase == "new" ||
        lowerPhrase == "squadron" ||
        lowerPhrase == "upcoming" ||
        lowerPhrase == "gift" ||
        lowerPhrase == "event" ||
        lowerPhrase == "promo" ||
        lowerPhrase == "depth_charge" ||
        lowerPhrase.includes(":")
      );

      all_vehicles.forEach((veh) => {
        if (typeof veh !== "string") return;

        const id = veh;
        const unit = new Unit(id);
        const name = unit?.getUnitName?.()?.toLowerCase() ?? "";
        const shopName = unit?.getUnitShopName?.()?.toLowerCase() ?? "";
        const lowerVeh = id.toLowerCase();
        const otherData = unit?.getUnitOtherInfo?.() ?? {};
        const startPS = otherData?.startPS ? new Date(otherData.startPS) : null;
        const endPS = otherData?.endPS ? new Date(otherData.endPS) : null;
        const endRS = otherData?.endRS ? new Date(otherData.endRS) : null;
        const currDate = new Date();
        const isInWindow = (startPS ? currDate > startPS : true) && (endPS ? currDate < endPS : false);
        const isInResearchWindow = (endRS ? endRS > currDate : false);

        if (phrase.toLowerCase() == "new") {
          if (unit?.getUnitIsNew?.())
            selection.push(id);
        }
        if (shouldSearchNames) {
          if(lowerVeh == lowerPhrase)
            directMatches.push(id);
          if (lowerVeh.startsWith(lowerPhrase) || name.startsWith(lowerPhrase) || shopName.startsWith(lowerPhrase) || lowerVeh.replaceAll("_", "-").startsWith(lowerPhrase.replaceAll("_", "-"))) {
            if(!directMatches.includes(id)) 
              startsWithMatches.push(id);
          } else if (
            lowerPhrase.length >= 1 &&
            (lowerVeh.includes(lowerPhrase) || name.includes(lowerPhrase) || shopName.includes(lowerPhrase))
          ) {
            includesMatches.push(id);
          }
        } else {
          switch (lowerPhrase.replaceAll(" ", "").replaceAll("_", "").replaceAll("-", "")) {
          case "purchasewindow":
          case "purchaseoffer":
          case "temppurchase":
            if(isInWindow)
              selection.push(id);
            break;
          case "researchwindow":
          case "endresearch":
          case "researchoffer":
            if(isInResearchWindow)
              selection.push(id);
            break;
          case "new":
            if (unit?.getUnitIsNew?.())
              selection.push(id);
            break;
          case "squadron":
            if (unit?.getUnitIsSquadron?.())
              selection.push(id);
            break;
          case "upcoming":
            if (unit?.getUnitIsFuture?.())
              selection.push(id);
            break;
          case "promo":
            if (unit?.getUnitOtherInfo?.()?.isPromo)
              selection.push(id);
            break;
          case "gift":
            if (unit?.getUnitOtherInfo?.()?.gift != null && unit?.getUnitOtherInfo?.()?.gift != undefined)
              selection.push(id);
            break;
          case "event":
            if (unit?.getUnitOtherInfo?.()?.event != null && unit?.getUnitOtherInfo?.()?.event != undefined)
              selection.push(id);
            break;
          case "depthcharge":
            if (unit?.getUnitHasDepthCharge?.())
              selection.push(id);
            break;
          };
          let split = lowerPhrase.split(":");
          let key = split[0] ?? "";
          key = key.toLowerCase();

          if (split) {
            split = (split ?? [])?.slice(1);
            split = split?.join(":");

            split = String(split).toLowerCase();
            if (key == "tag" || key == "type") {
              let _tag = split;
              let _tag2 =split;
              let _tag3 =split;
              if (!_tag.startsWith("type_"))
                _tag = `type_${_tag}`;
              _tag = _tag.replaceAll(" ", "_");
              _tag2=_tag2.replaceAll(" ", "_");
              _tag3=_tag3.replaceAll(" ", "");

              if (unit?.getUnitHasTag?.(split) || unit?.getUnitHasTag(_tag) || unit?.getUnitHasTag(_tag2) || unit?.getUnitHasTag(_tag3))
                selection.push(id);

              switch (split) {
              case "zeppelin":
              case "airship":
                if (unit?.getUnitIsAirship?.())
                  selection.push(id);
                break;
              case "hydroplane":
                if (unit?.getUnitIsHydroplane?.())
                  selection.push(id);
                break;
              case "reserve":
                if (unit?.getUnitIsReserve?.())
                  selection.push(id);
                break;
              }
            };
            if (key == "country" || key == "operator") {
              let countryData = unit?.getUnitOperatorCountry?.() ?? {};
              if (!split.startsWith("country_"))
                split = `country_${split}`;

              if (
                split.includes(countryData?.countryId ?? "") ||
                split.includes(countryData?.countryName ?? "") ||
                split.includes(countryData?.baseCountryId ?? "") ||
                split.includes(countryData?.baseCountryName ?? "")
              )
                selection.push(id);
            }
          };

        }
      });

      const units = [...new Set([...selection, ...directMatches,  ...startsWithMatches, ...includesMatches])];

      const units_limit = units.slice(0, 762);

      units_limit.forEach((id) => {
        const box = createUnitSearchBox(id, elem);
        if (box && vehicle_search) {
          box.addEventListener("click", () => {
            vehicle_search.value = id;
            let ev = new Event("change", {
              bubbles: true
            })
            vehicle_search.dispatchEvent(ev);
            searchUnits("");
          });
        }
      });

      return units;
    };

    refreshGrid();



  } catch (_er) {
    console.error(_er.stack);
  }
})(CONFIG.DEBUG);
