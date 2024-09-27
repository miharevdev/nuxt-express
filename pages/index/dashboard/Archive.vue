<template>
    <div class="dashboard">
        <filters-panel :filters="filters" />
        <div class="flex flex-col justify-start items-center h-full w-full">
            <bar-loader color="#9ca3af" :loading="loading" :height="4" :width="100" widthUnit="%" />
            <div class="flex flex-col justify-start items-center h-full w-full mt-32">
                <span v-if="loading" class="flex text-gray-500">
                    Получаем данные
                    <pulse-loader class="mt-0.5 ml-2" color="#9ca3af" :loading="loading" :size="8" :height="4" :width="10" widthUnit="px" />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import FiltersPanel from "/components/filters/FiltersPanel.vue";
import { BarLoader, PulseLoader } from "@saeris/vue-spinners";

    export default {
        components: {
            FiltersPanel,
            BarLoader,
            PulseLoader
        },

        data() {
            return {
                loading: true,
                filters: [
                    {
                        type: "input",
                        cap: "Название канала",
                        query: { type: "" }
                    },
                    {
                        type: "input",
                        cap: "Название поста",
                        query: { type: "" }
                    },
                    {
                        type: "select",
                        cap: "Администратор",
                        dic: "channel_admins",
                        withoutFilter: true,
                        query: { type: "" }
                    },
                    {
                        type: "select",
                        cap: "Модератор",
                        dic: "channel_moderators",
                        withoutFilter: true,
                        query: { type: "" }
                    }
                ],
            }
        },

        mounted() {
            this.loading = false;
        }
    }
</script>