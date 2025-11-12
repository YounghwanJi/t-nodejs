const UserUseCase = require('../../application/userUseCase.js');
const CreateUserDto = require('../dtos/createUserDto.js');
const UpdateUserDto = require('../dtos/updateUserDto');
const {BusinessRuleError} = require("../../common/errors/businessRuleError");

const UserController = {
    // Create
    createUser: async (req, res) => {
        try {
            const {email, password, name, phoneNumber} = req.body;
            const createUserDto = new CreateUserDto(email, password, name, phoneNumber);

            const errors = createUserDto.validate();
            if (errors.length > 0) {
                return res.status(400).json({errors});
            }

            const newUser = await UserUseCase.createUser(createUserDto);

            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof BusinessRuleError) {
                return res.status(400).json({error: error.message});
            }

            res.status(500).json({error: error.message});
        }
    },

    // Read By ID
    getUserById: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await UserUseCase.getUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    // Read All
    getAllUsers: async (req, res) => {
        try {
            const users = await UserUseCase.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    // Update
    updateUser: async (req, res) => {
        try {

            const {id} = req.params;
            const {name, phoneNumber} = req.body;
            const updateUserDto = new UpdateUserDto(name, phoneNumber);

            const errors = updateUserDto.validate();
            if (errors.length > 0) {
                return res.status(400).json({errors});
            }

            const updatedUser = await UserUseCase.updateUser(id, updateUserDto);

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    // Delete
    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;
            const deletedUser = await UserUseCase.deleteUser(id);
            if (deletedUser) {
                res.status(204).json({message: 'User deleted', user: deletedUser});
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

module.exports = UserController;
