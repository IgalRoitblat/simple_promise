timeOut(1000)
.then(initiatePopup)
.then(() => displayForm('/form.html'))
.then(appendData)
.then(bindFormSubmit);


function bindFormSubmit() {
	$("form").submit(e => {
		e.preventDefault();
		postEmail('/mails', $("input[name=email]").val());
	})
}

function appendData(data) {
	return new Promise(resolve => {
		$(".popup").append(data);
		resolve();
	})
}

function timeOut(time) {
	return new Promise(resolve => {
		setTimeout(function() {
				resolve();
			}, time)
	})
}

function initiatePopup() {
	return new Promise(resolve => {
		$("body").append(
			$("<div>").addClass("popup_bg flex").append(
				$("<div>").addClass("popup flex")
			)
		)
		resolve();
	})
}

function displayForm(url) {
	return new Promise(resolve => {
		$.get(url, function(data) {
			resolve(data);
		})
	})
}

function postEmail(url, email) {
	return new Promise(resolve => {

		$.post(url, {
			id: guidGenerator(),
			email: email
		} ,function() {
			$("body").empty();
			$("body").append($("<span>", {text: "Your email was added!"}));
			resolve();
		})
	})
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}