# Testing Guide - Tapmad Career Portal

## 🚀 Local Development

The application is now running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 🧪 Testing Checklist

### 1. Landing Page
- [ ] Visit http://localhost:3000
- [ ] Verify Tapmad branding is displayed
- [ ] Check navigation links work
- [ ] Test "Browse Jobs" button
- [ ] Test "Sign In" button

### 2. Public Job Browsing
- [ ] Go to http://localhost:3000/jobs
- [ ] Verify job listings display (if any exist)
- [ ] Test search functionality
- [ ] Test filters (department, location, job type)
- [ ] Click on a job to view details
- [ ] Verify job detail page shows all information

### 3. User Registration
- [ ] Go to http://localhost:3000/register
- [ ] Fill out registration form
- [ ] Create an account as "Job Applicant"
- [ ] Create another account as "HR Professional"
- [ ] Verify registration redirects to login

### 4. Authentication
- [ ] Go to http://localhost:3000/login
- [ ] Login with created account
- [ ] Verify redirect to appropriate dashboard
- [ ] Test logout functionality
- [ ] Test "Remember me" (if implemented)

### 5. Applicant Portal
- [ ] Login as applicant
- [ ] Browse available jobs
- [ ] Apply to a job:
  - [ ] Fill application form
  - [ ] Upload resume (URL)
  - [ ] Add cover letter
  - [ ] Submit application
- [ ] View "My Applications" page
- [ ] Check application status

### 6. HR Dashboard
- [ ] Login as HR user
- [ ] Verify dashboard loads with stats
- [ ] Test navigation sidebar
- [ ] Create a new job posting:
  - [ ] Fill all required fields
  - [ ] Set job status (draft/published)
  - [ ] Save job
- [ ] View job listings
- [ ] Edit an existing job
- [ ] View applications:
  - [ ] See all applications
  - [ ] Filter by status
  - [ ] View application details
  - [ ] Update application status
  - [ ] Add internal notes
- [ ] Browse candidates database
- [ ] View analytics page

### 7. API Testing
- [ ] Test backend health: http://localhost:8000/health
- [ ] Verify CORS is working
- [ ] Test authentication endpoints
- [ ] Test job endpoints
- [ ] Test application endpoints

## 🐛 Common Issues & Solutions

### Frontend not loading
- Check if port 3000 is available
- Verify dependencies: `cd frontend && npm install`
- Check for TypeScript errors

### Backend not responding
- Check if port 8000 is available
- Verify database connection in `backend/.env`
- Check backend logs for errors

### Database connection errors
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in both `.env` files
- Run migrations: `cd backend && npx prisma migrate dev`

### Authentication not working
- Verify `NEXTAUTH_SECRET` is set in `frontend/.env`
- Check `JWT_SECRET` in `backend/.env`
- Clear browser cookies and try again

### API calls failing
- Verify `NEXT_PUBLIC_API_URL` in `frontend/.env`
- Check backend is running on port 8000
- Verify CORS settings in backend

## 📝 Test Data

### Create Test Jobs (via HR Dashboard)
1. Login as HR user
2. Go to Jobs → Post New Job
3. Create sample jobs:
   - Software Engineer (Engineering, Karachi, Full-time)
   - Marketing Manager (Marketing, Lahore, Full-time)
   - Product Designer (Product, Islamabad, Contract)

### Create Test Applications
1. Login as applicant
2. Browse jobs
3. Apply to multiple jobs
4. Test different application statuses

## ✅ Expected Behavior

### Landing Page
- Clean, professional design
- Tapmad branding visible
- Quick job search
- Featured jobs section
- Call-to-action buttons

### Job Listings
- Grid/list view of jobs
- Search and filter functionality
- Job cards with key information
- Click to view details

### Application Flow
- Easy application form
- Resume upload option
- Cover letter submission
- Application confirmation
- Status tracking

### HR Dashboard
- Overview statistics
- Job management
- Application review
- Candidate database
- Analytics and reports

## 🎯 Key Features to Test

1. **Responsive Design**: Test on mobile, tablet, desktop
2. **Form Validation**: Test required fields, email format, etc.
3. **Error Handling**: Test invalid inputs, network errors
4. **Loading States**: Check loading indicators
5. **Navigation**: Test all navigation links
6. **Permissions**: Verify role-based access control

## 📊 Performance Testing

- Page load times
- API response times
- Image optimization
- Bundle size

## 🔒 Security Testing

- Authentication required for protected routes
- Role-based access control
- Input validation
- XSS protection
- CSRF protection

## 📱 Browser Testing

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🚨 If Something Doesn't Work

1. Check browser console for errors
2. Check terminal/console for server errors
3. Verify environment variables are set
4. Check database connection
5. Review logs in both frontend and backend

## 📞 Next Steps

After testing:
1. Note any bugs or issues
2. Test edge cases
3. Verify all features work as expected
4. Check mobile responsiveness
5. Test with different user roles

Happy Testing! 🎉

