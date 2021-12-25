(function () {
    "use strict";

    /**
     * animation particles in hero sesstion
     */
    var options = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: "#bee1e6",
            },
            shape: {
                type: "star",
                stroke: {
                    width: 0,
                    color: "#ff8fa3",
                },
                polygon: {
                    nb_sides: 5,
                },
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                },
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffccd5",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse",
                },
                onclick: {
                    enable: true,
                    mode: "push",
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    };
    particlesJS("particles-js", options);

    /**
     * button switch theme
     */
    const toggleSwitch = document.querySelector(
        '.theme-switch input[type="checkbox"]'
    );
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            toggleSwitch.checked = true;
        }
    }
    toggleSwitch.addEventListener("change", (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener("scroll", listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                navbarlink.classList.add("active");
            } else {
                navbarlink.classList.remove("active");
            }
        });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos,
            behavior: "smooth",
        });
    };

    /**
     * Back to top button
     */
    let backtotop = select(".back-to-top");
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active");
            } else {
                backtotop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    // on("click", ".mobile-nav-toggle", function (e) {
    //     select("#header").classList.toggle("nav-mobile-active");
    //     this.classList.toggle("button-nav-active");
    //     // select("body").classList.toggle("mobile-nav-active");
    //     // this.classList.toggle("m-nav");
    // });

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    // on(
    //     "click",
    //     ".scrollto",
    //     function (e) {
    //         const header = select("#header");
    //         if (header.hash) {
    //             e.preventDefault();
    //             if (header.classList.contains("mobile-nav-active")) {
    //                 header.classList.remove("mobile-nav-active");
    //                 let navbarToggle = select(".mobile-nav-toggle");
    //                 navbarToggle.classList.toggle("button-nav-active");
    //             }
    //             scrollto(this.hash);
    //         }
    //     },
    //     true
    // );

    // on(
    //     "click",
    //     ".scrollto",
    //     function (e) {
    //         if (select(this.hash)) {
    //             e.preventDefault();

    //             let body = select("body");
    //             if (body.classList.contains("mobile-nav-active")) {
    //                 body.classList.remove("mobile-nav-active");
    //                 let navbarToggle = select(".mobile-nav-toggle");
    //                 navbarToggle.classList.toggle("bx-list");
    //                 navbarToggle.classList.toggle("bx-x");
    //             }
    //             scrollto(this.hash);
    //         }
    //     },
    //     true
    // );
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener("load", () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select("#preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.remove();
        });
    }

    /**
     * Hero type effect
     */
    const typed = select(".typed");
    if (typed) {
        let typed_strings = typed.getAttribute("data-typed-items");
        typed_strings = typed_strings.split(",");
        new Typed(".typed", {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
        });
    }

    /**
     * Skills animation
     */
    let skilsContent = select(".skills-content");
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: "80%",
            handler: function (direction) {
                let progress = select(".progress .progress-bar", true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute("aria-valuenow") + "%";
                });
            },
        });
    }

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item",
            });

            let portfolioFilters = select("#portfolio-flters li", true);

            on(
                "click",
                "#portfolio-flters li",
                function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(function (el) {
                        el.classList.remove("filter-active");
                    });
                    this.classList.add("filter-active");

                    portfolioIsotope.arrange({
                        filter: this.getAttribute("data-filter"),
                    });
                    portfolioIsotope.on("arrangeComplete", function () {
                        AOS.refresh();
                    });
                },
                true
            );
        }
    });

    /**
     * Initiate portfolio lightbox
     */
    // const portfolioLightbox = GLightbox({
    //   selector: '.portfolio-lightbox'
    // });

    /**
     * Initiate portfolio details lightbox
     */
    // const portfolioDetailsLightbox = GLightbox({
    //   selector: '.portfolio-details-lightbox',
    //   width: '90%',
    //   height: '90vh'
    // });

    /**
     * Portfolio details slider
     */
    // new Swiper('.portfolio-details-slider', {
    //   speed: 400,
    //   loop: true,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true
    //   }
    // });

    /**
     * Testimonials slider
     */
    // new Swiper('.testimonials-slider', {
    //   speed: 600,
    //   loop: true,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    //   },
    //   slidesPerView: 'auto',
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true
    //   }
    // });

    /**
     * Animation on scroll
     */
    // window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });

        const toggle = document.querySelector(".mobile-nav-toggle");
        const menu = document.querySelector("#header");
        const menuItems = document.querySelectorAll(".nav-link");

        toggle.addEventListener("click", handleToggleMenu);
        function handleToggleMenu() {
            menu.classList.toggle("nav-mobile-active");
            toggle.classList.toggle("button-nav-active");
        }

        menuItems.forEach((e) =>
            e.addEventListener("click", function () {
                menu.classList.remove("nav-mobile-active");
                toggle.classList.remove("button-nav-active");
            })
        );
        window.addEventListener("click", handleClickOutSideMenu);
        function handleClickOutSideMenu(e) {
            if (
                e.target.matches(".mobile-nav-toggle") ||
                e.target.matches("#header, #header *")
            )
                return;
            toggle.classList.remove("button-nav-active");
            menu.classList.remove("nav-mobile-active");
        }
    // });
})();
