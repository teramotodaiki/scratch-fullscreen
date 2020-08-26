(function bindAction() {
  var length = document.images.length;
  for (var i = 0; i < length; i++) {
    var img = document.images.item(i);
    if (img && img.className.indexOf('stage-button-icon') > -1) {
      // bind
      img.addEventListener('click', function (event) {
        event.stopPropagation();
        var canvas = document.getElementsByTagName('canvas').item(0);
        if (canvas) {
          try {
            canvas.requestFullscreen();
          } catch (error) {
            console.warn(error);
            return; //exit
          }
  // Support Chrome <69
  Element.prototype.requestFullscreen =
    Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen;

        }
      });
    }
  }
  setTimeout(bindAction, 500);
})();

(function disableBorderRadius() {
  var canvas = document.getElementsByTagName('canvas').item(0);
  if (canvas) {
    try {
      var e = canvas.parentElement.parentElement;
      e.style.borderRadius = '0px';
    } catch (error) {
      console.warn(error);
      return; //exit
    }
  }
  setTimeout(disableBorderRadius, 500);
})();
