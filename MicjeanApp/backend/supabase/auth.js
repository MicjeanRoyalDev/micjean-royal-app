import { supabase } from "./clients";
/*
to use functionality
import auth
and call any functionality using the dot notation (ie - auth.login(params))
or destructure individual functionality from auth
*/
export const auth = {
  register: async (email, password, username, phone) => {
    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
    });
    
    // Handle profile creation separately with proper error handling
    if (user && !error) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id, // Include user ID
        username,
        phone,
      });
      
      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't fail registration if profile creation fails
        // The user account is still created successfully
      }
    }
    
    return {
      user: user || null,
      error: error
        ? {
            message: error.message,
            code: error.code,
          }
        : null,
    };
  },
  // Alternative registration without profile table (for testing)
  registerSimple: async (email, password) => {
    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
    });
    
    return {
      user: user || null,
      error: error
        ? {
            message: error.message,
            code: error.code,
          }
        : null,
    };
  },
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return {
      user: data?.user || null,
      session: data?.session || null,
      error: error
        ? {
            message: error.message,
            code: error.code,
          }
        : null,
    };
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    return {
      error: error
        ? {
            message: error.message,
            code: error.code,
          }
        : null,
    };
  },
  getProfile: async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (!session || sessionError) {
      throw new Error(sessionError?.message || "unauthorized");
    }
    //get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    return {
      session,
      profile: profile || null,
      error: profileError
        ? {
            message: profileError.message,
            code: profileError.code,
          }
        : null,
    };
  },
  //update user details
  updateProfile: async (phone, username) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      throw new Error(error.message && error.code);
    }
    const { data: updateProfile, error: updateProfileError } = await supabase
      .from("profiles")
      .update({ phone, username })
      .eq("id", session.user.id)
      .select()
      .single();

    return {
      profile: updateProfile || null,
      error: updateProfileError
        ? {
            message: updateProfileError.message,
            code: updateProfileError.code,
          }
        : null,
    };
  },
  resetPassword: async (email) => {
    //reset password
    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "customer-app/reset-password" || "vendor-app/reset-password",
    });
    return {
      success: true,
      message: "Password reset email sent successfully",
      error: error
        ? {
            message: error.message,
            code: error.code,
          }
        : null,
    };
  },
  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return {
      success: true,
      message: "Password updated successfully",
      error: error
        ? {
            message: error.message,
            code: error.code,
          }
        : null,
    };
  },
};
