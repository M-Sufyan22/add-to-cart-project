// Loading Function

function myloading() {
    document.querySelector('.loading').style.display = 'none';
}

// Products details in form of arrayss

let products = [{
    name: 'Canon DSLR Camera',
    pic: 'prodt5',
    price: 360,
    incart: 0
}, {
    name: 'Branded Watch ef23',
    pic: 'prodt4',
    price: 110,
    incart: 0
}, {
    name: 'Diamond Watch f34',
    pic: 'prodt6',
    price: 100,
    incart: 0
}, {
    name: 'Huawei Y9s (2019)',
    pic: 'prodt8',
    price: 250,
    incart: 0
}, {
    name: 'Brand New Silver Men Watch',
    pic: 'prodt7',
    price: 105,
    incart: 0
}, {
    name: 'Simple Men Silver Watch',
    pic: 'prodt3',
    price: 90,
    incart: 0
}, {
    name: 'New Brown Lether Style',
    pic: 'prodt1',
    price: 80,
    incart: 0
}, {
    name: 'Modern Lether Style',
    pic: 'prodt2',
    price: 70,
    incart: 0
}];

let carts = document.querySelectorAll('.add_to_cart');
let del_all = document.getElementById('del_all');

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', function() {
        cartNumbers(products[i], i);
        totalcost(products[i]);
    });
}

function onloadcart() {
    let productNum = localStorage.getItem('cartNumbers');
    let total_cartPrice_container = document.querySelector('.total_cartPrice');

    if (productNum == null) {
        document.getElementById('cartnum').textContent = 0;
        if (total_cartPrice_container) {
            total_cartPrice_container.innerHTML = " ";
            del_all.style.display = "none";
        }
    } else {
        document.getElementById('cartnum').textContent = productNum;
        let ttc = document.getElementById('total_cartPrice');
        let final_price = document.getElementById('final_price');
        if (ttc) {
            ttc.innerHTML = '$' + localStorage.getItem('totalCost');
            let fp = parseInt(localStorage.getItem('totalCost'));
            final_price.innerHTML = `$${fp + 50}`;
            let total_cartitems = document.getElementById('total_cartitems');
            total_cartitems.innerHTML = localStorage.getItem('cartNumbers');
            let ship_fee = document.getElementById('ship_fees');
            ship_fee.innerHTML = `$50.00`;
        }
    }
}


function cartNumbers(product, b) {
    let productNum = localStorage.getItem('cartNumbers');
    productNum = parseInt(productNum);
    if (productNum) {
        localStorage.setItem('cartNumbers', productNum + 1);
        document.getElementById('cartnum').textContent = productNum + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.getElementById('cartnum').textContent = 1;
    };
    SetProduct(product);

    // Firebase Work
    // let random = Math.random() * 1234567;
    // let key = Math.floor(random);
    // let key = database.push().key;
    // database.child(key).set(product);
};

