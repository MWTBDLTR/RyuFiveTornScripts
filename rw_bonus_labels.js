// ==UserScript==
// @name         RW Bonus Labels
// @namespace    https://github.com/MWTBDLTR/RyuFiveTornScripts
// @version      8.0.6
// @description  Displays RW bonus values with convenient names consistently across all Torn pages.
// @author       RyuFive + MrChurch [3654415]
// @match        https://www.torn.com/displaycase.php*
// @match        https://www.torn.com/amarket.php*
// @match        https://www.torn.com/bazaar.php*
// @match        https://www.torn.com/factions.php?step=*
// @match        https://www.torn.com/item.php*
// @match        https://www.torn.com/page.php?sid=ItemMarket*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=torn.com
// @downloadURL  https://github.com/RyuFive/TornScripts/raw/main/RW_Bonus_Convenient_Name.user.js
// @updateURL    https://github.com/RyuFive/TornScripts/raw/main/RW_Bonus_Convenient_Name.user.js
// @license      MIT
// ==/UserScript==

let bonusColorsEnabled = true

;(function addCustomStyles() {
    const css = `
    .custom-itemmarket-container {
      display: flex !important;
      flex-direction: column;
      margin-top: 15px;
      white-space: normal;
      padding-left: 0;
    }
    .custom-bazaar-container {
      float: left;
      white-space: nowrap;
      margin-top: 9px;
      padding-left: 5;
      top: 3px;
      right: 0px;
      display: inline-block !important;
      position: relative;
    }
    .bonus-attachment-icons {
      display: inline-table !important;
      width: auto !important;
      float: left !important;
      white-space: nowrap !important;
      padding-left: 0px !important;
      padding-top: 3px !important;
      position: relative !important;
      top: -40px !important;
      right: 0px !important;
    }
    .custom-bonus-label {
      font-size: 12px;
      padding: 1px 4px;
      border-radius: 3px;
      margin-left: 2px;
      margin-bottom: 2px;
      display: inline-block;
      text-shadow: 0 1px 1px rgba(0,0,0,0.3);
      pointer-events: none;
      user-select: none;
      white-space: nowrap;
      max-width: 100%;
    }
    
    /* Standardized global badge styling (Matches Inventory) */
    .custom-bonus-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      color: #fff;
      border-radius: 6px;
      padding: 2px 6px;
      margin: 1px 0;
      white-space: nowrap;
      line-height: 1.2em;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      border: 1px solid rgba(0,0,0,0.6);
      vertical-align: middle;
      transition: background 0.4s ease, transform 0.1s ease;
      cursor: help; /* Adds a little question mark cursor on hover */
    }
    
    .custom-bonus-badge.dark-mode {
      text-shadow: 0 0 2px rgba(0,0,0,1),0 0 3px rgba(0,0,0,0.9),0 0 3px rgba(0,0,0,0.9);
      color: white !important;
    }
    .custom-bonus-badge.light-mode {
      text-shadow: 0 0 2px rgba(255,255,255,1),0 0 3px rgba(255,255,255,0.9),0 0 3px rgba(255,255,255,0.9);
      color: black !important;
    }
    .custom-bonus-label.dark-mode {
      background: linear-gradient(145deg, rgba(51, 51, 51, 0.7), rgba(17, 17, 17, 0.7)) !important;
      color: white !important;
    }
    .custom-bonus-label.light-mode {
      background: linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(230, 230, 230, 1)) !important;
      color: black !important;
    }
    #armoury-weapons .loaned, #armoury-armour .loaned {
      width: 75px !important;
      overflow: visible !important;
    }
    #armoury-weapons .type, #armoury-armour .type {
      width: 126px !important;
      box-sizing: border-box !important;
      padding: 0 !important;
      position: relative !important;
      overflow: hidden !important;
    }`
    const style = document.createElement("style")
    style.textContent = css
    document.head.appendChild(style)
})()

