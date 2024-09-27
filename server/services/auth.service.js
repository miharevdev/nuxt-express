const bcrypt = require("bcrypt");
const uuid = require('uuid');
const mailService = require("./mail-service");
const tokenService = require("./token-service.js");
const ApiError = require("../exception/api-error.js");
const db = require("../database/connection/db.js");

const userTransform = require("../services/transform/user-transform.js")

class AuthService {

    async registration(email, password) {
        const candidate = await db.query("SELECT * FROM users where email = $1", [email]);
        if (candidate.rows[0]) {
            throw ApiError.BadRequest(`Пользователь уже существует`);
        }
        const createDate = new Date();
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await db.query("INSERT INTO users (email, password, activation_link, created_at) values ($1, $2, $3, $4) RETURNING *",
            [email, hashPassword, activationLink, createDate]);


        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const tokens = tokenService.generateTokens({user: user, dashboard: dashboard});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {...tokens, user: user};
    };

    async activate(activationLink) {
        const user = await db.query("SELECT * FROM users where activation_link = $1", [activationLink]);
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        await db.query("UPDATE users set activation_link = $1 RETURNING *", [activationLink]);
    };

    async login(email, password) {
        const user = await db.query("SELECT * FROM users where email = $1", [email]);
        if (!user.rows[0]) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const tokens = tokenService.generateTokens(user.rows[0]);
        await tokenService.saveToken(user.rows[0].id, tokens.accessToken, tokens.refreshToken);

        return {...tokens, user: user.rows[0]};
    };

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    };

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await db.query("SELECT * FROM users where id = $1", [userData.id]);
        const tokens = tokenService.generateTokens({user});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {...tokens, user: user};
    };

    async getUser(id) {
        const tokenData = await db.query("SELECT * FROM tokens where id = $1", [id]);
        if (!tokenData.rows[0]) {
            throw ApiError.UnauthorizedError();
        }
        const user = await db.query("SELECT * FROM users where id = $1", [id]);
        // const modules = await db.query("SELECT * FROM modules"); ...modules.rows
        return { user: userTransform({...user.rows[0], modules: [] }) }; 
    };
}

module.exports = new AuthService();
