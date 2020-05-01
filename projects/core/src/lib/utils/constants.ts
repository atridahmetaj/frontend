export const constantValidation = {
    nidAndNiptRegex: `[a-zA-ZëçËÇ]{1}\\d{8}[a-zA-ZëçËÇ]{1}`,
    userPasswordMinLength: 6,
    userPasswordMaxLength: 60,
    userFirstNameMinLength: 2,
    userFirstNameMaxLength: 30,
    userLastNameMaxLength: 30,
    phonePattern: `^((\\+?)|(\\-?)|0)?[0-9]{6,}$`
};



export const userPasswordRegex = `^(?=.*[ëçËÇA-Za-z])(?=.*\\d)[ëçËÇA-Za-z\\d@$!%*#?&]{${constantValidation.userPasswordMinLength},${constantValidation.userPasswordMaxLength}}$`;
