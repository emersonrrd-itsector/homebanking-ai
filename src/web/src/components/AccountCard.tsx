import type { Account } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <Card data-testid="account-card">
      <CardHeader>
        <CardTitle className="text-lg">{account.accountHolder}</CardTitle>
        <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {account.currency} {account.balance.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Available Balance
        </p>
      </CardContent>
    </Card>
  );
}
