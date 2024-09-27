const dictionaries = {
    channel_admins: {
        1: "@admin channel 1",
        2: "@admin channel 2"
    },

    channel_moderators: {
        1: "@moderator channel 1",
        2: "@moderator channel 2"
    },

    user_roles: {
        1: "Администратор",
        2: "Модератор"
    },

    main_period: {
        1: "День",
        2: "Неделя",
        3: "Месяц"
    }
}

export function loadDic(dic_name) {
    const result = [];
    for (let d in dictionaries[dic_name]) {
        result.push({ id: d, name: dictionaries[dic_name][d] });
    }
    return result;
}

export function rawDic(dic_name) {
    return dictionaries[dic_name];
}