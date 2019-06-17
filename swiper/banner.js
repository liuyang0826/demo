var mySwiper = new Swiper ('.swiper-container', {
  loop: true, // 循环模式选项
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})
