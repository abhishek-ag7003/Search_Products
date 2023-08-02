const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const res = await response.json();
  return res;
};

const loaderElement = `<div class='loading-wrapper'>
                        <img src='./images/loader.gif' alt-'loader'/>
                        </div>`;

const updateElement = (products) => {
  const productWrapper = document.querySelector(".product_listing_wrapper");
  if (products.length === 0) {
    productWrapper.innerHTML = "No Product Found";
    return;
  }
  const container = document.createElement("div");
  container.classList.add("container");
  products.map((product) => {
    let element = `
        <div class='product_container'>
        <div class='product_image'>
        <img src = '${product.image}' alt = ''/>
        </div>
        <div class = 'product_details'>
        <div class='product_title'>${product.title}</div>
        <div class='product_description'>${product.description}</div>
        <div class='product_price'>
        <span class='name'>Price: </span>
        <span class='value'>${product.price}</span>
        </div>
        <div class='product_rating'>
        <span class='name'>Rating: </span>
        <span class='value'>${product.rating.rate}</span>
        </div>
        </div>
        </div>
        `;
    container.insertAdjacentHTML("beforeend", element);
  });
  productWrapper.innerHTML = loaderElement;
  setTimeout(() => {
    productWrapper.innerHTML = "";
    productWrapper.insertAdjacentElement("beforeend", container);
  }, 100);
};

function debounce(fn, delay = 100) {
  let timer;
  return function (data) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(data);
    }, delay);
  };
}

const debounceFunction = debounce(handleChange, 200);

async function handleChange(event) {
  const target = event.target.value.trim().toLowerCase();
  let product = await getProducts();
  let filterProduct = product.filter((ele) => {
    if (ele.title.toLowerCase().indexOf(target) !== -1) {
      return ele;
    }
  });
  updateElement(filterProduct);
}

async function init() {
  let product = await getProducts();
  updateElement(product);
}

init();
