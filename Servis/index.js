const express = require('express');
var proizvodiServis = require('radProizvodi-Modul');
const path = require('path');
const { response } = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(req,res) =>{
    res.send(proizvodiServis.sviProizvodi());
});

app.post('/dodajProizvod', (req,res)=>{
    //console.log(req.body);
    proizvodiServis.dodajProizvod(req.body);
    res.end("OK");
});
app.delete('/izbrisiProizvod/:id',(req,res)=>{
    proizvodiServis.izbrisiProizvod(req.params["id"]);
    res.end("OK");
});
app.put('/promeniProizvod/:id/:kategorija/:cena',(request, response)=>{
    proizvodiServis.promeniProizvod(request.params.id,request.params.kategorija,request.params.cena)
});



const PORT = process.env.PORT || 9999;

app.listen(PORT, ()=> console.log(`Server pokrenut na portu ${PORT} ... `))
