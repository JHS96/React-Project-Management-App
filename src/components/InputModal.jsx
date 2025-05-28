import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export default forwardRef(function InputModal({ save }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  function handleCloseModal() {
    dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className='w-2/3 p-10 rounded-lg'>
      <div className='flex justify-end gap-4'>
        <button onClick={handleCloseModal}>Cancel</button>
        <button
          className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
          onClick={save}
        >
          Save
        </button>
      </div>
      <h1 className='text-3xl p-32'>Inputs and labels to be added here</h1>
    </dialog>,
    document.getElementById('modal-root')
  );
});