const weaponBonuses = {
  "general": {
    "achilles": { "orange": { "max": 112, "min": 75 }, "red": { "max": 169, "min": 113 }, "yellow": { "max": 74, "min": 50 } },
    "assassinate": { "orange": { "max": 100, "min": 70 }, "red": { "max": 148, "min": 100 }, "yellow": { "max": 70, "min": 50 } },
    "backstab": { "orange": { "max": 64, "min": 44 }, "red": { "max": 96, "min": 66 }, "yellow": { "max": 43, "min": 30 } },
    "berserk": { "orange": { "max": 58, "min": 36 }, "red": { "max": 88, "min": 60 }, "yellow": { "max": 35, "min": 20 } },
    "bleed": { "orange": { "max": 46, "min": 31 }, "red": { "max": 72, "min": 48 }, "yellow": { "max": 30, "min": 20 } },
    "blindside": { "orange": { "max": 62, "min": 40 }, "red": { "max": 97, "min": 63 }, "yellow": { "max": 39, "min": 25 } },
    "bloodlust": { "orange": { "max": 15, "min": 12 }, "red": { "max": 19, "min": 15 }, "yellow": { "max": 12, "min": 10 } },
    "comeback": { "orange": { "max": 99, "min": 70 }, "red": { "max": 138, "min": 102 }, "yellow": { "max": 70, "min": 50 } },
    "conserve": { "orange": { "max": 37, "min": 30 }, "red": { "max": 49, "min": 38 }, "yellow": { "max": 30, "min": 25 } },
    "cripple": { "orange": { "max": 41, "min": 29 }, "red": { "max": 63, "min": 43 }, "yellow": { "max": 29, "min": 20 } },
    "crusher": { "orange": { "max": 108, "min": 75 }, "red": { "max": 171, "min": 114 }, "yellow": { "max": 74, "min": 50 } },
    "cupid": { "orange": { "max": 110, "min": 75 }, "red": { "max": 168, "min": 113 }, "yellow": { "max": 74, "min": 50 } },
    "deadeye": { "orange": { "max": 74, "min": 45 }, "red": { "max": 123, "min": 75 }, "yellow": { "max": 45, "min": 25 } },
    "deadly": { "orange": { "max": 6, "min": 4 }, "red": { "max": 11, "min": 7 }, "yellow": { "max": 3, "min": 2 } },
    "disarm": { "orange": { "max": 9, "min": 5 }, "red": { "max": 15, "min": 9 }, "yellow": { "max": 5, "min": 3 } },
    "double tap": { "orange": { "max": 36, "min": 24 }, "red": { "max": 58, "min": 38 }, "yellow": { "max": 24, "min": 15 } },
    "double-edged": { "orange": { "max": 24, "min": 16 }, "red": { "max": 40, "min": 25 }, "yellow": { "max": 16, "min": 10 } },
    "empower": { "orange": { "max": 148, "min": 90 }, "red": { "max": 245, "min": 152 }, "yellow": { "max": 89, "min": 50 } },
    "eviscerate": { "orange": { "max": 25, "min": 19 }, "red": { "max": 34, "min": 25 }, "yellow": { "max": 19, "min": 15 } },
    "execute": { "orange": { "max": 22, "min": 18 }, "red": { "max": 30, "min": 23 }, "yellow": { "max": 18, "min": 15 } },
    "expose": { "orange": { "max": 14, "min": 10 }, "red": { "max": 21, "min": 14 }, "yellow": { "max": 9, "min": 7 } },
    "finale": { "orange": { "max": 15, "min": 12 }, "red": { "max": 18, "min": 15 }, "yellow": { "max": 12, "min": 10 } },
    "focus": { "orange": { "max": 24, "min": 19 }, "red": { "max": 35, "min": 25 }, "yellow": { "max": 19, "min": 15 } },
    "frenzy": { "orange": { "max": 10, "min": 7 }, "red": { "max": 14, "min": 10 }, "yellow": { "max": 7, "min": 5 } },
    "fury": { "orange": { "max": 24, "min": 16 }, "red": { "max": 40, "min": 25 }, "yellow": { "max": 16, "min": 10 } },
    "grace": { "orange": { "max": 55, "min": 36 }, "red": { "max": 84, "min": 60 }, "yellow": { "max": 36, "min": 20 } },
    "home run": { "orange": { "max": 74, "min": 60 }, "red": { "max": 99, "min": 76 }, "yellow": { "max": 59, "min": 50 } },
    "irradiate": { "orange": { "max": 49, "min": 20 }, "red": { "max": 86, "min": 50 }, "yellow": { "max": 19, "min": 0 } },
    "motivation": { "orange": { "max": 25, "min": 19 }, "red": { "max": 35, "min": 25 }, "yellow": { "max": 19, "min": 15 } },
    "paralyze": { "orange": { "max": 12, "min": 8 }, "red": { "max": 18, "min": 13 }, "yellow": { "max": 8, "min": 5 } },
    "parry": { "orange": { "max": 74, "min": 60 }, "red": { "max": 95, "min": 75 }, "yellow": { "max": 60, "min": 50 } },
    "penetrate": { "orange": { "max": 37, "min": 30 }, "red": { "max": 49, "min": 38 }, "yellow": { "max": 30, "min": 25 } },
    "plunder": { "orange": { "max": 35, "min": 26 }, "red": { "max": 49, "min": 35 }, "yellow": { "max": 26, "min": 20 } },
    "powerful": { "orange": { "max": 32, "min": 22 }, "red": { "max": 50, "min": 33 }, "yellow": { "max": 22, "min": 15 } },
    "proficience": { "orange": { "max": 39, "min": 28 }, "red": { "max": 59, "min": 40 }, "yellow": { "max": 28, "min": 20 } },
    "puncture": { "orange": { "max": 27, "min": 20 }, "red": { "max": 39, "min": 28 }, "yellow": { "max": 20, "min": 15 } },
    "quicken": { "orange": { "max": 149, "min": 90 }, "red": { "max": 245, "min": 150 }, "yellow": { "max": 89, "min": 50 } },
    "rage": { "orange": { "max": 11, "min": 7 }, "red": { "max": 18, "min": 11 }, "yellow": { "max": 6, "min": 4 } },
    "revitalize": { "orange": { "max": 17, "min": 13 }, "red": { "max": 24, "min": 18 }, "yellow": { "max": 13, "min": 10 } },
    "roshambo": { "orange": { "max": 107, "min": 75 }, "red": { "max": 160, "min": 113 }, "yellow": { "max": 73, "min": 50 } },
    "slow": { "orange": { "max": 42, "min": 29 }, "red": { "max": 64, "min": 43 }, "yellow": { "max": 29, "min": 20 } },
    "smurf": { "orange": { "max": 3, "min": 2 }, "red": { "max": 5, "min": 3 }, "yellow": { "max": 1, "min": 1 } },
    "specialist": { "orange": { "max": 39, "min": 28 }, "red": { "max": 59, "min": 40 }, "yellow": { "max": 28, "min": 20 } },
    "stricken": { "orange": { "max": 63, "min": 44 }, "red": { "max": 99, "min": 69 }, "yellow": { "max": 43, "min": 30 } },
    "stun": { "orange": { "max": 25, "min": 16 }, "red": { "max": 40, "min": 25 }, "yellow": { "max": 16, "min": 10 } },
    "suppress": { "orange": { "max": 42, "min": 32 }, "red": { "max": 51, "min": 43 }, "yellow": { "max": 32, "min": 25 } },
    "sure shot": { "orange": { "max": 8, "min": 5 }, "red": { "max": 12, "min": 8 }, "yellow": { "max": 4, "min": 3 } },
    "throttle": { "orange": { "max": 111, "min": 75 }, "red": { "max": 170, "min": 113 }, "yellow": { "max": 74, "min": 50 } },
    "warlord": { "orange": { "max": 27, "min": 20 }, "red": { "max": 45, "min": 28 }, "yellow": { "max": 20, "min": 15 } },
    "weaken": { "orange": { "max": 42, "min": 29 }, "red": { "max": 63, "min": 43 }, "yellow": { "max": 29, "min": 20 } },
    "wind-up": { "orange": { "max": 174, "min": 145 }, "red": { "max": 221, "min": 175 }, "yellow": { "max": 145, "min": 125 } },
    "wither": { "orange": { "max": 42, "min": 29 }, "red": { "max": 64, "min": 43 }, "yellow": { "max": 29, "min": 20 } }
  },
  "special": {
    "blindfire": { "max": 20, "min": 15 }, "burn": { "max": 50, "min": 30 }, "demoralize": { "max": 23, "min": 20 },
    "emasculate": { "max": 16, "min": 15 }, "freeze": { "max": 26, "min": 20 }, "hazardous": { "max": 31, "min": 20 },
    "laceration": { "max": 45, "min": 35 }, "poison": { "max": 100, "min": 85 }, "severe burning": { "max": 100, "min": 100 },
    "shock": { "max": 100, "min": 75 }, "sleep": { "max": 0, "min": 0 }, "smash": { "max": 100, "min": 100 },
    "spray": { "max": 24, "min": 20 }, "storage": { "max": 0, "min": 0 }, "toxin": { "max": 44, "min": 30 }
  }
}

