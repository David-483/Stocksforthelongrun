  $(document).ready(function() {
    $(".header-menu a").click(function () {
        $(".header-menu a").removeClass("is-active");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).addClass("is-active");   
    });
    });

    $(function () {
        $(".menu-link").click(function () {
         $(".menu-link").removeClass("is-active");
         $(this).addClass("is-active");
        });
       });
       
       $(function () {
        $(".main-header-link").click(function () {
         $(".main-header-link").removeClass("is-active");
         $(this).addClass("is-active");
        });
       });
       
       const dropdowns = document.querySelectorAll(".dropdown");
       dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", (e) => {
         e.stopPropagation();
         dropdowns.forEach((c) => c.classList.remove("is-active"));
         dropdown.classList.add("is-active");
        });
       });
       
       $(".search-bar input")
        .focus(function () {
         $(".header").addClass("wide");
        })
        .blur(function () {
         $(".header").removeClass("wide");
        });
       
       $(document).click(function (e) {
        var container = $(".status-button");
        var dd = $(".dropdown");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
         dd.removeClass("is-active");
        }
       });
       
       $(function () {
        $(".dropdown").on("click", function (e) {
         $(".content-wrapper").addClass("overlay");
         e.stopPropagation();
        });
        $(document).on("click", function (e) {
         if ($(e.target).is(".dropdown") === false) {
          $(".content-wrapper").removeClass("overlay");
         }
        });
       });
       
       $(function () {
        $(".status-button:not(.open)").on("click", function (e) {
         $(".overlay-app").addClass("is-active");
        });
        $(".pop-up .close").click(function () {
         $(".overlay-app").removeClass("is-active");
        });
       });
       
       $(".status-button:not(.open)").click(function () {
        $(".pop-up").addClass("visible");
       });
       
       $(".pop-up .close").click(function () {
        $(".pop-up").removeClass("visible");
       });
       
       const toggleButton = document.querySelector('.dark-light');
       
       toggleButton.addEventListener('click', () => {
         document.body.classList.toggle('light-mode');
       });



       $(document).ready( function() {
        $("#autocomplete").autocomplete({
            select: function (e, ui) {

                 window.location.href = ui.item.value;
                //  window.location.href = "dashboard2/"
            },
            source:function(req,res){
                $.ajax({
                 url:'/searchbar/search',
                 method:'post',
                 dataType:'json',
                 data:{'search':req.term},
                 success:function(data){ 
                     var x = new Array();
                         $.each(data.data,(index,values)=>{
                              x.push({'label':values.Name, 'value': values.Code});
                      });
                      res(x)
                  },
                  error:function(){
                      alert('server error occured')
                  }
                });
                
            }
        });
 });

