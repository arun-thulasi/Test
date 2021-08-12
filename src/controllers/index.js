const indexController = (_req, res) => {
    return res.status(200).send({
        success: true,
        message: "API is working successfully",
    });
};

module.exports = indexController;
