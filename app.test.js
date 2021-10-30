'use strict';

const request = require('supertest');
const app = require('./app');

describe('Testing all the POST services',() => {
    
    test("POST /User Check Status Code", async () => {
        const response = await request(app)
        .post("/User")
        .send({
                User: "username",
            })
        expect(response.statusCode).toBe(200)
      })




    test("POST /User Check Content-type", async () => {
        const response = await request(app)
        .post("/User")
        .send({
            User: "username",
        })
        expect(response.headers['content-type'])
        .toEqual(expect.stringContaining("json"))
      })

    test("POST /register Check Status Code", async ()=>{
        const response = await request(app)
        .post("/register")
        .send({
          regUsername: "testUsername",
          regEmail: "testEmail",
          regPassword: "testPassword",
          regConfPassword: "testConfPassword"

        })
        expect(response.statusCode).toBe(200)
    })

    test("POST /comment/add Check Content-type", async ()=>{
        const response = await request(app)
        .post("/comment/add")
        .send({
          customerName: "JesttestUsername",
          customerEmail: "JestTestEmail",
          newComment: "This is a Jest Comment test",
          
        })
        expect(response.headers['content-type'])
        .toEqual(expect.stringContaining("json"))
    })

    test("POST /comment/add Check Status Code", async ()=>{
        const response = await request(app)
        .post("/comment/add")
        .send({
          customerName: "JesttestUsername",
          customerEmail: "JestTestEmail",
          newComment: "This is a Jest Comment test",
          
        })
        expect(response.statusCode).toBe(200)
    })

    

    test("POST /register Check Content-type", async ()=>{
        const response = await request(app)
        .post("/register")
        .send({
          regUsername: "testUsername",
          regEmail: "testEmail",
          regPassword: "testPassword",
          regConfPassword: "testConfPassword"
        })
        expect(response.headers['content-type'])
        .toEqual(expect.stringContaining("json"))
    })

    

    


    test("POST /addToCart/newEntry Check Content-type", async ()=>{
        const response = await request(app)
        .post("/addToCart/newEntry")
        .send({
          food: "JesttestFood",
          quantity: 2,
        })
        expect(response.headers['content-type'])
        .toEqual(expect.stringContaining("json"))
    })

    test("POST /addToCart/changeJSON Check Content-type", async ()=>{
        const response = await request(app)
        .post("/addToCart/changeJSON")
        .send({
          food: "JesttestFood",
          quantity: 2,
        })
        expect(response.headers['content-type'])
        .toEqual(expect.stringContaining("json"))
    })

    test("POST /addToCart/changeJSON Compare Expected/Received Response", async ()=>{
        const response = await request(app)
        .post("/addToCart/changeJSON")
        .send({
          food: "JesttestFood",
          quantity: 2,
        })
        .expect(200)
        .then((response) => {
			expect(response.body[0].food).toBe('JesttestFood')
            expect(response.body[0].quantity).toBe(2)
		})
    })

});


describe('Testing all the GET services',() => {
    
    test('GET /list Check Status Code',() => {
        return request(app)
        .get('/list')
        .expect(200);
    });

    test('GET /list Check Content-type',() => {
        return request(app)
        .get('/list')
        .expect('Content-type', /json/);
    });

    test('GET /checkout/order Check Status Code',() => {
        return request(app)
        .get('/checkout/order')
        .expect(200);
    });

    test('GET /checkout/order Check Content-type',() => {
        return request(app)
        .get('/checkout/order')
        .expect('Content-type', /json/);
    });

    test('GET /userDatabase Check Content-type',()=> {
        return request(app)
        .get('/userDatabase')
        .expect('Content-type', /json/);
    })

    test('GET /userDatabase Compare Expected/Received Response', async ()=> {

        return request(app)
        .get('/userDatabase')
        .expect(200)
        .then((response) => {
			expect(response.body[0].user).toBe('William')
            expect(response.body[0].userEmail).toBe("william@example.com")
            expect(response.body[0].password).toBe("123")
            
		})
    })
   
    test("GET /CurrentUserInfo Check Content-type",() => {
        return request(app)
        .get('/CurrentUserInfo')
        .expect('Content-type', /json/);
    });

    test("GET /CurrentUserInfo Check Expected/Received Response",() => {
        return request(app)
        .get('/CurrentUserInfo')
        .expect(200)
        .then((response) => {
			expect(response.body).toBe('username')    
		})
    });

    test('GET /comment succeeds Check Content-type',()=> {
        return request(app)
        .get('/comment')
        .expect('Content-type', /json/);
    });

    test('GET /comment succeeds Check Expected/Received Response',()=> {
        return request(app)
        .get('/comment')
        .expect(200)
        .then((response) => {
			expect(response.body[0].comment).toBe(' goooooood')
            expect(response.body[0].customer).toBe("vincent")
            expect(response.body[0].email).toBe("zhnehaozhao46@gmial.com")
		})
    })

    test('GET /addToCart succeeds Check Content-type',()=> {
        return request(app)
        .get('/comment')
        .expect('Content-type', /json/);
    });

});