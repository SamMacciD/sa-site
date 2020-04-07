"use strict";

//Init pageloader
function initPageLoader() {
  $('.pageloader').toggleClass('is-active');
  $(window).on('load', function () {
    var pageloaderTimeout = setTimeout(function () {
      $('.pageloader').toggleClass('is-active');
      $('.infraloader').toggleClass('is-active');
      clearTimeout(pageloaderTimeout);
      setTimeout(function () {
        $('.rounded-hero').addClass('is-active');
      }, 350);
    }, 700);
  });
} //Disable sidebar links in development


function disableSidebarLinks() {
  $('.navigation-menu .is-submenu').each(function () {
    $(this).attr('href', 'javascript:void(0);');
  });
} //Change demo images


function changeDemoImages() {
  $('*[data-demo-src]').each(function () {
    var newSrc = $(this).attr('data-demo-src');

    if (newSrc !== undefined) {
      $(this).attr('src', newSrc);
    }
  });
  $('*[data-demo-background]').each(function () {
    var newBg = $(this).attr('data-demo-background');

    if (newBg !== undefined) {
      $(this).attr('data-background', newBg);
    }
  });
} //Init navbar


function initNavbar() {
  //Navbar fade
  if ($('.navbar-wrapper.navbar-fade.navbar-light').length) {
    $(".navbar-wrapper.navbar-fade").wrap('<div class="navbar-placeholder"></div>');
    $(".navbar-placeholder").height(jQuery(".navbar-wrapper.navbar-fade").outerHeight());
    $(window).on('scroll', function () {
      var height = $(window).scrollTop();

      if (height > 65) {
        $(".navbar-wrapper.navbar-fade.is-transparent").removeClass('is-transparent navbar-light').addClass('navbar-faded');
      } else {
        $(".navbar-wrapper").removeClass('navbar-faded').addClass('is-transparent navbar-light');
      }
    });
  } //Navbar fade


  if ($('.navbar-wrapper.navbar-fade.navbar-default').length) {
    $(".navbar-wrapper.navbar-fade").wrap('<div class="navbar-placeholder"></div>');
    $(".navbar-placeholder").height(jQuery(".navbar-wrapper.navbar-fade").outerHeight());
    $(window).on('scroll', function () {
      var height = $(window).scrollTop();

      if (height > 65) {
        $(".navbar-wrapper.navbar-fade.is-transparent").removeClass('is-transparent').addClass('navbar-faded');
      } else {
        $(".navbar-wrapper").removeClass('navbar-faded').addClass('is-transparent');
      }
    });
  } //Navbar Clone


  if ($('.is-cloned').length) {
    $(window).scroll(function () {
      var height = $(window).scrollTop();

      if (height > 50) {
        $(".is-cloned").addClass('is-active');
      } else {
        $(".is-cloned").removeClass('is-active');
      }
    });
  }

  if ($('.navbar-light').length) {
    $(window).on('scroll', function () {
      var height = $(window).scrollTop();

      if (height > 80) {
        $('.button-signup').removeClass('light-btn').addClass('primary-btn');
      } else {
        $('.button-signup').removeClass('primary-btn').addClass('light-btn');
      }
    });
  }
} //Mobile menu toggle


function initMobileMenu() {
  $('.custom-burger').on("click", function () {
    $(this).toggleClass('is-active');

    if ($('.navbar-menu').hasClass('is-active')) {
      $('.navbar-menu').removeClass('is-active');
      $('.navbar-fade.navbar-light').removeClass('is-dark-mobile');
    } else {
      $('.navbar-menu').addClass('is-active');
      $('.navbar-fade.navbar-light').addClass('is-dark-mobile');
    } //Revert navbar to initial color state


    if ($('.navbar-faded').hasClass('is-dark-mobile')) {
      $('.navbar-faded').removeClass('is-dark-mobile');
    }

    $('.navbar.is-static').toggleClass('is-dark-mobile');
  });
  $('.custom-burger').on('click', function () {
    $(this).find('.icon-box-toggle').toggleClass('active');
  });
} //Agency slider


