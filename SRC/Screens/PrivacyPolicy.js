import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import PolicyComponent from '../Components/PolicyComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
  // const navigation = useNavigation();
  const policyArray = [
    {
      id: 1,
      heading: 'Information We Collect',
      description:
        'We collect different types of information from both Passengers and Drivers to operate our services effectively.',

      subData: [
        {
          id: 'i1',
          heading: 'a. Information You Provide to Us',
          texts: [
            'Account Information: Name, email, phone number, profile photo, password, and payment details.',
            'Driver Details: Driver’s license, vehicle registration, insurance documents, background check data.',
            'Support Requests: Communications with customer service, feedback, and inquiries.',
          ],
        },
        {
          id: 'i2',
          heading: 'b. Information We Collect Automatically',
          texts: [
            'Location Data:',
            'For Passengers: We collect GPS location when requesting, during, and shortly after a trip.',
            'For Drivers: We collect GPS location while you are logged in and available for trips.',
            'Device Information: IP address, operating system, app version, device identifiers, browser type.',
            'Usage Data: Search history, app navigation, ride history, pickup/drop-off locations, and timestamps.',
          ],
        },
        {
          id: 'i3',
          heading: 'c. Information from Third Parties',
          texts: [
            'Identity Verification Providers: Background check results, fraud prevention data.',
            'Payment Processors: Transaction history and payment confirmations.',
            'Referral Programs: Information from friends or contacts who refer you.',
          ],
        },
      ],
      texts: [],
    },
    {
      id: 2,
      heading: 'How We Use Your Information',
      description: 'We use your data for the following purposes:',

      subData: [],
      texts: [
        'To Provide Services: Match riders with drivers, process payments, and manage bookings.',
        'Safety & Security: Verify identity, monitor trips, prevent fraud, and handle disputes.',
        'Customer Support: Respond to questions, troubleshoot issues, and provide updates.',
        'Personalization: Recommend routes, services, and promotions based on your preferences.',
        'Compliance: Meet legal, regulatory, and insurance requirements.',
        'Analytics: Improve our app performance and service quality.',
      ],
    },
    {
      id: 3,
      heading: 'How We Share Your Information',
      description: 'We may share your data in the following cases:',

      subData: [
        {
          id: '11',
          heading: 'a. With Other Users',
          texts: [
            'Passengers see: Driver’s first name, profile photo, vehicle details, and real-time location during the ride.',
            'Drivers see: Passenger’s first name, profile photo (if provided), and pickup/drop-off locations.',
          ],
        },
        {
          id: 't2',
          heading: 'b. With Third-Party Service Providers',
          texts: [
            'Passengers see: Driver’s first name, profile photo, vehicle details, and real-time location during the ride.',
            'Drivers see: Passenger’s first name, profile photo (if provided), and pickup/drop-off locations.',
          ],
        },
        {
          id: 't3',
          heading: 'c. For Legal Reasons',
          texts: [
            'To comply with legal obligations, law enforcement requests, court orders, or to protect our rights.',
          ],
        },
        {
          id: 't3',
          heading: 'd. During Business Transfers',
          texts: [
            'If RideLynk is involved in a merger, acquisition, or asset sale, your information may be transferred.',
          ],
        },
      ],
      texts: [],
    },
    {
      id: 4,
      heading: 'Data Retention',
      description:
        'We keep your personal information for as long as it is needed to:',

      subData: [],
      texts: [
        'Provide our services.',
        'Meet legal, tax, and regulatory requirements.',
        'Resolve disputes and enforce agreements.',
      ],
      endText:
        'When no longer needed, we securely delete or anonymize the data.',
    },
    {
      id: 5,
      heading: 'Your Privacy Choices & Rights',
      description:
        'Depending on your location (e.g., GDPR in the EU, CCPA in California), you may have the right to:',
      subData: [],
      texts: [
        'Access the personal data we hold about you.',
        'Correct inaccurate or outdated information.',
        'Request deletion of your data.',
        'Restrict or object to certain data processing.',
        'Download a copy of your data (data portability).',
        'Opt out of marketing communications.',
      ],
      endText: 'To exercise your rights, email us at [privacy@ridelynk.com].',
    },
    {
      id: 6,
      heading: 'Cookies & Tracking Technologies',
      description: 'We use cookies, beacons, and similar technologies to:',
      subData: [],
      texts: [
        'Keep you logged in.',
        'Remember your preferences.',
        'Analyze usage for service improvements.',
      ],
      endText:
        'You can disable cookies in your browser settings, but some features may not work.',
    },
    {
      id: 7,
      heading: 'Security Measures',
      description:
        'We use industry-standard measures to protect your personal information, including:',
      subData: [],
      texts: [
        'Encryption: Secure transmission of payment and location data.',
        'Access Controls: Limiting who can access personal information.',
        'Monitoring: Regular security audits and fraud detection systems.',
      ],
      endText:
        'No system is 100% secure, so we cannot guarantee absolute protection.',
    },
    {
      id: 8,
      heading: "Children's Privacy",

      subData: [],
      description:
        'Ridel.ynk is not intended for children under 18. We do not knowingly collect information from minors.If we learn we have collected data from a minor, we will delete it promptly.',
      texts: [],
      endText: '',
    },
    {
      id: 9,
      heading: 'International Data Transfers',
      subData: [],
      description:
        'If you use our services outside your country, your information may be transferred to and processed in countries where privacy laws may not be as protective as your local laws. We will take steps to ensure your data is protected.',
      texts: [],
      endText: '',
    },
    {
      id: 10,
      heading: 'Changes to This Privacy Policy',
      description:
        'We may update this Privacy Policy from time to time.If we make significant changes, we will notify you through the app or by email.',

      subData: [],
      texts: [],
      endText: '',
    },
    {
      id: 11,
      heading: 'Contact Us',
      description:
        'If you have questions about this Privacy Policy, contact us at:',

      subData: [],
      texts: [
        'Ridel.ynk Inc.',
        '2018 156th Ave NE building F suit 172, Bellevue, WA 98007',
        // "privacy@ridelynk.com",
        // "(712) 259-4334"
      ],
      endText: '',
    },
  ];

  return (
    <SafeAreaView style={{backgroundColor :Color.white}}>
      <Header title={'privacy Policy'} showBack={false} hideUser={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.2),
        }}>
        <CustomText
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.themeBgColor,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          {
            'RideLynk Inc, our is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our mobile application, website, and related services (collectively, the “Platform”). '
          }
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.themeBgColor,
            textAlign: 'justify',

            fontSize: moderateScale(12, 0.6),
          }}>
          {
            'By using RideLynk App and Website, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services. '
          }
        </CustomText>
        {policyArray.map((item, index) => {
          return <PolicyComponent item={item} />;
        })}
        <View style={styles.contactContainer}>
          <Icon as={Entypo} color={Color.black} name="mail" />
          <CustomText style={{color: Color.themeBgColor}}>
            {'privacy@ridelynk.com'}
          </CustomText>
        </View>
        <View style={styles.contactContainer}>
          <Icon as={FontAwesome6} color={Color.red} name="phone" />
          <CustomText style={{color: Color.themeBgColor}}>
            {'(712) 259-4334'}
          </CustomText>
        </View>
        <View style={{height: windowHeight * 0.045}} />
      </ScrollView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = ScaledSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    backgroundColor: Color.themeBlack,
    borderColor: Color.themeBlack,
    // position: 'absolute',
    // left: moderateScale(10, 0.6),
    // top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactContainer: {
    marginLeft: moderateScale(10, 0.2),
    marginTop: moderateScale(5, 0.2),
    flexDirection: 'row',
    gap: moderateScale(10, 0.2),
  },
});
