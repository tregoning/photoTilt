var PhotoTilt = function(options) {

	'use strict';

	var imgUrl = options.url,
		lowResUrl = options.lowResUrl,
		container = options.container || document.body,
		latestTilt = 0,
		timeoutID = 0,
		disableTilt,
		viewport,
		imgData,
		img,
		imgLoader,
		delta,
		centerOffset,
		tiltBarWidth,
		tiltCenterOffset,
		tiltBarIndicatorWidth,
		tiltBarIndicator,
		config;

	config = {
		maxTilt: options.maxTilt || 20,
		twoPhase: options.lowResUrl || false,
		reverseTilt: options.reverseTilt || false
	};

	window.requestAnimationFrame =  window.requestAnimationFrame ||
									window.mozRequestAnimationFrame ||
									window.webkitRequestAnimationFrame ||
									window.msRequestAnimationFrame;

	var init = function() {

		var url = config.twoPhase ? lowResUrl : imgUrl;

		generateViewPort();

		preloadImg(url, function() {

			img = imgLoader.cloneNode(false);
			generateImgData();
			imgLoader = null;

			if (config.twoPhase) {

				preloadImg(imgUrl, function() {
					img.src = imgLoader.src;
					imgLoader = null;
				});

			}

			render();
			addEventListeners();

		});

	};

	var updatePosition = function() {

		var tilt = latestTilt,
			pxToMove;

		if (tilt > 0) {
			tilt = Math.min(tilt, config.maxTilt);
		} else {
			tilt = Math.max(tilt, config.maxTilt * -1);
		}

		if (!config.reverseTilt) {
			tilt = tilt * -1;
		}

		pxToMove = (tilt * centerOffset) / config.maxTilt;

		updateImgPosition(imgData,  (centerOffset + pxToMove) * -1);

		updateTiltBar(tilt);

		window.requestAnimationFrame(updatePosition);

	};

	var updateTiltBar = function(tilt) {

		var pxToMove = (tilt * ((tiltBarWidth - tiltBarIndicatorWidth) / 2)) / config.maxTilt;
		setTranslateX(tiltBarIndicator, (tiltCenterOffset + pxToMove) );

	};

	var updateImgPosition = function(imgData, pxToMove) {
		setTranslateX(img, pxToMove);
	};

	var addEventListeners = function() {

		if (window.DeviceOrientationEvent) {

			var averageGamma = [];

			window.addEventListener('deviceorientation', function(eventData) {

				if (!disableTilt) {

					if (averageGamma.length > 8) {
						averageGamma.shift();
					}

					averageGamma.push(eventData.gamma);

					latestTilt = averageGamma.reduce(function(a, b) { return a+b; }) / averageGamma.length;

				}

			}, false);

			window.requestAnimationFrame(updatePosition);

		}

		window.addEventListener('resize', function() {

			container.classList.add('is-resizing');
			window.clearTimeout(timeoutID);

			timeoutID = window.setTimeout(function() {

				generateViewPort();
				container.innerHTML = "";
				render();
				container.classList.remove('is-resizing');

			}, 100);

		}, false);

	};

	var setTranslateX = function(node, amount) {
		node.style.webkitTransform =
		node.style.MozTransform =
		node.style.msTransform =
		node.style.transform = "translateX(" + Math.round(amount) + "px)";
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

		updatePosition();

		if (tiltCenterOffset > 0) {
			disableTilt = false;
			tiltBar.appendChild(tiltBarIndicator);
			mask.appendChild(tiltBar);
			container.classList.remove('disable-transitions');
		} else {
			disableTilt = true;
			latestTilt = 0;
			container.classList.add('disable-transitions');
		}

		mask.appendChild(img);
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
			width: imgLoader.width,
			height: imgLoader.height,
			aspectRatio: imgLoader.width / imgLoader.height,
			src: imgLoader.src
		};

	};

	var preloadImg = function(url, done) {

		imgLoader = new Image();
		imgLoader.addEventListener('load', done, false);
		imgLoader.src = url;

	};

	init();

	return {
		getContainer: function(){
			return container;
		}
	}

};