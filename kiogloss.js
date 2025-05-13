function accion () {
    var ancla = document.getElementsByClassName("nav-links");
    for (var i = 0; i < ancla.length; i++){
        ancla[i].classList.toggle('desaparece');
    }  
}

const btnabrirmodal = document.querySelector("#btn-abrir-modal");
const btncerrarmodal = document.querySelector("#btn-cerrar-modal");
const modal = document.querySelector("#modal");

btnabrirmodal.addEventListener("click", ()=>{
    modal.showModal();
})

btncerrarmodal.addEventListener("click", ()=>{
    modal.close();
})