$(function(){ // $(document).ready()

  // ------------------------------------------------------- Footer ------------------------------------------------------------------------//
    function customPositionFooter() {
      if (($('body').outerHeight(true)) >= $('#app').outerHeight(true)){
        $('footer').css({ bottom : "0", position: 'absolute'});
        $('footer').offset({ left: 0 })
        $('footer').width('100%');
      }
    }



    customPositionFooter();
    $(window).on("resize", customPositionFooter());
    // $(document).ready(customPositionFooter());


    Array.from(
        document.getElementsByClassName('footer-link')
    ).forEach(
      function(item){
        item.addEventListener("mouseover", buttomFooterHover);
        item.addEventListener("mouseout", buttomFooterOut);


        function buttomFooterHover(){
            this.style.textDecoration = 'none';
            this.childNodes[0].style.transform  = 'scale(1.3)';
            // this.childNodes[0].style.color  = '#eb6649';
            this.childNodes[0].style.color  = 'white';

        }

        function buttomFooterOut(){
            this.childNodes[0].style.transform  = 'scale(1)';
            this.childNodes[0].style.color  = 'black';
        }

      }
    )

    Array.from(
        document.getElementsByClassName('icon-social-media')
    ).forEach(
      function(item){
        item.addEventListener("mouseover", buttomFooterHover);
        item.addEventListener("mouseout", buttomFooterOut);

        function buttomFooterHover(){
            this.style.transform  = 'scale(1.5)';
            // this.style.filter  = 'invert(0.4) sepia(1) hue-rotate(339deg) saturate(1000%) brightness(0.9)';
            this.style.filter  = 'brightness(0) invert(1)';


        }

        function buttomFooterOut(){
            this.style.transform  = 'scale(1)';
            this.style.filter  = 'none';
        }

      }
    )

  // ------------------------------------------------------- END Footer ------------------------------------------------------------------------//



    // -------------------------------------------------------  USER - Form (register / update ) ------------------------------------------------------------------------//

    $('#form_user_update').submit(function(e){
      if($('button.btn-primary').hasClass('disabled')){
        e.preventDefault()
      }

      if($('#form_user_update #password')[0].value){
        if($('#password')[0].value.length < 8){
          e.preventDefault()
          alert('La password debe tener al menos 8 caracteres')
        }else if($('#password')[0].value != $('#password_confirmation')[0].value) {
          e.preventDefault()
          alert('Las passwords no coinciden')
        }
      }
    })

    $('#form_user_update #name,#form_user_update #surname, #form_user_register #name,#form_user_register #surname').each(function(){
      $(this).val($(this)[0].value.trim());
    })

    $('#form_user_update').change(function(a){
      if($('#form_user_update button.btn-primary').hasClass('disabled')){
       $('#form_user_update button.btn-primary').removeClass("disabled")
      }
    })

    $('#form_user_update #password').keyup(function(a){
      if(a.target.value){
        $('div#password_confirmed').removeAttr('hidden')
        $('div#password_confirmed').attr('required', 'required')
      } else{
        $('div#password_confirmed').attr('hidden', 'hidden')
        $('div#password_confirmed').removeAttr('required')
      }
    })



''
  // ------------------------------------------------------- END: USER - Form (register / update ) ------------------------------------------------------------------------//

  // ------------------------------------------------------- CALENDAR  ------------------------------------------------------------------------//

  // $("#calendar").on('touchstart', function(e) {
  //   var touchS = e.originalEvent.touches[0].pageX
  //   return touchS
  // })
  //
  // $("#calendar").on('touchend', function(e) {
  //   var touchE = e.originalEvent.changedTouches[0].pageX
  //   // return touchE
  //   if(touchS>touchE){
  //     alert('movimiento a la Izquierda')
  //   }
  //   if(touchS<touchE){
  //     alert('movimiento a la Derecha')
  //   }
  // })




  // ------------------------------------------------------- END -  CALENDAR  ------------------------------------------------------------------------//




}); // Fin $(document).ready()
