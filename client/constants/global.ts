import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: colors.primaryGreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: typography.buttonText.fontSize,
    fontWeight: typography.buttonText.fontWeight as 'bold',
    color: typography.buttonText.color,
  },
  header: {
    fontSize: typography.largeTitle.fontSize,
    fontWeight: typography.largeTitle.fontWeight as 'bold',
    color: colors.primaryGreen,
    textAlign: 'center',
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.darkGray,
    backgroundColor: colors.white,
  },
});