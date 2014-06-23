/*global confirm , prompt , alert , window , math , document, console, setTimeout, localStorage, atob, btoa, setInterval*/
/*jslint vars: true */ //Make ALL the vars!
(function () {
    'use strict';

    var Mob = function (name, type, ally, num) {
            this.name = name;
            this.type = type;
            this.ally = ally;
            this.num = num;
        };

    var Guard = function (name, type, ally, hp, num) {
            this.name = name;
            this.type = type;
            this.ally = ally;
            this.hp = hp;
            this.num = num;
        };

    var Boss = function (name, type, hp) {
        this.name = name;
        this.type = type;
        this.hp = hp;
    };

    var Areas = function (name, fileName, type, mobs, mobsToBeat, guards, boss, hpHigh, hpLow) {
        this.name = name;
        this.fileName = fileName;
        this.type = type;
        this.mobs = mobs;
        this.mobsToBeat = mobsToBeat;
        this.guards = guards;
        this.boss = boss;
        this.hpHigh = hpHigh;
        this.hpLow = hpLow;
    };

    var Upgrade = function (name, basePrice, priceIncrease, type, basePower) {
        this.name = name;
        this.basePrice = basePrice;
        this.priceIncrease = priceIncrease;
        this.numOwned = 0;
        this.type = type;
        this.basePower = basePower;
    };

    //Lets make a bunch of mobs!
    var moonFace = new Mob('Moon Face', 'normal', true, '01'),
        gutsy = new Mob('Gutsy', 'normal', true, '02'),
        balloon = new Mob('Balloony', 'normal', true, '03'),
        afro = new Mob("A'Fro", 'normal', true, '04'),
        swirley = new Mob('Swirley', 'normal', true, '05');

    //Guard time!
    var hrad = new Guard("H'rad", 'normal', true, 3000, '01'),
        siggy = new Guard('Siggy Nor', 'normal', true, 3500, '02'),
        lignums = new Guard('Lignums', 'normal', true, 4000,  '03');

    //And the bosses
    var beardyBoss = new Boss('Beardy Boss', 'normal', 7000);

    var startingArea = new Areas('Starting Area', 'area1', 'normal', [moonFace, gutsy, balloon, afro, swirley], 30, [hrad, siggy, lignums], beardyBoss, 10, 30);

    var areas = [startingArea];

    //variables to use later in functions:

    // making the upgradse
    var henchman = new Upgrade('Henchman', 5, 1.5, "autoclick", 0.1);

    var save = {
        currentArea: startingArea,
        alies: [],
        tinySoulsTotal: 0,
        tinySouls: 1,
        clickPower: 1,
        killCounter: 0,
        upgrades: [henchman]
    };

    //variables to use later in functions:
    var targetMob, hpValue, hpCurrent, timer = 1000, guard = false, boss = false, i = 0, costHench = save.upgrades[0].basePrice, henchmanPower;

    var getId = function(id) {
        return document.getElementById(id);
    };

    var changeMobImg = function(type) {
        getId("mob").src = "img/mobs/" + save.currentArea.fileName + "_" + targetMob.num + "_" + type + ".png";
    };

    var henchmanHTML = getId('henchman');

    var updateUpgrades = function() {
        getId('costHench').innerHTML = costHench;
        getId('henchOwned').innerHTML = save.upgrades[0].numOwned;
    };

    henchmanHTML.addEventListener('click', function() {
        if (save.tinySoulsTotal - costHench < 0) {
            console.log('woopsie');
        } else {
            save.tinySoulsTotal -= costHench;
            getId('soulsCollected').innerHTML = save.tinySoulsTotal;
            save.upgrades[0].numOwned += 1;
            console.log(save.upgrades[0].numOwned);
            costHench = Math.ceil(costHench * save.upgrades[0].priceIncrease);
            updateUpgrades();
            henchmanPower = save.upgrades[0].basePower * save.upgrades[0].numOwned;
        }

    });

    updateUpgrades();

    //lets generate a random mob to beat u- err, set free~
    var mobStatus = function() {
        var result = hpCurrent / hpValue * 100;
        var mobStatus = getId('mobStatus');
        if (result >= 90) {
            mobStatus.innerHTML = targetMob.name + " is feeling floating fit!";
        } else if (result >= 60) {
            mobStatus.innerHTML = targetMob.name + " isn't giving up just yet!";
        } else if (result >= 30) {
            mobStatus.innerHTML = "Ouchie! That really hurt " + targetMob.name + "!";
        } else {
            mobStatus.innerHTML = targetMob.name + " seems to be fading...";
        }
    };

    //list upgrades 

/*    var htmlUpdrade = function(nameUpgrade, upgradeTxt) {
        var div = document.createElement('div'),
            h2 = document.createElement('h2'),
            p = document.createElement('p'),
            p2 = document.createElement('p'),
            span = document.createElement('span');

        h2.innerHTML = nameUpgrade;
        p.innerHTML = upgradeTxt;
    };*/

    var newMob = function(kindOfMob, num) {

        if (kindOfMob === "guard") {
            targetMob = save.currentArea.guards[num];
            hpValue = save.currentArea.guards[num].hp;
            hpCurrent = hpValue;
            changeMobImg("guard");
            mobStatus();
        } else if (kindOfMob === "boss") {
            targetMob = save.currentArea.boss;
            hpValue = targetMob.hp;
            hpCurrent = hpValue;
            getId('mob').src = "img/mobs/" + save.currentArea.fileName + "_boss.png";
            mobStatus();
        } else {
            //pick a random normal mob
            targetMob = save.currentArea.mobs[Math.floor(Math.random() * save.currentArea.mobs.length)];
            hpValue = Math.floor(Math.random() * (save.currentArea.hpHigh - save.currentArea.hpLow) + save.currentArea.hpLow);
            hpCurrent = hpValue;
            //woop, lets show the mob!
            changeMobImg("mob");
            mobStatus();
        }
    };

    var attackMob = function(attPower) {
        console.log(hpCurrent);
        hpCurrent -= attPower;
        mobStatus();
        getId('mob').setAttribute('class', 'shake');
        setTimeout(function() {
            getId('mob').setAttribute('class', 'floating');
        }, 450);
        if (hpCurrent <= 0 && guard === false && boss === false) {
            newMob("mob", 0);
            save.tinySoulsTotal += save.tinySouls;
            getId('soulsCollected').innerHTML = save.tinySoulsTotal;
            save.killCounter += 1;
            if (save.killCounter === save.currentArea.mobsToBeat) {
                var guardClick = document.createElement('h4');
                guardClick.innerHTML = "Do you feel ready to challenge the guards?";
                getId('sidebar-wrapper').appendChild(guardClick);
                guardClick.addEventListener('click', function() {
                    guard = true;
                    save.killCounter = 0;
                    getId('sidebar-wrapper').removeChild(guardClick);
                    newMob("guard", i);
                });
            }
        } else if (guard === true) {
            if (hpCurrent <= 0 && save.killCounter < save.currentArea.guards.length) {
                i += 1;
                newMob("guard", i);
                save.tinySoulsTotal += save.tinySouls * 150;
                getId('soulsCollected').innerHTML = save.tinySoulsTotal;
                save.killCounter += 1;
            } else if (save.currentArea.guards.length === save.killCounter + 1) {
                guard = false;
                newMob("mob", 0);
                var bossClick = document.createElement('h4');
                bossClick.innerHTML = "The boss is waiting for you...";
                getId('sidebar-wrapper').appendChild(bossClick);
                bossClick.addEventListener('click', function() {
                    guard = false;
                    boss = true;
                    save.killCounter = 0;
                    getId('sidebar-wrapper').removeChild(bossClick);
                    newMob("boss", save.killCounter);
                });
            }
        } else if (boss === true) {
            if (hpCurrent <= 0) {
                boss = false;
                save.tinySoulsTotal += save.tinySouls * 300;
            }
        }
    };

    newMob();

    getId("mob").addEventListener('click', function() {attackMob(save.clickPower) });

    setInterval( function(){ if (save.upgrades[0].numOwned > 0) {attackMob(henchmanPower); console.log('hit ' + henchmanPower)}

    }, timer);

    //autosaving
    function save_game() {
        localStorage['tinySoulsSave'] = btoa(JSON.stringify(save));
    }

    function load_game() {
        if (!localStorage['tinySoulsSave']) return;
        var save_data = JSON.parse(atob(localStorage['tinySoulsSave']));
        save = save_data;

        getId('soulsCollected').innerHTML = save.tinySoulsTotal;
        updateUpgrades();
    }

    load_game();
    setInterval(save_game, 500);

}());