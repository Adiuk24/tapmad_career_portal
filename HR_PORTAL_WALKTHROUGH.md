# 🎯 HR Portal - Complete Walkthrough & Features

**This is what your HR team will see and do in the portal**

---

## 📌 What is the HR Portal?

The HR Portal is where your HR team:
- ✅ Post new job openings
- ✅ Review applications from candidates
- ✅ Track hiring progress
- ✅ View analytics and reports
- ✅ Manage hiring teams

---

## 🚀 Getting Started with HR Portal

### Step 1: Access the HR Portal
```
URL: http://localhost:3000 (local)
     or your-domain.com (production)
```

### Step 2: Login as HR
```
Email:    hr@example.com
Password: password123
```

After login, you'll see the **HR Dashboard** 📊

---

## 📊 Dashboard Overview

### What You See on the Dashboard

```
┌─────────────────────────────────────────┐
│     HR DASHBOARD                        │
├─────────────────────────────────────────┤
│                                         │
│  Total Jobs      │  12                  │
│  [Briefcase]     │  Active job postings │
│                  │                      │
│  Applications    │  45                  │
│  [FileText]      │  Total received      │
│                  │                      │
│  Pending Review  │  8                   │
│  [TrendingUp]    │  Awaiting review     │
│                  │                      │
│  Candidates      │  32                  │
│  [Users]         │  In database         │
│                  │                      │
└─────────────────────────────────────────┘
```

### Dashboard Cards Explained

| Card | What It Shows | What To Do |
|------|---------------|-----------|
| **Total Jobs** | How many jobs you've posted | Click to see all jobs |
| **Applications** | Total applications received | Click to review all |
| **Pending Review** | Applications waiting for review | Click to review now |
| **Candidates** | Total people registered | Click to see all |

---

## 📝 Creating a New Job

### Path to Create Job
```
Dashboard → Jobs → + New Job
```

### Step-by-Step

**Step 1: Click "Jobs" in sidebar**
- Shows all your active job postings

**Step 2: Click "+ New Job"**
- Opens the job creation form

**Step 3: Fill in Job Details**
```
┌──────────────────────────────┐
│ New Job Form                 │
├──────────────────────────────┤
│ Job Title                    │
│ [Senior Developer        ]   │
│                              │
│ Department                   │
│ [Engineering            ]    │
│                              │
│ Job Description              │
│ [Detailed description...  ]  │
│ [                        ]   │
│ [                        ]   │
│                              │
│ Required Skills              │
│ [TypeScript, React...    ]   │
│                              │
│ Experience Level             │
│ [3+ years               ]    │
│                              │
│ Location                     │
│ [Remote / Office / Both ]    │
│                              │
│ Salary Range                 │
│ From: [50000] To: [80000]    │
│                              │
│ Status                       │
│ [Active/Closed          ]    │
│                              │
│ [Create Job] [Cancel]        │
└──────────────────────────────┘
```

**Step 4: Click "Create Job"**
- Job goes live on the portal
- Applicants can see and apply immediately

### What Happens After Job is Created

1. ✅ Job appears on public job board
2. ✅ Applicants can browse and apply
3. ✅ You get notified of new applications
4. ✅ Can edit/close job anytime

---

## 📋 Managing Applications

### Path to Review Applications
```
Dashboard → Applications → [Select Job]
```

### Application List View

```
┌────────────────────────────────────────────────────┐
│ Applications for "Senior Developer"                │
├────────────────────────────────────────────────────┤
│                                                    │
│ John Doe          │ Applied: Dec 20  │ [Review]   │
│ john@email.com    │ Status: New      │            │
│                                                    │
│ Sarah Smith       │ Applied: Dec 19  │ [Review]   │
│ sarah@email.com   │ Status: Reviewed │            │
│                                                    │
│ Mike Johnson      │ Applied: Dec 18  │ [Review]   │
│ mike@email.com    │ Status: Shortlist│            │
│                                                    │
│ [Show More]                                        │
└────────────────────────────────────────────────────┘
```

### Reviewing an Application

**Click [Review] to see full details:**

