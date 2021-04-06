function logar(){
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;
    //console.log(txtSenha);

    if (txtLogin == ""){
        alert("Campo login obrigatorio");
        document.getElementById("txtLogin").focus();
        return false;
        
    } if (txtSenha == ""){
        alert("Campo senha obrigatorio");
        document.getElementById("txtSenha").focus();
        return false;
    }

    //console.log("Foi digitado = "+ txtLogin + " "+ txtSenha);

    var msgBody = {
        email : txtLogin,
        racf : txtLogin,
        senha : txtSenha
    };

    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }
    };

    fetch("http://localhost:8088/login", cabecalho).then(res => trataStatus(res));
}

function trataStatus(res){
    if (res.status == 200){
        res.json().then(user => registraUser(user));

    } else if (res.status == 401){
        document.getElementById("msgErro").innerHTML = "Senha Invalida";
    } else if (res.status == 404){
        document.getElementById("msgErro").innerHTML = "Usuario não cadastrado";
    } else {
        document.getElementById("msgErro").innerHTML = "Erro desconhecido";
    }
}

function registraUser(user){
    localStorage.setItem("dashcardUser", JSON.stringify(user));
    window.location="agentes.html";
}