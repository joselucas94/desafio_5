
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "./ICreateUserDTO";

let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "José Lucas Santos Tavares",
      email: "j.lucas94@hotmai.com",
      password: "1234",
    }

    const retUser = await createUserUseCase.execute(user);

    expect(retUser).toHaveProperty("email");
  })

});


