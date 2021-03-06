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
    // search result close
    .on("mouseup", function (e) {
      var container = $(".header__search-form-options");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
    })
    // search by click
    .on("click", ".header__search-form-btn", function () {
      const $block = $(this).closest(".search-block");
      const $options = $block.find(".header__search-form-options");
      const newVal = $block.find(".header__search-form-input").val();
  
      if (newVal) {
        $options.slideDown(DEFAUILT_AMINATION_SPEED);
      } else {
        $options.slideUp(DEFAUILT_AMINATION_SPEED);
      }
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
    console.log($sliderGalleryThumbs);
  
    if ($sliderGalleryThumbs.length) {
      galleryThumbs = new Swiper($sliderGalleryThumbs[0], {
        spaceBetween: 16,
        slidesPerView: 4,
        // freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
  
        breakpoints: {
          850: {
            spaceBetween: 20,
          },
        },
      });
    }
  
    new Swiper(this, {
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
      const productID = parseInt($(this).data("product-id"));
      const $cardProductInCart = $(this).closest(".card-product-in-cart");
      $cardProductInCart.fadeOut(function () {
        $cardProductInCart.remove();
      });
  
      removeItemFromCart(productID);
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
    // on input click
    .on("click", ".widget-address-check__search-option", function () {
      const $block = $(this).closest(".widget-address-check");
      const $options = $block.find(".widget-address-check__search-options");
      const $result = $block.find(".widget-address-check__result");
      const $input = $block.find(".widget-address-check__search-input");
      const val = $(this).html();
      const isHider = $block.hasClass("widget-address-check_hider");
  
      $options.slideUp(DEFAUILT_AMINATION_SPEED);
      $input.val(val);
  
      if (isHider) {
        $result.slideDown({
          duration: DEFAUILT_AMINATION_SPEED,
          start: function () {
            $(this).css({
              display: "flex",
            });
          },
        });
      }
  
      // accepted address here
    })
    // on input search-icon click
    .on("click", ".widget-address-check__search-icon", function () {
      const $block = $(this).closest(".widget-address-check");
      const $result = $block.find(".widget-address-check__result");
      const $input = $block.find(".widget-address-check__search-input");
      const isHider = $block.hasClass("widget-address-check_hider");
      const val = $input.val();
  
      console.log("search", val);
  
      if (isHider) {
        $result.slideDown({
          duration: DEFAUILT_AMINATION_SPEED,
          start: function () {
            $(this).css({
              display: "flex",
            });
          },
        });
      }
  
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
  // MODAL-REVIEW
  // =================================================================
  
  $(document)
    // submit review form
    .on("submit", ".modal-review__form", function (e) {
      e.preventDefault();
      const $block = $(this).closest(".modal-review__content");
      const $result = $block.find(".modal-review__result");
  
      $(this).fadeOut(DEFAUILT_AMINATION_SPEED, function () {
        $result.fadeIn();
      });
    })
    .on("show.bs.modal", ".modal-review", function (e) {
      const $form = $(this).find(".modal-review__form");
      const $result = $(this).find(".modal-review__result");
  
      $form.show();
      $result.hide();
    });
  
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
      if ($(this).hasClass("active")) {
        $(this).html("Ещё...").removeClass("active");
        $hidden.fadeOut();
      } else {
        $(this).html("Скрыть").addClass("active");
        $hidden.fadeIn().css("display", "inline");
      }
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
  function applyProductCount(productID, count, action) {
    console.log("productID", productID, "count", count);
  
    // put AJAX here
    if (action == "add") {
      // add new product to cart
      console.log("add new product to cart");
    } else if (action != "take") {
      // update product in cart
      console.log("update product in cart");
    }
  
    // find all same product to update
    const $sameAddToCart = $(`.add-to-cart[data-product-id="${productID}"]`);
    $sameAddToCart.each(function (index, element) {
      cardProductCounterUpdate($(this), "set", count);
    });
  
    // update cost
    const $sameCardsProductInCart = $(
      `.card-product-in-cart[data-product-id="${productID}"]`
    );
    const price = $sameCardsProductInCart.data("product-price");
    $sameCardsProductInCart
      .find(".card-product-in-cart__summary")
      .html(`${count * price} ₽`);
  }
  
  // apply input text filter
  setInputFilter(".add-to-cart__counter-input", function (value) {
    return (
      /^\d*$/.test(value) &&
      (value === "" || parseInt(value) <= CART_SINGLE_PRODUCT_COUNT_MAX)
    );
  });
  
  function applyCountersByDataCount() {
    $(_ADD_TO_CART).each(function () {
      if ($(this).data("product-in-cart-count")) {
        cardProductCounterUpdate($(this), "take");
      }
    });
  }
  
  // get first state
  applyCountersByDataCount();
  
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
        const isCantZero = $block.data("product-is-cant-zero");
  
        if (isCantZero && newVal < 1) return $(this).val(1);
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
  function cardProductCounterUpdate($block, action, param = false) {
    const $input = $block.find(".add-to-cart__counter-input");
    const $counter = $block.find(".add-to-cart__cart-counter");
    const $adder = $block.find(".add-to-cart__btn-buy");
    const curVal = parseInt($input.val());
    const isCantZero = $block.data("product-is-cant-zero");
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
      case "set":
        newVal = param;
        break;
    }
  
    if (isCantZero && newVal < 1) return;
  
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
  
    applyProductCount($block.data("product-id"), newVal, action);
  }
  
  // =================================================================
  // ADD-TO-FAVORITE
  // =================================================================
  // set like status product here
  function setProductLikeStatus(id, status) {
    console.log("id", id, "status", status);
    // put AJAX here
  }
  // set like status recipe here
  function setRecipeLikeStatus(id, status) {
    console.log("id", id, "status", status);
    // put AJAX here
  }
  
  // listeners
  $(document)
    // likes
    .on("click", ".add-to-favorite__trigger", function () {
      const likedClass = "active";
      const productID = $(this).data("product-id");
      const recipeID = $(this).data("recipe-id");
  
      $(this).toggleClass(likedClass);
  
      const liked = $(this).hasClass(likedClass);
  
      if (productID) setProductLikeStatus(productID, liked);
      if (recipeID) setRecipeLikeStatus(recipeID, liked);
  
      // find all same
      let $same = false;
      if (productID) {
        $same = $(`.add-to-favorite__trigger[data-product-id="${productID}"]`);
      } else if (recipeID) {
        $same = $(`.add-to-favorite__trigger[data-recipe-id="${recipeID}"]`);
      }
  
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
  // TAB-ACCOUNT-SETTINGS
  // =================================================================
  function checkAccountSettingsAddressIsEmpty() {
    if (!$(".account-settings__address").length) {
      $(".account-settings__new-address").slideDown();
    }
  }
  
  // if "account-settings__addresses" is empty
  // then show add address form
  checkAccountSettingsAddressIsEmpty();
  
  $(document)
    // remove address
    .on("click", ".account-settings__address-remove", function () {
      $(this)
        .closest(".account-settings__address")
        .slideUp(function () {
          $(this).remove();
          checkAccountSettingsAddressIsEmpty();
        });
  
      // remove address here
    })
    // show add address form
    .on("click", ".account-settings__address-add", function () {
      $(".account-settings__new-address").slideDown();
    })
    // hide add address form
    .on("click", ".account-settings__new-address-decline", function () {
      if ($(".account-settings__address").length) {
        $(".account-settings__new-address").slideUp();
      }
    });
  
  // =================================================================
  // FORM-CONTACT
  // =================================================================
  $(document).on("change", ".form-contact__input-file", function (e) {
    const $labelText = $(this)
      .siblings(".form-contact__input-file-label")
      .find(".form-contact__input-file-label-text");
    const filename = $(this).val();
    const ext = /[^.]+$/.exec(filename);
  
    $labelText.html($(this).val());
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
  // RAITING-SETTER
  // =================================================================
  
  $(document).on("click", ".raiting-setter__star", function () {
    const $block = $(this).closest(".raiting-setter");
    const $input = $block.find(".raiting-setter__input");
    const ID = $block.data("target-id");
    const type = $block.data("target-type");
    const rate = 5 - $(".raiting-setter__star").index(this);
  
    $block.removeClass(function (index, className) {
      return (className.match(/(^|\s)raiting-setter_rated-\S+/g) || []).join(" ");
    });
  
    $input.val(rate);
    $block.addClass(`raiting-setter_rated-${rate}`);
  
    console.log("set rate", rate, "to", type, ID);
  });
  
  // =================================================================
  // PAGE-404
  // =================================================================
  
  lottie.loadAnimation({
    container: $(".p404__screen-animation")[0],
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "js/page-404/404.json",
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

// =================================================================
// favorites
// =================================================================
$(document)
  // remove from favorites product
  .on("click", ".print-action", function () {
    window.print();
  })
  // remove from favorites product
  .on("click", ".favorite__product-remove", function () {
    const productID = parseInt($(this).data("product-id"));
    const $cardProductInCart = $(this).closest(".card-product-in-cart");
    $cardProductInCart.fadeOut(function () {
      $cardProductInCart.remove();
    });

    console.log("remove from favorites product", productID);
  })
  // remove from favorites recipe
  .on("click", ".favorite__recipe-remove", function () {
    const recipeID = parseInt($(this).data("recipe-id"));
    const $cardRecipeInCart = $(this).closest(".card-recipe_in-favorites");
    $cardRecipeInCart.fadeOut(function () {
      $cardRecipeInCart.remove();
    });

    console.log("remove from favorites recipe", recipeID);
  });
