const collection = document.querySelector("#collection");
const collectionBtns = document.querySelectorAll("#collection a");

const createArray = (start, end, factor) => {
  const createTable = (n) => {
    if (n === 0) {
      return 0;
    } else {
      return createTable(n - 1) + factor;
    }
  };
  const number = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return number.map(createTable);
};

const products = {
  raw: {
    title: "Raw Hair",
    url: "https://luxuryrawhair.netlify.app/raw-hair.html",
    description: [
      "Découvrez l'excellence avec nos extension Raw hair. des cheveux 100% bruts et non transformés, provenant d'un seul donneur. Reconnus pour leur texture naturelle authentique, leur résistance à toute épreuve et leur brillance éclatante, nos Raw hair sont un investissement durable dans votre beauté. Leur polyvalence exceptionnelle vous permet de les teindre jusqu’à la teinte 613, de les coiffer selon vos envies et de les lisser thermiquement, tout en conservant leur souplesse et en restant sans enchevêtrement pour une longue durée. Faites l'expérience de la qualité supérieure avec nos Raw hair.",
    ],
    images: ["../img/RAW_1.png","../img/RAW_2.png","../img/RAW_3.png"],
    prices: [155,165,175,185,200,215,235,255,275,290],
    height: createArray(6,15,2),
    textures:['Straight']
  },
  virgin: {
    title: "Virgin Hair",
    url: "https://luxuryrawhair.netlify.app/virgin.html",
    description: ["Virgin : ne cherchez plus ! Vous avez trouvé exactement ce dont vous rêviez avec nos extensions Virgin hair. Nous vous offrons la meilleure qualité disponible et ce, à des prix absolument abordables , restent sans enchevêtrement pour un confort optimal et vous offrent une liberté totale. Elles peuvent être teintes jusqu\’à la couleur # 27 et avec une entretien approprié elles durent entre 1-2 ans. Offrez-vous l'excellence sans vous ruiner !"],
    images: ["../img/VIRGIN_1.png", "../img/VIRGIN_2.png","../IMG/VIRGIN_3.png"],
    prices: [115,125,135,145,160,175,185,195,205,210],
    height: createArray(6,15,2),
    textures:['Straight','Body Wave']
  },
  blond: {
    title: "Blond Hair",
    url: "https://luxuryrawhair.netlify.app/blond.html",
    description: ["Découvrez l'éclat du blond 613, une teinte blond platine lumineuse et tendance. Parfait pour celles qui recherchent une transformation audacieuse et une chevelure pleine de lumière."],
    images: ["../img/BLONDE_1.png", "../img/BLONDE_2.jpeg","../img/BLONDE_3.jpeg"],
    prices: [180,210,245,285,325,350,385,415,445,475],
    height: createArray(6,15,2),
    textures:['Straight']
  },
  hd_frontal: {
    title: "HD Frontals",
    url: "https://luxuryrawhair.netlify.app/hd-frontal.html",
    description: [`Lace Frontal 13x4
      Pour une liberté de coiffage absolue. S'étendant d'une oreille à l'autre (13 pouces) avec une profondeur de 4 pouces, la lace frontal 13x4 vous permet de réaliser des raies n'importe où, d'attacher vos cheveux ou de créer des coiffures relevées. Elle offre un effet ligne de cheveux parfaitement naturel comme s'ils poussaient directement de votre cuir chevelu.`],
    images: [
      "../img/LACE_1.png",
      "../img/LACE_2.png",
      "../img/LACE_3.jpeg"],
    prices: [230,240,270,290],
    height: createArray(7,10,2),
    textures:['Straight','Body Wave']
  },
  hd_closure: {
    title: "HD Closure",
    url: "https://luxuryrawhair.netlify.app/hd-closure.html",
    description: [`Lace Closure 5x5
      La solution idéale pour un look naturel et sans effort au quotidien. Sa dimension de 5x5 pouces offre une raie profonde tout en couvrant le haut du front d'une tempe à l'autre. Très facile à entretenir et utilisable sans colle (glueless), elle protège vos cheveux naturels tout en garantissant un résultat impeccable.`],
    images: [
      "../img/CLOSURE_2.jpeg",
      "../img/CLOSURE_3.JPG",
      "../img/CLOSURE_4.JPEG"],
    prices: [160,175,190,210],
    height: createArray(7,10,2),
    textures:['Straight','Body Wave']
  }
};

let formState = {
  productKey: null,
  texture: null,
  height: null,
  quantity: 1,
  price: 0,
};

collectionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productKey = e.currentTarget.dataset.product;
    createHTMLinterface(productKey);
  });
});

const createHTMLinterface = (productKey) => {
  formState = {...formState,
    productKey,
    price: products[productKey].prices[0], 
    quantity: 1,
    texture: null,
    height: null
  };
    
  createShopping();
  createFormShopping(productKey);
  createImgShopping(productKey);
};

const createShopping = () => {
  const existing = document.querySelector("#shopping");

  if (existing) {
    existing.remove();
    return;
  }

  const shopping = document.createElement("section");
  shopping.id = "shopping";
  collection.appendChild(shopping);
};

const createImgShopping = (productKey) => {
  const shopping = document.querySelector("#shopping");
  const imgGallery = document.createElement("section");
  const imgPostUp = document.createElement("section");
  const imgFull = document.createElement("img");

  imgPostUp.id = "img_post_up";
  imgGallery.id = "img_gallery";
  imgFull.id = "fullImg";
  imgFull.alt = "Full size image";

  const images = createImgSource(productKey);

  images.forEach((src, i) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = src;
    if (i === 0) imgFull.src = src;
    thumbnail.addEventListener("click", () => openFullImg(thumbnail));
    imgGallery.appendChild(thumbnail);
  });

  imgPostUp.appendChild(imgFull);
  shopping.appendChild(imgGallery);
  shopping.appendChild(imgPostUp);
};

