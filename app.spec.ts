import app from "./src/app";
import request from "supertest";
import { calculatePrice } from "./src/utils";
describe("App", () => {
  it("Should Calculate the price", () => {
    const result = calculatePrice(200);
    expect(result).toBe(20);
  });

  it("Should return 200 status", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});
