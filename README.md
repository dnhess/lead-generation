# Lead Management Frontend Application

A Next.js application for creating, retrieving, and updating leads with a public submission form and an internal management interface.

## Table of Contents

- [Lead Management Frontend Application](#lead-management-frontend-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
    - [Public Lead Form](#public-lead-form)
    - [Internal Lead Management UI](#internal-lead-management-ui)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)
  - [Documentation](#documentation)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

This application provides a comprehensive lead management system with two main components:

1. **Public Lead Form**: A publicly accessible form for prospects to submit their information
2. **Internal Lead Management UI**: A secure interface for managing and updating lead statuses

## Features

### Public Lead Form
- Collects prospect information including personal details, LinkedIn profile, and visas of interest
- Resume/CV file upload functionality
- Form validation and submission confirmation
- Responsive design for all devices

### Internal Lead Management UI
- Secure, authenticated access
- Comprehensive lead listing with all submitted information
- Lead status management (PENDING → REACHED_OUT)
- Filtering and sorting capabilities

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or later)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dnhess/lead-management-frontend.git
   cd lead-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration values.

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to:
   - Public form: [http://localhost:3000/](http://localhost:3000/)
   - Internal dashboard (requires login): [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

```
lead-management-frontend/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── admin/              # Internal dashboard pages
│   ├── login/              # Login Page
│   └── layout.tsx          # Root layout
├── components/             # Reusable React components
├── lib/                    # Utility functions and helpers
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── .env.example            # Example environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## Documentation

Additional documentation is available in the following files:

- [Design Document](./DESIGN.md) - Detailed design choices and architecture
- [Auth Document](./AUTH.md) - Details on authenication

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Deployment

This application can be deployed to Vercel with minimal configuration:

```bash
npm run build
npm run start
# or
vercel
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.