const apiKey = ENV.API_KEY;


//API de OpenWeather

let lat;
let lon;

const localidade = document.getElementById("localidade");

// console.log(localidade.value);



//Iconos tempo
const iconos = {
    "01d": 'assets/iconos/01d.png',
    "01n": 'assets/iconos/01n.png',
    "02d": 'assets/iconos/02d.png',
    "02n": 'assets/iconos/02n.png',
    "03d": 'assets/iconos/03d.png',
    "03n": 'assets/iconos/03n.png',
    "04d": 'assets/iconos/04d.png',
    "04n": 'assets/iconos/04n.png',
    "09d": 'assets/iconos/09d.png',
    "09n": 'assets/iconos/09n.png',
    "10d": 'assets/iconos/10d.png',
    "10n": 'assets/iconos/10n.png',
    "11d": 'assets/iconos/11d.png',
    "11n": 'assets/iconos/11n.png',
    "13d": 'assets/iconos/13d.png',
    "13n": 'assets/iconos/13n.png',
    "50d": 'assets/iconos/50d.png',
    "50n": 'assets/iconos/50n.png'
}

function actualizaTempo(lat, lon) {

    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=gl`;

    fetch(apiURL)
        .then(response => response.json())

        .then(
            data => {
                // console.log(data);

                document.querySelector(".hoxe__localidade").textContent = data.city.name;

                //Calcular a data de hoxe
                const timestamp = data.list[0].dt * 1000;

                const fecha = new Date(timestamp);
                // console.log(fecha)

                //Transformar en día e mes
                const dia = fecha.getDate();
                const mes = fecha.getMonth();

                const meses = ["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro"];
                const nomeMes = meses[mes];

                const dataHoxe = `${dia} ${nomeMes}`;

                document.querySelector(".hoxe__data").textContent = dataHoxe;

                //Icono do tempo
                let icono = data.list[0].weather[0].icon;

                document.querySelector(".hoxe__icono").src = iconos[icono];

                //Info en texto do estado do ceo hoxe
                document.querySelector(".hoxe__descripcion").textContent = data.list[0].weather[0].description;

                ////////////////////////Temperatura de hoxe (Revisar xa que as min/max son da franxa de 3h)
                document.querySelector(".hoxe__temperatura").textContent = Math.round(data.list[0].main.temp) + "℃";
                document.querySelector(".hoxe__min").textContent = Math.round(data.list[0].main.temp_min) + "℃";
                document.querySelector(".hoxe__max").textContent = Math.round(data.list[0].main.temp_max) + "℃";




                //Previsións para os próximos días

                const mesesAbre = ["Xan", "Feb", "Mar", "Abr", "Mai", "Xuñ", "Xul", "Ago", "Set", "Out", "Nov", "Dec"];



                //Día 1
                let diaSeguinte = timestamp + 86400000;
                let fechaSeguinte = new Date(diaSeguinte);
                const dia1 = fechaSeguinte.getDate();

                const mes1 = fechaSeguinte.getMonth();
                const nomeMes1 = mesesAbre[mes1];

                document.getElementById("dia1Data").textContent = `${dia1} ${nomeMes1}`;

                let icono1 = data.list[8].weather[0].icon;
                document.getElementById("dia1Icono").src = iconos[icono1];

                document.getElementById("dia1Min").textContent = Math.round(data.list[8].main.temp_min) + "℃";
                document.getElementById("dia1Max").textContent = Math.round(data.list[8].main.temp_max) + "℃";


                
                //Día 2
                diaSeguinte = timestamp + 86400000 * 2;
                fechaSeguinte = new Date(diaSeguinte);
                const dia2 = fechaSeguinte.getDate();

                const mes2 = fechaSeguinte.getMonth();
                const nomeMes2 = mesesAbre[mes2];

                document.getElementById("dia2Data").textContent = `${dia2} ${nomeMes2}`;

                let icono2 = data.list[16].weather[0].icon;
                document.getElementById("dia2Icono").src = iconos[icono2];

                document.getElementById("dia2Min").textContent = Math.round(data.list[16].main.temp_min) + "℃";
                document.getElementById("dia2Max").textContent = Math.round(data.list[16].main.temp_max) + "℃";


                //Día 3
                diaSeguinte = timestamp + 86400000 * 3;
                fechaSeguinte = new Date(diaSeguinte);
                const dia3 = fechaSeguinte.getDate();

                const mes3 = fechaSeguinte.getMonth();
                const nomeMes3 = mesesAbre[mes3];

                document.getElementById("dia3Data").textContent = `${dia3} ${nomeMes3}`;

                let icono3 = data.list[24].weather[0].icon;
                document.getElementById("dia3Icono").src = iconos[icono3];

                document.getElementById("dia3Min").textContent = Math.round(data.list[24].main.temp_min) + "℃";
                document.getElementById("dia3Max").textContent = Math.round(data.list[24].main.temp_max) + "℃";


                //Día 4
                diaSeguinte = timestamp + 86400000 * 4;
                fechaSeguinte = new Date(diaSeguinte);
                const dia4 = fechaSeguinte.getDate();

                const mes4 = fechaSeguinte.getMonth();
                const nomeMes4 = mesesAbre[mes4];

                document.getElementById("dia4Data").textContent = `${dia4} ${nomeMes4}`;

                let icono4 = data.list[32].weather[0].icon;
                document.getElementById("dia4Icono").src = iconos[icono4];

                document.getElementById("dia4Max").textContent = Math.round(data.list[32].main.temp_max) + "℃";
                document.getElementById("dia4Min").textContent = Math.round(data.list[32].main.temp_min) + "℃";

            }
        )

}




//Definir coordenadas segun municipio
function localizacion(municipio){
    console.log(municipio);
    if (municipio == ""){
        municipio = "vedra";
    }
    const cordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${municipio}&appid=${apiKey}`;

    fetch(cordURL)
        .then(response => response.json())
        .then(
            data => {
                // console.log(data)

                lat = data[0].lat;
                lon = data[0].lon;

                actualizaTempo(lat, lon)
            }
        )
    localidade.value = ""
}

const botonBuscar = document.getElementById("botonBuscar");
