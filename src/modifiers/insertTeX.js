import { Modifier, EditorState } from 'draft-js';

export default function insertTeX(editorState, emoji) {
  let contentState = editorState.getCurrentContent();
  let selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    contentState = Modifier.removeRange(
      contentState,
      selection,
      'backward',
    );
    selection = contentState.getSelectionAfter();
  }
  if (emoji.symbol) {
    contentState = contentState.createEntity('INLINE_MATH_SYMBOL', 'IMMUTABLE', { emoji });
    const entityKey = contentState.getLastCreatedEntityKey();

    contentState = Modifier.insertText(
      contentState,
      selection,
      emoji.html,
      undefined,
      entityKey,
    );
    selection = contentState.getSelectionAfter();
    const newEditorState = EditorState.push(
      editorState,
      contentState,
      'apply-entity',
    );
    return EditorState.forceSelection(newEditorState, contentState.getSelectionAfter());
  }
  contentState = Modifier.insertText(contentState, selection, emoji.text || '');
  return EditorState.push(editorState, contentState, 'insert-fragment');
}
