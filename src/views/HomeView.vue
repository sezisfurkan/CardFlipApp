<template>
    <br />
    <div>
        <span>Front:</span>
        <InputText type="text" v-model="front" required />
    </div>
    <br />
    <div>
        <span>Back: </span>
        <InputText type="text" v-model="back" required />
    </div>
    <br />
    <div>
        <span>Level:</span>
        <Dropdown v-model="level" :options="levels" placeholder="Select a Level" class="mt-2 pr-2" />
    </div>
    <br />
    <div><Button label="Create " @click="CreateCard"></Button></div>

    <div class="grid">
        <div class="col" v-for="card in cards" :key="card.id">
            <base-card @remove="removeCard" :front="card.front" :back="card.back" :id="card.id"></base-card>
        </div>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import { getCards, createCard, deleteCard } from '../service/cardservice';
import { useAuthStore } from '../store/auth';

export default {
    components: { BaseCard },
    data() {
        return {
            cards: [],
            front: '',
            back: '',
            level: '',
            levels: ['A LEVEL', 'B LEVEL', 'C LEVEL'],
            authStore: useAuthStore()
        };
    },
    methods: {
        async CreateCard() {
            const card = {
                front: this.front,
                back: this.back,
                newDate: new Date(),
                level: this.level,
                userId: this.authStore.user.uid
            };
            createCard(card);
            this.cards = await getCards(this.authStore.user.uid);
            this.front = '';
            this.back = '';
        },

        async removeCard(id) {
            deleteCard(id);
            this.cards = await getCards(this.authStore.user.uid);
        }
    },
    async mounted() {
        if (this.authStore.user) {
            this.cards = await getCards(this.authStore.user.uid);
        }
    }
};
</script>

<style></style>
