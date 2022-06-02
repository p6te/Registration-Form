const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const clearBtn = document.querySelector(".clear");
const sendBtn = document.querySelector(".send");
const closeBtn = document.querySelector(".close");
const popup = document.querySelector(".popup");

const showError = (input, msg) => {
  const formBox = input.parentElement;

  formBox.classList.add("error");

  const errorMsg = formBox.querySelector(".error-text");
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    const text = input.previousElementSibling.innerText;

    showError(input, `${text.slice(0, -1)} musi posiadać min. ${min} znaków.`);
  }
};

const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "hasła nie są identyczne!");
  }
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, "mail jest niepoprawny");
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-box");
  const errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains("error")) errorCount++;
  });

  if (errorCount === 0) {
    popup.classList.add("show-popup");
  }
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  checkForm([username, pass, pass2, email]);
  checkLength(username, 3);
  checkLength(pass, 8);
  checkPassword(pass, pass2);
  validateEmail(email);
  checkErrors();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  [username, pass, pass2, email].forEach((el) => {
    el.value = "";
    clearError(el);
  });
});
