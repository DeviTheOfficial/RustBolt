(function ($) {
  "use strict";

  // Page loading animation (hide preloader)
  $(window).on('load', function() {
    $('#js-preloader').addClass('loaded');
  });

  // WOW JS
  $(window).on('load', function(){
    if ($(".wow").length) {
      var wow = new WOW({
        boxClass:     'wow',
        animateClass: 'animated',
        offset:       20,
        mobile:       true,
        live:         true,
      });
      wow.init();
    }
  });

// Sticky header on scroll (works on every page)
$(window).on('scroll', function(){
  var scroll = $(window).scrollTop();
  var header = $('header').outerHeight();

  if (scroll >= header) {
    $('header').addClass('background-header');
  } else {
    $('header').removeClass('background-header');
  }
});


  // Isotope filtering
  $('.filters ul li').click(function(){
    $('.filters ul li').removeClass('active');
    $(this).addClass('active');
    var data = $(this).attr('data-filter');
    $grid.isotope({ filter: data });
  });
  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: true,
    masonry: { columnWidth: ".all" }
  });

  // Reload on width breakpoints
  var width = $(window).width();
  $(window).resize(function() {
    if (width > 992 && $(window).width() < 992) location.reload();
    if (width < 992 && $(window).width() > 992) location.reload();
  });

  // Naccs menu tabs
  $(document).on("click", ".naccs .menu div", function() {
    var idx = $(this).index();
    if (!$(this).hasClass("active")) {
      $(".naccs .menu div, .naccs ul li").removeClass("active");
      $(this).addClass("active");
      $(".naccs ul li").eq(idx).addClass("active")
        .parent().height($(".naccs ul li").eq(idx).innerHeight());
    }
  });

  // Owl Carousels
  $('.owl-features').owlCarousel({
    items:3, loop:true, dots:false, nav:true, autoplay:true, margin:30,
    responsive:{0:{items:1},600:{items:2},1200:{items:3},1800:{items:3}}
  });
  $('.owl-collection').owlCarousel({
    items:3, loop:true, dots:false, nav:true, autoplay:true, margin:30,
    responsive:{0:{items:1},800:{items:2},1000:{items:3}}
  });
  $('.owl-banner').owlCarousel({
    items:1, loop:true, dots:false, nav:true, autoplay:true, margin:30
  });

  // Mobile menu toggle
  if ($('.menu-trigger').length) {
    $(".menu-trigger").on('click', function(){
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }

  // Smooth scroll & active menu
  $('.scroll-to-section a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') &&
        location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        if ($(window).width() < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);
        }
        $('html,body').animate({ scrollTop: target.offset().top - 80 }, 700);
        return false;
      }
    }
  });
  function onScroll() {
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos) {
        $('.nav ul li a').removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }
  $(document).ready(function() {
    $(document).on("scroll", onScroll);
    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
      $('.scroll-to-section a').removeClass('active');
      $(this).addClass('active');
      var target = $(this.hash);
      $('html, body').stop().animate(
        { scrollTop: target.offset().top - 79 },
        500, 'swing',
        function(){ window.location.hash = target.selector; $(document).on("scroll", onScroll); }
      );
    });
  });

  
  // Parallax & secondary preloader
  $(window).on('load', function() {
    if ($('.cover').length) {
      $('.cover').parallax({ imageSrc: $('.cover').data('image'), zIndex: '1' });
    }
    $("#preloader").animate({ opacity: 0 }, 600, function(){
      setTimeout(function(){
        $("#preloader").css("visibility","hidden").fadeOut();
      }, 300);
    });
  });

  // Dropdown submenu toggles
  const dropdownOpener = $('.main-nav ul.nav .has-sub > a');
  if (dropdownOpener.length) {
    dropdownOpener.each(function () {
      $(this).on('tap click', function (e) {
        var parentLi = $(this).parent('li'),
            submenu  = parentLi.find('> ul.sub-menu');
        if (submenu.length) {
          if (submenu.is(':visible')) {
            submenu.slideUp(450,'easeInOutQuad');
            parentLi.removeClass('is-open-sub');
          } else {
            parentLi.addClass('is-open-sub')
              .siblings('.has-sub').removeClass('is-open-sub')
              .find('.sub-menu').slideUp(250,'easeInOutQuad');
            submenu.slideDown(250,'easeInOutQuad');
          }
          e.preventDefault();
        }
      });
    });
  }

  // -------------------------
  // Donation slider & presets
  // -------------------------
  $(function(){
    // 1) preset‐button click
    $('.preset-amounts a').on('click', function(ev){
      ev.preventDefault();
      // reset all to outline
      $('.preset-amounts .main-button').each(function(){
        $(this).removeClass('main-button').addClass('main-border-button border-no-active');
      });
      // make this one filled
      var $wrapper = $(this).parent();
      $wrapper.removeClass('main-border-button border-no-active').addClass('main-button');
    });

    // 2) slider + milestone logic
    var RANGE      = document.getElementById('donation-range'),
        MILESTONES = document.querySelectorAll('.milestone-list li');

    function refreshThermostat(amount) {
      RANGE.value = amount;
      Array.prototype.forEach.call(MILESTONES, function(li){
        var v = parseInt(li.getAttribute('data-value'),10);
        li.classList.toggle('active', v <= amount);
        li.classList.toggle('next', v > amount &&
          !Array.prototype.some.call(MILESTONES, function(x){
            return parseInt(x.getAttribute('data-value'),10) > amount && x !== li;
          })
        );
      });
    }

      // Manual toggle of One-time / Monthly tabs
  $(function(){
    $('.donate-tabs .nav-link').on('click', function(e){
      e.preventDefault();
      var $btn = $(this),
          target = $btn.attr('href');

      // 1) Highlight the clicked pill
      $('.donate-tabs .nav-link').removeClass('active');
      $btn.addClass('active');

      // 2) Show the corresponding pane
      $('.donation-section .tab-pane').removeClass('show active');
      $(target).addClass('show active');
    });
  });

    // Donate button click
    $('#donate-btn').on('click', function(ev){
      ev.preventDefault();
      var $sel = $('.preset-amounts .main-button a[data-amount]'),
          val  = $sel.length ? parseInt($sel.data('amount'),10) : 0,
          other = parseInt($('#donation-other').val(),10);
      if (!val && other > 0) val = other;
      refreshThermostat(val);
      console.log('Donate one-time:', val);
      // TODO: hook up real payment call here
    });

    // initial draw
    refreshThermostat(parseInt(RANGE.value,10) || 0);
  });

})(window.jQuery);