function initAgencySlider() {
  if ($('.Wallop').length) {
    // Helpers
    var addClass = function addClass(element, className) {
      if (!element) {
        return;
      }

      element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    };

    var removeClass = function removeClass(element, className) {
      if (!element) {
        return;
      }

      element.className = element.className.replace(className, '');
    }; // To start Autoplay, just call the function below
    // and pass in the number of seconds as interval
    // if you want to start autoplay after a while
    // you can wrap this in a setTimeout(); function


    // This a a helper function to build a simple
    // auto-play functionality.
    var autoplay = function autoplay(interval) {
      var lastTime = 0;

      function frame(timestamp) {
        var update = timestamp - lastTime >= interval;

        if (update) {
          wallop.next();
          lastTime = timestamp;
        }

        requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    };

    var wallopEl = document.querySelector('.Wallop');
    var wallop = new Wallop(wallopEl);
    var paginationDots = Array.prototype.slice.call(document.querySelectorAll('.Wallop-dot')); //Attach click listener on the dots

    paginationDots.forEach(function (dotEl, index) {
      dotEl.addEventListener('click', function () {
        wallop.goTo(index);
      });
    }); // Listen to wallop change and update classes

    wallop.on('change', function (event) {
      removeClass(document.querySelector('.Wallop-dot--current'), 'Wallop-dot--current');
      addClass(paginationDots[event.detail.currentItemIndex], 'Wallop-dot--current');
    });
    autoplay(5000);
    ;
  }
} //Highlight current page navbar menu item


function highlightNavbarLinks() {
  // Get current page URL
  var url = window.location.href; // remove # from URL

  url = url.substring(0, url.indexOf("#") == -1 ? url.length : url.indexOf("#")); // remove parameters from URL

  url = url.substring(0, url.indexOf("?") == -1 ? url.length : url.indexOf("?")); // select file name

  url = url.substr(url.lastIndexOf("/") + 1); // If file name not available

  if (url == '') {
    url = 'index.html';
  } // Loop all menu items


  $('.nav .navbar-item, li.has-children ul li a.is-submenu, a.footer-nav-link').each(function () {
    // select href
    var href = $(this).attr('href'); // Check filename

    if (url == href) {
      // Add active class
      $(this).addClass('is-active');
    }
  });
} //Init Sidebar


function initSidebar() {
  $(".navigation-menu > li.has-children a.parent-link").on("click", function (i) {
    i.preventDefault();

    if (!$(this).parent().hasClass("active")) {
      $(".navigation-menu li ul").slideUp();
      $(this).next().slideToggle();
      $(".navigation-menu li").removeClass("active");
      $(this).parent().addClass("active");
    } else {
      $(this).next().slideToggle();
      $(".navigation-menu li").removeClass("active");
    }
  }); //sidebar category toggle

  $('.category-link').on("click", function () {
    $('.category-link.is-active').removeClass('is-active');
    $(this).addClass('is-active');
  }); //Sidebar close button

  $('.hamburger-btn').on("click", function () {
    $('#navigation-trigger .menu-toggle .icon-box-toggle, .navigation-close .menu-toggle .icon-box-toggle, .navigation-trigger .menu-toggle .icon-box-toggle, .navigation-close .menu-toggle .icon-box-toggle').toggleClass('active');
  }); //Menu buttons sync

  $('#navigation-trigger, .navigation-trigger, .navigation-close').on("click", function () {
    $('.side-navigation-menu').toggleClass('is-active');
  }); //Data navigation menu setup

  $('.category-link').on("click", function () {
    var category_id = $(this).attr('data-navigation-menu');
    $('.navigation-menu-wrapper').addClass('is-hidden');
    $("#" + category_id).removeClass('is-hidden');
  }); //Manage close links visibility to display only one at a time

  $('.side-navigation-menu').on("mouseenter", function () {
    $('#navigation-trigger').css('opacity', '0');
    $('.navigation-close').css('opacity', '1');
  });
  $('.side-navigation-menu').on("mouseleave", function () {
    $('#navigation-trigger').css('opacity', '1');
    $('.navigation-close').css('opacity', '0');
  });
} //Init Scroll Reveal


function initScrollReveal() {
  window.sr = ScrollReveal(); // Simple reveal

  sr.reveal('.is-title-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.2
  }); // Revealing multiple icons

  sr.reveal('.is-icon-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: true,
    useDelay: 'always',
    viewFactor: 0.2
  }, 100); // Revealing multiple posts

  sr.reveal('.is-post-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.2
  }, 160); // Revealing multiple cards

  sr.reveal('.is-card-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: true,
    useDelay: 'always',
    viewFactor: 0.2
  }, 160);
} //Popovers


