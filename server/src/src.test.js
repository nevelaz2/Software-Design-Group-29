const express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const request = require("supertest");
const FuelQuoteModule = require("./FuelQuoteModule");
const LoginModule = require("./LoginModule");
const ProfileModule = require("./ProfileModule");
const { default: mongoose } = require("mongoose");
const UserData = require("../Data/UserData");

const Server = express();
const Port = 3001;

const DataBaseURI =
  "mongodb+srv://Nikolas:Nikolas@atlascluster.ckxw4ub.mongodb.net/Testing2?retryWrites=true&w=majority&appName=AtlasCluster";
let serverInstance;

Server.use(Cors());
Server.use(BodyParser.json());

// Database Functions
beforeAll(async () => {
  await mongoose
    .connect(DataBaseURI)
    .then(() => {
      console.log("Connected to MongoDB");

      serverInstance = Server.listen(Port, "localhost", () => {
        console.log(`Listening on port ${Port}`);
      });
    })
    .catch((Error) => {
      console.log("Error:", Error);
    });
});

afterAll(async () => {
  await mongoose
    .disconnect()
    .then(() => {
      console.log("Disconnected from MongoDB");
    })
    .catch((error) => {
      console.log("Error occur while disconnecting from MongoDB", error);
    });
    if(serverInstance) await serverInstance.close();
});

Server.use(FuelQuoteModule);
Server.use(LoginModule);
Server.use(ProfileModule);

// FuelQuoteModule Test Cases
describe('FuelQuoteModule API', () => {
    describe('Successful HTTP tests', () =>{
        // HTTP POST
        test('HTTP POST: It should respond with Status 200 and confirmation text', async () => {
            const response = await request(Server)
                .post('/quote')
                .send({
                    userId: "65f939da08b0fabfa3f161d6",
                    gallonsRequested: 100,
                    deliveryDate: "2024-03-25",
                    pricePerGallon: 2.5,
                })
            expect(response.status).toBe(200);
            expect(response.text).toBe('Quote created successfully!')
        })

        // HTTP GET
        test('HTTP GET: It should respond with Status 200', async () => {
            const response = await request(Server)
                .get('/quote/history/65f939da08b0fabfa3f161d6')
            expect(response.status).toBe(200);
        })

        test('HTTP GET: It should respond with Status 200', async () => {
            const response = await request(Server)
                .get('/quote/filter')
                .query({
                    userId: "65f939da08b0fabfa3f161d6",
                    stateDate: "2024-01-01",
                    endDate: "2024-03-21",
                    minGallons: 50,
                    maxGallons: 150
                })
            expect(response.status).toBe(200);
        })
    })
    describe('Unsuccessful HTTP tests', () =>{
        // HTTP POST
        test('HTTP POST: It should respond with Status 400 and reason message', async () => {
            const response = await request(Server)
                .post('/quote')
                .send({
                    userId: "65f939da08b0fabfa3f161d6",
                    gallonsRequested: 100,
                    pricePerGallon: 2.5,
                })
            expect(response.status).toBe(400);
            expect(response.text).toBe('Missing required fields')
        })

        test('HTTP POST: It should respond with Status 500 and error message', async () => {
            const response = await request(Server)
                .post('/quote')
                .send({
                    userId: "1",
                    gallonsRequested: 100,
                    deliveryDate: "2024-03-25",
                    pricePerGallon: 2.5,
                })
            expect(response.status).toBe(500);
            expect(() => {
                if(response.error) throw new Error('Error occurred: '+ response.error)
            }).toThrow();
        })

        //HTTP GET
        test('HTTP GET: It should respond with Status 500 and error message', async () => {
            const response = await request(Server)
                .get('/quote/history/84')
            expect(response.status).toBe(500);
            expect(() => {
                if(response.error) throw new Error('Error occurred: '+ response.error)
            }).toThrow();
        })

        test('HTTP GET: It should respond with Status 500 and error message', async () => {
            const response = await request(Server)
                .get('/quote/filter')
                .query({
                    userId: "3",
                    stateDate: "2024-01-01",
                    endDate: "2024-03-21"
                })
            expect(response.status).toBe(500);
        })

        // test('HTTP GET: It should respond with Status 500 and error message', async () => {
        //     const response = await request(Server)
        //         .get('/quote/filter')
        //         .query({
        //             userId: "65f939da08b0fabfa3f161d6",
        //             stateDate: false
        //         })
        //     expect(response.status).toBe(500);
        // })
    })
})

