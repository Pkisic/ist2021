const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;
const axios = require("axios");
const { response } = require("express");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let vratiPogled=(naziv)=>{
    return fs.readFileSync(path.join(__dirname,'views',naziv +'.html'),"utf-8")
}

app.get("/",(req,res)=>{
    axios.get('http://localhost:9999/')
    .then(response =>{
        let prikaz ="";
        response.data.forEach(element => {
            prikaz+=`
            <li class="list-group-item">${element.Kategorija}<br>${element.TekstOglasa}<br><b>Cena</b>:${element.Cena}<b><br>Trenutno na akciji: </b>:${element.Akcija}</li>
            <br><a href="/obrisi/${element.id}">Obrisi</a><a href="/promeni/${element.id}">Promeni</a>`
        });
        res.send(vratiPogled("index").replace("#{data}",prikaz));
    })
    .catch(err=>{
        console.log(err);
    });
    
});

app.get("/dodajProizvod",(req,res)=>{
    axios.get('http://localhost:9999/')
    .then(response =>{
        let prikaz ="";
        response.data.forEach(element => {
            prikaz+=`
            <option>${element.Kategorija}</option>
            `
        });
        res.send(vratiPogled("dodajProizvod").replace("#{data}",prikaz));
    })
    .catch(err=>{
        console.log(err);
    });
})

app.post("/napraviProizvod",(req,res)=>{
    axios.post("http://localhost:9999/dodajProizvod",{
        Kategorija:req.body.kat,
        Cena:req.body.cena,
        TekstOglasa:req.body.TekstO,
        Akcija:req.body.akc
    })
    res.redirect("/");
})
app.get("/obrisi/:id",(req,res)=>{
    axios.delete(`http://localhost:9999/izbrisiProizvod/${req.params["id"]}`)
    res.redirect("/");
});
app.get("/promeni/:id",(req,res)=>{
    axios.get('http://localhost:9999/')
    .then(response=>{
        let prikaz="";
        response.data.forEach(element => {
            if(element.id == req.params["id"]){
                prikaz+=`
                <input type="text" name="id" value="${element.id}" hidden>
                <div class="form-group">
                    <label for="kat">Kategorija:${element.Kategorija}</label>
                    <input type="text" name="kat" class="form-control">
                </div>
                <div class="form-group">
                    <label for="TekstO">Tekst Oglasa</label>
                    <textarea id="TekstO" rows="3" name="TekstO" class="form-control">${element.TekstOglasa}</textarea>
                </div>
                <div class="form-group">
                    <label for="cena">${element.Cena}</label>
                    <input type="text" name="cena" class="form-control">
                </div>
                <div class="form-group">
                    <label for="akc">Akcija</label>
                        <select class="form-control" name="akc">
                            <option>DA</option>
                            <option>NE</option>
                        </select>
                </div>
                <input type="submit" value="Promeni Proizvod" class="btn btn-primary btn-block">
        `
            }
        });
        res.send(vratiPogled("promeniProizvod").replace("#{data}",prikaz));
    })
    
});
app.get("/promeniProizvod",(req,res)=>{
    axios.put(`http://localhost:9999/promeniProizvod/${req.params["id"]}/${req.params["kat"]}/${req.params["cena"]}`);
    res.redirect("/");
})

app.listen(port,()=>{console.log(`klijent na portu ${port}`)});
