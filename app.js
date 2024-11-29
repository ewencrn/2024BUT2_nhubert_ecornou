const express = require('express');
const session = require('express-session');
const md5 = require('md5');
const app = express();
const userModel = require("./models/user.js");
const bdd = require("./models/database.js");

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false}));

app.use(session({
    secret: 'pamplemousse',
    resave: false,
    saveUninitialized: false,
}));

app.get('/connexion', function(req,res){
    res.render("login", {error :null});
})

app.post('/connexion', async function(req,res){
    let login= req.body.login;
    let mdp = req.body.password;

    mdp = md5(mdp);

    const user = await userModel.checkLogin(login);

    if (user != false && user.password == mdp){
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;
        return res.redirect("/");
    }
    else{
       res.render("login", {error : "Mauvais Login/Mdp"});
    }

})

app.get('/', async function(req, res) {

    if (req.session.userId == false){
        
    }

    try {
        const user = await userModel.getUserById(2);
        res.render('index', {user});
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
}); 

app.get('/materiel', function(req, res){
    res.render("materiel");
})

app.get('/product/:id', (req, res) => {
    const productId = req.params.id; 
    const query = 'SELECT * FROM equipement_sport WHERE ID = '+ productId; 
    bdd.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            return res.status(500).send('Erreur serveur');
        }
        let produit = results[0];
        res.render('product', { produit });
    });
});



app.get('/equipements', (req, res) => {
    const query = 'SELECT * FROM equipement_sport';
    bdd.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération des données');
        }
        res.render('equipements', { materiels: results });
    });
});

app.get('/materiel', (req, res) => {
    const query = 'SELECT * FROM materiel_sport';
    bdd.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Erreur serveur');
        }
        
        console.log(results)
        res.render('materiel', { materiels: results });
    });
});



app.get('/structures', (req, res) => {
    res.render('structures');
});

app.get('/information', (req, res) => {
    res.render('information');
});
;

app.get('/produit/ajouter', (req, res) => {
    res.render('ajouter-produit'); // Rendre une vue avec le formulaire
});

app.post('/produit/ajouter', (req, res) => {
    const { Nom, Image, Prix, Disponibilite } = req.body; // Données du formulaire
    const query = `INSERT INTO materiel_sport (Nom, Image, Prix, Disponibilite) VALUES (?, ?, ?, ?)`;
    bdd.query(query, [Nom, Image, Prix, Disponibilite], (err, results) => {
        if (err) {
            console.error('Erreur lors de l’ajout du produit :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.redirect('/materiel'); // Redirige l'agent vers la liste des matériels
    });
});


app.post('/produit/supprimer/:id', (req, res) => {
    const productId = req.params.id;

    const checkQuery = `SELECT * FROM locations WHERE ProduitID = ? AND Statut = 'En cours'`;
    bdd.query(checkQuery, [productId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification :', err);
            return res.status(500).send('Erreur serveur');
        }

        if (results.length > 0) {
            return res.status(400).send('Le produit est actuellement en location et ne peut pas être supprimé.');
        }

        const deleteQuery = `DELETE FROM materiel_sport WHERE ID = ?`;
        bdd.query(deleteQuery, [productId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la suppression :', err);
                return res.status(500).send('Erreur serveur');
            }
            res.redirect('/materiel'); // Redirige vers la liste des matériels
        });
    });
});


app.get('/locations', (req, res) => {
    const query = `SELECT * FROM locations WHERE Statut = 'En cours'`;
    bdd.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des locations :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.render('locations', { locations: results });
    });
});


app.post('/location/finaliser/:id', (req, res) => {
    const locationId = req.params.id;

    const query = `UPDATE locations SET Statut = 'Terminée' WHERE ID = ?`;
    bdd.query(query, [locationId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la finalisation :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.redirect('/locations'); // Redirige vers la liste des locations
    });
});



app.use(function (req, res) { 
    res.status(404).render("404");
});

app.listen(3000, function () {
    console.log('Server running on port 3000');
});



