<template>
    <div class="dashboard">
        <filters-panel :filters="filters" @action="action" />
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
import { network } from "~/assets/js/helpers/network";

    export default {
        components: {
            FiltersPanel,
            BarLoader,
            PulseLoader
        },

        data() {
            return {
                loading: false,
                user: {},
                filters: [
                    {
                        type: "button",
                        cap: "Добавить роль",
                        key: "add_role"
                    },
                    {
                        type: "input",
                        cap: "Имя пользователя",
                        query: { type: "" }
                    },
                    {
                        type: "input",
                        cap: "Название роли",
                        query: { type: "" }
                    }
                ],
            }
        },

        mounted() {
            this.loadData();
        },

        methods: {
            action(button_key) {
                console.log(button_key);
                console.log(this.user);
            },

            loadData() {
                network.user()
                    .then((res) => {
                        this.user = res.data.user;
                    })
                    .catch((error) => {
                        console.log(error.response.data?.message);
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            }
        }
    }
</script>