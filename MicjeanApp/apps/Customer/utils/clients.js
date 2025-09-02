import "react-native-url-polyfill/auto";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

const supabaseUrl =
	process.env.EXPO_PUBLIC_PROJECT_URL ||
	"https://usxqrtnrqpenrpphzujy.supabase.co";
const supabaseAnonKey =
	process.env.EXPO_PUBLIC_API_KEY ||
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeHFydG5ycXBlbnJwcGh6dWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjMwMTksImV4cCI6MjA2NzE5OTAxOX0.Zi4UPSg3sn1tsXmXbWbFWNc9a8F5hrroZEwPABUhi1A";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
		lock: processLock,
	},
});

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
