<script>
export default {
    props: {
        categories: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(category, index) in categories" :key="category._id" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ category.name }}
        </li>
    </ul>
</template>