function initPopovers() {
  if ($('[data-toggle="popover"]').length) {
    $('[data-toggle="popover"]').ggpopover();
  }
} //Tooltips


function initTooltips() {
  if ($('[data-toggle="tooltip"]').length) {
    $('[data-toggle="tooltip"]').ggtooltip();
  }
} //Init attribute background images


function initBackgroundImages() {
  $(".has-background-image").each(function () {
    var bgImage = $(this).attr('data-background');

    if (bgImage !== undefined) {
      $(this).css('background-image', 'url(' + bgImage + ')');
    }
  });
} //Back to top button


function initBackToTop() {
  var pxShow = 600;
  var scrollSpeed = 500;
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= pxShow) {
      $("#backtotop").addClass('visible');
    } else {
      $("#backtotop").removeClass('visible');
    }
  });
  $('#backtotop a').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  });
} //Gelatine items


function initGitem() {
  $('.g-item').on("mouseenter", function () {
    $(this).addClass('gelatine');
  });
  $('.g-item').on("mouseleave", function () {
    $(this).removeClass('gelatine');
  });
} //Hash scroll


function initHashScroll() {
  var hash = window.location.hash;
  var anchor = $('.tabs-nav a[href="' + hash + '"]');

  if (anchor.length === 0) {
    $(".tabs-nav li:first").addClass("active").show();
    $(".tab-content:first").show();
  } else {
    anchor.parent('li').click();
  }
} //Clients carousel


function initClientsCarousel() {
  if ($('.clients-logo-carousel').length) {
    $('.clients-logo-carousel').slick({
      infinite: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: "<div class='slick-custom is-prev'><i class='fa fa-chevron-left'></i></div>",
      nextArrow: "<div class='slick-custom is-next'><i class='fa fa-chevron-right'></i></div>",
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      }, {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 2
        }
      }]
    });
  }
} //People carousel


function initPeopleCarousel() {
  if ($('.people-carousel').length) {
    $('.people-carousel').slick({
      infinite: true,
      dots: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      appendDots: $('.people-carousel')
    });
  }
} //Blog


function initBlog() {
  //Like button animation
  $('.fab-btn.like').on('click', function () {
    $(this).toggleClass('is-active');
    $(this).find('.liked').toggleClass('gelatine');
  }); //Show comments

  $('#show-comments').on('click', function () {
    $(this).closest('.comment-count').addClass('is-hidden');
    $('.comments-list').removeClass('is-hidden');
  });
} //Contact google map


function intiGoogleMap() {
  if ($('#half-map').length) {
    $('#half-map').gMap({
      latitude: 40.7143528,
      longitude: -74.0059731,
      maptype: 'ROADMAP',
      zoom: 13,
      markers: [{
        latitude: 40.71771,
        longitude: -74.003245,
        html: '<div style="width: 300px;"><h4 style="margin-bottom: 8px;"></h4><div style="align-items:center!important;" class="content content-flex"><div><img style="height:60px;border-radius:100px;" src="assets/img/logos/cssninja.svg"></div><div style="margin-left:20px;"> Iam very happy if you like this template. If you need any support, please feel free to contact us at <strong>hello@cssninja.io</strong></div></div></div>',
        icon: {
          image: "assets/img/markers/marker-purple.png",
          iconsize: [56, 82],
          iconanchor: [32, 39]
        }
      }],
      doubleclickzoom: true,
      controls: {
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
      }
    });
  }
} //Counters


function initCounters() {
  if ($('.counter').length) {
    $('.counter').counterUp({
      delay: 10,
      time: 1000
    });
  }
} //Parallax


