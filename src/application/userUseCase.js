const UserEntity = require('../domain/user.js')
const UserRepository = require('../infrastructure/repository/userRepository.js');

const UserStatus = require('../domain/userStatus.js');
const {BusinessRuleError} = require("../common/errors/businessRuleError");

const UserUseCase = {
    // 사용자를 생성하고 반환
    createUser: async (createUserDto) => {
        const userEntity = new UserEntity(createUserDto.email, createUserDto.password, createUserDto.name
            , createUserDto.phoneNumber, UserStatus.ACTIVE);

        if (!userEntity.isValidEmail()) {
            throw new BusinessRuleError("이메일 형식이 잘못되었습니다.");
        }

        const existingUser = await UserRepository.findByEmail(userEntity.email);
        if (existingUser) {
            throw new BusinessRuleError(`이미 존재하는 이메일입니다: ${userEntity.email}`);
        }

        return UserRepository.create(userEntity);
    },

    // 특정 사용자 정보를 가져옴
    getUserById: async (id) => {
        return UserRepository.findById(id);
    },

    // 모든 사용자 목록을 가져옴
    getAllUsers: async () => {
        return UserRepository.findAll();
    },

    // 사용자 정보 업데이트
    updateUser: async (id, updateUserDto) => {
        const userEntity = new UserEntity(null, null, updateUserDto.name
            , updateUserDto.phoneNumber, null);
        return UserRepository.update(id, userEntity);
    },

    // 사용자 삭제
    deleteUser: async (id) => {
        return UserRepository.delete(id);
    }
};

module.exports = UserUseCase;
