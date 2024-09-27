const jwt = require("jsonwebtoken");
const db = require("../database/connection/db.js");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '12h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '12h'})
        return {
            accessToken,
            refreshToken
        }
    };

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    };

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    };

    async saveToken(userId, accessToken, refreshToken) {
        const tokenData = await db.query("SELECT * FROM tokens where id = $1", [userId]);
        if (!tokenData.rows[0]) {
            const token = await db.query("INSERT INTO tokens (id, access_token, refresh_token) values ($1, $2, $3) RETURNING *", [userId, accessToken, refreshToken]);
            return token;
        } else {
            await db.query("DELETE FROM tokens where refresh_token = $1", [tokenData.rows[0].refresh_token]);
            const token = await db.query("INSERT INTO tokens (id, access_token, refresh_token) values ($1, $2, $3) RETURNING *", [userId, accessToken, refreshToken]);
            return token;
        }
    };

    async removeToken(refreshToken) {
        const tokenData = await db.query("DELETE FROM tokens where refresh_token = $1", [refreshToken]);

        return tokenData;
    };

    async findToken(refreshToken) {
        const tokenData = await db.query("SELECT * FROM tokens where refresh_token = $1", [refreshToken]);

        return tokenData;
    };
}

module.exports = new TokenService();
