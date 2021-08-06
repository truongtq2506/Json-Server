const queryString = require('query-string')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
    req.body.updateAt = Date.now()
  } else if (req.method === 'PATCH') {
    req.body.updateAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  console.log(req)
  // check GET with pagination
  // if yes, custom output
  const headers = res.getHeaders()
  const totalCountHeader = headers['x-total-count']
  if (req.method === 'GET' && totalCountHeader) {
    const queryParam = queryString.parse(req._parsedUrl.query)
    console.log({ queryParam })

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParam._page) || 1,
        _limit: Number.parseInt(queryParam._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    }
    return res.json(result)
  }
  //Otherwhise return default behavor
  res.jsonp({
    body: res.locals.data,
  })
}
// Use default router
server.use('/api', router) // ** run when url have /api

// start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running')
})
