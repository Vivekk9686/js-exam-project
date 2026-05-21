const image = document.getElementById('image');
const title = document.getElementById('title');
const price = document.getElementById('price');
const category = document.getElementById('category');
const description = document.getElementById('description');
const displayCard = document.getElementById('display-card')
const displayCart = document.getElementById('display-cart')

const myform = document.getElementById('myform');
const displayProduct = document.getElementById('displayProduct');
const search = document.getElementById('search');

const handleDelete = (index) => {
    list.splice(index, 1); 
    localStorage.setItem('list', JSON.stringify(list)); 
    handleDisplay(); 
};

let list = JSON.parse(localStorage.getItem('list')) || [];

myform?.addEventListener('submit', (e) => {
    e.preventDefault();

    let obj = {
        id: Date.now(),
        title: title.value,
        image: image.value,
        price: price.value,
        category: category.value,
        description: description.value
    };

    list.push(obj);
    localStorage.setItem('list', JSON.stringify(list));

    window.location.href = "view-product.html";
});

const handleDisplay = () => {
    if (!displayProduct) return;

    displayProduct.innerHTML = "";

    list.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${item.image}" width="50"></td>
            <td>${item.title}</td>
            <td>₹ ${item.price}</td>
            <td>${item.category}</td>
            <td>
                <button class="btn btn-outline-warning ">Edit</button>
                <button class="btn btn-outline-danger delete-btn">Delete</button>
            </td>
        `;
        row.querySelector('.delete-btn').addEventListener('click', () => {
            handleDelete(index);
        });

        displayProduct.appendChild(row);
    });
};

const handleDisplayCard = () => {
    if (!displayCard) return;

    displayCard.innerHTML = "";

    list.forEach((item, index) => {
        const col = document.createElement('div');
        col.classList = 'col-md-3'

        col.innerHTML = `
              <div class="card">
                <img src="${item.image}" class="card-img-top " alt="...">
                 <div class="card-body">
                 <h5 class="card-title">${item.title}</h5>
                   <h5 class="mt-3">₹${item.price}</h5>
                     <a href="#" class="btn btn-primary text-white mt-3" onclick="handleCart()">Add To Cart</a>
               </div>
             </div>
        `;
        displayCard.appendChild(col);
    });
};

const handlecart = (id) => {
    let data = cart.find((item)=> item.id == id);
    console.log(data);

    if(!data){
        let product = list.find((item)=> item.id == id);
        product.qty = 1;
        cart.push(product);
    } else {
        cart = cart.map((item)=>{
            if(item.id == id) item.qty++;
            return item;
        })
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

const handleDisplayCartData = () => {
    if (!displayCart) return;

    displayCart.innerHTML = "";

    list.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList = 'col-md-3'

        div.innerHTML = `
              <div class="card">
                <img src="${item.image}" class="card-img-top " alt="...">
                 <div class="card-body">
                 <h5 class="card-title">${item.title}</h5>
                   <h5 class="mt-3">₹${item.price}</h5>
                     <a href="#" class="btn btn-primary text-white mt-3" onclick="handleCart()">Add To Cart</a>
               </div>
             </div>
        `;
        displayCart.appendChild(div);
    });
};

handleDisplay();

handleDisplayCard();

handleDisplayCartData();