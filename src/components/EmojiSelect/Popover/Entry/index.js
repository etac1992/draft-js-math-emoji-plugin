import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Entry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  onMouseUp = () => {
    if (this.mouseDown) {
      this.mouseDown = false;
      this.props.onEmojiSelect(this.props.emoji);
    }
  };

  onMouseDown = () => {
    this.mouseDown = true;
    this.props.onEmojiMouseDown(this, this.props.toneSet);
  };

  onMouseEnter = () => {
    if (!this.props.checkMouseDown()) {
      this.setState({ isFocused: true });
    }
  };

  onMouseLeave = () => {
    if (!this.props.checkMouseDown()) {
      this.setState({ isFocused: false });
    }
  };

  deselect = () => {
    this.setState({ isFocused: false });
  };

  mouseDown = this.props.mouseDown;
  render() {
    const { theme = {}, emoji } = this.props;
    const { isFocused } = this.state;
    return (
      <button
        type="button"
        className={isFocused
          ? theme.emojiSelectPopoverEntryFocused
          : theme.emojiSelectPopoverEntry}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
        ref={(element) => { this.button = element; }}
        dangerouslySetInnerHTML={{ __html: emoji.html || emoji.text }}
      />
    );
  }
}
Entry.propTypes = {
  theme: PropTypes.object.isRequired,
  emoji: PropTypes.object.isRequired,
  mouseDown: PropTypes.bool,
  checkMouseDown: PropTypes.func.isRequired,
  onEmojiSelect: PropTypes.func.isRequired,
  onEmojiMouseDown: PropTypes.func,
};

Entry.defaultProps = {
  mouseDown: false,
  onEmojiMouseDown: () => {}
};