const armorBonuses = {
    "100": { "color": "orange", "max": 3, "min": 2, "name": "Imperviable", "slots": ["gloves"] },
    "110": { "color": "yellow", "max": 75, "min": 75, "name": "Kinetokinesis", "slots": ["body_armor"] },
    "111": { "color": "yellow", "max": 75, "min": 75, "name": "Kinetokinesis", "slots": ["pants"] },
    "112": { "color": "yellow", "max": 75, "min": 75, "name": "Kinetokinesis", "slots": ["boots"] },
    "113": { "color": "yellow", "max": 75, "min": 75, "name": "Kinetokinesis", "slots": ["gloves"] },
    "114": { "color": "yellow", "max": 75, "min": 75, "name": "Kinetokinesis", "slots": ["helmet"] },
    "115": { "color": "orange", "max": 43, "min": 30, "name": "Immutable", "slots": ["helmet"] },
    "116": { "color": "orange", "max": 52, "min": 40, "name": "Immutable", "slots": ["body_armor"] },
    "117": { "color": "orange", "max": 33, "min": 25, "name": "Immutable", "slots": ["pants"] },
    "118": { "color": "orange", "max": 19, "min": 15, "name": "Immutable", "slots": ["boots"] },
    "119": { "color": "orange", "max": 19, "min": 15, "name": "Immutable", "slots": ["gloves"] },
    "121": { "color": "orange", "max": 41, "min": 30, "name": "Irrepressible", "slots": ["helmet"] },
    "122": { "color": "orange", "max": 52, "min": 40, "name": "Irrepressible", "slots": ["body_armor"] },
    "123": { "color": "orange", "max": 33, "min": 25, "name": "Irrepressible", "slots": ["pants"] },
    "124": { "color": "orange", "max": 19, "min": 15, "name": "Irrepressible", "slots": ["boots"] },
    "125": { "color": "orange", "max": 19, "min": 15, "name": "Irrepressible", "slots": ["gloves"] },
    "15": { "color": "yellow", "max": 29, "min": 20, "name": "Impregnable", "slots": ["helmet", "body_armor", "pants", "boots", "gloves"] },
    "17": { "color": "yellow", "max": 29, "min": 20, "name": "Impenetrable", "slots": ["helmet", "body_armor", "pants", "boots", "gloves"] },
    "22": { "color": "orange", "max": 7, "min": 5, "name": "Imperviable", "slots": ["helmet"] },
    "26": { "color": "red", "max": 29, "min": 20, "name": "Impassable", "slots": ["helmet", "body_armor", "pants", "boots", "gloves"] },
    "90": { "color": "yellow", "max": 82, "min": 1, "name": "Radiation Protection", "slots": ["helmet"] },
    "91": { "color": "orange", "max": 15, "min": 12, "name": "Invulnerable", "slots": ["helmet"] },
    "92": { "color": "yellow", "max": 40, "min": 30, "name": "Insurmountable", "slots": ["helmet", "body_armor", "pants", "boots", "gloves"] },
    "93": { "color": "orange", "max": 11, "min": 8, "name": "Invulnerable", "slots": ["body_armor"] },
    "94": { "color": "orange", "max": 10, "min": 7, "name": "Invulnerable", "slots": ["pants"] },
    "95": { "color": "orange", "max": 7, "min": 4, "name": "Invulnerable", "slots": ["boots"] },
    "96": { "color": "orange", "max": 7, "min": 4, "name": "Invulnerable", "slots": ["gloves"] },
    "97": { "color": "orange", "max": 11, "min": 7, "name": "Imperviable", "slots": ["body_armor"] },
    "98": { "color": "orange", "max": 6, "min": 4, "name": "Imperviable", "slots": ["pants"] },
    "99": { "color": "orange", "max": 3, "min": 2, "name": "Imperviable", "slots": ["boots"] }
}

