$(function () {

  $('.filter-recent__stars').rateYo({
    starWidth: "12px",
    normalFill: "#d6d6d6",
    ratedFill: "#ffcc00",
    readOnly: true,
  });

  $(".filter-price__input").ionRangeSlider({
    type: "double",
    prefix: "$",
    step: 0.01,
    onChange: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
    onStart: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
  });
  
  $('.top-slider__inner').slick({
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000
  });
  
  var mixer = mixitup('.products__items',{
    selectors: {
      target: '.products-item--filter',
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