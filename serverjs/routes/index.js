const e = require('express');
var express = require('express');
var router = express.Router();

var server = require('http').createServer(express);


    var localstorage = require('node-localstorage').LocalStorage;
    ls = new localstorage('./stokmanager', Number.MAX_VALUE);


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

let clients = [
    {
        nom: "Mr zing zang",
        date: new Date()
    }, {
        nom: "Mr Lievin",
        date: new Date()
    }, {
        nom: "Nzoling",
        date: new Date()
    }

];

let invoices = [
    {
        client: "Nzoling",
        date: new Date(),
        totale: 500,
        
        products: [
            {
                code: "6009802202142",
                label: "Chaises blanches en plastiques",
                Frounisseur: "Erin Hodges",
                state: 0,
                unite: "cartons",
                image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
                entree: new Date(), total: 134,
                sortie: new Date(),
                prixachat: 100,
                prixgros: 120,
                prix: 120,
                prixdetails: 150,
                Taux: 1980,
                devise: "FC",
                quantites: 3,
                quantitesmin: 20,
                emplacement: 'Engars 10',
                espace: '10', 
                commentaire: 'ce sont des produits tres legers et durs dans des cartons'           
            }, {
                code: "qwq54w5q4w5q5wqw",
                label: "Chaises blanches en plastiques",
                Frounisseur: "Erin Hodges",
                state: 0,
                unite: "cartons",
                image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
                entree: new Date(), total: 134,
                sortie: new Date(),
                prixachat: 100,
                prixgros: 120,
                prixdetails: 150,
                prix: 150,
                Taux: 1980,
                devise: "FC",
                quantites: 5,
                quantitesmin: 5,
                emplacement: 'Engars 10',
                espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'
            
            },{
                code: "jhh5j7h7h8",
                label: "Chaises blanches en plastiques",
                Frounisseur: "Erin Hodges",
                state: 0,
                unite: "cartons",
                image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
                entree: new Date(), total: 134,
                sortie: new Date(),
                prixachat: 100,
                prixgros: 120,
                prixdetails: 150,
                Taux: 1980,
                prix: 3,
                devise: "FC",
                quantites: 2,
                quantitesmin: 10,
                emplacement: 'Engars 10',
                espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'
            }


             

        ]
    }
]

let products = [{
    code: "6009802202142",
    label: "Chaises blanches en plastiques",
    Frounisseur: "Erin Hodges",
    state: 0,
    unite: "cartons",
    image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
    entree: new Date(), total: 134,
    sortie: new Date(),
    prixachat: 100,
    prixgros: 120,
    prixdetails: 150,
    Taux: 1980,
    devise: "FC",
    quantites: 20,
    quantitesmin: 20,
    emplacement: 'Engars 10',
    espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'

}, {
    code: "21212sds2d1",
    label: "Boissos fraiches",
    Frounisseur: "Erin Hodges",
    state: 0,
    unite: "bouteilles",
    image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
    entree: new Date(), total: 134,
    sortie: new Date(),
    prixachat: 100,
    prixgros: 120,
    prixdetails: 150,
    Taux: 1980,
    devise: "FC",
    quantites: 50,
    quantitesmin: 5,
    emplacement: 'Engars 10',
    espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'

}, {
    code: "qwq54w5q4w5q5wqw",
    label: "Chaises blanches en plastiques",
    Frounisseur: "Erin Hodges",
    state: 0,
    unite: "cartons",
    image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
    entree: new Date(), total: 134,
    sortie: new Date(),
    prixachat: 100,
    prixgros: 120,
    prixdetails: 150,
    Taux: 1980,
    devise: "FC",
    quantites: 50,
    quantitesmin: 5,
    emplacement: 'Engars 10',
    espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'

}, {
    code: "xcc545sd5sd",
    label: "Boissos fraiches",
    Frounisseur: "Erin Hodges",
    state: 0,
    unite: "bouteilles",
    image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
    entree: new Date(), total: 134,
    sortie: new Date(),
    prixachat: 100,
    prixgros: 120,
    prixdetails: 150,
    Taux: 1980,
    devise: "FC",
    quantites: 50,
    quantitesmin: 2,
    emplacement: 'Engars 10',
    espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'

}, {
    code: "jhh5j7h7h8",
    label: "Chaises blanches en plastiques",
    Frounisseur: "Erin Hodges",
    state: 0,
    unite: "cartons",
    image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
    entree: new Date(), total: 134,
    sortie: new Date(),
    prixachat: 100,
    prixgros: 120,
    prixdetails: 150,
    Taux: 1980,
    devise: "FC",
    quantites: 7,
    quantitesmin: 10,
    emplacement: 'Engars 10',
    espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'

}, {
    code: "n5v4b5g45h454f",
    label: "Boissos fraiches",
    Frounisseur: "Erin Hodges",
    state: 0,
    unite: "bouteilles",
    image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
    entree: new Date(), total: 134,
    sortie: new Date(),
    prixachat: 100,
    prixgros: 120,
    prixdetails: 150,
    Taux: 1980,
    devise: "FC",
    quantites: 50,
    quantitesmin: 5,
    emplacement: 'Engars 10',
    espace: '10', commentaire: 'ce sont des produits tres legers et durs dans des cartons'

},



]

