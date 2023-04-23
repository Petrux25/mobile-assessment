import React, { useState, FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface DropdownOption {
  label: string;
  value: string;
};

interface DropdownProps  {
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
};

const Dropdown: FC<DropdownProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null >(options[0]);

  const handleOptionPress = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange(option)
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.menu}>
        <Text style={styles.menuText}>{selectedOption?.label || 'Select an option'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={() => handleOptionPress(option)} style={styles.optionButton}>
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#1f2937",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 50,
    marginBottom: 6,
    textAlign: 'center',
    width: 150,
    height: 50,
    alignSelf: 'flex-start',
  },
  optionsContainer: {
    position: "absolute",
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    zIndex: 10,
    elevation: 10,
    borderWidth: 1,

  },
  optionButton: {
    marginVertical: 5
  },
  menuText: {
    color: "white",
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10
  }
});

export default Dropdown;
