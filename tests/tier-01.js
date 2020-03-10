'use strict'

// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// User Model
const db = require('../server/db/models')
const User = db.model('user')
// Product Model
const Product = db.model('product')

// User Routes
const app = require('../server/index')
const agent = require('supertest')(app)

describe('Tier One', () => {
  // defined in ../server/models/user.js
  describe('User model', () => {
    describe('Validations', () => {
      it('requires `name`', async () => {
        const user = User.build()

        try {
          await user.validate()
          throw Error(
            'validation was successful but should have failed without `name`'
          )
        } catch (err) {
          expect(err.message).to.contain('name cannot be null')
        }
      })

      it('requires `name` to not be an empty string', async () => {
        const user = User.build({
          name: ''
        })

        try {
          await user.validate()
          throw Error(
            'validation was successful but should have failed if name is an empty string'
          )
        } catch (err) {
          expect(err.message).to.contain('Validation error')
          /* handle error */
        }
      })
    })
  })

  // defined in ../server/models/product.js
  describe('Product model', () => {
    describe('Validations', () => {
      it('requires `name`', async () => {
        const user = Product.build()

        try {
          await user.validate()
          throw Error(
            'validation was successful but should have failed without `name`'
          )
        } catch (err) {
          expect(err.message).to.contain('name cannot be null')
        }
      })

      it('requires `name` to not be an empty string', async () => {
        const product = Product.build({
          name: ''
        })

        try {
          await product.validate()
          throw Error(
            'validation was successful but should have failed if name is an empty string'
          )
        } catch (err) {
          expect(err.message).to.contain('Validation error')
          /* handle error */
        }
      })
    })
  })

  // defined in ../server/routes/campuses.js
  describe('Product routes', () => {
    let storedProducts

    const productData = [
      {
        name: 'Test Product #1',
        price: 10
      },
      {
        name: 'Test Product #2',
        price: 20
      }
    ]

    beforeEach(async () => {
      const createdProducts = await Product.bulkCreate(productData)
      storedProducts = createdProducts.map(product => product.dataValues)
    })

    // Route for fetching all campuses
    describe('GET `/api/products`', () => {
      it('serves up all Products', async () => {
        const response = await agent.get('/api/products').expect(200)
        expect(response.body).to.have.length(2)
        expect(response.body[0].name).to.equal(storedProducts[0].name)
      })
    })

    // Route for fetching a single campus
    describe('GET `/api/products/:id`', () => {
      it('serves up a single Campus by its `id`', async () => {
        const response = await agent.get('/api/campuses/2').expect(200)
        expect(response.body.name).to.equal('Test Product #2')
      })
    })
  })
})
