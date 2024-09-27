<template>
    <div class="flex flex-col items-center min-h-64 min-w-80 px-6 py-8 gap-5 border border-solid border-gray-300 rounded-md bg-gray-100">
        <div class="flex justify-center items-center h-20 w-full text-xl font-semibold text-gray-500">
            <span>CHANNEL</span>
            <span class="text-red-600">_</span>
            <span>MNG</span>
        </div>
        <h2 class="text-lg text-gray-500">{{ regState ? "Регистрация" : "Вход" }}</h2>
        <form-input v-model="state.email" title="Логин" :message="errorMessage" :hasWarning="errorMessage == 'Пользователь с таким email не найден'" />
        <form-input v-model="state.password" title="Пароль" type="password" :message="errorMessage" :hasWarning="errorMessage == 'Неверный пароль'" />
        <form-input v-if="regState" v-model="state.confirmPassword" title="Повторите пароль" type="password" :message="errorMessage" :hasWarning="errorMessage == 'Пароли не совпадают'" />
        <div class="flex justify-start items-center text-xs text-gray-500">
            {{ regState ? "Есть учетная запись?" : "Нет учетной записи?" }}
            <span 
                class="text-xs text-gray-700 ml-2 hover:text-red-600 cursor-pointer"
                @click="toRegistration(regState)">
                {{ regState ? "Вход" : "Регистрация"}}
            </span>
        </div>
        <div class="flex justify-center items-center">
            <form-button class="mt-6" :title="regState ? 'Зарегистрироваться' : 'Войти'" @handler="handler" />
        </div>
    </div>
</template>

<script>
import { network } from "~/assets/js/helpers/network";
    import FormInput from "../UI/inputs/FormInput.vue";
    import FormButton from "../UI/buttons/FormButton.vue";
    import { storage } from "../../assets/js/helpers/storage.js";

    export default {
        components: {
            FormInput,
            FormButton
        },

        data() {
            return {
                regState: false,
                state: {
                    email: "",
                    password: "",
                    confirmPassword: ""
                },
                errorMessage: ""
            }
        },

        watch: {
            errorMessage: {
                handler(value) {
                    if (value) {
                        setTimeout(() => {
                            this.errorMessage = "";
                        }, 3000);
                    }
                }
            }
        },

        methods: {
            toRegistration(state) {
                this.regState = !state;
            },

            validateField() {
                return this.state.email !== "" && this.state.password !== "" ? true : false;
            },

            checkPass() {
                if (this.state.password === this.state.confirmPassword) {
                    return true;
                }
                this.errorMessage = "Пароли не совпадают"
                return false;
            },

            handler() {
                if (this.regState && this.validateField()) {
                    this.registration()
                } else if (!this.regState && this.validateField()) {
                    this.login()
                }
                return;
            },

            registration() {
                const data = {
                    email: this.state.email,
                    password: this.state.password
                }

                if (!this.checkPass()) return;

                network.registration(data)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);
                    })
            },

            login() {
            const data = {
                email: this.state.email,
                password: this.state.password
            }
                network.login(data)
                .then((res) => {
                storage.setKey("atkn", res.data.accessToken);
                storage.setKey("rtkn", res.data.refreshToken);
                this.errorMessage = "";
                    this.$emit("setAuthState", true);
                })
                .catch((error) => {
                    this.errorMessage = error.response.data.message;
                    this.$emit("setAuthState", false);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>