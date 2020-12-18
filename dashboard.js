function carregaDash() {
    var strUser = localStorage.getItem("dashcardUser");
    if (!strUser) {
        window.location = "index.html";
    }

    // usuario está conectado... preciso consultar o relatórico consolidado no back end
    var strId = window.location.search;
    console.log(strId);

    var idAgente = strId.substr(4);
    console.log("ID recuperado = " + idAgente);

    fetch("http://localhost:8085/totaisconsolidado?id=" + idAgente)
        .then(res => res.json())
        .then(lista => preencheDash(lista));
}
function loggout() {
    localStorage.removeItem("dashcardUser");
    window.location = "index.html";
}
function goHome() {
    window.location = "agentes.html";
}
function preencheDash(lista) {
    console.log(lista);
    var nomeAgente;
    var volume;
    var sucessoTransacao;
    var falhaTransacao;
    var fraudeTransacao;

    for (i = 0; i < lista.length; i++) {
        var ag = lista[i];
        nomeAgente = ag.nomeAgente;
        volume = ag.volume;
        if (ag.status == 0) {
            sucessoTransacao = ag.numeroOp;
        } else if (ag.status == 1) {
            falhaTransacao = ag.numeroOp;
        } else {
            fraudeTransacao = ag.numeroOp;
        }
    }

    document.getElementById("nomeAgente").innerHTML = "<h3><div class='d-inline p-3 bg-primary text-white'>" + nomeAgente + "</div></h3><br>";
    document.getElementById("volumeAgente").innerHTML = "<h4>Volume Transacional: " + volume + "</h4><br>";
    document.getElementById("sucessoTransacao").innerHTML = "<h4>Transações com sucesso: " + sucessoTransacao + "</h4><br>";
    document.getElementById("falhaTransacao").innerHTML = "<h4>Transações com falha: " + falhaTransacao + "</h4><br>";
    document.getElementById("fraudeTransacao").innerHTML = "<h4>Transações de fraude: " + fraudeTransacao + "</h4><br>";

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Sucesso', 'Falha', 'Fraude'],
            datasets: [{
                label: sucessoTransacao+falhaTransacao+fraudeTransacao+" operações realizadas",
                data: [sucessoTransacao, falhaTransacao, fraudeTransacao],
                backgroundColor: [
                    'rgba(23, 206, 23, 0.555)',
                    'rgba(204, 118, 7, 0.555)',
                    'rgba(204, 7, 7, 0.555)'
                ],
                borderWidth: 5
            }]
        },
        options : {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
