const express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const request = require("supertest");
const FuelQuoteModule = require("./FuelQuoteModule");
const LoginModule = require("./LoginModule");
const ProfileModule = require("./ProfileModule");
const PricingRouter = require("./PricingRouter");
const UserData = require("../Data/UserData");
const UserCred = require("../Data/UserCredentialsData");

const { default: mongoose } = require("mongoose");
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
  if (serverInstance) await serverInstance.close();
});

Server.use(FuelQuoteModule);
Server.use(LoginModule);
Server.use(ProfileModule);
Server.use(PricingRouter);

describe("FuelQuoteModule API", () => {
  describe("Successful API Endpoints", () => {
    test("Testing POST Endpoint (/user/quote): It should respond with Status 200", async () => {
      const response = await request(Server).post("/user/quotes").send({
        gallonsRequested: 100,
        deliveryDate: "2024-03-25",
        location: "TX",
        hasHistory: true,
      });
      expect(response.status).toBe(200);
      expect(response.text).toBe("Quote created successfully!")
    });

    test("Testing GET Endpoint (/user/quote/history): It should respond with Status 200", async () => {
      const response = await request(Server).get("/user/quotes/history?").query({
        userId: "66171aa3ba32b8415ae70aa3"
      });
      expect(response.status).toBe(200);
    });
  });

  describe("Unsuccessful API Endpoints", () => {
    test("Testing POST Endpoint (/user/quotes): It should respond with Status 400 and reason message", async () => {
      const response = await request(Server).post("/user/quotes").send({
        gallonsRequested: 100,
        deliveryDate: "2024-03-25",
        hasHistory: true,
      });
      expect(response.status).toBe(400);
    });

    test("Testing POST Endpoint (/user/quotes): It should respond with Status 500 and error message", async () => {
      const response = await request(Server).post("/user/quotes").send({
        gallonsRequested: {},
        deliveryDate: "2024-03-25",
        location: "TX",
        hasHistory: true,
      });
      expect(response.status).toBe(500);
      expect(() => {
        if (response.error) throw new Error("Error occurred: " + response.error);
      }).toThrow();
    });

    test("Testing GET Endpoint (/user/quotes/history/): It should respond with Status 404 and error message", async () => {
      const response = await request(Server).get("/user/quotes/history/");
      expect(response.status).toBe(404);
      expect(() => {
        if (response.error) throw new Error("Error occurred: " + response.error);
      }).toThrow();
    });
  });
});

describe("LoginModule API", () => {
  describe("Successful API Endpoints", () => {
    test("Testing POST Endpoint (/createuserdata): It should respond with Status 200 and confirmation text", async () => {
      const response = await request(Server).post("/createuserdata").send({
        username: "billy123",
        password: "milly321",
      });
      expect(response.status).toBe(200);
      expect(response.text).toBe("User data has been created");
    });

    test("Testing GET Endpoint (/finduser): It should respond with Status 200 with true and username", async () => {
      const response = await request(Server).get("/finduser").query({
        username: "billy123",
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ found: "true", username: "billy123" });
    });

    test("Testing GET Endpoint (/finduser): It should respond with Status 200 and false", async () => {
      const response = await request(Server).get("/finduser").query({
        username: "TestingName",
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ found: "false" });
    });

    test("Testing GET Endpoint (/compare-password): It should respond with Status 200 with a true value", async () => {
      const response = await request(Server).get("/compare-password").query({
        username: "JB",
        password: "Hello World!",
      });
      expect(response.status).toBe(200);
    });

    test("Testing GET Endpoint (/compare-password): It should respond with Status 200 with a false value", async () => {
      const response = await request(Server).get("/compare-password").query({
        username: "billy123",
        password: "WRONG_PASSWORD",
      });
      expect(response.status).toBe(200);
      expect(response.text).toBe("false");
    });
  });

  describe("Unsuccessful API Endpoints", () => {
    test("Testing POST Endpoint (/createuserdata): It should respond with Status 500", async () => {
      const response = await request(Server).post("/createuserdata").send({
        hello: false,
        password: "milly321",
      });
      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred while creating user data");
    });

    test("Testing GET Endpoint (/compare-password): It should respond with Status 500 and error message", async () => {
      const response = await request(Server).get("/compare-password").query({
        hi: "false",
        password: "Some_PASSWORD",
      });
      expect(response.status).toBe(500);
      expect(() => {
        if (response.error) throw new Error("Error occurred: " + response.error);
      }).toThrow();
    });
  });
});

