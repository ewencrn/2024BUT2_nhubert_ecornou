const { mysql, DataTypes } = require('mysql');
const mysql = require('../config/database');

const Utilisateur = mysql.define('utilisateur', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    motDePasse: { type: DataTypes.STRING, allowNull: false },
    dateDeNaissance: { type: DataTypes.DATE, allowNull: false },
    role: { type: DataTypes.ENUM('client', 'agent', 'admin'), defaultValue: 'client' },
}, {
    freezeTableName: true, // Utilise le nom exact de la table existante
    timestamps: false, // Pas de colonnes createdAt/updatedAt
});

module.exports = Utilisateur;
