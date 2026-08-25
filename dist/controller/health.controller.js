export const healthCheck = (req, res) => {
    res.json({
        message: "Archive API is running, everything is okay",
    });
};
