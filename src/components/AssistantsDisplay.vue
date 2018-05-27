<template>
    <div>
        <template>
            <div class="row" style="padding-top: 20px;">
                <h5>Assistants</h5>
            </div>
        </template>
        <small>You only pay for work/research assistants if you're actually working/researching</small>
        <div class="row">
            <table>
                <tr v-for="assistant of assistants" :key="assistant" v-if="assistant.unlocked()">
                    <td style="padding-right: 10px">
                        <button
                            :class="['btn', assistant.getValue() ? 'btn-success' : 'btn-secondary']"
                            style="width: 100%"
                            :id="'checkbox_'+assistant.id"
                            role="button"
                            @click="assistant.toggleValue()"
                        >{{ assistant.name }}</button>
                    </td>
                    <td style="padding-right: 10px;">{{ assistant.description }}</td>
                    <td>${{ assistant.cost }}/day</td>
                </tr>
                <tr v-else-if="assistant.locks.keyholdersUnlocked()" style="padding-bottom: 10px">
                    <td colspan="3">Requires: {{ assistant.locks.lockString() }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: 'assistants-display',
    computed: mapGetters(['assistants'])
};
</script>