function createBonusBadge(value, bonus_name, item_name) {
    const isDarkMode = document.body.classList.contains("dark-mode")
    const modeClass = isDarkMode ? "dark-mode" : "light-mode"

    const badge = document.createElement("div")
    badge.className = `custom-bonus-badge ${modeClass}`

    const numericValue = parseInt(String(value).replace(/[^0-9.-]/g, ""), 10) || 0
    const bonusName = String(bonus_name || "").trim().toLowerCase()
    let gradient = "linear-gradient(90deg, #333, #3a3a3a)"

    const itemLower = String(item_name || "").toLowerCase()
    let itemSlot = null

    if (itemLower.includes("gloves")) { itemSlot = "gloves" }
    else if (itemLower.includes("boots") || itemLower.includes("hooves")) { itemSlot = "boots" }
    else if (itemLower.includes("helmet") || itemLower.includes("mask") || itemLower.includes("respirator")) { itemSlot = "helmet" }
    else if (itemLower.includes("pants")) { itemSlot = "pants" }
    else if (itemLower.includes("body") || itemLower.includes("apron") || itemLower.includes("vest") || itemLower.includes("mail") || itemLower.includes("suit") || itemLower.includes("jacket")) { itemSlot = "body_armor" }

    const armorBonus = Object.values(armorBonuses).find(b => b?.name?.trim().toLowerCase() === bonusName && b?.slots?.includes(itemSlot))
    const weaponBonus = weaponBonuses?.general?.[bonusName] || weaponBonuses?.special?.[bonusName]

    let minRange = null
    let maxRange = null

    if (armorBonus) {
        minRange = armorBonus.min
        maxRange = armorBonus.max
        if (bonusColorsEnabled) {
            const percent = armorBonus.max > armorBonus.min ? Math.min(Math.max(((numericValue - armorBonus.min) / (armorBonus.max - armorBonus.min)) * 100, 0), 100) : 100
            const colors = {
                red: { fill: "rgba(180,0,40,0.75)", base: "rgba(128,0,32,0.2)" },
                orange: { fill: "rgba(191,111,0,0.75)", base: "rgba(191,111,0,0.2)" },
                yellow: { fill: "rgba(191,191,0,0.75)", base: "rgba(191,191,0,0.2)" }
            }
            const selected = colors[armorBonus.color]
            if (selected) gradient = `linear-gradient(90deg, ${selected.fill} 0%, ${selected.fill} ${percent - 0.1}%, ${selected.base} ${percent + 0.1}%, ${selected.base} 101%)`
        }
    } else if (weaponBonus) {
        let color = null
        let range = null

        if (weaponBonuses.general?.[bonusName]) {
            const ranges = weaponBonuses.general[bonusName]
            if (ranges.red && numericValue >= ranges.red.min && numericValue <= ranges.red.max) { color = "red"; range = ranges.red }
            else if (ranges.orange && numericValue >= ranges.orange.min && numericValue <= ranges.orange.max) { color = "orange"; range = ranges.orange }
            else if (ranges.yellow && numericValue >= ranges.yellow.min && numericValue <= ranges.yellow.max) { color = "yellow"; range = ranges.yellow }
        } else if (weaponBonuses.special?.[bonusName]) {
            range = weaponBonuses.special[bonusName]
            if (numericValue >= range.min && numericValue <= range.max) color = "orange"
        }

        // Assign min & max values if a matching range exists
        if (range) {
            minRange = range.min
            maxRange = range.max
        }

        if (bonusColorsEnabled && color && range) {
            const percent = range.max > range.min ? Math.min(Math.max(((numericValue - range.min) / (range.max - range.min)) * 100, 0), 100) : 100
            const colors = {
                red: { fill: "rgba(180,0,40,0.75)", base: "rgba(128,0,32,0.2)" },
                orange: { fill: "rgba(191,111,0,0.75)", base: "rgba(191,111,0,0.2)" },
                yellow: { fill: "rgba(191,191,0,0.75)", base: "rgba(191,191,0,0.2)" }
            }
            const selected = colors[color]
            if (selected) gradient = `linear-gradient(90deg, ${selected.fill} 0%, ${selected.fill} ${percent - 0.1}%, ${selected.base} ${percent + 0.1}%, ${selected.base} 101%)`
        }
    }

    const unitOverrides = { disarm: "T", freeze: "s" }
    const unit = unitOverrides[bonusName] || "%"

    // Construct and assign the tooltip title if min and max range was found
    if (minRange !== null && maxRange !== null) {
        if (bonusName === "irradiate" || bonusName === "smash" || bonusName === "radiation protection") {
            badge.title = `Tier Range: ${minRange} - ${maxRange}`
        } else {
            badge.title = `Tier Range: ${minRange}${unit} - ${maxRange}${unit}`
        }
    }

    if (bonusName === "irradiate" || bonusName === "smash" || bonusName === "radiation protection") {
        badge.textContent = bonus_name
        gradient = "rgba(191,111,0,0.75)"
    } else {
        badge.textContent = `${numericValue}${unit} ${bonus_name}`
    }

    badge.style.background = gradient
    badge.style.transform = "scale(0.75)"
    setTimeout(() => (badge.style.transform = ""), 100)

    return badge
}

