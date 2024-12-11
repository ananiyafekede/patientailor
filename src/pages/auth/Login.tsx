import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Static user data for development
    const staticUsers = [
      { email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { email: 'doctor@example.com', password: 'doctor123', role: 'doctor' },
      { email: 'patient@example.com', password: 'patient123', role: 'patient' }
    ];

    const user = staticUsers.find(u => u.email === email && u.password === password);

    if (user) {
      toast.success('Successfully logged in!');
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: user.role }));
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'patient':
          navigate('/patient/dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Hospital Management System</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
              <div className="text-center text-sm">
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => navigate("/register")}
                >
                  Don't have an account? Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;