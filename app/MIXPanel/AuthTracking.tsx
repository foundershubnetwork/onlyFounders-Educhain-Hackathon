'use client';

import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import mixpanel from 'mixpanel-browser';

mixpanel.init('72c64bcf935dfc27524cc84bb51bca17', { debug: true });

const AuthTracking: React.FC = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    console.log('Tracking user:', user);

    // Identify user only if `sub` exists
    if (user.sub) {
      mixpanel.identify(user.sub);
    }

    // Set user properties (Avoid overwriting `$created` for existing users)
    mixpanel.people.set_once({
      $name: user.name,
      $email: user.email,
      $created: new Date().toISOString(),
    });

    // Track login event
    mixpanel.track('User Login', {
      distinct_id: user.sub,
      name: user.name,
      email: user.email,
      login_date: new Date().toISOString(),
    });

    console.log('User login tracked in Mixpanel');
  }, [user]);

  return null;
};

export default AuthTracking;
