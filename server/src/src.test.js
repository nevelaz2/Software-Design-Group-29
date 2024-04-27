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

    test("Testing GET Endpoint (/compare-password): It should respond with Status 200 with a true value", async () => {
        const response = await request(Server).get("/compare-password").query({
          username: "fish",
          password: "fishfish",
        });
        expect(response.status).toBe(200);
      });
  
      test("Testing GET Endpoint (/compare-password): It should respond with Status 200 with a false value", async () => {
        const response = await request(Server).get("/compare-password").query({
          username: "fish",
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
      const response = await request(Server).get("/user/profile/billy123");
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
    test("GET /user/profileinfo/:username should retrieve user data successfully", async () => {
        const mockUserData = {
          username: "existingUser",
          email: "user@example.com",
          toObject: jest.fn(() => ({ username: "existingUser", email: "user@example.com" }))
        };
  
        jest.spyOn(UserData, 'findOne').mockResolvedValue(mockUserData); // Simulate finding user data
        const response = await request(Server).get("/user/profileinfo/existingUser");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ username: "existingUser", email: "user@example.com" });
        expect(mockUserData.toObject).toHaveBeenCalled();  // Ensure toObject was called to simulate successful data retrieval
        jest.clearAllMocks();  // Reset mocks after test
      });
      test("Testing PUT Endpoint (/profile/:username) with full correct data should update successfully", async () => {
        jest.spyOn(UserCred, 'findOne').mockResolvedValue({
          Username: "existingUsername1",
          toObject: () => ({ UserID: '1234', Password: '' }),
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
          address1: "123 Main St",
          address2: "Suite 100",
          city: "Metropolis",
          state: "MT",
          zip: "12345",
          password: "newPassword123"
        };
        const response = await request(Server).put("/user/profile/existingUsername1").send(profileData);
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

    test("Testing PUT Endpoint (/user/profile/:username) with non-existent user should return 404", async () => {
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
    test("GET /user/profile/:username should handle database errors", async () => {
        jest.spyOn(UserCred, 'findOne').mockRejectedValue(new Error("Database error"));
        const response = await request(Server).get("/user/profile/nonexistentuser");
        expect(response.status).toBe(500);
        expect(response.text).toContain("Database error");
        jest.clearAllMocks();  // Reset mocks after test
      });
  
      test("GET /user/profileinfo/:username should handle database errors", async () => {
        jest.spyOn(UserData, 'findOne').mockRejectedValue(new Error("Database error"));
        const response = await request(Server).get("/user/profileinfo/existingUsername");
        expect(response.status).toBe(500);
        expect(response.text).toContain("Database error");
        jest.clearAllMocks();  // Reset mocks after test
      });
  
      test("PUT /user/profile/:username should handle missing user info", async () => {
        jest.spyOn(UserCred, 'findOne').mockResolvedValue({
          Username: "existingUsername",
          UserID: "123",
          toObject: () => ({ UserID: "123" })
        });
        jest.spyOn(UserData, 'findOne').mockResolvedValue(null);  // Simulate no user info found
        const profileData = {
          fullname: "Does Not Exist",
          address1: "404 Not Found St",
          city: "Nowhere",
          state: "NO",
          zip: "00000"
        };
        const response = await request(Server).put("/user/profile/existingUsername").send(profileData);
        expect(response.status).toBe(404);
        expect(response.text).toBe("User_Info not found");
        jest.clearAllMocks();  // Reset mocks after test
      });
      //New test cases for 19-20
      test("GET /user/profile/:username with no user found should return 404", async () => {
        jest.spyOn(UserCred, 'findOne').mockResolvedValue(null);
        const response = await request(Server).get("/user/profile/nonexistentusername");
        expect(response.status).toBe(404);
        expect(response.text).toBe("User not found");
        jest.clearAllMocks();  // Reset mocks after test
      });

      //New test case for 35-36
      test("GET /user/profileinfo/:username with no user data found should return userExists false", async () => {
        jest.spyOn(UserData, 'findOne').mockResolvedValue(null);
        const response = await request(Server).get("/user/profileinfo/nonexistentusername");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ userExists: "false" });
        jest.clearAllMocks();  // Reset mocks after test
      });
      

      //Test case for line 68
      test("PUT /user/profile/:username should update user's full name when provided", async () => {
        // Setting up mocks to simulate a successful user lookup and data update
        const existingUser = {
          Username: "testUser",
          UserID: "user123",
          toObject: () => ({ UserID: "user123" }),
          save: jest.fn() // Mock save function since it's called in the code
        };
  
        const existingUserInfo = {
          FullName: '',
          Address1: '',
          Address2: '',
          City: '',
          State: '',
          Zip: '',
          username: 'testUser',
          save: jest.fn() // Mock save function since it's called in the code
        };
  
        // Mock the findOne call for UserCred and UserData
        jest.spyOn(UserCred, 'findOne').mockResolvedValue(existingUser);
        jest.spyOn(UserData, 'findOne').mockResolvedValue(existingUserInfo);
  
        // The data to send in the request
        const updateData = {
          fullname: "Updated Full Name", // This is the 'name' that should trigger the if block
          address1: "123 New St",
          city: "New City",
          state: "NS",
          zip: "10001"
        };
  
        const response = await request(Server).put("/user/profile/testUser").send(updateData);
  
        expect(response.status).toBe(200);
        expect(response.text).toBe("User profile updated successfully");
        expect(existingUserInfo.FullName).toBe("Updated Full Name"); // Verify FullName was updated
        expect(existingUserInfo.save).toHaveBeenCalled(); // Verify that save was called
        jest.clearAllMocks();  // Reset mocks after test
      });
  });

  describe("PricingRouter API", () => {
    describe("Successful API Endpoints", () => {
      test("Testing GET Endpoint (/getpricing): It should calculate and return the pricing", async () => {
        const response = await request(Server).get("/getpricing").query({
          gallonsRequested: 500,
          existingCustomer: true,
          Location: "TX"
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('suggestedPrice');
        expect(response.body).toHaveProperty('totalDue');
      });
    });
  
    describe("Unsuccessful API Endpoints", () => {
      test("Testing GET Endpoint (/getpricing) with missing fields: It should return Status 400", async () => {
        const response = await request(Server).get("/getpricing").query({
          // Missing gallonsRequested and existingCustomer
          Location: "TX"
        });
        expect(response.status).toBe(400);
        expect(response.text).toBe("Missing required fields.");
      });
  
      test("Testing GET Endpoint (/getpricing) with internal error: It should return Status 500", async () => {
        // Mock calculateSuggestedPrice to throw an error
        jest.spyOn(global, 'calculateSuggestedPrice').mockImplementation(() => {
          throw new Error("Internal server error");
        });
  
        const response = await request(Server).get("/getpricing").query({
          gallonsRequested: 500,
          existingCustomer: true,
          Location: "TX"
        });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Internal server error");
  
        jest.restoreAllMocks(); // Restore original implementation after test
      });
    });
  });
  describe('PricingModule API', () => {
    test('should calculate pricing with location TX, has history, and gallons over 1000', async () => {
      const response = await request(Server).get('/getpricing').query({
        gallonsRequested: 1500,
        existingCustomer: true,
        Location: 'TX'
      });
      expect(response.status).toBe(200);
      expect(response.body.suggestedPrice).toBeDefined();
      expect(response.body.totalDue).toBeGreaterThan(0);
    });
  
    test('should calculate pricing with non-TX location, no history, and gallons under 1000', async () => {
      const response = await request(Server).get('/getpricing').query({
        gallonsRequested: 500,
        existingCustomer: false,
        Location: 'OK'
      });
      expect(response.status).toBe(200);
      expect(response.body.suggestedPrice).toBeDefined();
      expect(response.body.totalDue).toBeGreaterThan(0);
    });
  
    test('should handle missing required fields', async () => {
      const response = await request(Server).get('/getpricing').query({
        gallonsRequested: 500,
        // existingCustomer not provided
        Location: 'TX'
      });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Missing required fields.");
    });
  });
  
});
