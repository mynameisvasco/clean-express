import User from "@Domain/Entities/User";

class AuthUser {
  public id: number;
  public name: string;
  public email: string;

  public constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  public toJson() {
    const { id, name, email } = this;
    return { id, name, email };
  }
}

export default AuthUser;
