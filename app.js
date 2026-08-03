const WEBAPP =
"https://script.google.com/macros/s/AKfycbyzrLYkxbC86I7MH7U98ZKRh5kTEdFEe7puJiIRnzbY5BJkG4RE9fQoRQtUs3MEqxQ/exec";

const foto = document.getElementById("foto");
const preview = document.getElementById("preview");
const estado = document.getElementById("estado");

foto.addEventListener("change", async () => {

    if (!foto.files.length) return;

    const archivo = foto.files[0];

    preview.src = URL.createObjectURL(archivo);
    preview.style.display = "block";

    estado.innerHTML = "Convirtiendo imagen...";

    const base64 = await convertirBase64(archivo);

    estado.innerHTML = "Enviando al servidor...";

    try {

        const respuesta = await fetch(WEBAPP, {

            method: "POST",

            body: JSON.stringify({

                imagen: base64

            })

        });

        const json = await respuesta.json();

        estado.innerHTML = json.mensaje;

    } catch (e) {

        estado.innerHTML = "Error: " + e.message;

    }

});

function convertirBase64(file){

    return new Promise((resolve,reject)=>{

        const reader=new FileReader();

        reader.onload=()=>{

            resolve(reader.result.split(",")[1]);

        };

        reader.onerror=reject;

        reader.readAsDataURL(file);

    });

}
