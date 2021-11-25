// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count, photo) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.photo = photo;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count, photo) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count, photo);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var photo = $(this).data('photo')
    shoppingCart.addItemToCart(name, price, 1, photo);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();

});


function displayCart() {
    console.log("hello from display cart")
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td><img src='./images/" + cartArray[i].photo + "' width='30' height='30'></td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "</div></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    console.log("hello")
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();

function hello() {
    console.log("hello")
}

function addedCart(name, imgUrl) {
    console.log('hello from added cart' + name + " " + imgUrl);
    var output = '';
    output =
        "<div class='modal-body'>"
        + "<div class='text-center'>"
        + "<div class='col-12'>"
        + "<div class='thumbnail'>"
        + "<img src='./images/" + imgUrl + "' class='img-rounded' alt='...'>"
        + "<div class='caption'>"
        + "<h3>Added to Cart " + name + "</h3>"
        + "</div></div></div></div></div>";

    $('.showAddedCartItem').html(output);
}


function btnCheckout(address, state, postal, card, cvv) {
    if(address.value.length === 0 || state.value.length === 0 || postal.value.length != 5 || card.value.length != 12 || cvv.value.length === 0 ){
        alert("The following are "+ ValidateAddress(address) + ValidateState(state) + ValidatePostal(postal) + ValidateCard(card) + ValidateCvv(cvv));
        return
    }
    alert("Thank you for Your Purchase");
    shoppingCart.clearCart();
    displayCart();
    window.location.href = "store.html";
    
}
function ValidatePostal(inputText) {
    if(inputText.value.length === 5){
        return "";
    } else {
        return ", invalid postal";
    }
}

function ValidateCvv(inputText) {
    if(inputText.value.length === 0){
        return ", invalid cvv";
    } else {
        return "";
    }
}

function ValidateState(inputText) {
    if(inputText.value.length === 0){
        return ", invalid state";
    } else {
        return "";
    }
}

function ValidateAddress(inputText) {
    if(inputText.value.length === 0){
        return ", invalid address";
    } else {
        return "";
    }
}

function ValidateCard(inputText){
    if(inputText.value.length === 12){
        return "";
    } else {
        return ", invalid card number";
    }
}



/*
//This section is to show the info modal
var infoDescription =(function(){
    listInfo = [];
    function infoItem(name, description, price, photo){
        this.name = name;
        this.description = description;
        this.price = price;
        this.photo = photo;
    };

    var item0 = new infoItem("Light Trapped In Matter", "This a oversized shirt that is made with 100% peruvian cotton","Price: $50", "pic1.jpg");
    var item1 = new infoItem("Black and White Combo", "This two pairs are shirt are oversized made with high quality egyptian cotton.", "Price: $90", "pic2combo.jpg");
    var item2 = new infoItem("Protect Enviroment", "Part of the proceeding from this shirt goes to eco friendly programs, shirt is made from 100% organic cotton and is certified fair trade", "Price: $30", "pic3.jfif");
    var item3 = new infoItem("Black and White Queen", "This is 100% peruvian cotton that is fair trade certified. The shirt is oversiezed", "Price: $50", "p3.jpg");
    var item4 = new infoItem("Smacked Smile", "This cotton is made from other recycled fabrics. The shirt is oversiezed.", "Price: $50", "pic4.jfif");
    var item5 = new infoItem("Brave Freedom", "This shirt is made from 70% cotton and  20% polyester", "Price: $50", "pic5.jfif");
    var item6 = new infoItem("Praying Hands", "This shirt is made of 100% egyptian cotton and is oversized.", "Price: $50", "pic6.jfif");

    // Save item
    function saveItem() {
        sessionStorage.setItem('infoDescription', JSON.stringify(listInfo));
    }


    listInfo.push(item0);
    listInfo.push(item1);
    listInfo.push(item2);
    listInfo.push(item3);
    listInfo.push(item4);
    listInfo.push(item5);
    listInfo.push(item6);
    saveItem();


    // Load items
    function loadItem() {
        cart = JSON.parse(sessionStorage.getItem('infoDescription'));
    }
    if (sessionStorage.getItem("infoDescription") != null) {
        loadItem();
    }

    var obj1 = {};

    // List cart
    obj1.listCart = function () {
        var cartCopy = [];
        for (i in listInfo) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    return obj1;
})();



function displayItemInfo() {
    var cArray = shoppingCart.listCart();
    var output = "";
      output += "<tr>"
        + "<td>" + cArray[i].name + "</td>"
        + "<td><img src='./images/"+ cArray[i].photo +"' width='30' height='30'></td>"
        + "<td>(" + cArray[i].price + ")</td>"
        + "<td><div class='input-group'>"
        + "<input type='number' class='item-count form-control' data-name='" + cArray[i].name + "' value='" + cArray[i].count + "'>"
        + "</div></td>"
        + " = "
        + "<td>" + cArray[i].total + "</td>"
        +  "</tr>";

    $('.show-item').html(output);
  }
*/


