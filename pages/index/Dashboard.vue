<template>
    <div class="dashboard">
        <!-- <filters-panel :filters="filters" /> -->
        <controls-panel  />
        <div class="flex flex-col justify-start items-center h-full w-full">
            <bar-loader color="#9ca3af" :loading="loading" :height="4" :width="100" widthUnit="%" />
            <div class="flex flex-col justify-start items-center h-full w-full p-5">
                <span v-if="loading" class="flex text-gray-500 mt-32">
                    <pulse-loader class="mt-0.5 ml-2" color="#9ca3af" :loading="loading" :size="8" :height="4" :width="10" widthUnit="px" />
                </span>
                <div v-else class="calendar-wrapper pr-4 border border-solid border-gray-200 rounded-md">
                    <channel-list />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FiltersPanel from "/components/filters/FiltersPanel.vue";
import ControlsPanel from "/components/controls/ControlPanel.vue";
import ChannelList from "~/components/channels/channelUnits/ChannelList.vue";

import { BarLoader, PulseLoader } from "@saeris/vue-spinners";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData);
require('dayjs/locale/ru')
dayjs().locale('ru').format()

    export default {
        components: {
            FiltersPanel,
            BarLoader,
            PulseLoader,
            ControlsPanel,
            ChannelList
        },

        data() {
            return {
                loading: false,
                filters: [
                    {
                        type: "input",
                        cap: "Название канала",
                        query: { type: "" }
                    },
                    {
                        type: "select",
                        cap: "Администратор",
                        dic: "channel_admins",
                        withoutFilter: true,
                        query: { type: "" }
                    }
                ],

                controlsConfig: [
                    {
                        type: "select",
                        cap: "Период",
                        dic: "main_period",
                        withoutFilter: true,
                        query: { type: "" }
                    }
                ],

                month_config: {
                    days_name: []
                }
            }
        },


        mounted() {
            this.loading = false;
            this.setMonthConfig();


            

            
            // dayjs.locale('ru')
            // console.log(dayjs().daysInMonth());
            // console.log(dayjs.weekdays("ru"));
            // console.log(dayjs.weekdaysShort());
            // console.log(dayjs.weekdaysMin("ru"));
            // console.log(dayjs.monthsShort());
            // console.log(dayjs.months());
        },

        methods: {
            setMonthConfig() {
                dayjs.locale('ru');
                if (window.innerWidth < 996) {
                    this.month_config.days_name = dayjs.weekdaysMin("ru");
                } else {
                    this.month_config.days_name = dayjs.weekdays("ru");
                }
                
            }
        }
    }
</script>