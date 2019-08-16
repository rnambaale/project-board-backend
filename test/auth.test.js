import chai from "chai";
import chaiHttp from "chai-http";

import app from "../src/server";
import { User } from "../src/db/models";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

let token;

describe("Auth", () => {
  before(() => {
    const email = ["test.one@email.com", "test.two@email.com"];
    email.map(i => {
      const user = User.findOne({
        where: {
          email: i
        }
      });

      if (user) {
        User.destroy({
          where: {
            email: i
          }
        });
      }
    });
  });

  describe("Auth Controller", () => {
    const defaultUser = {
      fullName: "Test One",
      email: "test.one@email.com",
      password: "password"
    };

    it("should signup a user", done => {
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(defaultUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.be
            .a("string")
            .eql("Your account has been created, you may now login");
          done();
        });
    });

    const existingUser = {
      email: "john.doe@email.com",
      password: "password"
    };

    it("should login a user", done => {
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(existingUser)
        .end((err, res) => {
          token = res.body.token; // set token global
          res.body.data.should.be.an("array");
          res.should.have.status(200);
          res.body.message.should.be.a("string").eql("User Login successful");
          done();
        });
    });

    it("It should return invalid email or password", done => {
      const newUser = { ...existingUser, password: "passhuuuuu" };
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.be
            .a("string")
            .eql("Invalid email or password");
          done();
        });
    });

    it("It should return invalid email or password", done => {
      const newUser = { ...existingUser, email: "fakeemail@email.com" };
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.be
            .a("string")
            .eql("Invalid email or password");
          done();
        });
    });

    it("should logout user successfully", done => {
      chai
        .request(app)
        .post("/api/v1/auth/logout")
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.message).equal("User successfully logged out");
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          done();
        });
    });

    it("should fail to logout already logged out user successfully", done => {
      chai
        .request(app)
        .post("/api/v1/auth/logout")
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(409);
          expect(res.body.message).equal("User already logged out");
          done();
        });
    });

    it("user should provide a token", done => {
      chai
        .request(app)
        .post("/api/v1/auth/logout")
        .set("token", "")
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.message).equal("Token is required");
          done();
        });
    });
  });
});
