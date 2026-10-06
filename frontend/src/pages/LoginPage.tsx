import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, Lock, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('manager@pharmastock.local');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-teal-700 flex items-center justify-center text-white mb-3 shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">PharmaStock IQ</h1>
          <p className="text-xs text-slate-500 mt-1">Pharmacy Stock-Out Prediction & Decision Support</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader
            title="Sign In to Your Account"
            subtitle="Enter your pharmacy staff or admin credentials"
          />
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                placeholder="you@pharmacy.com"
              />
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                placeholder="••••••••"
              />
              <div className="pt-2">
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Sign In
                </Button>
              </div>
            </form>

            <div className="mt-4 p-3 bg-slate-100 rounded-lg text-[11px] text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Demo User Credentials:</p>
              <p>• Admin: admin@pharmastock.local (Full Access)</p>
              <p>• Manager: manager@pharmastock.local (Operations & Risk)</p>
              <p>• Staff: staff@pharmastock.local (Transactions Only)</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer notice */}
        <p className="text-center text-xs text-slate-400 mt-6 max-w-sm mx-auto leading-relaxed">
          Decision support only. Recommendations require review and approval by authorized pharmacy staff. This system provides no medical advice.
        </p>
      </div>
    </div>
  );
}
