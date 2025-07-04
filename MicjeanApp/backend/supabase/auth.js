import { supabase } from "./clients";
/*
to use functionality
import auth
and call any functionality using the dot notation (ie - auth.login(params))
or destructure individual functionality from auth
*/
export const auth = {
  register: async (email, password, username, phone) => {
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
      phone: phone,
      options: {
        data: {
          username: username,
          isAdmin: false,
        },
      },
    });
    console.log("user", data);
    console.log("error", error);
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
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("login data", data);
    console.log("login error", error);
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
      data: { session, user: profile },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (!session || sessionError) {
      throw new Error(sessionError?.message || "unauthorized");
    }
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
    const { data, error } = await supabase.auth.updateUser({
      data: {
        phone: phone,
        username: username,
      },
    });
    return {
      user: data?.user || null,
      error: error
        ? {
            message: error.message,
            code: error.code,
          }
        : null,
    };
  },
  resetPassword: async (email) => {
    //reset password
    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://micjeanroyal.com/reset-password",
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
