import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import colors from '../utils/colors';
import PropTypes from 'prop-types';

/**
 * @param {{onPress: (boolean) => void, tag: {tag: string, icon: string, name: string}, enabled: boolean}} props
 */
export default function CategoryTag({ onPress, tag, enabled }) {
  const [active, setActive] = useState(enabled);
  const [color, setColor] = useState(colors.light);
  useEffect(() => {
    setColor(active ? colors.light : colors.inactive);
  }, [active]);
  useEffect(() => {
    setActive(enabled);
  }, [enabled])

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        { borderColor: color, backgroundColor: colors.main + (!active ? '00' : '') },
      ]}
      onPress={() => {
        onPress(active);
        setActive(!active);
      }}
    >
      <Icon style={styles.icon} name={tag.icon} size={23} color={color}></Icon>
      <Text style={[styles.text, { color: color }]}>{tag.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 5,
    marginBottom: 2
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    fontSize:17,
    marginRight: 5,
  },
});

CategoryTag.propTypes = {
  onPress: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
