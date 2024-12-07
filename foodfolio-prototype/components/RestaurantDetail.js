import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Share,
  Linking,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import NavBar from './NavBar';

const RestaurantDetail = ({ route, navigation }) => {
  const { restaurant: initialRestaurant, onDelete } = route.params;
  const [restaurant, setRestaurant] = useState(initialRestaurant);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(restaurant.id);
    }
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i < rating ? 'star' : 'star-o'}
          size={20}
          color="#FFD700"
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const handleShare = async () => {
    try {
      const message = `
        Check out this restaurant!
        Name: ${restaurant.name}
        Type: ${restaurant.type}
        Address: ${restaurant.address}
        Phone: ${restaurant.phone}
        Description: ${restaurant.description}
        Rating: ${restaurant.rating}/5
      `;

      const result = await Share.share({
        message,
        url: restaurant.image || '',
        title: `Check out ${restaurant.name}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      alert('Error sharing restaurant: ' + error.message);
    }
  };

  const shareOnFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(restaurant.image || '')}&quote=${encodeURIComponent(
      `Check out ${restaurant.name}: ${restaurant.description}`
    )}`;
    Linking.openURL(fbUrl).catch((err) => console.error('Error opening Facebook:', err));
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check out ${restaurant.name}: ${restaurant.description}`
    )}&url=${encodeURIComponent(restaurant.image || '')}`;
    Linking.openURL(twitterUrl).catch((err) => console.error('Error opening Twitter:', err));
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
          <Text style={styles.addressText}>{restaurant.address}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.infoLabel}>Description:</Text>
          <Text style={styles.descriptionText}>{restaurant.description}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.infoLabel}>Rating:</Text>
          {renderStars(parseInt(restaurant.rating, 10))}
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
          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            onPress={handleShare}
          >
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.facebookButton]}
            onPress={shareOnFacebook}
          >
            <Text style={styles.buttonText}>Share on Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.twitterButton]}
            onPress={shareOnTwitter}
          >
            <Text style={styles.buttonText}>Share on Twitter</Text>
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
    padding: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#FFB06C',
  },
  addressContainer: {
    marginBottom: 12,
    backgroundColor: '#443F54',
    borderRadius: 8,
    padding: 12,
  },
  addressText: {
    fontSize: 12,
    color: '#FFF',
  },
  descriptionContainer: {
    marginBottom: 12,
    backgroundColor: '#443F54',
    borderRadius: 8,
    padding: 12,
  },
  descriptionText: {
    fontSize: 12,
    color: '#FFF',
  },
  ratingContainer: {
    marginBottom: 12,
    backgroundColor: '#443F54',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  editButton: {
    backgroundColor: '#FFB06C',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
  },
  shareButton: {
    backgroundColor: '#5A9',
  },
  buttonText: {
    fontSize: 12,
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
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 2,
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
    fontSize: 12,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  facebookButton: {
    flex: 1,
    backgroundColor: '#3b5998',
    marginHorizontal: 2,
  },
  twitterButton: {
    flex: 1,
    backgroundColor: '#1DA1F2',
    marginHorizontal: 2,
  },
});

export default RestaurantDetail;
