import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Linking, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import NavBar from './NavBar';

const MapScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { restaurant } = route.params || {}; 

  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== 'web') {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied.');
            setLoading(false);
            return;
          }

          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          setCurrentLocation({ latitude: 0, longitude: 0 }); // Default location for web
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        alert('Failed to get location.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!restaurant) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Restaurant data is unavailable.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFB06C" />
        <Text style={styles.loaderText}>Loading map...</Text>
      </View>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=_NOT_PUTTING_API_HERE_DUE_TO_GITHUB_POLICY&q=${encodeURIComponent(restaurant.name)}, ${encodeURIComponent(restaurant.address)}&center=${restaurant.latitude},${restaurant.longitude}&zoom=16`;


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

      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={googleMapsUrl}
            allowFullScreen
          />
        ) : (
          <TouchableOpacity
            style={styles.mapFallback}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`
              )
            }
          >
            <Text style={styles.mapFallbackText}>
              Tap to open Google Maps
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.addressText}>{restaurant.address}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`
            )
          }
        >
          <Text style={styles.buttonText}>Navigate to Restaurant</Text>
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
    flex: 1,
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
  mapContainer: {
    height: 300,
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#443F54',
  },
  mapFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#443F54',
  },
  mapFallbackText: {
    color: '#FFB06C',
    fontSize: 16,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#443F54',
    borderRadius: 10,
    margin: 16,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 16,
  },
});

export default MapScreen;
