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
    })
  
    // search on input change
    .on(
      "input mouseup select contextmenu drop",
      ".header__search-form-input",
      function () {
        const $block = $(this).closest(".search-block");
        const $options = $block.find(".header__search-form-options");
        const newVal = $(this).val();
  
        if (newVal) {
          $options.slideDown(DEFAUILT_AMINATION_SPEED);
        } else {
          $options.slideUp(DEFAUILT_AMINATION_SPEED);
        }
      }
    )
    // search on focusout
    .on("focusout", ".header__search-form-input", function () {
      const $block = $(this).closest(".search-block");
      const $options = $block.find(".header__search-form-options");
  
      $options.slideUp(DEFAUILT_AMINATION_SPEED);
    })
    // search on input change
    .on("click", ".header__search-form-option", function () {
      const $block = $(this).closest(".search-block");
      const $options = $block.find(".header__search-form-options");
      const $input = $block.find(".header__search-form-input");
      const val = $(this).html();
  
      $options.slideUp(DEFAUILT_AMINATION_SPEED);
      $input.val(val);
  
      // accepted address here
    })
  
    // search mobile
    .on("click", ".header-mobile__search-trigger", function (e) {
      e.preventDefault();
      const $block = $(".header-mobile__search-wrap");
      $block.fadeToggle(DEFAUILT_AMINATION_SPEED, function () {
        if ($block.is(":visible")) {
          $block.find("input").focus();
        }
      });
    })
    // search mobile close if show any modal
    .on("show.bs.modal", function (e) {
      const $block = $(".header-mobile__search-wrap");
      $block.fadeOut(DEFAUILT_AMINATION_SPEED);
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
    const columnsOnMobile = $(this).data("columns-on-mobile") || 1;
  
    new Swiper($container[0], {
      loop: false,
      spaceBetween: 24,
      slidesPerView: "auto",
  
      // row count for mobile and descktop
      slidesPerColumnFill: "row",
      slidesPerColumn: columnsOnMobile,
      breakpoints: {
        1200: {
          slidesPerColumn: 1,
        },
      },
  
      breakpoints: {
        1200: {
          spaceBetween: gap,
        },
      },
  
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
  // SLIDER-GALLERY
  // =================================================================
  
  $(".slider-gallery-screen").each(function () {
    const sliderGalleryID = $(this).data("slider-id");
    const $pagination = $(this).find(".swiper-pagination");
    const $sliderGalleryThumbs = sliderGalleryID
      ? $(`.slider-gallery-thumbs[data-slider-id=${sliderGalleryID}]`)
      : false;
    let galleryThumbs = false;
  
    if ($sliderGalleryThumbs.length) {
      galleryThumbs = new Swiper(".slider-gallery-thumbs", {
        spaceBetween: 20,
        slidesPerView: 4,
        // freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
    }
  
    new Swiper(".slider-gallery-screen", {
      spaceBetween: 30,
      pagination: {
        el: $pagination[0],
        dynamicBullets: true,
        clickable: true,
      },
      thumbs: galleryThumbs
        ? {
            swiper: galleryThumbs,
          }
        : false,
    });
  });
  
  // =================================================================
  // CARD-PRODUCT
  // =================================================================
  // listeners
  $(document)
    // likes
    .on("click", ".card-product__like-icon", function () {
      const $card = $(this).closest(".card-product");
      const likedClass = "card-product__like-icon_active";
      $(this).toggleClass(likedClass);
      setProductLikeStatus(
        $card.data("product-id"),
        $(this).hasClass(likedClass)
      );
    })
    // remove from cart
    .on("click", ".cart__product-remove", function () {
      const prodictID = parseInt($(this).data("prodict-id"));
      const $cardProductInCart = $(this).closest(".card-product-in-cart");
      $cardProductInCart.fadeOut(function () {
        $cardProductInCart.remove();
      });
  
      removeItemFromCart(prodictID);
    })
    // clear cart
    .on("click", ".cart__clear", function (e) {
      e.preventDefault();
      $(".card-product-in-cart").fadeOut(DEFAUILT_AMINATION_SPEED, function () {
        $(this).remove();
      });
  
      console.log("clear cart");
    });
  
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
  // WIDGET-ADDRESS-CHECK
  // =================================================================
  $(document)
    // on input change
    .on(
      "input mouseup select contextmenu drop",
      ".widget-address-check__search-input",
      function () {
        const $block = $(this).closest(".widget-address-check__search");
        const $options = $block.find(".widget-address-check__search-options");
        const newVal = $(this).val();
  
        if (newVal) {
          $options.slideDown(DEFAUILT_AMINATION_SPEED);
        } else {
          $options.slideUp(DEFAUILT_AMINATION_SPEED);
        }
      }
    )
    // on input change
    .on("click", ".widget-address-check__search-option", function () {
      const $block = $(this).closest(".widget-address-check__search");
      const $options = $block.find(".widget-address-check__search-options");
      const $input = $block.find(".widget-address-check__search-input");
      const val = $(this).html();
  
      $options.slideUp(DEFAUILT_AMINATION_SPEED);
      $input.val(val);
  
      // accepted address here
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
  // MODAL-CART
  // =================================================================
  $(document)
    // show modal cart
    .on("mouseenter", ".modal-cart__trigger", function () {
      $(this)
        .find(".modal-cart")
        .stop(true, true)
        .delay(400)
        .fadeIn(DEFAUILT_AMINATION_SPEED);
    })
    // hide modal cart
    .on("mouseleave", ".modal-cart__trigger", function () {
      $(this)
        .find(".modal-cart")
        .stop(true, true)
        .delay(200)
        .fadeOut(DEFAUILT_AMINATION_SPEED);
    })
    // remove item from cart
    .on("click", ".cart__remove-trigger", function () {
      $(this)
        .closest(".cart__item")
        .fadeOut(DEFAUILT_AMINATION_SPEED, function () {
          $(this).remove();
        });
      removeItemFromCart($(this).data("product-id"));
    });
  
  function removeItemFromCart(id) {
    console.log("remove product from cart:", id);
    // update all same product cart counters
    // update cart
  }
  
  // =================================================================
  // NAVIGATION-SIDE
  // =================================================================
  
  $(document)
    .on("mouseover", ".navigation-side_extendable", function () {
      const $container = $(this).closest(".container");
      const $wrap = $(this).closest(".navigation-side__wrap");
      const $fader = $wrap.find(".navigation-side__fader");
      const $extender = $(this).find(".navigation-side__extender");
      const $extenderContent = $(this).find(".navigation-side__extender-content");
      const $menu = $(this).find(".navigation-side__menu");
  
      $menu.css({ "z-index": 1050 });
      $extender.width($container.width()).height($menu.height());
      $extenderContent.css({ "padding-left": $menu.width() });
      $extender.stop().fadeIn(DEFAUILT_AMINATION_SPEED);
      $fader.stop().fadeIn(DEFAUILT_AMINATION_SPEED);
    })
    .on("mouseleave", ".navigation-side_extendable", function () {
      const $extender = $(this).find(".navigation-side__extender");
      const $menu = $(this).find(".navigation-side__menu");
      const $fader = $(".navigation-side__fader");
  
      $fader.stop().fadeOut(DEFAUILT_AMINATION_SPEED);
      $extender.stop().fadeOut(DEFAUILT_AMINATION_SPEED, function () {
        $menu.css({ "z-index": 1 });
      });
    });
  
  // =================================================================
  // NAVIGATION-SIDE-BLOCKS_SLIDER
  // =================================================================
  $(".navigation-side-blocks_slider").each(function (index, element) {
    const $container = $(this).find(".swiper-container");
    const $pagination = $(this).find(".swiper-pagination");
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
    });
  });
  
  // =================================================================
  // NAVIGATION-SUBCATEGORIES
  // =================================================================
  $(document)
    // show more subcategories
    .on("click", ".navigation-subcategories__link_more", function (e) {
      e.preventDefault();
      const $list = $(this).closest(".navigation-subcategories__list");
      const $hidden = $list.find(".navigation-subcategories__hidden-items");
      $(this).hide();
      $hidden.fadeIn().css("display", "inline");
    });
  
  // =================================================================
  // NAVIGATION-SORT
  // =================================================================
  const _NAVIGATION_SORT_OPTION = ".navigation-sort__option";
  
  $(document)
    // sort filter selector
    .on("click", _NAVIGATION_SORT_OPTION, function (e) {
      e.preventDefault();
      const $block = $(this).closest(".navigation-sort");
      const $selectorTitle = $block.find(".navigation-sort__selector-title");
      const $options = $block.find(_NAVIGATION_SORT_OPTION);
      const value = $(this).data("value");
      const title = $(this).html();
  
      $selectorTitle.html(title);
      $options.show();
      $(this).hide();
  
      console.log("name:", title, "id:", value);
    });
  
  // =================================================================
  // ADD-TO-CART
  // =================================================================
  const CART_SINGLE_PRODUCT_COUNT_MAX = 1000;
  const _ADD_TO_CART = ".add-to-cart";
  
  // add product to cart here
  function applyProductCount(productID, count) {
    console.log("productID", productID, "count", count);
    // put AJAX here
    // add cart update
    // find all same product counters to update
  }
  
  // apply input text filter
  setInputFilter(".add-to-cart__counter-input", function (value) {
    return (
      /^\d*$/.test(value) &&
      (value === "" || parseInt(value) <= CART_SINGLE_PRODUCT_COUNT_MAX)
    );
  });
  
  // get first state
  $(_ADD_TO_CART).each(function () {
    if ($(this).data("product-in-cart-count")) {
      cardProductCounterUpdate($(this), "take");
    }
  });
  
  // listeners
  $(document)
    // counter
    .on("click", ".add-to-cart__btn-buy", function () {
      cardProductCounterUpdate($(this).closest(_ADD_TO_CART), "add");
    })
    .on("click", ".add-to-cart__counter-btn-minus", function () {
      cardProductCounterUpdate($(this).closest(_ADD_TO_CART), "minus");
    })
    .on("click", ".add-to-cart__counter-btn-plus", function () {
      cardProductCounterUpdate($(this).closest(_ADD_TO_CART), "plus");
    })
    .on(
      "input mouseup select contextmenu drop change ",
      ".add-to-cart__counter-input",
      function () {
        const $block = $(this).closest(_ADD_TO_CART);
        const $counter = $block.find(".add-to-cart__cart-counter");
        const $adder = $block.find(".add-to-cart__btn-buy");
        const oldVal = parseInt($(this).data("old-val"));
        const newVal = parseInt($(this).val()) || 0;
        const isSmall = $block.hasClass("add-to-cart_small");
  
        if (isSmall && newVal < 1) return $(this).val(1);
        if (oldVal == newVal) return;
        $block.data("old-val", newVal);
        applyProductCount($block.data("product-id"), newVal);
        if (newVal > 0) {
          $adder.fadeOut();
          $counter.fadeIn();
        } else {
          $adder.fadeIn();
          $counter.fadeOut();
        }
      }
    );
  
  // counter interface logic
  function cardProductCounterUpdate($block, action) {
    const $input = $block.find(".add-to-cart__counter-input");
    const $counter = $block.find(".add-to-cart__cart-counter");
    const $adder = $block.find(".add-to-cart__btn-buy");
    const curVal = parseInt($input.val());
    const isSmall = $block.hasClass("add-to-cart_small");
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
      case "take":
        newVal = parseInt($block.data("product-in-cart-count"));
        break;
    }
  
    if (isSmall && newVal < 1) return;
  
    newVal = Math.max(newVal, 0);
    newVal = Math.min(newVal, CART_SINGLE_PRODUCT_COUNT_MAX);
  
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
  // ADD-TO-FAVORITE
  // =================================================================
  // set like status product here
  function setProductLikeStatus(id, status, type = "product") {
    console.log("id", id, "status", status, "type", type);
    // put AJAX here
  }
  
  // listeners
  $(document)
    // likes
    .on("click", ".add-to-favorite__trigger", function () {
      const $card = $(this).closest(".card-product");
      const likedClass = "active";
      const id = $(this).data("product-id");
  
      $(this).toggleClass(likedClass);
  
      const liked = $(this).hasClass(likedClass);
  
      setProductLikeStatus(id, liked);
  
      // find all same
      const $same = $(`.add-to-favorite__trigger[data-product-id="${id}"]`);
      if (liked) {
        $same.addClass(likedClass);
      } else {
        $same.removeClass(likedClass);
      }
    });
  
  // =================================================================
  // TABS
  // =================================================================
  $(document).on("show.bs.tab", ".tabs", function (e) {
    const $trigger = $(e.target);
    const $tabContent = $(e.currentTarget).find(".tab-content");
  
    if ($trigger.data("nide-bg-mobile")) {
      $tabContent.addClass("tab-content_no-bg");
    } else {
      $tabContent.removeClass("tab-content_no-bg");
    }
  });
  
  // =================================================================
  // FORM-CONTACT
  // =================================================================
  $(document).on("change", ".form-contact__input-file", function (e) {
    $(this).siblings(".form-contact__input-file-data").html($(this).val());
  });
  
  // =================================================================
  // BLOG-WIDGET
  // =================================================================
  $(".news__other-list").each(function (index, element) {
    const $container = $(this).find(".swiper-container");
    const gap = $(this).data("gap") || 48;
  
    new Swiper($container[0], {
      loop: false,
      spaceBetween: gap,
      slidesPerView: "auto",
      direction: "horizontal",
  
      breakpoints: {
        1200: {
          spaceBetween: 0,
          direction: "vertical",
        },
      },
    });
  });
  
  // =================================================================
  // INPUT-SEARCH
  // =================================================================
  $(document)
    // on input change
    .on(
      "input mouseup select contextmenu drop",
      ".input-search__input",
      function () {
        const $block = $(this).closest(".input-search");
        const $options = $block.find(".input-search__options");
        const newVal = $(this).val();
  
        if (newVal) {
          $options.slideDown(DEFAUILT_AMINATION_SPEED);
        } else {
          $options.slideUp(DEFAUILT_AMINATION_SPEED);
        }
      }
    )
    // on input change
    .on("click", ".input-search__option", function () {
      const $block = $(this).closest(".input-search");
      const $options = $block.find(".input-search__options");
      const $input = $block.find(".input-search__input");
      const val = $(this).html();
  
      $options.slideUp(DEFAUILT_AMINATION_SPEED);
      $input.val(val);
  
      // accepted address here
    });
  
  // =================================================================
  // CART
  // =================================================================
  // listeners
  $(document)
    // likes
    .on("click", "input[name='address-type']", function () {
      var $target = $(
        `.cart__checkout-collapsible[data-address-type="${$(this).val()}"]`
      );
  
      $(".cart__checkout-collapsible").not($target).slideUp();
      $target.slideDown();
    });
  

  // =================================================================
  // COMMON
  // =================================================================
  const DEFAUILT_AMINATION_SPEED = 200;

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
