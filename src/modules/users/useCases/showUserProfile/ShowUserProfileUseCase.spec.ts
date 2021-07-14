
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Show Profile" , () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to show an existent profile", async () => {

    const user: ICreateUserDTO = {
      name: "José Lucas Santos Tavares",
      email: "j.lucas94@hotmai.com",
      password: "1234",
    }

    const {id} = await createUserUseCase.execute(user);

    const result = await showUserProfileUseCase.execute(String(id));

    expect(result).toHaveProperty("id");


  });

  it("should not be able to show a non existent profile", () => {

    expect(async ()=>{
      await showUserProfileUseCase.execute("1234");
    }).rejects.toBeInstanceOf(AppError);
  })
});





