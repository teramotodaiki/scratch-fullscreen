(function bindAction() {
  // Support Chrome <69
  Element.prototype.requestFullscreen =
    Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen;

  var button = findElementByClassNameStartsWith(
    document.body,
    'stage-header_stage-button'
  );
  var canvasStyle = document.createElement('style');
  var canvas = document.getElementsByTagName('canvas').item(0);

  if (!button || !canvas || !canvas.parentElement) {
    return setTimeout(bindAction, 500); // retry
  }

  // Contain canvas into fullscreen rect
  canvas.parentElement.style.display = 'flex';
  canvas.parentElement.style.justifyContent = 'center';
  canvas.parentElement.style.alignItems = 'center';
  document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement === canvas.parentElement) {
      var rect = canvas.parentElement.getBoundingClientRect();
      var height = Math.min(rect.height, (rect.width / 4) * 3);
      var width = (height / 3) * 4;
      canvasStyle.textContent = `canvas { width: ${width}px !important; height: ${height}px !important }`;
      document.body.appendChild(canvasStyle);
    } else {
      document.body.removeChild(canvasStyle);
    }
  });

  // bind
  button.addEventListener(
    'click',
    function (event) {
      event.stopPropagation();
      canvas.addEventListener('click', function handleClick() {
        canvas.removeEventListener('click', handleClick); // once
        // Click canvas element instead of green flag because it will not be fullscreen.
        var flag = findElementByClassNameStartsWith(
          document.body,
          'green-flag_green-flag'
        );
        if (flag) {
          flag.click();
        }
      });
      try {
        canvas.parentElement.requestFullscreen();
      } catch (error) {
        console.warn(error);
      }
    },
    { capture: true }
  );

  /**
   * Find element like div.stage_green-flag-overlay-wrapper_2hUi_
   * @param parentElement {Element}
   * @param classNamePrefix {String}
   * @returns {HTMLElement}
   */
  function findElementByClassNameStartsWith(parentElement, classNamePrefix) {
    for (var i = 0; i < parentElement.children.length; i++) {
      var element = parentElement.children[i];
      for (var j = 0; j < element.classList.length; j++) {
        var className = element.classList[j];
        if (className.indexOf(classNamePrefix + '_') === 0) {
          return element;
        }
      }
      var result = findElementByClassNameStartsWith(element, classNamePrefix);
      if (result !== undefined) {
        return result;
      }
    }
  }
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
