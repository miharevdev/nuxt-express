import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
import { storage } from "./storage.js";

class Network {
    exec(params) {
        const key = storage.getKey("atkn");
        const reqData = {
            cancelToken: source.token,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`
            }
        }
        if (!params.method || params.method.toLowerCase() === "get") {
            return axios.get(`${"http://localhost:5002/api"}/${params.url}`, {
                ...reqData
            })
        } else if (params.method.toLowerCase() === "post") {
            return axios.post(`${"http://localhost:5002/api"}/${params.url}`, { ...params.data }, {
                ...reqData
            })
        }
    }
    cancelRequest() {
        source.cancel();
    }

    registration(data) {
        return this.exec({ url: "registration", method: "post",  data: data })
    }

    login(data) {
        return this.exec({ url: "login", method: "post", data: data })
    }

    user() {
        return this.exec({ url: "user" })
    }

    logout() {
        const key = storage.getKey("rtkn");
        return this.exec({ url: "logout", method: "post", data: { refreshToken: key } })
    }
}

export const network = new Network();