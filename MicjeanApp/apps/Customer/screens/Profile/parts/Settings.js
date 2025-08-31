import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, LayoutAnimation } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../../components/ui/Card';
import { auth } from '../../../../../backend/supabase/auth';
import Toast from '../../../components/Toast';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ ...toast, visible: false }), 2500);
  };
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [areaOfConcern, setAreaOfConcern] = useState('General Inquiry');
  
  // Profile data
  const [profile, setProfile] = useState({ username: '', email: '', phone: '' });

  // Fetch profile data
  useEffect(() => {
    if (!isFocused) return;
    
    const fetchProfile = async () => {
      const { profile: userProfile, error } = await auth.getProfile();
      if (error) {
        console.error('Failed to fetch profile:', error.message);
        return;
      }
    
      setProfile({
        username: userProfile?.username || '',
        email: userProfile?.email || '',
        phone: userProfile?.phone || '',
      });
      
      // Set form fields to current values
      setUsername(userProfile?.username || '');
      setEmail(userProfile?.email || '');
      setPhone(userProfile?.phone || '');
    };
    
    fetchProfile();
  }, [isFocused]);

  // Toggle dropdown with animation
  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowArea(!showArea);
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original values
      setUsername(profile.username);
      setEmail(profile.email);
      setPhone(profile.phone);
    }
    setIsEditing(!isEditing);
  };

  // Handle save changes
  const handleSave = async () => {
    if (!username.trim()) {
      showToast('Username is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const { user, error } = await auth.updateProfile(phone, username);
      
      if (error) {
        showToast(error.message || 'Update Failed', 'error');
        return;
      }

      // Update local profile state
      setProfile({
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      
  setIsEditing(false);
  showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Something went wrong. Please try again.', 'error');
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.logout();
      showToast('Signed out successfully!', 'success');
      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] });
      }, 1200);
    } catch (error) {
      showToast('Logout failed. Please try again.', 'error');
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    showToast('Account deletion feature is not yet available.', 'warning');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      {/* Personal Info Section */}
      <Card containerStyle={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={handleEditToggle}
          >
            <MaterialIcons 
              name={isEditing ? "close" : "edit"} 
              size={20} 
              color={isEditing ? "#e74c3c" : "#04860dff"} 
            />
            <Text style={[styles.editButtonText, { color: isEditing ? "#e74c3c" : "#04860dff" }]}>
              {isEditing ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.username || 'Not provided'}</Text>
          )}
        </View>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <Text style={styles.fieldValue}>{profile.email || 'Not provided'}</Text>
        </View>

        {/* Phone Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.phone || 'Not provided'}</Text>
          )}
        </View>

        {/* Save Button */}
        {isEditing && (
          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        )}
      </Card>

      {/* Area of Concern Section 
      <Card containerStyle={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Area of Concern</Text>
        <TouchableOpacity 
          style={styles.dropdownHeader} 
          onPress={toggleDropdown}
        >
          <Text style={styles.dropdownLabel}>{areaOfConcern}</Text>
          <MaterialIcons 
            name={showArea ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showArea && (
          <View style={styles.dropdownContent}>
            {['General Inquiry', 'Technical Support', 'Billing', 'Feedback', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownOption}
                onPress={() => {
                  setAreaOfConcern(option);
                  setShowArea(false);
                }}
              >
                <Text style={[
                  styles.dropdownOptionText,
                  areaOfConcern === option && styles.dropdownOptionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Card>

      {/* Communication Preferences Section 
      <Card containerStyle={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Communication Preferences</Text>
        <Text style={styles.communicationText}>
          You will receive notifications about orders, promotions, and important updates.
        </Text>
      </Card>*/}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={20} color="white" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDeleteAccount}
        >
          <MaterialIcons name="delete-forever" size={20} color="#e74c3c" />
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom:20,
  },

  // Section card styles
  sectionCard: {
    margin: 16,
    marginTop: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 20,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },

  // Field styles
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#04860dff',
  },

  // Save button styles
  saveButton: {
    backgroundColor: '#04860dff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Dropdown styles
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContent: {
    marginTop: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#666',
  },
  dropdownOptionTextSelected: {
    color: '#04860dff',
    fontWeight: '500',
  },

  // Communication section
  communicationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  // Action buttons
  actionButtons: {
    padding: 20,
    gap: 15,
  },
  logoutButton: {
    backgroundColor: '#04860dff',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  deleteButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
});
