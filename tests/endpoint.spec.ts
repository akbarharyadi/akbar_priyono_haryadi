import app from "../src/app";
import request from "supertest";
import mongoose from "mongoose";
import { IUser } from "../src/model/interface/IUser";


afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
});


const user: IUser = {
    "userName": "akbarharyadi",
    "accountNumber": 7829382882932932,
    "emailAddress": "akbarharyadi@outlook.com",
    "identityNumber": 7239128731289391
}

const user2: IUser = {
    "userName": "akbarharyadi2",
    "accountNumber": 7829382882932933,
    "emailAddress": "aakbarharyadi@outlook.com",
    "identityNumber": 7239128731289394
}


const update: IUser = {
    "userName": "akbarharyadi3",
    "accountNumber": 7829382882932934,
    "emailAddress": "aaakbarharyadi@outlook.com",
    "identityNumber": 7239128731289395
}


describe("Api endpoint test", () => {
    var id: string;
    var id2: string;
    var token: string;


    it("Hello Root Endpoint", async () => {
        const result = await request(app).get("/");
        expect(result.text).toEqual("Hello");
        expect(result.statusCode).toEqual(200);
    });

    test("POST /auth/register", async () => {
        const response = (await request(app).post("/auth/register").send(user));
        id = response.body.user._id
        token = response.body.token
        expect(response.body.user.userName).toEqual(user.userName)
        expect(response.body.user.accountNumber).toEqual(user.accountNumber)
        expect(response.body.user.emailAddress).toEqual(user.emailAddress)
        expect(response.body.user.identityNumber).toEqual(user.identityNumber)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });

    test("POST /auth/login", async () => {
        const response = (await request(app).post("/auth/login").send({
            "username": user.userName,
            "password": "anything"
        }));
        
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });


    test("POST /users", async () => {
        const response = (await request(app).post("/users").set('Authorization', `Bearer ${token}`).send(user2));
        id2 = response.body._id
        expect(response.body.userName).toEqual(user2.userName)
        expect(response.body.accountNumber).toEqual(user2.accountNumber)
        expect(response.body.emailAddress).toEqual(user2.emailAddress)
        expect(response.body.identityNumber).toEqual(user2.identityNumber)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });

    test("GET users/{id}", async () => {
        const response = (await request(app).get("/users/" + id).set('Authorization', `Bearer ${token}`));
        expect(response.body.userName).toEqual(user.userName)
        expect(response.body.accountNumber).toEqual(user.accountNumber)
        expect(response.body.emailAddress).toEqual(user.emailAddress)
        expect(response.body.identityNumber).toEqual(user.identityNumber)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });

    test("GET /users/account-number/{account-number}", async () => {
        const response = (await request(app).get("/users/account-number/" + user2.accountNumber).set('Authorization', `Bearer ${token}`));
        expect(response.body.userName).toEqual(user2.userName)
        expect(response.body.accountNumber).toEqual(user2.accountNumber)
        expect(response.body.emailAddress).toEqual(user2.emailAddress)
        expect(response.body.identityNumber).toEqual(user2.identityNumber)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });

    test("GET /users/identity-number/{identity-number}", async () => {
        const response = (await request(app).get("/users/identity-number/" + user2.identityNumber).set('Authorization', `Bearer ${token}`));
        expect(response.body.userName).toEqual(user2.userName)
        expect(response.body.accountNumber).toEqual(user2.accountNumber)
        expect(response.body.emailAddress).toEqual(user2.emailAddress)
        expect(response.body.identityNumber).toEqual(user2.identityNumber)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });

    test("DELETE users/{id}", async () => {
        const response = (await request(app).delete("/users/" + id2).set('Authorization', `Bearer ${token}`));
        expect(response.body.message).toEqual('user has been deleted')
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });

    test("PUT users/{id}", async () => {
        const response = (await request(app).put("/users/" + id).set('Authorization', `Bearer ${token}`).send(update));
        expect(response.body.userName).toEqual(update.userName)
        expect(response.body.accountNumber).toEqual(update.accountNumber)
        expect(response.body.emailAddress).toEqual(update.emailAddress)
        expect(response.body.identityNumber).toEqual(update.identityNumber)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200);
    });

});