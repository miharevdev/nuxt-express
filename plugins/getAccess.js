import { moduleKeys } from "@/assets/js/helpers/check_ac/moduleKeys.js";

const getAccess = (accessKey) => {
    let result = false;
    moduleKeys.forEach(key => {
        if (accessKey == key) {
            result = true;
        };
    });
    return result;
};

export default ({ app }, inject) => {
    inject("getAccess", getAccess);
};
