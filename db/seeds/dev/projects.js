exports.seed = function(knex, Promise) {
  return (knex('palettes')
    .del()
    .then(() => {
      return knex('projects').del();
    })
    .then(() => {
      return Promise.all([
        knex('projects').insert([
        { name: 'project1' },
        { name: 'project2' },
        ],'id')
    .then(projects => {
      return knex('palettes').insert([
        {
          id: 1,
          name: 'spring',
          project_id: projects[0],
          color1: '#aaaaaa',
          color2: '#bbbbbb',
          color3: '#cccccc',
          color4: '#dddddd',
          color5: '#eeeeee'
        },
        {
          id: 2,
          name: 'fall',
          project_id: projects[0],
          color1: '#ffffff',
          color2: 'gggggg',
          color3: 'hhhhhh',
          color4: '#iiiiii',
          color5: '#jjjjjj'
        }
      ]);
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`))
    ]);
  })
  .catch(error => console.log(`Error seeding data: ${error}`))
  );
};