const isMobile = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0 && window.innerWidth <= 768);

// AUCTION HOUSE / AMARKET ========================================================================================================

function amarket() {
    $(".t-gray-6").html("")

    const rows = $(".bonus-attachment-icons").parents("div.item-cont-wrap")
    if (rows.length === 0) return

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const container = $(row).find("p.t-gray-6")[0]
        const icons = $(row).find("span.bonus-attachment-icons")

        if (!container || icons.length === 0) continue

        container.innerHTML = ""
        container.style.display = "flex"
        container.style.flexDirection = "row"
        container.style.flexWrap = "wrap"
        container.style.alignItems = "center"
        container.style.justifyContent = "flex-start"
        container.style.gap = "4px"
        container.style.marginTop = "2px"
        
        const nameNode = row.querySelector('[class*=name]')
        const item_name = nameNode ? nameNode.textContent.trim() : ""

        const processIcon = (icon) => {
            if (!icon || !icon.title) return
            const name = icon.title.split(">")[1]?.split("<")[0]
            if (!name) return
            const value = format(icon.title, name)
            const badge = createBonusBadge(value, trueName(name), item_name)
            badge.style.margin = "0"
            container.appendChild(badge)
        }

        if (icons[0]) processIcon(icons[0])
        if (icons[1]) processIcon(icons[1])
    }
}

// DISPLAY ========================================================================================================

