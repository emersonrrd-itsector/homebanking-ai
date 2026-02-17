import { useEffect, useState } from 'react';
import type { Account, Transaction } from '@/types';
import { accountsApi, transactionsApi } from '@/services/api';
import { AccountCard } from '@/components/AccountCard';
import { TransactionsTable } from '@/components/TransactionsTable';
import { TransferForm } from '@/components/TransferForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [accountsData, transactionsData] = await Promise.all([
        accountsApi.getAll(),
        transactionsApi.getAll(),
      ]);
      setAccounts(accountsData);
      setTransactions(transactionsData);
    } catch (err) {
      setError('Failed to load data. Please make sure the API is running on http://localhost:5000');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-2 text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Home Banking</h1>
          <p className="text-muted-foreground">Manage your accounts and transactions</p>
        </header>

        {/* Account Cards */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </section>

        {/* Transfer Form */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Make a Transfer</h2>
          <div className="max-w-2xl">
            <TransferForm accounts={accounts} onTransferComplete={loadData} />
          </div>
        </section>

        {/* Transactions Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <TransactionsTable transactions={transactions} />
              ) : (
                <p className="text-muted-foreground text-center py-8">No transactions found</p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default App;

