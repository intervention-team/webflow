(function () {
  const appendSVG = (el, svg, path, strokeWidth) => {
    path.setAttribute("fill", "transparent");

    path.setAttribute("stroke", "currentColor");

    path.setAttribute("stroke-width", strokeWidth);

    path.setAttribute("stroke-linecap", "round");

    svg.appendChild(path);

    svg.classList.add("lalilala-lines_line");

    $(el).append(svg);
  };

  const buildUnderline = (el, settings) => {
    el.classList.add("lalilala-lines", "lalilala-lines--underline");

    $(el).contents().wrapAll('<span class="lalilala-lines_content"></span>');

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const width = $(el).width();

    const height = settings.strokeWidth;

    svg.setAttribute(
      "viewBox",
      "0 0 " + (width + settings.strokeWidth / 2) + " " + height
    );

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute(
      "d",

      "M " +
        settings.strokeWidth / 2 +
        ", " +
        settings.strokeWidth / 2 +
        " L " +
        width +
        ", " +
        settings.strokeWidth / 2
    );

    appendSVG(el, svg, path, settings.strokeWidth);
  };

  const buildSurround = (el, settings) => {
    el.classList.add("lalilala-lines", "lalilala-lines--surround");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const width = settings.widthMulitplier * $(el).width();

    const height = settings.heightMulitplier * $(el).height();

    svg.setAttribute("viewBox", "0 0 " + width + " " + height);

    svg.setAttribute("width", width);

    svg.setAttribute("height", height);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    const radius = width / 2;

    path.setAttribute(
      "d",

      "M " +
        (radius - settings.strokeWidth / 2) +
        ", " +
        settings.strokeWidth / 2 +
        " a " +
        (radius - settings.strokeWidth / 2) +
        "," +
        (height / 2 - settings.strokeWidth / 2) +
        " 0 1,0 1,0 z"
    );

    const widthPercent = settings.widthMulitplier * 100 + "%";

    const heightPercent = settings.widthMulitplier * 100 + "%";

    svg.style = "width:" + widthPercent + ";height:" + heightPercent + ";";

    appendSVG(el, svg, path, settings.strokeWidth);
  };

  const animatePath = (el) => {
    const $paths = el.querySelectorAll("path");

    gsap.set($paths, {
      drawSVG: "0%",
    });

    ScrollTrigger.create({
      trigger: el,

      start: "bottom bottom",

      once: true,

      onEnter: () => {
        gsap.to($paths, {
          drawSVG: "100%",

          duration: 1,

          delay: 0.3,

          stagger: 0.1,
        });
      },
    });
  };

  $.fn.lalilalaSurround = function (options) {
    const settings = $.extend(
      {
        strokeWidth: 2,

        heightMulitplier: 1.2,

        widthMulitplier: 1.1,
      },

      options
    );

    return this.each(function (i, el) {
      buildSurround(el, settings);

      animatePath(el);
    });
  };

  $.fn.lalilalaUnderline = function (options) {
    const settings = $.extend(
      {
        strokeWidth: 2,
      },

      options
    );

    return this.each(function (i, el) {
      buildUnderline(el, settings);

      animatePath(el);
    });
  };
})();
