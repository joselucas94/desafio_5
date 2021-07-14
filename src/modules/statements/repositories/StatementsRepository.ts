import { constructor } from "tsyringe/dist/typings/types";
import { getRepository, Repository } from "typeorm";

import { Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../useCases/createStatement/ICreateStatementDTO";
import { ICreateTransferDTO } from "../useCases/createTransfer/ICreateTransferDTO";
import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";
import { IStatementsRepository } from "./IStatementsRepository";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class StatementsRepository implements IStatementsRepository {

  private repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }


  async create({
    user_id,
    amount,
    description,
    type
  }: ICreateStatementDTO): Promise<Statement> {
    const statement = this.repository.create({
      user_id,
      amount,
      description,
      type
    });

    return this.repository.save(statement);
  }

  async findStatementOperation({ statement_id, user_id }: IGetStatementOperationDTO): Promise<Statement | undefined> {
    return this.repository.findOne(statement_id, {
      where: { user_id }
    });
  }

  async getUserBalance({ user_id, with_statement = false }: IGetBalanceDTO):
    Promise<
      { balance: number } | { balance: number, statement: Statement[] }
    >
  {
    const user_id_fix = user_id;
    const receiver_id = user_id;
     const statement = await this.repository.find({
      where: [{ user_id }, {receiver_id}]
    });

    console.log(statement);

    const balance = statement.reduce((acc, operation) => {

      if (operation.type === 'deposit') {
        return (acc + Number(operation.amount));
      } else if((operation.type === 'withdraw')) {
        return (acc - Number(operation.amount));
      } else if((operation.type === 'transfer') && (user_id_fix == operation.receiver_id )){
        return (acc + Number(operation.amount));
       } else if((operation.type === 'transfer')&& (user_id_fix == operation.sender_id )&& (user_id_fix != operation.receiver_id )){
          return (acc - Number(operation.amount));
      } else {
        return (Number(operation.amount));
      }
    }, 0)

    if (with_statement) {
      return {
        statement,
        balance
      }
    }

    return { balance }
  }

  async transfer({user_id, amount, receiver_id, description}: ICreateTransferDTO): Promise<Statement> {
    const type =  "transfer" as OperationType;

    const statement = this.repository.create({
      user_id,
      amount,
      description,
      sender_id: user_id,
      receiver_id,
      type
    })

    return this.repository.save(statement);
  }


}
