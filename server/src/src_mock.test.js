const express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const request = require("supertest");
const FuelQuoteModule = require("./FuelQuoteModule");
const LoginModule = require("./LoginModule");
const ProfileModule = require("./ProfileModule");
const { default: mongoose } = require("mongoose");

const Server = express();
const Port = 3002;

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

jest.mock("../Data/UserCredentialsData.js", () => ({
  findOne: jest.fn(() => {
    throw new Error("Intentional error in finduser route");
  }),
}));

jest.mock("../Data/FuelQuoteData.js", () => ({
  findOne: jest.fn(() => {
    throw new Error("Intentional error in finduser route");
  }),
}));

describe("FuelQuoteModule API", () => {
  test("Testing GET Endpoint (/user/quotes/history/): It should respond with Status 500 and error message", async () => {
    const response = await request(Server).get("/user/quotes/history/").query({
      userId: "123"
    });
    expect(response.status).toBe(500);
    expect(() => {
      if (response.error) throw new Error("Error occurred: " + response.error);
    }).toThrow();
  });
});

describe("LoginModule API", () => {
  test("Testing GET Endpoint (/finduser): It should respond with Status 500 and error message", async () => {
    const response = await request(Server).get("/finduser").query({
      username: "billy123",
    });
    expect(response.status).toBe(500);
    expect(() => {
      if (response.error) throw new Error("Error occurred: " + response.error);
    }).toThrow();
  });
});

describe("ProfileModule API", () => {
  test("Testing GET Endpoint(/user/profile/:username): It should respond with Status 500 and error message", async () => {
    const response = await request(Server).get("/user/profile/CoogsLover");
    expect(response.status).toBe(500);
    expect(() => {
      if (response.error) throw new Error("Error occurred: " + response.error);
    }).toThrow();
  });

  test("Testing PUT Endpoint (/user/profile/:username): It should respond with Status 500 and error message", async () => {
    const response = await request(Server).put("/user/profile/TestingName");
    expect(response.status).toBe(500);
    expect(() => {
      if (response.error) throw new Error("Error occurred: " + response.error);
    }).toThrow();
  });
});