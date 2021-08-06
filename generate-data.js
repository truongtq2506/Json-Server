const faker = require('faker')
const fs = require('fs')

// set locale to use Vietnamese
faker.locale = 'vi'

// // Random data 
// console.log(faker.commerce.department())
// console.log(faker.commerce.productName())
// console.log(faker.commerce.productDescription())

// console.log(faker.random.uuid())
// console.log(faker.image.imageUrl())
// console.log(faker.name.findName())

const randomCategoryList = (n) => {
  if(n <=0 )return
  const categoriesList = []
   // loop and push category
    Array.from(new Array(n)).forEach(()=> {
      const category = {
        id: faker.random.uuid(),
        name: faker.commerce.department(),
        createAt: Date.now(),
        updateAt: Date.now(),
      }
      categoriesList.push(category)
    })
   return categoriesList
}
// ra
const randomProductList = (categoriesList, numberOfProduct) => {
  if(numberOfProduct <=0 )return
  const productList = []
  // random data
  for (const category of categoriesList){
    Array.from(new Array(numberOfProduct)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnailUrl: faker.image.imageUrl(200, 200),
        createAt: Date.now(),
        updateAt: Date.now(),
      }

    productList.push(product)
    })
  }
  return productList
}

// IIFE là viết tắt của Immediately Invoked Function Expression,
// có nghĩa là khởi tạo một function và thực thi nó ngay lập tức.
;(()=> {
  // random data fisrt

  const categoriesList = randomCategoryList(5)
  const productList = randomProductList(categoriesList, 6)

  // prepare db object
  const db = {
    categories: categoriesList,
    products: productList,
    profile: {
      name: 'max'
    },
  }
  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfull')
  })
})()
