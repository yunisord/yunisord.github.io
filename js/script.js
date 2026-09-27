document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       DOM ELEMENTS
    ========================================================= */

    const header = document.getElementById("site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");

    const sections = document.querySelectorAll("main section[id]");

    const revealElements = document.querySelectorAll(".reveal");

    const yearElement =
        document.getElementById("year") ||
        document.getElementById("current-year");

    const contactForm =
        document.getElementById("contact-form");

    const toast =
        document.getElementById("toast");

    const toastIcon =
        document.getElementById("toast-icon");

    const toastTitle =
        document.getElementById("toast-title");

    const toastMessage =
        document.getElementById("toast-message");

    const toastClose =
        document.getElementById("toast-close");

    const modalTriggers =
        document.querySelectorAll(
            "[data-modal], [data-modal-target]"
        );

    const modals =
        document.querySelectorAll(
            ".modal, .project-modal"
        );

    const modalCloseButtons =
        document.querySelectorAll(
            ".modal-close"
        );


    /* =========================================================
       CURRENT YEAR
    ========================================================= */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    function openNavigation() {

        if (!menuToggle || !mainNav) {
            return;
        }

        mainNav.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );
    }


    function closeNavigation() {

        if (!menuToggle || !mainNav) {
            return;
        }

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );
    }


    function toggleNavigation() {

        if (!mainNav) {
            return;
        }

        if (
            mainNav.classList.contains("open")
        ) {

            closeNavigation();

        } else {

            openNavigation();

        }
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleNavigation
        );

    }


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {
                closeNavigation();
            }
        );

    });


    document.addEventListener(
        "click",
        (event) => {

            if (!mainNav || !menuToggle) {
                return;
            }

            if (
                !mainNav.classList.contains("open")
            ) {
                return;
            }

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedMenuButton
            ) {

                closeNavigation();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeNavigation();
            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 760) {
                closeNavigation();
            }

        }
    );


    /* =========================================================
       ACTIVE NAVIGATION LINK
    ========================================================= */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* =========================================================
       REVEAL ANIMATIONS
    ========================================================= */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================================================
       MODAL HELPERS
    ========================================================= */

    let previousBodyPaddingRight = "";


    function openModal(modal) {

        if (!modal) {
            return;
        }

        const scrollbarWidth =
            window.innerWidth -
            document.documentElement
                .clientWidth;

        previousBodyPaddingRight =
            document.body.style.paddingRight;

        if (scrollbarWidth > 0) {

            document.body.style.paddingRight =
                `${scrollbarWidth}px`;

        }

        document.body.classList.add(
            "modal-open"
        );

        modal.classList.add(
            "is-open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        const closeButton =
            modal.querySelector(
                ".modal-close"
            );

        if (closeButton) {

            setTimeout(
                () => {
                    closeButton.focus();
                },
                50
            );

        }

    }


    function closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "is-open"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        const video =
            modal.querySelector(
                "video"
            );

        if (video) {

            video.pause();

            try {

                video.currentTime = 0;

            } catch (error) {

                // Ignore media reset errors.

            }

        }


        const anyOpenModal =
            document.querySelector(
                ".modal.is-open, .project-modal.is-open"
            );


        if (!anyOpenModal) {

            document.body.classList.remove(
                "modal-open"
            );

            document.body.style.paddingRight =
                previousBodyPaddingRight;

        }

    }


    function closeAllModals() {

        modals.forEach(
            (modal) => {

                closeModal(modal);

            }
        );

    }


    /* =========================================================
       MODAL TRIGGERS
    ========================================================= */

    modalTriggers.forEach(
        (trigger) => {

            trigger.addEventListener(
                "click",
                () => {

                    const modalId =
                        trigger.getAttribute(
                            "data-modal"
                        ) ||
                        trigger.getAttribute(
                            "data-modal-target"
                        );


                    if (!modalId) {
                        return;
                    }


                    const modal =
                        document.getElementById(
                            modalId
                        );


                    if (modal) {

                        openModal(
                            modal
                        );

                    }

                }
            );

        }
    );


    /* =========================================================
       MODAL CLOSE BUTTONS
    ========================================================= */

    modalCloseButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const modal =
                        button.closest(
                            ".modal, .project-modal"
                        );

                    closeModal(
                        modal
                    );

                }
            );

        }
    );


    /* =========================================================
       CLOSE MODAL WHEN CLICKING BACKDROP
    ========================================================= */

    modals.forEach(
        (modal) => {

            modal.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target === modal ||
                        event.target.classList.contains(
                            "modal-backdrop"
                        )
                    ) {

                        closeModal(
                            modal
                        );

                    }

                }
            );

        }
    );


    /* =========================================================
       ESCAPE KEY CLOSES MODAL
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            const openModalElement =
                document.querySelector(
                    ".modal.is-open, .project-modal.is-open"
                );


            if (openModalElement) {

                closeModal(
                    openModalElement
                );

            }

        }
    );


    /* =========================================================
       TOAST NOTIFICATION
    ========================================================= */

    let toastTimer = null;


    function showToast(
        type = "success",
        title = "Message sent",
        message =
            "Thank you. I'll get back to you soon."
    ) {

        if (!toast) {
            return;
        }


        /*
         * Cancel any existing timer.
         */
        clearTimeout(
            toastTimer
        );


        /*
         * Remove previous state.
         */
        toast.classList.remove(
            "error",
            "success"
        );


        /*
         * Apply current state.
         */
        if (type === "error") {

            toast.classList.add(
                "error"
            );

        } else {

            toast.classList.add(
                "success"
            );

        }


        /*
         * Update icon.
         */
        if (toastIcon) {

            toastIcon.textContent =
                type === "error"
                    ? "!"
                    : "✓";

        }


        /*
         * Update title.
         */
        if (toastTitle) {

            toastTitle.textContent =
                title;

        }


        /*
         * Update message.
         */
        if (toastMessage) {

            toastMessage.textContent =
                message;

        }


        /*
         * Restart progress animation.
         */
        const progress =
            toast.querySelector(
                ".toast-progress"
            );


        if (progress) {

            progress.style.animation =
                "none";

            void progress.offsetWidth;

            progress.style.animation = "";

        }


        /*
         * Show notification.
         */
        toast.classList.add(
            "show"
        );

        toast.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
         * Automatically hide after
         * exactly 5 seconds.
         */
        toastTimer = setTimeout(
            () => {

                hideToast();

            },
            5000
        );

    }


    function hideToast() {

        if (!toast) {
            return;
        }


        clearTimeout(
            toastTimer
        );


        toast.classList.remove(
            "show"
        );


        toast.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (toastClose) {

        toastClose.addEventListener(
            "click",
            hideToast
        );

    }


    /* =========================================================
       EMAILJS CONFIGURATION
    ========================================================= */

    const EMAILJS_SERVICE_ID =
        "service_ixqb4z8";

    const EMAILJS_TEMPLATE_ID =
        "template_uagbifo";


    /*
     * Replace this with your actual
     * EmailJS Public Key.
     */
    const EMAILJS_PUBLIC_KEY =
        "WWl1Raw643AzwD5hq";


    /* =========================================================
       INITIALIZE EMAILJS
    ========================================================= */

    if (
        typeof emailjs !== "undefined" &&
        EMAILJS_PUBLIC_KEY !==
            "YOUR_PUBLIC_KEY"
    ) {

        emailjs.init({
            publicKey:
                EMAILJS_PUBLIC_KEY
        });

    }


    /* =========================================================
       CONTACT FORM
    ========================================================= */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                /* ---------------------------------------------
                   CHECK EMAILJS
                --------------------------------------------- */

                if (
                    typeof emailjs ===
                    "undefined"
                ) {

                    showToast(
                        "error",
                        "Something went wrong",
                        "Email service could not be loaded. Please try again later."
                    );

                    return;
                }


                if (
                    EMAILJS_PUBLIC_KEY ===
                    "YOUR_PUBLIC_KEY"
                ) {

                    showToast(
                        "error",
                        "EmailJS is not configured",
                        "Please add your EmailJS Public Key in script.js."
                    );

                    return;
                }


                /* ---------------------------------------------
                   GET FORM ELEMENTS
                --------------------------------------------- */

                const nameInput =
                    document.getElementById(
                        "name"
                    );

                const emailInput =
                    document.getElementById(
                        "email"
                    );

                const messageInput =
                    document.getElementById(
                        "message"
                    );


                /*
                 * Your HTML uses:
                 *
                 * class="button button-primary"
                 *
                 * So we don't rely only on
                 * ".submit-button".
                 */
                const submitButton =
                    contactForm.querySelector(
                        ".submit-button"
                    ) ||
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (
                    !nameInput ||
                    !emailInput ||
                    !messageInput ||
                    !submitButton
                ) {

                    showToast(
                        "error",
                        "Form error",
                        "The contact form could not be processed."
                    );

                    return;
                }


                /* ---------------------------------------------
                   VALIDATION
                --------------------------------------------- */

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const message =
                    messageInput.value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showToast(
                        "error",
                        "Missing information",
                        "Please complete all fields before sending."
                    );

                    return;
                }


                if (
                    !emailInput.checkValidity()
                ) {

                    showToast(
                        "error",
                        "Invalid email",
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;
                }


                /* ---------------------------------------------
                   LOADING STATE
                --------------------------------------------- */

                submitButton.classList.add(
                    "is-loading"
                );

                submitButton.disabled = true;


                /*
                 * Optional loading text.
                 *
                 * Keep the original button text
                 * so it can be restored afterwards.
                 */
                const originalButtonHTML =
                    submitButton.innerHTML;


                submitButton.innerHTML =
                    `
                        Sending...
                        <span>↗</span>
                    `;


                /* ---------------------------------------------
                   SEND EMAIL
                --------------------------------------------- */

                try {

                    await emailjs.sendForm(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        contactForm
                    );


                    /* -----------------------------------------
                       SUCCESS
                    ----------------------------------------- */

                    contactForm.reset();


                    /*
                     * Show notification ONLY after
                     * EmailJS confirms successful sending.
                     */
                    showToast(
                        "success",
                        "Message sent",
                        "Thank you. I'll get back to you soon."
                    );


                } catch (error) {

                    console.error(
                        "EmailJS error:",
                        error
                    );


                    /* -----------------------------------------
                       ERROR
                    ----------------------------------------- */

                    showToast(
                        "error",
                        "Message not sent",
                        "Something went wrong. Please try again later."
                    );


                } finally {

                    /*
                     * Restore button.
                     */
                    submitButton.innerHTML =
                        originalButtonHTML;

                    submitButton.classList.remove(
                        "is-loading"
                    );

                    submitButton.disabled =
                        false;

                }

            }
        );

    }


    /* =========================================================
       PAGE VISIBILITY
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                updateHeader();

                updateActiveNavigation();

            }

        }
    );


    /* =========================================================
       PREVENT MODAL VIDEO FROM PLAYING
       IN BACKGROUND
    ========================================================= */

    window.addEventListener(
        "beforeunload",
        () => {

            modals.forEach(
                (modal) => {

                    const video =
                        modal.querySelector(
                            "video"
                        );

                    if (video) {

                        video.pause();

                    }

                }
            );

        }
    );

});