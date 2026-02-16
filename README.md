# Home Banking AI

A full-stack home banking application built with ASP.NET Core 9 and React+Vite+TypeScript.

## Features

### Backend (ASP.NET Core 9)
- RESTful Web API with controllers
- Entity Framework Core InMemory database
- Seeded data: 3 accounts and 20 transactions
- Scalar OpenAPI documentation
- Health check endpoint
- CORS enabled for frontend
- xUnit tests

### Frontend (React+Vite+TypeScript)
- React 18 with TypeScript
- Vite with SWC for fast builds
- Tailwind CSS for styling
- shadcn/ui component library
- Dark theme by default
- Account balance cards
- Transaction list with category badges
- Transfer form with validation

### Testing
- xUnit API tests
- Playwright E2E tests
  - Dashboard load test
  - Transaction list test
  - Transfer flow test
- GitHub Actions CI

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/emersonrrd-itsector/homebanking-ai.git
cd homebanking-ai
```

### Run the API

```bash
cd src/api/HomeBanking.Api
dotnet restore
dotnet run
```

The API will be available at:
- HTTP: http://localhost:5000
- Scalar OpenAPI: http://localhost:5000/scalar/v1
- Health Check: http://localhost:5000/health

### Run the Frontend

In a new terminal:

```bash
cd src/web
npm install
npm run dev
```

The frontend will be available at http://localhost:5173

### Run API Tests

```bash
cd src/api/HomeBanking.Api.Tests
dotnet test
```

### Run E2E Tests

Make sure both API and frontend are running, then:

```bash
cd tests/e2e
npm install
npx playwright install chromium
npm test
```

## Project Structure

```
homebanking-ai/
├── .devcontainer/          # Dev container configuration for Codespaces
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow
├── src/
│   ├── api/
│   │   ├── HomeBanking.Api/           # ASP.NET Core API
│   │   │   ├── Controllers/           # API controllers
│   │   │   ├── Data/                  # DbContext and seed data
│   │   │   ├── DTOs/                  # Data transfer objects
│   │   │   └── Models/                # Entity models
│   │   └── HomeBanking.Api.Tests/     # xUnit tests
│   └── web/                           # React frontend
│       ├── src/
│       │   ├── components/            # React components
│       │   │   └── ui/                # shadcn/ui components
│       │   ├── lib/                   # Utilities
│       │   ├── services/              # API service layer
│       │   └── types/                 # TypeScript types
│       └── ...
└── tests/
    └── e2e/                           # Playwright E2E tests
        └── tests/                     # Test specs
```

## API Endpoints

### Accounts
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions?accountId={id}` - Get transactions for an account
- `GET /api/transactions/{id}` - Get transaction by ID

### Transfers
- `POST /api/transfers` - Create a new transfer

### Health
- `GET /health` - Health check endpoint

## Development with Codespaces

This project includes a devcontainer configuration for GitHub Codespaces. Click the "Code" button on GitHub and select "Create codespace on main" to get started with a fully configured development environment.

## CI/CD

The project uses GitHub Actions for continuous integration. On every pull request:
1. API tests are run
2. Frontend is built
3. E2E tests are executed

## Tech Stack

- **Backend**: ASP.NET Core 9, EF Core, Scalar
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Testing**: xUnit, Playwright
- **CI/CD**: GitHub Actions
- **Development**: GitHub Codespaces with devcontainer

## License

MIT
