// document.addEventListener("DOMContentLoaded", () => {
const quoteList = document.querySelector("#quote-list");

fetch("http://localhost:3000/quotes?_embed=likes")
  .then((res) => res.json())
  .then((quotes) => {
    const toggleDiv = document.createElement("div");
    toggleDiv.innerHTML = `
        <h4>Sort By Author: <button>OFF</button></h4>`;
    const toggleBtn = toggleDiv.querySelector("button");
    const h1 = document.querySelector("h1");
    h1.parentNode.insertBefore(toggleDiv, h1.nextSibling);

    toggleBtn.addEventListener("click", (e) => {
      if (toggleBtn.textContent === "OFF") {
        handleToggle(e);
        toggleBtn.textContent = "ON";
        quoteList.innerHTML = "";
      } else if (toggleBtn.textContent === "ON") {
        toggleBtn.textContent = "OFF";
        quoteList.innerHTML = "";
        fetch("http://localhost:3000/quotes?_embed=likes")
          .then((res) => res.json())
          .then((quotes) => quotes.forEach((quote) => renderQuotes(quote)));
      }
    });

    quotes.forEach((quote) => renderQuotes(quote));
  });

function renderQuotes(quote) {
  // console.log(quote);
  const liCard = document.createElement("li");
  liCard.className = "quote-card";
  liCard.innerHTML = `
          <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
          <button class='btn-danger'>Delete</button>
          <button class='btn-danger' id="edit">Edit</button>
        </blockquote>
          `;
  const editDiv = document.createElement("div");
  editDiv.innerHTML = `
      <form id="edit-quote-form">
      <label for="edit-author">Update Quote</label>
          <input name="edit-quote" type="text" class="form-control" id="edit-quote"><br>
          <label for="edit-author">Update Author</label>
          <input name="edit-author" type="text" class="form-control" id="edit-author" ><br>
          <button type="submit" class="btn btn-primary">Update</button>
      </form>
      `;

  // quoteList.prepend(toggleDiv);
  quoteList.append(liCard, editDiv);
  editDiv.style.display = "none";
  // Toggle

  // Update Likes
  const likeBtn = liCard.querySelector(".btn-success");

  likeBtn.addEventListener("click", () => {
    quote.likes.length++;
    liCard.querySelector("span").textContent = quote.likes.length;
    updateLikes(quote);
  });
  // Delete Quotes
  const deleteBtn = liCard.querySelector(".btn-danger");
  deleteBtn.addEventListener("click", () => {
    liCard.remove();
    hanldeDelete(quote.id);
  });
  // Handle Edit form popup
  const editForm = editDiv.querySelector("form");
  const editQuote = liCard.querySelector("#edit");
  editQuote.addEventListener("click", () => {
    editDiv.style.display = "";
    editForm["edit-quote"].value = quote.quote;
    editForm["edit-author"].value = quote.author;
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editObj = {
      quote: e.target["edit-quote"].value,
      author: e.target["edit-author"].value,
    };
    editForm.reset();
    handleUpdate(quote, editObj);
    editDiv.style.display = "none";
  });
}
const newQuoteForm = document.getElementById("new-quote-form");
newQuoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formObj = {
    quote: e.target.quote.value,
    author: e.target.author.value,
    likes: [],
  };
  handlePost(formObj);
  newQuoteForm.reset();
});

function handlePost(formObj) {
  fetch(`http://localhost:3000/quotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObj),
  })
    .then((res) => res.json())
    .then((formData) => renderQuotes(formData));
}
function updateLikes(quote) {
  fetch(`http://localhost:3000/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quoteId: quote.id }),
  })
    .then((response) => response.json())
    .then((likes) => console.log(likes));
}

function hanldeDelete(id) {
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
function handleUpdate(quote, editObj) {
  fetch(`http://localhost:3000/quotes/${quote.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(editObj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function handleToggle() {
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then((res) => res.json())
    .then((data) => {
      data.sort((a, b) => {
        if (a.author < b.author) {
          return -1;
        } else if (a.author > b.author) {
          return 1;
        }
        return 0;
      });
      data.forEach((item) => renderQuotes(item));
    });
}
// });
