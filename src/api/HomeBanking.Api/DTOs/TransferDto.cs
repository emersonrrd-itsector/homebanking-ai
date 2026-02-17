namespace HomeBanking.Api.DTOs;

public record TransferRequest(
    int FromAccountId,
    int ToAccountId,
    decimal Amount,
    string Description
);

public record TransferResponse(
    bool Success,
    string Message,
    int? TransactionId = null
);
