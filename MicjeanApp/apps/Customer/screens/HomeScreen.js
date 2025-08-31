import React, { useRef, useEffect, useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView, Image,TouchableOpacity,Dimensions,Animated,} from 'react-native';
import Header from '../components/Header';
import PopularDishes from '../components/PopularDishes';
import { supabase } from '../../../backend/supabase/clients';
import menuApi from '../utils/menu';
import Toast from '../components/Toast';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  };
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [menuData, setMenuData] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);
  // Fetch menu data for carousel and popular dishes
  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await menuApi.getFullMenu();
      if (!error && Array.isArray(data)) {
        setMenuData(data);
        // For carousel, pick first image from each category if available
        const images = data
          .map(cat => cat.items && cat.items[0] && cat.items[0].image_url ? { uri: cat.items[0].image_url } : null)
          .filter(Boolean)
          .slice(0, 3); // limit to 3 for carousel
        setCarouselImages(images);
        // For popular dishes, flatten all items and pick top 6 by some criteria (e.g., price or just first 6)
        const allDishes = data.flatMap(cat => cat.items || []);
        setPopularDishes(allDishes.slice(0, 4));
      } else if (error) {
        showToast('Error fetching menu data', 'error');
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;
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
  }, [carouselImages]);

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
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
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
            {carouselImages.length > 0 ? (
              carouselImages.map((image, index) => (
                <View key={index} style={styles.carouselItem}>
                  <Image
                    source={image}
                    style={styles.carouselImage}
                  />
                </View>
              ))
            ) : (
              <View style={styles.carouselItem}>
                <Text>Loading...</Text>
              </View>
            )}
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
        <PopularDishes dishes={popularDishes} />
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
    backgroundColor: '#1b9623ff',
  },
});

export default HomeScreen;
