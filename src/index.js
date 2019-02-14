import decorateComponentWithProps from 'decorate-component-with-props';
import EmojiSelect from './components/EmojiSelect';
import Symbol from './components/Symbol';

import emojiStyles from './emojiStyles.css';
import emojiSelectStyles from './emojiSelectStyles.css';
import symbolStrategy from './symbolStrategy';

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

    emojiSelectPopoverEntry: emojiSelectStyles.emojiSelectPopoverEntry,
    emojiSelectPopoverEntryFocused: emojiSelectStyles.emojiSelectPopoverEntryFocused,


    emojiSelectPopoverScrollbar: emojiSelectStyles.emojiSelectPopoverScrollbar,
    emojiSelectPopoverScrollbarThumb: emojiSelectStyles.emojiSelectPopoverScrollbarThumb,
  };

  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  const {
    theme = defaultTheme,
    selectGroups,
    selectButtonContent,
  } = config;


  const selectProps = {
    theme,
    store,
    selectGroups,
    selectButtonContent,
  };
  return {
    EmojiSelect: decorateComponentWithProps(EmojiSelect, selectProps),
    decorators: [
      {
        strategy: symbolStrategy,
        component: decorateComponentWithProps(Symbol, { theme }),
      }
    ],
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
  };
};
