function getAllKidsOfElement(element, incself) {
  //console.log("element = " + element);
  //console.log("incself = " + incself);
  if (incself == undefined || incself == null) {
    throw "the variable incself must be a defined boolean variable!";
  } else {
    if (incself == true || incself == false);
    else throw "the variable incself must be a defined boolean variable!";
  }

  if (element == undefined || element == null) return null;
  else {
    let allkids = new Array();
    let mykids = element.children;
    //console.log("mykids = " + mykids);
    //debugger;
    if (mykids == undefined || mykids == null || mykids.length < 1);
    else {
      let mykidslen = mykids.length;
      //console.log("mykidslen = " + mykidslen);
      for (let n = 0; n < mykidslen; n++) {
        if (mykids[n] == undefined || mykids[n] == null);
        else {
          let myokids = getAllKidsOfElement(mykids[n], true);
          if (myokids == null || myokids.length < 1);
          else {
            for (let k = 0; k < myokids.length; k++) allkids.push(myokids[k]);
          }
        }
      }
    }
    //console.log("if allowed to include self, then element = " + element);
    if (incself) allkids.push(element);
    //else;//do nothing
    return allkids;
  }
}

function removeAllKids(element, notself) {
  //console.log("element = " + element);
  //console.log("notself = " + notself);
  if (notself == undefined || notself == null) {
    throw "the variable notself must be a defined boolean variable!";
  } else {
    if (notself == true || notself == false);
    else throw "the variable notself must be a defined boolean variable!";
  }

  if (element == undefined || element == null) {
    //console.log("element is null!");
    return;
  } else {
    let mykids = getAllKidsOfElement(element, notself == false);
    let mykidslen = mykids.length;
    for (let n = 0; n < mykidslen; n++) mykids[n].remove();
  }
}

function addQuoteToDOM(qtobj) {
  //for each quote:
  //author, id, likes array, quote
  //the likes array has:
  //createdAt, id, quoteId
  //<li class='quote-card'>
  //<blockquote class="blockquote">
  //<p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //Integer posuere erat a ante.</p>
  //<footer class="blockquote-footer">Someone famous</footer>
  //<br>
  //<button class='btn-success'>Likes: <span>0</span></button>
  //<button class='btn-danger'>Delete</button>
  //</blockquote>
  //</li>
  let myli = document.createElement("li");
  myli.className = "quote-card";
  myli.id = qtobj.id;
  let mybqt = document.createElement("blockquote");
  mybqt.className = "blockquote";
  let myqt = document.createElement("p");
  myqt.class = "mb-0";
  myqt.textContent = "" + qtobj.quote;
  let myatr = document.createElement("footer");
  myatr.className = "blockquote-footer";
  myatr.textContent = "" + qtobj.author;
  let mynl = document.createElement("br");
  let mylikebtn = document.createElement("button");
  mylikebtn.className = "btn-success";
  mylikebtn.textContent = "Likes: ";
  mylikebtn.id = qtobj.id + "likebtn";
  let mynumlikes = document.createElement("span");
  mynumlikes.textContent = "" + qtobj.likes.length; //length of the likes array
  let myeditbtn = document.createElement("button");
  myeditbtn.textContent = "Edit";
  myeditbtn.id = qtobj.id + "editbtn";
  let mydelbtn = document.createElement("button");
  mydelbtn.textContent = "Delete";
  mydelbtn.id = qtobj.id + "delbtn";
  mylikebtn.appendChild(mynumlikes);
  mybqt.appendChild(myqt);
  mybqt.appendChild(myatr);
  mybqt.appendChild(mynl);
  mybqt.appendChild(mylikebtn);
  mybqt.appendChild(myeditbtn);
  mybqt.appendChild(mydelbtn);
  myli.appendChild(mybqt);
  return myli;
}

