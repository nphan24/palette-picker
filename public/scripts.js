$('document').ready(setRandomColor);
$('.generate-button').on('click', setRandomColor);
$('.unlocked').on('click', toggleLock);
$('.save-button').on('click', savePalette);

function setRandomColor () {
  const colorPalatte = [$('.box-one'), $('.box-two'), $('.box-three'), $('.box-four'), $('.box-five')];
  
  colorPalatte.forEach(color => {
    if (!color.children('img').hasClass('locked')) { 
    let randomColorHex = generateRandomColor();

    color.siblings('p').text(randomColorHex);
    color.css('background-color', randomColorHex);
  }})
}

function generateRandomColor () {
  const characters = '0123456789ABCDEDF'.split('');
  let hex = '#';
  
  for (var i = 0; i < 6; i++) {
    hex += characters[Math.floor(Math.random() * 16)];
  }
  return hex;
};

function toggleLock () {
  $(this).toggleClass('locked');
  let src = ($(this).attr('src') === './assets/unlock.svg') ? './assets/locked.svg' : './assets/unlock.svg'

  $(this).attr('src', src);
}

function savePalette (event) {
  event.preventDefault();
  let paletteInput = $('.palette-input').val();

  $('.saved-projects').append(`<h3>${paletteInput}</h3>`);
  $('.palette-input').val('')
}