import {palette} from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  ...palette,
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: palette.lighterGrey,
  authBackground: palette.white,
  cardBackground: palette.white,
  avatarBackground: palette.lighterOrange,
  /**
   * The main tinting color.
   */
  primary: palette.c0D0628,
  secondary: palette.cECB63A,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.orangeDarker,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: palette.black,
  correctAnswer: palette.green,
  wrongAnswer: palette.lightRed,
  rankFirst: palette.lightYellow,
  rankSecond: palette.lighterGrey,
  rankThird: palette.lightPink,
  rankFirstText: palette.yellow,
  rankSecondText: palette.lightGrey,
  rankThirdText: palette.pink,
  rankUser: palette.blueBlack,
  rankUserText: palette.white,
  rankPoints: palette.grey,
  rankText: palette.lightGrey,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,

  facebook: palette.blue3B5998,
  google: palette.redDC4A3C,
  twitter: palette.blue00ACED,
};
