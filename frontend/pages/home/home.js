// handle swiper

const swiper = new Swiper('.swiper', {
    speed: 800,
    loop: true,
    spaceBetween: 20,


    pagination: {
        el: '.swiper-pagination',
    },

    autoplay: {
        delay: 1000,
        disableOnInteraction: false ,
        reverseDirection: true,
      },


    breakpoints: {
        0: {
            slidesPerView: 1
        },
        576: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    }
})