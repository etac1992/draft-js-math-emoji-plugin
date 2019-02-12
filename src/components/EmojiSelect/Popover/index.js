import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Groups from './Groups';
import insertTeX from '../../../modifiers/insertTeX';

export default class Popover extends Component {
  static propTypes = {
    cacheBustParam: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    imageType: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    emojis: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    useNativeArt: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
  };

  state = {
    activeGroup: 0,
  };

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = () => {
    this.mouseDown = true;
  };

  onMouseUp = () => {
    this.mouseDown = false;

    if (this.activeEmoji) {
      this.activeEmoji.deselect();
      this.activeEmoji = null;
    }
  };

  onWheel = (e) => e.preventDefault();

  onEmojiSelect = (emoji) => {
    const { store } = this.props;
    const editorState = store.getEditorState();
    store.setEditorState(insertTeX(editorState, emoji));
  };

  onEmojiMouseDown = (emojiEntry) => {
    this.activeEmoji = emojiEntry;
  };

  onGroupSelect = (groupIndex) => {
    this.groups.scrollToGroup(groupIndex);
  };

  onGroupScroll = (groupIndex) => {
    if (groupIndex !== this.state.activeGroup) {
      this.setState({
        activeGroup: groupIndex,
      });
    }
  };

  checkMouseDown = () => this.mouseDown;

  mouseDown = false;

  activeEmoji = null;

  render() {
    const {
      cacheBustParam,
      imagePath,
      imageType,
      theme = {},
      groups = [],
      emojis,
      isOpen = false,
      useNativeArt,
    } = this.props;
    const className = isOpen
      ? theme.emojiSelectPopover
      : theme.emojiSelectPopoverClosed;
    const { activeGroup } = this.state;
    return (
      <div
        className={className}
        onMouseDown={this.onMouseDown}
        onWheel={this.onWheel}
        ref={(element) => { this.container = element; }}
      >
        <h3 className={theme.emojiSelectPopoverTitle}>
          {groups[activeGroup].title}
        </h3>
        <Groups
          theme={theme}
          groups={groups}
          emojis={emojis}
          imagePath={imagePath}
          imageType={imageType}
          cacheBustParam={cacheBustParam}
          checkMouseDown={this.checkMouseDown}
          onEmojiSelect={this.onEmojiSelect}
          onEmojiMouseDown={this.onEmojiMouseDown}
          onGroupScroll={this.onGroupScroll}
          ref={(element) => { this.groups = element; }}
          useNativeArt={useNativeArt}
          isOpen={isOpen}
        />
      </div>
    );
  }
}