function displaycase() {
    const items = $(".bonus-attachment-icons").parents("div.iconsbonuses")
    if (items.length === 0) return

    for (let i in items) {
        if (!isIntNumber(i)) continue

        const bonusIcons = $(items[i]).find("span.bonus-attachment-icons")
        if (bonusIcons.length === 0) continue

        bonusIcons.find("div.custom-bonus-badge").remove()
        const item_name = bonusIcons[0].parentElement.parentElement.parentElement.querySelector('[class*=name]').childNodes[3].textContent

        const first = bonusIcons[0]
        if (first && first.title) {
            let name1 = first.title.split(">")[1]?.split("<")[0]
            if (name1) {
                let value1 = format(first.title, name1)
                const badge1 = createBonusBadge(value1, trueName(name1), item_name)
                badge1.style.marginLeft = "4px"
                first.appendChild(badge1)
            }
        }

        const second = bonusIcons[1]
        if (second && second.title) {
            let name2 = second.title.split(">")[1]?.split("<")[0]
            if (name2) {
                let value2 = format(second.title, name2)
                const badge2 = createBonusBadge(value2, trueName(name2), item_name)
                badge2.style.marginLeft = "4px"
                second.appendChild(badge2)
            }
        }
    }
}

function observeDarkModeToggle() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
                if (document.URL.includes("display")) displaycase()
            }
        }
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
}
observeDarkModeToggle()

// BAZAAR ========================================================================================================

function bazaar(triggered) {
    if (!triggered || !triggered[0] || triggered[0].childElementCount < 1) return

    const container = triggered[0]
    container.querySelectorAll(".custom-bonus-label, .custom-bonus-badge").forEach((e) => e.remove())

    const appendBonus = (bonusWrapper) => {
        const element = bonusWrapper?.childNodes?.[0]
        if (!element) return

        const name = element.getAttribute("data-bonus-attachment-title")
        const desc = element.getAttribute("data-bonus-attachment-description")
        const item_name = element.parentElement.parentElement.parentElement.parentElement.querySelector('[class*=name]').textContent
        if (!name || !desc) return

        const value = formatNew(desc, name)
        const badge = createBonusBadge(value, trueName(name), item_name)
        badge.style.marginLeft = "6px"
        bonusWrapper.appendChild(badge)
    }

    appendBonus(container.childNodes[0])
    if (container.childElementCount === 2) appendBonus(container.childNodes[1])

    container.classList.add("custom-bazaar-container")
}

const observer = new MutationObserver(() => {
    document.querySelectorAll(".iconBonuses____iFjZ").forEach((el) => bazaar([el]))
})
observer.observe(document.body, { attributes: true, attributeFilter: ["class"], subtree: false })

function manage(triggered) {
    if (triggered && triggered[0]) {
        var className = triggered[0].className
        if (className.includes("blank-bonus")) return
        var name = className.split("-")[2]
        name = name.charAt(0).toUpperCase() + name.slice(1)
        name = trueName(name)

        triggered[0].parentElement.parentElement.parentElement.childNodes[2].childNodes[0].innerHTML =
            triggered[0].parentElement.parentElement.parentElement.childNodes[2].childNodes[0].innerHTML.split(" x")[0] + " (" + name + ")"
    }
}

// ARMORY ========================================================================================================

function armory(triggered) {
    const renameTypeHeader = (armouryRoot) => {
        armouryRoot?.querySelectorAll(".type").forEach((el) => {
            if (el.textContent.trim() === "Type") el.textContent = "Bonus"
        })
    }

    const root = triggered?.[0]
    if (!root) return

    const armouryRoot = root?.parentElement?.parentElement?.parentElement?.parentElement
    if (!armouryRoot) return

    if (isMobile()) {
        const display = root.parentElement?.parentElement?.childNodes?.[3]
        if (!display || display.textContent.endsWith(")")) return
        if (display.querySelector('.custom-bonus-badge')) return

        display.style.display = 'flex'
        display.style.flexDirection = 'column'
        display.style.alignItems = 'flex-start'

        const bonuses = Array.from(root.children)
            .filter(child => child.title)
            .map(child => {
                const title = child.title
                const nameMatch = title.match(/>([^<]+)</)
                if (!nameMatch) return null
                const rawName = nameMatch[1].trim()
                return { value: format(title, rawName), name: trueName(rawName) }
            }).filter(Boolean)

        const item_name = root.parentElement.parentElement.querySelector('[class*=name]').textContent

        if (bonuses.length) {
            const bonusContainer = document.createElement('div')
            bonusContainer.style.display = 'flex'
            bonusContainer.style.flexWrap = 'wrap'
            bonusContainer.style.width = '100%'

            bonuses.forEach(b => {
                const badge = createBonusBadge(b.value, b.name, item_name)
                badge.style.marginRight = "4px"
                bonusContainer.appendChild(badge)
            })
            display.parentElement.appendChild(bonusContainer)
        }
    } else {
        renameTypeHeader(armouryRoot)

        const display = root.parentElement?.parentElement?.childNodes?.[9]
        if (!display) return

        const titledChild = root.querySelector(':scope > [title]')
        if (!titledChild) return

        const item_name = root.parentElement.parentElement.querySelector('[class*=name]').textContent

        const bonuses = Array.from(root.children)
            .filter(child => child.title)
            .map(child => {
                const title = child.title
                let name = title.split(">")[1]?.split("<")[0]
                if (!name) return null
                return { value: format(title, name), name: trueName(name) }
            }).filter(Boolean)

        if (bonuses.length) {
            display.textContent = ""
            display.style.position = "relative"
            display.style.display = "flex"
            display.style.flexDirection = "column"
            display.style.justifyContent = "center"
            display.style.alignItems = "flex-start"
            display.style.gap = "2px"
            display.style.paddingLeft = "6px"

            bonuses.forEach((b) => {
                const badge = createBonusBadge(b.value, b.name, item_name)
                display.appendChild(badge)
            })
        }
    }
}

