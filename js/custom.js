/** Shopify CDN: Minification failed

Line 190:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 190:23 Transforming array spread to the configured target environment ("es5") is not supported yet
Line 192:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 194:12 Transforming const to the configured target environment ("es5") is not supported yet
Line 195:12 Transforming const to the configured target environment ("es5") is not supported yet
Line 197:12 Transforming const to the configured target environment ("es5") is not supported yet

**/
/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
if (window.matchMedia("(max-width: 768px)").matches) {
    window.onscroll = function() {
        var pageOffset = document.documentElement.scrollTop || document.body.scrollTop,
            btn = document.getElementById('scrollToTop'),
            btnSupport = document.getElementsByClassName('support-floating')[0],
            priceList = document.getElementById("evolution-price-list");
        if (btn) btn.style.display = pageOffset > 1200 ? 'block' : 'none';
        if (btnSupport && priceList) btnSupport.style.bottom = pageOffset > 1200 ? '65px': '15px';
    }
}

$(".block-swatch__radio, .variant-swatch__radio, .product-form__single-selector").change(function () {
  setTimeout(function () { parcelamento(); }, 150);
});

function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  if(value !== 1) value--;

  document.getElementById('number').value = value;
}

$('.options:first-child').addClass('active')

$(".options").each(function() {
    $(this).on("click", function(){
        $('.options').removeClass('active')
        $(this).addClass('active')

        $('#evolution-price-list .price-promotional-wrap strong').html($(this).find('.valortot').text());
        $('#evolution-price-list .price-promotional-wrap span').html($(this).find('.valorcomp').text());

        $('#evolution-price-list .price-promotional-wrap .selector-desconto').remove();
        $('#evolution-price-list .price-promotional-wrap').append('<p class="selector-desconto">CUPOM ' + $(this).find('.saving').text() + ' APLICADO</p>');

        parcelamento();
    });
});

$(".product-form").each(function () {
    $(this).on('click', '.botaocmprar', function (event) {
      	var arraydeprodutos = [];
        event.stopImmediatePropagation();
        var idproduto = parseInt($('.options.active .iddavariante').attr('val'))
        var qtdproduto = parseInt($('.options.active .iddavariante').attr('qtd'))
        arraydeprodutos.push({
            id: idproduto,
            quantity: qtdproduto
        });

        $('.buy-together-list input').each(function () {
            if ($(this).prop("checked") === true) {
                arraydeprodutos.push({
                    id: $(this).attr("data-id"),
                    quantity: 1
                });
            }
        });

        data = {
            items: arraydeprodutos
        }

        $.ajax({
            type: 'POST',
            url: '/cart/add',
            data: data,
            dataType: 'json',
            success: function (data) {
                setTimeout(function () {
                    window.location.href = '/cart'
                }, 500);
            }
        });
    });
});

function serialize(form) {
    function stringKey(key, value) {
        var beginBracket = key.lastIndexOf('[');

        if (beginBracket === -1) {
            var _hash = {};
            _hash[key] = value;
            return _hash;
        }

        var newKey = key.substr(0, beginBracket);
        var newValue = {};
        newValue[key.substring(beginBracket + 1, key.length - 1)] = value;
        return stringKey(newKey, newValue);
    }

    var hash = {};

    for (var i = 0, len = form.elements.length; i < len; i++) {
        var formElement = form.elements[i];

        if (formElement.name === '' || formElement.disabled) {
            continue;
        }

        if (formElement.name && !formElement.disabled && (formElement.checked || /select|textarea/i.test(formElement.nodeName) || /hidden|text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number|range|color/i.test(formElement.type))) {
            var stringKeys = stringKey(formElement.name, formElement.value);
            hash = extend(hash, stringKeys);
        }
    }

    return hash;
}

function extend() {
    var extended = {};
    var i = 0; // Merge the object into the extended object

    var merge = function merge(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                // If property is an object, merge properties
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = Form.extend(extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    }; // Loop through each object and conduct a merge


    for (; i < arguments.length; i++) {
        merge(arguments[i]);
    }

    return extended;
}

const youtubeVideos = [...document.querySelectorAll('[data-youtube]')];
youtubeVideos.forEach(function(element) {
    const button = element.querySelector('[data-youtube-button]');
    button.addEventListener('click', function () {
            const url = event.target.dataset.youtubeButton;
            const youtubePlaceholder = event.target.parentNode;

            const htmlString = '<iframe width="100%" src="' + url + '?autoplay=1&showinfo=0&controls=1&rel=0&modestbranding=1" allow="autoplay;" frameborder="0" allowfullscreen></iframe>';

            youtubePlaceholder.style.display = 'none';
            youtubePlaceholder.insertAdjacentHTML('beforebegin', htmlString);
            youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
        }
    );
});