function addEditListenerToButton(button) {
  button.addEventListener(
    "click",
    function (event) {
      //console.log("edit button clicked!");
      //console.log("this.id = " + this.id);
      let myidnumstr = this.id.substring(0, this.id.indexOf("editbtn"));
      let myeditfrmondom = document.getElementById("myeditfrm");
      let mytxts = myeditfrmondom.getElementsByTagName("textarea");
      let myli = document.getElementById(myidnumstr);
      let myqtelem = myli.getElementsByTagName("p")[0];
      let myatrelem = myli.getElementsByTagName("footer")[0];
      mytxts[0].value = "" + myqtelem.textContent;
      mytxts[1].value = "" + myatrelem.textContent;
      let mysbmtbtn = myeditfrmondom.getElementsByTagName("button")[0];
      mysbmtbtn.id = myidnumstr + "edtfrmbtn";
      myeditfrmondom.style.display = "block";

      mysbmtbtn.addEventListener(
        "click",
        function (oevent) {
          //console.log("done button clicked!");
          //console.log("this.id = " + this.id);
          //console.log("quote = mytxts[0].value = " + mytxts[0].value);
          //console.log("author = mytxts[1].value = " + mytxts[1].value);
          let myoidnumstr = this.id.substring(0, this.id.indexOf("edtfrmbtn"));
          //console.log("myoidnumstr = " + myoidnumstr);
          //for each quote:
          //author, id, likes array, quote
          //the likes array has:
          //createdAt, id, quoteId
          //let mylikesarr = new Array();
          //get the original likes array for the quote somehow
          //let qtifnd = false;
          //for (let k = 0; k < myquotes.length; k++)
          //{
          //    let tempidstr = "" + myquotes[k].id;
          //    console.log("tempidstr = " + tempidstr);
          //    console.log("myoidnumstr = " + myoidnumstr);
          //    if (tempidstr === myoidnumstr)
          //    {
          //        console.log("found the quote object at k = " + k + "!");
          //        qtifnd = true;
          //        let mytemplikesarr = myquotes[k].likes;
          //        console.log("myquotes[" + k + "].likes = " + mytemplikesarr);
          //        for (let c = 0; c < mytemplikesarr.length; c++)
          //        {
          //            let mylikeobj = {
          //                createdAt: mytemplikesarr[c].createdAt,
          //                id: mytemplikesarr[c].id,
          //                quoteId: mytemplikesarr[c].quoteId
          //            };
          //            mylikesarr.push(mylikeobj);
          //        }//end of c for loop
          //        break;
          //    }
          //    //else;//do nothing
          //}//end of k for loop
          //console.log("qtifnd = " + qtifnd);
          //if (qtifnd);
          //else throw "the quote id must be found, but it was not!";
          let mynwqtobj = {
            author: mytxts[1].value,
            id: Number(myoidnumstr),
            quote: mytxts[0].value,
          }; //likes: mylikesarr,

          let myconfigobj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(mynwqtobj),
          };
          fetch("http://localhost:3000/quotes/" + myoidnumstr, myconfigobj)
            .then((oresponse) => oresponse.json())
            .then(function (oresponse) {
              //console.log("oresponse = " + oresponse);
              //console.log("myoidnumstr = " + myoidnumstr);
              //modify the DOM
              let omyli = document.getElementById(myoidnumstr);
              let omyqtelem = omyli.getElementsByTagName("p")[0];
              let omyatrelem = omyli.getElementsByTagName("footer")[0];
              omyqtelem.textContent = "" + oresponse.quote;
              omyatrelem.textContent = "" + oresponse.author;

              //eventually we will want to hide the edit form and clear out the values
              let omyeditfrmondom = document.getElementById("myeditfrm");
              let omytxts = omyeditfrmondom.getElementsByTagName("textarea");
              omytxts[0].value = "";
              omytxts[1].value = "";
              omyeditfrmondom.style.display = "none";
              //console.log("DONE SAVING THE DATA TO THE DOM!");
              //debugger;
            })
            .catch(function (err) {
              console.error("failed to edit the quote!");
              console.error(err);
            });
          //debugger;
        }.bind(mysbmtbtn)
      );
    }.bind(button)
  );
}

function addDeleteListenerToButton(button) {
  button.addEventListener(
    "click",
    function (event) {
      //console.log("delete button clicked!");
      //console.log("this.id = " + this.id);
      let myidnumstr = this.id.substring(0, this.id.indexOf("delbtn"));
      //console.log("myidnumstr = " + myidnumstr);
      if (myidnumstr.length < 1)
        throw "failed to get the id from the id string!";
      //else;//do nothing
      let myconfigobj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch("http://localhost:3000/quotes/" + myidnumstr, myconfigobj)
        .then((oresponse) => oresponse.json())
        .then(function (oresponse) {
          //console.log("oresponse = " + oresponse);
          //we also need to remove it from the likes list
          //it seems that the delete method takes care of that
          //now remove the quote card and all of its kids from the dom
          let myqtcard = document.getElementById(myidnumstr);
          removeAllKids(myqtcard, false);
          //console.log("done removing all of the elements related to that quote from " +
          //    "the DOM");
          //debugger;
        })
        .catch(function (err) {
          console.error("failed to delete the quote!");
          console.error(err);
        });
      //debugger;
    }.bind(button)
  );
}

