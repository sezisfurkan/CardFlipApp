<template>
    <div>
        <Dropdown v-model="selectedCategory" :options="categoryOptions" placeholder="Select a Level" class="mt-2 pr-2" />

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
import { useAuthStore } from '../store/auth';

export default {
    components: { BaseCard },
    data() {
        return {
            selectedCategory: 'ALL',
            categoryOptions: [],
            cards: [],
            filteredCards: [],
            deleteIcon: false,
            authStore: useAuthStore()
        };
    },
    methods: {
        async filterCards() {
            const filteredCardss = await queryCards(this.selectedCategory, this.authStore.user.uid);
            this.filteredCards = filteredCardss;
        }
    },
    async mounted() {
        const q = await queryCards('ALL', this.authStore.user.uid);
        const categories = new Set(q.map((card) => card.categoryName));
        this.categoryOptions = ['ALL', ...categories];
        console.log('Category options:', this.categoryOptions);

        this.filteredCards = q;
    },
    watch: {
        selectedCategory() {
            this.filterCards();
        }
    }
};
</script>
