import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
        options: {
          persistSession: rememberMe,
          // Set session duration to 10 days if remember me is checked
          ...(rememberMe && { sessionTime: 60 * 60 * 24 * 10 })
        }
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(error.message);
        }
        console.error("Login error:", error);
        return;
      }

      if (data.user) {
        toast.success('Successfully logged in!');
        navigate("/patient/dashboard");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Hospital Appointment System</title>
        <meta name="description" content="Login to access your hospital appointment dashboard and manage your healthcare journey." />
      </Helmet>

      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal">
                  Remember me for 10 days
                </Label>
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
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