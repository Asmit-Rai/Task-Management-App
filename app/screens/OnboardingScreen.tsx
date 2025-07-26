import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, FlatList, Dimensions, ViewToken } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import 'react-native-reanimated';
import COLORS from '@/constants/Colors';

const ONBOARDING_SLIDES = [
  {
    id: '1',
    icon: 'check-square',
    title: 'Get things done.',
    subtitle: 'Just a click away from planning your tasks and staying organized.',
  },
  {
    id: '2',
    icon: 'award',
    title: 'Achieve Your Goals',
    subtitle: 'Prioritize your tasks and conquer your objectives one by one.',
  },
  {
    id: '3',
    icon: 'trending-up',
    title: 'Boost Your Productivity',
    subtitle: 'Manage your time effectively and see your productivity soar.',
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const handleNextPress = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/screens/LoginScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.decorativeShape} />

      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        style={styles.flatList}
      />

      <View style={styles.footer}>
        <View style={styles.pagerContainer}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.pagerDot,
                index === currentIndex ? styles.pagerDotActive : styles.pagerDotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Feather name="arrow-right" size={32} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

interface OnboardingSlideProps {
  item: typeof ONBOARDING_SLIDES[0];
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ item }) => {
  return (
    <View style={styles.slideContainer}>
      <View style={styles.iconContainer}>
        <Feather name={item.icon as any} size={80} color={COLORS.white} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flatList: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  decorativeShape: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    opacity: 0.1,
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -150,
    left: -150,
  },
  iconContainer: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.subtleText,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
    width: '100%',
  },
  pagerContainer: {
    flexDirection: 'row',
  },
  pagerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  pagerDotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  pagerDotInactive: {
    backgroundColor: COLORS.inactiveDot,
  },
  nextButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;