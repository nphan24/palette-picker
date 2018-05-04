exports.seed = function(knex, Promise) {
  return knex('palettes')
    .del()
    .then(() => {
      return knex('projects').del();
    })
    .then(() => {
      return Promise.all([
        knex('projects')
          .insert([{ name: 'project1' }, 
            { name: 'project2' }, 
            { name: 'project3'}], 
          'id')
          .then(projects => {
            return knex('palettes').insert([
              {
                id: 1,
                name: 'spring',
                project_id: projects[0],
                color1: '#0000FF',
                color2: '#FF0000',
                color3: '#FFA500',
                color4: '#FFFF00',
                color5: '#008000'
              },
              {
                id: 2,
                name: 'fall',
                project_id: projects[0],
                color1: '#ffffff',
                color2: '#000000',
                color3: '#800080',
                color4: '#76eec6',
                color5: '#ff4040'
              }
            ]);
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
