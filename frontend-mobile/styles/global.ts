import { StyleSheet } from 'react-native';

export const colors = {
  background: '#f7faf6',
  header: '#eef6eb',
  surface: '#ffffff',
  primary: '#2f9e44',
  secondary: '#2a6f97',
  success: '#2b8a3e',
  warning: '#f08c00',
  alert: '#c92a2a',
  text: '#1f2a1f',
  textSecondary: '#5c6b5c',
  border: '#d9e7d6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: spacing.md,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 10,
    fontSize: 16,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDanger: {
    backgroundColor: colors.alert,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.md,
  },
});
