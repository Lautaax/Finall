import chai from "chai"
import supertest from "supertest"
import { cartdbManager } from "../../src/dao/dbManagers/cartdbManager";
const expect = chai.expect;

supertest()

describe("Set de pruebas para los productos", function () {
    this.timeout(10000)
    before(function () {
        mongoose.connect(dbUrl)

        this.productId = ''
        this.productsDao = cartdbManager
    });
    
})