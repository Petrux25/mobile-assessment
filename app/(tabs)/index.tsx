import { StyleSheet } from 'react-native';
import { useState } from 'react';

import { Text, View } from '../../components/Themed';
import InfiniteScrollGallerySWR from '../../components/InfiniteScrollGallerySWR';
import Dropdown, { DropdownOption } from '../../components/Dropdown';
import { orientationOptions, colorOptions } from '../../constants/DropdownOptions';
import SearchBar from '../../components/SearchBar';

export default function HomeScreen() {
  const [search, setSearch] = useState("Pokemon");
  const [color, setColor] = useState("");
  const [orientation, setOrientation] = useState("");

  const handleColorSelect = (option: DropdownOption) => {
    setColor(option.value);
  };

  const handleOrientationSelect = (option: DropdownOption) => {
    setOrientation(option.value);
  };



  return (
    <View style={styles.container}>
      <View style={styles.queryContainer}>
        <SearchBar onChange={setSearch} value={search} />
        <View style={styles.dropdownContainer}>
          <Dropdown options={orientationOptions} onChange={handleOrientationSelect} />
          <Dropdown options={colorOptions} onChange={handleColorSelect} />
        </View>
      </View>

      <InfiniteScrollGallerySWR query={search} color={color} orientation={orientation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  queryContainer: {
    height: 160,
    zIndex: 10
  }
});
