(function($) {
    "use strict";

    // Spinner
    var spinner = function() {
        setTimeout(function() {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function() {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });


    // Skills
    $('.skill').waypoint(function() {
        $('.progress .progress-bar').each(function() {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '80%'
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({
            filter: $(this).data('filter')
        });
    });

})(jQuery);

//contact form


  // Initialize EmailJS
(function () {
    emailjs.init("LIK_sFevJne85ldIJ"); // Replace with your EmailJS public key
  })();
  
  // Get the form and its elements
  const contactForm = document.querySelector('.contact-form');
  const nameInput = contactForm.querySelector('input[name="name"]');
  const emailInput = contactForm.querySelector('input[name="email"]');
  const messageInput = contactForm.querySelector('textarea[name="message"]');
  
  // Validation function
  function validateForm() {
    let isValid = true;
  
    // Validate name
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required.");
      isValid = false;
    } else {
      clearError(nameInput);
    }
  
    // Validate email
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput);
    }
  
    // Validate message
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Message cannot be empty.");
      isValid = false;
    } else {
      clearError(messageInput);
    }
  
    return isValid;
  }
  
  // Email validation regex
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  // Show error message
  function showError(input, message) {
    const error = document.createElement("span");
    error.className = "error-message";
    error.innerText = message;
    input.classList.add("error");
    if (!input.nextElementSibling) {
      input.parentElement.appendChild(error);
    }
  }
  
  // Clear error message
  function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
    input.classList.remove("error");
  }
  
  // Function to send email using EmailJS
  function sendEmail(name, email, message) {
    return emailjs.send("digibyte2025", "template_i1i6urr", {
      to_email: "dhanasridhar2003@gmail.com", 
      from_name: name,
      from_email: email,
      message: message,
    });
  }
  
  // Form submission event
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
  
    if (validateForm()) {
      // Send the email
      sendEmail(nameInput.value.trim(), emailInput.value.trim(), messageInput.value.trim())
        .then(() => {
          // Display success message
          contactForm.innerHTML = `
            <div class="success-message">
              <h3>Thank you!</h3>
              <p>Your message has been successfully sent. We'll get back to you soon!</p>
            </div>
          `;
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert("Error: Could not send the email. Please try again later.");
        });
    }
  });
  