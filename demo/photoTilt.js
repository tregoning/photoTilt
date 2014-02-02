var PhotoTilt = function(url, container) {

	'use strict';

	var viewport,
		imgData,
		img,
		delta,
		centerOffset,
		tiltBarWidth,
		tiltCenterOffset,
		tiltBarIndicatorWidth,
		tiltBarIndicator,
		config;

	config = {
		maxTilt: 30
	};

	var init = function() {

		generateViewPort();

		preloadImg(url, function() {

			generateImgData();
			render();
			addEventListeners();

		});

	};

	var updatePosition = function(tilt) {

		var pxToMove;

		if (tilt > 0) {
			tilt = Math.min(tilt, config.maxTilt);
		} else {
			tilt = Math.max(tilt, config.maxTilt * -1);
		}

		pxToMove = (tilt * centerOffset) / config.maxTilt;

		updateImgPosition(imgData, (centerOffset + pxToMove) * -1);

		updateTiltBar(tilt);

	};

	var updateTiltBar = function(tilt) {

		var pxToMove = (tilt * ((tiltBarWidth - tiltBarIndicatorWidth) / 2)) / config.maxTilt;
		tiltBarIndicator.style.left = (tiltCenterOffset + pxToMove) + 'px';

	};

	var updateImgPosition = function(imgData, leftPosition) {

		imgData.x = leftPosition;
		img.style.left = leftPosition + 'px';

	};

	var addEventListeners = function() {

		if (window.DeviceOrientationEvent) {

			window.addEventListener('deviceorientation', function(eventData) {

				updatePosition( Math.round(eventData.gamma) );

			}, false);

		}
	};

	var render = function() {

		var mask,
			tiltBar,
			resizedImgWidth,
			tiltBarPadding = 20;

		mask = document.createElement('div');
		mask.classList.add('mask');

		img.height = viewport.height;
		resizedImgWidth = (imgData.aspectRatio * img.height);

		delta = resizedImgWidth - viewport.width;
		centerOffset = delta / 2;

		tiltBar = document.createElement('div');
		tiltBar.classList.add('tilt-bar');
		tiltBarWidth = viewport.width - tiltBarPadding;

		tiltBarIndicator = document.createElement('div');
		tiltBarIndicator.classList.add('tilt-indicator');

		tiltBarIndicatorWidth = (viewport.width * tiltBarWidth) / resizedImgWidth;
		tiltBarIndicator.style.width = tiltBarIndicatorWidth + 'px';

		tiltCenterOffset = ((tiltBarWidth / 2) - (tiltBarIndicatorWidth / 2));
		updatePosition(0);

		mask.appendChild(img);
		tiltBar.appendChild(tiltBarIndicator);
		mask.appendChild(tiltBar);
		container.appendChild(mask);

	};

	var generateViewPort = function() {

		var containerStyle = window.getComputedStyle(container, null);

		viewport = {
			width: parseInt(containerStyle.width, 10),
			height: parseInt(containerStyle.height, 10)
		};

	};

	var generateImgData = function() {

		imgData = {
			width: img.width,
			height: img.height,
			aspectRatio: img.width / img.height,
			src: img.src,
			x: 0
		};

	};

	var preloadImg = function(url, done) {

		img = new Image();
		img.addEventListener('load', done, false);
		img.src = url;

	};

	init();

};