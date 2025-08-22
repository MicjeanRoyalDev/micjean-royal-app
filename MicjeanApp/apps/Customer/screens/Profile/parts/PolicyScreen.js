import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container}  contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.heading}>Privacy Policy</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.paragraph}>
        We value your privacy. This policy outlines how we collect, use, and protect your personal information.
      </Text>

      <Text style={styles.sectionTitle}>2. Information We Collect</Text>
      <Text style={styles.paragraph}>
        We may collect your name, contact details, order history, and other data to improve your experience.
      </Text>

      <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        Your information is used to provide better customer support, process orders, and personalize services.
      </Text>

      <Text style={styles.sectionTitle}>4. Sharing of Information</Text>
      <Text style={styles.paragraph}>
        We do not share your personal data with third parties unless required by law or with your consent.
      </Text>

      <Text style={styles.sectionTitle}>5. Data Security</Text>
      <Text style={styles.paragraph}>
        We implement industry-standard measures to protect your data from unauthorized access or disclosure.
      </Text>

      <Text style={styles.sectionTitle}>6. Your Rights</Text>
      <Text style={styles.paragraph}>
        You have the right to access, update, or delete your information. Contact us to make a request.
      </Text>

      <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
      <Text style={styles.paragraph}>
        We may update this policy from time to time. Changes will be posted here with the updated date.
      </Text>

      <Text style={styles.sectionTitle}>8. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions about this Privacy Policy, please contact us at support@gmail.com.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom:150,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#068a0fff',
    marginBottom: 12,
    marginTop:40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});
