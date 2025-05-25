# Business Intelligence (BI) Tool

#Project Overview

This project is a mini Business Intelligence (BI) tool designed to demonstrate key frontend development, UI/UX design, and state management skills. It features robust user authentication, a dynamic dashboard for data visualization, and the display of meaningful business metrics. The goal was to create a fully functional and visually appealing application that provides insights into simulated business data.

# Features

### User Authentication

* **Login Page:**
    * Secure user login with email and password.
    * "Keep me logged in" functionality: Users can choose to maintain their session.
    * **Auto-Logout:** If "Keep me logged in" is not selected, users are automatically logged out after 1 minute of inactivity for security.
* **Registration Page:**
    * Allows new users to register with full name, email, and password.
    * Comprehensive form validation and error handling for a smooth user experience.
* **Protected Routes:**
    * Ensures that only authenticated users can access the dashboard and other protected areas of the application.

### Dashboard Page

A responsive and insightful dashboard providing key business metrics and visualizations:

* **Metrics Summary:**
    * Key performance indicators (KPIs) like Total Users, Active Sessions, and Sales Revenue are displayed using intuitive cards.
* **Charts:**
    * **Line Chart:** Visualizes sales trends over time.
    * **Bar Chart:** Illustrates user growth patterns.
    * **Pie/Donut Chart:** Shows category distribution, offering a quick overview of proportions.
* **Data Table:**
    * Displays a table of **new user data**, providing insights into recent registrations.
    * Allows **sorting** by various columns.
    * Supports **multiple filters simultaneously**, enabling users to refine data views based on several criteria at once (e.g., filter by date range AND user status).
* **Auto-Logout Integration:**
    * The 1-minute inactivity auto-logout feature (when "Keep me logged in" is not selected) extends to the dashboard, ensuring secure sessions.

## 💻 Technical Stack

* **Frontend Framework:** Next.js
* **Styling:** Tailwind CSS
* **Component Library:** Material-UI (MUI) - Leveraged for a professional and consistent UI/UX.
* **Data Visualization:** Recharts - Used for rendering interactive and customizable charts.
* **Routing & State Management:** Implemented using Next.js middleware and React hooks/Context API for efficient and scalable state management.
* **API Mocking:** MockAPI.io - Utilized an external mocking service to simulate API calls during development, allowing for independent frontend progress.
* **API Calls:** Leveraged **React Query (or similar "mutations" concept)** for efficient and declarative API calls across the application. This greatly simplifies data fetching, caching, and state synchronization, ensuring data is always fresh and easily accessible.

## 💡 Design & Architectural Considerations

* **Side Drawer Navigation:** A key design choice was the implementation of a **side drawer for primary navigation**. This approach provides a consistent and easily accessible navigation system, making it intuitive for users to switch between different pages and features within the BI tool. It offers better screen real estate management, especially on smaller devices, and enhances the overall user experience by keeping navigation controls organized and out of the main content area.
* **Authentication Provider (`AuthProvider`):**
    The application utilizes a custom `AuthProvider` built with React Context. This provider centralizes all authentication-related logic, including user state (`user`, `isAuthenticated`), loading states, and core authentication functions (`login`, `register`, `logout`). It manages session persistence (using "Keep me logged in") and implements the crucial auto-logout feature based on user inactivity. By wrapping the entire application, `AuthProvider` makes authentication status and actions readily available to any nested component via the `useAuth` hook, eliminating the need for prop drilling and simplifying state management across the app.
* **Unified Theming with MUI:**
    To ensure a cohesive and professional aesthetic, the application extensively uses **Material-UI's (MUI) theming capabilities**. This allows for a unified approach to **font styling, color palettes**, and component variations across the entire application. By defining the theme centrally, we can easily maintain design consistency, facilitate rapid UI development, and ensure a polished user experience.
* **Responsiveness:** The application is built with a mobile-first approach, ensuring a seamless experience across various device sizes.
* **Modularity:** Components are designed to be reusable and modular, promoting a clean codebase and ease of maintenance.
* **User Experience (UX):** Emphasis was placed on creating an intuitive and visually appealing interface to make data exploration enjoyable.
* **Form Management:** Formik is used for robust form handling and validation, ensuring reliable user input.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Fruity3010/Business-intelligence.git](https://github.com/Fruity3010/Business-intelligence.git)
    cd Business-intelligence
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Mock API:**
    This project uses MockAPI.io for mock API calls. You don't need a `.env` file for API keys as MockAPI.io manages authentication on their server.
    * Ensure your application's API call logic points to the correct MockAPI.io endpoints. If you need to set up new endpoints, refer to the MockAPI.io documentation.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

The application is deployed on **Vercel**. You can access it [here](https://business-intelligence-demo.vercel.app/).

## 

Feel free to fork the repository and contribute.
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request


Fruity3010 - [dblur3010@gmail.com](mailto:dblur3010@gmail.com)

Project Link: [https://github.com/Fruity3010/Business-intelligence.git](https://github.com/Fruity3010/Business-intelligence.git)
