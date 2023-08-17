# Welcome to BrainyCoder: Your Ultimate Coding Challenge Platform

<img src='./client/public/icon.png' alt='BrainyCoder-logo' width='100px' >

BrainyCoder is a cutting-edge coding challenge platform that leverages microservices architecture to provide an engaging and efficient experience for both developers seeking challenges and those looking to verify their coding skills. Whether you're a coding enthusiast or a seasoned developer, BrainyCoder has something for everyone.

## Features

- **Microservices Approach**: BrainyCoder utilizes a microservices architecture for scalability, maintainability, and flexibility. Each service focuses on a specific aspect of the platform, ensuring efficient operation.

- **Challenge Creation and Verification**: Users can create coding challenges and submit their solutions. However, before a challenge gets a verified checkmark, users must provide a solution that is evaluated using the verification service. This ensures the quality and accuracy of the challenges.

- **Secure User Authentication**: User login and authentication are handled by a dedicated service. User data is stored securely in a PostgreSQL database, ensuring the privacy and safety of user information.

- **Dockerized Solution Verification**: The verification service employs Docker to run submitted code in isolated containers. This approach guarantees a secure and controlled environment for code execution, preventing potential security risks.

- **Scalable Message Queue**: RabbitMQ serves as the messaging backbone, allowing seamless communication between different services. This ensures that data is efficiently passed between components, even during high loads.

- **React-Powered Client**: BrainyCoder's user-friendly client, built using React and Vite, offers a smooth and intuitive experience. Users can interact with the platform seamlessly, without worrying about the underlying architecture.

## Getting Started

1. **Prerequisites**:
   - Install PostgreSQL and MongoDB on your machine.
   - Make sure Docker is installed for running the code verification service.

2. **Clone the Repository**:
   ```
   git clone https://github.com/darlio88/BrainyCoder.git
   cd BrainyCoder
   ```

3. **Install Dependencies**:
   Install the required packages for all services and the client by entering into each directory and running.
   ```
   npm install
   ```

4. **Start Microservices**:
   Run all microservices, including the client, using the following command:
   ```
   npm run dev
   ```
   Note that, depending on your machine, some of the microservices will require admin privileges since they are directly accessing the docker api.
    ```
   sudo npm run dev
   ```

5. **Access the Platform**:
   Open your browser and navigate to `http://localhost:5173` to access the BrainyCoder platform.

## Technologies Used

- Node.js
- Express.js
- RabbitMQ
- PostgreSQL
- MongoDB
- Docker
- React
- Vite


## Contact me

If you have any questions, suggestions, or feedback, don't hesitate to reach out to us. You can me at `danielomoding173@gmail.com`.

Thank you for visiting my github repository🥳, do not forget to follow me🙏🙏🙏. More fun projects dropping soon!!!.  Happy coding!👨‍💻

```
twitter: @iam_darlio
whatsapp:+25762678544
```

---

*Disclaimer: BrainyCoder is a fictional project created for demonstration purposes. All technologies and approaches mentioned are based on hypothetical design decisions.*
