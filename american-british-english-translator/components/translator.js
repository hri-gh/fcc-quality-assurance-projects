// const americanOnly = require('./american-only.js');
// const americanToBritishSpelling = require('./american-to-british-spelling.js');
// const americanToBritishTitles = require("./american-to-british-titles.js");
// const britishOnly = require('./british-only.js');

// class Translator {
//     translate(text, locale) {
//         let translation = text;

//         if (locale === 'american-to-british') {
//             translation = this.americanToBritish(text);
//         } else if (locale === 'british-to-american') {
//             translation = this.britishToAmerican(text);
//         }

//         if (translation === text) {
//             return { text, translation: "Everything looks good to me!" };
//         }

//         return { text, translation };
//     }

//     americanToBritish(text) {
//         let translatedText = text;

//         // Handle American to British spelling
//         Object.keys(americanToBritishSpelling).forEach(spell => {
//             const regex = new RegExp(`\\b${spell}\\b`, 'gi');
//             translatedText = translatedText.replace(regex, `<span class="highlight">${americanToBritishSpelling[spell]}</span>`);
//         });

//         // Handle American only terms
//         Object.keys(americanOnly).forEach(term => {
//             const regex = new RegExp(`\\b${term}\\b`, 'gi');
//             translatedText = translatedText.replace(regex, `<span class="highlight">${americanOnly[term]}</span>`);
//         });

//         // Handle titles/honorifics (leave unchanged if it's already in British format)
//         Object.keys(americanToBritishTitles).forEach(title => {
//             const britishTitle = americanToBritishTitles[title];
//             const regex = new RegExp(`\\b${title}\\b`, 'gi');

//             // Check if the text already contains the British format
//             const britishTitleRegex = new RegExp(`\\b${britishTitle}\\b`, 'gi');
//             if (!britishTitleRegex.test(text)) {
//                 translatedText = translatedText.replace(regex, `<span class="highlight">${britishTitle}</span>`);
//             }
//         });

//         // Handle time format
//         translatedText = translatedText.replace(/(\d{1,2}):(\d{2})/g, `<span class="highlight">$1.$2</span>`);

//         return translatedText;
//     }


//     britishToAmerican(text) {
//         let translatedText = text;

//         // Handle British only terms
//         Object.keys(britishOnly).forEach(term => {
//             const regex = new RegExp(`\\b${term}\\b`, 'gi');
//             translatedText = translatedText.replace(regex, `<span class="highlight">${britishOnly[term]}</span>`);
//         });

//         // Handle British to American spelling
//         Object.keys(americanToBritishSpelling).forEach(spell => {
//             const britishSpell = americanToBritishSpelling[spell];
//             const regex = new RegExp(`\\b${britishSpell}\\b`, 'gi');
//             translatedText = translatedText.replace(regex, match => {
//                 return `<span class="highlight">${this.preserveCase(match, spell)}</span>`;
//             });
//         });

//         // Handle titles/honorifics (including full forms and abbreviations)
//         Object.keys(americanToBritishTitles).forEach(title => {
//             const britishTitle = americanToBritishTitles[title];
//             const regex = new RegExp(`\\b${britishTitle}\\b`, 'gi');
//             translatedText = translatedText.replace(regex, match => {
//                 return `<span class="highlight">${this.preserveCase(match, title)}</span>`;
//             });
//         });

//         // Handle time format
//         translatedText = translatedText.replace(/(\d{1,2})\.(\d{2})/g, `<span class="highlight">$1:$2</span>`);

//         return translatedText;
//     }

//     preserveCase(original, replacement) {
//         if (original[0] === original[0].toUpperCase()) {
//             return replacement.charAt(0).toUpperCase() + replacement.slice(1);
//         }
//         return replacement;
//     }
// }

// module.exports = Translator;

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

const swapObjectKeysAndValues = (object) => {
    return Object.entries(object).reduce((accum, [key, value]) => {
        accum[value] = key;
        return accum;
    }, {});
};

// Dictionary consists of keys -> words and values -> translations
const buildDictionary = (wordObjects) => {
    const dictionary = {};

    wordObjects.forEach((wordObject) => {
        Object.entries(wordObject).forEach(([word, translation]) => {
            dictionary[word] = translation;
        });
    });
    return dictionary;
};

