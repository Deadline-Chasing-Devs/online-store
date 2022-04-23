// Create session cookie
export const sessionizeUser = (user) => {
    return { username: user.username };
};
