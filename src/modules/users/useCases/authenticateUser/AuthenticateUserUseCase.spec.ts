
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate test", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {

        name: "Jose lucas",
        email: "j.lucas94@hotmail.com",
        password: "jose1234",

    }
   await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: "j.lucas94@hotmail.com",
      password: "jose1234",
    });

    expect(result).toHaveProperty("token");


  });

  it("should not be able to authenticate a non existent user ", async () => {

     expect(async () => {
      await authenticateUserUseCase.execute({
        email: "j.lucas94@hotmail.com",
        password: "jose1234",
      })
    }).rejects.toBeInstanceOf(AppError);

  });

  it("Should be able to authenticate an user", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Jose lucas",
        email: "j.lucas94@hotmail.com",
        password: "jose1234",
    }
   await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: "j.lucas94@hotmail.com",
      password: "jose12343",
    });

    }).rejects.toBeInstanceOf(AppError);

  });

})
