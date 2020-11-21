let inputName = null;
let tabFilmes = null;
let summaryFilmes = null;
let allFilmes = [];
let popup = null;
let popupItem = null;
let totalMoviesFilter = [];
let btnClose = null;

window.addEventListener('load', () => {
  popup = document.querySelector('#popup');
  inputName = document.querySelector('#inputName');
  tabFilmes = document.querySelector('#tabFilmes');
  summaryFilmes = document.querySelector('#summaryFilmes');
  btnClose = document.querySelector('#btn');
  fetchMovies();
  activeInput();

  setTimeout(() => {
    document.querySelector('#loading').classList.add('hide');
    document.querySelector('#loading2').classList.add('hide');
    inputName.value = '';
    inputName.focus();
  }, 500);
});

async function fetchMovies() {
  const res = await fetch(
    'https://api-basic-filmes-unifbv.herokuapp.com/filmes'
  );
  const json = await res.json();

  allFilmes = json.filmes.map((film) => {
    const { titulo, poster, genero, sinopse, data } = film;
    return {
      name: titulo,
      picture: poster,
      genero,
      sinopse,
      data,
    };
  });
  summaryFilmes.value = filterMovies(inputName.value);
}

function activeInput() {
  function handleSearchButton() {
    filterMovies(inputName.value);
  }

  inputName.addEventListener('keyup', handleSearchButton);
  inputName.focus();
  contentPopup();
  btnClose.addEventListener('click', closePop);
}

function contentPopup() {
  let objClick = document.body.querySelectorAll('img');
  for (var obj of objClick) {
    obj.addEventListener('click', renderPopup);
  }
}

function closePop() {
  popup.style.display = 'none';
  let delDiv = popup.querySelector('div');
  delDiv.remove();
}

function renderPopup(event) {
  popup.style.display = 'block';
  divPopup = document.createElement('div');
  popup.appendChild(divPopup);

  let popupsHTML = '<div class="container-popup">';

  popupItem = totalMoviesFilter.filter((film) => film.name == event.target.alt);

  for (var eventPopup of popupItem) {
    const { name, picture, genero, sinopse, data } = eventPopup;
    const popupHMTL = `
    <div class="popup">
    <div>
    <img src="${picture}" alt="${name}"/>
  </div>
      <div>
        <Strong>${name}</Strong>
        </br>
        </br>
        <Strong>Genero:</Strong> ${genero}
        </br>
        <Strong>Data:</Strong> ${data}
        </br>
        <Strong>Sinopse:</Strong> ${sinopse}
      </div>
    </div>  
    
    `;
    popupsHTML += popupHMTL;
  }
  popupsHTML += '</div>';
  popup.querySelector('div').innerHTML = popupsHTML;
}

function filterMovies(searchName) {
  let moviesHTML = '<div class="container-movies">';

  totalMoviesFilter = allFilmes.filter((film) =>
    film.name.toUpperCase().includes(searchName.toUpperCase())
  );

  totalMoviesFilter
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((film) => {
      const { name, picture, genero, sinopse, data } = film;
      const movieHMTL = `
      
    <div class="movie">
    <div>
    <img src="${picture}" alt="${name}"/>
  </div>
      <div>
        <Strong>${name}</Strong>
        </br>
        Genero: ${genero}
        </br>
        Data: ${data}
      </div>
    </div>  
    
    `;
      moviesHTML += movieHMTL;
    }, 0);
  moviesHTML += '</div>';
  tabFilmes.innerHTML = moviesHTML;
  contentPopup();
}