const createImgSource = (productKey) => {
  return products[productKey].images;
};

const createFormShopping = (productKey) => {
  createFormTemplate(productKey);
  changeFormTemplate(productKey);
  changeFormTexture(productKey);
  changeFormHeight(productKey);
};

const openFullImg = (pic) => {
  const fullImg = document.getElementById("fullImg");
  fullImg.src = pic.src;
  fullImg.alt = pic.alt;
};

const createFormTemplate = (productKey) => {
  const shopping = document.querySelector("#shopping");
  const form = document.createElement("form");

  form.id = "shopping_form";
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addToSnipcart();
  });


  const title = document.createElement("h2");
  const priceProduct = document.createElement("h3");
  const heightProduct = document.createElement("h4");
  const heightContainer = document.createElement('section')
  const textureProduct = document.createElement("h4");
  const description = document.createElement("p");
  const quantitylabel = document.createElement("label");
  const quantityInput = document.createElement("input");
  const submitBtn = document.createElement("input");
  
  
  title.textContent = 'Nom du produit';
  priceProduct.textContent = 'Prix: 0$';
  textureProduct.textContent = "Choisissez la texture:";
  heightProduct.textContent = "Choisissez la longueur:";
  heightContainer.id = 'height_container'
  description.textContent = "Description du produit";
  quantitylabel.textContent = "Quantité:";
  quantitylabel.htmlFor = "quantity";
  quantityInput.type = "number";
  quantityInput.name = "quantity";
  quantityInput.id = "quantity";
  quantityInput.min = "1";
  quantityInput.value = '1'

  quantityInput.addEventListener("input", (e) => {
  updateFormState("quantity", parseInt(e.target.value));
  });

  submitBtn.id = "submitBtn";
  submitBtn.type = "submit";
  submitBtn.value = "Ajouter au panier";


  
  form.append(
    title,
    priceProduct,
    textureProduct,
    heightProduct,
    heightContainer,
    quantitylabel,
    quantityInput,
    description,
    submitBtn
  );

  shopping.appendChild(form);
}
const changeFormTemplate = (productKey) => {
  const shopping = document.querySelector("#shopping");
  const form = shopping.querySelector("#shopping_form");
  const productTitle = form.querySelector("h2");
  const priceProduct = form.querySelector("h3");
  const productDescription = form.querySelector("p");

  productTitle.textContent = products[productKey].title;
  productDescription.textContent = products[productKey].description[0];
  priceProduct.textContent = 'Prix: ' + products[productKey].prices[0] + '$';

}

const changeFormTexture = (productKey) => {
  const form = document.querySelector("#shopping_form");
  const textures = products[productKey].textures;
  const referenceNode = form.querySelector("h4:nth-of-type(2)");

  textures.forEach(texture => {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = texture;
    btn.name = "texture";
    btn.className = "texture-btn"; // Pour le CSS

    btn.addEventListener("click", () => {
      updateFormState("texture", texture);
    });

    form.insertBefore(btn, referenceNode);
  });
};

const changeFormHeight = (productKey) => {
  const container = document.querySelector("#height_container");
  const heights = products[productKey].height;

  heights.forEach(height => {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = height;
    btn.name = "height";

    btn.addEventListener("click", () => {
      updateFormState("height", height, productKey);
    });

    container.appendChild(btn);
  });
};


const updateFormState = (type, value, productKey = formState.productKey) => {
  const form = document.querySelector("#shopping_form");
  const priceProduct = form.querySelector("h3");

  if (type === "texture") {
    formState.texture = value;

    document.querySelectorAll('input[name="texture"]').forEach(btn => {
      btn.style.backgroundColor = btn.value === value ? "var(--button_color)" : "";
      btn.style.color = btn.value === value ? "white" : "";
    });
  }

  if (type === "height") {
    formState.height = value;

    const heights = products[productKey].height;
    const prices = products[productKey].prices;
    const i = heights.indexOf(Number(value));

    if (i !== -1) {
      formState.price = prices[i];
      priceProduct.textContent = `Prix: ${prices[i]}$`;
    }

    form.querySelectorAll('input[name="height"]').forEach(btn => {
      btn.style.backgroundColor = parseInt(btn.value) === parseInt(value) ? "var(--button_color)" : "";
      btn.style.color = parseInt(btn.value) === parseInt(value) ? "white" : "";
    });
  }

  if (type === "quantity") {
    formState.quantity = value;
  }
};


const addToSnipcart = () => {
  if (!formState.texture || !formState.height) {
    alert("Veuillez choisir texture et longueur");
    return;
  }

  const product = products[formState.productKey];
  const variantId = `${formState.productKey}-${formState.height}`;

  Snipcart.api.cart.items.add({
    id: variantId,
    name: `${product.title}`,
    price: parseFloat(formState.price),
    quantity: formState.quantity,
    image: product.images[0],
    description: product.description[0],
    url: product.url || 'https://luxuryrawhair.netlify.app/',
    customFields: [
      {
        name: "Texture",
        value: formState.texture
      },
      {
        name: "Longueur",
        value: String(formState.height) + " pouces"
      }
    ]
  });
};

const highlightButtons = (type, value) => {
  document.querySelectorAll(`input[type="button"]`).forEach(btn => {
    if (btn.value == value) {
      btn.style.backgroundColor = "var(--button_color)";
      btn.style.color = "white";
    } else {
      btn.style.backgroundColor = "";
      btn.style.color = "";
    }
  });
};
