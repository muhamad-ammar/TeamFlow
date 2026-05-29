import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useSplashViewModel = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const initialize = async () => {
    try {
      setIsLoading(true);

      await new Promise(resolve =>
        setTimeout(resolve, 2000),
      );

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    initialize,
  };
};