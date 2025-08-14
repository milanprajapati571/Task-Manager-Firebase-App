# Task Manager - A Full-Stack React & Firebase Application

A clean, modern, and full-stack task management application built to demonstrate the power and simplicity of using Firebase as a backend service with a React frontend.

Task Manager Screenshot
<img width="1916" height="851" alt="image" src="https://github.com/user-attachments/assets/19ae76f1-9e13-4a2d-90dd-49983afb9fee" />
<img width="1919" height="855" alt="image" src="https://github.com/user-attachments/assets/0101a685-386f-410c-ae8e-3671b5f538b9" />


---

## 🎯 Main Goal

The primary goal of this project is to provide a clear, hands-on example of how to build a modern web application with **Firebase Authentication** and **Firestore Database**. It serves as a practical guide for understanding user authentication flows, real-time data synchronization, and secure database rules in a real-world context.

---

## 💻 Technology Stack

- **Frontend:** [React.js](https://reactjs.org/) (with Hooks)
- **Backend & Database:** [Google Firebase](https://firebase.google.com/)
  - **Authentication:** Manages user sign-up, login, and profile information.
  - **Firestore:** A NoSQL, real-time database for storing user-specific tasks.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first, modern design.
- **Deployment:** [Vercel](https://vercel.com/)

---

## ✨ Features

- **Secure User Authentication:** Users can sign up with a full name, email, and password.
- **Persistent Login:** User sessions are managed, keeping them logged in across browser sessions.
- **Private Task Management:** Each user has their own private list of tasks. Data is secured so one user cannot see another's tasks.
- **Full CRUD Functionality:**
  - **Create:** Add new tasks to the list.
  - **Read:** View all existing tasks in real-time.
  - **Update:** Mark tasks as complete and edit task text.
  - **Delete:** Remove tasks from the list.
- **Real-Time Database:** Changes made to the task list are reflected instantly across all open sessions without needing a page refresh, thanks to Firestore's real-time listeners.
- **Light & Dark Mode:** A theme toggle to switch between light and dark modes for user comfort.
- **Responsive Design:** A clean and functional UI that works seamlessly on desktop and mobile devices.

---

## 🚀 Getting Started: Running the Project Locally

Follow these steps to set up and run this project on your local machine using your own Firebase credentials.

### Step 1: Create Your Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and give your project a name (e.g., "My Task Manager").
3.  Once the project is created, you'll be on the project dashboard. Click the **web icon (`</>`)** to add a web app.
4.  Give your app a nickname and click **"Register app"**. Firebase will provide you with a `firebaseConfig` object. **Copy this object**—you'll need it soon.
5.  In the Firebase console menu, go to **Build > Authentication**. Click the "Get started" button, and on the "Sign-in method" tab, enable the **"Email/Password"** provider.
6.  Next, go to **Build > Firestore Database**. Click **"Create database"**, start in **production mode**, and choose a location for your servers.

### Step 2: Set Up Firestore Security Rules

1.  In the Firestore Database section, go to the **"Rules"** tab.
2.  Replace the default rules with the following secure rule, then click **"Publish"**:
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId}/tasks/{taskId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```

### Step 3: Clone and Configure the Local Project

1.  **Clone the Repository:** Open your terminal and clone this project.
    ```bash
    git clone [https://github.com/milanprajapati571/Task-Manager-Firebase-App.git](https://github.com/milanprajapati571/Task-Manager-Firebase-App.git)
    cd Task-Manager-Firebase-App
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment File:** In the root of the project folder, create a new file named `.env.local`.

4.  **Add Your Firebase Credentials:** Paste the `firebaseConfig` object you copied earlier into the `.env.local` file. The keys **must** start with `REACT_APP_`.
    ```
    REACT_APP_API_KEY="your-api-key"
    REACT_APP_AUTH_DOMAIN="your-auth-domain"
    REACT_APP_PROJECT_ID="your-project-id"
    REACT_APP_STORAGE_BUCKET="your-storage-bucket"
    REACT_APP_MESSAGING_SENDER_ID="your-messaging-sender-id"
    REACT_APP_APP_ID="your-app-id"
    ```

### Step 4: Run the Application

1.  Start the React development server:
    ```bash
    npm start
    ```
2.  Your browser will open to `http://localhost:3000`, and the application will be running, connected to **your** Firebase backend!

---

## 🤝 Contributor

- **Milan Prajapati** - [milanprajapati571](https://github.com/milanprajapati571)
