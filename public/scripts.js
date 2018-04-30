generateRandomColor();

const palatteArray = [];

function generateRandomColor () {
  const characters = '0123456789ABCDEDF'.split('');
  let hex = '#';

  for (var i = 0; i < 6; i++) {
    hex += characters[Math.floor(Math.random() * 16)];
  }  
  console.log(hex);
  return hex;
};

$('.generate-button').on('click', generateRandomColor);