import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import NavBar from './NavBar';

const AboutScreen = () => {
  const teamMembers = [
    { name: 'Ammar Sultan', id: '101296759', crn: 'CRN 15756' },
    { name: 'Camila Lee', id: '100974597', crn: 'CRN 15756' },
    { name: 'Iffat Amin Nabila', id: '101429832', crn: 'CRN 15756' },
    { name: 'Qinxi Liu', id: '101415216', crn: 'CRN 15756' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Team Members</Text>
      </View>
      <Text style={styles.courseCode}>COMP 3074</Text>
      <ScrollView contentContainerStyle={styles.teamList}>
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberInfo}>{member.id}</Text>
            <Text style={styles.memberInfo}>{member.crn}</Text>
          </View>
        ))}
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
    fontWeight: 'bold',
    color: '#FFF',
  },
  courseCode: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  teamList: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  memberCard: {
    backgroundColor: '#dca67a',
    borderRadius: 10,
    padding: 22,
    marginBottom: 10,
    width: '90%',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343148',
    textAlign: 'center',
  },
  memberInfo: {
    fontSize: 14,
    color: '#343148',
    textAlign: 'center',
  },
});

export default AboutScreen;
