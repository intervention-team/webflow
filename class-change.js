$.fn.onClassChange = function (cb) {
  return $(this).each((_, el) => {
    new MutationObserver((mutations) => {
      mutations.forEach(
        (mutation) => cb && cb(mutation.target, mutation.target.className)
      );
    }).observe(el, {
      attributes: true,
      attributeFilter: ["class"], // only listen for class attribute changes
    });
  });
};
