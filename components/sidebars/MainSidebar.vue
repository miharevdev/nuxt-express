<template>
    <div class="sidebar border-r border-solid border-gray-300">
        <div class="md:hidden flex justify-center items-center h-20 w-full text-xl font-semibold text-gray-500">
            <span>C</span>
            <span class="text-red-600">_</span>
            <span>M</span>
        </div>
        <div class="hidden md:flex justify-center items-center h-20 w-full text-xl font-semibold text-gray-500">
            <span>CHANNEL</span>
            <span class="text-red-600">_</span>
            <span>MNG</span>
        </div>

        <nav class="h-full w-full md:pl-6 ">
            <div v-for="item in sidebar" :key="item.icon">
                <!-- <sidebaritem v-if="$getAccess(item.rule)" :item="item" @itemHandler="itemHandler" :color="itemName === item.icon ? '#1e293b' : '#64748b'" /> -->
                <sidebaritem :item="item" @itemHandler="itemHandler" :color="itemName === item.icon ? '#38bdf8' : '#64748b'" />
            </div>
        </nav>
    </div>
</template>

<script>
import Sidebaritem from "./Sidebaritem.vue";

    export default {
        components: {
            Sidebaritem
        },
        data() {
            return {
                itemName: "",
                sidebar: [
                    {
                        show: "",
                        icon: "channels",
                        cap: "Каналы",
                        rule: "dashboard.channel.read",
                        path: "/dashboard"
                    },
                    {
                        show: "",
                        icon: "plane",
                        cap: "Опубликовано",
                        rule: "dashboard.published.read",
                        path: "/dashboard/publishedlist"
                    },
                    {
                        show: "",
                        icon: "preprint",
                        cap: "Препринт",
                        rule: "dashboard.preprint.read",
                        path: "/dashboard/preprint"
                    },
                    {
                        show: "",
                        icon: "archive",
                        cap: "Архив",
                        rule: "dashboard.archive.read",
                        path: "/dashboard/archive"
                    },
                    {
                        show: "",
                        icon: "users",
                        cap: "Пользователи",
                        rule: "dashboard.users.read",
                        path: "/dashboard/users"
                    },
                    {
                        show: "",
                        icon: "roles",
                        cap: "Роли",
                        rule: "dashboard.roles.read",
                        path: "/dashboard/roles"
                    },
                    {
                        show: "",
                        icon: "statistics",
                        cap: "Статистика",
                        rule: "dashboard.statistics.read",
                        path: "/dashboard/statistics"
                    },
                    {
                        show: "",
                        icon: "star",
                        cap: "Руководство пользователя",
                        rule: "dashboard.statistics.read",
                        path: "/dashboard"
                    }
                ]
            }
        },

        mounted() {
            this.itemName = "channels";
        },

        methods: {
            itemHandler(data) {
                this.itemName = data.icon;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>