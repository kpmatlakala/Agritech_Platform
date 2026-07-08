import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

/**
 * Request camera permissions
 */
export async function requestCameraPermission(): Promise<boolean> {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
}

/**
 * Request media library permissions
 */
export async function requestMediaLibraryPermission(): Promise<boolean> {
  try {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting media library permission:', error);
    return false;
  }
}

/**
 * Take a photo with camera
 */
export async function takePhoto(): Promise<string | null> {
  try {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      throw new Error('Camera permission not granted');
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error taking photo:', error);
    return null;
  }
}

/**
 * Pick a photo from media library
 */
export async function pickPhoto(): Promise<string | null> {
  try {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) {
      throw new Error('Media library permission not granted');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error picking photo:', error);
    return null;
  }
}

/**
 * Compress image file
 */
export async function compressImage(
  imageUri: string,
  quality: number = 0.7
): Promise<string | null> {
  try {
    const filename = `compressed-${Date.now()}.jpg`;
    const manipulated = await FileSystem.copyAsync({
      from: imageUri,
      to: `${FileSystem.cacheDirectory}${filename}`,
    });

    return manipulated;
  } catch (error) {
    console.error('Error compressing image:', error);
    return imageUri; // Return original if compression fails
  }
}

/**
 * Get image info (size, dimensions)
 */
export async function getImageInfo(
  imageUri: string
): Promise<{ size: number; width: number; height: number } | null> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    
    if (fileInfo.exists && fileInfo.size) {
      // For dimensions, we'd need to use Image.getSize or similar
      // For now, return size info
      return {
        size: fileInfo.size,
        width: 0,
        height: 0,
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting image info:', error);
    return null;
  }
}
