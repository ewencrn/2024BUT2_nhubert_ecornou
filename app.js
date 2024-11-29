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


app.use(function (req, res) { 
    res.status(404).render("404");
});

app.listen(3000, function () {
    console.log('Server running on port 3000');
});



