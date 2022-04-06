import { CreateUser, CreateUserRepository,  } from './create-user-repo'

const createUserRepo: jest.Mocked<CreateUserRepository> = {
  create: jest.fn()
}
createUserRepo.create.mockResolvedValue({ name: 'final' })
  
describe('call interface', () => { 
  test('should interface method', async () => { 
    const sut = new CreateUser(createUserRepo)
    await sut.create({ id: '1' })
    expect(createUserRepo.create).toHaveBeenCalledTimes(1)
    expect(createUserRepo.create).toHaveBeenCalledWith({ id: '1'})
  })

  test('should create works and resolve value', async () => { 
    
    const sut = new CreateUser(createUserRepo)
    const user = await sut.create({ id: '1' })
    expect(createUserRepo.create).toHaveBeenCalledTimes(2)
    expect(user).toEqual({ name: 'final'})
  })
  
  test('should create not works and send error', async () => {
    
    const sut = new CreateUser(createUserRepo)
    createUserRepo.create.mockRejectedValueOnce(new Error('msg'))

    let error: any
    try {
      await sut.create({ id: '0' })
    } catch (e) {
      error = e
    }
    expect(error.name).toBe('Error')
    expect(error.message).toBe('msg')
  })
})