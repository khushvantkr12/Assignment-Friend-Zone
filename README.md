# 🌐 **Friend Zone**  
---

### 🫂 **A Social Network Application**  

---

## 📖 **Description**  

Friend Request is a modern social network application where users can connect, send friend requests, and manage friendships seamlessly. Built with **React**, **Node.js**, and **MongoDB**, it offers a responsive and dynamic user experience.  

---

## 📂 **File Structure**  

### 🎨 **Frontend**  

```bash
frontend/src/
├── components/
│   ├── Auth/
│   │   ├── Login.js
│   │   └── Signup.js
│   ├── Friends/
│   │   ├── FriendList.js
│   │   ├── FriendRequests.js
│   │   ├── FriendRecommendations.js
│   │   └── SearchUsers.js
│   └── Layout/
│       ├── Navbar.js
│       └── PrivateRoute.js
├── context/
│   └── AuthContext.js
├── pages/
│   ├── Home.js
│   ├── LoginPage.js
│   └── SignupPage.js
├── services/
│   └── api.js
├── App.js
└── index.js

```

### 🛠️ **Backend**  

```bash
backend/
├── controllers/
│   ├── authController.js
│   ├── friendController.js
│   
│   
├── middleware/
│   ├── auth.js
│   
│   
│   
│   
├── models/
│   ├── User.js
│   ├── FriendRequest.js
│  
│  
├── routes/
│   ├── auth.js
│
│   ├── friends.js
│  
├── .env
├── package.json
├── package-lock.json
├── index.js

```

---

## 🖼️ **Screenshots**  


### 🔐 **Login Page**  
<img width="936" alt="{B80B23D2-6121-475B-A0CF-9F46CF5C720D}" src="https://github.com/user-attachments/assets/9f24cfbd-e5d2-4356-a0f3-d5fb84632489" />


### ✍️ **Signup Page**  
<img width="928" alt="{3AB6BDF0-7984-4EE4-BF79-A940CACCFEDC}" src="https://github.com/user-attachments/assets/cbb0f263-3645-4201-a206-8c21204bab8a" />
 

### 🏠 **Home Page**  
<img width="790" alt="{3ABCB896-7647-4D23-8306-336C1CCA4130}" src="https://github.com/user-attachments/assets/ff39af1b-a2f7-41dc-90e5-7a868e201107" />

---

## ✨ **Features**  

- 🔒 **User Authentication and Authorization**  
- 🤝 **Friend Request System like accept/reject**  
- 🧑‍🤝‍🧑 **Friendship Management like unfriend them or friend them**  
- 🔍 **User Search and Filtering and also show mutual friend**  
- 📱 **Responsive Design**  

---

## ⚙️ **Installation**  

### 🎨 **Frontend**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/friend-request.git
   ```  
2. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```  
3. Install dependencies:  
   ```bash
   npm install
   ```  
4. Start the development server:  
   ```bash
   npm run start
   ```  

### 🛠️ **Backend**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/friend-request.git
   ```  
2. Navigate to the server directory:  
   ```bash
   cd Backend
   ```  
3. Install dependencies:  
   ```bash
   npm install
   ```  
4. Start the development server:  
   ```bash
   npm run dev
   ```  

---

## 📡 **API Documentation**  

### 🔑 **Authentication**  

- `POST /api/auth/signup`:signup a new user  
- `POST /api/auth/login`: Log in an existing user  

### 🤝 **Friends**  

- `POST /api/friends/request`: Send a friend request  
- `GET /api/friends/requests`: View pending requests  
- `PUT /api/friends/respond`: Accept/Reject requests  
- `DELETE /api/friends/:friendId`: Remove a friend  

### 👥 **Users**  

- `GET /api/friends/search`: Search for users  
- `GET /api/friends/`: get friend list  
- `GET /api/friends/recommendations`:  Get friend recommendations
---

## 📜 **License**  

This project is licensed under the **MIT License**. See the LICENSE file for more details.  

---

## 🤝 **Contributing**  

Contributions are always welcome! Feel free to submit a **pull request** with your updates or improvements.  
