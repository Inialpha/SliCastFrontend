import _ from 'lodash';


export default function toCamelCaseKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCaseKeys);
    } else if (obj !== null && obj.constructor === Object) {
	return Object.keys(obj).reduce((result, key) => {
	    const camelKey = _.camelCase(key);
	    result[camelKey] = toCamelCaseKeys(obj[key]);
	    return result;
	}, {});
    }
    return obj;
};
