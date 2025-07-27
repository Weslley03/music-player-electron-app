import { useEffect, useRef, useState } from 'react';
import PlusIcon from '../../icons/PlusIcon';
import colors from '../../utils/colors';
import RoundBottom from '../RoundBottom/RoundBottom';
import RoundedBottom from '../RoundedBottom/RoundedBottom';
import styles from './MyLibrary.module.scss';
import type { FilterOption } from '../../types/MyLibrary/filter-options-type';
import CloseIcon from '../../icons/CloseIcon';
import SearchIcon from '../../icons/SearchIcon';
import type { LibraryOption } from '../../types/MyLibrary/library-type';
import CardOptionMyLibrary from '../CardOptionMyLibrary/CardOptionMyLibrary';
import MinimizeIcon from '../../icons/MinimizeIcon';
import ExtendIcon from '../../icons/ExtendIcon';
import { useNavigate } from 'react-router-dom';
import { getUserLibrary } from '../../services/user/user-service';

const MyLibrary = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState<LibraryOption[] | null>(null);
  const [filteredCards, setFilteredCards] = useState<LibraryOption[] | null>(null);

  const [reducedUI, setReducedUI] = useState(false);

  /* control search input visibility */
  const [inputSearch, setInputSearch] = useState(false);
  /* ref directly to input */
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const searchDivRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLDivElement>(null);
  const [valuePerSearch, setValuePerSearch] = useState<string>('');

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    {
      value: 'artist',
      text: 'Artista',
      fontSize: '12px',
      backgroundColor: colors.dark300,
      selected: false,
    },
    {
      value: 'album',
      text: 'Álbum',
      fontSize: '12px',
      backgroundColor: colors.dark300,
      selected: false,
    },
    {
      value: 'playlist',
      text: 'Playlist',
      fontSize: '12px',
      backgroundColor: colors.dark300,
      selected: false,
    },
  ]);

  const handleSelect = (value: string) => {
    setFilterOptions((prev) =>
      prev.map((item) =>
        item.value === value
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const showSelectedFilter = () => {
    const selectedOption = filterOptions.find(option => option.selected === true);
    if (!selectedOption) return null;

    return (
      <>
        <div className={styles.selected}>
          <div className={styles.closeButtom} onClick={() => handleSelect(selectedOption.value)}>
            <RoundBottom>
              <CloseIcon size={16} />
            </RoundBottom>
          </div>
          <RoundedBottom
            text={selectedOption.text}
            textSize={selectedOption.fontSize}
            backgroundColor={selectedOption.backgroundColor}
            haveHover={false}
          />
        </div>
      </>
    );
  };

  const showInputSearch = () => {
    return (
      <div className={styles.inputSearchSection}>
        <input
          ref={inputSearchRef}
          type='text'
          placeholder='Procurar em tua biblioteca'
          className={styles.inputSearch}
          value={valuePerSearch}
          onChange={(value) => setValuePerSearch(value.target.value)}
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    );
  };

  const directToSelected = (type: string, id: string) => {
    navigate(`/view-card-selected/${type}/${id}`);
  };

  useEffect(() => {
    if (!cards) {
      setFilteredCards(null);
      return;
    }

    let result = [...cards];

    const selectedOption = filterOptions.find(option => option.selected);

    if (selectedOption) {
      result = result.filter(card => card.type === selectedOption.value);
    }

    const search = valuePerSearch.trim().toLowerCase();

    if (search) {
      result = result.filter(card =>
        card.title.toLowerCase().includes(search)
      );
    }

    setFilteredCards(result);
  }, [cards, filterOptions, valuePerSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchDivRef.current && searchButtonRef.current &&
        !searchDivRef.current.contains(event.target as Node) &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setInputSearch(false);
      }
    };

    if (!inputSearch) setValuePerSearch('');

    if (inputSearch && inputSearchRef.current) {
      inputSearchRef.current.focus();
    }

    if (inputSearch) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputSearch]);

  //onMounted
  useEffect(() => {
    const getCardsOption = async () => {
      const cards = await getUserLibrary();
      setCards(cards);
    };

    getCardsOption();
  }, []);

  return (
    <div
      className={styles.mainContainer}
      style={!reducedUI ? { width: "300px" } : { width: "100px" }}
    >
      <div className={styles.content}>

        <div className={styles.header}>
          {!reducedUI && (
            <>
              <p className={styles.title}>A tua biblioteca</p>

              <div className={styles.buttons}>
                <RoundBottom backgroundColor={colors.dark300}>
                  <PlusIcon size={14} />
                </RoundBottom>
              </div>
            </>
          )}

          <div onClick={() => setReducedUI(!reducedUI)}>
            <RoundBottom backgroundColor={colors.dark300}>
              {reducedUI ? <ExtendIcon size={14} /> : <MinimizeIcon size={14} />}
            </RoundBottom>
          </div>
        </div>

        {!reducedUI && (
          <div className={styles.filterOptions}>
            {
              filterOptions.every((option) => option.selected === false) && filterOptions.map((option) => (
                <div key={option.value} onClick={() => handleSelect(option.value)}>
                  <RoundedBottom
                    text={option.text}
                    textSize={option.fontSize}
                    backgroundColor={option.backgroundColor}
                  />
                </div>
              ))
            }

            {showSelectedFilter()}

            <div className={styles.searchButtom} onClick={() => setInputSearch(!inputSearch)} ref={searchButtonRef}>
              <RoundBottom>
                <SearchIcon size={18} />
              </RoundBottom>
            </div>
          </div>
        )}

        {inputSearch && !reducedUI && (
          <div ref={searchDivRef}>
            {showInputSearch()}
          </div>
        )}

        {
          (cards || filteredCards) && (
            <div
              className={styles.cardOptions}
            >
              {(filteredCards ? filteredCards : cards)?.map(card => (
                <div className={styles.cardOption} key={`${card.id}-${card.title.trim()}`} onClick={() => directToSelected(card.type, card.id)}>
                  <CardOptionMyLibrary
                    key={`${card.id}-${card.title.trim()}`}
                    imgSrc={card.img}
                    title={card.title}
                    description={card.description}
                    type={card.type}
                    hoverColor={reducedUI ? colors.dark200 : colors.dark400}
                    reducedUI={reducedUI}
                  />
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div >
  );
};

export default MyLibrary;