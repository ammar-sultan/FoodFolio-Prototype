import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';

const MapScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Restaurant Location</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#FFB06C" />
          <Text style={styles.backText}>All Restaurants</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.placeholderContainer}>
        <Image
          source={require('../assets/map-placeholder.png')}
          style={styles.imagePlaceholder}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.addressText}>{restaurant.address}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to this Restaurant</Text>
        </TouchableOpacity>
      </View>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343148',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFB06C',
    marginRight: 16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    flex:1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FFB06C',
    fontSize: 14,
    marginLeft: 4,
  },
  placeholderContainer: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#443F54',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#443F54',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#FFB06C',
    fontSize: 16,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFB06C',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343148',
  },
});

export default MapScreen;
