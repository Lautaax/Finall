import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integración para modulo de sesiones", function () {
    describe("Set de pruebas para flujo de sesión", function () {
        let cookie;

        it("POST /api/sessions/register: Debe registrar un usuario correctamente", async function () {
            const mockUser = {
                first_name: "Mauricio",
                last_name: "Espinosa",
                email: "mau@correo.com",
                age: 45,
                password: "123",
                cart: faker.database.mongodbObjectId()
            };

          const result = await requester
                .post("/api/sessions/register")
                .send(mockUser);
            console.log(result)
        });

        it("POST /api/sessions/login: Debe loguear correctamente al usuario y devolver una cookie", async function () {
            const mockUser = {
                email: "correos2@com",
                password: "1234",
            };

            const result = await requester.post("/api/sessions/login").send(mockUser);
            //console.log(result);

            const cookieResult = result.headers["set-cookie"][0];

            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1],
            };

            expect(cookie.name).to.be.ok.and.eql("jwtCookie");
            expect(cookie.value).to.be.ok;
        });

        it("GET /api/sessions/current: Debe mostrar la información contenida dentro del JWT", async function () {

            const { _body } = await requester
                .get("/api/sessions/current")
                .set("Cookie", [`${cookie.name}=${cookie.value}`]);
            expect(_body.payload.email).to.be.eql("correos2@com");
            expect(_body.payload).to.be.ok
            expect(_body.status).to.be.eql("success")
        });
    });
});