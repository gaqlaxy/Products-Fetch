const mostPopProducts = document.querySelector(".most-popular-products");

const jsonFile = "./products.json";

fetch(jsonFile)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.map((product) => {
      const { id, name, price, images } = product;
      // console.log(id, name, price, images);
      mostPopProducts.innerHTML += `
        <div class="product-card" data-product-id="${id}">
                <div class="product-card_container">
                    <div class="product-card_img">
                        <img src="${images[0].url}" alt="${name}">
                    </div>
                </div>
                <div class="product-card_description">
                    <div class="product-card_text">${name}</div>
                    <div class="product-price">&#8377;${price}</div>
                </div>
                <div class="product-card_color">
                ${images.map((image) => {
                  const { url, color } = image;

                  return `<button class="product-card_btn-radio" data-img="${url}">
                        <span style="background-color: ${color};"></span>
                    </button>`;
                }).join("")}
                    
                    
                </div>
            </div>
        `;
    });

    //GETTING RADIO BUTTONS 
    const radioBtns = document.querySelectorAll(".product-card_btn-radio");
    document.querySelectorAll(".product-card_color").forEach(pcc => pcc.firstElementChild.classList.add("selected"));

    radioBtns.forEach((radioBtn) => {
      radioBtn.addEventListener("click", () => {
        let productCard = radioBtn.parentElement.parentElement,
          productImg = productCard.querySelector(".product-card_img > img"),
          proRadioBtns = productCard.querySelectorAll(
            ".product-card_btn-radio"
          );
        productImg.src = radioBtn.dataset.img;

        if (radioBtn.parentElement.parentElement === productCard) {
          proRadioBtns.forEach((radioBtn) =>
            radioBtn.classList.remove("selected")
          );
          radioBtn.classList.add("selected");
        }
      });
    });
  });
