Photo Tilt
=========

HTML5 clone of the photo tilt feature/gesture/ux found in Facebook's Paper app

Basic Usage
-----
```
var photoTilt = new PhotoTilt('photo.jpg', document.body);
```

TODO
----

* add option for [full screen mode](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode)
* implement [lockOrientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen.lockOrientation) (only works in FF)
* refactor code to use CSS transform instead of left
