import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {ArrowLeftCircleIcon, ArrowRightCircleIcon} from 'react-native-heroicons/solid';

const CustomCalendarHeader = ({ month, year, onPressLeft, onPressRight }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressLeft}>
        <ArrowLeftCircleIcon size={20} color="#FEFEFE" />
      </TouchableOpacity>
      <Text style={styles.monthText}>{month} {year}</Text>
      <TouchableOpacity onPress={onPressRight}>
        <ArrowRightCircleIcon size={20} color="#FEFEFE" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F392BE', // Azul oscuro
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    position: 'relative'
  },
  monthText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FEFEFE',
  },
});

export default CustomCalendarHeader;
