"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn("decks", "description", {
            type: sequelize_1.DataTypes.TEXT,
            default: false,
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn("decks", "description");
    },
};
