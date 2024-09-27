function userTransform(user) {
    return {
        id: user.id,
        dashboard: user.dashboard,
        email: user.email,
        activation_link:user.activation_link,
        created_at: user.created_at,
        modules: user.modules
    }
}

module.exports = userTransform;