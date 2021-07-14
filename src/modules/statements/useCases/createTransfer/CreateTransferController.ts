import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransferUseCase } from "./CreateTransferUseCase";


class CreateTransferController {
  async handle(request: Request, response: Response){
    const { receiver_id} = request.params;
    const { id: user_id } = request.user;
    const { amount, description} = request.body

    const createTransfer =  container.resolve(CreateTransferUseCase);

    const transfer = createTransfer.execute({user_id, receiver_id, amount, description});
    return response.status(201).json(transfer);

  }

}

export { CreateTransferController };
