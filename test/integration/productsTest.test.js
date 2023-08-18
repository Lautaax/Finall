import chai from 'chai'
import supertest from 'supertest'

//import config from '../../src/config'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Integration Test suite for Products router', function () {
  this.timeout(10000)
  this.productId = ''


    it('/api/products (GET) returns an array of products', async function () {
      const { statusCode, ok, _body } = await requester.get('/api/products')

      expect(statusCode).to.be.ok.and.eq(200)
      expect(_body.payload).to.have.property('docs')
      expect(ok).to.be.ok
    })

    it('Endpoint /api/products/:pid (GET) returns expected product with valid product ID input', async function () {
      const { statusCode, ok, _body } = await requester.get(
        `/api/products/64b45c1e2e71b72e3bb2ecd9`
      )

      expect(statusCode).to.be.ok.and.eq(200)
      expect(_body.payload._id).to.be.eq("64b45c1e2e71b72e3bb2ecd9")
      expect(ok).to.be.ok
    })
  

  //   it('Endpoint /api/products/:pid (DELETE) deletes a product successfully with valid product ID input', async function () {
  //     const { statusCode, ok, _body } = await requester
  //       .delete(`/api/v1/products/${this.productId}`)
  //     //  .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

  //     expect(statusCode).to.be.ok.and.eq(200)
  //     expect(_body.payload).to.have.property('deletedCount').eq(1)
  //     expect(ok).to.be.ok
  //   })
})