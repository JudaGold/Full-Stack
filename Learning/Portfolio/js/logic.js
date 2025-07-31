document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual form submission

    const email = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_07hx54l", "template_nv9hrns", email)
      .then(alert("Email sent"));
  });
