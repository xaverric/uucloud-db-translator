
const TRANSLATION_OLD_VALUE_POSITION = 0;
const TRANSLATION_NEW_VALUE_POSITION = 1;

const replaceValue = (document, oldValue, newValue) => {
    return document.replaceAll(oldValue, newValue);
};

const performReplacements = (document, translationConfiguration) => {
    let modifiedDocument = document.slice();
    for (let translation of translationConfiguration) {
        modifiedDocument = replaceValue(modifiedDocument, translation[TRANSLATION_OLD_VALUE_POSITION], translation[TRANSLATION_NEW_VALUE_POSITION]);
    }
    return modifiedDocument;
}

module.exports = {
    replaceValue,
    performReplacements
}