function addLikeListenerToButton(button) {
  button.addEventListener(
    "click",
    function (event) {
      //console.log("like button clicked!");
      //console.log("this.id = " + this.id);

      let myidnumstr = this.id.substring(0, this.id.indexOf("likebtn"));
      //console.log("myidnumstr = " + myidnumstr);
      if (myidnumstr.length < 1)
        throw "failed to get the id from the id string!";
      //else;//do nothing

      //the createdAt: new Date().getTime();
      //id, quoteId
      //the quoteId will be the id of the quote liked as a string
      //the id will be the id of the new like

      let mylikeobj = {
        createdAt: new Date().getTime(),
        quoteId: Number(myidnumstr),
      };
      let myconfigobj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(mylikeobj),
      };
      fetch("http://localhost:3000/likes/", myconfigobj)
        .then((oresponse) => oresponse.json())
        .then(function (oresponse) {
          //console.log("oresponse = " + oresponse);
          //"http://localhost:3000/quotes?_embed=likes"
          fetch("http://localhost:3000/quotes/" + myidnumstr + "?_embed=likes")
            .then((ooresponse) => ooresponse.json())
            .then(function (ooresponse) {
              //console.log("ooresponse = " + ooresponse);
              //console.log("ooresponse.likes.length = " + ooresponse.likes.length);
              let myqtcard = document.getElementById(myidnumstr);
              let mynumlikes = myqtcard.getElementsByTagName("span")[0];
              mynumlikes.textContent = "" + ooresponse.likes.length;
              //length of the likes array
              //console.log("successfully added a new like to the quote!");
              //debugger;
            })
            .catch(function (err) {
              console.error("failed to add the new like to the quote!");
              console.error(err);
            });
          //debugger;
        })
        .catch(function (err) {
          console.error("failed to add the new like to the quote!");
          console.error(err);
        });
      //debugger;
    }.bind(button)
  );
}

function removeAllQuotesFromDOMAndAddNewOrderToDOM(mynwqtsordr, turnon) {
  //console.log("turnon = " + turnon);
  if (turnon == undefined || turnon == null) {
    throw "the variable turnon must be a defined boolean variable!";
  } else {
    if (turnon == true || turnon == false);
    else throw "the variable turnon must be a defined boolean variable!";
  }

  //clear out all of the DOM items
  //regenerate using new array
  //hook up all buttons according to that

  let myqtlist = document.getElementById("quote-list");
  removeAllKids(myqtlist, true);
  //debugger;

  for (let k = 0; k < mynwqtsordr.length; k++) {
    myqtlist.appendChild(addQuoteToDOM(mynwqtsordr[k]));
  }

  //hook up the like edit delete buttons here
  for (let k = 0; k < mynwqtsordr.length; k++) {
    let mynweditbtn = document.getElementById(mynwqtsordr[k].id + "editbtn");
    let mynwdelbtn = document.getElementById(mynwqtsordr[k].id + "delbtn");
    let mynwlikebtn = document.getElementById(mynwqtsordr[k].id + "likebtn");
    addDeleteListenerToButton(mynwdelbtn);
    addEditListenerToButton(mynweditbtn);
    addLikeListenerToButton(mynwlikebtn);
  } //end of k for loop
  if (turnon) this.textContent = "Sort By Author: ON";
  else this.textContent = "Sort By Author: OFF";
  //beware of lost context bug when calling asynchronus functions
}

