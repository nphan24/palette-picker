fetchProjects();
$('document').ready(setRandomColor);
$('.generate-button').on('click', setRandomColor);
$('.unlocked').on('click', toggleLock);
$('.save-button').on('click', savePalette);
$('.save-project-button').on('click', createProject);
$('.saved-projects').on('click', '.trash-icon', deletePalette);
$('.saved-projects').on('click', '.project-trash', deleteProject);

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

async function fetchProjects () {
  try {
  let response = await fetch('/api/v1/projects');
  let projectsArray = await response.json();

  console.log('projects', projectsArray);
  displayProjects(projectsArray);
  return projectsArray
  } catch (error) {
    console.log('Unable to fetch projects', error)
  }
}

function displayProjects(array) {
  array.forEach(project => {
    $('.project-dropdown').append(`<option value='${project.name}'>${project.name}</option>`);
    $('.saved-projects').append(`
      <div class='project-files'>
        <h2 class='saved-projects-title'>${project.name}</h2>
        <img class='project-trash' src='./assets/trash.svg' alt='trash'/>
      </div>`);
  });
}

function toggleLock () {
  $(this).toggleClass('locked');
  let src = ($(this).attr('src') === './assets/unlock.svg') ? './assets/locked.svg' : './assets/unlock.svg'

  $(this).attr('src', src);
};

async function savePalette (event) {
  event.preventDefault();
  let paletteInput = $('.palette-input').val();
  let projectId = $('select').val();
  let response = await fetch('/api/v1/projects');
  let projects = await response.json();

  project_id = projects.find(project => project.name === projectId).id

  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify({
      name: paletteInput,
      color1: hexArray[0],
      color2: hexArray[1],
      color3: hexArray[2],
      color4: hexArray[3],
      color5: hexArray[4],
      project_id: project_id
    }),
    headers: { 'Content-Type': 'application/json' }
  });

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
};

function createProject (event) {
  event.preventDefault();
  let projectInput = $('.project-input').val();

  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: projectInput }),
    headers: { 'Content-Type': 'application/json' }
  });

  // $('.project-dropdown').append(`
  //   <option value='${projectInput}'>${projectInput}</option>
  //   `);
  // $('.saved-projects').append(`
  //   <div class='project-files'>
  //     <h2 class='saved-projects-title'>${projectInput}</h2>
  //     <img class='project-trash' src='./assets/trash.svg' alt='trash'/>
  //   </div>`
  // );
  $('.project-input').val('');
};

function deletePalette() {
  const paletteToDelete = $(this).parent();

  paletteToDelete.remove();
  fetch('/api/v1/palettes', {
    method: 'DELETE',
    body: JSON.stringify({ id: paletteToDelete }),
    headers: {'Content-Type': 'application/json'},
  })
}

function deleteProject() {
  const projectToDelete = $(this).parent();

  projectToDelete.remove();
  
}