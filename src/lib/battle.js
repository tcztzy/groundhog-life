import { BasicEntity } from "./basic-entity";
import { Stat } from "./stats/stat";
import { currentYear } from './game-time';
import globalPNG from '../asserts/img/globe.png';
import { LevelAddMultModifier } from "./modifiers/modifier";
import { laserGun } from "./research/physics";

let y = 200;
let C = (y - 10) / 365 / 42;
function L() {
    return {
        health: 5,
        maxHealth: 5,
        x: 0,
        y: y,
        dx: C,
        dy: 0,
        speed: C,
        earthDistance: y,
        flags: [
            false,
            false,
            false,
            false
        ]
    };
}
function S(module, exports, require) {
    var n = Math.sqrt(module * module + exports * exports);
    return 0 === n ? [
        0,
        0
    ] : [
        module / n * require,
        exports / n * require
    ];
}
function calculateEnemiesDistance(module, exports, require, n) {
    return Math.sqrt(Math.pow(module - require, 2) + Math.pow(exports - n, 2));
}

class I {
    enemies = [L()];
    enemyReachedSolarSystem = false;
    scale = 400;
    alienTech = 0;
    enemiesDestroyed = 0;
    enemiesDestroyedTotal = 0;
    target = null;
    wave = -1;
    waveTicks = 0;
    laserGunActive = false;
    alienComm = [];
}

class T extends BasicEntity {
    constructor() {
        super('battle', 'Battle', new I());
        this.laserGunDamage = new Stat('laserGunDamage', 'Laser Gun Damage', 0.01, 2, '', '');
        let modifier = new LevelAddMultModifier('lg_dmg_mod', 'Laser Gun Research', 10, laserGun.xp, 0.1);
        this.laserGunDamage.addModifier(modifier);
        this.earthX = 200;
        this.earthY = 200;
        this.earthImage = new Image();
        this.earthImage.src = globalPNG;
    }
    advanceShips() {
        if (this.state.enemyReachedSolarSystem)
            return void (this.state.target = null);
        let module = null;
        let reachedDayThreshold = 999999;
        for (let enemy of this.state.enemies) {
            enemy.y += enemy.dx;
            enemy.y += enemy.dy;
            let earthDistance = calculateEnemiesDistance(enemy.x, enemy.y, this.earthX, this.earthY);
            enemy.earthDistance = earthDistance;
            let reachedDays = earthDistance / enemy.speed;
            if (reachedDays < reachedDayThreshold && enemy.earthDistance < y - 10) {
                reachedDayThreshold = reachedDays;
                module = enemy;
            }
            if (earthDistance < 10)
                this.state.enemyReachedSolarSystem = true;
        }
        this.state.target = module;
    }

    startWaves() {
        this.state.alienComm.unshift('EXHIBIT IS RESISTING');
        this.state.wave = 0;
    }

    startWave() {
        this.state.wave++;
        let wave = this.state.wave;
        this.state.waveTicks = 0;
        switch (wave) {
            case 3:
                this.state.alienComm.unshift('OVERWHELM');
                break;
            case 11:
                this.state.alienComm.unshift('SEND HEAVY ARMOR');
                break;
            case 25:
                this.state.alienComm.unshift('EXHIBIT UNUSUALLY STRONG. RECORD MISMATCH.');
                break;
            case 50:
                this.state.alienComm.unshift('SEND IN HEADKEEPER 1');
                break;
            case 75:
                this.state.alienComm.unshift('PLAYER - I THINK YOU FINISHED THIS GAME');
                this.state.alienComm.unshift('STAY TUNED FOR UPDATES');
                this.state.alienComm.unshift('IF YOU REALLY LIKE THE GAME, THERE IS A DEV BLOG ON PATREON');
                this.state.alienComm.unshift('https://www.patreon.com/mgronbach');
        }
        let exports = wave % 7 === 0;
        let require = wave % 11 === 0;
        let n = wave % 3 === 0;
        let r = wave % 50 === 0;
        let i = 5 * Math.pow(wave, 1.04) * (require ? 2 : 1) * (r ? 20 : 1);
        let s = currentYear.getValue() < 42 ? C : 10 * C * (exports ? 3 : 1) * (r ? 5 : 1);
        let o = r ? 1 : 8 * (n ? 2 : 1);
        for (let u = 0; u < o; u++) {
            let l = Math.random() - 0.5;
            let c = Math.random() - 0.5;
            if (0 === l && 0 === c)
                l = 0.1;
            let d = -l;
            let f = -c;
            let v = S(l, c, 1.5 * y);
            let h = v[0] + this.earthX;
            let p = v[1] + this.earthY;
            let m = S(d, f, s);
            this.state.enemies.push({
                maxHealth: i,
                health: i,
                x: h,
                y: p,
                dx: m[0],
                dy: m[1],
                speed: s,
                earthDistance: 1.5 * y,
                flags: [
                    exports,
                    require,
                    n,
                    r
                ]
            });
        }
    }

    handleWaves() {
        let numberOfEnemies = this.state.enemies.length > 100;
        this.state.waveTicks++;
        if (currentYear.getValue() < 42) {
            if (0 === this.state.enemies.length && this.state.waveTicks > 180)
                this.startWave();
        }
        else if (this.state.wave >= 0 && !numberOfEnemies && this.state.waveTicks > 180)
            this.startWave();
    }

    attack() {
        let target = this.state.target;
        if (this.state.laserGunActive && target) {
            target.health -= this.laserGunDamage.effective;
            if (target.health <= 0) {
                let exports = this.state.enemies.indexOf(target);
                if (exports > -1)
                    this.state.enemies.splice(exports, 1);
                this.state.target = null;
                this.state.enemiesDestroyed++;
                this.state.enemiesDestroyedTotal++;
                1 === this.state.enemiesDestroyed && this.startWaves();
            }
        }
    }

    update() {
        this.attack();
        this.advanceShips();
        this.handleWaves();
        super.update();
    }

    prestige() {
        this.state.enemies = [L()];
        this.state.alienTech = 0;
        this.state.wave = -1;
        this.state.waveTicks = 0;
        this.state.enemiesDestroyed = 0;
        this.state.enemyReachedSolarSystem = false;
        this.state.target = null;
        this.state.laserGunActive = false;
        this.state.alienComm = [];
        super.prestige();
    }
}

export let battle = new T();
