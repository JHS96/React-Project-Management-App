import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default forwardRef(function InputModal({ save }, ref) {
  const dialog = useRef();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

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
    setTitle('');
    setDescription('');
    setDate('');
  }

  function handleCloseModal() {
    clearValues();
    setIsTitleValid(true);
    setIsDescriptionValid(true);
    setIsDateValid(true);
    dialog.current.close();
  }

  function handleSaveBtnClick() {
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
      const activeElement = document.activeElement;
      if (activeElement.id !== 'description') {
        event.preventDefault();
      }

      handleSaveBtnClick();
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
        <button
          className='px-5 hover:bg-stone-200 hover:rounded'
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-300 hover:text-stone-800'
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
            onChange={(e) => {
              setTitle(e.target.value);
              setIsTitleValid(true);
            }}
            value={title}
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
            onChange={(e) => {
              setDescription(e.target.value);
              setIsDescriptionValid(true);
            }}
            value={description}
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
            id='date'
            onChange={(e) => {
              setDate(e.target.value);
              setIsDateValid(true);
            }}
            value={date}
          />
        </div>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});
