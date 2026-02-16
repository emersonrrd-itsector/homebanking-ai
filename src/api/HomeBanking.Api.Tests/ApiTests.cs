using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using HomeBanking.Api.Models;
using HomeBanking.Api.DTOs;
using Xunit;

namespace HomeBanking.Api.Tests;

public class ApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAccounts_ReturnsSeededAccounts()
    {
        // Act
        var response = await _client.GetAsync("/api/accounts");
        
        // Assert
        response.EnsureSuccessStatusCode();
        var accounts = await response.Content.ReadFromJsonAsync<List<Account>>();
        Assert.NotNull(accounts);
        Assert.Equal(3, accounts.Count);
    }

    [Fact]
    public async Task GetTransactions_ReturnsSeededTransactions()
    {
        // Act
        var response = await _client.GetAsync("/api/transactions");
        
        // Assert
        response.EnsureSuccessStatusCode();
        var transactions = await response.Content.ReadFromJsonAsync<List<Transaction>>();
        Assert.NotNull(transactions);
        Assert.True(transactions.Count >= 20);
    }

    [Fact]
    public async Task GetAccount_ReturnsSpecificAccount()
    {
        // Act
        var response = await _client.GetAsync("/api/accounts/1");
        
        // Assert
        response.EnsureSuccessStatusCode();
        var account = await response.Content.ReadFromJsonAsync<Account>();
        Assert.NotNull(account);
        Assert.Equal(1, account.Id);
        Assert.Equal("ACC-1001", account.AccountNumber);
    }

    [Fact]
    public async Task CreateTransfer_WithValidData_ReturnsSuccess()
    {
        // Arrange
        var transferRequest = new TransferRequest(
            FromAccountId: 1,
            ToAccountId: 2,
            Amount: 100.00m,
            Description: "Test transfer"
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/transfers", transferRequest);
        
        // Assert
        response.EnsureSuccessStatusCode();
        var transferResponse = await response.Content.ReadFromJsonAsync<TransferResponse>();
        Assert.NotNull(transferResponse);
        Assert.True(transferResponse.Success);
        Assert.NotNull(transferResponse.TransactionId);
    }

    [Fact]
    public async Task CreateTransfer_WithInsufficientFunds_ReturnsBadRequest()
    {
        // Arrange
        var transferRequest = new TransferRequest(
            FromAccountId: 1,
            ToAccountId: 2,
            Amount: 100000.00m,
            Description: "Test transfer with insufficient funds"
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/transfers", transferRequest);
        
        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task CreateTransfer_ToSameAccount_ReturnsBadRequest()
    {
        // Arrange
        var transferRequest = new TransferRequest(
            FromAccountId: 1,
            ToAccountId: 1,
            Amount: 100.00m,
            Description: "Test transfer to same account"
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/transfers", transferRequest);
        
        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task HealthCheck_ReturnsHealthy()
    {
        // Act
        var response = await _client.GetAsync("/health");
        
        // Assert
        response.EnsureSuccessStatusCode();
    }
}
