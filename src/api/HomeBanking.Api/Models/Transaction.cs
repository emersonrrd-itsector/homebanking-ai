namespace HomeBanking.Api.Models;

public class Transaction
{
    public int Id { get; set; }
    public int? FromAccountId { get; set; }
    public int? ToAccountId { get; set; }
    public decimal Amount { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Type { get; set; } = string.Empty; // "debit", "credit", "transfer"
    
    public Account? FromAccount { get; set; }
    public Account? ToAccount { get; set; }
}
