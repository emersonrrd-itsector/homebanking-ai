using Microsoft.EntityFrameworkCore;
using HomeBanking.Api.Models;

namespace HomeBanking.Api.Data;

public class HomeBankingContext : DbContext
{
    public HomeBankingContext(DbContextOptions<HomeBankingContext> options)
        : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Account
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.AccountNumber).IsRequired().HasMaxLength(20);
            entity.Property(e => e.AccountHolder).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Balance).HasPrecision(18, 2);
            entity.Property(e => e.Currency).HasMaxLength(3);
        });

        // Configure Transaction
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasPrecision(18, 2);
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.Description).HasMaxLength(200);
            entity.Property(e => e.Type).HasMaxLength(20);

            entity.HasOne(e => e.FromAccount)
                .WithMany(a => a.TransactionsFrom)
                .HasForeignKey(e => e.FromAccountId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.ToAccount)
                .WithMany(a => a.TransactionsTo)
                .HasForeignKey(e => e.ToAccountId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Seed data - 3 accounts
        var accounts = new[]
        {
            new Account
            {
                Id = 1,
                AccountNumber = "ACC-1001",
                AccountHolder = "John Smith",
                Balance = 5000.00m,
                Currency = "USD",
                CreatedAt = DateTime.UtcNow.AddMonths(-6)
            },
            new Account
            {
                Id = 2,
                AccountNumber = "ACC-1002",
                AccountHolder = "Jane Doe",
                Balance = 12500.00m,
                Currency = "USD",
                CreatedAt = DateTime.UtcNow.AddMonths(-12)
            },
            new Account
            {
                Id = 3,
                AccountNumber = "ACC-1003",
                AccountHolder = "Bob Johnson",
                Balance = 8750.50m,
                Currency = "USD",
                CreatedAt = DateTime.UtcNow.AddMonths(-3)
            }
        };
        modelBuilder.Entity<Account>().HasData(accounts);

        // Seed data - 20 transactions
        var baseDate = DateTime.UtcNow.AddDays(-30);
        var transactions = new[]
        {
            new Transaction { Id = 1, FromAccountId = 1, ToAccountId = null, Amount = 250.00m, Category = "Salary", Description = "Monthly salary", Date = baseDate.AddDays(1), Type = "credit" },
            new Transaction { Id = 2, FromAccountId = null, ToAccountId = 1, Amount = 45.99m, Category = "Groceries", Description = "Whole Foods Market", Date = baseDate.AddDays(2), Type = "debit" },
            new Transaction { Id = 3, FromAccountId = null, ToAccountId = 1, Amount = 120.00m, Category = "Utilities", Description = "Electric bill", Date = baseDate.AddDays(3), Type = "debit" },
            new Transaction { Id = 4, FromAccountId = 1, ToAccountId = 2, Amount = 500.00m, Category = "Transfer", Description = "Transfer to Jane", Date = baseDate.AddDays(4), Type = "transfer" },
            new Transaction { Id = 5, FromAccountId = 2, ToAccountId = null, Amount = 3000.00m, Category = "Salary", Description = "Monthly salary", Date = baseDate.AddDays(5), Type = "credit" },
            new Transaction { Id = 6, FromAccountId = null, ToAccountId = 2, Amount = 89.99m, Category = "Shopping", Description = "Amazon purchase", Date = baseDate.AddDays(6), Type = "debit" },
            new Transaction { Id = 7, FromAccountId = null, ToAccountId = 2, Amount = 1200.00m, Category = "Housing", Description = "Rent payment", Date = baseDate.AddDays(7), Type = "debit" },
            new Transaction { Id = 8, FromAccountId = 3, ToAccountId = null, Amount = 2200.00m, Category = "Salary", Description = "Monthly salary", Date = baseDate.AddDays(8), Type = "credit" },
            new Transaction { Id = 9, FromAccountId = null, ToAccountId = 3, Amount = 65.50m, Category = "Dining", Description = "Restaurant dinner", Date = baseDate.AddDays(9), Type = "debit" },
            new Transaction { Id = 10, FromAccountId = 2, ToAccountId = 3, Amount = 300.00m, Category = "Transfer", Description = "Transfer to Bob", Date = baseDate.AddDays(10), Type = "transfer" },
            new Transaction { Id = 11, FromAccountId = null, ToAccountId = 1, Amount = 55.00m, Category = "Transportation", Description = "Gas station", Date = baseDate.AddDays(11), Type = "debit" },
            new Transaction { Id = 12, FromAccountId = null, ToAccountId = 2, Amount = 199.99m, Category = "Shopping", Description = "Electronics store", Date = baseDate.AddDays(12), Type = "debit" },
            new Transaction { Id = 13, FromAccountId = null, ToAccountId = 3, Amount = 42.75m, Category = "Groceries", Description = "Local market", Date = baseDate.AddDays(13), Type = "debit" },
            new Transaction { Id = 14, FromAccountId = 1, ToAccountId = null, Amount = 150.00m, Category = "Freelance", Description = "Consulting work", Date = baseDate.AddDays(14), Type = "credit" },
            new Transaction { Id = 15, FromAccountId = null, ToAccountId = 1, Amount = 79.99m, Category = "Entertainment", Description = "Streaming services", Date = baseDate.AddDays(15), Type = "debit" },
            new Transaction { Id = 16, FromAccountId = null, ToAccountId = 2, Amount = 145.00m, Category = "Healthcare", Description = "Pharmacy", Date = baseDate.AddDays(16), Type = "debit" },
            new Transaction { Id = 17, FromAccountId = 3, ToAccountId = 1, Amount = 200.00m, Category = "Transfer", Description = "Transfer to John", Date = baseDate.AddDays(17), Type = "transfer" },
            new Transaction { Id = 18, FromAccountId = null, ToAccountId = 3, Amount = 99.00m, Category = "Utilities", Description = "Internet bill", Date = baseDate.AddDays(18), Type = "debit" },
            new Transaction { Id = 19, FromAccountId = 2, ToAccountId = null, Amount = 500.00m, Category = "Investment", Description = "Stock dividend", Date = baseDate.AddDays(19), Type = "credit" },
            new Transaction { Id = 20, FromAccountId = null, ToAccountId = 1, Amount = 33.50m, Category = "Dining", Description = "Coffee shop", Date = baseDate.AddDays(20), Type = "debit" }
        };
        modelBuilder.Entity<Transaction>().HasData(transactions);
    }
}