function SetProduct(product) {
    let cartItems = JSON.parse(localStorage.getItem('ProductInCart'));
    if (cartItems != null) {
        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem('ProductInCart', JSON.stringify(cartItems));
}


function totalcost(product) {
    let cart_cost = localStorage.getItem('totalCost');
    if (cart_cost != null) {
        cart_cost = parseInt(cart_cost);
        localStorage.setItem('totalCost', cart_cost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displaycart() {
    let CartItems = localStorage.getItem('ProductInCart');
    CartItems = JSON.parse(CartItems);
    let cart_cont = document.querySelector('.cart_container');
    if (CartItems && cart_cont) {
        Object.values(CartItems).map(item => {
            cart_cont.innerHTML +=
                `<div class="cart_details">
                <div class="cart_img">
                <i class="fa fa-times-circle remove" aria-hidden="true"></i>
                    <img src="assets/images/${item.pic}.jpg" alt="">
                    <span class="cart_name">${item.name}</span>
                </div>
                <div class="cart_price">$${item.price}</div>
                <div class="cart_qtn">
                    <i class="fa fa-minus-circle inc_dec dec_cart"
                     aria-hidden="true"></i>
                    <span class="qtn_box">${item.incart}</span>
                    <i class="fa fa-plus-circle inc_dec inc_cart"
                     aria-hidden="true"></i>
                </div>
                <div class="cart_item_total">
                    <span class="total_item_pr">$${item.incart * item.price}</span>
                </div>
            </div>`
        });
    } else if (cart_cont) {
        cart_cont.innerHTML = "<h1>Opps! No Itmes In Your Cart"
    }
}

onloadcart();
displaycart();


if (del_all) {
    del_all.addEventListener('click', DeleteAll);
};
//

let dec_cart = document.querySelectorAll('.dec_cart');
let inc_cart = document.querySelectorAll('.inc_cart');
let qtn_box = document.querySelectorAll('.qtn_box');
let cartnum = document.getElementById('cartnum');
let item_price = document.querySelectorAll('.total_item_pr');
let ttc = document.getElementById('total_cartPrice');
let final_price = document.getElementById('final_price');

if (dec_cart) {
    for (let i = 0; i < dec_cart.length; i++) {
        dec_cart[i].addEventListener('click', function() {
            var old_productIncart = JSON.parse(localStorage.getItem('ProductInCart'));
            var dabs = Object.values(old_productIncart);
            if (dabs[i].incart === 1) {
                alert('Minimum 1 product Shop limit');
            } else {
                var Old_qt = parseInt(localStorage.getItem('cartNumbers'));
                var upd_cart_num = Old_qt - 1;
                localStorage.setItem('cartNumbers', upd_cart_num);
                cartnum.innerHTML = upd_cart_num;
                //

                var deleted_prd = dabs.splice(i, 1);
                var remain_prd = dabs;
                var upd_p = {
                    name: deleted_prd[0].name,
                    pic: deleted_prd[0].pic,
                    price: deleted_prd[0].price,
                    incart: deleted_prd[0].incart - 1
                };
                remain_prd.splice(i, 0, upd_p);
                localStorage.setItem('ProductInCart', JSON.stringify(remain_prd));
                qtn_box[i].innerHTML = upd_p.incart;

                let upd_item_cost = upd_p.incart * upd_p.price;
                item_price[i].innerHTML = "$" + upd_item_cost;

                let upd_ttc = parseInt(localStorage.getItem('totalCost'));
                var totalcost_updated = upd_ttc - upd_p.price;
                localStorage.setItem('totalCost', totalcost_updated);

                ttc.innerHTML = '$' + localStorage.getItem('totalCost');
                let fp = parseInt(localStorage.getItem('totalCost'));
                final_price.innerHTML = `$${fp + 50}`;
                let total_cartitems = document.getElementById('total_cartitems');
                total_cartitems.innerHTML = localStorage.getItem('cartNumbers');
                let ship_fee = document.getElementById('ship_fees');
                ship_fee.innerHTML = `$50.00`;
            };
        });
    };
};

if (inc_cart) {
    for (let i = 0; i < inc_cart.length; i++) {
        inc_cart[i].addEventListener('click', function() {
            var old_productIncart = JSON.parse(localStorage.getItem('ProductInCart'));
            var dabs = Object.values(old_productIncart);

            var Old_qt = parseInt(localStorage.getItem('cartNumbers'));
            var upd_cart_num = Old_qt + 1;
            localStorage.setItem('cartNumbers', upd_cart_num);
            cartnum.innerHTML = upd_cart_num;
            //

            var deleted_prd = dabs.splice(i, 1);
            var remain_prd = dabs;
            var upd_p = {
                name: deleted_prd[0].name,
                pic: deleted_prd[0].pic,
                price: deleted_prd[0].price,
                incart: deleted_prd[0].incart + 1
            };
            remain_prd.splice(i, 0, upd_p);
            localStorage.setItem('ProductInCart', JSON.stringify(remain_prd));
            qtn_box[i].innerHTML = upd_p.incart;

            let upd_item_cost = upd_p.incart * upd_p.price;
            item_price[i].innerHTML = "$" + upd_item_cost;

            let upd_ttc = parseInt(localStorage.getItem('totalCost'));
            var totalcost_updated = upd_ttc + upd_p.price;
            localStorage.setItem('totalCost', totalcost_updated);

            ttc.innerHTML = '$' + localStorage.getItem('totalCost');
            let fp = parseInt(localStorage.getItem('totalCost'));
            final_price.innerHTML = `$${fp + 50}`;
            let total_cartitems = document.getElementById('total_cartitems');
            total_cartitems.innerHTML = localStorage.getItem('cartNumbers');
            let ship_fee = document.getElementById('ship_fees');
            ship_fee.innerHTML = `$50.00`;

        });
    };
};


function DeleteAll() {
    localStorage.clear();
};

//

let remove_product = document.querySelectorAll('.remove');

if (remove_product) {
    for (let i = 0; i < remove_product.length; i++) {
        remove_product[i].addEventListener('click', function() {
            removeProduct(this, i, i);
        });
    };
};

function removeProduct(sd, s, i) {

    sd.parentNode.parentNode.remove();
    var storedNames = JSON.parse(localStorage.getItem("ProductInCart"));
    if (storedNames) {
        var s = Object.values(storedNames);

        var totalcost = JSON.parse(localStorage.getItem("totalCost"));
        var cartNumbers = JSON.parse(localStorage.getItem("cartNumbers"));

        var update_totalPrice = totalcost - (s[i].price * s[i].incart);
        var update_cartNumber = cartNumbers - s[i].incart;

        localStorage.setItem('totalCost', update_totalPrice);
        localStorage.setItem('cartNumbers', update_cartNumber);
        // 
        delete s[i];
        var filtered = s.filter(function(el) {
            return el != null;
        });
        localStorage.setItem('ProductInCart', JSON.stringify(filtered));

        // //
        var ttc = document.getElementById('total_cartPrice');
        var final_price = document.getElementById('final_price');
        var cartnum = document.getElementById('cartnum');
        cartnum.textContent = localStorage.getItem('cartNumbers');
        ttc.innerHTML = "$" + localStorage.getItem('totalCost');
        final_price.innerHTML = localStorage.getItem('totalCost') + 50;
        location.reload();
        if (cartnum.textContent == 0) {
            DeleteAll();
        }
    }
};