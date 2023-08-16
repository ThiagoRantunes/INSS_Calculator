const salario = document.getElementById("salario");
const noturno = document.getElementById("noturno");
const extras = document.getElementById("extras");
const btn = document.getElementById("btn");
const btnAtualizar = document.getElementById("btnAtualizar"); 
const calculoSalario = document.getElementById("calculoSalario");
const calculoDesconto = document.getElementById("calculoDesconto");

var totalSalario = 0;

//Valores do INSS Atual
const mediaSalario = [1320.00, 2571.29, 3856.94, 7507.49];
const mediaPorcentagem = [0.075, 0.09, 0.12, 0.14];

function Atualizar(){
    salario.value = null;
    noturno.value = null;
    extras.value = null;
    calculoSalario.value = null;
    calculoDesconto.value = null;
}

function removerInputRed(){
    salario.classList.remove("inputred");
    salario.placeholder = "Digite seu salario base...";
}

btnAtualizar.addEventListener("click", function(){
    if(salario.classList == "inputred"){
        removerInputRed();
    }
});

btn.addEventListener("click", function(){

while(true){
    if(salario.value == undefined || salario.value == null || salario.value == 0){
        salario.classList.add("inputred");
        salario.placeholder = "DIGITE SEU SALARIO";
        salario.addEventListener("click", function(){
            removerInputRed();
        });
        break;
    }
    
    if(noturno.value == null || noturno.value == undefined || noturno.value == 0){
        noturno.value = 0;
    }
    if(extras.value == null || extras.value == undefined || extras.value == 0){
       extras.value = 0;
    }

    totalSalario = eval(salario.value + " + " + noturno.value + " + " + extras.value);

    if(totalSalario <= mediaSalario[0]){
        var calculoDes = totalSalario * mediaPorcentagem[0];
        calculoDesconto.value = formater.format(calculoDes);
        calculoSalario.value = formater.format(totalSalario - calculoDes);
        break;
    }else if(totalSalario <= mediaSalario[1]){
        var desconto1 = mediaSalario[0] * mediaPorcentagem[0];
        var desconto2 = (totalSalario - mediaSalario[0]) * mediaPorcentagem[1];
        var calculoDes = desconto1 + desconto2;
        calculoDesconto.value = formater.format(calculoDes);
        calculoSalario.value =  formater.format(totalSalario - calculoDes);
        break;
    }else if(totalSalario <= mediaSalario[2]){
        var desconto1 = mediaSalario[0] * mediaPorcentagem[0];
        var desconto2 = (mediaSalario[1] - mediaSalario[0]) * mediaPorcentagem[1];
        var desconto3 = (totalSalario - mediaSalario[1]) * mediaPorcentagem[2];
        var calculoDes = desconto1 + desconto2 + desconto3;
        calculoDesconto.value = formater.format(calculoDes);
        calculoSalario.value = formater.format(totalSalario - calculoDes);
        break;
    }else if(totalSalario <= mediaSalario[3] || totalSalario > mediaSalario[3]){
        var desconto1 = mediaSalario[0] * mediaPorcentagem[0];
        var desconto2 = (mediaSalario[1] - mediaSalario[0]) * mediaPorcentagem[1];
        var desconto3 = (mediaSalario[2] - mediaSalario[1]) * mediaPorcentagem[2];
        var desconto4 = (totalSalario - mediaSalario[2]) * mediaPorcentagem[3];
        var calculoDes = desconto1 + desconto2 + desconto3 + desconto4;
        calculoDesconto.value = formater.format(calculoDes);
        calculoSalario.value = formater.format(totalSalario - calculoDes);
        break;
    }
}

});

//Formatar em moéda BRL

const formater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
});
