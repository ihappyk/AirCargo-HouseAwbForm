function roundNumber(number, decimals) {
    var newString; // The new rounded number
    decimals = Number(decimals);
    if (decimals < 1) {
        newString = (Math.round(number)).toString();
    } else {
        var numString = number.toString();
        if (numString.lastIndexOf(".") == -1) { // If there is no decimal point
            numString += "."; // give it one at the end
        }
        var cutoff = numString.lastIndexOf(".") + decimals; // The point at which to truncate the number
        var d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
        var d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
        if (d2 >= 5) { // Do we need to round up at all? If not, the string will just be truncated
            if (d1 == 9 && cutoff > 0) { // If the last digit is 9, find a new cutoff point
                while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
                    if (d1 != ".") {
                        cutoff -= 1;
                        d1 = Number(numString.substring(cutoff, cutoff + 1));
                    } else {
                        cutoff -= 1;
                    }
                }
            }
            d1 += 1;
        }
        if (d1 == 10) {
            numString = numString.substring(0, numString.lastIndexOf("."));
            var roundedNum = Number(numString) + 1;
            newString = roundedNum.toString() + '.';
        } else {
            newString = numString.substring(0, cutoff) + d1.toString();
        }
    }
    if (newString.lastIndexOf(".") == -1) { // Do this again, to the new string
        newString += ".";
    }
    var decs = (newString.substring(newString.lastIndexOf(".") + 1)).length;
    for (var i = 0; i < decimals - decs; i++) newString += "0";
    //var newNumber = Number(newString);// make it a number if you like
    return newString; // Output the result to the form field (change for your purposes)
}

function sumOfPieces(){
	var cnt = 0;
	$('.pieces').each(function(i){
		textPresent = $(this).val();
		if ($.trim(textPresent).length > 0){
			if(!isNaN(textPresent))
				cnt += Number(textPresent);
			else{
				$('.sumPieces').val("N/A");
				return false;
			}
		}
	});
	$('.sumPieces').val(cnt);
}

function sumOfGrossWeight(){
	var cnt = 0;
	$('.gweight').each(function(i){
		textPresent = $(this).val();
		if ($.trim(textPresent).length > 0){
			if(!isNaN(textPresent)){
				textPresent = roundNumber(textPresent, 2);
				cnt += Number(textPresent);
			}
			else{
				$('.sumGrossWeight').val("N/A");
				return false;
			}
		}
	});
	cnt = roundNumber(cnt, 2);
	$('.sumGrossWeight').val(cnt);
}

function sumOfTotals(){
	var sum = 0;
	var total = 0;
    $('.totals').each(function(i) {
        total = $(this).val();
        if (!isNaN(total)) {
			total = roundNumber(total, 2);
			sum += Number(total);
		};
    });
    sum = roundNumber(sum, 2);
	$('.sumTotals').val(sum);
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'PP' ){
		$(".sumTotalsPrepaid").val(sum);
		$(".sumTotalsCollect").val("");
	}
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'CC' ){
		$(".sumTotalsPrepaid").val("");
		$(".sumTotalsCollect").val(sum);
	}
}

function sumTotalsCollectOrPrepaid(){
	var sumTotal = 0;
	var summie=0;
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'PP' ){
		$('.prepaid').each(function(i) {
			summie = $(this).val();
			if (!isNaN(summie)) {
				summie = roundNumber(summie, 2);
				sumTotal += Number(summie);
			}
		});
		sumTotal = roundNumber(sumTotal, 2);
		$(".sumTotalPrepaid").val(sumTotal);
		$(".sumTotalCollect").val("");
	}
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'CC' ){
		
		$('.collect').each(function(i) {
			summie = $(this).val();
			if (!isNaN(summie)) {
				summie = roundNumber(summie, 2);
				sumTotal += Number(summie);
			}
		});
		sumTotal = roundNumber(sumTotal, 2);
		$(".sumTotalPrepaid").val("");
		$(".sumTotalCollect").val(sumTotal);
	}
}