let emplacements = [
    {
        nom: "warehouse 1",
        epsace: "200",
        localisation: "Lubumbashi"
    },{
        nom: "warehouse 2",
        epsace: "300",
        localisation: "Lubumbashi"
    }, {
        nom: "warehouse 2",
        epsace: "200",
        localisation: "Lubumbashi"
    },
]

function saveDataTolocalstorage(key ,data) {
    let res = JSON.parse(ls.getItem(key));
    console.log(res);
    if (res != null) {
       res.push(data);
       let tab = res;
        ls.setItem(key, JSON.stringify(res));
        console.log("tab", tab);
    } else {
        console.log("pb");
        let tab = [];
        // top
        tab.push(data);
        // console.log(tab);
        ls.setItem(key, JSON.stringify(tab));
        
    }
}

function editDataFromlocalstorage(key ,data, value) {
    let res = JSON.parse(ls.getItem(key));
    console.log("res", res);
    if (res == null) {
       console.log("Nothing");
    } else {
        console.log("pb");
        let tab = [];
        // top
        tab = res.filter(el => el[value] == data[value]);
        console.log("tab", tab);
        res[res.indexOf(tab[0])] = data;
        ls.setItem(key, JSON.stringify(res));
        
    }
}




function removeDataFromlocalstorage(key ,id, value) {
    let res = JSON.parse(ls.getItem(key));
    console.log(res);
    if (res == null) {
       console.log("Nothing");
    } else {
        console.log("pb");
        let tab = [];
        // top
        tab = res.filter(el => el[value] != id);
        // console.log(tab);
        ls.setItem(key, JSON.stringify(tab));
        
    }
}

// ls.setItem("users", JSON.stringify([{username : "admin", password: "123", level: 3}]));
// saveDataTolocalstorage("users", {username : "puks", password: "123", level: 2});
// ls.setItem("products", JSON.stringify(products));
// ls.setItem("invoices", JSON.stringify(invoices));
// ls.setItem("clients", JSON.stringify(clients));
// let datas = JSON.parse(ls.getItem("users"))
// datas.forEach(element => {
    // console.log(datas);
// });



router.get('/login/:user/:pass', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    let datas = JSON.parse(ls.getItem("users"));
    
    let user = datas.find(el => el.username.indexOf(req.params.user) != -1 &&  el.password.indexOf(req.params.pass) != -1);
    console.log("users", user);
    // datas.forEach(element => {
    //  if (element.username.indexOf("dfs") != -1) {
    //     console.log("yipi");
    //  }
    // });
    if (user != undefined) {
        res.json({
            code: 200,
        data: user     
       
        });
    } else {
 
    res.json({
        code: 404,
        data: datas
    });

    }
});

router.get('/sortir/:idproduct/:date_sent', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
 
 res.json({
     code: 200,
 });
});

router.get('/products', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    let datas = JSON.parse(ls.getItem("products"));
    let pro = [];
    if (datas && (datas != undefined || datas != null)) {
        pro = datas;
    } 
    res.json({code: 200, data: pro});
});

