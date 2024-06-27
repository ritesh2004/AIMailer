# MERN Stack Email Service Project

## Overview
This project is an email service application powered by Gemini and built using the MERN stack (MongoDB, Express, React, Node.js). The service leverages the Gmail API to access Gmail accounts, allowing users to send, receive, and manage their emails through a custom interface.

## Features
- **Email Sending**: Users can send emails(AI Generated) using their Gmail account.
- **Responsive Design**: User-friendly interface that works across various devices.

## Technologies Used
- **Express**: Backend framework for building the server and handling API requests.
- **Next.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for executing the server-side code.
- **Gmail API**: Google's API for accessing Gmail accounts and handling email operations.
- **Gemini AI**: Integration for enhanced email services and features.

## Getting Started

### Prerequisites
- Node.js and npm installed
- Gmail API credentials (client ID and client secret)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ritesh2004/AIMailer.git
   cd mern-email-service
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the `server` directory.
   - Add the following environment variables:
     ```
     GEMINI_API_KEY = your_gemini_api_key
     CLIENT_ID=your_gmail_client_id
     CLIENT_SECRET=your_gmail_client_secret
     REDIRECT_URI = https://developers.google.com/oauthplayground
     REFRESH_TOKEN = your_refresh_token
     ```

### Running the Application
1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server:**
   ```bash
   cd ../client
   npm start
   ```

3. **Access the application:**
   Open your web browser and navigate to `http://localhost:3000`.


## Contributing
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Google Developers](https://developers.google.com/gmail/api) for the Gmail API documentation and resources.
- [MERN Stack](https://www.mongodb.com/mern-stack) for providing a robust stack for building this application.
- [Gemini](https://www.gemini.google.com) for powering the enhanced email services.

---

Feel free to reach out if you have any questions or need further assistance. Happy coding!
