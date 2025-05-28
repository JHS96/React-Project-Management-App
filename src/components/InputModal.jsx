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
      <form className='mt-8'>
        <div className='mb-5'>
          <label className='text-sm font-bold uppercase text-stone-500'>
            Title
          </label>
          <input className='mt-1 w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600' />
        </div>
        <div className='mb-5'>
          <label className='text-sm font-bold uppercase text-stone-500'>
            Description
          </label>
          <textarea className='mt-1 w-full p-1 min-h-24 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600' />
        </div>
        <div className='mb-5'>
          <label className='text-sm font-bold uppercase text-stone-500'>
            Due Date
          </label>
          <input
            type='date'
            className='mt-1 w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600'
          />
        </div>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});
