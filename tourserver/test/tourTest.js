const app = require('../app');
const assert = require('chai').assert;
const request = require('supertest');
const cookie = require('cookie');

describe('Get Tour Tests', function () {
	let response;
	let tours = null;
	before(async function () {
		response = await request(app).get('/tours');
	})
	it('Everything is OK', async function () {
		assert.equal(response.status, 200);
	});
	it('Returns an array', function () {
		tours = JSON.parse(response.text);
		assert.isArray(tours);
	});
	it('All tour elements have name and date', function () {
		tours.forEach(function (tour) {
			assert.containsAllKeys(tour, ['Name','Date']);
		});
	});
	it('Cookie with appropriate name is returned', function () {
		let cookies = response.header['set-cookie'].map(cookie.parse);
		let mycookie = cookies.filter(c => c.hasOwnProperty('df5864toursid'));
		assert.notEmpty(mycookie);
	});
})

describe("Get an individual tour", function () {
	var tours;
	var existingID1;
	var existingID2;
	var nonExistingID;
	before(async function () {
		var res = await request(app).get("/tours");
		tours = res.body;
		existingID1 = tours[0]._id;
		existingID2 = tours[1]._id;
		nonExistingID = "NotExistingId";
	})
	it('Get an existing tour', async function () {
		console.log("trying path tours/0Ru87Oe350KfplZk");
		var res = await request(app).get("/tours/" + existingID1);
		tour = res.body[0];
		assert.equal(res.status, 200);
		assert.containsAllKeys(tour, ['Name'], ['Date']);
	})
	it('Get another	 existing tour', async function () {
		console.log("trying path tours/B4JjIkfFT705tJRl");
		var res = await request(app).get("/tours/" + existingID2);
		tour = res.body[0];
		assert.equal(res.status, 200);
		assert.containsAllKeys(tour, ['Name'], ['Date']);
	})
	it('Try getting a non existing tour', async function () {
		console.log("trying path tours/NotExistingId");
		var res = await request(app).get("/tours/" + nonExistingID);
		console.log("-------------------------", res.body);
		assert.equal(res.status, 404);
	})
})


describe("Add tour test", function () {
	var existingID1;
	var existingID2;
	var nonExistingID;
	let agent = request.agent(app); //Use across many requests
	before(async function () {
		require('../initTourDatabase');
	})
	it('Login as admin, add tour', async function () {
		var res = await agent.post("/login").send({
			"email": "sided1830@outlook.com",
			"password": "C}m8\"L,F"
		});
		var admin = res.body;
		console.log(admin);
		assert.containsAllKeys(admin, ['role'], ['firstName'], ['lastName'], ['email']);
		assert.equal(admin.role, "admin");
		res = await agent.post("/add/tours").send({
			"Name": "Admin added Tour",
			"Date": "6 April, 2020"
		});
		console.log("Admin added tour : ", res.body);
		assert.equal(res.status, 200);

		await agent.get("/logout");
	})
	it('Guest try to add tour', async function () {
		var res = await request(app).post("/add/tours").send({
			"Name": "Latest Wonders Tour",
			"Date": "6 April, 2020"
		});
		assert.equal(res.status, 200);
	})
	it('Customer try to add tour', async function () {
		var res = await agent.post("/login").send({
			"email": "prolongating1890@yandex.com",
			"password": "o)62USr5"
		});
		var customer = res.body;
		assert.containsAllKeys(customer, ['role'], ['firstName'], ['lastName'], ['email']);
		assert.equal(customer.role, "customer");
		res = await agent.post("/add/tours").send({
			"name": "Customer added Tour",
			"date": "6 April, 2020"
		});
		assert.equal(res.status, 200);
	})
})

describe("Delete tour tests", function () {
	var existingID1;
	var existingID2;
	let agent = request.agent(app); //Use across many requests
	before(async function () {
		require('../initTourDatabase');
		var res = await agent.get("/tours");
		var tours = res.body;
		existingID1 = tours[0]._id;
		existingID2 = tours[1]._id;
	})
	it('Login as admin, delete tour', async function () {
		var res = await agent.post("/login").send({
			"email": "sided1830@outlook.com",
			"password": "C}m8\"L,F"
		});
		var admin = res.body;
		console.log(admin);
		assert.containsAllKeys(admin, [['role'], ['firstName'], ['lastName'], ['email']]);
		assert.equal(admin.role, "admin");
		res = await agent.delete("/tours/delete/" + existingID1);
		console.log("Admin Delete tour : ", res.body);
		assert.equal(res.status, 200);

		await agent.get("/logout");
	})
	it('Guest try to delete tour', async function () {
		res = await agent.delete("/tours/delete/" + existingID2);
		assert.equal(res.status, 200);
	})
	it('Customer try to delete tour', async function () {
		var res = await agent.post("/login").send({
			"email": "prolongating1890@yandex.com",
			"password": "o)62USr5"
		});
		var customer = res.body;
		assert.containsAllKeys(customer, ['role'], ['firstName'], ['lastName'], ['email']);
		assert.equal(customer.role, "customer");

		res = await agent.delete("/tours/delete/" + existingID2);
		assert.equal(res.status, 200);
	})
})
