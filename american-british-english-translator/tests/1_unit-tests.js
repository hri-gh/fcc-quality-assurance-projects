const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
    suite('American to British English Plaintext Translations', () => {
        test('Successfully translates "Mangoes are my favorite fruit."', () => {
            const sentence = 'Mangoes are my favorite fruit.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'Mangoes are my favourite fruit.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "I ate yogurt for breakfast."', () => {
            const sentence = 'I ate yogurt for breakfast.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'I ate yoghurt for breakfast.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "We had a party at my friend\'s condo."', () => {
            const sentence = "We had a party at my friend's condo.";
            const locale = 'american-to-british';
            const expectedPlaintext = "We had a party at my friend's flat.";

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "Can you toss this in the trashcan for me?"', () => {
            const sentence = 'Can you toss this in the trashcan for me?';
            const locale = 'american-to-british';
            const expectedPlaintext = 'Can you toss this in the bin for me?';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "The parking lot was full."', () => {
            const sentence = 'The parking lot was full.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'The car park was full.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "Like a high tech Rube Goldberg machine."', () => {
            const sentence = 'Like a high tech Rube Goldberg machine.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'Like a high tech Heath Robinson device.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "To play hooky means to skip class or work."', () => {
            const sentence = 'To play hooky means to skip class or work.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'To bunk off means to skip class or work.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "No Mr. Bond, I expect you to die."', () => {
            const sentence = 'No Mr. Bond, I expect you to die.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'No Mr Bond, I expect you to die.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "Dr. Grosh will see you now."', () => {
            const sentence = 'Dr. Grosh will see you now.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'Dr Grosh will see you now.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });

        test('Successfully translates "Lunch is at 12:15 today."', () => {
            const sentence = 'Lunch is at 12:15 today.';
            const locale = 'american-to-british';
            const expectedPlaintext = 'Lunch is at 12.15 today.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'American English should be translated to British English correctly',
            );
        });
    });

    suite('British to American English Plaintext Translations', () => {
        test('Successfully translates "We watched the footie match for a while."', () => {
            const sentence = 'We watched the footie match for a while.';
            const locale = 'british-to-american';
            const expectedPlaintext = 'We watched the soccer match for a while.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "Paracetamol takes up to an hour to work."', () => {
            const sentence = 'Paracetamol takes up to an hour to work.';
            const locale = 'british-to-american';
            const expectedPlaintext = 'Tylenol takes up to an hour to work.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "First, caramelise the onions."', () => {
            const sentence = 'First, caramelise the onions.';
            const locale = 'british-to-american';
            const expectedPlaintext = 'First, caramelize the onions.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "I spent the bank holiday at the funfair."', () => {
            const sentence = 'I spent the bank holiday at the funfair.';
            const locale = 'british-to-american';
            const expectedPlaintext = 'I spent the public holiday at the carnival.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "I had a bicky then went to the chippy."', () => {
            const sentence = 'I had a bicky then went to the chippy.';
            const locale = 'british-to-american';
            const expectedPlaintext =
                'I had a cookie then went to the fish-and-chip shop.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "I\'ve just got bits and bobs in my bum bag."', () => {
            const sentence = "I've just got bits and bobs in my bum bag.";
            const locale = 'british-to-american';
            const expectedPlaintext = "I've just got odds and ends in my fanny pack.";

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "The car boot sale at Boxted Airfield was called off."', () => {
            const sentence = 'The car boot sale at Boxted Airfield was called off.';
            const locale = 'british-to-american';
            const expectedPlaintext =
                'The swap meet at Boxted Airfield was called off.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "Have you met Mrs Kalyani?"', () => {
            const sentence = 'Have you met Mrs Kalyani?';
            const locale = 'british-to-american';
            const expectedPlaintext = 'Have you met Mrs. Kalyani?';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "Prof Joyner of King\'s College, London."', () => {
            const sentence = "Prof Joyner of King's College, London.";
            const locale = 'british-to-american';
            const expectedPlaintext = "Prof. Joyner of King's College, London.";

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });

        test('Successfully translates "Tea time is usually around 4 or 4.30."', () => {
            const sentence = 'Tea time is usually around 4 or 4.30.';
            const locale = 'british-to-american';
            const expectedPlaintext = 'Tea time is usually around 4 or 4:30.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                plaintext,
                expectedPlaintext,
                'British English should be translated to American English correctly',
            );
        });
    });

    suite('Translations have translated words highlighted', () => {
        test('"Favourite" is highlighted when translating "Mangoes are my favorite fruit." to British English', () => {
            const sentence = 'Mangoes are my favorite fruit.';
            const locale = 'american-to-british';
            const expectedTranslation =
                'Mangoes are my <span class="highlight">favourite</span> fruit.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                translation,
                expectedTranslation,
                'Translated words in the returned translation should be inside a highlight element',
            );
        });

        test('"yoghurt" is highlighted when translating "I ate yogurt for breakfast." to British English', () => {
            const sentence = 'I ate yogurt for breakfast.';
            const locale = 'american-to-british';
            const expectedTranslation =
                'I ate <span class="highlight">yoghurt</span> for breakfast.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                translation,
                expectedTranslation,
                'Translated words in the returned translation should be inside a highlight element',
            );
        });

        test('"soccer" is highlighted when translating "We watched the footie match for a while." to American English', () => {
            const sentence = 'We watched the footie match for a while.';
            const locale = 'british-to-american';
            const expectedTranslation =
                'We watched the <span class="highlight">soccer</span> match for a while.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                translation,
                expectedTranslation,
                'Translated words in the returned translation should be inside a highlight element',
            );
        });

        test('"Tylenol" is highlighted when translating "Paracetamol takes up to an hour to work." to American English', () => {
            const sentence = 'Paracetamol takes up to an hour to work.';
            const locale = 'british-to-american';
            const expectedTranslation =
                '<span class="highlight">Tylenol</span> takes up to an hour to work.';

            const { translation, plaintext } = translator.translate(sentence, locale);
            assert.equal(
                translation,
                expectedTranslation,
                'Translated words in the returned translation should be inside a highlight element',
            );
        });
    });

    suite(
        'Translator returns correctly translated plaintext and highlighted translation for larger sentences',
        () => {
            test('Translation of large sentence from American to British English', () => {
                const sentence =
                    'Soccer is my favorite sport to watch. There is a match on at 2:45, if you would like to come? We can pick up some fries on the way.';
                const locale = 'american-to-british';
                const expectedResult = {
                    translation:
                        '<span class="highlight">Football</span> is my <span class="highlight">favourite</span> sport to watch. There is a match on at <span class="highlight">2.45</span>, if you would like to come? We can pick up some <span class="highlight">chips</span> on the way.',
                    plaintext:
                        'Football is my favourite sport to watch. There is a match on at 2.45, if you would like to come? We can pick up some chips on the way.',
                };

                const result = translator.translate(sentence, locale);
                assert.deepEqual(
                    result,
                    expectedResult,
                    'Returned result should match the expected translation output',
                );
            });

            test('Translation of large sentence from British to American English', () => {
                const sentence =
                    "I missed my brekkie today - only had time for a cuppa and a biccie! Can't wait to go the the chippy later. Shall I meet you there at 6.00pm? Yes, the one by the launderette!";
                const locale = 'british-to-american';
                const expectedResult = {
                    translation: `I missed my <span class="highlight">breakfast</span> today - only had time for a <span class="highlight">cup of tea</span> and a <span class="highlight">cookie</span>! Can't wait to go the the <span class="highlight">fish-and-chip shop</span> later. Shall I meet you there at <span class="highlight">6:00pm</span>? Yes, the one by the <span class="highlight">laundromat</span>!`,
                    plaintext:
                        "I missed my breakfast today - only had time for a cup of tea and a cookie! Can't wait to go the the fish-and-chip shop later. Shall I meet you there at 6:00pm? Yes, the one by the laundromat!",
                };

                const result = translator.translate(sentence, locale);
                assert.deepEqual(
                    result,
                    expectedResult,
                    'Returned result should match the expected translation output',
                );
            });
        },
    );

    suite(
        'If a sentence and locale are given that require no translation, Translator.translate should return "Everything looks good to me!"',
        () => {
            test('No translation required for "Mangoes are the best!" from American to British English', () => {
                const sentence = 'Mangoes are the best!';
                const locale = 'american-to-british';

                const expectedResult = {
                    plaintext: 'Mangoes are the best!',
                    translation: 'Everything looks good to me!',
                };

                const result = translator.translate(sentence, locale);
                assert.deepEqual(
                    result,
                    expectedResult,
                    'Returned result should show that no translation was required',
                );
            });

            test('No translation required for "The game starts at 4pm." from  British to American English', () => {
                const sentence = 'The game starts at 4pm.';
                const locale = 'british-to-american';

                const expectedResult = {
                    plaintext: 'The game starts at 4pm.',
                    translation: 'Everything looks good to me!',
                };

                const result = translator.translate(sentence, locale);
                assert.deepEqual(
                    result,
                    expectedResult,
                    'Returned result should show that no translation was required',
                );
            });
        },
    );
});