function sortByAuthor(myquotes) {
  //console.log("this.textContent = " + this.textContent);
  //turning sort by author name on
  //call arrays.sort()
  let myatrsarr = myquotes.map((item) => item.author);
  //console.log("ORIG order");
  //for (let p = 0; p < myatrsarr.length; p++)
  //{
  //    console.log("myatrsarr[" + p + "] = " + myatrsarr[p]);
  //    console.log("myquotes[" + p + "].author = " + myquotes[p].author);
  //}
  myatrsarr = myatrsarr.sort();
  let mynwqtsordr = myatrsarr.map(function (item) {
    for (let k = 0; k < myatrsarr.length; k++) {
      if (myquotes[k].author === item) return { ...myquotes[k] };
      //else;//do nothing
    }
    throw "there was a problem with the map because it should have made it here!";
  });
  //console.log("NEW order");
  //for (let p = 0; p < myatrsarr.length; p++)
  //{
  //    console.log("myatrsarr[" + p + "] = " + myatrsarr[p]);
  //    console.log("mynwqtsordr[" + p + "].author = " + mynwqtsordr[p].author);
  //}

  //might want to BLOG THIS***
  //what are the pros and the cons of doing the sorting on the client side vs server side
  //pros for client side:
  //-speeds up the server not slowing it down to sort a very long list of authors
  //-does not cause the server to hang
  //-the time it takes waiting for the server might be longer than
  //--if the client had just done it
  //-clients are meant to handle the data, the server is meant to serve it up when requested
  //-clients are used to sorting it
  //-fetch is asychronous; it may be quicker to sort it synchronously
  //
  //con for client side:
  //-more work for the client and slows it down a bit to sort a very long list
  //-might cause the main thread to hang
  //-if it is requested frequently enough and big enough that it is impractical for the client
  //--to sort it then the server may provide sorted data options that are faster
  //-fetch is asychronous; it may be quicker to sort it synchronously
  //

  removeAllQuotesFromDOMAndAddNewOrderToDOM.call(this, mynwqtsordr, true);
}