function initParallax() {
  function parallaxBG() {
    $('.parallax').prepend('<div class="parallax-overlay"></div>');
    $(".parallax").each(function () {
      var attrImage = $(this).attr('data-background');
      var attrColor = $(this).attr('data-color');
      var attrOpacity = $(this).attr('data-color-opacity');
      var attrPositionX = $(this).attr('data-position-x');

      if (attrImage !== undefined) {
        $(this).css('background-image', 'url(' + attrImage + ')');
      }

      if (attrColor !== undefined) {
        $(this).find(".parallax-overlay").css('background-color', '' + attrColor + '');
      }

      if (attrOpacity !== undefined) {
        $(this).find(".parallax-overlay").css('opacity', '' + attrOpacity + '');
      }

      if (attrPositionX !== undefined) {
        $(this).css('background-position-x', '' + attrPositionX + '');
      }
    });
  }

  parallaxBG();

  if ("ontouchstart" in window) {
    document.documentElement.className = document.documentElement.className + " touch";
  }

  if (!$("html").hasClass("touch")) {
    $(".parallax").css("background-attachment", "fixed");
  }

  function fullscreenFix() {
    var h = $('body').height();
    $(".content-b").each(function (i) {
      if ($(this).innerHeight() > h) {
        $(this).closest(".fullscreen").addClass("overflow");
      }
    });
  }

  $(window).resize(fullscreenFix);
  fullscreenFix();

  function backgroundResize() {
    var windowH = $(window).height();
    $(".parallax").each(function (i) {
      var path = $(this);
      var contW = path.width();
      var contH = path.height();
      var imgW = path.attr("data-img-width");
      var imgH = path.attr("data-img-height");
      var ratio = imgW / imgH;
      var diff = 0;
      diff = diff ? diff : 0;
      var remainingH = 0;

      if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
        remainingH = windowH - contH;
      }

      imgH = contH + remainingH + diff;
      imgW = imgH * ratio;

      if (contW > imgW) {
        imgW = contW;
        imgH = imgW / ratio;
      }

      path.data("resized-imgW", imgW);
      path.data("resized-imgH", imgH);
      path.css("background-size", imgW + "px " + imgH + "px");
    });
  }

  $(window).resize(backgroundResize);
  $(window).focus(backgroundResize);
  backgroundResize();

  function parallaxPosition(e) {
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function (i) {
      var path = $(this);
      var height = path.height();
      var top = path.offset().top;
      var bottom = top + height;

      if (bottomWindow > top && topWindow < bottom) {
        var imgH = path.data("resized-imgH");
        var min = 0;
        var max = -imgH + heightWindow;
        var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow;
        top = top - overflowH;
        bottom = bottom + overflowH;
        var value = 0;

        if ($('.parallax').is(".titlebar")) {
          value = min + (max - min) * (currentWindow - top) / (bottom - top) * 2;
        } else {
          value = min + (max - min) * (currentWindow - top) / (bottom - top);
        }

        var orizontalPosition = path.attr("data-oriz-pos");
        orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
        $(this).css("background-position", orizontalPosition + " " + value + "px");
      }
    });
  }

  if (!$("html").hasClass("touch")) {
    $(window).resize(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
  }

  if (navigator.userAgent.match(/Trident\/7\./)) {
    $('body').on("mousewheel", function () {
      event.preventDefault();
      var wheelDelta = event.wheelDelta;
      var currentScrollPosition = window.pageYOffset;
      window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
  }
} //Scroll to hash


function initScrollToHash() {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if ($(".nav-primary").hasClass("nav-primary-fixed")) {
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 40
          }, 750);
          return false;
        }
      } else {
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 80
          }, 750);
          return false;
        }
      }
    }
  });
} //Portfolio


function initPortfolio() {
  if ($('.single-image-carousel').length) {
    $('.single-image-carousel').slick({
      infinite: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: "<div class='slick-custom is-prev'><i class='fa fa-chevron-left'></i></div>",
      nextArrow: "<div class='slick-custom is-next'><i class='fa fa-chevron-right'></i></div>",
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          //centerPadding: '40px',
          slidesToShow: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: false,
          //centerPadding: '40px',
          slidesToShow: 1
        }
      }]
    });
  }
}