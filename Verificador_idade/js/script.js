function verificar() {
    var data = new Date();
    var ano = data.getFullYear();
    var fano = document.getElementById('txtano');
    var res = document.getElementById('res');

    if (fano.value.length == 0 || Number(fano.value) > ano) {
        window.alert('ERRO PREENCHA OS DADOS POR FAVOR!')
    }
    else {
        var fsex = document.getElementsByName('radsex');
        var idade = ano - Number(fano.value);
        var genero = '';
        var img = document.createElement('img');
        img.setAttribute('id', 'foto')

        if (fsex[0].checked) {
            genero = 'Homem';

            if (idade >=0 && idade < 10) {
                //Criança
                img.setAttribute('src', 'images/bebeh.png')
            } else if (idade < 21) {
                //Jovem
                img.setAttribute('src', 'images/jovemh.png')
            } else if ( idade < 50) {
                //Adulto
                img.setAttribute('src', 'images/adultoh.png')
            } else {
                //Idoso
                img.setAttribute('src', 'images/idosoh.png')
            }
        } else if (fsex[1].checked) {
            genero = 'Mulher'
            if (idade >=0 && idade < 10) {
                //Criança
                img.setAttribute('src', 'images/bebem.png')
            } else if ( idade < 21) {
                //Jovem
                img.setAttribute('src', 'images/jovemm.png')
            } else if ( idade < 50) {
                //Adulto
                img.setAttribute('src', 'images/adultom.png')
            } else  {
                //Idoso
                img.setAttribute('src', 'images/idosam.png')
            }
        }

        res.style.textAlign = 'center';
        img.style.height = '300px';
        res.innerHTML = `Detectamos ${genero} com ${idade} anos.`
        res.appendChild(img);
    }
}