

// const refs = {
//   searchForm: document.querySelector('#search-form'),

// };

// refs.searchForm.addEventListener('submit', onSearch);


// function onSearch (e)  {
// e.preventDefault();



// searchQuerry = e.currentTarget.elements.searchQuery.value.trim();
// // Your API key=34899280-ba1753ecc84482fb675b913b6
// //https://pixabay.com/api/


// const URL = `https://pixabay.com/api/?key=34899280-ba1753ecc84482fb675b913b6&q=${searchQuery}&image_type=photo`; 

// // https://pixabay.com/api/?key=34899280-ba1753ecc84482fb675b913b6&q=yellow+flowers&image_type=photo

// fetch(
//   "https://pixabay.com/api/?key=34899280-ba1753ecc84482fb675b913b6&q=yellow+flowers&image_type=photo"
// )
//   .then(r => r.json())
//   .then(console.log(r))
//   .catch(error => console.log(error));
// }





import Notiflix from 'notiflix';
import axios from 'axios';
//import SimpleLightbox from 'simplelightbox';
//import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '34899280-ba1753ecc84482fb675b913b6';
const BASE_URL = 'https://pixabay.com/api/';

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
// });

const refs = {
  formEl: document.querySelector('#search-form'),
  cardEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let searchQuerry = '';
let currentPage = 1;

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  resetPage();
  e.preventDefault();
  clearContainer();
  searchQuerry = e.currentTarget.elements.searchQuery.value.trim();
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuerry}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  if (searchQuerry === '') {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.failure('Enter something.');
  } else {
    fetchImage(url).then(cards => {
      if (cards.total === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
      }
    });
  }
}







function onLoadMore() {
  lightbox.refresh();
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuerry}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  fetchImage(url);
}

function renderCards(cards) {
  return cards.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class='gallery_link'><div class="photo-card">
<img src="${webformatURL}" alt="${tags}" loading="lazy" width='360' height='260'/>
<div class="info">
  <p class="info-item">
    <b>Likes:${likes}</b>
  </p>
  <p class="info-item">
    <b>Views:${views}</b>
  </p>
  <p class="info-item">
    <b>Comments:${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads:${downloads}</b>
  </p>
</div>
</div></a>`;
      }
    )
    .join('');
}

function clearContainer() {
  refs.cardEl.innerHTML = '';
}

function resetPage() {
  currentPage = 1;
}