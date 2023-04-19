import { BREAKPOINTS } from '@constants';
import Sidebar from '@containers/layout/Sidebar';
import Modal from '@containers/Modal';
import useCallbackDebounce from '@hooks/useCallbackDebounce';
import useWindowSize from '@hooks/useWindowSize';
import MenuIcon from '@public/assets/icons/menu';
import SearchIcon from '@public/assets/icons/search';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface SearchFormProps {
  placeholder: string;
  classes: string;
  showSidebarBtn?: boolean;
}

const SearchForm = ({
  placeholder = '',
  showSidebarBtn,
  classes,
}: SearchFormProps) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const q = String(router.query.q || '');

  const [searchValue, setSearchValue] = useState<string>(q);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = useCallbackDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }
  );

  useEffect(() => {
    if (width >= BREAKPOINTS.MD && modalOpen) {
      setModalOpen(false);
    }
  }, [width]);

  return (
    <div className="mb-7 flex items-center gap-3 ">
      <div
        className={`${classes} flex items-center justify-start rounded-md bg-gray-200 py-2 px-3`}
      >
        <SearchIcon />
        <input
          defaultValue={searchValue}
          onChange={handleSearch}
          className="ml-3.5 w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400"
          type="search"
          placeholder={placeholder}
        />
      </div>

      {showSidebarBtn && (
        <>
          <button
            onClick={() => setModalOpen(true)}
            className="relative right-2 rounded-full bg-transparent p-2 hover:bg-gray-100 md:hidden"
          >
            <MenuIcon />
          </button>

          <Modal isOpen={modalOpen} containerStyles="w-[100%]">
            <Sidebar isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default SearchForm;
