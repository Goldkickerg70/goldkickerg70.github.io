// @name         Cookie Clicker Predict Spell
// @version      0.1
// @author       Random Reddit Guy (SamNosliw, 3pLm1zf1rMD_Xkeo6XHl)
// @match        http://orteil.dashnet.org/cookieclicker/
// @source       https://www.reddit.com/r/CookieClicker/comments/6v2lz3/predict_next_hands_of_faith/
(function () {
    if (Game.ObjectsById[7].minigameLoaded) {
        var lookup = setInterval(function () {
            if (typeof Game.ready !== "undefined" && Game.ready) {
                var CastSpell = document.getElementById("grimoireSpell1");
                CastSpell.onmouseover = function () {
                    Game.tooltip.dynamic = 1;
                    Game.tooltip.draw(
                        this,
                        Game.ObjectsById[7].minigame.spellTooltip(1)() +
                            '<div class="line"></div><div class="description">' +
                            "<b>First Spell:</b> " +
                            nextSpell(0) +
                            "<br />" +
                            "<b>Second Spell:</b> " +
                            nextSpell(1) +
                            "<br />" +
                            "<b>Third Spell:</b> " +
                            nextSpell(2) +
                            "<br />" +
                            "<b>Fourth Spell:</b> " +
                            nextSpell(3) +
                            "</div>",
                        "this"
                    );
                    Game.tooltip.wobble();
                };
                clearInterval(lookup);
            }
        }, 1000);
    }
})();

// Predict the next spell
nextSpell = function (i) {
    if (Game.ObjectsById[7].minigameLoaded) {
        season = Game.season;
        var obj = obj || {};
        M = Game.ObjectsById[7].minigame;
        spell = M.spellsById[1];
        var failChance = M.getFailChance(spell);
        if (typeof obj.failChanceSet !== "undefined")
            failChance = obj.failChanceSet;
        if (typeof obj.failChanceAdd !== "undefined")
            failChance += obj.failChanceAdd;
        if (typeof obj.failChanceMult !== "undefined")
            failChance *= obj.failChanceMult;
        if (typeof obj.failChanceMax !== "undefined")
            failChance = Math.max(failChance, obj.failChanceMax);
        Math.seedrandom(Game.seed + "/" + (M.spellsCastTotal + i));
        var choices = [];
        if (!spell.fail || Math.random() < 1 - failChance) {
            Math.random();
            Math.random();
            if (Game.season == "valentines" || Game.season == "easter") {
                Math.random();
            }
            choices.push(
                '<b style="color:#FFDE5F">Frenzy',
                '<b style="color:#FFDE5F">Lucky'
            );
            if (!Game.hasBuff("Dragonflight"))
                choices.push('<b style="color:#00C4FF">Click Frenzy');
            if (Math.random() < 0.1)
                choices.push(
                    '<b style="color:#FFDE5F">Cookie Chain',
                    '<b style="color:#00C4FF">Cookie Storm',
                    "Blab"
                );
            if (Game.BuildingsOwned >= 10 && Math.random() < 0.25)
                choices.push('<b style="color:#DAA520">Building Special');
            if (Math.random() < 0.15) choices = ["Cookie Storm (Drop)"];
            if (Math.random() < 0.0001)
                choices.push('<b style="color:#5FFFFC">Sugar Lump');
        } else {
            Math.random();
            Math.random();
            if (Game.season == "valentines" || Game.season == "easter") {
                Math.random();
            }
            choices.push(
                '<b style="color:#FF3605">Clot',
                '<b style="color:#FF3605">Ruin Cookies'
            );
            if (Math.random() < 0.1)
                choices.push(
                    '<b style="color:#174F01">Cursed Finger',
                    '<b style="color:#4F0007">Elder Frenzy'
                );
            if (Math.random() < 0.003)
                choices.push('<b style="color:#5FFFFC">Sugar Lump');
            if (Math.random() < 0.1) choices = ["Blab"];
        }
        ret = choose(choices);
        Math.seedrandom();
        return "<small>" + ret + "</b></small>";
    }
};

