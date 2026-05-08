gsap.registerPlugin(ScrollTrigger);

function nav() {
  var navTrigger = document.getElementsByClassName("nav-trigger")[0];
  var body = document.getElementsByTagName("body")[0];

  navTrigger.addEventListener("click", toggleNavigation);

  function toggleNavigation(event) {
    event.preventDefault();
    body.classList.toggle("nav-open");
  }
}

function locoInitializefooter() {
  //== Smooth scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    mobile: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  //== Parallax Footer
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.defaults({ scroller: "#main" });

  gsap.set(".footer-container", { yPercent: -50 });

  const uncover = gsap.timeline({ paused: true });

  uncover.to(".footer-container", { yPercent: 0, ease: "none" });

  ScrollTrigger.create({
    trigger: ".animF",
    start: "bottom bottom",
    end: "+=75%",
    animation: uncover,
    scrub: true,
  });
}

// Flip-Text Animation
(function ($) {
  $.fn.flip = function (options) {
    var options = $.extend(
      {
        targetClass: ".m-flip_item",
      },
      options
    );

    return this.each(function () {
      console.log(this);
      var $this = $(this),
        $target = $this.find(options.targetClass);

      $this
        .on({
          "init.flip": function () {
            var targetFirst_height = $target.eq(0).height();

            $this
              .data("height", targetFirst_height)
              .css({ height: targetFirst_height });
          },
          "mouseenter.flip": function () {
            $target.css({ top: -$this.data("height") + "px" });
          },
          "mouseleave.flip": function () {
            $target.css({ top: 0 + "px" });
          },
        })
        .trigger("init.flip");
    });
  };
})(jQuery);
nav();
$(function () {
  $(".js-flip").flip();
});
locoInitializefooter();

