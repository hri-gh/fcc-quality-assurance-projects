const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('API Route Tests', () => {
        suite('POST /api/translate => returns translation of sentence', () => {
            test('POST /api/translate with valid text and locale returns translation', (done) => {
                const requests = [
                    {
                        text: 'I ate yogurt for breakfast.',
                        locale: 'american-to-british',
                    },
                    {
                        text: 'I had a bicky then went to the chippy.',
                        locale: 'british-to-american',
                    },
                ];

                const expectedResponses = [
                    {
                        translation:
                            'I ate <span class="highlight">yoghurt</span> for breakfast.',
                        plaintext: 'I ate yoghurt for breakfast.',
                        text: 'I ate yogurt for breakfast.',
                    },
                    {
                        translation:
                            'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.',
                        plaintext: 'I had a cookie then went to the fish-and-chip shop.',
                        text: 'I had a bicky then went to the chippy.',
                    },
                ];

                Promise.all(
                    requests.map(({ text, locale }) => {
                        return chai
                            .request(server)
                            .post('/api/translate')
                            .send({ text, locale });
                    }),
                )
                    .then((resArray) => {
                        resArray.forEach((response, index) => {
                            assert.equal(
                                response.status,
                                200,
                                'Response status should be 200',
                            );
                            assert.equal(
                                response.type,
                                'application/json',
                                'Response type should be application/json',
                            );
                            assert.deepEqual(
                                response.body,
                                expectedResponses[index],
                                'Response body should be the expected translation',
                            );
                        });

                        done();
                    })
                    .catch((err) => done(err));
            });

            test('POST /api/translate with valid text and invalid locale returns "Invalid Locale" error', (done) => {
                const requests = [
                    {
                        text: 'I ate yogurt for breakfast.',
                        locale: 'BADLOCALE',
                    },
                ];

                const expectedResponses = [{ error: 'Invalid value for locale field' }];

                Promise.all(
                    requests.map(({ text, locale }) => {
                        return chai
                            .request(server)
                            .post('/api/translate')
                            .send({ text, locale });
                    }),
                )
                    .then((resArray) => {
                        resArray.forEach((response, index) => {
                            assert.equal(
                                response.status,
                                200,
                                'Response status should be 200', // !!!
                            );
                            assert.equal(
                                response.type,
                                'application/json',
                                'Response type should be application/json',
                            );
                            assert.deepEqual(
                                response.body,
                                expectedResponses[index],
                                'Response body should be an "Invalid locale" error',
                            );
                        });

                        done();
                    })
                    .catch((err) => done(err));
            });

            test('POST /api/translate with missing text field returns "missing fields" error', (done) => {
                const requests = [
                    {
                        locale: 'american-to-british',
                    },
                ];

                const expectedResponses = [{ error: 'Required field(s) missing' }];

                Promise.all(
                    requests.map(({ text, locale }) => {
                        return chai
                            .request(server)
                            .post('/api/translate')
                            .send({ text, locale });
                    }),
                )
                    .then((resArray) => {
                        resArray.forEach((response, index) => {
                            assert.equal(
                                response.status,
                                200,
                                'Response status should be 200', // !!!
                            );
                            assert.equal(
                                response.type,
                                'application/json',
                                'Response type should be application/json',
                            );
                            assert.deepEqual(
                                response.body,
                                expectedResponses[index],
                                'Response body should be an "missing fields" error',
                            );
                        });

                        done();
                    })
                    .catch((err) => done(err));
            });

            test('POST /api/translate with missing locale field returns "missing fields" error', (done) => {
                const requests = [
                    {
                        text: 'I ate yogurt for breakfast.',
                    },
                ];

                const expectedResponses = [{ error: 'Required field(s) missing' }];

                Promise.all(
                    requests.map(({ text, locale }) => {
                        return chai
                            .request(server)
                            .post('/api/translate')
                            .send({ text, locale });
                    }),
                )
                    .then((resArray) => {
                        resArray.forEach((response, index) => {
                            assert.equal(
                                response.status,
                                200,
                                'Response status should be 200', // !!!
                            );
                            assert.equal(
                                response.type,
                                'application/json',
                                'Response type should be application/json',
                            );
                            assert.deepEqual(
                                response.body,
                                expectedResponses[index],
                                'Response body should be an "missing fields" error',
                            );
                        });

                        done();
                    })
                    .catch((err) => done(err));
            });

            test('POST /api/translate with empty text field and valid locale returns "no text" error', (done) => {
                const requests = [
                    {
                        text: '',
                        locale: 'american-to-british',
                    },
                ];

                const expectedResponses = [{ error: 'No text to translate' }];

                Promise.all(
                    requests.map(({ text, locale }) => {
                        return chai
                            .request(server)
                            .post('/api/translate')
                            .send({ text, locale });
                    }),
                )
                    .then((resArray) => {
                        resArray.forEach((response, index) => {
                            assert.equal(
                                response.status,
                                200,
                                'Response status should be 200', // !!!
                            );
                            assert.equal(
                                response.type,
                                'application/json',
                                'Response type should be application/json',
                            );
                            assert.deepEqual(
                                response.body,
                                expectedResponses[index],
                                'Response body should be an "missing fields" error',
                            );
                        });

                        done();
                    })
                    .catch((err) => done(err));
            });

            test('POST /api/translate with text field and valid locale, but no translation required returns translation of "Everything looks good to me"', (done) => {
                const requests = [
                    {
                        text: 'These Mangoes are delicious!',
                        locale: 'american-to-british',
                    },
                ];

                const expectedResponses = [
                    {
                        translation: 'Everything looks good to me!',
                        plaintext: 'These Mangoes are delicious!',
                        text: 'These Mangoes are delicious!',
                    },
                ];

                Promise.all(
                    requests.map(({ text, locale }) => {
                        return chai
                            .request(server)
                            .post('/api/translate')
                            .send({ text, locale });
                    }),
                )
                    .then((resArray) => {
                        resArray.forEach((response, index) => {
                            assert.equal(
                                response.status,
                                200,
                                'Response status should be 200', // !!!
                            );
                            assert.equal(
                                response.type,
                                'application/json',
                                'Response type should be application/json',
                            );
                            assert.deepEqual(
                                response.body,
                                expectedResponses[index],
                                'Response body should be an "missing fields" error',
                            );
                        });

                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
});
