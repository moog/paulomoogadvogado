var Index = function(){
  var priv = [];
  var pub = [];

  priv.configurarFade = function(){
    $(window).scroll(function(){

      $('.hideme').each(function(){
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        var cont = 0;
        if(bottom_of_window + 300 > bottom_of_object && cont == 0){
          console.log(bottom_of_window)
          $(this).children("div").each(function(){
            var el = $(this);
            cont++;
            setTimeout(function(){
              el.animate({'opacity':'1'},500);
            }, 200*cont);
          });
        }

      });
    });
  };

  priv.configurarBanner = function(){
    $(".carousel").carousel();
  };

  pub.iniciar = function(){
    priv.configurarBanner();
    priv.configurarFade();
  };

  return pub;

}();
