const lista = document.getElementById("listaCarrito");
const totalEl = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// ===============================
// CREAR ITEM
// ===============================
function crearItem(item, index) {

  const div = document.createElement("div");
  div.className = "item";


  // Imagen
  const img = document.createElement("img");
  img.src = item.imagen;
  img.alt = item.nombre;


  // Info producto
  const info = document.createElement("div");
  info.className = "info";

  const nombre = document.createElement("h3");
  nombre.textContent = item.nombre;

  const descripcion = document.createElement("p");
  descripcion.className = "descripcion";
  descripcion.textContent = item.descripcion || "";

  const precio = document.createElement("strong");
  precio.textContent = `$${(item.precio * item.cantidad).toLocaleString()}`;

  info.append(nombre, descripcion, precio);


  // ===============================
  // CANTIDAD
  // ===============================

  const cantidad = document.createElement("div");
  cantidad.className = "cantidad";

  const menos = document.createElement("button");
  menos.textContent = "−";

  const num = document.createElement("span");
  num.textContent = item.cantidad;

  const mas = document.createElement("button");
  mas.textContent = "+";

  menos.onclick = () => {

    item.cantidad--;

    if (item.cantidad <= 0) {
      carrito.splice(index, 1);
    }

    guardar();
  };

  mas.onclick = () => {

    item.cantidad++;

    guardar();
  };

  cantidad.append(menos, num, mas);


  // ===============================
  // ELIMINAR
  // ===============================

  const eliminar = document.createElement("div");
  eliminar.className = "eliminar";
  eliminar.textContent = "✕";

  eliminar.onclick = () => {

    carrito.splice(index, 1);
    guardar();

  };


  div.append(img, info, cantidad, eliminar);

  return div;
}


// ===============================
// RENDER
// ===============================
function render() {

  lista.innerHTML = "";

  if (carrito.length === 0) {

    lista.textContent = "Tu carrito está vacío";
    totalEl.textContent = "$0";

    return;
  }

  carrito.forEach((item, index) => {

    lista.appendChild(crearItem(item, index));

  });

  const total = carrito.reduce(
    (acc, i) => acc + i.precio * i.cantidad,
    0
  );

  totalEl.textContent = `$${total.toLocaleString()}`;
}


// ===============================
// GUARDAR
// ===============================
function guardar() {

  localStorage.setItem("carrito", JSON.stringify(carrito));

  render();

}


// ===============================
// BLOQUEAR CHECKOUT SI VACÍO
// ===============================
const btnCheckout = document.getElementById("btnCheckout");

if (btnCheckout) {

  btnCheckout.addEventListener("click", e => {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {

      e.preventDefault();

      mostrarToast("¡EL CARRITO ESTÁ VACÍO!");

    }

  });

}


// ===============================
// TOAST
// ===============================
function mostrarToast(mensaje) {

  let toast = document.querySelector(".toast");

  if (!toast) {

    toast = document.createElement("div");
    toast.className = "toast toast-warning";

    document.body.appendChild(toast);

  }

  toast.textContent = mensaje;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


// INIT
render();