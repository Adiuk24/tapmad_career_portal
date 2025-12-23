# 💼 HR Portal Complete Guide

**For:** HR Team, Recruiters, Hiring Managers  
**Time to Read:** 15 minutes  
**Updated:** December 23, 2025

---

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [HR Dashboard Overview](#hr-dashboard-overview)
3. [How to Post a Job](#how-to-post-a-job)
4. [Managing Applications](#managing-applications)
5. [Using Filters & Search](#using-filters--search)
6. [Analytics & Reports](#analytics--reports)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### 1. Register Your HR Account

**Step 1:** Go to the career portal website  
**Step 2:** Click "Register" button  
**Step 3:** Fill in details:
- Name: Your full name
- Email: Your work email (use this to login)
- Password: Strong password (8+ chars)

**Step 4:** Under "Role", select **"I'm Hiring (HR)"**  
**Step 5:** Click "Register"

### 2. Login

**Step 1:** Go to homepage  
**Step 2:** Click "Login"  
**Step 3:** Enter email & password  
**Step 4:** Click "Sign In"

**✅ You're now in the HR Dashboard!**

---

## 📊 HR Dashboard Overview

When you login, you see this:

```
┌─────────────────────────────────────────────┐
│         HR Dashboard                         │
├─────────────────────────────────────────────┤
│                                              │
│  📊 Quick Stats                              │
│  ├─ Total Jobs Posted: 5                     │
│  ├─ Active Applications: 23                  │
│  ├─ New This Week: 8                         │
│  └─ Shortlisted: 3                           │
│                                              │
│  🔗 Navigation Menu (Left Side)              │
│  ├─ Dashboard (you are here)                 │
│  ├─ Jobs                                     │
│  ├─ Applications                             │
│  ├─ Candidates                               │
│  ├─ Analytics                                │
│  └─ Settings                                 │
│                                              │
└─────────────────────────────────────────────┘
```

### Dashboard Cards You'll See

| Card | Shows |
|------|-------|
| **Total Jobs** | How many jobs you've posted |
| **Active Applications** | Total applications (all statuses) |
| **New This Week** | Applications received recently |
| **Shortlisted** | Candidates you're interested in |
| **Recent Activity** | Latest applications, status changes |

---

## 📝 How to Post a Job

### Method 1: From Dashboard (Quickest)

**Step 1:** Click green **"+ New Job"** button (top right)  
**Step 2:** You see the job form

### Method 2: From Jobs Tab

**Step 1:** Click **"Jobs"** in left menu  
**Step 2:** Click **"New Job"** button

### Complete the Job Form

Fill in these fields:

```
📋 BASIC INFO
├─ Job Title *required
│  Example: "Senior Software Engineer"
│
├─ Company *required
│  Example: "Tapmad Tech"
│
├─ Job Category *required
│  Options: Engineering, Sales, Marketing, HR, Finance, etc.
│
├─ Experience Level *required
│  Options: Entry, Mid, Senior, Lead
│
└─ Number of Positions *required
   Example: 2

💰 SALARY & BENEFITS
├─ Min Salary *required
│  Example: 50000
│
├─ Max Salary *required
│  Example: 80000
│
├─ Salary Currency *required
│  Options: USD, INR, GBP, EUR
│
└─ Benefits
   Example: "Health Insurance, Remote Flexible, 401K"

📍 LOCATION & TYPE
├─ Location *required
│  Example: "New York, NY" or "Remote"
│
├─ Job Type *required
│  Options: Full-time, Part-time, Contract, Freelance
│
└─ Work Mode *required
   Options: On-site, Remote, Hybrid

📄 DESCRIPTION & REQUIREMENTS
├─ Job Description *required
│  Use formatting:
│  - Bold: **text**
│  - Lists: • Bullet points
│  
│  Tip: Be detailed! Attracts better candidates
│
├─ Required Skills *required
│  Separate by comma
│  Example: "Python, Django, PostgreSQL, Docker"
│
├─ Nice to Have Skills
│  Example: "Kubernetes, AWS, CI/CD"
│
└─ Requirements
   Example: "5+ years experience, BS in CS"

⏰ DEADLINE
├─ Application Deadline
│  Example: Select 30 days from today
│
└─ Tip: Leave blank for no deadline
```

### Example Complete Job Post

```
Title: Senior React Developer
Company: TechCorp Inc
Category: Engineering
Experience: Mid/Senior
Positions: 1

Salary: $100,000 - $150,000 USD

Location: San Francisco, CA
Type: Full-time
Mode: Hybrid (3 days office, 2 remote)

Description:
We're looking for an experienced React developer to lead our frontend team.

**Responsibilities:**
• Design and implement React components
• Mentor junior developers
• Improve app performance
• Collaborate with backend team

**Required:**
• 5+ years React experience
• Strong TypeScript skills
• Experience with Redux/Zustand
• Git proficiency

**Nice to Have:**
• Next.js experience
• Testing (Jest, React Testing Library)
• GraphQL knowledge
• Open source contributions

Skills: React, TypeScript, Redux, Tailwind CSS, Next.js, Jest

Deadline: 30 days
```

### Step 3: Publish

**Step 1:** Review all fields  
**Step 2:** Click **"Preview Job"** to see how it looks  
**Step 3:** If good, click **"Publish Job"**  

**✅ Job is now live! Applicants can see it!**

---

## 📨 Managing Applications

### View All Applications

**Step 1:** Click **"Applications"** in left menu  
**Step 2:** You see a table with all applications

### Application Table Shows

| Column | What It Is |
|--------|-----------|
| **Candidate Name** | Who applied |
| **Job Title** | Which job they applied for |
| **Status** | Current status (see below) |
| **Applied Date** | When they applied |
| **Rating** | Your star rating (add one!) |
| **Action** | View details or change status |

### Application Status Workflow

```
When someone applies → Status = "PENDING" (default)
                    ↓
        You review resume & info
                    ↓
    ┌─────────────┬──────────┬──────────────┐
    ↓             ↓          ↓              ↓
"SHORTLISTED"  "REJECTED" "IN REVIEW" "INTERVIEW"
    ↓             ↓          ↓              ↓
  Good fit    Not a fit    Considering   Next round
    ↓             ↓          ↓              ↓
Can move to   Final step   Come back    Offer stage
"OFFER"                     later
    ↓
  "HIRED"
```

### How to Change Application Status

**Step 1:** Click the application name  
**Step 2:** See full details (resume preview, answers, etc.)  
**Step 3:** Look for **"Status"** dropdown  
**Step 4:** Select new status:
- `PENDING` — Just received
- `IN_REVIEW` — Reviewing now
- `SHORTLISTED` — Moving forward ⭐
- `INTERVIEW` — Call for interview
- `OFFER` — Extended offer
- `HIRED` — Got the job! 🎉
- `REJECTED` — Not a fit

**Step 5:** Click **"Save"** or **"Update Status"**

### Add Notes to Application

**In the application details view:**

**Step 1:** Scroll to **"Notes"** section  
**Step 2:** Click **"Add Note"**  
**Step 3:** Type your comment:
```
Examples:
"Great communication skills, schedule interview"
"Missing required certification"
"Strong fit for team, move to offer"
```
**Step 4:** Click **"Save Note"**

**All notes are private** — applicants can't see them.

### Rate Candidates

**Step 1:** In application details, find **"Rating"**  
**Step 2:** Click stars (1-5):
- ⭐ = Poor fit
- ⭐⭐ = Below average
- ⭐⭐⭐ = Average
- ⭐⭐⭐⭐ = Good fit
- ⭐⭐⭐⭐⭐ = Perfect fit

**Step 3:** Rating saves automatically

**Tip:** Use ratings to quickly filter good candidates later.

---

## 🔍 Using Filters & Search

### Search Candidates

**Step 1:** On **"Applications"** page, find **Search box**  
**Step 2:** Type candidate name or email  
**Step 3:** Results filter in real-time

### Filter Applications

**Available filters:**

```
Job Title
├─ Select which job's applications to see
│  Or view all jobs
│
Status
├─ PENDING
├─ IN_REVIEW
├─ SHORTLISTED
├─ INTERVIEW
├─ OFFER
├─ HIRED
└─ REJECTED

Rating
├─ 5 stars only
├─ 4+ stars
├─ 3+ stars
└─ All

Date Range
├─ This week
├─ This month
├─ All time
└─ Custom date

Sort By
├─ Newest first
├─ Oldest first
├─ Rating highest
└─ Name A-Z
```

### Example Filtering

**Scenario:** "Show me 5-star candidates who applied this month for Senior Eng role"

```
1. Job Title: "Senior Software Engineer"
2. Rating: ⭐⭐⭐⭐⭐ (5 stars only)
3. Date: "This month"
4. Status: Any
```

**Result:** You see only candidates matching all criteria!

### Candidates Section (Alternative View)

**Step 1:** Click **"Candidates"** menu  
**Step 2:** See all candidates (across all jobs)  
**Step 3:** Same filtering available

**Tip:** Use this to find candidates for future openings!

---

## 📈 Analytics & Reports

### View Dashboard Analytics

**Step 1:** Click **"Analytics"** in left menu  
**Step 2:** See visual reports

### What Analytics Shows

#### 📊 Job Performance
```
Each job shows:
├─ Total applications received
├─ Application rate (views → applications)
├─ Status breakdown (chart)
│  └─ 50% pending, 30% shortlisted, 10% hired, etc.
└─ Avg days to hire
```

#### 📉 Hiring Pipeline
```
Visual funnel chart:
"100 viewed job"
  ↓
"25 applied"
  ↓
"10 shortlisted"
  ↓
"3 interviews"
  ↓
"1 hired"
```

#### 🎯 Top Performers
```
Shows:
├─ Jobs with most applications
├─ Fastest to fill positions
├─ Best conversion rates
└─ Time to hire (avg days)
```

#### 📅 Trends
```
Week-over-week:
├─ Applications trend (↑ or ↓)
├─ Shortlist rate trend
└─ Time to hire trend
```

### Export Reports

**Step 1:** In Analytics, find **"Export"** button  
**Step 2:** Choose format:
- CSV (Excel)
- PDF (Print-friendly)

**Step 3:** Save to computer

---

## 🎯 Best Practices for HR

### ✅ DO:

1. **Write Detailed Job Descriptions**
   - Include why someone should want this job
   - List actual requirements vs nice-to-haves
   - Result: Better candidates, fewer bad fits

2. **Respond Quickly to Applications**
   - Reply within 48 hours (even just to say "reviewing")
   - Result: Better candidate experience, faster hiring

3. **Update Status Regularly**
   - Change status as candidates progress
   - Applicants see updates (they get emails too!)
   - Result: Transparent process, happier candidates

4. **Add Notes**
   - Document why you shortlisted or rejected
   - Help team understand hiring decisions
   - Result: Consistency, accountability

5. **Set Application Deadlines**
   - 30 days is standard
   - Result: Urgency, faster hiring

6. **Use Multiple Jobs Template**
   - If posting similar roles, reuse description
   - Saves time!

### ❌ DON'T:

1. **Leave applications in PENDING forever**
   - They deserve feedback!
   - Check every few days

2. **Forget to close old jobs**
   - After position is filled, close the job
   - Result: Stop wasting applicants' time

3. **Post vague requirements**
   - "Good communication" is too vague
   - Better: "Present findings to 50+ person team weekly"

4. **Ignore top candidates**
   - If you shortlist someone, follow up soon
   - They might get other offers!

---

## 🆘 Troubleshooting

### Problem: Job won't publish

**Reason:** Missing required fields  
**Solution:**
1. Click job title to edit
2. Check all fields with red `*` mark
3. Fill in any empty required fields
4. Try publishing again

### Problem: Can't see applications

**Reason 1:** No one has applied yet
**Solution:** Check back later, or share job link with candidates

**Reason 2:** Application disappeared
**Solution:** It might be under a different status. Check "Filter by Status"

### Problem: Applicant resume won't show

**Reason:** Resume upload not fully implemented yet
**Status:** Phase 2 feature (coming soon)
**Workaround:** Ask candidates to email resume directly

### Problem: Email notifications not working

**Reason:** Email service not configured yet  
**Status:** Optional Phase 2 feature  
**Workaround:** Check dashboard manually each day

### Problem: Can't change application status

**Reason:** Status doesn't exist in system yet  
**Solution:** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for technical help  
**Contact:** Your tech team

### Problem: Candidates say they applied but I don't see it

**Reason:** Application might be processing  
**Solution:**
1. Wait 30 seconds
2. Refresh page
3. Check database connection with IT

---

## 📞 Quick Reference

### Common Tasks & How Long They Take

| Task | Time | Steps |
|------|------|-------|
| Post a job | 5 min | Fill form, publish |
| Review application | 2 min | Click, read, rate |
| Change status | 30 sec | Click dropdown, save |
| Add note | 1 min | Type comment, save |
| Export report | 1 min | Click export, download |
| Search candidates | 10 sec | Type name, filter |

### Keyboard Shortcuts

| Shortcut | What It Does |
|----------|--------------|
| `Cmd + Enter` (Mac) | Submit form (if available) |
| `Cmd + K` | Search candidates |
| `Escape` | Close popup/modal |

### Contact Support

**Issue:** If something breaks
**What to do:**
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Contact your tech team
3. Include error message if any

---

## 📋 30-Day HR Action Plan

### Week 1: Setup
- [ ] Register account
- [ ] Post first job
- [ ] Invite other HR members

### Week 2-3: Active Hiring
- [ ] Review daily applications
- [ ] Shortlist candidates
- [ ] Schedule interviews

### Week 4: Analysis
- [ ] Check analytics dashboard
- [ ] Export hiring report
- [ ] Plan next openings

---

## 🎓 Video Tutorials (Coming Soon)

We'll add video links here once available:
- [ ] How to post a job
- [ ] How to manage applications
- [ ] How to use analytics
- [ ] Best practices for recruiting

---

## 💡 Pro Tips

1. **Create job templates** — Copy successful job posts
2. **Set up weekly reminders** — Review pending applications every Monday
3. **Use ratings** — Rate 5 stars for candidates you definitely want
4. **Batch interviews** — Schedule all interviews on same day
5. **Keep notes** — Document why you rejected someone (legal protection)
6. **Close jobs promptly** — Don't leave jobs open after position filled
7. **Follow up quickly** — Respond within 24 hours to shortlisted candidates

---

## 🚀 Next Steps

1. **Logged in?** → Go post your first job!
2. **First job posted?** → Start promoting the link to candidates
3. **Getting applications?** → Check [Candidates](#view-all-applications) section
4. **Want analytics?** → Go to [Analytics](#analytics--reports) tab
5. **Confused?** → Scroll up to find your question!

---

## 📧 Feedback

Found an issue or have a feature request?
- Create an issue on GitHub: https://github.com/Adiuk24/tapmad_career_portal/issues
- Or contact your admin

---

**Last Updated:** December 23, 2025  
**Platform:** Tapmad Career Portal  
**For:** HR Teams & Recruiters

**Happy Hiring! 🎉**
