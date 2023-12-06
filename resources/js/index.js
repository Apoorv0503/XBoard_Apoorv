// let ID = () => Math.random().toString(36).substr(2, 9);
function ID(){
  let random_no=Math.random();
  let  hexadecimal_string=random_no.toString(36); //Convert a number to a string, using base 36 (hexaDecimal):
  let Id_substring= hexadecimal_string.substr(2,9);  //The substr() method begins at a specified position(2), fetches specifc number of characters(9), and returns that.

  return Id_substring; // O/P= ksp305z9z

}

// rough accordion structure of Reference

{/* 

<div class="accordion" id="accordionExample">
<div class="card">
<div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button class="accordion-button" aria-expanded="true" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-controls="collapse${id}">
        ${title}
      </button>
    </h2>
    <div id="collapse${id}" class="collapse" data-parent="#accordionId" aria-labelledby="heading${id}">
    </div>
  </div> 
---------accordian itme ended------------
</div> 
------------card ended---------------------
more cards
</div>
-------- accordian ended----------------

*/}


let createAccordion = (title, id) => {
  //single card is created here with all classes, id and content

  // console.log("logging card${id}: "+`card${id}`);  O/P= cardksp305z9z
  return `
  <div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button class="accordion-button" aria-expanded="true" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-controls="collapse${id}">
        ${title}
      </button>
    </h2>
    <div id="collapse${id}" class="collapse" data-parent="#accordionId" aria-labelledby="heading${id}">
    </div>
  </div>
  `;
};


// carousel-inner k alawa baki stucture created.
let createCarouselOuter = (id, innerId) => {
  return `
  <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" id="${innerId}">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
};

//carousel-inner ka content bhi created
let createCarouselInner = (id, active) => {
  // active will recieve a bool value
  return `
  <div class="carousel-item ${active ? "active" : ""}" id="${id}">
  <!-- here the card content will be added-->
  </div>`;``
};

let createCard = (item) => {
  return `
  <div class="card d-block">
    <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${item["title"]}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
      <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
      <p class="card-text">${item["description"]}</p>
      <a href="${item["link"]}" class="stretched-link" target="_blank"></a>
    </div>
  </div>`;
};

// text-muted: This class is used to add text with a muted effect,  like light colour text

let addContent = async () => {
  // Loop through each newsfeed
  for (let i = 0; i < magazines.length; i++) {
    let url = magazines[i];

    // Fetch data
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`
    );

    // console.log("my response");
    // console.log(response);
      
    // The encodeURI() function is used to encode complete URI. This function encodes the special character except for (, / ? : @ & = + $ #) characters

    // let uri = "my test.asp?name=ståle&car=saab";
    // let encoded = encodeURI(uri);
    // output: my%20test.asp?name=st%C3%A5le&car=saab

    // here, encodeURI is used to encode the entire URL, replacing spaces with "%20" and other special characters with their respective URL-encoded values. 
    // This ensures that the URL is correctly formatted and can be used in the fetch request.

    let data = await response.json();
    // console.log("my response in json");
    // console.log(data);

    // Create accordion
    let accordionId = ID();
    // console.log("data response");
    // console.log(data["feed"]["title"]); or we can write: data.feed.title
    

    let accordion = createAccordion(data["feed"]["title"], accordionId);
    document.getElementById("accordionId_html").innerHTML += accordion;  //prev + new data added

    // By default, expand only the first accordion
    if (i == 0) {
      document.getElementById(`collapse${accordionId}`).classList.add("show");
    }

    // Create carousel
    let carouselId = ID();
    let carouselInnerId = ID();
    let carousel = createCarouselOuter(carouselId, carouselInnerId); //carousel-inner k alawa baki stucture created.
    document.getElementById(`collapse${accordionId}`).innerHTML = carousel; //carousel added inside div with id=collapse${id}

    // Add the cards in the carousel
    let items = data["items"];
    // let items = data.items; also 
    for (j in items) {
      let card = createCard(items[j]);
      let innerCarouselCardId = ID();
      let innerCarouselCard = createCarouselInner(innerCarouselCardId, j == 0);
      document.getElementById(`${carouselInnerId}`).innerHTML +=
        innerCarouselCard; //content of carousel-inner div, added to the div with class= carousel-inner now isme card ko add kro (inside innerCarouselCard )
      document.getElementById(`${innerCarouselCardId}`).innerHTML += card; //
    }
  }
};

addContent();
