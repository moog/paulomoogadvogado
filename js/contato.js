var Contato = function() {
  var priv = [];
  var pub = [];

  priv.configurarFormulario = function() {
    $("#formNome").on("blur", function(e) {
      if($(this).val().length > 0)
        priv.validarNome($(this))
    });
    $("#formEmail").on("blur", function(e) {
      if($(this).val().length > 0)
        priv.validarEmail($(this))
    });
    $("#formTelefone").on("blur", function(e) {
      if($(this).val().length > 0)
        priv.validarTelefone($(this))
    });
    $("#formMensagem").on("blur", function(e) {
      if($(this).val().length > 0)
        priv.validarMensagem($(this))
    });

    $("#contato form").on("submit", function(e) {
      e.preventDefault();
      var btn = $("#contato button[type='submit']");
      var form = $(this);
      if(priv.validarForumlario()){
        $.ajax({
          url: 'https://formspree.io/paulo_moog@yahoo.com.br',
          method: 'POST',
          data: form.serialize(),
          dataType: 'json',
          beforeSend: function() {
            btn.prop('disabled', true);
            btn.html("Enviando <span class='loader'></span>");
          },
          success: function(data) {
            btn.html("Mensagem enviada!");
            setTimeout(function(){
              btn.prop('disabled', false);
              btn.html("Enviar mensagem");
            }, 5000);
          },
          error: function(err) {
            console.log(err);
            btn.html("Erro ao enviar. Tente mais tarde.");
            setTimeout(function(){
              btn.prop('disabled', false);
              btn.html("Enviar mensagem");
            }, 5000);
          }
        });
      }
    });
  };

  priv.mostrarErro = function(elemento, texto) {
    var erro = $("<span></span>");
    erro.addClass("erro");
    erro.text(texto);
    priv.removerErro(elemento);
    elemento.after(erro);
  };

  priv.removerErro = function(elemento) {
    elemento.siblings("span.erro").remove()
  }

  priv.validarNome = function(elemento) {
    priv.removerErro(elemento);
    var texto = elemento.val();
    if(texto.length <= 2 || texto.length >= 100) {
      priv.mostrarErro(elemento, "O nome deve ter entre 2 e 100 caracteres.");
    }
  };

  priv.validarEmail = function(elemento) {
    priv.removerErro(elemento);
    var texto = elemento.val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(texto)) {
      priv.mostrarErro(elemento, "Email inválido.");
    }
  };

  priv.validarTelefone = function(elemento) {
    priv.removerErro(elemento);
    var texto = elemento.val();
    var re = /^(\(0?\d{2}\)\s?|0?\d{2}[\s.-]?)\d{4,5}[\s.-]?\d{4}$/;
    if(!re.test(texto)) {
      priv.mostrarErro(elemento, "Telefone inválido.");
    }
  };

  priv.validarMensagem = function(elemento) {
    priv.removerErro(elemento);
    var texto = elemento.val();
    if(texto.length <= 10 || texto.length > 1000) {
      priv.mostrarErro(elemento, "A mensagem deve ter entre 10 e 1000 caracteres.");
    }
  };

  priv.validarForumlario = function(){
    priv.validarNome($("#formNome"));
    priv.validarEmail($("#formEmail"));
    priv.validarTelefone($("#formTelefone"));
    priv.validarMensagem($("#formMensagem"));

    return $("form span.erro") != undefined;
  };

  pub.iniciar = function() {
    priv.configurarFormulario();
  };

  return pub;

}();