describe("ProfileModule API", () => {
  describe("Successful API Endpoints", () => {
    test("Testing GET Endpoint (/profile/:username): It should respond with Status 404", async () => {
      const response = await request(Server).get("/profile/billy123");
      expect(response.status).toBe(404);
    });

    test("Testing PUT Endpoint (/profile/:username) with full correct data should update successfully", async () => {
      jest.spyOn(UserCred, 'findOne').mockResolvedValue({
        Username: "existingUsername",
        toObject: () => ({ UserID: '123', Password: '' }),
        save: jest.fn()
      });
      jest.spyOn(UserData, 'findOne').mockResolvedValue({
        save: jest.fn(),
        FullName: '',
        Address1: '',
        Address2: '',
        City: '',
        State: '',
        Zip: '',
      });
      const profileData = {
        fullname: "Full Name",
        address1: "123 Main St",
        address2: "Suite 100",
        city: "Metropolis",
        state: "MT",
        zip: "12345",
        password: "newPassword123"
      };
      const response = await request(Server).put("/user/profile/existingUsername").send(profileData);
      expect(response.status).toBe(200);
      expect(response.text).toBe("User profile updated successfully");
    });
  });

  describe("Unsuccessful API Endpoints", () => {
    test("Testing GET Endpoint (/profile/:username) with invalid username should return 404 User not found", async () => {
      jest.spyOn(UserCred, 'findOne').mockResolvedValue(null); // Simulating user not found
      const response = await request(Server).get("/user/profile/invalidUsername");
      expect(response.status).toBe(404);
      expect(response.text).toBe("User not found");
    });

    test("Testing GET Endpoint (/user/profileinfo/:username) with valid username but no data should return userExists false", async () => {
      jest.spyOn(UserData, 'findOne').mockResolvedValue(null); // Simulating no user data found
      const response = await request(Server).get("/user/profileinfo/existingUsername");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ userExists: "false" });
    });

    test("Testing PUT Endpoint (/user/profile/:username) with missing fields should handle error", async () => {
      jest.spyOn(UserCred, 'findOne').mockResolvedValue({
        Username: "existingUsername",
        toObject: () => ({ UserID: '123' }),
        save: jest.fn()
      });
      jest.spyOn(UserData, 'findOne').mockResolvedValue({
        save: jest.fn(),
        FullName: '',
        Address1: '',
        Address2: '',
        City: '',
        State: '',
        Zip: '',
      });
      const partialData = {
        fullname: "Updated Name", // Missing other required fields like city, state, etc.
      };
      const response = await request(Server).put("/user/profile/existingUsername").send(partialData);
      expect(response.status).toBe(200);
      expect(response.text).toBe("User profile updated successfully");
    });

    test("Testing PUT Endpoint (/profile/:username) with non-existent user should return 404", async () => {
      jest.spyOn(UserCred, 'findOne').mockResolvedValue(null); // Simulating user not found
      const profileData = {
        fullname: "Does Not Exist",
        address1: "404 Not Found St",
        city: "Nowhere",
        state: "NO",
        zip: "00000"
      };
      const response = await request(Server).put("/user/profile/nonexistentuser").send(profileData);
      expect(response.status).toBe(404);
      expect(response.text).toBe("User not found");
    });

    test("GET /user/profileinfo/:username with database error should return 500", async () => {
      jest.spyOn(UserData, 'findOne').mockImplementationOnce(() => Promise.reject(new Error("Database error")));
      const response = await request(Server).get("/user/profileinfo/existingUsername");
      expect(response.status).toBe(500);
      expect(response.text).toContain("Database error");
    });
  });
});
