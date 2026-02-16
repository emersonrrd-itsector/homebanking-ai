import type { Account, Transaction, TransferRequest, TransferResponse } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

export const accountsApi = {
  getAll: async (): Promise<Account[]> => {
    const response = await fetch(`${API_BASE_URL}/accounts`);
    if (!response.ok) throw new Error('Failed to fetch accounts');
    return response.json();
  },

  getById: async (id: number): Promise<Account> => {
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch account');
    return response.json();
  },
};

export const transactionsApi = {
  getAll: async (accountId?: number): Promise<Transaction[]> => {
    const url = accountId
      ? `${API_BASE_URL}/transactions?accountId=${accountId}`
      : `${API_BASE_URL}/transactions`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  getById: async (id: number): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch transaction');
    return response.json();
  },
};

export const transfersApi = {
  create: async (transfer: TransferRequest): Promise<TransferResponse> => {
    const response = await fetch(`${API_BASE_URL}/transfers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transfer),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create transfer');
    }
    
    return data;
  },
};
