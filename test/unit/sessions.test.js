import chai from "chai";
import supertest from "supertest";
import { createHash } from "../../src/utils.js";
import { faker } from "@faker-js/faker";


const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integración para modulo de sesiones", function () {
  this.timeout(10000)
  it("POST /api/sessions/login: Debe loguear correctamente al usuario y devolver una cookie", async function () {
    const mockUser = {
      email: "correos2@com",
      password: "1234",
    };

    const result = await requester.post("/api/sessions/login").send(mockUser);
    //console.log(result);
    expect(result._body.payload).to.have.property("_id");
    expect(result.status).to.be.eql(200)
  });

  it("GET /api/sessions/current: Debe mostrar la información contenida dentro de la sesion", async function () {
    
    let result = await requester.get("/api/sessions/current");
   // console.log(result)
    expect(result.payload.email).to.be.eql("correos2@com");
    expect(result.status).to.be.eql(200)
  })
  describe("Set de pruebas para flujo de sesión", function () {
    // let cookie;

    // it("POST /api/sessions/register: Debe registrar un usuario correctamente", async function () {
    //   const mockUser = {
    //     first_name:"jose1",
    //     last_name:"Imhoff1",
    //     email:"jose1-imhoff@hotmail.com",
    //     age:24,
    //     password: createHash("123213"),
    //     cart:faker.database.mongodbObjectId(),
    //   }

    //   const result = await requester.post("/api/sessions/register").send(mockUser);
  
    //   expect(result.status).to.be.eql(200)
    //   // expect(_body.payload).to.be.ok;
    // });

   
  });
});