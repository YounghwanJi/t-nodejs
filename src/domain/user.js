class UserEntity {
    constructor(email, password, name, phoneNumber, status, created_at = null, updated_at = null) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    // 엔티티는 스스로의 무결성을 지킬 수 있는 로직을 가질 수 있음
    isValidEmail() {
        return this.email.includes('@');
    }
}

module.exports = UserEntity;