router.get('/users', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    let datas = JSON.parse(ls.getItem("users"));
    let pro = [];
    if (datas && (datas != undefined || datas != null)) {
        pro = datas;
    } 
    res.json({code: 200, data: pro});
});


router.get('/emplacements', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
 
 res.json(emplacements);
});

router.get('/clients', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    let datas = JSON.parse(ls.getItem("clients"));
    let pro = [];
    if (datas && (datas != undefined || datas != null)) {
        pro = datas;
    } 
    res.json({code: 200, data: pro});
 
});


router.get('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
 res.json({
     resultat: "beinvenu"
 });
});

// router.post('/addclient', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
//     res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
//     res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
//     res.json({
//         code: 200,
//         data: "client enregistrer",
//     });
// });

router.get('/invoices', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    
    let datas = JSON.parse(ls.getItem("invoices"));
    let pro = [];
    if (datas && (datas != undefined || datas != null)) {
        pro = datas;
    } 

    res.json({code: 200, data: pro});
});

router.post('/addinvoices', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
   
    // let red = JSON.parse(req.body);
    let datas = JSON.parse(ls.getItem("products"));
   let des = req.body.products;
    let code = 200;
    message = "Its in";
       des.forEach(element => {
    
      datas.forEach(el => {
        
        if (el.code == element.code) {
            console.log(el.quantites)
            if ( (el.quantites - element.quantites)  > 0) {
                el.quantites -= element.quantites  
                console.log(el.quantites)
try {
    ls.setItem("products", JSON.stringify(datas))
    
} catch (error) {
    console.log(error);
}
                saveDataTolocalstorage("invoices", req.body);
    saveDataTolocalstorage("clients",{nom: req.body.client, date: new Date()});

            }else{
                console.log("Impossible d'effectuer la vente");
                code = 201;
                message = "Operation impossible";
            }
            
        }
       
      })  
   });
     //  

    res.json({code: code, data: {message: message}});
});

router.post('/addproduct', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    console.log(req.body);
    console.log("ya un probleme");
    saveDataTolocalstorage("products", req.body)
    res.json({
        code: 200
    });
});

router.post('/editproduct/:code', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    console.log(req.body);
    console.log("ya un probleme");
    editDataFromlocalstorage("products", req.body, "code")
    res.json({
        code: 200
    });
});


router.get('/removeproduct/:code', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    console.log(req.body);
    console.log("ya un probleme");
    removeDataFromlocalstorage("products", req.params.code, "code")
    res.json({
        code: 200
    });
});

router.get('/cancelinvoices/:code', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    
    console.log(req.body);
   
    let data = JSON.parse(ls.getItem("invoices"));
    // console.log("data", data);
    if (data == null) {
       console.log("Nothing");
    } else {
        
        let tab = [];
        // top
        tab = data[req.params.code];
        if (tab.state != undefined || tab.state != null) {
            if (tab.state == 0) {
                tab.state = 1
            } else {
                tab.state = 0
            }
        } else {
            if (tab.state == 0) {
                tab.state = 1
            } else {
                tab.state = 0
            }
        }
        console.log("tab", tab);
        data[req.params.code] = tab;
        
        ls.setItem("invoices", JSON.stringify(data));
        
    }
    
    res.json({
        code: 200
    });
});

router.post('/adduser', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    console.log(req.body);
    // add users to database
    saveDataTolocalstorage("users", req.body)
    res.json({
        code: 200
    });
});


router.get('/removeuser/:username', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    console.log(req.body);
    // reomve users from database
    removeDataFromlocalstorage("users", req.params.username, "username")
    res.json({
        code: 200
    });
});

router.post('/editusers/:username', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Methods', 'Content-genre, Authorization');
    res.header("Access-Control-Allow-Headers", "Content-genre, Autorization, Content-Length, X-Requested-With, Accept, X-HTTP-Method-Override, encgenre");
    console.log(req.body);
    // edit users to database
    editDataFromlocalstorage("users", req.body, "username")
    res.json({
        code: 200
    });
});


module.exports = router;
