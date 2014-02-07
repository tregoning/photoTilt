Photo Tilt
=========

HTML5 clone of the photo tilt feature/gesture/ux found in Facebook's Paper app.

Basic Usage
-----
PhotoTilt (image url, container node)
```
var photoTilt = new PhotoTilt({
	url: 'photo.jpg',
	lowResUrl: 'lowRes.jpg', //optional it will load lowRes 1st if available
	maxTilt: 18, //optional, defaults to 20
	container: document.body  //optional, defaults to body
	reverseTilt: false //optional, defaults to false
});
```
Note: The speed of the tilt can be tweaked by updating the transform transtion speed in the CSS file.

Demo
----
You can find a working example [here](http://s3.jt.io/tilt/index.html) (make sure you test this on a device with a triaxial/accelerometer like a phone/tablet).

More
----
Blog post with extra information [here](http://jt.io/2014/photo-tilt/).

TODO
----

* add option for [full screen mode](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode)
* implement [lockOrientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen.lockOrientation) (only works in FF)
