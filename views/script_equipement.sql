CREATE TABLE equipement_sport (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Prix DECIMAL(10, 2) NOT NULL,
    Disponibilité VARCHAR(50) NOT NULL,
    Description TEXT
);



INSERT INTO materiel_sport (ID, Nom, Prix, Disponibilité, Description)
VALUES
(1, 'Colliers de serrage', 15.99, 'En stock', 'Colliers robustes pour sécuriser les poids sur les barres.'),
(2, 'Corde à triceps', 19.99, 'En stock', 'Accessoire pour machines de musculation, idéal pour les exercices de triceps.'),
(3, 'Disques d\'équilibre', 24.99, 'En rupture de stock', 'Parfaits pour travailler la stabilité et l\'équilibre.'),
(4, 'Poids pour chevilles', 29.99, 'En stock', 'Poids ajustables pour augmenter l\'intensité des exercices.'),
(5, 'Ceinture d\'électrostimulation', 79.99, 'En stock', 'Ceinture pour renforcer les abdominaux via électrostimulation.'),
(6, 'Roue de poulie rouge', 9.99, 'En stock', 'Roue de remplacement pour machines de musculation.');


CREATE TABLE materiel_sport (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Description TEXT,
    Prix DECIMAL(10, 2),
    Disponibilite VARCHAR(50) NOT NULL DEFAULT 'En stock',
    Image VARCHAR(255) NOT NULL
);

INSERT INTO materiel_sport (Nom, Description, Prix, Disponibilite, Image)
VALUES
('Machine Marcy', 'Machine complète pour les entraînements musculaires.', 999.99, 'En stock', '/img/machine1.jpg'),
('Machine BH Fitness', 'Machine dédiée à l’entraînement des jambes.', 849.99, 'En stock', '/img/machine2.jpg'),
('Presse de musculation', 'Presse robuste pour les jambes et fessiers.', 1499.99, 'En rupture de stock', '/img/machine3.jpg'),
('Machine Laroq', 'Appareil moderne pour exercices de jambes et abdos.', 1249.99, 'En stock', '/img/machine4.jpg'),
('Machine HiPower', 'Machine professionnelle pour la force et la puissance.', 1399.99, 'En stock', '/img/machine5.jpg'),
('Machine multifonction', 'Appareil complet pour des exercices variés.', 1999.99, 'En stock', '/img/machine6.jpg'),
('Machine de tirage', 'Appareil de tirage pour développer le haut du corps.', 1099.99, 'En stock', '/img/machine7.jpg');