// This converts the nextSpell(i) to a string to be used for checking conditions for auto casting Force The Hand of Fate in fc_main.
nextSpellName = function (i) {
    if (Game.ObjectsById[7].minigameLoaded) {
        for (var v = i; v <= i; v++) {
            if (
                nextSpell(v) ==
                '<small><b style="color:#FFDE5F">Lucky</b></small>'
            ) {
                return "Lucky";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#FFDE5F">Frenzy</b></small>'
            ) {
                return "Frenzy";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#00C4FF">Click Frenzy</b></small>'
            ) {
                return "Click Frenzy";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#FFDE5F">Cookie Chain</b></small>'
            ) {
                return "Cookie Chain";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#00C4FF">Cookie Storm</b></small>'
            ) {
                return "Cookie Storm";
            }

            if (nextSpell(v) == "<small>Cookie Storm (Drop)</b></small>") {
                return "Cookie Storm (Drop)";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#DAA520">Building Special</b></small>'
            ) {
                return "Building Special";
            }

            if (nextSpell(v) == "<small>Blab</b></small>") {
                return "Blab";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#FF3605">Ruin Cookies</b></small>'
            ) {
                return "Ruin Cookies";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#FF3605">Clot</b></small>'
            ) {
                return "Clot";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#174F01">Cursed Finger</b></small>'
            ) {
                return "Cursed Finger";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#4F0007">Elder Frenzy</b></small>'
            ) {
                return "Elder Frenzy";
            }

            if (
                nextSpell(v) ==
                '<small><b style="color:#5FFFFC">Sugar Lump</b></small>'
            ) {
                return "Sugar Lump";
            }
        }
    }
};

// This function will be used to check time left on building buff within autoCast() function
function BuildingBuffTime() {
    for (var i in Game.buffs) {
        if (Game.buffs[i].type && Game.buffs[i].type.name == "building buff") {
            return Game.buffs[i].time / 30;
        }
    }
    return 0;
}

// Used in autoCast() for some maths in the smart Force The Hand of Fate subroutine
function BuffTimeFactor() {
    var DurMod = 1;
    if (Game.Has("Get lucky")) DurMod *= 2;
    if (Game.Has("Lasting fortune")) DurMod *= 1.1;
    if (Game.Has("Lucky digit")) DurMod *= 1.01;
    if (Game.Has("Lucky number")) DurMod *= 1.01;
    if (Game.Has("Green yeast digestives")) DurMod *= 1.01;
    if (Game.Has("Lucky payout")) DurMod *= 1.01;
    DurMod *= 1 + Game.auraMult("Epoch Manipulator") * 0.05;

    if (Game.hasGod) {
        var godLvl = Game.hasGod("decadence");
        if (godLvl == 1) DurMod *= 1.07;
        else if (godLvl == 2) DurMod *= 1.05;
        else if (godLvl == 3) DurMod *= 1.02;
    }

    return DurMod;
}

// Main function for autoSweet
function autoSweetAction() {
    if (!FrozenCookies.autoSweet) return;

    if (FrozenCookies.autoBuy == 1) {
        autoSweetAction.autobuyyes = 1;
        FrozenCookies.autoBuy = 0;
    } else {
        autoSweetAction.autobuyyes = 0;
    }

    if (typeof Game.ready !== "undefined" && Game.ready) {
        // Ensure state is initialized
        if (typeof autoSweetAction.state == "undefined")
            autoSweetAction.state = 0;

        // Only check next two spells
        if (autoSweetAction.state === 0) {
            if (
                nextSpellName(0) == "Sugar Lump" || 
                nextSpellName(1) == "Sugar Lump"
            ) {
                // If Sugar Lump is found in either next spell, set state to 1
                autoSweetAction.state = 1;
            }
        }

        // Main switch statement to handle different states
        switch (autoSweetAction.state) {
            case 0:
                return;

            case 1: 
                // Adjust mana if tower limit is set
                if (FrozenCookies.towerLimit) {
                    autoSweetAction.manaPrev = FrozenCookies.manaMax;
                    FrozenCookies.manaMax = 37;
                }

                // Check if we can cast
                if (
                    (FrozenCookies.towerLimit && M.magic >= M.magicM) ||
                    (!FrozenCookies.towerLimit && M.magic >= M.magicM - 1)
                ) {
                    // If Sugar Lump isn't already the next spell, cast Haggler's Charm
                    if (nextSpellName(0) != "Sugar Lump") {
                        M.castSpell(M.spellsById[4]);
                        logEvent("autoSweet", "Cast Haggler's Charm while waiting for 'Sweet'");
                    }

                    // If Sugar Lump is found, cast it and disable autoSweet
                    if (nextSpellName(0) == "Sugar Lump") {
                        M.castSpell(M.spellsById[1]);
                        autoSweetAction.state = 0; // Reset state
                        logEvent("autoSweet", "Sugar Lump Get! Disabling Auto Sweet");

                        // Restore mana limit
                        if (autoSweetAction.manaPrev != -1)
                            FrozenCookies.manaMax = autoSweetAction.manaPrev;

                        // Restore autobuy if it was on
                        if (autoSweetAction.autobuyyes == 1) {
                            FrozenCookies.autoBuy = 1;
                            autoSweetAction.autobuyyes = 0;
                        }

                        // Turn off autoSweet
                        FrozenCookies.autoSweet = 0;
                    }
                }
                return;
        }
    }
}
