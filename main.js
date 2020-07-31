window.onload = () => {
  	'use strict';
    
    /* *************** User Agent details - START *************** */
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            
            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    
    var e = module.init(),
        debug = '';
    
    debug += 'os.name = ' + e.os.name + '<br/>';
    debug += 'os.version = ' + e.os.version + '<br/>';
    debug += 'browser.name = ' + e.browser.name + '<br/>';
    debug += 'browser.version = ' + e.browser.version + '<br/>';
    
    debug += '<br/>';
    debug += 'navigator.userAgent = ' + navigator.userAgent + '<br/>';
    debug += 'navigator.appVersion = ' + navigator.appVersion + '<br/>';
    debug += 'navigator.platform = ' + navigator.platform + '<br/>';
    debug += 'navigator.vendor = ' + navigator.vendor + '<br/>';
    
    // document.getElementById('log').innerHTML = debug;
    // console.log("Details: " +debug);
    console.log("OS Name: " +e.os.name);
    console.log("OS Version: " +e.os.version);
    console.log("Browser Name: " +e.browser.name);
    console.log("Browser Version: " +e.browser.version);
    console.log("userAgent: " +navigator.userAgent);
    console.log("appVersion: " +navigator.appVersion);
    console.log("Platform: " +navigator.platform);
    console.log("Vendor: " +navigator.vendor);

    /* *************** User Agent details - END *************** */


    /*var osName = "unknown";

    if (navigator.appVersion.indexOf("Win") != -1){
      osName = "Windows OS";
    }
    if (navigator.appVersion.indexOf("Mac") != -1){
      osName = "MacOS";
    }
    if (navigator.appVersion.indexOf("X11") != -1){
      osName = "UNIX OS";
    }
    if (navigator.appVersion.indexOf("Linux") != -1){
      osName = "Linux OS";
    }
    console.log("osName: " +osName);*/

    /* *************** SERVICE WORKER - START *************** */
  	if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('sw.js')
    		/*.then(function(serviceWorkerRegistration) {
			    serviceWorkerRegistration.pushManager.subscribe()
			    .then(function(pushSubscription) {
			        console.log("pushSubscription.subscriptionId: " +pushSubscription.subscriptionId);
			        console.log("pushSubscription.endpoint: " +pushSubscription.endpoint);
			        // The push subscription details needed by the application
			        // server are now available, and can be sent to it using,
			        // for example, an XMLHttpRequest.
			      }, function(error) {
			        // During development it often helps to log errors to the
			        // console. In a production environment it might make sense to
			        // also report information about errors back to the
			        // application server.
			        console.log(error);
			    });
			  })*/
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
    });
    /* *************** SERVICE WORKER - END *************** */

  	/*window.addEventListener('beforeinstallprompt', (event) => {
		console.log('👍', 'beforeinstallprompt', event);
		// Stash the event so it can be triggered later.
		window.deferredPrompt = event;
		// Remove the 'hidden' class from the install button container
		divInstall.classList.toggle('hidden', false);
	  });*/

    /* *************** NOTIFICATION REQUEST - START *************** */
    if (navigator.platform.indexOf('iPhone') == "false") {
        console.log("Not an iPhone, calling Notification");

    	Notification.requestPermission(result => {
      	  	if (result === 'granted') {    //granted, denied, or default
      	  		console.log("Thanks for the Notification permissions");
      	  	} else{
                console.log("Notification permissions not granted :("); 
            }
  	    });
    } else{
        console.log("It's an iPhone, not calling Notification");
    }
    /* *************** NOTIFICATION REQUEST - STOP *************** */
};

/*var reqNotPermBtn = document.getElementById('reqNotPermBtn');

reqNotPermBtn.addEventListener('click', () =>{
    console.log("reqNotPermBtn clicked");
    let promise = Notification.requestPermission();
});*/

/* *************** PUSH NOTIFICATION - START *************** */
var sendNotBtn = document.getElementById('sendNotBtn');

// Push Notifications for PWA
sendNotBtn.addEventListener('click', () => {
  console.log("sendNotBtn clicked");
  showNotification('So nice to have you here!', 'Hey there!');
});

function showNotification(title, message) {
  console.log("inside showNotification");
    if ('Notification' in window) {
        console.log("You browser supports Notifications");

        navigator.serviceWorker.ready.then(registration => {
              registration.showNotification('This is a sample', {
                //body: 'Buzz! Buzz!',
                //tag: 'vibration-sample'
                body: message,
                tag: title
              });
        });
  }
}
/* *************** PUSH NOTIFICATION - END *************** */

/* *************** NAVIGATE TO SECOND PAGE - START *************** */
var secondPageBtn = document.getElementById('secondPageBtn');

secondPageBtn.addEventListener('click', () => {
  console.log("Goto second page");
  window.location.href = "second-page.html"
});
/* *************** NAVIGATE TO SECOND PAGE - END *************** */