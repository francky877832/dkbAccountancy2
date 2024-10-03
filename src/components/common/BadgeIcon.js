import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '../../styles/commonStyles';

const BadgeIcon = ({ name, size, color, badgeCount, bottomTab, focused, styles }) => {
  return (
    <View style={[bottomTab?extrBadgeStyles.iconContainer:styles.iconContainer, focused?extrBadgeStyles.focused:null]}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

export default BadgeIcon;

const extrBadgeStyles = StyleSheet.create({
  focused :
  {
    backgroundColor : appColors.lightOrange,
    borderRadius : 25,
  },
  iconContainer: 
  {
    width: 50,
    //height: 24,
    //margin: 5,
    padding : 5,
    justifyContent : 'center',
    alignItems : 'center',
  },
})