let editQuote = false;
let quoteList = document.querySelector("#quote-list");
let addQuoteForm = document.querySelector("form");
addQuoteForm.addEventListener("submit", handleForm);

function getQuotes() {
  quoteList.replaceChildren();
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then((res) => res.json())
    .then((quoteData) => quoteData.forEach((quote) => addQuote(quote)));
}

function addQuote(quote) {
  let li = document.createElement("li", { class: "quotecard" });
  let bQ = document.createElement("blockQuote", { class: "blockquote" });
  let p = document.createElement("p", { class: "mb-0" });
  let ft = document.createElement("footer", { class: "blockquote-footer" });
  let br = document.createElement("br");
  let likeBtn = document.createElement("button", { class: "btn-success" });
  let deleteBtn = document.createElement("button", { class: "btn-danger" });
  let editBtn = document.createElement("button");
  let editContainer = document.createElement("container", {
    id: "edit-container",
    display: "none;",
  });
  let eForm = addQuoteForm.cloneNode(true);

  li.appendChild(bQ);
  li.appendChild(p);
  li.appendChild(ft);
  li.appendChild(br);
  li.appendChild(likeBtn);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  li.appendChild(editContainer);
  editContainer.appendChild(eForm);
  quoteList.appendChild(li);

  p.innerText = quote.quote;

  if (quote.hasOwnProperty("editor")) {
    ft.innerText = `${quote.author} \nEdited by: ${quote.editor}`;
  } else {
    ft.innerText = quote.author;
  }

  editBtn.innerText = "Edit";
  likeBtn.innerHTML = `likes <span>${quote.likes.length}</span>`;
  deleteBtn.innerText = "Delete";
  editContainer.style.display = "none";

  //event listeners
  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteQuote(quote.id);
  });

  likeBtn.addEventListener("click", (e) => {
    // e.target.childNodes[1].innerText
    n = e.target.lastChild.innerText;
    i = parseInt(n);
    e.target.lastChild.innerText = i + 1;

    let likeTime = Math.floor(Date.now() / 1000);

    updateLikes(quote.id, likeTime);
  });
  let editForm = editContainer.querySelector("#new-quote-form");
  let qForm = editForm.querySelector("#new-quote.form-control");
  let aForm = editForm.querySelector("#author.form-control");

  editBtn.addEventListener("click", () => {
    qForm.value = quote.quote;
    console.log(aForm.outerText);
    aForm.value = "Editor";

    console.log(editForm);
    editQuote = !editQuote;
    if (editQuote) {
      editContainer.style.display = "block";
    } else {
      editContainer.style.display = "none";
    }
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    p.innerText = e.target.quote.value;
    ft.innerText = `${quote.author} \nEdited by: ${e.target.author.value}`;

    const editedQuote = {
      quote: e.target.quote.value,
      editor: e.target.author.value,
    };

    updateQuote(quote.id, editedQuote);
    editForm.reset();
    editQuote = false;
    editContainer.style.display = "none";
  });
}

function updateQuote(id, quoteObj) {
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteObj),
  })
    .then((res) => res.json())
    .then((quote) => console.log(quote));
}

function deleteQuote(id) {
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((quote) => console.log(quote));
}

function handleForm(e) {
  e.preventDefault();

  let qForm = addQuoteForm.querySelector("#new-quote.form-control");
  let aForm = addQuoteForm.querySelector("#author.form-control");

  let newQuote = {
    author: aForm.value,
    quote: qForm.value,
  };
  addNewQuote(newQuote);

  getQuotes();

  addQuoteForm.reset();
}

function addNewQuote(newQuote) {
  fetch(`http://localhost:3000/quotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newQuote),
  })
    .then((res) => res.json())
    .then((quote) => console.log(quote));
}

function updateLikes(id, seconds) {
  let newLike = { quoteId: id, createdAt: seconds };

  fetch(`http://localhost:3000/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newLike),
  })
    .then((res) => res.json())
    .then((likes) => console.log(likes));
}

function initialize() {
  getQuotes();
}
initialize();
