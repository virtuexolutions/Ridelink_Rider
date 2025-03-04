import { Pusher } from '@pusher/pusher-websocket-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { baseUrl } from '../Config';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const MessagesScreen = ({ route }) => {
  const focused = useIsFocused();
  const { data } = route.params;
  console.log('🚀 ~ MessagesScreen ~ rider_id:', data);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ MessagesScreen ~ token:', token);
  const pusher = Pusher.getInstance();
  let myChannel = null;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const user_type = useSelector(state => state.authReducer.user_type);

  // useEffect(() => {
  //   console.log('useEffect runs');
  //   async function connectPusher() {
  //     try {
  //       await pusher.init({
  //         apiKey: '2cbabf5fca8e6316ecfe',
  //         cluster: 'ap2',
  //       });
  //       myChannel = await pusher.subscribe({
  //         channelName: `my-channel-${userData?.id}`,
  //         onSubscriptionSucceeded: channelName => {
  //           console.log(`And here are the channel members: ${myChannel}`);
  //           console.log(
  //             `Subscribed to ${JSON.stringify(channelName, null, 2)}`,
  //           );
  //         },
  //         onEvent: event => {
  //           userData?.id;
  //           console.log('Got channel event:', event.data);
  //           const dataString = JSON.parse(event.data);
  //           console.log(
  //             '🚀 ~ connectPusher ~ dataString:',
  //             dataString?.message,
  //           );
  //           if (dataString?.message.target_id == userData?.id) {
  //             setMessages(previousMessages =>
  //               GiftedChat.append(previousMessages, dataString?.message),
  //             );
  //           }

  //         },
  //       });
  //       console.log(pusher.connectionState, 'pusherrrrrrrstate');
  //       await pusher.connect();
  //       console.log('hello from pusher');
  //     } catch (e) {
  //       console.log(`ERROR: ${e}`);
  //     }
  //   }
  //   connectPusher();
  //   getChatListingData();
  //   return async () => {
  //     await pusher.unsubscribe({ channelName: `my-channel-${userData?.id}` });
  //   };
  // }, []);

  // const startChat = async body => {
  //   console.log('🚀 ~ startChat ~ body:', body);
  //   const url = 'auth/send_message';
  //   const response = await Post(url, body, apiHeader(token));
  //   if (response != undefined) {
  //   }
  // };

  // const getChatListingData = async () => {
  //   const url = `auth/message_list?user_id=${userData?.id}&target_id=${data?.id}`;
  //   setIsLoading(true);
  //   const response = await Get(url, token);
  //   console.log('🚀 ~ getChatListingData ~ response:', response?.data);
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     const finalData = response?.data?.data
  //       .map(message => ({
  //         ...message,
  //         _id: message._id || Math.random().toString(36).substring(7),
  //       }))
  //       .reverse();
  //     setMessages(finalData);
  //   }
  // };

  // const onSend = useCallback(
  //   (messages = []) => {
  //     const newMessage = {
  //       _id: Math.random().toString(36).substring(7),
  //       text: messages[0].text,
  //       createAt: new Date(),
  //       user: {
  //         _id: userData?.id,
  //         name: `${userData?.name}`,
  //         avatar: baseUrl + userData?.photo,
  //       },
  //     };
  //     console.log('🚀 ~ MessagesScreen ~ newMessage:', newMessage);
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, newMessage),
  //     );
  //     startChat({
  //       chat_id: userData?.id,
  //       // target_id: rider_id,
  //       ...newMessage,
  //     });
  //   },
  //   [messages],
  // );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <Header headerColor={['white', 'white']} title={'Chat'} showBack={true} />
      <View style={styles.row}>
        <View>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              color: Color.darkGray,
            }}>
            {data?.userData?.name}
          </CustomText>
        </View>
        <View
          style={{
            width: moderateScale(60, 0.6),
            height: moderateScale(60, 0.6),
            borderRadius: moderateScale(30, 0.6),
          }}>
          <CustomImage
            source={{
              uri:
                baseUrl + data?.userData?.photo
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: moderateScale(30, 0.6),
            }}
          />
        </View>
      </View>
      <GiftedChat
        textInputStyle={{
          color: Color.black,
          marginTop: moderateScale(5, 0.3),
        }}
        placeholderTextColor={Color.darkGray}
        messages={messages}
        isTyping={false}
        alignTop
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                backgroundColor: Color.lightGrey,
                height: moderateScale(50, 0.6),
                justifyContent: 'center',
                marginHorizontal: moderateScale(6, 0.6),
                borderRadius: moderateScale(12, 0.6),
                bottom: 10,
              }}>
              <Composer
                {...props}
                textInputStyle={{
                  flex: 1,
                  color: 'black',
                  padding: 10,
                  alignSelf: 'flex-start',
                }}></Composer>
            </InputToolbar>
          );
        }}
        alwaysShowSend={true}
        renderSend={props => {
          return (
            <Send
              {...props}
              containerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: moderateScale(15, 0.6),
                width: moderateScale(30, 0.6),
                bottom: 3,
              }}>
              <Icon
                name="send"
                as={Feather}
                size={moderateScale(22)}
                color={Color.themeColor}
              />
            </Send>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: Color.blue,
                  borderRadius: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                },
                left: {
                  backgroundColor: Color.lightBlue,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 0,
                  marginLeft: moderateScale(30, 0.6),
                  marginTop: moderateScale(12, 0.6),
                },
              }}
              containerStyle={{
                left: {
                  position: 'absolute',
                  left: 10,
                },
                right: {
                  marginRight: moderateScale(10, 0.6),
                },
              }}
            />
          );
        }}
        renderActions={props => (
          <Actions
            {...props}
            icon={() => (
              <Icon
                as={MaterialCommunityIcons}
                name="sticker-emoji"
                size={22}
                color={Color.darkBlue}
              />
            )}
            onPressActionButton={() => {
              console.log('Action button pressed');
            }}
          />
        )}
        onSend={
          messages => console.log('message send')
          // onSend(messages)
        }
        user={{
          _id: userData?.id,
          name: userData?.name,
          avatar: baseUrl + userData?.photo,
        }}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
  image: {
    marginHorizontal: moderateScale(10, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(20, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.6),
    justifyContent: 'space-between',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    marginRight: 8,
    backgroundColor: 'red',
  },
  bubble: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  userName: {
    fontWeight: 'bold',
    color: '#007aff', // Adjust color for the name
  },
  messageText: {
    color: '#333333',
  },
});
