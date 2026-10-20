import request from "supertest";
import app from "../app.js";

describe("API routes", () => {
    test("GET /api/hello returns greeting", async () => {
        const res = await request(app).get("/api/hello");

        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body).toEqual({ message: "Hello from Node!" });
    });

    test("GET /api/products returns products message", async () => {
        const res = await request(app).get("/api/products");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "Here are the products!" });
    });

    test("GET /api/customers returns customers message", async () => {
        const res = await request(app).get("/api/customers");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "Here are the customers!" });
    });

    test("GET /api/status reports app is running", async () => {
        const res = await request(app).get("/api/status");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            status: 200,
            message: "App is running successfully",
        });
    });

    test("GET /api/health-check reports backend is healthy", async () => {
        const res = await request(app).get("/api/health-check");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            status: 200,
            message: "Backend is running successfully",
        });
    });
});

describe("Middleware", () => {
    test("responses are sent with Cache-Control: no-store", async () => {
        const res = await request(app).get("/api/hello");

        expect(res.headers["cache-control"]).toBe("no-store");
    });

    test("ETag header is disabled", async () => {
        const res = await request(app).get("/api/hello");

        expect(res.headers["etag"]).toBeUndefined();
    });

    test("CORS header is present", async () => {
        const res = await request(app)
            .get("/api/hello")
            .set("Origin", "http://example.com");

        expect(res.headers["access-control-allow-origin"]).toBe("*");
    });
});

describe("Unknown routes", () => {
    test("returns 404 for a route that doesn't exist", async () => {
        const res = await request(app).get("/api/does-not-exist");

        expect(res.status).toBe(404);
    });
});