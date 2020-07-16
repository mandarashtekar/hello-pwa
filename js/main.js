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
};
