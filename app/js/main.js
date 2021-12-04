$(function () {

  $('.top-slider__inner').slick({
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000
  });

  var mixer = mixitup('.products__items',{
    selectors: {
      target: '.products__item',
      control: '.filter-1'
    }
  });

  var mixer = mixitup('.new__items',{
    selectors: {
      target: '.new__item',
      control: '.filter-2'
    }
  });

});