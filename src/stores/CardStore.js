import { defineStore } from 'pinia';

export const useCardStore = defineStore('cardStore', {
    state: () => {
        return { cards: [] };
    },
    actions: {
        addCard(card) {
            this.cards.push(card);
        },
        removeCard(id) {
            this.cards = this.cards.filter((c) => c.id !== id);
        }
    }
});
