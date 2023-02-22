<template>
    <div>
        <Dropdown v-model="selectedLevel" :options="levels" placeholder="Select a Level" class="mt-2 pr-2" />

        <div class="grid">
            <div class="col" v-for="card in filteredCards" :key="card.id">
                <base-card :front="card.front" :back="card.back" :id="card.id" :deleteIcon="deleteIcon"></base-card>
            </div>
        </div>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import { queryCards } from '../service/cardservice';

export default {
    components: { BaseCard },
    data() {
        return {
            selectedLevel: 'ALL',
            levels: ['ALL', 'A LEVEL', 'B LEVEL', 'C LEVEL'],
            cards: [],
            filteredCards: [],
            deleteIcon: false
        };
    },
    methods: {
        async filterCards() {
            const filteredCards = await queryCards(this.selectedLevel);
            return filteredCards;
        }
    },
    async mounted() {
        const filteredCards = await this.filterCards();
        this.filteredCards = filteredCards;
    },
    watch: {
        selectedLevel() {
            this.filterCards().then((filteredCards) => {
                this.filteredCards = filteredCards;
            });
        }
    }
};
</script>
