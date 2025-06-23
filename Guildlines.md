# Micjean Royal Food Delivery App - Team Development Guide

Welcome to the official Git workflow and development guide for the **Micjean Royal Food Delivery App**, a 4-week team project developed during the Software Engineering course.

---

## 📆 Project Overview

**Objective:** Build a campus food delivery app for restaurant operations and student users using React Native and Supabase.

**Timeline:** 4 Weeks

**Structure:**

* Customer App
* Vendor App
* Backend & Integration

---

## 🛋️ Tech Stack

* **Frontend:** React Native (Expo)
* **Backend:** Supabase (Auth, Database, APIs)
* **Version Control:** Git + GitHub
* **Project Management:** GitHub Projects Board (Kanban)

---

## 📊 GitHub Repository Setup

### Branches

* `main` - Production-ready, stable code
* `dev` - Integration of all features
* `feature/*` - Individual screens or tasks

### Workflow for Feature Development

```bash
# Start from dev branch
git checkout dev
git pull origin dev

# Create a feature branch
git checkout -b feature/task-name

# Work on your feature, then commit and push
git add .
git commit -m "CA: Add login screen UI"
git push origin feature/task-name

# Go to GitHub and open a PR to merge into dev
```

---

## 🛠️ Local Setup (Expo Project)

### 1. Clone the Repo

```bash
git clone https://github.com/MicjeanRoyalDev/micjean-royal-app.git
cd MicjeanApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Expo App

```bash
npx expo start
```

Use **Expo Go** app to scan the QR code and run on your phone.

---

## 🏛 GitHub Project Board

Project board columns:

1. **Customer App** – Screens like Home, Login, Order, Profile
2. **Vendor App** – Screens for viewing & managing orders
3. **Backend & Integration** – Supabase setup, auth, DB schema, APIs

Move your task cards across:

* **ToDo** → **In Progress** → **Done**

---

## 📅 Sprint Plan (4 Weeks)

| Week | Focus                                     |
| ---- | ----------------------------------------- |
| 1    | Project setup, Menus,login/signup with Supabase |
| 2    | Cart, Order Flow                   |
| 3    | Vendor UI & integration              |
| 4    | UI Polish, Testing, Demo Deployment       |

---

## ✍️ Commit Message Format

Use this convention for every commit:

```bash
TYPE: Short Summary
```

**Examples:**

* `CA: Build login screen UI`
* `VA: build vendor homepage`
* `BE: Connect Supabase auth`
where:
CA = Customer App
VA = Vendor App
BE = Backend End
---

## 🧳️ Best Practices

* Never push directly to `main`
* Always work on `feature/*` branches
* Keep PRs focused and small
* Pull latest `dev` before starting new work
* Always test your screen or logic before pushing

---
## Folder Structure
``` MicjeanApp/
├── apps/
│   ├── customer/              # Customer-facing app (student user)
│   │   ├── App.js
│   │   ├── screens/
│   │   ├── components/
│   │   └── navigation/
│   │
│   ├── vendor/                # Vendor-facing app (restaurant staff)
│   │   ├── App.js
│   │   ├── screens/
│   │   ├── components/
│   │   └── navigation/
│
├── backend/
│   ├── supabase/              # Supabase client, auth, and queries
│   │   ├── client.js
│   │   ├── auth.js
│   │   └── orders.js
│   └── utils/                 # Shared server-side utils or mock APIs
│
├── shared/                    # Code reused across apps
│   ├── components/            # UI components used in both apps
│   ├── constants/             # Colors, themes, config values
│   ├── hooks/                 # Shared React hooks (e.g. auth hook)
│   └── assets/                # Images, icons, fonts
│
├── .gitignore
├── package.json               # Workspace config or root dependencies
├── README.md
└── Guildlines.md```


> 💡 **NOTE:** An empty `.gitkeep` file has been added to all folders so GitHub can track them. You may safely delete `.gitkeep` when you add real files to a folder.
 



Let’s work as a team and ship something great together. 🚀

*Micjean Royal Dev Team*
