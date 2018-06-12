<template>
    <div>
        <div class="row">
            <h3>BattleScan 3000</h3>
        </div>
        <div class="row">
            <button class="btn btn-primary" @click="battle.state.laserGunActive = !battle.state.laserGunActive">
                Laser Gun is {{ battle.state.laserGunActive ? 'On' : 'Off' }}
            </button>
        </div>
        <div class="row">
            <stat-display :stat="battle.laserGunDamage"/>
        </div>
        <div class="row">
            <canvas id="canvas" width="400" height="400"></canvas>
        </div>
        <div
            class="row"
            v-for="c of battle.state.alienComm"
            :key="c">
            {{ c }}
        </div>
    </div>
</template>
<script>
function f(module, exports) {
    return Math.floor(module + 2 * exports * Math.random() - exports);
}
import { mapGetters } from 'vuex';
import { abbreviateNumber, formatDays } from "@/lib/utils";
import StatDisplay from './StatDisplay.vue';

export default {
    name: 'war-display',
    components: { StatDisplay },
    computed: {
        currentDay: function () {
            return this.time.currentDay.getValue();
        },
        ...mapGetters(['battle', 'time'])
    },
    methods: {
        abbr: abbreviateNumber,
        formatDays: formatDays,
        drawCircle: function (ctx, exports, require, n, fillStyle, i, s) {
            ctx.beginPath();
            ctx.arc(exports, require, n, 0, 2 * Math.PI, !1);
            ctx.fillStyle = fillStyle;
            ctx.fill();
            ctx.lineWidth = i;
            ctx.strokeStyle = s;
            ctx.stroke();
        },
        laserbeam: function (ctx, exports, require, n, r, i, s) {
            ctx.beginPath();
            ctx.strokeStyle = i;
            ctx.lineWidth = s;
            ctx.moveTo(exports, require);
            ctx.lineTo(n + (4 * Math.random() - 2), r + (4 * Math.random() - 2));
            ctx.stroke();
        },
        updateCanvas: function () {
            let module = document.getElementById('canvas'), ctx = module.getContext('2d'), width = module.width, height = module.height;
            ctx.clearRect(1, 1, module.width - 2, module.height - 2);
            ctx.fillStyle = 'black';
            let r = width / 2, s = height / 2, o = this.battle.state.target;
            this.drawCircle(ctx, r, s, this.battle.state.scale / 2 - 10, '#FFFFFF', 1, '#111111');
            this.drawCircle(ctx, r, s, 20, '#ADD8E6', 0, '#00BFFF');
            o && this.battle.state.laserGunActive && this.laserbeam(ctx, r, s, f(o.x, 2), f(o.y, 2), '#FF0000', 2);
            ctx.drawImage(this.battle.earthImage, r - 10, s - 10, 20, 20);
            for (let enemy of this.battle.state.enemies) {
                this.drawCircle(ctx, enemy.x, enemy.y, enemy.flags[3] ? 18 : 6, '#CC2222', (enemy.flags[3] ? 6 : 3) * enemy.health / enemy.maxHealth, enemy.flags[1] ? '#22FF22' : '#2222FF');
            }
            let m = 'Wave: ' + this.battle.state.wave, y = '', g = '';
            ctx.font = '15px Arial';
            ctx.fillStyle = 'white';
            ctx.fillRect(1, 1, ctx.measureText(m).width + 6, 22);
            if (o) {
                g = formatDays(Math.floor(this.battle.state.target.earthDistance / this.battle.state.target.speed));
                y = 'HP: ' + this.abbr(this.battle.state.target.health) + '/' + this.abbr(this.battle.state.target.maxHealth);
                ctx.fillRect(width - 140, 1, 139, 42);
                ctx.fillRect(1, height - 25, 100, 24);
            }
            ctx.fillStyle = 'black';
            ctx.fillText(m, 5, 20);
            if (o) {
                ctx.fillText(g, width - 140, 20);
                ctx.fillText('until Arrival', width - 100, 40);
                ctx.fillText(y, 5, height - 10);
            }
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, module.width, module.height);
        }
    },
    watch: {
        currentDay: function (module, exports) {
            module > exports && this.updateCanvas();
        }
    },
    mounted: function () {
        let module = document.getElementById('canvas'), exports = module.getContext('2d');
        exports.fillStyle = 'black';
        exports.fillRect(0, 0, module.width, module.height);
        this.updateCanvas();
    }
};
</script>
