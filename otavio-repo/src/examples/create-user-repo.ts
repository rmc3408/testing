
interface User {
  name: string
}
interface IReqParams {
  id: string
}

export interface CreateUserRepository {
  create(requestModel: IReqParams): Promise<User | never>;
}

export class CreateUser {
  private createUserRepo: CreateUserRepository

  constructor(createUR: CreateUserRepository) {
    this.createUserRepo = createUR
  }

  async create(userModel: IReqParams): Promise<User> {
    const u = await this.createUserRepo.create(userModel)
    return u
  }
}