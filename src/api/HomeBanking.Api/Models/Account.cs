namespace HomeBanking.Api.Models;

public class Account
{
    public int Id { get; set; }
    public string AccountNumber { get; set; } = string.Empty;
    public string AccountHolder { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public string Currency { get; set; } = "USD";
    public DateTime CreatedAt { get; set; }
    
    public ICollection<Transaction> TransactionsFrom { get; set; } = new List<Transaction>();
    public ICollection<Transaction> TransactionsTo { get; set; } = new List<Transaction>();
}
