require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchName(searchTerm){
  return knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    });
}

function paginateProducts(pageNumber) {
  const productsPerPage =6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    });
}

function itemsAfterDate(daysAgo){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result => {
      console.log(result);
    });
}

function totalCost() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(results => {
      console.log(results)
    });
}

totalCost();