function loadQuotesOnDOM() {
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then((response) => response.json())
    .then(function (response) {
      //console.log("response = " + response);
      //debugger;
      let myquotes = response;
      let myqtlist = document.getElementById("quote-list");
      for (let n = 0; n < myquotes.length; n++) {
        myqtlist.appendChild(addQuoteToDOM(myquotes[n]));
      } //end of n for loop
      //console.log("successfully added the quotes!");
      //debugger;

      //now need to set up the buttons here
      //set up the edit form here
      let myeditfrm = document.createElement("div");
      myeditfrm.id = "myeditfrm";
      let myqttxt = document.createElement("textarea");
      let mynl = document.createElement("br");
      let myonl = document.createElement("br");
      let myatrnm = document.createElement("textarea");
      let mydonebtn = document.createElement("button");
      myqttxt.rows = 4;
      myqttxt.cols = 150;
      myqttxt.placeholder = "quote";
      myqttxt.name = "equote";
      myatrnm.cols = 50;
      myatrnm.placeholder = "author's name";
      myatrnm.name = "aname";
      mydonebtn.textContent = "Done";
      myeditfrm.appendChild(myqttxt);
      myeditfrm.appendChild(mynl);
      myeditfrm.appendChild(myatrnm);
      myeditfrm.appendChild(myonl);
      myeditfrm.appendChild(mydonebtn);
      myeditfrm.style.display = "none";
      let firstdiv = document.querySelector("div");
      document
        .getElementsByTagName("body")[0]
        .insertBefore(myeditfrm, firstdiv);

      //set up the edit buttons here
      for (let n = 0; n < myquotes.length; n++) {
        let myeditbtn = document.getElementById(myquotes[n].id + "editbtn");
        addEditListenerToButton(myeditbtn);
      } //end of n for loop
      //console.log("the edit buttons are all hooked up!");

      for (let n = 0; n < myquotes.length; n++) {
        let mydelbtn = document.getElementById(myquotes[n].id + "delbtn");
        addDeleteListenerToButton(mydelbtn);
      } //end of n for loop
      //console.log("the delete buttons are all hooked up!");

      for (let n = 0; n < myquotes.length; n++) {
        let mylikebtn = document.getElementById(myquotes[n].id + "likebtn");
        addLikeListenerToButton(mylikebtn);
      } //end of n for loop
      //console.log("the like buttons are all hooked up!");

      //set up the add a new quote button
      let myform = document.getElementById("new-quote-form");
      myform.addEventListener("submit", function (event) {
        event.preventDefault();
        //now get the data from the form...
        //console.log("event.target = " + event.target);

        let myqt = event.target[0].value;
        let myatr = event.target[1].value;
        //console.log("myqt = event.target[0].value = " + myqt);
        //console.log("myatr = event.target[1].value = " + myatr);

        //create the new quote object and load the data in
        //get the id from the server
        //the likes will be an empty array
        //then we will add the response to the dom
        //addQuoteToDOM(qtobj)

        //for each quote:
        //author, id, likes array, quote
        //the likes array has:
        //createdAt, id, quoteId
        //let mylikesarr = new Array();
        //get the original likes array for the quote somehow
        let mynwqtobj = {
          author: myatr,
          quote: myqt,
        };

        let myconfigobj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(mynwqtobj),
        };
        fetch("http://localhost:3000/quotes/", myconfigobj)
          .then((oresponse) => oresponse.json())
          .then(function (oresponse) {
            //console.log("oresponse = " + oresponse);
            //console.log("oresponse.id = " + oresponse.id);
            //debugger;

            let mynwidstr = "" + oresponse.id;
            if (mynwidstr.length < 1)
              throw "invalid id retrieved from the response!";
            //else;//do nothing

            let mynwqtobjtodom = {
              author: oresponse.author,
              id: oresponse.id,
              likes: [],
              quote: oresponse.quote,
            };

            //modify the DOM
            let myqtlist = document.getElementById("quote-list");
            myqtlist.appendChild(addQuoteToDOM(mynwqtobjtodom));

            //hook up the like edit delete buttons here
            let mynweditbtn = document.getElementById(oresponse.id + "editbtn");
            let mynwdelbtn = document.getElementById(oresponse.id + "delbtn");
            let mynwlikebtn = document.getElementById(oresponse.id + "likebtn");
            addDeleteListenerToButton(mynwdelbtn);
            addEditListenerToButton(mynweditbtn);
            addLikeListenerToButton(mynwlikebtn);
            //console.log("added the quote to the new list, but still need to sort!");

            let mysrtathrbtndom = document.getElementById("sortatrnmbtn");
            //console.log("mysrtathrbtndom.textContent = " + mysrtathrbtndom.textContent);

            if (mysrtathrbtndom.textContent === "Sort By Author: ON") {
              fetch("http://localhost:3000/quotes?_embed=likes")
                .then((ooresponse) => ooresponse.json())
                .then(function (ooresponse) {
                  //console.log("ooresponse = " + ooresponse);
                  //debugger;
                  let mynwquotes = ooresponse;
                  sortByAuthor.call(mysrtathrbtndom, mynwquotes);
                  //console.log("successfully sorted the new list!");
                  //debugger;
                })
                .catch(function (err) {
                  console.error("failed to sort the new list!");
                  console.error(err);
                });
            } else if (mysrtathrbtndom.textContent === "Sort By Author: OFF") {
              //console.log("successfully sorted the new list!");
            } else
              throw "illegal string name found for the button to sort by author name!";
            //debugger;
          })
          .catch(function (err) {
            console.error("failed to add the quote to the list!");
            console.error(err);
          });
        //debugger;
      });
      //console.log("hooked up the add new quote form buttons!");

      //set up the sort by author button
      let mysrtatrbtn = document.createElement("button");
      mysrtatrbtn.id = "sortatrnmbtn";
      mysrtatrbtn.textContent = "Sort By Author: OFF";
      document
        .getElementsByTagName("body")[0]
        .insertBefore(mysrtatrbtn, firstdiv);
      let mysrtathrbtndom = document.getElementById("sortatrnmbtn");
      mysrtathrbtndom.addEventListener(
        "click",
        function (event) {
          //console.log("clicked the sort by author name button!");
          //console.log("this.textContent = " + this.textContent);

          if (this.textContent === "Sort By Author: OFF") {
            //sorting by author name here
            sortByAuthor.call(mysrtathrbtndom, myquotes);
          } else if (this.textContent === "Sort By Author: ON") {
            //turning sort by author name off
            //put in order of myquotes
            removeAllQuotesFromDOMAndAddNewOrderToDOM.call(
              mysrtathrbtndom,
              myquotes,
              false
            );
          } else
            throw "illegal string name found for the button to sort by author name!";
          //console.log("successfully sorted by author name or by ID!");
          //debugger;
        }.bind(mysrtathrbtndom)
      );
      //console.log("successfully linked up the sort by author name button!");
    })
    .catch(function (err) {
      console.error("there was an error getting the quotes!");
      console.error(err);
    });
}
loadQuotesOnDOM();