// INVENTORY & BAZAAR ========================================================================================================

function inventoryandbazaar(triggered) {
    const link = document.URL
    const removePreviousSpans = (container) => {
        if (container) container.querySelectorAll(".custom-bonus-label").forEach((span) => span.remove())
    }

    if (link.includes("item")) {
        if (triggered?.[0]?.childElementCount >= 3) {
            const row = triggered[0]
            const bonusParentIndex = row.childNodes[5]?.className?.includes("testtest") ? 7 : 5
            const element = row.childNodes[bonusParentIndex]?.childNodes?.[1]

            if (!element?.title) return

            const parent = row.parentElement?.parentElement?.parentElement
            const container = parent.querySelector(".name")
            if (!container) return
            removePreviousSpans(container)

            const parseBonus = (el) => {
                if (!el?.title) return null
                const match = el.title.match(/>([^<]+)</)
                if (!match) return null
                const rawName = match[1].trim()
                return { val: format(el.title, rawName), bonusName: trueName(rawName) }
            }

            const item_name = row.parentElement.parentElement.parentElement.querySelector('[class*=name]').childNodes[5].textContent
            const bonuses = [parseBonus(element)]

            const nextBonus = element.parentElement?.childNodes?.[3]
            if (nextBonus && !nextBonus.className?.includes("blank-bonus")) {
                const parsed = parseBonus(nextBonus)
                if (parsed) bonuses.push(parsed)
            }

            bonuses.forEach((b) => {
                if (!b?.val || !b?.bonusName) return
                const badge = createBonusBadge(b.val, b.bonusName, item_name)
                badge.style.marginLeft = "6px"
                container.appendChild(badge)
            })
        }
    } else if (link.includes("bazaar.php#/add")) {
        if (triggered && triggered[0] && triggered[0].childElementCount >= 1) {
            const element = triggered[0].childNodes[2]?.childNodes[0]
            if (!element || !element.title) return

            let container = triggered[0].parentElement.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[0]
            removePreviousSpans(container)

            let name = element.title.split(">")[1].split("<")[0]
            let value = format(element.title, name)
            const item_name = triggered[0].parentElement.parentElement.parentElement.querySelector('.name-wrap .t-overflow').childNodes[0].textContent.trim()

            const badge1 = createBonusBadge(value, trueName(name), item_name)
            badge1.style.marginLeft = "6px"
            container.appendChild(badge1)

            const nextBonus = element.parentElement.childNodes[1]
            if (nextBonus && !nextBonus.className.includes("blank-bonus") && nextBonus.title) {
                let name2 = nextBonus.title.split(">")[1].split("<")[0]
                let value2 = format(nextBonus.title, name2)
                const badge2 = createBonusBadge(value2, trueName(name2), item_name)
                badge2.style.marginLeft = "6px"
                container.appendChild(badge2)
            }
        }
    }
}

// ITEM MARKET ========================================================================================================

function newItemMarket(triggered) {
    if (!triggered?.[0]) return
    if (!document.URL.includes("ItemMarket")) return

    const tile = triggered[0]
    if (tile.getAttribute("data-badge-added") === "true") return

    const bonusContainer = triggered[0].childNodes?.[0]?.childNodes?.[2]?.childNodes?.[0]
    const item_name = triggered[0]?.querySelector('[class*="name___"]')?.textContent
    const primary = bonusContainer?.childNodes?.[1]?.childNodes?.[0]
    if (!primary) return

    const leftColumn = bonusContainer.childNodes?.[0]
    if (!leftColumn) return

    const appendNode = leftColumn.parentElement.parentElement.parentElement.parentElement
    if (!appendNode) return

    appendNode.querySelectorAll(".custom-bonus-badge").forEach((el) => el.remove())

    const appendBadge = (node, name, desc) => {
        const value = formatNew(desc, name)
        const badge = createBonusBadge(value, name, item_name)
        badge.style.margin = "2px auto"
        appendNode.appendChild(badge)

        let fontSize = 11
        while (badge.scrollWidth > badge.clientWidth && fontSize > 7) {
            fontSize -= 0.5
            badge.style.fontSize = `${fontSize}px`
        }
    }

    const name1 = primary.getAttribute("data-bonus-attachment-title")
    const desc1 = primary.getAttribute("data-bonus-attachment-description")
    appendBadge(primary, name1, desc1)

    if (bonusContainer?.childNodes?.[1]?.childElementCount === 2) {
        const secondary = bonusContainer.childNodes[1].childNodes[1]
        const name2 = secondary.getAttribute("data-bonus-attachment-title")
        const desc2 = secondary.getAttribute("data-bonus-attachment-description")
        appendBadge(secondary, name2, desc2)
    }

    appendNode.style.display = "flex"
    appendNode.style.flexDirection = "column"
    appendNode.style.justifyContent = "flex-end"
    appendNode.style.paddingBottom = "5px"
    leftColumn.classList.add("custom-itemmarket-container")
    
    tile.setAttribute("data-badge-added", "true")
}

