import * as React from "react";

import "./styles.scss";


interface Props {
    query: string;
    queryChange: (query: string) => void;
    search: () => void;
}


export class Search extends React.Component<Props> {
    render() {
        const { query, queryChange, search } = this.props;

        return <form
            className="Search input-group"
            onSubmit={ev => {
                search();
                ev.preventDefault();
            }}
        >
            <input
                type="text"
                placeholder="Search Levels"
                value={query}
                onChange={ev => queryChange(ev.target.value)}
            />
            <input
                className="primary"
                type="submit"
                value="Search"
            />
        </form>;
    }
}
