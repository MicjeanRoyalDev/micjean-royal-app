import React, { useRef, useEffect, useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView, Image,TouchableOpacity,Dimensions,Animated,} from 'react-native';
import Header from '../components/Header';
import PopularDishes from '../components/PopularDishes';
import { supabase } from '../../../backend/supabase/clients';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Maintain fetched username
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const carouselImages = [
    require('../../../shared/assets/images/micjean photo for background.jpg'),
    require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    require('../../../shared/assets/images/micjean photo for background.jpg'),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselImages.length;

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * width,
            animated: true,
          });
        }

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Fetch the current user’s profile username on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();
        // Fallback to prefix of email (before '@') if no username in profile
        const emailPrefix = session.user.email.split('@')[0];
        setUserName(profile?.username || emailPrefix);
      }
    };
    fetchProfile();
  }, []);

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab pressed:', tabId);
    // Navigation is now handled by BottomNavbar component
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Component */}
      <Header userName={userName} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEnabled={true}
      >
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {carouselImages.map((image, index) => (
              <View key={index} style={styles.carouselItem}>
                <Image
                  source={image}
                  style={styles.carouselImage}
                />
              </View>
            ))}
          </ScrollView>

          {/* Carousel indicators */}
          <View style={styles.indicators}>
            {carouselImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Popular Dishes Component */}
        <PopularDishes />
      </ScrollView>

      {/* Bottom Navigation Component */}
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90, // Padding for floating nav
    flexGrow: 1,
  },
  carouselContainer: {
    marginVertical: 20,
  },
  carousel: {
    height: 200,
  },
  carouselItem: {
    width: width,
    paddingHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#B71C1C',
  },
});

export default HomeScreen;
