window.onload = () => {
  	'use strict';

  	if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('./sw.js');
  	}

  	window.addEventListener('beforeinstallprompt', (event) => {
		console.log('👍', 'beforeinstallprompt', event);
		// Stash the event so it can be triggered later.
		window.deferredPrompt = event;
		// Remove the 'hidden' class from the install button container
		divInstall.classList.toggle('hidden', false);
	});

  	Notification.requestPermission(result => {
	  	if (result === 'granted') {
	  		console.log("thanks for giving me permissions");
	    	showNotification('So nice to have you here!', 'Hey there!');
	  	}
	});
};

function showNotification(title, message) {
	console.log("inside showNotification");
    if ('Notification' in window) {
	    navigator.serviceWorker.ready.then(registration => {
	      	registration.showNotification('Vibration Sample', {
	        	body: 'Buzz! Buzz!',
	        	tag: 'vibration-sample'
	      	});
	    });
	}
}