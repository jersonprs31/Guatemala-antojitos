# Guatemala Antojitos

## Product Demo Summary
Guatemala Antojitos solves the problem of discovering, preserving, and managing information about traditional Guatemalan cuisine. The intended users include food enthusiasts, tourists exploring Guatemalan culture, and local restaurant administrators or cultural curators who need a clean, modern way to catalog their offerings. 

The application provides immense value by offering a centralized, visually appealing digital catalog of regional street food and traditional dishes. Standard users experience a seamless flow where they can browse the public catalog, search for specific cravings, and click into detailed views to learn about a dish's origin, category, and description.

For administrators, the platform provides a secure, authenticated dashboard. Once logged in, administrators have full CRUD (Create, Read, Update, Delete) capabilities. They can seamlessly add new dishes, edit existing entries, remove outdated ones, and manage food categories via an integrated API, ensuring the catalog is always accurate and up to date.


## Setup and Deployment Instructions

### Local Setup
1. Clone the repository: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```text
   DATABASE_URL="your_neon_postgres_connection_string"
   AUTH_SECRET="your_generated_auth_secret"