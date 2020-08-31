$('.add_to_cart').on('click', function() {
    var cart = $('.shopping-cart');
    var imgtodrag = $(this).parent('.product_details').parent('.product_card').find('img').eq(0);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.8',
                'position': 'absolute',
                'height': '70px',
                'width': '70px',
                'z-index': '11111'
            })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top - 10,
                'left': cart.offset().left + 10,
                'width': 25,
                'height': 25
            }, 1000, 'easeInOutExpo');

        setTimeout(function() {
            cart.effect("bounce", {
                times: 2
            }, 400);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function() {
            $(this).detach()
        });
    }
});