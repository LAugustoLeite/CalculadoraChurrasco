import React from "react";
import { createContext } from "react";

export const MainContext = createContext();

export default function AuthProvider({children}){
    let data = {
        pessoas:{
            total: 0,
            totalsemcrianca:0,
            homens: 0,
            mulher: 0,
            crianca: 0,
            totalkilos: 0,
            totallitrosa: 0,
            totallitrosc: 0
        },
        quantidade:{
            qntCarne:0,
            qntBebida:0,
            qntBebidac:0,
            qntExtra:0
        },
        "Cortes": [
            {
                nome: "Picanha",
                status: false,
                precototal: 0,
                preco: 69.96
            },
            
            {
                nome: "Contra Filé",
                status: false,
                precototal: 0,
                preco: 45.96
            },
            
            {
                nome: "Maminha",
                status: false,
                precototal: 0,
                preco: 49.96
            },
            
            {
                nome: "Costelinha",
                status: false,
                precototal: 0,
                preco: 34.96
            },

            {
                nome:"Liguiça",
                status: false,
                precototal: 0,
                preco: 18.96
            },
            
            {
                nome: "Picanha Suína",
                status: false,
                precototal: 0,
                preco: 29.96
            },
            
            {
                nome: "Coxa e Sobrecoxa",
                status: false,
                precototal: 0,
                preco: 17.96
            },

            {
                nome: "Coração",
                status: false,
                precototal: 0,
                preco: 25.46
            },

            {
                nome: "Asa",
                status: false,
                precototal: 0,
                preco: 15.96
            },
        ],
        
        "Extras": [
            {
                nome: "Queijo",
                status: false,
                precototal: 0,
                preco: 23.96
            },

            {
                nome: "Pão de Alho",
                status: false,
                precototal: 0,
                preco: 12.96
            }
        ],
        
        "Bebidas": [
            {
                nome: "Água",
                status: false,
                precototal: 0,
                preco: 5.00
            },

            {
                nome: "Refrigerante",
                status: false,
                precototal: 0,
                preco: 8.00
            },

            {
                nome: "Suco",
                status: false,
                precototal: 0,
                preco: 5.50
            },

            {
                nome: "Cerveja",
                status: false,
                precototal: 0,
                preco: 12.00
            }
        ],
        
        conta:{
            quantidadekilos:0,
            quantidadelitro:0,
            quantidadelitroc: 0,
            quantidadeextra: 0,
            quantidadelitrostotais:0,
            gastototal: 0,
            rateiocomcrianca: 0,
            rateiosemcrianca: 0
        },

        info: {
            numero: "",
            nome: "",
            cep: ""
        },
        descartaveis: {
            precocarvao: 0,
            qtdcarvao:0,
            precopratos: 0,
            qtdpratos: 0,
            precocopos: 0,
            qtdcopos: 0,
            precofosforo: 1.75,
            precosal: 7.50
        }
    }

    const AddPessoas = (pessoa, quantidade) => {
        if(pessoa == "homem"){
            data.pessoas.homens = quantidade;
        } else if(pessoa == "mulher") {
            data.pessoas.mulher = quantidade;
        } else if(pessoa == "crianca"){
            data.pessoas.crianca = quantidade;
        }
    }

    const ValorTotal = () => {
        data.pessoas.total = data.pessoas.homens + data.pessoas.mulher + data.pessoas.crianca;
    }

    const ValorSemCrianca = () => {
        data.pessoas.totalsemcrianca = data.pessoas.homens + data.pessoas.mulher;
    }

    const TotalCarnes = () => {
        data.pessoas.totalkilos = (data.pessoas.homens*0.6) + (data.pessoas.mulher*0.4) + (data.pessoas.crianca*0.25);
    }

    const TotalLitrosAdultos = () => {
        data.pessoas.totallitrosa = (data.pessoas.homens*2) + (data.pessoas.mulher*1.5);
    }

    const TotalLitrosCrianca = () => {
        data.pessoas.totallitrosc = data.pessoas.crianca*1;
    }

    const ModificaItem = (classe, item, estado) => {
        if(estado == false){
            if(classe == "Cortes"){
                data.quantidade.qntCarne+=1
            }else if(classe == "Bebidas"){
                data.quantidade.qntBebida+=1
                if(item != "Cerveja"){
                    data.quantidade.qntBebidac+=1
                }
            }else if(classe == "Extras"){
                data.quantidade.qntExtra+=1
            }
        } else if(estado == true){
            if(classe == "Cortes"){
                data.quantidade.qntCarne-=1
            }else if(classe == "Bebidas"){
                data.quantidade.qntBebida-=1
                if(item != "Cerveja"){
                    data.quantidade.qntBebidac-=1
                }
            }else if(classe == "Extras"){
                data.quantidade.qntExtra-=1
            }
        }
    }

    const ZeraCarne = () =>{
        data.quantidade.qntCarne = 0;
        data.quantidade.qntExtra = 0;
    }

    const ZeraBebida = () =>{
        data.quantidade.qntBebida = 0;
        data.quantidade.qntBebidac = 0;
    }

    const MudaStatus = (classe, posicao, estado) => {
        data[classe][posicao].status = estado;
    }

    const DivideCarne = () => {
        data.conta.quantidadekilos = parseFloat((data.pessoas.totalkilos/data.quantidade.qntCarne).toFixed(2));
    }
    const DivideBebida = () => {
        data.conta.quantidadelitro = parseFloat((data.pessoas.totallitrosa/data.quantidade.qntBebida).toFixed(2));
        data.conta.quantidadelitroc = parseFloat((data.pessoas.totallitrosc/data.quantidade.qntBebidac).toFixed(2));
        data.conta.quantidadelitrostotais = data.conta.quantidadelitro+data.conta.quantidadelitroc;
    }
    const SeparaExtra = () =>{
        data.conta.quantidadeextra = parseFloat(((data.pessoas.total*0.15)*data.quantidade.qntExtra).toFixed(2));
    }

    const ContaChurrasco = () =>{
        data["Cortes"].forEach(element =>{
            element.precototal = parseFloat((data.conta.quantidadekilos*element.preco).toFixed(2));
            data.conta.gastototal+=parseFloat((element.precototal).toFixed(2));
        });

        data["Extras"].forEach(element =>{
            element.precototal = parseFloat((data.conta.quantidadeextra*element.preco).toFixed(2));
            data.conta.gastototal+=parseFloat((element.precototal).toFixed(2));
        });

        data["Bebidas"].forEach(element =>{
            element.precototal = parseFloat((data.conta.quantidadelitro*element.preco).toFixed(2));
            data.conta.gastototal+=parseFloat((element.precototal).toFixed(2));

            if (element.nome != "Cerveja"){
                element.precototal += parseFloat((data.conta.quantidadelitroc*element.preco).toFixed(2));
                data.conta.gastototal+=parseFloat((element.precototal).toFixed(2));
            }
        
            data.conta.rateiosemcrianca = parseFloat((data.conta.gastototal/data.pessoas.totalsemcrianca).toFixed(2));
            data.conta.rateiocomcrianca = parseFloat((data.conta.gastototal/data.pessoas.total).toFixed(2));
        });

    }

    const ValorCarvao = () =>{
        if(data.pessoas.totalkilos > 0){
            data.descartaveis.qtdcarvao=1;
        }else if(data.pessoas.totalkilos > 15){
            data.descartaveis.qtdcarvao=2;
        }else if(data.pessoas.totalkilos > 25){
            data.descartaveis.qtdcarvao=3;
        }

        data.descartaveis.precocarvao=data.descartaveis.qtdcarvao*65;
    }

    const ValorDescartaveis = () =>{
        data.descartaveis.qtdcopos= data.pessoas.total*4;
        data.descartaveis.qtdpratos= data.pessoas.total*2;

        data.descartaveis.precocopos = data.descartaveis.qtdcopos*0.085;
        data.descartaveis.precopratos = data.descartaveis.qtdpratos*0.8;

        data.conta.gastototal+=data.descartaveis.precocarvao+data.descartaveis.precocopos+data.descartaveis.precopratos+data.descartaveis.precofosforo+data.descartaveis.precosal;
    }


    const SetNome = (nome) =>{
        data.info.nome = nome;
    }

    const SetNumero = (numero) =>{
        data.info.numero = numero;
    }

    const SetCep = (cep) =>{
        data.info.cep = cep;
    }

    const response = 
    {
        data,
        AddPessoas,
        ValorTotal,
        ValorSemCrianca,
        TotalCarnes,
        TotalLitrosAdultos,
        TotalLitrosCrianca,
        ZeraBebida,
        ZeraCarne,
        MudaStatus,
        ModificaItem,
        DivideBebida,
        DivideCarne,
        SeparaExtra,
        ContaChurrasco,
        SetCep,
        SetNome,
        SetNumero,
        ValorDescartaveis,
        ValorCarvao
    };
   
    return(

        <MainContext.Provider value={response}>
            {children}
        </MainContext.Provider>
    );
}