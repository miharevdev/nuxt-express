<template>
    <div class="flex flex-col lg:flex-row w-full h-full pl-4 py-4">
        <div class="flex flex-col justify-start items-center w-full lg:w-2/3 h-1/2 lg:h-full">
            <span v-if="loading" class="flex text-gray-500 mt-32">
                <pulse-loader class="mt-0.5 ml-2" color="#9ca3af" :loading="loading" :size="8" :height="4" :width="10"
                    widthUnit="px" />
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
                    <div class="flex-col  h-full w-full overflow-y-auto"
                        :class="[mockChannels.length > 3 ? 'pr-2' : 'lg:pr-2']">

                        <div v-for="channel in mockChannels" :key="channel.channel_name"
                            class="flex h-96 md:h-64 w-full mb-4 last:mb-0 border border-solid rounded-md"
                            @click="getChannel(channel)"
                            :class="[currentChannel === channel.channel_name ? 'border-sky-400' : 'border-gray-200']">
                            <channel-header :title="channel.channel_name" :status="channel.channel_status" />
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <div
            class="flex flex-col justify-start items-center w-full lg:w-1/3 h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l border-solid border-gray-200">
            <span v-if="loading" class="flex text-gray-500 mt-32">
                <pulse-loader class="mt-0.5 ml-2" color="#9ca3af" :loading="loading" :size="8" :height="4" :width="10"
                    widthUnit="px" />
            </span>
            <div v-else class="flex-col justify-start items-center w-full lg:pl-4">
                <div class="flex justify-start w-full pt-2 lg:pt-0">
                    <span class="flex w-full text-xs text-gray-500 mt-0.5">
                        Текущий канал
                    </span>
                    <div class="flex w-full">
                        <div class="flex items-center justify-end w-full text-xs mt-0.5">
                            <span class="mr-1 text-gray-500">
                                Статус:
                            </span>
                            <div class="flex justify-end mr-1 w-12"
                                :class="[currentChannelSection.channel_status === 'active' ? 'text-green-700' : 'text-red-600']">
                                <span v-if="currentChannelSection.channel_status">{{
                                    currentChannelSection.channel_status === "active" ? "Открыт" : "Закрыт" }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between flex-wrap h-full w-full mt-5">
                    <div class="flex-col min-w-32">
                        <form-input :value="stateDetailed.channel_name" class="ml-0" :hasButton="false"
                            title="Название канала" :inactive="inactiveDetailed" />
                        <form-input :value="stateDetailed.owner" class="mt-4" :hasButton="false" title="Владелец" :inactive="inactiveDetailed" />
                        <form-input :value="stateDetailed.channel_adress" class="mt-4" :hasButton="false" title="Адрес" :inactive="inactiveDetailed" />
                        <form-input :value="stateDetailed.created_at" class="mt-4" :hasButton="false" title="Дата создания" :inactive="inactiveDetailed" />
                    </div>
                    <div class="flex flex-col justify-between w-1/2 md:w-full h-full">
                        <div class="flex flex-col sm:flex-col justify-start items-start h-10 sm:h-auto w-full md:w-1/2 min-w-32 py-2 px-2">
                            <span class="flex justify-start items-center w-full bg-gray-50 text-gray-500 m-1">Подп. : {{ stateDetailed?.channel_params?.subscribers_quantity }}</span>
                            <span class="flex justify-start items-center w-full bg-gray-50 text-gray-500 m-1">В сети : {{ stateDetailed?.channel_params?.subscribers_on_channel }}</span>
                            <span class="flex justify-start items-center w-full bg-gray-50 text-gray-500 m-1">Активн. : {{ stateDetailed?.channel_params?.subscribers_activity }}</span>
                        </div>
                        <div class="flex h-32 w-32 border border-solid border-gray-200">

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

import FormInput from "~/components/UI/inputs/FormInput.vue";

export default {
    components: {
        PulseLoader,
        ChannelHeader,
        FormInput
    },

    data() {
        return {
            currentChannel: "",
            currentChannelSection: {},

            loading: false,
            currentTime: "",

            formGroupData: [],
            stateDetailed: {},
            inactiveDetailed: true,

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
                        subscribers_activity: 1800060
                    }
                },
                {
                    created_at: "09.07.2023",
                    owner: "@owner 2",
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
        },

        getChannel(ch) {
            this.currentChannel = ch.channel_name;
            this.currentChannelSection = ch;

            this.setDetails(ch);
        },

        setDetails(details) {
            this.stateDetailed = {};
            this.stateDetailed = details;
        }
    }
}
</script>

<style scoped></style>