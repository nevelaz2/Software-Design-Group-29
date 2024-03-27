const express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const request = require("supertest");
const FuelQuoteModule = require("./FuelQuoteModule");
const LoginModule = require("./LoginModule");
const ProfileModule = require("./ProfileModule");
const { default: mongoose } = require("mongoose");

const Server = express();
const Port = 3001;

const DataBaseURI =
  "mongodb+srv://username:password@atlascluster.ckxw4ub.mongodb.net/Testing2?retryWrites=true&w=majority&appName=AtlasCluster";
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

// Successful FuelQuoteModule Test Cases
describe('Successful HTTP tests of FuelQuoteModule API', () => {
    test('HTTP POST (/quote): It should respond with Status 200 and confirmation text', async () => {
        const response = await request(Server)
            .post('/quote')
            .send({
                userId: "65fbe80527c64e93442f1c01",
                gallonsRequested: 100,
                deliveryDate: "2024-03-25",
                pricePerGallon: 2.5,
            })
        expect(response.status).toBe(200);
        expect(response.text).toBe('Quote created successfully!')
    })

    test('HTTP GET (/quote/history/:userId): It should respond with Status 200', async () => {
        const response = await request(Server)
            .get('/quote/history/65fbe80527c64e93442f1c01')
        expect(response.status).toBe(200);
    })

    test('HTTP GET (/quote/filter): It should respond with Status 200', async () => {
        const response = await request(Server)
            .get('/quote/filter')
            .query({
                userId: "65fbe80527c64e93442f1c01",
                startDate: "2024-01-01",
                endDate: "2024-03-21",
                minGallons: 50,
                maxGallons: 150
            })
        expect(response.status).toBe(200);
    })

    test('HTTP GET (/quote/filter): It should respond with Status 200', async () => {
        const response = await request(Server)
            .get('/quote/filter')
            .query({
                minGallons: 50,
                maxGallons: 150
            })
        expect(response.status).toBe(200);
    })
})

// Unsuccessful FuelQuoteModule Test Cases
describe('Unsuccessful HTTP POST of FuelQuoteModule API', () =>{
    test('HTTP POST (/quote): It should respond with Status 400 and reason message', async () => {
        const response = await request(Server)
            .post('/quote')
            .send({
                userId: "65fbe80527c64e93442f1c01",
                gallonsRequested: 100,
                pricePerGallon: 2.5,
            })
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields')
    })

    test('HTTP POST (/quote): It should respond with Status 500 and error message', async () => {
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
})

describe('Unsuccessful HTTP GET of FuelQuoteModule API', () => {
    test('HTTP GET (/quote/history/:userId): It should respond with Status 500 and error message', async () => {
        const response = await request(Server)
            .get('/quote/history/84')
        expect(response.status).toBe(500);
        expect(() => {
            if(response.error) throw new Error('Error occurred: '+ response.error)
        }).toThrow();
    })

    test('HTTP GET (/quote/filter): It should respond with Status 500 and error message', async () => {
        const response = await request(Server)
            .get('/quote/filter')
            .query({
                userId: "3",
                startDate: "2024-01-01",
                endDate: "2024-03-21"
            })
        expect(response.status).toBe(500);
    })
})

// Successful LoginModule Test Cases
describe('Successful HTTP tests of LoginModule API', () => {
    test('HTTP POST (/createuserdata): It should respond with Status 200 and confirmation text', async () => {
        const response = await request(Server)
            .post('/createuserdata')
            .send({
                username: "billy123",
                password: "milly321"
            })
        expect(response.status).toBe(200)
        expect(response.text).toBe('User data has been created')
    })

    test('HTTP GET (/finduser): It should respond with Status 200 with true and username', async () => {
        const response = await request(Server)
            .get('/finduser')
            .query({
                username: "TestingName"
            })
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ found: 'true', username: 'TestingName' })
    })

    test('HTTP GET (/finduser): It should respond with Status 200 and false', async () => {
        const response = await request(Server)
            .get('/finduser')
            .query({
                username: "NameTesting"
            })
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ found: 'false' })
    })

    test('HTTP GET (/compare-password): It should respond with Status 200 with a true value', async () => {
        const response = await request(Server)
            .get('/compare-password')
            .query({
                username: "billy123",
                password: "milly321"
            })
        expect(response.status).toBe(200)
        expect(response.text).toBe("true")
    })

    test('HTTP GET (/compare-password): It should respond with Status 200 with a false value', async () => {
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

// Unsuccessful LoginModule Test Cases
describe('Unsuccessful HTTP POST of LoginModule API', () => {
    test('HTTP POST (/createuserdata): It should respond with Status 500 and error text', async () => {
        const response = await request(Server)
            .post('/createuserdata')
            .send({
                hello: false,
                password: "milly321"
            })
        expect(response.status).toBe(500)
        expect(response.text).toBe('An error occurred while creating user data')
    })
})

describe('Unsuccessful HTTP GET of LoginModule API', () => {
    test('HTTP GET (/compare-password): It should respond with Status 500 and error message', async () => {
        const response = await request(Server)
            .get('/compare-password')
            .query({
                hi: "false",
                password: "Some_PASSWORD"
            })
        expect(response.status).toBe(500)
        expect(() => {
            if(response.error) throw new Error('Error occurred: '+ response.error)
        }).toThrow();
    })
})

// Successful ProfileModule Test Cases
describe("Successful HTTP tests of ProfileModule API", () => {
    test("HTTP GET (/profile/:username): It should respond with Status 200", async () => {
        const response = await request(Server)
            .get("/profile/TestingName");
        expect(response.status).toBe(200);
    });

    test('HTTP PUT (/profile/:username): It should respond with Status 200', async () => {
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

    test('HTTP PUT (/profile/:username): It should respond with Status 200', async () => {
        const response = await request(Server)
            .put('/profile/TestingName')
            .send({})   //Sends empty data
        expect(response.status).toBe(200);
        expect(response.text).toBe("User profile updated successfully")
    })
})

// Unsuccessful ProfileModule Test Cases
describe("Unsuccessful HTTP GET of ProfileModule API", () => {
    test("HTTP GET (/profile/:username): It should respond with Status 404 and message", async () => {
        const response = await request(Server)
            .get("/profile/65f939da08b0fabfa3f161d7");
        expect(response.status).toBe(404);
        expect(response.text).toBe('User not found');
    });
})

describe("Unsuccessful HTTP GET of ProfileModule API", () => {
    test('HTTP PUT (/profile/:username): It should respond with Status 404 and message', async () => {
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
})