import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    /* Verifica se o tipo é válido */
    /* Compara o valor do array com o type */
    /* Se não incluir retorna true, por isso ![] */
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid!');
    }

    if (type === 'outcome' && total < value) {
      throw new Error("You don't have enought money");
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
