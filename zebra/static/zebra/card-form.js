$(function() {
  $("#id_card_number").parents("form").submit(function() {
    if ($("#id_card_number").is(":visible")) {
      var form = this;
      var card = {
        number: $("#id_card_number").val(),
        exp_month: $("#id_card_expiry_month").val(),
        exp_year: $("#id_card_expiry_year").val(),
        cvc: $("#id_card_cvv").val(),
        address_line1: $("#id_billing_address_1").val(),
        address_zip: $("#id_billing_zip").val()
      };

      Stripe.createToken(card, function(status, response) {
        if (status === 200) {
          // console.log(status, response);
          $("#credit-card-errors").hide();
          $("#id_last_4_digits").val(response.card.last4);
          $("#id_stripe_token").val(response.id);
          form.submit();
          $("button[type=submit]").attr("disabled", "disabled").html("Submitting...");          
        } else {
          $(".payment-errors").html(response.error.message);
          $(".payment-errors").css("display", "block");
          $('html, body').animate({ scrollTop: 0 }, 0);
          $("#user_submit").attr("disabled", false);
        }
      });
      
      return false;
      
    } 
    
    return true;
    
  });
});
