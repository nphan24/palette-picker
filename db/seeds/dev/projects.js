exports.seed = function(knex, Promise) {
  return (knex('projects')
    .del()
    .then(() => {
      return knex('palettes').del();
    })
    .then(() => {
      return Promise.all([
        knex('projects').insert(
        { id: 1, name: 'project1' },
        'id'
      )
    .then(palettes => {
      return knex('palettes').insert([
        {
          id: 1,
          name: 'warm colors',
          project_id: 1,
          color1: '#aaaaaa',
          color2: '#bbbbbb',
          color3: '#cccccc',
          color4: '#dddddd',
          color5: '#eeeeee'
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

