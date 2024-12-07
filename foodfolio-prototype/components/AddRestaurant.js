import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import NavBar from './NavBar';
import { addRestaurant } from '../database';

const AddRestaurant = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const restaurantTypes = ['Italian', 'Chinese', 'Mediterranean', 'Mexican', 'Japanese', 'Other'];

const handleSave = async () => {
  if (!name || !type || !phone || !address || !rating) {
    setModalMessage('All fields are required');
    setModalVisible(true);
    return;
  }

  try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=_NOT_PUTTING_API_HERE_DUE_TO_GITHUB_POLICY`
      );
    const data = await response.json();

    if (data.status !== 'OK') {
      setModalMessage('Failed to fetch location. Please check the address.');
      setModalVisible(true);
      return;
    }

    const { lat, lng } = data.results[0].geometry.location;

    const newRestaurant = {
      name,
      type,
      phone,
      address,
      description,
      rating,
      image,
      latitude: lat,
      longitude: lng,
    };

    addRestaurant(newRestaurant);

    if (route.params?.onAdd) {
      route.params.onAdd(newRestaurant);
    }

    navigation.goBack();
  } catch (error) {
    setModalMessage('An error occurred while fetching the location.');
    setModalVisible(true);
  }
};


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setModalMessage('No image selected');
      setModalVisible(true);
    }
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  return (
    <View style={styles.container}>
      {/* Modal Alert */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main Content */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Add New Restaurant</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#FFB06C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.detailContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.restaurantImage} />
            ) : (
              <MaterialIcons name="add-photo-alternate" size={40} color="#FFB06C" />
            )}
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Restaurant Name: </Text>
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Restaurant Type: </Text>
            </Text>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a type" value="" />
              {restaurantTypes.map((type, index) => (
                <Picker.Item label={type} value={type} key={index} />
              ))}
            </Picker>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Phone Number: </Text>
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.infoLabel}>Address:</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            multiline
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.infoLabel}>Description:</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.infoLabel}>Rating:</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarPress(index)}
              >
                <FontAwesome
                  name={index < rating ? 'star' : 'star-o'}
                  size={24}
                  color="#FFB06C"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Add Restaurant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  detailContainer: {
    flex: 1,
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePicker: {
    width: 80,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#443F54',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  restaurantImage: {
    width: 80,
    height: 180,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#443F54',
    borderRadius: 8,
    padding: 10,
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
    marginBottom: 10,
    backgroundColor: '#443F54',
    borderRadius: 8,
    padding: 10,
  },
  descriptionContainer: {
    marginBottom: 10,
    backgroundColor: '#443F54',
    borderRadius: 8,
    padding: 10,
  },
  ratingContainer: {
    marginBottom: 10,
    backgroundColor: '#443F54',
    borderRadius: 8,
    padding: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#FFB06C',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#343148',
    borderRadius: 8,
    padding: 4,
    color: '#FFF',
    fontSize: 12,
    height: 30,
    marginBottom: 6,
  },
  picker: {
    backgroundColor: '#343148',
    borderRadius: 8,
    color: '#FFF',
    marginBottom: 6,
    height: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#443F54',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFB06C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AddRestaurant