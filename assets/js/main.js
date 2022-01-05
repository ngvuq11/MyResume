(function () {
    ("use strict");

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
    window.addEventListener("load", () => {
        const toggleTheme = document.getElementById("theme-toggle");
        const moonIcon = document.querySelector(".dark-switch");
        const sunIcon = document.querySelector(".light-switch");
        sunIcon.style.display = "none";
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme) {
            document.documentElement.setAttribute("data-theme", currentTheme);
            if (currentTheme === "dark") {
                moonIcon.style.display = "none";
                sunIcon.style.display = "";
            } else if (currentTheme === "light") {
                moonIcon.style.display = "";
                sunIcon.style.display = "none";
            }
        }
        toggleTheme.addEventListener("click", () => {
            const dataTheme =
                document.documentElement.getAttribute("data-theme");
            if (dataTheme === "light") {
                moonIcon.style.display = "none";
                sunIcon.style.display = "";
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            } else if (dataTheme === "dark") {
                moonIcon.style.display = "";
                sunIcon.style.display = "none";
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
            }
        });
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
    // ------------------------------------------------
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
    const backtotop = select(".back-to-top");
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
        backtotop.addEventListener("click", (e) => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }
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
    // --------------------------------------------------------

    /**
     * Preloader
     */
    const preloader = select("#preloader");
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
     * Animation on scroll
     */
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    });

    window.addEventListener("load", () => {
        /**
         * event mobile menu
         */
        const btnNavigation = document.querySelector(".mobile-nav-toggle");
        const header = document.querySelector("#header");
        const menuItems = document.querySelectorAll(".nav-link");
        const body = document.getElementsByTagName("body")[0];
        btnNavigation.addEventListener("click", handleToggleMenu);
        function handleToggleMenu() {
            header.classList.toggle("nav-mobile-active");
            btnNavigation.classList.toggle("button-nav-active");
            body.classList.toggle("active");
        }
        menuItems.forEach((e) =>
            e.addEventListener("click", handleClickMenuLink)
        );
        function handleClickMenuLink() {
            header.classList.toggle("nav-mobile-active");
            btnNavigation.classList.toggle("button-nav-active");
            body.classList.remove("active");
        }

        /**
         * modal products
         */
        const showButtons = document.querySelectorAll(".product-view");
        const modals = document.querySelector(".products-modal");
        const closeModal = document.querySelector(".close-modal");

        showButtons.forEach((item) =>
            item.addEventListener("click", () => {
                modals.style.display = "block";
                body.classList.add("active");
            })
        );
        closeModal.addEventListener("click", () => {
            body.classList.remove("active");
            modals.style.display = "none";
        });
        /**
         * close outside
         */
        document.addEventListener("click", function (e) {
            if (e.target.classList == "active") {
                btnNavigation.classList.remove("button-nav-active");
                header.classList.remove("nav-mobile-active");
                body.classList.remove("active");
                modals.style.display = "none";
            }
        });
    });
})();
