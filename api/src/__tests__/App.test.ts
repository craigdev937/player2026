import request from "supertest";
import { describe, expect, it } from "@rstest/core";
import { SER } from "../server.js";

describe("GET /", () => {
    it("should return 200 OK", async () => {
        const response = await request(SER)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body).toEqual({
            success: true,
            data: "Hello World!"
        });
    });
});



