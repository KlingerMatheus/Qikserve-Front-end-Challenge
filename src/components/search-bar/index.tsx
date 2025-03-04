import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";
import "./style.css";
import { SearchIcon } from "lucide-react";

interface Props {
  placeholder?: string;
  onSearch: Dispatch<SetStateAction<string>>;
}

export const SearchBar: FunctionComponent<Props> = ({
  placeholder,
  onSearch,
}) => {
  const handleSearch: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-input-container">
      <div className="left-icon">
        <SearchIcon />
      </div>
      <input
        className="search-input"
        type="search"
        placeholder={placeholder ?? "Type here"}
        onChange={handleSearch}
      />
    </div>
  );
};
