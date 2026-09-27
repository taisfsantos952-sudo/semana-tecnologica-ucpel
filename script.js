/* =========================================================
   SEMANA TECNOLÓGICA UCPel 2026
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   1. SLIDESHOW / BANNER
========================================================= */

const slides = document.querySelectorAll(".hero-slide");
const indicadores = document.querySelectorAll(".indicador");

const botaoAnterior = document.querySelector(".hero-seta.esquerda");
const botaoProximo = document.querySelector(".hero-seta.direita");

let slideAtual = 0;
let intervaloSlide;


/*
  Mostra o slide escolhido
*/
function mostrarSlide(numero) {

  if (slides.length === 0) {
    return;
  }

  /*
    Se passar do último slide,
    volta para o primeiro.
  */
  if (numero >= slides.length) {
    slideAtual = 0;
  }

  /*
    Se voltar antes do primeiro,
    vai para o último.
  */
  else if (numero < 0) {
    slideAtual = slides.length - 1;
  }

  else {
    slideAtual = numero;
  }


  /*
    Remove o slide ativo de todos.
  */
  slides.forEach(function (slide) {
    slide.classList.remove("ativo");
  });


  /*
    Remove o indicador ativo de todos.
  */
  indicadores.forEach(function (indicador) {
    indicador.classList.remove("ativo");
  });


  /*
    Ativa o slide atual.
  */
  slides[slideAtual].classList.add("ativo");


  /*
    Ativa o indicador correspondente.
  */
  if (indicadores[slideAtual]) {
    indicadores[slideAtual].classList.add("ativo");
  }
}


/*
  Próximo slide
*/
function proximoSlide() {
  mostrarSlide(slideAtual + 1);
}


/*
  Slide anterior
*/
function slideAnterior() {
  mostrarSlide(slideAtual - 1);
}


/*
  Botão próximo
*/
if (botaoProximo) {

  botaoProximo.addEventListener("click", function () {

    proximoSlide();

    reiniciarIntervalo();

  });

}


/*
  Botão anterior
*/
if (botaoAnterior) {

  botaoAnterior.addEventListener("click", function () {

    slideAnterior();

    reiniciarIntervalo();

  });

}


/*
  Clica nos indicadores
*/
indicadores.forEach(function (indicador, indice) {

  indicador.addEventListener("click", function () {

    mostrarSlide(indice);

    reiniciarIntervalo();

  });

});


/*
  Troca automaticamente a cada 5 segundos
*/
function iniciarIntervalo() {

  intervaloSlide = setInterval(function () {

    proximoSlide();

  }, 5000);

}


/*
  Reinicia o contador depois de clicar
*/
function reiniciarIntervalo() {

  clearInterval(intervaloSlide);

  iniciarIntervalo();

}


/*
  Inicia o slideshow
*/
if (slides.length > 0) {

  mostrarSlide(0);

  iniciarIntervalo();

}


/* =========================================================
   2. PROGRAMAÇÃO
========================================================= */


/*
  Pega todos os botões da programação.
*/
const botoesProgramacao =
  document.querySelectorAll(".botao-item");


/*
  Para cada botão...
*/
botoesProgramacao.forEach(function (botao) {

  botao.addEventListener("click", function () {

    /*
      Pega a área de detalhes que
      está logo depois do botão.
    */
    const detalhes = botao.nextElementSibling;


    /*
      Abre ou fecha os detalhes.
    */
    if (detalhes) {

      detalhes.classList.toggle("aberto");

    }


    /*
      Procura o símbolo + ou −
      dentro do botão.
    */
    const simbolo = botao.querySelector(".simbolo");


    if (simbolo) {

      if (detalhes.classList.contains("aberto")) {

        simbolo.textContent = "−";

      }

      else {

        simbolo.textContent = "+";

      }

    }

  });

});


/* =========================================================
   3. FILTRO DAS OFICINAS
========================================================= */


/*
  Pega os botões de filtro.
*/
const botoesFiltro =
  document.querySelectorAll(".filtro-btn");


/*
  Pega todas as oficinas.
*/
const oficinas =
  document.querySelectorAll(".oficina");


