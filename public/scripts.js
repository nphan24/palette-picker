$('document').ready(setRandomColor);
$('.generate-button').on('click', setRandomColor);
$('.unlocked').on('click', toggleLock);
$('.save-button').on('click', savePalette);
$('.save-project-button').on('click', createProject);
$('.saved-projects').on('click', '.trash-icon', deletePalette);

let hexArray = [];

function setRandomColor () {
  const colorPalette = [$('.box-one'), $('.box-two'), $('.box-three'), $('.box-four'), $('.box-five')];
  
  colorPalette.forEach(color => {
    if (!color.children('img').hasClass('locked')) { 
    let randomColorHex = generateRandomColor();

    color.siblings('p').text(randomColorHex);
    color.css('background-color', randomColorHex);
  }})
};

function generateRandomColor () {
  const characters = '0123456789ABCDEDF'.split('');
  let hex = '#';
  
  for (var i = 0; i < 6; i++) {
    hex += characters[Math.floor(Math.random() * 16)];
  }
  hexArray.push(hex);
  return hex;
};

function toggleLock () {
  $(this).toggleClass('locked');
  let src = ($(this).attr('src') === './assets/unlock.svg') ? './assets/locked.svg' : './assets/unlock.svg'

  $(this).attr('src', src);
};

function savePalette (event) {
  event.preventDefault();
  let paletteInput = $('.palette-input').val();

  $('.saved-projects').append(`
    <div class='palette'>
      <h3 class='saved-palette-name'>${paletteInput}</h3>
      <img src='./assets/trash.svg' alt='trash' class='trash-icon'/>
      <div class='palette-to-append'>
        <div class='small-palette' style='background-color: ${hexArray[0]}'></div>
        <div class='small-palette' style='background-color: ${hexArray[1]}'></div>
        <div class='small-palette' style='background-color: ${hexArray[2]}'></div>
        <div class='small-palette' style='background-color: ${hexArray[3]}'></div>
        <div class='small-palette' style='background-color: ${hexArray[4]}'></div>
      </div>
    </div>
  `);

  $('.palette-input').val('');
  hexArray = [];
};

function createProject (event) {
  event.preventDefault();
  let projectInput = $('.project-input').val();

  $('.project-dropdown').append(`
    <option value='${projectInput}'>${projectInput}</option>
  `);
  $('.saved-projects').append(`
    <div class='project-files'>
      <h2 class='saved-projects-title'>${projectInput}</h2>
    </div>`
  );
  $('.project-input').val('');
};

function deletePalette() {
  $(this).parent().remove();
}