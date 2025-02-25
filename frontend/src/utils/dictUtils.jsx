import _ from 'lodash';

// Merges two dictionaries (deep merge without mutating original)
const mergeDicts = (og, so) => _.merge({}, og, so);

// Sets a value at a nested key (supports both dot notation and array path)
const setSubKey = (dict, keys, value) => {
    _.set(dict, keys, value);
    return dict;
};

const cloneDict = (dict) => structuredClone(dict);

// Gets a value at a nested key (returns an empty string if key is not found)
const getSubKey = (dict, keys) => {
    const keyPath = Array.isArray(keys) ? keys : keys.split(".");
    return keyPath.reduce((obj, key) => (obj && key in obj ? obj[key] : undefined), dict) ?? "";
};

// Maps dictionary values to their "value" property
const mapValueToName = (dict) =>
    Object.fromEntries(Object.entries(dict).map(([key, val]) => [key, val?.value]));

// Compares two lists or objects (deep comparison)
const listsAreEqual = (dictList1, dictList2) => _.isEqual(dictList1, dictList2);
const dictsAreEqual = listsAreEqual; // Alias for clarity

export { mergeDicts, setSubKey, getSubKey, mapValueToName, listsAreEqual, dictsAreEqual, cloneDict };
