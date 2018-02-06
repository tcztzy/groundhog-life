<template>
    <div>
        <nobr>
            <a :class="stat.recentChange(1)"
               :href="`#details_${stat.id}`"
               :style="`color: ${color};`"
               data-toggle="modal">{{ name ? stat.name + ': ' : '' }}{{ minutes ? formatMinutes(stat.effective) : stat.prefix + abbreviateNumber(stat.effective, stat.digits) + stat.suffix }}</a>
        </nobr>
        <div class="outer-modal">
            <div class="modal fade bd-example-modal-lg"
                 :id="`details_${stat.id}`"
                 tabindex="-1"
                 role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <h5 class="modal-title">{{ stat.name }}</h5>
                        <table>
                            <tr>
                                <th>Modifier</th>
                                <th>Factor</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td class="text-left"> Base Value </td>
                                <td></td>
                                <td class="text-right">{{ stat.prefix + stat.base.toFixed(stat.digits) + stat.suffix }}</td>
                            </tr>
                            <tr v-for="modifierWithValues of stat.modifiersWithValues"
                                :key="modifierWithValues[0].name"
                                v-if="modifierWithValues[0].unlocked()">
                                <td class="text-left">
                                    {{ modifierWithValues[0].name }}
                                </td>
                                <td class="text-right" style="padding-right: 20px; padding-left: 20px">
                                    {{ modifierWithValues[0].operationString + modifierWithValues[0].factor.toFixed(modifierWithValues[0].digits) }}
                                </td>
                                <td class="text-right">
                                    {{ stat.prefix + modifierWithValues[1].toFixed(stat.digits) + stat.suffix }}
                                </td>
                            </tr>
                            <tr>
                                <td> Effective Value </td>
                                <td></td>
                                <td class="text-right">
                                    <b>{{ stat.prefix + stat.effective.toFixed(stat.digits) + stat.suffix }}</b>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { abbreviateNumber, formatMinutes } from "../lib/utils";
export default {
    name: "stat-display",
    props: {
        stat: {},
        name: { default: true, type: Boolean },
        color: { default: "blue" },
        exponential: { default: 1000000 },
        minutes: { default: false }
    },
    methods: {
        abbreviateNumber: abbreviateNumber,
        formatMinutes: formatMinutes
    }
};
</script>

<style scoped>
a {
    color: blue;
}
.up {
    animation-duration: 2s;
    animation-name: color-change-up;
    animation-iteration-count: 1;
}
.down {
    animation-duration: 2s;
    animation-name: color-change-down;
    animation-iteration-count: 1;
}
.modal {
    position: fixed;
    top: 10px;
    right: 100px;
    bottom: 0;
    left: 0;
    z-index: 10040;
    overflow: auto;
    overflow-y: auto;
}
</style>
