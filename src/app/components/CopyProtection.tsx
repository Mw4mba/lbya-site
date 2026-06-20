'use client';

import { useEffect } from 'react';

const editableSelector = 'input, textarea, select, [contenteditable="true"], [data-allow-copy="true"]';

function isEditableTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(editableSelector));
}

export default function CopyProtection() {
  useEffect(() => {
    const blockCopy = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      event.clipboardData?.clearData();
      window.getSelection()?.removeAllRanges();
    };

    const blockSelection = (event: Event) => {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      window.getSelection()?.removeAllRanges();
    };

    const blockContextMenu = (event: MouseEvent) => {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    document.addEventListener('copy', blockCopy);
    document.addEventListener('cut', blockCopy);
    document.addEventListener('selectstart', blockSelection);
    document.addEventListener('dragstart', blockSelection);
    document.addEventListener('contextmenu', blockContextMenu);

    return () => {
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('cut', blockCopy);
      document.removeEventListener('selectstart', blockSelection);
      document.removeEventListener('dragstart', blockSelection);
      document.removeEventListener('contextmenu', blockContextMenu);
    };
  }, []);

  return null;
}
