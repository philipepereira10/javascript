function carregar() {


var msg = document.getElementById("msg")
var img = document.getElementById("imagem")
var data = new Date()
var hora = data.getHours()




msg.innerHTML = `Agora são exatamente ${hora} horas.`

if (hora >= 0 && hora < 12) {
    //Bom dia
    img.src = 'manha.png'
    document.body.style.background = "#ECAB7D"
} else if (hora  >= 12 && hora <= 18) {
    //Boa tarde
    img.src = 'tarde.png'
    document.body.style.background = "#7a4a58"
} else {
    //Boa Noite
    img.src = 'noite.png'
    document.body.style.background = "#566896"
}
}

