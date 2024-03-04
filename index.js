var expressaoTexto = document.getElementById("expressao");
var resultadoTexto = document.getElementById("resultado");
var pilhaTexto = document.getElementById("pilha");
var expressao = expressaoTexto.value;
var operacoes = ['+','-','*','(',')','/','^']
var resultado = []
var pilha = []

function limpa(){
    expressao = undefined;
    resultado = []
    pilha = []
    resultadoTexto.innerText = ""
    pilhaTexto.innerText = ""
}

function macumbaPasso(){
    if(!expressao){
        expressao = expressaoTexto.value;
    }
    let caracter = expressao[0]
    console.log(caracter)
    expressao = expressao.substring(1)
    expressaoTexto.value = expressao
    
    if(operacoes.includes(caracter)){
        console.log('operacao')
        if(pilha.length>0){
            if(pilha[pilha.length-1] == '('){
                pilha.push(caracter)
                console.log('pilha')
                console.log(JSON.stringify(pilha))
            }else if(caracter == ")"){
                console.log("gambi )")
                while(pilha[pilha.length-1] != "("){
                    console.log(pilha[pilha.length-1])
                    resultado.push(pilha[pilha.length-1])
                    pilha.pop()
                }
                pilha.pop()
            }else if(temPrioridade(caracter,pilha[pilha.length-1])){
                console.log('temPrioridade')
                pilha.push(caracter)
                console.log('pilha')
                console.log(JSON.stringify(pilha))
            }else{
                console.log('naoTemPrioridade')
                resultado.push(pilha[pilha.length-1])
                pilha.pop()
                while(pilha.length>0 && !temPrioridade(caracter,pilha[pilha.length-1])){
                    console.log('naoTemPrioridade' + pilha[pilha.length-1])
                    resultado.push(pilha[pilha.length-1])
                    pilha.pop()
                }
                pilha.push(caracter)

                

                console.log('resultado')
                console.log(resultado)
                console.log('pilha')
                console.log(JSON.stringify(pilha))
                
            }
        }else{
            pilha.push(caracter)
            console.log('pilha')
            console.log(JSON.stringify(pilha))
            
        }
    }else{
        console.log('caracter')
        resultado.push(caracter)
        console.log('resultado')
        console.log(resultado)
    }
    resultadoTexto.innerText = resultado
    pilhaTexto.innerText = pilha
    if(expressao.length == 0){
        while(pilha.length>0){
            resultado.push(pilha.pop())
            console.log(resultado)
        }
        resultadoTexto.innerText = resultado
            pilhaTexto.innerText = pilha
    }
}

function temPrioridade(char1,char2){
    let prioridade1
    let prioridade2

    if(char1 == '+' || char1 == '-'){
        prioridade1 = 1
    }else if(char1 == '*' || char1 == '/'){
        prioridade1 = 2
    }else if(char1 == '^'){
        prioridade1 = 3
    }else if(char1 == '(' || char1 == ')'){
        prioridade1 = 4
    }

    if(char2 == '+' || char2 == '-'){
        prioridade2 = 1
    }else if(char2 == '*' || char2 == '/'){
        prioridade2 = 2
    }else if(char2 == '^'){
        prioridade2 = 3
    }else if(char2 == '(' || char2 == ')'){
        prioridade2 = 4
    }

    return prioridade2 < prioridade1
}
