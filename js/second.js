'use strict';

window.onload = () => {

  	/*if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('sw.js')
          .then(function (registration){
            console.log('Service worker registered successfully on scope: ' +registration.scope);
          }).catch(function(e){
            console.error('Error during service worker registration:', e);
          });
  	}

  	self.addEventListener('install', function(event) {
        console.log('Installed sw.js', event);
    });

    self.addEventListener('activate', function(event) {
        console.log('Activated sw.js', event);
    });
    self.addEventListener('fetch', function(event){
        console.log("Fetch - Requested event: " +event.request);
    });*/

  	/*window.addEventListener('beforeinstallprompt', (event) => {
		console.log('👍', 'beforeinstallprompt', event);
		// Stash the event so it can be triggered later.
		window.deferredPrompt = event;
		// Remove the 'hidden' class from the install button container
		divInstall.classList.toggle('hidden', false);
	});*/

  /*Notification.requestPermission(result => {
	  	if (result === 'granted') {
	  		console.log("Thanks for giving me permissions");
	  	}
	});*/
};

/* *************** Push Notification - START *************** */
var butInstall2 = document.getElementById('butInstall2');

// Push Notifications for PWA
butInstall2.addEventListener('click', () => {
  console.log("Button clicked");
  showNotification('So nice to have you here!', 'Hi again!');
});

function showNotification(title, message) {
  console.log("inside showNotification");
    if ('Notification' in window) {
      navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Second Page', {
            //body: 'Buzz! Buzz!',
            //tag: 'vibration-sample'
            body: message,
            tag: title
          });
      });
  }
}
/* *************** Push Notification - END *************** */

/* *************** Second Page - START *************** */
var firstPageBtn = document.getElementById('firstPageBtn');

firstPageBtn.addEventListener('click', () => {
  console.log("Goto second page");
  window.location.href = "index.html"
});
/* *************** Second Page - END *************** */