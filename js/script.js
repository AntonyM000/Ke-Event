(function($) {

  "use strict";

  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
	var initChocolat = function() {
		Chocolat(document.querySelectorAll('.image-link'), {
		  imageSize: 'contain',
		  loop: true,
		})
	}

  var initSwiper = function() {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });

    var brand_swiper = new Swiper(".brand-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".brand-carousel-next",
        prevEl: ".brand-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      }
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".products-carousel-next",
        prevEl: ".products-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });
  }

  var initProductQty = function(){

    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          if(quantity>0){
            $el_product.find('#quantity').val(quantity - 1);
          }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

  }); // End of a document

})(jQuery);

// Initialize cart total and item count
let cartTotal = 0;  // Starting total if needed
let itemCount = 0;  // Initial item count if needed

function addToCart(itemName, itemPrice) {
  // Select cart elements
  const cartList = document.querySelector('#offcanvasCart .list-group');
  const cartTotalElement = document.querySelector('#offcanvasCart .list-group-item:last-child strong');
  const cartTotalPage = document.querySelector('.cart-total');
  const itemCountBadge = document.querySelector('#offcanvasCart .badge');

  // Create new cart item element
  const cartItem = document.createElement('li');
  cartItem.className = 'list-group-item d-flex justify-content-between lh-sm';
  cartItem.innerHTML = `
    <div>
      <h6 class="my-0">${itemName}</h6>
      
    </div>
    <span class="text-body-secondary">Kes ${itemPrice.toFixed(2)}</span>
  `;

  // Append new item to the cart list above the total
  cartList.insertBefore(cartItem, cartList.lastElementChild);

  // Update total price and item count
  cartTotal += itemPrice;
  itemCount++;

  // Update UI with new total and item count
  cartTotalElement.textContent = `Kes ${cartTotal.toFixed(2)}`;
  cartTotalPage.textContent = `Kes ${cartTotal.toFixed(2)}`;
  itemCountBadge.textContent = itemCount;

  // Show the Bootstrap toast notification
  showCartToast();
}

// Function to show the toast notification
function showCartToast() {
  const toastElement = document.getElementById('cartToast');
  const toast = new bootstrap.Toast(toastElement);

  // Show the toast
  toast.show();
}
