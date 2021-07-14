import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import {InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository} from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { GetBalanceUseCase} from "./GetBalanceUseCase";

let createStatementUseCase: CreateStatementUseCase;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Create Statement", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository);
  });

  it("get a balance of a user", async () => {

    enum OperationType {
      DEPOSIT = 'deposit',
      WITHDRAW = 'withdraw',
    }

     interface IRequest {
      user_id: string;
    }

    const user: ICreateUserDTO = {
      name: "José Lucas Santos Tavares",
      email: "j.lucas94@hotmai.com",
      password: "1234",
    }

    const retUser = await createUserUseCase.execute(user);

    const operation: ICreateStatementDTO= {
        user_id: String(retUser.id),
        type: 'deposit' as OperationType,
        amount: 200,
        description: "teste depósito"
    }

    const result = await createStatementUseCase.execute(operation);

    const user_id = retUser.id;

    const balance = await getBalanceUseCase.execute({user_id});

   expect(result).toHaveProperty("balance");
  });

});