function updateDropDown(chcgValue){
	
	$('select[name^="txtWTVAL"] option:selected').attr("selected","");
	$('select[name^="txtOther"] option:selected').attr("selected","");
	if (chcgValue === "PP"){
		$('#txtWTVAL option[value="P"]').attr("selected", "selected");
		$('#txtOther option[value="P"]').attr("selected", "selected");
		$(".prepaid").removeAttr("disabled");
		$(".collect").attr("disabled", "disabled");
		$(".collect").val("");
		$(".prepaid").val("0.0");
		$(".collect").css('background-color', '#C8C8C8');
		$(".prepaid").css('background-color', '');
		
		$(".sumTotalPrepaid").removeAttr("disabled");
		$(".sumTotalCollect").attr("disabled", "disabled");
		$(".sumTotalCollect").val("");
		$(".sumTotalPrepaid").val("0.0");
		$(".sumTotalCollect").css('background-color', '#C8C8C8');
		$(".sumTotalPrepaid").css('background-color', '');
	}
	if (chcgValue === "CC"){
	   $('#txtWTVAL option[value="C"]').attr("selected", "selected");
		$('#txtOther option[value="C"]').attr("selected", "selected");
		$(".collect").removeAttr("disabled");
		$(".prepaid").attr("disabled", "disabled");
		$(".prepaid").val("");
		$(".collect").val("0.0");
		$(".prepaid").css('background-color', '#C8C8C8');
		$(".collect").css('background-color', '');
		
		$(".sumTotalCollect").removeAttr("disabled");
		$(".sumTotalPrepaid").attr("disabled", "disabled");
		$(".sumTotalPrepaid").val("");
		$(".sumTotalCollect").val("0.0");
		$(".sumTotalPrepaid").css('background-color', '#C8C8C8');
		$(".sumTotalCollect").css('background-color', '');
	}
}

function TotalDueAgentAndTotalDueCarrier(){
	var sumAgent = 0;
	var sumCarrier = 0;
    $('.Agent').each(function(i) {
        var AVal = $(this).val();
        if (!isNaN(AVal)) {
			AVal = roundNumber(AVal, 2);
			sumAgent += Number(AVal);
			
		}
    });
	
	$('.Carrier').each(function(i) {
        var CVal = $(this).val();
        if (!isNaN(CVal)) {
			AVal = roundNumber(CVal, 2);
			sumCarrier += Number(CVal);
		}
    });
	sumAgent = roundNumber(sumAgent,2);
	sumCarrier = roundNumber(sumCarrier,2);
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'PP' ){
		$(".sumPrepaidCarrier").val(sumCarrier);
		$(".sumCollectCarrier").val("");
	}
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'CC' ){
		$(".sumPrepaidCarrier").val("");
		$(".sumCollectCarrier").val(sumCarrier);
	}
	
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'PP' ){
		$(".sumPrepaidAgent").val(sumAgent);
		$(".sumCollectAgent").val("");
	}
	if($('select[name^="txtChargeCode"]').val().toUpperCase() === 'CC' ){
		$(".sumPrepaidAgent").val("");
		$(".sumCollectAgent").val(sumAgent);
	}
	
}

