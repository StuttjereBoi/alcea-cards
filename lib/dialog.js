
export function toggleDialog(backdrop, dialogState, setDialogState) {
  backdrop.style.display = backdrop.style.display == 'flex' ? 'none' : 'flex';
  setDialogState(!dialogState);
}