import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NavBar from './NavBar';

const RestaurantDetail = ({ route, navigation }) => {
  const { restaurant: initialRestaurant, onDelete } = route.params;
  const [restaurant, setRestaurant] = useState(initialRestaurant); // Use state for restaurant
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(restaurant.id);
    }
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Render the restaurant details */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Restaurant Details</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#FFB06C" />
          <Text style={styles.backText}>All Restaurants</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailContainer}>
        {/* Render details */}
        <View style={styles.rowContainer}>
          <Image
            source={
              restaurant.image
                ? { uri: restaurant.image }
                : require('../assets/restaurant.png')
            }
            style={styles.restaurantImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Restaurant Name: </Text>
              {restaurant.name}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Type: </Text>
              {restaurant.type}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Phone: </Text>
              {restaurant.phone}
            </Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.infoLabel}>Address:</Text>
          <TouchableOpacity>
            <Text style={styles.mapLink}>View map</Text>
          </TouchableOpacity>
          <Text style={styles.addressText}>{restaurant.address}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.infoLabel}>Description:</Text>
          <Text style={styles.descriptionText}>{restaurant.description}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.infoLabel}>Rating:</Text>
          <Text style={styles.ratingText}>{restaurant.rating}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() =>
              navigation.navigate('EditRestaurant', {
                restaurant,
                onUpdate: (updatedRestaurant) => {
                  setRestaurant(updatedRestaurant); // Update state to trigger re-render
                },
              })
            }
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete confirmation modal */}
      <Modal
        visible={isDeleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete {restaurant.name}?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  detailContainer: {
    flex: 1,
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  restaurantImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#443F54',
    borderRadius: 10,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#FFB06C',
  },
  addressContainer: {
    marginBottom: 16,
    backgroundColor: '#443F54',
    borderRadius: 10,
    padding: 16,
  },
  mapLink: {
    color: '#FFD700',
    textAlign: 'right',
    fontSize: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#FFF',
  },
  descriptionContainer: {
    marginBottom: 16,
    backgroundColor: '#443F54',
    borderRadius: 10,
    padding: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#FFF',
  },
  ratingContainer: {
    marginBottom: 16,
    backgroundColor: '#443F54',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  editButton: {
    backgroundColor: '#FFB06C',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#443F54',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#6C757D',
  },
  confirmButton: {
    backgroundColor: '#D9534F',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RestaurantDetail;