import type { Transaction } from '@/types';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const getCategoryVariant = (category: string): "default" | "secondary" | "destructive" | "outline" => {
  const categoryMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    'Salary': 'default',
    'Transfer': 'secondary',
    'Groceries': 'outline',
    'Shopping': 'outline',
    'Utilities': 'outline',
    'Housing': 'destructive',
    'Dining': 'outline',
    'Transportation': 'outline',
    'Healthcare': 'outline',
    'Entertainment': 'outline',
    'Investment': 'default',
    'Freelance': 'default',
  };
  return categoryMap[category] || 'outline';
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTransactionAmount = (transaction: Transaction) => {
    const isCredit = transaction.type === 'credit' || transaction.toAccountId !== null;
    const sign = isCredit ? '+' : '-';
    return `${sign}$${transaction.amount.toFixed(2)}`;
  };

  const getAmountClass = (transaction: Transaction) => {
    const isCredit = transaction.type === 'credit' || transaction.toAccountId !== null;
    return isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.date)}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              <Badge variant={getCategoryVariant(transaction.category)}>
                {transaction.category}
              </Badge>
            </TableCell>
            <TableCell className="capitalize">{transaction.type}</TableCell>
            <TableCell className={`text-right font-medium ${getAmountClass(transaction)}`}>
              {getTransactionAmount(transaction)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
