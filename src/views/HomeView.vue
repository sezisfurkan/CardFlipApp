<template>
    <div>
        <span>front:</span>
        <InputText type="text" v-model="front" required />
    </div>
    <div>
        <span>back:</span>
        <InputText type="text" v-model="back" required />
    </div>
    <Button label="Create " @click="CreateCard"></Button>

    <div class="grid">
        <div class="col" v-for="card in cards" :key="card.id">
            <base-card @remove="removeCard" :front="card.front" :back="card.back" :id="card.id"></base-card>
        </div>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import { getCards, createCard, deleteCard } from '../service/cardservice';
export default {
    components: { BaseCard },
    data() {
        return {
            cards: [],
            front: '',
            back: ''
        };
    },
    methods: {
        async CreateCard() {
            const card = {
                front: this.front,
                back: this.back
            };
            createCard(card);
            this.cards = await getCards();
            console.log(this.cards);
        },

        async removeCard(id) {
            deleteCard(id);
            this.cards = await getCards();
        }
    },
    async mounted() {
        this.cards = await getCards();
    }
};
</script>

<style></style>