/*
  Quando clicar em um filtro...
*/
botoesFiltro.forEach(function (botao) {

  botao.addEventListener("click", function () {

    /*
      Remove "ativo" de todos.
    */
    botoesFiltro.forEach(function (item) {

      item.classList.remove("ativo");

    });


    /*
      Adiciona "ativo" no botão clicado.
    */
    botao.classList.add("ativo");


    /*
      Descobre qual categoria foi escolhida.
    */
    const categoria =
      botao.dataset.categoria;


    /*
      Percorre todas as oficinas.
    */
    oficinas.forEach(function (oficina) {

      /*
        Se escolher "todas",
        mostra todas.
      */
      if (
        categoria === "todas" ||
        oficina.dataset.categoria === categoria
      ) {

        oficina.classList.remove("escondida");

      }

      /*
        Caso contrário,
        esconde a oficina.
      */
      else {

        oficina.classList.add("escondida");

      }

    });

  });

});


/* =========================================================
   4. FORMULÁRIO DE INSCRIÇÃO
========================================================= */


/*
  Pega o formulário.
*/
const formulario =
  document.getElementById("formulario-inscricao");


/*
  Só executa se o formulário existir.
*/
if (formulario) {

  formulario.addEventListener("submit", function (evento) {

    /*
      Impede o navegador de recarregar
      a página.
    */
    evento.preventDefault();


    /*
      Pega os valores dos campos.
    */
    const nome =
      document.getElementById("nome").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const atividade =
      document.getElementById("atividade").value;


    /*
      Variável para verificar se
      encontramos algum erro.
    */
    let temErro = false;


    /* -----------------------------------------------------
       VALIDAR NOME
    ----------------------------------------------------- */

    const erroNome =
      document.getElementById("erro-nome");


    if (nome === "") {

      erroNome.textContent =
        "Preencha seu nome.";

      temErro = true;

    }

    else {

      erroNome.textContent = "";

    }


    /* -----------------------------------------------------
       VALIDAR E-MAIL
    ----------------------------------------------------- */

    const erroEmail =
      document.getElementById("erro-email");


    /*
      Expressão simples para verificar
      se o e-mail possui formato válido.
    */
    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailValido.test(email)) {

      erroEmail.textContent =
        "Digite um e-mail válido.";

      temErro = true;

    }

    else {

      erroEmail.textContent = "";

    }


    /* -----------------------------------------------------
       VALIDAR ATIVIDADE
    ----------------------------------------------------- */

    const erroAtividade =
      document.getElementById("erro-atividade");


    if (atividade === "") {

      erroAtividade.textContent =
        "Escolha uma atividade.";

      temErro = true;

    }

    else {

      erroAtividade.textContent = "";

    }


    /* -----------------------------------------------------
       RESULTADO
    ----------------------------------------------------- */

    const mensagemSucesso =
      document.getElementById("mensagem-sucesso");


    /*
      Se não encontrou nenhum erro...
    */
    if (!temErro) {

      /*
        Mostra mensagem.
      */
      mensagemSucesso.classList.remove("escondido");


      /*
        Limpa o formulário.
      */
      formulario.reset();


      /*
        Depois de 5 segundos,
        esconde a mensagem.
      */
      setTimeout(function () {

        mensagemSucesso.classList.add("escondido");

      }, 5000);

    }

  });

}


/* =========================================================
   5. MENU — ROLAGEM SUAVE
========================================================= */


/*
  Pega os links do menu que apontam
  para uma seção da própria página.
*/
const linksMenu =
  document.querySelectorAll('a[href^="#"]');


linksMenu.forEach(function (link) {

  link.addEventListener("click", function (evento) {

    const destino =
      link.getAttribute("href");


    /*
      Ignora links que tenham apenas "#".
    */
    if (destino === "#") {
      return;
    }


    const elemento =
      document.querySelector(destino);


    /*
      Se encontrou a seção...
    */
    if (elemento) {

      evento.preventDefault();


      /*
        Faz uma rolagem suave.
      */
      elemento.scrollIntoView({

        behavior: "smooth",

        block: "start"

      });

    }

  });

});


/* =========================================================
   6. PAUSA O SLIDESHOW QUANDO O MOUSE
      ESTÁ SOBRE O BANNER
========================================================= */

const hero =
  document.querySelector(".hero");


if (hero) {

  hero.addEventListener("mouseenter", function () {

    clearInterval(intervaloSlide);

  });


  hero.addEventListener("mouseleave", function () {

    iniciarIntervalo();

  });

}


/* =========================================================
   7. ACESSIBILIDADE
========================================================= */


/*
  Se o usuário preferir menos movimento,
  não mantém o slideshow automático.
*/
const prefereMenosMovimento =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


if (prefereMenosMovimento) {

  clearInterval(intervaloSlide);

}