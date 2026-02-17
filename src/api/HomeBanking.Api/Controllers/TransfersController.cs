using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeBanking.Api.Data;
using HomeBanking.Api.Models;
using HomeBanking.Api.DTOs;

namespace HomeBanking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransfersController : ControllerBase
{
    private readonly HomeBankingContext _context;
    private readonly ILogger<TransfersController> _logger;

    public TransfersController(HomeBankingContext context, ILogger<TransfersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<TransferResponse>> CreateTransfer([FromBody] TransferRequest request)
    {
        // Validate request
        if (request.Amount <= 0)
        {
            return BadRequest(new TransferResponse(false, "Amount must be greater than zero"));
        }

        if (request.FromAccountId == request.ToAccountId)
        {
            return BadRequest(new TransferResponse(false, "Cannot transfer to the same account"));
        }

        // Get accounts
        var fromAccount = await _context.Accounts.FindAsync(request.FromAccountId);
        var toAccount = await _context.Accounts.FindAsync(request.ToAccountId);

        if (fromAccount == null)
        {
            return NotFound(new TransferResponse(false, "Source account not found"));
        }

        if (toAccount == null)
        {
            return NotFound(new TransferResponse(false, "Destination account not found"));
        }

        // Check sufficient balance
        if (fromAccount.Balance < request.Amount)
        {
            return BadRequest(new TransferResponse(false, "Insufficient funds"));
        }

        // Perform transfer
        fromAccount.Balance -= request.Amount;
        toAccount.Balance += request.Amount;

        var transaction = new Transaction
        {
            FromAccountId = request.FromAccountId,
            ToAccountId = request.ToAccountId,
            Amount = request.Amount,
            Category = "Transfer",
            Description = request.Description,
            Date = DateTime.UtcNow,
            Type = "transfer"
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return Ok(new TransferResponse(true, "Transfer completed successfully", transaction.Id));
    }
}
