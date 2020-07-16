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

	// requestPermission promise returns one of three values: granted, denied, or default
	Notification.requestPermission(result =>  {
	  	console.log("Notification.requestPermission: " +result)
	  if (result === 'granted') {
	    alert('thanks for giving me permissions');

	    if ('Notification' in window) {
		    navigator.serviceWorker.ready.then(registration => {
		      	registration.showNotification('Vibration Sample', {
		        	body: 'Buzz! Buzz!',
		        	tag: 'vibration-sample'
		      	});
		    });
		}
	  }
	});
};
