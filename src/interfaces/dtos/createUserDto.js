const Joi = require("joi");

class CreateUserDto {
    constructor(email, password, name, phoneNumber) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    static get schema() {
        return Joi.object({
            email: Joi.string().email().max(50).required(),
            password: Joi.string().min(8).max(50).required(),
            name: Joi.string().max(50).required(),
            phoneNumber: Joi.string().pattern(/^\d{2,3}-\d{3,4}-\d{4}$/).optional(),
        });
    }

    validate() {
        const {error} = CreateUserDto.schema.validate(this);
        return error ? error.details.map((e) => e.message) : [];
    }
}

module.exports = CreateUserDto;