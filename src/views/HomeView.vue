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
        <div class="col" v-for="card in cardStore.cards" :key="card.id">
            <base-card @remove="removeCard" :front="card.front" :back="card.back" :id="card.id"></base-card>
        </div>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import { useCardStore } from '../stores/CardStore';

export default {
    components: { BaseCard },
    data() {
        return {
            front: '',
            back: '',

            cardStore: useCardStore()
        };
    },
    methods: {
        CreateCard() {
            // this.words.push({
            //     front: this.front,
            //     back: this.back,
            //     id: Date.now()
            // });
            this.cardStore.addCard({
                front: this.front,
                back: this.back,
                id: Date.now()
            });
        },

        removeCard(id) {
            this.cardStore.removeCard(id);
        }
    }
};
</script>

<style></style>
