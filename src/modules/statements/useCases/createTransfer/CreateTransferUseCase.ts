import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../../users/repositories/UsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "../createStatement/CreateStatementError";


interface IRequest {
  user_id: string;
  receiver_id: string;
  amount: number;
  description: string;
}
@injectable()
class CreateTransferUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StatementsRepository")
    private statementRepository: IStatementsRepository,
  ){

  }
  async execute({user_id, receiver_id, amount, description}: IRequest){

    const receiver = this.usersRepository.findById(receiver_id);

    if(!receiver) {
      throw new AppError("This user does not exists!");
    };

    const {balance} = await this.statementRepository.getUserBalance({user_id});


    if (balance < amount) {
      throw new CreateStatementError.InsufficientFunds()
    }

   const transfer = await this.statementRepository.transfer({user_id, receiver_id, amount,description});

   return transfer;

  }

}

export { CreateTransferUseCase };
