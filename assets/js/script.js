function openNetwork() {
    document.querySelector(".social-menu").style.display = "block"
}

document.addEventListener('mouseup', (e) => {
    // console.log(e.target);
    const container = document.querySelector(".social-menu");
    if (!container.contains(e.target)) {
        document.querySelector(".social-menu").style.display = "none"
    }
    // document.querySelector(".social-menu").style.display = "none"
});

function sendMail(){
    let from = document.querySelector("#contact-email").value
    let from_name = document.querySelector("#contact-name").value
    let message = document.querySelector("#contact-msg").value

    let serviceId = 'service_mb5nt17'
    let templateId = 'template_pn08rnu'

    let data = {
        senderEmail : from,
        senderName : from_name,
        senderMessage : message
    }

    fetch('http://localhost:9990/send',{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    // var data = {
    //     service_id: serviceId,
    //     template_id: templateId,
    //     user_id: 'MznEvun1t6yP3hgSY',
    //     accessToken : 'SK_C0IQENBCWhJYVoC1K-',
    //     template_params: {
    //         // 'username': 'Elie Andriatsitohaina',
    //         'senderName' : from_name,
    //         'senderMsg' : message,
    //         'senderEmail' :from
    //     }
    // };
     
    // $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json'
    // }).done(function() {
    //     Swal.fire({
    //         icon: 'success',
    //         title: 'Envoyé!',
    //         text: 'Votre message est envoyé avec succès!',
    //         footer: 'Merci de m\'avoir contacter.'
    //       })
    // }).fail(function(error) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Message non evnoyé au destinataire!',
    //         footer: 'Réessayer d\'envoyer encore!'
    //       })
    // });

}

// The code will be long
// because I want to use MVC Design Pattern for this.

window.onload = function () {
    // handleSlide()
    const helpers = (function () {
        function getDOMElements(DOMSelectors) {
            let DOMElements = {};
            for (let selector in DOMSelectors) {
                if (DOMSelectors.hasOwnProperty(selector)) {
                    DOMElements[selector] = document.querySelector(
                        DOMSelectors[selector]
                    );
                }
            }
            return DOMElements;
        }
        return {
            getDOMElements
        };
    })();

    const modal = (function () {
        const state = {
            counter: 0,
            intervalID: 0
        };
        let CONSTANTS = {
            ACTIVE_CLASS_NAME: "active",
            TIMER: 1500,
            TRANSITION: "all .3s ease-out"
        };
        function addConstant(key, value) {
            CONSTANTS[key] = value;
        }

        return {
            state,
            CONSTANTS,
            addConstant
        };
    })();

    const view = (function (helpers) {
        const DOMSelectors = {
            carouselInnerSlider: ".content_inner_slider",
            dots: ".dots",
            slide: "#slide",
            prevButton: ".prev_button",
            nextButton: ".next_button",
            carouselImages: ".content_inner_slider > img",
            dot: ".dot"
        };
        const DOMElements = helpers.getDOMElements(DOMSelectors);
        const CAROUSEL_IMAGES = [
            ...document.querySelectorAll(DOMSelectors.carouselImages)
        ];
        const DOTS = [...document.querySelectorAll(DOMSelectors.dot)];
        function moveSliderToIndex(IMAGE_SIZE, index) {
            DOMElements.carouselInnerSlider.style.transform = `translateX(-${IMAGE_SIZE * index
                }px)`;
        }
        function addClassToIndex(className, index) {
            CAROUSEL_IMAGES[index].classList.add(className);
        }
        function removeClassToIndex(className, index) {
            CAROUSEL_IMAGES[index].classList.remove(className);
        }
        function addBackGroundToCurrentIndex(index) {
            DOTS[index].style.background = "#000";
        }
        function removeBackGroundToCurrentIndex(index) {
            DOTS[index].style.background = "transparent";
            DOTS[index].style.border = "1px #000 solid";
        }
        function setTransition(element, transition) {
            element.style.transition = `${transition}`;
        }
        return {
            DOMSelectors,
            moveSliderToIndex,
            addClassToIndex,
            removeClassToIndex,
            addBackGroundToCurrentIndex,
            removeBackGroundToCurrentIndex,
            setTransition
        };
    })(helpers);

    const controller = (function (modal, view, helpers) {
        const DOMSelectors = view.DOMSelectors;
        const DOMElements = helpers.getDOMElements(DOMSelectors);
        function initApp() {
            const imageSize = DOMElements.carouselInnerSlider.clientWidth;
            const imagesCount =
                [...document.querySelectorAll(DOMSelectors.carouselImages)].length - 1;
            modal.addConstant("IMAGE_SIZE", imageSize);
            modal.addConstant("TOTAL_IMAGES", imagesCount);
            view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
            handleAdding();
            DOMElements.nextButton.addEventListener("click", handleNextImage);
            DOMElements.prevButton.addEventListener("click", handlePrevImage);
            DOMElements.dots.addEventListener("click", handleDotClick);
            DOMElements.slide.addEventListener("change", handleSlide);
        }
        function removeEventListeners() {
            DOMElements.nextButton.removeEventListener("click", handleNextImage);
            DOMElements.prevButton.removeEventListener("click", handlePrevImage);
            DOMElements.dots.removeEventListener("click", handleDotClick);
            DOMElements.slide.removeEventListener("change", handleSlide);
        }
        function handleNextImage() {
            handleRemove();
            if (modal.state.counter === modal.CONSTANTS.TOTAL_IMAGES) {
                modal.state.counter = -1;
            }
            modal.state.counter += 1;
            handleAdding();
            view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
        }
        function handlePrevImage() {
            handleRemove();
            if (modal.state.counter === 0) {
                modal.state.counter = modal.CONSTANTS.TOTAL_IMAGES + 1;
            }
            modal.state.counter -= 1;
            handleAdding();
            view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
        }
        function handleDotClick(event) {
            const value = Number(event.target.value);
            if (!isNaN(value)) {
                handleRemove();
                modal.state.counter = value;
                view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
                handleAdding();
            }
        }
        function handleSlide(event) {
            const isChecked = event.target.checked;
            if (isChecked) {
                modal.state.intervalID = setInterval(() => {
                    handleNextImage();
                }, modal.CONSTANTS.TIMER);
            } else {
                clearInterval(modal.state.intervalID);
                modal.state.intervalID = null;
            }
        }
        function handleRemove() {
            view.removeClassToIndex(
                modal.CONSTANTS.ACTIVE_CLASS_NAME,
                modal.state.counter
            );
            view.removeBackGroundToCurrentIndex(modal.state.counter);
        }
        function handleAdding() {
            view.addClassToIndex(
                modal.CONSTANTS.ACTIVE_CLASS_NAME,
                modal.state.counter
            );
            view.addBackGroundToCurrentIndex(modal.state.counter);
        }
        DOMElements.carouselInnerSlider.addEventListener(
            "transitionstart",
            removeEventListeners
        );
        DOMElements.carouselInnerSlider.addEventListener("transitionend", initApp);
        view.setTransition(
            DOMElements.carouselInnerSlider,
            modal.CONSTANTS.TRANSITION
        );
        return {
            initApp,
            removeEventListeners
        };
    })(modal, view, helpers);

    controller.initApp();

    window.addEventListener("resize", () => {
        controller.removeEventListeners();
        controller.initApp();
    });
};
