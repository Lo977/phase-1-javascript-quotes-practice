// Definitions
const quoteList = document.querySelector("#quote-list");
const form = document.querySelector("#new-quote-form");
const newQuoteInput = document.querySelector("#new-quote");
const authorInput = document.querySelector("#author");

// Create Toggle
const toggleDiv = document.createElement("div");
const toggle = document.createElement("button");
const toggleLabel = document.createElement("h4");

toggleLabel.textContent = "Sort By Author: ";
toggle.textContent = "OFF";
toggle.className = "off";

toggleLabel.appendChild(toggle);
toggleDiv.append(toggleLabel);
document.querySelector("#quote-list").parentNode.prepend(toggleDiv);

// Callbacks
function getQuotes() {
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => createQuote(item));
    });
}

function createQuote(item) {
  const quoteCard = document.createElement("li");
  const blockquote = document.createElement("blockquote");
  const p = document.createElement("p");
  const footer = document.createElement("footer");
  const br = document.createElement("br");
  const successBtn = document.createElement("button");
  const dangerBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const editDiv = document.createElement("div");
  const editForm = document.createElement("form");
  const editQuoteLabel = document.createElement("label");
  const editQuote = document.createElement("input");
  const editAuthorLabel = document.createElement("label");
  const editAuthor = document.createElement("input");
  const submitEditQuote = document.createElement("button");

  editForm.append(
    editQuoteLabel,
    editQuote,
    br,
    editAuthorLabel,
    editAuthor,
    submitEditQuote
  );
  editDiv.appendChild(editForm);
  blockquote.append(p, footer, br, successBtn, dangerBtn, editBtn, editDiv);
  quoteCard.appendChild(blockquote);
  quoteList.appendChild(quoteCard);

  quoteCard.className = "quote-card";
  blockquote.className = "blockquote";
  p.className = "mb-0";
  footer.className = "blockquote-footer";
  successBtn.className = "btn-success";
  dangerBtn.className = "btn-danger";
  editQuoteLabel.className = "edit-label";
  editAuthorLabel.className = "edit-label";
  editQuote.className = "edit-quote-input";
  editAuthor.className = "edit-author-input";
  editBtn.className = "btn-edit";
  submitEditQuote.className = "btn-submit";

  p.textContent = item.quote;
  footer.textContent = item.author;
  successBtn.innerHTML = "Likes: <span>" + item.likes.length + "</span>";
  dangerBtn.textContent = "Delete";
  editBtn.textContent = "Edit";
  editQuoteLabel.textContent = "Edit Quote:";
  editQuote.defaultValue = item.quote;
  editAuthorLabel.textContent = "Edit Author:";
  editAuthor.defaultValue = item.author;
  submitEditQuote.textContent = "Submit";

  editDiv.style.display = "none";

  successBtn.addEventListener("click", (e) => {
    let likeObj = {
      quoteId: item.id,
      createdAt: Math.floor(Date.now() / 1000),
    };
    fetch("http://localhost:3000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeObj),
    }).then(
      (e.target.querySelector("span").textContent =
        parseInt(e.target.querySelector("span").textContent) + 1)
    );
  });

  dangerBtn.addEventListener("click", (e) => {
    fetch(`http://localhost:3000/quotes/${item.id}`, { method: "DELETE" }).then(
      e.target.parentNode.parentNode.remove()
    );
  });

  editBtn.addEventListener("click", (e) => {
    editDiv.style.display = "";
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newQuote = e.target.parentNode.querySelector(".edit-quote-input").value;
    let newAuthor =
      e.target.parentNode.querySelector(".edit-author-input").value;
    let editedQuote = {
      quote: newQuote,
      author: newAuthor,
    };

    fetch(`http://localhost:3000/quotes/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(editedQuote),
    })
      .then((res) => res.json())
      .then((data) => {
        p.textContent = data.quote;
        footer.textContent = data.author;
      });

    editDiv.style.display = "none";
  });
}

function addQuote(e) {
  e.preventDefault();
  let quoteObj = {
    quote: newQuoteInput.value,
    author: authorInput.value,
  };

  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(quoteObj),
  })
    .then((res) => res.json())
    .then((data) => {
      fetch(`http://localhost:3000/quotes/${data.id}?_embed=likes`)
        .then((res) => res.json())
        .then((quote) => createQuote(quote));
    });

  form.reset();
}

function toggleQuotes(e) {
  if (e.target.className === "on") {
    e.target.className = "off";
    e.target.textContent = "OFF";
    quoteList.innerHTML = "";
    getQuotes();
  } else if (e.target.className === "off") {
    e.target.className = "on";
    e.target.textContent = "ON";
    quoteList.innerHTML = "";
    fetch("http://localhost:3000/quotes?_embed=likes")
      .then((res) => res.json())
      .then((data) => {
        data.sort(function (a, b) {
          if (a.author < b.author) {
            return -1;
          } else if (a.author > b.author) {
            return 1;
          }
          return 0;
        });
        data.forEach((item) => createQuote(item));
      });
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", getQuotes);
form.addEventListener("submit", addQuote);
toggle.addEventListener("click", toggleQuotes);