function rerunNewItemMarket() {
    document.querySelectorAll(".itemTile___cbw7w").forEach((el) => {
        const bonusArea = el.querySelector(".bonuses-wrap") || el.childNodes?.[0]?.childNodes?.[2]?.childNodes?.[0]?.childNodes?.[0]
        bonusArea?.querySelectorAll(".custom-bonus-label").forEach((span) => span.remove())

        try {
            const bonusContainer = el.childNodes?.[0]?.childNodes?.[2]?.childNodes?.[0]
            const leftColumn = bonusContainer?.childNodes?.[0]
            const appendNode = leftColumn?.parentElement?.parentElement?.parentElement?.parentElement
            if (appendNode) appendNode.querySelectorAll(".custom-bonus-badge").forEach((node) => node.remove())
        } catch (e) {
            el.querySelectorAll(".custom-bonus-badge").forEach((node) => node.remove())
        }

        el.removeAttribute("data-badge-added")
        newItemMarket([el])
    })
}

let darkModeTimer
const darkModeObserver = new MutationObserver(() => {
    clearTimeout(darkModeTimer)
    darkModeTimer = setTimeout(rerunNewItemMarket, 50)
})
darkModeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] })

// FORMATTING ========================================================================================================

function format(title, name) {
    const excludedNames = ["Irradiate", "Smash", "Dimensiokinesis", "Oneirokinesis"]
    if (excludedNames.includes(name)) return ""

    const specialHandlers = {
        Disarm: () => title.split(" turns")[0]?.split("for ")[1] + " T ",
        Bloodlust: () => title.split(" of")[0]?.split("by ")[1] + " ",
        Execute: () => title.split(" life")[0]?.split("below ")[1] + " ",
        Penetrate: () => title.split(" of")[0]?.split("Ignores ")[1] + " ",
        Eviscerate: () => title.split(" extra")[0]?.split("them ")[1] + " ",
        Poison: () => title.split(" chance to Poison")[0]?.split("</b><br/>")[1] + " ",
    }

    if (specialHandlers[name]) {
        try { return specialHandlers[name]() || "" } 
        catch (e) { return "" }
    }

    try {
        const raw = title.split(">")[3]?.split("%")[0]
        return raw ? raw + "% " : ""
    } catch (e) { return "" }
}

function formatNew(desc, name) {
    const specialHandlers = {
        Disarm: () => desc.split(" turns")[0]?.split("for ")[1] + " T ",
        Bloodlust: () => desc.split(" of")[0]?.split("by ")[1] + " ",
        Execute: () => desc.split(" life")[0]?.split("below ")[1] + " ",
        Penetrate: () => desc.split(" of")[0]?.split("Ignores ")[1] + " ",
        Eviscerate: () => desc.split(" extra")[0]?.split("them ")[1] + " ",
        Poison: () => desc.split(" chance to Poison")[0] + " ",
    }
    const excludedNames = ["Irradiate", "Smash", "Dimensiokinesis", "Oneirokinesis"]

    if (excludedNames.includes(name)) return ""
    if (specialHandlers[name]) {
        try { return specialHandlers[name]() || "" } 
        catch (e) { return "" }
    }
    return desc.split("%")[0] + "% "
}

function trueName(text) {
    const map = { Full: "EOD", Negative: "Delta", Poisoned: "Poison" }
    return map[text] || text
}

// FORMATTING ========================================================================================================

const observerMap = {
    ".item-cont-wrap": amarket,
    ".display-main-page": displaycase,
    "[class*='iconBonuses___']": bazaar,
    "[class*='extraBonusIcon___']": manage,
    ".bonuses-wrap": inventoryandbazaar,
    ".bonus": armory,
    "[class*='itemTile___']": newItemMarket
}

const seenElements = new WeakSet()

const process = () => {
    for (const [selector, callback] of Object.entries(observerMap)) {
        document.querySelectorAll(selector).forEach((el) => {
            if (!seenElements.has(el)) {
                seenElements.add(el)
                callback([el])
            }
        })
    }
}

const mainObserver = new MutationObserver(process)
mainObserver.observe(document.body, { childList: true, subtree: true })
process()
