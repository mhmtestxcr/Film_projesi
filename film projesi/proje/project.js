const form              = document.getElementById("film-form");
const titleElement      = document.querySelector("#title");
const directorElement   = document.querySelector("#director");
const urlElement        = document.querySelector("#url");
const cardbody          = document.querySelectorAll(".card-body")[1]; 
const clear             = document.getElementById("clear-films");


// uı objesini başlatma

const ui      = new UI();

const storage = new Storage();

// TÜM EVENTLERİ YÜKLMEE
eventListener();

function eventListener(){

    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){

    const title     = titleElement.value;
    const director  = directorElement.value;
    const url       = urlElement.value;

    if(title === "" || director === "" || url === ""){
        // hatasd
        ui.displayMessage("Tüm alanları doldurun","danger");
    }
    else{

        const newFilm  = new Film(title,director,url);
        storage.addFilmToStorage(newFilm);
        ui.addFilmToUI(newFilm);
    }
    
    ui.clearınput(titleElement,urlElement,directorElement);


    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id  === "delete-film"){

        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessage("silme işlemi başarılı","primary");

    }
}

function clearAllFilms(e){

    if(confirm("Emin misiniz?")){
        
        ui.clearAllFilmsUI();
        storage.clearAllFilmsFromStorage();
    }
    

}