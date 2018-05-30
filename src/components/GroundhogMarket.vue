<template>
    <div>
        <div v-if="groundhogMarketPane.state.explained">
            You have <i class="icon ion-ios-ionic tachyon"></i> {{ userInventory.tachyons }} Tachyons.
            You earn Tachyons when starting a new life.<br>
            The more achievements you have, the more Tachyons you earn.<br>
            Tachyons and Purchases are linked to your account, not to your savegame.
            <table v-if="marketItems.items.length > 0">
                <tr>
                    <th style="width: 4rem;"></th>
                    <th style="width: 10rem;"></th>
                    <th style="width: 30rem;"></th>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Permanent Items</strong>
                    </td>
                </tr>
                <tr
                    v-for="item of sortedMarketItems"
                    v-if="!item.Consumable.UsageCount"
                    :key="item">
                    <td>
                        <i class="icon ion-ios-ionic tachyon-normal"></i>{{ item.VirtualCurrencyPrices.TA }}
                    </td>
                    <td>
                        <button
                            :class="['btn', userInventory.have(item) ? 'btn-success' : 'btn-primary']"
                            style="width: 100%;"
                            :disabled="userInventory.have(item) || item.VirtualCurrencyPrices.TA > userInventory.tachyons || marketItems.purchasing"
                            @click="marketItems.purchase(item)"
                        >
                            {{ item.DisplayName }}
                        </button>
                    </td>
                    <td>
                        {{ item.Description }}
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Single Use</strong>
                    </td>
                </tr>
                <tr
                    v-for="item of sortedMarketItems"
                    v-if="item.Consumable.UsageCount"
                    :key="item">
                    <td>
                        <i class="icon ion-ios-ionic tachyon-normal"></i>{{ item.VirtualCurrencyPrices.TA }}
                    </td>
                    <td>
                        <button
                            class="btn btn-primary"
                            style="width: 100%;"
                            :disabled="item.VirtualCurrencyPrices.TA > userInventory.tachyons || marketItems.purchasing"
                            @click="marketItems.purchase(item)"
                        >
                            {{ item.DisplayName }}
                        </button>
                    </td>
                    <td>
                        {{ item.Description }}
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <span v-if="darkMatterTicks.getValue() > 0">
                            {{ formatDays(darkMatterTicks.getValue()) }} left
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style="min-height: 2rem;" colspan="3">
                        <span v-if="marketItems.purchasing">Purchasing Item...</span>
                    </td>
                </tr>
            </table>
            <div v-else>
                Loading...
            </div>
            <div style="padding-top: 30px;">
                Get more Tachyons
                <table v-if="kongItems.items.length > 0">
                    <tr v-for="item of kongItems.items" :key="item"></tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { formatDays } from '../lib/utils';

function l() {
}


export default {
    name: 'groundhog-market',
    computed: {
        sortedMarketItems: function () {
            return this.marketItems.items.map(x=>x).sort(function (a, b) {
                return a.VirtualCurrencyPrices.TA > b.VirtualCurrencyPrices.TA;
            });
        },
        ...mapGetters([
            'groundhogMarketPane',
            'marketItems',
            'userInventory',
            'kongItems',
            'darkMatterTicks'
        ])},
    methods: {
        formatDays,
        purchaseKong: function (module) {
            if (window.kongregate.services.isGuest())
                window.kongregate.services.showRegistrationBox();
            else
                window.kongregate.mtx.purchaseItems([module.identifier], l);
        }
    }
};
</script>
