var contactsJson

//Load logs from FireBase
var loadLogs = function() {
	firebase.database().ref('/sms').once('value').then(function(snapshot) {
	  rawLogsData = snapshot.val()
	  var logs = []
	  	  Object.keys(rawLogsData).forEach(function(key) {
	      logs.push(rawLogsData[key]);
	  });
	  showLogs(logs)
	});

}
// Load contacts from data/contacts.json
var loadContacts = function(cb,param) {
	$.getJSON( "data/contacts.json", function( data ) {
		contactsJson = data
		if(cb!=null)
			cb(param)
	});
}
//FireBase sent the data in ascending order of timestamp. So make descending order.
var showLogs = function(logs) {
	logsHTML = ''
	for(i=logs.length -1;i>=0;i--) {
		logsHTML += makeLogDiv(logs[i].contactID,logs[i].otp,logs[i].timestamp)
	}
	$(".logs").html(logsHTML)	
}

//HTML Content for contacts
var showContacts = function() {	
	console.log("populating contacts");
	contactsHTML = ''
	$.each( contactsJson, function( key, val) {
    	contactsHTML += makeContactDiv(key)
	});

	$(".contacts").html(contactsHTML)	
}

//Individual divs for each contact
var makeContactDiv = function(key) {
	if(contactsJson[key] == null)
		return;

	return '<div class="mini 12u 12u(narrower)">\
				<section class="box special">\
					<h3><b>Name :</b> '+ contactsJson[key].lastName + ',  ' + contactsJson[key].firstName + ' </h3><br><h3><b>Number:</b>  ' + contactsJson[key].number + '</h3>\
					<ul class="actions">\
						<li><a href="info.html?key=' + key + '" class="button alt">View Details</a></li>\
					</ul>\
				</section>\
			</div>';

}
//Individual divs for each log
var makeLogDiv = function(key, otp, timestamp) {
	if(contactsJson[key] == null)
		return;
	return '<div class="mini 12u 12u(narrower)">\
				<section class="box special">\
					<h3><b>To :</b><a href="info.html?key=' + key + '"> '+ contactsJson[key].lastName + ',  ' + contactsJson[key].firstName + ' </a></h3><br>\
					<h3><b>OTP: </b>' + otp + '</h3><br><h3><b>Time </b>: ' + timestamp + '</h3>\
				</section>\
			</div>';
}
//Set data in the contact info box
var setInfo = function(key) {
	if(contactsJson[key] == null)
		return
	$('#cname').html(contactsJson[key].firstName + " " + contactsJson[key].lastName)
	$('#cnumber').html("Number: " + contactsJson[key].number)
	$('#cimg').attr('src', 'images/contacts/'+contactsJson[key].img)
	$('#sendit').prop('disabled',false)
	otp = Math.floor((Math.random() * 1000000) + 1)
	var otpText = 'Hi. Your OTP is: "' + otp + '".'
	$('#messagebody').val(otpText)
	$('#mkey').val(key)
	$('#motp').val(otp)
	$('#finalSend').click(this, function(){sendSMS(key, otp);})	
}



//extract get param from URL. Hacky way to do it since github-pages does not support server side code
var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var goback = function() {
    window.history.back();
}
var showform = function() {
    $('#smsform').addClass("animate")
}
//Store the sent sms data in FireBase
var sendSMS = function(key,otp) {
		firebase.database().ref('sms').push({
		contactID: key,
		otp: otp,
		message: $('#messagebody').val(),
		timestamp: new Date().toLocaleString()
    });
	window.alert("Your Message has been sent succesfully")
	$('#finalSend').prop('disabled',true)
}


$( document ).ready(function() {

});