```
┌────────────────────────────────────────┐
│ Applicant: John Doe                    │
├────────────────────────────────────────┤
│                                        │
│ Email:        john@email.com           │
│ Phone:        +1-555-1234              │
│ Applied:      Dec 20, 2025             │
│ Status:       New                      │
│                                        │
│ Resume:       [View/Download]          │
│ Cover Letter: [View]                   │
│                                        │
│ About:                                 │
│ Senior developer with 5+ years         │
│ experience in React and TypeScript...  │
│                                        │
│ Skills:                                │
│ • React, TypeScript, Node.js           │
│ • AWS, Docker                          │
│ • Database design                      │
│                                        │
│ Actions:                               │
│ [Reject] [Shortlist] [Accept]          │
│                                        │
│ Notes:                                 │
│ [Add your notes...]                    │
│ [Save Notes]                           │
│                                        │
└────────────────────────────────────────┘
```

### Application Statuses

| Status | Meaning | Action |
|--------|---------|--------|
| **New** | Just applied, not reviewed yet | Review ASAP |
| **Reviewed** | You've reviewed it | Take action |
| **Shortlist** | Good fit, interview later | Contact candidate |
| **Rejected** | Not a good fit | Notify applicant |
| **Accepted** | Hired! | Send offer letter |

### Quick Actions on Applications

**Click the 3-dot menu (⋮) for:**
- 📧 Send message to applicant
- 📎 Attach documents
- 📝 Add internal notes
- 🔗 Share with team
- ⭐ Mark as favorite
- 🗑️ Archive

---

## 📊 Analytics & Reports

### Path to View Analytics
```
Dashboard → Analytics
```

### What Analytics Show

```
┌─────────────────────────────────────┐
│ Hiring Analytics (Last 30 Days)     │
├─────────────────────────────────────┤
│                                     │
│ Applications by Job:                │
│ Senior Developer:     ████████ 15   │
│ Designer:            ██████ 8       │
│ Manager:             ████ 5         │
│                                     │
│ Applications by Status:             │
│ New:        ███ 10                  │
│ Reviewed:   ██ 6                    │
│ Shortlist:  ██ 5                    │
│ Rejected:   ██ 3                    │
│ Accepted:   ██ 3                    │
│                                     │
│ Avg Time to Hire: 8 days            │
│ Conversion Rate: 18%                │
│                                     │
│ [Download Report]  [Export to CSV]  │
└─────────────────────────────────────┘
```

### Metrics Explained

| Metric | What It Means |
|--------|---------------|
| **Applications by Job** | Which job is most popular |
| **Applications by Status** | Where candidates are in pipeline |
| **Avg Time to Hire** | How fast you're hiring (lower is better) |
| **Conversion Rate** | % of applications → offers |

---

## 👥 Managing Your HR Team

### Path to Manage Team
```
Dashboard → Settings → Team
```

### Add Team Members

```
┌────────────────────────────────────┐
│ HR Team Members                    │
├────────────────────────────────────┤
│                                    │
│ Name              │ Role           │
│ You               │ HR Manager     │
│ Sarah             │ Recruiter      │
│ Mike              │ Hiring Manager │
│                                    │
│ [+ Add Team Member]                │
│                                    │
└────────────────────────────────────┘
```

### Roles & Permissions

| Role | Can Create Jobs? | Can Review Apps? | Can Hire? |
|------|------------------|------------------|-----------|
| **HR Manager** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Recruiter** | ✅ Yes | ✅ Yes | ❌ No |
| **Hiring Manager** | ❌ No | ✅ Yes | ✅ Yes |

---

## 🔔 Notifications

### You'll Get Notified When:
- 📩 New application received
- ⭐ Candidate marks your job as favorite
- 💬 Candidate sends a message
- ✅ Hiring milestone reached (e.g., 10 applications)

### Where to See Notifications
```
Top-right corner → Bell Icon 🔔
```

---

## 📱 Common HR Tasks & How To Do Them

### Task: I need to reject an applicant
```
1. Go to Applications
2. Find the applicant
3. Click [Review]
4. Click [Reject]
5. (Optional) Add rejection reason
6. Confirm
✅ Applicant notified automatically
```

### Task: I need to schedule an interview
```
1. Go to Applications
2. Find the applicant
3. Click [Review]
4. Click [⋮] → Send Message
5. Propose interview times
6. Applicant responds with availability
✅ Setup interview slot
```

### Task: I need to close a job
```
1. Go to Jobs
2. Find the job
3. Click [Edit]
4. Change Status to "Closed"
5. Click [Save]
✅ Job no longer appears to applicants
```

