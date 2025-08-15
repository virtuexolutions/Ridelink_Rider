import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {useNavigation} from '@react-navigation/native';
import TernsComponent from '../Components/TernsComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const TermsAndConditions = () => {
  // const navigation = useNavigation();
  const terms = [
    {
      id: 1,
      heading: 'Definitions',
      description: 'For the purpose of these Terms:',
      subTerms: [
        'RideLynk” Company” means RideLynk Inc., its subsidiaries, affiliates, officers, directors, employees, agents, and licensors.',
        'Platform means the RideLynk app, website, and any related tools, features, and services.',
        'User means any person who accesses or uses the Platform, including Passengers and Drivers.',
        'Passenger means an individual using the Platform to request rides.',
        'Driver means an independent contractor who uses the Platform to provide transportation services.',
        'Services means connecting Passengers with Drivers for pre-arranged rides.',
      ],
    },
    {
      id: 2,
      heading: 'Eligibility',
      description: '',
      subTerms: [
        'You must be at least 18 years old to create a Passenger account and at least 21 years old to register as a Driver.',
        'You must have the legal capacity to enter into these Terms.',
        'Drivers must hold a valid driver’s license, vehicle registration, and insurance as required by law.',
        'We may deny, suspend, or terminate your account at our sole discretion if you provide false information or violate these Terms.',
      ],
    },
    {
      id: 3,
      heading: 'Account Registration & Security',
      description: '',
      subTerms: [
        'Users must create an account with accurate personal information.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to immediately notify RideLynk of any unauthorized access or breach.',
        'RideLynk is not responsible for losses resulting from unauthorized use of your account.',
      ],
    },
    {
      id: 4,
      heading: 'Nature of the Relationship',
      description: '',
      subTerms: [
        'RideLynk does not provide transportation services and is not a transportation carrier.',
        'All rides are provided by independent third-party Drivers.',
        'RideLynk acts solely as a technology platform to connect Passengers with Drivers.',
        'No agency, partnership, joint venture, or employment relationship exists between RideLynk and Drivers.',
      ],
    },
    {
      id: 5,
      heading: 'Use of the Platform',
      description: 'You agree to:',
      subTerms: [
        'Use the Platform only for lawful purposes.',
        'Not engage in fraudulent, abusive, or harmful conduct.',
        'Not attempt to disrupt, hack, or interfere with the Platform.',
        'Follow community guidelines for respectful and safe conduct.',
      ],
    },
    {
      id: 6,
      heading: 'Booking & Ride Process',
      description: '',
      subTerms: [
        'Ride requests are matched with available Drivers.',
        'Estimated fares may vary due to traffic, demand, tolls, and route changes.',
        'Passengers must be ready at the pickup location at the agreed time.',
        'Drivers may refuse rides in certain situations (e.g., safety concerns, unruly behavior).',
      ],
    },
    {
      id: 7,
      heading: 'Fees & Payments',
      description: '',
      subTerms: [
        'Passengers agree to pay the fare displayed in the app, plus applicable taxes, tolls, and fees.',
        'Payments are processed electronically through our secure payment gateway.',
        'Drivers are compensated according to the agreed commission rate, minus RideLynk’s service fee.',
        'Surge pricing may apply during high-demand periods.',
      ],
    },
    {
      id: 8,
      heading: 'Cancellations & No-Show Policy',
      description: '',
      subTerms: [
        'Passengers may cancel a ride before a Driver is dispatched without penalty.',
        'Late cancellations or no-shows may incur a cancellation fee.',
        'Drivers who frequently cancel without valid reason may face account suspension.',
      ],
    },
    {
      id: 9,
      heading: 'Driver Obligations',
      description: '',
      subTerms: [
        'Maintain a clean, roadworthy, and insured vehicle.',
        'Comply with all traffic laws and regulations.',
        'Treat passengers respectfully and ensure their safety.',
        'Not engage in discriminatory, inappropriate, or dangerous behavior.',
      ],
    },
    {
      id: 10,
      heading: 'Passenger Obligations',
      description: '',
      subTerms: [
        'Treat Drivers with respect and maintain safe behavior during rides.',
        'Not damage vehicles or leave personal belongings behind.',
        'Not engage in unlawful activity during rides.',
        'Ensure payment information is valid and up to date.',
      ],
    },
    {
      id: 11,
      heading: 'Prohibited Conduct',
      description: 'You may not:',
      subTerms: [
        'Use the Platform for illegal activities.',
        'Carry hazardous, illegal, or prohibited substances.',
        'Harass, threaten, or harm Drivers, Passengers, or RideLynk staff.',
        'Attempt to bypass RideLynk’s payment system.',
      ],
    },
    {
      id: 12,
      heading: 'Safety & Emergency Situations',
      description: '',
      subTerms: [
        'RideLynk may provide in-app safety features, such as emergency assistance buttons.',
        'In emergencies, contact local authorities immediately.',
        'RideLynk may suspend accounts for safety violations.',
      ],
    },
    {
      id: 13,
      heading: 'Ratings & Feedback',
      description: '',
      subTerms: [
        'Passengers and Drivers may rate and review each other.',
        'Feedback must be honest, respectful, and not defamatory.',
        'Repeated low ratings may result in account deactivation.',
      ],
    },
    {
      id: 14,
      heading: 'Privacy & Data Use',
      description: '',
      subTerms: [
        'RideLynk collects and processes personal data in accordance with our Privacy Policy.',
        'Your data may be shared with third parties (e.g., payment processors, insurance providers) as needed to provide services.',
        'Location data is collected during active rides for safety, navigation, and compliance purposes.',
      ],
    },
    {
      id: 15,
      heading: 'Disclaimers & Limitation of Liability',
      description: '',
      subTerms: [
        'RideLynk provides the Platform “AS IS” without warranties of any kind.',
        'We are not responsible for acts, errors, or omissions of Drivers or Passengers.',
        'RideLynk’s liability is limited to the maximum extent permitted by law.',
        'You assume full responsibility for your use of the Platform.',
      ],
    },
    {
      id: 16,
      heading: 'Indemnification',
      description:
        'You agree to defend, indemnify, and hold harmless RideLynk from claims, damages, liabilities, and expenses arising from:',
      subTerms: [
        'Your use of the Platform.',
        'Your violation of these Terms.',
        'Your infringement of third-party rights.',
      ],
    },
    {
      id: 17,
      heading: 'Termination',
      description: '',
      subTerms: [
        'RideLynk may suspend or terminate your account at any time for violations of these Terms or applicable laws.',
        'You may terminate your account by contacting customer support.',
        'Provisions that by their nature should survive termination (e.g., payment obligations, liability limitations) will continue.',
      ],
    },
    {
      id: 18,
      heading: 'Dispute Resolution',
      description: '',
      subTerms: [
        'Disputes shall first be attempted to be resolved through direct negotiation.',
        'If unresolved, disputes may be subject to binding arbitration under [Jurisdiction’s] rules.',
        'Class actions are not permitted under these Terms.',
      ],
    },
    {
      id: 19,
      heading: 'Governing Law',
      description:
        'These Terms are governed by and construed in accordance with the laws of [Insert Jurisdiction], without regard to its conflict of law rules.',
      subTerms: [],
    },
    {
      id: 20,
      heading: 'Changes to Terms',
      description: '',
      subTerms: [
        'RideLynk may update these Terms from time to time.',
        'Continued use of the Platform after changes constitutes acceptance of the updated Terms.',
        'We will notify Users of significant changes via email or in-app notification.',
      ],
    },
  ];

  return (
    <SafeAreaView style={{backgroundColor : Color.white}}>
      <Header title={'Terms & Conditions'} showBack={false} hideUser={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'white',
          // marginTop: windowHeight * 0.1,
        }}
        contentContainerStyle={
          {
            // padding : moderateScale(10,0.6),
          }
        }>
        <CustomText
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            textTransform: 'none',
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          {
            'IMPORTANT NOTICE: These Terms & Conditions (“Terms”) govern your use of the RideLynk mobile application, website, and services (collectively, the “Platform”). By accessing, downloading, registering, or using RideLynk, you agree to these Terms. If you do not agree, you may not access or use our Platform.'
          }
        </CustomText>
        {terms.map((term, index) => {
          return <TernsComponent termData={term} />;
        })}
        <View style={{height: windowHeight * 0.05}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = ScaledSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    // position: 'absolute',
    // left: moderateScale(10, 0.6),
    // top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: Color.themeBlack,
    justifyContent: 'center',
  },
});
