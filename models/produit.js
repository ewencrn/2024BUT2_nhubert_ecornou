const { mysql, DataTypes } = require('mysql');
const mysql = require('../config/database');

const Produit = mysql.define('produit', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prixFixe: { type: DataTypes.FLOAT, allowNull: false },
    statut: { type: DataTypes.ENUM('disponible', 'loué'), defaultValue: 'disponible' },
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Produit;
