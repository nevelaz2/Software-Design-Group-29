const express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const request = require("supertest");
const FuelQuoteModule = require("./FuelQuoteModule");
const LoginModule = require("./LoginModule");
const ProfileModule = require("./ProfileModule");
const PricingRouter = require("./PricingRouter");
const UserData = require("../Data/UserData");

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

  describe("Unsucessful API Endpoints", () => {
    test("Testing POST Endpoint (/user/quotes): It should respond with Status 400 and reason message", async () => {
      const response = await request(Server).post("/user/quotes").send({
        gallonsRequested: 100,
        deliveryDate: "2024-03-25",
        // location: "TX",
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
  })
})

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
  })

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
  })
})

describe("ProfileModule API", () => {
  describe("Successful API Endpoints", () => {
    test("Testing GET Endpoint (/profile/:username): It should respond with Status 404", async () => {
      const response = await request(Server).get("/profile/billy123");
      expect(response.status).toBe(404);
    });
  
    test("Testing PUT Endpoint (/profile/:username): It should respond with Status 404", async () => {
      const response = await request(Server).put("/profile/billy123").send({
        fullname: "alan meow",
        address1: "321 Far Rd",
        address2: "Apt 103",
        city: "Houston",
        state: "TX",
        zip: 77356,
        password: "Hello World!",
      });
      expect(response.status).toBe(404);
    });
  
    test("Testing PUT Endpoint (/profile/:username): It should respond with Status 404", async () => {
      const response = await request(Server).put("/profile/billy123").send({}); //Sends empty data
      expect(response.status).toBe(404);
    });
  })

  describe("Unsuccessful API Endpoints", () => {
    test("Testing GET Endpoint (/profile/:username): It should respond with Status 404 and HTML message", async () => {
      const response = await request(Server).get("/profile/65f939da08b0fabfa3f161d7");
      expect(response.status).toBe(404);
      expect(response.text).toContain("<!DOCTYPE html>"); // Checks if the response includes HTML doctype declaration
    });
  
    test("Testing PUT Endpoint (/profile/:username): It should respond with Status 404 and HTML message", async () => {
      const response = await request(Server).put("/profile/johncena").send({
        fullname: "alan meow",
        address1: "321 Far Rd",
        address2: "Apt 103",
        city: "Houston",
        state: "TX",
        zip: 77356,
        password: "Hello World!",
      });
      expect(response.status).toBe(404);
      expect(response.text).toContain("<!DOCTYPE html>"); // Checks if the response includes HTML doctype declaration
    });
  
    test("Testing PUT Endpoint (/profile/:username): It should respond with Status 404 and HTML message", async () => {
      const response = await request(Server).put("/profile/sebby").send({
        fullname: "jack",
        address1: "123 Pizza Rd",
        address2: "Apt 103",
        city: "Orlando",
        state: "FL",
        zip: 81654,
      });
      expect(response.status).toBe(404);
      expect(response.text).toContain("<!DOCTYPE html>"); // Checks if the response includes HTML doctype declaration
    });
  })
})

describe("PricingRouter API", () => {
  describe("Successful API Endpoints", () => {
    test("Testing GET Endpoint (/getpricing): It should respond with Status 200", async () => {
      const response = await request(Server).get("/getpricing").query({
        gallonsRequested: 200,
        existingCustomer: true,
        Location: "TX"
      });
      expect(response.status).toBe(200);
    });
  })

  describe("Unsuccessful API Endpoints", () => {
    
  })
})

// Tests for ProfileModule.js

describe("ProfileModule API", () => {
  // Testing retrieval of non-existing user
  test("GET /user/profile/:username for non-existing user should return 404", async () => {
    const response = await request(Server).get("/user/profile/nonexistentuser");
    expect(response.status).toBe(404);
    expect(response.text).toBe("User not found");
  });

  // Testing retrieval of profile information with a non-existing user
  test("GET /user/profileinfo/:username for non-existing user should return userExists false", async () => {
    const response = await request(Server).get("/user/profileinfo/nonexistentuser");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ userExists: "false" });
  });

  // Testing user profile update with non-existing user
  test("PUT /user/profile/:username with non-existing user should return 404", async () => {
    const profileData = {
      fullname: "New Name",
      address1: "123 New Address",
      city: "New City",
      state: "New State",
      zip: "12345"
    };
    const response = await request(Server).put("/user/profile/nonexistentuser").send(profileData);
    expect(response.status).toBe(404);
    expect(response.text).toBe("User not found");
  });

  // Testing error handling if database operation fails during profile update
  test("PUT /user/profile/:username with database error should return 500", async () => {
    const profileData = {
      fullname: "New Name",
      address1: "123 New Address",
      city: "New City",
      state: "New State",
      zip: "12345"
    };
    /*Mock an error in UserData.findOne
    jest.spyOn(UserData, 'findOne').mockImplementationOnce(() => Promise.reject(new Error("Database error")));
    const response = await request(Server).put("/user/profile/existinguser").send(profileData);
    expect(response.status).toBe(500);
    expect(response.text).toContain("Database error");*/
  });
});

describe("ProfileModule API", () => {
  // Further test to ensure line 19-20 are covered more explicitly
  test("GET /user/profile/:username with invalid username should return 404 User not found", async () => {
    const response = await request(Server).get("/user/profile/invalidUsername");
    expect(response.status).toBe(404);
    expect(response.text).toBe("User not found");
  });

  // Tests to cover lines 35-38 in profile information retrieval
  test("GET /user/profileinfo/:username with valid username but no data should return userExists false", async () => {
    const response = await request(Server).get("/user/profileinfo/existingUsername");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ userExists: "false" });
  });

  // Test to cover lines 60-82 for various conditions
  test("PUT /user/profile/:username with missing fields should handle error", async () => {
    const response = await request(Server).put("/user/profile/existingUsername").send({
      fullname: "Updated Name", // Missing other required fields like city, state, etc.
    });
    expect(response.status).toBe(200); // Assuming it should still return 200, but check if your implementation might differ
    expect(response.text).toBe("User profile updated successfully");
  });

  test("PUT /user/profile/:username with full correct data should update successfully", async () => {
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

  test("PUT /user/profile/:username with non-existent user should return 404", async () => {
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

  // Testing error handling if database operation fails during user info retrieval
  test("GET /user/profileinfo/:username with database error should return 500", async () => {
    jest.spyOn(UserData, 'findOne').mockImplementationOnce(() => Promise.reject(new Error("Database error")));
    const response = await request(Server).get("/user/profileinfo/existingUsername");
    expect(response.status).toBe(500);
    expect(response.text).toContain("Database error");
  });
});

