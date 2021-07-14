import { CreateStatementUseCase } from "./CreateStatementUseCase";
import {InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository} from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { ICreateStatementDTO } from "./ICreateStatementDTO";
import { NumericLiteral } from "@babel/types";
import { AppError } from "../../../../shared/errors/AppError";

let createStatementUseCase: CreateStatementUseCase;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase;

describe("Create Statement", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new statement", async () => {

    enum OperationType {
      DEPOSIT = 'deposit',
      WITHDRAW = 'withdraw',
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

    expect(result).toHaveProperty("id");


  });

  it("should not be able to create a new statement to a non existent user", async () => {

    enum OperationType {
      DEPOSIT = 'deposit',
      WITHDRAW = 'withdraw',
    }
    expect( async () =>{
      const operation: ICreateStatementDTO= {
        user_id: "1234",
        type: 'deposit' as OperationType,
        amount: 200,
        description: "teste depósito"
    }

    const result = await createStatementUseCase.execute(operation);

    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a withdraw to a user with no enough funds", () => {

    expect( async () => {
      enum OperationType {
        DEPOSIT = 'deposit',
        WITHDRAW = 'withdraw',
      }

      const user: ICreateUserDTO = {
        name: "José Lucas Santos Tavares",
        email: "j.lucas94@hotmai.com",
        password: "1234",
      }

      const retUser = await createUserUseCase.execute(user);

      const operation: ICreateStatementDTO= {
          user_id: String(retUser.id),
          type: 'withdraw' as OperationType,
          amount: 200,
          description: "teste depósito"
      }

      const result = await createStatementUseCase.execute(operation);

    }).rejects.toBeInstanceOf(AppError);
  });
});
