import {checkValidity, resetValidity} from './validation.js';
import {openPopup, closePopup} from './popup.js';
import {getScale, resetScale} from './scale.js';
import {setEffect, getEffectValue, resetEffect} from './effects.js';

const form = document.querySelector('.img-upload__form');
const preview = document.querySelector('.img-upload__preview img');
const thumbnails = document.querySelectorAll('.effects__preview');
const submitButton = document.querySelector('.img-upload__submit');

const updateThumbnails = (url) => {
  thumbnails.forEach((thumbnail) => {
    thumbnail.style.backgroundImage = `url(${url})`;
  });
};

const renderFile = (file) => {
  if (file.type.startsWith('image')) {
    preview.src = URL.createObjectURL(file);
    updateThumbnails(preview.src);
    openPopup();
  }
};

const setSubmitDisabled = (flag) => {
  submitButton.disabled = flag;
  submitButton.textContent = flag ? 'Публикую...' : 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  closePopup();
};

form.addEventListener('change', (event) => {
  switch (event.target.name) {
    case 'filename':
      renderFile(event.target.files[0]);
      break;
    case 'scale':
      preview.style.transform = `scale(${getScale() / 100})`;
      break;
    case 'effect-level':
      preview.style.filter = getEffectValue();
      break;
    case 'effect':
      setEffect(event.target.value);
      break;
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkValidity()) {
    new FormData(form);
  }
});

form.addEventListener('reset', () => {
  resetScale();
  resetEffect();
  resetValidity();
});

export {setSubmitDisabled, resetForm};
