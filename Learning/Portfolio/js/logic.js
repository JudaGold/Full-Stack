document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:goldberg.yehuda.yg@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
  });
