
interface ICreateTransferDTO {
  user_id: string;
  receiver_id: string;
  description: string;
  amount: number;

}

export{ ICreateTransferDTO };
