import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Briefcase, Users, TrendingUp, Heart, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Tapmad</span>
            <span className="text-sm text-gray-500">Careers</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost">Browse Jobs</Button>
            </Link>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Build Your Career with{" "}
          <span className="text-red-600">Tapmad</span>
          </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join Pakistan's leading digital entertainment platform. 
          We're looking for talented individuals to help shape the future of streaming.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/jobs">
            <Button size="lg" className="text-lg px-8">
              <Search className="mr-2 h-5 w-5" />
              Explore Opportunities
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">
              HR Portal
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Job Search */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Find Your Dream Job</CardTitle>
            <CardDescription>Search by role, department, or location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Job title, keywords..."
                className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 min-w-[150px] px-4 py-2 border rounded-lg"
              />
              <Button className="px-8">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why Work at Tapmad */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Work at Tapmad?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Innovation First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Work with cutting-edge technology and shape the future of digital entertainment in Pakistan.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Great Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join a diverse, talented team that values collaboration and continuous learning.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advance your career with professional development programs and mentorship.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Opportunities</h2>
            <Link href="/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Software Engineer</CardTitle>
                      <CardDescription className="mt-1">Engineering • Karachi</CardDescription>
                    </div>
                    <Briefcase className="h-8 w-8 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    Join our engineering team to build scalable solutions for millions of users...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Full-time</span>
                    <Link href="/jobs/1">
                      <Button size="sm">Apply Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto bg-red-600 text-white border-0">
          <CardHeader>
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <CardTitle className="text-3xl text-white">Ready to Join Us?</CardTitle>
            <CardDescription className="text-red-100">
              Start your journey with Tapmad today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/jobs">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Browse Open Positions
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-red-600">
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-lg font-bold">Tapmad</span>
              </div>
              <p className="text-sm text-gray-600">
                Pakistan's leading digital entertainment platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Applicants</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/jobs" className="hover:text-red-600">Browse Jobs</Link></li>
                <li><Link href="/login" className="hover:text-red-600">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-red-600">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For HR</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/login" className="hover:text-red-600">HR Portal</Link></li>
                <li><Link href="/dashboard" className="hover:text-red-600">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://www.tapmad.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">About Tapmad</a></li>
                <li><Link href="/contact" className="hover:text-red-600">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Tapmad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
