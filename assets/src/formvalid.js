// Loading Function

function myloading() {
    document.querySelector('.loading').style.display = 'none';
}

// Database Code

var firebaseConfig = {
    apiKey: "AIzaSyCUzZYh_y3ym9DbNPRcPy0QSN-vwtVBpHU",
    authDomain: "addtocartwithjs.firebaseapp.com",
    databaseURL: "https://addtocartwithjs.firebaseio.com",
    projectId: "addtocartwithjs",
    storageBucket: "addtocartwithjs.appspot.com",
    messagingSenderId: "792014374193",
    appId: "1:792014374193:web:9c6ce7497c218a35bd9c10",
    measurementId: "G-DKLMNC4QNT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref('OrdersDataList');
let key = database.push().key;

// Code Starts 

function formvalid() {
    var firstname = document.getElementById('firstname');
    var lasttname = document.getElementById('lasttname');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var country_code = document.getElementById('country_code');
    var shipaddress = document.getElementById('shipaddress');
    var select_country = document.getElementById('select_country');
    var zip = document.getElementById('zip');
    var cod = document.getElementById('cod');
    var credit = document.getElementById('credit');
    var debit = document.getElementById('debit');
    var creditNo = document.getElementById('creditNo');
    var cardName = document.getElementById('cardName');
    var CVV = document.getElementById('CVV');
    var exp_year = document.getElementById('exp_year');
    var exp_month = document.getElementById('exp_month');
    var terms_cond = document.getElementById('terms&cond');

    if (checkf_name(firstname)) {
        if (checkl_name(lasttname)) {
            if (checkemail(email)) {
                if (check_phone(phone)) {
                    if (check_countryCode(country_code)) {
                        if (checkf_ship_add(shipaddress)) {
                            if (check_country(select_country)) {
                                if (check_zip(zip)) {
                                    if (choose_del(cod, credit, debit)) {
                                        if (credit.checked || debit.checked) {
                                            if (cardnum_check(creditNo)) {
                                                if (check_card_name(cardName)) {
                                                    if (cardnum_cvv(CVV)) {
                                                        if (check_card_exp_year(exp_year)) {
                                                            if (check_card_exp_month(exp_month)) {
                                                                if (accept_term_condi(terms_cond)) {
                                                                    let randomVal = Math.floor(Math.random() * 5455) + (Math.random() * 758);
                                                                    orderKey = randomVal.toFixed();
                                                                    let prdts = JSON.parse(localStorage.getItem('ProductInCart'));
                                                                    let qtn = JSON.parse(localStorage.getItem('cartNumbers'));
                                                                    let Total = JSON.parse(localStorage.getItem('totalCost'));
                                                                    let order = {
                                                                        ClientInformation: {
                                                                            ClientName: firstname.value + " " + lasttname.value,
                                                                            userEmail: email.value,
                                                                            userPhone: country_code.value + " " + phone.value,
                                                                            Shipaddress: shipaddress.value,
                                                                            Client_country: select_country.value,
                                                                            ZipOrpostal: zip.value,
                                                                            DeliveryMethod: "Card",
                                                                            Card_number: creditNo.value,
                                                                            User_Card_Name: cardName.value,
                                                                            CVV_Code: CVV.value,
                                                                            CardExp_year_month: exp_year.value + " " + exp_month.value,
                                                                            Acepted_Terms: terms_cond.value,
                                                                        },
                                                                        OrderDetails: {
                                                                            OrderKey: orderKey,
                                                                            productsList: prdts,
                                                                            TotalItemsList: qtn,
                                                                            TotalPrice: Total,
                                                                            ShippingFee: 50
                                                                        }
                                                                    }
                                                                    localStorage.setItem('sd', JSON.stringify(order));
                                                                    firebase.database().ref('OrdersDataList/').child(key).set(order);
                                                                    return true;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (cod.checked) {
                                            if (accept_term_condi(terms_cond)) {
                                                let randomVal = Math.floor(Math.random() * 5455) + (Math.random() * 758);
                                                orderKey = randomVal.toFixed();
                                                let prdts = JSON.parse(localStorage.getItem('ProductInCart'));
                                                let qtn = JSON.parse(localStorage.getItem('cartNumbers'));
                                                let Total = JSON.parse(localStorage.getItem('totalCost'));
                                                let order = {
                                                    ClientInformation: {
                                                        ClientName: firstname.value + " " + lasttname.value,
                                                        userEmail: email.value,
                                                        userPhone: country_code.value + " " + phone.value,
                                                        Shipaddress: shipaddress.value,
                                                        Client_country: select_country.value,
                                                        ZipOrpostal: zip.value,
                                                        DeliveryMethod: "COD",
                                                        Acepted_Terms: terms_cond.value
                                                    },
                                                    OrderDetails: {
                                                        OrderKey: orderKey,
                                                        productsList: prdts,
                                                        TotalItemsList: qtn,
                                                        TotalPrice: Total,
                                                        ShippingFee: 50
                                                    }
                                                };
                                                localStorage.setItem('sd', JSON.stringify(order));
                                                firebase.database().ref('OrdersDataList/').child(key).set(order);
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;

};


function checkf_name(inputtxt) {
    var pattn = /^[a-zA-Z ]+$/;
    let checktxt = inputtxt.value.trim();
    let checkname = checktxt.split(' ').join('');
    if (checktxt === '') {
        document.getElementById("p1").innerHTML = "Please fill this field!";
        inputtxt.focus();
        return false;
    } else if (checkname.length < 3) {
        document.getElementById("p1").innerHTML = "Name Must have (3) characters long!";
        inputtxt.focus();
        return false;
    } else if (inputtxt.value.match(pattn)) {
        return true;
    } else {
        document.getElementById("p1").innerHTML = "Numbers and special characters are not allowed";
        inputtxt.focus();
        return false;
    }
}

function checkl_name(inputtxt) {
    var pattn = /^[a-zA-Z ]+$/;
    let checktxt = inputtxt.value.trim();
    let checkname = checktxt.split(' ').join('');
    if (checktxt === '') {
        document.getElementById("p2").innerHTML = "Please fill this field";
        inputtxt.focus();
        return false;
    } else if (checkname.length < 3) {
        document.getElementById("p2").innerHTML = "Name Must have (3) characters long!";
        inputtxt.focus();
        return false;
    } else if (inputtxt.value.match(pattn)) {
        return true;
    } else {
        document.getElementById("p2").innerHTML = "Numbers and special characters are not allowed";
        inputtxt.focus();
        return false;
    }
}


function checkemail(email_input) {
    var a = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    let checktxt = email_input.value.trim();
    if (checktxt === '') {
        document.getElementById('p3').innerHTML = 'Email address is required*';
        email_input.focus();
        return false;
    }
    if (email_input.value.match(a)) {
        return true
    } else {
        document.getElementById('p3').innerHTML = 'Please Enter a valid email address';
        email_input.focus();
        return false;
    }
}

function check_phone(inputnum) {
    var pattn = /^[0-9]+$/;
    let checktxt = inputnum.value.trim();
    if (checktxt === '') {
        document.getElementById("p4").innerHTML = "Please Enter you mobile number*";
        inputnum.focus();
        return false;
    } else if (checktxt.length < 9) {
        document.getElementById("p4").innerHTML = "Minimum length of Mobile numbers is (9)";
        inputnum.focus();
        return false;
    } else if (inputnum.value.match(pattn)) {
        return true;
    } else {
        document.getElementById("p4").innerHTML = "Please enter a valid phone number";
        inputnum.focus();
        return false;
    }
}

function check_countryCode(country_code) {
    if (country_code.value === 'Country Code') {
        document.getElementById("p4").innerHTML = "Please Also select your country Code*";
        country_code.focus();
        return false;
    } else {
        return true;
    }
}

function checkf_ship_add(inputtxt) {
    let checktxt = inputtxt.value.trim();

    if (checktxt === '') {
        document.getElementById("p5").innerHTML = "Please fill this field";
        inputtxt.focus();
        return false;
    } else if (checktxt.length <= 10 || checktxt.length > 60) {
        document.getElementById("p5").innerHTML = "Shipping address should be (Min 10 and Max 60) characters*";
        inputtxt.focus();
        return false;
    } else {
        return true;
    }
}


function check_country(select_country) {
    if (select_country.value === 'select country') {
        document.getElementById("p6").innerHTML = "Please select your country";
        select_country.focus();
        return false;
    } else {
        return true;
    }
}

function check_zip(inputzip) {
    var pattn = /^[0-9]+$/;
    let checktxt = inputzip.value.trim();
    if (checktxt === '') {
        document.getElementById("p7").innerHTML = "zip/postal code required!";
        inputzip.focus();
        return false;
    } else if (checktxt.length < 3) {
        document.getElementById("p7").innerHTML = "Minimum length of Postal / zip Code is (3)";
        inputzip.focus();
        return false;
    } else if (inputzip.value.match(pattn)) {
        return true;
    } else {
        document.getElementById("p7").innerHTML = "Please enter a valid zip/postal";
        inputzip.focus();
        return false;
    }
}


function choose_del(cash, cr, dr) {
    if (cash.checked || cr.checked || dr.checked) {
        return true;

    } else {
        alert('Please Choose your Payment Method!');
        return false;
    }
}


function cardnum_check(cardnumer) {
    var pattn = /^[0-9]+$/;
    let checkcard = cardnumer.value.trim();
    let checknum = checkcard.split(' ').join('');
    if (checkcard === '') {
        document.getElementById("p8").innerHTML = "Card Number is required*";
        cardnumer.focus();
        return false;
    } else if (checknum.length < 16) {
        document.getElementById("p8").innerHTML = "Card Number Must have (16) numbers";
        cardnumer.focus();
        return false;
    } else if (cardnumer.value.match(pattn)) {
        return true;
    } else {
        document.getElementById("p8").innerHTML = "Enter Valid Card Number(only numbers)*";
        cardnumer.focus();
        return false;
    }
}


function check_card_name(inputtxt) {
    var pattn = /^[a-zA-Z ]+$/;
    let checktxt = inputtxt.value.trim();
    let checkname = checktxt.split(' ').join('');
    if (checktxt === '') {
        document.getElementById("p9").innerHTML = "Please fill this field";
        inputtxt.focus();
        return false;
    } else if (checkname.length < 3) {
        document.getElementById("p9").innerHTML = "Name Must have (3) characters long";
        inputtxt.focus();
        return false;
    } else if (inputtxt.value.match(pattn)) {
        return true;
    } else {
        document.getElementById("p9").innerHTML = "Numbers and special characters are not allowed";
        inputtxt.focus();
        return false;
    }
}

function cardnum_cvv(cvv) {
    var pattn = /^[0-9 ]+$/;
    let checkcard = cvv.value.trim();
    let checknum = checkcard.split(' ').join('');
    if (checkcard === '') {
        document.getElementById("p10").innerHTML = "CVV Code is required*";
        cvv.focus();
        return false;
    } else if (checknum.length < 3) {
        document.getElementById("p10").innerHTML = "Minimum CVV code length is (3)";
        cvv.focus();
        return false;
    } else if (cvv.value.match(pattn)) {
        return true;
    } else {
        document.getElementById("p10").innerHTML = "Enter Valid CVV Code(only numbers)*";
        cvv.focus();
        return false;
    }
}

function check_card_exp_year(select_year) {
    if (select_year.value === 'year') {
        document.getElementById("p11").innerHTML = "Please select card expiring Year";
        select_year.focus();
        return false;
    } else {
        return true;
    }
}

function check_card_exp_month(select_month) {
    if (select_month.value === 'month') {
        document.getElementById("p11").innerHTML = "Please also select card expiring month";
        select_month.focus();
        return false;
    } else {
        return true;
    }
}

function accept_term_condi(terms_cond) {
    if (terms_cond.checked) {
        return true;
    } else {
        alert('You did not accept the Terms and Conditions!');
        terms_cond.focus();
        return false;
    }
}



var debit = document.getElementById('debit');
var credit = document.getElementById('credit');
var cod = document.getElementById('cod');
if (credit || debit || cod) {
    credit.addEventListener('click', showCardfields);
    debit.addEventListener('click', showCardfields);
    cod.addEventListener('click', hideCardfields);
}

function showCardfields() {
    document.getElementById('extraInfo1').classList.remove('hide');
    document.getElementById('extraInfo2').classList.remove('hide');
}


function hideCardfields() {
    document.getElementById('extraInfo1').classList.add('hide');
    document.getElementById('extraInfo2').classList.add('hide');
}