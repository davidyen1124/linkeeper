# Clean Architecture Implementation

This server has been refactored from MVC pattern to Clean Architecture pattern. The new structure follows the principles of Clean Architecture as defined by Robert C. Martin.

## Architecture Layers

### 1. Domain Layer (`src/domain/`)
The innermost layer containing business entities and rules.

- **Entities** (`entities/`): Core business objects
  - `Url.ts`: URL entity with validation and business rules
  
- **Repositories** (`repositories/`): Interfaces for data access
  - `UrlRepository.ts`: Interface defining URL data operations
  
- **Services** (`services/`): Interfaces for external services
  - `MetadataService.ts`: Interface for fetching URL metadata

### 2. Application Layer (`src/application/`)
Contains application-specific business rules and use cases.

- **Use Cases** (`use-cases/`): Application business logic
  - `AddUrlUseCase.ts`: Handles adding new URLs with metadata
  - `GetUrlsUseCase.ts`: Handles retrieving all URLs

### 3. Infrastructure Layer (`src/infrastructure/`)
Contains implementations of interfaces and external concerns.

- **Database** (`database/`): Data persistence implementations
  - `MongoUrlRepository.ts`: MongoDB implementation of UrlRepository
  
- **Services** (`services/`): External service implementations
  - `HttpMetadataService.ts`: HTTP implementation for fetching metadata
  
- **Web** (`web/`): Web framework related code
  - `controllers/UrlController.ts`: HTTP request/response handling
  - `routes/urlRoutes.ts`: Route definitions
  
- **Config** (`config/`): Configuration and dependency injection
  - `DependencyContainer.ts`: Dependency injection container

### 4. Legacy Folders (to be removed)
- `controllers/`: Old MVC controllers
- `models/`: Old Mongoose models
- `routes/`: Old route definitions

## Benefits of Clean Architecture

1. **Independence**: Business logic is independent of frameworks, UI, and databases
2. **Testability**: Easy to unit test business logic without external dependencies
3. **Flexibility**: Easy to swap implementations (e.g., change from MongoDB to PostgreSQL)
4. **Maintainability**: Clear separation of concerns makes code easier to maintain
5. **Scalability**: Well-organized structure supports growing applications

## Dependency Flow

```
Infrastructure → Application → Domain
```

Dependencies point inward. The Domain layer has no dependencies on outer layers.

## Key Principles Applied

1. **Dependency Inversion**: High-level modules don't depend on low-level modules
2. **Single Responsibility**: Each class has one reason to change
3. **Interface Segregation**: Clients depend only on interfaces they use
4. **Open/Closed**: Open for extension, closed for modification

## Usage

The application is initialized through the `DependencyContainer` which wires up all dependencies using constructor injection. This makes the system highly testable and maintainable.

## Migration Notes

- Old MVC controllers have been replaced with Clean Architecture controllers
- Business logic moved from controllers to use cases
- Data access abstracted through repository interfaces
- External services abstracted through service interfaces 