// LoginModule Test Cases
describe('LoginModule API', () => {
    describe('Successful HTTP tests', () => {
        //HTTP POST
        test('HTTP POST: It should respond with Status 200 and confirmation text', async () => {
            const response = await request(Server)
                .post('/createuserdata')
                .send({
                    username: "billy123",
                    password: "milly321"
                })
            expect(response.status).toBe(200)
            expect(response.text).toBe('User data has been created')
        })

        //HTTP GET
        test('HTTP GET: It should respond with Status 200 with true and username', async () => {
            const response = await request(Server)
                .get('/finduser')
                .query({
                    username: "TestingName"
                })
            expect(response.status).toBe(200)
            expect(response.body).toEqual({ found: 'true', username: 'TestingName' })
        })

        test('HTTP GET: It should respond with Status 200 and false', async () => {
            const response = await request(Server)
                .get('/finduser')
                .query({
                    username: "NameTesting"
                })
            expect(response.status).toBe(200)
            expect(response.body).toEqual({ found: 'false' })
        })

        test('HTTP GET: It should respond with Status 200 with a true value', async () => {
            const response = await request(Server)
                .get('/compare-password')
                .query({
                    username: "billy123",
                    password: "milly321"
                })
            expect(response.status).toBe(200)
            expect(response.text).toBe("true")
        })

        test('HTTP GET: It should respond with Status 200 with a false value', async () => {
            const response = await request(Server)
                .get('/compare-password')
                .query({
                    username: "TestingName",
                    password: "WRONG_PASSWORD"
                })
            expect(response.status).toBe(200)
            expect(response.text).toBe("false")
        })
    })
    describe('Unsuccessful HTTP tests', () => {
        //HTTP POST
        test('HTTP POST: It should respond with Status 500 and error text', async () => {
            const response = await request(Server)
                .post('/createuserdata')
                .send({
                    hello: false,
                    password: "milly321"
                })
            expect(response.status).toBe(500)
            expect(response.text).toBe('An error occurred while creating user data')
        })

        //HTTP GET
        test('HTTP GET: It should respond with Status 500 and error message', async () => {
            const response = await request(Server)
                .get('/finduser')
                .query({
                    username: new Date()
                })
            expect(response.status).toBe(500)
            expect(response.text).tobe("TypeError: Cannot read properties of null (reading 'password')")
        })

        test('HTTP GET: It should respond with Status 500 and error message', async () => {
            const response = await request(Server)
                .get('/compare-password')
                .query({
                    hi: "false",
                    password: "Some_PASSWORD"
                })
            expect(response.status).toBe(500)
            expect(response.text).toBe("TypeError: Cannot read properties of null (reading 'password')")
        })
    })
})

// ProfileModule Test Cases
describe("ProfileModule API", () => {
    describe("Successful HTTP tests", () => {
        //HTTP GET
        test("HTTP GET: It should respond with Status 200", async () => {
            const response = await request(Server)
                .get("/profile/TestingName");
            expect(response.status).toBe(200);
        });

        // HTTP PUT
        test('HTTP PUT: It should respond with Status 200', async () => {
            const response = await request(Server)
                .put('/profile/TestingName')
                .send({
                    name: "alan",
                    address: "321 Far Rd",
                    country: "France",
                    password: "Hello World!"
                })
            expect(response.status).toBe(200);
            expect(response.text).toBe("User profile updated successfully")
        })
    })
    describe("Unsuccessful HTTP tests", () => {
        //HTTP GET
        test("HTTP GET: It should respond with Status 404 and message", async () => {
            const response = await request(Server)
                .get("/profile/65f939da08b0fabfa3f161d7");
            expect(response.status).toBe(404);
            expect(response.text).toBe('User not found');
        });

        test("HTTP GET: It should respond with Status 500 and error message", async () => {
            const response = await request(Server)
                .get("/profile/CoogsLover");
            expect(response.status).toBe(500);
            expect(() => {
                if(response.error) throw new Error('Error occurred: '+ response.error)
            }).toThrow();
        });

        //HTTP PUT
        test('HTTP PUT: It should respond with Status 404 and message', async () => {
            const response = await request(Server)
                .put('/profile/johncena')
                .send({
                    name: "alan",
                    address: "321 Far Rd",
                    country: "France",
                    password: "Hello World!"
                })
            expect(response.status).toBe(404);
            expect(response.text).toBe("User not found")
        })

        test('HTTP PUT: It should respond with Status 500 and error message', async () => {
            const response = await request(Server)
                .put('/profile/johncena')
            expect(response.status).toBe(500);
            expect(() => {
                if(response.error) throw new Error('Error occurred: '+ response.error)
            }).toThrow();
        })
    })
});

// SAMPLE LINE
// expect(response.body.gallonsRequested).toEqual(updatedData.gallonsRequested);