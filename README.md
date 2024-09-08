
# ResideHub

**ResideHub** is a property management web application designed primarily for property owners. It provides a streamlined, easy-to-use platform for managing rental properties, tenants, and payment collections. The app focuses on helping owners manage general properties with features such as tenant management, rent payments, and more.

Live at https://residehub.vercel.app/

## Develop locally

1. Clone the repository.

2. Install dependencies
   ```
   npm install
    ```

3. Run development server
    ```
    npx nx dev reside-hub
    ```

## Features

- **Tenant Management**: Add, remove, and manage tenants easily. Keep track of tenant information and manage tenant-related documents.
- **Rent Payment System**: Secure and simple payment portal for collecting and tracking rent payments from tenants.
- **Property Information**: Store and manage all details regarding properties, including addresses and tenant occupancy.
- **Payment History**: View detailed transaction logs and payment histories for each property.
  
## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Supabase
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase's built-in authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Usage

- After logging in, property owners can view and manage all their properties.
- Owners can add tenants, view tenant details, and handle rent collection through the integrated payment system.

### Future Enhancements

- **Automated Rent Reminders**: Automatically notify tenants of upcoming rent payments.
- **Maintenance Requests**: Allow tenants to submit maintenance requests directly through the platform.

## Contributing

We welcome contributions to ResideHub! Please submit a pull request or open an issue if you'd like to contribute to the project.

## License

This project is licensed under the MIT License.
