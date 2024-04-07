const style = "";
function accordion() {
  $(".accordions__head").on("click", function() {
    $(this).find(".accordions__button").toggleClass("accordions__button--active");
    $(this).parents(".accordions__item").find(".accordions__body").slideToggle();
  });
}
function askQuestion() {
  window.askQuestionThankShow = function() {
    $(".ask-question").addClass("ask-question--thank-active");
  };
  window.askQuestionThankHide = function() {
    $(".ask-question").removeClass("ask-question--thank-active");
    $(".ask-question__form").trigger("reset");
  };
}
function articleSlider() {
  const blocks = document.querySelectorAll(".article-slider");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const buttonsWrapper = block.querySelector(".ui-swiper-buttons");
      const buttonNext = block.querySelector(".swiper-button-next");
      const buttonPrev = block.querySelector(".swiper-button-prev");
      const pagination = block.querySelector(".swiper-pagination");
      const lockedClass = "ui-swiper-buttons--locked";
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 10,
        breakpoints: {
          768: {
            spaceBetween: 20
          },
          1260: {
            spaceBetween: 40
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        pagination: {
          el: pagination,
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
          }
        },
        on: {
          progress: function(swiper) {
            swiper.isLocked ? buttonsWrapper.classList.add(lockedClass) : buttonsWrapper.classList.remove(lockedClass);
          }
        }
      });
    }
  }
}
function banner() {
  const blocks = document.querySelectorAll(".banner");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const pagination = block.querySelector(".swiper-pagination");
      new Swiper(slider, {
        slidesPerView: 1,
        autoplay: {
          delay: 5e3,
          disableOnInteraction: false
        },
        pagination: {
          el: pagination,
          renderBullet: function(index, className) {
            return `
            <div class="${className}" data-index="${index}">
              <svg class="ui-swiper-pagination__svg" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="ui-swiper-pagination__dot" cx="27" cy="27" r="6" fill="url(#ui-swiper-pagination-dot-gradient)"/>
                <circle class="ui-swiper-pagination__circle-bg" cx="27" cy="27" r="26.5" stroke="#2F2F2F" stroke-width="2"/>
                <circle class="ui-swiper-pagination__circle" cx="27" cy="27" r="26.5" stroke="url(#ui-swiper-pagination-gradient)" stroke-width="2"/>
                <linearGradient id="ui-swiper-pagination-gradient" x1="4.77594" y1="10.316" x2="46.2311" y2="45.2759" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8A5C2A"/>
                  <stop offset="0.514222" stop-color="#C2A650" stop-opacity="0.81"/>
                  <stop offset="0.619294" stop-color="#D1BA5A" stop-opacity="0.92"/>
                  <stop offset="0.697308" stop-color="#C8AD53" stop-opacity="0.86"/>
                  <stop offset="1" stop-color="#A37C36"/>
                </linearGradient>
                <linearGradient id="ui-swiper-pagination-dot-gradient" x1="22.0613" y1="23.2925" x2="31.2736" y2="31.0613" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8A5C2A"/>
                  <stop offset="0.514222" stop-color="#C2A650" stop-opacity="0.81"/>
                  <stop offset="0.619294" stop-color="#D1BA5A" stop-opacity="0.92"/>
                  <stop offset="0.697308" stop-color="#C8AD53" stop-opacity="0.86"/>
                  <stop offset="1" stop-color="#A37C36"/>
                </linearGradient>
              </svg>
            </div>
            `;
          }
        },
        on: {
          init: (swiper) => {
            const paginationCircle = slider.querySelector(".ui-swiper-pagination__circle");
            if (paginationCircle && swiper.slides.length > 1) {
              slider.style.setProperty("--stroke-dasharray", paginationCircle.getTotalLength() + 1);
              slider.style.setProperty("--delay", swiper.params.autoplay.delay);
            }
          }
        }
      });
    }
  }
}
function category() {
  const blocks = document.querySelectorAll(".category");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 10,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1260: {
            slidesPerView: 2,
            spaceBetween: 40
          }
        }
      });
    }
  }
}
function interior() {
  const blocks = document.querySelectorAll(".interior");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const slides = block.querySelectorAll(".swiper-slide");
      const buttonNext = block.querySelector(".swiper-button-next");
      const buttonPrev = block.querySelector(".swiper-button-prev");
      new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        enabled: true,
        breakpoints: {
          768: {
            slidesPerView: "auto",
            spaceBetween: 0,
            enabled: false
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return `
              <span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
          }
        },
        on: {
          init: function(swiper) {
            interiorCalcHeight(slides);
          }
        }
      });
      window.addEventListener("resize", () => {
        interiorCalcHeight(slides);
      });
    }
  }
}
function interiorCalcHeight(slides) {
  if (window.innerWidth > 767) {
    let maxHeight = 0;
    for (const slide of slides) {
      slide.style.minHeight = "auto";
    }
    for (const slide of slides) {
      const slideHeight = slide.offsetHeight;
      if (slideHeight > maxHeight) {
        maxHeight = slideHeight;
      }
    }
    for (const slide of slides) {
      slide.style.minHeight = `${maxHeight}px`;
    }
  } else {
    for (const slide of slides) {
      slide.style.minHeight = "auto";
    }
  }
}
function popup() {
  window.openPopup = function(element) {
    const popupElement = $(element);
    if (popupElement) {
      popupElement.addClass("active");
      $("html").css("overflow", "hidden");
    }
  };
  window.closePopup = function(element) {
    $(element).removeClass("active");
    $("html").css("overflow", "");
  };
  $(".popup").on("click", function(event) {
    if ($(event.target).closest(".popup__container").length === 0) {
      $(this).removeClass("active");
      $("html").css("overflow", "");
    }
  });
}
function promotionsItem() {
  $(window).on("load", () => {
    for (const item of document.querySelectorAll(".promotions-item")) {
      const textInner = item.querySelector(".promotions-item__ui-p1");
      const textWrapper = item.querySelector(".promotions-item__descr");
      const textWrapperClassVisible = "promotions-item__descr--visible";
      const textHeightBefore = textInner.offsetHeight;
      textWrapper.classList.add(textWrapperClassVisible);
      const textHeightAfter = textInner.offsetHeight;
      textWrapper.classList.remove(textWrapperClassVisible);
      textInner.style.height = `${textHeightBefore}px`;
      if (textHeightBefore < textHeightAfter) {
        textWrapper.classList.add("benefits__text--more");
        item.addEventListener("mouseenter", function() {
          textWrapper.classList.add(textWrapperClassVisible);
          textInner.style.height = `${textHeightAfter}px`;
        });
        item.addEventListener("mouseleave", function() {
          textWrapper.classList.remove(textWrapperClassVisible);
          textInner.style.height = `${textHeightBefore}px`;
        });
      }
    }
  });
}
function promotionsSlider() {
  const blocks = document.querySelectorAll(".promotions-slider");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const buttonsWrapper = block.querySelector(".ui-swiper-buttons");
      const buttonNext = block.querySelector(".swiper-button-next");
      const buttonPrev = block.querySelector(".swiper-button-prev");
      const pagination = block.querySelector(".swiper-pagination");
      const lockedClass = "ui-swiper-buttons--locked";
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 16,
        breakpoints: {
          768: {
            spaceBetween: 20
          },
          1260: {
            spaceBetween: 40
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        pagination: {
          el: pagination,
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
          }
        },
        on: {
          progress: function(swiper) {
            swiper.isLocked ? buttonsWrapper.classList.add(lockedClass) : buttonsWrapper.classList.remove(lockedClass);
          }
        }
      });
    }
  }
}
function reviews() {
  $(window).on("load", () => {
    for (const item of document.querySelectorAll(".reviews__item")) {
      const textInner = item.querySelector(".reviews__ui-p1");
      const textWrapper = item.querySelector(".reviews__text");
      const button = item.querySelector(".reviews__all");
      const textHeightBefore = textInner.offsetHeight;
      textWrapper.classList.add("reviews__text--visible");
      const textHeightAfter = textInner.offsetHeight;
      textWrapper.classList.remove("reviews__text--visible");
      textInner.style.height = `${textHeightBefore}px`;
      if (textHeightBefore < textHeightAfter) {
        textWrapper.classList.add("reviews__text--visible");
        button.style.display = "";
      } else {
        textWrapper.classList.remove("reviews__text--visible");
        button.style.display = "none";
      }
      button.addEventListener("click", function() {
        textWrapper.classList.toggle("reviews__text--visible");
        textInner.style.height = textWrapper.classList.contains("reviews__text--visible") ? `${textHeightBefore}px` : `${textHeightAfter}px`;
      });
    }
  });
}
function reviewsSlider() {
  const blocks = document.querySelectorAll(".reviews-slider");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const buttonsWrapper = block.querySelector(".ui-swiper-buttons");
      const buttonNext = block.querySelector(".swiper-button-next");
      const buttonPrev = block.querySelector(".swiper-button-prev");
      const lockedClass = "ui-swiper-buttons--locked";
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 5,
        breakpoints: {
          1260: {
            spaceBetween: 20
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        on: {
          progress: function(swiper) {
            swiper.isLocked ? buttonsWrapper.classList.add(lockedClass) : buttonsWrapper.classList.remove(lockedClass);
          }
        }
      });
    }
  }
}
function servicesSimular() {
  const blocks = document.querySelectorAll(".services-simular");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const buttonsWrapper = block.querySelector(".ui-swiper-buttons");
      const buttonNext = block.querySelector(".swiper-button-next");
      const buttonPrev = block.querySelector(".swiper-button-prev");
      const lockedClass = "ui-swiper-buttons--locked";
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 20,
        breakpoints: {
          1260: {
            spaceBetween: 40
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        on: {
          progress: function(swiper) {
            swiper.isLocked ? buttonsWrapper.classList.add(lockedClass) : buttonsWrapper.classList.remove(lockedClass);
          }
        }
      });
    }
  }
}
function reviewsVideo() {
  reviewsVideoSlider();
  reviewsVideoPlyr();
}
function reviewsVideoSlider() {
  const blocks = document.querySelectorAll(".reviews-video");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const buttonsWrapper = block.querySelector(".ui-swiper-buttons");
      const buttonNext = block.querySelector(".swiper-button-next");
      const buttonPrev = block.querySelector(".swiper-button-prev");
      const pagination = block.querySelector(".swiper-pagination");
      const lockedClass = "ui-swiper-buttons--locked";
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 10,
        breakpoints: {
          768: {
            spaceBetween: 20
          },
          1260: {
            spaceBetween: 40
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        pagination: {
          el: pagination,
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
          }
        },
        on: {
          progress: function(swiper) {
            swiper.isLocked ? buttonsWrapper.classList.add(lockedClass) : buttonsWrapper.classList.remove(lockedClass);
          }
        }
      });
    }
  }
}
function reviewsVideoPlyr() {
  const blocks = document.querySelectorAll(".reviews-video__item");
  if (blocks.length > 0) {
    for (const block of blocks) {
      block.querySelector(".reviews-video__button");
      const player = new Plyr(block.querySelector(".reviews-video__video"), {
        controls: ["play-large", "play", "progress", "current-time", "volume", "captions", "fullscreen"],
        hideControls: true,
        ratio: "9:16",
        youtube: {
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          modestbranding: 1
        }
      });
      block.addEventListener("click", () => {
        block.classList.add("reviews-video__item--active");
        player.play();
      });
    }
  }
}
function tabs() {
  if ($(".tabs").length > 0) {
    const tabs2 = document.querySelectorAll(".tabs");
    for (const item of tabs2) {
      new Swiper(item.querySelector(".swiper"), {
        spaceBetween: 0,
        slidesPerView: "auto",
        enabled: false,
        breakpoints: {
          768: {
            spaceBetween: 20,
            enabled: true
          }
        }
      });
    }
  }
  window.tabClick = (item) => {
    $(item).siblings(".tabs__item").removeClass("tabs__item--active");
    $(item).addClass("tabs__item--active");
  };
}
function header() {
  window.openBurgerMenu = () => {
    $(".header").removeClass("header--menu");
    $(".header").addClass("header--burger");
    $("html").addClass("no-scroll");
  };
  window.closeBurgerMenu = () => {
    $(".header").removeClass("header--burger");
    $("html").removeClass("no-scroll");
  };
  window.openMenu = () => {
    const header2 = $(".header");
    const html = $("html");
    header2.toggleClass("header--menu");
    if (header2.hasClass("header--menu")) {
      html.addClass("no-scroll");
    } else {
      html.removeClass("no-scroll");
    }
    const menu = $(".header-menu__menu");
    const items = $(".header-menu__item");
    const itemsLength = items.length;
    const activeItemHeight = menu.outerHeight() - (items.outerHeight() * itemsLength - 1);
    $(".header-menu__menu").css("--active-item-height", `${activeItemHeight}px`);
  };
  window.closeMenu = () => {
    $(".header").removeClass("header--menu");
    $("html").removeClass("no-scroll");
  };
  $(".header-menu__button").on("click", function() {
    $(".header-menu__item.active").removeClass("active");
    $(this).closest(".header-menu__item").addClass("active");
  });
  headerHeight();
  $(window).on("load", headerHeight);
  $(window).on("resize", headerHeight);
}
function headerHeight() {
  const headerHeight2 = $(".header").outerHeight();
  $("html").css("--header-height", `${headerHeight2}px`);
}
function navbar() {
  const navbar2 = $(".navbar");
  if (navbar2.length > 0 && $(window).width() <= 1259) {
    $("html").css("--navbar-height", `${navbar2.height()}px`);
    $(window).on("resize", () => $("html").css("--navbar-height", `${navbar2.height()}px`));
  }
}
function certificates() {
  const blocks = document.querySelectorAll(".certificates");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 5,
        breakpoints: {
          768: {
            spaceBetween: 30
          },
          1260: {
            spaceBetween: 40
          }
        }
      });
    }
  }
}
function largeActiveSlider() {
  const blocks = document.querySelectorAll(".large-active-slider");
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector(".swiper");
      const section = block.closest(".section");
      const pagination = section.querySelector(".swiper-pagination");
      const buttonNext = section.querySelector(".swiper-button-next");
      const buttonPrevious = section.querySelector(".swiper-button-prev");
      new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 5,
        speed: 500,
        breakpoints: {
          768: {
            spaceBetween: 30
          },
          1260: {
            spaceBetween: 40
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrevious
        },
        pagination: {
          el: pagination,
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
          }
        }
      });
    }
  }
}
function uiSelect() {
  const selects = document.querySelectorAll(".ui-select select");
  for (const select of selects) {
    const selectParent = select.parentElement;
    const minResultForSearch = selectParent.classList.contains("ui-select--input") ? 0 : Number.POSITIVE_INFINITY;
    $(select).select2({
      minimumResultsForSearch: minResultForSearch,
      width: "auto",
      dropdownAutoWidth: true,
      dropdownParent: selectParent,
      placeholder: select.dataset.placeholder ?? "",
      closeOnSelect: !select.getAttribute("multiple"),
      language: "ru"
    });
  }
}
function certificatesPromo() {
  const blocks = document.querySelectorAll(".certificates-promo");
  if (blocks.length > 0) {
    const isMobile = window.innerWidth <= 767;
    const slideCardTransition = 300;
    const slideChangeTransition = 500;
    for (const block of blocks) {
      const bg = block.querySelector(".certificates-promo__bg-slider");
      const bgSlider = bg.querySelector(".swiper");
      const pagination = block.querySelector(".swiper-pagination");
      const bgSwiper = new Swiper(bgSlider, {
        loop: true,
        speed: slideChangeTransition,
        slidesPerView: 1,
        allowTouchMove: true,
        effect: isMobile ? void 0 : "fade",
        crossFade: !isMobile,
        loopAdditionalSlides: 1,
        pagination: {
          el: pagination,
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
          }
        },
        breakpoints: {
          768: {
            allowTouchMove: false
          }
        }
      });
      const main = block.querySelector(".certificates-promo__slider");
      const slider = main.querySelector(".swiper");
      const buttonNext = main.querySelector(".swiper-button-next");
      const buttonPrevious = main.querySelector(".swiper-button-prev");
      const swiper = new Swiper(slider, {
        speed: slideChangeTransition,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
        effect: isMobile ? "fade" : void 0,
        crossFade: isMobile,
        enabled: false,
        breakpoints: {
          768: {
            enabled: true,
            slidesPerView: "auto",
            spaceBetween: 30
          },
          1260: {
            enabled: true,
            slidesPerView: "auto",
            spaceBetween: 40
          }
        },
        pagination: isMobile ?? {
          el: pagination,
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
          }
        }
      });
      if (!isMobile) {
        swiper.on("loopFix", () => {
          swiper.slides[swiper.slides.length - 1].style.opacity = "";
        });
      }
      buttonNext.addEventListener("click", () => {
        if (isMobile) {
          bgSwiper.slideNext();
          return;
        }
        if (block.hasAttribute("data-animation")) {
          return;
        }
        block.setAttribute("data-animation", "");
        const currentSlide = swiper.slides[swiper.activeIndex];
        const currentSlideImg = currentSlide.querySelector(".certificates-promo__img img").src;
        const coordinates = getCoordinates(currentSlide, block);
        const fakeImg = createImg();
        fakeImg.src = currentSlideImg;
        fakeImg.style.width = `${coordinates.width}px`;
        fakeImg.style.height = `${coordinates.height}px`;
        fakeImg.style.top = `${coordinates.y}px`;
        fakeImg.style.left = `${coordinates.x}px`;
        block.append(fakeImg);
        const blockClientRect = block.getBoundingClientRect();
        const blockWidth = blockClientRect.width;
        const blockHeight = blockClientRect.height;
        currentSlide.style.opacity = 0;
        setTimeout(() => {
          animateElement(fakeImg, {
            transform: {
              translateX: -coordinates.x,
              translateY: -coordinates.y
            },
            width: blockWidth,
            height: blockHeight,
            borderRadius: 0
          }, slideChangeTransition, () => {
            swiper.slideNext();
            bgSwiper.slideNext();
            animateElement(fakeImg, {
              opacity: 0
            }, slideChangeTransition, () => {
              fakeImg.remove();
              block.removeAttribute("data-animation");
            });
          });
        }, slideCardTransition);
      });
      buttonPrevious.addEventListener("click", () => {
        if (isMobile) {
          bgSwiper.slidePrev();
          return;
        }
        if (block.hasAttribute("data-animation")) {
          return;
        }
        block.setAttribute("data-animation", "");
        const currentSlide = swiper.slides[swiper.activeIndex];
        const coordinates = getCoordinates(currentSlide, block);
        const previousSlide = swiper.el.querySelector(".swiper-slide-prev") || swiper.slides[swiper.slides.length - 1];
        const previousSlideImg = previousSlide.querySelector(".certificates-promo__img img").src;
        previousSlide.style.opacity = 0;
        swiper.slidePrev();
        const blockClientRect = block.getBoundingClientRect();
        const blockWidth = blockClientRect.width;
        const blockHeight = blockClientRect.height;
        const fakeImg = createImg();
        fakeImg.src = previousSlideImg;
        fakeImg.style.width = `${blockWidth}px`;
        fakeImg.style.height = `${blockHeight}px`;
        fakeImg.style.top = `${coordinates.y}px`;
        fakeImg.style.left = `${coordinates.x}px`;
        fakeImg.style.transform = `translate(-${coordinates.x}px, -${coordinates.y}px)`;
        fakeImg.style.opacity = 0;
        block.append(fakeImg);
        animateElement(fakeImg, {
          opacity: 1
        }, slideChangeTransition, () => {
          bgSwiper.slidePrev(0);
          animateElement(fakeImg, {
            transform: {
              translateX: 0,
              translateY: 0
            },
            width: coordinates.width,
            height: coordinates.height,
            borderRadius: 20
          }, slideChangeTransition, () => {
            previousSlide.style.opacity = "";
            setTimeout(() => {
              fakeImg.remove();
              block.removeAttribute("data-animation");
            }, slideChangeTransition);
          });
        });
      });
    }
  }
}
function getCoordinates(element, parent) {
  const elementClientRect = element.getBoundingClientRect();
  const parentClientRect = parent.getBoundingClientRect();
  return {
    x: elementClientRect.x - parentClientRect.x,
    y: elementClientRect.y - parentClientRect.y,
    width: elementClientRect.width,
    height: elementClientRect.height
  };
}
function createImg() {
  const img = document.createElement("img");
  img.className = "certificates-promo__fake-img";
  return img;
}
function animateElement(element, endValues, duration, callback) {
  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  let startTime;
  element.style.transition = "none";
  const startValues = {};
  const elementStyles = window.getComputedStyle(element);
  for (const key in endValues) {
    if (key === "transform") {
      const matrix = new DOMMatrixReadOnly(elementStyles[key]);
      startValues.transform = {
        translateX: matrix.m41,
        translateY: matrix.m42
      };
    } else {
      startValues[key] = Number.parseFloat(elementStyles[key]);
    }
  }
  function frame() {
    if (startTime === void 0) {
      startTime = performance.now();
    }
    const elapsedTime = performance.now() - startTime;
    const normalizedTime = Math.min(elapsedTime / duration, 1);
    const lerp = (start, end, t) => {
      return start * (1 - t) + end * t;
    };
    const currentValues = {};
    for (const key in endValues) {
      if (key === "transform") {
        currentValues.transform = {
          translateX: lerp(startValues.transform.translateX, endValues.transform.translateX, normalizedTime),
          translateY: lerp(startValues.transform.translateY, endValues.transform.translateY, normalizedTime)
        };
        element.style.transform = `translate(
          ${currentValues.transform.translateX}px,
          ${currentValues.transform.translateY}px
        )`;
      } else {
        currentValues[key] = lerp(startValues[key], endValues[key], normalizedTime);
        element.style[key] = `${currentValues[key]}${key === "opacity" ? "" : "px"}`;
      }
    }
    if (elapsedTime < duration) {
      requestAnimationFrame(frame);
    } else {
      element.style.transition = "";
      if (callback) {
        callback();
      }
    }
  }
  requestAnimationFrame(frame);
}
document.addEventListener("DOMContentLoaded", function() {
  plyrInit();
  uiSelect();
  accordion();
  articleSlider();
  askQuestion();
  banner();
  category();
  header();
  interior();
  popup();
  promotionsItem();
  promotionsSlider();
  reviews();
  reviewsSlider();
  reviewsVideo();
  servicesSimular();
  tabs();
  largeActiveSlider();
  certificates();
  certificatesPromo();
});
$(window).on("load", () => {
  navbar();
});
function plyrInit() {
  for (const plyrHolder of document.querySelectorAll(".js-fullscreen-player")) {
    const plyrWrapper = document.createElement("div");
    plyrWrapper.className = "plyr-wrapper";
    const plyrContainer = document.createElement("div");
    plyrContainer.setAttribute("data-plyr-provider", plyrHolder.getAttribute("data-plyr-provider"));
    plyrContainer.setAttribute("data-plyr-embed-id", plyrHolder.getAttribute("data-plyr-embed-id"));
    plyrWrapper.append(plyrContainer);
    const plyrWrapperClose = document.createElement("div");
    plyrWrapperClose.className = "plyr-wrapper__close";
    plyrWrapper.append(plyrWrapperClose);
    document.body.append(plyrWrapper);
    const player = new Plyr(plyrContainer);
    plyrHolder.addEventListener("click", () => {
      plyrWrapper.classList.add("active");
      document.documentElement.classList.add("no-scroll");
      player.pause();
      player.play();
    });
    plyrWrapperClose.addEventListener("click", () => {
      plyrWrapper.classList.remove("active");
      document.documentElement.classList.remove("no-scroll");
      player.stop();
    });
  }
}
