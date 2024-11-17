# Secure File Sharing System
  A RESTful API-based secure file-sharing system with role-based access for two types of users:

   - Ops Users: Can upload specific file types.
   - Client Users: Can sign up, verify email, view files, and download securely using encrypted URLs.
   - 
# Screenshots

![Screenshot (1412)](https://github.com/user-attachments/assets/917cdedc-ba60-45ac-931f-76ca7fa6e53d)

![Screenshot (1421)](https://github.com/user-attachments/assets/ae91a40f-1bbb-4533-9c98-05c61c39d5d0)
![Screenshot (1422)](https://github.com/user-attachments/assets/f3c7a98c-cc0e-4825-b198-b81ba4ada58d)
![Screenshot (1423)](https://github.com/user-attachments/assets/e65b43cd-463d-4dac-b474-e472edaf775c)
![Screenshot (1424)](https://github.com/user-attachments/assets/305dbb8c-59eb-4937-a125-7277bcbee968)
![Screenshot (1425)](https://github.com/user-attachments/assets/76fdfeb6-499e-41b7-9832-e0de6e95d6a3)


# Features
- Ops User
- Login.
- Upload files (allowed formats: PPTX, DOCX, XLSX).
- Client User
- Sign up and receive an email verification link.
- Login after email verification.
- View a list of uploaded files.
- Download files securely via encrypted URLs.
- Security

# Role-based permissions.
JWT authentication.
Encrypted download links accessible only to authorized Client Users.

# Technologies Used
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JWT (JSON Web Tokens)
Email Service: Nodemailer (SMTP)
File Upload: Multer
Encryption: Crypto (for secure URLs)

# Installation and Setup

# Prerequisites
Node.js (v16 or higher)
MongoDB (local or cloud)
SMTP credentials (e.g., Gmail, SendGrid)

# Steps
Clone the Repository


git clone [(https://github.com/ChetanPalade/EZAssignment.git)]
cd secure-file-sharing

# Install Dependencies

npm install

Create a .env File Add the following environment variables:

PORT=3000
JWT_SECRET= your_jwt_secret
DB_URI=mongodb://localhost:27017/secureFileSharing
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# Run the Application

node server.js
The server will start at http://localhost:3000.

# API Endpoints

User Authentication
1. Signup (Client User)
Method: POST
Endpoint: /signup
Body:
{
  "email": "client@example.com",
  "password": "securePassword123",
  "name": "Client User"
}

2. Email Verification
Method: POST
Endpoint: /verify-email
Body:

{
  "token": "<verification_token>"
}

3. Login (Ops or Client User)
Method: POST
Endpoint: /login
Body:
{
  "email": "user@example.com",
  "password": "securePassword123"
}
Ops User

5. Upload File
Method: POST
Endpoint: /upload
Headers:

{
  "Authorization": "Bearer <JWT_TOKEN>"
}

Body: Form Data
Key: file
Value: Upload a valid file (pptx, docx, xlsx).
Client User

6. List Files
Method: GET
Endpoint: /files
Headers:

{
  "Authorization": "Bearer <JWT_TOKEN>"
}

7. Download File
Method: POST
Endpoint: /download
Headers:
{
  "Authorization": "Bearer <JWT_TOKEN>"
}

Body:
{
  "fileId": "<file_id>"
}

8. Access Secure Download URL
Method: GET
Endpoint: /download-file/<SECURE_TOKEN>
Headers:

{
  "Authorization": "Bearer <JWT_TOKEN>"
}

# Project Structure

secure-file-sharing/
├── controllers/       # Business logic for APIs
├── models/            # Mongoose schemas
├── routes/            # API routing
├── middlewares/       # Authentication and validation
├── uploads/           # File storage
├── .env               # Environment variables
├── server.js          # Main server file
├── package.json       # Project dependencies
└── README.md          # Documentation

# Testing
Using Thunder Client or Postman
Import the API endpoints into your client.
Use the request formats mentioned above for testing.
Troubleshooting
Email Not Sending:

Verify SMTP credentials in .env.
Ensure less secure app access is enabled for your email account or use an app password.
Database Errors:

Confirm MongoDB is running and the URI is correct.
Invalid JWT:

Ensure you include a valid JWT token in the Authorization header.
Future Enhancements
Add support for more file types.
Implement file expiration for download links.
Enhance security with role-based access control and rate limiting.
