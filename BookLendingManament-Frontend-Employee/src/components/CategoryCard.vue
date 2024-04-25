<script>
export default {
    props: {
        category: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ category.name }}
        </div>
    </div>
</template>
