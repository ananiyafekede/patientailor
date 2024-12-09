import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    console.log('Login component mounted');
    
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          toast.error('Error checking session');
          return;
        }

        if (session?.user) {
          console.log('User already logged in:', session.user.email);
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Profile fetch error:', profileError);
            toast.error('Error loading user profile');
            return;
          }

          console.log('User profile:', profile);
          handleRedirect(profile?.role);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication error occurred');
      } finally {
        setLoading(false);
        setInitialCheckDone(true);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setLoading(true);
        console.log('User signed in:', session.user.email);
        
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Profile fetch error:', profileError);
            toast.error('Error loading user profile');
            return;
          }

          console.log('User profile after sign in:', profile);
          toast.success('Successfully logged in!');
          handleRedirect(profile?.role);
        } catch (error) {
          console.error('Error after sign in:', error);
          toast.error('Error processing login');
        } finally {
          setLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleRedirect = (role: string | null) => {
    console.log('Redirecting based on role:', role);
    switch (role) {
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
  };

  if (loading && !initialCheckDone) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

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
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#0284c7',
                      brandAccent: '#0369a1',
                    },
                  },
                },
              }}
              providers={[]}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;