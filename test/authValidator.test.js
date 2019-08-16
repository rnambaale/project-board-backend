import chai from "chai";
import chaiHttp from "chai-http";

import app from "../src/server";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const testUser = {
  fullName: "test-user",
  email: "testuser@gmail.com",
  password: "testpassword12"
};

describe("Users Validation", () => {
  describe("POST /api/v1/auth/signup", () => {
    it("should return 400 error if email is empty", done => {
      const { email, ...partialUserDetails } = testUser;
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(partialUserDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.email.should.be.an("string");
          res.body.message.email.should.eql("Email is required.");
          done();
        });
    });

    it("should return 400 error if email is invalid", done => {
      const invalidEmail = {
        userName: "user-one",
        email: "testgmail.com",
        password: "haggsff354"
      };

      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(invalidEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.email.should.be.an("string");
          res.body.message.email.should.eql("Invalid email address.");
          done();
        });
    });

    it("should return 409 error if email already exists", done => {
      const existingEmail = {
        userName: "johnDoe",
        email: "john.doe@email.com",
        password: "haggsdf355"
      };

      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(existingEmail)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.email.should.be.an("string");
          res.body.message.email.should.eql("Email already exists.");
          done();
        });
    });

    it("should return 400 error if password is empty", done => {
      const { password, ...partialUserDetails } = testUser;
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(partialUserDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.password.should.be.an("string");
          res.body.message.password.should.eql("Password is required.");
          done();
        });
    });

    it("should return 400 error if password is invalid", done => {
      const invalidPassword = {
        fullName: "test-user",
        email: "test@email.com",
        password: "%#^^#**HHFBSNMR"
      };

      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(invalidPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.password.should.be.an("string");
          res.body.message.password.should.eql(
            "Password must be alphanumeric."
          );
          done();
        });
    });

    it("should return 400 error if password character length is invalid", done => {
      const invalidPassword = {
        fullName: "user-one",
        email: "test@email.com",
        password: "hd"
      };

      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(invalidPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.password.should.be.an("string");
          res.body.message.password.should.eql(
            "Password must be a minmum of 3 characters."
          );
          done();
        });
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should return 400 error if email is empty", done => {
      const { email, ...partialUserDetails } = testUser;
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(partialUserDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.email.should.be.an("string");
          res.body.message.email.should.eql("Email is required.");
          done();
        });
    });

    it("should return 400 error if email is invalid", done => {
      const invalidEmail = {
        userName: "user-one",
        email: "testgmail.com",
        password: "haggsff354"
      };

      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(invalidEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.email.should.be.an("string");
          res.body.message.email.should.eql("Invalid email address.");
          done();
        });
    });

    it("should return 400 error if password is empty", done => {
      const { password, ...partialUserDetails } = testUser;
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(partialUserDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.password.should.be.an("string");
          res.body.message.password.should.eql("Password is required.");
          done();
        });
    });

    it("should return 400 error if password is invalid", done => {
      const invalidPassword = {
        fullName: "user-one",
        email: "test@email.com",
        password: "hett464...%#&&#"
      };

      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(invalidPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.password.should.be.an("string");
          res.body.message.password.should.eql(
            "Password must be alphanumeric."
          );
          done();
        });
    });

    it("should return 400 error if password character length is invalid", done => {
      const invalidPassword = {
        userName: "user-one",
        email: "test@email.com",
        password: "hd"
      };

      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(invalidPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
          res.body.message.password.should.be.an("string");
          res.body.message.password.should.eql(
            "Password must be a minmum of 3 characters."
          );
          done();
        });
    });
  });
});
