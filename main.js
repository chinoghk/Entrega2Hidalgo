
document.getElementById("IconoPJ").addEventListener("click", ()=>{
    document.getElementById("pjSeleccion")
})

const PJ = JSON.parse(localStorage.getItem("pjSeleccion")) || []

const Personajes = [
    {
        id: 1,
        nombre: "Arquero",
        categoria: "Ataque",
        img: "https://neverland.game-ark.com/images/role_small_01.jpg",
        puntos: "Ataque: 25, Vida: 5, Defensa: 5",
        descripcion: "Es una clase de daño a distancia a costa de su poca defensa y vida básica baja.",
        cantidad: 0
    },
    {
        id: 2,
        nombre: "Guerrero",
        categoria: "Defensa",
        img: "https://neverland.game-ark.com/images/role_small_02.jpg",
        puntos: "Ataque: 5, Vida: 15, Defensa: 15",
        descripcion: "Repartidor de daños cuerpo a cuerpo experimentado y bastante resistente al mismo tiempo.",
        cantidad: 0
    },
    {
        id: 3,
        nombre: "Curandero",
        categoria: "Soporte",
        img: "https://neverland.game-ark.com/images/role_small_03.jpg",
        puntos: "Ataque: 10, Vida: 10, Defensa: 15",
        descripcion: "Magos rúnicos que hacen uso de los elementos de la naturaleza para ayudar a sus aliados.",
        cantidad: 0
    }
];

const pjElegido = document.getElementById("pjElegido")
const pjAElegir = document.getElementById("pjAElegir")
const final = document.getElementById("final")
const IconoPJ = document.getElementById("IconoPJ")


function agregadoraDeEventosABotonesAgregar(){
    const botones = document.getElementsByClassName("botonesSeleccion")
    const ArrayDeBotones = Array.from(botones)

    ArrayDeBotones.forEach(el => {

        el.addEventListener("click", (evento)=>{
            let elementoABuscar = PJ.find(el => el.nombre == evento.target.parentElement.children[0].innerText)
            if(pjAElegir.innerHTML == ""){
                if(elementoABuscar){
                    elementoABuscar.cantidad == 1
                }else{
                    PJ.push({
                        nombre: evento.target.parentElement.children[0].innerText,
                        img: evento.target.parentElement.children[1].children[0].src,
                        cantidad: 1
                    })
                }

                final.innerText = "FIN"

                funcionQueActualiza()
            }
        })

    })
}

function agregadoraDeEventosABotonesQuitar(){
    const botones = document.getElementsByClassName("botonesEliminar")
    const ArrayDeBotones = Array.from(botones)

    ArrayDeBotones.forEach(el => {
        el.addEventListener("click", (evento)=>{
            let elementoABuscar = PJ.find(el => el.nombre == evento.target.parentElement.children[0].innerText)

            if(elementoABuscar.cantidad == 1){
                let index = PJ.findIndex(el => el.nombre === evento.target.parentElement.children[0].innerText);
                PJ.splice(index, 1);

            }else{
                elementoABuscar.cantidad = elementoABuscar.cantidad - 1
            }

            final.innerText = "Esperando..."
            
            funcionQueActualiza()
            
        })
    })
}


function funcionQueActualiza(){
    pjAElegir.innerHTML = ""
    PJ.forEach(el => {
        pjAElegir.innerHTML += `
                <div class="personaje">
                    <h3>${el.nombre}</h3>
                    <img src="${el.img}" alt="">
                    <p><b>Nombre: </b><input></input></p>
                    <button class="botonesEliminar">Cambiar</button>
                </div>
        `
   })

    agregadoraDeEventosABotonesQuitar()

    localStorage.setItem("PJ", JSON.stringify(PJ))

    IconoPJ.children[0].innerText = PJ.reduce((acc, el) => {
        return "Selección terminada"
    }, "No hay personaje" )
}

document.addEventListener("DOMContentLoaded", () => {
    Personajes.forEach(el => {
        pjElegido.innerHTML += `
                <div class="personaje">
                    <h3>${el.nombre}</h3>
                    <div class="img">
                        <img src="${el.img}" alt="">
                    </div>
                    <p><b>Descripción: </b>${el.descripcion}</p>
                    <p><b>Puntos: </b>${el.puntos}</p>
                    <p><b>Categoría: </b>${el.categoria}</p>
                    <button class="botonesSeleccion">Seleccionar</button>
                </div>`
    })
    agregadoraDeEventosABotonesAgregar()
    funcionQueActualiza()
})