// Builds a large regex from dictionary to match any instances of words
// that should be translated in the sentence string
// Regex splits string into any matched words, unmatched words, spaces,
// and any other characters
const buildRegex = (dictionary) => {
    const wordRegex = Object.keys(dictionary)
        .map((word) => {
            if (word[word.length - 1] === '.') {
                return '\\b' + word.replace(/\./g, '[.]\\B');
            } else {
                return '\\b' + word + '\\b';
            }
        })
        .sort((a, b) => b.length - a.length) // Sort so longer words are matched first
        .join('|');

    // '(' + wordRegex + '|\\w+)|(.)';
    const regexString = '(' + wordRegex + '|\\w+)|(.)';
    const regex = new RegExp(regexString, 'giu');

    return regex;
};

const dictionaryForLocale = {
    'american-to-british': buildDictionary([
        americanOnly,
        americanToBritishSpelling,
        americanToBritishTitles,
    ]),
    'british-to-american': buildDictionary([
        britishOnly,
        swapObjectKeysAndValues(americanToBritishSpelling),
        swapObjectKeysAndValues(americanToBritishTitles),
    ]),
};

const dictionaryRegexForLocale = {
    'american-to-british': buildRegex(dictionaryForLocale['american-to-british']),
    'british-to-american': buildRegex(dictionaryForLocale['british-to-american']),
};

const americanTimeRegex = /\b(2[0-3]|[0-1]?[0-9]):([0-5][0-9])(\b|am|pm)/gi;
const britishTimeRegex = /\b(2[0-3]|[0-1]?[0-9])\.([0-5][0-9])(\b|am|pm)/gi;
const timeRegexForLocale = {
    'american-to-british': { regex: americanTimeRegex, translatedSeparator: '.' },
    'british-to-american': { regex: britishTimeRegex, translatedSeparator: ':' },
};

class Translator {
    translate(sentenceStr, locale) {
        if (!dictionaryForLocale.hasOwnProperty(locale)) {
            return false; // !!!;
        }

        const dictionary = dictionaryForLocale[locale];

        const regex = dictionaryRegexForLocale[locale];

        const matchArr = sentenceStr.match(regex);

        const plaintextArr = [];
        const highlightedTextArr = [];

        matchArr.forEach((token) => {
            const lowerCaseToken = token.toLowerCase();
            if (dictionary.hasOwnProperty(lowerCaseToken)) {
                const lowerCaseTranslation = dictionary[lowerCaseToken];
                let translation = lowerCaseTranslation;

                // Ensure character case matches the original token:
                const capitalised = token[0].toUpperCase() === token[0];
                const uppercase = token.toUpperCase() === token;

                if (uppercase) {
                    translation = lowerCaseTranslation.toUpperCase();
                } else if (capitalised) {
                    translation =
                        lowerCaseTranslation[0].toUpperCase() +
                        lowerCaseTranslation.slice(1);
                }

                plaintextArr.push(translation);
                highlightedTextArr.push(
                    `<span class="highlight">${translation}</span>`,
                );
            } else {
                plaintextArr.push(token);
                highlightedTextArr.push(token);
            }
        });

        // Translate any times using translateTime method:
        const translation = this.translateTime(
            highlightedTextArr.join(''),
            locale,
            true,
        );
        const plaintext = this.translateTime(plaintextArr.join(''), locale, false);

        // If no changes have been made, return 'Everything looks good to me!'
        if (sentenceStr === plaintext) {
            const returnStr = 'Everything looks good to me!';
            return { translation: returnStr, plaintext: plaintext };
        }

        return {
            translation,
            plaintext,
        };
    }

    translateTime(sentenceStr, locale, highlight) {
        const { regex, translatedSeparator } = timeRegexForLocale[locale];

        if (highlight) {
            return sentenceStr.replace(
                regex,
                `<span class="highlight">$1${translatedSeparator}$2$3</span>`,
            );
        } else {
            return sentenceStr.replace(regex, `$1${translatedSeparator}$2$3`);
        }
    }

    // Returns true of localeStr is an available locale, else false:
    validLocale(localeStr) {
        return dictionaryForLocale.hasOwnProperty(localeStr);
    }
}

module.exports = Translator;
