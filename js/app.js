let DB;

document.addEventListener("DOMContentLoaded", () => {
    crmDB()

    setTimeout(() => {
        crearCliente()
    }, 5000);
})

function crmDB() {
    // Crear la base de datos 1.0
    let crmDB = window.indexedDB.open("crm", 1)

    // Si hay un error

    crmDB.onerror = function(){
        console.log("Hubo un error al crear la base de datos");
    }

    // Si se creo bien

    crmDB.onsuccess = function () {
        console.log("Base de datos creada");

        DB = crmDB.result; 
    }

    // Configuracion de la base de datos

    crmDB.onupgradeneeded = function(e){

        const db = e.target.result;

        const objectStore = db.createObjectStore("crm", {
            keyPath: "crm",
            autoIncrement: true
        })

        // Definir Columnas

        objectStore.createIndex( "nombre", "nombre", {unique: false});
        objectStore.createIndex( "email", "email", {unique: true})
        objectStore.createIndex( "telefono", "telefono", {unique: false})

        console.log("columnas creadas");

    }
}

function crearCliente() {
    
    let transaction = DB.transaction(["crm"], "readwrite")

    transaction.oncomplete =  function () {
        console.log("transaccion completada");
    }

    transaction.onerror = function () {
        console.log("Hubo un error en la transaccion");
    }

    const objectStore = transaction.objectStore("crm")


    const nuevoCliente = {
        telefono : 86809168,
        nombre: "Whanderley",
        correo: "fonsecawp05@gmail.com"
    }

    const peticion = objectStore.add(nuevoCliente)

    console.log(peticion);


}