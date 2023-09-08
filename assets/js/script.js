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

function showAlert(icon, title, message, color) {
    document.querySelector(".alert").style.display = "block"
    document.querySelector("#alert-title").innerText = title
    document.querySelector("#alert-title").classList = color
    document.querySelector("#alert-icon").classList = icon
    document.querySelector("#alert-icon").classList.add(color)
    document.querySelector("#alert-message").innerText = message
}

function closeMe() {
    document.querySelector(".alert").style.display = "none"
}
function sendMail() {
    let from = document.querySelector("#contact-email") ? document.querySelector("#contact-email").value : ""
    let from_name = document.querySelector("#contact-name") ? document.querySelector("#contact-name").value : ""
    let message = document.querySelector("#contact-msg") ? document.querySelector("#contact-msg").value : ""
    let tel = document.querySelector("#contact-tel") ? document.querySelector("#contact-tel").value : ""

    let data = {
        senderEmail: from, // Obligatoire
        senderPhone: tel,  // Facultative
        senderName: from_name,  // Obligatoire
        senderMessage: message,  // Obligatoire
        senderAttachments: [] // Facultative
    }

    // console.log(data);

    if (from && from_name && message) {

        // fetch('/send', {
        fetch('http://localhost:9990/send', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data), // body data type must match "Content-Type" header

        }).then(res => {
            showAlert("fa fa-check-square", "Succès", "Message envoyé avec succès!", "success")
            document.querySelector("#contact-email").value = ""
            document.querySelector("#contact-name").value = ""
            document.querySelector("#contact-msg").value = ""
            document.querySelector("#contact-tel").value = ""
            // if(res || (res.ok && res.status==200)){
            //     showAlert("fa fa-check-square", "Succès", "Message envoyé avec succès!", "success")
            //     document.querySelector("#contact-email").value = ""
            //     document.querySelector("#contact-name").value = ""
            //     document.querySelector("#contact-msg").value = ""
            //     document.querySelector("#contact-tel").value = ""
            // }else{
            //     showAlert("fas fa-skull-crossbones", "Erreur", "Votre message n'est pas envoyé au destinataire!", "error")
            // }
            
            console.log(res)
        })

       

        
    } else {
        showAlert("fas fa-skull-crossbones", "Erreur", "Certains champs sont obligatoire!", "error")
    }

}

// The code will be long

window.onload = function () {
    // Variables
    let prevs = document.querySelectorAll('.prev');
    let nexts = document.querySelectorAll('.next');

    let imgPosition = 0;

    // Event Listeners

    nexts.forEach(next=>{

        next.addEventListener('click', (e)=>{

            let dots = e.target.nextElementSibling.querySelectorAll('.dot');
    
            let imgs = e.target.previousElementSibling.previousElementSibling.querySelectorAll("img")
            // console.log(div);
            
            nextImg(imgs, dots)
        });

    })

    prevs.forEach(prev=>{
        prev.addEventListener('click', (e)=>{

            let dots = e.target.nextElementSibling.nextElementSibling.querySelectorAll('.dot');
    
            let imgs = e.target.previousElementSibling.querySelectorAll("img")
            // console.log(div);
            prevImg(imgs, dots)

        });
    })
    
    // Update Position
    function updatePosition(imgs, dots) {
        //   Images
        for (let img of imgs) {
            img.classList.remove('visible');
            img.classList.add('hidden');
        }
        imgs[imgPosition].classList.remove('hidden');
        imgs[imgPosition].classList.add('visible')
        //   Dots
        for (let dot of dots) {
            dot.className = dot.className.replace(" active", "");
        }
        dots[imgPosition].classList.add('active');

    }

    // Next Img
    function nextImg(imgs, dots) {

        let totalImgs = imgs.length

        if (imgPosition === totalImgs - 1) {
            imgPosition = 0;
        } else {
            imgPosition++;
        }
        updatePosition(imgs, dots);
    }
    //Previous Image
    function prevImg(imgs, dots) {

        let totalImgs = imgs.length

        if (imgPosition === 0) {
            imgPosition = totalImgs - 1;
        } else {
            imgPosition--;
        }
        updatePosition(imgs, dots);
    }

}

