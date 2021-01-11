$(function () {
  // =================================================================
  // HEADER
  // =================================================================
  const HEADER_ANIMATION_DURATION = 200;
  const _HEADER_MOBILE_MENU_TRIGGER = ".header-mobile__hamburger";
  const __HEADER_MOBILE_NAV_MODAL = "#header-mobile__nav-modal";
  const __HEADER_MOBILE_NAV_CATALOG = "#header-mobile__nav-catalog";
  const _HEADER_MOBILE_NAV_CLOSE_TRIGGER = ".header-mobile__nav-close-trigger";
  
  $(document)
    // descktop top nav dropdowns
    .on("mouseenter", "ul.navbar-nav li.dropdown", function () {
      $(this)
        .find(".dropdown-menu")
        .stop(true, true)
        .delay(HEADER_ANIMATION_DURATION)
        .fadeIn(HEADER_ANIMATION_DURATION);
    })
    .on("mouseleave", "ul.navbar-nav li.dropdown", function () {
      $(this)
        .find(".dropdown-menu")
        .stop(true, true)
        .delay(HEADER_ANIMATION_DURATION)
        .fadeOut(HEADER_ANIMATION_DURATION);
    })
    // mobile nav hamburger
    .on("hide.bs.modal", __HEADER_MOBILE_NAV_MODAL, function (e) {
      $(_HEADER_MOBILE_MENU_TRIGGER).removeClass("is-active");
    })
    .on("show.bs.modal", __HEADER_MOBILE_NAV_MODAL, function (e) {
      $(_HEADER_MOBILE_MENU_TRIGGER).addClass("is-active");
    })
    // mobile nav cataog
    .on("hide.bs.collapse", __HEADER_MOBILE_NAV_CATALOG, function (e) {
      $(".header-mobile__nav-catalog-title").removeClass(
        "header-mobile__nav-catalog-title_active"
      );
    })
    .on("show.bs.collapse", __HEADER_MOBILE_NAV_CATALOG, function (e) {
      $(".header-mobile__nav-catalog-title").addClass(
        "header-mobile__nav-catalog-title_active"
      );
    })
    // mobile nav close trigger
    .on("click", _HEADER_MOBILE_NAV_CLOSE_TRIGGER, function (e) {
      $(_HEADER_MOBILE_MENU_TRIGGER).removeClass("is-active");
      $(__HEADER_MOBILE_NAV_MODAL).modal("hide");
    });
  
  // =================================================================
  // MENU-CATALOG
  // =================================================================
  const MENU_CATALOG_ANIMATION_DURATION = 200;
  const _MENU_CATALOG_BUTTON_TRIGGER = ".menu-catalog__button-trigger";
  const _MENU_CATALOG_CONTENT_WRAP = ".menu-catalog__content-wrap";
  
  $(document).on("click", _MENU_CATALOG_BUTTON_TRIGGER, function () {
    const $hamburger = $(this).find(".hamburger");
    const $menu_catalog = $(".menu-catalog");
    const $header = $(".header");
  
    $hamburger.toggleClass("is-active");
    if ($hamburger.hasClass("is-active")) {
      $menu_catalog
        .find(_MENU_CATALOG_CONTENT_WRAP)
        .css("padding-top", $header.height());
      $menu_catalog.stop().fadeIn(MENU_CATALOG_ANIMATION_DURATION);
    } else {
      $menu_catalog.stop().fadeOut(MENU_CATALOG_ANIMATION_DURATION);
    }
  });
  
  $(document).on("click", ".menu-catalog", function (e) {
    if (e.target != this) return;
    const $hamburger = $(_MENU_CATALOG_BUTTON_TRIGGER + " .hamburger");
    const $menu_catalog = $(".menu-catalog");
    $hamburger.removeClass("is-active");
    $menu_catalog.stop().fadeOut(MENU_CATALOG_ANIMATION_DURATION);
  });
  
  $(document).on("mouseenter", ".menu-catalog__nav-link", function (e) {
    const categoryID = $(this).data("category-id");
    if (categoryID) {
      const dataAttr = `[data-category-id='${categoryID}']`;
      $(`.menu-catalog__categories-page:not(${dataAttr}):visible`)
        .stop()
        .fadeOut(MENU_CATALOG_ANIMATION_DURATION, function () {
          $(`.menu-catalog__categories-page${dataAttr}`)
            .stop()
            .fadeIn(MENU_CATALOG_ANIMATION_DURATION);
        });
    }
  });
  
  // =================================================================
  // SLIDER-LINKS
  // =================================================================
  $(".slider-links").each(function (index, element) {
    const $container = $(this).find(".swiper-container");
    const $next = $(this).find(".swiper-button-next");
    const $prev = $(this).find(".swiper-button-prev");
    const gap = $(this).data("gap") || 33;
  
    new Swiper($container[0], {
      loop: false,
      spaceBetween: gap,
      slidesPerView: "auto",
  
      navigation: {
        nextEl: $next[0],
        prevEl: $prev[0],
      },
    });
  });
  
  // =================================================================
  // SLIDER-BANNER
  // =================================================================
  $(".slider-banner").each(function (index, element) {
    const $container = $(this).find(".swiper-container");
    const $pagination = $(this).find(".swiper-pagination");
    const $next = $(this).find(".swiper-button-next");
    const $prev = $(this).find(".swiper-button-prev");
  
    new Swiper($container[0], {
      loop: true,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: $pagination[0],
        clickable: true,
      },
      navigation: {
        nextEl: $next[0],
        prevEl: $prev[0],
      },
    });
  });
  
  // =================================================================
  // SLIDER-CARDS
  // =================================================================
  $(".slider-cards").each(function (index, element) {
    const $container = $(this).find(".swiper-container");
    const $pagination = $(this).find(".swiper-pagination");
    const $next = $(this).find(".swiper-button-next");
    const $prev = $(this).find(".swiper-button-prev");
    const $faderLeft = $(this).find(".slider-cards__screen-fader-left");
    const $faderRight = $(this).find(".slider-cards__screen-fader-right");
    const gap = $(this).data("gap") || 30;
  
    new Swiper($container[0], {
      loop: false,
      spaceBetween: gap,
      slidesPerView: "auto",
  
      pagination: {
        el: $pagination[0],
        dynamicBullets: true,
        clickable: true,
      },
  
      navigation: {
        nextEl: $next[0],
        prevEl: $prev[0],
      },
  
      on: {
        reachEnd: function (e) {
          $faderLeft.stop().fadeIn();
          $faderRight.stop().fadeOut();
        },
        fromEdge: function (e) {
          $faderLeft.stop().fadeOut();
          $faderRight.stop().fadeIn();
        },
      },
    });
  });
  
  // =================================================================
  // CARD-PRODUCT
  // =================================================================
  const SINGLE_PRODUCT_COUNT_MAX = 1000;
  
  // add product to cart here
  function applyProductCount(productID, count) {
    console.log("productID", productID, "count", count);
    // put AJAX here
    // add cart update
    // find all same product counters to update
  }
  
  // set like status product here
  function setProductLikeStatus(productID, status) {
    console.log("productID", productID, "status", status);
    // put AJAX here
  }
  
  // apply input text filter
  setInputFilter(".card-product__counter-input", function (value) {
    return (
      /^\d*$/.test(value) &&
      (value === "" || parseInt(value) <= SINGLE_PRODUCT_COUNT_MAX)
    );
  });
  
  // listeners
  $(document)
    // counter
    .on("click", ".card-product__btn-buy", function () {
      cardProductCounterUpdate($(this).closest(".card-product__actions"), "add");
    })
    .on("click", ".card-product__counter-btn-minus", function () {
      cardProductCounterUpdate(
        $(this).closest(".card-product__actions"),
        "minus"
      );
    })
    .on("click", ".card-product__counter-btn-plus", function () {
      cardProductCounterUpdate($(this).closest(".card-product__actions"), "plus");
    })
    .on(
      "input mouseup select contextmenu drop",
      ".card-product__counter-input",
      function () {
        const $block = $(this).closest(".card-product__actions");
        const oldVal = parseInt($(this).data("old-val"));
        const newVal = parseInt($(this).val());
        if (oldVal == newVal) return;
        $block.data("old-val", newVal);
        applyProductCount($block.data("product-id"), newVal);
      }
    )
    // likes
    .on("click", ".card-product__like-icon", function () {
      const $card = $(this).closest(".card-product");
      const likedClass = "card-product__like-icon_active";
      $(this).toggleClass(likedClass);
      setProductLikeStatus(
        $card.data("product-id"),
        $(this).hasClass(likedClass)
      );
    });
  
  // counter interface logic
  function cardProductCounterUpdate($block, action) {
    const $input = $block.find(".card-product__counter-input");
    const $counter = $block.find(".card-product__cart-counter");
    const $adder = $block.find(".card-product__btn-buy");
    const curVal = parseInt($input.val());
    let newVal;
  
    switch (action) {
      case "add":
        newVal = 1;
        break;
      case "plus":
        newVal = curVal + 1;
        break;
      case "minus":
        newVal = curVal - 1;
        break;
    }
  
    newVal = Math.max(newVal, 0);
    newVal = Math.min(newVal, SINGLE_PRODUCT_COUNT_MAX);
  
    if (curVal == newVal) return;
  
    if (newVal > 0) {
      $adder.fadeOut();
      $counter.fadeIn();
    } else {
      $adder.fadeIn();
      $counter.fadeOut();
    }
  
    $input.data("old-val", newVal);
    $input.val(newVal);
  
    applyProductCount($block.data("product-id"), newVal);
  }
  
  // =================================================================
  // CARD-RECIPE-VIDEO
  // =================================================================
  $(".card-recipe-video__thumb-link").magnificPopup({
    type: "iframe",
  
    iframe: {
      markup:
        '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay"></iframe>' +
        "</div>",
      patterns: {
        youtube: {
          src: "https://www.youtube.com/embed/%id%?autoplay=1",
        },
      },
    },
  });
  
  // =================================================================
  // WIDGET-FAQ
  // =================================================================
  $(".widget-faq__accordion")
    .on("hide.bs.collapse", function (event) {
      const $target = $(event.target).closest(".widget-faq__accordion-item");
      $target.removeClass("widget-faq__accordion-item_visible");
    })
    .on("show.bs.collapse", function (event) {
      const $target = $(event.target).closest(".widget-faq__accordion-item");
      $target.addClass("widget-faq__accordion-item_visible");
    });
  
  // =================================================================
  // BLOG-WIDGET
  // =================================================================
  $(".blog-widget__other").each(function (index, element) {
    const $container = $(this).find(".swiper-container");
    const gap = $(this).data("gap") || 30;
  
    new Swiper($container[0], {
      loop: false,
      spaceBetween: gap,
      slidesPerView: "auto",
    });
  });
  
  // =================================================================
  // MODAL-AUTH
  // =================================================================
  const _MODAL_AUTH_ACTION_CHANGE_PAGE = ".modal-auth__action-change-page";
  
  // change auth page
  $(document).on("click", _MODAL_AUTH_ACTION_CHANGE_PAGE, function (e) {
    e.preventDefault();
    const pageTarget = $(this).data("page-target");
    const $curPage = $(this).closest(".modal-auth__page");
    const $targetPage = $(this)
      .closest(".modal-auth__content")
      .find(`.modal-auth__page-${pageTarget}`);
    $curPage.hide();
    $targetPage.show();
  });
  
  // bootstrap form validation
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
  

  // =================================================================
  // COMMON
  // =================================================================
  // input text filter
  function setInputFilter(_target, inputFilter) {
    $(document).on(
      "input keydown keyup mousedown mouseup select contextmenu drop",
      _target,
      function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      }
    );
  }
});
