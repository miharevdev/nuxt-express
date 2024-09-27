<template>
    <div class="flex flex-col lg:flex-row w-full h-full pl-4 py-4">
        <div class="flex flex-col justify-start items-center w-full lg:w-2/3 h-2/3 lg:h-full">
            <span v-if="loading" class="flex text-gray-500 mt-32">
                <pulse-loader class="mt-0.5 ml-2" color="#9ca3af" :loading="loading" :size="8" :height="4" :width="10" widthUnit="px" />
            </span>
            <div v-else class="calendar justify-between items-center w-full h-full">
                <div class="flex justify-start w-full">
                    <span class="flex w-full text-xs text-gray-500 mt-0.5">
                        Все каналы
                    </span>
                    <div class="flex w-full lg:pr-4">
                        <div class="flex items-center justify-end w-full text-xs mt-0.5">
                            <span class="flex justify-end text-gray-700 mr-2">
                                {{ currentTime }} 
                            </span>
                            <span class="flex justify-end text-gray-500 mr-2">
                                |
                            </span>
                            <span class="flex justify-end text-gray-500">
                                {{ getDate }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="channel-list w-full mt-5 lg:pr-2">
                    <div class="flex-col  h-full w-full overflow-y-auto" :class="[mockChannels.length > 3 ? 'pr-2' : 'lg:pr-2']">
                        
                        <div v-for="channel in mockChannels" class="flex h-96 md:h-64 w-full mb-4 last:mb-0 border border-solid border-gray-200 rounded-md">
                            <channel-header :title="channel.channel_name" :status="channel.channel_status" />
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-start items-center w-full lg:w-1/3 h-1/3 lg:h-full border-t lg:border-t-0 lg:border-l border-solid border-gray-200">
            <span v-if="loading" class="flex text-gray-500 mt-32">
                <pulse-loader class="mt-0.5 ml-2" color="#9ca3af" :loading="loading" :size="8" :height="4" :width="10" widthUnit="px" />
            </span>
            <div v-else class="flex justify-between items-center w-full lg:pl-4">
                <div class="flex justify-start w-full pt-2 lg:pt-0">
                    <span class="flex w-full text-xs text-gray-500 mt-0.5">
                        Текущий канал
                    </span>
                    <div class="flex w-full">
                        <div class="flex items-center justify-end w-full text-xs mt-0.5">
                            <span class="mr-1 text-gray-500">
                                Статус:
                            </span>
                            <span class="flex justify-end mr-1" :class="[false ? 'text-green-700' : 'text-red-600']">
                                {{ false ? "Открыт" : "Закрыт" }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PulseLoader } from "@saeris/vue-spinners";
import dayjs from "dayjs";

import ChannelHeader from "../channelComponents/ChannelHeader.vue";

    export default {
        components: {
            PulseLoader,
            ChannelHeader
        },

        data() {
            return {
                currentChannel: "",
                loading: false,
                currentTime: "",

                mockChannels: [
                    {
                        created_at: "12.04.2023",
                        owner: "@owner",
                        channel_name: "Channel 1",
                        channel_description: "Description of 1 channel",
                        channel_status: "active",
                        channel_adress: "@channel_1",
                        channel_params: {
                            subscribers_quantity: 1600,
                            subscribers_on_channel: 1430,
                            subscribers_activity: 1860
                        }
                    },
                    {
                        created_at: "09.07.2023",
                        owner: "@owner",
                        channel_name: "Channel 2",
                        channel_description: "Description of 2 channel",
                        channel_status: "suspended",
                        channel_adress: "@channel_2",
                        channel_params: {
                            subscribers_quantity: 1200,
                            subscribers_on_channel: 430,
                            subscribers_activity: 860
                        }
                    },
                    {
                        created_at: "12.04.2023",
                        owner: "@owner",
                        channel_name: "Channel 3",
                        channel_description: "Description of 3 channel",
                        channel_status: "active",
                        channel_adress: "@channel_3",
                        channel_params: {
                            subscribers_quantity: 900,
                            subscribers_on_channel: 130,
                            subscribers_activity: 560
                        }
                    },
                    {
                        created_at: "12.04.2023",
                        owner: "@owner",
                        channel_name: "Channel 4",
                        channel_description: "Description of 4 channel",
                        channel_status: "active",
                        channel_adress: "@channel_4",
                        channel_params: {
                            subscribers_quantity: 900,
                            subscribers_on_channel: 130,
                            subscribers_activity: 560
                        }
                    }
                ]
            }
        },

        beforeDestroy() {
            clearInterval(this.setInterval);
        },

        mounted() {
            this.getTime();
            setInterval(() => {
                this.getTime()
            }, 1000 * 30);
        },

        computed: {
            getDate() {
                return dayjs().format("DD.MM.YYYY");
            }
        },

        methods: {
            getTime() {
                this.currentTime = dayjs().format("HH:mm");
            }
        }
    }
</script>

<style scoped>

</style>