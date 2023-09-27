import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("TEST START AUTH",user);
  // Add a function to check if the user is authenticated
  const isAuthenticated = () => {
    console.log("IS AUTHENTICATED");
    return !!user;
  };

  // Add a function to handle user login
  const login = async (user_email, user_password) => {
    try {
      console.log("USER_DETAILS: ",user_email, user_password);
      // Make an API request to your backend for user login
      const response = await fetch('http://localhost:3000/api/users/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email, user_password }),
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log("RESPONSE AFTER OK WITH USERDATA:", userData);
        setUser(userData); // Set the user in the context
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Add a function to handle user logout
  const logout = async () => {
    try {
      // Make an API request to your backend for user logout
      const response = await fetch('/api/users/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null); // Clear the user from the context
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      throw error;
    }
  };

  // useEffect(() => {
  //   // Fetch user information from your backend if necessary
  //   // You can make an API request to get user details here
  //   // For example, using the fetch() function

  //   // Example: Fetch user details from your backend
  //   // const fetchUser = async () => {
  //   //   try {
  //   //     const response = await fetch('/api/user'); // Adjust the API endpoint
  //   //     if (response.ok) {
  //   //       const userData = await response.json();
  //   //       setUser(userData);
  //   //     } else {
  //   //       setUser(null);
  //   //     }
  //   //   } catch (error) {
  //   //     setUser(null);
  //   //   }
  //   //   setLoading(false);
  //   // };

  //   // Uncomment the following line to fetch user data
  //   // fetchUser();
  // }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/users/user/auth', {
          method: 'GET',
          // Add any necessary headers, such as authorization headers, if needed
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }

        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const contextValue = {
    user,
    isAuthenticated,
    login, // Add the login function to the context
    logout, // Add the logout function to the context
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
