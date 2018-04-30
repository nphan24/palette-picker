$('document').ready(setRandomColor);

$('.generate-button').on('click', setRandomColor);

function setRandomColor () {
  const colorPalatte = [$('.box-one'), $('.box-two'), $('.box-three'), $('.box-four'), $('.box-five')];
  
  colorPalatte.forEach((color, i) => {
    let randomColorHex = generateRandomColor();

    color.siblings('p').text(randomColorHex);
    color.css('background-color', randomColorHex);
  });
}

function generateRandomColor () {
  const characters = '0123456789ABCDEDF'.split('');
  let hex = '#';
  
  for (var i = 0; i < 6; i++) {
    hex += characters[Math.floor(Math.random() * 16)];
  }
  return hex;
};

