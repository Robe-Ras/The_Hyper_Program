import "../style/index.scss"; // Sass

// Import all of Bootstrap's JS
import { routes } from "./routes.js";
import * as bootstrap from "bootstrap";

/*
// You can also import JavaScript plugins individually as needed to keep bundle
import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap'
*/


// eviter action du formulaire
document.addEventListener("submit", e => {
  e.preventDefault();
  let searchInput = encodeURIComponent(
    document.getElementById("search").value).trim();
  document.location.href = `/#${routes.pagelist.name.toLocaleLowerCase()}/${searchInput}`;  
});


// Router

const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());