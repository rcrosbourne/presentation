# CLAUDE.md - Coding Guidelines

## Build/Development Commands
- `composer install`: Install PHP dependencies
- `npm install`: Install JS dependencies
- `composer dev`: Run local development server, queue, logs and vite together
- `npm run dev`: Start Vite development server
- `php artisan test`: Run all PHP tests
- `php artisan test --filter TestName`: Run a specific PHP test
- `php artisan pest:test TestName`: Create a new Pest PHP test

## Linting/Formatting Commands
- `npm run lint`: Run ESLint to fix JS/TS issues
- `npm run format`: Run Prettier on resources directory
- `npm run types`: Run TypeScript typechecking
- `vendor/bin/pint`: Run Laravel Pint PHP code formatter

## Code Style Guidelines
- **PHP**: Follow PSR-12 standards, use type hints, return types
- **JS/TS**: Use strict TypeScript, proper React hooks usage
- **Imports**: Use prettier-plugin-organize-imports for organization
- **Components**: Follow existing project patterns in `/resources/js/components`
- **Naming**: Use camelCase for JS variables/functions, PascalCase for components/classes
- **Error Handling**: Use try/catch blocks with appropriate logging
- **CSS**: Use Tailwind CSS utility classes, follow existing component patterns