import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import NavBar from './NavBar';

const AddRestaurant = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);

  const handleSave = () => {
    if (!name || !type || !phone || !address || !rating) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Prepare new restaurant data
    const newRestaurant = {
      name,
      type,
      phone,
      address,
      description,
      rating,
      image,
    };

    // Call the passed addRestaurant function
    if (route.params?.addRestaurant) {
      route.params.addRestaurant(newRestaurant);
    }

    // Navigate back to HomeScreen
    navigation.goBack();
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
      Alert.alert('No image selected');
    }
  };

  return (
    <View style={styles.container}>
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
            <TextInput
              value={type}
              onChangeText={setType}
              style={styles.input}
            />
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
          <TextInput
            value={rating}
            onChangeText={setRating}
            keyboardType="number-pad"
            style={styles.input}
          />
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
});

export default AddRestaurant;
