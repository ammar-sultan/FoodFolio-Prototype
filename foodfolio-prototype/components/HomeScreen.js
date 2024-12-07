import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NavBar from './NavBar';
import { createTable, getRestaurants, deleteRestaurant } from '../database';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRestaurants = async () => {
    setLoading(true); // Start spinner
    const fetchTimeout = new Promise((resolve) => setTimeout(resolve, 100));
    const fetchRestaurants = getRestaurants(setRestaurants);
    await Promise.all([fetchTimeout, fetchRestaurants]);
    setLoading(false); // Stop spinner
  };

  useFocusEffect(
    useCallback(() => {
      loadRestaurants();
    }, [])
  );

  const handleDeleteRestaurant = async (id) => {
    setLoading(true); // Start spinner
    const deleteTimeout = new Promise((resolve) => setTimeout(resolve, 100));
    const deleteOperation = deleteRestaurant(id);
    await Promise.all([deleteTimeout, deleteOperation]);
    await loadRestaurants();
    setLoading(false); // Stop spinner
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i < rating ? 'star' : 'star-border'}
          size={16}
          color="#FFD700"
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Welcome to Personal Restaurant Guide</Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search restaurants"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity>
            <MaterialIcons name="search" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddRestaurant', {
              onAdd: (newRestaurant) => {
                setRestaurants((prevRestaurants) => [
                  ...prevRestaurants,
                  newRestaurant,
                ]);
              },
            })
          }
        >
          <MaterialIcons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#FFB06C" />
        </View>
      ) : (
        <ScrollView style={styles.restaurantList}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <View style={styles.restaurantCard} key={restaurant.id}>
                <Image
                  source={
                    restaurant.image
                      ? { uri: restaurant.image }
                      : require('../assets/restaurant.png')
                  }
                  style={styles.restaurantImage}
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MapScreen', {
                        restaurant: {
                          name: restaurant.name,
                          address: restaurant.address,
                          latitude: restaurant.latitude,
                          longitude: restaurant.longitude,
                        },
                      })
                    }
                  >
                    <Text style={styles.directionText}>Get direction</Text>
                  </TouchableOpacity>
                  {renderStars(parseInt(restaurant.rating, 10))} {/* Display stars */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('RestaurantDetail', {
                        restaurant,
                        onDelete: () => handleDeleteRestaurant(restaurant.id),
                      })
                    }
                  >
                    <Text style={styles.detailsText}>See details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No restaurants found.</Text>
            </View>
          )}
        </ScrollView>
      )}
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
    backgroundColor: '#ffb06c',
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
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4D4B5E',
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 3,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 6,
  },
  addButton: {
    backgroundColor: '#4D4B5E',
    borderRadius: 10,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#443F54',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    alignItems: 'center',
  },
  restaurantImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  directionText: {
    color: '#FFD700',
    marginTop: 4,
    fontSize: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  detailsText: {
    color: '#AAA',
    marginTop: 4,
    fontSize: 12,
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noResultsText: {
    color: '#FFF',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
