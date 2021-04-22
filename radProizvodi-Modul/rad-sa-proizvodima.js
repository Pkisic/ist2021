const fs = require('fs');
const PATH = "proizvodi.json";

let procitajPodatke=()=>{
    let proizvodi = fs.readFileSync(PATH, (err,data)=>{
        if(err) throw err;
            return data;
    });
    return JSON.parse(proizvodi);
}

let snimiPodatke=(data)=>{
    fs.writeFileSync(PATH, JSON.stringify(data));
}

exports.sviProizvodi = () =>{
    return procitajPodatke();
}
exports.dodajProizvod = (novProizvod)=>{
    let id = 1;
    let proizvodi=this.sviProizvodi();
    if(proizvodi.length>0){
        id = proizvodi[proizvodi.length-1].id+1;
    }
    novProizvod.id = id;
    proizvodi.push(novProizvod);
    snimiPodatke(proizvodi);
}
exports.izbrisiProizvod = (id) =>{
    snimiPodatke(this.sviProizvodi().filter(proizvod=>proizvod.id!=id));
}
exports.promeniProizvod = (id,kategorija,cena) =>{
    let proizvodi = this.sviProizvodi();
    proizvodi.forEach(p => {
        if(p.id==id){
            p.kategorija=kategorija;
            p.cena=cena;
        }
    });
    snimiPodatke(proizvodi);
}

