Photo Tilt
=========

HTML5 clone of the photo tilt feature/gesture/ux found in Facebook's Paper app

Basic Usage
-----
PhotoTilt (image url, container node)
```
var photoTilt = new PhotoTilt('photo.jpg', document.body);
```

Demo
----
You can find a working example [here](http://s3.jt.io/tilt/index.html) (make sure you test this on a device with a triaxial/accelerometer like a phone/tablet)

TODO
----

* add option for [full screen mode](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode)
* implement [lockOrientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen.lockOrientation) (only works in FF)
* refactor code to use CSS transform instead of left
