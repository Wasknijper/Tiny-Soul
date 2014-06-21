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

    var Guard = function (name, type, ally, hp) {
            this.name = name;
            this.type = type;
            this.ally = ally;
            this.hp = hp;
        };

    var Boss = function (name, type, hp) {
        this.name = name;
        this.type = type;
        this.hp = hp;
    };

    var Areas = function (name, fileName, type, mobs, guards, boss, hpHigh, hpLow) {
        this.name = name;
        this.fileName = fileName;
        this.type = type;
        this.mobs = mobs;
        this.guards = guards;
        this.boss = boss;
        this.hpHigh = hpHigh;
        this.hpLow = hpLow;
    };

    //Lets make a bunch of mobs!
    var moonFace = new Mob('Moon Face', 'normal', true, '01'),
        gutsy = new Mob('Gutsy', 'normal', true, '02'),
        balloon = new Mob('Balloony', 'normal', true, '03'),
        afro = new Mob("A'Fro", 'normal', true, '04'),
        swirley = new Mob('Swirley', 'normal', true, '05'),
        siggy = new Mob('Siggy Nor', 'normal', true, '06'),
        lignums = new Mob('Lignums', 'normal', true, '07');

    //Guard time!
    var hrad = new Guard("H'rad", 'normal', true, '01', 600);

    //And the bosses
    var beardyBoss = new Boss('Beardy Boss', 'normal', true, '01', 2000);

    var startingArea = new Areas('Starting Area', 'area1', 'normal', [moonFace, gutsy, balloon, afro, swirley, siggy, lignums], [hrad], beardyBoss, 10, 30);

    var areas = [startingArea];

    //variables to use later in functions:
    var targetMob, hpValue;

    //here I'll declare (future) upgrades)
    var henchman = 0.1;

    var save = {
        currentArea: startingArea,
        alies: [],
        upgradesHenchman: 0,
        tinySouls: 0

    };

    var getId = function(id) {
        return document.getElementById(id);
    };

    //lets generate a random mob to beat u- err, free~

    var newMob = function() {
        //pick a random normal mob
        targetMob = save.currentArea.mobs[Math.floor(Math.random() * save.currentArea.mobs.length)];
        hpValue = Math.floor(Math.random() * (save.currentArea.hpHigh - save.currentArea.hpLow) + save.currentArea.hpLow);
        //wijs de max en value to aan de HTML elementen
        //had een probleem met innerText in Firefox, vervangen door innerHTML, bron: http://stackoverflow.com/questions/1359469/innertext-works-in-ie-but-not-in-firefox
        getId("mob").src = "img/mobs/" + save.currentArea.fileName + "_" + targetMob.num + "_mob.png";
    };

    newMob();

}());