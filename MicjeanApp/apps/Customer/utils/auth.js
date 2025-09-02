import { supabase } from './clients';
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
			data: { session },
		} = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					phone: phone,
					username: username,
					isAdmin: false,
				},
			},
		});
		return {
			user: session?.user?.user_metadata || null,
			session: session || null,
			error: error ? { message: error.message, code: error.code } : null,
		};
	},

	login: async (email, password) => {
		const {
			data: { session },
			error,
		} = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		return {
			user: session?.user?.user_metadata || null,
			session: session || null,
			error: error
				? {
						message: error.message,
						code: error.code,
					}
				: null,
		};
	},

	logout: async () => {
		const { data, error } = await supabase.auth.signOut();
		return {
			data: data || null,
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
		return {
			session,
			profile: session?.user?.user_metadata || null,
			error: sessionError
				? {
						message: sessionError.message,
						code: sessionError.code,
					}
				: null,
		};
	},

	// Update user details
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
		const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: "https://micjeanroyal.com/reset-password",
		});
		return {
			success: !error,
			message: error
				? "Failed to send password reset email"
				: "Password reset email sent successfully",
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
			success: !error,
			message: error
				? "Failed to update password"
				: "Password updated successfully",
			error: error
				? {
						message: error.message,
						code: error.code,
					}
				: null,
		};
	},
};
