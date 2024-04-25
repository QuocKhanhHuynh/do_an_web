<script>
export default {
    props: {
        clients: { type: Array, default: [] },
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
        <li class="list-group-item" v-for="(client, index) in clients" :key="clients._id" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ client.username }}
        </li>
    </ul>
</template>