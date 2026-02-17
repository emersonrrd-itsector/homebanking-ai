export interface Account {
  id: number;
  accountNumber: string;
  accountHolder: string;
  balance: number;
  currency: string;
  createdAt: string;
}

export interface Transaction {
  id: number;
  fromAccountId: number | null;
  toAccountId: number | null;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: string;
  fromAccount?: Account | null;
  toAccount?: Account | null;
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  transactionId?: number;
}
