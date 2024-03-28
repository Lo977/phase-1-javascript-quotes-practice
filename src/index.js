document.addEventListener("DOMContentLoaded", () => {
  const quoteList = document.querySelector("#quote-list");
  // Fetch Data
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then((res) => res.json())
    .then((quotes) => {
      // Add Toggle BTN
      const toggleDiv = document.createElement("div");
      toggleDiv.innerHTML = `
      <h4>Sort By Author: <button>OFF</button></h4>`;
      const toggleBtn = toggleDiv.querySelector("button");
      const h1 = document.querySelector("h1");
      h1.appendChild(toggleDiv);
      // Toggle Event Lististner
      toggleBtn.addEventListener("click", () => {
        if (toggleBtn.textContent === "OFF") {
          handleToggle();
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
  // Handle Rendering Cards
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
    // Creat Edit Form
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
    quoteList.append(liCard, editDiv);
    editDiv.style.display = "none";

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
      hanldeDelete(quote);
    });
    // Handle Edit and Submit
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
  // Handle Submit New Form
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
  // POST
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
  // UPDATE LIKES/POST
  function updateLikes(quote) {
    fetch(`http://localhost:3000/likes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quoteId: quote.id }),
    });
  }
  // DELETE
  function hanldeDelete(quote) {
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // EDIT-UPDATE-"PATCH"
  function handleUpdate(quote, editObj) {
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(editObj),
    });
  }
  // SORTING TOGGLE
  function handleToggle() {
    fetch("http://localhost:3000/quotes?_embed=likes")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => (a.author > b.author ? 0 : -1));
        sortedData.forEach((item) => renderQuotes(item));
      });
  }
});
