var bill;
var tip;
var numberOfPeople;
var tipAmount;
var total;

function setTip(a) {
  tip = Number(a) / 100;

}
function setTipAmount() {
  if(tip && bill && numberOfPeople) {
    let ta = (bill * tip) / numberOfPeople; //tip amount per person
    let tp = bill / numberOfPeople; //total per person without tip
    tipAmount = String(parseInt(ta*100)/100);
    total = parseInt(((parseInt(tp*100)/100) + (parseInt(ta*100)/100))*100)/100; //total per person with tip
    $("#tipAmount .output").text(`$${tipAmount}`);
    $("#total .output").text(`$${total}`);
    $('#reset').css('opacity','1');
  }
}
function reset() {
  if(tip && bill && numberOfPeople && tipAmount && total) {
    $('#bill input').val('');
    $('button.tipPercent').css({
      'background': 'hsl(183, 100%, 15%)',
      'color': 'white'
    });
    $('button.tipPercent').removeClass("active");
    $('input.tipPercent').val('');
    $('#number input').val('');
    $('.output').text('$0.00');
  }
}

$(document).ready(function(){
  $('#bill input').change(function(){
    let a = $(this).val();
    let b = Number(a);
    if(isNaN(b)) {
      $(this).next(".alert").css('display','block');
    }else{
      bill = b;
      $(this).next(".alert").css('display','none');
      setTipAmount();
    }
  });
  $(".inp").mouseover(function(){
    $(this).css('border','1px solid hsl(172, 67%, 45%)');
  });
  $(".inp").mouseout(function(){
    $(this).css('border','none');
  });
  $('button.tipPercent').click(function(){
    $('button.tipPercent').css({
      'background': 'hsl(183, 100%, 15%)',
      'color': 'white'
    });
    $('button.tipPercent').removeClass("active");
    $('input.tipPercent').val('');
    $(this).css({
      'background': 'hsl(172, 67%, 45%)',
      'color': 'hsl(183, 100%, 15%)'
    });
    $(this).addClass("active");
    let a = $(this).text();
    setTip(a);
    setTipAmount();
  });
  $('button.tipPercent').on({
    mouseover: function(){
      let a = $(this).hasClass('active'); 
      if(!a) {
        $(this).css({
          'background': 'hsl(172, 51%, 69%)',
          'color': 'hsl(183, 100%, 15%)'
        });
      }
    },
    mouseout: function(){
      let a = $(this).hasClass('active'); 
      if(!a) {
        $(this).css({
          'background': 'hsl(183, 100%, 15%)',
          'color': 'white'
        });
      }
    }
  });
  $('input.tipPercent').change(function(){
    $('button.tipPercent').css({
      'background': 'hsl(183, 100%, 15%)',
      'color': 'white'
    });
    let a = $(this).val();
    setTip(a);
    setTipAmount();  
  });
  $("#number input").change(function(){
    let a = $(this).val();
    let b = Number(a);
    
    if(b === 0) {
      $('#number .alert').css('display','block');
      $("#number .inp").css('border','1px solid red');
    }else{
      $('#number .alert').css('display','none');
      $('#number .inp').css('border','none');
      numberOfPeople = b;
      setTipAmount();
    }    
  });
  $("#reset").click(function(){
    reset();
    $(this).css('opacity','0.2');
  });
});
