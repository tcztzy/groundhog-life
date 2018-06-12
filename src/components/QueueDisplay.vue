<template>
    <div>
        <div class="row">
            <nobr>
                <button class="btn m-3" style="width: 12rem;" role="button" :disabled="userInventory.haveAutoResearch" @click="autoResearch.toggleValue()">
                    <small>Auto-Research is {{ autoResearch.select('On', 'Off') }}</small>
                </button>
                <span v-if="userInventory.haveAutoResearch">
                    <input v-model="autoResearchJustPause.value" type="checkbox" id="arjp">
                    <label for="arjp">Pause if Current Research finished</label>
                </span>
                <a v-else href="#" @click="selectPane(groundhogMarketPane)">
                    <small>Unlock</small>
                </a>
            </nobr>
        </div>
        <div class="row">
            <table>
                <tr>
                    <th style="width: 1rem;"></th>
                    <th style="width: 15rem;"></th>
                    <th style="width: 7rem;"></th>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div class="dropdown">
                            <button
                                class="btn btn-primary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Add Area
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button
                                    v-for="area of areas"
                                    :key="area"
                                    v-if="area.unlocked() ||  area.xp.highestLevelEverIncludingThisLife() > 0"
                                    class="dropdown-item" @click="researchQueue.addItem(area)">{{ area.name }}</button>
                            </div>
                        </div>
                    </td>
                    <td>Target Level</td>
                    <td></td>
                    <td></td>
                </tr>
                <tbody>
                <tr
                    v-for="(item, index) in items"
                    :key="item.internalId">
                    <td>
                        <button class="btn btn-danger btn-sm" @click="researchQueue.removeItem(item.internalId)">
                            <span class="icon ion-ios-close"></span>
                        </button>
                    </td>
                    <td :class="[item.unlocked ? 'q-unlocked' : 'q-locked', item.finished ? 'q-finished' : 'q-unfinished', item.active ? 'q-active' : 'q-passive']">{{ item.name }}</td>
                    <td>
                        <input v-model.number="item.goal" class="goal-input" type="text" :tabindex="index + 2">
                    </td>
                    <td>
                        <button class="btn btn-success btn-sm" @click="researchQueue.moveUp(item.internalId)">
                            <span class="icon ion-ios-arrow-up"></span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import draggable from 'vuedraggable';

export default {
    name: 'queue-display',
    components: { draggable },
    computed: {
        items: {
            get() {
                return this.researchQueue.state.items;
            },
            set(value) {
                this.researchQueue.updateOrder(value);
            }
        },
        ...mapGetters([
            'researchQueue',
            'areas',
            'autoResearch',
            'userInventory',
            'groundhogMarketPane',
            'autoResearchJustPause'
        ])
    },
    methods: {
        checkMove(e) {
            console.log(e.draggedContext.element);
            return e.draggedContext.element.name !== 'apple';
        },
        ...mapActions(['selectPane'])
    }
};
</script>
