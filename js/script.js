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

    var Guard = function (name, type, ally) {
            this.name = name;
            this.type = type;
            this.ally = ally;
        };

    var Boss = function (name, type) {
        this.name = name;
        this.type = type;
    };

    var Areas = function (name, fileName, type, mobs, guards, boss) {
        this.name = name;
        this.fileName = fileName;
        this.type = type;
        this.mobs = mobs;
        this.guards = guards;
        this.boss = boss;
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
    var hrad = new Guard("H'rad", 'normal', true, '01');

    //And the bosses
    var beardyBoss = new Boss('Beardy Boss', 'normal', true, '01');

    var startingArea = new Areas('Starting Area', 'area1', 'normal', [moonFace, gutsy, balloon, afro, swirley, siggy, lignums], [hrad], beardyBoss);

    var areas = [startingArea];
}());