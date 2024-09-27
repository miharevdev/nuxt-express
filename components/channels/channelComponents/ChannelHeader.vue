<template>
    <div class="flex justify-between items-center h-10 w-full px-4">
        <span class="text-md text-gray-500">{{ title }}</span>
        <span class="text-sm" :class="currentStatus.color">{{ currentStatus.state }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            title: { type: String, default: "" },
            status: { type: String, default: "" }
        },

        computed: {
            currentStatus() {
                return this.status === "active" 
                    ? { state: "Открыт", color: "text-green-700" } 
                    : { state: "Закрыт", color: "text-red-600" }
            }
        }
    }
</script>

<style scoped>

</style>