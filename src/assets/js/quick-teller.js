// $(document).ready(function () {
//
// });
window.initQT = function (data) {
  window.QTCheckout = window.QTCheckout || {};
  var testMode = true;
  var baseUrl = "";
  window.QTCheckout.paymentItems = window.QTCheckout.paymentItems || [];
  window.QTCheckout.paymentItems.push(data);
  if (testMode === true) baseUrl = "https://pwq.sandbox.interswitchng.com/scripts/quickteller-checkout-min.js?v=";
  else baseUrl = "https://paywith.quickteller.com/scripts/quickteller-checkout-min.js?v=";
  if (!window.QTCheckout.qtScript) {
    var qtScript = document.createElement('script');
    qtScript.type = 'text/javascript';
    qtScript.async = true;
    qtScript.src = baseUrl + new Date().getDay();
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(qtScript, s);
    window.QTCheckout.qtScript = qtScript;
  } else if (window.QTCheckout.buildPaymentItemsUI) {
    window.QTCheckout.buildPaymentItemsUI();
  }

  // console.log($("#95101"));
  // $("#95101").on('click', function (event) {
  //   alert("CLicked");
  //   return false;
  // });
  // var button = document.getElementById("95101");
  // button.click();
  // $("#95101").click();
  window.addEventListener('message', function (e) {
    console.log(e);
    $('#quicktellerCboxOverlay').css("display", "none");
    $('#quicktellerColorbox').css("display", "none");
    if (e.data.success) {
      window.location.href = e.data.redirect + '?' + jQuery.param(e.data);
    } else {
      window.location.reload();
    }
  });
};
