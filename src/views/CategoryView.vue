<template>
    <div>
        <Dropdown v-model="selectedLevel" :options="levels" placeholder="Select a Level" class="mt-2 pr-2" />

        <div class="grid">
            <div class="col" v-for="card in cards" :key="card.id" v-show="showCard(card)">
                <base-card :front="card.front" :back="card.back" :id="card.id" :deleteIcon="deleteIcon"></base-card>
            </div>
        </div>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import { getCards } from '../service/cardservice';
export default {
    components: { BaseCard },
    data() {
        return {
            selectedLevel: 'ALL',
            levels: ['ALL', 'A LEVEL', 'B LEVEL', 'C LEVEL'],
            cards: [],
            deleteIcon: false
        };
    },
    methods: {
        showCard(card) {
            return this.selectedLevel === 'ALL' || card.level === this.selectedLevel;
        }
    },
    async mounted() {
        this.cards = await getCards();
    }
};
</script>
