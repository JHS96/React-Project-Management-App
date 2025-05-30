import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default forwardRef(function InputModal({ save }, ref) {
  const dialog = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);

  const titleClasses = `mt-1 w-full p-1 border-b-2 rounded-sm border-stone-300 text-stone-600 focus:outline-none focus:border-stone-600 ${
    isTitleValid ? 'bg-stone-200' : 'bg-red-200'
  }`;
  const descriptionClasses = `mt-1 w-full p-1 min-h-24 border-b-2 rounded-sm border-stone-300 text-stone-600 focus:outline-none focus:border-stone-600 ${
    isDescriptionValid ? 'bg-stone-200' : 'bg-red-200'
  }`;
  const dateClasses = `mt-1 w-full p-1 border-b-2 rounded-sm border-stone-300 text-stone-600 focus:outline-none focus:border-stone-600 ${
    isDateValid ? 'bg-stone-200' : 'bg-red-200'
  }`;

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

  function clearValues() {
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    dateRef.current.value = '';
  }

  function handleCloseModal() {
    clearValues();
    setIsTitleValid(true);
    setIsDescriptionValid(true);
    setIsDateValid(true);
    dialog.current.close();
  }

  function handleSaveBtnClick() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const date = dateRef.current.value;

    if (title !== '' && description !== '' && date !== '') {
      save(title, description, date);
      clearValues();
    }
    if (!title) setIsTitleValid(false);
    if (!description) setIsDescriptionValid(false);
    if (!date) setIsDateValid(false);
  }

  function handleEscapeAndEnterKeys(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSaveBtnClick();
      console.log('yes');
    }
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  }

  return createPortal(
    <dialog
      ref={dialog}
      className='w-2/3 p-10 rounded-lg'
      onKeyDown={(event) => handleEscapeAndEnterKeys(event)}
    >
      <div className='flex justify-end gap-4'>
        <button onClick={handleCloseModal}>Cancel</button>
        <button
          className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
          onClick={handleSaveBtnClick}
        >
          Save
        </button>
      </div>
      <form className='mt-8'>
        <div className='mb-5'>
          <label
            className='text-sm font-bold uppercase text-stone-500'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className={titleClasses}
            id='title'
            ref={titleRef}
            onChange={() => setIsTitleValid(true)}
          />
        </div>
        <div className='mb-5'>
          <label
            className='text-sm font-bold uppercase text-stone-500'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            className={descriptionClasses}
            id='description'
            ref={descriptionRef}
            onChange={() => setIsDescriptionValid(true)}
          />
        </div>
        <div className='mb-5'>
          <label
            className='text-sm font-bold uppercase text-stone-500'
            htmlFor='date'
          >
            Due Date
          </label>
          <input
            type='date'
            className={dateClasses}
            ref={dateRef}
            id='date'
            onChange={() => setIsDateValid(true)}
          />
        </div>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});