### Task: I need to export applicant data
```
1. Go to Applications
2. Click [⋮] → Export
3. Choose format: CSV or Excel
4. Download file
✅ Use in your spreadsheets
```

### Task: I need to see all candidates for a specific skill
```
1. Go to Candidates
2. Click [Filter]
3. Search for skill: "React"
4. Filter by experience level
✅ See all candidates with that skill
```

---

## 🎨 Dashboard Navigation

```
┌─────────────────────┐
│ Left Sidebar        │
├─────────────────────┤
│ 📊 Dashboard        │ ← Main overview
│ 📝 Jobs             │ ← Manage job posts
│ 📋 Applications     │ ← Review applications
│ 👥 Candidates       │ ← View all applicants
│ 📈 Analytics        │ ← Reports & data
│ ⚙️ Settings         │ ← Team & account
│ 🚪 Logout           │ ← Sign out
└─────────────────────┘
```

---

## 💡 Pro Tips for HR Team

### Tip 1: Use Filters
- Filter applications by status, date, job
- Makes it easy to find what you need quickly

### Tip 2: Add Internal Notes
- Keep notes on applicants for team discussion
- Reference notes when making decisions

### Tip 3: Shortlist Strategically
- "Shortlist" candidates you might hire later
- Don't reject too quickly - you might need them

### Tip 4: Export Data Regularly
- Keep CSV backups of applications
- Use for reports and analysis

### Tip 5: Collaborate with Team
- Share applicants with other hiring managers
- Use team features for discussion

### Tip 6: Set Realistic Job Descriptions
- Clear descriptions = better applicants
- Include salary range (candidates expect it)

### Tip 6: Respond Quickly
- Candidates talk! Reply fast
- Good experience = better candidates in future

---

## 🆘 Troubleshooting HR Portal

### Problem: "Cannot create a job"
**Solution:**
1. Check you're logged in as HR user
2. Check all required fields are filled
3. Try refreshing page
4. Check browser console for errors

### Problem: "Cannot see applications"
**Solution:**
1. Make sure jobs exist with applications
2. Check filter is not hiding them
3. Try different date ranges
4. Check your user role is "HR" or "Admin"

### Problem: "Notifications not working"
**Solution:**
1. Check browser notification permissions
2. Check notification settings in dashboard
3. Try refreshing browser
4. Check browser console for errors

### Problem: "Cannot download resume"
**Solution:**
1. Make sure applicant uploaded resume
2. Check your internet connection
3. Try different browser
4. Ask applicant to re-upload resume

### Problem: "Cannot send message to applicant"
**Solution:**
1. Check applicant email is correct
2. Check your email service is configured
3. Check spam/junk folders
4. Try sending again

---

## 📞 Need Help?

| Issue | Solution |
|-------|----------|
| Can't login | Check email/password, try resetting password |
| Features missing | Check your user role has permission |
| Portal slow | Clear browser cache, try different browser |
| Errors | Check troubleshooting above |
| Still stuck? | Contact your IT team with error details |

---

## ✅ Checklist - First Week as HR User

- [ ] Logged in successfully
- [ ] Saw dashboard with stats
- [ ] Created your first test job
- [ ] Saw applications for that job (ask IT to add test applicants)
- [ ] Reviewed an application
- [ ] Added internal notes
- [ ] Changed application status
- [ ] Downloaded a report
- [ ] Added team members
- [ ] Explored all navigation options
- [ ] Found & read help/support docs
- [ ] Comfortable using the portal

---

## 🎓 Training for Your HR Team

### Video: 10-minute walkthrough (ask your IT team to create)
- Dashboard overview (2 min)
- Creating a job (3 min)
- Reviewing applications (3 min)
- Using filters & analytics (2 min)

### Live Demo Session
- Everyone logs in
- IT walks through each feature
- Q&A at the end

### Documentation
- This document (send to all HR team)
- Bookmark troubleshooting section

---

## 🚀 Ready to Start?

1. ✅ Ask IT team for login credentials
2. ✅ Read this entire guide
3. ✅ Login and explore
4. ✅ Try creating a test job
5. ✅ Ask questions if confused
6. ✅ You're ready to hire! 🎉

---

**Created:** December 23, 2025  
**For:** HR Team - Tapmad Career Portal  
**Status:** ✅ Ready to Use
