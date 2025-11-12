const Joi = require("joi");

class UpdateUserDto {
    constructor(name, phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    static get schema() {
        return Joi.object({
            name: Joi.string().max(50).required(),
            phoneNumber: Joi.string().pattern(/^\d{2,3}-\d{3,4}-\d{4}$/).optional(),
        });
    }

    validate() {
        const {error} = UpdateUserDto.schema.validate(this);
        return error ? error.details.map((e) => e.message) : [];
    }
}

module.exports = UpdateUserDto;