import validator from 'validator';

// Document : https://www.npmjs.com/package/validator

export const validateEmail = (email = '') => {
	return validator.isEmail(email);
};

export const validateUsername = (username = '') => {
	return validator.isAlphanumeric(username, [ 'en-US' ]) && validator.isLength(username, { min: 3, max: 32 });
};

//use for login (maybe username or email), not register.
export const validateUsernameLogin = (username = '') => {
	return validator.isLength(username, { min: 3, max: 32 });
};

export const validateDisplayName = (displayName = '') => {
	return validator.isLength(displayName, { max: 32 });
};

export const validateDateOfBirth = (dateOfBirth = '') => {
	const newD = new Date(dateOfBirth);
	return validator.isDate(dateOfBirth, 'YYYY-MM-DD') && newD < new Date();
};

export const validatePassword = (password = '') => {
	return validator.isLength(password, { min: 8, max: 128 });
};

export const validateConfirmPassword = (password = '', confirmPassword = '') => {
	return password === confirmPassword;
};