$(function () {
    var ddVal = '';
    $('select[name^="txtChargeCode"]').focus(function () {
        ddVal = $(this).val();
    }).blur(function () {
        if (ddVal === $(this).val()) {
            $(this).change();
        }
    }).change (function () {
        updateDropDown($(this).val());
		TotalDueAgentAndTotalDueCarrier();
		sumOfTotals();
		sumTotalsCollectOrPrepaid();
    });  
	
	var ddVal1 = '';
    
	$('select[name^="txtGoodsInfo"]').focus(function () {
        ddVal1 = $(this).val();
    }).blur(function () {
        if (ddVal1 == $(this).val()) {
            $(this).change();
        }
    }).change (function () {
        //alert($(this).val());
		//hideColumnsGoodsInfo(this,$(this).val());
		if($(this).val() === 'G'){
			$(this).closest('tr').children('td:eq(1)').show();
			$(this).closest('tr').children('td:eq(2)').hide();
			$(this).closest('tr').children('td:eq(3)').hide();
		}
		else if($(this).val() === 'D'){
			$(this).closest('tr').children('td:eq(2)').show();
			$(this).closest('tr').children('td:eq(1)').hide();
			$(this).closest('tr').children('td:eq(3)').hide();
		}
		else{
			if($(this).val() === 'V'){
			$(this).closest('tr').children('td:eq(3)').show();
			$(this).closest('tr').children('td:eq(1)').hide();
			$(this).closest('tr').children('td:eq(2)').hide();
			}
		}
    });
	
	var ddVal3 ='';
	$('select[name^="txtDue"]').focus(function () {
        ddVal3 = $(this).val();
    }).blur(function () {
        if (ddVal3 == $(this).val()) {
            $(this).change();
        }
    }).change(function () {
        //alert($(this).val());
		if($(this).val() === "A"){
			$('.'+$(this).attr('id')).addClass('Agent');
			$('.'+$(this).attr('id')).removeClass('Carrier');
		}
		if($(this).val() === "C"){
			$('.'+$(this).attr('id')).addClass('Carrier');
			$('.'+$(this).attr('id')).removeClass('Agent');
		}
		
		//hideColumnsGoodsInfo(this,$(this).val());
		//console.log($(this).attr('id'));
		//console.log($('.'+$(this).attr('id')).val());
		TotalDueAgentAndTotalDueCarrier();
		
    });
		
});

$(document).ready(function(){
	/*	$(".black_overlay").css("display","none");
		$(".white_content").css("display","none");

	$("div .requestedFilghtTablePopup").hide();
	$("div .routingTablePopup").hide(); */
	
	//Default Action to be Done after page Loading.
	updateDropDown("PP");
			
	$(".pieces").on("blur keypress keyup click",function(){
		sumOfPieces();
	});
	
	$(".totals").on("blur keypress keyup click",function(){
		sumOfTotals();
		sumTotalsCollectOrPrepaid();
	});
	
	$(".gweight").on("blur keypress keyup click",function(){
		sumOfGrossWeight();
	});
	
	$(".due").on("blur keypress keyup click",function(){
		updateTotalDueAmount();
		sumTotalsCollectOrPrepaid();
	});
	
	$(".prefix , .awbNumber").on("blur keypress keyup click",function(){
		$('.prefixWithAwbNumber').html($('.prefix').val()+'-'+$('.awbNumber').val());
	});
	
	$('input[name^="txtAmount"]').on("blur keypress keyup click",function(){
		TotalDueAgentAndTotalDueCarrier();
		sumTotalsCollectOrPrepaid();
	});
	
	//Toggle Routing POPUP
	$(".requestedFlight").click(function(){
		 $("div.white_content , div.requestedFilghtTablePopup ,div.black_overlay").show();
		 $("div.routingTablePopup").hide();
	});
	$(".routingButton").click(function(){
		 $("div.white_content , div.routingTablePopup ,div.black_overlay").show();
		 $("div.requestedFilghtTablePopup").hide();
	});
	$(".close").click(function(){
		 $("div.white_content , div.routingTablePopup ,div.requestedFilghtTablePopup ,div.black_overlay").hide();
	});
	/* $(".routingButton").click(function(){
		//$("div.routingTablePopup").hide();
		 $("div.white_content , div.routingTablePopup ,div.black_overlay").show();
		alert("Hello");
        $("div .routingTablePopup").toggle(1000,function(){
			$(".black_overlay").toggle();
			$(".white_content").toggle();
		});
    });*/
});