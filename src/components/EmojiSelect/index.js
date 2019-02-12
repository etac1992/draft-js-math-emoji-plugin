import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createEmojisFromStrategy from '../../utils/createEmojisFromStrategy';
import defaultEmojiGroups from '../../constants/defaultEmojiGroups';
import Popover from './Popover';

const emojis = createEmojisFromStrategy();

export default class EmojiSelect extends Component {
  static propTypes = {
    cacheBustParam: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    imageType: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    selectGroups: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(emojis))).isRequired,
    })),
    selectButtonContent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    useNativeArt: PropTypes.bool,
  };

  static defaultProps = {
    selectButtonContent: '☺',
    selectGroups: defaultEmojiGroups,
  };

  // Start the selector closed
  state = {
    isOpen: false,
  };

  // When the selector is open and users click anywhere on the page,
  // the selector should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  onClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  onButtonMouseUp = () => (
    this.state.isOpen ? this.closePopover() : this.openPopover()
  );

  // Open the popover
  openPopover = () => {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  };

  // Close the popover
  closePopover = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  render() {
    const {
      cacheBustParam,
      imagePath,
      imageType,
      theme = {},
      store,
      selectGroups,
      selectButtonContent,
      useNativeArt,
    } = this.props;
    const buttonClassName = this.state.isOpen
      ? theme.emojiSelectButtonPressed
      : theme.emojiSelectButton;

    return (
      <div className={theme.emojiSelect} onClick={this.onClick}>
        <button
          className={buttonClassName}
          onMouseUp={this.onButtonMouseUp}
          type="button"
        >
          {selectButtonContent}
        </button>
        <Popover
          cacheBustParam={cacheBustParam}
          imagePath={imagePath}
          imageType={imageType}
          theme={theme}
          store={store}
          groups={selectGroups}
          emojis={emojis}
          isOpen={this.state.isOpen}
          useNativeArt={useNativeArt}
        />
      </div>
    );
  }
}
