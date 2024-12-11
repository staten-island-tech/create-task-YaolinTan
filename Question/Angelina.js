import "../css/style.css";

const DOMSelect = {
  input: document.querySelector(".inputword"),
  fileinput: document.querySelector('[name="fileupload"]'),
  inputbox: document.querySelector(".input"),
  submit: document.querySelector(".submit"),
  settings: document.querySelector(".customize"),
  results: document.querySelector(".results"),
  textcolor: document.querySelector('[name="textcolor"]'),
  bgcolor: document.querySelector('[name="bgcolor"]'),
  fontButtons: [
    document.querySelector(".fontminus"),
    document.querySelector(".fontplus"),
  ],
  fontsize: document.querySelector('[name="quantity"]'),
  spacingButtons: [
    document.querySelector(".spacingminus"),
    document.querySelector(".spacingplus"),
  ],
  spacing: document.querySelector('[name="letterspacing"]'),
  lineSpacingButtons: [
    document.querySelector(".linespaceminus"),
    document.querySelector(".linespaceplus"),
  ],
  linespacing: document.querySelector('[name="linespace"]'),
  leftButtons: [
    document.querySelector(".leftmarginminus"),
    document.querySelector(".leftmarginplus"),
  ],
  leftmargin: document.querySelector('[name="leftmargin"]'),
  rightButtons: [
    document.querySelector(".rightmarginminus"),
    document.querySelector(".rightmarginplus"),
  ],
  rightmargin: document.querySelector('[name="rightmargin"]'),
  indentButtons: [
    document.querySelector(".indentminus"),
    document.querySelector(".indentplus"),
  ],
  indent: document.querySelector('[name="indent"]'),
  linespaceButtons: [
    document.querySelector(".linespaceminus"),
    document.querySelector(".linespaceplus"),
  ],
  linespace: document.querySelector('[name="linespace"]'),
  fontweightButtons: [
    document.querySelector(".fontweightminus"),
    document.querySelector(".fontweightplus"),
  ],
  fontweight: document.querySelector('[name="fontweight"]'),
  fontstyle: document.querySelector(".select-input select"),
};

DOMSelect.submit.addEventListener("click", function () {
  insertText(DOMSelect.input.childNodes), "paste";
});
DOMSelect.fileinput.addEventListener("change", parseFile);

function parseFile() {
  let fr = new FileReader();
  fr.onload = function () {
    const content = fr.result;
    insertText(content.split("\n"), "file");
  };
  fr.readAsText(this.files[0]);
}

function insertText(inputContent, type) {
  DOMSelect.results.insertAdjacentHTML("beforeend", `<br></br>`);
  const content = inputContent;
  if (type === "file") {
    content.forEach(function (item) {
      DOMSelect.results.insertAdjacentHTML(
        "beforeend",
        `<p class="text">${item}</p>`
      );
    });
  } else {
    content.forEach(function (item) {
      DOMSelect.results.insertAdjacentHTML(
        "beforeend",
        `<p class="text">${item.textContent}</p>`
      );
    });
    DOMSelect.input.innerHTML = "";
  }
  DOMSelect.inputbox.style.display = "none";
  DOMSelect.settings.style.display = "";
}

function textColor() {
  document.querySelector("body").style.color = `${DOMSelect.textcolor.value}`;
}
DOMSelect.textcolor.addEventListener("input", textColor);

function bgColor() {
  document.querySelector(
    "body"
  ).style.backgroundColor = `${DOMSelect.bgcolor.value}`;
}
DOMSelect.bgcolor.addEventListener("input", bgColor);

function fontSize() {
  document
    .querySelectorAll(".text")
    .forEach((item) => (item.style.fontSize = `${DOMSelect.fontsize.value}px`));
}
DOMSelect.fontButtons[0].addEventListener("click", fontSize);
DOMSelect.fontButtons[1].addEventListener("click", fontSize);

function spacing() {
  document
    .querySelectorAll(".text")
    .forEach(
      (item) => (item.style.letterSpacing = `${DOMSelect.spacing.value}px`)
    );
}
DOMSelect.spacingButtons[0].addEventListener("click", spacing);
DOMSelect.spacingButtons[1].addEventListener("click", spacing);

function leftmargin() {
  document
    .querySelectorAll(".text")
    .forEach(
      (item) => (item.style.marginLeft = `${DOMSelect.leftmargin.value}px`)
    );
}
DOMSelect.leftButtons[0].addEventListener("click", leftmargin);
DOMSelect.leftButtons[1].addEventListener("click", leftmargin);

function rightmargin() {
  document
    .querySelectorAll(".text")
    .forEach(
      (item) => (item.style.marginRight = `${DOMSelect.rightmargin.value}px`)
    );
}
DOMSelect.rightButtons[0].addEventListener("click", rightmargin);
DOMSelect.rightButtons[1].addEventListener("click", rightmargin);

function indent() {
  document
    .querySelectorAll(".text")
    .forEach((item) => (item.style.textIndent = `${DOMSelect.indent.value}px`));
}
DOMSelect.indentButtons[0].addEventListener("click", indent);
DOMSelect.indentButtons[1].addEventListener("click", indent);

function lineSpacing() {
  document
    .querySelectorAll(".text")
    .forEach(
      (item) => (item.style.lineHeight = `${DOMSelect.linespace.value}px`)
    );
}
DOMSelect.linespaceButtons[0].addEventListener("click", lineSpacing);
DOMSelect.linespaceButtons[1].addEventListener("click", lineSpacing);

function fontWeight() {
  document
    .querySelectorAll(".text")
    .forEach(
      (item) => (item.style.fontWeight = `${DOMSelect.fontweight.value}`)
    );
}
DOMSelect.fontweightButtons[0].addEventListener("click", fontWeight);
DOMSelect.fontweightButtons[1].addEventListener("click", fontWeight);

function fontStyle() {
  document
    .querySelectorAll(".text")
    .forEach(
      (item) => (item.style.fontFamily = `${DOMSelect.fontstyle.value}`)
    );
}
DOMSelect.fontstyle.addEventListener("input", fontStyle);
