import { Map } from 'immutable';

import decorateComponentWithProps from 'decorate-component-with-props';
import EmojiSelect from './components/EmojiSelect';
import emojiStyles from './emojiStyles.css';
import emojiSelectStyles from './emojiSelectStyles.css';

const defaultImagePath = '//cdn.jsdelivr.net/emojione/assets/svg/';
const defaultImageType = 'svg';
const defaultCacheBustParam = '?v=2.2.7';

// TODO activate/deactivate different the conversion or search part

export default (config = {}) => {
  const defaultTheme = {
    emoji: emojiStyles.emoji,

    emojiSelect: emojiSelectStyles.emojiSelect,

    emojiSelectButton: emojiSelectStyles.emojiSelectButton,
    emojiSelectButtonPressed: emojiSelectStyles.emojiSelectButtonPressed,

    emojiSelectPopover: emojiSelectStyles.emojiSelectPopover,
    emojiSelectPopoverClosed: emojiSelectStyles.emojiSelectPopoverClosed,
    emojiSelectPopoverTitle: emojiSelectStyles.emojiSelectPopoverTitle,
    emojiSelectPopoverGroups: emojiSelectStyles.emojiSelectPopoverGroups,

    emojiSelectPopoverGroup: emojiSelectStyles.emojiSelectPopoverGroup,
    emojiSelectPopoverGroupTitle: emojiSelectStyles.emojiSelectPopoverGroupTitle,
    emojiSelectPopoverGroupList: emojiSelectStyles.emojiSelectPopoverGroupList,
    emojiSelectPopoverGroupItem: emojiSelectStyles.emojiSelectPopoverGroupItem,

    emojiSelectPopoverToneSelect: emojiSelectStyles.emojiSelectPopoverToneSelect,
    emojiSelectPopoverToneSelectList: emojiSelectStyles.emojiSelectPopoverToneSelectList,
    emojiSelectPopoverToneSelectItem: emojiSelectStyles.emojiSelectPopoverToneSelectItem,

    emojiSelectPopoverEntry: emojiSelectStyles.emojiSelectPopoverEntry,
    emojiSelectPopoverEntryFocused: emojiSelectStyles.emojiSelectPopoverEntryFocused,
    emojiSelectPopoverEntryIcon: emojiSelectStyles.emojiSelectPopoverEntryIcon,

    emojiSelectPopoverNav: emojiSelectStyles.emojiSelectPopoverNav,
    emojiSelectPopoverNavItem: emojiSelectStyles.emojiSelectPopoverNavItem,
    emojiSelectPopoverNavEntry: emojiSelectStyles.emojiSelectPopoverNavEntry,
    emojiSelectPopoverNavEntryActive: emojiSelectStyles.emojiSelectPopoverNavEntryActive,

    emojiSelectPopoverScrollbar: emojiSelectStyles.emojiSelectPopoverScrollbar,
    emojiSelectPopoverScrollbarThumb: emojiSelectStyles.emojiSelectPopoverScrollbarThumb,
  };
  const ariaProps = {
    ariaHasPopup: 'false',
    ariaExpanded: false,
    ariaOwneeID: undefined,
    ariaActiveDescendantID: undefined,
  };

  let searches = Map();
  let escapedSearch;
  let clientRectFunctions = Map();

  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
    getPortalClientRect: (offsetKey) => clientRectFunctions.get(offsetKey)(),
    getAllSearches: () => searches,
    isEscaped: (offsetKey) => escapedSearch === offsetKey,
    escapeSearch: (offsetKey) => {
      escapedSearch = offsetKey;
    },

    resetEscapedSearch: () => {
      escapedSearch = undefined;
    },

    register: (offsetKey) => {
      searches = searches.set(offsetKey, offsetKey);
    },

    updatePortalClientRect: (offsetKey, func) => {
      clientRectFunctions = clientRectFunctions.set(offsetKey, func);
    },

    unregister: (offsetKey) => {
      searches = searches.delete(offsetKey);
      clientRectFunctions = clientRectFunctions.delete(offsetKey);
    },
  };

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  const {
    theme = defaultTheme,
    imagePath = defaultImagePath,
    imageType = defaultImageType,
    allowImageCache,
    selectGroups,
    selectButtonContent,
    toneSelectOpenDelay,
    useNativeArt,
  } = config;

  const cacheBustParam = allowImageCache ? '' : defaultCacheBustParam;

  const selectProps = {
    cacheBustParam,
    imagePath,
    imageType,
    theme,
    store,
    selectGroups,
    selectButtonContent,
    toneSelectOpenDelay,
    useNativeArt,
  };
  return {
    EmojiSelect: decorateComponentWithProps(EmojiSelect, selectProps),
    getAccessibilityProps: () => (
      {
        role: 'combobox',
        ariaAutoComplete: 'list',
        ariaHasPopup: ariaProps.ariaHasPopup,
        ariaExpanded: ariaProps.ariaExpanded,
        ariaActiveDescendantID: ariaProps.ariaActiveDescendantID,
        ariaOwneeID: ariaProps.ariaOwneeID,
      }
    ),

    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
  };
};
