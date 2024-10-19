import { ChangeEventHandler, FC, memo } from "react";

interface Props {
    onChange: (value: string) => void;
    value: string;
}

const SearchInput: FC<Props> = ({ value, onChange }) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange(e.target.value)
    }

    return <div className="search">
        <label htmlFor="search-input" className="sr-only">Search</label>
        <input
            id="search-input"
            type="text"
            className="search"
            value={value}
            onChange={handleChange}
            aria-label="Search"
        />
    </div>
}

export default memo(SearchInput)