using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeBanking.Api.Data;
using HomeBanking.Api.Models;

namespace HomeBanking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly HomeBankingContext _context;
    private readonly ILogger<TransactionsController> _logger;

    public TransactionsController(HomeBankingContext context, ILogger<TransactionsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions(
        [FromQuery] int? accountId = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50)
    {
        var query = _context.Transactions
            .Include(t => t.FromAccount)
            .Include(t => t.ToAccount)
            .AsQueryable();

        if (accountId.HasValue)
        {
            query = query.Where(t => t.FromAccountId == accountId || t.ToAccountId == accountId);
        }

        var transactions = await query
            .OrderByDescending(t => t.Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return transactions;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Transaction>> GetTransaction(int id)
    {
        var transaction = await _context.Transactions
            .Include(t => t.FromAccount)
            .Include(t => t.ToAccount)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (transaction == null)
        {
            return NotFound();
        }

        return transaction;
    }
}
