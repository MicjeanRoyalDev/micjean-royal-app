//logic for sending the info hasn't been implemented yet
import React, { useState } from 'react';
import {ScrollView, SafeAreaView,TextInput,Text, TouchableOpacity, StyleSheet,LayoutAnimation,UIManager, Platform} from 'react-native';
import { Button, CheckBox } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
//handling animations on androids
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function ContactScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [contactOptions, setContactOptions] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const toggleDropdown = (setter, current) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter(!current);
  };
  const orderMade = ['Take Away', 'Online', 'Delivery'];
  const reason = ['Complaint', 'Question'];
  const area = ['Accuracy of order', 'Speed of Service', 'Product Quality'];
  const contact = ['By phone', 'By e-mail', 'I do not wish to be contacted'];

  const handleCheckbox = (option) => {
    if (contactOptions.includes(option)) {
      setContactOptions(contactOptions.filter((o) => o !== option));
    } else {
      setContactOptions([...contactOptions, option]);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      {/* Heading */}
      <Text style={styles.heading}>Contact Customer Support</Text>
      {/* Paragraph */}
      <Text style={styles.paragraph}>
        Please enter your details so we can help you resolve any issues. You may also send a suggestion through email.
      </Text>

      {/* Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Phone */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Order Made Dropdown */}
      <TouchableOpacity onPress={() => toggleDropdown(setShowOrder, showOrder)} style={styles.dropdownHeader}>
        <Text style={styles.label}>How did you make your order</Text>
        <MaterialIcons name={showOrder ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} />
      </TouchableOpacity>
      {showOrder &&
        orderMade.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selectedOrder === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedOrder(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

      {/* Reason Dropdown */}
      <TouchableOpacity onPress={() => toggleDropdown(setShowReason, showReason)} style={styles.dropdownHeader}>
        <Text style={styles.label}>Reason for contact</Text>
        <MaterialIcons name={showReason ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} />
      </TouchableOpacity>
      {showReason &&
        reason.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selectedReason === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedReason(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

      {/* Area Dropdown */}
      <TouchableOpacity onPress={() => toggleDropdown(setShowArea, showArea)} style={styles.dropdownHeader}>
        <Text style={styles.label}>Area of concern</Text>
        <MaterialIcons name={showArea ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} />
      </TouchableOpacity>
      {showArea &&
        area.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selectedArea === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedArea(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

      {/* Contact Preferences */}
      <Text style={styles.label}>How may we contact you?</Text>
      {contact.map((option) => (
        <CheckBox
          key={option}
          title={option}
          checked={contactOptions.includes(option)}
          onPress={() => handleCheckbox(option)}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
      ))}

      {/* Send Button, it doesn't do anything yet */}
      <Button
        title="Send"
        type="solid"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      {/*Options to contact the restaurant*/}
      <Text style={styles.label}>Contact us through:
         {'\n\n'}
         Phone: 05........
          {'\n\n'}
         Email: stuff@gmail.com
      </Text>
       </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom:120,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginTop:10,
    marginBottom: 15,
    color: '#1b5e20',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  option: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  selectedOption: {
    backgroundColor: '#1b5e20',
    borderColor: '#1b5e20',
  },
  optionText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#1b5e20',
    borderRadius: 25,
    paddingVertical: 12,
    width: 160,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
  },
});
