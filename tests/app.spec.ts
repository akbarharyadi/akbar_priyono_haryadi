import app from "../src/app";
import request from "supertest";

describe("GET / - a simple api endpoint", () => {
  it("Hello Root Endpoint", async () => {
    const result = await request(app).get("/");
    expect(result.text).toEqual("Hello");
    expect(result.statusCode).toEqual(200);
  });
});