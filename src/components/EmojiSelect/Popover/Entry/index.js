import React, { Component } from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';

export default class Entry extends Component {
  mouseDown = this.props.mouseDown;

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }


  componentDidMount() {
    const { emoji } = this.props;
    katex.render(emoji, this.button, {
      displayMode: false,
    });
  }

  deselect = () => {
    this.setState({ isFocused: false });
  };

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

  render() {
    const { theme = {} } = this.props;
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
      />
    );
  }
}
Entry.propTypes = {
  theme: PropTypes.object.isRequired,
  emoji: PropTypes.string.isRequired,
  mouseDown: PropTypes.bool,
  checkMouseDown: PropTypes.func.isRequired,
  onEmojiSelect: PropTypes.func.isRequired,
  onEmojiMouseDown: PropTypes.func,
};

Entry.defaultProps = {
  mouseDown: false,
  onEmojiMouseDown: () => {}
};
