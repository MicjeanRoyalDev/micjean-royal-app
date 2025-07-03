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
    // insert username to database
    if (user) {
      const { data } = await supabase.from("profiles").insert({
        username,
        phone,
      });
    }
    if (error) {
      throw new Error(error.message && error.code);
    }
    return {
      success: true,
      message: "User registered successfully",
      data: user,
    };
  },
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message && error.code);
    }
    return { success: true, message: "User logged in successfully", data };
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message && error.code);
    }
    return { success: true, message: "User logged out successfully" };
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

    if (profileError) {
      throw new Error(profileError.message && profileError.code);
    }
    return { session, profile };
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
    if (updateProfileError) {
      throw new Error(updateProfileError.message && updateProfileError.code);
    }
  },
  resetPassword: async (email) => {
    //reset password
    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "customer-app/reset-password" || "vendor-app/reset-password",
    });
    if (error) {
      throw new Error(error.message && error.code);
    }
    return { success: true, message: "Password reset sent successfully", data };
  },
  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw new Error(error.message || "Failed to update password");
    }
    return { success: true, message: "Password updated successfully" };
  },
};
