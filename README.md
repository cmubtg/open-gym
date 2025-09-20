# OpenGym

OpenGym is a web app designed to give CMU students access to occupancy levels of CMU facilities.

## Getting Started

1. Navigate to the `server` directory and run the following command:

    ```bash
    npm install
    ```

2. Similarly, go to the `frontend` directory and run:

    ```bash
    npm install
    ```

3. In the `server` folder, add a `.env` file with the following content, replacing `<port>` and `<uri>` with your desired values:

    ```env
    PORT=<port>
    MONGO_URI=<uri>
    ```

4. In the `server` directory, run the development server:

    ```bash
    npm run dev
    ```

5. In the `frontend` directory, start the frontend application:

    ```bash
    npm run dev
    ```