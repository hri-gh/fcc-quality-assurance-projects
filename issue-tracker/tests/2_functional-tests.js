const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { ObjectId } = require('mongoose').Types;

chai.use(chaiHttp);

suite('Functional Tests', function () {

    suite('POST /api/issues/{project}', function () {
        test('Create an issue with every field', function (done) {
            chai.request(server)
                .post('/api/issues/:project')
                .send({
                    issue_title: "Test Title",
                    issue_text: "Test text",
                    created_by: "Tester",
                    assigned_to: "Someone",
                    status_text: "In Progress"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, 'issue_title');
                    assert.property(res.body, 'issue_text');
                    assert.property(res.body, 'created_by');
                    assert.property(res.body, 'assigned_to');
                    assert.property(res.body, 'status_text');
                    assert.property(res.body, 'created_on');
                    assert.property(res.body, 'updated_on');
                    assert.property(res.body, 'open');
                    assert.property(res.body, '_id');
                    done();
                });
        });

        test('Create an issue with only required fields', function (done) {
            chai.request(server)
                .post('/api/issues/testproject')
                .send({
                    issue_title: "Test Title",
                    issue_text: "Test text",
                    created_by: "Tester"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, 'issue_title');
                    assert.property(res.body, 'issue_text');
                    assert.property(res.body, 'created_by');
                    assert.property(res.body, 'assigned_to');
                    assert.property(res.body, 'status_text');
                    assert.property(res.body, 'created_on');
                    assert.property(res.body, 'updated_on');
                    assert.property(res.body, 'open');
                    assert.property(res.body, '_id');
                    assert.equal(res.body.assigned_to, '');
                    assert.equal(res.body.status_text, '');
                    done();
                });
        });

        test('Create an issue with missing required fields', function (done) {
            chai.request(server)
                .post('/api/issues/testproject')
                .send({
                    issue_title: "Test Title"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'error', 'required field(s) missing');
                    done();
                });
        });
    });

    suite('GET /api/issues/{project}', function () {
        test('View issues on a project', function (done) {
            chai.request(server)
                .get('/api/issues/testproject')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.isObject(res.body[0]);
                    assert.property(res.body[0], 'issue_title');
                    assert.property(res.body[0], 'issue_text');
                    assert.property(res.body[0], 'created_by');
                    assert.property(res.body[0], 'assigned_to');
                    assert.property(res.body[0], 'status_text');
                    assert.property(res.body[0], 'created_on');
                    assert.property(res.body[0], 'updated_on');
                    assert.property(res.body[0], 'open');
                    assert.property(res.body[0], '_id');
                    done();
                });
        });

        test('View issues on a project with one filter', function (done) {
            chai.request(server)
                .get('/api/issues/testproject')
                .query({ open: true })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    res.body.forEach(issue => {
                        assert.equal(issue.open, true);
                    });
                    done();
                });
        });

        test('View issues on a project with multiple filters', function (done) {
            chai.request(server)
                .get('/api/issues/testproject')
                .query({ open: true, assigned_to: 'Someone' })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    res.body.forEach(issue => {
                        assert.equal(issue.open, true);
                        assert.equal(issue.assigned_to, 'Someone');
                    });
                    done();
                });
        });
    });

    suite('PUT /api/issues/{project}', function () {
        test('Update one field on an issue', function (done) {
            chai.request(server)
                .put('/api/issues/testproject')
                .send({
                    _id:'66baff0970b00b9c36a1b99c',
                    issue_title: 'Updated Title'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'result', 'successfully updated');
                    assert.propertyVal(res.body, '_id', '66baff0970b00b9c36a1b99c');
                    done();
                });
        });

        test('Update multiple fields on an issue', function (done) {
            chai.request(server)
                .put('/api/issues/testproject')
                .send({
                    _id: '66baff0970b00b9c36a1b99c',
                    issue_title: 'Updated Title',
                    issue_text: 'Updated Text'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'result', 'successfully updated');
                    assert.propertyVal(res.body, '_id', '66baff0970b00b9c36a1b99c');
                    done();
                });
        });

        test('Update an issue with missing _id', function (done) {
            chai.request(server)
                .put('/api/issues/testproject')
                .send({
                    issue_title: 'Updated Title'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'error', 'missing _id');
                    done();
                });
        });

        test('Update an issue with no fields to update', function (done) {
            chai.request(server)
                .put('/api/issues/testproject')
                .send({
                    _id: '64d8f9f29c5f9b0012e5a123'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'error', 'no update field(s) sent');
                    assert.propertyVal(res.body, '_id', '64d8f9f29c5f9b0012e5a123');
                    done();
                });
        });

        test('Update an issue with an invalid _id', function (done) {
            chai.request(server)
                .put('/api/issues/testproject')
                .send({
                    _id: 'invalidid123',
                    issue_title: 'Updated Title'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'error', 'could not update');
                    assert.propertyVal(res.body, '_id', 'invalidid123');
                    done();
                });
        });
    });

    suite('DELETE /api/issues/{project}', function () {
        test('Delete an issue', function (done) {
            const idToDelete = '66bb00c4a77a6431bef63205';

            chai.request(server)
                .delete('/api/issues/:project')
                .send({
                    _id: idToDelete
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'result', 'successfully deleted');
                    assert.propertyVal(res.body, '_id', idToDelete);
                    done();
                });
        });

        test('Delete an issue with an invalid _id', function (done) {
            chai.request(server)
                .delete('/api/issues/testproject')
                .send({
                    _id: 'invalidid123'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'error', 'could not delete');
                    assert.propertyVal(res.body, '_id', 'invalidid123');
                    done();
                });
        });

        test('Delete an issue with missing _id', function (done) {
            chai.request(server)
                .delete('/api/issues/testproject')
                .send({})
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'error', 'missing _id');
                    done();
                });
        });
    });
});
