export class CreateTransactionDto {
  constructor(
    public amount: number,

    public receiverEmail: string,

    public category: string
  ) {}
}
